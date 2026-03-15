// =============================================================================
// OdontoData - Preditor de Demanda Epidemiológica
// Fontes: SB Brasil, PNS/IBGE, SIM, SINAN, VIGITEL, Projeções IBGE
// =============================================================================

export interface DemandaCondicao {
  condicao: string;
  prevalencia_adultos_pct: number;
  prevalencia_criancas_pct: number;
  populacao_afetada_mi: number;
  demanda_consultas_ano_mi: number;
  especialidade_principal: string;
  profissionais_disponiveis: number;
  deficit_profissionais: number;
  custo_tratamento_medio: number;
  tendencia: "Crescente" | "Estável" | "Decrescente";
}

export interface DemandaRegional {
  regiao: string;
  condicao: string;
  prevalencia_pct: number;
  demanda_estimada: number;
  capacidade_instalada: number;
  gap_pct: number;
  cor: string;
}

export interface ProjecaoDemografica {
  ano: number;
  pop_0_14_mi: number;
  pop_15_59_mi: number;
  pop_60_mais_mi: number;
  demanda_pediatrica_mi: number;
  demanda_adulto_mi: number;
  demanda_geriatrica_mi: number;
  total_demanda_mi: number;
}

export interface EnvelhecimentoImpacto {
  faixa_etaria: string;
  populacao_2024_mi: number;
  populacao_2030_mi: number;
  populacao_2040_mi: number;
  prevalencia_edentulismo_pct: number;
  prevalencia_periodontal_pct: number;
  demanda_protese_mi: number;
  demanda_implante_mi: number;
}

export interface GapEstado {
  uf: string;
  estado: string;
  demanda_total_consultas_mi: number;
  capacidade_total_consultas_mi: number;
  gap_absoluto: number;
  gap_pct: number;
  classificacao: "Crítico" | "Insuficiente" | "Adequado" | "Superávit";
}

export const indicadoresDemanda = {
  populacaoNecessitaTratamento_mi: "98.4",
  deficitConsultas_mi: "42",
  condicaoMaisPrevalente: "Cárie não tratada",
  regiaoMaiorDeficit: "Norte",
  crescimentoDemandaIdosos_pct: "+340%",
  custoTotalEstimado_bi: "R$ 87",
  profissionaisNecessarios: 48200,
  tempoEsperaMedio: "4.2 meses",
};

export const demandaPorCondicao: DemandaCondicao[] = [
  { condicao: "Cárie não tratada", prevalencia_adultos_pct: 25.8, prevalencia_criancas_pct: 43.5, populacao_afetada_mi: 52.3, demanda_consultas_ano_mi: 78.4, especialidade_principal: "Dentística/Clínico Geral", profissionais_disponiveis: 128450, deficit_profissionais: 8200, custo_tratamento_medio: 180, tendencia: "Decrescente" },
  { condicao: "Doença periodontal", prevalencia_adultos_pct: 38.5, prevalencia_criancas_pct: 8.2, populacao_afetada_mi: 58.8, demanda_consultas_ano_mi: 45.2, especialidade_principal: "Periodontia", profissionais_disponiveis: 14200, deficit_profissionais: 12800, custo_tratamento_medio: 450, tendencia: "Crescente" },
  { condicao: "Edentulismo (parcial/total)", prevalencia_adultos_pct: 22.4, prevalencia_criancas_pct: 0, populacao_afetada_mi: 34.2, demanda_consultas_ano_mi: 18.5, especialidade_principal: "Prótese Dentária", profissionais_disponiveis: 12800, deficit_profissionais: 9400, custo_tratamento_medio: 1200, tendencia: "Crescente" },
  { condicao: "Má oclusão", prevalencia_adultos_pct: 12.5, prevalencia_criancas_pct: 38.8, populacao_afetada_mi: 28.5, demanda_consultas_ano_mi: 15.2, especialidade_principal: "Ortodontia", profissionais_disponiveis: 48400, deficit_profissionais: 0, custo_tratamento_medio: 3500, tendencia: "Estável" },
  { condicao: "Necessidade de endodontia", prevalencia_adultos_pct: 8.2, prevalencia_criancas_pct: 3.5, populacao_afetada_mi: 14.8, demanda_consultas_ano_mi: 22.1, especialidade_principal: "Endodontia", profissionais_disponiveis: 29000, deficit_profissionais: 6200, custo_tratamento_medio: 650, tendencia: "Estável" },
  { condicao: "Câncer bucal", prevalencia_adultos_pct: 0.12, prevalencia_criancas_pct: 0, populacao_afetada_mi: 0.18, demanda_consultas_ano_mi: 0.54, especialidade_principal: "Estomatologia/Patologia", profissionais_disponiveis: 2800, deficit_profissionais: 1200, custo_tratamento_medio: 8500, tendencia: "Crescente" },
  { condicao: "Traumatismo dentário", prevalencia_adultos_pct: 2.8, prevalencia_criancas_pct: 12.4, populacao_afetada_mi: 8.2, demanda_consultas_ano_mi: 4.1, especialidade_principal: "Dentística/Endodontia", profissionais_disponiveis: 157450, deficit_profissionais: 0, custo_tratamento_medio: 520, tendencia: "Estável" },
  { condicao: "Fluorose dentária", prevalencia_adultos_pct: 5.2, prevalencia_criancas_pct: 16.8, populacao_afetada_mi: 12.4, demanda_consultas_ano_mi: 2.5, especialidade_principal: "Dentística", profissionais_disponiveis: 7500, deficit_profissionais: 0, custo_tratamento_medio: 280, tendencia: "Estável" },
  { condicao: "DTM/Dor orofacial", prevalencia_adultos_pct: 8.5, prevalencia_criancas_pct: 2.1, populacao_afetada_mi: 13.8, demanda_consultas_ano_mi: 6.9, especialidade_principal: "DTM/Dor Orofacial", profissionais_disponiveis: 1200, deficit_profissionais: 4800, custo_tratamento_medio: 1800, tendencia: "Crescente" },
  { condicao: "Erosão dentária", prevalencia_adultos_pct: 15.2, prevalencia_criancas_pct: 22.5, populacao_afetada_mi: 32.8, demanda_consultas_ano_mi: 8.2, especialidade_principal: "Dentística", profissionais_disponiveis: 7500, deficit_profissionais: 2500, custo_tratamento_medio: 350, tendencia: "Crescente" },
];

export const demandaRegional: DemandaRegional[] = [
  // Norte
  { regiao: "Norte", condicao: "Cárie não tratada", prevalencia_pct: 35.2, demanda_estimada: 4200000, capacidade_instalada: 1800000, gap_pct: -57, cor: "#ef4444" },
  { regiao: "Norte", condicao: "Doença periodontal", prevalencia_pct: 42.8, demanda_estimada: 2800000, capacidade_instalada: 680000, gap_pct: -76, cor: "#ef4444" },
  { regiao: "Norte", condicao: "Edentulismo", prevalencia_pct: 28.5, demanda_estimada: 1200000, capacidade_instalada: 180000, gap_pct: -85, cor: "#ef4444" },
  { regiao: "Norte", condicao: "Má oclusão", prevalencia_pct: 32.1, demanda_estimada: 980000, capacidade_instalada: 220000, gap_pct: -78, cor: "#ef4444" },
  { regiao: "Norte", condicao: "Câncer bucal", prevalencia_pct: 0.08, demanda_estimada: 12000, capacidade_instalada: 3200, gap_pct: -73, cor: "#ef4444" },
  // Nordeste
  { regiao: "Nordeste", condicao: "Cárie não tratada", prevalencia_pct: 30.5, demanda_estimada: 12500000, capacidade_instalada: 6800000, gap_pct: -46, cor: "#f97316" },
  { regiao: "Nordeste", condicao: "Doença periodontal", prevalencia_pct: 40.2, demanda_estimada: 8200000, capacidade_instalada: 3100000, gap_pct: -62, cor: "#ef4444" },
  { regiao: "Nordeste", condicao: "Edentulismo", prevalencia_pct: 26.8, demanda_estimada: 4800000, capacidade_instalada: 1200000, gap_pct: -75, cor: "#ef4444" },
  { regiao: "Nordeste", condicao: "Má oclusão", prevalencia_pct: 35.5, demanda_estimada: 3200000, capacidade_instalada: 1450000, gap_pct: -55, cor: "#f97316" },
  { regiao: "Nordeste", condicao: "Câncer bucal", prevalencia_pct: 0.10, demanda_estimada: 38000, capacidade_instalada: 15000, gap_pct: -61, cor: "#ef4444" },
  // Centro-Oeste
  { regiao: "Centro-Oeste", condicao: "Cárie não tratada", prevalencia_pct: 22.8, demanda_estimada: 2800000, capacidade_instalada: 2100000, gap_pct: -25, cor: "#eab308" },
  { regiao: "Centro-Oeste", condicao: "Doença periodontal", prevalencia_pct: 35.5, demanda_estimada: 1950000, capacidade_instalada: 1100000, gap_pct: -44, cor: "#f97316" },
  { regiao: "Centro-Oeste", condicao: "Edentulismo", prevalencia_pct: 18.2, demanda_estimada: 850000, capacidade_instalada: 420000, gap_pct: -51, cor: "#f97316" },
  { regiao: "Centro-Oeste", condicao: "Má oclusão", prevalencia_pct: 28.4, demanda_estimada: 720000, capacidade_instalada: 520000, gap_pct: -28, cor: "#eab308" },
  { regiao: "Centro-Oeste", condicao: "Câncer bucal", prevalencia_pct: 0.11, demanda_estimada: 8500, capacidade_instalada: 5200, gap_pct: -39, cor: "#f97316" },
  // Sudeste
  { regiao: "Sudeste", condicao: "Cárie não tratada", prevalencia_pct: 18.5, demanda_estimada: 12200000, capacidade_instalada: 11800000, gap_pct: -3, cor: "#22c55e" },
  { regiao: "Sudeste", condicao: "Doença periodontal", prevalencia_pct: 34.2, demanda_estimada: 8800000, capacidade_instalada: 6200000, gap_pct: -30, cor: "#eab308" },
  { regiao: "Sudeste", condicao: "Edentulismo", prevalencia_pct: 20.5, demanda_estimada: 5200000, capacidade_instalada: 3800000, gap_pct: -27, cor: "#eab308" },
  { regiao: "Sudeste", condicao: "Má oclusão", prevalencia_pct: 25.8, demanda_estimada: 4500000, capacidade_instalada: 5200000, gap_pct: 16, cor: "#22c55e" },
  { regiao: "Sudeste", condicao: "Câncer bucal", prevalencia_pct: 0.14, demanda_estimada: 52000, capacidade_instalada: 42000, gap_pct: -19, cor: "#eab308" },
  // Sul
  { regiao: "Sul", condicao: "Cárie não tratada", prevalencia_pct: 16.2, demanda_estimada: 3200000, capacidade_instalada: 3500000, gap_pct: 9, cor: "#22c55e" },
  { regiao: "Sul", condicao: "Doença periodontal", prevalencia_pct: 32.8, demanda_estimada: 2400000, capacidade_instalada: 1800000, gap_pct: -25, cor: "#eab308" },
  { regiao: "Sul", condicao: "Edentulismo", prevalencia_pct: 22.1, demanda_estimada: 1500000, capacidade_instalada: 1100000, gap_pct: -27, cor: "#eab308" },
  { regiao: "Sul", condicao: "Má oclusão", prevalencia_pct: 24.5, demanda_estimada: 1200000, capacidade_instalada: 1450000, gap_pct: 21, cor: "#22c55e" },
  { regiao: "Sul", condicao: "Câncer bucal", prevalencia_pct: 0.15, demanda_estimada: 18000, capacidade_instalada: 14500, gap_pct: -19, cor: "#eab308" },
];

export const projecaoDemografica: ProjecaoDemografica[] = [
  { ano: 2024, pop_0_14_mi: 42.8, pop_15_59_mi: 132.5, pop_60_mais_mi: 32.7, demanda_pediatrica_mi: 18.5, demanda_adulto_mi: 52.8, demanda_geriatrica_mi: 22.8, total_demanda_mi: 94.1 },
  { ano: 2026, pop_0_14_mi: 41.2, pop_15_59_mi: 131.8, pop_60_mais_mi: 36.2, demanda_pediatrica_mi: 17.8, demanda_adulto_mi: 52.5, demanda_geriatrica_mi: 25.3, total_demanda_mi: 95.6 },
  { ano: 2028, pop_0_14_mi: 39.5, pop_15_59_mi: 130.8, pop_60_mais_mi: 40.1, demanda_pediatrica_mi: 17.1, demanda_adulto_mi: 52.1, demanda_geriatrica_mi: 28.1, total_demanda_mi: 97.3 },
  { ano: 2030, pop_0_14_mi: 37.8, pop_15_59_mi: 129.5, pop_60_mais_mi: 44.5, demanda_pediatrica_mi: 16.4, demanda_adulto_mi: 51.6, demanda_geriatrica_mi: 31.2, total_demanda_mi: 99.2 },
  { ano: 2032, pop_0_14_mi: 36.2, pop_15_59_mi: 127.8, pop_60_mais_mi: 49.2, demanda_pediatrica_mi: 15.7, demanda_adulto_mi: 50.9, demanda_geriatrica_mi: 34.4, total_demanda_mi: 101.0 },
  { ano: 2034, pop_0_14_mi: 34.8, pop_15_59_mi: 125.8, pop_60_mais_mi: 54.5, demanda_pediatrica_mi: 15.1, demanda_adulto_mi: 50.1, demanda_geriatrica_mi: 38.2, total_demanda_mi: 103.4 },
  { ano: 2036, pop_0_14_mi: 33.5, pop_15_59_mi: 123.5, pop_60_mais_mi: 60.2, demanda_pediatrica_mi: 14.5, demanda_adulto_mi: 49.2, demanda_geriatrica_mi: 42.1, total_demanda_mi: 105.8 },
  { ano: 2038, pop_0_14_mi: 32.2, pop_15_59_mi: 121.0, pop_60_mais_mi: 66.4, demanda_pediatrica_mi: 13.9, demanda_adulto_mi: 48.2, demanda_geriatrica_mi: 46.5, total_demanda_mi: 108.6 },
  { ano: 2040, pop_0_14_mi: 31.0, pop_15_59_mi: 118.2, pop_60_mais_mi: 73.2, demanda_pediatrica_mi: 13.4, demanda_adulto_mi: 47.1, demanda_geriatrica_mi: 51.2, total_demanda_mi: 111.7 },
];

export const envelhecimentoImpacto: EnvelhecimentoImpacto[] = [
  { faixa_etaria: "60-64 anos", populacao_2024_mi: 10.2, populacao_2030_mi: 12.8, populacao_2040_mi: 15.5, prevalencia_edentulismo_pct: 18.5, prevalencia_periodontal_pct: 52.3, demanda_protese_mi: 1.89, demanda_implante_mi: 0.82 },
  { faixa_etaria: "65-69 anos", populacao_2024_mi: 8.5, populacao_2030_mi: 10.8, populacao_2040_mi: 14.2, prevalencia_edentulismo_pct: 32.8, prevalencia_periodontal_pct: 58.5, demanda_protese_mi: 2.79, demanda_implante_mi: 0.68 },
  { faixa_etaria: "70-74 anos", populacao_2024_mi: 6.2, populacao_2030_mi: 8.5, populacao_2040_mi: 12.1, prevalencia_edentulismo_pct: 48.5, prevalencia_periodontal_pct: 62.8, demanda_protese_mi: 3.01, demanda_implante_mi: 0.45 },
  { faixa_etaria: "75-79 anos", populacao_2024_mi: 4.2, populacao_2030_mi: 5.8, populacao_2040_mi: 9.5, prevalencia_edentulismo_pct: 62.3, prevalencia_periodontal_pct: 68.2, demanda_protese_mi: 2.62, demanda_implante_mi: 0.28 },
  { faixa_etaria: "80+ anos", populacao_2024_mi: 3.6, populacao_2030_mi: 6.6, populacao_2040_mi: 21.9, prevalencia_edentulismo_pct: 78.5, prevalencia_periodontal_pct: 72.5, demanda_protese_mi: 2.83, demanda_implante_mi: 0.15 },
];

export const gapOfertaDemanda: GapEstado[] = [
  { uf: "PA", estado: "Pará", demanda_total_consultas_mi: 5.8, capacidade_total_consultas_mi: 2.1, gap_absoluto: -3.7, gap_pct: -63.8, classificacao: "Crítico" },
  { uf: "MA", estado: "Maranhão", demanda_total_consultas_mi: 4.9, capacidade_total_consultas_mi: 1.8, gap_absoluto: -3.1, gap_pct: -63.3, classificacao: "Crítico" },
  { uf: "AM", estado: "Amazonas", demanda_total_consultas_mi: 2.8, capacidade_total_consultas_mi: 1.2, gap_absoluto: -1.6, gap_pct: -57.1, classificacao: "Crítico" },
  { uf: "PI", estado: "Piauí", demanda_total_consultas_mi: 2.2, capacidade_total_consultas_mi: 1.0, gap_absoluto: -1.2, gap_pct: -54.5, classificacao: "Crítico" },
  { uf: "AC", estado: "Acre", demanda_total_consultas_mi: 0.6, capacidade_total_consultas_mi: 0.28, gap_absoluto: -0.32, gap_pct: -53.3, classificacao: "Crítico" },
  { uf: "AP", estado: "Amapá", demanda_total_consultas_mi: 0.58, capacidade_total_consultas_mi: 0.28, gap_absoluto: -0.30, gap_pct: -51.7, classificacao: "Crítico" },
  { uf: "AL", estado: "Alagoas", demanda_total_consultas_mi: 2.3, capacidade_total_consultas_mi: 1.15, gap_absoluto: -1.15, gap_pct: -50.0, classificacao: "Crítico" },
  { uf: "BA", estado: "Bahia", demanda_total_consultas_mi: 9.8, capacidade_total_consultas_mi: 5.2, gap_absoluto: -4.6, gap_pct: -46.9, classificacao: "Insuficiente" },
  { uf: "CE", estado: "Ceará", demanda_total_consultas_mi: 6.2, capacidade_total_consultas_mi: 3.5, gap_absoluto: -2.7, gap_pct: -43.5, classificacao: "Insuficiente" },
  { uf: "PE", estado: "Pernambuco", demanda_total_consultas_mi: 6.5, capacidade_total_consultas_mi: 3.8, gap_absoluto: -2.7, gap_pct: -41.5, classificacao: "Insuficiente" },
  { uf: "RN", estado: "Rio Grande do Norte", demanda_total_consultas_mi: 2.4, capacidade_total_consultas_mi: 1.5, gap_absoluto: -0.9, gap_pct: -37.5, classificacao: "Insuficiente" },
  { uf: "SE", estado: "Sergipe", demanda_total_consultas_mi: 1.6, capacidade_total_consultas_mi: 1.02, gap_absoluto: -0.58, gap_pct: -36.3, classificacao: "Insuficiente" },
  { uf: "TO", estado: "Tocantins", demanda_total_consultas_mi: 1.1, capacidade_total_consultas_mi: 0.72, gap_absoluto: -0.38, gap_pct: -34.5, classificacao: "Insuficiente" },
  { uf: "PB", estado: "Paraíba", demanda_total_consultas_mi: 2.8, capacidade_total_consultas_mi: 1.85, gap_absoluto: -0.95, gap_pct: -33.9, classificacao: "Insuficiente" },
  { uf: "RO", estado: "Rondônia", demanda_total_consultas_mi: 1.2, capacidade_total_consultas_mi: 0.82, gap_absoluto: -0.38, gap_pct: -31.7, classificacao: "Insuficiente" },
  { uf: "MT", estado: "Mato Grosso", demanda_total_consultas_mi: 2.4, capacidade_total_consultas_mi: 1.72, gap_absoluto: -0.68, gap_pct: -28.3, classificacao: "Insuficiente" },
  { uf: "RR", estado: "Roraima", demanda_total_consultas_mi: 0.38, capacidade_total_consultas_mi: 0.28, gap_absoluto: -0.10, gap_pct: -26.3, classificacao: "Insuficiente" },
  { uf: "GO", estado: "Goiás", demanda_total_consultas_mi: 4.8, capacidade_total_consultas_mi: 3.65, gap_absoluto: -1.15, gap_pct: -24.0, classificacao: "Insuficiente" },
  { uf: "MS", estado: "Mato Grosso do Sul", demanda_total_consultas_mi: 1.9, capacidade_total_consultas_mi: 1.52, gap_absoluto: -0.38, gap_pct: -20.0, classificacao: "Insuficiente" },
  { uf: "MG", estado: "Minas Gerais", demanda_total_consultas_mi: 14.2, capacidade_total_consultas_mi: 12.1, gap_absoluto: -2.1, gap_pct: -14.8, classificacao: "Adequado" },
  { uf: "ES", estado: "Espírito Santo", demanda_total_consultas_mi: 2.6, capacidade_total_consultas_mi: 2.28, gap_absoluto: -0.32, gap_pct: -12.3, classificacao: "Adequado" },
  { uf: "RJ", estado: "Rio de Janeiro", demanda_total_consultas_mi: 11.5, capacidade_total_consultas_mi: 10.2, gap_absoluto: -1.3, gap_pct: -11.3, classificacao: "Adequado" },
  { uf: "PR", estado: "Paraná", demanda_total_consultas_mi: 7.8, capacidade_total_consultas_mi: 7.1, gap_absoluto: -0.7, gap_pct: -9.0, classificacao: "Adequado" },
  { uf: "RS", estado: "Rio Grande do Sul", demanda_total_consultas_mi: 7.5, capacidade_total_consultas_mi: 7.0, gap_absoluto: -0.5, gap_pct: -6.7, classificacao: "Adequado" },
  { uf: "SC", estado: "Santa Catarina", demanda_total_consultas_mi: 4.8, capacidade_total_consultas_mi: 4.6, gap_absoluto: -0.2, gap_pct: -4.2, classificacao: "Adequado" },
  { uf: "SP", estado: "São Paulo", demanda_total_consultas_mi: 30.2, capacidade_total_consultas_mi: 32.5, gap_absoluto: 2.3, gap_pct: 7.6, classificacao: "Superávit" },
  { uf: "DF", estado: "Distrito Federal", demanda_total_consultas_mi: 2.0, capacidade_total_consultas_mi: 2.25, gap_absoluto: 0.25, gap_pct: 12.5, classificacao: "Superávit" },
];
