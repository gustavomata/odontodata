import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import {
  indicadoresGerais as indicadoresBR,
  indicadoresGeraisUSA,
  indicadoresGeraisDE,
  indicadoresGeraisUK,
  indicadoresGeraisFR,
  indicadoresGeraisCA,
  indicadoresGeraisJP,
} from "@/lib/indicadores-static";

// GET /api/indicadores?pais=BR
// Returns live indicators from Supabase, falling back to static data
export async function GET(req: NextRequest) {
  const pais = req.nextUrl.searchParams.get("pais")?.toUpperCase();

  try {
    const supabase = createServerClient();
    let query = supabase.from("pais_indicadores").select("*");
    if (pais) query = query.eq("pais", pais);
    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      // Return static fallback
      if (pais) {
        return NextResponse.json({ data: getStaticFallback(pais), source: "static" }, {
          headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
        });
      }
      return NextResponse.json({ data: getAllStaticFallbacks(), source: "static" }, {
        headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
      });
    }

    const result = pais ? data[0] : data;
    return NextResponse.json({ data: result, source: "live", ultimaAtualizacao: data[0]?.ultima_atualizacao }, {
      headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=600" },
    });
  } catch {
    const fallback = pais ? getStaticFallback(pais) : getAllStaticFallbacks();
    return NextResponse.json({ data: fallback, source: "static" }, {
      headers: { "Cache-Control": "public, max-age=60" },
    });
  }
}

function getStaticFallback(pais: string) {
  const map: Record<string, object> = {
    BR: indicadoresBR,
    US: indicadoresGeraisUSA,
    DE: indicadoresGeraisDE,
    UK: indicadoresGeraisUK,
    FR: indicadoresGeraisFR,
    CA: indicadoresGeraisCA,
    JP: indicadoresGeraisJP,
  };
  return map[pais] ?? null;
}

function getAllStaticFallbacks() {
  return ["BR","US","DE","AU","UK","FR","CA","JP"].map((pais) => ({
    pais,
    ...getStaticFallback(pais),
  }));
}
