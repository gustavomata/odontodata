import type { ScrapedItem } from "./types";

// API do Querido Diário (Open Knowledge Brasil)
// Indexa todos os Diários Oficiais do Brasil de forma estruturada
const QD_API = "https://queridodiario.ok.org.br/api/gazettes";

// Palavras-chave para buscar editais de concurso para dentistas
const KEYWORDS = "cirurgião-dentista concurso público edital";

// Regex para extração de dados do texto do edital
const RE_ORGAO = /(?:Prefeitura\s+(?:Municipal\s+)?de\s+\w[\w\s]+?|Tribunal[\w\s]+?|Universidade[\w\s]+?|Instituto[\w\s]+?|Secretaria[\w\s]+?)(?=,|\.|–|-|\n|inscreve|abre|torna)/i;
const RE_CARGO = /(?:cirurgião[-\s]dentista|odontólogo|dentista|odontologista)[\w\s,/-]*/i;
const RE_VAGAS = /(\d+)\s*(?:vaga[s]?|posto[s]?)/i;
const RE_SALARIO = /R\$\s*([\d.,]+)/i;
const RE_INSCRICAO = /inscri[çc][oõ]es?.*?(?:até|de)\s+(\d{1,2}[\/\.\-]\d{1,2}[\/\.\-]\d{2,4})/i;
const RE_BANCA = /(?:CEBRASPE|FGV|VUNESP|IBFC|FCC|FUMARC|IADES|Quadrix|AOCP|CONSULPLAN)/i;

function extractText(excerpts: string[]): string {
  return excerpts.join(" ").replace(/\s+/g, " ");
}

function extractOrgao(text: string): string {
  const m = text.match(RE_ORGAO);
  return m?.[0]?.trim().replace(/\s{2,}/g, " ") ?? "";
}

function extractCargo(text: string): string {
  const m = text.match(RE_CARGO);
  return m?.[0]?.trim() ?? "Cirurgião-Dentista";
}

function extractVagas(text: string): string {
  const m = text.match(RE_VAGAS);
  return m ? m[1] : "";
}

function extractBanca(text: string): string {
  const m = text.match(RE_BANCA);
  return m?.[0] ?? "";
}

export async function scrapeDOU(since: string): Promise<ScrapedItem[]> {
  const params = new URLSearchParams({
    territory_ids: "0",       // 0 = Diário Oficial da União (federal)
    querystring: KEYWORDS,
    published_since: since,
    size: "20",
    offset: "0",
  });

  const res = await fetch(`${QD_API}?${params}`, {
    headers: { Accept: "application/json", "User-Agent": "OdontoDataBot/1.0" },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`DOU API (Querido Diário) retornou ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  const gazettes: any[] = data.gazettes ?? [];
  const items: ScrapedItem[] = [];

  for (const gazette of gazettes) {
    const excerpts: string[] = gazette.excerpts ?? [];
    const text = extractText(excerpts);

    // Filtro: só interessa se menciona dentista/odontologia + concurso
    const isDentist = /dentist|odontol|cirurgião/i.test(text);
    const isConcurso = /concurso|edital|sele[çc][aã]o|vaga/i.test(text);
    if (!isDentist || !isConcurso) continue;

    const orgao = extractOrgao(text);
    const cargo = extractCargo(text);
    const banca = extractBanca(text);
    const vagas = extractVagas(text);

    items.push({
      fonte: "dou",
      titulo_raw: `DOU ${gazette.date} — ${orgao || "Órgão"}: ${cargo}`,
      orgao_raw: orgao,
      cargo_raw: cargo,
      url_fonte: gazette.url ?? gazette.file_url,
      data_publicacao: gazette.date,
      banca_nome: banca || "A confirmar",
      vagas_raw: vagas,
      raw_payload: {
        date: gazette.date,
        url: gazette.url,
        file_url: gazette.file_url,
        txt_url: gazette.txt_url,
        excerpts,
        orgao_extraido: orgao,
        cargo_extraido: cargo,
        vagas_extraidas: vagas,
        banca_extraida: banca,
        salario_extraido: text.match(RE_SALARIO)?.[1] ?? "",
        inscricao_extraida: text.match(RE_INSCRICAO)?.[1] ?? "",
      },
    });
  }

  return items;
}
