import { NextRequest, NextResponse } from "next/server";
import { listConcursos } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const status = searchParams.get("status") ?? undefined;
  const uf     = searchParams.get("uf") ?? undefined;
  const search = searchParams.get("q") ?? undefined;
  const limit  = Number(searchParams.get("limit") ?? 100);

  try {
    const data = await listConcursos({ status, uf, search, limit });
    return NextResponse.json({ data, count: data.length }, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erro interno";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
