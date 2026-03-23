import { scrapeDOU } from "./dou";
import { scrapeCEBRASPE } from "./cebraspe";
import { scrapeFGV } from "./fgv";
import { scrapeVUNESP } from "./vunesp";
import { addToQueue } from "@/lib/supabase/queries";
import type { ScrapedItem, ScrapeResult } from "./types";

function deduplicateItems(items: ScrapedItem[]): ScrapedItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.url_fonte ?? `${item.fonte}::${item.titulo_raw}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getSinceDate(daysBack = 2): string {
  const d = new Date();
  d.setDate(d.getDate() - daysBack);
  return d.toISOString().split("T")[0];
}

export async function runScrape(daysBack = 2): Promise<ScrapeResult> {
  const startedAt = Date.now();
  const errors: string[] = [];
  const bySource: Record<string, number> = {};
  let total = 0;

  const since = getSinceDate(daysBack);

  const scrapers: Array<[string, () => Promise<ScrapedItem[]>]> = [
    ["dou",      () => scrapeDOU(since)],
    ["cebraspe", () => scrapeCEBRASPE()],
    ["fgv",      () => scrapeFGV()],
    ["vunesp",   () => scrapeVUNESP()],
  ];

  for (const [name, fn] of scrapers) {
    try {
      console.log(`[Scraper] Iniciando: ${name}`);
      const raw = await fn();
      const unique = deduplicateItems(raw);
      console.log(`[Scraper] ${name}: ${raw.length} brutos, ${unique.length} únicos`);

      for (const item of unique) {
        try {
          await addToQueue(item);
        } catch (err) {
          console.error(`[Scraper] Erro ao adicionar à fila (${name}):`, err);
        }
      }

      bySource[name] = unique.length;
      total += unique.length;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[Scraper] Erro em ${name}:`, msg);
      errors.push(`${name}: ${msg}`);
      bySource[name] = 0;
    }
  }

  return { total, bySource, errors, durationMs: Date.now() - startedAt };
}
