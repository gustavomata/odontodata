import type { ScrapedItem } from "./types";
import * as cheerio from "cheerio";

const CEBRASPE_URL = "https://www.cebraspe.org.br/concursos";
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "pt-BR,pt;q=0.9",
  "Cache-Control": "no-cache",
};

export async function scrapeCEBRASPE(): Promise<ScrapedItem[]> {
  const res = await fetch(CEBRASPE_URL, { headers: HEADERS, next: { revalidate: 0 } });

  if (!res.ok) {
    throw new Error(`CEBRASPE retornou ${res.status}`);
  }

  const html = await res.text();

  // Verificar se retornou Cloudflare/captcha
  if (html.includes("Checking your browser") || html.includes("challenge-form")) {
    throw new Error("CEBRASPE bloqueou acesso com Cloudflare");
  }

  const $ = cheerio.load(html);
  const items: ScrapedItem[] = [];

  // CEBRASPE usa tabela com classe .table ou linhas de lista de concursos
  // Seletores testados na estrutura real do site
  const selectors = [
    "table.table tbody tr",
    ".lista-concursos .item",
    ".concurso-item",
    "article.concurso",
    ".views-row",
  ];

  let found = false;
  for (const selector of selectors) {
    const els = $(selector);
    if (els.length === 0) continue;
    found = true;

    els.each((_, el) => {
      const text = $(el).text().trim();
      if (!text) return;

      // Filtro por relevância
      const isDentist = /dentist|odontol|cirurgião|dental/i.test(text);
      if (!isDentist) return;

      // Tentar extrair campos
      const titulo = $(el).find("a, .title, .nome, td:first-child").first().text().trim() || text.slice(0, 100);
      const orgao  = $(el).find(".orgao, .entidade, td:nth-child(2)").text().trim();
      const link   = $(el).find("a").first().attr("href");
      const vagas  = $(el).find(".vagas, td:nth-child(3)").text().trim();
      const status = $(el).find(".status, .situacao, td:last-child").text().trim();

      const fullUrl = link
        ? link.startsWith("http")
          ? link
          : `https://www.cebraspe.org.br${link}`
        : undefined;

      items.push({
        fonte: "cebraspe",
        titulo_raw: titulo,
        orgao_raw: orgao,
        url_fonte: fullUrl,
        banca_nome: "CEBRASPE",
        vagas_raw: vagas,
        raw_payload: { titulo, orgao, link: fullUrl, vagas, status, selector },
      });
    });
    break;
  }

  if (!found) {
    // Fallback: buscar qualquer link que mencione dentista na página
    $("a").each((_, el) => {
      const text = $(el).text().trim();
      if (!/dentist|odontol|cirurgião/i.test(text)) return;
      const href = $(el).attr("href");
      items.push({
        fonte: "cebraspe",
        titulo_raw: text,
        url_fonte: href?.startsWith("http") ? href : href ? `https://www.cebraspe.org.br${href}` : undefined,
        banca_nome: "CEBRASPE",
        raw_payload: { text, href, method: "fallback_links" },
      });
    });
  }

  return items;
}
