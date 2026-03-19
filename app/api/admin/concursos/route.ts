import { NextRequest, NextResponse } from "next/server";
import { approveQueueItem, rejectQueueItem, upsertConcurso, getPendingQueue, getQueueStats } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [queue, stats] = await Promise.all([getPendingQueue(), getQueueStats()]);
    return NextResponse.json({ queue, stats });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erro";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action, queueId, concurso, notes } = body;

  try {
    if (action === "approve") {
      if (!concurso) return NextResponse.json({ error: "concurso obrigatório" }, { status: 400 });
      await upsertConcurso(concurso);
      if (queueId) await approveQueueItem(Number(queueId), concurso.id);
      return NextResponse.json({ ok: true, id: concurso.id });
    }

    if (action === "reject") {
      if (!queueId) return NextResponse.json({ error: "queueId obrigatório" }, { status: 400 });
      await rejectQueueItem(Number(queueId), notes ?? "");
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Ação desconhecida" }, { status: 400 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erro";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
