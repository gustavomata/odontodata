// ============================================================
// OdontoData — Configuração multi-país para o mapa interativo
// Suporta: Brasil (BR), Estados Unidos (US), Austrália (AU)
// ============================================================

export type PaisCode = "BR" | "US" | "AU" | "DE" | "UK" | "FR" | "CA" | "JP";

export interface EstadoGeoWorld {
  code: string;      // ex: "SP", "CA", "NSW"
  nome: string;      // ex: "São Paulo", "California", "New South Wales"
  regiao: string;    // ex: "Sudeste", "West", "Eastern"
  center: [number, number];  // [lat, lng]
  zoom: number;
}

export interface CountryConfig {
  pais: PaisCode;
  nome: string;
  bandeira: string;               // emoji de bandeira
  center: [number, number];       // centro inicial do mapa
  initialZoom: number;
  geojsonUrl: string;
  // Nome da propriedade no GeoJSON que contém o código do estado
  // Se null, usa nameToCode lookup abaixo
  geojsonCodeProp: string | null;
  // Nome da propriedade no GeoJSON que contém o nome do estado
  geojsonNameProp: string;
  // Lookup de nome → código (usado quando geojsonCodeProp é null)
  nameToCode?: Record<string, string>;
  regioes: string[];
  estados: EstadoGeoWorld[];
  atribuicao: string;
  // Labels para o painel lateral
  labels: {
    estado: string;          // "Estado", "State", "State/Territory"
    municipio: string;       // "Município", "County", "LGA"
    regiao: string;          // "Região", "Region", "Region"
    dentistas: string;       // "Dentistas", "Dentists", "Dentists"
    populacao: string;       // "Habitantes", "Residents", "Residents"
    habPorDentista: string;  // "Hab/Dentista", "People/Dentist"
  };
}

// ─── BRASIL ──────────────────────────────────────────────────────────────────

const BR_ESTADOS: EstadoGeoWorld[] = [
  { code: "AC", nome: "Acre",               regiao: "Norte",        center: [-9.02,  -70.81], zoom: 7 },
  { code: "AL", nome: "Alagoas",            regiao: "Nordeste",     center: [-9.57,  -36.78], zoom: 8 },
  { code: "AP", nome: "Amapá",              regiao: "Norte",        center: [1.41,   -51.77], zoom: 7 },
  { code: "AM", nome: "Amazonas",           regiao: "Norte",        center: [-3.47,  -65.10], zoom: 6 },
  { code: "BA", nome: "Bahia",              regiao: "Nordeste",     center: [-12.96, -38.51], zoom: 7 },
  { code: "CE", nome: "Ceará",              regiao: "Nordeste",     center: [-5.20,  -39.53], zoom: 7 },
  { code: "DF", nome: "Distrito Federal",   regiao: "Centro-Oeste", center: [-15.78, -47.93], zoom: 10 },
  { code: "ES", nome: "Espírito Santo",     regiao: "Sudeste",      center: [-19.83, -40.49], zoom: 8 },
  { code: "GO", nome: "Goiás",              regiao: "Centro-Oeste", center: [-15.83, -49.84], zoom: 7 },
  { code: "MA", nome: "Maranhão",           regiao: "Nordeste",     center: [-5.42,  -45.44], zoom: 7 },
  { code: "MT", nome: "Mato Grosso",        regiao: "Centro-Oeste", center: [-12.64, -55.42], zoom: 6 },
  { code: "MS", nome: "Mato Grosso do Sul", regiao: "Centro-Oeste", center: [-20.51, -54.54], zoom: 7 },
  { code: "MG", nome: "Minas Gerais",       regiao: "Sudeste",      center: [-18.51, -44.55], zoom: 7 },
  { code: "PA", nome: "Pará",               regiao: "Norte",        center: [-3.79,  -52.48], zoom: 6 },
  { code: "PB", nome: "Paraíba",            regiao: "Nordeste",     center: [-7.28,  -36.72], zoom: 8 },
  { code: "PR", nome: "Paraná",             regiao: "Sul",          center: [-24.89, -51.55], zoom: 7 },
  { code: "PE", nome: "Pernambuco",         regiao: "Nordeste",     center: [-8.81,  -36.95], zoom: 8 },
  { code: "PI", nome: "Piauí",              regiao: "Nordeste",     center: [-7.72,  -42.73], zoom: 7 },
  { code: "RJ", nome: "Rio de Janeiro",     regiao: "Sudeste",      center: [-22.91, -43.17], zoom: 9 },
  { code: "RN", nome: "Rio Grande do Norte",regiao: "Nordeste",     center: [-5.81,  -36.59], zoom: 8 },
  { code: "RS", nome: "Rio Grande do Sul",  regiao: "Sul",          center: [-30.03, -51.22], zoom: 7 },
  { code: "RO", nome: "Rondônia",           regiao: "Norte",        center: [-10.83, -63.34], zoom: 7 },
  { code: "RR", nome: "Roraima",            regiao: "Norte",        center: [2.74,   -62.08], zoom: 7 },
  { code: "SC", nome: "Santa Catarina",     regiao: "Sul",          center: [-27.45, -50.95], zoom: 8 },
  { code: "SP", nome: "São Paulo",          regiao: "Sudeste",      center: [-23.55, -46.63], zoom: 8 },
  { code: "SE", nome: "Sergipe",            regiao: "Nordeste",     center: [-10.57, -37.38], zoom: 9 },
  { code: "TO", nome: "Tocantins",          regiao: "Norte",        center: [-10.25, -48.25], zoom: 7 },
];

// ─── ESTADOS UNIDOS ──────────────────────────────────────────────────────────

// Mapeamento de nome completo → código postal (para lookup no GeoJSON)
export const USA_STATE_NAME_TO_CODE: Record<string, string> = {
  "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR",
  "California": "CA", "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE",
  "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID",
  "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS",
  "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD",
  "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS",
  "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV",
  "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY",
  "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK",
  "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC",
  "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT",
  "Vermont": "VT", "Virginia": "VA", "Washington": "WA", "West Virginia": "WV",
  "Wisconsin": "WI", "Wyoming": "WY", "District of Columbia": "DC",
};

// Regiões do Census Bureau (equivalente às regiões brasileiras)
export const USA_STATE_REGION: Record<string, string> = {
  CT: "Northeast", ME: "Northeast", MA: "Northeast", NH: "Northeast",
  NJ: "Northeast", NY: "Northeast", PA: "Northeast", RI: "Northeast", VT: "Northeast",
  IL: "Midwest", IN: "Midwest", IA: "Midwest", KS: "Midwest",
  MI: "Midwest", MN: "Midwest", MO: "Midwest", NE: "Midwest",
  ND: "Midwest", OH: "Midwest", SD: "Midwest", WI: "Midwest",
  AL: "South", AR: "South", DE: "South", FL: "South", GA: "South",
  KY: "South", LA: "South", MD: "South", MS: "South", NC: "South",
  OK: "South", SC: "South", TN: "South", TX: "South", VA: "South",
  WV: "South", DC: "South",
  AK: "West", AZ: "West", CA: "West", CO: "West", HI: "West",
  ID: "West", MT: "West", NV: "West", NM: "West", OR: "West",
  UT: "West", WA: "West", WY: "West",
};

const US_ESTADOS: EstadoGeoWorld[] = [
  { code: "AL", nome: "Alabama",             regiao: "South",     center: [32.75,  -86.82], zoom: 7 },
  { code: "AK", nome: "Alaska",              regiao: "West",      center: [64.20,  -153.0], zoom: 5 },
  { code: "AZ", nome: "Arizona",             regiao: "West",      center: [34.30,  -111.9], zoom: 7 },
  { code: "AR", nome: "Arkansas",            regiao: "South",     center: [34.80,  -92.20], zoom: 7 },
  { code: "CA", nome: "California",          regiao: "West",      center: [36.78,  -119.4], zoom: 6 },
  { code: "CO", nome: "Colorado",            regiao: "West",      center: [39.55,  -105.8], zoom: 7 },
  { code: "CT", nome: "Connecticut",         regiao: "Northeast", center: [41.60,  -72.70], zoom: 9 },
  { code: "DE", nome: "Delaware",            regiao: "South",     center: [39.00,  -75.50], zoom: 9 },
  { code: "FL", nome: "Florida",             regiao: "South",     center: [27.77,  -81.69], zoom: 7 },
  { code: "GA", nome: "Georgia",             regiao: "South",     center: [32.17,  -82.90], zoom: 7 },
  { code: "HI", nome: "Hawaii",              regiao: "West",      center: [19.90,  -155.5], zoom: 7 },
  { code: "ID", nome: "Idaho",               regiao: "West",      center: [44.07,  -114.7], zoom: 7 },
  { code: "IL", nome: "Illinois",            regiao: "Midwest",   center: [40.63,  -89.40], zoom: 7 },
  { code: "IN", nome: "Indiana",             regiao: "Midwest",   center: [40.27,  -86.13], zoom: 7 },
  { code: "IA", nome: "Iowa",                regiao: "Midwest",   center: [42.00,  -93.21], zoom: 7 },
  { code: "KS", nome: "Kansas",              regiao: "Midwest",   center: [38.53,  -96.73], zoom: 7 },
  { code: "KY", nome: "Kentucky",            regiao: "South",     center: [37.67,  -84.87], zoom: 7 },
  { code: "LA", nome: "Louisiana",           regiao: "South",     center: [31.17,  -91.87], zoom: 7 },
  { code: "ME", nome: "Maine",               regiao: "Northeast", center: [44.69,  -69.38], zoom: 7 },
  { code: "MD", nome: "Maryland",            regiao: "South",     center: [39.06,  -76.80], zoom: 8 },
  { code: "MA", nome: "Massachusetts",       regiao: "Northeast", center: [42.23,  -71.53], zoom: 9 },
  { code: "MI", nome: "Michigan",            regiao: "Midwest",   center: [44.18,  -84.51], zoom: 7 },
  { code: "MN", nome: "Minnesota",           regiao: "Midwest",   center: [46.39,  -94.64], zoom: 7 },
  { code: "MS", nome: "Mississippi",         regiao: "South",     center: [32.35,  -89.40], zoom: 7 },
  { code: "MO", nome: "Missouri",            regiao: "Midwest",   center: [38.46,  -92.30], zoom: 7 },
  { code: "MT", nome: "Montana",             regiao: "West",      center: [46.88,  -110.4], zoom: 6 },
  { code: "NE", nome: "Nebraska",            regiao: "Midwest",   center: [41.49,  -99.90], zoom: 7 },
  { code: "NV", nome: "Nevada",              regiao: "West",      center: [38.80,  -116.4], zoom: 7 },
  { code: "NH", nome: "New Hampshire",       regiao: "Northeast", center: [43.45,  -71.56], zoom: 8 },
  { code: "NJ", nome: "New Jersey",          regiao: "Northeast", center: [40.06,  -74.41], zoom: 8 },
  { code: "NM", nome: "New Mexico",          regiao: "West",      center: [34.52,  -105.9], zoom: 7 },
  { code: "NY", nome: "New York",            regiao: "Northeast", center: [42.97,  -75.20], zoom: 7 },
  { code: "NC", nome: "North Carolina",      regiao: "South",     center: [35.63,  -79.80], zoom: 7 },
  { code: "ND", nome: "North Dakota",        regiao: "Midwest",   center: [47.53,  -99.78], zoom: 7 },
  { code: "OH", nome: "Ohio",                regiao: "Midwest",   center: [40.39,  -82.76], zoom: 7 },
  { code: "OK", nome: "Oklahoma",            regiao: "South",     center: [35.57,  -96.93], zoom: 7 },
  { code: "OR", nome: "Oregon",              regiao: "West",      center: [43.93,  -120.6], zoom: 7 },
  { code: "PA", nome: "Pennsylvania",        regiao: "Northeast", center: [40.59,  -77.21], zoom: 7 },
  { code: "RI", nome: "Rhode Island",        regiao: "Northeast", center: [41.68,  -71.51], zoom: 10 },
  { code: "SC", nome: "South Carolina",      regiao: "South",     center: [33.84,  -80.95], zoom: 8 },
  { code: "SD", nome: "South Dakota",        regiao: "Midwest",   center: [44.37,  -100.3], zoom: 7 },
  { code: "TN", nome: "Tennessee",           regiao: "South",     center: [35.86,  -86.35], zoom: 7 },
  { code: "TX", nome: "Texas",               regiao: "South",     center: [31.05,  -97.56], zoom: 6 },
  { code: "UT", nome: "Utah",                regiao: "West",      center: [39.32,  -111.1], zoom: 7 },
  { code: "VT", nome: "Vermont",             regiao: "Northeast", center: [44.05,  -72.71], zoom: 8 },
  { code: "VA", nome: "Virginia",            regiao: "South",     center: [37.77,  -78.17], zoom: 7 },
  { code: "WA", nome: "Washington",          regiao: "West",      center: [47.40,  -121.5], zoom: 7 },
  { code: "WV", nome: "West Virginia",       regiao: "South",     center: [38.49,  -80.95], zoom: 7 },
  { code: "WI", nome: "Wisconsin",           regiao: "Midwest",   center: [44.27,  -89.62], zoom: 7 },
  { code: "WY", nome: "Wyoming",             regiao: "West",      center: [43.08,  -107.3], zoom: 7 },
  { code: "DC", nome: "District of Columbia",regiao: "South",     center: [38.91,  -77.04], zoom: 12 },
];

// ─── AUSTRÁLIA ────────────────────────────────────────────────────────────────

export const AU_STATE_NAME_TO_CODE: Record<string, string> = {
  "New South Wales":              "NSW",
  "Victoria":                     "VIC",
  "Queensland":                   "QLD",
  "South Australia":              "SA",
  "Western Australia":            "WA",
  "Tasmania":                     "TAS",
  "Northern Territory":           "NT",
  "Australian Capital Territory": "ACT",
};

export const AU_STATE_REGION: Record<string, string> = {
  NSW: "Eastern", VIC: "Eastern", QLD: "Eastern", ACT: "Eastern", TAS: "Eastern",
  SA: "Southern",
  NT: "Northern",
  WA: "Western",
};

const AU_ESTADOS: EstadoGeoWorld[] = [
  { code: "NSW", nome: "New South Wales",              regiao: "Eastern",  center: [-33.87, 151.21], zoom: 6 },
  { code: "VIC", nome: "Victoria",                     regiao: "Eastern",  center: [-37.81, 144.96], zoom: 7 },
  { code: "QLD", nome: "Queensland",                   regiao: "Eastern",  center: [-27.47, 153.03], zoom: 6 },
  { code: "SA",  nome: "South Australia",              regiao: "Southern", center: [-34.93, 138.60], zoom: 7 },
  { code: "WA",  nome: "Western Australia",            regiao: "Western",  center: [-31.95, 115.86], zoom: 6 },
  { code: "TAS", nome: "Tasmania",                     regiao: "Eastern",  center: [-42.88, 147.32], zoom: 8 },
  { code: "NT",  nome: "Northern Territory",           regiao: "Northern", center: [-12.46, 130.84], zoom: 7 },
  { code: "ACT", nome: "Australian Capital Territory", regiao: "Eastern",  center: [-35.28, 149.13], zoom: 10 },
];

// ─── ALEMANHA ────────────────────────────────────────────────────────────────

export const DE_STATE_REGION: Record<string, string> = {
  HH: "Nord", HB: "Nord", SH: "Nord", NI: "Nord", MV: "Nord",
  NW: "West", RP: "West", SL: "West",
  BY: "Süd",  BW: "Süd",
  BE: "Ost",  BB: "Ost",  SN: "Ost",  ST: "Ost",  TH: "Ost",
  HE: "Mitte",
};

const DE_ESTADOS: EstadoGeoWorld[] = [
  { code: "NW", nome: "Nordrhein-Westfalen",    regiao: "West",  center: [51.43, 7.66],  zoom: 8 },
  { code: "BY", nome: "Bayern",                 regiao: "Süd",   center: [48.79, 11.50], zoom: 7 },
  { code: "BW", nome: "Baden-Württemberg",      regiao: "Süd",   center: [48.66,  9.35], zoom: 8 },
  { code: "NI", nome: "Niedersachsen",           regiao: "Nord",  center: [52.64,  9.84], zoom: 7 },
  { code: "HE", nome: "Hessen",                 regiao: "Mitte", center: [50.65,  9.16], zoom: 8 },
  { code: "SN", nome: "Sachsen",                regiao: "Ost",   center: [51.10, 13.20], zoom: 8 },
  { code: "RP", nome: "Rheinland-Pfalz",        regiao: "West",  center: [50.12,  7.31], zoom: 8 },
  { code: "BE", nome: "Berlin",                 regiao: "Ost",   center: [52.52, 13.40], zoom: 10 },
  { code: "BB", nome: "Brandenburg",            regiao: "Ost",   center: [52.41, 13.54], zoom: 8 },
  { code: "SH", nome: "Schleswig-Holstein",     regiao: "Nord",  center: [54.22,  9.88], zoom: 8 },
  { code: "ST", nome: "Sachsen-Anhalt",         regiao: "Ost",   center: [51.95, 11.69], zoom: 8 },
  { code: "TH", nome: "Thüringen",              regiao: "Ost",   center: [50.92, 11.39], zoom: 8 },
  { code: "HH", nome: "Hamburg",                regiao: "Nord",  center: [53.55, 10.00], zoom: 10 },
  { code: "MV", nome: "Mecklenburg-Vorpommern", regiao: "Nord",  center: [53.81, 12.46], zoom: 8 },
  { code: "SL", nome: "Saarland",               regiao: "West",  center: [49.40,  6.96], zoom: 9 },
  { code: "HB", nome: "Bremen",                 regiao: "Nord",  center: [53.08,  8.80], zoom: 11 },
];

// ─── CORES POR REGIÃO ─────────────────────────────────────────────────────────

export const CORES_REGIOES_WORLD: Record<PaisCode, Record<string, string>> = {
  BR: {
    "Norte":        "#EF4444",
    "Nordeste":     "#F59E0B",
    "Sudeste":      "#3B82F6",
    "Sul":          "#10B981",
    "Centro-Oeste": "#8B5CF6",
  },
  US: {
    "Northeast": "#3B82F6",
    "South":     "#F59E0B",
    "Midwest":   "#10B981",
    "West":      "#8B5CF6",
  },
  AU: {
    "Eastern":  "#3B82F6",
    "Southern": "#10B981",
    "Western":  "#F59E0B",
    "Northern": "#EF4444",
  },
  DE: {
    "Nord":  "#3B82F6",
    "West":  "#10B981",
    "Süd":   "#F59E0B",
    "Ost":   "#EF4444",
    "Mitte": "#8B5CF6",
  },
};

// ─── CONFIGURAÇÕES POR PAÍS ───────────────────────────────────────────────────

export const COUNTRY_CONFIGS: Record<PaisCode, CountryConfig> = {
  BR: {
    pais: "BR",
    nome: "Brasil",
    bandeira: "🇧🇷",
    center: [-14.24, -51.93],
    initialZoom: 4,
    geojsonUrl: "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson",
    geojsonCodeProp: "sigla",
    geojsonNameProp: "name",
    regioes: ["Todas", "Norte", "Nordeste", "Sudeste", "Sul", "Centro-Oeste"],
    estados: BR_ESTADOS,
    atribuicao: "© IBGE · CNES/DataSUS",
    labels: {
      estado: "Estado", municipio: "Município", regiao: "Região",
      dentistas: "Dentistas", populacao: "Habitantes", habPorDentista: "Hab/Dentista",
    },
  },

  US: {
    pais: "US",
    nome: "Estados Unidos",
    bandeira: "🇺🇸",
    center: [39.50, -98.35],
    initialZoom: 4,
    // PublicaMundi GeoJSON — property "name" = full state name
    geojsonUrl: "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json",
    geojsonCodeProp: null,
    geojsonNameProp: "name",
    nameToCode: USA_STATE_NAME_TO_CODE,
    regioes: ["All", "Northeast", "South", "Midwest", "West"],
    estados: US_ESTADOS,
    atribuicao: "© US Census Bureau · NPPES/CMS",
    labels: {
      estado: "State", municipio: "County", regiao: "Region",
      dentistas: "Dentists", populacao: "Residents", habPorDentista: "People/Dentist",
    },
  },

  AU: {
    pais: "AU",
    nome: "Austrália",
    bandeira: "🇦🇺",
    center: [-25.27, 133.77],
    initialZoom: 4,
    geojsonUrl: "https://raw.githubusercontent.com/rowanhogan/australian-states/master/states.min.geojson",
    geojsonCodeProp: null,     // sem código direto — usa nameToCode
    geojsonNameProp: "STATE_NAME",
    nameToCode: AU_STATE_NAME_TO_CODE,
    regioes: ["All", "Eastern", "Western", "Southern", "Northern"],
    estados: AU_ESTADOS,
    atribuicao: "© ABS · AIHW · AHPRA",
    labels: {
      estado: "State/Territory", municipio: "LGA", regiao: "Region",
      dentistas: "Dentists", populacao: "Residents", habPorDentista: "People/Dentist",
    },
  },

  DE: {
    pais: "DE",
    nome: "Alemanha",
    bandeira: "🇩🇪",
    center: [51.16, 10.45],
    initialZoom: 6,
    geojsonUrl: "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/master/2_bundeslaender/4_niedrig.geo.json",
    geojsonCodeProp: null,
    geojsonNameProp: "name",
    nameToCode: {
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
    },
    regioes: ["All", "Nord", "West", "Süd", "Ost", "Mitte"],
    estados: DE_ESTADOS,
    atribuicao: "© Destatis · BZÄK · isellsoap/deutschlandGeoJSON",
    labels: {
      estado: "Bundesland", municipio: "Stadt/Gemeinde", regiao: "Region",
      dentistas: "Zahnärzte", populacao: "Einwohner", habPorDentista: "Einw./Zahnarzt",
    },
  },
};
