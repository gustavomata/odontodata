// =============================================================================
// OdontoData — United States Dental Workforce Data
// Sources: ADA Health Policy Institute 2022, BLS OES 2022, HRSA, CODA, NPPES/CMS
// =============================================================================

// ─── SPECIALTIES (ADA recognized specialties + general practice) ──────────────
export const especialidadesUSA = [
  { especialidade: "General Dentistry",           total: 80000, porcentagem: 39.5, crescimentoAnual: 1.8, reconhecidaCFO: false, descricao: "General dental care for patients of all ages" },
  { especialidade: "Orthodontics",                total: 11900, porcentagem: 5.9,  crescimentoAnual: 3.2, reconhecidaCFO: true,  descricao: "Alignment of teeth and jaws" },
  { especialidade: "Oral & Maxillofacial Surgery", total: 10100, porcentagem: 5.0,  crescimentoAnual: 2.4, reconhecidaCFO: true,  descricao: "Surgery of face, mouth, and jaw" },
  { especialidade: "Periodontics",                total: 8200,  porcentagem: 4.0,  crescimentoAnual: 2.1, reconhecidaCFO: true,  descricao: "Gum disease and dental implants" },
  { especialidade: "Endodontics",                 total: 8100,  porcentagem: 4.0,  crescimentoAnual: 2.6, reconhecidaCFO: true,  descricao: "Root canals and pulp treatment" },
  { especialidade: "Pediatric Dentistry",         total: 7600,  porcentagem: 3.7,  crescimentoAnual: 2.9, reconhecidaCFO: true,  descricao: "Dental care for children and adolescents" },
  { especialidade: "Prosthodontics",              total: 4000,  porcentagem: 2.0,  crescimentoAnual: 1.5, reconhecidaCFO: true,  descricao: "Restoration and replacement of teeth" },
  { especialidade: "Oral Medicine",               total: 700,   porcentagem: 0.3,  crescimentoAnual: 4.1, reconhecidaCFO: true,  descricao: "Diagnosis of oral mucosal diseases" },
  { especialidade: "Oral Radiology",              total: 500,   porcentagem: 0.2,  crescimentoAnual: 5.8, reconhecidaCFO: true,  descricao: "Dental imaging and diagnostics" },
  { especialidade: "Dental Public Health",        total: 430,   porcentagem: 0.2,  crescimentoAnual: 3.3, reconhecidaCFO: true,  descricao: "Community oral health programs" },
];

// ─── DATA BY STATE (ADA 2022 + Census 2020) ──────────────────────────────────
export const dadosPorEstadoUSA = [
  { estado: "California",       uf: "CA", regiao: "West",      populacao: 39538223, totalDentistas: 34000, dentistasPublicos: 2900, dentistasPrivados: 31100, dentistaPorHabitante: 1163, municipios: 58,  estabelecimentos: 18200 },
  { estado: "Texas",            uf: "TX", regiao: "South",     populacao: 29145505, totalDentistas: 20500, dentistasPublicos: 1600, dentistasPrivados: 18900, dentistaPorHabitante: 1422, municipios: 254, estabelecimentos: 11000 },
  { estado: "Florida",          uf: "FL", regiao: "South",     populacao: 21538187, totalDentistas: 18500, dentistasPublicos: 1400, dentistasPrivados: 17100, dentistaPorHabitante: 1164, municipios: 67,  estabelecimentos: 9900 },
  { estado: "New York",         uf: "NY", regiao: "Northeast", populacao: 20201249, totalDentistas: 19000, dentistasPublicos: 2100, dentistasPrivados: 16900, dentistaPorHabitante: 1063, municipios: 62,  estabelecimentos: 10200 },
  { estado: "Pennsylvania",     uf: "PA", regiao: "Northeast", populacao: 13002700, totalDentistas: 10800, dentistasPublicos: 1000, dentistasPrivados: 9800,  dentistaPorHabitante: 1204, municipios: 67,  estabelecimentos: 5800 },
  { estado: "Illinois",         uf: "IL", regiao: "Midwest",   populacao: 12812508, totalDentistas: 11500, dentistasPublicos: 1000, dentistasPrivados: 10500, dentistaPorHabitante: 1114, municipios: 102, estabelecimentos: 6200 },
  { estado: "Ohio",             uf: "OH", regiao: "Midwest",   populacao: 11799448, totalDentistas: 9500,  dentistasPublicos: 900,  dentistasPrivados: 8600,  dentistaPorHabitante: 1242, municipios: 88,  estabelecimentos: 5100 },
  { estado: "Georgia",          uf: "GA", regiao: "South",     populacao: 10711908, totalDentistas: 7500,  dentistasPublicos: 700,  dentistasPrivados: 6800,  dentistaPorHabitante: 1428, municipios: 159, estabelecimentos: 4000 },
  { estado: "North Carolina",   uf: "NC", regiao: "South",     populacao: 10439388, totalDentistas: 7800,  dentistasPublicos: 700,  dentistasPrivados: 7100,  dentistaPorHabitante: 1339, municipios: 100, estabelecimentos: 4200 },
  { estado: "Michigan",         uf: "MI", regiao: "Midwest",   populacao: 10077331, totalDentistas: 9200,  dentistasPublicos: 900,  dentistasPrivados: 8300,  dentistaPorHabitante: 1095, municipios: 83,  estabelecimentos: 4900 },
  { estado: "New Jersey",       uf: "NJ", regiao: "Northeast", populacao: 9288994,  totalDentistas: 8900,  dentistasPublicos: 700,  dentistasPrivados: 8200,  dentistaPorHabitante: 1044, municipios: 21,  estabelecimentos: 4800 },
  { estado: "Virginia",         uf: "VA", regiao: "South",     populacao: 8631393,  totalDentistas: 7000,  dentistasPublicos: 600,  dentistasPrivados: 6400,  dentistaPorHabitante: 1233, municipios: 95,  estabelecimentos: 3800 },
  { estado: "Washington",       uf: "WA", regiao: "West",      populacao: 7705281,  totalDentistas: 6600,  dentistasPublicos: 600,  dentistasPrivados: 6000,  dentistaPorHabitante: 1168, municipios: 39,  estabelecimentos: 3500 },
  { estado: "Arizona",          uf: "AZ", regiao: "West",      populacao: 7151502,  totalDentistas: 5400,  dentistasPublicos: 500,  dentistasPrivados: 4900,  dentistaPorHabitante: 1324, municipios: 15,  estabelecimentos: 2900 },
  { estado: "Massachusetts",    uf: "MA", regiao: "Northeast", populacao: 7029917,  totalDentistas: 6800,  dentistasPublicos: 600,  dentistasPrivados: 6200,  dentistaPorHabitante: 1034, municipios: 14,  estabelecimentos: 3600 },
  { estado: "Tennessee",        uf: "TN", regiao: "South",     populacao: 6910840,  totalDentistas: 5300,  dentistasPublicos: 500,  dentistasPrivados: 4800,  dentistaPorHabitante: 1304, municipios: 95,  estabelecimentos: 2800 },
  { estado: "Indiana",          uf: "IN", regiao: "Midwest",   populacao: 6785528,  totalDentistas: 4800,  dentistasPublicos: 500,  dentistasPrivados: 4300,  dentistaPorHabitante: 1413, municipios: 92,  estabelecimentos: 2600 },
  { estado: "Maryland",         uf: "MD", regiao: "South",     populacao: 6177224,  totalDentistas: 5100,  dentistasPublicos: 500,  dentistasPrivados: 4600,  dentistaPorHabitante: 1211, municipios: 24,  estabelecimentos: 2700 },
  { estado: "Missouri",         uf: "MO", regiao: "Midwest",   populacao: 6154913,  totalDentistas: 4900,  dentistasPublicos: 500,  dentistasPrivados: 4400,  dentistaPorHabitante: 1256, municipios: 115, estabelecimentos: 2600 },
  { estado: "Wisconsin",        uf: "WI", regiao: "Midwest",   populacao: 5893718,  totalDentistas: 5400,  dentistasPublicos: 500,  dentistasPrivados: 4900,  dentistaPorHabitante: 1091, municipios: 72,  estabelecimentos: 2900 },
  { estado: "Colorado",         uf: "CO", regiao: "West",      populacao: 5773714,  totalDentistas: 4600,  dentistasPublicos: 400,  dentistasPrivados: 4200,  dentistaPorHabitante: 1255, municipios: 64,  estabelecimentos: 2500 },
  { estado: "Minnesota",        uf: "MN", regiao: "Midwest",   populacao: 5706494,  totalDentistas: 5200,  dentistasPublicos: 500,  dentistasPrivados: 4700,  dentistaPorHabitante: 1097, municipios: 87,  estabelecimentos: 2800 },
  { estado: "South Carolina",   uf: "SC", regiao: "South",     populacao: 5118425,  totalDentistas: 3900,  dentistasPublicos: 400,  dentistasPrivados: 3500,  dentistaPorHabitante: 1312, municipios: 46,  estabelecimentos: 2100 },
  { estado: "Alabama",          uf: "AL", regiao: "South",     populacao: 5024279,  totalDentistas: 2800,  dentistasPublicos: 300,  dentistasPrivados: 2500,  dentistaPorHabitante: 1794, municipios: 67,  estabelecimentos: 1500 },
  { estado: "Louisiana",        uf: "LA", regiao: "South",     populacao: 4657757,  totalDentistas: 3200,  dentistasPublicos: 300,  dentistasPrivados: 2900,  dentistaPorHabitante: 1456, municipios: 64,  estabelecimentos: 1700 },
  { estado: "Kentucky",         uf: "KY", regiao: "South",     populacao: 4505836,  totalDentistas: 3100,  dentistasPublicos: 300,  dentistasPrivados: 2800,  dentistaPorHabitante: 1453, municipios: 120, estabelecimentos: 1700 },
  { estado: "Oregon",           uf: "OR", regiao: "West",      populacao: 4237256,  totalDentistas: 3800,  dentistasPublicos: 400,  dentistasPrivados: 3400,  dentistaPorHabitante: 1115, municipios: 36,  estabelecimentos: 2000 },
  { estado: "Oklahoma",         uf: "OK", regiao: "South",     populacao: 3959353,  totalDentistas: 2900,  dentistasPublicos: 300,  dentistasPrivados: 2600,  dentistaPorHabitante: 1365, municipios: 77,  estabelecimentos: 1600 },
  { estado: "Connecticut",      uf: "CT", regiao: "Northeast", populacao: 3605944,  totalDentistas: 2900,  dentistasPublicos: 300,  dentistasPrivados: 2600,  dentistaPorHabitante: 1243, municipios: 8,   estabelecimentos: 1600 },
  { estado: "Iowa",             uf: "IA", regiao: "Midwest",   populacao: 3190369,  totalDentistas: 2500,  dentistasPublicos: 250,  dentistasPrivados: 2250,  dentistaPorHabitante: 1276, municipios: 99,  estabelecimentos: 1300 },
  { estado: "Utah",             uf: "UT", regiao: "West",      populacao: 3271616,  totalDentistas: 3100,  dentistasPublicos: 300,  dentistasPrivados: 2800,  dentistaPorHabitante: 1055, municipios: 29,  estabelecimentos: 1700 },
  { estado: "Nevada",           uf: "NV", regiao: "West",      populacao: 3104614,  totalDentistas: 2500,  dentistasPublicos: 250,  dentistasPrivados: 2250,  dentistaPorHabitante: 1242, municipios: 17,  estabelecimentos: 1300 },
  { estado: "Arkansas",         uf: "AR", regiao: "South",     populacao: 3011524,  totalDentistas: 1900,  dentistasPublicos: 200,  dentistasPrivados: 1700,  dentistaPorHabitante: 1585, municipios: 75,  estabelecimentos: 1000 },
  { estado: "Mississippi",      uf: "MS", regiao: "South",     populacao: 2961279,  totalDentistas: 1800,  dentistasPublicos: 200,  dentistasPrivados: 1600,  dentistaPorHabitante: 1645, municipios: 82,  estabelecimentos: 970 },
  { estado: "Kansas",           uf: "KS", regiao: "Midwest",   populacao: 2937880,  totalDentistas: 2300,  dentistasPublicos: 230,  dentistasPrivados: 2070,  dentistaPorHabitante: 1278, municipios: 105, estabelecimentos: 1200 },
  { estado: "New Mexico",       uf: "NM", regiao: "West",      populacao: 2117522,  totalDentistas: 1500,  dentistasPublicos: 200,  dentistasPrivados: 1300,  dentistaPorHabitante: 1412, municipios: 33,  estabelecimentos: 800 },
  { estado: "Nebraska",         uf: "NE", regiao: "Midwest",   populacao: 1961504,  totalDentistas: 1800,  dentistasPublicos: 180,  dentistasPrivados: 1620,  dentistaPorHabitante: 1090, municipios: 93,  estabelecimentos: 970 },
  { estado: "West Virginia",    uf: "WV", regiao: "South",     populacao: 1793716,  totalDentistas: 1500,  dentistasPublicos: 200,  dentistasPrivados: 1300,  dentistaPorHabitante: 1196, municipios: 55,  estabelecimentos: 800 },
  { estado: "Idaho",            uf: "ID", regiao: "West",      populacao: 1839106,  totalDentistas: 1500,  dentistasPublicos: 150,  dentistasPrivados: 1350,  dentistaPorHabitante: 1226, municipios: 44,  estabelecimentos: 800 },
  { estado: "Hawaii",           uf: "HI", regiao: "West",      populacao: 1455271,  totalDentistas: 1200,  dentistasPublicos: 130,  dentistasPrivados: 1070,  dentistaPorHabitante: 1213, municipios: 4,   estabelecimentos: 640 },
  { estado: "New Hampshire",    uf: "NH", regiao: "Northeast", populacao: 1377529,  totalDentistas: 1400,  dentistasPublicos: 130,  dentistasPrivados: 1270,  dentistaPorHabitante: 984,  municipios: 10,  estabelecimentos: 750 },
  { estado: "Maine",            uf: "ME", regiao: "Northeast", populacao: 1362359,  totalDentistas: 1200,  dentistasPublicos: 130,  dentistasPrivados: 1070,  dentistaPorHabitante: 1135, municipios: 16,  estabelecimentos: 640 },
  { estado: "Montana",          uf: "MT", regiao: "West",      populacao: 1084225,  totalDentistas: 900,   dentistasPublicos: 100,  dentistasPrivados: 800,   dentistaPorHabitante: 1205, municipios: 56,  estabelecimentos: 480 },
  { estado: "Rhode Island",     uf: "RI", regiao: "Northeast", populacao: 1097379,  totalDentistas: 1000,  dentistasPublicos: 110,  dentistasPrivados: 890,   dentistaPorHabitante: 1097, municipios: 5,   estabelecimentos: 540 },
  { estado: "Delaware",         uf: "DE", regiao: "South",     populacao: 989948,   totalDentistas: 700,   dentistasPublicos: 80,   dentistasPrivados: 620,   dentistaPorHabitante: 1414, municipios: 3,   estabelecimentos: 370 },
  { estado: "South Dakota",     uf: "SD", regiao: "Midwest",   populacao: 886667,   totalDentistas: 800,   dentistasPublicos: 90,   dentistasPrivados: 710,   dentistaPorHabitante: 1108, municipios: 66,  estabelecimentos: 430 },
  { estado: "North Dakota",     uf: "ND", regiao: "Midwest",   populacao: 779094,   totalDentistas: 700,   dentistasPublicos: 80,   dentistasPrivados: 620,   dentistaPorHabitante: 1113, municipios: 53,  estabelecimentos: 370 },
  { estado: "Alaska",           uf: "AK", regiao: "West",      populacao: 733391,   totalDentistas: 600,   dentistasPublicos: 100,  dentistasPrivados: 500,   dentistaPorHabitante: 1222, municipios: 30,  estabelecimentos: 320 },
  { estado: "Vermont",          uf: "VT", regiao: "Northeast", populacao: 643077,   totalDentistas: 700,   dentistasPublicos: 80,   dentistasPrivados: 620,   dentistaPorHabitante: 919,  municipios: 14,  estabelecimentos: 370 },
  { estado: "Wyoming",          uf: "WY", regiao: "West",      populacao: 576851,   totalDentistas: 500,   dentistasPublicos: 60,   dentistasPrivados: 440,   dentistaPorHabitante: 1154, municipios: 23,  estabelecimentos: 270 },
  { estado: "District of Columbia", uf: "DC", regiao: "South", populacao: 689545,   totalDentistas: 1600,  dentistasPublicos: 400,  dentistasPrivados: 1200,  dentistaPorHabitante: 431,  municipios: 1,   estabelecimentos: 860 },
];

// ─── DATA BY REGION (US Census regions) ──────────────────────────────────────
export const dadosPorRegiaoUSA = [
  { regiao: "South",     estados: 17, populacao: 126296068, totalDentistas: 68000, dentistasPublicos: 5800, dentistasPrivados: 62200, dentistaPorHabitante: 1857, cor: "#F59E0B" },
  { regiao: "Midwest",   estados: 12, populacao: 68985454,  totalDentistas: 45000, dentistasPublicos: 4200, dentistasPrivados: 40800, dentistaPorHabitante: 1533, cor: "#10B981" },
  { regiao: "West",      estados: 13, populacao: 78588572,  totalDentistas: 44500, dentistasPublicos: 3800, dentistasPrivados: 40700, dentistaPorHabitante: 1766, cor: "#8B5CF6" },
  { regiao: "Northeast", estados: 9,  populacao: 57609148,  totalDentistas: 45000, dentistasPublicos: 4000, dentistasPrivados: 41000, dentistaPorHabitante: 1280, cor: "#3B82F6" },
];

// ─── HISTORICAL SERIES (ADA + NPPES 2015-2024) ───────────────────────────────
export const serieHistoricaUSA = [
  { ano: 2015, total: 195730, novosRegistros: 5200, cancelamentos: 2800 },
  { ano: 2016, total: 196910, novosRegistros: 5400, cancelamentos: 2400 },
  { ano: 2017, total: 198200, novosRegistros: 5600, cancelamentos: 2100 },
  { ano: 2018, total: 199400, novosRegistros: 5500, cancelamentos: 2200 },
  { ano: 2019, total: 200800, novosRegistros: 5800, cancelamentos: 2100 },
  { ano: 2020, total: 199470, novosRegistros: 4200, cancelamentos: 5600 },
  { ano: 2021, total: 200500, novosRegistros: 5800, cancelamentos: 2400 },
  { ano: 2022, total: 202530, novosRegistros: 6100, cancelamentos: 2200 },
  { ano: 2023, total: 204200, novosRegistros: 5900, cancelamentos: 2400 },
  { ano: 2024, total: 205800, novosRegistros: 5800, cancelamentos: 2200 },
  { ano: 2025, total: 209500, novosRegistros: 5900, cancelamentos: 2200 },
];

// ─── GENERAL INDICATORS ───────────────────────────────────────────────────────
export const indicadoresGeraisUSA = {
  totalDentistas: 205800,
  dentistasAtivos: 187900,
  dentistasPublicos: 14800,       // FQHC + safety net clinics
  dentistasPrivados: 191000,
  totalEspecialistas: 61400,      // ADA board-certified specialists
  totalGeneralistas: 144400,
  mediaHabitantesBrasil: 1639,    // people per dentist (national avg)
  recomendacaoOMS: 1500,
  totalEstabelecimentos: 196000,  // private practices + clinics
  totalMunicipiosComCobertura: 2700, // counties with at least 1 dentist
  totalMunicipios: 3143,          // total US counties
  faculdadesOdontologia: 67,      // CODA-accredited dental schools
  vagasAnuais: 6100,              // annual graduates
  crescimentoUltimoAno: 0.8,
};

export const CORES_REGIOES_USA: Record<string, string> = {
  Northeast: "#3B82F6",
  South:     "#F59E0B",
  Midwest:   "#10B981",
  West:      "#8B5CF6",
};

// ─── ESTABLISHMENT TYPES (NPPES + ADA + HRSA 2022) ────────────────────────────
export const dadosEstabelecimentosUSA = [
  { tipo: "Private Practice (Solo)",         total: 148000, publico: 0,      privado: 148000, dentistasVinculados: 120000, mediaDentistasPorEstab: 0.81, porcentagem: 56.2 },
  { tipo: "Dental Service Org. (DSO/Chain)", total: 32000,  publico: 0,      privado: 32000,  dentistasVinculados: 48000,  mediaDentistasPorEstab: 1.50, porcentagem: 12.2 },
  { tipo: "Group Practice (2–5 dentists)",   total: 28000,  publico: 0,      privado: 28000,  dentistasVinculados: 38000,  mediaDentistasPorEstab: 1.36, porcentagem: 10.6 },
  { tipo: "FQHC / Community Health Center",  total: 1400,   publico: 1400,   privado: 0,      dentistasVinculados: 8500,   mediaDentistasPorEstab: 6.07, porcentagem: 0.5  },
  { tipo: "Hospital Dental Dept.",           total: 2400,   publico: 1200,   privado: 1200,   dentistasVinculados: 4200,   mediaDentistasPorEstab: 1.75, porcentagem: 0.9  },
  { tipo: "Military / VA Dental",            total: 960,    publico: 960,    privado: 0,      dentistasVinculados: 3200,   mediaDentistasPorEstab: 3.33, porcentagem: 0.4  },
  { tipo: "Dental School Clinic (CODA)",     total: 67,     publico: 50,     privado: 17,     dentistasVinculados: 2800,   mediaDentistasPorEstab: 41.8, porcentagem: 0.03 },
  { tipo: "Federally Qualified Health Ctr.", total: 1400,   publico: 1400,   privado: 0,      dentistasVinculados: 6000,   mediaDentistasPorEstab: 4.29, porcentagem: 0.5  },
  { tipo: "Retail / Convenience Dental",     total: 4500,   publico: 0,      privado: 4500,   dentistasVinculados: 4800,   mediaDentistasPorEstab: 1.07, porcentagem: 1.7  },
];

// ─── EPIDEMIOLOGY (CDC NHANES + NIH + ADA 2019-2022) ─────────────────────────
export const epidemiologiaUSA = {
  indicadores: {
    cpodAdultos35_44: 7.8,
    cpodIdosos65_74: 14.2,
    cariesPrevalencia: 91.0,
    cariesNaoTratadas: 26.0,
    periodontiteAdultos: 47.2,
    edentulismo65mais: 17.0,
    nuncaFoiDentista: 28.0,
    fonteAnno: "CDC NHANES 2017-2020",
  },
  doencasBucais: [
    { doenca: "Dental Caries (ever)", adultos: 91.0, criancas: 52.0, tendencia: "stable" },
    { doenca: "Untreated Caries",     adultos: 26.0, criancas: 13.0, tendencia: "decreasing" },
    { doenca: "Periodontitis",        adultos: 47.2, criancas: 0.0,  tendencia: "stable" },
    { doenca: "Severe Periodontitis", adultos: 9.0,  criancas: 0.0,  tendencia: "decreasing" },
    { doenca: "Edentulism (65+)",     adultos: 17.0, criancas: 0.0,  tendencia: "decreasing" },
    { doenca: "Oral Cancer (100k/y)", adultos: 11.5, criancas: 0.0,  tendencia: "increasing" },
  ],
  prevalenciaPorRegiao: [
    { regiao: "Northeast", cpod: 6.9,  cariesNaoTratadas: 21.0, periodontite: 43.0, edentulismo: 14.0 },
    { regiao: "Midwest",   cpod: 7.5,  cariesNaoTratadas: 25.0, periodontite: 46.0, edentulismo: 16.0 },
    { regiao: "South",     cpod: 8.4,  cariesNaoTratadas: 31.0, periodontite: 52.0, edentulismo: 21.0 },
    { regiao: "West",      cpod: 7.2,  cariesNaoTratadas: 23.0, periodontite: 44.0, edentulismo: 13.0 },
  ],
  tendencias: [
    { ano: 2000, cpod12anos: 2.6, edentulismo: 30.0, cariesNaoTratadas: 32.0 },
    { ano: 2004, cpod12anos: 2.5, edentulismo: 27.0, cariesNaoTratadas: 30.0 },
    { ano: 2010, cpod12anos: 1.8, edentulismo: 23.0, cariesNaoTratadas: 28.0 },
    { ano: 2016, cpod12anos: 1.3, edentulismo: 19.0, cariesNaoTratadas: 26.5 },
    { ano: 2020, cpod12anos: 1.2, edentulismo: 17.0, cariesNaoTratadas: 26.0 },
  ],
};
