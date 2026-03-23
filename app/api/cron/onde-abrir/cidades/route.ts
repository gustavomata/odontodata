import { NextRequest, NextResponse } from "next/server";

// Orchestrator — triggers per-state city workers sequentially in batches.
// GET /api/cron/onde-abrir/cidades
// Optional: ?states=FL,TX,CA (process only specific states)
//           ?concurrency=3    (parallel workers, default 3)

export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 min — needs Vercel Pro for full run

const ALL_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL",
  "GA","HI","ID","IL","IN","IA","KS","KY","LA","ME",
  "MD","MA","MI","MN","MS","MO","MT","NE","NV","NH",
  "NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI",
  "SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startedAt = Date.now();
  const statesParam = req.nextUrl.searchParams.get("states");
  const concurrency = Math.min(5, Math.max(1,
    parseInt(req.nextUrl.searchParams.get("concurrency") ?? "3")
  ));

  const states = statesParam
    ? statesParam.split(",").map((s) => s.trim().toUpperCase()).filter((s) => ALL_STATES.includes(s))
    : ALL_STATES;

  const baseUrl = req.nextUrl.origin;
  const results: Array<{ uf: string; ok: boolean; durationMs?: number; error?: string; cities?: number }> = [];

  // Process in batches of `concurrency`
  for (let i = 0; i < states.length; i += concurrency) {
    const batch = states.slice(i, i + concurrency);

    const batchResults = await Promise.allSettled(
      batch.map(async (uf) => {
        const url = `${baseUrl}/api/cron/onde-abrir/cidades/${uf}`;
        try {
          const res = await fetch(url, {
            method: "GET",
            headers: { Authorization: `Bearer ${process.env.CRON_SECRET}` },
            signal: AbortSignal.timeout(55000), // just under Vercel's 60s per-worker
          });
          const json = await res.json();
          return {
            uf,
            ok: json.ok ?? false,
            durationMs: json.durationMs,
            cities: json.census_places ?? json.upserted ?? 0,
            error: json.fatal_error ?? json.upsert_error,
          };
        } catch (e) {
          return { uf, ok: false, error: String(e) };
        }
      })
    );

    for (const r of batchResults) {
      if (r.status === "fulfilled") {
        results.push(r.value);
      } else {
        results.push({ uf: batch[batchResults.indexOf(r)] ?? "?", ok: false, error: r.reason?.message ?? String(r.reason) });
      }
    }
  }

  const succeeded = results.filter((r) => r.ok).length;
  const totalCities = results.reduce((sum, r) => sum + (r.cities ?? 0), 0);

  return NextResponse.json({
    ok: succeeded > 0,
    summary: {
      statesProcessed: states.length,
      succeeded,
      failed: states.length - succeeded,
      totalCitiesUpserted: totalCities,
      durationMs: Date.now() - startedAt,
    },
    results,
  });
}

export { GET as POST };
