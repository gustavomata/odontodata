// =============================================================================
// OdontoData — Canada Dental Workforce Data
// Sources: CIHI (Canadian Institute for Health Information) 2023,
//          Canadian Dental Association (CDA), RCDC 2023,
//          Provincial dental regulatory colleges, Statistics Canada 2021
// =============================================================================

// ─── SPECIALTIES (RCDC recognised specialties 2023) ──────────────────────────
export const especialidadesCA = [
  { especialidade: "General Dentistry",           total: 15600, porcentagem: 69.6, crescimentoAnual: 2.0, reconhecidaCFO: false, descricao: "Primary dental care for patients of all ages" },
  { especialidade: "Orthodontics",                total: 3000,  porcentagem: 13.4, crescimentoAnual: 2.8, reconhecidaCFO: true,  descricao: "Alignment of teeth and jaws" },
  { especialidade: "Periodontics",                total: 900,   porcentagem: 4.0,  crescimentoAnual: 2.2, reconhecidaCFO: true,  descricao: "Gum disease and dental implants" },
  { especialidade: "Oral & Maxillofacial Surgery", total: 600,  porcentagem: 2.7,  crescimentoAnual: 1.8, reconhecidaCFO: true,  descricao: "Surgery of face, mouth, and jaw" },
  { especialidade: "Prosthodontics",              total: 700,   porcentagem: 3.1,  crescimentoAnual: 1.6, reconhecidaCFO: true,  descricao: "Restoration and replacement of teeth" },
  { especialidade: "Endodontics",                 total: 1000,  porcentagem: 4.5,  crescimentoAnual: 2.9, reconhecidaCFO: true,  descricao: "Root canals and pulp treatment" },
  { especialidade: "Pediatric Dentistry",         total: 800,   porcentagem: 3.6,  crescimentoAnual: 3.1, reconhecidaCFO: true,  descricao: "Dental care for children and adolescents" },
  { especialidade: "Oral Medicine",               total: 80,    porcentagem: 0.4,  crescimentoAnual: 4.0, reconhecidaCFO: true,  descricao: "Oral mucosal disease diagnosis" },
  { especialidade: "Oral & Maxillofacial Pathology", total: 60, porcentagem: 0.3,  crescimentoAnual: 2.0, reconhecidaCFO: true,  descricao: "Pathological examination of oral tissues" },
  { especialidade: "Oral & Maxillofacial Radiology", total: 50, porcentagem: 0.2,  crescimentoAnual: 5.5, reconhecidaCFO: true,  descricao: "Dental imaging and diagnostics" },
  { especialidade: "Dental Anaesthesiology",      total: 120,   porcentagem: 0.5,  crescimentoAnual: 3.0, reconhecidaCFO: false, descricao: "Anaesthesia for dental procedures" },
  { especialidade: "Dental Public Health",        total: 150,   porcentagem: 0.7,  crescimentoAnual: 1.5, reconhecidaCFO: true,  descricao: "Community oral health programs" },
];

// ─── DATA BY PROVINCE/TERRITORY ───────────────────────────────────────────────
export const dadosPorEstadoCA = [
  { estado: "Ontario",                   uf: "ON", regiao: "Central",     populacao: 14800000, totalDentistas: 8200,  dentistasPublicos: 580,  dentistasPrivados: 7620,  dentistaPorHabitante: 1805, municipios: 1,  estabelecimentos: 6500 },
  { estado: "Quebec",                    uf: "QC", regiao: "Central",     populacao: 8700000,  totalDentistas: 4900,  dentistasPublicos: 340,  dentistasPrivados: 4560,  dentistaPorHabitante: 1776, municipios: 1,  estabelecimentos: 3900 },
  { estado: "British Columbia",          uf: "BC", regiao: "West",        populacao: 5300000,  totalDentistas: 4100,  dentistasPublicos: 290,  dentistasPrivados: 3810,  dentistaPorHabitante: 1293, municipios: 1,  estabelecimentos: 3200 },
  { estado: "Alberta",                   uf: "AB", regiao: "West",        populacao: 4600000,  totalDentistas: 3100,  dentistasPublicos: 190,  dentistasPrivados: 2910,  dentistaPorHabitante: 1484, municipios: 1,  estabelecimentos: 2400 },
  { estado: "Manitoba",                  uf: "MB", regiao: "West",        populacao: 1400000,  totalDentistas: 680,   dentistasPublicos: 60,   dentistasPrivados: 620,   dentistaPorHabitante: 2059, municipios: 1,  estabelecimentos: 540 },
  { estado: "Saskatchewan",              uf: "SK", regiao: "West",        populacao: 1200000,  totalDentistas: 580,   dentistasPublicos: 50,   dentistasPrivados: 530,   dentistaPorHabitante: 2069, municipios: 1,  estabelecimentos: 460 },
  { estado: "Nova Scotia",               uf: "NS", regiao: "Atlantic",    populacao: 1000000,  totalDentistas: 480,   dentistasPublicos: 45,   dentistasPrivados: 435,   dentistaPorHabitante: 2083, municipios: 1,  estabelecimentos: 380 },
  { estado: "New Brunswick",             uf: "NB", regiao: "Atlantic",    populacao: 800000,   totalDentistas: 360,   dentistasPublicos: 35,   dentistasPrivados: 325,   dentistaPorHabitante: 2222, municipios: 1,  estabelecimentos: 285 },
  { estado: "Newfoundland & Labrador",   uf: "NL", regiao: "Atlantic",    populacao: 530000,   totalDentistas: 270,   dentistasPublicos: 30,   dentistasPrivados: 240,   dentistaPorHabitante: 1963, municipios: 1,  estabelecimentos: 210 },
  { estado: "Prince Edward Island",      uf: "PE", regiao: "Atlantic",    populacao: 165000,   totalDentistas: 75,    dentistasPublicos: 8,    dentistasPrivados: 67,    dentistaPorHabitante: 2200, municipios: 1,  estabelecimentos: 58 },
  { estado: "Northwest Territories",     uf: "NT", regiao: "Territories", populacao: 45000,    totalDentistas: 20,    dentistasPublicos: 14,   dentistasPrivados: 6,     dentistaPorHabitante: 2250, municipios: 1,  estabelecimentos: 16 },
  { estado: "Yukon",                     uf: "YT", regiao: "Territories", populacao: 43000,    totalDentistas: 28,    dentistasPublicos: 16,   dentistasPrivados: 12,    dentistaPorHabitante: 1536, municipios: 1,  estabelecimentos: 22 },
  { estado: "Nunavut",                   uf: "NU", regiao: "Territories", populacao: 40000,    totalDentistas: 8,     dentistasPublicos: 7,    dentistasPrivados: 1,     dentistaPorHabitante: 5000, municipios: 1,  estabelecimentos: 6 },
];

// ─── DATA BY REGION ───────────────────────────────────────────────────────────
export const dadosPorRegiaoCA = [
  { regiao: "Central",     estados: 2,  populacao: 23500000, totalDentistas: 13100, dentistasPublicos: 920,  dentistasPrivados: 12180, dentistaPorHabitante: 1794, cor: "#3B82F6" },
  { regiao: "West",        estados: 4,  populacao: 12500000, totalDentistas: 8460,  dentistasPublicos: 590,  dentistasPrivados: 7870,  dentistaPorHabitante: 1478, cor: "#10B981" },
  { regiao: "Atlantic",    estados: 4,  populacao: 2495000,  totalDentistas: 1185,  dentistasPublicos: 118,  dentistasPrivados: 1067,  dentistaPorHabitante: 2105, cor: "#F59E0B" },
  { regiao: "Territories", estados: 3,  populacao: 128000,   totalDentistas: 56,    dentistasPublicos: 37,   dentistasPrivados: 19,    dentistaPorHabitante: 2286, cor: "#8B5CF6" },
];

// ─── HISTORICAL SERIES (CIHI Dental Workforce 2015-2024) ─────────────────────
export const serieHistoricaCA = [
  { ano: 2015, total: 19800, novosRegistros: 820, cancelamentos: 400 },
  { ano: 2016, total: 20100, novosRegistros: 850, cancelamentos: 380 },
  { ano: 2017, total: 20400, novosRegistros: 870, cancelamentos: 370 },
  { ano: 2018, total: 20800, novosRegistros: 900, cancelamentos: 360 },
  { ano: 2019, total: 21200, novosRegistros: 920, cancelamentos: 350 },
  { ano: 2020, total: 21400, novosRegistros: 650, cancelamentos: 380 },
  { ano: 2021, total: 21800, novosRegistros: 820, cancelamentos: 350 },
  { ano: 2022, total: 22200, novosRegistros: 870, cancelamentos: 340 },
  { ano: 2023, total: 22800, novosRegistros: 920, cancelamentos: 360 },
  { ano: 2024, total: 23200, novosRegistros: 750, cancelamentos: 350 },
  { ano: 2025, total: 23650, novosRegistros: 800, cancelamentos: 350 },
  { ano: 2026, total: 24100, novosRegistros: 800, cancelamentos: 350 },
];

// ─── GENERAL INDICATORS ───────────────────────────────────────────────────────
export const indicadoresGeraisCA = {
  totalDentistas: 22800,
  dentistasAtivos: 21800,
  dentistasPublicos: 1670,        // community health centres + public clinics
  dentistasPrivados: 21130,
  totalEspecialistas: 7060,       // RCDC-recognised specialists
  totalGeneralistas: 15740,
  mediaHabitantesBrasil: 1711,    // people per dentist
  recomendacaoOMS: 1500,
  totalEstabelecimentos: 17800,   // dental offices
  totalMunicipiosComCobertura: 680,
  totalMunicipios: 965,
  faculdadesOdontologia: 10,      // CDAC-accredited dental schools
  vagasAnuais: 600,               // annual dental graduates
  crescimentoUltimoAno: 1.8,
};

export const CORES_REGIOES_CA: Record<string, string> = {
  Central:     "#3B82F6",
  West:        "#10B981",
  Atlantic:    "#F59E0B",
  Territories: "#8B5CF6",
};

// ─── ESTABLISHMENT TYPES (CDA + provincial colleges 2023) ─────────────────────
export const dadosEstabelecimentosCA = [
  { tipo: "Solo Private Practice",          total: 10200, publico: 0,    privado: 10200, dentistasVinculados: 12400, mediaDentistasPorEstab: 1.22, porcentagem: 57.3 },
  { tipo: "Group Practice (2–4 dentists)",  total: 4800,  publico: 0,    privado: 4800,  dentistasVinculados: 7200,  mediaDentistasPorEstab: 1.50, porcentagem: 27.0 },
  { tipo: "Community Health Centre",        total: 680,   publico: 680,  privado: 0,     dentistasVinculados: 1600,  mediaDentistasPorEstab: 2.35, porcentagem: 3.8  },
  { tipo: "Corporate Dental Chain (DSO)",   total: 1400,  publico: 0,    privado: 1400,  dentistasVinculados: 2100,  mediaDentistasPorEstab: 1.50, porcentagem: 7.9  },
  { tipo: "Hospital Dental Dept.",          total: 280,   publico: 280,  privado: 0,     dentistasVinculados: 560,   mediaDentistasPorEstab: 2.00, porcentagem: 1.6  },
  { tipo: "Dental School Clinic (CDAC)",    total: 10,    publico: 10,   privado: 0,     dentistasVinculados: 600,   mediaDentistasPorEstab: 60.0, porcentagem: 0.1  },
  { tipo: "Military / Federal Dental",      total: 430,   publico: 430,  privado: 0,     dentistasVinculados: 940,   mediaDentistasPorEstab: 2.19, porcentagem: 2.4  },
];

// ─── EPIDEMIOLOGY (CHMS + CCHS + CDA 2018-2022) ──────────────────────────────
export const epidemiologiaCA = {
  indicadores: {
    cpodAdultos35_44: 8.5,
    cpodIdosos65_74: 14.8,
    cariesPrevalencia: 88.0,
    cariesNaoTratadas: 22.0,
    periodontiteAdultos: 42.0,
    edentulismo65mais: 16.0,
    nuncaFoiDentista: 22.0,
    fonteAnno: "CHMS Cycle 5 2016-17 / CCHS 2018 / CDA 2022",
  },
  doencasBucais: [
    { doenca: "Dental Caries (ever)",      adultos: 88.0, criancas: 57.0, tendencia: "stable" },
    { doenca: "Untreated Caries",          adultos: 22.0, criancas: 14.0, tendencia: "decreasing" },
    { doenca: "Periodontitis",             adultos: 42.0, criancas: 0.0,  tendencia: "stable" },
    { doenca: "Severe Periodontitis",      adultos: 8.5,  criancas: 0.0,  tendencia: "decreasing" },
    { doenca: "Edentulism (65+)",          adultos: 16.0, criancas: 0.0,  tendencia: "decreasing" },
    { doenca: "Oral Cancer (100k/year)",   adultos: 8.4,  criancas: 0.0,  tendencia: "increasing" },
  ],
  prevalenciaPorRegiao: [
    { regiao: "Central",     cpod: 8.2,  cariesNaoTratadas: 20.0, periodontite: 40.0, edentulismo: 14.0 },
    { regiao: "West",        cpod: 8.0,  cariesNaoTratadas: 19.0, periodontite: 39.0, edentulismo: 13.0 },
    { regiao: "Atlantic",    cpod: 9.8,  cariesNaoTratadas: 30.0, periodontite: 50.0, edentulismo: 22.0 },
    { regiao: "Territories", cpod: 12.4, cariesNaoTratadas: 45.0, periodontite: 62.0, edentulismo: 30.0 },
  ],
  tendencias: [
    { ano: 1990, cpod12anos: 2.8, edentulismo: 28.0, cariesNaoTratadas: 30.0 },
    { ano: 1999, cpod12anos: 2.2, edentulismo: 24.0, cariesNaoTratadas: 26.0 },
    { ano: 2007, cpod12anos: 1.5, edentulismo: 20.0, cariesNaoTratadas: 23.0 },
    { ano: 2014, cpod12anos: 1.0, edentulismo: 17.0, cariesNaoTratadas: 22.0 },
    { ano: 2022, cpod12anos: 0.9, edentulismo: 16.0, cariesNaoTratadas: 22.0 },
  ],
};
