// =============================================================================
// OdontoData — Dental Lab Intelligence: USA & Germany
// Sources: NADL 2022, ADA HPI, BLS, FDA (USA) | VDZI 2023, BZÄK, GKV-SV (DE)
// =============================================================================

// ─── USA ─────────────────────────────────────────────────────────────────────

// Fontes:
// Labs: NADL 2022 (~7.500 commercial labs registrados na FDA)
// CDTs: BLS OES May 2022 — Dental Laboratory Technicians SOC 51-9081: 29.560 empregados
// Mercado: ADA Health Policy Institute + IBISWorld 2023
export const indicadoresLabsUSA = {
  totalLabs: "7,500",           // Commercial dental labs — NADL / FDA registration 2022
  laboratoristas: "29,560",     // Dental Lab Technicians (SOC 51-9081) — BLS OES May 2022
  producaoMensal: "~850k",      // units/month estimate — ADA HPI 2022
  mercadoAnual: "$4.5B",        // IBISWorld Dental Laboratories industry 2023
  adocaoCADCAM: "+68%",         // NADL 2022 survey
  labsDigitais: "42%",          // Labs with full digital workflow — NADL 2022
  crescimentoDSO: "+22%",       // DSO in-house labs — ADA HPI 2023
  tempoMedioEntrega: "5–7d",
};

// laboratoristas: BLS OES May 2022 (SOC 51-9081) distribuídos por região
export const labsPorRegiaoUSA = [
  { regiao: "Northeast", total_labs: 1580, labs_digitais: 700, laboratoristas:  6210, capacidade_mensal: 208000, producao_atual_mensal: 185000, ocupacao_pct: 89, demanda_estimada_mensal: 210000, gap_producao: -25000 },
  { regiao: "South",     total_labs: 2100, labs_digitais: 880, laboratoristas:  9460, capacidade_mensal: 240000, producao_atual_mensal: 205000, ocupacao_pct: 85, demanda_estimada_mensal: 252000, gap_producao: -47000 },
  { regiao: "Midwest",   total_labs: 1700, labs_digitais: 680, laboratoristas:  6800, capacidade_mensal: 195000, producao_atual_mensal: 162000, ocupacao_pct: 83, demanda_estimada_mensal: 188000, gap_producao: -26000 },
  { regiao: "West",      total_labs: 1850, labs_digitais: 820, laboratoristas:  7090, capacidade_mensal: 215000, producao_atual_mensal: 192000, ocupacao_pct: 89, demanda_estimada_mensal: 220000, gap_producao: -28000 },
];

export const comparativoValoresUSA = [
  { tipo: "Full Denture",              seguro_reembolso: 800,  mercado_medio: 1200,  mercado_premium: 3500,  gap_pct: 33, tendencia: "Rising",  volume_anual: 1200000 },
  { tipo: "PFM Crown",                 seguro_reembolso: 950,  mercado_medio: 1100,  mercado_premium: 2000,  gap_pct: 14, tendencia: "Stable",  volume_anual: 2800000 },
  { tipo: "Zirconia Crown",            seguro_reembolso: 0,    mercado_medio: 1400,  mercado_premium: 3200,  gap_pct: 100, tendencia: "Rising", volume_anual: 1900000 },
  { tipo: "Implant Crown",             seguro_reembolso: 1200, mercado_medio: 2000,  mercado_premium: 5000,  gap_pct: 40, tendencia: "Rising",  volume_anual: 980000  },
  { tipo: "Partial Denture (RPD)",     seguro_reembolso: 700,  mercado_medio: 1500,  mercado_premium: 3800,  gap_pct: 53, tendencia: "Stable",  volume_anual: 850000  },
  { tipo: "Ceramic Veneer",            seguro_reembolso: 0,    mercado_medio: 1800,  mercado_premium: 4500,  gap_pct: 100, tendencia: "Rising", volume_anual: 1100000 },
  { tipo: "All-on-4 Arch (full)",      seguro_reembolso: 0,    mercado_medio: 18000, mercado_premium: 45000, gap_pct: 100, tendencia: "Rising", volume_anual: 210000  },
  { tipo: "PMMA Provisional",          seguro_reembolso: 200,  mercado_medio: 450,   mercado_premium: 900,   gap_pct: 56, tendencia: "Stable",  volume_anual: 2200000 },
];

export const tecnologiasLabsUSA = [
  { tecnologia: "CAD/CAM Milling",          adocao_pais_pct: 68, adocao_mundial_pct: 42, investimento_usd: 120000, roi_meses: 14, produtividade_pct: 65, tendencia: "Crescente"  },
  { tecnologia: "3D Printing (Resins)",      adocao_pais_pct: 48, adocao_mundial_pct: 28, investimento_usd: 35000,  roi_meses: 10, produtividade_pct: 50, tendencia: "Explosivo"  },
  { tecnologia: "Monolithic Zirconia",       adocao_pais_pct: 72, adocao_mundial_pct: 48, investimento_usd: 20000,  roi_meses: 7,  produtividade_pct: 35, tendencia: "Crescente"  },
  { tecnologia: "Intraoral Scanning",        adocao_pais_pct: 55, adocao_mundial_pct: 38, investimento_usd: 65000,  roi_meses: 13, produtividade_pct: 42, tendencia: "Crescente"  },
  { tecnologia: "AI-Assisted Design",        adocao_pais_pct: 12, adocao_mundial_pct: 8,  investimento_usd: 18000,  roi_meses: 6,  produtividade_pct: 60, tendencia: "Inicial"    },
];

export const serieHistoricaLabsUSA = [
  { ano: 2015, total_labs: 9200, labs_digitais: 1380, producao_total: 7200000,  mercado_bi: 3.1 },
  { ano: 2016, total_labs: 9000, labs_digitais: 1620, producao_total: 7350000,  mercado_bi: 3.3 },
  { ano: 2017, total_labs: 8800, labs_digitais: 1936, producao_total: 7500000,  mercado_bi: 3.5 },
  { ano: 2018, total_labs: 8500, labs_digitais: 2295, producao_total: 7700000,  mercado_bi: 3.7 },
  { ano: 2019, total_labs: 8200, labs_digitais: 2706, producao_total: 8000000,  mercado_bi: 3.9 },
  { ano: 2020, total_labs: 7900, labs_digitais: 2765, producao_total: 6400000,  mercado_bi: 3.2 },
  { ano: 2021, total_labs: 7800, labs_digitais: 3198, producao_total: 8200000,  mercado_bi: 3.9 },
  { ano: 2022, total_labs: 7600, labs_digitais: 3648, producao_total: 9400000,  mercado_bi: 4.2 },
  { ano: 2023, total_labs: 7500, labs_digitais: 4050, producao_total: 10000000, mercado_bi: 4.5 },
];

// BLS OES May 2022 — Dental Lab Technicians (SOC 51-9081) por Census Region
// Total: 29.560 | Northeast 21% | South 32% | Midwest 23% | West 24%
export const cdtsPorRegiaoUSA = [
  { regiao: "Northeast",    cdts:  6210, labs: 1580, renda_media_usd: 52000, demanda_estimada: 210000, saturacao: "Adequate" },
  { regiao: "South",        cdts:  9460, labs: 2100, renda_media_usd: 44000, demanda_estimada: 252000, saturacao: "Shortage" },
  { regiao: "Midwest",      cdts:  6800, labs: 1700, renda_media_usd: 48000, demanda_estimada: 188000, saturacao: "Adequate" },
  { regiao: "West",         cdts:  7090, labs: 1850, renda_media_usd: 58000, demanda_estimada: 220000, saturacao: "Adequate" },
];

// BLS / NADL / Census — Top 20 US states by number of dental labs
export const labsPorEstadoUSA = [
  { estado: "California",     uf: "CA", regiao: "West",      labs: 1100, laboratoristas: 4620, populacao_mi: 39.03, labs_por_100k: 2.82, receita_media_usd: 680000, cadcam_pct: 74, crescimento_5a_pct: -8  },
  { estado: "New York",       uf: "NY", regiao: "Northeast", labs: 680,  laboratoristas: 2860, populacao_mi: 19.68, labs_por_100k: 3.45, receita_media_usd: 780000, cadcam_pct: 72, crescimento_5a_pct: -12 },
  { estado: "Texas",          uf: "TX", regiao: "South",     labs: 620,  laboratoristas: 2480, populacao_mi: 30.03, labs_por_100k: 2.06, receita_media_usd: 620000, cadcam_pct: 65, crescimento_5a_pct: 3   },
  { estado: "Florida",        uf: "FL", regiao: "South",     labs: 580,  laboratoristas: 2320, populacao_mi: 22.24, labs_por_100k: 2.61, receita_media_usd: 590000, cadcam_pct: 64, crescimento_5a_pct: 2   },
  { estado: "Pennsylvania",   uf: "PA", regiao: "Northeast", labs: 420,  laboratoristas: 1680, populacao_mi: 12.96, labs_por_100k: 3.24, receita_media_usd: 650000, cadcam_pct: 68, crescimento_5a_pct: -10 },
  { estado: "Illinois",       uf: "IL", regiao: "Midwest",   labs: 380,  laboratoristas: 1520, populacao_mi: 12.58, labs_por_100k: 3.02, receita_media_usd: 620000, cadcam_pct: 67, crescimento_5a_pct: -9  },
  { estado: "Ohio",           uf: "OH", regiao: "Midwest",   labs: 340,  laboratoristas: 1360, populacao_mi: 11.78, labs_por_100k: 2.89, receita_media_usd: 560000, cadcam_pct: 63, crescimento_5a_pct: -7  },
  { estado: "New Jersey",     uf: "NJ", regiao: "Northeast", labs: 310,  laboratoristas: 1240, populacao_mi: 9.29,  labs_por_100k: 3.34, receita_media_usd: 720000, cadcam_pct: 71, crescimento_5a_pct: -11 },
  { estado: "Michigan",       uf: "MI", regiao: "Midwest",   labs: 280,  laboratoristas: 1120, populacao_mi: 10.04, labs_por_100k: 2.79, receita_media_usd: 540000, cadcam_pct: 62, crescimento_5a_pct: -6  },
  { estado: "Massachusetts",  uf: "MA", regiao: "Northeast", labs: 260,  laboratoristas: 1040, populacao_mi: 7.03,  labs_por_100k: 3.70, receita_media_usd: 820000, cadcam_pct: 76, crescimento_5a_pct: -5  },
  { estado: "Georgia",        uf: "GA", regiao: "South",     labs: 240,  laboratoristas: 960,  populacao_mi: 10.91, labs_por_100k: 2.20, receita_media_usd: 550000, cadcam_pct: 61, crescimento_5a_pct: 4   },
  { estado: "North Carolina", uf: "NC", regiao: "South",     labs: 230,  laboratoristas: 920,  populacao_mi: 10.70, labs_por_100k: 2.15, receita_media_usd: 530000, cadcam_pct: 60, crescimento_5a_pct: 2   },
  { estado: "Virginia",       uf: "VA", regiao: "South",     labs: 210,  laboratoristas: 840,  populacao_mi: 8.64,  labs_por_100k: 2.43, receita_media_usd: 580000, cadcam_pct: 64, crescimento_5a_pct: -1  },
  { estado: "Washington",     uf: "WA", regiao: "West",      labs: 200,  laboratoristas: 800,  populacao_mi: 7.81,  labs_por_100k: 2.56, receita_media_usd: 640000, cadcam_pct: 70, crescimento_5a_pct: 1   },
  { estado: "Arizona",        uf: "AZ", regiao: "West",      labs: 190,  laboratoristas: 760,  populacao_mi: 7.36,  labs_por_100k: 2.58, receita_media_usd: 520000, cadcam_pct: 62, crescimento_5a_pct: 5   },
  { estado: "Maryland",       uf: "MD", regiao: "South",     labs: 180,  laboratoristas: 720,  populacao_mi: 6.18,  labs_por_100k: 2.91, receita_media_usd: 610000, cadcam_pct: 66, crescimento_5a_pct: -4  },
  { estado: "Minnesota",      uf: "MN", regiao: "Midwest",   labs: 170,  laboratoristas: 680,  populacao_mi: 5.71,  labs_por_100k: 2.98, receita_media_usd: 580000, cadcam_pct: 68, crescimento_5a_pct: -3  },
  { estado: "Colorado",       uf: "CO", regiao: "West",      labs: 165,  laboratoristas: 660,  populacao_mi: 5.84,  labs_por_100k: 2.83, receita_media_usd: 600000, cadcam_pct: 69, crescimento_5a_pct: 1   },
  { estado: "Connecticut",    uf: "CT", regiao: "Northeast", labs: 150,  laboratoristas: 600,  populacao_mi: 3.63,  labs_por_100k: 4.13, receita_media_usd: 750000, cadcam_pct: 73, crescimento_5a_pct: -15 },
  { estado: "Oregon",         uf: "OR", regiao: "West",      labs: 140,  laboratoristas: 560,  populacao_mi: 4.24,  labs_por_100k: 3.30, receita_media_usd: 570000, cadcam_pct: 67, crescimento_5a_pct: -2  },
];

// ─── GERMANY ─────────────────────────────────────────────────────────────────

export const indicadoresLabsDE = {
  totalLabs: "8,500",           // Dentallabore – VDZI Jahresbericht 2023
  laboratoristas: "44,000",     // Zahntechniker – Destatis
  marktvolumen: "€6.2B",        // Gesamtmarkt Zahntechnik
  adocaoCADCAM: "~85%",         // highest globally
  gkvAnteil: "~52%",            // share of GKV (public insurance) patients
  laboratoriosPorDentista: "1:9.1",
  tempoMedioEntrega: "3–5d",
  umsatzJeLab: "~€730k",
};

export const labsPorEstadoDE = [
  { estado: "Bayern",              labs: 1420, zahntechniker: 7500, umsatz_mi: 1040, cadcam_pct: 88, demanda_gkv: 32, gap: 2,  populacao_mi: 13.18, labs_por_100k: 10.77, digitalisierung_pct: 72 },
  { estado: "NRW",                 labs: 1650, zahntechniker: 8400, umsatz_mi: 1200, cadcam_pct: 82, demanda_gkv: 38, gap: -2, populacao_mi: 18.08, labs_por_100k: 9.13,  digitalisierung_pct: 65 },
  { estado: "Baden-Württemberg",   labs: 1180, zahntechniker: 6200, umsatz_mi: 860,  cadcam_pct: 90, demanda_gkv: 27, gap: 1,  populacao_mi: 11.10, labs_por_100k: 10.63, digitalisierung_pct: 75 },
  { estado: "Niedersachsen",       labs: 760,  zahntechniker: 4000, umsatz_mi: 555,  cadcam_pct: 80, demanda_gkv: 18, gap: 0,  populacao_mi: 8.03,  labs_por_100k: 9.46,  digitalisierung_pct: 62 },
  { estado: "Hessen",              labs: 620,  zahntechniker: 3300, umsatz_mi: 453,  cadcam_pct: 84, demanda_gkv: 14, gap: 1,  populacao_mi: 6.29,  labs_por_100k: 9.86,  digitalisierung_pct: 68 },
  { estado: "Sachsen",             labs: 480,  zahntechniker: 2500, umsatz_mi: 350,  cadcam_pct: 76, demanda_gkv: 12, gap: -3, populacao_mi: 4.04,  labs_por_100k: 11.88, digitalisierung_pct: 58 },
  { estado: "Rheinland-Pfalz",     labs: 340,  zahntechniker: 1800, umsatz_mi: 248,  cadcam_pct: 81, demanda_gkv: 8,  gap: 0,  populacao_mi: 4.11,  labs_por_100k: 8.27,  digitalisierung_pct: 63 },
  { estado: "Schleswig-Holstein",  labs: 320,  zahntechniker: 1650, umsatz_mi: 234,  cadcam_pct: 79, demanda_gkv: 7,  gap: 0,  populacao_mi: 2.93,  labs_por_100k: 10.92, digitalisierung_pct: 61 },
  { estado: "Thüringen",           labs: 220,  zahntechniker: 1150, umsatz_mi: 161,  cadcam_pct: 74, demanda_gkv: 6,  gap: -1, populacao_mi: 2.11,  labs_por_100k: 10.43, digitalisierung_pct: 55 },
  { estado: "Mecklenburg-VP",      labs: 165,  zahntechniker: 850,  umsatz_mi: 121,  cadcam_pct: 72, demanda_gkv: 5,  gap: -2, populacao_mi: 1.61,  labs_por_100k: 10.25, digitalisierung_pct: 52 },
  { estado: "Berlin",              labs: 380,  zahntechniker: 1950, umsatz_mi: 278,  cadcam_pct: 86, demanda_gkv: 10, gap: -1, populacao_mi: 3.75,  labs_por_100k: 10.13, digitalisierung_pct: 70 },
  { estado: "Hamburg",             labs: 280,  zahntechniker: 1450, umsatz_mi: 205,  cadcam_pct: 87, demanda_gkv: 5,  gap: 0,  populacao_mi: 1.89,  labs_por_100k: 14.81, digitalisierung_pct: 73 },
  { estado: "Brandenburg",         labs: 180,  zahntechniker: 920,  umsatz_mi: 132,  cadcam_pct: 73, demanda_gkv: 7,  gap: -2, populacao_mi: 2.55,  labs_por_100k: 7.06,  digitalisierung_pct: 51 },
  { estado: "Sachsen-Anhalt",      labs: 160,  zahntechniker: 820,  umsatz_mi: 117,  cadcam_pct: 71, demanda_gkv: 6,  gap: -3, populacao_mi: 2.15,  labs_por_100k: 7.44,  digitalisierung_pct: 49 },
  { estado: "Saarland",            labs: 110,  zahntechniker: 560,  umsatz_mi: 80,   cadcam_pct: 78, demanda_gkv: 3,  gap: 0,  populacao_mi: 0.98,  labs_por_100k: 11.22, digitalisierung_pct: 60 },
  { estado: "Bremen",              labs: 85,   zahntechniker: 430,  umsatz_mi: 62,   cadcam_pct: 80, demanda_gkv: 2,  gap: 0,  populacao_mi: 0.68,  labs_por_100k: 12.50, digitalisierung_pct: 64 },
];

export const comparativoValoresDE = [
  { tipo: "Zahnersatz (Vollprothese)", gkv_festzuschuss: 730,  mercado_medio: 1100, mercado_premium: 3200, gap_pct: 34, tendencia: "Stabil",   volume_anual: 850000  },
  { tipo: "Teilprothese (RPD)",        gkv_festzuschuss: 550,  mercado_medio: 1200, mercado_premium: 3500, gap_pct: 54, tendencia: "Stabil",   volume_anual: 620000  },
  { tipo: "Keramikkrone (VMK)",        gkv_festzuschuss: 410,  mercado_medio: 850,  mercado_premium: 1800, gap_pct: 52, tendencia: "Sinkend",  volume_anual: 2100000 },
  { tipo: "Zirkonkrone (Vollkeramik)", gkv_festzuschuss: 0,    mercado_medio: 1100, mercado_premium: 2800, gap_pct: 100, tendencia: "Steigend", volume_anual: 1600000 },
  { tipo: "Implantatversorgung",       gkv_festzuschuss: 0,    mercado_medio: 2200, mercado_premium: 5500, gap_pct: 100, tendencia: "Steigend", volume_anual: 800000  },
  { tipo: "Keramikfacette",           gkv_festzuschuss: 0,    mercado_medio: 900,  mercado_premium: 2500, gap_pct: 100, tendencia: "Steigend", volume_anual: 480000  },
  { tipo: "All-on-4 (Kiefer)",        gkv_festzuschuss: 0,    mercado_medio: 16000, mercado_premium: 38000, gap_pct: 100, tendencia: "Steigend", volume_anual: 120000 },
  { tipo: "PMMA-Provisorium",         gkv_festzuschuss: 180,  mercado_medio: 380,  mercado_premium: 750,  gap_pct: 53, tendencia: "Stabil",   volume_anual: 1800000 },
];

export const tecnologiasLabsDE = [
  { tecnologia: "CAD/CAM Fräsen",         adocao_pais_pct: 85, adocao_mundial_pct: 42, investimento_eur: 110000, roi_meses: 13, produtividade_pct: 68, tendencia: "Crescente"  },
  { tecnologia: "3D-Druck (Kunstharze)",  adocao_pais_pct: 62, adocao_mundial_pct: 28, investimento_eur: 28000,  roi_meses: 9,  produtividade_pct: 52, tendencia: "Explosivo"  },
  { tecnologia: "Monolithische Zirkonia", adocao_pais_pct: 80, adocao_mundial_pct: 48, investimento_eur: 18000,  roi_meses: 6,  produtividade_pct: 38, tendencia: "Crescente"  },
  { tecnologia: "Intraoralscanner",       adocao_pais_pct: 70, adocao_mundial_pct: 38, investimento_eur: 55000,  roi_meses: 12, produtividade_pct: 45, tendencia: "Crescente"  },
  { tecnologia: "KI-gestütztes Design",   adocao_pais_pct: 18, adocao_mundial_pct: 8,  investimento_eur: 14000,  roi_meses: 5,  produtividade_pct: 62, tendencia: "Inicial"    },
];

export const serieHistoricaLabsDE = [
  { ano: 2015, total_labs: 9800, labs_digitais: 2940, producao_mi_unidades: 78, mercado_bi_eur: 4.8 },
  { ano: 2016, total_labs: 9600, labs_digitais: 3168, producao_mi_unidades: 79, mercado_bi_eur: 5.0 },
  { ano: 2017, total_labs: 9400, labs_digitais: 3478, producao_mi_unidades: 80, mercado_bi_eur: 5.2 },
  { ano: 2018, total_labs: 9200, labs_digitais: 3772, producao_mi_unidades: 82, mercado_bi_eur: 5.5 },
  { ano: 2019, total_labs: 9000, labs_digitais: 4140, producao_mi_unidades: 84, mercado_bi_eur: 5.7 },
  { ano: 2020, total_labs: 8800, labs_digitais: 3872, producao_mi_unidades: 74, mercado_bi_eur: 5.1 },
  { ano: 2021, total_labs: 8700, labs_digitais: 4263, producao_mi_unidades: 82, mercado_bi_eur: 5.7 },
  { ano: 2022, total_labs: 8600, labs_digitais: 4558, producao_mi_unidades: 87, mercado_bi_eur: 6.0 },
  { ano: 2023, total_labs: 8500, labs_digitais: 4845, producao_mi_unidades: 90, mercado_bi_eur: 6.2 },
];
