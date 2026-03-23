// =============================================================================
// OdontoData — United Kingdom Dental Workforce Data
// Sources: GDC (General Dental Council) Annual Statistics 2023,
//          NHS Digital Dental Workforce Stats March 2023,
//          NHS England, Public Health Scotland, Public Health Wales, HSCNI
// =============================================================================

// ─── SPECIALTIES (GDC recognised specialty lists 2023) ───────────────────────
export const especialidadesUK = [
  { especialidade: "General Dentistry",           total: 36800, porcentagem: 82.2, crescimentoAnual: 1.2, reconhecidaCFO: false, descricao: "Primary dental care for patients of all ages" },
  { especialidade: "Orthodontics",                total: 2800,  porcentagem: 6.3,  crescimentoAnual: 2.1, reconhecidaCFO: true,  descricao: "Alignment of teeth and jaws" },
  { especialidade: "Oral Surgery",                total: 900,   porcentagem: 2.0,  crescimentoAnual: 1.8, reconhecidaCFO: true,  descricao: "Surgical procedures within the oral cavity" },
  { especialidade: "Periodontics",                total: 600,   porcentagem: 1.3,  crescimentoAnual: 2.4, reconhecidaCFO: true,  descricao: "Gum disease prevention and treatment" },
  { especialidade: "Endodontics",                 total: 450,   porcentagem: 1.0,  crescimentoAnual: 3.2, reconhecidaCFO: true,  descricao: "Root canal and pulp treatment" },
  { especialidade: "Paediatric Dentistry",        total: 280,   porcentagem: 0.6,  crescimentoAnual: 2.8, reconhecidaCFO: true,  descricao: "Dental care for children and adolescents" },
  { especialidade: "Prosthodontics",              total: 380,   porcentagem: 0.8,  crescimentoAnual: 1.5, reconhecidaCFO: true,  descricao: "Restoration and replacement of teeth" },
  { especialidade: "Special Care Dentistry",      total: 200,   porcentagem: 0.4,  crescimentoAnual: 3.5, reconhecidaCFO: true,  descricao: "Care for patients with special needs" },
  { especialidade: "Dental Public Health",        total: 150,   porcentagem: 0.3,  crescimentoAnual: 1.1, reconhecidaCFO: true,  descricao: "Community oral health and policy" },
  { especialidade: "Restorative Dentistry",       total: 200,   porcentagem: 0.4,  crescimentoAnual: 1.0, reconhecidaCFO: true,  descricao: "Advanced restoration combining perio, endo, prostho" },
  { especialidade: "Oral Medicine",               total: 100,   porcentagem: 0.2,  crescimentoAnual: 4.0, reconhecidaCFO: true,  descricao: "Diagnosis and management of oral mucosal disease" },
  { especialidade: "Oral & Maxillofacial Pathology", total: 80, porcentagem: 0.2,  crescimentoAnual: 2.0, reconhecidaCFO: true,  descricao: "Pathological examination of oral tissues" },
  { especialidade: "Dental & Maxillofacial Radiology", total: 60, porcentagem: 0.1, crescimentoAnual: 5.0, reconhecidaCFO: true, descricao: "Dental imaging and diagnostics" },
];

// ─── DATA BY REGION (NHS England 7 regions + Scotland, Wales, N. Ireland) ────
export const dadosPorEstadoUK = [
  { estado: "London",                  uf: "LON", regiao: "England",          populacao: 9002488,  totalDentistas: 8400,  dentistasPublicos: 4900, dentistasPrivados: 3500, dentistaPorHabitante: 1072, municipios: 33,  estabelecimentos: 4500 },
  { estado: "South East",              uf: "SE",  regiao: "England",          populacao: 8893367,  totalDentistas: 5200,  dentistasPublicos: 3100, dentistasPrivados: 2100, dentistaPorHabitante: 1710, municipios: 19,  estabelecimentos: 2800 },
  { estado: "Midlands",                uf: "MID", regiao: "England",          populacao: 10628235, totalDentistas: 6200,  dentistasPublicos: 3700, dentistasPrivados: 2500, dentistaPorHabitante: 1714, municipios: 12,  estabelecimentos: 3300 },
  { estado: "North West",              uf: "NW",  regiao: "England",          populacao: 7422295,  totalDentistas: 4600,  dentistasPublicos: 2800, dentistasPrivados: 1800, dentistaPorHabitante: 1614, municipios: 23,  estabelecimentos: 2500 },
  { estado: "North East & Yorkshire",  uf: "NEY", regiao: "England",          populacao: 8159456,  totalDentistas: 3200,  dentistasPublicos: 2000, dentistasPrivados: 1200, dentistaPorHabitante: 2550, municipios: 15,  estabelecimentos: 1700 },
  { estado: "East of England",         uf: "EE",  regiao: "England",          populacao: 6296505,  totalDentistas: 3700,  dentistasPublicos: 2200, dentistasPrivados: 1500, dentistaPorHabitante: 1702, municipios: 8,   estabelecimentos: 2000 },
  { estado: "South West",              uf: "SW",  regiao: "England",          populacao: 5701717,  totalDentistas: 3300,  dentistasPublicos: 1900, dentistasPrivados: 1400, dentistaPorHabitante: 1728, municipios: 15,  estabelecimentos: 1800 },
  { estado: "Scotland",                uf: "SCO", regiao: "Scotland",         populacao: 5479900,  totalDentistas: 4000,  dentistasPublicos: 3000, dentistasPrivados: 1000, dentistaPorHabitante: 1370, municipios: 32,  estabelecimentos: 2200 },
  { estado: "Wales",                   uf: "WAL", regiao: "Wales",            populacao: 3170000,  totalDentistas: 2100,  dentistasPublicos: 1600, dentistasPrivados: 500,  dentistaPorHabitante: 1510, municipios: 22,  estabelecimentos: 1100 },
  { estado: "Northern Ireland",        uf: "NIR", regiao: "Northern Ireland", populacao: 1905000,  totalDentistas: 1500,  dentistasPublicos: 1100, dentistasPrivados: 400,  dentistaPorHabitante: 1270, municipios: 11,  estabelecimentos: 800 },
];

// ─── DATA BY REGION (4 nations) ───────────────────────────────────────────────
export const dadosPorRegiaoUK = [
  { regiao: "England",          estados: 7, populacao: 56103063, totalDentistas: 34600, dentistasPublicos: 20600, dentistasPrivados: 14000, dentistaPorHabitante: 1621, cor: "#3B82F6" },
  { regiao: "Scotland",         estados: 1, populacao: 5479900,  totalDentistas: 4000,  dentistasPublicos: 3000,  dentistasPrivados: 1000,  dentistaPorHabitante: 1370, cor: "#10B981" },
  { regiao: "Wales",            estados: 1, populacao: 3170000,  totalDentistas: 2100,  dentistasPublicos: 1600,  dentistasPrivados: 500,   dentistaPorHabitante: 1510, cor: "#F59E0B" },
  { regiao: "Northern Ireland", estados: 1, populacao: 1905000,  totalDentistas: 1500,  dentistasPublicos: 1100,  dentistasPrivados: 400,   dentistaPorHabitante: 1270, cor: "#8B5CF6" },
];

// ─── HISTORICAL SERIES (GDC Annual Reports 2015-2024) ─────────────────────────
export const serieHistoricaUK = [
  { ano: 2015, total: 40120, novosRegistros: 1800, cancelamentos: 1400 },
  { ano: 2016, total: 40500, novosRegistros: 1900, cancelamentos: 1500 },
  { ano: 2017, total: 40900, novosRegistros: 2000, cancelamentos: 1600 },
  { ano: 2018, total: 41400, novosRegistros: 2100, cancelamentos: 1600 },
  { ano: 2019, total: 41700, novosRegistros: 1900, cancelamentos: 1600 },
  { ano: 2020, total: 41200, novosRegistros: 1200, cancelamentos: 1700 },
  { ano: 2021, total: 41600, novosRegistros: 1800, cancelamentos: 1400 },
  { ano: 2022, total: 42000, novosRegistros: 1900, cancelamentos: 1500 },
  { ano: 2023, total: 42200, novosRegistros: 1800, cancelamentos: 1600 },
  { ano: 2024, total: 42200, novosRegistros: 1700, cancelamentos: 1700 },
  { ano: 2025, total: 42400, novosRegistros: 1800, cancelamentos: 1600 },
  { ano: 2026, total: 42700, novosRegistros: 1900, cancelamentos: 1600 },
];

// ─── GENERAL INDICATORS ───────────────────────────────────────────────────────
export const indicadoresGeraisUK = {
  totalDentistas: 42200,
  dentistasAtivos: 38500,
  dentistasPublicos: 24600,       // NHS dental contractors + salaried
  dentistasPrivados: 17600,
  totalEspecialistas: 5400,       // GDC specialist lists
  totalGeneralistas: 36800,
  mediaHabitantesBrasil: 1581,    // people per dentist
  recomendacaoOMS: 1500,
  totalEstabelecimentos: 14200,   // dental practices (NHS + mixed + private)
  totalMunicipiosComCobertura: 341,
  totalMunicipios: 382,
  faculdadesOdontologia: 16,      // GDC-accredited dental schools
  vagasAnuais: 1200,              // annual dental graduates
  crescimentoUltimoAno: 0.0,      // stagnant post-Brexit
};

export const CORES_REGIOES_UK: Record<string, string> = {
  England:          "#3B82F6",
  Scotland:         "#10B981",
  Wales:            "#F59E0B",
  "Northern Ireland": "#8B5CF6",
};

// ─── ESTABLISHMENT TYPES (NHS Digital + BDA 2023) ─────────────────────────────
export const dadosEstabelecimentosUK = [
  { tipo: "NHS Dental Practice",              total: 6800,  publico: 6800,  privado: 0,    dentistasVinculados: 18200, mediaDentistasPorEstab: 2.68, porcentagem: 47.9 },
  { tipo: "Mixed NHS/Private Practice",       total: 3800,  publico: 1900,  privado: 1900, dentistasVinculados: 11400, mediaDentistasPorEstab: 3.00, porcentagem: 26.8 },
  { tipo: "Private Practice Only",            total: 2700,  publico: 0,     privado: 2700, dentistasVinculados: 7800,  mediaDentistasPorEstab: 2.89, porcentagem: 19.0 },
  { tipo: "Community Dental Service",         total: 500,   publico: 500,   privado: 0,    dentistasVinculados: 2400,  mediaDentistasPorEstab: 4.80, porcentagem: 3.5  },
  { tipo: "Hospital Dental Dept.",            total: 280,   publico: 280,   privado: 0,    dentistasVinculados: 1600,  mediaDentistasPorEstab: 5.71, porcentagem: 2.0  },
  { tipo: "Dental School Clinic (GDC)",       total: 16,    publico: 16,    privado: 0,    dentistasVinculados: 960,   mediaDentistasPorEstab: 60.0, porcentagem: 0.1  },
  { tipo: "Defence Dental Services",          total: 106,   publico: 106,   privado: 0,    dentistasVinculados: 240,   mediaDentistasPorEstab: 2.26, porcentagem: 0.7  },
];

// ─── EPIDEMIOLOGY (NHS Digital + NDIP + Public Health England 2019-2022) ──────
export const epidemiologiaUK = {
  indicadores: {
    cpodAdultos35_44: 8.1,
    cpodIdosos65_74: 13.8,
    cariesPrevalencia: 84.0,
    cariesNaoTratadas: 25.0,
    periodontiteAdultos: 45.0,
    edentulismo65mais: 15.0,
    nuncaFoiDentista: 18.0,
    fonteAnno: "NHS Digital ADHS 2009 / NDIP 2022",
  },
  doencasBucais: [
    { doenca: "Dental Caries (ever)",     adultos: 84.0, criancas: 46.0, tendencia: "decreasing" },
    { doenca: "Untreated Caries",         adultos: 25.0, criancas: 12.0, tendencia: "decreasing" },
    { doenca: "Periodontitis",            adultos: 45.0, criancas: 0.0,  tendencia: "stable" },
    { doenca: "Severe Periodontitis",     adultos: 8.0,  criancas: 0.0,  tendencia: "decreasing" },
    { doenca: "Edentulism (65+)",         adultos: 15.0, criancas: 0.0,  tendencia: "decreasing" },
    { doenca: "Oral Cancer (100k/year)",  adultos: 9.8,  criancas: 0.0,  tendencia: "increasing" },
  ],
  prevalenciaPorRegiao: [
    { regiao: "England",          cpod: 7.9,  cariesNaoTratadas: 24.0, periodontite: 44.0, edentulismo: 14.0 },
    { regiao: "Scotland",         cpod: 9.2,  cariesNaoTratadas: 32.0, periodontite: 50.0, edentulismo: 20.0 },
    { regiao: "Wales",            cpod: 8.8,  cariesNaoTratadas: 29.0, periodontite: 48.0, edentulismo: 18.0 },
    { regiao: "Northern Ireland", cpod: 8.5,  cariesNaoTratadas: 27.0, periodontite: 46.0, edentulismo: 17.0 },
  ],
  tendencias: [
    { ano: 1998, cpod12anos: 1.4, edentulismo: 30.0, cariesNaoTratadas: 35.0 },
    { ano: 2003, cpod12anos: 1.0, edentulismo: 26.0, cariesNaoTratadas: 31.0 },
    { ano: 2009, cpod12anos: 0.7, edentulismo: 20.0, cariesNaoTratadas: 27.0 },
    { ano: 2015, cpod12anos: 0.5, edentulismo: 16.0, cariesNaoTratadas: 25.5 },
    { ano: 2022, cpod12anos: 0.4, edentulismo: 15.0, cariesNaoTratadas: 25.0 },
  ],
};
