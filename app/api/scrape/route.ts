import { NextRequest, NextResponse } from "next/server";
import { runScrape } from "@/lib/scraper";

export const dynamic = "force-dynamic";

// Trigger manual de scrape — apenas admin (protegido pelo middleware)
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const daysBack = Number(body.daysBack ?? 7);

  try {
    const result = await runScrape(daysBack);
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
