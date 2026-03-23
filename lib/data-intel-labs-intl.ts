// =============================================================================
// OdontoData — Dental Lab Intelligence: USA & Germany
// Sources: NADL 2022, ADA HPI, BLS, FDA (USA) | VDZI 2023, BZÄK, GKV-SV (DE)
// =============================================================================

// ─── USA ─────────────────────────────────────────────────────────────────────

export const indicadoresLabsUSA = {
  totalLabs: "7,500",
  laboratoristas: "45,000",     // CDTs (Certified Dental Technicians) – NADL / BLS
  producaoMensal: "~850k",      // units/month estimate
  mercadoAnual: "$4.5B",
  adocaoCADCAM: "+68%",
  labsDigitais: "42%",
  crescimentoDSO: "+22%",       // Dental Service Orgs driving in-house labs
  tempoMedioEntrega: "5–7d",
};

export const labsPorRegiaoUSA = [
  { regiao: "Northeast", total_labs: 1850, labs_digitais: 810, laboratoristas: 11000, capacidade_mensal: 208000, producao_atual_mensal: 185000, ocupacao_pct: 89, demanda_estimada_mensal: 210000, gap_producao: -25000 },
  { regiao: "South",     total_labs: 2100, labs_digitais: 880, laboratoristas: 12500, capacidade_mensal: 240000, producao_atual_mensal: 205000, ocupacao_pct: 85, demanda_estimada_mensal: 252000, gap_producao: -47000 },
  { regiao: "Midwest",   total_labs: 1700, labs_digitais: 680, laboratoristas: 10000, capacidade_mensal: 195000, producao_atual_mensal: 162000, ocupacao_pct: 83, demanda_estimada_mensal: 188000, gap_producao: -26000 },
  { regiao: "West",      total_labs: 1850, labs_digitais: 820, laboratoristas: 11500, capacidade_mensal: 215000, producao_atual_mensal: 192000, ocupacao_pct: 89, demanda_estimada_mensal: 220000, gap_producao: -28000 },
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

export const cdtsPorRegiaoUSA = [
  { regiao: "Northeast",    cdts: 11000, labs: 1850, renda_media_usd: 52000, demanda_estimada: 210000, saturacao: "Adequate" },
  { regiao: "South",        cdts: 12500, labs: 2100, renda_media_usd: 44000, demanda_estimada: 252000, saturacao: "Shortage"  },
  { regiao: "Midwest",      cdts: 10000, labs: 1700, renda_media_usd: 48000, demanda_estimada: 188000, saturacao: "Adequate" },
  { regiao: "West",         cdts: 11500, labs: 1850, renda_media_usd: 58000, demanda_estimada: 220000, saturacao: "Adequate" },
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
  { estado: "Bayern",              labs: 1420, zahntechniker: 7500, umsatz_mi: 1040, cadcam_pct: 88, demanda_gkv: 32, gap: 2  },
  { estado: "NRW",                 labs: 1650, zahntechniker: 8400, umsatz_mi: 1200, cadcam_pct: 82, demanda_gkv: 38, gap: -2 },
  { estado: "Baden-Württemberg",   labs: 1180, zahntechniker: 6200, umsatz_mi: 860,  cadcam_pct: 90, demanda_gkv: 27, gap: 1  },
  { estado: "Niedersachsen",       labs: 760,  zahntechniker: 4000, umsatz_mi: 555,  cadcam_pct: 80, demanda_gkv: 18, gap: 0  },
  { estado: "Hessen",              labs: 620,  zahntechniker: 3300, umsatz_mi: 453,  cadcam_pct: 84, demanda_gkv: 14, gap: 1  },
  { estado: "Sachsen",             labs: 480,  zahntechniker: 2500, umsatz_mi: 350,  cadcam_pct: 76, demanda_gkv: 12, gap: -3 },
  { estado: "Rheinland-Pfalz",     labs: 340,  zahntechniker: 1800, umsatz_mi: 248,  cadcam_pct: 81, demanda_gkv: 8,  gap: 0  },
  { estado: "Schleswig-Holstein",  labs: 320,  zahntechniker: 1650, umsatz_mi: 234,  cadcam_pct: 79, demanda_gkv: 7,  gap: 0  },
  { estado: "Thüringen",           labs: 220,  zahntechniker: 1150, umsatz_mi: 161,  cadcam_pct: 74, demanda_gkv: 6,  gap: -1 },
  { estado: "Mecklenburg-VP",      labs: 165,  zahntechniker: 850,  umsatz_mi: 121,  cadcam_pct: 72, demanda_gkv: 5,  gap: -2 },
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
