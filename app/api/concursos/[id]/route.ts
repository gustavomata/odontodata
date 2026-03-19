import { NextRequest, NextResponse } from "next/server";
import { getConcursoById } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await getConcursoById(id);
    if (!data) return NextResponse.json({ error: "Concurso não encontrado" }, { status: 404 });
    return NextResponse.json({ data });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erro interno";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
