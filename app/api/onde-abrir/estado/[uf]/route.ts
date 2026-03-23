import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { scoreEstadosUSA, computeDimensoesUSA } from "@/lib/data-onde-abrir-usa";
import { getCidadesByUF } from "@/lib/data-onde-abrir-usa-cidades";

export const dynamic = "force-dynamic";

const US_STATE_NAMES: Record<string, string> = {
  AL:"Alabama", AK:"Alaska", AZ:"Arizona", AR:"Arkansas", CA:"California",
  CO:"Colorado", CT:"Connecticut", DE:"Delaware", DC:"District of Columbia",
  FL:"Florida", GA:"Georgia", HI:"Hawaii", ID:"Idaho", IL:"Illinois",
  IN:"Indiana", IA:"Iowa", KS:"Kansas", KY:"Kentucky", LA:"Louisiana",
  ME:"Maine", MD:"Maryland", MA:"Massachusetts", MI:"Michigan", MN:"Minnesota",
  MS:"Mississippi", MO:"Missouri", MT:"Montana", NE:"Nebraska", NV:"Nevada",
  NH:"New Hampshire", NJ:"New Jersey", NM:"New Mexico", NY:"New York",
  NC:"North Carolina", ND:"North Dakota", OH:"Ohio", OK:"Oklahoma", OR:"Oregon",
  PA:"Pennsylvania", RI:"Rhode Island", SC:"South Carolina", SD:"South Dakota",
  TN:"Tennessee", TX:"Texas", UT:"Utah", VT:"Vermont", VA:"Virginia",
  WA:"Washington", WV:"West Virginia", WI:"Wisconsin", WY:"Wyoming",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ uf: string }> }
) {
  const { uf: ufRaw } = await params;
  const uf = ufRaw.toUpperCase();
  const nomeEstado = US_STATE_NAMES[uf];

  if (!nomeEstado) {
    return NextResponse.json({ error: "State not found" }, { status: 404 });
  }

  let estadoData: Record<string, unknown> | null = null;
  let cidadesData = getCidadesByUF(uf);
  let source: "live" | "static" = "static";

  try {
    const supabase = createServerClient();

    // Fetch state-level data
    const { data: estadoRow, error: estadoErr } = await supabase
      .from("onde_abrir_estados_usa")
      .select("*")
      .eq("uf", uf)
      .single();

    if (!estadoErr && estadoRow) {
      estadoData = estadoRow as Record<string, unknown>;
      source = "live";
    }

    // Fetch city-level data
    const { data: cidades, error: cidadesErr } = await supabase
      .from("onde_abrir_cidades_usa")
      .select("*")
      .eq("uf", uf)
      .order("score_oportunidade", { ascending: false });

    if (!cidadesErr && cidades && cidades.length > 0) {
      cidadesData = cidades as typeof cidadesData;
    }
  } catch {
    // fall through to static data
  }

  // Fall back to static state data if needed
  if (!estadoData) {
    const staticEstado = scoreEstadosUSA.find((e) => e.uf === uf);
    if (staticEstado) {
      estadoData = staticEstado as unknown as Record<string, unknown>;
    }
  }

  if (!estadoData) {
    return NextResponse.json({ error: "State data not found" }, { status: 404 });
  }

  // Compute per-dimension scores for radar chart
  const dimensoes = computeDimensoesUSA({
    dentistas_por_100k:    Number(estadoData["dentistas_por_100k"])    || 80,
    pct_sem_seguro_dental: Number(estadoData["pct_sem_seguro_dental"]) || 73,
    mediana_renda:         Number(estadoData["mediana_renda"])         || 65000,
    crescimento_pop_pct:   Number(estadoData["crescimento_pop_pct"])   || 1,
    hpsa_count:            Number(estadoData["hpsa_count"])            || 30,
    medicaid_idx:          Number(estadoData["medicaid_idx"])          || 55,
    penetracao_dso:        Number(estadoData["penetracao_dso"])        || 22,
    custo_aluguel_idx:     Number(estadoData["custo_aluguel_idx"])     || 100,
  });

  // Sort cities: best opportunities first
  const cidadesOrdenadas = [...cidadesData].sort(
    (a, b) => b.score_oportunidade - a.score_oportunidade
  );

  return NextResponse.json(
    {
      uf,
      nomeEstado,
      source,
      estado: estadoData,
      dimensoes,
      cidades: cidadesOrdenadas,
      totalCidades: cidadesOrdenadas.length,
      hspaCidades: cidadesOrdenadas.filter((c) => c.hpsa).length,
      topOportunidade: cidadesOrdenadas[0] ?? null,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    }
  );
}
