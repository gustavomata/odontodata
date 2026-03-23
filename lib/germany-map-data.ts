// ============================================================
// OdontoData — Germany dental map data
// Sources: BZÄK Jahrbuch 2022/2023, Destatis, RKI GEDA 2021
// ============================================================

export interface BundeslandDental {
  code: string;           // BY, NW, BW, etc.
  bundesland: string;     // full name
  regiao: string;         // Nord | West | Süd | Ost | Mitte
  populacao: number;
  totalDentistas: number;
  dentistaPorHabitante: number;   // Einwohner je Zahnarzt (higher = more opportunity)
  estabelecimentos: number;       // Praxen
  dentistasGKV: number;           // publicly insured patients served
  dentistasPrivat: number;        // PKV-only
  municipios: number;             // Gemeinden
  cadcam_pct: number;
}

export const bundeslaenderDental: BundeslandDental[] = [
  { code: "NW", bundesland: "Nordrhein-Westfalen",   regiao: "West",  populacao: 18000000, totalDentistas: 16200, dentistaPorHabitante: 1111, estabelecimentos: 10800, dentistasGKV: 13600, dentistasPrivat: 2600, municipios: 396,  cadcam_pct: 82 },
  { code: "BY", bundesland: "Bayern",                regiao: "Süd",   populacao: 13100000, totalDentistas: 13400, dentistaPorHabitante: 978,  estabelecimentos: 8900,  dentistasGKV: 10800, dentistasPrivat: 2600, municipios: 2056, cadcam_pct: 88 },
  { code: "BW", bundesland: "Baden-Württemberg",     regiao: "Süd",   populacao: 11100000, totalDentistas: 10500, dentistaPorHabitante: 1057, estabelecimentos: 7000,  dentistasGKV: 8600,  dentistasPrivat: 1900, municipios: 1101, cadcam_pct: 90 },
  { code: "NI", bundesland: "Niedersachsen",         regiao: "Nord",  populacao: 8000000,  totalDentistas: 7200,  dentistaPorHabitante: 1111, estabelecimentos: 4800,  dentistasGKV: 6000,  dentistasPrivat: 1200, municipios: 442,  cadcam_pct: 80 },
  { code: "HE", bundesland: "Hessen",                regiao: "Mitte", populacao: 6300000,  totalDentistas: 6100,  dentistaPorHabitante: 1033, estabelecimentos: 4100,  dentistasGKV: 5000,  dentistasPrivat: 1100, municipios: 426,  cadcam_pct: 84 },
  { code: "SN", bundesland: "Sachsen",               regiao: "Ost",   populacao: 4100000,  totalDentistas: 3700,  dentistaPorHabitante: 1108, estabelecimentos: 2500,  dentistasGKV: 3400,  dentistasPrivat: 300,  municipios: 419,  cadcam_pct: 76 },
  { code: "RP", bundesland: "Rheinland-Pfalz",       regiao: "West",  populacao: 4100000,  totalDentistas: 3800,  dentistaPorHabitante: 1079, estabelecimentos: 2500,  dentistasGKV: 3200,  dentistasPrivat: 600,  municipios: 2305, cadcam_pct: 81 },
  { code: "BE", bundesland: "Berlin",                regiao: "Ost",   populacao: 3670000,  totalDentistas: 4200,  dentistaPorHabitante: 874,  estabelecimentos: 2800,  dentistasGKV: 3300,  dentistasPrivat: 900,  municipios: 1,    cadcam_pct: 86 },
  { code: "BB", bundesland: "Brandenburg",           regiao: "Ost",   populacao: 2500000,  totalDentistas: 2100,  dentistaPorHabitante: 1190, estabelecimentos: 1400,  dentistasGKV: 1900,  dentistasPrivat: 200,  municipios: 418,  cadcam_pct: 74 },
  { code: "SH", bundesland: "Schleswig-Holstein",    regiao: "Nord",  populacao: 2900000,  totalDentistas: 2600,  dentistaPorHabitante: 1115, estabelecimentos: 1700,  dentistasGKV: 2200,  dentistasPrivat: 400,  municipios: 1106, cadcam_pct: 79 },
  { code: "ST", bundesland: "Sachsen-Anhalt",        regiao: "Ost",   populacao: 2200000,  totalDentistas: 2000,  dentistaPorHabitante: 1100, estabelecimentos: 1350,  dentistasGKV: 1800,  dentistasPrivat: 200,  municipios: 218,  cadcam_pct: 73 },
  { code: "TH", bundesland: "Thüringen",             regiao: "Ost",   populacao: 2100000,  totalDentistas: 1900,  dentistaPorHabitante: 1105, estabelecimentos: 1280,  dentistasGKV: 1700,  dentistasPrivat: 200,  municipios: 849,  cadcam_pct: 74 },
  { code: "HH", bundesland: "Hamburg",               regiao: "Nord",  populacao: 1840000,  totalDentistas: 2100,  dentistaPorHabitante: 876,  estabelecimentos: 1400,  dentistasGKV: 1600,  dentistasPrivat: 500,  municipios: 1,    cadcam_pct: 85 },
  { code: "MV", bundesland: "Mecklenburg-Vorpommern",regiao: "Nord",  populacao: 1630000,  totalDentistas: 1400,  dentistaPorHabitante: 1164, estabelecimentos: 940,   dentistasGKV: 1280,  dentistasPrivat: 120,  municipios: 726,  cadcam_pct: 72 },
  { code: "SL", bundesland: "Saarland",              regiao: "West",  populacao: 1000000,  totalDentistas: 980,   dentistaPorHabitante: 1020, estabelecimentos: 650,   dentistasGKV: 840,   dentistasPrivat: 140,  municipios: 52,   cadcam_pct: 78 },
  { code: "HB", bundesland: "Bremen",                regiao: "Nord",  populacao: 680000,   totalDentistas: 800,   dentistaPorHabitante: 850,  estabelecimentos: 530,   dentistasGKV: 640,   dentistasPrivat: 160,  municipios: 2,    cadcam_pct: 83 },
];

export const bundeslandByCode = Object.fromEntries(
  bundeslaenderDental.map((b) => [b.code, b])
) as Record<string, BundeslandDental>;

// Major German cities with dental density data
export interface StadtGeoDE {
  cidade: string;
  uf: string;        // Bundesland code
  bundesland: string;
  regiao: string;
  lat: number;
  lng: number;
  populacao: number;
  dentistas: number;
  dentistas_por_hab: number;
  score_oportunidade: number;  // 0-100 (100 = most opportunity = most underserved)
  classificacao: string;       // "Saturado" | "Adequado" | "Carente" | "Oportunidade"
  cadcam_pct: number;
}

function calcScore(habPerDent: number): number {
  // Germany scale: national avg ~1,075. Higher = more opportunity
  // < 700 → score ~10 (saturated); > 1,400 → score ~90 (opportunity)
  return Math.round(Math.max(5, Math.min(95, ((habPerDent - 400) / 1200) * 90)));
}

function classif(habPerDent: number): string {
  if (habPerDent < 700)  return "Saturado";
  if (habPerDent < 950)  return "Adequado";
  if (habPerDent < 1200) return "Normal";
  return "Oportunidade";
}

const rawCidades = [
  { cidade: "Berlin",         uf: "BE", bundesland: "Berlin",                 regiao: "Ost",   lat: 52.52,  lng: 13.40,  pop: 3670000, dent: 4200,  cadcam: 86 },
  { cidade: "Hamburg",        uf: "HH", bundesland: "Hamburg",                regiao: "Nord",  lat: 53.55,  lng: 10.00,  pop: 1840000, dent: 2100,  cadcam: 85 },
  { cidade: "München",        uf: "BY", bundesland: "Bayern",                 regiao: "Süd",   lat: 48.14,  lng: 11.58,  pop: 1490000, dent: 1700,  cadcam: 88 },
  { cidade: "Köln",           uf: "NW", bundesland: "Nordrhein-Westfalen",    regiao: "West",  lat: 50.94,  lng: 6.96,   pop: 1080000, dent: 1150,  cadcam: 83 },
  { cidade: "Frankfurt",      uf: "HE", bundesland: "Hessen",                 regiao: "Mitte", lat: 50.11,  lng: 8.68,   pop: 760000,  dent: 1100,  cadcam: 87 },
  { cidade: "Stuttgart",      uf: "BW", bundesland: "Baden-Württemberg",      regiao: "Süd",   lat: 48.78,  lng: 9.18,   pop: 628000,  dent: 680,   cadcam: 90 },
  { cidade: "Düsseldorf",     uf: "NW", bundesland: "Nordrhein-Westfalen",    regiao: "West",  lat: 51.23,  lng: 6.79,   pop: 619000,  dent: 780,   cadcam: 84 },
  { cidade: "Leipzig",        uf: "SN", bundesland: "Sachsen",                regiao: "Ost",   lat: 51.34,  lng: 12.37,  pop: 587000,  dent: 580,   cadcam: 77 },
  { cidade: "Dortmund",       uf: "NW", bundesland: "Nordrhein-Westfalen",    regiao: "West",  lat: 51.51,  lng: 7.46,   pop: 588000,  dent: 580,   cadcam: 80 },
  { cidade: "Essen",          uf: "NW", bundesland: "Nordrhein-Westfalen",    regiao: "West",  lat: 51.46,  lng: 7.01,   pop: 579000,  dent: 570,   cadcam: 79 },
  { cidade: "Bremen",         uf: "HB", bundesland: "Bremen",                 regiao: "Nord",  lat: 53.08,  lng: 8.80,   pop: 566000,  dent: 650,   cadcam: 83 },
  { cidade: "Dresden",        uf: "SN", bundesland: "Sachsen",                regiao: "Ost",   lat: 51.05,  lng: 13.74,  pop: 554000,  dent: 550,   cadcam: 76 },
  { cidade: "Hannover",       uf: "NI", bundesland: "Niedersachsen",          regiao: "Nord",  lat: 52.38,  lng: 9.73,   pop: 532000,  dent: 570,   cadcam: 80 },
  { cidade: "Nürnberg",       uf: "BY", bundesland: "Bayern",                 regiao: "Süd",   lat: 49.45,  lng: 11.09,  pop: 515000,  dent: 550,   cadcam: 87 },
  { cidade: "Duisburg",       uf: "NW", bundesland: "Nordrhein-Westfalen",    regiao: "West",  lat: 51.43,  lng: 6.76,   pop: 498000,  dent: 490,   cadcam: 78 },
  { cidade: "Bochum",         uf: "NW", bundesland: "Nordrhein-Westfalen",    regiao: "West",  lat: 51.48,  lng: 7.22,   pop: 364000,  dent: 360,   cadcam: 79 },
  { cidade: "Wuppertal",      uf: "NW", bundesland: "Nordrhein-Westfalen",    regiao: "West",  lat: 51.26,  lng: 7.15,   pop: 356000,  dent: 350,   cadcam: 78 },
  { cidade: "Bielefeld",      uf: "NW", bundesland: "Nordrhein-Westfalen",    regiao: "West",  lat: 52.02,  lng: 8.53,   pop: 334000,  dent: 360,   cadcam: 80 },
  { cidade: "Bonn",           uf: "NW", bundesland: "Nordrhein-Westfalen",    regiao: "West",  lat: 50.74,  lng: 7.10,   pop: 329000,  dent: 430,   cadcam: 85 },
  { cidade: "Münster",        uf: "NW", bundesland: "Nordrhein-Westfalen",    regiao: "West",  lat: 51.96,  lng: 7.63,   pop: 314000,  dent: 400,   cadcam: 82 },
  { cidade: "Mannheim",       uf: "BW", bundesland: "Baden-Württemberg",      regiao: "Süd",   lat: 49.49,  lng: 8.47,   pop: 309000,  dent: 380,   cadcam: 88 },
  { cidade: "Karlsruhe",      uf: "BW", bundesland: "Baden-Württemberg",      regiao: "Süd",   lat: 49.00,  lng: 8.40,   pop: 305000,  dent: 360,   cadcam: 89 },
  { cidade: "Augsburg",       uf: "BY", bundesland: "Bayern",                 regiao: "Süd",   lat: 48.37,  lng: 10.90,  pop: 294000,  dent: 320,   cadcam: 86 },
  { cidade: "Wiesbaden",      uf: "HE", bundesland: "Hessen",                 regiao: "Mitte", lat: 50.08,  lng: 8.24,   pop: 278000,  dent: 370,   cadcam: 86 },
  { cidade: "Gelsenkirchen",  uf: "NW", bundesland: "Nordrhein-Westfalen",    regiao: "West",  lat: 51.52,  lng: 7.09,   pop: 259000,  dent: 240,   cadcam: 76 },
  { cidade: "Mönchengladbach",uf: "NW", bundesland: "Nordrhein-Westfalen",    regiao: "West",  lat: 51.20,  lng: 6.44,   pop: 261000,  dent: 250,   cadcam: 77 },
  { cidade: "Braunschweig",   uf: "NI", bundesland: "Niedersachsen",          regiao: "Nord",  lat: 52.27,  lng: 10.52,  pop: 248000,  dent: 260,   cadcam: 79 },
  { cidade: "Chemnitz",       uf: "SN", bundesland: "Sachsen",                regiao: "Ost",   lat: 50.83,  lng: 12.92,  pop: 247000,  dent: 240,   cadcam: 75 },
  { cidade: "Kiel",           uf: "SH", bundesland: "Schleswig-Holstein",     regiao: "Nord",  lat: 54.32,  lng: 10.14,  pop: 246000,  dent: 270,   cadcam: 79 },
  { cidade: "Halle",          uf: "ST", bundesland: "Sachsen-Anhalt",         regiao: "Ost",   lat: 51.48,  lng: 11.97,  pop: 238000,  dent: 240,   cadcam: 73 },
  { cidade: "Mainz",          uf: "RP", bundesland: "Rheinland-Pfalz",        regiao: "West",  lat: 49.99,  lng: 8.27,   pop: 218000,  dent: 290,   cadcam: 82 },
  { cidade: "Rostock",        uf: "MV", bundesland: "Mecklenburg-Vorpommern", regiao: "Nord",  lat: 54.09,  lng: 12.13,  pop: 209000,  dent: 200,   cadcam: 72 },
  { cidade: "Erfurt",         uf: "TH", bundesland: "Thüringen",              regiao: "Ost",   lat: 50.98,  lng: 11.03,  pop: 213000,  dent: 220,   cadcam: 74 },
  { cidade: "Freiburg",       uf: "BW", bundesland: "Baden-Württemberg",      regiao: "Süd",   lat: 47.99,  lng: 7.85,   pop: 228000,  dent: 300,   cadcam: 91 },
  { cidade: "Lübeck",         uf: "SH", bundesland: "Schleswig-Holstein",     regiao: "Nord",  lat: 53.87,  lng: 10.69,  pop: 215000,  dent: 210,   cadcam: 78 },
  { cidade: "Oberhausen",     uf: "NW", bundesland: "Nordrhein-Westfalen",    regiao: "West",  lat: 51.47,  lng: 6.85,   pop: 211000,  dent: 200,   cadcam: 77 },
  { cidade: "Heidelberg",     uf: "BW", bundesland: "Baden-Württemberg",      regiao: "Süd",   lat: 49.41,  lng: 8.71,   pop: 158000,  dent: 230,   cadcam: 92 },
  { cidade: "Potsdam",        uf: "BB", bundesland: "Brandenburg",            regiao: "Ost",   lat: 52.40,  lng: 13.06,  pop: 182000,  dent: 200,   cadcam: 75 },
  { cidade: "Regensburg",     uf: "BY", bundesland: "Bayern",                 regiao: "Süd",   lat: 49.02,  lng: 12.10,  pop: 153000,  dent: 190,   cadcam: 87 },
  { cidade: "Göttingen",      uf: "NI", bundesland: "Niedersachsen",          regiao: "Nord",  lat: 51.54,  lng: 9.92,   pop: 119000,  dent: 170,   cadcam: 82 },
  { cidade: "Würzburg",       uf: "BY", bundesland: "Bayern",                 regiao: "Süd",   lat: 49.79,  lng: 9.95,   pop: 127000,  dent: 175,   cadcam: 88 },
  { cidade: "Oldenburg",      uf: "NI", bundesland: "Niedersachsen",          regiao: "Nord",  lat: 53.14,  lng: 8.21,   pop: 168000,  dent: 180,   cadcam: 79 },
  { cidade: "Wolfsburg",      uf: "NI", bundesland: "Niedersachsen",          regiao: "Nord",  lat: 52.42,  lng: 10.79,  pop: 124000,  dent: 130,   cadcam: 78 },
  { cidade: "Magdeburg",      uf: "ST", bundesland: "Sachsen-Anhalt",         regiao: "Ost",   lat: 52.12,  lng: 11.63,  pop: 238000,  dent: 200,   cadcam: 73 },
  { cidade: "Jena",           uf: "TH", bundesland: "Thüringen",              regiao: "Ost",   lat: 50.93,  lng: 11.59,  pop: 112000,  dent: 175,   cadcam: 76 },
  { cidade: "Greifswald",     uf: "MV", bundesland: "Mecklenburg-Vorpommern", regiao: "Nord",  lat: 54.09,  lng: 13.39,  pop: 59000,   dent: 55,    cadcam: 70 },
  { cidade: "Saarbrücken",    uf: "SL", bundesland: "Saarland",               regiao: "West",  lat: 49.23,  lng: 7.00,   pop: 180000,  dent: 180,   cadcam: 78 },
  { cidade: "Ulm",            uf: "BW", bundesland: "Baden-Württemberg",      regiao: "Süd",   lat: 48.40,  lng: 9.99,   pop: 128000,  dent: 170,   cadcam: 90 },
  { cidade: "Trier",          uf: "RP", bundesland: "Rheinland-Pfalz",        regiao: "West",  lat: 49.75,  lng: 6.64,   pop: 111000,  dent: 160,   cadcam: 80 },
  { cidade: "Schwerin",       uf: "MV", bundesland: "Mecklenburg-Vorpommern", regiao: "Nord",  lat: 53.63,  lng: 11.42,  pop: 96000,   dent: 90,    cadcam: 71 },
];

export const cidadesGeoDE: StadtGeoDE[] = rawCidades.map((c) => {
  const habPerDent = Math.round(c.pop / c.dent);
  return {
    cidade: c.cidade,
    uf: c.uf,
    bundesland: c.bundesland,
    regiao: c.regiao,
    lat: c.lat,
    lng: c.lng,
    populacao: c.pop,
    dentistas: c.dent,
    dentistas_por_hab: habPerDent,
    score_oportunidade: calcScore(habPerDent),
    classificacao: classif(habPerDent),
    cadcam_pct: c.cadcam,
  };
});

export const CORES_REGIOES_DE: Record<string, string> = {
  "Nord":  "#3B82F6",
  "West":  "#10B981",
  "Süd":   "#F59E0B",
  "Ost":   "#EF4444",
  "Mitte": "#8B5CF6",
};

// Name → code lookup for the GeoJSON
export const DE_STATE_NAME_TO_CODE: Record<string, string> = {
  "Baden-Württemberg":      "BW",
  "Bayern":                 "BY",
  "Berlin":                 "BE",
  "Brandenburg":            "BB",
  "Bremen":                 "HB",
  "Hamburg":                "HH",
  "Hessen":                 "HE",
  "Mecklenburg-Vorpommern": "MV",
  "Niedersachsen":          "NI",
  "Nordrhein-Westfalen":    "NW",
  "Rheinland-Pfalz":        "RP",
  "Saarland":               "SL",
  "Sachsen":                "SN",
  "Sachsen-Anhalt":         "ST",
  "Schleswig-Holstein":     "SH",
  "Thüringen":              "TH",
};
