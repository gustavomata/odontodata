import { NextRequest, NextResponse } from "next/server";
import { runScrape } from "@/lib/scraper";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Vercel: máx 60s em hobby tier

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const daysBack = Number(req.nextUrl.searchParams.get("days") ?? 2);

  try {
    console.log("[CRON] Iniciando scrape...");
    const result = await runScrape(daysBack);
    console.log("[CRON] Concluído:", result);
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[CRON] Erro:", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

// GitHub Actions pode usar GET ou POST
export { GET as POST };
