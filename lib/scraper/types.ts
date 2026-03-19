export interface ScrapedItem {
  fonte: "dou" | "cebraspe" | "fgv" | "vunesp" | "manual";
  titulo_raw: string;
  orgao_raw?: string;
  cargo_raw?: string;
  url_fonte?: string;
  data_publicacao?: string;
  raw_payload: Record<string, unknown>;
  // Campos parcialmente parseados
  uf?: string;
  banca_nome?: string;
  vagas_raw?: string;
  inscricao_fim_raw?: string;
}

export interface ScrapeResult {
  total: number;
  bySource: Record<string, number>;
  errors: string[];
  durationMs: number;
}
