// =============================================================================
// OdontoData — France Dental Workforce Data
// Sources: Ordre National des Chirurgiens-Dentistes (ONCD) 2023,
//          DREES (Direction de la recherche, études, évaluation et statistiques),
//          Caisse nationale d'assurance maladie (CNAM), ONDPS 2023
// =============================================================================

// ─── SPECIALTIES (ONCD + ADF recognised, 2023) ───────────────────────────────
export const especialidadesFR = [
  { especialidade: "Omnipratique (généraliste)",    total: 29800, porcentagem: 70.6, crescimentoAnual: 0.4, reconhecidaCFO: false, descricao: "Soins dentaires généraux pour tous les âges" },
  { especialidade: "Orthopédie dento-faciale",       total: 6400,  porcentagem: 15.2, crescimentoAnual: 1.8, reconhecidaCFO: true,  descricao: "Orthodontie — alignement des dents et des mâchoires" },
  { especialidade: "Chirurgie orale",                total: 1800,  porcentagem: 4.3,  crescimentoAnual: 2.2, reconhecidaCFO: true,  descricao: "Chirurgie de la cavité buccale" },
  { especialidade: "Implantologie",                  total: 1200,  porcentagem: 2.8,  crescimentoAnual: 3.5, reconhecidaCFO: false, descricao: "Implants dentaires (qualification avancée)" },
  { especialidade: "Parodontologie",                 total: 950,   porcentagem: 2.2,  crescimentoAnual: 2.8, reconhecidaCFO: false, descricao: "Maladies parodontales" },
  { especialidade: "Endodontie",                     total: 800,   porcentagem: 1.9,  crescimentoAnual: 3.1, reconhecidaCFO: false, descricao: "Traitement des canaux radiculaires" },
  { especialidade: "Prothèse dentaire",              total: 550,   porcentagem: 1.3,  crescimentoAnual: 0.9, reconhecidaCFO: false, descricao: "Restauration et remplacement des dents" },
  { especialidade: "Médecine bucco-dentaire",        total: 400,   porcentagem: 0.9,  crescimentoAnual: 4.2, reconhecidaCFO: true,  descricao: "Diagnostic des maladies de la muqueuse buccale" },
  { especialidade: "Odontologie pédiatrique",        total: 300,   porcentagem: 0.7,  crescimentoAnual: 3.8, reconhecidaCFO: false, descricao: "Soins dentaires pour enfants et adolescents" },
];

// ─── DATA BY REGION (13 metropolitan regions + Outre-Mer) ─────────────────────
export const dadosPorEstadoFR = [
  { estado: "Île-de-France",              uf: "IDF", regiao: "Île-de-France", populacao: 12213000, totalDentistas: 9100,  dentistasPublicos: 6100, dentistasPrivados: 3000, dentistaPorHabitante: 1342, municipios: 8,   estabelecimentos: 5200 },
  { estado: "Auvergne-Rhône-Alpes",       uf: "ARA", regiao: "Centre/Est",    populacao: 8099000,  totalDentistas: 5200,  dentistasPublicos: 3500, dentistasPrivados: 1700, dentistaPorHabitante: 1558, municipios: 12,  estabelecimentos: 3000 },
  { estado: "Nouvelle-Aquitaine",         uf: "NAQ", regiao: "Grand Ouest",   populacao: 6111000,  totalDentistas: 3900,  dentistasPublicos: 2600, dentistasPrivados: 1300, dentistaPorHabitante: 1567, municipios: 12,  estabelecimentos: 2200 },
  { estado: "Occitanie",                  uf: "OCC", regiao: "Méditerranée",  populacao: 5974000,  totalDentistas: 3600,  dentistasPublicos: 2400, dentistasPrivados: 1200, dentistaPorHabitante: 1659, municipios: 13,  estabelecimentos: 2100 },
  { estado: "Hauts-de-France",            uf: "HDF", regiao: "Nord & Est",    populacao: 5993000,  totalDentistas: 3200,  dentistasPublicos: 2200, dentistasPrivados: 1000, dentistaPorHabitante: 1873, municipios: 5,   estabelecimentos: 1900 },
  { estado: "Grand Est",                  uf: "GES", regiao: "Nord & Est",    populacao: 5566000,  totalDentistas: 3100,  dentistasPublicos: 2100, dentistasPrivados: 1000, dentistaPorHabitante: 1795, municipios: 10,  estabelecimentos: 1800 },
  { estado: "Provence-Alpes-Côte d'Azur", uf: "PAC", regiao: "Méditerranée",  populacao: 5088000,  totalDentistas: 3500,  dentistasPublicos: 2300, dentistasPrivados: 1200, dentistaPorHabitante: 1454, municipios: 6,   estabelecimentos: 2000 },
  { estado: "Pays de la Loire",           uf: "PDL", regiao: "Grand Ouest",   populacao: 3786000,  totalDentistas: 2400,  dentistasPublicos: 1600, dentistasPrivados: 800,  dentistaPorHabitante: 1578, municipios: 5,   estabelecimentos: 1400 },
  { estado: "Bretagne",                   uf: "BRE", regiao: "Grand Ouest",   populacao: 3396000,  totalDentistas: 1900,  dentistasPublicos: 1300, dentistasPrivados: 600,  dentistaPorHabitante: 1788, municipios: 4,   estabelecimentos: 1100 },
  { estado: "Normandie",                  uf: "NOR", regiao: "Nord & Est",    populacao: 3326000,  totalDentistas: 1800,  dentistasPublicos: 1200, dentistasPrivados: 600,  dentistaPorHabitante: 1848, municipios: 5,   estabelecimentos: 1050 },
  { estado: "Bourgogne-Franche-Comté",    uf: "BFC", regiao: "Centre/Est",    populacao: 2812000,  totalDentistas: 1500,  dentistasPublicos: 1000, dentistasPrivados: 500,  dentistaPorHabitante: 1875, municipios: 8,   estabelecimentos: 870 },
  { estado: "Centre-Val de Loire",        uf: "CVL", regiao: "Centre/Est",    populacao: 2576000,  totalDentistas: 1400,  dentistasPublicos: 940,  dentistasPrivados: 460,  dentistaPorHabitante: 1840, municipios: 6,   estabelecimentos: 810 },
  { estado: "Corse",                      uf: "COR", regiao: "Méditerranée",  populacao: 345000,   totalDentistas: 300,   dentistasPublicos: 200,  dentistasPrivados: 100,  dentistaPorHabitante: 1150, municipios: 2,   estabelecimentos: 175 },
  { estado: "Outre-Mer",                  uf: "OM",  regiao: "Méditerranée",  populacao: 2200000,  totalDentistas: 1300,  dentistasPublicos: 880,  dentistasPrivados: 420,  dentistaPorHabitante: 1692, municipios: 5,   estabelecimentos: 750 },
];

// ─── DATA BY MACRO-REGION ─────────────────────────────────────────────────────
export const dadosPorRegiaoFR = [
  { regiao: "Île-de-France", estados: 1,  populacao: 12213000, totalDentistas: 9100,  dentistasPublicos: 6100, dentistasPrivados: 3000, dentistaPorHabitante: 1342, cor: "#3B82F6" },
  { regiao: "Nord & Est",    estados: 3,  populacao: 14885000, totalDentistas: 8100,  dentistasPublicos: 5500, dentistasPrivados: 2600, dentistaPorHabitante: 1837, cor: "#10B981" },
  { regiao: "Grand Ouest",   estados: 3,  populacao: 13293000, totalDentistas: 8200,  dentistasPublicos: 5500, dentistasPrivados: 2700, dentistaPorHabitante: 1621, cor: "#F59E0B" },
  { regiao: "Centre/Est",    estados: 3,  populacao: 13487000, totalDentistas: 8100,  dentistasPublicos: 5440, dentistasPrivados: 2660, dentistaPorHabitante: 1665, cor: "#8B5CF6" },
  { regiao: "Méditerranée",  estados: 4,  populacao: 13607000, totalDentistas: 8700,  dentistasPublicos: 5780, dentistasPrivados: 2920, dentistaPorHabitante: 1564, cor: "#EF4444" },
];

// ─── HISTORICAL SERIES (ONCD + DREES 2015-2024) ───────────────────────────────
export const serieHistoricaFR = [
  { ano: 2015, total: 41200, novosRegistros: 1600, cancelamentos: 1400 },
  { ano: 2016, total: 41300, novosRegistros: 1500, cancelamentos: 1400 },
  { ano: 2017, total: 41500, novosRegistros: 1600, cancelamentos: 1400 },
  { ano: 2018, total: 41600, novosRegistros: 1500, cancelamentos: 1400 },
  { ano: 2019, total: 41700, novosRegistros: 1500, cancelamentos: 1400 },
  { ano: 2020, total: 41400, novosRegistros: 1100, cancelamentos: 1400 },
  { ano: 2021, total: 41600, novosRegistros: 1500, cancelamentos: 1300 },
  { ano: 2022, total: 42000, novosRegistros: 1600, cancelamentos: 1200 },
  { ano: 2023, total: 42200, novosRegistros: 1500, cancelamentos: 1300 },
  { ano: 2024, total: 42200, novosRegistros: 1400, cancelamentos: 1400 },
];

// ─── GENERAL INDICATORS ───────────────────────────────────────────────────────
export const indicadoresGeraisFR = {
  totalDentistas: 42200,
  dentistasAtivos: 41100,
  dentistasPublicos: 27500,       // Secteur 1 + hospitaliers
  dentistasPrivados: 14700,       // Secteur 2 + libéral
  totalEspecialistas: 8700,       // Orthodontistes + chirurgiens oraux + MBD
  totalGeneralistas: 33500,
  mediaHabitantesBrasil: 1568,    // habitants par chirurgien-dentiste
  recomendacaoOMS: 1500,
  totalEstabelecimentos: 39000,   // cabinets dentaires
  totalMunicipiosComCobertura: 28600,
  totalMunicipios: 34935,
  faculdadesOdontologia: 16,      // UFR d'odontologie
  vagasAnuais: 1400,              // lauréats par an
  crescimentoUltimoAno: 0.0,      // stagnation démographique
};

export const CORES_REGIOES_FR: Record<string, string> = {
  "Île-de-France": "#3B82F6",
  "Nord & Est":    "#10B981",
  "Grand Ouest":   "#F59E0B",
  "Centre/Est":    "#8B5CF6",
  "Méditerranée":  "#EF4444",
};

// ─── ESTABLISHMENT TYPES (CNAM + ONCD 2023) ───────────────────────────────────
export const dadosEstabelecimentosFR = [
  { tipo: "Cabinet individuel (solo)",          total: 26400, publico: 0,     privado: 26400, dentistasVinculados: 26400, mediaDentistasPorEstab: 1.00, porcentagem: 67.7 },
  { tipo: "Cabinet de groupe (2–4 dent.)",      total: 8200,  publico: 0,     privado: 8200,  dentistasVinculados: 20000, mediaDentistasPorEstab: 2.44, porcentagem: 21.0 },
  { tipo: "Centre de santé dentaire",           total: 1800,  publico: 1800,  privado: 0,     dentistasVinculados: 5400,  mediaDentistasPorEstab: 3.00, porcentagem: 4.6  },
  { tipo: "Maison de santé pluridisciplinaire", total: 1400,  publico: 700,   privado: 700,   dentistasVinculados: 2800,  mediaDentistasPorEstab: 2.00, porcentagem: 3.6  },
  { tipo: "Service hospitalier d'odontologie",  total: 890,   publico: 890,   privado: 0,     dentistasVinculados: 2700,  mediaDentistasPorEstab: 3.03, porcentagem: 2.3  },
  { tipo: "Clinique universitaire d'odonto.",   total: 16,    publico: 16,    privado: 0,     dentistasVinculados: 1400,  mediaDentistasPorEstab: 87.5, porcentagem: 0.04 },
  { tipo: "Cabinet low-cost / franchise",       total: 290,   publico: 0,     privado: 290,   dentistasVinculados: 580,   mediaDentistasPorEstab: 2.00, porcentagem: 0.7  },
];

// ─── EPIDEMIOLOGY (ESTEBAN 2015 + HBSC + InVS 2022) ──────────────────────────
export const epidemiologiaFR = {
  indicadores: {
    cpodAdultos35_44: 8.4,
    cpodIdosos65_74: 15.2,
    cariesPrevalencia: 90.0,
    cariesNaoTratadas: 20.0,
    periodontiteAdultos: 50.0,
    edentulismo65mais: 13.0,
    nuncaFoiDentista: 12.0,
    fonteAnno: "ESTEBAN 2015 / HBSC 2018 / InVS 2022",
  },
  doencasBucais: [
    { doenca: "Caries (jamais eu)",         adultos: 90.0, criancas: 50.0, tendencia: "decreasing" },
    { doenca: "Caries non traitées",        adultos: 20.0, criancas: 10.0, tendencia: "decreasing" },
    { doenca: "Parodontite",                adultos: 50.0, criancas: 0.0,  tendencia: "stable" },
    { doenca: "Parodontite sévère",         adultos: 10.0, criancas: 0.0,  tendencia: "decreasing" },
    { doenca: "Édentement (65+)",           adultos: 13.0, criancas: 0.0,  tendencia: "decreasing" },
    { doenca: "Cancer oral (100k/an)",      adultos: 9.2,  criancas: 0.0,  tendencia: "increasing" },
  ],
  prevalenciaPorRegiao: [
    { regiao: "Île-de-France", cpod: 7.9,  cariesNaoTratadas: 17.0, periodontite: 47.0, edentulismo: 10.0 },
    { regiao: "Nord & Est",    cpod: 9.1,  cariesNaoTratadas: 24.0, periodontite: 54.0, edentulismo: 16.0 },
    { regiao: "Grand Ouest",   cpod: 8.2,  cariesNaoTratadas: 19.0, periodontite: 49.0, edentulismo: 12.0 },
    { regiao: "Centre/Est",    cpod: 8.5,  cariesNaoTratadas: 20.0, periodontite: 50.0, edentulismo: 13.0 },
    { regiao: "Méditerranée",  cpod: 8.0,  cariesNaoTratadas: 19.0, periodontite: 48.0, edentulismo: 12.0 },
  ],
  tendencias: [
    { ano: 1990, cpod12anos: 4.2, edentulismo: 25.0, cariesNaoTratadas: 28.0 },
    { ano: 1998, cpod12anos: 2.0, edentulismo: 20.0, cariesNaoTratadas: 22.0 },
    { ano: 2006, cpod12anos: 1.2, edentulismo: 16.0, cariesNaoTratadas: 20.0 },
    { ano: 2013, cpod12anos: 0.9, edentulismo: 14.0, cariesNaoTratadas: 21.0 },
    { ano: 2022, cpod12anos: 0.7, edentulismo: 13.0, cariesNaoTratadas: 20.0 },
  ],
};
