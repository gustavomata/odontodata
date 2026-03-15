// =============================================================================
// OdontoData - SB Brasil: Pesquisa Nacional de Saúde Bucal
// Fontes: MS/SVS, SB Brasil 2003, SB Brasil 2010, SB Brasil 2023
// =============================================================================

export interface EdicaoSBBrasil {
  ano: number;
  amostra_total: number;
  municipios_pesquisados: number;
  faixas_etarias: string[];
  principais_achados: string[];
}

export interface CPODPorIdade {
  faixa_etaria: string;
  edicao: number;
  cpod_total: number;
  componente_cariado: number;
  componente_perdido: number;
  componente_obturado: number;
  classificacao_oms: "Muito Baixo" | "Baixo" | "Moderado" | "Alto" | "Muito Alto";
}

export interface PrevalenciaCondicao {
  condicao: string;
  grupo_etario: string;
  prevalencia_2003_pct: number;
  prevalencia_2010_pct: number;
  prevalencia_2023_pct: number;
  variacao_2003_2023_pp: number;
  tendencia: "Melhora significativa" | "Melhora moderada" | "Estável" | "Piora";
}

export interface AcessoServico {
  indicador: string;
  valor_2003: number;
  valor_2010: number;
  valor_2023: number;
  unidade: string;
}

export interface DesigualdadeSocial {
  determinante: string;
  categoria_favorecida: string;
  valor_favorecido: number;
  categoria_desfavorecida: string;
  valor_desfavorecido: number;
  razao_desigualdade: number;
  indicador_usado: string;
}

export interface DadoRegional {
  regiao: string;
  cpod_12_2003: number;
  cpod_12_2010: number;
  cpod_12_2023: number;
  edentulismo_65_2003: number;
  edentulismo_65_2010: number;
  edentulismo_65_2023: number;
  acesso_ultimo_ano_2003: number;
  acesso_ultimo_ano_2010: number;
  acesso_ultimo_ano_2023: number;
}

export interface MetaOMS {
  meta: string;
  descricao: string;
  alvo_2020: string;
  resultado_brasil_2023: string;
  status: "Atingida" | "Parcialmente atingida" | "Não atingida";
}

export const indicadoresSBBrasil = {
  edicaoAtual: "SB Brasil 2023",
  amostraTotal: "32.400",
  reducaoCPOD12anos: "-39.6%",
  reducaoEdentulismo: "-22.8%",
  aindaNuncaDentista_mi: "15.2",
  melhorRegiao: "Sul",
  piorRegiao: "Norte",
  metasOMSAtingidas: "4 de 7",
};

export const edicoesSBBrasil: EdicaoSBBrasil[] = [
  {
    ano: 2003,
    amostra_total: 108921,
    municipios_pesquisados: 250,
    faixas_etarias: ["5 anos", "12 anos", "15-19 anos", "35-44 anos", "65-74 anos"],
    principais_achados: [
      "CPO-D 12 anos: 2.78 (moderado pela OMS)",
      "Edentulismo 65-74: 75.2%",
      "14% nunca foram ao dentista",
      "Enorme desigualdade regional Norte/Nordeste vs Sul/Sudeste",
    ],
  },
  {
    ano: 2010,
    amostra_total: 37519,
    municipios_pesquisados: 177,
    faixas_etarias: ["5 anos", "12 anos", "15-19 anos", "35-44 anos", "65-74 anos"],
    principais_achados: [
      "CPO-D 12 anos: 2.07 (baixo pela OMS) — queda de 25.5%",
      "Edentulismo 65-74: 63.1% — queda de 12.1pp",
      "11% nunca foram ao dentista",
      "Melhora em todas as faixas etárias, mas desigualdades persistem",
    ],
  },
  {
    ano: 2023,
    amostra_total: 32400,
    municipios_pesquisados: 190,
    faixas_etarias: ["5 anos", "12 anos", "15-19 anos", "35-44 anos", "65-74 anos"],
    principais_achados: [
      "CPO-D 12 anos: 1.68 (baixo pela OMS) — queda de 39.6% desde 2003",
      "Edentulismo 65-74: 58.1% — queda de 17.1pp desde 2003",
      "7.8% nunca foram ao dentista (15.2 milhões)",
      "Fluoretação expandiu para 78% da população",
      "Aumento do componente 'obturado' indica maior acesso a tratamento",
    ],
  },
];

export const cpodPorIdade: CPODPorIdade[] = [
  // 5 anos (ceo-d, dentes decíduos)
  { faixa_etaria: "5 anos", edicao: 2003, cpod_total: 2.80, componente_cariado: 1.82, componente_perdido: 0.28, componente_obturado: 0.70, classificacao_oms: "Moderado" },
  { faixa_etaria: "5 anos", edicao: 2010, cpod_total: 2.43, componente_cariado: 1.48, componente_perdido: 0.22, componente_obturado: 0.73, classificacao_oms: "Baixo" },
  { faixa_etaria: "5 anos", edicao: 2023, cpod_total: 2.10, componente_cariado: 1.12, componente_perdido: 0.18, componente_obturado: 0.80, classificacao_oms: "Baixo" },
  // 12 anos
  { faixa_etaria: "12 anos", edicao: 2003, cpod_total: 2.78, componente_cariado: 1.18, componente_perdido: 0.18, componente_obturado: 1.42, classificacao_oms: "Moderado" },
  { faixa_etaria: "12 anos", edicao: 2010, cpod_total: 2.07, componente_cariado: 0.72, componente_perdido: 0.12, componente_obturado: 1.23, classificacao_oms: "Baixo" },
  { faixa_etaria: "12 anos", edicao: 2023, cpod_total: 1.68, componente_cariado: 0.48, componente_perdido: 0.08, componente_obturado: 1.12, classificacao_oms: "Baixo" },
  // 15-19 anos
  { faixa_etaria: "15-19 anos", edicao: 2003, cpod_total: 6.17, componente_cariado: 2.45, componente_perdido: 0.65, componente_obturado: 3.07, classificacao_oms: "Alto" },
  { faixa_etaria: "15-19 anos", edicao: 2010, cpod_total: 4.25, componente_cariado: 1.52, componente_perdido: 0.42, componente_obturado: 2.31, classificacao_oms: "Moderado" },
  { faixa_etaria: "15-19 anos", edicao: 2023, cpod_total: 3.42, componente_cariado: 1.05, componente_perdido: 0.32, componente_obturado: 2.05, classificacao_oms: "Moderado" },
  // 35-44 anos
  { faixa_etaria: "35-44 anos", edicao: 2003, cpod_total: 20.13, componente_cariado: 2.88, componente_perdido: 8.45, componente_obturado: 8.80, classificacao_oms: "Muito Alto" },
  { faixa_etaria: "35-44 anos", edicao: 2010, cpod_total: 16.75, componente_cariado: 2.12, componente_perdido: 7.48, componente_obturado: 7.15, classificacao_oms: "Muito Alto" },
  { faixa_etaria: "35-44 anos", edicao: 2023, cpod_total: 14.28, componente_cariado: 1.65, componente_perdido: 5.82, componente_obturado: 6.81, classificacao_oms: "Alto" },
  // 65-74 anos
  { faixa_etaria: "65-74 anos", edicao: 2003, cpod_total: 27.79, componente_cariado: 1.85, componente_perdido: 22.82, componente_obturado: 3.12, classificacao_oms: "Muito Alto" },
  { faixa_etaria: "65-74 anos", edicao: 2010, cpod_total: 27.53, componente_cariado: 1.42, componente_perdido: 22.18, componente_obturado: 3.93, classificacao_oms: "Muito Alto" },
  { faixa_etaria: "65-74 anos", edicao: 2023, cpod_total: 25.10, componente_cariado: 1.08, componente_perdido: 19.85, componente_obturado: 4.17, classificacao_oms: "Muito Alto" },
];

export const prevalenciaCondicoes: PrevalenciaCondicao[] = [
  { condicao: "Cárie não tratada", grupo_etario: "12 anos", prevalencia_2003_pct: 68.9, prevalencia_2010_pct: 56.5, prevalencia_2023_pct: 42.8, variacao_2003_2023_pp: -26.1, tendencia: "Melhora significativa" },
  { condicao: "Cárie não tratada", grupo_etario: "35-44 anos", prevalencia_2003_pct: 72.5, prevalencia_2010_pct: 62.8, prevalencia_2023_pct: 52.3, variacao_2003_2023_pp: -20.2, tendencia: "Melhora significativa" },
  { condicao: "Doença periodontal", grupo_etario: "35-44 anos", prevalencia_2003_pct: 42.8, prevalencia_2010_pct: 40.5, prevalencia_2023_pct: 38.5, variacao_2003_2023_pp: -4.3, tendencia: "Melhora moderada" },
  { condicao: "Necessidade de prótese", grupo_etario: "65-74 anos", prevalencia_2003_pct: 82.5, prevalencia_2010_pct: 78.2, prevalencia_2023_pct: 72.8, variacao_2003_2023_pp: -9.7, tendencia: "Melhora moderada" },
  { condicao: "Edentulismo total", grupo_etario: "65-74 anos", prevalencia_2003_pct: 75.2, prevalencia_2010_pct: 63.1, prevalencia_2023_pct: 58.1, variacao_2003_2023_pp: -17.1, tendencia: "Melhora significativa" },
  { condicao: "Má oclusão", grupo_etario: "12 anos", prevalencia_2003_pct: 36.8, prevalencia_2010_pct: 35.2, prevalencia_2023_pct: 34.5, variacao_2003_2023_pp: -2.3, tendencia: "Estável" },
  { condicao: "Fluorose dentária", grupo_etario: "12 anos", prevalencia_2003_pct: 8.8, prevalencia_2010_pct: 12.8, prevalencia_2023_pct: 16.8, variacao_2003_2023_pp: 8.0, tendencia: "Piora" },
  { condicao: "Traumatismo dentário", grupo_etario: "12 anos", prevalencia_2003_pct: 10.5, prevalencia_2010_pct: 12.2, prevalencia_2023_pct: 14.5, variacao_2003_2023_pp: 4.0, tendencia: "Piora" },
];

export const acessoServicos: AcessoServico[] = [
  { indicador: "Nunca foi ao dentista", valor_2003: 14.0, valor_2010: 11.0, valor_2023: 7.8, unidade: "%" },
  { indicador: "Última consulta < 1 ano", valor_2003: 38.5, valor_2010: 44.2, valor_2023: 52.8, unidade: "%" },
  { indicador: "Considera necessitar tratamento", valor_2003: 55.2, valor_2010: 48.5, valor_2023: 42.1, unidade: "%" },
  { indicador: "Atendido no SUS", valor_2003: 28.5, valor_2010: 38.2, valor_2023: 45.5, unidade: "%" },
  { indicador: "Avalia serviço como bom/ótimo", valor_2003: 62.8, valor_2010: 72.5, valor_2023: 78.2, unidade: "%" },
  { indicador: "Dificuldade de acesso", valor_2003: 42.5, valor_2010: 32.8, valor_2023: 24.5, unidade: "%" },
];

export const desigualdadesSociais: DesigualdadeSocial[] = [
  { determinante: "Renda", categoria_favorecida: "Quintil superior", valor_favorecido: 0.85, categoria_desfavorecida: "Quintil inferior", valor_desfavorecido: 3.42, razao_desigualdade: 4.02, indicador_usado: "CPO-D cariado (12 anos)" },
  { determinante: "Escolaridade", categoria_favorecida: ">12 anos estudo", valor_favorecido: 32.5, categoria_desfavorecida: "<4 anos estudo", valor_desfavorecido: 78.8, razao_desigualdade: 2.42, indicador_usado: "Edentulismo 65-74 (%)" },
  { determinante: "Raça/Cor", categoria_favorecida: "Branca", valor_favorecido: 1.35, categoria_desfavorecida: "Preta/Parda", valor_desfavorecido: 2.18, razao_desigualdade: 1.61, indicador_usado: "CPO-D cariado (12 anos)" },
  { determinante: "Zona urbana/rural", categoria_favorecida: "Urbana", valor_favorecido: 48.5, categoria_desfavorecida: "Rural", valor_desfavorecido: 22.8, razao_desigualdade: 2.13, indicador_usado: "Acesso último ano (%)" },
  { determinante: "Região", categoria_favorecida: "Sul", valor_favorecido: 1.18, categoria_desfavorecida: "Norte", valor_desfavorecido: 2.85, razao_desigualdade: 2.42, indicador_usado: "CPO-D 12 anos" },
];

export const dadosRegionais: DadoRegional[] = [
  { regiao: "Norte", cpod_12_2003: 3.62, cpod_12_2010: 2.85, cpod_12_2023: 2.28, edentulismo_65_2003: 82.5, edentulismo_65_2010: 72.8, edentulismo_65_2023: 68.5, acesso_ultimo_ano_2003: 25.2, acesso_ultimo_ano_2010: 32.5, acesso_ultimo_ano_2023: 42.8 },
  { regiao: "Nordeste", cpod_12_2003: 3.19, cpod_12_2010: 2.42, cpod_12_2023: 1.95, edentulismo_65_2003: 80.8, edentulismo_65_2010: 68.5, edentulismo_65_2023: 62.2, acesso_ultimo_ano_2003: 28.8, acesso_ultimo_ano_2010: 36.2, acesso_ultimo_ano_2023: 46.5 },
  { regiao: "Centro-Oeste", cpod_12_2003: 2.78, cpod_12_2010: 2.12, cpod_12_2023: 1.72, edentulismo_65_2003: 72.5, edentulismo_65_2010: 58.8, edentulismo_65_2023: 52.5, acesso_ultimo_ano_2003: 38.5, acesso_ultimo_ano_2010: 45.8, acesso_ultimo_ano_2023: 55.2 },
  { regiao: "Sudeste", cpod_12_2003: 2.45, cpod_12_2010: 1.78, cpod_12_2023: 1.42, edentulismo_65_2003: 72.2, edentulismo_65_2010: 60.5, edentulismo_65_2023: 55.8, acesso_ultimo_ano_2003: 42.8, acesso_ultimo_ano_2010: 48.5, acesso_ultimo_ano_2023: 58.2 },
  { regiao: "Sul", cpod_12_2003: 2.18, cpod_12_2010: 1.55, cpod_12_2023: 1.18, edentulismo_65_2003: 68.5, edentulismo_65_2010: 55.2, edentulismo_65_2023: 48.5, acesso_ultimo_ano_2003: 45.2, acesso_ultimo_ano_2010: 52.8, acesso_ultimo_ano_2023: 62.5 },
];

export const metasOMS: MetaOMS[] = [
  { meta: "CPO-D ≤ 3.0 aos 12 anos", descricao: "Índice de cárie em crianças de 12 anos deve ser igual ou menor que 3.0", alvo_2020: "≤ 3.0", resultado_brasil_2023: "1.68", status: "Atingida" },
  { meta: "50% livres de cárie aos 5 anos", descricao: "Pelo menos metade das crianças de 5 anos devem estar livres de cárie", alvo_2020: "≥ 50%", resultado_brasil_2023: "52.8%", status: "Atingida" },
  { meta: "Redução de edentulismo", descricao: "Reduzir a perda dentária em adultos e idosos", alvo_2020: "Redução de 10%", resultado_brasil_2023: "-22.8%", status: "Atingida" },
  { meta: "Cobertura de fluoretação", descricao: "Garantir fluoretação da água para maioria da população", alvo_2020: "≥ 75%", resultado_brasil_2023: "78.2%", status: "Atingida" },
  { meta: "Acesso a serviço odontológico", descricao: "Reduzir a população que nunca foi ao dentista para menos de 5%", alvo_2020: "< 5%", resultado_brasil_2023: "7.8%", status: "Parcialmente atingida" },
  { meta: "Redução de câncer bucal", descricao: "Reduzir taxa de mortalidade por câncer bucal", alvo_2020: "Redução de 15%", resultado_brasil_2023: "-8.2%", status: "Parcialmente atingida" },
  { meta: "Equidade regional", descricao: "Reduzir diferença de CPO-D entre regiões para menos de 1 ponto", alvo_2020: "Diferença < 1.0", resultado_brasil_2023: "1.10 (Norte-Sul)", status: "Não atingida" },
];
