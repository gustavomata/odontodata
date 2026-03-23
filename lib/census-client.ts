// =============================================================================
// Census Bureau API Client — fetches city-level demographics
// API: https://api.census.gov/data/
// Free, no key required (key optional for higher rate limits)
// =============================================================================

// State FIPS → 2-letter abbreviation
const FIPS_TO_UF: Record<string, string> = {
  "01":"AL","02":"AK","04":"AZ","05":"AR","06":"CA","08":"CO","09":"CT",
  "10":"DE","11":"DC","12":"FL","13":"GA","15":"HI","16":"ID","17":"IL",
  "18":"IN","19":"IA","20":"KS","21":"KY","22":"LA","23":"ME","24":"MD",
  "25":"MA","26":"MI","27":"MN","28":"MS","29":"MO","30":"MT","31":"NE",
  "32":"NV","33":"NH","34":"NJ","35":"NM","36":"NY","37":"NC","38":"ND",
  "39":"OH","40":"OK","41":"OR","42":"PA","44":"RI","45":"SC","46":"SD",
  "47":"TN","48":"TX","49":"UT","50":"VT","51":"VA","53":"WA","54":"WV",
  "55":"WI","56":"WY",
};

export const UF_TO_FIPS: Record<string, string> = Object.fromEntries(
  Object.entries(FIPS_TO_UF).map(([k, v]) => [v, k])
);

export interface CensusPlace {
  name: string;          // e.g. "Houston city, Texas"
  cleanName: string;     // e.g. "Houston"
  uf: string;            // e.g. "TX"
  fipsState: string;     // e.g. "48"
  fipsPlace: string;     // e.g. "35000"
  fipsFull: string;      // e.g. "4835000"
  populacao: number;
  medianaRenda: number | null;
}

/**
 * Clean Census place name: "Houston city, Texas" → "Houston"
 */
function cleanPlaceName(raw: string): string {
  return raw
    .replace(/\s+(city|town|village|CDP|borough|municipality|zona urbana),?\s*.*/i, "")
    .replace(/,\s*\w+$/, "") // remove ", Texas"
    .trim();
}

/**
 * Fetch all Census places (cities/CDPs) for a single state.
 * Uses ACS 5-Year estimates (more complete coverage than 1-Year).
 *
 * Variables:
 *   B01003_001E = total population
 *   B19013_001E = median household income
 *   NAME = place name
 */
export async function fetchCensusPlaces(
  stateFips: string,
  options?: { minPopulation?: number; vintage?: number }
): Promise<CensusPlace[]> {
  const vintage = options?.vintage ?? 2022;
  const minPop = options?.minPopulation ?? 10000;

  const url =
    `https://api.census.gov/data/${vintage}/acs/acs5` +
    `?get=NAME,B01003_001E,B19013_001E` +
    `&for=place:*` +
    `&in=state:${stateFips}`;

  const res = await fetch(url, {
    signal: AbortSignal.timeout(20000),
    headers: { "User-Agent": "OdontoDataBot/1.0" },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`Census API ${res.status} for state FIPS ${stateFips}`);
  }

  const rows = (await res.json()) as string[][];
  const [, ...data] = rows; // skip header

  const uf = FIPS_TO_UF[stateFips];
  if (!uf) throw new Error(`Unknown FIPS: ${stateFips}`);

  const places: CensusPlace[] = [];

  for (const row of data) {
    // Columns: NAME, B01003_001E (pop), B19013_001E (income), state, place
    const [name, popStr, incomeStr, fState, fPlace] = row;
    const populacao = parseInt(popStr);
    if (isNaN(populacao) || populacao < minPop) continue;

    const medianaRenda = parseInt(incomeStr);

    places.push({
      name,
      cleanName: cleanPlaceName(name),
      uf,
      fipsState: fState,
      fipsPlace: fPlace,
      fipsFull: `${fState}${fPlace}`,
      populacao,
      medianaRenda: isNaN(medianaRenda) || medianaRenda < 0 ? null : medianaRenda,
    });
  }

  // Sort by population descending
  places.sort((a, b) => b.populacao - a.populacao);
  return places;
}

/**
 * Fetch population for 2 vintages to compute growth rate.
 * Returns Map<fipsFull, growthPct>
 */
export async function fetchPopulationGrowth(
  stateFips: string,
  currentVintage = 2022,
  pastVintage = 2017
): Promise<Map<string, number>> {
  const growth = new Map<string, number>();

  try {
    const [current, past] = await Promise.all([
      fetchPopData(stateFips, currentVintage),
      fetchPopData(stateFips, pastVintage),
    ]);

    for (const [fips, currentPop] of current) {
      const pastPop = past.get(fips);
      if (pastPop && pastPop > 0) {
        const pct = ((currentPop - pastPop) / pastPop) * 100;
        growth.set(fips, Math.round(pct * 10) / 10);
      }
    }
  } catch {
    // If past vintage fails, return empty (growth will be null)
  }

  return growth;
}

async function fetchPopData(
  stateFips: string,
  vintage: number
): Promise<Map<string, number>> {
  const url =
    `https://api.census.gov/data/${vintage}/acs/acs5` +
    `?get=B01003_001E` +
    `&for=place:*` +
    `&in=state:${stateFips}`;

  const res = await fetch(url, {
    signal: AbortSignal.timeout(15000),
    headers: { "User-Agent": "OdontoDataBot/1.0" },
    next: { revalidate: 0 },
  });

  if (!res.ok) throw new Error(`Census ${res.status}`);
  const rows = (await res.json()) as string[][];
  const [, ...data] = rows;

  const map = new Map<string, number>();
  for (const row of data) {
    const [popStr, fState, fPlace] = row;
    const pop = parseInt(popStr);
    if (!isNaN(pop)) map.set(`${fState}${fPlace}`, pop);
  }
  return map;
}

// ─── Known College Towns ───────────────────────────────────────────────────

const COLLEGE_TOWNS = new Set([
  "ANN ARBOR","ATHENS","AUBURN","BERKELEY","BLACKSBURG","BLOOMINGTON",
  "BOONE","BOULDER","BOWLING GREEN","BURLINGTON","CARBONDALE","CHAMPAIGN",
  "CHAPEL HILL","CHARLOTTESVILLE","CLEMSON","COLLEGE STATION","COLUMBIA",
  "CORVALLIS","DAVIS","DURHAM","EUGENE","FAYETTEVILLE","FLAGSTAFF",
  "FORT COLLINS","GAINESVILLE","HATTIESBURG","ITHACA","IOWA CITY","KNOXVILLE",
  "LAFAYETTE","LANSING","LARAMIE","LAWRENCE","LEXINGTON","LINCOLN",
  "LOGAN","LUBBOCK","MADISON","MANHATTAN","MISSOULA","MORGANTOWN",
  "MUNCIE","NORMAN","OXFORD","POCATELLO","PULLMAN","RALEIGH",
  "RENO","REXBURG","ROCHESTER","RUSTON","SACRAMENTO","SALT LAKE CITY",
  "SAN MARCOS","STATE COLLEGE","STILLWATER","SYRACUSE","TALLAHASSEE",
  "TEMPE","TUSCALOOSA","UNIVERSITY PARK","URBANA","WACO",
]);

/**
 * Classify a city type based on population and name.
 */
export function classifyCityType(
  populacao: number,
  name: string
): "Metro" | "Suburban" | "Secondary" | "Rural" | "College Town" {
  const upper = name.toUpperCase().trim();
  if (COLLEGE_TOWNS.has(upper) && populacao < 300000) return "College Town";
  if (populacao >= 250000) return "Metro";
  if (populacao >= 100000) return "Suburban";
  if (populacao >= 30000) return "Secondary";
  return "Rural";
}
