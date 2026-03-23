import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { cidadesUSA } from "@/lib/data-onde-abrir-usa-cidades";

// GET /api/onde-abrir/cidades
// Paginated city-level opportunity data.
// Tries Supabase first, falls back to static 517-city dataset.
//
// Query params:
//   page     = 1        (1-based)
//   limit    = 50       (max 200)
//   uf       = TX       (filter by state)
//   tipo     = Metro    (filter by city type)
//   search   = Houston  (fuzzy name search)
//   sort     = score_oportunidade (column)
//   dir      = desc     (asc | desc)
//   min_pop  = 10000    (minimum population)
//   hpsa     = true     (only HPSA cities)
//   lat_min, lat_max, lng_min, lng_max  (viewport bounding box)

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const page = Math.max(1, parseInt(sp.get("page") ?? "1"));
  const limit = Math.min(200, Math.max(1, parseInt(sp.get("limit") ?? "50")));
  const uf = sp.get("uf")?.toUpperCase() || null;
  const tipo = sp.get("tipo") || null;
  const search = sp.get("search")?.trim() || null;
  const sort = sp.get("sort") || "score_oportunidade";
  const dir = sp.get("dir") === "asc" ? "asc" : "desc";
  const minPop = parseInt(sp.get("min_pop") ?? "0") || 0;
  const hpsaOnly = sp.get("hpsa") === "true";
  const latMin = parseFloat(sp.get("lat_min") ?? "");
  const latMax = parseFloat(sp.get("lat_max") ?? "");
  const lngMin = parseFloat(sp.get("lng_min") ?? "");
  const lngMax = parseFloat(sp.get("lng_max") ?? "");
  const hasViewport = !isNaN(latMin) && !isNaN(latMax) && !isNaN(lngMin) && !isNaN(lngMax);

  // ── Try Supabase first ────────────────────────────────────────────────────
  try {
    const supabase = createServerClient();
    let query = supabase
      .from("onde_abrir_cidades_usa")
      .select("*", { count: "exact" });

    if (uf) query = query.eq("uf", uf);
    if (tipo) query = query.eq("tipo", tipo);
    if (hpsaOnly) query = query.eq("hpsa", true);
    if (minPop > 0) query = query.gte("populacao", minPop);
    if (search) query = query.ilike("nome", `%${search}%`);

    if (hasViewport) {
      query = query
        .gte("lat", latMin).lte("lat", latMax)
        .gte("lng", lngMin).lte("lng", lngMax);
    }

    // Sorting
    const ascending = dir === "asc";
    query = query.order(sort, { ascending });

    // Pagination
    const from = (page - 1) * limit;
    query = query.range(from, from + limit - 1);

    const { data, count, error } = await query;

    if (!error && data && data.length > 0) {
      return NextResponse.json(
        {
          source: "live",
          total: count ?? data.length,
          page,
          limit,
          data,
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
          },
        }
      );
    }
  } catch {
    // Fall through to static
  }

  // ── Fallback: static dataset ──────────────────────────────────────────────
  let list = [...cidadesUSA];

  if (uf) list = list.filter((c) => c.uf === uf);
  if (tipo) list = list.filter((c) => c.tipo === tipo);
  if (hpsaOnly) list = list.filter((c) => c.hpsa);
  if (minPop > 0) list = list.filter((c) => c.populacao >= minPop);
  if (search) {
    const s = search.toLowerCase();
    list = list.filter((c) =>
      c.nome.toLowerCase().includes(s) || c.uf.toLowerCase().includes(s)
    );
  }
  if (hasViewport) {
    list = list.filter((c) =>
      c.lat != null && c.lng != null &&
      c.lat >= latMin && c.lat <= latMax &&
      c.lng >= lngMin && c.lng <= lngMax
    );
  }

  // Sort
  const sortKey = sort as keyof (typeof list)[0];
  list.sort((a, b) => {
    const av = a[sortKey] as number | string ?? 0;
    const bv = b[sortKey] as number | string ?? 0;
    const cmp = av < bv ? -1 : av > bv ? 1 : 0;
    return dir === "asc" ? cmp : -cmp;
  });

  const total = list.length;
  const from = (page - 1) * limit;
  const paged = list.slice(from, from + limit);

  return NextResponse.json(
    {
      source: "static",
      total,
      page,
      limit,
      data: paged,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    }
  );
}
