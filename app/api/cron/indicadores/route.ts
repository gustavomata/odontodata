import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { scrapeCFO } from "@/lib/scraper/cfo-scraper";

// Protected cron endpoint — called daily by GitHub Actions or Vercel Cron
// Authorization: Bearer <CRON_SECRET>
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: Record<string, string> = {};
  const supabase = createServerClient();

  // ── Brazil: scrape CFO live ──────────────────────────────────────────────
  try {
    const cfo = await scrapeCFO();
    if (cfo && cfo.totalDentistas > 0) {
      const { error } = await supabase
        .from("pais_indicadores")
        .update({
          total_dentistas: cfo.totalDentistas,
          dentistas_ativos: cfo.dentistasAtivos,
          ultima_atualizacao: new Date().toISOString(),
        })
        .eq("pais", "BR");

      results.BR = error ? `error: ${error.message}` : `updated: ${cfo.totalDentistas} dentists`;
    } else {
      results.BR = "scrape returned null — skipped";
    }
  } catch (e) {
    results.BR = `exception: ${e}`;
  }

  // ── Other countries: timestamp refresh only (data updated manually/quarterly) ──
  // In production, add scrapers for GDC, ONCD, CIHI, MHLW APIs here
  const otherCountries = ["US", "DE", "AU", "UK", "FR", "CA", "JP"];
  for (const pais of otherCountries) {
    const { error } = await supabase
      .from("pais_indicadores")
      .update({ ultima_atualizacao: new Date().toISOString() })
      .eq("pais", pais);
    results[pais] = error ? `error: ${error.message}` : "timestamp refreshed";
  }

  return NextResponse.json({
    ok: true,
    executedAt: new Date().toISOString(),
    results,
  });
}

export async function POST(req: NextRequest) {
  return GET(req);
}
