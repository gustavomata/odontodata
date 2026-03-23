// =============================================================================
// OdontoData — USA dental city map data
// Sources: ADA HPI 2022, BLS OES 2022, Census 2020, HRSA UDS 2022
// National avg: ~1,500 people/dentist
// =============================================================================

export interface CidadeGeoUSA {
  cidade: string;
  uf: string;
  regiao: string;
  lat: number;
  lng: number;
  populacao: number;
  dentistas: number;
  dentistas_por_hab: number;
  score_oportunidade: number;  // 0-100 (100 = most underserved = most opportunity)
  classificacao: string;       // "Saturado" | "Adequado" | "Normal" | "Oportunidade"
}

function calcScore(habPerDent: number): number {
  // US national avg ~1,500. Higher hab/dent = more opportunity.
  // < 800 → score ~10 (saturated, dense metro); > 2,200 → score ~90 (rural opportunity)
  return Math.round(Math.max(5, Math.min(95, ((habPerDent - 600) / 2000) * 90)));
}

function classif(habPerDent: number): string {
  if (habPerDent < 800)  return "Saturado";
  if (habPerDent < 1200) return "Adequado";
  if (habPerDent < 1600) return "Normal";
  return "Oportunidade";
}

const rawCidades = [
  { cidade: "New York",          uf: "NY", regiao: "Northeast", lat: 40.71,  lng: -74.01, pop: 8336817, dent: 9500 },
  { cidade: "Los Angeles",       uf: "CA", regiao: "West",      lat: 34.05,  lng: -118.24,pop: 3979576, dent: 5200 },
  { cidade: "Chicago",           uf: "IL", regiao: "Midwest",   lat: 41.88,  lng: -87.63, pop: 2693976, dent: 3800 },
  { cidade: "Houston",           uf: "TX", regiao: "South",     lat: 29.76,  lng: -95.37, pop: 2304580, dent: 2200 },
  { cidade: "Phoenix",           uf: "AZ", regiao: "West",      lat: 33.45,  lng: -112.07,pop: 1608139, dent: 1800 },
  { cidade: "Philadelphia",      uf: "PA", regiao: "Northeast", lat: 39.95,  lng: -75.16, pop: 1603797, dent: 2100 },
  { cidade: "San Antonio",       uf: "TX", regiao: "South",     lat: 29.42,  lng: -98.49, pop: 1434625, dent: 1200 },
  { cidade: "San Diego",         uf: "CA", regiao: "West",      lat: 32.72,  lng: -117.16,pop: 1386932, dent: 2000 },
  { cidade: "Dallas",            uf: "TX", regiao: "South",     lat: 32.78,  lng: -96.80, pop: 1304379, dent: 1400 },
  { cidade: "San Jose",          uf: "CA", regiao: "West",      lat: 37.34,  lng: -121.89,pop: 1013240, dent: 1600 },
  { cidade: "Austin",            uf: "TX", regiao: "South",     lat: 30.27,  lng: -97.74, pop: 978908,  dent: 1100 },
  { cidade: "Jacksonville",      uf: "FL", regiao: "South",     lat: 30.33,  lng: -81.66, pop: 949611,  dent: 900  },
  { cidade: "Fort Worth",        uf: "TX", regiao: "South",     lat: 32.75,  lng: -97.33, pop: 918915,  dent: 800  },
  { cidade: "Columbus",          uf: "OH", regiao: "Midwest",   lat: 39.96,  lng: -82.99, pop: 905748,  dent: 1100 },
  { cidade: "San Francisco",     uf: "CA", regiao: "West",      lat: 37.77,  lng: -122.42,pop: 873965,  dent: 1500 },
  { cidade: "Charlotte",         uf: "NC", regiao: "South",     lat: 35.23,  lng: -80.84, pop: 874579,  dent: 900  },
  { cidade: "Indianapolis",      uf: "IN", regiao: "Midwest",   lat: 39.77,  lng: -86.16, pop: 887642,  dent: 850  },
  { cidade: "Seattle",           uf: "WA", regiao: "West",      lat: 47.61,  lng: -122.33,pop: 737255,  dent: 1200 },
  { cidade: "Denver",            uf: "CO", regiao: "West",      lat: 39.74,  lng: -104.99,pop: 715522,  dent: 1100 },
  { cidade: "Detroit",           uf: "MI", regiao: "Midwest",   lat: 42.33,  lng: -83.05, pop: 639111,  dent: 650  },
  { cidade: "Nashville",         uf: "TN", regiao: "South",     lat: 36.17,  lng: -86.78, pop: 689447,  dent: 750  },
  { cidade: "Oklahoma City",     uf: "OK", regiao: "South",     lat: 35.47,  lng: -97.52, pop: 681054,  dent: 600  },
  { cidade: "El Paso",           uf: "TX", regiao: "South",     lat: 31.76,  lng: -106.49,pop: 678815,  dent: 450  },
  { cidade: "Boston",            uf: "MA", regiao: "Northeast", lat: 42.36,  lng: -71.06, pop: 675647,  dent: 1200 },
  { cidade: "Portland",          uf: "OR", regiao: "West",      lat: 45.52,  lng: -122.68,pop: 652503,  dent: 1000 },
  { cidade: "Las Vegas",         uf: "NV", regiao: "West",      lat: 36.17,  lng: -115.14,pop: 641903,  dent: 650  },
  { cidade: "Memphis",           uf: "TN", regiao: "South",     lat: 35.15,  lng: -90.05, pop: 633104,  dent: 550  },
  { cidade: "Louisville",        uf: "KY", regiao: "South",     lat: 38.25,  lng: -85.76, pop: 633045,  dent: 600  },
  { cidade: "Baltimore",         uf: "MD", regiao: "South",     lat: 39.29,  lng: -76.62, pop: 585708,  dent: 750  },
  { cidade: "Milwaukee",         uf: "WI", regiao: "Midwest",   lat: 43.04,  lng: -87.91, pop: 577222,  dent: 600  },
  { cidade: "Albuquerque",       uf: "NM", regiao: "West",      lat: 35.08,  lng: -106.65,pop: 564559,  dent: 450  },
  { cidade: "Tucson",            uf: "AZ", regiao: "West",      lat: 32.22,  lng: -110.97,pop: 542629,  dent: 500  },
  { cidade: "Fresno",            uf: "CA", regiao: "West",      lat: 36.74,  lng: -119.78,pop: 542107,  dent: 450  },
  { cidade: "Sacramento",        uf: "CA", regiao: "West",      lat: 38.58,  lng: -121.49,pop: 524943,  dent: 750  },
  { cidade: "Kansas City",       uf: "MO", regiao: "Midwest",   lat: 39.10,  lng: -94.58, pop: 495327,  dent: 550  },
  { cidade: "Mesa",              uf: "AZ", regiao: "West",      lat: 33.42,  lng: -111.83,pop: 504258,  dent: 450  },
  { cidade: "Atlanta",           uf: "GA", regiao: "South",     lat: 33.75,  lng: -84.39, pop: 498715,  dent: 700  },
  { cidade: "Omaha",             uf: "NE", regiao: "Midwest",   lat: 41.26,  lng: -95.94, pop: 486051,  dent: 580  },
  { cidade: "Colorado Springs",  uf: "CO", regiao: "West",      lat: 38.83,  lng: -104.82,pop: 478221,  dent: 520  },
  { cidade: "Raleigh",           uf: "NC", regiao: "South",     lat: 35.78,  lng: -78.64, pop: 467665,  dent: 600  },
  { cidade: "Minneapolis",       uf: "MN", regiao: "Midwest",   lat: 44.98,  lng: -93.27, pop: 429606,  dent: 700  },
  { cidade: "Tampa",             uf: "FL", regiao: "South",     lat: 27.95,  lng: -82.46, pop: 399700,  dent: 600  },
  { cidade: "New Orleans",       uf: "LA", regiao: "South",     lat: 29.95,  lng: -90.07, pop: 383997,  dent: 420  },
  { cidade: "Arlington",         uf: "TX", regiao: "South",     lat: 32.74,  lng: -97.11, pop: 398112,  dent: 350  },
  { cidade: "Bakersfield",       uf: "CA", regiao: "West",      lat: 35.37,  lng: -119.02,pop: 403455,  dent: 350  },
  { cidade: "Honolulu",          uf: "HI", regiao: "West",      lat: 21.31,  lng: -157.86,pop: 350964,  dent: 560  },
  { cidade: "Anaheim",           uf: "CA", regiao: "West",      lat: 33.84,  lng: -117.91,pop: 346824,  dent: 400  },
  { cidade: "St. Louis",         uf: "MO", regiao: "Midwest",   lat: 38.63,  lng: -90.20, pop: 300576,  dent: 400  },
  { cidade: "Pittsburgh",        uf: "PA", regiao: "Northeast", lat: 40.44,  lng: -79.99, pop: 302971,  dent: 450  },
  { cidade: "Cincinnati",        uf: "OH", regiao: "Midwest",   lat: 39.10,  lng: -84.51, pop: 309317,  dent: 400  },
  { cidade: "Orlando",           uf: "FL", regiao: "South",     lat: 28.54,  lng: -81.38, pop: 307573,  dent: 450  },
  { cidade: "Anchorage",         uf: "AK", regiao: "West",      lat: 61.22,  lng: -149.90,pop: 288000,  dent: 280  },
  { cidade: "Miami",             uf: "FL", regiao: "South",     lat: 25.77,  lng: -80.19, pop: 442241,  dent: 700  },
  { cidade: "Washington DC",     uf: "DC", regiao: "South",     lat: 38.91,  lng: -77.04, pop: 689545,  dent: 1600 },
  { cidade: "Richmond",          uf: "VA", regiao: "South",     lat: 37.54,  lng: -77.43, pop: 226610,  dent: 310  },
  { cidade: "Birmingham",        uf: "AL", regiao: "South",     lat: 33.52,  lng: -86.80, pop: 212237,  dent: 220  },
  { cidade: "Salt Lake City",    uf: "UT", regiao: "West",      lat: 40.76,  lng: -111.89,pop: 200591,  dent: 360  },
  { cidade: "Buffalo",           uf: "NY", regiao: "Northeast", lat: 42.89,  lng: -78.88, pop: 276806,  dent: 340  },
  { cidade: "Rochester",         uf: "NY", regiao: "Northeast", lat: 43.16,  lng: -77.62, pop: 211328,  dent: 310  },
  { cidade: "Providence",        uf: "RI", regiao: "Northeast", lat: 41.82,  lng: -71.42, pop: 179883,  dent: 280  },
  { cidade: "Hartford",          uf: "CT", regiao: "Northeast", lat: 41.76,  lng: -72.68, pop: 121054,  dent: 160  },
];

export const cidadesGeoUSA: CidadeGeoUSA[] = rawCidades.map((c) => {
  const habPerDent = Math.round(c.pop / c.dent);
  return {
    cidade: c.cidade,
    uf: c.uf,
    regiao: c.regiao,
    lat: c.lat,
    lng: c.lng,
    populacao: c.pop,
    dentistas: c.dent,
    dentistas_por_hab: habPerDent,
    score_oportunidade: calcScore(habPerDent),
    classificacao: classif(habPerDent),
  };
});
