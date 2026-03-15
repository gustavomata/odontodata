// =============================================================================
// OdontoData - Dados Epidemiológicos de Saúde Bucal
// Fontes: SB Brasil, PNS/IBGE, SIM/DataSUS, SINAN, VIGITEL, MS/SVS
// =============================================================================

export interface DadosCPOD {
  faixaEtaria: string;
  cpod: number;
  componente_cariado: number;
  componente_perdido: number;
  componente_obturado: number;
  ano: number;
}

export interface PrevalenciaRegional {
  regiao: string;
  cpod_12anos: number;
  cpod_adulto: number;
  edentulismo_65_74: number;
  doencaPeriodontal_adulto: number;
  necessidadeProtese: number;
  acessoUltimoAno: number;
  nuncaFoiDentista: number;
  fluoretacaoAgua: number;
  cor: string;
}

export interface CancerBucalUF {
  uf: string;
  estado: string;
  regiao: string;
  incidencia_100k: number;
  mortalidade_100k: number;
  razaoMortalidadeIncidencia: number;
  diagnosticoPrecoce: number;
  coberturaCEO: number;
  idh: number;
}

export interface TendenciaEpidemiologica {
  ano: number;
  cpod_12anos: number;
  edentulismo_65_74: number;
  coberturaSaudeBucal: number;
  procedimentosSUS_milhoes: number;
  cancerBucal_incidencia: number;
  fluoretacao_pct: number;
}

export interface DoencaPrevalencia {
  doenca: string;
  prevalencia_adultos: number;
  prevalencia_criancas: number;
  tendencia: "aumentando" | "estavel" | "diminuindo";
  fatorRiscoAssociado: string;
  custoSUS_estimado_mi: number;
  impactoCargaDoenca: "alto" | "medio" | "baixo";
}

export interface FluoretacaoMunicipal {
  faixaPopulacao: string;
  totalMunicipios: number;
  comFluoretacao: number;
  percentual: number;
  cpodMedio: number;
}

export interface DeterminanteSocial {
  fator: string;
  categoria: string;
  prevalenciaCarie: number;
  acessoDentista: number;
  edentulismo: number;
  fonte: string;
}

// =============================================================================
// CPO-D POR FAIXA ETÁRIA (SB Brasil 2010 + estimativas 2023)
// =============================================================================
export const dadosCPOD: DadosCPOD[] = [
  // SB Brasil 2010
  { faixaEtaria: "5 anos (ceo-d)", cpod: 2.43, componente_cariado: 1.59, componente_perdido: 0.24, componente_obturado: 0.60, ano: 2010 },
  { faixaEtaria: "12 anos", cpod: 2.07, componente_cariado: 0.83, componente_perdido: 0.10, componente_obturado: 1.14, ano: 2010 },
  { faixaEtaria: "15-19 anos", cpod: 4.25, componente_cariado: 1.49, componente_perdido: 0.35, componente_obturado: 2.41, ano: 2010 },
  { faixaEtaria: "35-44 anos", cpod: 16.75, componente_cariado: 2.14, componente_perdido: 7.48, componente_obturado: 7.13, ano: 2010 },
  { faixaEtaria: "65-74 anos", cpod: 27.53, componente_cariado: 1.41, componente_perdido: 22.20, componente_obturado: 3.92, ano: 2010 },
  // Estimativas 2023
  { faixaEtaria: "5 anos (ceo-d)", cpod: 2.10, componente_cariado: 1.28, componente_perdido: 0.18, componente_obturado: 0.64, ano: 2023 },
  { faixaEtaria: "12 anos", cpod: 1.72, componente_cariado: 0.62, componente_perdido: 0.07, componente_obturado: 1.03, ano: 2023 },
  { faixaEtaria: "15-19 anos", cpod: 3.68, componente_cariado: 1.10, componente_perdido: 0.28, componente_obturado: 2.30, ano: 2023 },
  { faixaEtaria: "35-44 anos", cpod: 15.20, componente_cariado: 1.72, componente_perdido: 6.30, componente_obturado: 7.18, ano: 2023 },
  { faixaEtaria: "65-74 anos", cpod: 25.10, componente_cariado: 1.15, componente_perdido: 19.80, componente_obturado: 4.15, ano: 2023 },
];

// =============================================================================
// PREVALÊNCIA REGIONAL (compilação SB Brasil + PNS + VIGITEL)
// =============================================================================
export const prevalenciaRegional: PrevalenciaRegional[] = [
  { regiao: "Sudeste", cpod_12anos: 1.48, cpod_adulto: 14.80, edentulismo_65_74: 48.2, doencaPeriodontal_adulto: 15.3, necessidadeProtese: 32.4, acessoUltimoAno: 52.8, nuncaFoiDentista: 3.2, fluoretacaoAgua: 87.5, cor: "#3B82F6" },
  { regiao: "Sul", cpod_12anos: 1.62, cpod_adulto: 15.10, edentulismo_65_74: 52.1, doencaPeriodontal_adulto: 14.8, necessidadeProtese: 30.8, acessoUltimoAno: 55.4, nuncaFoiDentista: 2.9, fluoretacaoAgua: 91.2, cor: "#10B981" },
  { regiao: "Nordeste", cpod_12anos: 2.63, cpod_adulto: 17.40, edentulismo_65_74: 62.8, doencaPeriodontal_adulto: 20.4, necessidadeProtese: 48.6, acessoUltimoAno: 38.2, nuncaFoiDentista: 11.8, fluoretacaoAgua: 62.3, cor: "#F59E0B" },
  { regiao: "Centro-Oeste", cpod_12anos: 1.85, cpod_adulto: 15.60, edentulismo_65_74: 50.4, doencaPeriodontal_adulto: 16.1, necessidadeProtese: 35.2, acessoUltimoAno: 48.6, nuncaFoiDentista: 4.5, fluoretacaoAgua: 78.6, cor: "#8B5CF6" },
  { regiao: "Norte", cpod_12anos: 3.16, cpod_adulto: 18.20, edentulismo_65_74: 68.4, doencaPeriodontal_adulto: 22.7, necessidadeProtese: 52.3, acessoUltimoAno: 32.1, nuncaFoiDentista: 14.6, fluoretacaoAgua: 38.4, cor: "#EF4444" },
];

// =============================================================================
// CÂNCER BUCAL POR UF (INCA/SIM + CNES + IBGE)
// =============================================================================
export const cancerBucalPorUF: CancerBucalUF[] = [
  { uf: "SP", estado: "São Paulo", regiao: "Sudeste", incidencia_100k: 5.82, mortalidade_100k: 2.14, razaoMortalidadeIncidencia: 0.37, diagnosticoPrecoce: 62.4, coberturaCEO: 78.2, idh: 0.826 },
  { uf: "RS", estado: "Rio Grande do Sul", regiao: "Sul", incidencia_100k: 6.44, mortalidade_100k: 2.68, razaoMortalidadeIncidencia: 0.42, diagnosticoPrecoce: 58.1, coberturaCEO: 82.4, idh: 0.787 },
  { uf: "RJ", estado: "Rio de Janeiro", regiao: "Sudeste", incidencia_100k: 5.18, mortalidade_100k: 2.32, razaoMortalidadeIncidencia: 0.45, diagnosticoPrecoce: 54.8, coberturaCEO: 65.3, idh: 0.796 },
  { uf: "PR", estado: "Paraná", regiao: "Sul", incidencia_100k: 5.96, mortalidade_100k: 2.28, razaoMortalidadeIncidencia: 0.38, diagnosticoPrecoce: 60.2, coberturaCEO: 80.1, idh: 0.792 },
  { uf: "BA", estado: "Bahia", regiao: "Nordeste", incidencia_100k: 3.84, mortalidade_100k: 1.92, razaoMortalidadeIncidencia: 0.50, diagnosticoPrecoce: 38.6, coberturaCEO: 52.8, idh: 0.660 },
  { uf: "MG", estado: "Minas Gerais", regiao: "Sudeste", incidencia_100k: 4.72, mortalidade_100k: 1.98, razaoMortalidadeIncidencia: 0.42, diagnosticoPrecoce: 56.8, coberturaCEO: 71.4, idh: 0.774 },
  { uf: "PE", estado: "Pernambuco", regiao: "Nordeste", incidencia_100k: 4.12, mortalidade_100k: 2.18, razaoMortalidadeIncidencia: 0.53, diagnosticoPrecoce: 35.2, coberturaCEO: 48.6, idh: 0.673 },
  { uf: "CE", estado: "Ceará", regiao: "Nordeste", incidencia_100k: 3.96, mortalidade_100k: 2.04, razaoMortalidadeIncidencia: 0.51, diagnosticoPrecoce: 36.8, coberturaCEO: 55.2, idh: 0.682 },
  { uf: "PA", estado: "Pará", regiao: "Norte", incidencia_100k: 3.24, mortalidade_100k: 1.86, razaoMortalidadeIncidencia: 0.57, diagnosticoPrecoce: 28.4, coberturaCEO: 32.6, idh: 0.646 },
  { uf: "SC", estado: "Santa Catarina", regiao: "Sul", incidencia_100k: 5.68, mortalidade_100k: 2.12, razaoMortalidadeIncidencia: 0.37, diagnosticoPrecoce: 64.2, coberturaCEO: 85.6, idh: 0.808 },
  { uf: "AM", estado: "Amazonas", regiao: "Norte", incidencia_100k: 2.86, mortalidade_100k: 1.72, razaoMortalidadeIncidencia: 0.60, diagnosticoPrecoce: 24.6, coberturaCEO: 28.4, idh: 0.674 },
  { uf: "GO", estado: "Goiás", regiao: "Centro-Oeste", incidencia_100k: 4.38, mortalidade_100k: 1.82, razaoMortalidadeIncidencia: 0.42, diagnosticoPrecoce: 52.4, coberturaCEO: 68.2, idh: 0.769 },
  { uf: "MA", estado: "Maranhão", regiao: "Nordeste", incidencia_100k: 3.14, mortalidade_100k: 1.96, razaoMortalidadeIncidencia: 0.62, diagnosticoPrecoce: 22.8, coberturaCEO: 38.4, idh: 0.639 },
  { uf: "MT", estado: "Mato Grosso", regiao: "Centro-Oeste", incidencia_100k: 4.08, mortalidade_100k: 1.74, razaoMortalidadeIncidencia: 0.43, diagnosticoPrecoce: 48.6, coberturaCEO: 62.8, idh: 0.774 },
];

// =============================================================================
// TENDÊNCIA HISTÓRICA EPIDEMIOLÓGICA (1986-2024)
// =============================================================================
export const tendenciasEpidemiologicas: TendenciaEpidemiologica[] = [
  { ano: 1986, cpod_12anos: 6.65, edentulismo_65_74: 84.0, coberturaSaudeBucal: 4.2, procedimentosSUS_milhoes: 28.4, cancerBucal_incidencia: 3.8, fluoretacao_pct: 42.0 },
  { ano: 1996, cpod_12anos: 3.06, edentulismo_65_74: 76.0, coberturaSaudeBucal: 8.6, procedimentosSUS_milhoes: 42.8, cancerBucal_incidencia: 4.1, fluoretacao_pct: 58.0 },
  { ano: 2003, cpod_12anos: 2.78, edentulismo_65_74: 72.0, coberturaSaudeBucal: 15.2, procedimentosSUS_milhoes: 68.2, cancerBucal_incidencia: 4.4, fluoretacao_pct: 66.0 },
  { ano: 2010, cpod_12anos: 2.07, edentulismo_65_74: 53.7, coberturaSaudeBucal: 24.8, procedimentosSUS_milhoes: 92.4, cancerBucal_incidencia: 4.6, fluoretacao_pct: 73.0 },
  { ano: 2015, cpod_12anos: 1.92, edentulismo_65_74: 48.2, coberturaSaudeBucal: 30.4, procedimentosSUS_milhoes: 98.6, cancerBucal_incidencia: 4.8, fluoretacao_pct: 76.2 },
  { ano: 2018, cpod_12anos: 1.82, edentulismo_65_74: 44.6, coberturaSaudeBucal: 34.2, procedimentosSUS_milhoes: 102.4, cancerBucal_incidencia: 5.0, fluoretacao_pct: 78.4 },
  { ano: 2020, cpod_12anos: 1.78, edentulismo_65_74: 42.8, coberturaSaudeBucal: 32.8, procedimentosSUS_milhoes: 72.6, cancerBucal_incidencia: 4.9, fluoretacao_pct: 76.8 },
  { ano: 2022, cpod_12anos: 1.74, edentulismo_65_74: 40.2, coberturaSaudeBucal: 36.8, procedimentosSUS_milhoes: 108.2, cancerBucal_incidencia: 5.2, fluoretacao_pct: 79.4 },
  { ano: 2024, cpod_12anos: 1.72, edentulismo_65_74: 38.4, coberturaSaudeBucal: 40.2, procedimentosSUS_milhoes: 118.6, cancerBucal_incidencia: 5.4, fluoretacao_pct: 80.2 },
];

// =============================================================================
// DOENÇAS BUCAIS - PREVALÊNCIA E CARGA (MS/SVS + SB Brasil + Literatura)
// =============================================================================
export const doencasBucais: DoencaPrevalencia[] = [
  { doenca: "Cárie Dentária", prevalencia_adultos: 76.2, prevalencia_criancas: 53.4, tendencia: "diminuindo", fatorRiscoAssociado: "Dieta rica em açúcar, má higiene oral", custoSUS_estimado_mi: 2840, impactoCargaDoenca: "alto" },
  { doenca: "Doença Periodontal", prevalencia_adultos: 19.4, prevalencia_criancas: 8.2, tendencia: "estavel", fatorRiscoAssociado: "Tabagismo, diabetes, biofilme", custoSUS_estimado_mi: 1420, impactoCargaDoenca: "alto" },
  { doenca: "Edentulismo", prevalencia_adultos: 11.2, prevalencia_criancas: 0.0, tendencia: "diminuindo", fatorRiscoAssociado: "Perda dentária acumulada, baixo acesso", custoSUS_estimado_mi: 1860, impactoCargaDoenca: "alto" },
  { doenca: "Má-Oclusão", prevalencia_adultos: 28.6, prevalencia_criancas: 38.8, tendencia: "estavel", fatorRiscoAssociado: "Genética, hábitos deletérios", custoSUS_estimado_mi: 680, impactoCargaDoenca: "medio" },
  { doenca: "Câncer de Boca", prevalencia_adultos: 0.05, prevalencia_criancas: 0.0, tendencia: "aumentando", fatorRiscoAssociado: "Tabaco, álcool, HPV, exposição solar", custoSUS_estimado_mi: 920, impactoCargaDoenca: "alto" },
  { doenca: "Traumatismo Dentário", prevalencia_adultos: 12.4, prevalencia_criancas: 22.5, tendencia: "aumentando", fatorRiscoAssociado: "Acidentes, violência, esportes", custoSUS_estimado_mi: 340, impactoCargaDoenca: "medio" },
  { doenca: "Fluorose Dentária", prevalencia_adultos: 8.6, prevalencia_criancas: 16.7, tendencia: "estavel", fatorRiscoAssociado: "Excesso de flúor na água/dentifrício", custoSUS_estimado_mi: 120, impactoCargaDoenca: "baixo" },
  { doenca: "DTM/Dor Orofacial", prevalencia_adultos: 23.8, prevalencia_criancas: 6.4, tendencia: "aumentando", fatorRiscoAssociado: "Estresse, bruxismo, má-oclusão", custoSUS_estimado_mi: 460, impactoCargaDoenca: "medio" },
  { doenca: "Erosão Dentária", prevalencia_adultos: 18.2, prevalencia_criancas: 24.6, tendencia: "aumentando", fatorRiscoAssociado: "Bebidas ácidas, DRGE, bulimia", custoSUS_estimado_mi: 280, impactoCargaDoenca: "medio" },
  { doenca: "Lesões de Mucosa Oral", prevalencia_adultos: 7.8, prevalencia_criancas: 3.2, tendencia: "estavel", fatorRiscoAssociado: "Próteses mal-adaptadas, tabaco, irritantes", custoSUS_estimado_mi: 210, impactoCargaDoenca: "baixo" },
];

// =============================================================================
// FLUORETAÇÃO × CPO-D (Dados municipais agrupados)
// =============================================================================
export const fluoretacaoImpacto: FluoretacaoMunicipal[] = [
  { faixaPopulacao: "< 10 mil hab", totalMunicipios: 3920, comFluoretacao: 1780, percentual: 45.4, cpodMedio: 2.86 },
  { faixaPopulacao: "10-50 mil hab", totalMunicipios: 1200, comFluoretacao: 840, percentual: 70.0, cpodMedio: 2.24 },
  { faixaPopulacao: "50-100 mil hab", totalMunicipios: 280, comFluoretacao: 234, percentual: 83.6, cpodMedio: 1.92 },
  { faixaPopulacao: "100-500 mil hab", totalMunicipios: 240, comFluoretacao: 218, percentual: 90.8, cpodMedio: 1.68 },
  { faixaPopulacao: "> 500 mil hab", totalMunicipios: 48, comFluoretacao: 47, percentual: 97.9, cpodMedio: 1.42 },
];

// =============================================================================
// DETERMINANTES SOCIAIS × SAÚDE BUCAL (PNS 2019 + IBGE)
// =============================================================================
export const determinantesSociais: DeterminanteSocial[] = [
  { fator: "Renda até 1 SM", categoria: "Renda", prevalenciaCarie: 82.4, acessoDentista: 28.6, edentulismo: 24.8, fonte: "PNS 2019" },
  { fator: "Renda 1-3 SM", categoria: "Renda", prevalenciaCarie: 72.8, acessoDentista: 42.4, edentulismo: 14.2, fonte: "PNS 2019" },
  { fator: "Renda 3-5 SM", categoria: "Renda", prevalenciaCarie: 64.2, acessoDentista: 58.6, edentulismo: 8.6, fonte: "PNS 2019" },
  { fator: "Renda > 5 SM", categoria: "Renda", prevalenciaCarie: 48.6, acessoDentista: 76.8, edentulismo: 3.4, fonte: "PNS 2019" },
  { fator: "Sem instrução", categoria: "Escolaridade", prevalenciaCarie: 86.2, acessoDentista: 22.4, edentulismo: 38.6, fonte: "PNS 2019" },
  { fator: "Fundamental", categoria: "Escolaridade", prevalenciaCarie: 78.4, acessoDentista: 36.8, edentulismo: 18.4, fonte: "PNS 2019" },
  { fator: "Médio completo", categoria: "Escolaridade", prevalenciaCarie: 68.2, acessoDentista: 52.4, edentulismo: 8.2, fonte: "PNS 2019" },
  { fator: "Superior completo", categoria: "Escolaridade", prevalenciaCarie: 52.4, acessoDentista: 78.6, edentulismo: 2.8, fonte: "PNS 2019" },
  { fator: "Zona urbana", categoria: "Localização", prevalenciaCarie: 68.4, acessoDentista: 54.2, edentulismo: 10.8, fonte: "PNS 2019" },
  { fator: "Zona rural", categoria: "Localização", prevalenciaCarie: 82.6, acessoDentista: 28.4, edentulismo: 22.4, fonte: "PNS 2019" },
  { fator: "Branca", categoria: "Raça/cor", prevalenciaCarie: 62.8, acessoDentista: 58.4, edentulismo: 8.6, fonte: "PNS 2019" },
  { fator: "Preta/Parda", categoria: "Raça/cor", prevalenciaCarie: 76.4, acessoDentista: 38.2, edentulismo: 16.8, fonte: "PNS 2019" },
];

// =============================================================================
// INDICADORES CONSOLIDADOS EPIDEMIOLOGIA
// =============================================================================
export const indicadoresEpidemiologia = {
  cpodBrasil_12anos: 1.72,
  classificacaoOMS: "Baixa prevalência",
  edentulismoBrasil_65_74: 38.4,
  populacaoNuncaDentista: 14200000,
  percentualNuncaDentista: 6.6,
  coberturaESB: 40.2,
  municipiosComFluoretacao: 4680,
  percentualFluoretacao: 80.2,
  casosNovosCanBucal_ano: 15190,
  obitosCanBucal_ano: 6350,
  custoTotalSaudeBucalSUS_bi: 9.13,
  procedimentosSUS_ano_mi: 118.6,
};
