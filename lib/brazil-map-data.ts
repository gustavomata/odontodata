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
  // ─── NORTE ───────────────────────────────────────────────────────────────
  // Amazonas
  { cidade: "Manaus", uf: "AM", lat: -3.12, lng: -60.02, populacao: 2255903, dentistas: 1450, dentistas_por_hab: 1556, score_oportunidade: 58, classificacao: "Moderado" },
  { cidade: "Parintins", uf: "AM", lat: -2.63, lng: -56.74, populacao: 116229, dentistas: 32, dentistas_por_hab: 3632, score_oportunidade: 82, classificacao: "Muito Bom" },
  { cidade: "Itacoatiara", uf: "AM", lat: -3.14, lng: -58.44, populacao: 104027, dentistas: 28, dentistas_por_hab: 3715, score_oportunidade: 80, classificacao: "Muito Bom" },
  { cidade: "Tefé", uf: "AM", lat: -3.36, lng: -64.71, populacao: 62419, dentistas: 14, dentistas_por_hab: 4458, score_oportunidade: 85, classificacao: "Muito Bom" },
  { cidade: "Coari", uf: "AM", lat: -4.09, lng: -63.14, populacao: 87483, dentistas: 20, dentistas_por_hab: 4374, score_oportunidade: 83, classificacao: "Muito Bom" },
  { cidade: "Manacapuru", uf: "AM", lat: -3.30, lng: -60.62, populacao: 95814, dentistas: 24, dentistas_por_hab: 3992, score_oportunidade: 78, classificacao: "Muito Bom" },
  // Pará
  { cidade: "Belém", uf: "PA", lat: -1.46, lng: -48.50, populacao: 1499000, dentistas: 1700, dentistas_por_hab: 882, score_oportunidade: 45, classificacao: "Moderado" },
  { cidade: "Ananindeua", uf: "PA", lat: -1.36, lng: -48.37, populacao: 535547, dentistas: 195, dentistas_por_hab: 2746, score_oportunidade: 62, classificacao: "Bom" },
  { cidade: "Santarém", uf: "PA", lat: -2.44, lng: -54.71, populacao: 306480, dentistas: 112, dentistas_por_hab: 2737, score_oportunidade: 84, classificacao: "Muito Bom" },
  { cidade: "Marabá", uf: "PA", lat: -5.37, lng: -49.12, populacao: 283542, dentistas: 78, dentistas_por_hab: 3635, score_oportunidade: 89, classificacao: "Excelente" },
  { cidade: "Parauapebas", uf: "PA", lat: -6.07, lng: -49.90, populacao: 212394, dentistas: 65, dentistas_por_hab: 3268, score_oportunidade: 88, classificacao: "Excelente" },
  { cidade: "Castanhal", uf: "PA", lat: -1.29, lng: -47.92, populacao: 205550, dentistas: 72, dentistas_por_hab: 2855, score_oportunidade: 74, classificacao: "Bom" },
  { cidade: "Altamira", uf: "PA", lat: -3.21, lng: -52.21, populacao: 116497, dentistas: 32, dentistas_por_hab: 3641, score_oportunidade: 86, classificacao: "Muito Bom" },
  { cidade: "Itaituba", uf: "PA", lat: -4.28, lng: -55.99, populacao: 101097, dentistas: 22, dentistas_por_hab: 4595, score_oportunidade: 92, classificacao: "Excelente" },
  { cidade: "Breves", uf: "PA", lat: -1.68, lng: -50.48, populacao: 103297, dentistas: 18, dentistas_por_hab: 5739, score_oportunidade: 94, classificacao: "Excelente" },
  { cidade: "Tucuruí", uf: "PA", lat: -3.76, lng: -49.67, populacao: 105278, dentistas: 29, dentistas_por_hab: 3630, score_oportunidade: 81, classificacao: "Muito Bom" },
  { cidade: "Abaetetuba", uf: "PA", lat: -1.72, lng: -48.88, populacao: 158095, dentistas: 40, dentistas_por_hab: 3952, score_oportunidade: 79, classificacao: "Muito Bom" },
  { cidade: "Cametá", uf: "PA", lat: -2.24, lng: -49.50, populacao: 132361, dentistas: 28, dentistas_por_hab: 4727, score_oportunidade: 83, classificacao: "Muito Bom" },
  { cidade: "Paragominas", uf: "PA", lat: -2.97, lng: -47.35, populacao: 109308, dentistas: 30, dentistas_por_hab: 3644, score_oportunidade: 80, classificacao: "Muito Bom" },
  { cidade: "Barcarena", uf: "PA", lat: -1.51, lng: -48.62, populacao: 125254, dentistas: 38, dentistas_por_hab: 3296, score_oportunidade: 76, classificacao: "Muito Bom" },
  // Tocantins
  { cidade: "Palmas", uf: "TO", lat: -10.18, lng: -48.33, populacao: 306296, dentistas: 185, dentistas_por_hab: 1656, score_oportunidade: 72, classificacao: "Bom" },
  { cidade: "Araguaína", uf: "TO", lat: -7.19, lng: -48.20, populacao: 183764, dentistas: 88, dentistas_por_hab: 2088, score_oportunidade: 69, classificacao: "Bom" },
  { cidade: "Gurupi", uf: "TO", lat: -11.73, lng: -49.07, populacao: 87545, dentistas: 42, dentistas_por_hab: 2084, score_oportunidade: 66, classificacao: "Bom" },
  { cidade: "Porto Nacional", uf: "TO", lat: -10.71, lng: -48.42, populacao: 55247, dentistas: 22, dentistas_por_hab: 2511, score_oportunidade: 70, classificacao: "Bom" },
  // Rondônia
  { cidade: "Porto Velho", uf: "RO", lat: -8.76, lng: -63.90, populacao: 539354, dentistas: 245, dentistas_por_hab: 2201, score_oportunidade: 77, classificacao: "Muito Bom" },
  { cidade: "Ji-Paraná", uf: "RO", lat: -10.88, lng: -61.95, populacao: 130009, dentistas: 58, dentistas_por_hab: 2242, score_oportunidade: 71, classificacao: "Bom" },
  { cidade: "Ariquemes", uf: "RO", lat: -9.91, lng: -63.04, populacao: 109874, dentistas: 46, dentistas_por_hab: 2388, score_oportunidade: 73, classificacao: "Bom" },
  { cidade: "Vilhena", uf: "RO", lat: -12.74, lng: -60.14, populacao: 100444, dentistas: 42, dentistas_por_hab: 2391, score_oportunidade: 72, classificacao: "Bom" },
  { cidade: "Cacoal", uf: "RO", lat: -11.44, lng: -61.45, populacao: 86556, dentistas: 35, dentistas_por_hab: 2473, score_oportunidade: 71, classificacao: "Bom" },
  // Acre
  { cidade: "Rio Branco", uf: "AC", lat: -9.97, lng: -67.81, populacao: 413418, dentistas: 168, dentistas_por_hab: 2461, score_oportunidade: 81, classificacao: "Muito Bom" },
  { cidade: "Cruzeiro do Sul", uf: "AC", lat: -7.63, lng: -72.67, populacao: 93090, dentistas: 26, dentistas_por_hab: 3580, score_oportunidade: 85, classificacao: "Muito Bom" },
  // Amapá
  { cidade: "Macapá", uf: "AP", lat: 0.03, lng: -51.07, populacao: 512902, dentistas: 198, dentistas_por_hab: 2590, score_oportunidade: 79, classificacao: "Muito Bom" },
  { cidade: "Santana", uf: "AP", lat: -0.06, lng: -51.17, populacao: 111148, dentistas: 38, dentistas_por_hab: 2925, score_oportunidade: 76, classificacao: "Muito Bom" },
  // Roraima
  { cidade: "Boa Vista", uf: "RR", lat: 2.82, lng: -60.67, populacao: 419652, dentistas: 175, dentistas_por_hab: 2398, score_oportunidade: 80, classificacao: "Muito Bom" },
  { cidade: "Rorainópolis", uf: "RR", lat: 0.95, lng: -60.43, populacao: 30234, dentistas: 7, dentistas_por_hab: 4319, score_oportunidade: 84, classificacao: "Muito Bom" },

  // ─── NORDESTE ─────────────────────────────────────────────────────────────
  // Bahia
  { cidade: "Salvador", uf: "BA", lat: -12.97, lng: -38.51, populacao: 2886000, dentistas: 2700, dentistas_por_hab: 1069, score_oportunidade: 38, classificacao: "Saturado" },
  { cidade: "Feira de Santana", uf: "BA", lat: -12.26, lng: -38.97, populacao: 631767, dentistas: 380, dentistas_por_hab: 1662, score_oportunidade: 52, classificacao: "Moderado" },
  { cidade: "Vitória da Conquista", uf: "BA", lat: -14.86, lng: -40.84, populacao: 341128, dentistas: 210, dentistas_por_hab: 1624, score_oportunidade: 55, classificacao: "Moderado" },
  { cidade: "Camaçari", uf: "BA", lat: -12.70, lng: -38.32, populacao: 318315, dentistas: 155, dentistas_por_hab: 2053, score_oportunidade: 58, classificacao: "Moderado" },
  { cidade: "Juazeiro", uf: "BA", lat: -9.42, lng: -40.50, populacao: 224897, dentistas: 95, dentistas_por_hab: 2367, score_oportunidade: 62, classificacao: "Bom" },
  { cidade: "Ilhéus", uf: "BA", lat: -14.79, lng: -39.04, populacao: 184975, dentistas: 88, dentistas_por_hab: 2102, score_oportunidade: 55, classificacao: "Moderado" },
  { cidade: "Itabuna", uf: "BA", lat: -14.79, lng: -39.28, populacao: 213476, dentistas: 115, dentistas_por_hab: 1856, score_oportunidade: 50, classificacao: "Moderado" },
  { cidade: "Lauro de Freitas", uf: "BA", lat: -12.90, lng: -38.32, populacao: 208027, dentistas: 110, dentistas_por_hab: 1891, score_oportunidade: 48, classificacao: "Moderado" },
  { cidade: "Barreiras", uf: "BA", lat: -12.15, lng: -44.99, populacao: 160586, dentistas: 68, dentistas_por_hab: 2362, score_oportunidade: 65, classificacao: "Bom" },
  { cidade: "Paulo Afonso", uf: "BA", lat: -9.41, lng: -38.22, populacao: 120396, dentistas: 40, dentistas_por_hab: 3010, score_oportunidade: 70, classificacao: "Bom" },
  { cidade: "Jequié", uf: "BA", lat: -13.86, lng: -40.08, populacao: 167057, dentistas: 72, dentistas_por_hab: 2320, score_oportunidade: 58, classificacao: "Moderado" },
  // Ceará
  { cidade: "Fortaleza", uf: "CE", lat: -3.73, lng: -38.53, populacao: 2686000, dentistas: 2900, dentistas_por_hab: 926, score_oportunidade: 40, classificacao: "Moderado" },
  { cidade: "Caucaia", uf: "CE", lat: -3.74, lng: -38.66, populacao: 368918, dentistas: 175, dentistas_por_hab: 2108, score_oportunidade: 56, classificacao: "Moderado" },
  { cidade: "Maracanaú", uf: "CE", lat: -3.88, lng: -38.63, populacao: 231062, dentistas: 105, dentistas_por_hab: 2200, score_oportunidade: 54, classificacao: "Moderado" },
  { cidade: "Juazeiro do Norte", uf: "CE", lat: -7.21, lng: -39.31, populacao: 276264, dentistas: 142, dentistas_por_hab: 1945, score_oportunidade: 60, classificacao: "Moderado" },
  { cidade: "Sobral", uf: "CE", lat: -3.69, lng: -40.35, populacao: 219767, dentistas: 98, dentistas_por_hab: 2242, score_oportunidade: 62, classificacao: "Bom" },
  { cidade: "Crato", uf: "CE", lat: -7.24, lng: -39.41, populacao: 133032, dentistas: 60, dentistas_por_hab: 2217, score_oportunidade: 60, classificacao: "Moderado" },
  { cidade: "Iguatu", uf: "CE", lat: -6.36, lng: -39.30, populacao: 102288, dentistas: 40, dentistas_por_hab: 2557, score_oportunidade: 65, classificacao: "Bom" },
  { cidade: "Quixadá", uf: "CE", lat: -4.97, lng: -39.01, populacao: 89712, dentistas: 28, dentistas_por_hab: 3204, score_oportunidade: 72, classificacao: "Bom" },
  // Maranhão
  { cidade: "São Luís", uf: "MA", lat: -2.53, lng: -44.28, populacao: 1109000, dentistas: 680, dentistas_por_hab: 1631, score_oportunidade: 50, classificacao: "Moderado" },
  { cidade: "Imperatriz", uf: "MA", lat: -5.52, lng: -47.47, populacao: 259337, dentistas: 89, dentistas_por_hab: 2914, score_oportunidade: 85, classificacao: "Muito Bom" },
  { cidade: "Timon", uf: "MA", lat: -5.09, lng: -42.84, populacao: 169107, dentistas: 42, dentistas_por_hab: 4026, score_oportunidade: 76, classificacao: "Muito Bom" },
  { cidade: "Caxias", uf: "MA", lat: -4.86, lng: -43.36, populacao: 164880, dentistas: 38, dentistas_por_hab: 4339, score_oportunidade: 75, classificacao: "Bom" },
  { cidade: "Codó", uf: "MA", lat: -4.47, lng: -43.89, populacao: 126902, dentistas: 28, dentistas_por_hab: 4532, score_oportunidade: 78, classificacao: "Muito Bom" },
  { cidade: "Bacabal", uf: "MA", lat: -4.23, lng: -44.78, populacao: 107612, dentistas: 25, dentistas_por_hab: 4304, score_oportunidade: 76, classificacao: "Muito Bom" },
  { cidade: "Açailândia", uf: "MA", lat: -4.95, lng: -47.50, populacao: 112826, dentistas: 30, dentistas_por_hab: 3761, score_oportunidade: 79, classificacao: "Muito Bom" },
  // Pernambuco
  { cidade: "Recife", uf: "PE", lat: -8.05, lng: -34.87, populacao: 1661000, dentistas: 1800, dentistas_por_hab: 922, score_oportunidade: 38, classificacao: "Saturado" },
  { cidade: "Caruaru", uf: "PE", lat: -8.28, lng: -35.98, populacao: 365278, dentistas: 168, dentistas_por_hab: 2174, score_oportunidade: 68, classificacao: "Bom" },
  { cidade: "Petrolina", uf: "PE", lat: -9.39, lng: -40.50, populacao: 354317, dentistas: 172, dentistas_por_hab: 2060, score_oportunidade: 65, classificacao: "Bom" },
  { cidade: "Olinda", uf: "PE", lat: -8.01, lng: -34.86, populacao: 392482, dentistas: 198, dentistas_por_hab: 1982, score_oportunidade: 42, classificacao: "Moderado" },
  { cidade: "Paulista", uf: "PE", lat: -7.94, lng: -34.88, populacao: 328207, dentistas: 152, dentistas_por_hab: 2159, score_oportunidade: 48, classificacao: "Moderado" },
  { cidade: "Garanhuns", uf: "PE", lat: -8.89, lng: -36.50, populacao: 144174, dentistas: 62, dentistas_por_hab: 2325, score_oportunidade: 60, classificacao: "Moderado" },
  { cidade: "Caetés", uf: "PE", lat: -8.76, lng: -36.62, populacao: 50842, dentistas: 12, dentistas_por_hab: 4237, score_oportunidade: 75, classificacao: "Bom" },
  // Piauí
  { cidade: "Teresina", uf: "PI", lat: -5.09, lng: -42.80, populacao: 871126, dentistas: 520, dentistas_por_hab: 1675, score_oportunidade: 52, classificacao: "Moderado" },
  { cidade: "Parnaíba", uf: "PI", lat: -2.91, lng: -41.78, populacao: 153892, dentistas: 55, dentistas_por_hab: 2798, score_oportunidade: 70, classificacao: "Bom" },
  { cidade: "Picos", uf: "PI", lat: -7.08, lng: -41.47, populacao: 79855, dentistas: 28, dentistas_por_hab: 2852, score_oportunidade: 69, classificacao: "Bom" },
  { cidade: "Floriano", uf: "PI", lat: -6.77, lng: -43.02, populacao: 60921, dentistas: 18, dentistas_por_hab: 3385, score_oportunidade: 74, classificacao: "Bom" },
  // Rio Grande do Norte
  { cidade: "Natal", uf: "RN", lat: -5.79, lng: -35.21, populacao: 896000, dentistas: 620, dentistas_por_hab: 1445, score_oportunidade: 42, classificacao: "Moderado" },
  { cidade: "Mossoró", uf: "RN", lat: -5.19, lng: -37.35, populacao: 300253, dentistas: 138, dentistas_por_hab: 2176, score_oportunidade: 60, classificacao: "Moderado" },
  { cidade: "Caicó", uf: "RN", lat: -6.46, lng: -37.10, populacao: 68188, dentistas: 25, dentistas_por_hab: 2728, score_oportunidade: 66, classificacao: "Bom" },
  { cidade: "Parnamirim", uf: "RN", lat: -5.91, lng: -35.26, populacao: 269817, dentistas: 118, dentistas_por_hab: 2287, score_oportunidade: 55, classificacao: "Moderado" },
  // Paraíba
  { cidade: "João Pessoa", uf: "PB", lat: -7.12, lng: -34.86, populacao: 825000, dentistas: 580, dentistas_por_hab: 1422, score_oportunidade: 40, classificacao: "Moderado" },
  { cidade: "Campina Grande", uf: "PB", lat: -7.23, lng: -35.88, populacao: 421396, dentistas: 220, dentistas_por_hab: 1915, score_oportunidade: 52, classificacao: "Moderado" },
  { cidade: "Patos", uf: "PB", lat: -7.02, lng: -37.28, populacao: 106244, dentistas: 38, dentistas_por_hab: 2796, score_oportunidade: 65, classificacao: "Bom" },
  { cidade: "Santa Rita", uf: "PB", lat: -7.12, lng: -34.98, populacao: 140568, dentistas: 52, dentistas_por_hab: 2703, score_oportunidade: 58, classificacao: "Moderado" },
  // Alagoas
  { cidade: "Maceió", uf: "AL", lat: -9.67, lng: -35.74, populacao: 1025000, dentistas: 620, dentistas_por_hab: 1653, score_oportunidade: 44, classificacao: "Moderado" },
  { cidade: "Arapiraca", uf: "AL", lat: -9.75, lng: -36.66, populacao: 234096, dentistas: 95, dentistas_por_hab: 2464, score_oportunidade: 62, classificacao: "Bom" },
  { cidade: "Palmeira dos Índios", uf: "AL", lat: -9.41, lng: -36.63, populacao: 74789, dentistas: 22, dentistas_por_hab: 3399, score_oportunidade: 70, classificacao: "Bom" },
  // Sergipe
  { cidade: "Aracaju", uf: "SE", lat: -10.91, lng: -37.07, populacao: 664000, dentistas: 480, dentistas_por_hab: 1383, score_oportunidade: 40, classificacao: "Moderado" },
  { cidade: "Nossa Sra do Socorro", uf: "SE", lat: -10.86, lng: -37.13, populacao: 186724, dentistas: 70, dentistas_por_hab: 2667, score_oportunidade: 58, classificacao: "Moderado" },
  { cidade: "Lagarto", uf: "SE", lat: -10.92, lng: -37.65, populacao: 104157, dentistas: 35, dentistas_por_hab: 2976, score_oportunidade: 68, classificacao: "Bom" },

  // ─── SUDESTE ──────────────────────────────────────────────────────────────
  // São Paulo
  { cidade: "São Paulo", uf: "SP", lat: -23.55, lng: -46.63, populacao: 12396372, dentistas: 18500, dentistas_por_hab: 670, score_oportunidade: 15, classificacao: "Saturado" },
  { cidade: "Guarulhos", uf: "SP", lat: -23.46, lng: -46.53, populacao: 1403275, dentistas: 1650, dentistas_por_hab: 850, score_oportunidade: 20, classificacao: "Saturado" },
  { cidade: "Campinas", uf: "SP", lat: -22.91, lng: -47.06, populacao: 1223237, dentistas: 1540, dentistas_por_hab: 794, score_oportunidade: 22, classificacao: "Saturado" },
  { cidade: "São Bernardo do Campo", uf: "SP", lat: -23.69, lng: -46.56, populacao: 827437, dentistas: 980, dentistas_por_hab: 845, score_oportunidade: 20, classificacao: "Saturado" },
  { cidade: "São José dos Campos", uf: "SP", lat: -23.18, lng: -45.88, populacao: 735380, dentistas: 860, dentistas_por_hab: 855, score_oportunidade: 22, classificacao: "Saturado" },
  { cidade: "Ribeirão Preto", uf: "SP", lat: -21.18, lng: -47.81, populacao: 711825, dentistas: 980, dentistas_por_hab: 726, score_oportunidade: 18, classificacao: "Saturado" },
  { cidade: "Sorocaba", uf: "SP", lat: -23.50, lng: -47.46, populacao: 700508, dentistas: 820, dentistas_por_hab: 854, score_oportunidade: 20, classificacao: "Saturado" },
  { cidade: "Santo André", uf: "SP", lat: -23.66, lng: -46.53, populacao: 723000, dentistas: 840, dentistas_por_hab: 861, score_oportunidade: 19, classificacao: "Saturado" },
  { cidade: "Osasco", uf: "SP", lat: -23.53, lng: -46.79, populacao: 698542, dentistas: 790, dentistas_por_hab: 884, score_oportunidade: 20, classificacao: "Saturado" },
  { cidade: "Santos", uf: "SP", lat: -23.96, lng: -46.33, populacao: 433656, dentistas: 680, dentistas_por_hab: 638, score_oportunidade: 12, classificacao: "Saturado" },
  { cidade: "São José do Rio Preto", uf: "SP", lat: -20.82, lng: -49.38, populacao: 465288, dentistas: 520, dentistas_por_hab: 895, score_oportunidade: 22, classificacao: "Saturado" },
  { cidade: "Mogi das Cruzes", uf: "SP", lat: -23.52, lng: -46.19, populacao: 456843, dentistas: 510, dentistas_por_hab: 895, score_oportunidade: 22, classificacao: "Saturado" },
  { cidade: "Bauru", uf: "SP", lat: -22.31, lng: -49.07, populacao: 387889, dentistas: 450, dentistas_por_hab: 862, score_oportunidade: 20, classificacao: "Saturado" },
  { cidade: "Jundiaí", uf: "SP", lat: -23.19, lng: -46.89, populacao: 437299, dentistas: 510, dentistas_por_hab: 857, score_oportunidade: 20, classificacao: "Saturado" },
  { cidade: "Piracicaba", uf: "SP", lat: -22.73, lng: -47.65, populacao: 415916, dentistas: 470, dentistas_por_hab: 885, score_oportunidade: 20, classificacao: "Saturado" },
  { cidade: "Franca", uf: "SP", lat: -20.54, lng: -47.40, populacao: 354753, dentistas: 390, dentistas_por_hab: 909, score_oportunidade: 22, classificacao: "Saturado" },
  { cidade: "Americana", uf: "SP", lat: -22.74, lng: -47.33, populacao: 248988, dentistas: 270, dentistas_por_hab: 922, score_oportunidade: 22, classificacao: "Saturado" },
  { cidade: "Presidente Prudente", uf: "SP", lat: -22.13, lng: -51.39, populacao: 235736, dentistas: 250, dentistas_por_hab: 943, score_oportunidade: 25, classificacao: "Saturado" },
  { cidade: "Taubaté", uf: "SP", lat: -23.02, lng: -45.56, populacao: 321000, dentistas: 350, dentistas_por_hab: 917, score_oportunidade: 22, classificacao: "Saturado" },
  { cidade: "Marília", uf: "SP", lat: -22.22, lng: -49.95, populacao: 240421, dentistas: 260, dentistas_por_hab: 925, score_oportunidade: 22, classificacao: "Saturado" },
  { cidade: "Araçatuba", uf: "SP", lat: -21.21, lng: -50.43, populacao: 202254, dentistas: 220, dentistas_por_hab: 920, score_oportunidade: 22, classificacao: "Saturado" },
  { cidade: "Araraquara", uf: "SP", lat: -21.79, lng: -48.18, populacao: 244672, dentistas: 270, dentistas_por_hab: 906, score_oportunidade: 22, classificacao: "Saturado" },
  { cidade: "Carapicuíba", uf: "SP", lat: -23.52, lng: -46.84, populacao: 393561, dentistas: 420, dentistas_por_hab: 937, score_oportunidade: 22, classificacao: "Saturado" },
  { cidade: "Limeira", uf: "SP", lat: -22.56, lng: -47.40, populacao: 316682, dentistas: 340, dentistas_por_hab: 931, score_oportunidade: 22, classificacao: "Saturado" },
  // Rio de Janeiro
  { cidade: "Rio de Janeiro", uf: "RJ", lat: -22.91, lng: -43.17, populacao: 6748000, dentistas: 8200, dentistas_por_hab: 823, score_oportunidade: 22, classificacao: "Saturado" },
  { cidade: "São Gonçalo", uf: "RJ", lat: -22.83, lng: -43.06, populacao: 1082991, dentistas: 820, dentistas_por_hab: 1320, score_oportunidade: 35, classificacao: "Moderado" },
  { cidade: "Duque de Caxias", uf: "RJ", lat: -22.79, lng: -43.31, populacao: 924624, dentistas: 680, dentistas_por_hab: 1360, score_oportunidade: 35, classificacao: "Moderado" },
  { cidade: "Nova Iguaçu", uf: "RJ", lat: -22.76, lng: -43.45, populacao: 821128, dentistas: 600, dentistas_por_hab: 1369, score_oportunidade: 36, classificacao: "Moderado" },
  { cidade: "Niterói", uf: "RJ", lat: -22.88, lng: -43.10, populacao: 513584, dentistas: 620, dentistas_por_hab: 829, score_oportunidade: 22, classificacao: "Saturado" },
  { cidade: "Belford Roxo", uf: "RJ", lat: -22.77, lng: -43.40, populacao: 479386, dentistas: 350, dentistas_por_hab: 1370, score_oportunidade: 38, classificacao: "Moderado" },
  { cidade: "Campos dos Goytacazes", uf: "RJ", lat: -21.76, lng: -41.30, populacao: 510269, dentistas: 420, dentistas_por_hab: 1215, score_oportunidade: 38, classificacao: "Moderado" },
  { cidade: "Petrópolis", uf: "RJ", lat: -22.51, lng: -43.18, populacao: 310189, dentistas: 280, dentistas_por_hab: 1108, score_oportunidade: 32, classificacao: "Saturado" },
  { cidade: "Volta Redonda", uf: "RJ", lat: -22.52, lng: -44.10, populacao: 271689, dentistas: 240, dentistas_por_hab: 1132, score_oportunidade: 30, classificacao: "Saturado" },
  { cidade: "Macaé", uf: "RJ", lat: -22.37, lng: -41.79, populacao: 251978, dentistas: 210, dentistas_por_hab: 1200, score_oportunidade: 35, classificacao: "Moderado" },
  // Minas Gerais
  { cidade: "Belo Horizonte", uf: "MG", lat: -19.92, lng: -43.94, populacao: 2521564, dentistas: 2850, dentistas_por_hab: 885, score_oportunidade: 28, classificacao: "Saturado" },
  { cidade: "Contagem", uf: "MG", lat: -19.93, lng: -44.05, populacao: 668760, dentistas: 620, dentistas_por_hab: 1079, score_oportunidade: 30, classificacao: "Saturado" },
  { cidade: "Uberlândia", uf: "MG", lat: -18.92, lng: -48.28, populacao: 706597, dentistas: 620, dentistas_por_hab: 1140, score_oportunidade: 35, classificacao: "Moderado" },
  { cidade: "Juiz de Fora", uf: "MG", lat: -21.76, lng: -43.35, populacao: 568873, dentistas: 510, dentistas_por_hab: 1115, score_oportunidade: 30, classificacao: "Saturado" },
  { cidade: "Betim", uf: "MG", lat: -19.97, lng: -44.20, populacao: 460275, dentistas: 380, dentistas_por_hab: 1211, score_oportunidade: 35, classificacao: "Moderado" },
  { cidade: "Montes Claros", uf: "MG", lat: -16.74, lng: -43.86, populacao: 413487, dentistas: 280, dentistas_por_hab: 1477, score_oportunidade: 55, classificacao: "Moderado" },
  { cidade: "Ipatinga", uf: "MG", lat: -19.47, lng: -42.54, populacao: 265539, dentistas: 195, dentistas_por_hab: 1362, score_oportunidade: 40, classificacao: "Moderado" },
  { cidade: "Uberaba", uf: "MG", lat: -19.75, lng: -47.93, populacao: 344187, dentistas: 260, dentistas_por_hab: 1324, score_oportunidade: 38, classificacao: "Moderado" },
  { cidade: "Governador Valadares", uf: "MG", lat: -18.85, lng: -41.95, populacao: 281046, dentistas: 195, dentistas_por_hab: 1441, score_oportunidade: 45, classificacao: "Moderado" },
  { cidade: "Divinópolis", uf: "MG", lat: -20.14, lng: -44.88, populacao: 241282, dentistas: 175, dentistas_por_hab: 1379, score_oportunidade: 42, classificacao: "Moderado" },
  { cidade: "Sete Lagoas", uf: "MG", lat: -19.47, lng: -44.25, populacao: 248513, dentistas: 178, dentistas_por_hab: 1396, score_oportunidade: 42, classificacao: "Moderado" },
  { cidade: "Ribeirão das Neves", uf: "MG", lat: -19.77, lng: -44.09, populacao: 338380, dentistas: 165, dentistas_por_hab: 2051, score_oportunidade: 55, classificacao: "Moderado" },
  { cidade: "Teófilo Otoni", uf: "MG", lat: -17.86, lng: -41.51, populacao: 143633, dentistas: 72, dentistas_por_hab: 1995, score_oportunidade: 58, classificacao: "Moderado" },
  { cidade: "Patos de Minas", uf: "MG", lat: -18.58, lng: -46.52, populacao: 156562, dentistas: 98, dentistas_por_hab: 1598, score_oportunidade: 52, classificacao: "Moderado" },
  // Espírito Santo
  { cidade: "Vitória", uf: "ES", lat: -20.32, lng: -40.34, populacao: 365855, dentistas: 520, dentistas_por_hab: 703, score_oportunidade: 20, classificacao: "Saturado" },
  { cidade: "Serra", uf: "ES", lat: -20.13, lng: -40.31, populacao: 534479, dentistas: 390, dentistas_por_hab: 1371, score_oportunidade: 38, classificacao: "Moderado" },
  { cidade: "Vila Velha", uf: "ES", lat: -20.33, lng: -40.29, populacao: 501325, dentistas: 360, dentistas_por_hab: 1393, score_oportunidade: 38, classificacao: "Moderado" },
  { cidade: "Cariacica", uf: "ES", lat: -20.27, lng: -40.42, populacao: 397249, dentistas: 270, dentistas_por_hab: 1471, score_oportunidade: 42, classificacao: "Moderado" },
  { cidade: "Cachoeiro de Itapemirim", uf: "ES", lat: -20.85, lng: -41.11, populacao: 222145, dentistas: 145, dentistas_por_hab: 1532, score_oportunidade: 45, classificacao: "Moderado" },
  { cidade: "Linhares", uf: "ES", lat: -19.39, lng: -40.07, populacao: 179627, dentistas: 105, dentistas_por_hab: 1711, score_oportunidade: 50, classificacao: "Moderado" },
  { cidade: "São Mateus", uf: "ES", lat: -18.72, lng: -39.86, populacao: 131900, dentistas: 68, dentistas_por_hab: 1940, score_oportunidade: 56, classificacao: "Moderado" },

  // ─── SUL ──────────────────────────────────────────────────────────────────
  // Paraná
  { cidade: "Curitiba", uf: "PR", lat: -25.43, lng: -49.27, populacao: 1963726, dentistas: 1680, dentistas_por_hab: 1169, score_oportunidade: 35, classificacao: "Saturado" },
  { cidade: "Londrina", uf: "PR", lat: -23.31, lng: -51.16, populacao: 575377, dentistas: 480, dentistas_por_hab: 1199, score_oportunidade: 38, classificacao: "Moderado" },
  { cidade: "Maringá", uf: "PR", lat: -23.42, lng: -51.94, populacao: 430157, dentistas: 420, dentistas_por_hab: 1024, score_oportunidade: 32, classificacao: "Saturado" },
  { cidade: "Ponta Grossa", uf: "PR", lat: -25.10, lng: -50.16, populacao: 353997, dentistas: 290, dentistas_por_hab: 1221, score_oportunidade: 35, classificacao: "Moderado" },
  { cidade: "Cascavel", uf: "PR", lat: -24.96, lng: -53.46, populacao: 340304, dentistas: 275, dentistas_por_hab: 1237, score_oportunidade: 36, classificacao: "Moderado" },
  { cidade: "São José dos Pinhais", uf: "PR", lat: -25.53, lng: -49.21, populacao: 342985, dentistas: 270, dentistas_por_hab: 1270, score_oportunidade: 36, classificacao: "Moderado" },
  { cidade: "Foz do Iguaçu", uf: "PR", lat: -25.52, lng: -54.59, populacao: 258823, dentistas: 195, dentistas_por_hab: 1327, score_oportunidade: 38, classificacao: "Moderado" },
  { cidade: "Colombo", uf: "PR", lat: -25.29, lng: -49.22, populacao: 247012, dentistas: 180, dentistas_por_hab: 1372, score_oportunidade: 40, classificacao: "Moderado" },
  { cidade: "Guarapuava", uf: "PR", lat: -25.39, lng: -51.46, populacao: 186867, dentistas: 140, dentistas_por_hab: 1335, score_oportunidade: 40, classificacao: "Moderado" },
  { cidade: "Apucarana", uf: "PR", lat: -23.55, lng: -51.46, populacao: 135347, dentistas: 100, dentistas_por_hab: 1354, score_oportunidade: 40, classificacao: "Moderado" },
  // Santa Catarina
  { cidade: "Joinville", uf: "SC", lat: -26.30, lng: -48.85, populacao: 604526, dentistas: 480, dentistas_por_hab: 1259, score_oportunidade: 38, classificacao: "Moderado" },
  { cidade: "Florianópolis", uf: "SC", lat: -27.60, lng: -48.55, populacao: 516524, dentistas: 620, dentistas_por_hab: 833, score_oportunidade: 25, classificacao: "Saturado" },
  { cidade: "Blumenau", uf: "SC", lat: -26.92, lng: -49.07, populacao: 361855, dentistas: 280, dentistas_por_hab: 1292, score_oportunidade: 36, classificacao: "Moderado" },
  { cidade: "São José", uf: "SC", lat: -27.59, lng: -48.64, populacao: 247482, dentistas: 185, dentistas_por_hab: 1338, score_oportunidade: 38, classificacao: "Moderado" },
  { cidade: "Criciúma", uf: "SC", lat: -28.68, lng: -49.37, populacao: 217315, dentistas: 160, dentistas_por_hab: 1358, score_oportunidade: 38, classificacao: "Moderado" },
  { cidade: "Chapecó", uf: "SC", lat: -27.10, lng: -52.62, populacao: 228401, dentistas: 168, dentistas_por_hab: 1360, score_oportunidade: 40, classificacao: "Moderado" },
  { cidade: "Itajaí", uf: "SC", lat: -26.91, lng: -48.66, populacao: 231861, dentistas: 175, dentistas_por_hab: 1325, score_oportunidade: 38, classificacao: "Moderado" },
  { cidade: "Lages", uf: "SC", lat: -27.81, lng: -50.33, populacao: 161127, dentistas: 110, dentistas_por_hab: 1465, score_oportunidade: 42, classificacao: "Moderado" },
  { cidade: "Palhoça", uf: "SC", lat: -27.64, lng: -48.67, populacao: 194576, dentistas: 138, dentistas_por_hab: 1410, score_oportunidade: 40, classificacao: "Moderado" },
  // Rio Grande do Sul
  { cidade: "Porto Alegre", uf: "RS", lat: -30.03, lng: -51.23, populacao: 1492000, dentistas: 1500, dentistas_por_hab: 995, score_oportunidade: 30, classificacao: "Saturado" },
  { cidade: "Caxias do Sul", uf: "RS", lat: -29.17, lng: -51.18, populacao: 517451, dentistas: 380, dentistas_por_hab: 1362, score_oportunidade: 40, classificacao: "Moderado" },
  { cidade: "Canoas", uf: "RS", lat: -29.92, lng: -51.18, populacao: 348698, dentistas: 260, dentistas_por_hab: 1341, score_oportunidade: 38, classificacao: "Moderado" },
  { cidade: "Pelotas", uf: "RS", lat: -31.77, lng: -52.34, populacao: 343558, dentistas: 250, dentistas_por_hab: 1374, score_oportunidade: 40, classificacao: "Moderado" },
  { cidade: "Santa Maria", uf: "RS", lat: -29.69, lng: -53.81, populacao: 284613, dentistas: 205, dentistas_por_hab: 1388, score_oportunidade: 40, classificacao: "Moderado" },
  { cidade: "Novo Hamburgo", uf: "RS", lat: -29.68, lng: -51.13, populacao: 248862, dentistas: 178, dentistas_por_hab: 1398, score_oportunidade: 40, classificacao: "Moderado" },
  { cidade: "São Leopoldo", uf: "RS", lat: -29.76, lng: -51.15, populacao: 233770, dentistas: 168, dentistas_por_hab: 1392, score_oportunidade: 40, classificacao: "Moderado" },
  { cidade: "Gravataí", uf: "RS", lat: -29.94, lng: -50.99, populacao: 279765, dentistas: 195, dentistas_por_hab: 1434, score_oportunidade: 42, classificacao: "Moderado" },
  { cidade: "Viamão", uf: "RS", lat: -30.08, lng: -51.02, populacao: 257702, dentistas: 168, dentistas_por_hab: 1534, score_oportunidade: 44, classificacao: "Moderado" },
  { cidade: "Passo Fundo", uf: "RS", lat: -28.26, lng: -52.41, populacao: 207234, dentistas: 148, dentistas_por_hab: 1400, score_oportunidade: 40, classificacao: "Moderado" },
  { cidade: "Bagé", uf: "RS", lat: -31.33, lng: -54.10, populacao: 118348, dentistas: 78, dentistas_por_hab: 1517, score_oportunidade: 46, classificacao: "Moderado" },

  // ─── CENTRO-OESTE ─────────────────────────────────────────────────────────
  // Goiás
  { cidade: "Goiânia", uf: "GO", lat: -16.69, lng: -49.25, populacao: 1555626, dentistas: 1120, dentistas_por_hab: 1389, score_oportunidade: 42, classificacao: "Moderado" },
  { cidade: "Aparecida de Goiânia", uf: "GO", lat: -16.82, lng: -49.24, populacao: 590076, dentistas: 380, dentistas_por_hab: 1553, score_oportunidade: 48, classificacao: "Moderado" },
  { cidade: "Anápolis", uf: "GO", lat: -16.33, lng: -48.95, populacao: 391772, dentistas: 280, dentistas_por_hab: 1399, score_oportunidade: 45, classificacao: "Moderado" },
  { cidade: "Rio Verde", uf: "GO", lat: -17.80, lng: -50.92, populacao: 246780, dentistas: 148, dentistas_por_hab: 1667, score_oportunidade: 52, classificacao: "Moderado" },
  { cidade: "Luziânia", uf: "GO", lat: -16.25, lng: -47.95, populacao: 219343, dentistas: 105, dentistas_por_hab: 2089, score_oportunidade: 58, classificacao: "Moderado" },
  { cidade: "Valparaíso de Goiás", uf: "GO", lat: -16.07, lng: -47.98, populacao: 178478, dentistas: 82, dentistas_por_hab: 2176, score_oportunidade: 58, classificacao: "Moderado" },
  { cidade: "Catalão", uf: "GO", lat: -18.17, lng: -47.95, populacao: 102936, dentistas: 52, dentistas_por_hab: 1979, score_oportunidade: 55, classificacao: "Moderado" },
  // Distrito Federal
  { cidade: "Brasília", uf: "DF", lat: -15.79, lng: -47.88, populacao: 3094325, dentistas: 2400, dentistas_por_hab: 1289, score_oportunidade: 30, classificacao: "Saturado" },
  // Mato Grosso
  { cidade: "Cuiabá", uf: "MT", lat: -15.60, lng: -56.10, populacao: 618124, dentistas: 520, dentistas_por_hab: 1189, score_oportunidade: 38, classificacao: "Moderado" },
  { cidade: "Várzea Grande", uf: "MT", lat: -15.65, lng: -56.13, populacao: 293805, dentistas: 165, dentistas_por_hab: 1781, score_oportunidade: 52, classificacao: "Moderado" },
  { cidade: "Rondonópolis", uf: "MT", lat: -16.47, lng: -54.64, populacao: 236042, dentistas: 132, dentistas_por_hab: 1788, score_oportunidade: 64, classificacao: "Bom" },
  { cidade: "Sinop", uf: "MT", lat: -11.86, lng: -55.51, populacao: 146005, dentistas: 78, dentistas_por_hab: 1872, score_oportunidade: 67, classificacao: "Bom" },
  { cidade: "Tangará da Serra", uf: "MT", lat: -14.62, lng: -57.49, populacao: 103736, dentistas: 52, dentistas_por_hab: 1995, score_oportunidade: 60, classificacao: "Moderado" },
  { cidade: "Sorriso", uf: "MT", lat: -12.55, lng: -55.71, populacao: 90988, dentistas: 48, dentistas_por_hab: 1896, score_oportunidade: 62, classificacao: "Bom" },
  { cidade: "Lucas do Rio Verde", uf: "MT", lat: -13.06, lng: -55.91, populacao: 72050, dentistas: 36, dentistas_por_hab: 2001, score_oportunidade: 63, classificacao: "Bom" },
  { cidade: "Alta Floresta", uf: "MT", lat: -9.88, lng: -56.09, populacao: 52274, dentistas: 22, dentistas_por_hab: 2376, score_oportunidade: 68, classificacao: "Bom" },
  // Mato Grosso do Sul
  { cidade: "Campo Grande", uf: "MS", lat: -20.44, lng: -54.65, populacao: 906092, dentistas: 680, dentistas_por_hab: 1332, score_oportunidade: 40, classificacao: "Moderado" },
  { cidade: "Dourados", uf: "MS", lat: -22.22, lng: -54.81, populacao: 225495, dentistas: 165, dentistas_por_hab: 1367, score_oportunidade: 48, classificacao: "Moderado" },
  { cidade: "Três Lagoas", uf: "MS", lat: -20.79, lng: -51.70, populacao: 127576, dentistas: 68, dentistas_por_hab: 1876, score_oportunidade: 55, classificacao: "Moderado" },
  { cidade: "Corumbá", uf: "MS", lat: -19.01, lng: -57.65, populacao: 113208, dentistas: 55, dentistas_por_hab: 2058, score_oportunidade: 58, classificacao: "Moderado" },
  { cidade: "Naviraí", uf: "MS", lat: -23.06, lng: -54.19, populacao: 53113, dentistas: 28, dentistas_por_hab: 1897, score_oportunidade: 55, classificacao: "Moderado" },
  { cidade: "Ponta Porã", uf: "MS", lat: -22.53, lng: -55.73, populacao: 92369, dentistas: 45, dentistas_por_hab: 2053, score_oportunidade: 58, classificacao: "Moderado" },
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
  // DE classifications
  Oportunidade: "#22c55e",
  Normal: "#84cc16",
  Adequado: "#eab308",
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
