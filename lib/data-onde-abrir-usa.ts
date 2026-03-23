// =============================================================================
// OdontoData — Where to Open: USA Location Intelligence (static fallback)
// Sources: ADA Health Policy Institute 2023, HRSA HPSA data 2023,
//          ACS Census 2022, CMS Medicaid data, BLS OES 2023,
//          CODA dental school enrollment, CoStar commercial RE index
// =============================================================================

export interface ScoreEstadoUSA {
  uf: string;
  estado: string;
  regiao: "South" | "Midwest" | "West" | "Northeast";
  populacao: number;
  dentistas_total: number;
  dentistas_por_100k: number;        // dentists per 100k population
  mediana_renda: number;             // median household income (USD/yr)
  crescimento_pop_pct: number;       // 5-year population growth %
  hpsa_count: number;                // dental HPSA designations (HRSA)
  pct_sem_seguro_dental: number;     // % adults without dental insurance
  medicaid_idx: number;              // Medicaid reimbursement index 0-100
  penetracao_dso: number;            // DSO market penetration %
  dental_grads_ano: number;          // dental graduates/yr from in-state schools
  custo_aluguel_idx: number;         // commercial rent index (100 = national avg)
  score_oportunidade: number;        // composite opportunity score 0-100
  classificacao: "Excellent" | "Very Good" | "Good" | "Moderate" | "Saturated";
  fatores_positivos: string[];
  fatores_negativos: string[];
  melhor_cidade: string;
  pior_cidade: string;
  atualizado_em?: string;
}

export interface SaturacaoEspecialidadeUSA {
  especialidade: string;
  media_nacional_por_100k: number;
  top5_saturadas: { cidade: string; valor: number }[];
  top5_oportunidades: { cidade: string; valor: number }[];
  tendencia: "Saturating" | "Stable" | "Opportunity";
  salario_medio_anual: number;
  crescimento_emprego_pct: number;
  seguro_cobre: boolean;
}

export interface CustoPorRegiaoUSA {
  regiao: string;
  startup_min: number;
  startup_max: number;
  aluguel_mensal: number;
  receita_media_anual: number;
  honorario_medio_visita: number;
  pacientes_break_even_dia: number;
  retorno_investimento_anos: number;
  equipamento_medio: number;
}

// ─── SCORING METHODOLOGY ─────────────────────────────────────────────────────

export const criteriosPesoUSA = {
  workforce_shortage: 25,
  insurance_access: 20,
  economic_potential: 20,
  market_growth: 15,
  business_environment: 10,
  dso_competition: 10,
};

// ─── DYNAMIC SCORE COMPUTATION ───────────────────────────────────────────────

export function computeScoreUSA(s: {
  dentistas_por_100k: number;
  pct_sem_seguro_dental: number;
  mediana_renda: number;
  crescimento_pop_pct: number;
  hpsa_count: number;
  medicaid_idx: number;
  penetracao_dso: number;
  custo_aluguel_idx: number;
}): number {
  // Workforce shortage (25%) — fewer dentists/100k = higher score
  const workforce = Math.max(0, Math.min(100, ((90 - s.dentistas_por_100k) / 80) * 100 + (s.hpsa_count / 3)));

  // Insurance accessibility (20%) — higher uninsured + better Medicaid = opportunity
  const insurance = (s.pct_sem_seguro_dental / 80) * 55 + (s.medicaid_idx / 100) * 45;

  // Economic potential (20%) — sweet spot $50k–$75k; too low = payment risk
  const r = s.mediana_renda / 1000;
  const economic = r < 45 ? 38 : r < 55 ? 60 : r <= 75 ? 80 : r <= 90 ? 60 : 42;

  // Market growth (15%) — positive pop growth = more demand
  const growth = Math.max(0, Math.min(100, (s.crescimento_pop_pct + 2) * 6));

  // Business environment (10%) — lower rent = better for margin
  const business = Math.max(0, Math.min(100, ((180 - s.custo_aluguel_idx) / 130) * 100));

  // DSO competition (10%) — lower DSO share = better for independent practice
  const dso = Math.max(0, Math.min(100, ((40 - s.penetracao_dso) / 35) * 100));

  return Math.round(
    workforce * 0.25 +
    insurance * 0.20 +
    economic  * 0.20 +
    growth    * 0.15 +
    business  * 0.10 +
    dso       * 0.10
  );
}

// Returns each dimension's score (0-100) for radar/spider chart
export function computeDimensoesUSA(s: Parameters<typeof computeScoreUSA>[0]): {
  workforce: number; insurance: number; economic: number;
  growth: number; business: number; dso: number;
} {
  const workforce = Math.round(Math.max(0, Math.min(100, ((90 - s.dentistas_por_100k) / 80) * 100 + (s.hpsa_count / 3))));
  const insurance = Math.round((s.pct_sem_seguro_dental / 80) * 55 + (s.medicaid_idx / 100) * 45);
  const r = s.mediana_renda / 1000;
  const economic = r < 45 ? 38 : r < 55 ? 60 : r <= 75 ? 80 : r <= 90 ? 60 : 42;
  const growth = Math.round(Math.max(0, Math.min(100, (s.crescimento_pop_pct + 2) * 6)));
  const business = Math.round(Math.max(0, Math.min(100, ((180 - s.custo_aluguel_idx) / 130) * 100)));
  const dso = Math.round(Math.max(0, Math.min(100, ((40 - s.penetracao_dso) / 35) * 100)));
  return { workforce, insurance, economic, growth, business, dso };
}

export function classificarScoreUSA(s: number): ScoreEstadoUSA["classificacao"] {
  if (s >= 80) return "Excellent";
  if (s >= 65) return "Very Good";
  if (s >= 50) return "Good";
  if (s >= 35) return "Moderate";
  return "Saturated";
}

// ─── CITY-LEVEL SCORING ─────────────────────────────────────────────────────
// Adapted from state-level formula for individual cities.
// Uses data from Census (pop, income), NPPES (dentists), HRSA (HPSA).

export interface CidadeScoreInput {
  dentistas_por_100k: number;      // from NPPES count / census pop
  mediana_renda: number;           // from Census ACS
  hpsa: boolean;                   // from HRSA
  penetracao_dso: number;          // from state-level (no city-level DSO data yet)
  crescimento_pop_pct: number;     // from Census 2 vintages
  populacao: number;               // from Census ACS
}

export function computeScoreCidadeUSA(c: CidadeScoreInput): number {
  // Workforce shortage (30%) — fewer dentists = higher opportunity
  // National avg ~61/100k. Below 40 = very underserved, above 80 = saturated.
  let workforce = Math.max(0, Math.min(100, ((85 - c.dentistas_por_100k) / 70) * 100));
  if (c.hpsa) workforce = Math.min(100, workforce + 15); // HPSA bonus

  // Economic potential (25%) — sweet spot $40k–$75k
  const r = c.mediana_renda / 1000;
  const economic = r < 30 ? 30 : r < 45 ? 55 : r < 55 ? 70 : r <= 75 ? 80 : r <= 90 ? 60 : 40;

  // Market growth (20%) — population growth drives demand
  const growth = Math.max(0, Math.min(100, (c.crescimento_pop_pct + 2) * 8));

  // DSO competition (15%) — lower DSO = better for independents
  const dso = Math.max(0, Math.min(100, ((40 - c.penetracao_dso) / 35) * 100));

  // Market size (10%) — sweet spot 30k–200k pop
  // Too small = limited patient base, too large = competitive
  const p = c.populacao;
  const size = p < 10000 ? 40 : p < 30000 ? 60 : p < 100000 ? 80 : p < 200000 ? 70 : p < 500000 ? 50 : 35;

  const score = Math.round(
    workforce * 0.30 +
    economic  * 0.25 +
    growth    * 0.20 +
    dso       * 0.15 +
    size      * 0.10
  );

  return Math.max(5, Math.min(95, score));
}

/**
 * Generate an auto-description for a city based on its data.
 */
export function generateCidadeNota(c: {
  nome: string;
  tipo: string;
  populacao: number;
  dentistas_por_100k: number;
  mediana_renda: number;
  hpsa: boolean;
  crescimento_pop_pct: number;
  penetracao_dso: number;
  score_oportunidade: number;
}): string {
  const parts: string[] = [];

  // HPSA
  if (c.hpsa) parts.push("HPSA designated — dental shortage area");

  // Dentist density
  if (c.dentistas_por_100k < 30) parts.push("severe dentist shortage");
  else if (c.dentistas_por_100k < 45) parts.push("underserved area");
  else if (c.dentistas_por_100k > 80) parts.push("high dentist density");

  // Growth
  if (c.crescimento_pop_pct >= 3) parts.push("rapid population growth");
  else if (c.crescimento_pop_pct >= 1) parts.push("growing market");
  else if (c.crescimento_pop_pct <= -1) parts.push("declining population");

  // Income
  const r = c.mediana_renda / 1000;
  if (r >= 75) parts.push("high-income market");
  else if (r < 35) parts.push("low-income area");

  // DSO
  if (c.penetracao_dso <= 10) parts.push("low DSO competition");
  else if (c.penetracao_dso >= 28) parts.push("high DSO presence");

  // Score summary
  if (c.score_oportunidade >= 75) parts.push("excellent opportunity");
  else if (c.score_oportunidade >= 60) parts.push("good opportunity");
  else if (c.score_oportunidade < 40) parts.push("competitive market");

  return parts.length > 0
    ? parts.join("; ").replace(/^./, (s) => s.toUpperCase())
    : `${c.tipo} area with score ${c.score_oportunidade}`;
}

// Most needed specialties by city profile
export function inferEspecialidade(c: {
  tipo: string;
  populacao: number;
  dentistas_por_100k: number;
  mediana_renda: number;
}): string {
  if (c.dentistas_por_100k < 30) return "Clínica Geral";
  if (c.tipo === "Rural") return "Clínica Geral";
  if (c.tipo === "College Town") return "Ortodontia";
  if (c.mediana_renda >= 75000) return "Implantodontia";
  if (c.populacao >= 200000 && c.dentistas_por_100k >= 60) return "Periodontia";
  if (c.populacao < 50000) return "Odontopediatria";
  return "Endodontia";
}

// ─── NATIONAL INDICATORS ─────────────────────────────────────────────────────

export const indicadoresOndeAbrirUSA = {
  populacaoDesassistida_mi: "68.5",
  scoreMedioNacional: 51,
  estadosOportunidade: 22,
  estadoMaisOportunidades: "MS",
  especialidadeMaisCarente: "Pediatric Dentistry",
  scoreMáximoEncontrado: 91,
  pipelineFormandosAno: 6800,
  totalDentistas: 201900,
  ratioDentistaPop100k: 61,
  hpsaDesignacoesNacionais: 6800,
  pctSemSeguroDental: 74,
  dsoParticipacao: 28,
};

// ─── STATE OPPORTUNITY DATA ───────────────────────────────────────────────────

export const scoreEstadosUSA: ScoreEstadoUSA[] = [
  // ── EXCELLENT (80-100) ────────────────────────────────────────────────────
  { uf:"MS", estado:"Mississippi",     regiao:"South",     populacao:2961279,  dentistas_total:1800,  dentistas_por_100k:61,  mediana_renda:46637, crescimento_pop_pct:-1.5, hpsa_count:85, pct_sem_seguro_dental:79, medicaid_idx:45, penetracao_dso:12, dental_grads_ano:120, custo_aluguel_idx:62,  score_oportunidade:91, classificacao:"Excellent", fatores_positivos:["Highest workforce shortage in US","85 HPSA designations","Lowest DSO penetration","Low startup costs","Large Medicaid population"], fatores_negativos:["Lowest state income","Negative pop growth","Low Medicaid reimbursement"], melhor_cidade:"Tupelo",       pior_cidade:"Jackson" },
  { uf:"AL", estado:"Alabama",         regiao:"South",     populacao:5024279,  dentistas_total:2800,  dentistas_por_100k:56,  mediana_renda:54943, crescimento_pop_pct:0.5,  hpsa_count:78, pct_sem_seguro_dental:76, medicaid_idx:50, penetracao_dso:14, dental_grads_ano:120, custo_aluguel_idx:65,  score_oportunidade:88, classificacao:"Excellent", fatores_positivos:["Lowest dentist ratio in US","78 HPSA designations","Low commercial rents","Growing rural markets","BMW/Toyota corridor"], fatores_negativos:["Below-average income","Low Medicaid reimbursement","Limited specialist network"], melhor_cidade:"Huntsville",    pior_cidade:"Birmingham" },
  { uf:"AR", estado:"Arkansas",        regiao:"South",     populacao:3011524,  dentistas_total:1900,  dentistas_por_100k:63,  mediana_renda:49228, crescimento_pop_pct:1.2,  hpsa_count:68, pct_sem_seguro_dental:77, medicaid_idx:48, penetracao_dso:15, dental_grads_ano:60,  custo_aluguel_idx:63,  score_oportunidade:85, classificacao:"Excellent", fatores_positivos:["High workforce shortage","68 HPSA designations","Low competition","Positive pop growth","Very low startup costs"], fatores_negativos:["Low income market","Limited dental lab infra","Rural geography challenges"], melhor_cidade:"Fayetteville", pior_cidade:"Little Rock" },
  { uf:"WV", estado:"West Virginia",   regiao:"South",     populacao:1793716,  dentistas_total:1500,  dentistas_por_100k:84,  mediana_renda:48037, crescimento_pop_pct:-2.1, hpsa_count:65, pct_sem_seguro_dental:75, medicaid_idx:72, penetracao_dso:11, dental_grads_ano:40,  custo_aluguel_idx:60,  score_oportunidade:83, classificacao:"Excellent", fatores_positivos:["High HPSA per capita","Good Medicaid reimbursement","Very low competition","Lowest commercial rents","NHSC loan repayment eligible"], fatores_negativos:["Declining population","Aging demographics","Economic transition"], melhor_cidade:"Morgantown",   pior_cidade:"Charleston" },
  { uf:"LA", estado:"Louisiana",       regiao:"South",     populacao:4657757,  dentistas_total:3200,  dentistas_por_100k:69,  mediana_renda:52087, crescimento_pop_pct:0.3,  hpsa_count:72, pct_sem_seguro_dental:78, medicaid_idx:52, penetracao_dso:16, dental_grads_ano:140, custo_aluguel_idx:68,  score_oportunidade:81, classificacao:"Excellent", fatores_positivos:["72 HPSA designations","Strong oil/gas corridors","Low DSO penetration","Large underserved pop","Affordable real estate"], fatores_negativos:["Hurricane risk","Below-average income","New Orleans competitive"], melhor_cidade:"Shreveport",   pior_cidade:"New Orleans" },
  // ── VERY GOOD (65-79) ─────────────────────────────────────────────────────
  { uf:"KY", estado:"Kentucky",        regiao:"South",     populacao:4505836,  dentistas_total:3100,  dentistas_por_100k:69,  mediana_renda:55629, crescimento_pop_pct:1.0,  hpsa_count:70, pct_sem_seguro_dental:74, medicaid_idx:68, penetracao_dso:18, dental_grads_ano:100, custo_aluguel_idx:65,  score_oportunidade:79, classificacao:"Very Good", fatores_positivos:["Good Medicaid reimbursement","70 HPSA areas","Amazon/Toyota employment growth","Rural opportunity","Low costs"], fatores_negativos:["Appalachian challenges","Low income eastern counties","Higher default rates"], melhor_cidade:"Lexington",    pior_cidade:"Louisville" },
  { uf:"OK", estado:"Oklahoma",        regiao:"South",     populacao:3959353,  dentistas_total:2900,  dentistas_por_100k:73,  mediana_renda:54449, crescimento_pop_pct:1.8,  hpsa_count:63, pct_sem_seguro_dental:76, medicaid_idx:42, penetracao_dso:17, dental_grads_ano:80,  custo_aluguel_idx:67,  score_oportunidade:77, classificacao:"Very Good", fatores_positivos:["Good pop growth","63 HPSA designations","Energy sector employment","Low commercial rents","Low DSO penetration"], fatores_negativos:["Low Medicaid reimbursement","OKC market competitive","High uninsured rate"], melhor_cidade:"Tulsa",         pior_cidade:"Oklahoma City" },
  { uf:"TN", estado:"Tennessee",       regiao:"South",     populacao:6910840,  dentistas_total:5300,  dentistas_por_100k:77,  mediana_renda:57581, crescimento_pop_pct:4.2,  hpsa_count:58, pct_sem_seguro_dental:74, medicaid_idx:55, penetracao_dso:22, dental_grads_ano:160, custo_aluguel_idx:75,  score_oportunidade:74, classificacao:"Very Good", fatores_positivos:["Fast pop growth","Strong economy","58 HPSA designations","Affordable costs","Nashville healthcare hub"], fatores_negativos:["Growing DSO presence","Nashville competitive","Urban-rural divide"], melhor_cidade:"Clarksville",  pior_cidade:"Nashville" },
  { uf:"GA", estado:"Georgia",         regiao:"South",     populacao:10711908, dentistas_total:7500,  dentistas_por_100k:70,  mediana_renda:61224, crescimento_pop_pct:5.8,  hpsa_count:68, pct_sem_seguro_dental:75, medicaid_idx:48, penetracao_dso:25, dental_grads_ano:200, custo_aluguel_idx:85,  score_oportunidade:72, classificacao:"Very Good", fatores_positivos:["Fastest growing major state","68 HPSA designations","Strong tech sector","Large underserved rural areas","Metro suburban pockets"], fatores_negativos:["Atlanta metro highly competitive","Growing DSO market","Low Medicaid reimbursement"], melhor_cidade:"Savannah",     pior_cidade:"Atlanta" },
  { uf:"TX", estado:"Texas",           regiao:"South",     populacao:29145505, dentistas_total:20500, dentistas_por_100k:70,  mediana_renda:63826, crescimento_pop_pct:8.9,  hpsa_count:105,pct_sem_seguro_dental:77, medicaid_idx:40, penetracao_dso:28, dental_grads_ano:460, custo_aluguel_idx:85,  score_oportunidade:70, classificacao:"Very Good", fatores_positivos:["No state income tax","Massive market","Fastest growing state","105 HPSA designations — suburban/rural","Strong economy"], fatores_negativos:["Major cities saturated","High DSO penetration","Very low Medicaid","Large pipeline"], melhor_cidade:"El Paso",      pior_cidade:"Houston Medical Ctr" },
  { uf:"NV", estado:"Nevada",          regiao:"West",      populacao:3104614,  dentistas_total:2500,  dentistas_por_100k:81,  mediana_renda:63276, crescimento_pop_pct:9.5,  hpsa_count:32, pct_sem_seguro_dental:79, medicaid_idx:55, penetracao_dso:24, dental_grads_ano:0,   custo_aluguel_idx:88,  score_oportunidade:68, classificacao:"Very Good", fatores_positivos:["Fastest growing state","No state income tax","No in-state dental schools","Casino corridor workforce","High uninsured market"], fatores_negativos:["Las Vegas competitive","High uninsured rate","Tourism-dependent economy"], melhor_cidade:"Henderson",    pior_cidade:"Las Vegas Strip" },
  { uf:"SC", estado:"South Carolina",  regiao:"South",     populacao:5118425,  dentistas_total:3900,  dentistas_por_100k:76,  mediana_renda:57216, crescimento_pop_pct:7.4,  hpsa_count:52, pct_sem_seguro_dental:74, medicaid_idx:52, penetracao_dso:21, dental_grads_ano:80,  custo_aluguel_idx:75,  score_oportunidade:66, classificacao:"Very Good", fatores_positivos:["Strong retirement pop growth","7.4% pop growth","52 HPSA designations","BMW/Boeing manufacturing","Affordable costs"], fatores_negativos:["Coastal markets competitive","Low Medicaid reimbursement","Limited specialists"], melhor_cidade:"Greenville",   pior_cidade:"Charleston" },
  { uf:"IN", estado:"Indiana",         regiao:"Midwest",   populacao:6785528,  dentistas_total:4800,  dentistas_por_100k:71,  mediana_renda:58235, crescimento_pop_pct:1.5,  hpsa_count:55, pct_sem_seguro_dental:74, medicaid_idx:58, penetracao_dso:19, dental_grads_ano:100, custo_aluguel_idx:70,  score_oportunidade:65, classificacao:"Very Good", fatores_positivos:["Low commercial rents","55 HPSA designations","Stable manufacturing economy","Moderate DSO","Good Medicaid"], fatores_negativos:["Flat pop growth","Indianapolis saturated","Limited acquisition targets"], melhor_cidade:"Fort Wayne",   pior_cidade:"Indianapolis" },
  // ── GOOD (50-64) ──────────────────────────────────────────────────────────
  { uf:"DE", estado:"Delaware",        regiao:"South",     populacao:989948,   dentistas_total:700,   dentistas_por_100k:71,  mediana_renda:72234, crescimento_pop_pct:5.9,  hpsa_count:8,  pct_sem_seguro_dental:73, medicaid_idx:75, penetracao_dso:18, dental_grads_ano:0,   custo_aluguel_idx:80,  score_oportunidade:64, classificacao:"Good",     fatores_positivos:["No sales tax","5.9% pop growth","High Medicaid index","No in-state dental schools","High income corridor"], fatores_negativos:["Small total market","Only 8 HPSA","Near saturated DC/Philly markets"], melhor_cidade:"Dover",        pior_cidade:"Wilmington" },
  { uf:"NM", estado:"New Mexico",      regiao:"West",      populacao:2117522,  dentistas_total:1500,  dentistas_por_100k:71,  mediana_renda:51243, crescimento_pop_pct:0.8,  hpsa_count:48, pct_sem_seguro_dental:79, medicaid_idx:65, penetracao_dso:15, dental_grads_ano:0,   custo_aluguel_idx:72,  score_oportunidade:62, classificacao:"Good",     fatores_positivos:["48 HPSA designations","Good Medicaid","No in-state dental schools","Low DSO","Tribal reservation opportunities"], fatores_negativos:["Low income state","Flat pop growth","Small market"], melhor_cidade:"Rio Rancho",   pior_cidade:"Albuquerque" },
  { uf:"KS", estado:"Kansas",          regiao:"Midwest",   populacao:2937880,  dentistas_total:2300,  dentistas_por_100k:78,  mediana_renda:61091, crescimento_pop_pct:0.5,  hpsa_count:42, pct_sem_seguro_dental:73, medicaid_idx:55, penetracao_dso:16, dental_grads_ano:40,  custo_aluguel_idx:68,  score_oportunidade:60, classificacao:"Good",     fatores_positivos:["42 HPSA designations","Very low rents","Low DSO","Stable agricultural economy","Good Medicaid"], fatores_negativos:["Flat pop growth","Small market","Limited acquisition targets"], melhor_cidade:"Overland Park", pior_cidade:"Wichita" },
  { uf:"IA", estado:"Iowa",            regiao:"Midwest",   populacao:3190369,  dentistas_total:2500,  dentistas_por_100k:78,  mediana_renda:61691, crescimento_pop_pct:0.8,  hpsa_count:38, pct_sem_seguro_dental:72, medicaid_idx:62, penetracao_dso:17, dental_grads_ano:80,  custo_aluguel_idx:67,  score_oportunidade:59, classificacao:"Good",     fatores_positivos:["Good Medicaid reimbursement","38 HPSA designations","Stable economy","Low practice costs","Strong dental tradition"], fatores_negativos:["Aging/flat pop growth","Limited urban market","College town saturation"], melhor_cidade:"Cedar Rapids", pior_cidade:"Iowa City" },
  { uf:"NC", estado:"North Carolina",  regiao:"South",     populacao:10439388, dentistas_total:7800,  dentistas_por_100k:75,  mediana_renda:57341, crescimento_pop_pct:6.1,  hpsa_count:72, pct_sem_seguro_dental:74, medicaid_idx:55, penetracao_dso:24, dental_grads_ano:200, custo_aluguel_idx:82,  score_oportunidade:57, classificacao:"Good",     fatores_positivos:["72 HPSA designations","6.1% pop growth","Research Triangle growth","Strong suburban demand","Retiree coastal migration"], fatores_negativos:["Charlotte/Raleigh competitive","Growing DSO","Large dental pipeline"], melhor_cidade:"Fayetteville", pior_cidade:"Raleigh" },
  { uf:"AZ", estado:"Arizona",         regiao:"West",      populacao:7151502,  dentistas_total:5400,  dentistas_por_100k:76,  mediana_renda:62055, crescimento_pop_pct:7.6,  hpsa_count:45, pct_sem_seguro_dental:78, medicaid_idx:55, penetracao_dso:26, dental_grads_ano:120, custo_aluguel_idx:88,  score_oportunidade:55, classificacao:"Good",     fatores_positivos:["7.6% pop growth","45 HPSA designations","Retiree boom","Sun Belt economy","No state income tax"], fatores_negativos:["Phoenix highly competitive","Growing DSO","High metro rents"], melhor_cidade:"Tucson",       pior_cidade:"Scottsdale" },
  { uf:"FL", estado:"Florida",         regiao:"South",     populacao:21538187, dentistas_total:18500, dentistas_por_100k:86,  mediana_renda:58000, crescimento_pop_pct:11.0, hpsa_count:65, pct_sem_seguro_dental:76, medicaid_idx:45, penetracao_dso:32, dental_grads_ano:300, custo_aluguel_idx:95,  score_oportunidade:52, classificacao:"Good",     fatores_positivos:["Fastest growing by migration","No state income tax","Large retiree market","65 HPSA rural north FL","Huge market"], fatores_negativos:["Coastal areas saturated","Highest DSO in South","Hurricane risk","Low Medicaid"], melhor_cidade:"Tallahassee", pior_cidade:"Miami Beach" },
  { uf:"SD", estado:"South Dakota",    regiao:"Midwest",   populacao:886667,   dentistas_total:800,   dentistas_por_100k:90,  mediana_renda:59533, crescimento_pop_pct:6.1,  hpsa_count:32, pct_sem_seguro_dental:73, medicaid_idx:55, penetracao_dso:11, dental_grads_ano:0,   custo_aluguel_idx:63,  score_oportunidade:54, classificacao:"Good",     fatores_positivos:["No state income tax","No dental schools","Low DSO","Very low rents","Tribal reservation opportunities"], fatores_negativos:["Very small market","Extreme weather/isolation","Limited specialist network"], melhor_cidade:"Rapid City",   pior_cidade:"Sioux Falls" },
  { uf:"ND", estado:"North Dakota",    regiao:"Midwest",   populacao:779094,   dentistas_total:700,   dentistas_por_100k:90,  mediana_renda:62410, crescimento_pop_pct:6.5,  hpsa_count:28, pct_sem_seguro_dental:72, medicaid_idx:58, penetracao_dso:10, dental_grads_ano:0,   custo_aluguel_idx:63,  score_oportunidade:53, classificacao:"Good",     fatores_positivos:["Lowest DSO in US","No dental schools","Energy sector economy","Low rents","Good Medicaid"], fatores_negativos:["Very small market","Extremely cold climate","Rural pop decline"], melhor_cidade:"Bismarck",    pior_cidade:"Fargo" },
  { uf:"ID", estado:"Idaho",           regiao:"West",      populacao:1839106,  dentistas_total:1500,  dentistas_por_100k:82,  mediana_renda:59321, crescimento_pop_pct:14.8, hpsa_count:22, pct_sem_seguro_dental:76, medicaid_idx:52, penetracao_dso:16, dental_grads_ano:0,   custo_aluguel_idx:82,  score_oportunidade:52, classificacao:"Good",     fatores_positivos:["Fastest growing state (14.8%)","No dental schools","CA/OR migration inflow","Strong QoL economy","Low competition"], fatores_negativos:["Rapidly rising rents","Small current market","Low Medicaid"], melhor_cidade:"Nampa",       pior_cidade:"Boise" },
  { uf:"MT", estado:"Montana",         regiao:"West",      populacao:1084225,  dentistas_total:900,   dentistas_por_100k:83,  mediana_renda:56539, crescimento_pop_pct:7.8,  hpsa_count:18, pct_sem_seguro_dental:75, medicaid_idx:62, penetracao_dso:12, dental_grads_ano:0,   custo_aluguel_idx:75,  score_oportunidade:51, classificacao:"Good",     fatores_positivos:["7.8% pop growth","No dental schools","Low DSO","QoL migration magnet","Good Medicaid"], fatores_negativos:["Very small market","Extreme seasonal weather","Limited support infrastructure"], melhor_cidade:"Billings",    pior_cidade:"Missoula" },
  { uf:"AK", estado:"Alaska",          regiao:"West",      populacao:733391,   dentistas_total:600,   dentistas_por_100k:82,  mediana_renda:77790, crescimento_pop_pct:-1.0, hpsa_count:28, pct_sem_seguro_dental:72, medicaid_idx:72, penetracao_dso:8,  dental_grads_ano:0,   custo_aluguel_idx:125, score_oportunidade:51, classificacao:"Good",     fatores_positivos:["Highest income state","Lowest DSO in US","Good Medicaid","No state income tax","28 HPSA per capita"], fatores_negativos:["Extremely high costs","Isolation/logistics","Declining pop","Harsh climate"], melhor_cidade:"Fairbanks",   pior_cidade:"Anchorage" },
  { uf:"WY", estado:"Wyoming",         regiao:"West",      populacao:576851,   dentistas_total:500,   dentistas_por_100k:87,  mediana_renda:64049, crescimento_pop_pct:2.5,  hpsa_count:18, pct_sem_seguro_dental:74, medicaid_idx:55, penetracao_dso:8,  dental_grads_ano:0,   custo_aluguel_idx:72,  score_oportunidade:51, classificacao:"Good",     fatores_positivos:["No state income tax","Lowest DSO","No dental schools","Energy sector income","Low competition"], fatores_negativos:["Smallest market","Very small population","Extreme weather/remote"], melhor_cidade:"Casper",      pior_cidade:"Cheyenne" },
  // ── MODERATE (35-49) ─────────────────────────────────────────────────────
  { uf:"MO", estado:"Missouri",        regiao:"Midwest",   populacao:6154913,  dentistas_total:4900,  dentistas_por_100k:80,  mediana_renda:57290, crescimento_pop_pct:0.5,  hpsa_count:48, pct_sem_seguro_dental:73, medicaid_idx:58, penetracao_dso:20, dental_grads_ano:120, custo_aluguel_idx:70,  score_oportunidade:48, classificacao:"Moderate",  fatores_positivos:["48 HPSA designations","Low rents","Stable economy","Suburban KC/STL pockets","Good Medicaid"], fatores_negativos:["Flat pop growth","Major cities competitive","Moderate DSO"], melhor_cidade:"Springfield", pior_cidade:"St. Louis" },
  { uf:"PA", estado:"Pennsylvania",    regiao:"Northeast", populacao:13002700, dentistas_total:10800, dentistas_por_100k:83,  mediana_renda:62433, crescimento_pop_pct:-0.5, hpsa_count:78, pct_sem_seguro_dental:72, medicaid_idx:75, penetracao_dso:22, dental_grads_ano:280, custo_aluguel_idx:78,  score_oportunidade:47, classificacao:"Moderate",  fatores_positivos:["78 HPSA designations","Excellent Medicaid","Large rural pop","Affordable outside Philly/PGH","Strong insurance"], fatores_negativos:["Declining pop","Big cities competitive","Large dental pipeline"], melhor_cidade:"Allentown",   pior_cidade:"Philadelphia" },
  { uf:"CO", estado:"Colorado",        regiao:"West",      populacao:5773714,  dentistas_total:4600,  dentistas_por_100k:80,  mediana_renda:74217, crescimento_pop_pct:4.8,  hpsa_count:38, pct_sem_seguro_dental:72, medicaid_idx:62, penetracao_dso:24, dental_grads_ano:80,  custo_aluguel_idx:110, score_oportunidade:46, classificacao:"Moderate",  fatores_positivos:["Good income market","Pop growth","38 HPSA","Outdoor lifestyle talent magnet","Strong insurance"], fatores_negativos:["Denver/Boulder highly competitive","Very high rents","Growing DSO"], melhor_cidade:"Fort Collins", pior_cidade:"Denver" },
  { uf:"OH", estado:"Ohio",            regiao:"Midwest",   populacao:11799448, dentistas_total:9500,  dentistas_por_100k:81,  mediana_renda:58116, crescimento_pop_pct:0.2,  hpsa_count:65, pct_sem_seguro_dental:72, medicaid_idx:70, penetracao_dso:23, dental_grads_ano:200, custo_aluguel_idx:72,  score_oportunidade:46, classificacao:"Moderate",  fatores_positivos:["65 HPSA designations","Excellent Medicaid","Low rents","Large market","Good dental programs"], fatores_negativos:["Columbus/Cleveland competitive","Flat growth","Moderate DSO"], melhor_cidade:"Dayton",      pior_cidade:"Columbus" },
  { uf:"VA", estado:"Virginia",        regiao:"South",     populacao:8631393,  dentistas_total:7000,  dentistas_por_100k:81,  mediana_renda:76456, crescimento_pop_pct:3.0,  hpsa_count:55, pct_sem_seguro_dental:72, medicaid_idx:65, penetracao_dso:25, dental_grads_ano:160, custo_aluguel_idx:95,  score_oportunidade:44, classificacao:"Moderate",  fatores_positivos:["High income market","55 HPSA rural","Strong military/govt employment","Growing suburbs","Good Medicaid"], fatores_negativos:["N.Virginia highly competitive","High DC-suburb rents","Growing DSO"], melhor_cidade:"Roanoke",     pior_cidade:"Arlington" },
  { uf:"MI", estado:"Michigan",        regiao:"Midwest",   populacao:10077331, dentistas_total:9200,  dentistas_por_100k:91,  mediana_renda:59235, crescimento_pop_pct:-0.2, hpsa_count:58, pct_sem_seguro_dental:72, medicaid_idx:68, penetracao_dso:22, dental_grads_ano:200, custo_aluguel_idx:75,  score_oportunidade:43, classificacao:"Moderate",  fatores_positivos:["Good Medicaid","58 HPSA designations","Affordable outside Detroit","Auto industry comeback","Good dental programs"], fatores_negativos:["Detroit struggling","Declining pop","Moderate DSO"], melhor_cidade:"Grand Rapids", pior_cidade:"Detroit" },
  { uf:"HI", estado:"Hawaii",          regiao:"West",      populacao:1455271,  dentistas_total:1200,  dentistas_por_100k:82,  mediana_renda:83102, crescimento_pop_pct:2.0,  hpsa_count:15, pct_sem_seguro_dental:70, medicaid_idx:72, penetracao_dso:12, dental_grads_ano:0,   custo_aluguel_idx:135, score_oportunidade:43, classificacao:"Moderate",  fatores_positivos:["Highest income in West","Good Medicaid","Low DSO","No dental schools","Tourism cash-pay patients"], fatores_negativos:["Extremely high rents","Very high cost of living","Limited growth","Island isolation"], melhor_cidade:"Kahului (Maui)", pior_cidade:"Honolulu" },
  { uf:"WI", estado:"Wisconsin",       regiao:"Midwest",   populacao:5893718,  dentistas_total:5400,  dentistas_por_100k:92,  mediana_renda:63293, crescimento_pop_pct:0.4,  hpsa_count:42, pct_sem_seguro_dental:71, medicaid_idx:75, penetracao_dso:19, dental_grads_ano:80,  custo_aluguel_idx:78,  score_oportunidade:42, classificacao:"Moderate",  fatores_positivos:["Excellent Medicaid","42 HPSA","Low rents","Strong manufacturing","Good insurance market"], fatores_negativos:["Flat pop growth","Milwaukee competitive","Cold climate limits migration"], melhor_cidade:"Green Bay",   pior_cidade:"Madison" },
  { uf:"CT", estado:"Connecticut",     regiao:"Northeast", populacao:3605944,  dentistas_total:2900,  dentistas_por_100k:80,  mediana_renda:80065, crescimento_pop_pct:0.8,  hpsa_count:32, pct_sem_seguro_dental:70, medicaid_idx:80, penetracao_dso:22, dental_grads_ano:80,  custo_aluguel_idx:108, score_oportunidade:41, classificacao:"Moderate",  fatores_positivos:["Excellent Medicaid","High income market","32 HPSA","Strong insurance","NY/Boston proximity"], fatores_negativos:["High rents","Moderate DSO","Flat growth"], melhor_cidade:"Waterbury",   pior_cidade:"Greenwich" },
  { uf:"MN", estado:"Minnesota",       regiao:"Midwest",   populacao:5706494,  dentistas_total:5200,  dentistas_por_100k:91,  mediana_renda:74593, crescimento_pop_pct:2.4,  hpsa_count:38, pct_sem_seguro_dental:70, medicaid_idx:78, penetracao_dso:21, dental_grads_ano:80,  custo_aluguel_idx:88,  score_oportunidade:40, classificacao:"Moderate",  fatores_positivos:["Excellent Medicaid","High income","38 HPSA","Strong insurance","Healthcare hub"], fatores_negativos:["Minneapolis competitive","Cold climate","High rents","Saturating metros"], melhor_cidade:"Rochester",   pior_cidade:"Minneapolis" },
  { uf:"ME", estado:"Maine",           regiao:"Northeast", populacao:1362359,  dentistas_total:1200,  dentistas_por_100k:88,  mediana_renda:59489, crescimento_pop_pct:2.4,  hpsa_count:22, pct_sem_seguro_dental:72, medicaid_idx:72, penetracao_dso:14, dental_grads_ano:0,   custo_aluguel_idx:78,  score_oportunidade:40, classificacao:"Moderate",  fatores_positivos:["Low DSO","Good Medicaid","No dental schools","Tourism/retiree growth","Low rents outside Portland"], fatores_negativos:["Very small market","Aging rural pop","Harsh winters"], melhor_cidade:"Bangor",      pior_cidade:"Portland" },
  { uf:"NE", estado:"Nebraska",        regiao:"Midwest",   populacao:1961504,  dentistas_total:1800,  dentistas_por_100k:92,  mediana_renda:62473, crescimento_pop_pct:3.2,  hpsa_count:28, pct_sem_seguro_dental:73, medicaid_idx:62, penetracao_dso:17, dental_grads_ano:40,  custo_aluguel_idx:72,  score_oportunidade:38, classificacao:"Moderate",  fatores_positivos:["3.2% pop growth","Low rents","Stable agricultural economy","28 HPSA","Good Medicaid"], fatores_negativos:["Omaha increasingly competitive","Flat rural market","Limited specialist demand"], melhor_cidade:"Lincoln",     pior_cidade:"Omaha" },
  { uf:"RI", estado:"Rhode Island",    regiao:"Northeast", populacao:1097379,  dentistas_total:1000,  dentistas_por_100k:91,  mediana_renda:70305, crescimento_pop_pct:2.8,  hpsa_count:18, pct_sem_seguro_dental:71, medicaid_idx:80, penetracao_dso:22, dental_grads_ano:0,   custo_aluguel_idx:100, score_oportunidade:37, classificacao:"Moderate",  fatores_positivos:["Excellent Medicaid","Good income market","No dental schools","Providence urban pocket","Strong insurance"], fatores_negativos:["Small total market","High rents","Competitive for size"], melhor_cidade:"Woonsocket",  pior_cidade:"Providence" },
  { uf:"IL", estado:"Illinois",        regiao:"Midwest",   populacao:12812508, dentistas_total:11500, dentistas_por_100k:90,  mediana_renda:68428, crescimento_pop_pct:-0.9, hpsa_count:55, pct_sem_seguro_dental:72, medicaid_idx:72, penetracao_dso:25, dental_grads_ano:280, custo_aluguel_idx:90,  score_oportunidade:38, classificacao:"Moderate",  fatores_positivos:["Good Medicaid","55 HPSA (rural IL)","High income Chicago suburbs","Large market","Strong insurance"], fatores_negativos:["Declining pop","Chicago very competitive","Growing DSO","High taxes"], melhor_cidade:"Peoria",      pior_cidade:"Chicago Loop" },
  { uf:"WA", estado:"Washington",      regiao:"West",      populacao:7705281,  dentistas_total:6600,  dentistas_por_100k:86,  mediana_renda:77006, crescimento_pop_pct:6.8,  hpsa_count:45, pct_sem_seguro_dental:71, medicaid_idx:72, penetracao_dso:26, dental_grads_ano:120, custo_aluguel_idx:110, score_oportunidade:38, classificacao:"Moderate",  fatores_positivos:["No state income tax","High income","6.8% growth","45 HPSA rural WA","Strong tech sector"], fatores_negativos:["Seattle extremely competitive","Very high rents","High DSO","High overall costs"], melhor_cidade:"Spokane",     pior_cidade:"Seattle" },
  { uf:"OR", estado:"Oregon",          regiao:"West",      populacao:4237256,  dentistas_total:3800,  dentistas_por_100k:90,  mediana_renda:66836, crescimento_pop_pct:4.2,  hpsa_count:38, pct_sem_seguro_dental:72, medicaid_idx:70, penetracao_dso:23, dental_grads_ano:0,   custo_aluguel_idx:102, score_oportunidade:38, classificacao:"Moderate",  fatores_positivos:["38 HPSA","No dental schools","Good Medicaid","Rural Eastern OR opportunity","Pop growth"], fatores_negativos:["Portland very competitive","High rents","High DSO","High cost of living"], melhor_cidade:"Eugene",      pior_cidade:"Portland" },
  { uf:"MD", estado:"Maryland",        regiao:"South",     populacao:6177224,  dentistas_total:5100,  dentistas_por_100k:83,  mediana_renda:87063, crescimento_pop_pct:1.0,  hpsa_count:42, pct_sem_seguro_dental:70, medicaid_idx:82, penetracao_dso:26, dental_grads_ano:160, custo_aluguel_idx:115, score_oportunidade:37, classificacao:"Moderate",  fatores_positivos:["Top 3 median income US","Excellent Medicaid","42 HPSA","Strong federal employment","Low uninsured"], fatores_negativos:["DC suburbs extremely competitive","Very high rents","High overall costs"], melhor_cidade:"Frederick",   pior_cidade:"Bethesda" },
  { uf:"CA", estado:"California",      regiao:"West",      populacao:39538223, dentistas_total:34000, dentistas_por_100k:86,  mediana_renda:78672, crescimento_pop_pct:0.6,  hpsa_count:95, pct_sem_seguro_dental:72, medicaid_idx:72, penetracao_dso:35, dental_grads_ano:820, custo_aluguel_idx:140, score_oportunidade:36, classificacao:"Moderate",  fatores_positivos:["95 HPSA (rural inland CA)","Largest market","High income coast","Good Denti-Cal","Inland Empire growth"], fatores_negativos:["Highest rents in US","Highest DSO","Largest pipeline","Extreme cost of living"], melhor_cidade:"Fresno",      pior_cidade:"San Francisco" },
  // ── SATURATED (<35) ──────────────────────────────────────────────────────
  { uf:"UT", estado:"Utah",            regiao:"West",      populacao:3271616,  dentistas_total:3100,  dentistas_por_100k:95,  mediana_renda:74197, crescimento_pop_pct:16.5, hpsa_count:22, pct_sem_seguro_dental:73, medicaid_idx:52, penetracao_dso:22, dental_grads_ano:120, custo_aluguel_idx:95,  score_oportunidade:33, classificacao:"Saturated", fatores_positivos:["Highest pop growth in US (16.5%)","High income","Young families = pediatric demand","Strong economy"], fatores_negativos:["High dentist density","Multiple dental schools","Low Medicaid","Very competitive"], melhor_cidade:"St. George",  pior_cidade:"Salt Lake City" },
  { uf:"NY", estado:"New York",        regiao:"Northeast", populacao:20201249, dentistas_total:19000, dentistas_por_100k:94,  mediana_renda:71117, crescimento_pop_pct:-0.8, hpsa_count:95, pct_sem_seguro_dental:72, medicaid_idx:80, penetracao_dso:28, dental_grads_ano:440, custo_aluguel_idx:150, score_oportunidade:32, classificacao:"Saturated", fatores_positivos:["Excellent Medicaid","95 HPSA (upstate)","Huge market","Strong insurance market"], fatores_negativos:["NYC most expensive","Declining pop","Largest dental pipeline","NYC highly competitive","High taxes"], melhor_cidade:"Buffalo",     pior_cidade:"Manhattan" },
  { uf:"NJ", estado:"New Jersey",      regiao:"Northeast", populacao:9288994,  dentistas_total:8900,  dentistas_por_100k:96,  mediana_renda:85751, crescimento_pop_pct:0.9,  hpsa_count:48, pct_sem_seguro_dental:70, medicaid_idx:78, penetracao_dso:28, dental_grads_ano:120, custo_aluguel_idx:135, score_oportunidade:30, classificacao:"Saturated", fatores_positivos:["Highest income E.Coast","Good Medicaid","48 HPSA","Strong insurance"], fatores_negativos:["Very high dentist density","Extreme rents","NYC/Philly spill-over","High taxes"], melhor_cidade:"Trenton",     pior_cidade:"Hoboken" },
  { uf:"VT", estado:"Vermont",         regiao:"Northeast", populacao:643077,   dentistas_total:700,   dentistas_por_100k:109, mediana_renda:65000, crescimento_pop_pct:2.1,  hpsa_count:8,  pct_sem_seguro_dental:70, medicaid_idx:82, penetracao_dso:12, dental_grads_ano:0,   custo_aluguel_idx:85,  score_oportunidade:30, classificacao:"Saturated", fatores_positivos:["Excellent Medicaid","Low DSO","No dental schools","Tourism/second-home market"], fatores_negativos:["Highest dentist density NE","Very small market","Extremely limited growth","Cold isolation"], melhor_cidade:"Burlington",  pior_cidade:"Montpelier" },
  { uf:"MA", estado:"Massachusetts",   regiao:"Northeast", populacao:7029917,  dentistas_total:6800,  dentistas_por_100k:97,  mediana_renda:84385, crescimento_pop_pct:1.9,  hpsa_count:38, pct_sem_seguro_dental:70, medicaid_idx:82, penetracao_dso:28, dental_grads_ano:200, custo_aluguel_idx:145, score_oportunidade:25, classificacao:"Saturated", fatores_positivos:["Excellent Medicaid","Highest insurance coverage US","High income","38 HPSA rural"], fatores_negativos:["Boston extremely competitive","Highest NE rents","High DSO","Large pipeline"], melhor_cidade:"Worcester",   pior_cidade:"Cambridge" },
  { uf:"NH", estado:"New Hampshire",   regiao:"Northeast", populacao:1377529,  dentistas_total:1400,  dentistas_por_100k:102, mediana_renda:77923, crescimento_pop_pct:2.6,  hpsa_count:12, pct_sem_seguro_dental:71, medicaid_idx:62, penetracao_dso:20, dental_grads_ano:0,   custo_aluguel_idx:92,  score_oportunidade:26, classificacao:"Saturated", fatores_positivos:["No state income tax","High income","No dental schools","Growing pop","Low DSO"], fatores_negativos:["High dentist density","Only 12 HPSA","Low Medicaid","Small market"], melhor_cidade:"Manchester",  pior_cidade:"Portsmouth" },
  { uf:"DC", estado:"District of Columbia", regiao:"South", populacao:689545,  dentistas_total:1600,  dentistas_por_100k:232, mediana_renda:92266, crescimento_pop_pct:3.4,  hpsa_count:12, pct_sem_seguro_dental:68, medicaid_idx:82, penetracao_dso:35, dental_grads_ano:0,   custo_aluguel_idx:185, score_oportunidade:8,  classificacao:"Saturated", fatores_positivos:["Highest income US","Excellent Medicaid","Large federal employee benefits","No dental schools"], fatores_negativos:["Most saturated market US (232/100k)","Highest rents US","Extreme DSO","Tiny geographic market"], melhor_cidade:"N/A — DC is entire market", pior_cidade:"Dupont Circle area" },
];

// ─── SPECIALTY ANALYSIS (USA) ─────────────────────────────────────────────────

export const saturacaoEspecialidadeUSA: SaturacaoEspecialidadeUSA[] = [
  { especialidade:"Pediatric Dentistry",    media_nacional_por_100k:2.3,  top5_saturadas:[{cidade:"New York/NY",valor:6.2},{cidade:"Boston/MA",valor:5.8},{cidade:"San Francisco/CA",valor:5.4},{cidade:"Seattle/WA",valor:4.9},{cidade:"Minneapolis/MN",valor:4.5}], top5_oportunidades:[{cidade:"Jackson/MS",valor:0.4},{cidade:"Huntsville/AL",valor:0.6},{cidade:"El Paso/TX",valor:0.7},{cidade:"Louisville/KY",valor:0.8},{cidade:"Tulsa/OK",valor:0.9}], tendencia:"Opportunity", salario_medio_anual:196000, crescimento_emprego_pct:18.2, seguro_cobre:true },
  { especialidade:"General Dentistry",      media_nacional_por_100k:24.4, top5_saturadas:[{cidade:"Washington/DC",valor:71.0},{cidade:"New York/NY",valor:48.2},{cidade:"Boston/MA",valor:44.6},{cidade:"San Francisco/CA",valor:42.1},{cidade:"New Haven/CT",valor:38.5}], top5_oportunidades:[{cidade:"Tupelo/MS",valor:5.8},{cidade:"Dothan/AL",valor:6.2},{cidade:"Jonesboro/AR",valor:6.8},{cidade:"Clarksburg/WV",valor:7.1},{cidade:"Shreveport/LA",valor:7.5}], tendencia:"Saturating", salario_medio_anual:178000, crescimento_emprego_pct:3.1, seguro_cobre:true },
  { especialidade:"Orthodontics",           media_nacional_por_100k:3.6,  top5_saturadas:[{cidade:"Salt Lake City/UT",valor:9.2},{cidade:"San Francisco/CA",valor:8.8},{cidade:"Seattle/WA",valor:7.9},{cidade:"Boston/MA",valor:7.4},{cidade:"Denver/CO",valor:7.0}], top5_oportunidades:[{cidade:"Jackson/MS",valor:0.8},{cidade:"Mobile/AL",valor:0.9},{cidade:"Shreveport/LA",valor:1.0},{cidade:"El Paso/TX",valor:1.1},{cidade:"Fayetteville/AR",valor:1.2}], tendencia:"Stable", salario_medio_anual:228000, crescimento_emprego_pct:4.5, seguro_cobre:true },
  { especialidade:"Endodontics",            media_nacional_por_100k:2.5,  top5_saturadas:[{cidade:"New York/NY",valor:6.8},{cidade:"Chicago/IL",valor:6.1},{cidade:"Los Angeles/CA",valor:5.9},{cidade:"Philadelphia/PA",valor:5.4},{cidade:"Miami/FL",valor:5.0}], top5_oportunidades:[{cidade:"Jackson/MS",valor:0.3},{cidade:"Birmingham/AL",valor:0.5},{cidade:"Little Rock/AR",valor:0.6},{cidade:"Shreveport/LA",valor:0.7},{cidade:"Clarksburg/WV",valor:0.8}], tendencia:"Opportunity", salario_medio_anual:232000, crescimento_emprego_pct:5.8, seguro_cobre:true },
  { especialidade:"Periodontics",           media_nacional_por_100k:2.5,  top5_saturadas:[{cidade:"New York/NY",valor:6.4},{cidade:"San Francisco/CA",valor:5.8},{cidade:"Boston/MA",valor:5.5},{cidade:"Philadelphia/PA",valor:5.0},{cidade:"Chicago/IL",valor:4.8}], top5_oportunidades:[{cidade:"Tupelo/MS",valor:0.4},{cidade:"Huntsville/AL",valor:0.5},{cidade:"Fayetteville/AR",valor:0.6},{cidade:"Knoxville/TN",valor:0.7},{cidade:"Tulsa/OK",valor:0.8}], tendencia:"Opportunity", salario_medio_anual:219000, crescimento_emprego_pct:6.2, seguro_cobre:true },
  { especialidade:"Oral & Maxillofacial Surgery", media_nacional_por_100k:3.1, top5_saturadas:[{cidade:"New York/NY",valor:7.8},{cidade:"Chicago/IL",valor:7.2},{cidade:"Houston/TX",valor:6.8},{cidade:"Los Angeles/CA",valor:6.5},{cidade:"Philadelphia/PA",valor:6.0}], top5_oportunidades:[{cidade:"Jackson/MS",valor:0.5},{cidade:"Mobile/AL",valor:0.6},{cidade:"Fort Smith/AR",valor:0.7},{cidade:"Bowling Green/KY",valor:0.8},{cidade:"Hattiesburg/MS",valor:0.8}], tendencia:"Stable", salario_medio_anual:311000, crescimento_emprego_pct:4.8, seguro_cobre:true },
  { especialidade:"Prosthodontics",         media_nacional_por_100k:1.2,  top5_saturadas:[{cidade:"New York/NY",valor:3.4},{cidade:"Boston/MA",valor:3.1},{cidade:"San Francisco/CA",valor:2.9},{cidade:"Chicago/IL",valor:2.6},{cidade:"Philadelphia/PA",valor:2.4}], top5_oportunidades:[{cidade:"Jackson/MS",valor:0.1},{cidade:"Birmingham/AL",valor:0.2},{cidade:"Little Rock/AR",valor:0.2},{cidade:"Shreveport/LA",valor:0.3},{cidade:"Lexington/KY",valor:0.3}], tendencia:"Opportunity", salario_medio_anual:191000, crescimento_emprego_pct:7.4, seguro_cobre:true },
  { especialidade:"Dental Anesthesiology",  media_nacional_por_100k:0.12, top5_saturadas:[{cidade:"New York/NY",valor:0.5},{cidade:"Los Angeles/CA",valor:0.4},{cidade:"Chicago/IL",valor:0.35},{cidade:"Houston/TX",valor:0.3},{cidade:"Philadelphia/PA",valor:0.28}], top5_oportunidades:[{cidade:"Most rural states",valor:0.0},{cidade:"Jackson/MS",valor:0.01},{cidade:"Little Rock/AR",valor:0.02},{cidade:"Charleston/WV",valor:0.02},{cidade:"Baton Rouge/LA",valor:0.03}], tendencia:"Opportunity", salario_medio_anual:272000, crescimento_emprego_pct:22.5, seguro_cobre:false },
  { especialidade:"Oral Medicine",          media_nacional_por_100k:0.21, top5_saturadas:[{cidade:"Boston/MA",valor:0.82},{cidade:"Philadelphia/PA",valor:0.74},{cidade:"New York/NY",valor:0.68},{cidade:"Seattle/WA",valor:0.61},{cidade:"San Francisco/CA",valor:0.55}], top5_oportunidades:[{cidade:"Most Southern states",valor:0.0},{cidade:"Memphis/TN",valor:0.02},{cidade:"Louisville/KY",valor:0.03},{cidade:"Oklahoma City/OK",valor:0.03},{cidade:"Richmond/VA",valor:0.04}], tendencia:"Opportunity", salario_medio_anual:185000, crescimento_emprego_pct:12.1, seguro_cobre:false },
  { especialidade:"Dental Public Health",   media_nacional_por_100k:0.13, top5_saturadas:[{cidade:"Washington/DC",valor:0.9},{cidade:"Boston/MA",valor:0.7},{cidade:"New York/NY",valor:0.6},{cidade:"Atlanta/GA",valor:0.4},{cidade:"Chicago/IL",valor:0.4}], top5_oportunidades:[{cidade:"Rural Mississippi",valor:0.01},{cidade:"Rural Alabama",valor:0.01},{cidade:"Rural Arkansas",valor:0.01},{cidade:"Rural West Virginia",valor:0.02},{cidade:"Rural Louisiana",valor:0.02}], tendencia:"Opportunity", salario_medio_anual:145000, crescimento_emprego_pct:15.8, seguro_cobre:false },
];

// ─── FINANCIAL PLANNING BY REGION ────────────────────────────────────────────

export const custosPorRegiaoUSA: CustoPorRegiaoUSA[] = [
  { regiao:"South — Rural (AL, MS, AR, WV, LA, KY, OK)",  startup_min:280, startup_max:420,  aluguel_mensal:3200,  receita_media_anual:620000,  honorario_medio_visita:185, pacientes_break_even_dia:11, retorno_investimento_anos:3.5, equipamento_medio:120 },
  { regiao:"South — Metro (TN, GA, TX suburbs, SC, NC)",   startup_min:380, startup_max:580,  aluguel_mensal:5500,  receita_media_anual:780000,  honorario_medio_visita:225, pacientes_break_even_dia:12, retorno_investimento_anos:4.2, equipamento_medio:150 },
  { regiao:"Midwest (IN, KS, IA, MO, WI, OH, MI)",        startup_min:320, startup_max:500,  aluguel_mensal:4200,  receita_media_anual:710000,  honorario_medio_visita:205, pacientes_break_even_dia:12, retorno_investimento_anos:3.8, equipamento_medio:135 },
  { regiao:"West — Growing (NV, AZ, ID, MT, NM, WY)",     startup_min:400, startup_max:640,  aluguel_mensal:6200,  receita_media_anual:820000,  honorario_medio_visita:255, pacientes_break_even_dia:13, retorno_investimento_anos:4.5, equipamento_medio:155 },
  { regiao:"Northeast — Secondary (PA, CT, ME, RI)",       startup_min:450, startup_max:680,  aluguel_mensal:7500,  receita_media_anual:890000,  honorario_medio_visita:285, pacientes_break_even_dia:13, retorno_investimento_anos:4.8, equipamento_medio:165 },
  { regiao:"High-Cost Markets (CA, NY, NJ, MA, DC, WA)",  startup_min:600, startup_max:1100, aluguel_mensal:14000, receita_media_anual:1150000, honorario_medio_visita:390, pacientes_break_even_dia:14, retorno_investimento_anos:5.5, equipamento_medio:200 },
];

// ─── CHECKLIST ────────────────────────────────────────────────────────────────

export const checklistFatoresUSA = [
  { categoria:"Workforce & Competition", items:["Dentist-to-population ratio (aim > 1:1,500 = 67/100k)","HPSA designation (qualifies for NHSC loan repayment up to $50k)","Specialist saturation by specialty","DSO market share in target area (< 20% preferred for independents)"] },
  { categoria:"Financial & Insurance",   items:["Medicaid reimbursement index (> 60 = good)","% population with employer dental insurance (higher = more pre-paid demand)","Median household income (> $55k preferred for fee-for-service)","Commercial rent per sqft in target area (compare to revenue potential)","Practice acquisition vs new startup: acquisition typically ROI faster"] },
  { categoria:"Regulatory & Licensing",  items:["State dental board requirements and fees","Medicaid enrollment process complexity and timeline","Teledentistry regulations (some states have broad scope)","Dental hygiene scope of practice (some states allow hygienist-owned practices)","NHSC Loan Repayment eligibility (HPSA sites qualify for up to $50k/2yr)"] },
  { categoria:"Demographics & Demand",   items:["Population growth trend (5-year, prefer > 3%)","Age distribution (high pediatric demand vs geriatric prosthetics/perio)","Medicaid-eligible population % (size of government-pay market)","New household formation rate (proxy for new patient generation)","Uninsured rate (cash-pay market size vs payment risk tradeoff)"] },
  { categoria:"Operations & Support",    items:["Dental lab proximity and turnaround times","Dental supply distributor locations (Patterson, Schein, Benco)","CE/Continuing education access within driving distance","Specialist referral network depth (ortho, oral surgery, endo)","Dental staffing market availability (DA, RDH, front desk, biller)"] },
];
