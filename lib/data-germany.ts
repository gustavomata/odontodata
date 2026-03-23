// =============================================================================
// OdontoData — Germany Dental Workforce Data
// Sources: BZÄK (Bundeszahnärztekammer) 2023, GKV-Spitzenverband, Destatis,
//          KZBV (Kassenzahnärztliche Bundesvereinigung), WHO Global Oral Health 2023
// =============================================================================

// ─── SPECIALTIES (BZÄK recognized) ───────────────────────────────────────────
export const especialidadesDE = [
  { especialidade: "Allgemeinzahnheilkunde",    total: 52000, porcentagem: 59.2, crescimentoAnual: 0.6, reconhecidaCFO: false, descricao: "General dental care for all ages" },
  { especialidade: "Kieferorthopädie",           total: 11400, porcentagem: 13.0, crescimentoAnual: 1.8, reconhecidaCFO: true,  descricao: "Orthodontics — alignment of teeth and jaws" },
  { especialidade: "Oralchirurgie",              total: 6200,  porcentagem: 7.1,  crescimentoAnual: 1.2, reconhecidaCFO: true,  descricao: "Oral surgery" },
  { especialidade: "Parodontologie",             total: 4800,  porcentagem: 5.5,  crescimentoAnual: 2.4, reconhecidaCFO: true,  descricao: "Periodontology — gum disease treatment" },
  { especialidade: "Prothetik",                  total: 3900,  porcentagem: 4.4,  crescimentoAnual: 0.8, reconhecidaCFO: true,  descricao: "Prosthodontics — tooth replacement" },
  { especialidade: "Endodontologie",             total: 2100,  porcentagem: 2.4,  crescimentoAnual: 3.1, reconhecidaCFO: true,  descricao: "Endodontics — root canal treatment" },
  { especialidade: "Kinderzahnheilkunde",        total: 1800,  porcentagem: 2.0,  crescimentoAnual: 3.8, reconhecidaCFO: true,  descricao: "Pediatric dentistry" },
  { especialidade: "Orale Medizin",              total: 600,   porcentagem: 0.7,  crescimentoAnual: 4.2, reconhecidaCFO: true,  descricao: "Oral medicine — mucosal disease diagnosis" },
  { especialidade: "Implantologie",              total: 5000,  porcentagem: 5.7,  crescimentoAnual: 2.9, reconhecidaCFO: false, descricao: "Implantology — dental implants" },
];

// ─── DATA BY BUNDESLAND (state) ───────────────────────────────────────────────
export const dadosPorEstadoDE = [
  { estado: "Bayern",               uf: "BY", regiao: "Süd",        populacao: 13369393, totalDentistas: 13200, dentistasPublicos: 1600, dentistasPrivados: 11600, dentistaPorHabitante: 1013, municipios: 2056, estabelecimentos: 7100 },
  { estado: "Nordrhein-Westfalen",  uf: "NW", regiao: "West",       populacao: 17924591, totalDentistas: 16800, dentistasPublicos: 2100, dentistasPrivados: 14700, dentistaPorHabitante: 1067, municipios: 396,  estabelecimentos: 9000 },
  { estado: "Baden-Württemberg",   uf: "BW", regiao: "Süd",        populacao: 11103043, totalDentistas: 10200, dentistasPublicos: 1200, dentistasPrivados: 9000,  dentistaPorHabitante: 1088, municipios: 1101, estabelecimentos: 5500 },
  { estado: "Berlin",              uf: "BE", regiao: "Ost",        populacao: 3769495,  totalDentistas: 5200,  dentistasPublicos: 800,  dentistasPrivados: 4400,  dentistaPorHabitante: 725,  municipios: 12,   estabelecimentos: 2800 },
  { estado: "Niedersachsen",       uf: "NI", regiao: "Nord",       populacao: 8003421,  totalDentistas: 7200,  dentistasPublicos: 900,  dentistasPrivados: 6300,  dentistaPorHabitante: 1111, municipios: 422,  estabelecimentos: 3900 },
  { estado: "Sachsen",             uf: "SN", regiao: "Ost",        populacao: 4057941,  totalDentistas: 3800,  dentistasPublicos: 500,  dentistasPrivados: 3300,  dentistaPorHabitante: 1068, municipios: 422,  estabelecimentos: 2000 },
  { estado: "Hamburg",             uf: "HH", regiao: "Nord",       populacao: 1853935,  totalDentistas: 2800,  dentistasPublicos: 400,  dentistasPrivados: 2400,  dentistaPorHabitante: 662,  municipios: 7,    estabelecimentos: 1500 },
  { estado: "Hessen",              uf: "HE", regiao: "Mitte",      populacao: 6391666,  totalDentistas: 5800,  dentistasPublicos: 700,  dentistasPrivados: 5100,  dentistaPorHabitante: 1102, municipios: 426,  estabelecimentos: 3100 },
  { estado: "Rheinland-Pfalz",     uf: "RP", regiao: "West",       populacao: 4106485,  totalDentistas: 3700,  dentistasPublicos: 460,  dentistasPrivados: 3240,  dentistaPorHabitante: 1110, municipios: 2305, estabelecimentos: 2000 },
  { estado: "Sachsen-Anhalt",      uf: "ST", regiao: "Ost",        populacao: 2169253,  totalDentistas: 1900,  dentistasPublicos: 280,  dentistasPrivados: 1620,  dentistaPorHabitante: 1142, municipios: 218,  estabelecimentos: 1000 },
  { estado: "Thüringen",           uf: "TH", regiao: "Ost",        populacao: 2118799,  totalDentistas: 1850,  dentistasPublicos: 260,  dentistasPrivados: 1590,  dentistaPorHabitante: 1145, municipios: 849,  estabelecimentos: 990 },
  { estado: "Schleswig-Holstein",  uf: "SH", regiao: "Nord",       populacao: 2922005,  totalDentistas: 2600,  dentistasPublicos: 330,  dentistasPrivados: 2270,  dentistaPorHabitante: 1124, municipios: 1106, estabelecimentos: 1400 },
  { estado: "Brandenburg",         uf: "BB", regiao: "Ost",        populacao: 2537868,  totalDentistas: 2100,  dentistasPublicos: 310,  dentistasPrivados: 1790,  dentistaPorHabitante: 1209, municipios: 418,  estabelecimentos: 1100 },
  { estado: "Mecklenburg-Vorpommern", uf: "MV", regiao: "Nord",    populacao: 1612362,  totalDentistas: 1400,  dentistasPublicos: 220,  dentistasPrivados: 1180,  dentistaPorHabitante: 1151, municipios: 726,  estabelecimentos: 750 },
  { estado: "Saarland",            uf: "SL", regiao: "West",       populacao: 994187,   totalDentistas: 900,   dentistasPublicos: 120,  dentistasPrivados: 780,   dentistaPorHabitante: 1105, municipios: 52,   estabelecimentos: 480 },
  { estado: "Bremen",              uf: "HB", regiao: "Nord",       populacao: 681202,   totalDentistas: 800,   dentistasPublicos: 130,  dentistasPrivados: 670,   dentistaPorHabitante: 851,  municipios: 2,    estabelecimentos: 430 },
];

// ─── DATA BY REGION ───────────────────────────────────────────────────────────
export const dadosPorRegiaoDE = [
  { regiao: "West",  estados: 3, populacao: 23025263, totalDentistas: 21400, dentistasPublicos: 2680, dentistasPrivados: 18720, dentistaPorHabitante: 1076, cor: "#3B82F6" },
  { regiao: "Süd",   estados: 2, populacao: 24472436, totalDentistas: 23400, dentistasPublicos: 2800, dentistasPrivados: 20600, dentistaPorHabitante: 1046, cor: "#10B981" },
  { regiao: "Nord",  estados: 4, populacao: 13069504, totalDentistas: 12600, dentistasPublicos: 1580, dentistasPrivados: 11020, dentistaPorHabitante: 1037, cor: "#F59E0B" },
  { regiao: "Mitte", estados: 1, populacao: 6391666,  totalDentistas: 5800,  dentistasPublicos: 700,  dentistasPrivados: 5100,  dentistaPorHabitante: 1102, cor: "#8B5CF6" },
  { regiao: "Ost",   estados: 5, populacao: 14673456, totalDentistas: 14850, dentistasPublicos: 2150, dentistasPrivados: 12700, dentistaPorHabitante: 988,  cor: "#EF4444" },
];

// ─── HISTORICAL SERIES (BZÄK 2015-2024) ──────────────────────────────────────
export const serieHistoricaDE = [
  { ano: 2015, total: 71000, novosRegistros: 2100, cancelamentos: 1800 },
  { ano: 2016, total: 71800, novosRegistros: 2200, cancelamentos: 1600 },
  { ano: 2017, total: 72500, novosRegistros: 2300, cancelamentos: 1500 },
  { ano: 2018, total: 73200, novosRegistros: 2400, cancelamentos: 1500 },
  { ano: 2019, total: 73900, novosRegistros: 2500, cancelamentos: 1400 },
  { ano: 2020, total: 74200, novosRegistros: 1900, cancelamentos: 1600 },
  { ano: 2021, total: 75100, novosRegistros: 2600, cancelamentos: 1500 },
  { ano: 2022, total: 76000, novosRegistros: 2700, cancelamentos: 1400 },
  { ano: 2023, total: 76900, novosRegistros: 2800, cancelamentos: 1500 },
  { ano: 2024, total: 77800, novosRegistros: 2900, cancelamentos: 1400 },
  { ano: 2025, total: 79300, novosRegistros: 2900, cancelamentos: 1400 },
];

// ─── GENERAL INDICATORS ───────────────────────────────────────────────────────
export const indicadoresGeraisDE = {
  totalDentistas: 77800,
  dentistasAtivos: 70200,
  dentistasPublicos: 14160,        // GKV (gesetzliche Krankenversicherung)
  dentistasPrivados: 63640,
  totalEspecialistas: 35800,       // BZÄK Fachzahnärzte
  totalGeneralistas: 42000,
  mediaHabitantesBrasil: 1075,     // Einwohner pro Zahnarzt
  recomendacaoOMS: 1500,
  totalEstabelecimentos: 54200,    // Zahnarztpraxen
  totalMunicipiosComCobertura: 10800, // Kreise/Gemeinden mit Versorgung
  totalMunicipios: 16053,          // Gesamtgemeinden Deutschland
  faculdadesOdontologia: 30,       // Universitätszahnkliniken
  vagasAnuais: 2900,               // Absolventen/Jahr
  crescimentoUltimoAno: 1.2,
};

export const CORES_REGIOES_DE: Record<string, string> = {
  West:  "#3B82F6",
  Süd:   "#10B981",
  Nord:  "#F59E0B",
  Mitte: "#8B5CF6",
  Ost:   "#EF4444",
};

// ─── ESTABLISHMENT TYPES (BZÄK + KZBV 2023) ──────────────────────────────────
export const dadosEstabelecimentosDE = [
  { tipo: "Einzelpraxis (Solo)",             total: 37400, publico: 0,    privado: 37400, dentistasVinculados: 37400, mediaDentistasPorEstab: 1.00, porcentagem: 69.0 },
  { tipo: "Gemeinschaftspraxis (2–4 dent.)", total: 10800, publico: 0,    privado: 10800, dentistasVinculados: 25000, mediaDentistasPorEstab: 2.31, porcentagem: 19.9 },
  { tipo: "MVZ Zahnarzt",                    total: 2700,  publico: 400,  privado: 2300,  dentistasVinculados: 8100,  mediaDentistasPorEstab: 3.00, porcentagem: 5.0  },
  { tipo: "Praxisnetzwerk / Filialbetrieb",  total: 2400,  publico: 0,    privado: 2400,  dentistasVinculados: 3600,  mediaDentistasPorEstab: 1.50, porcentagem: 4.4  },
  { tipo: "Krankenhaus Zahnklinik",          total: 870,   publico: 700,  privado: 170,   dentistasVinculados: 1750,  mediaDentistasPorEstab: 2.01, porcentagem: 1.6  },
  { tipo: "Universitätszahnklinik",          total: 30,    publico: 30,   privado: 0,     dentistasVinculados: 2900,  mediaDentistasPorEstab: 96.7, porcentagem: 0.06 },
  { tipo: "Berufsausübungsgemeinschaft",     total: 600,   publico: 0,    privado: 600,   dentistasVinculados: 1200,  mediaDentistasPorEstab: 2.00, porcentagem: 1.1  },
];

// ─── EPIDEMIOLOGY (IDZ DMS V + RKI 2014–2021) ─────────────────────────────────
export const epidemiologiaDE = {
  indicadores: {
    cpodAdultos35_44: 11.3,
    cpodIdosos65_74: 17.6,
    cariesPrevalencia: 99.0,
    cariesNaoTratadas: 8.5,
    periodontiteAdultos: 52.0,
    edentulismo65mais: 12.4,
    nuncaFoiDentista: 6.0,
    fonteAnno: "IDZ DMS V 2014 / RKI GEDA 2021",
  },
  doencasBucais: [
    { doenca: "Karies (je erlebt)",           adultos: 99.0, criancas: 43.0, tendencia: "stable" },
    { doenca: "Unbehandelte Karies",          adultos: 8.5,  criancas: 5.0,  tendencia: "decreasing" },
    { doenca: "Parodontitis",                 adultos: 52.0, criancas: 0.0,  tendencia: "stable" },
    { doenca: "Schwere Parodontitis",         adultos: 20.0, criancas: 0.0,  tendencia: "decreasing" },
    { doenca: "Zahnlosigkeit (65+)",          adultos: 12.4, criancas: 0.0,  tendencia: "decreasing" },
    { doenca: "Mundkrebs (pro 100k/Jahr)",    adultos: 10.8, criancas: 0.0,  tendencia: "increasing" },
  ],
  prevalenciaPorRegiao: [
    { regiao: "Nord",  cpod: 10.8, cariesNaoTratadas: 7.5,  periodontite: 50.0, edentulismo: 11.2 },
    { regiao: "West",  cpod: 11.0, cariesNaoTratadas: 8.0,  periodontite: 51.0, edentulismo: 11.8 },
    { regiao: "Süd",   cpod: 10.9, cariesNaoTratadas: 7.2,  periodontite: 49.0, edentulismo: 10.9 },
    { regiao: "Mitte", cpod: 11.4, cariesNaoTratadas: 8.8,  periodontite: 53.0, edentulismo: 12.8 },
    { regiao: "Ost",   cpod: 12.2, cariesNaoTratadas: 10.5, periodontite: 57.0, edentulismo: 15.4 },
  ],
  tendencias: [
    { ano: 1989, cpod12anos: 5.1,  edentulismo: 25.0, cariesNaoTratadas: 32.0 },
    { ano: 1997, cpod12anos: 2.4,  edentulismo: 22.0, cariesNaoTratadas: 18.0 },
    { ano: 2005, cpod12anos: 1.2,  edentulismo: 18.0, cariesNaoTratadas: 12.0 },
    { ano: 2014, cpod12anos: 0.5,  edentulismo: 12.4, cariesNaoTratadas: 8.5  },
    { ano: 2021, cpod12anos: 0.45, edentulismo: 10.8, cariesNaoTratadas: 7.2  },
  ],
};
