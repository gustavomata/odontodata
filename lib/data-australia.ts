// =============================================================================
// OdontoData — Australia Dental Workforce Data
// Sources: AIHW Dental Practitioner Labour Force 2021-22, AHPRA Annual Report 2022,
//          ABS Census 2021, Dental Board of Australia, TEQSA
// =============================================================================

// ─── SPECIALTIES (Dental Board of Australia recognized specialties) ───────────
export const especialidadesAU = [
  { especialidade: "General Dentistry",           total: 22800, porcentagem: 75.9, crescimentoAnual: 2.1, reconhecidaCFO: false, descricao: "General dental care for all ages" },
  { especialidade: "Orthodontics",                total: 2100,  porcentagem: 7.0,  crescimentoAnual: 3.8, reconhecidaCFO: true,  descricao: "Correction of misaligned teeth and jaws" },
  { especialidade: "Oral & Maxillofacial Surgery", total: 800,   porcentagem: 2.7,  crescimentoAnual: 2.4, reconhecidaCFO: true,  descricao: "Surgery of the face, mouth and jaw" },
  { especialidade: "Prosthodontics",              total: 500,   porcentagem: 1.7,  crescimentoAnual: 1.9, reconhecidaCFO: true,  descricao: "Restoration and replacement of teeth" },
  { especialidade: "Periodontics",                total: 480,   porcentagem: 1.6,  crescimentoAnual: 2.3, reconhecidaCFO: true,  descricao: "Gum disease treatment and implants" },
  { especialidade: "Endodontics",                 total: 450,   porcentagem: 1.5,  crescimentoAnual: 2.8, reconhecidaCFO: true,  descricao: "Root canal therapy" },
  { especialidade: "Paediatric Dentistry",        total: 350,   porcentagem: 1.2,  crescimentoAnual: 3.2, reconhecidaCFO: true,  descricao: "Dental care for children" },
  { especialidade: "Oral Medicine",               total: 180,   porcentagem: 0.6,  crescimentoAnual: 4.5, reconhecidaCFO: true,  descricao: "Diagnosis of oral mucosal diseases" },
  { especialidade: "Special Needs Dentistry",     total: 130,   porcentagem: 0.4,  crescimentoAnual: 6.1, reconhecidaCFO: true,  descricao: "Dental care for people with special needs" },
  { especialidade: "Dental Public Health",        total: 64,    porcentagem: 0.2,  crescimentoAnual: 3.0, reconhecidaCFO: true,  descricao: "Community oral health programs" },
];

// ─── DATA BY STATE/TERRITORY (AIHW 2021-22 + ABS Census 2021) ────────────────
export const dadosPorEstadoAU = [
  { estado: "New South Wales",              uf: "NSW", regiao: "Eastern",  populacao: 8189266, totalDentistas: 9142,  dentistasPublicos: 1200, dentistasPrivados: 7942,  dentistaPorHabitante: 896,  municipios: 128, estabelecimentos: 4800 },
  { estado: "Victoria",                     uf: "VIC", regiao: "Eastern",  populacao: 6649159, totalDentistas: 7654,  dentistasPublicos: 1050, dentistasPrivados: 6604,  dentistaPorHabitante: 869,  municipios: 79,  estabelecimentos: 4000 },
  { estado: "Queensland",                   uf: "QLD", regiao: "Eastern",  populacao: 5210335, totalDentistas: 5987,  dentistasPublicos: 850,  dentistasPrivados: 5137,  dentistaPorHabitante: 870,  municipios: 77,  estabelecimentos: 3100 },
  { estado: "Western Australia",            uf: "WA",  regiao: "Western",  populacao: 2780400, totalDentistas: 3456,  dentistasPublicos: 490,  dentistasPrivados: 2966,  dentistaPorHabitante: 805,  municipios: 139, estabelecimentos: 1800 },
  { estado: "South Australia",              uf: "SA",  regiao: "Southern", populacao: 1820500, totalDentistas: 2198,  dentistasPublicos: 310,  dentistasPrivados: 1888,  dentistaPorHabitante: 829,  municipios: 68,  estabelecimentos: 1100 },
  { estado: "Australian Capital Territory", uf: "ACT", regiao: "Eastern",  populacao: 432200,  totalDentistas: 712,   dentistasPublicos: 120,  dentistasPrivados: 592,   dentistaPorHabitante: 607,  municipios: 5,   estabelecimentos: 370 },
  { estado: "Tasmania",                     uf: "TAS", regiao: "Eastern",  populacao: 571500,  totalDentistas: 621,   dentistasPublicos: 100,  dentistasPrivados: 521,   dentistaPorHabitante: 920,  municipios: 29,  estabelecimentos: 320 },
  { estado: "Northern Territory",           uf: "NT",  regiao: "Northern", populacao: 250600,  totalDentistas: 271,   dentistasPublicos: 80,   dentistasPrivados: 191,   dentistaPorHabitante: 925,  municipios: 16,  estabelecimentos: 140 },
];

// ─── DATA BY REGION ───────────────────────────────────────────────────────────
export const dadosPorRegiaoAU = [
  { regiao: "Eastern",  estados: 5, populacao: 21052460, totalDentistas: 24116, dentistasPublicos: 3320, dentistasPrivados: 20796, dentistaPorHabitante: 873, cor: "#3B82F6" },
  { regiao: "Western",  estados: 1, populacao: 2780400,  totalDentistas: 3456,  dentistasPublicos: 490,  dentistasPrivados: 2966,  dentistaPorHabitante: 805, cor: "#F59E0B" },
  { regiao: "Southern", estados: 1, populacao: 1820500,  totalDentistas: 2198,  dentistasPublicos: 310,  dentistasPrivados: 1888,  dentistaPorHabitante: 829, cor: "#10B981" },
  { regiao: "Northern", estados: 1, populacao: 250600,   totalDentistas: 271,   dentistasPublicos: 80,   dentistasPrivados: 191,   dentistaPorHabitante: 925, cor: "#EF4444" },
];

// ─── HISTORICAL SERIES (AIHW + AHPRA 2015-2024) ──────────────────────────────
export const serieHistoricaAU = [
  { ano: 2015, total: 22500, novosRegistros: 820, cancelamentos: 310 },
  { ano: 2016, total: 23400, novosRegistros: 950, cancelamentos: 290 },
  { ano: 2017, total: 24200, novosRegistros: 890, cancelamentos: 280 },
  { ano: 2018, total: 25100, novosRegistros: 920, cancelamentos: 260 },
  { ano: 2019, total: 26000, novosRegistros: 960, cancelamentos: 240 },
  { ano: 2020, total: 26500, novosRegistros: 750, cancelamentos: 380 },
  { ano: 2021, total: 27400, novosRegistros: 870, cancelamentos: 260 },
  { ano: 2022, total: 28854, novosRegistros: 820, cancelamentos: 240 },
  { ano: 2023, total: 29500, novosRegistros: 790, cancelamentos: 230 },
  { ano: 2024, total: 30041, novosRegistros: 760, cancelamentos: 220 },
];

// ─── GENERAL INDICATORS ───────────────────────────────────────────────────────
export const indicadoresGeraisAU = {
  totalDentistas: 30041,
  dentistasAtivos: 28854,
  dentistasPublicos: 4200,         // public dental services
  dentistasPrivados: 25841,
  totalEspecialistas: 5054,        // AHPRA registered specialists
  totalGeneralistas: 22800,
  mediaHabitantesBrasil: 858,      // people per dentist (national avg)
  recomendacaoOMS: 1500,
  totalEstabelecimentos: 14200,    // dental practices + clinics
  totalMunicipiosComCobertura: 450, // LGAs with at least 1 dentist
  totalMunicipios: 537,            // total LGAs
  faculdadesOdontologia: 10,       // TEQSA-accredited dental schools
  vagasAnuais: 820,                // annual graduates
  crescimentoUltimoAno: 1.8,
};

export const CORES_REGIOES_AU: Record<string, string> = {
  Eastern:  "#3B82F6",
  Western:  "#F59E0B",
  Southern: "#10B981",
  Northern: "#EF4444",
};
