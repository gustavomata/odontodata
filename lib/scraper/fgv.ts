import type { ScrapedItem } from "./types";
import * as cheerio from "cheerio";

const FGV_URL = "https://fgvprojetos.fgv.br/concursos-e-selecoes";
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "pt-BR,pt;q=0.9",
};

export async function scrapeFGV(): Promise<ScrapedItem[]> {
  const res = await fetch(FGV_URL, { headers: HEADERS, next: { revalidate: 0 } });

  if (!res.ok) throw new Error(`FGV retornou ${res.status}`);

  const html = await res.text();
  const $ = cheerio.load(html);
  const items: ScrapedItem[] = [];

  // FGV Projetos usa .views-row ou similar
  const selectors = [".views-row", ".node--type-concurso", ".concurso-row", "article", ".item-list li"];

  for (const selector of selectors) {
    const els = $(selector);
    if (els.length === 0) continue;

    els.each((_, el) => {
      const text = $(el).text().trim();
      if (!text || !/dentist|odontol|cirurgião|dental/i.test(text)) return;

      const titulo = $(el).find("h2, h3, .title, a").first().text().trim() || text.slice(0, 120);
      const link   = $(el).find("a").first().attr("href");
      const orgao  = $(el).find(".orgao, .field--name-field-orgao").text().trim();
      const data   = $(el).find(".date, .field--name-field-data, time").text().trim();

      items.push({
        fonte: "fgv",
        titulo_raw: titulo,
        orgao_raw: orgao,
        url_fonte: link?.startsWith("http") ? link : link ? `https://fgvprojetos.fgv.br${link}` : undefined,
        banca_nome: "FGV Projetos",
        raw_payload: { titulo, orgao, link, data, selector },
      });
    });
    if (items.length > 0) break;
  }

  return items;
}
