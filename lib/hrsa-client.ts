// =============================================================================
// HRSA HPSA Client — fetches Dental Health Professional Shortage Area data
// API: https://data.hrsa.gov/
// Free, no key needed
// =============================================================================

const HRSA_BASE = "https://data.hrsa.gov/api";

interface HPSADesignation {
  hpsaName: string;
  hpsaScore: number;
  designationType: string;
  stateAbbreviation: string;
  countyName?: string;
  hpsaStatus: string;
  componentName?: string;
}

function normalizeName(name: string): string {
  return name
    .toUpperCase()
    .replace(/\s+(CITY|TOWN|VILLAGE|CDP|BOROUGH|COUNTY|PARISH)$/i, "")
    .replace(/\bST\.\s*/g, "SAINT ")
    .replace(/['']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Fetch dental HPSA designations for a US state.
 * Returns a Set of normalized area/county names with active HPSA designation.
 * Also returns a Map of county → HPSA score for more granular matching.
 */
export async function fetchHPSAByState(uf: string): Promise<{
  hpsaNames: Set<string>;
  hpsaCounties: Set<string>;
  hpsaScores: Map<string, number>;
}> {
  const hpsaNames = new Set<string>();
  const hpsaCounties = new Set<string>();
  const hpsaScores = new Map<string, number>();

  try {
    // Primary: HRSA HPSA Find API
    const url = `${HRSA_BASE}/hpsafind?disciplineId=3&stateCode=${uf}&status=designated`;
    const res = await fetch(url, {
      signal: AbortSignal.timeout(15000),
      headers: { "User-Agent": "OdontoDataBot/1.0" },
    });

    if (res.ok) {
      const data = (await res.json()) as HPSADesignation[];
      for (const d of data) {
        if (d.hpsaStatus?.toLowerCase() !== "designated") continue;

        // Add the HPSA name
        if (d.hpsaName) {
          hpsaNames.add(normalizeName(d.hpsaName));
        }
        // Add the county
        if (d.countyName) {
          const county = normalizeName(d.countyName);
          hpsaCounties.add(county);
          hpsaScores.set(county, Math.max(hpsaScores.get(county) ?? 0, d.hpsaScore ?? 0));
        }
        // Component name (often the specific community)
        if (d.componentName) {
          hpsaNames.add(normalizeName(d.componentName));
        }
      }
      return { hpsaNames, hpsaCounties, hpsaScores };
    }
  } catch {
    // Primary API failed
  }

  // Fallback: try the BCD (Bureau of Clinician Recruitment) data endpoint
  try {
    const url2 = `https://data.hrsa.gov/data/download?data=hpsa&format=json`;
    // This returns a very large dataset — we'd normally use the filtered endpoint.
    // For now, return empty and rely on static data.
  } catch {
    // ignore
  }

  return { hpsaNames, hpsaCounties, hpsaScores };
}

/**
 * Check if a city is in an HPSA-designated area.
 * Matches against HPSA names, county names, and component names.
 */
export function isHPSACity(
  cityName: string,
  countyName: string | null,
  hpsa: { hpsaNames: Set<string>; hpsaCounties: Set<string> }
): boolean {
  const normalizedCity = normalizeName(cityName);

  // Direct name match
  if (hpsa.hpsaNames.has(normalizedCity)) return true;

  // Check if any HPSA name contains this city name
  for (const name of hpsa.hpsaNames) {
    if (name.includes(normalizedCity) || normalizedCity.includes(name)) return true;
  }

  // County-level match
  if (countyName) {
    const normalizedCounty = normalizeName(countyName);
    if (hpsa.hpsaCounties.has(normalizedCounty)) return true;
  }

  return false;
}
