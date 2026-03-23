// =============================================================================
// OdontoData - Inteligência Locacional "Onde Abrir"
// Fontes: CFO, IBGE, CNES, DataSUS, INEP, PNS
// =============================================================================

export interface ScoreMunicipio {
  municipio: string;
  uf: string;
  regiao: string;
  populacao: number;
  dentistas_total: number;
  dentistas_por_hab: number;
  renda_per_capita: number;
  cobertura_esb: number;
  idh: number;
  formandos_ano: number;
  score_oportunidade: number;
  classificacao: "Excelente" | "Muito Bom" | "Bom" | "Moderado" | "Saturado";
  fatores_positivos: string[];
  fatores_negativos: string[];
}

export interface SaturacaoEspecialidade {
  especialidade: string;
  media_nacional: number;
  top5_saturadas: { cidade: string; valor: number }[];
  top5_oportunidades: { cidade: string; valor: number }[];
  tendencia: "Saturando" | "Estavel" | "Oportunidade";
}

export interface RankingEstado {
  uf: string;
  estado: string;
  score_medio: number;
  melhor_municipio: string;
  pior_municipio: string;
  populacao_sem_acesso_pct: number;
}

export const criteriosPeso = {
  saturacao: 30,
  demanda_epidemiologica: 25,
  potencial_economico: 20,
  cobertura_sus: 15,
  pipeline_formandos: 10,
};

export const indicadoresOndeAbrir = {
  municipiosSemDentista: 412,
  populacaoDesassistida_mi: "23.4",
  scoreMedioNacional: 52,
  municipiosOportunidade: 1847,
  estadoMaisOportunidades: "PA",
  especialidadeMaisCarente: "Endodontia",
  scoreMáximoEncontrado: 94,
  pipelineFormandosAno: 28400,
};

export const scoreOportunidadeMunicipio: ScoreMunicipio[] = [
  { municipio: "Breves", uf: "PA", regiao: "Norte", populacao: 103297, dentistas_total: 18, dentistas_por_hab: 5739, renda_per_capita: 512, cobertura_esb: 32, idh: 0.503, formandos_ano: 0, score_oportunidade: 94, classificacao: "Excelente", fatores_positivos: ["Altíssima demanda reprimida", "Zero concorrência especializada", "População crescente"], fatores_negativos: ["Renda baixa", "Infraestrutura limitada"] },
  { municipio: "Itaituba", uf: "PA", regiao: "Norte", populacao: 101097, dentistas_total: 22, dentistas_por_hab: 4595, renda_per_capita: 621, cobertura_esb: 28, idh: 0.530, formandos_ano: 0, score_oportunidade: 92, classificacao: "Excelente", fatores_positivos: ["Polo regional em crescimento", "Demanda reprimida alta", "Economia do garimpo"], fatores_negativos: ["Logística difícil", "Poucos labs protéticos"] },
  { municipio: "Marabá", uf: "PA", regiao: "Norte", populacao: 283542, dentistas_total: 78, dentistas_por_hab: 3635, renda_per_capita: 742, cobertura_esb: 35, idh: 0.668, formandos_ano: 12, score_oportunidade: 89, classificacao: "Excelente", fatores_positivos: ["Polo econômico regional", "Crescimento populacional acelerado", "Hub de mineração"], fatores_negativos: ["Universidade local formando novos profissionais"] },
  { municipio: "Parauapebas", uf: "PA", regiao: "Norte", populacao: 212394, dentistas_total: 65, dentistas_por_hab: 3268, renda_per_capita: 1180, cobertura_esb: 41, idh: 0.715, formandos_ano: 0, score_oportunidade: 88, classificacao: "Excelente", fatores_positivos: ["Renda alta (Vale/mineração)", "Poucos especialistas", "Pop. jovem"], fatores_negativos: ["Custo de vida elevado"] },
  { municipio: "Imperatriz", uf: "MA", regiao: "Nordeste", populacao: 259337, dentistas_total: 89, dentistas_por_hab: 2914, renda_per_capita: 698, cobertura_esb: 38, idh: 0.631, formandos_ano: 35, score_oportunidade: 85, classificacao: "Muito Bom", fatores_positivos: ["2ª maior cidade do MA", "Polo regional", "Crescimento econômico"], fatores_negativos: ["Faculdade local", "Concorrência crescente"] },
  { municipio: "Santarém", uf: "PA", regiao: "Norte", populacao: 306480, dentistas_total: 112, dentistas_por_hab: 2737, renda_per_capita: 635, cobertura_esb: 33, idh: 0.691, formandos_ano: 25, score_oportunidade: 84, classificacao: "Muito Bom", fatores_positivos: ["Polo turístico", "Hub regional", "Demanda crescente"], fatores_negativos: ["Faculdade formando profissionais"] },
  { municipio: "Rio Branco", uf: "AC", regiao: "Norte", populacao: 413418, dentistas_total: 168, dentistas_por_hab: 2461, renda_per_capita: 820, cobertura_esb: 45, idh: 0.727, formandos_ano: 30, score_oportunidade: 81, classificacao: "Muito Bom", fatores_positivos: ["Capital com baixa saturação", "Economia estável"], fatores_negativos: ["Isolamento geográfico"] },
  { municipio: "Boa Vista", uf: "RR", regiao: "Norte", populacao: 419652, dentistas_total: 175, dentistas_por_hab: 2398, renda_per_capita: 890, cobertura_esb: 42, idh: 0.752, formandos_ano: 20, score_oportunidade: 80, classificacao: "Muito Bom", fatores_positivos: ["Capital pouco saturada", "Crescimento pop. alto"], fatores_negativos: ["Mercado pequeno"] },
  { municipio: "Macapá", uf: "AP", regiao: "Norte", populacao: 512902, dentistas_total: 198, dentistas_por_hab: 2590, renda_per_capita: 760, cobertura_esb: 36, idh: 0.733, formandos_ano: 25, score_oportunidade: 79, classificacao: "Muito Bom", fatores_positivos: ["Capital com déficit profissional", "Pop. jovem"], fatores_negativos: ["Logística complicada"] },
  { municipio: "Porto Velho", uf: "RO", regiao: "Norte", populacao: 539354, dentistas_total: 245, dentistas_por_hab: 2201, renda_per_capita: 950, cobertura_esb: 40, idh: 0.736, formandos_ano: 35, score_oportunidade: 77, classificacao: "Muito Bom", fatores_positivos: ["Agronegócio forte", "Renda crescente"], fatores_negativos: ["Faculdades locais"] },
  { municipio: "Timon", uf: "MA", regiao: "Nordeste", populacao: 169107, dentistas_total: 42, dentistas_por_hab: 4026, renda_per_capita: 480, cobertura_esb: 29, idh: 0.649, formandos_ano: 0, score_oportunidade: 76, classificacao: "Muito Bom", fatores_positivos: ["Cidade-satélite de Teresina", "Demanda alta", "Baixa concorrência"], fatores_negativos: ["Renda baixa", "Próximo a mercado saturado"] },
  { municipio: "Caxias", uf: "MA", regiao: "Nordeste", populacao: 164880, dentistas_total: 38, dentistas_por_hab: 4339, renda_per_capita: 445, cobertura_esb: 31, idh: 0.607, formandos_ano: 15, score_oportunidade: 75, classificacao: "Bom", fatores_positivos: ["Polo universitário", "Demanda reprimida"], fatores_negativos: ["Renda muito baixa"] },
  { municipio: "Palmas", uf: "TO", regiao: "Norte", populacao: 306296, dentistas_total: 185, dentistas_por_hab: 1656, renda_per_capita: 1280, cobertura_esb: 55, idh: 0.788, formandos_ano: 40, score_oportunidade: 72, classificacao: "Bom", fatores_positivos: ["Renda alta", "IDH elevado", "Pop. jovem"], fatores_negativos: ["Mercado em saturação", "Muitas faculdades"] },
  { municipio: "Ji-Paraná", uf: "RO", regiao: "Norte", populacao: 130009, dentistas_total: 58, dentistas_por_hab: 2242, renda_per_capita: 880, cobertura_esb: 48, idh: 0.714, formandos_ano: 20, score_oportunidade: 71, classificacao: "Bom", fatores_positivos: ["Polo agropecuário", "Economia estável"], fatores_negativos: ["Mercado pequeno"] },
  { municipio: "Caruaru", uf: "PE", regiao: "Nordeste", populacao: 365278, dentistas_total: 168, dentistas_por_hab: 2174, renda_per_capita: 720, cobertura_esb: 52, idh: 0.677, formandos_ano: 45, score_oportunidade: 68, classificacao: "Bom", fatores_positivos: ["Polo comercial", "Capital do Agreste"], fatores_negativos: ["Concorrência crescente"] },
  { municipio: "Sinop", uf: "MT", regiao: "Centro-Oeste", populacao: 146005, dentistas_total: 78, dentistas_por_hab: 1872, renda_per_capita: 1450, cobertura_esb: 50, idh: 0.754, formandos_ano: 30, score_oportunidade: 67, classificacao: "Bom", fatores_positivos: ["Agronegócio rico", "Pop. crescente"], fatores_negativos: ["Faculdades locais"] },
  { municipio: "Petrolina", uf: "PE", regiao: "Nordeste", populacao: 354317, dentistas_total: 172, dentistas_por_hab: 2060, renda_per_capita: 810, cobertura_esb: 48, idh: 0.697, formandos_ano: 40, score_oportunidade: 65, classificacao: "Bom", fatores_positivos: ["Polo fruticultura", "Hub Sertão"], fatores_negativos: ["Saturação crescente"] },
  { municipio: "Rondonópolis", uf: "MT", regiao: "Centro-Oeste", populacao: 236042, dentistas_total: 132, dentistas_por_hab: 1788, renda_per_capita: 1380, cobertura_esb: 52, idh: 0.755, formandos_ano: 25, score_oportunidade: 64, classificacao: "Bom", fatores_positivos: ["Capital do agronegócio", "Renda alta"], fatores_negativos: ["Mercado equilibrando"] },
  { municipio: "Juazeiro do Norte", uf: "CE", regiao: "Nordeste", populacao: 276264, dentistas_total: 142, dentistas_por_hab: 1945, renda_per_capita: 620, cobertura_esb: 55, idh: 0.694, formandos_ano: 50, score_oportunidade: 60, classificacao: "Moderado", fatores_positivos: ["Polo universitário", "Hub Cariri"], fatores_negativos: ["Muitos formandos", "Renda baixa"] },
  { municipio: "Manaus", uf: "AM", regiao: "Norte", populacao: 2255903, dentistas_total: 1450, dentistas_por_hab: 1556, renda_per_capita: 980, cobertura_esb: 38, idh: 0.737, formandos_ano: 120, score_oportunidade: 58, classificacao: "Moderado", fatores_positivos: ["Mercado grande", "Zona Franca"], fatores_negativos: ["Saturação no centro", "Muitas faculdades"] },
  { municipio: "Teresina", uf: "PI", regiao: "Nordeste", populacao: 871126, dentistas_total: 520, dentistas_por_hab: 1675, renda_per_capita: 850, cobertura_esb: 60, idh: 0.751, formandos_ano: 180, score_oportunidade: 52, classificacao: "Moderado", fatores_positivos: ["Polo educacional"], fatores_negativos: ["Excesso de faculdades", "Saturação"] },
  { municipio: "Goiânia", uf: "GO", regiao: "Centro-Oeste", populacao: 1555626, dentistas_total: 1120, dentistas_por_hab: 1389, renda_per_capita: 1520, cobertura_esb: 58, idh: 0.799, formandos_ano: 350, score_oportunidade: 42, classificacao: "Moderado", fatores_positivos: ["Renda alta"], fatores_negativos: ["Excesso de profissionais", "Pipeline alto"] },
  { municipio: "Curitiba", uf: "PR", regiao: "Sul", populacao: 1963726, dentistas_total: 1680, dentistas_por_hab: 1169, renda_per_capita: 1890, cobertura_esb: 62, idh: 0.823, formandos_ano: 420, score_oportunidade: 35, classificacao: "Saturado", fatores_positivos: ["Renda elevada", "IDH alto"], fatores_negativos: ["Altamente saturado", "Pipeline massivo"] },
  { municipio: "Belo Horizonte", uf: "MG", regiao: "Sudeste", populacao: 2521564, dentistas_total: 2850, dentistas_por_hab: 885, renda_per_capita: 1780, cobertura_esb: 65, idh: 0.810, formandos_ano: 680, score_oportunidade: 28, classificacao: "Saturado", fatores_positivos: ["Mercado premium"], fatores_negativos: ["Super saturado", "Excesso de escolas"] },
  { municipio: "Florianópolis", uf: "SC", regiao: "Sul", populacao: 516524, dentistas_total: 620, dentistas_por_hab: 833, renda_per_capita: 2250, cobertura_esb: 70, idh: 0.847, formandos_ano: 180, score_oportunidade: 25, classificacao: "Saturado", fatores_positivos: ["Qualidade de vida"], fatores_negativos: ["Saturação extrema", "Custo operacional alto"] },
  { municipio: "Campinas", uf: "SP", regiao: "Sudeste", populacao: 1223237, dentistas_total: 1540, dentistas_por_hab: 794, renda_per_capita: 2180, cobertura_esb: 68, idh: 0.805, formandos_ano: 450, score_oportunidade: 22, classificacao: "Saturado", fatores_positivos: ["Economia forte"], fatores_negativos: ["Saturação total", "Muitas faculdades"] },
  { municipio: "Ribeirão Preto", uf: "SP", regiao: "Sudeste", populacao: 711825, dentistas_total: 980, dentistas_por_hab: 726, renda_per_capita: 2050, cobertura_esb: 72, idh: 0.800, formandos_ano: 320, score_oportunidade: 18, classificacao: "Saturado", fatores_positivos: ["Polo de saúde"], fatores_negativos: ["Hipersaturado", "Pipeline gigante"] },
  { municipio: "São Paulo", uf: "SP", regiao: "Sudeste", populacao: 12396372, dentistas_total: 18500, dentistas_por_hab: 670, renda_per_capita: 2420, cobertura_esb: 55, idh: 0.805, formandos_ano: 2800, score_oportunidade: 15, classificacao: "Saturado", fatores_positivos: ["Mercado premium alto"], fatores_negativos: ["Hipersaturado", "Custo altíssimo", "Pipeline massivo"] },
  { municipio: "Vitória", uf: "ES", regiao: "Sudeste", populacao: 365855, dentistas_total: 520, dentistas_por_hab: 703, renda_per_capita: 2380, cobertura_esb: 75, idh: 0.845, formandos_ano: 160, score_oportunidade: 20, classificacao: "Saturado", fatores_positivos: ["Qualidade de vida", "Renda alta"], fatores_negativos: ["Saturação extrema"] },
  { municipio: "Santos", uf: "SP", regiao: "Sudeste", populacao: 433656, dentistas_total: 680, dentistas_por_hab: 638, renda_per_capita: 2650, cobertura_esb: 78, idh: 0.840, formandos_ano: 120, score_oportunidade: 12, classificacao: "Saturado", fatores_positivos: ["Renda altíssima"], fatores_negativos: ["Mais saturado do Brasil", "Sem espaço"] },
];

export const saturacaoPorEspecialidade: SaturacaoEspecialidade[] = [
  { especialidade: "Clínico Geral", media_nacional: 130.5, top5_saturadas: [{ cidade: "Santos/SP", valor: 312 }, { cidade: "Vitória/ES", valor: 285 }, { cidade: "Florianópolis/SC", valor: 268 }, { cidade: "Ribeirão Preto/SP", valor: 255 }, { cidade: "BH/MG", valor: 242 }], top5_oportunidades: [{ cidade: "Breves/PA", valor: 17 }, { cidade: "Itaituba/PA", valor: 22 }, { cidade: "Timon/MA", valor: 25 }, { cidade: "Caxias/MA", valor: 23 }, { cidade: "Marabá/PA", valor: 28 }], tendencia: "Saturando" },
  { especialidade: "Ortodontia", media_nacional: 18.2, top5_saturadas: [{ cidade: "São Paulo/SP", valor: 52 }, { cidade: "Curitiba/PR", valor: 45 }, { cidade: "BH/MG", valor: 42 }, { cidade: "Goiânia/GO", valor: 38 }, { cidade: "Campinas/SP", valor: 36 }], top5_oportunidades: [{ cidade: "Breves/PA", valor: 0 }, { cidade: "Itaituba/PA", valor: 1 }, { cidade: "Marabá/PA", valor: 3 }, { cidade: "Imperatriz/MA", valor: 4 }, { cidade: "Santarém/PA", valor: 5 }], tendencia: "Saturando" },
  { especialidade: "Implantodontia", media_nacional: 12.8, top5_saturadas: [{ cidade: "Florianópolis/SC", valor: 38 }, { cidade: "São Paulo/SP", valor: 35 }, { cidade: "Curitiba/PR", valor: 32 }, { cidade: "Campinas/SP", valor: 28 }, { cidade: "Santos/SP", valor: 26 }], top5_oportunidades: [{ cidade: "Breves/PA", valor: 0 }, { cidade: "Timon/MA", valor: 0 }, { cidade: "Caxias/MA", valor: 1 }, { cidade: "Itaituba/PA", valor: 1 }, { cidade: "Rio Branco/AC", valor: 3 }], tendencia: "Saturando" },
  { especialidade: "Endodontia", media_nacional: 10.5, top5_saturadas: [{ cidade: "São Paulo/SP", valor: 28 }, { cidade: "BH/MG", valor: 25 }, { cidade: "Curitiba/PR", valor: 22 }, { cidade: "Campinas/SP", valor: 20 }, { cidade: "Ribeirão Preto/SP", valor: 18 }], top5_oportunidades: [{ cidade: "Breves/PA", valor: 0 }, { cidade: "Itaituba/PA", valor: 0 }, { cidade: "Timon/MA", valor: 0 }, { cidade: "Parauapebas/PA", valor: 1 }, { cidade: "Marabá/PA", valor: 2 }], tendencia: "Oportunidade" },
  { especialidade: "Periodontia", media_nacional: 6.8, top5_saturadas: [{ cidade: "São Paulo/SP", valor: 18 }, { cidade: "BH/MG", valor: 15 }, { cidade: "Curitiba/PR", valor: 14 }, { cidade: "Florianópolis/SC", valor: 12 }, { cidade: "Campinas/SP", valor: 11 }], top5_oportunidades: [{ cidade: "Breves/PA", valor: 0 }, { cidade: "Itaituba/PA", valor: 0 }, { cidade: "Marabá/PA", valor: 1 }, { cidade: "Santarém/PA", valor: 1 }, { cidade: "Imperatriz/MA", valor: 2 }], tendencia: "Estavel" },
  { especialidade: "Prótese Dentária", media_nacional: 8.2, top5_saturadas: [{ cidade: "São Paulo/SP", valor: 22 }, { cidade: "BH/MG", valor: 18 }, { cidade: "Curitiba/PR", valor: 16 }, { cidade: "Goiânia/GO", valor: 14 }, { cidade: "Ribeirão Preto/SP", valor: 13 }], top5_oportunidades: [{ cidade: "Breves/PA", valor: 0 }, { cidade: "Itaituba/PA", valor: 0 }, { cidade: "Caxias/MA", valor: 0 }, { cidade: "Parauapebas/PA", valor: 1 }, { cidade: "Marabá/PA", valor: 2 }], tendencia: "Oportunidade" },
  { especialidade: "Odontopediatria", media_nacional: 5.4, top5_saturadas: [{ cidade: "São Paulo/SP", valor: 15 }, { cidade: "Curitiba/PR", valor: 12 }, { cidade: "BH/MG", valor: 11 }, { cidade: "Florianópolis/SC", valor: 10 }, { cidade: "Campinas/SP", valor: 9 }], top5_oportunidades: [{ cidade: "Breves/PA", valor: 0 }, { cidade: "Itaituba/PA", valor: 0 }, { cidade: "Timon/MA", valor: 0 }, { cidade: "Marabá/PA", valor: 1 }, { cidade: "Imperatriz/MA", valor: 2 }], tendencia: "Estavel" },
  { especialidade: "Cirurgia BMF", media_nacional: 4.2, top5_saturadas: [{ cidade: "São Paulo/SP", valor: 12 }, { cidade: "BH/MG", valor: 10 }, { cidade: "Curitiba/PR", valor: 8 }, { cidade: "Recife/PE", valor: 7 }, { cidade: "Salvador/BA", valor: 6 }], top5_oportunidades: [{ cidade: "Breves/PA", valor: 0 }, { cidade: "Itaituba/PA", valor: 0 }, { cidade: "Timon/MA", valor: 0 }, { cidade: "Caxias/MA", valor: 0 }, { cidade: "Parauapebas/PA", valor: 0 }], tendencia: "Oportunidade" },
  { especialidade: "Odontogeriatria", media_nacional: 0.8, top5_saturadas: [{ cidade: "São Paulo/SP", valor: 3.2 }, { cidade: "Curitiba/PR", valor: 2.1 }, { cidade: "BH/MG", valor: 1.8 }, { cidade: "Florianópolis/SC", valor: 1.5 }, { cidade: "Campinas/SP", valor: 1.2 }], top5_oportunidades: [{ cidade: "Breves/PA", valor: 0 }, { cidade: "Itaituba/PA", valor: 0 }, { cidade: "Marabá/PA", valor: 0 }, { cidade: "Santarém/PA", valor: 0 }, { cidade: "Imperatriz/MA", valor: 0 }], tendencia: "Oportunidade" },
  { especialidade: "Harmonização Orofacial", media_nacional: 3.5, top5_saturadas: [{ cidade: "São Paulo/SP", valor: 14 }, { cidade: "Goiânia/GO", valor: 12 }, { cidade: "BH/MG", valor: 11 }, { cidade: "Curitiba/PR", valor: 10 }, { cidade: "Florianópolis/SC", valor: 9 }], top5_oportunidades: [{ cidade: "Breves/PA", valor: 0 }, { cidade: "Marabá/PA", valor: 0 }, { cidade: "Imperatriz/MA", valor: 1 }, { cidade: "Santarém/PA", valor: 1 }, { cidade: "Palmas/TO", valor: 2 }], tendencia: "Saturando" },
  { especialidade: "Radiologia", media_nacional: 2.8, top5_saturadas: [{ cidade: "São Paulo/SP", valor: 8 }, { cidade: "BH/MG", valor: 6 }, { cidade: "Curitiba/PR", valor: 5 }, { cidade: "Goiânia/GO", valor: 4 }, { cidade: "Campinas/SP", valor: 4 }], top5_oportunidades: [{ cidade: "Breves/PA", valor: 0 }, { cidade: "Itaituba/PA", valor: 0 }, { cidade: "Timon/MA", valor: 0 }, { cidade: "Parauapebas/PA", valor: 0 }, { cidade: "Marabá/PA", valor: 1 }], tendencia: "Estavel" },
  { especialidade: "DTM/Dor Orofacial", media_nacional: 0.6, top5_saturadas: [{ cidade: "São Paulo/SP", valor: 2.5 }, { cidade: "Curitiba/PR", valor: 1.8 }, { cidade: "BH/MG", valor: 1.5 }, { cidade: "Campinas/SP", valor: 1.2 }, { cidade: "Ribeirão Preto/SP", valor: 1.0 }], top5_oportunidades: [{ cidade: "Breves/PA", valor: 0 }, { cidade: "Itaituba/PA", valor: 0 }, { cidade: "Marabá/PA", valor: 0 }, { cidade: "Imperatriz/MA", valor: 0 }, { cidade: "Santarém/PA", valor: 0 }], tendencia: "Oportunidade" },
  { especialidade: "Odontologia do Esporte", media_nacional: 0.3, top5_saturadas: [{ cidade: "São Paulo/SP", valor: 1.8 }, { cidade: "Curitiba/PR", valor: 0.9 }, { cidade: "BH/MG", valor: 0.7 }, { cidade: "Florianópolis/SC", valor: 0.5 }, { cidade: "Goiânia/GO", valor: 0.4 }], top5_oportunidades: [{ cidade: "Breves/PA", valor: 0 }, { cidade: "Itaituba/PA", valor: 0 }, { cidade: "Marabá/PA", valor: 0 }, { cidade: "Manaus/AM", valor: 0 }, { cidade: "Palmas/TO", valor: 0 }], tendencia: "Oportunidade" },
  { especialidade: "Dentística", media_nacional: 5.1, top5_saturadas: [{ cidade: "São Paulo/SP", valor: 14 }, { cidade: "Curitiba/PR", valor: 12 }, { cidade: "BH/MG", valor: 10 }, { cidade: "Campinas/SP", valor: 9 }, { cidade: "Florianópolis/SC", valor: 8 }], top5_oportunidades: [{ cidade: "Breves/PA", valor: 0 }, { cidade: "Itaituba/PA", valor: 0 }, { cidade: "Timon/MA", valor: 0 }, { cidade: "Caxias/MA", valor: 0 }, { cidade: "Marabá/PA", valor: 1 }], tendencia: "Estavel" },
];

export const rankingEstados: RankingEstado[] = [
  { uf: "PA", estado: "Pará", score_medio: 78, melhor_municipio: "Breves", pior_municipio: "Belém", populacao_sem_acesso_pct: 22.5 },
  { uf: "MA", estado: "Maranhão", score_medio: 74, melhor_municipio: "Barra do Corda", pior_municipio: "São Luís", populacao_sem_acesso_pct: 24.8 },
  { uf: "AC", estado: "Acre", score_medio: 72, melhor_municipio: "Cruzeiro do Sul", pior_municipio: "Rio Branco", populacao_sem_acesso_pct: 19.2 },
  { uf: "AP", estado: "Amapá", score_medio: 71, melhor_municipio: "Oiapoque", pior_municipio: "Macapá", populacao_sem_acesso_pct: 20.1 },
  { uf: "RR", estado: "Roraima", score_medio: 70, melhor_municipio: "Rorainópolis", pior_municipio: "Boa Vista", populacao_sem_acesso_pct: 18.5 },
  { uf: "AM", estado: "Amazonas", score_medio: 68, melhor_municipio: "Tefé", pior_municipio: "Manaus", populacao_sem_acesso_pct: 21.3 },
  { uf: "TO", estado: "Tocantins", score_medio: 65, melhor_municipio: "Araguaína", pior_municipio: "Palmas", populacao_sem_acesso_pct: 14.8 },
  { uf: "RO", estado: "Rondônia", score_medio: 63, melhor_municipio: "Vilhena", pior_municipio: "Porto Velho", populacao_sem_acesso_pct: 13.5 },
  { uf: "PI", estado: "Piauí", score_medio: 62, melhor_municipio: "Floriano", pior_municipio: "Teresina", populacao_sem_acesso_pct: 18.9 },
  { uf: "MT", estado: "Mato Grosso", score_medio: 60, melhor_municipio: "Sorriso", pior_municipio: "Cuiabá", populacao_sem_acesso_pct: 10.2 },
  { uf: "CE", estado: "Ceará", score_medio: 58, melhor_municipio: "Sobral", pior_municipio: "Fortaleza", populacao_sem_acesso_pct: 15.4 },
  { uf: "PE", estado: "Pernambuco", score_medio: 55, melhor_municipio: "Caruaru", pior_municipio: "Recife", populacao_sem_acesso_pct: 14.2 },
  { uf: "BA", estado: "Bahia", score_medio: 54, melhor_municipio: "Vitória da Conquista", pior_municipio: "Salvador", populacao_sem_acesso_pct: 16.8 },
  { uf: "MS", estado: "Mato Grosso do Sul", score_medio: 52, melhor_municipio: "Dourados", pior_municipio: "Campo Grande", populacao_sem_acesso_pct: 9.5 },
  { uf: "SE", estado: "Sergipe", score_medio: 51, melhor_municipio: "Itabaiana", pior_municipio: "Aracaju", populacao_sem_acesso_pct: 15.0 },
  { uf: "AL", estado: "Alagoas", score_medio: 50, melhor_municipio: "Arapiraca", pior_municipio: "Maceió", populacao_sem_acesso_pct: 17.5 },
  { uf: "RN", estado: "Rio Grande do Norte", score_medio: 48, melhor_municipio: "Mossoró", pior_municipio: "Natal", populacao_sem_acesso_pct: 13.8 },
  { uf: "PB", estado: "Paraíba", score_medio: 47, melhor_municipio: "Campina Grande", pior_municipio: "João Pessoa", populacao_sem_acesso_pct: 14.5 },
  { uf: "GO", estado: "Goiás", score_medio: 45, melhor_municipio: "Rio Verde", pior_municipio: "Goiânia", populacao_sem_acesso_pct: 8.2 },
  { uf: "ES", estado: "Espírito Santo", score_medio: 38, melhor_municipio: "Linhares", pior_municipio: "Vitória", populacao_sem_acesso_pct: 6.5 },
  { uf: "PR", estado: "Paraná", score_medio: 35, melhor_municipio: "Cascavel", pior_municipio: "Curitiba", populacao_sem_acesso_pct: 5.8 },
  { uf: "SC", estado: "Santa Catarina", score_medio: 32, melhor_municipio: "Chapecó", pior_municipio: "Florianópolis", populacao_sem_acesso_pct: 4.5 },
  { uf: "RS", estado: "Rio Grande do Sul", score_medio: 34, melhor_municipio: "Passo Fundo", pior_municipio: "Porto Alegre", populacao_sem_acesso_pct: 5.2 },
  { uf: "MG", estado: "Minas Gerais", score_medio: 40, melhor_municipio: "Montes Claros", pior_municipio: "Belo Horizonte", populacao_sem_acesso_pct: 8.8 },
  { uf: "RJ", estado: "Rio de Janeiro", score_medio: 30, melhor_municipio: "Campos dos Goytacazes", pior_municipio: "Niterói", populacao_sem_acesso_pct: 7.2 },
  { uf: "SP", estado: "São Paulo", score_medio: 25, melhor_municipio: "Presidente Prudente", pior_municipio: "Santos", populacao_sem_acesso_pct: 4.8 },
  { uf: "DF", estado: "Distrito Federal", score_medio: 22, melhor_municipio: "Ceilândia", pior_municipio: "Plano Piloto", populacao_sem_acesso_pct: 3.5 },
];
