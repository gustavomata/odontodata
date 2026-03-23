/**
 * OdontoData — Script de importação: Estados Unidos
 *
 * Fontes utilizadas:
 *  - US Census Bureau CenPop 2020: centróides e população de 3.143 condados
 *    https://www2.census.gov/geo/docs/reference/cenpop2020/county/CenPop2020_Mean_CO.txt
 *  - NPPES NPI Registry (CMS): contagem de dentistas por estado
 *    https://npiregistry.cms.hhs.gov/api/ (sem autenticação)
 *    Taxonomy 122300000X = Dentist
 *
 * Estratégia: dentistas por estado (NPPES) distribuídos proporcionalmente
 * por condado baseado na população (Census 2020). Dados reais no nível estadual,
 * estimativa no nível de condado.
 *
 * Como executar:
 *   npm run import:usa
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";
import { USA_STATE_REGION } from "@/lib/world-map-data";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Centróides de condados do Census Bureau (CenPop 2020)
const CENSUS_CENPOP_URL =
  "https://www2.census.gov/geo/docs/reference/cenpop2020/county/CenPop2020_Mean_CO.txt";

// NPPES API: dentistas por estado
// Taxonomy 122300000X = Dentist, 1223G0001X = General Dentistry, etc.
const NPPES_BASE = "https://npiregistry.cms.hhs.gov/api";

// Mapeamento FIPS state code → postal abbreviation
const FIPS_TO_STATE: Record<string, string> = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA",
  "08": "CO", "09": "CT", "10": "DE", "11": "DC", "12": "FL",
  "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN",
  "19": "IA", "20": "KS", "21": "KY", "22": "LA", "23": "ME",
  "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS",
  "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH",
  "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND",
  "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI",
  "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT",
  "50": "VT", "51": "VA", "53": "WA", "54": "WV", "55": "WI",
  "56": "WY",
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function fetchJson(url: string, retries = 3): Promise<unknown> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json", "User-Agent": "OdontoData/1.0" },
        signal: AbortSignal.timeout(20000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (i < retries - 1) { await sleep(1500 * (i + 1)); }
      else throw e;
    }
  }
}

function calcScore(dentPorHab: number | null): { score: number; classificacao: string } {
  if (!dentPorHab) return { score: 0, classificacao: "No Data" };
  // Mesma fórmula usada para o Brasil
  let score = 0;
  if (dentPorHab >= 3000)      score = 100;
  else if (dentPorHab >= 2000) score = 80;
  else if (dentPorHab >= 1500) score = 65;
  else if (dentPorHab >= 1000) score = 45;
  else if (dentPorHab >= 700)  score = 30;
  else                         score = 15;

  const classificacao =
    score >= 85 ? "Excellent" :
    score >= 70 ? "Very Good" :
    score >= 55 ? "Good" :
    score >= 35 ? "Moderate" : "Saturated";

  return { score, classificacao };
}

// ─── ETAPA 1: Condados do Census Bureau ──────────────────────────────────────

interface County {
  fips: number;        // código FIPS numérico (estado + condado)
  nome: string;        // ex: "Jefferson County"
  uf: string;          // postal code ex: "AL"
  regiao: string;      // ex: "South"
  lat: number;
  lng: number;
  populacao: number;
}

async function fetchCounties(): Promise<County[]> {
  console.log("📡 Buscando condados do Census Bureau (CenPop 2020)...");
  const text = await fetchText(CENSUS_CENPOP_URL);
  const lines = text.trim().split("\n");
  // Header: STATEFP,COUNTYFP,COUNAME,STNAME,POPULATION,LATITUDE,LONGITUDE
  const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, "").toUpperCase());
  const stateIdx  = headers.indexOf("STATEFP");
  const countyIdx = headers.indexOf("COUNTYFP");
  const nameIdx   = headers.indexOf("COUNAME");
  const popIdx    = headers.indexOf("POPULATION");
  const latIdx    = headers.indexOf("LATITUDE");
  const lngIdx    = headers.indexOf("LONGITUDE");

  const counties: County[] = [];
  for (const line of lines.slice(1)) {
    if (!line.trim()) continue;
    const cols = line.split(",").map((c) => c.trim().replace(/"/g, ""));
    const stateFips = cols[stateIdx];
    const countyFips = cols[countyIdx];
    const uf = FIPS_TO_STATE[stateFips];
    if (!uf) continue; // pula territórios (PR, VI, etc.)

    const fips = parseInt(stateFips + countyFips);
    const lat = parseFloat(cols[latIdx]);
    const lng = parseFloat(cols[lngIdx]);
    const pop = parseInt(cols[popIdx]) || 0;

    if (!lat || !lng) continue;

    counties.push({
      fips,
      nome: cols[nameIdx],
      uf,
      regiao: USA_STATE_REGION[uf] ?? "Other",
      lat,
      lng,
      populacao: pop,
    });
  }

  console.log(`  ✓ ${counties.length} condados carregados`);
  return counties;
}

// ─── ETAPA 2: Dentistas por estado (NPPES) ───────────────────────────────────

async function fetchDentistasPorEstado(): Promise<Map<string, number>> {
  const stateMap = new Map<string, number>();
  const states = Object.values(FIPS_TO_STATE);

  console.log(`\n📡 Buscando dentistas do NPPES para ${states.length} estados...`);

  for (const state of states) {
    let count = 0;
    let skip = 0;
    const limit = 200;

    // Pagina até obter todos os dentistas do estado (máx 50 páginas = 10.000 por estado)
    while (skip < 10000) {
      const url = `${NPPES_BASE}/?taxonomy_description=Dentist&state=${state}&enumeration_type=NPI-1&limit=${limit}&skip=${skip}&version=2.1`;
      let data: unknown;
      try {
        data = await fetchJson(url);
      } catch {
        console.warn(`  ⚠ Falha NPPES ${state} skip=${skip}`);
        break;
      }

      const results = (data as { results?: unknown[] })?.results ?? [];
      count += results.length;
      if (results.length < limit) break;
      skip += limit;
      await sleep(150); // rate limit
    }

    stateMap.set(state, count);
    process.stdout.write(`  ${state}: ${count} dentistas\n`);
    await sleep(200);
  }

  const total = [...stateMap.values()].reduce((a, b) => a + b, 0);
  console.log(`\n  ✓ Total NPPES: ${total.toLocaleString()} dentistas`);
  return stateMap;
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("❌ NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não definidos");
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false },
  });

  // 1. Condados com população e coordenadas
  const counties = await fetchCounties();

  // 2. Dentistas por estado
  const dentistasPorEstado = await fetchDentistasPorEstado();

  // 3. Agrupa condados por estado para calcular distribuição proporcional
  const countiesByState = new Map<string, County[]>();
  for (const county of counties) {
    const arr = countiesByState.get(county.uf) ?? [];
    arr.push(county);
    countiesByState.set(county.uf, arr);
  }

  // 4. Distribui dentistas por condado proporcionalmente à população
  console.log("\n📊 Calculando distribuição proporcional...");
  const registros = [];

  for (const [state, stateCounties] of countiesByState) {
    const totalDentistas = dentistasPorEstado.get(state) ?? 0;
    const totalPop = stateCounties.reduce((s, c) => s + c.populacao, 0);

    for (const county of stateCounties) {
      const fracPop = totalPop > 0 ? county.populacao / totalPop : 0;
      const dentistas = Math.round(totalDentistas * fracPop);
      const dentPorHab = dentistas > 0 && county.populacao > 0
        ? Math.round(county.populacao / dentistas)
        : null;
      const { score, classificacao } = calcScore(dentPorHab);

      registros.push({
        pais: "US",
        codigo_ibge: county.fips,
        municipio: county.nome,
        uf: county.uf,
        regiao: county.regiao,
        lat: county.lat,
        lng: county.lng,
        populacao: county.populacao,
        dentistas_total: dentistas,
        dentistas_por_hab: dentPorHab,
        score_oportunidade: dentistas > 0 ? score : null,
        classificacao: dentistas > 0 ? classificacao : null,
        fonte_dentistas: "NPPES/CMS",
        fonte_populacao: "Census 2020",
      });
    }
  }

  console.log(`  ✓ ${registros.length} condados preparados`);
  console.log(`  Com dentistas: ${registros.filter((r) => r.dentistas_total > 0).length}`);

  // 5. Upsert no Supabase em lotes de 500
  console.log("\n💾 Inserindo no Supabase...");
  const BATCH = 500;
  let total = 0;

  for (let i = 0; i < registros.length; i += BATCH) {
    const batch = registros.slice(i, i + BATCH);
    const { error } = await supabase
      .from("municipios_odonto")
      .upsert(batch, { onConflict: "pais,codigo_ibge" });

    if (error) {
      console.error(`  ❌ Erro no lote ${i}: ${error.message}`);
    } else {
      total += batch.length;
      process.stdout.write(`  ${total}/${registros.length}\r`);
    }
  }

  console.log(`\n\n✅ EUA importado! ${total} condados no Supabase.`);
  console.log("   O mapa agora exibe dados reais de ${[...dentistasPorEstado.values()].reduce((a,b)=>a+b,0).toLocaleString()} dentistas (NPPES).");
}

main().catch((e) => { console.error("❌", e); process.exit(1); });
