import type { ScrapedItem } from "./types";
import * as cheerio from "cheerio";

const VUNESP_URL = "https://www.vunesp.com.br";
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "pt-BR,pt;q=0.9",
};

export async function scrapeVUNESP(): Promise<ScrapedItem[]> {
  const res = await fetch(VUNESP_URL, { headers: HEADERS, next: { revalidate: 0 } });

  if (!res.ok) throw new Error(`VUNESP retornou ${res.status}`);

  const html = await res.text();
  const $ = cheerio.load(html);
  const items: ScrapedItem[] = [];

  // VUNESP lista concursos na página inicial com links
  const selectors = [".concurso", ".lista-concurso tr", ".panel-body .row", "table tbody tr", ".box-concurso"];

  for (const selector of selectors) {
    const els = $(selector);
    if (els.length === 0) continue;

    els.each((_, el) => {
      const text = $(el).text().trim();
      if (!text || !/dentist|odontol|cirurgião|dental/i.test(text)) return;

      const titulo = $(el).find("a, strong, td:first-child").first().text().trim() || text.slice(0, 120);
      const link   = $(el).find("a").first().attr("href");
      const orgao  = $(el).find("td:nth-child(2), .orgao").text().trim();

      items.push({
        fonte: "vunesp",
        titulo_raw: titulo,
        orgao_raw: orgao,
        url_fonte: link?.startsWith("http") ? link : link ? `https://www.vunesp.com.br${link}` : undefined,
        banca_nome: "VUNESP",
        raw_payload: { titulo, orgao, link, selector },
      });
    });
    if (items.length > 0) break;
  }

  // Fallback: links gerais
  if (items.length === 0) {
    $("a").each((_, el) => {
      const text = $(el).text().trim();
      if (!/dentist|odontol|cirurgião/i.test(text)) return;
      const href = $(el).attr("href");
      items.push({
        fonte: "vunesp",
        titulo_raw: text,
        url_fonte: href?.startsWith("http") ? href : href ? `https://www.vunesp.com.br${href}` : undefined,
        banca_nome: "VUNESP",
        raw_payload: { text, href, method: "fallback_links" },
      });
    });
  }

  return items;
}
