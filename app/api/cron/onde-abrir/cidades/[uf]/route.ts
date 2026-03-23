import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import {
  fetchCensusPlaces,
  fetchPopulationGrowth,
  classifyCityType,
  UF_TO_FIPS,
} from "@/lib/census-client";
import { fetchDentistsByState, matchCityToNPPES } from "@/lib/nppes-client";
import { fetchHPSAByState, isHPSACity } from "@/lib/hrsa-client";
import {
  computeScoreCidadeUSA,
  classificarScoreUSA,
  generateCidadeNota,
  inferEspecialidade,
} from "@/lib/data-onde-abrir-usa";

// Per-state cron worker — processes one state at a time.
// Called by the orchestrator or directly: GET /api/cron/onde-abrir/cidades/TX
// Expected to complete within 60s (Vercel hobby timeout).

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ uf: string }> }
) {
  // Auth check
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { uf: ufRaw } = await params;
  const uf = ufRaw.toUpperCase();
  const fips = UF_TO_FIPS[uf];
  if (!fips) {
    return NextResponse.json({ error: `Unknown state: ${uf}` }, { status: 400 });
  }

  const startedAt = Date.now();
  const log: Record<string, unknown> = { uf, fips };

  try {
    const supabase = createServerClient();

    // Get state-level DSO penetration (for city scoring fallback)
    let stateDSO = 20;
    try {
      const { data: stateRow } = await supabase
        .from("onde_abrir_estados_usa")
        .select("penetracao_dso")
        .eq("uf", uf)
        .single();
      if (stateRow?.penetracao_dso) stateDSO = Number(stateRow.penetracao_dso);
    } catch { /* use default */ }

    // ── Step 1: Census places ──────────────────────────────────────────────
    const places = await fetchCensusPlaces(fips, { minPopulation: 10000 });
    log.census_places = places.length;

    if (places.length === 0) {
      return NextResponse.json({
        ok: true, uf, message: "No places found above population threshold",
        durationMs: Date.now() - startedAt,
      });
    }

    // ── Step 2: Population growth ──────────────────────────────────────────
    let growthMap = new Map<string, number>();
    try {
      growthMap = await fetchPopulationGrowth(fips);
      log.growth_data = growthMap.size;
    } catch (e) {
      log.growth_error = String(e);
    }

    // ── Step 3: NPPES dentist counts ───────────────────────────────────────
    let nppesMap = new Map<string, number>();
    try {
      nppesMap = await fetchDentistsByState(uf);
      log.nppes_cities = nppesMap.size;
      log.nppes_total_dentists = Array.from(nppesMap.values()).reduce((a, b) => a + b, 0);
    } catch (e) {
      log.nppes_error = String(e);
    }

    // ── Step 4: HRSA HPSA ─────────────────────────────────────────────────
    let hpsaData = { hpsaNames: new Set<string>(), hpsaCounties: new Set<string>(), hpsaScores: new Map<string, number>() };
    try {
      hpsaData = await fetchHPSAByState(uf);
      log.hpsa_designations = hpsaData.hpsaNames.size + hpsaData.hpsaCounties.size;
    } catch (e) {
      log.hpsa_error = String(e);
    }

    // ── Step 5: Merge + Score + Upsert ─────────────────────────────────────
    const rows: Array<Record<string, unknown>> = [];

    for (const place of places) {
      const dentistas = matchCityToNPPES(place.cleanName, nppesMap);
      const dentistas_por_100k = place.populacao > 0
        ? Math.round((dentistas / place.populacao) * 100000 * 10) / 10
        : 0;
      const hpsa = isHPSACity(place.cleanName, null, hpsaData);
      const crescimento = growthMap.get(place.fipsFull) ?? 0;
      const tipo = classifyCityType(place.populacao, place.cleanName);

      const score = computeScoreCidadeUSA({
        dentistas_por_100k,
        mediana_renda: place.medianaRenda ?? 55000,
        hpsa,
        penetracao_dso: stateDSO,
        crescimento_pop_pct: crescimento,
        populacao: place.populacao,
      });

      const classificacao = classificarScoreUSA(score);
      const especialidade = inferEspecialidade({
        tipo,
        populacao: place.populacao,
        dentistas_por_100k,
        mediana_renda: place.medianaRenda ?? 55000,
      });

      const nota = generateCidadeNota({
        nome: place.cleanName,
        tipo,
        populacao: place.populacao,
        dentistas_por_100k,
        mediana_renda: place.medianaRenda ?? 55000,
        hpsa,
        crescimento_pop_pct: crescimento,
        penetracao_dso: stateDSO,
        score_oportunidade: score,
      });

      rows.push({
        uf,
        fips_place: place.fipsFull,
        nome: place.cleanName,
        tipo,
        populacao: place.populacao,
        mediana_renda: place.medianaRenda,
        crescimento_pop_pct: crescimento,
        dentistas_total: dentistas > 0 ? dentistas : null,
        dentistas_por_100k: dentistas > 0 ? dentistas_por_100k : null,
        hpsa,
        penetracao_dso: stateDSO,
        especialidade_mais_carente: especialidade,
        score_oportunidade: score,
        classificacao,
        nota,
        // lat/lng will be set from Gazetteer in a future phase
        fonte_dados: "Census ACS 2022, NPPES, HRSA HPSA",
        atualizado_em: new Date().toISOString(),
      });
    }

    // Batch upsert (Supabase supports up to 1000 rows per call)
    let upserted = 0;
    const BATCH = 500;
    for (let i = 0; i < rows.length; i += BATCH) {
      const batch = rows.slice(i, i + BATCH);
      const { error } = await supabase
        .from("onde_abrir_cidades_usa")
        .upsert(batch, { onConflict: "uf,fips_place" });

      if (error) {
        log.upsert_error = error.message;
        break;
      }
      upserted += batch.length;
    }

    log.upserted = upserted;
    log.durationMs = Date.now() - startedAt;

    return NextResponse.json({ ok: true, ...log });
  } catch (e) {
    log.fatal_error = String(e);
    log.durationMs = Date.now() - startedAt;
    return NextResponse.json({ ok: false, ...log }, { status: 500 });
  }
}

export { GET as POST };
