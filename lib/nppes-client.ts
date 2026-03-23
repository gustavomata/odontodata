// =============================================================================
// NPPES NPI Registry Client — counts active dentists per city in a US state
// API: https://npiregistry.cms.hhs.gov/api/
// Rate: free, no key needed, ~200 results per page
// =============================================================================

const NPPES_BASE = "https://npiregistry.cms.hhs.gov/api/";
const PAGE_SIZE = 200;
const DELAY_MS = 250; // politeness delay between pages

interface NPPESResponse {
  result_count: number;
  results?: Array<{
    addresses?: Array<{
      address_purpose: string;
      city: string;
      state: string;
    }>;
  }>;
}

function normalizeCityName(name: string): string {
  return name
    .toUpperCase()
    .replace(/\s+(CITY|TOWN|VILLAGE|CDP|BOROUGH|MUNICIPALITY)$/i, "")
    .replace(/\bST\.\s*/g, "SAINT ")
    .replace(/\bFT\.\s*/g, "FORT ")
    .replace(/\bMT\.\s*/g, "MOUNT ")
    .replace(/['']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Known aliases for cities where NPPES and Census names diverge
const CITY_ALIASES: Record<string, string> = {
  "NYC": "NEW YORK",
  "NY": "NEW YORK",
  "LA": "LOS ANGELES",
  "SF": "SAN FRANCISCO",
  "SAINT LOUIS": "ST. LOUIS",
  "SAINT PAUL": "ST. PAUL",
  "SAINT PETERSBURG": "ST. PETERSBURG",
  "SAINT CLOUD": "ST. CLOUD",
  "FORT WORTH": "FORT WORTH",
  "FORT LAUDERDALE": "FORT LAUDERDALE",
  "FORT MYERS": "FORT MYERS",
  "WINSTON SALEM": "WINSTON-SALEM",
  "BOCA RATON": "BOCA RATON",
  "MCALLEN": "MC ALLEN",
};

function resolveAlias(name: string): string {
  return CITY_ALIASES[name] ?? name;
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Fetch total dentist count for a state (fast, single request).
 */
export async function fetchStateDentistCount(uf: string): Promise<number> {
  const url = `${NPPES_BASE}?version=2.1&taxonomy_description=Dentist&state=${uf}&limit=0&skip=0`;
  const res = await fetch(url, {
    signal: AbortSignal.timeout(15000),
    headers: { "User-Agent": "OdontoDataBot/1.0" },
  });
  if (!res.ok) throw new Error(`NPPES ${res.status} for state ${uf}`);
  const json = (await res.json()) as NPPESResponse;
  return json.result_count ?? 0;
}

/**
 * Fetch dentist counts per city for a given US state.
 * Paginates through all NPPES results and counts by practice city.
 *
 * Returns Map<normalized_city_name, dentist_count>
 */
export async function fetchDentistsByState(
  uf: string,
  options?: { onProgress?: (fetched: number, total: number) => void }
): Promise<Map<string, number>> {
  const counts = new Map<string, number>();

  // First request: get total count
  const firstUrl = `${NPPES_BASE}?version=2.1&taxonomy_description=Dentist&state=${uf}&limit=${PAGE_SIZE}&skip=0`;
  const firstRes = await fetch(firstUrl, {
    signal: AbortSignal.timeout(15000),
    headers: { "User-Agent": "OdontoDataBot/1.0" },
  });
  if (!firstRes.ok) throw new Error(`NPPES ${firstRes.status} for ${uf}`);

  const firstJson = (await firstRes.json()) as NPPESResponse;
  const total = firstJson.result_count ?? 0;

  if (total === 0) return counts;

  // Process first page
  processResults(firstJson.results ?? [], counts);
  let fetched = firstJson.results?.length ?? 0;
  options?.onProgress?.(fetched, total);

  // Paginate remaining
  while (fetched < total) {
    await sleep(DELAY_MS);
    const url = `${NPPES_BASE}?version=2.1&taxonomy_description=Dentist&state=${uf}&limit=${PAGE_SIZE}&skip=${fetched}`;
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(15000),
        headers: { "User-Agent": "OdontoDataBot/1.0" },
      });
      if (!res.ok) {
        // Rate limited or error — wait and retry once
        if (res.status === 429) {
          await sleep(2000);
          continue;
        }
        break;
      }
      const json = (await res.json()) as NPPESResponse;
      const results = json.results ?? [];
      if (results.length === 0) break;

      processResults(results, counts);
      fetched += results.length;
      options?.onProgress?.(fetched, total);
    } catch {
      // Timeout or network error — stop paginating, use what we have
      break;
    }
  }

  return counts;
}

function processResults(
  results: NonNullable<NPPESResponse["results"]>,
  counts: Map<string, number>
) {
  for (const provider of results) {
    // Use practice location address (address_purpose = "LOCATION")
    const addr =
      provider.addresses?.find((a) => a.address_purpose === "LOCATION") ??
      provider.addresses?.[0];
    if (!addr?.city) continue;

    const city = resolveAlias(normalizeCityName(addr.city));
    counts.set(city, (counts.get(city) ?? 0) + 1);
  }
}

/**
 * Match a Census place name to NPPES city counts.
 * Tries exact match, then normalized match, then prefix match.
 */
export function matchCityToNPPES(
  censusName: string,
  nppesMap: Map<string, number>
): number {
  const normalized = normalizeCityName(censusName);

  // Exact match
  if (nppesMap.has(normalized)) return nppesMap.get(normalized)!;

  // Try alias
  const aliased = resolveAlias(normalized);
  if (aliased !== normalized && nppesMap.has(aliased)) return nppesMap.get(aliased)!;

  // Prefix match (e.g., "JACKSONVILLE" matches "JACKSONVILLE BEACH" entries)
  for (const [key, val] of nppesMap) {
    if (key.startsWith(normalized) || normalized.startsWith(key)) {
      return val;
    }
  }

  // No match
  return 0;
}
