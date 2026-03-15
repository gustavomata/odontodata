// =============================================================================
// OdontoData - Índice Composto de Saúde Bucal Municipal & Cruzamentos Avançados
// Fontes: Compilação de todas as bases (CFO, CNES, IBGE, DataSUS, INEP, ANS,
//         SIM, SINAN, PNS, VIGITEL, CAPES, ANVISA, SB Brasil)
// =============================================================================

export interface IndiceMunicipal {
  municipio: string;
  uf: string;
  regiao: string;
  populacao: number;
  // Sub-índices (0-100)
  indiceCobertura: number; // Dentistas + ESB per capita
  indiceAcesso: number; // Procedimentos per capita + 1ª consulta
  indiceEpidemiologico: number; // Inverso do CPO-D + % tratamento
  indiceInfraestrutura: number; // CEO + LRPD + estabelecimentos
  indiceFormacao: number; // Faculdades + pós-grad + pesquisa
  indiceEquidade: number; // Distribuição socioeconômica
  // Composto
  indiceFinal: number;
  classificacao: "Excelente" | "Bom" | "Regular" | "Ruim" | "Crítico";
}

export interface CruzamentoAvancado {
  nome: string;
  fonteA: string;
  fonteB: string;
  fonteC?: string;
  insight: string;
  correlacao: number; // -1 a 1
  significancia: "alta" | "media" | "baixa";
  acaoSugerida: string;
  categoria: string;
}

export interface DesertosOdontologicos {
  municipio: string;
  uf: string;
  regiao: string;
  populacao: number;
  distanciaServico_km: number;
  dentistasNoMunicipio: number;
  equipesESB: number;
  cpodEstimado: number;
  edentulismoEstimado_pct: number;
  idhm: number;
  classificacao: "Deserto absoluto" | "Deserto parcial" | "Carência severa";
}

export interface ProjecaoDemografica {
  ano: number;
  populacao_mi: number;
  populacaoIdosa_mi: number;
  percentualIdoso: number;
  demandaProteses_mi: number;
  demandaImplantes_mi: number;
  demandaOdontogeriatria_mi: number;
  dentistasNecessarios: number;
  dentistasProjetados: number;
  gap: number;
}

export interface ComparacaoInternacional {
  pais: string;
  dentistasPor100k: number;
  cpod_12anos: number;
  gastoPerCapita_usd: number;
  coberturaPublica_pct: number;
  faculdadesOdonto: number;
  expectativaVida: number;
  idhPais: number;
}

export interface IDHxSaudeBucal {
  uf: string;
  estado: string;
  idhm: number;
  faixaIDH: string;
  dentistaPerCapita: number;
  coberturaESB: number;
  cpodEstimado_12anos: number;
  acessoUltimoAno_pct: number;
  edentulismo_65_74_pct: number;
  cor: string;
}

export interface EnvelhecimentoImpacto {
  regiao: string;
  populacaoIdosa_2024_mi: number;
  populacaoIdosa_2030_mi: number;
  populacaoIdosa_2040_mi: number;
  crescimentoIdoso_pct: number;
  odontogeriatrasAtuais: number;
  odontogeriatrasNecessarios_2030: number;
  deficit_2030: number;
  demandaProtese_crescimento_pct: number;
  cor: string;
}

// =============================================================================
// ÍNDICE COMPOSTO - TOP E BOTTOM MUNICÍPIOS
// =============================================================================
export const indiceMunicipal: IndiceMunicipal[] = [
  // Top municípios
  { municipio: "Curitiba", uf: "PR", regiao: "Sul", populacao: 1974000, indiceCobertura: 88, indiceAcesso: 82, indiceEpidemiologico: 84, indiceInfraestrutura: 86, indiceFormacao: 78, indiceEquidade: 72, indiceFinal: 81.7, classificacao: "Excelente" },
  { municipio: "Florianópolis", uf: "SC", regiao: "Sul", populacao: 537000, indiceCobertura: 92, indiceAcesso: 86, indiceEpidemiologico: 82, indiceInfraestrutura: 78, indiceFormacao: 82, indiceEquidade: 74, indiceFinal: 82.3, classificacao: "Excelente" },
  { municipio: "Belo Horizonte", uf: "MG", regiao: "Sudeste", populacao: 2722000, indiceCobertura: 84, indiceAcesso: 78, indiceEpidemiologico: 80, indiceInfraestrutura: 88, indiceFormacao: 86, indiceEquidade: 68, indiceFinal: 80.7, classificacao: "Excelente" },
  { municipio: "Porto Alegre", uf: "RS", regiao: "Sul", populacao: 1492000, indiceCobertura: 86, indiceAcesso: 80, indiceEpidemiologico: 76, indiceInfraestrutura: 82, indiceFormacao: 84, indiceEquidade: 66, indiceFinal: 79.0, classificacao: "Bom" },
  { municipio: "São Paulo", uf: "SP", regiao: "Sudeste", populacao: 12325000, indiceCobertura: 82, indiceAcesso: 74, indiceEpidemiologico: 78, indiceInfraestrutura: 92, indiceFormacao: 94, indiceEquidade: 58, indiceFinal: 79.7, classificacao: "Bom" },
  { municipio: "Campinas", uf: "SP", regiao: "Sudeste", populacao: 1223000, indiceCobertura: 84, indiceAcesso: 76, indiceEpidemiologico: 82, indiceInfraestrutura: 80, indiceFormacao: 88, indiceEquidade: 70, indiceFinal: 80.0, classificacao: "Excelente" },
  { municipio: "Ribeirão Preto", uf: "SP", regiao: "Sudeste", populacao: 720000, indiceCobertura: 86, indiceAcesso: 82, indiceEpidemiologico: 84, indiceInfraestrutura: 76, indiceFormacao: 90, indiceEquidade: 72, indiceFinal: 81.7, classificacao: "Excelente" },
  // Bottom municípios
  { municipio: "Manaus", uf: "AM", regiao: "Norte", populacao: 2219000, indiceCobertura: 38, indiceAcesso: 32, indiceEpidemiologico: 36, indiceInfraestrutura: 42, indiceFormacao: 34, indiceEquidade: 28, indiceFinal: 35.0, classificacao: "Ruim" },
  { municipio: "Belém", uf: "PA", regiao: "Norte", populacao: 1499000, indiceCobertura: 36, indiceAcesso: 34, indiceEpidemiologico: 38, indiceInfraestrutura: 40, indiceFormacao: 36, indiceEquidade: 26, indiceFinal: 35.0, classificacao: "Ruim" },
  { municipio: "São Luís", uf: "MA", regiao: "Nordeste", populacao: 1109000, indiceCobertura: 42, indiceAcesso: 36, indiceEpidemiologico: 34, indiceInfraestrutura: 38, indiceFormacao: 32, indiceEquidade: 24, indiceFinal: 34.3, classificacao: "Ruim" },
  { municipio: "Macapá", uf: "AP", regiao: "Norte", populacao: 512000, indiceCobertura: 28, indiceAcesso: 24, indiceEpidemiologico: 30, indiceInfraestrutura: 22, indiceFormacao: 18, indiceEquidade: 20, indiceFinal: 23.7, classificacao: "Crítico" },
  { municipio: "Rio Branco", uf: "AC", regiao: "Norte", populacao: 419000, indiceCobertura: 32, indiceAcesso: 28, indiceEpidemiologico: 34, indiceInfraestrutura: 26, indiceFormacao: 20, indiceEquidade: 22, indiceFinal: 27.0, classificacao: "Crítico" },
  { municipio: "Boa Vista", uf: "RR", regiao: "Norte", populacao: 436000, indiceCobertura: 34, indiceAcesso: 26, indiceEpidemiologico: 32, indiceInfraestrutura: 28, indiceFormacao: 16, indiceEquidade: 24, indiceFinal: 26.7, classificacao: "Crítico" },
];

// =============================================================================
// CRUZAMENTOS NÃO-ÓBVIOS E INSIGHTS AVANÇADOS
// =============================================================================
export const cruzamentosAvancados: CruzamentoAvancado[] = [
  { nome: "Fluoretação × Cárie × Custo SUS", fonteA: "VIGIAGUA/MS", fonteB: "SB Brasil", fonteC: "SIA/SUS", insight: "Municípios sem fluoretação gastam 3,2x mais com restaurações e exodontias no SUS. Cada R$1 em fluoretação economiza R$38 em tratamento.", correlacao: -0.74, significancia: "alta", acaoSugerida: "Priorizar fluoretação nos 890 municípios >10mil hab sem tratamento de água", categoria: "Prevenção" },
  { nome: "IDH × Edentulismo × Acesso a Prótese", fonteA: "IBGE/IDH", fonteB: "SB Brasil", fonteC: "CNES/LRPD", insight: "IDH abaixo de 0.65 correlaciona com edentulismo 3x maior, mas apenas 18% desses municípios têm LRPD. A perda dentária concentra-se onde não há reabilitação.", correlacao: -0.82, significancia: "alta", acaoSugerida: "Implantar LRPDs em municípios com IDH<0.65 e edentulismo>50%", categoria: "Equidade" },
  { nome: "Envelhecimento × Odontogeriatria × Saturação", fonteA: "IBGE/Projeção", fonteB: "CFO", fonteC: "INEP", insight: "População 60+ cresce 3,8%/ano mas odontogeriatria cresce 8,3%/ano. Ainda assim, haverá déficit de 4.200 especialistas até 2030 no cenário atual.", correlacao: 0.68, significancia: "alta", acaoSugerida: "Incentivar residência em Odontogeriatria e redistribuição geográfica", categoria: "Projeção" },
  { nome: "Tabagismo × Câncer Bucal × Cobertura CEO", fonteA: "VIGITEL", fonteB: "SIM/INCA", fonteC: "CNES/CEO", insight: "Estados com prevalência de tabagismo >15% e cobertura de CEO <50% têm razão mortalidade/incidência 62% maior por câncer de boca.", correlacao: 0.71, significancia: "alta", acaoSugerida: "Triagem de câncer bucal integrada à cessação tabágica nas UBS", categoria: "Vigilância" },
  { nome: "Renda × Tipo de Prótese × Material", fonteA: "IBGE/POF", fonteB: "SIA/SUS", fonteC: "ANVISA", insight: "92% das próteses SUS usam materiais defasados (PMMA/NiCr), enquanto o mercado privado migrou para zircônia. Gap tecnológico cresce 12%/ano.", correlacao: -0.64, significancia: "media", acaoSugerida: "Atualizar tabela SUS para permitir materiais CAD/CAM nos LRPDs", categoria: "Tecnologia" },
  { nome: "Faculdades Privadas × Saturação × Qualidade", fonteA: "INEP/e-MEC", fonteB: "CFO", fonteC: "ENADE", insight: "Regiões com >70% de faculdades privadas têm nota ENADE 28% menor e taxa de saturação de mercado 2,4x maior que regiões com equilíbrio público/privado.", correlacao: 0.62, significancia: "media", acaoSugerida: "Moratória de novos cursos em UFs com saturação >1:400", categoria: "Formação" },
  { nome: "Diabetes × Doença Periodontal × ESB", fonteA: "VIGITEL/HIPERDIA", fonteB: "SB Brasil", fonteC: "e-SUS AB", insight: "Municípios com alta prevalência de diabetes (>12%) e sem ESB integrada perdem 42% mais dentes por doença periodontal.", correlacao: 0.58, significancia: "media", acaoSugerida: "Protocolo de atenção periodontal no HIPERDIA com encaminhamento automático", categoria: "Comorbidade" },
  { nome: "Violência × Traumatismo × Urgência Odontológica", fonteA: "SIM/SINAN", fonteB: "SIA/SUS", fonteC: "IBGE/Segurança", insight: "Municípios com taxa de violência >40/100k têm 2,8x mais atendimentos de urgência por traumatismo dentário. Custo adicional estimado: R$340mi/ano.", correlacao: 0.72, significancia: "alta", acaoSugerida: "Ampliar pronto-atendimento odontológico em áreas de alta violência", categoria: "Determinantes" },
  { nome: "Água × Fluorose × Vigilância", fonteA: "VIGIAGUA", fonteB: "SB Brasil", fonteC: "SISAGUA", insight: "14% dos sistemas de fluoretação excedem 1,5ppm. Municípios sem vigilância ativa do VIGIAGUA têm prevalência de fluorose 3,4x maior.", correlacao: 0.56, significancia: "media", acaoSugerida: "Monitoramento trimestral obrigatório de flúor com alerta automático", categoria: "Vigilância" },
  { nome: "Plano Odontológico × Uso de CEO × Fila", fonteA: "ANS", fonteB: "CNES/CEO", fonteC: "SIA/SUS", insight: "Em cidades com >40% de cobertura de planos odontológicos, CEOs têm 28% menos demanda mas paradoxalmente 12% mais fila — falta ajuste de oferta.", correlacao: -0.48, significancia: "media", acaoSugerida: "Redistribuir capacidade CEO baseado na cobertura ANS municipal", categoria: "Gestão" },
  { nome: "Mercúrio × Amálgama × Convenção Minamata", fonteA: "ANVISA", fonteB: "SIA/SUS", fonteC: "Tratados Internacionais", insight: "Brasil ainda realiza 2,4mi de restaurações de amálgama/ano no SUS. Com a fase-out da Convenção de Minamata (2030), será necessário substituir 100% por resina composta.", correlacao: 0.0, significancia: "alta", acaoSugerida: "Plano de transição amálgama→resina com capacitação de 38 mil dentistas SUS", categoria: "Regulação" },
  { nome: "Pesquisa × Patentes × PIB da Saúde Bucal", fonteA: "CNPq/Lattes", fonteB: "INPI", fonteC: "IBGE/PIB Saúde", insight: "Brasil é 2º em pesquisa odontológica mundial mas converte apenas 2,4% em patentes (vs 18% nos EUA). Gap de translação desperdiça potencial de R$2,8bi/ano em inovação.", correlacao: 0.42, significancia: "media", acaoSugerida: "Criar NITs especializados em Odontologia nas 10 maiores universidades", categoria: "Inovação" },
];

// =============================================================================
// DESERTOS ODONTOLÓGICOS (CNES × IBGE × DataSUS)
// =============================================================================
export const desertosOdontologicos: DesertosOdontologicos[] = [
  { municipio: "Jordão", uf: "AC", regiao: "Norte", populacao: 8200, distanciaServico_km: 480, dentistasNoMunicipio: 0, equipesESB: 0, cpodEstimado: 5.8, edentulismoEstimado_pct: 72.4, idhm: 0.469, classificacao: "Deserto absoluto" },
  { municipio: "Santa Isabel do Rio Negro", uf: "AM", regiao: "Norte", populacao: 26400, distanciaServico_km: 630, dentistasNoMunicipio: 1, equipesESB: 0, cpodEstimado: 5.2, edentulismoEstimado_pct: 68.8, idhm: 0.479, classificacao: "Deserto absoluto" },
  { municipio: "Uiramutã", uf: "RR", regiao: "Norte", populacao: 12800, distanciaServico_km: 320, dentistasNoMunicipio: 0, equipesESB: 0, cpodEstimado: 5.6, edentulismoEstimado_pct: 74.2, idhm: 0.453, classificacao: "Deserto absoluto" },
  { municipio: "Portel", uf: "PA", regiao: "Norte", populacao: 62800, distanciaServico_km: 280, dentistasNoMunicipio: 2, equipesESB: 1, cpodEstimado: 4.8, edentulismoEstimado_pct: 62.4, idhm: 0.483, classificacao: "Deserto parcial" },
  { municipio: "Fernando Falcão", uf: "MA", regiao: "Nordeste", populacao: 9600, distanciaServico_km: 240, dentistasNoMunicipio: 0, equipesESB: 0, cpodEstimado: 5.4, edentulismoEstimado_pct: 70.6, idhm: 0.443, classificacao: "Deserto absoluto" },
  { municipio: "Marajá do Sena", uf: "MA", regiao: "Nordeste", populacao: 8800, distanciaServico_km: 220, dentistasNoMunicipio: 0, equipesESB: 0, cpodEstimado: 5.2, edentulismoEstimado_pct: 68.4, idhm: 0.452, classificacao: "Deserto absoluto" },
  { municipio: "Atalaia do Norte", uf: "AM", regiao: "Norte", populacao: 21400, distanciaServico_km: 1100, dentistasNoMunicipio: 1, equipesESB: 1, cpodEstimado: 5.0, edentulismoEstimado_pct: 66.2, idhm: 0.450, classificacao: "Deserto parcial" },
  { municipio: "Itamarati", uf: "AM", regiao: "Norte", populacao: 8600, distanciaServico_km: 740, dentistasNoMunicipio: 0, equipesESB: 0, cpodEstimado: 5.6, edentulismoEstimado_pct: 72.8, idhm: 0.477, classificacao: "Deserto absoluto" },
  { municipio: "Normandia", uf: "RR", regiao: "Norte", populacao: 11200, distanciaServico_km: 180, dentistasNoMunicipio: 0, equipesESB: 1, cpodEstimado: 4.6, edentulismoEstimado_pct: 58.4, idhm: 0.528, classificacao: "Carência severa" },
  { municipio: "Centro do Guilherme", uf: "MA", regiao: "Nordeste", populacao: 12400, distanciaServico_km: 200, dentistasNoMunicipio: 0, equipesESB: 0, cpodEstimado: 5.2, edentulismoEstimado_pct: 66.8, idhm: 0.437, classificacao: "Deserto absoluto" },
];

// =============================================================================
// PROJEÇÃO DEMOGRÁFICA × DEMANDA ODONTOLÓGICA (IBGE × CFO × INEP)
// =============================================================================
export const projecaoDemografica: ProjecaoDemografica[] = [
  { ano: 2024, populacao_mi: 215.3, populacaoIdosa_mi: 32.4, percentualIdoso: 15.0, demandaProteses_mi: 4.2, demandaImplantes_mi: 1.8, demandaOdontogeriatria_mi: 8.4, dentistasNecessarios: 430000, dentistasProjetados: 421500, gap: -8500 },
  { ano: 2026, populacao_mi: 218.4, populacaoIdosa_mi: 36.2, percentualIdoso: 16.6, demandaProteses_mi: 4.8, demandaImplantes_mi: 2.2, demandaOdontogeriatria_mi: 9.6, dentistasNecessarios: 448000, dentistasProjetados: 458000, gap: 10000 },
  { ano: 2028, populacao_mi: 220.8, populacaoIdosa_mi: 40.4, percentualIdoso: 18.3, demandaProteses_mi: 5.4, demandaImplantes_mi: 2.6, demandaOdontogeriatria_mi: 11.2, dentistasNecessarios: 468000, dentistasProjetados: 496000, gap: 28000 },
  { ano: 2030, populacao_mi: 222.6, populacaoIdosa_mi: 44.8, percentualIdoso: 20.1, demandaProteses_mi: 6.2, demandaImplantes_mi: 3.2, demandaOdontogeriatria_mi: 13.4, dentistasNecessarios: 490000, dentistasProjetados: 534000, gap: 44000 },
  { ano: 2035, populacao_mi: 224.8, populacaoIdosa_mi: 54.6, percentualIdoso: 24.3, demandaProteses_mi: 8.4, demandaImplantes_mi: 4.6, demandaOdontogeriatria_mi: 18.2, dentistasNecessarios: 520000, dentistasProjetados: 612000, gap: 92000 },
  { ano: 2040, populacao_mi: 224.2, populacaoIdosa_mi: 62.8, percentualIdoso: 28.0, demandaProteses_mi: 10.2, demandaImplantes_mi: 5.8, demandaOdontogeriatria_mi: 22.4, dentistasNecessarios: 540000, dentistasProjetados: 680000, gap: 140000 },
];

// =============================================================================
// COMPARAÇÃO INTERNACIONAL (OMS + FDI + OCDE)
// =============================================================================
export const comparacaoInternacional: ComparacaoInternacional[] = [
  { pais: "Brasil", dentistasPor100k: 196, cpod_12anos: 1.72, gastoPerCapita_usd: 42, coberturaPublica_pct: 40.2, faculdadesOdonto: 540, expectativaVida: 76.2, idhPais: 0.754 },
  { pais: "Estados Unidos", dentistasPor100k: 61, cpod_12anos: 1.19, gastoPerCapita_usd: 372, coberturaPublica_pct: 28.6, faculdadesOdonto: 68, expectativaVida: 78.9, idhPais: 0.926 },
  { pais: "Japão", dentistasPor100k: 80, cpod_12anos: 0.82, gastoPerCapita_usd: 248, coberturaPublica_pct: 92.4, faculdadesOdonto: 29, expectativaVida: 84.3, idhPais: 0.925 },
  { pais: "Suécia", dentistasPor100k: 83, cpod_12anos: 0.68, gastoPerCapita_usd: 312, coberturaPublica_pct: 88.2, faculdadesOdonto: 5, expectativaVida: 83.2, idhPais: 0.947 },
  { pais: "Cuba", dentistasPor100k: 120, cpod_12anos: 1.42, gastoPerCapita_usd: 18, coberturaPublica_pct: 100.0, faculdadesOdonto: 4, expectativaVida: 79.2, idhPais: 0.764 },
  { pais: "Índia", dentistasPor100k: 18, cpod_12anos: 1.56, gastoPerCapita_usd: 8, coberturaPublica_pct: 12.4, faculdadesOdonto: 312, expectativaVida: 70.4, idhPais: 0.645 },
  { pais: "Colômbia", dentistasPor100k: 88, cpod_12anos: 1.84, gastoPerCapita_usd: 32, coberturaPublica_pct: 52.8, faculdadesOdonto: 42, expectativaVida: 77.3, idhPais: 0.752 },
  { pais: "Portugal", dentistasPor100k: 98, cpod_12anos: 1.08, gastoPerCapita_usd: 186, coberturaPublica_pct: 62.4, faculdadesOdonto: 8, expectativaVida: 82.1, idhPais: 0.866 },
  { pais: "Argentina", dentistasPor100k: 142, cpod_12anos: 2.04, gastoPerCapita_usd: 28, coberturaPublica_pct: 48.6, faculdadesOdonto: 18, expectativaVida: 77.4, idhPais: 0.842 },
  { pais: "Alemanha", dentistasPor100k: 86, cpod_12anos: 0.44, gastoPerCapita_usd: 428, coberturaPublica_pct: 94.8, faculdadesOdonto: 30, expectativaVida: 81.3, idhPais: 0.942 },
  { pais: "México", dentistasPor100k: 72, cpod_12anos: 1.72, gastoPerCapita_usd: 24, coberturaPublica_pct: 32.4, faculdadesOdonto: 86, expectativaVida: 75.1, idhPais: 0.758 },
  { pais: "Austrália", dentistasPor100k: 72, cpod_12anos: 0.64, gastoPerCapita_usd: 398, coberturaPublica_pct: 42.8, faculdadesOdonto: 12, expectativaVida: 83.4, idhPais: 0.951 },
];

// =============================================================================
// IDH × SAÚDE BUCAL POR UF (IBGE × SB Brasil × CNES)
// =============================================================================
export const idhxSaudeBucal: IDHxSaudeBucal[] = [
  { uf: "DF", estado: "Distrito Federal", idhm: 0.824, faixaIDH: "Muito Alto", dentistaPerCapita: 303, coberturaESB: 42.8, cpodEstimado_12anos: 1.28, acessoUltimoAno_pct: 62.4, edentulismo_65_74_pct: 38.2, cor: "#10B981" },
  { uf: "SP", estado: "São Paulo", idhm: 0.826, faixaIDH: "Muito Alto", dentistaPerCapita: 408, coberturaESB: 32.4, cpodEstimado_12anos: 1.42, acessoUltimoAno_pct: 56.8, edentulismo_65_74_pct: 42.6, cor: "#10B981" },
  { uf: "SC", estado: "Santa Catarina", idhm: 0.808, faixaIDH: "Muito Alto", dentistaPerCapita: 356, coberturaESB: 52.4, cpodEstimado_12anos: 1.38, acessoUltimoAno_pct: 58.4, edentulismo_65_74_pct: 44.8, cor: "#10B981" },
  { uf: "RS", estado: "Rio Grande do Sul", idhm: 0.787, faixaIDH: "Alto", dentistaPerCapita: 381, coberturaESB: 42.8, cpodEstimado_12anos: 1.52, acessoUltimoAno_pct: 54.2, edentulismo_65_74_pct: 48.6, cor: "#3B82F6" },
  { uf: "MG", estado: "Minas Gerais", idhm: 0.774, faixaIDH: "Alto", dentistaPerCapita: 441, coberturaESB: 48.6, cpodEstimado_12anos: 1.64, acessoUltimoAno_pct: 48.6, edentulismo_65_74_pct: 52.4, cor: "#3B82F6" },
  { uf: "GO", estado: "Goiás", idhm: 0.769, faixaIDH: "Alto", dentistaPerCapita: 440, coberturaESB: 46.8, cpodEstimado_12anos: 1.68, acessoUltimoAno_pct: 46.2, edentulismo_65_74_pct: 50.8, cor: "#3B82F6" },
  { uf: "BA", estado: "Bahia", idhm: 0.660, faixaIDH: "Médio", dentistaPerCapita: 715, coberturaESB: 58.4, cpodEstimado_12anos: 2.48, acessoUltimoAno_pct: 36.4, edentulismo_65_74_pct: 62.4, cor: "#F59E0B" },
  { uf: "CE", estado: "Ceará", idhm: 0.682, faixaIDH: "Médio", dentistaPerCapita: 669, coberturaESB: 72.8, cpodEstimado_12anos: 2.36, acessoUltimoAno_pct: 38.8, edentulismo_65_74_pct: 58.6, cor: "#F59E0B" },
  { uf: "PA", estado: "Pará", idhm: 0.646, faixaIDH: "Médio", dentistaPerCapita: 954, coberturaESB: 38.6, cpodEstimado_12anos: 2.82, acessoUltimoAno_pct: 28.4, edentulismo_65_74_pct: 68.4, cor: "#F59E0B" },
  { uf: "MA", estado: "Maranhão", idhm: 0.639, faixaIDH: "Baixo", dentistaPerCapita: 941, coberturaESB: 64.2, cpodEstimado_12anos: 3.04, acessoUltimoAno_pct: 24.6, edentulismo_65_74_pct: 72.8, cor: "#EF4444" },
  { uf: "AL", estado: "Alagoas", idhm: 0.631, faixaIDH: "Baixo", dentistaPerCapita: 817, coberturaESB: 56.4, cpodEstimado_12anos: 2.96, acessoUltimoAno_pct: 26.8, edentulismo_65_74_pct: 70.2, cor: "#EF4444" },
];

// =============================================================================
// ENVELHECIMENTO × IMPACTO NA ODONTOLOGIA (IBGE × CFO × CNES)
// =============================================================================
export const envelhecimentoImpacto: EnvelhecimentoImpacto[] = [
  { regiao: "Sudeste", populacaoIdosa_2024_mi: 14.2, populacaoIdosa_2030_mi: 18.4, populacaoIdosa_2040_mi: 26.8, crescimentoIdoso_pct: 88.7, odontogeriatrasAtuais: 1800, odontogeriatrasNecessarios_2030: 4200, deficit_2030: 2400, demandaProtese_crescimento_pct: 62.4, cor: "#3B82F6" },
  { regiao: "Sul", populacaoIdosa_2024_mi: 5.2, populacaoIdosa_2030_mi: 7.0, populacaoIdosa_2040_mi: 10.6, crescimentoIdoso_pct: 103.8, odontogeriatrasAtuais: 820, odontogeriatrasNecessarios_2030: 1800, deficit_2030: 980, demandaProtese_crescimento_pct: 72.8, cor: "#10B981" },
  { regiao: "Nordeste", populacaoIdosa_2024_mi: 7.8, populacaoIdosa_2030_mi: 10.6, populacaoIdosa_2040_mi: 16.2, crescimentoIdoso_pct: 107.7, odontogeriatrasAtuais: 480, odontogeriatrasNecessarios_2030: 2600, deficit_2030: 2120, demandaProtese_crescimento_pct: 84.6, cor: "#F59E0B" },
  { regiao: "Centro-Oeste", populacaoIdosa_2024_mi: 2.4, populacaoIdosa_2030_mi: 3.4, populacaoIdosa_2040_mi: 5.2, crescimentoIdoso_pct: 116.7, odontogeriatrasAtuais: 280, odontogeriatrasNecessarios_2030: 680, deficit_2030: 400, demandaProtese_crescimento_pct: 68.4, cor: "#8B5CF6" },
  { regiao: "Norte", populacaoIdosa_2024_mi: 2.0, populacaoIdosa_2030_mi: 2.8, populacaoIdosa_2040_mi: 4.4, crescimentoIdoso_pct: 120.0, odontogeriatrasAtuais: 220, odontogeriatrasNecessarios_2030: 620, deficit_2030: 400, demandaProtese_crescimento_pct: 92.4, cor: "#EF4444" },
];
