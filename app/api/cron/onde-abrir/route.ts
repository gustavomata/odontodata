import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { computeScoreUSA, classificarScoreUSA } from "@/lib/data-onde-abrir-usa";

// ─── FIPS → State Abbreviation mapping ───────────────────────────────────────
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

// Protected cron endpoint
// Authorization: Bearer <CRON_SECRET>
// Recommended schedule: quarterly (every 3 months)
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: Record<string, unknown> = {};
  const supabase = createServerClient();
  const startedAt = Date.now();

  // ── STEP 1: Fetch demographics from Census Bureau API (ACS 1-Year) ─────────
  try {
    const censusUrl =
      "https://api.census.gov/data/2022/acs/acs1?" +
      "get=NAME,B19013_001E,B01003_001E,B01002_001E" +
      "&for=state:*";

    const res = await fetch(censusUrl, {
      signal: AbortSignal.timeout(30000),
      headers: { "User-Agent": "OdontoDataBot/1.0" },
      next: { revalidate: 0 },
    });

    if (!res.ok) throw new Error(`Census API ${res.status}`);

    const rows = (await res.json()) as string[][];
    const [, ...data] = rows; // skip header row
    // cols: NAME, medianIncome (B19013), population (B01003), medianAge (B01002), fips

    let updatedCount = 0;
    for (const row of data) {
      const [, medianIncomeRaw, populationRaw, , fips] = row;
      const uf = FIPS_TO_UF[fips];
      if (!uf) continue;

      const populacao = parseInt(populationRaw);
      const medianaRenda = parseInt(medianIncomeRaw);
      if (isNaN(populacao) || isNaN(medianaRenda)) continue;

      const { error } = await supabase
        .from("onde_abrir_estados_usa")
        .update({ populacao, mediana_renda: medianaRenda })
        .eq("uf", uf);

      if (!error) updatedCount++;
    }

    results.census = `Updated ${updatedCount} states with population + median income`;
  } catch (e) {
    results.census_error = String(e);
  }

  // ── STEP 2: Recompute opportunity scores from current factor values ─────────
  try {
    const { data: estados, error } = await supabase
      .from("onde_abrir_estados_usa")
      .select(
        "uf,dentistas_por_100k,pct_sem_seguro_dental,mediana_renda," +
        "crescimento_pop_pct,hpsa_count,medicaid_idx,penetracao_dso,custo_aluguel_idx"
      );

    if (error || !estados) throw new Error(error?.message ?? "No data");

    let recomputedCount = 0;
    for (const state of (estados as unknown as Record<string, unknown>[])) {
      const score = computeScoreUSA({
        dentistas_por_100k:    Number(state["dentistas_por_100k"])    || 80,
        pct_sem_seguro_dental: Number(state["pct_sem_seguro_dental"]) || 73,
        mediana_renda:         Number(state["mediana_renda"])         || 65000,
        crescimento_pop_pct:   Number(state["crescimento_pop_pct"])   || 1,
        hpsa_count:            Number(state["hpsa_count"])            || 30,
        medicaid_idx:          Number(state["medicaid_idx"])          || 55,
        penetracao_dso:        Number(state["penetracao_dso"])        || 22,
        custo_aluguel_idx:     Number(state["custo_aluguel_idx"])     || 100,
      });

      const classificacao = classificarScoreUSA(score);

      const { error: upErr } = await supabase
        .from("onde_abrir_estados_usa")
        .update({
          score_oportunidade: score,
          classificacao,
          atualizado_em: new Date().toISOString(),
        })
        .eq("uf", String(state["uf"]));

      if (!upErr) recomputedCount++;
    }

    results.score_recompute = `Recomputed scores for ${recomputedCount} states`;
  } catch (e) {
    results.score_recompute_error = String(e);
  }

  // ── STEP 3: Refresh population growth % from Census (5-year ACS) ──────────
  // Note: 5-year pop growth requires comparing 2 ACS vintages — we use a
  // pre-computed approximation from the 1-year estimate delta stored in Supabase.
  // Full implementation would compare current vs 5 years ago and persist delta.
  results.pop_growth_note =
    "Population growth % is refreshed manually each year from Census 5-yr ACS delta";

  return NextResponse.json({
    ok: true,
    pais: "US",
    executedAt: new Date().toISOString(),
    durationMs: Date.now() - startedAt,
    results,
  });
}

// Allow POST for GitHub Actions compatibility
export { GET as POST };
