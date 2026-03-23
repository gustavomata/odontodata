// =============================================================================
// OdontoData — Japan Dental Workforce Data
// Sources: MHLW (厚生労働省) Physician/Dentist Survey 医師・歯科医師・薬剤師統計 2022,
//          Japan Dental Association (JDA / 日本歯科医師会),
//          Ministry of Education MEXT — Dental Schools 2023,
//          Statistics Bureau of Japan (総務省統計局)
// =============================================================================

// ─── SPECIALTIES (JDSB + JDA recognised, 2022) ───────────────────────────────
export const especialidadesJP = [
  { especialidade: "一般歯科 (General Dentistry)",       total: 78200, porcentagem: 73.1, crescimentoAnual: 0.2, reconhecidaCFO: false, descricao: "Primary dental care for patients of all ages" },
  { especialidade: "矯正歯科 (Orthodontics)",            total: 8600,  porcentagem: 8.0,  crescimentoAnual: 1.5, reconhecidaCFO: true,  descricao: "Alignment of teeth and jaws" },
  { especialidade: "小児歯科 (Paediatric Dentistry)",    total: 7400,  porcentagem: 6.9,  crescimentoAnual: 0.5, reconhecidaCFO: true,  descricao: "Dental care for children and adolescents" },
  { especialidade: "口腔外科 (Oral & Maxillofacial Surgery)", total: 6200, porcentagem: 5.8, crescimentoAnual: 0.8, reconhecidaCFO: true, descricao: "Surgery of face, mouth, and jaw" },
  { especialidade: "歯周病科 (Periodontics)",            total: 3800,  porcentagem: 3.6,  crescimentoAnual: 1.2, reconhecidaCFO: true,  descricao: "Gum disease prevention and treatment" },
  { especialidade: "補綴科 (Prosthodontics)",            total: 2200,  porcentagem: 2.1,  crescimentoAnual: 0.3, reconhecidaCFO: true,  descricao: "Restoration and replacement of teeth" },
  { especialidade: "歯内療法 (Endodontics)",             total: 900,   porcentagem: 0.8,  crescimentoAnual: 1.8, reconhecidaCFO: true,  descricao: "Root canals and pulp treatment" },
  { especialidade: "口腔内科 (Oral Medicine)",           total: 400,   porcentagem: 0.4,  crescimentoAnual: 2.5, reconhecidaCFO: true,  descricao: "Oral mucosal disease diagnosis" },
  { especialidade: "インプラント (Implantology)",        total: 900,   porcentagem: 0.8,  crescimentoAnual: 2.0, reconhecidaCFO: false, descricao: "Dental implants" },
  { especialidade: "審美歯科 (Cosmetic Dentistry)",      total: 800,   porcentagem: 0.7,  crescimentoAnual: 3.5, reconhecidaCFO: false, descricao: "Aesthetic dental procedures" },
];

// ─── DATA BY PREFECTURE (47 prefectures, MHLW 2022) ──────────────────────────
export const dadosPorEstadoJP = [
  { estado: "Tokyo (東京)",        uf: "TK",  regiao: "Kanto",          populacao: 14048000, totalDentistas: 15800, dentistasPublicos: 1420, dentistasPrivados: 14380, dentistaPorHabitante: 889,  municipios: 62,  estabelecimentos: 10200 },
  { estado: "Osaka (大阪)",        uf: "OS",  regiao: "Kinki/Kansai",   populacao: 8794000,  totalDentistas: 9600,  dentistasPublicos: 860,  dentistasPrivados: 8740,  dentistaPorHabitante: 916,  municipios: 43,  estabelecimentos: 6200  },
  { estado: "Kanagawa (神奈川)",   uf: "KN",  regiao: "Kanto",          populacao: 9237000,  totalDentistas: 8200,  dentistasPublicos: 740,  dentistasPrivados: 7460,  dentistaPorHabitante: 1126, municipios: 33,  estabelecimentos: 5300  },
  { estado: "Aichi (愛知)",        uf: "AI",  regiao: "Chubu",          populacao: 7483000,  totalDentistas: 6500,  dentistasPublicos: 580,  dentistasPrivados: 5920,  dentistaPorHabitante: 1151, municipios: 54,  estabelecimentos: 4200  },
  { estado: "Hyogo (兵庫)",        uf: "HY",  regiao: "Kinki/Kansai",   populacao: 5502000,  totalDentistas: 5500,  dentistasPublicos: 490,  dentistasPrivados: 5010,  dentistaPorHabitante: 1000, municipios: 41,  estabelecimentos: 3600  },
  { estado: "Fukuoka (福岡)",      uf: "FK",  regiao: "Kyushu/Okinawa", populacao: 5098000,  totalDentistas: 5200,  dentistasPublicos: 470,  dentistasPrivados: 4730,  dentistaPorHabitante: 981,  municipios: 60,  estabelecimentos: 3400  },
  { estado: "Saitama (埼玉)",      uf: "ST",  regiao: "Kanto",          populacao: 7344000,  totalDentistas: 4700,  dentistasPublicos: 420,  dentistasPrivados: 4280,  dentistaPorHabitante: 1563, municipios: 63,  estabelecimentos: 3000  },
  { estado: "Chiba (千葉)",        uf: "CH",  regiao: "Kanto",          populacao: 6310000,  totalDentistas: 4200,  dentistasPublicos: 380,  dentistasPrivados: 3820,  dentistaPorHabitante: 1502, municipios: 54,  estabelecimentos: 2700  },
  { estado: "Hokkaido (北海道)",   uf: "HK",  regiao: "Tohoku/Hokkaido",populacao: 5199000,  totalDentistas: 4900,  dentistasPublicos: 440,  dentistasPrivados: 4460,  dentistaPorHabitante: 1061, municipios: 179, estabelecimentos: 3200  },
  { estado: "Kyoto (京都)",        uf: "KY",  regiao: "Kinki/Kansai",   populacao: 2601000,  totalDentistas: 3000,  dentistasPublicos: 270,  dentistasPrivados: 2730,  dentistaPorHabitante: 867,  municipios: 26,  estabelecimentos: 1900  },
  { estado: "Hiroshima (広島)",    uf: "HS",  regiao: "Chugoku/Shikoku",populacao: 2800000,  totalDentistas: 2200,  dentistasPublicos: 200,  dentistasPrivados: 2000,  dentistaPorHabitante: 1273, municipios: 23,  estabelecimentos: 1400  },
  { estado: "Shizuoka (静岡)",     uf: "SZ",  regiao: "Chubu",          populacao: 3600000,  totalDentistas: 2700,  dentistasPublicos: 240,  dentistasPrivados: 2460,  dentistaPorHabitante: 1333, municipios: 35,  estabelecimentos: 1700  },
  { estado: "Miyagi (宮城)",       uf: "MY",  regiao: "Tohoku/Hokkaido",populacao: 2301000,  totalDentistas: 1800,  dentistasPublicos: 160,  dentistasPrivados: 1640,  dentistaPorHabitante: 1279, municipios: 35,  estabelecimentos: 1200  },
  { estado: "Niigata (新潟)",      uf: "NG",  regiao: "Chubu",          populacao: 2201000,  totalDentistas: 1800,  dentistasPublicos: 160,  dentistasPrivados: 1640,  dentistaPorHabitante: 1223, municipios: 30,  estabelecimentos: 1150  },
  { estado: "Ibaraki (茨城)",      uf: "IB",  regiao: "Kanto",          populacao: 2900000,  totalDentistas: 1800,  dentistasPublicos: 160,  dentistasPrivados: 1640,  dentistaPorHabitante: 1611, municipios: 44,  estabelecimentos: 1150  },
  { estado: "Okayama (岡山)",      uf: "OK",  regiao: "Chugoku/Shikoku",populacao: 1900000,  totalDentistas: 1700,  dentistasPublicos: 150,  dentistasPrivados: 1550,  dentistaPorHabitante: 1118, municipios: 27,  estabelecimentos: 1100  },
  { estado: "Kumamoto (熊本)",     uf: "KM",  regiao: "Kyushu/Okinawa", populacao: 1800000,  totalDentistas: 1600,  dentistasPublicos: 140,  dentistasPrivados: 1460,  dentistaPorHabitante: 1125, municipios: 45,  estabelecimentos: 1050  },
  { estado: "Nagano (長野)",       uf: "NA",  regiao: "Chubu",          populacao: 2000000,  totalDentistas: 1600,  dentistasPublicos: 140,  dentistasPrivados: 1460,  dentistaPorHabitante: 1250, municipios: 77,  estabelecimentos: 1000  },
  { estado: "Gunma (群馬)",        uf: "GU",  regiao: "Kanto",          populacao: 1900000,  totalDentistas: 1200,  dentistasPublicos: 110,  dentistasPrivados: 1090,  dentistaPorHabitante: 1583, municipios: 35,  estabelecimentos: 780   },
  { estado: "Tochigi (栃木)",      uf: "TO",  regiao: "Kanto",          populacao: 1900000,  totalDentistas: 1200,  dentistasPublicos: 110,  dentistasPrivados: 1090,  dentistaPorHabitante: 1583, municipios: 25,  estabelecimentos: 780   },
  { estado: "Nagasaki (長崎)",     uf: "NL",  regiao: "Kyushu/Okinawa", populacao: 1300000,  totalDentistas: 1000,  dentistasPublicos: 90,   dentistasPrivados: 910,   dentistaPorHabitante: 1300, municipios: 21,  estabelecimentos: 650   },
  { estado: "Kagoshima (鹿児島)",  uf: "KG",  regiao: "Kyushu/Okinawa", populacao: 1600000,  totalDentistas: 1200,  dentistasPublicos: 110,  dentistasPrivados: 1090,  dentistaPorHabitante: 1333, municipios: 43,  estabelecimentos: 780   },
  { estado: "Okinawa (沖縄)",      uf: "OR",  regiao: "Kyushu/Okinawa", populacao: 1468000,  totalDentistas: 1200,  dentistasPublicos: 110,  dentistasPrivados: 1090,  dentistaPorHabitante: 1223, municipios: 41,  estabelecimentos: 780   },
  { estado: "Ehime (愛媛)",        uf: "EH",  regiao: "Chugoku/Shikoku",populacao: 1300000,  totalDentistas: 1100,  dentistasPublicos: 100,  dentistasPrivados: 1000,  dentistaPorHabitante: 1182, municipios: 20,  estabelecimentos: 710   },
  { estado: "Ishikawa (石川)",     uf: "IK",  regiao: "Chubu",          populacao: 1100000,  totalDentistas: 1000,  dentistasPublicos: 90,   dentistasPrivados: 910,   dentistaPorHabitante: 1100, municipios: 19,  estabelecimentos: 650   },
  { estado: "Shiga (滋賀)",        uf: "SG",  regiao: "Kinki/Kansai",   populacao: 1400000,  totalDentistas: 1000,  dentistasPublicos: 90,   dentistasPrivados: 910,   dentistaPorHabitante: 1400, municipios: 19,  estabelecimentos: 650   },
  { estado: "Nara (奈良)",         uf: "NR",  regiao: "Kinki/Kansai",   populacao: 1300000,  totalDentistas: 1000,  dentistasPublicos: 90,   dentistasPrivados: 910,   dentistaPorHabitante: 1300, municipios: 39,  estabelecimentos: 650   },
  { estado: "Mie (三重)",          uf: "MI",  regiao: "Chubu",          populacao: 1800000,  totalDentistas: 1200,  dentistasPublicos: 110,  dentistasPrivados: 1090,  dentistaPorHabitante: 1500, municipios: 29,  estabelecimentos: 780   },
  { estado: "Fukushima (福島)",    uf: "FS",  regiao: "Tohoku/Hokkaido",populacao: 1800000,  totalDentistas: 1200,  dentistasPublicos: 110,  dentistasPrivados: 1090,  dentistaPorHabitante: 1500, municipios: 59,  estabelecimentos: 780   },
  { estado: "Oita (大分)",         uf: "OT",  regiao: "Kyushu/Okinawa", populacao: 1100000,  totalDentistas: 900,   dentistasPublicos: 80,   dentistasPrivados: 820,   dentistaPorHabitante: 1222, municipios: 18,  estabelecimentos: 580   },
  { estado: "Miyazaki (宮崎)",     uf: "MZ",  regiao: "Kyushu/Okinawa", populacao: 1100000,  totalDentistas: 900,   dentistasPublicos: 80,   dentistasPrivados: 820,   dentistaPorHabitante: 1222, municipios: 26,  estabelecimentos: 580   },
  { estado: "Yamaguchi (山口)",    uf: "YG",  regiao: "Chugoku/Shikoku",populacao: 1300000,  totalDentistas: 900,   dentistasPublicos: 80,   dentistasPrivados: 820,   dentistaPorHabitante: 1444, municipios: 19,  estabelecimentos: 580   },
  { estado: "Kagawa (香川)",       uf: "KW",  regiao: "Chugoku/Shikoku",populacao: 960000,   totalDentistas: 900,   dentistasPublicos: 80,   dentistasPrivados: 820,   dentistaPorHabitante: 1067, municipios: 17,  estabelecimentos: 580   },
  { estado: "Yamagata (山形)",     uf: "YM",  regiao: "Tohoku/Hokkaido",populacao: 1100000,  totalDentistas: 800,   dentistasPublicos: 70,   dentistasPrivados: 730,   dentistaPorHabitante: 1375, municipios: 35,  estabelecimentos: 520   },
  { estado: "Iwate (岩手)",        uf: "IW",  regiao: "Tohoku/Hokkaido",populacao: 1200000,  totalDentistas: 800,   dentistasPublicos: 70,   dentistasPrivados: 730,   dentistaPorHabitante: 1500, municipios: 33,  estabelecimentos: 520   },
  { estado: "Aomori (青森)",       uf: "AO",  regiao: "Tohoku/Hokkaido",populacao: 1200000,  totalDentistas: 800,   dentistasPublicos: 70,   dentistasPrivados: 730,   dentistaPorHabitante: 1500, municipios: 40,  estabelecimentos: 520   },
  { estado: "Akita (秋田)",        uf: "AK",  regiao: "Tohoku/Hokkaido",populacao: 960000,   totalDentistas: 700,   dentistasPublicos: 60,   dentistasPrivados: 640,   dentistaPorHabitante: 1371, municipios: 25,  estabelecimentos: 450   },
  { estado: "Toyama (富山)",       uf: "TY",  regiao: "Chubu",          populacao: 1000000,  totalDentistas: 800,   dentistasPublicos: 70,   dentistasPrivados: 730,   dentistaPorHabitante: 1250, municipios: 15,  estabelecimentos: 520   },
  { estado: "Saga (佐賀)",         uf: "SA",  regiao: "Kyushu/Okinawa", populacao: 810000,   totalDentistas: 800,   dentistasPublicos: 70,   dentistasPrivados: 730,   dentistaPorHabitante: 1013, municipios: 20,  estabelecimentos: 520   },
  { estado: "Yamanashi (山梨)",    uf: "YN",  regiao: "Chubu",          populacao: 810000,   totalDentistas: 700,   dentistasPublicos: 60,   dentistasPrivados: 640,   dentistaPorHabitante: 1157, municipios: 27,  estabelecimentos: 450   },
  { estado: "Fukui (福井)",        uf: "FU",  regiao: "Chubu",          populacao: 770000,   totalDentistas: 700,   dentistasPublicos: 60,   dentistasPrivados: 640,   dentistaPorHabitante: 1100, municipios: 17,  estabelecimentos: 450   },
  { estado: "Wakayama (和歌山)",   uf: "WK",  regiao: "Kinki/Kansai",   populacao: 920000,   totalDentistas: 700,   dentistasPublicos: 60,   dentistasPrivados: 640,   dentistaPorHabitante: 1314, municipios: 30,  estabelecimentos: 450   },
  { estado: "Tokushima (徳島)",    uf: "TK2", regiao: "Chugoku/Shikoku",populacao: 730000,   totalDentistas: 700,   dentistasPublicos: 60,   dentistasPrivados: 640,   dentistaPorHabitante: 1043, municipios: 24,  estabelecimentos: 450   },
  { estado: "Kochi (高知)",        uf: "KC",  regiao: "Chugoku/Shikoku",populacao: 700000,   totalDentistas: 700,   dentistasPublicos: 60,   dentistasPrivados: 640,   dentistaPorHabitante: 1000, municipios: 34,  estabelecimentos: 450   },
  { estado: "Shimane (島根)",      uf: "SM",  regiao: "Chugoku/Shikoku",populacao: 670000,   totalDentistas: 600,   dentistasPublicos: 50,   dentistasPrivados: 550,   dentistaPorHabitante: 1117, municipios: 19,  estabelecimentos: 390   },
  { estado: "Tottori (鳥取)",      uf: "TR",  regiao: "Chugoku/Shikoku",populacao: 550000,   totalDentistas: 450,   dentistasPublicos: 40,   dentistasPrivados: 410,   dentistaPorHabitante: 1222, municipios: 19,  estabelecimentos: 290   },
];

// ─── DATA BY REGION (6 traditional macro-regions) ────────────────────────────
export const dadosPorRegiaoJP = [
  { regiao: "Kanto",          estados: 7,  populacao: 43591000, totalDentistas: 37100, dentistasPublicos: 3330, dentistasPrivados: 33770, dentistaPorHabitante: 1175, cor: "#3B82F6" },
  { regiao: "Kinki/Kansai",   estados: 7,  populacao: 22217000, totalDentistas: 21800, dentistasPublicos: 1960, dentistasPrivados: 19840, dentistaPorHabitante: 1019, cor: "#10B981" },
  { regiao: "Chubu",          estados: 9,  populacao: 21464000, totalDentistas: 17000, dentistasPublicos: 1530, dentistasPrivados: 15470, dentistaPorHabitante: 1263, cor: "#F59E0B" },
  { regiao: "Tohoku/Hokkaido",estados: 7,  populacao: 13760000, totalDentistas: 11000, dentistasPublicos: 980,  dentistasPrivados: 10020, dentistaPorHabitante: 1251, cor: "#8B5CF6" },
  { regiao: "Kyushu/Okinawa", estados: 8,  populacao: 14276000, totalDentistas: 12800, dentistasPublicos: 1150, dentistasPrivados: 11650, dentistaPorHabitante: 1116, cor: "#EF4444" },
  { regiao: "Chugoku/Shikoku",estados: 9,  populacao: 10110000, totalDentistas: 9300,  dentistasPublicos: 820,  dentistasPrivados: 8480,  dentistaPorHabitante: 1087, cor: "#06B6D4" },
];

// ─── HISTORICAL SERIES (MHLW Dentist Survey 2015-2022, biennial) ─────────────
export const serieHistoricaJP = [
  { ano: 2015, total: 101576, novosRegistros: 2100, cancelamentos: 2200 },
  { ano: 2016, total: 102551, novosRegistros: 2200, cancelamentos: 2100 },
  { ano: 2017, total: 103972, novosRegistros: 2400, cancelamentos: 2100 },
  { ano: 2018, total: 104533, novosRegistros: 2200, cancelamentos: 2100 },
  { ano: 2019, total: 105602, novosRegistros: 2300, cancelamentos: 2100 },
  { ano: 2020, total: 104941, novosRegistros: 1200, cancelamentos: 2200 },
  { ano: 2021, total: 105156, novosRegistros: 2200, cancelamentos: 2100 },
  { ano: 2022, total: 107000, novosRegistros: 3200, cancelamentos: 2100 },
  { ano: 2023, total: 107400, novosRegistros: 2200, cancelamentos: 2100 },
  { ano: 2024, total: 107800, novosRegistros: 2200, cancelamentos: 2100 },
  { ano: 2025, total: 107900, novosRegistros: 2200, cancelamentos: 2100 },
];

// ─── GENERAL INDICATORS ───────────────────────────────────────────────────────
export const indicadoresGeraisJP = {
  totalDentistas: 107000,
  dentistasAtivos: 102000,
  dentistasPublicos: 9600,        // hospital-employed dentists + university clinics
  dentistasPrivados: 97400,       // private dental clinics (歯科診療所)
  totalEspecialistas: 28800,      // JDA/JDSB certified specialists
  totalGeneralistas: 78200,
  mediaHabitantesBrasil: 1179,    // inhabitants per dentist (MHLW 2022)
  recomendacaoOMS: 1500,
  totalEstabelecimentos: 68200,   // 歯科診療所 (dental clinics) — highest per capita globally
  totalMunicipiosComCobertura: 1700,
  totalMunicipios: 1724,
  faculdadesOdontologia: 29,      // MEXT-accredited dental faculties
  vagasAnuais: 3200,              // annual dental graduates
  crescimentoUltimoAno: 0.4,      // near saturation — lowest growth among OECD
};

export const CORES_REGIOES_JP: Record<string, string> = {
  "Kanto":          "#3B82F6",
  "Kinki/Kansai":   "#10B981",
  "Chubu":          "#F59E0B",
  "Tohoku/Hokkaido": "#8B5CF6",
  "Kyushu/Okinawa": "#EF4444",
  "Chugoku/Shikoku": "#06B6D4",
};

// ─── ESTABLISHMENT TYPES (MHLW Medical Facility Survey 2023) ─────────────────
export const dadosEstabelecimentosJP = [
  { tipo: "歯科診療所 Private Dental Clinic (solo/small)", total: 58400, publico: 0,    privado: 58400, dentistasVinculados: 72000, mediaDentistasPorEstab: 1.23, porcentagem: 85.6 },
  { tipo: "医療法人 Medical Corporation (group/chain)",    total: 7200,  publico: 0,    privado: 7200,  dentistasVinculados: 18000, mediaDentistasPorEstab: 2.50, porcentagem: 10.6 },
  { tipo: "病院歯科 Hospital Dental Dept.",                total: 1800,  publico: 1080, privado: 720,   dentistasVinculados: 5400,  mediaDentistasPorEstab: 3.00, porcentagem: 2.6  },
  { tipo: "大学歯学部附属病院 Dental School Hospital",     total: 29,    publico: 29,   privado: 0,     dentistasVinculados: 5800,  mediaDentistasPorEstab: 200,  porcentagem: 0.04 },
  { tipo: "保健所 Public Health Centre (Dental)",          total: 470,   publico: 470,  privado: 0,     dentistasVinculados: 940,   mediaDentistasPorEstab: 2.00, porcentagem: 0.7  },
  { tipo: "介護施設 Long-term Care Facility (Dental)",     total: 300,   publico: 150,  privado: 150,   dentistasVinculados: 450,   mediaDentistasPorEstab: 1.50, porcentagem: 0.4  },
];

// ─── EPIDEMIOLOGY (MHLW Dental Disease Survey 歯科疾患実態調査 2016/2022) ─────
export const epidemiologiaJP = {
  indicadores: {
    cpodAdultos35_44: 10.4,
    cpodIdosos65_74: 16.8,
    cariesPrevalencia: 99.0,
    cariesNaoTratadas: 8.0,
    periodontiteAdultos: 55.0,
    edentulismo65mais: 8.5,       // one of the lowest in the world
    nuncaFoiDentista: 8.0,
    fonteAnno: "MHLW 歯科疾患実態調査 2016 + 2022",
  },
  doencasBucais: [
    { doenca: "Dental Caries (ever)",     adultos: 99.0, criancas: 70.0, tendencia: "decreasing" },
    { doenca: "Untreated Caries",         adultos: 8.0,  criancas: 5.0,  tendencia: "decreasing" },
    { doenca: "Periodontal Disease",      adultos: 55.0, criancas: 0.0,  tendencia: "stable" },
    { doenca: "Severe Periodontitis",     adultos: 18.0, criancas: 0.0,  tendencia: "decreasing" },
    { doenca: "Edentulism (65+)",         adultos: 8.5,  criancas: 0.0,  tendencia: "decreasing" },
    { doenca: "Oral Cancer (100k/year)",  adultos: 4.8,  criancas: 0.0,  tendencia: "stable" },
  ],
  prevalenciaPorRegiao: [
    { regiao: "Kanto",          cpod: 10.2, cariesNaoTratadas: 7.5,  periodontite: 53.0, edentulismo: 7.5 },
    { regiao: "Kinki/Kansai",   cpod: 10.1, cariesNaoTratadas: 7.2,  periodontite: 52.0, edentulismo: 7.2 },
    { regiao: "Chubu",          cpod: 10.4, cariesNaoTratadas: 8.0,  periodontite: 55.0, edentulismo: 8.5 },
    { regiao: "Tohoku/Hokkaido",cpod: 11.2, cariesNaoTratadas: 9.5,  periodontite: 60.0, edentulismo: 10.8 },
    { regiao: "Kyushu/Okinawa", cpod: 10.6, cariesNaoTratadas: 8.5,  periodontite: 57.0, edentulismo: 9.2 },
    { regiao: "Chugoku/Shikoku",cpod: 10.8, cariesNaoTratadas: 8.8,  periodontite: 58.0, edentulismo: 9.8 },
  ],
  tendencias: [
    { ano: 1993, cpod12anos: 4.6, edentulismo: 25.0, cariesNaoTratadas: 22.0 },
    { ano: 1999, cpod12anos: 3.1, edentulismo: 20.0, cariesNaoTratadas: 16.0 },
    { ano: 2005, cpod12anos: 1.7, edentulismo: 14.0, cariesNaoTratadas: 10.0 },
    { ano: 2011, cpod12anos: 1.0, edentulismo: 10.0, cariesNaoTratadas: 8.5 },
    { ano: 2022, cpod12anos: 0.7, edentulismo: 8.5,  cariesNaoTratadas: 8.0 },
  ],
};
