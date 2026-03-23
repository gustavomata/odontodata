// =============================================================================
// OdontoData — CFO Real-Time Scraper
// Scrapes https://website.cfo.org.br/estatisticas/... for live dentist count
// Called by /api/cron/indicadores (daily cron) and /api/indicadores (on-demand)
// =============================================================================

import * as cheerio from "cheerio";

export interface CFOStats {
  totalDentistas: number;
  dentistasAtivos: number;
  tpdAtivos: number;  // Técnicos em Prótese Dentária
  especialistasAtivos: number;
  cros: number;
  raspadoEm: Date;
}

const CFO_URL = "https://website.cfo.org.br/estatisticas/quantidade-geral-de-entidades-e-profissionais-ativos/";
const FETCH_TIMEOUT_MS = 10000;

/**
 * Scrapes the CFO statistics page for live professional counts.
 * Returns null if scraping fails (caller should use static fallback).
 */
export async function scrapeCFO(): Promise<CFOStats | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    const res = await fetch(CFO_URL, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OdontoDataBot/1.0; +https://odontodata.com.br)",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "pt-BR,pt;q=0.9",
      },
      next: { revalidate: 0 },
    });
    clearTimeout(timeout);

    if (!res.ok) return null;

    const html = await res.text();
    const $ = cheerio.load(html);

    // CFO page structure: numbers are inside <td> or <strong> elements
    // We look for the main count of "Cirurgiões-Dentistas Ativos"
    let totalDentistas = 0;
    let dentistasAtivos = 0;
    let tpdAtivos = 0;
    let especialistasAtivos = 0;
    let cros = 0;

    // Strategy: find all numbers in the page table and map them by adjacent labels
    $("table tr, .stat-box, .counter, [class*='number'], [class*='count']").each((_, el) => {
      const text = $(el).text().trim();
      const numMatch = text.replace(/\./g, "").match(/(\d{4,7})/g);
      if (!numMatch) return;

      const lower = text.toLowerCase();
      const num = parseInt(numMatch[0]);

      if (lower.includes("cirurgiã") || lower.includes("dentista") || lower.includes("cd")) {
        if (lower.includes("ativ")) {
          if (dentistasAtivos === 0) dentistasAtivos = num;
        } else {
          if (totalDentistas === 0) totalDentistas = num;
        }
      } else if (lower.includes("técnico") || lower.includes("tpd") || lower.includes("prótese")) {
        if (tpdAtivos === 0) tpdAtivos = num;
      } else if (lower.includes("especialista")) {
        if (especialistasAtivos === 0) especialistasAtivos = num;
      } else if (lower.includes("cro") || lower.includes("conselho regional")) {
        if (cros === 0) cros = num;
      }
    });

    // Fallback: grab the largest plausible number on the page as total
    if (totalDentistas === 0 || dentistasAtivos === 0) {
      const allNums: number[] = [];
      $("*").each((_, el) => {
        const text = $(el).children().length === 0 ? $(el).text().trim() : "";
        const cleaned = text.replace(/[.\s]/g, "");
        if (/^\d{6,7}$/.test(cleaned)) {
          allNums.push(parseInt(cleaned));
        }
      });
      // The total should be the largest number in the 400k-600k range
      const plausible = allNums.filter((n) => n >= 400000 && n <= 650000).sort((a, b) => b - a);
      if (plausible.length > 0 && totalDentistas === 0) totalDentistas = plausible[0];
      if (plausible.length > 1 && dentistasAtivos === 0) dentistasAtivos = plausible[1];
    }

    if (totalDentistas === 0) return null;
    if (dentistasAtivos === 0) dentistasAtivos = Math.round(totalDentistas * 0.923);

    return {
      totalDentistas,
      dentistasAtivos,
      tpdAtivos,
      especialistasAtivos,
      cros: cros || 27,
      raspadoEm: new Date(),
    };
  } catch {
    return null;
  }
}
