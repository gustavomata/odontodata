import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export interface MunicipioOdonto {
  codigo_ibge: number;
  municipio: string;
  uf: string;
  regiao: string;
  lat: number;
  lng: number;
  populacao: number | null;
  dentistas_total: number;
  dentistas_por_hab: number | null;
  score_oportunidade: number | null;
  classificacao: string | null;
  renda_per_capita: number | null;
  idh: number | null;
  cobertura_esb: number | null;
  fonte_dentistas: string;
  atualizado_em: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const pais = (searchParams.get("pais") ?? "BR").toUpperCase();
  const uf = searchParams.get("uf");
  const regiao = searchParams.get("regiao");
  const minPop = Number(searchParams.get("min_pop") ?? 0);
  const limit = Math.min(Number(searchParams.get("limit") ?? 2000), 5000);
  const offset = Number(searchParams.get("offset") ?? 0);

  try {
    const supabase = createServerClient();

    let query = supabase
      .from("municipios_odonto")
      .select(
        "codigo_ibge,municipio,uf,regiao,lat,lng,populacao,dentistas_total,dentistas_por_hab,score_oportunidade,classificacao,renda_per_capita,idh,cobertura_esb,fonte_dentistas,atualizado_em"
      )
      .eq("pais", pais)
      .order("populacao", { ascending: false })
      .range(offset, offset + limit - 1);

    if (uf) query = query.eq("uf", uf.toUpperCase());
    if (regiao) query = query.eq("regiao", regiao);
    if (minPop > 0) query = query.gte("populacao", minPop);

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json(
      { data: data ?? [], count: data?.length ?? 0 },
      {
        headers: {
          // Cache de 1h no edge, revalidar em background a cada 4h
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=14400",
        },
      }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erro interno";
    console.error("[/api/municipios]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
