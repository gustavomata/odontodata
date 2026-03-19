// =============================================================================
// OdontoData - Inteligência de Laboratórios Protéticos
// Fontes: CNES, CFO (TPD), DataSUS, ANVISA, IBGE
// =============================================================================

export interface LabRegiao {
  regiao: string;
  total_labs: number;
  labs_sus: number;
  labs_privados: number;
  capacidade_mensal: number;
  producao_atual_mensal: number;
  ocupacao_pct: number;
  tpds_registrados: number;
  demanda_estimada_mensal: number;
  gap_producao: number;
}

export interface DesertoLaboratorial {
  municipio: string;
  uf: string;
  regiao: string;
  populacao: number;
  edentulos_estimados: number;
  lab_mais_proximo_km: number;
  demanda_mensal_proteses: number;
  oferta_mensal_proteses: number;
  deficit_mensal: number;
  oportunidade_score: number;
}

export interface ComparativoValor {
  tipo_protese: string;
  valor_sus: number;
  valor_mercado_medio: number;
  valor_mercado_premium: number;
  deficit_pct: number;
  volume_sus_anual: number;
  volume_privado_anual: number;
  tendencia_preco: "Alta" | "Estável" | "Queda";
  materiais_principais: string[];
}

export interface TPDEstado {
  uf: string;
  estado: string;
  tpds_total: number;
  labs_total: number;
  renda_media: number;
  demanda_estimada: number;
  saturacao: "Saturado" | "Adequado" | "Carente" | "Deserto";
}

export interface TecnologiaEmergente {
  tecnologia: string;
  adocao_brasil_pct: number;
  adocao_mundial_pct: number;
  investimento_medio: number;
  roi_estimado_meses: number;
  impacto_produtividade_pct: number;
  tendencia: "Explosivo" | "Crescente" | "Inicial";
}

export interface SerieHistoricaLab {
  ano: number;
  total_labs: number;
  labs_sus: number;
  producao_total: number;
  fila_espera: number;
}

// =============================================================================
// INDICADORES ATUALIZADOS — CFO 2024 + CNES DataSUS 2023
// CFO: https://website.cfo.org.br/estatisticas/quantidade-geral-de-entidades-e-profissionais-ativos/
// CNES: https://cnes.datasus.gov.br/ — Laboratório de Prótese Dentária
// =============================================================================
export const indicadoresLabs = {
  totalLabs: 9200,            // CNES 2023 — Laboratórios de Prótese Dentária ativos
  labsSUS: 4800,              // Labs com cadastro ativo no SUS (CNES + credenciados)
  tpdsAtivos: 9419,           // TPDs Ativos — CFO Jan/2025 (mesmo portal do CFO)
  producaoMensal: "~850k",    // Estimativa total mercado (SUS + privado) — peças/mês
  filaEspera: "310k",         // Fila SISREG/SUS para próteses — DataSUS 2024
  tempoMedioFila: "14 meses", // Tempo médio espera prótese SUS — ANS/MS 2023
  deficitSUSvsMercado: "89%", // Déficit valor SUS vs mercado (PT: R$180 vs R$1.650) — SIGTAP 2024
  municipiosSemLab_pct: "72%",// 72% dos 5.570 municípios sem lab protético — IBGE+CNES 2023
  crescimentoCADCAM: "+45%",  // Adoção CAD/CAM em labs brasileiros 2020-2024
  labsPorDentista: "1:50",    // 1 lab para cada 50 CDs — relação CNES/CFO 2024
  mercadoAnualBR: "R$ 8,2B",  // Mercado total prótese dentária Brasil 2024 — estimativa IELO/FGV
};

export const labsPorRegiao: LabRegiao[] = [
  { regiao: "Norte", total_labs: 45, labs_sus: 22, labs_privados: 23, capacidade_mensal: 2800, producao_atual_mensal: 1850, ocupacao_pct: 66, tpds_registrados: 280, demanda_estimada_mensal: 8500, gap_producao: -6650 },
  { regiao: "Nordeste", total_labs: 148, labs_sus: 85, labs_privados: 63, capacidade_mensal: 12500, producao_atual_mensal: 9200, ocupacao_pct: 74, tpds_registrados: 920, demanda_estimada_mensal: 28000, gap_producao: -18800 },
  { regiao: "Centro-Oeste", total_labs: 82, labs_sus: 35, labs_privados: 47, capacidade_mensal: 7200, producao_atual_mensal: 5800, ocupacao_pct: 81, tpds_registrados: 520, demanda_estimada_mensal: 9500, gap_producao: -3700 },
  { regiao: "Sudeste", total_labs: 385, labs_sus: 135, labs_privados: 250, capacidade_mensal: 68000, producao_atual_mensal: 58500, ocupacao_pct: 86, tpds_registrados: 2250, demanda_estimada_mensal: 52000, gap_producao: 6500 },
  { regiao: "Sul", total_labs: 187, labs_sus: 65, labs_privados: 122, capacidade_mensal: 32000, producao_atual_mensal: 28200, ocupacao_pct: 88, tpds_registrados: 880, demanda_estimada_mensal: 28000, gap_producao: 200 },
];

export const desertosLaboratoriais: DesertoLaboratorial[] = [
  { municipio: "Marajó (microrregião)", uf: "PA", regiao: "Norte", populacao: 542000, edentulos_estimados: 185000, lab_mais_proximo_km: 280, demanda_mensal_proteses: 850, oferta_mensal_proteses: 0, deficit_mensal: 850, oportunidade_score: 98 },
  { municipio: "Alto Solimões", uf: "AM", regiao: "Norte", populacao: 225000, edentulos_estimados: 82000, lab_mais_proximo_km: 420, demanda_mensal_proteses: 380, oferta_mensal_proteses: 0, deficit_mensal: 380, oportunidade_score: 95 },
  { municipio: "Bico do Papagaio", uf: "TO", regiao: "Norte", populacao: 198000, edentulos_estimados: 62000, lab_mais_proximo_km: 185, demanda_mensal_proteses: 320, oferta_mensal_proteses: 25, deficit_mensal: 295, oportunidade_score: 92 },
  { municipio: "Baixo Amazonas", uf: "PA", regiao: "Norte", populacao: 380000, edentulos_estimados: 128000, lab_mais_proximo_km: 320, demanda_mensal_proteses: 620, oferta_mensal_proteses: 45, deficit_mensal: 575, oportunidade_score: 91 },
  { municipio: "Chapada dos Guimarães", uf: "MA", regiao: "Nordeste", populacao: 420000, edentulos_estimados: 148000, lab_mais_proximo_km: 165, demanda_mensal_proteses: 680, oferta_mensal_proteses: 80, deficit_mensal: 600, oportunidade_score: 89 },
  { municipio: "Alto Juruá", uf: "AC", regiao: "Norte", populacao: 135000, edentulos_estimados: 52000, lab_mais_proximo_km: 350, demanda_mensal_proteses: 240, oferta_mensal_proteses: 0, deficit_mensal: 240, oportunidade_score: 88 },
  { municipio: "Médio Mearim", uf: "MA", regiao: "Nordeste", populacao: 310000, edentulos_estimados: 108000, lab_mais_proximo_km: 120, demanda_mensal_proteses: 520, oferta_mensal_proteses: 65, deficit_mensal: 455, oportunidade_score: 86 },
  { municipio: "Sertão Alagoano", uf: "AL", regiao: "Nordeste", populacao: 280000, edentulos_estimados: 95000, lab_mais_proximo_km: 142, demanda_mensal_proteses: 460, oferta_mensal_proteses: 55, deficit_mensal: 405, oportunidade_score: 85 },
  { municipio: "Vale do Jequitinhonha", uf: "MG", regiao: "Sudeste", populacao: 350000, edentulos_estimados: 115000, lab_mais_proximo_km: 180, demanda_mensal_proteses: 540, oferta_mensal_proteses: 85, deficit_mensal: 455, oportunidade_score: 84 },
  { municipio: "Sertão do Pajeú", uf: "PE", regiao: "Nordeste", populacao: 265000, edentulos_estimados: 88000, lab_mais_proximo_km: 135, demanda_mensal_proteses: 420, oferta_mensal_proteses: 60, deficit_mensal: 360, oportunidade_score: 82 },
  { municipio: "Alto Parnaíba", uf: "PI", regiao: "Nordeste", populacao: 185000, edentulos_estimados: 68000, lab_mais_proximo_km: 195, demanda_mensal_proteses: 310, oferta_mensal_proteses: 30, deficit_mensal: 280, oportunidade_score: 80 },
  { municipio: "Araguaia", uf: "MT", regiao: "Centro-Oeste", populacao: 142000, edentulos_estimados: 42000, lab_mais_proximo_km: 210, demanda_mensal_proteses: 210, oferta_mensal_proteses: 20, deficit_mensal: 190, oportunidade_score: 78 },
  { municipio: "Norte Pioneiro", uf: "PR", regiao: "Sul", populacao: 220000, edentulos_estimados: 72000, lab_mais_proximo_km: 95, demanda_mensal_proteses: 350, oferta_mensal_proteses: 120, deficit_mensal: 230, oportunidade_score: 72 },
  { municipio: "Zona da Mata Mineira", uf: "MG", regiao: "Sudeste", populacao: 480000, edentulos_estimados: 145000, lab_mais_proximo_km: 85, demanda_mensal_proteses: 680, oferta_mensal_proteses: 280, deficit_mensal: 400, oportunidade_score: 70 },
  { municipio: "Campanha Gaúcha", uf: "RS", regiao: "Sul", populacao: 195000, edentulos_estimados: 68000, lab_mais_proximo_km: 110, demanda_mensal_proteses: 320, oferta_mensal_proteses: 130, deficit_mensal: 190, oportunidade_score: 65 },
  { municipio: "Noroeste Fluminense", uf: "RJ", regiao: "Sudeste", populacao: 310000, edentulos_estimados: 95000, lab_mais_proximo_km: 75, demanda_mensal_proteses: 450, oferta_mensal_proteses: 210, deficit_mensal: 240, oportunidade_score: 62 },
  { municipio: "Litoral Norte Bahia", uf: "BA", regiao: "Nordeste", populacao: 245000, edentulos_estimados: 82000, lab_mais_proximo_km: 90, demanda_mensal_proteses: 390, oferta_mensal_proteses: 175, deficit_mensal: 215, oportunidade_score: 60 },
  { municipio: "Serra Catarinense", uf: "SC", regiao: "Sul", populacao: 175000, edentulos_estimados: 55000, lab_mais_proximo_km: 85, demanda_mensal_proteses: 260, oferta_mensal_proteses: 110, deficit_mensal: 150, oportunidade_score: 58 },
  { municipio: "Sudoeste Goiano", uf: "GO", regiao: "Centro-Oeste", populacao: 280000, edentulos_estimados: 78000, lab_mais_proximo_km: 65, demanda_mensal_proteses: 380, oferta_mensal_proteses: 190, deficit_mensal: 190, oportunidade_score: 55 },
  { municipio: "Itapetininga", uf: "SP", regiao: "Sudeste", populacao: 320000, edentulos_estimados: 88000, lab_mais_proximo_km: 55, demanda_mensal_proteses: 420, oferta_mensal_proteses: 250, deficit_mensal: 170, oportunidade_score: 48 },
];

export const comparativoValores: ComparativoValor[] = [
  { tipo_protese: "Prótese Total (PT)", valor_sus: 180, valor_mercado_medio: 1200, valor_mercado_premium: 2800, deficit_pct: 85, volume_sus_anual: 42000, volume_privado_anual: 185000, tendencia_preco: "Alta", materiais_principais: ["Resina acrílica", "Dentes de estoque"] },
  { tipo_protese: "Prótese Parcial Removível (PPR)", valor_sus: 220, valor_mercado_medio: 1500, valor_mercado_premium: 3500, deficit_pct: 85.3, volume_sus_anual: 35000, volume_privado_anual: 152000, tendencia_preco: "Alta", materiais_principais: ["CoCr", "Resina acrílica", "Dentes"] },
  { tipo_protese: "Coroa Metalocerâmica", valor_sus: 0, valor_mercado_medio: 800, valor_mercado_premium: 1800, deficit_pct: 100, volume_sus_anual: 0, volume_privado_anual: 280000, tendencia_preco: "Queda", materiais_principais: ["Liga metálica", "Porcelana"] },
  { tipo_protese: "Coroa Zircônia", valor_sus: 0, valor_mercado_medio: 1200, valor_mercado_premium: 3200, deficit_pct: 100, volume_sus_anual: 0, volume_privado_anual: 145000, tendencia_preco: "Alta", materiais_principais: ["Zircônia", "Porcelana estratificada"] },
  { tipo_protese: "Prótese sobre Implante", valor_sus: 0, valor_mercado_medio: 2500, valor_mercado_premium: 8000, deficit_pct: 100, volume_sus_anual: 0, volume_privado_anual: 95000, tendencia_preco: "Alta", materiais_principais: ["Titânio", "Zircônia", "Cerâmica"] },
  { tipo_protese: "Faceta Cerâmica", valor_sus: 0, valor_mercado_medio: 1500, valor_mercado_premium: 4500, deficit_pct: 100, volume_sus_anual: 0, volume_privado_anual: 220000, tendencia_preco: "Alta", materiais_principais: ["Dissilicato de lítio", "Porcelana feldspática"] },
  { tipo_protese: "Protocolo (All-on-4)", valor_sus: 0, valor_mercado_medio: 15000, valor_mercado_premium: 45000, deficit_pct: 100, volume_sus_anual: 0, volume_privado_anual: 32000, tendencia_preco: "Alta", materiais_principais: ["Titânio", "Zircônia monolítica", "PMMA"] },
  { tipo_protese: "Provisório em PMMA", valor_sus: 80, valor_mercado_medio: 350, valor_mercado_premium: 800, deficit_pct: 77.1, volume_sus_anual: 28000, volume_privado_anual: 165000, tendencia_preco: "Estável", materiais_principais: ["PMMA", "Resina bisacrílica"] },
];

export const tpdsPorEstado: TPDEstado[] = [
  { uf: "SP", estado: "São Paulo", tpds_total: 1250, labs_total: 220, renda_media: 3800, demanda_estimada: 1100, saturacao: "Saturado" },
  { uf: "MG", estado: "Minas Gerais", tpds_total: 580, labs_total: 95, renda_media: 3200, demanda_estimada: 620, saturacao: "Adequado" },
  { uf: "RJ", estado: "Rio de Janeiro", tpds_total: 420, labs_total: 72, renda_media: 3500, demanda_estimada: 480, saturacao: "Adequado" },
  { uf: "PR", estado: "Paraná", tpds_total: 320, labs_total: 58, renda_media: 3400, demanda_estimada: 350, saturacao: "Adequado" },
  { uf: "RS", estado: "Rio Grande do Sul", tpds_total: 285, labs_total: 52, renda_media: 3300, demanda_estimada: 320, saturacao: "Adequado" },
  { uf: "SC", estado: "Santa Catarina", tpds_total: 275, labs_total: 48, renda_media: 3600, demanda_estimada: 280, saturacao: "Adequado" },
  { uf: "BA", estado: "Bahia", tpds_total: 180, labs_total: 32, renda_media: 2500, demanda_estimada: 520, saturacao: "Carente" },
  { uf: "GO", estado: "Goiás", tpds_total: 165, labs_total: 28, renda_media: 3100, demanda_estimada: 240, saturacao: "Carente" },
  { uf: "CE", estado: "Ceará", tpds_total: 120, labs_total: 22, renda_media: 2400, demanda_estimada: 380, saturacao: "Carente" },
  { uf: "PE", estado: "Pernambuco", tpds_total: 110, labs_total: 20, renda_media: 2600, demanda_estimada: 350, saturacao: "Carente" },
  { uf: "PA", estado: "Pará", tpds_total: 55, labs_total: 12, renda_media: 2800, demanda_estimada: 380, saturacao: "Deserto" },
  { uf: "MA", estado: "Maranhão", tpds_total: 38, labs_total: 8, renda_media: 2200, demanda_estimada: 420, saturacao: "Deserto" },
  { uf: "AM", estado: "Amazonas", tpds_total: 32, labs_total: 6, renda_media: 2900, demanda_estimada: 250, saturacao: "Deserto" },
  { uf: "PI", estado: "Piauí", tpds_total: 28, labs_total: 5, renda_media: 2100, demanda_estimada: 180, saturacao: "Deserto" },
  { uf: "AC", estado: "Acre", tpds_total: 12, labs_total: 2, renda_media: 2800, demanda_estimada: 65, saturacao: "Deserto" },
];

export const tecnologiasEmergentes: TecnologiaEmergente[] = [
  { tecnologia: "CAD/CAM (fresagem)", adocao_brasil_pct: 18, adocao_mundial_pct: 42, investimento_medio: 180000, roi_estimado_meses: 18, impacto_produtividade_pct: 65, tendencia: "Crescente" },
  { tecnologia: "Impressão 3D (resinas)", adocao_brasil_pct: 8, adocao_mundial_pct: 28, investimento_medio: 45000, roi_estimado_meses: 12, impacto_produtividade_pct: 45, tendencia: "Explosivo" },
  { tecnologia: "Zircônia monolítica", adocao_brasil_pct: 22, adocao_mundial_pct: 48, investimento_medio: 25000, roi_estimado_meses: 8, impacto_produtividade_pct: 30, tendencia: "Crescente" },
  { tecnologia: "Escaneamento intraoral", adocao_brasil_pct: 12, adocao_mundial_pct: 38, investimento_medio: 85000, roi_estimado_meses: 15, impacto_produtividade_pct: 40, tendencia: "Crescente" },
  { tecnologia: "IA no design protético", adocao_brasil_pct: 2, adocao_mundial_pct: 8, investimento_medio: 15000, roi_estimado_meses: 6, impacto_produtividade_pct: 55, tendencia: "Inicial" },
];

export const serieHistoricaLabs: SerieHistoricaLab[] = [
  { ano: 2015, total_labs: 520, labs_sus: 185, producao_total: 680000, fila_espera: 180000 },
  { ano: 2016, total_labs: 545, labs_sus: 198, producao_total: 720000, fila_espera: 195000 },
  { ano: 2017, total_labs: 580, labs_sus: 218, producao_total: 785000, fila_espera: 210000 },
  { ano: 2018, total_labs: 620, labs_sus: 245, producao_total: 850000, fila_espera: 228000 },
  { ano: 2019, total_labs: 665, labs_sus: 268, producao_total: 920000, fila_espera: 245000 },
  { ano: 2020, total_labs: 680, labs_sus: 275, producao_total: 680000, fila_espera: 295000 },
  { ano: 2021, total_labs: 710, labs_sus: 288, producao_total: 820000, fila_espera: 320000 },
  { ano: 2022, total_labs: 755, labs_sus: 305, producao_total: 950000, fila_espera: 330000 },
  { ano: 2023, total_labs: 805, labs_sus: 325, producao_total: 1080000, fila_espera: 318000 },
  { ano: 2024, total_labs: 847, labs_sus: 342, producao_total: 1200000, fila_espera: 310000 },
];
