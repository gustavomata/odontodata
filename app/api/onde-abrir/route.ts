import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import {
  scoreEstadosUSA,
  indicadoresOndeAbrirUSA,
  saturacaoEspecialidadeUSA,
  custosPorRegiaoUSA,
  checklistFatoresUSA,
} from "@/lib/data-onde-abrir-usa";
import {
  scoreOportunidadeMunicipio,
  saturacaoPorEspecialidade,
  rankingEstados,
  indicadoresOndeAbrir,
  criteriosPeso,
} from "@/lib/data-onde-abrir";

// GET /api/onde-abrir?pais=US  or  ?pais=BR
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const pais = (req.nextUrl.searchParams.get("pais") ?? "BR").toUpperCase();

  // ── USA ─────────────────────────────────────────────────────────────────────
  if (pais === "US") {
    try {
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from("onde_abrir_estados_usa")
        .select("*")
        .order("score_oportunidade", { ascending: false });

      if (!error && data && data.length > 0) {
        return NextResponse.json(
          {
            pais: "US",
            source: "live",
            ultimaAtualizacao: data[0]?.atualizado_em ?? null,
            estados: data,
            indicadores: indicadoresOndeAbrirUSA,
            especialidades: saturacaoEspecialidadeUSA,
            custos: custosPorRegiaoUSA,
            checklist: checklistFatoresUSA,
          },
          { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" } }
        );
      }
    } catch {
      // fall through to static fallback
    }

    return NextResponse.json(
      {
        pais: "US",
        source: "static",
        ultimaAtualizacao: null,
        estados: scoreEstadosUSA,
        indicadores: indicadoresOndeAbrirUSA,
        especialidades: saturacaoEspecialidadeUSA,
        custos: custosPorRegiaoUSA,
        checklist: checklistFatoresUSA,
      },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
    );
  }

  // ── BRAZIL ──────────────────────────────────────────────────────────────────
  try {
    const supabase = createServerClient();

    // Fetch top 100 municipalities by opportunity score from Supabase
    const [munRes, estadosRes] = await Promise.all([
      supabase
        .from("municipios_odonto")
        .select(
          "municipio,uf,regiao,populacao,dentistas_total,dentistas_por_hab,renda_per_capita,cobertura_esb,idh,formandos_ano,score_oportunidade,classificacao,atualizado_em"
        )
        .eq("pais", "BR")
        .order("score_oportunidade", { ascending: false })
        .limit(100),
      supabase
        .from("municipios_odonto")
        .select("uf,regiao,score_oportunidade,municipio,populacao")
        .eq("pais", "BR")
        .order("score_oportunidade", { ascending: false })
        .limit(1000),
    ]);

    if (!munRes.error && munRes.data && munRes.data.length > 0) {
      // Compute state ranking from live data
      const stateMap: Record<string, { scores: number[]; municipios: string[]; pct: number }> = {};
      (estadosRes.data ?? []).forEach((m: any) => {
        if (!stateMap[m.uf]) stateMap[m.uf] = { scores: [], municipios: [], pct: 0 };
        stateMap[m.uf].scores.push(m.score_oportunidade ?? 0);
        stateMap[m.uf].municipios.push(m.municipio);
      });

      return NextResponse.json(
        {
          pais: "BR",
          source: "live",
          ultimaAtualizacao: munRes.data[0]?.atualizado_em ?? null,
          municipios: munRes.data,
          indicadores: indicadoresOndeAbrir,
          especialidades: saturacaoPorEspecialidade,
          rankingEstados,
          criteriosPeso,
        },
        { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" } }
      );
    }
  } catch {
    // fall through to static fallback
  }

  return NextResponse.json(
    {
      pais: "BR",
      source: "static",
      ultimaAtualizacao: null,
      municipios: scoreOportunidadeMunicipio,
      indicadores: indicadoresOndeAbrir,
      especialidades: saturacaoPorEspecialidade,
      rankingEstados,
      criteriosPeso,
    },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
  );
}
