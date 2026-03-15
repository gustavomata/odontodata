// =============================================================================
// OdontoData - Dados Geoespaciais do Brasil
// Coordenadas centrais dos estados e cidades para o mapa interativo
// =============================================================================

export interface EstadoGeo {
  uf: string;
  estado: string;
  regiao: string;
  center: [number, number]; // [lat, lng]
  zoom: number;
}

export interface CidadeGeo {
  cidade: string;
  uf: string;
  lat: number;
  lng: number;
  populacao: number;
  dentistas: number;
  dentistas_por_hab: number;
  score_oportunidade?: number;
  classificacao?: string;
}

// Centro geográfico de cada estado
export const estadosGeo: EstadoGeo[] = [
  // Norte
  { uf: "AC", estado: "Acre", regiao: "Norte", center: [-9.97, -67.81], zoom: 7 },
  { uf: "AM", estado: "Amazonas", regiao: "Norte", center: [-3.47, -65.10], zoom: 6 },
  { uf: "AP", estado: "Amapá", regiao: "Norte", center: [1.41, -51.77], zoom: 7 },
  { uf: "PA", estado: "Pará", regiao: "Norte", center: [-3.79, -52.48], zoom: 6 },
  { uf: "RO", estado: "Rondônia", regiao: "Norte", center: [-10.83, -63.34], zoom: 7 },
  { uf: "RR", estado: "Roraima", regiao: "Norte", center: [2.74, -61.38], zoom: 7 },
  { uf: "TO", estado: "Tocantins", regiao: "Norte", center: [-10.18, -48.33], zoom: 7 },
  // Nordeste
  { uf: "AL", estado: "Alagoas", regiao: "Nordeste", center: [-9.57, -36.78], zoom: 8 },
  { uf: "BA", estado: "Bahia", regiao: "Nordeste", center: [-12.97, -41.68], zoom: 6 },
  { uf: "CE", estado: "Ceará", regiao: "Nordeste", center: [-5.20, -39.53], zoom: 7 },
  { uf: "MA", estado: "Maranhão", regiao: "Nordeste", center: [-5.42, -45.44], zoom: 7 },
  { uf: "PB", estado: "Paraíba", regiao: "Nordeste", center: [-7.24, -36.78], zoom: 8 },
  { uf: "PE", estado: "Pernambuco", regiao: "Nordeste", center: [-8.28, -37.86], zoom: 7 },
  { uf: "PI", estado: "Piauí", regiao: "Nordeste", center: [-7.72, -42.73], zoom: 7 },
  { uf: "RN", estado: "Rio Grande do Norte", regiao: "Nordeste", center: [-5.79, -36.51], zoom: 8 },
  { uf: "SE", estado: "Sergipe", regiao: "Nordeste", center: [-10.57, -37.38], zoom: 8 },
  // Sudeste
  { uf: "ES", estado: "Espírito Santo", regiao: "Sudeste", center: [-19.19, -40.34], zoom: 8 },
  { uf: "MG", estado: "Minas Gerais", regiao: "Sudeste", center: [-18.10, -44.38], zoom: 7 },
  { uf: "RJ", estado: "Rio de Janeiro", regiao: "Sudeste", center: [-22.25, -42.66], zoom: 8 },
  { uf: "SP", estado: "São Paulo", regiao: "Sudeste", center: [-22.19, -48.79], zoom: 7 },
  // Sul
  { uf: "PR", estado: "Paraná", regiao: "Sul", center: [-24.89, -51.55], zoom: 7 },
  { uf: "RS", estado: "Rio Grande do Sul", regiao: "Sul", center: [-30.03, -53.21], zoom: 7 },
  { uf: "SC", estado: "Santa Catarina", regiao: "Sul", center: [-27.24, -50.22], zoom: 8 },
  // Centro-Oeste
  { uf: "DF", estado: "Distrito Federal", regiao: "Centro-Oeste", center: [-15.83, -47.86], zoom: 10 },
  { uf: "GO", estado: "Goiás", regiao: "Centro-Oeste", center: [-15.98, -49.86], zoom: 7 },
  { uf: "MS", estado: "Mato Grosso do Sul", regiao: "Centro-Oeste", center: [-20.51, -54.54], zoom: 7 },
  { uf: "MT", estado: "Mato Grosso", regiao: "Centro-Oeste", center: [-12.64, -55.42], zoom: 6 },
];

// Cidades com dados para markers no mapa
export const cidadesGeo: CidadeGeo[] = [
  // Capitais e cidades principais com dados
  // Norte
  { cidade: "Manaus", uf: "AM", lat: -3.12, lng: -60.02, populacao: 2255903, dentistas: 1450, dentistas_por_hab: 1556, score_oportunidade: 58, classificacao: "Moderado" },
  { cidade: "Belém", uf: "PA", lat: -1.46, lng: -48.50, populacao: 1499000, dentistas: 1700, dentistas_por_hab: 882, score_oportunidade: 45, classificacao: "Moderado" },
  { cidade: "Macapá", uf: "AP", lat: 0.03, lng: -51.07, populacao: 512902, dentistas: 198, dentistas_por_hab: 2590, score_oportunidade: 79, classificacao: "Muito Bom" },
  { cidade: "Boa Vista", uf: "RR", lat: 2.82, lng: -60.67, populacao: 419652, dentistas: 175, dentistas_por_hab: 2398, score_oportunidade: 80, classificacao: "Muito Bom" },
  { cidade: "Porto Velho", uf: "RO", lat: -8.76, lng: -63.90, populacao: 539354, dentistas: 245, dentistas_por_hab: 2201, score_oportunidade: 77, classificacao: "Muito Bom" },
  { cidade: "Rio Branco", uf: "AC", lat: -9.97, lng: -67.81, populacao: 413418, dentistas: 168, dentistas_por_hab: 2461, score_oportunidade: 81, classificacao: "Muito Bom" },
  { cidade: "Palmas", uf: "TO", lat: -10.18, lng: -48.33, populacao: 306296, dentistas: 185, dentistas_por_hab: 1656, score_oportunidade: 72, classificacao: "Bom" },
  { cidade: "Marabá", uf: "PA", lat: -5.37, lng: -49.12, populacao: 283542, dentistas: 78, dentistas_por_hab: 3635, score_oportunidade: 89, classificacao: "Excelente" },
  { cidade: "Santarém", uf: "PA", lat: -2.44, lng: -54.71, populacao: 306480, dentistas: 112, dentistas_por_hab: 2737, score_oportunidade: 84, classificacao: "Muito Bom" },
  { cidade: "Parauapebas", uf: "PA", lat: -6.07, lng: -49.90, populacao: 212394, dentistas: 65, dentistas_por_hab: 3268, score_oportunidade: 88, classificacao: "Excelente" },
  { cidade: "Breves", uf: "PA", lat: -1.68, lng: -50.48, populacao: 103297, dentistas: 18, dentistas_por_hab: 5739, score_oportunidade: 94, classificacao: "Excelente" },
  { cidade: "Itaituba", uf: "PA", lat: -4.28, lng: -55.99, populacao: 101097, dentistas: 22, dentistas_por_hab: 4595, score_oportunidade: 92, classificacao: "Excelente" },
  { cidade: "Ji-Paraná", uf: "RO", lat: -10.88, lng: -61.95, populacao: 130009, dentistas: 58, dentistas_por_hab: 2242, score_oportunidade: 71, classificacao: "Bom" },

  // Nordeste
  { cidade: "Salvador", uf: "BA", lat: -12.97, lng: -38.51, populacao: 2886000, dentistas: 2700, dentistas_por_hab: 1069, score_oportunidade: 38, classificacao: "Saturado" },
  { cidade: "Fortaleza", uf: "CE", lat: -3.73, lng: -38.53, populacao: 2686000, dentistas: 2900, dentistas_por_hab: 926, score_oportunidade: 40, classificacao: "Moderado" },
  { cidade: "Recife", uf: "PE", lat: -8.05, lng: -34.87, populacao: 1661000, dentistas: 1800, dentistas_por_hab: 922, score_oportunidade: 38, classificacao: "Saturado" },
  { cidade: "São Luís", uf: "MA", lat: -2.53, lng: -44.28, populacao: 1109000, dentistas: 680, dentistas_por_hab: 1631, score_oportunidade: 50, classificacao: "Moderado" },
  { cidade: "Teresina", uf: "PI", lat: -5.09, lng: -42.80, populacao: 871126, dentistas: 520, dentistas_por_hab: 1675, score_oportunidade: 52, classificacao: "Moderado" },
  { cidade: "Natal", uf: "RN", lat: -5.79, lng: -35.21, populacao: 896000, dentistas: 620, dentistas_por_hab: 1445, score_oportunidade: 42, classificacao: "Moderado" },
  { cidade: "João Pessoa", uf: "PB", lat: -7.12, lng: -34.86, populacao: 825000, dentistas: 580, dentistas_por_hab: 1422, score_oportunidade: 40, classificacao: "Moderado" },
  { cidade: "Maceió", uf: "AL", lat: -9.67, lng: -35.74, populacao: 1025000, dentistas: 620, dentistas_por_hab: 1653, score_oportunidade: 44, classificacao: "Moderado" },
  { cidade: "Aracaju", uf: "SE", lat: -10.91, lng: -37.07, populacao: 664000, dentistas: 480, dentistas_por_hab: 1383, score_oportunidade: 40, classificacao: "Moderado" },
  { cidade: "Imperatriz", uf: "MA", lat: -5.52, lng: -47.47, populacao: 259337, dentistas: 89, dentistas_por_hab: 2914, score_oportunidade: 85, classificacao: "Muito Bom" },
  { cidade: "Caruaru", uf: "PE", lat: -8.28, lng: -35.98, populacao: 365278, dentistas: 168, dentistas_por_hab: 2174, score_oportunidade: 68, classificacao: "Bom" },
  { cidade: "Petrolina", uf: "PE", lat: -9.39, lng: -40.50, populacao: 354317, dentistas: 172, dentistas_por_hab: 2060, score_oportunidade: 65, classificacao: "Bom" },
  { cidade: "Juazeiro do Norte", uf: "CE", lat: -7.21, lng: -39.31, populacao: 276264, dentistas: 142, dentistas_por_hab: 1945, score_oportunidade: 60, classificacao: "Moderado" },
  { cidade: "Timon", uf: "MA", lat: -5.09, lng: -42.84, populacao: 169107, dentistas: 42, dentistas_por_hab: 4026, score_oportunidade: 76, classificacao: "Muito Bom" },
  { cidade: "Caxias", uf: "MA", lat: -4.86, lng: -43.36, populacao: 164880, dentistas: 38, dentistas_por_hab: 4339, score_oportunidade: 75, classificacao: "Bom" },
  { cidade: "Vitória da Conquista", uf: "BA", lat: -14.86, lng: -40.84, populacao: 341128, dentistas: 210, dentistas_por_hab: 1624, score_oportunidade: 55, classificacao: "Moderado" },

  // Sudeste
  { cidade: "São Paulo", uf: "SP", lat: -23.55, lng: -46.63, populacao: 12396372, dentistas: 18500, dentistas_por_hab: 670, score_oportunidade: 15, classificacao: "Saturado" },
  { cidade: "Rio de Janeiro", uf: "RJ", lat: -22.91, lng: -43.17, populacao: 6748000, dentistas: 8200, dentistas_por_hab: 823, score_oportunidade: 22, classificacao: "Saturado" },
  { cidade: "Belo Horizonte", uf: "MG", lat: -19.92, lng: -43.94, populacao: 2521564, dentistas: 2850, dentistas_por_hab: 885, score_oportunidade: 28, classificacao: "Saturado" },
  { cidade: "Campinas", uf: "SP", lat: -22.91, lng: -47.06, populacao: 1223237, dentistas: 1540, dentistas_por_hab: 794, score_oportunidade: 22, classificacao: "Saturado" },
  { cidade: "Vitória", uf: "ES", lat: -20.32, lng: -40.34, populacao: 365855, dentistas: 520, dentistas_por_hab: 703, score_oportunidade: 20, classificacao: "Saturado" },
  { cidade: "Ribeirão Preto", uf: "SP", lat: -21.18, lng: -47.81, populacao: 711825, dentistas: 980, dentistas_por_hab: 726, score_oportunidade: 18, classificacao: "Saturado" },
  { cidade: "Santos", uf: "SP", lat: -23.96, lng: -46.33, populacao: 433656, dentistas: 680, dentistas_por_hab: 638, score_oportunidade: 12, classificacao: "Saturado" },
  { cidade: "Uberlândia", uf: "MG", lat: -18.92, lng: -48.28, populacao: 706597, dentistas: 620, dentistas_por_hab: 1140, score_oportunidade: 35, classificacao: "Moderado" },
  { cidade: "Montes Claros", uf: "MG", lat: -16.74, lng: -43.86, populacao: 413487, dentistas: 280, dentistas_por_hab: 1477, score_oportunidade: 55, classificacao: "Moderado" },

  // Sul
  { cidade: "Curitiba", uf: "PR", lat: -25.43, lng: -49.27, populacao: 1963726, dentistas: 1680, dentistas_por_hab: 1169, score_oportunidade: 35, classificacao: "Saturado" },
  { cidade: "Porto Alegre", uf: "RS", lat: -30.03, lng: -51.23, populacao: 1492000, dentistas: 1500, dentistas_por_hab: 995, score_oportunidade: 30, classificacao: "Saturado" },
  { cidade: "Florianópolis", uf: "SC", lat: -27.60, lng: -48.55, populacao: 516524, dentistas: 620, dentistas_por_hab: 833, score_oportunidade: 25, classificacao: "Saturado" },
  { cidade: "Londrina", uf: "PR", lat: -23.31, lng: -51.16, populacao: 575377, dentistas: 480, dentistas_por_hab: 1199, score_oportunidade: 38, classificacao: "Moderado" },
  { cidade: "Maringá", uf: "PR", lat: -23.42, lng: -51.94, populacao: 430157, dentistas: 420, dentistas_por_hab: 1024, score_oportunidade: 32, classificacao: "Saturado" },
  { cidade: "Joinville", uf: "SC", lat: -26.30, lng: -48.85, populacao: 604526, dentistas: 480, dentistas_por_hab: 1259, score_oportunidade: 38, classificacao: "Moderado" },
  { cidade: "Caxias do Sul", uf: "RS", lat: -29.17, lng: -51.18, populacao: 517451, dentistas: 380, dentistas_por_hab: 1362, score_oportunidade: 40, classificacao: "Moderado" },

  // Centro-Oeste
  { cidade: "Goiânia", uf: "GO", lat: -16.69, lng: -49.25, populacao: 1555626, dentistas: 1120, dentistas_por_hab: 1389, score_oportunidade: 42, classificacao: "Moderado" },
  { cidade: "Brasília", uf: "DF", lat: -15.79, lng: -47.88, populacao: 3094325, dentistas: 2400, dentistas_por_hab: 1289, score_oportunidade: 30, classificacao: "Saturado" },
  { cidade: "Campo Grande", uf: "MS", lat: -20.44, lng: -54.65, populacao: 906092, dentistas: 680, dentistas_por_hab: 1332, score_oportunidade: 40, classificacao: "Moderado" },
  { cidade: "Cuiabá", uf: "MT", lat: -15.60, lng: -56.10, populacao: 618124, dentistas: 520, dentistas_por_hab: 1189, score_oportunidade: 38, classificacao: "Moderado" },
  { cidade: "Sinop", uf: "MT", lat: -11.86, lng: -55.51, populacao: 146005, dentistas: 78, dentistas_por_hab: 1872, score_oportunidade: 67, classificacao: "Bom" },
  { cidade: "Rondonópolis", uf: "MT", lat: -16.47, lng: -54.64, populacao: 236042, dentistas: 132, dentistas_por_hab: 1788, score_oportunidade: 64, classificacao: "Bom" },
  { cidade: "Anápolis", uf: "GO", lat: -16.33, lng: -48.95, populacao: 391772, dentistas: 280, dentistas_por_hab: 1399, score_oportunidade: 45, classificacao: "Moderado" },
  { cidade: "Dourados", uf: "MS", lat: -22.22, lng: -54.81, populacao: 225495, dentistas: 165, dentistas_por_hab: 1367, score_oportunidade: 48, classificacao: "Moderado" },
];

// URL do GeoJSON dos estados do Brasil (IBGE)
export const BRAZIL_GEOJSON_URL = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

// Cores por região
export const CORES_REGIOES_MAP: Record<string, string> = {
  Norte: "#EF4444",
  Nordeste: "#F59E0B",
  Sudeste: "#3B82F6",
  Sul: "#10B981",
  "Centro-Oeste": "#8B5CF6",
};

// Cores por classificação de oportunidade
export const CORES_CLASSIFICACAO: Record<string, string> = {
  Excelente: "#22c55e",
  "Muito Bom": "#84cc16",
  Bom: "#eab308",
  Moderado: "#f97316",
  Saturado: "#ef4444",
};

// Escala de cores para métricas (do melhor ao pior)
export function getCorSaturacao(ratio: number): string {
  // ratio = habitantes por dentista (menor = mais saturado)
  if (ratio <= 400) return "#ef4444";   // Muito saturado (vermelho)
  if (ratio <= 600) return "#f97316";   // Saturado (laranja)
  if (ratio <= 800) return "#eab308";   // Moderado (amarelo)
  if (ratio <= 1200) return "#84cc16";  // Bom (verde claro)
  return "#22c55e";                      // Oportunidade (verde)
}

export function getCorScore(score: number): string {
  if (score >= 80) return "#22c55e";
  if (score >= 60) return "#84cc16";
  if (score >= 40) return "#eab308";
  if (score >= 25) return "#f97316";
  return "#ef4444";
}

export function getCorDensidade(dentistas: number): string {
  if (dentistas >= 30000) return "#3b82f6";
  if (dentistas >= 15000) return "#6366f1";
  if (dentistas >= 8000) return "#8b5cf6";
  if (dentistas >= 4000) return "#a855f7";
  return "#c084fc";
}
