// =============================================================================
// OdontoData - Dados do SUS / Produção Ambulatorial Odontológica
// Fontes: SIA/SUS, CNES, DAB/MS, e-SUS AB, PMAQ, Brasil Sorridente
// =============================================================================

export interface ProducaoSUSRegiao {
  regiao: string;
  procedimentosBasicos_mil: number;
  procedimentosEspecializados_mil: number;
  procedimentosCirurgicos_mil: number;
  procedimentosProtese_mil: number;
  procedimentosPreventivos_mil: number;
  totalProcedimentos_mil: number;
  procedimentosPerCapita: number;
  cor: string;
}

export interface CoberturaSaudeBucalUF {
  uf: string;
  estado: string;
  regiao: string;
  populacao: number;
  equipeSaudeBucal: number;
  coberturaESB_pct: number;
  equipeSaudeFamilia: number;
  proporcaoESB_ESF: number;
  municipiosComESB: number;
  totalMunicipios: number;
  ceo: number;
  lrpd: number;
}

export interface ProcedimentoSUS {
  grupo: string;
  subgrupo: string;
  quantidade_mil: number;
  valorPago_mi: number;
  mediaValorUnitario: number;
  tendencia5anos: number;
  percentualTotal: number;
}

export interface BrasilSorridenteIndicador {
  indicador: string;
  valor: number;
  meta2024: number;
  atingimento: number;
  unidade: string;
  categoria: string;
}

export interface CEOProducao {
  regiao: string;
  totalCEOs: number;
  ceoTipoI: number;
  ceoTipoII: number;
  ceoTipoIII: number;
  producaoEndodontia_mil: number;
  producaoPeriodontia_mil: number;
  producaoCirurgia_mil: number;
  producaoDiagnostico_mil: number;
  cumprimentoMeta_pct: number;
  cor: string;
}

export interface SerieHistoricaSUS {
  ano: number;
  equipesESB: number;
  totalCEOs: number;
  totalLRPDs: number;
  procedimentos_mi: number;
  investimento_bi: number;
  cobertura_pct: number;
}

export interface AtencaoBasicaMunicipio {
  faixaPopulacao: string;
  municipios: number;
  comESB: number;
  cobertura_pct: number;
  mediaEquipesESB: number;
  procedimentosPerCapita: number;
}

// =============================================================================
// PRODUÇÃO AMBULATORIAL POR REGIÃO (SIA/SUS 2024)
// =============================================================================
export const producaoSUSRegiao: ProducaoSUSRegiao[] = [
  { regiao: "Sudeste", procedimentosBasicos_mil: 18200, procedimentosEspecializados_mil: 4800, procedimentosCirurgicos_mil: 2400, procedimentosProtese_mil: 680, procedimentosPreventivos_mil: 12400, totalProcedimentos_mil: 38480, procedimentosPerCapita: 0.43, cor: "#3B82F6" },
  { regiao: "Sul", procedimentosBasicos_mil: 9800, procedimentosEspecializados_mil: 2600, procedimentosCirurgicos_mil: 1200, procedimentosProtese_mil: 420, procedimentosPreventivos_mil: 7200, totalProcedimentos_mil: 21220, procedimentosPerCapita: 0.69, cor: "#10B981" },
  { regiao: "Nordeste", procedimentosBasicos_mil: 16400, procedimentosEspecializados_mil: 3200, procedimentosCirurgicos_mil: 1800, procedimentosProtese_mil: 520, procedimentosPreventivos_mil: 14800, totalProcedimentos_mil: 36720, procedimentosPerCapita: 0.63, cor: "#F59E0B" },
  { regiao: "Centro-Oeste", procedimentosBasicos_mil: 5200, procedimentosEspecializados_mil: 1400, procedimentosCirurgicos_mil: 680, procedimentosProtese_mil: 180, procedimentosPreventivos_mil: 3800, totalProcedimentos_mil: 11260, procedimentosPerCapita: 0.67, cor: "#8B5CF6" },
  { regiao: "Norte", procedimentosBasicos_mil: 4800, procedimentosEspecializados_mil: 920, procedimentosCirurgicos_mil: 520, procedimentosProtese_mil: 140, procedimentosPreventivos_mil: 4540, totalProcedimentos_mil: 10920, procedimentosPerCapita: 0.58, cor: "#EF4444" },
];

// =============================================================================
// COBERTURA DE SAÚDE BUCAL POR UF (DAB/MS + CNES 2024)
// =============================================================================
export const coberturaSaudeBucalUF: CoberturaSaudeBucalUF[] = [
  { uf: "SP", estado: "São Paulo", regiao: "Sudeste", populacao: 46649132, equipeSaudeBucal: 8420, coberturaESB_pct: 32.4, equipeSaudeFamilia: 16800, proporcaoESB_ESF: 50.1, municipiosComESB: 612, totalMunicipios: 645, ceo: 82, lrpd: 48 },
  { uf: "MG", estado: "Minas Gerais", regiao: "Sudeste", populacao: 21411923, equipeSaudeBucal: 6480, coberturaESB_pct: 48.6, equipeSaudeFamilia: 10200, proporcaoESB_ESF: 63.5, municipiosComESB: 824, totalMunicipios: 853, ceo: 104, lrpd: 62 },
  { uf: "CE", estado: "Ceará", regiao: "Nordeste", populacao: 9240580, equipeSaudeBucal: 4200, coberturaESB_pct: 72.8, equipeSaudeFamilia: 5400, proporcaoESB_ESF: 77.8, municipiosComESB: 182, totalMunicipios: 184, ceo: 98, lrpd: 42 },
  { uf: "BA", estado: "Bahia", regiao: "Nordeste", populacao: 14873064, equipeSaudeBucal: 5600, coberturaESB_pct: 58.4, equipeSaudeFamilia: 8200, proporcaoESB_ESF: 68.3, municipiosComESB: 398, totalMunicipios: 417, ceo: 86, lrpd: 38 },
  { uf: "RS", estado: "Rio Grande do Sul", regiao: "Sul", populacao: 11466630, equipeSaudeBucal: 3200, coberturaESB_pct: 42.8, equipeSaudeFamilia: 5800, proporcaoESB_ESF: 55.2, municipiosComESB: 468, totalMunicipios: 497, ceo: 62, lrpd: 34 },
  { uf: "PR", estado: "Paraná", regiao: "Sul", populacao: 11597484, equipeSaudeBucal: 3800, coberturaESB_pct: 48.2, equipeSaudeFamilia: 6200, proporcaoESB_ESF: 61.3, municipiosComESB: 382, totalMunicipios: 399, ceo: 48, lrpd: 28 },
  { uf: "PE", estado: "Pernambuco", regiao: "Nordeste", populacao: 9674793, equipeSaudeBucal: 3600, coberturaESB_pct: 62.4, equipeSaudeFamilia: 4800, proporcaoESB_ESF: 75.0, municipiosComESB: 180, totalMunicipios: 184, ceo: 54, lrpd: 24 },
  { uf: "PA", estado: "Pará", regiao: "Norte", populacao: 8777124, equipeSaudeBucal: 2200, coberturaESB_pct: 38.6, equipeSaudeFamilia: 3400, proporcaoESB_ESF: 64.7, municipiosComESB: 128, totalMunicipios: 144, ceo: 22, lrpd: 12 },
  { uf: "SC", estado: "Santa Catarina", regiao: "Sul", populacao: 7762154, equipeSaudeBucal: 2400, coberturaESB_pct: 52.4, equipeSaudeFamilia: 4200, proporcaoESB_ESF: 57.1, municipiosComESB: 280, totalMunicipios: 295, ceo: 38, lrpd: 22 },
  { uf: "GO", estado: "Goiás", regiao: "Centro-Oeste", populacao: 7206589, equipeSaudeBucal: 2100, coberturaESB_pct: 46.8, equipeSaudeFamilia: 3600, proporcaoESB_ESF: 58.3, municipiosComESB: 232, totalMunicipios: 246, ceo: 32, lrpd: 18 },
  { uf: "MA", estado: "Maranhão", regiao: "Nordeste", populacao: 7153262, equipeSaudeBucal: 2800, coberturaESB_pct: 64.2, equipeSaudeFamilia: 3800, proporcaoESB_ESF: 73.7, municipiosComESB: 208, totalMunicipios: 217, ceo: 42, lrpd: 16 },
  { uf: "RJ", estado: "Rio de Janeiro", regiao: "Sudeste", populacao: 17374819, equipeSaudeBucal: 3200, coberturaESB_pct: 28.4, equipeSaudeFamilia: 7600, proporcaoESB_ESF: 42.1, municipiosComESB: 82, totalMunicipios: 92, ceo: 36, lrpd: 20 },
  { uf: "AM", estado: "Amazonas", regiao: "Norte", populacao: 4269995, equipeSaudeBucal: 1200, coberturaESB_pct: 42.8, equipeSaudeFamilia: 1800, proporcaoESB_ESF: 66.7, municipiosComESB: 56, totalMunicipios: 62, ceo: 12, lrpd: 6 },
  { uf: "PB", estado: "Paraíba", regiao: "Nordeste", populacao: 4059905, equipeSaudeBucal: 2400, coberturaESB_pct: 86.4, equipeSaudeFamilia: 2800, proporcaoESB_ESF: 85.7, municipiosComESB: 220, totalMunicipios: 223, ceo: 48, lrpd: 18 },
  { uf: "PI", estado: "Piauí", regiao: "Nordeste", populacao: 3289290, equipeSaudeBucal: 1800, coberturaESB_pct: 82.6, equipeSaudeFamilia: 2200, proporcaoESB_ESF: 81.8, municipiosComESB: 218, totalMunicipios: 224, ceo: 36, lrpd: 14 },
];

// =============================================================================
// PROCEDIMENTOS ODONTOLÓGICOS SUS POR TIPO (SIA/SUS 2024)
// =============================================================================
export const procedimentosSUS: ProcedimentoSUS[] = [
  { grupo: "Atenção Básica", subgrupo: "Restaurações", quantidade_mil: 24800, valorPago_mi: 496.0, mediaValorUnitario: 20.0, tendencia5anos: 3.2, percentualTotal: 20.9 },
  { grupo: "Atenção Básica", subgrupo: "Exodontias", quantidade_mil: 12400, valorPago_mi: 186.0, mediaValorUnitario: 15.0, tendencia5anos: -2.8, percentualTotal: 10.5 },
  { grupo: "Prevenção", subgrupo: "Profilaxia/Escovação supervisionada", quantidade_mil: 28600, valorPago_mi: 200.2, mediaValorUnitario: 7.0, tendencia5anos: 5.4, percentualTotal: 24.1 },
  { grupo: "Prevenção", subgrupo: "Aplicação de flúor", quantidade_mil: 14200, valorPago_mi: 85.2, mediaValorUnitario: 6.0, tendencia5anos: 4.8, percentualTotal: 12.0 },
  { grupo: "Prevenção", subgrupo: "Selantes", quantidade_mil: 6800, valorPago_mi: 54.4, mediaValorUnitario: 8.0, tendencia5anos: 6.2, percentualTotal: 5.7 },
  { grupo: "Especializada", subgrupo: "Endodontia", quantidade_mil: 4200, valorPago_mi: 126.0, mediaValorUnitario: 30.0, tendencia5anos: 4.6, percentualTotal: 3.5 },
  { grupo: "Especializada", subgrupo: "Periodontia", quantidade_mil: 5800, valorPago_mi: 145.0, mediaValorUnitario: 25.0, tendencia5anos: 3.8, percentualTotal: 4.9 },
  { grupo: "Especializada", subgrupo: "Cirurgia BMF", quantidade_mil: 3200, valorPago_mi: 128.0, mediaValorUnitario: 40.0, tendencia5anos: 2.4, percentualTotal: 2.7 },
  { grupo: "Especializada", subgrupo: "Diagnóstico (biópsias, rx)", quantidade_mil: 4800, valorPago_mi: 96.0, mediaValorUnitario: 20.0, tendencia5anos: 7.2, percentualTotal: 4.0 },
  { grupo: "Prótese", subgrupo: "Prótese Total", quantidade_mil: 820, valorPago_mi: 147.6, mediaValorUnitario: 180.0, tendencia5anos: 8.4, percentualTotal: 0.7 },
  { grupo: "Prótese", subgrupo: "Prótese Parcial Removível", quantidade_mil: 640, valorPago_mi: 96.0, mediaValorUnitario: 150.0, tendencia5anos: 6.8, percentualTotal: 0.5 },
  { grupo: "Prótese", subgrupo: "Prótese Parcial Fixa (Coroa)", quantidade_mil: 480, valorPago_mi: 86.4, mediaValorUnitario: 180.0, tendencia5anos: 12.4, percentualTotal: 0.4 },
  { grupo: "Urgência", subgrupo: "Atendimento de urgência odontológica", quantidade_mil: 12860, valorPago_mi: 192.9, mediaValorUnitario: 15.0, tendencia5anos: 1.2, percentualTotal: 10.8 },
];

// =============================================================================
// BRASIL SORRIDENTE - INDICADORES (DAB/MS 2024)
// =============================================================================
export const brasilSorridenteIndicadores: BrasilSorridenteIndicador[] = [
  { indicador: "Equipes de Saúde Bucal implantadas", valor: 30800, meta2024: 32000, atingimento: 96.3, unidade: "equipes", categoria: "Atenção Básica" },
  { indicador: "Cobertura populacional ESB", valor: 40.2, meta2024: 45.0, atingimento: 89.3, unidade: "%", categoria: "Atenção Básica" },
  { indicador: "CEOs em funcionamento", valor: 1100, meta2024: 1200, atingimento: 91.7, unidade: "centros", categoria: "Atenção Especializada" },
  { indicador: "LRPDs credenciados", valor: 680, meta2024: 750, atingimento: 90.7, unidade: "laboratórios", categoria: "Reabilitação Protética" },
  { indicador: "Próteses entregues (acumulado)", valor: 8200000, meta2024: 9000000, atingimento: 91.1, unidade: "próteses", categoria: "Reabilitação Protética" },
  { indicador: "Municípios com ESB", valor: 5180, meta2024: 5300, atingimento: 97.7, unidade: "municípios", categoria: "Atenção Básica" },
  { indicador: "Investimento anual federal", valor: 2.8, meta2024: 3.2, atingimento: 87.5, unidade: "R$ bilhões", categoria: "Financiamento" },
  { indicador: "Procedimentos odontológicos/ano", valor: 118.6, meta2024: 125.0, atingimento: 94.9, unidade: "milhões", categoria: "Produção" },
  { indicador: "Primeira consulta odontológica", valor: 24800, meta2024: 28000, atingimento: 88.6, unidade: "mil/ano", categoria: "Acesso" },
  { indicador: "Tratamento completado", valor: 18400, meta2024: 22000, atingimento: 83.6, unidade: "mil/ano", categoria: "Resolutividade" },
];

// =============================================================================
// CEO - PRODUÇÃO POR REGIÃO (CNES + SIA/SUS 2024)
// =============================================================================
export const ceoProducao: CEOProducao[] = [
  { regiao: "Sudeste", totalCEOs: 282, ceoTipoI: 98, ceoTipoII: 124, ceoTipoIII: 60, producaoEndodontia_mil: 380, producaoPeriodontia_mil: 420, producaoCirurgia_mil: 240, producaoDiagnostico_mil: 310, cumprimentoMeta_pct: 72.4, cor: "#3B82F6" },
  { regiao: "Sul", totalCEOs: 186, ceoTipoI: 68, ceoTipoII: 82, ceoTipoIII: 36, producaoEndodontia_mil: 260, producaoPeriodontia_mil: 280, producaoCirurgia_mil: 160, producaoDiagnostico_mil: 220, cumprimentoMeta_pct: 78.6, cor: "#10B981" },
  { regiao: "Nordeste", totalCEOs: 412, ceoTipoI: 186, ceoTipoII: 168, ceoTipoIII: 58, producaoEndodontia_mil: 480, producaoPeriodontia_mil: 520, producaoCirurgia_mil: 280, producaoDiagnostico_mil: 340, cumprimentoMeta_pct: 64.2, cor: "#F59E0B" },
  { regiao: "Centro-Oeste", totalCEOs: 98, ceoTipoI: 36, ceoTipoII: 42, ceoTipoIII: 20, producaoEndodontia_mil: 120, producaoPeriodontia_mil: 140, producaoCirurgia_mil: 80, producaoDiagnostico_mil: 100, cumprimentoMeta_pct: 74.8, cor: "#8B5CF6" },
  { regiao: "Norte", totalCEOs: 122, ceoTipoI: 62, ceoTipoII: 44, ceoTipoIII: 16, producaoEndodontia_mil: 98, producaoPeriodontia_mil: 110, producaoCirurgia_mil: 64, producaoDiagnostico_mil: 82, cumprimentoMeta_pct: 58.4, cor: "#EF4444" },
];

// =============================================================================
// SÉRIE HISTÓRICA DO SUS ODONTOLÓGICO (2004-2024)
// =============================================================================
export const serieHistoricaSUS: SerieHistoricaSUS[] = [
  { ano: 2004, equipesESB: 8900, totalCEOs: 100, totalLRPDs: 0, procedimentos_mi: 48.2, investimento_bi: 0.42, cobertura_pct: 8.4 },
  { ano: 2006, equipesESB: 14200, totalCEOs: 320, totalLRPDs: 42, procedimentos_mi: 62.4, investimento_bi: 0.68, cobertura_pct: 14.8 },
  { ano: 2008, equipesESB: 18400, totalCEOs: 480, totalLRPDs: 168, procedimentos_mi: 74.8, investimento_bi: 0.92, cobertura_pct: 19.2 },
  { ano: 2010, equipesESB: 20800, totalCEOs: 640, totalLRPDs: 340, procedimentos_mi: 82.6, investimento_bi: 1.12, cobertura_pct: 24.8 },
  { ano: 2012, equipesESB: 23200, totalCEOs: 780, totalLRPDs: 420, procedimentos_mi: 88.4, investimento_bi: 1.38, cobertura_pct: 28.6 },
  { ano: 2014, equipesESB: 25400, totalCEOs: 920, totalLRPDs: 520, procedimentos_mi: 96.2, investimento_bi: 1.68, cobertura_pct: 32.4 },
  { ano: 2016, equipesESB: 26200, totalCEOs: 1020, totalLRPDs: 580, procedimentos_mi: 94.8, investimento_bi: 1.82, cobertura_pct: 33.8 },
  { ano: 2018, equipesESB: 27800, totalCEOs: 1060, totalLRPDs: 620, procedimentos_mi: 102.4, investimento_bi: 2.04, cobertura_pct: 34.2 },
  { ano: 2020, equipesESB: 28400, totalCEOs: 1080, totalLRPDs: 640, procedimentos_mi: 72.6, investimento_bi: 2.18, cobertura_pct: 32.8 },
  { ano: 2022, equipesESB: 29800, totalCEOs: 1090, totalLRPDs: 660, procedimentos_mi: 108.2, investimento_bi: 2.52, cobertura_pct: 36.8 },
  { ano: 2024, equipesESB: 30800, totalCEOs: 1100, totalLRPDs: 680, procedimentos_mi: 118.6, investimento_bi: 2.80, cobertura_pct: 40.2 },
];

// =============================================================================
// ATENÇÃO BÁSICA POR PORTE MUNICIPAL
// =============================================================================
export const atencaoBasicaPorPorte: AtencaoBasicaMunicipio[] = [
  { faixaPopulacao: "< 5 mil hab", municipios: 2480, comESB: 2100, cobertura_pct: 92.4, mediaEquipesESB: 1.2, procedimentosPerCapita: 0.82 },
  { faixaPopulacao: "5-20 mil hab", municipios: 1820, comESB: 1680, cobertura_pct: 78.6, mediaEquipesESB: 2.4, procedimentosPerCapita: 0.72 },
  { faixaPopulacao: "20-50 mil hab", municipios: 540, comESB: 498, cobertura_pct: 62.4, mediaEquipesESB: 4.8, procedimentosPerCapita: 0.58 },
  { faixaPopulacao: "50-100 mil hab", municipios: 280, comESB: 264, cobertura_pct: 48.2, mediaEquipesESB: 8.6, procedimentosPerCapita: 0.48 },
  { faixaPopulacao: "100-500 mil hab", municipios: 240, comESB: 232, cobertura_pct: 38.4, mediaEquipesESB: 22.4, procedimentosPerCapita: 0.42 },
  { faixaPopulacao: "> 500 mil hab", municipios: 48, comESB: 48, cobertura_pct: 28.6, mediaEquipesESB: 86.4, procedimentosPerCapita: 0.36 },
];

// =============================================================================
// INDICADORES CONSOLIDADOS SUS
// =============================================================================
export const indicadoresSUS = {
  totalEquipesESB: 30800,
  coberturaNacional: 40.2,
  totalCEOs: 1100,
  totalLRPDs: 680,
  procedimentosAno_mi: 118.6,
  investimentoFederal_bi: 2.80,
  municipiosComESB: 5180,
  primeiraConsulta_mil: 24800,
  tratamentoCompletado_mil: 18400,
  taxaResolutividade: 74.2,
  procedimentosPreventivos_pct: 42.1,
  procedimentosMutiladores_pct: 10.5,
  razaoExodontia_restauracao: 0.50,
};
