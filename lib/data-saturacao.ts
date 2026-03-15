// =============================================================================
// OdontoData - Previsão de Saturação por Especialidade
// Fontes: CFO, INEP, CAPES, IBGE (Projeções Populacionais)
// =============================================================================

export interface ProjecaoSaturacao {
  especialidade: string;
  profissionais_atuais: number;
  formandos_ano: number;
  taxa_crescimento_demanda_pct: number;
  taxa_crescimento_oferta_pct: number;
  ano_equilibrio: number | null;
  status: "Saturado" | "Em Saturação" | "Equilibrado" | "Deficit";
  projecao_5_anos: { ano: number; oferta: number; demanda: number }[];
}

export interface ProjecaoRegiao {
  regiao: string;
  especialidade: string;
  saturacao_atual_pct: number;
  saturacao_2030_pct: number;
  risco: "Crítico" | "Alto" | "Moderado" | "Baixo" | "Oportunidade";
}

export interface PipelineUniversidade {
  uf: string;
  estado: string;
  vagas_graduacao: number;
  vagas_especializacao: number;
  taxa_conclusao_pct: number;
  formandos_projetados_2030: number;
  absorcao_mercado_pct: number;
}

export interface AlertaSaturacao {
  titulo: string;
  descricao: string;
  regiao: string;
  especialidade: string;
  severidade: "Critico" | "Alerta" | "Atencao";
  dados_suporte: string;
}

export const indicadoresSaturacao = {
  especialidadesMaisSaturadas: "Ortodontia",
  especialidadesMaisCarentes: "Odontogeriatria",
  formandosAnuais: 28400,
  taxaAbsorcaoMedia: "72%",
  anoColapsoOrtodontia: 2027,
  regiaoMaisSaturada: "Sudeste",
  regiaoMaisOportunidade: "Norte",
  crescimentoDemandaIdosos: "+340%",
};

export const tendenciaEspecialidades = [
  { ano: 2020, ortodontia: 112, implantodontia: 105, endodontia: 88, odontogeriatria: 22, odontopediatria: 95 },
  { ano: 2021, ortodontia: 118, implantodontia: 110, endodontia: 86, odontogeriatria: 25, odontopediatria: 93 },
  { ano: 2022, ortodontia: 125, implantodontia: 116, endodontia: 84, odontogeriatria: 28, odontopediatria: 92 },
  { ano: 2023, ortodontia: 132, implantodontia: 122, endodontia: 82, odontogeriatria: 32, odontopediatria: 90 },
  { ano: 2024, ortodontia: 138, implantodontia: 128, endodontia: 80, odontogeriatria: 35, odontopediatria: 88 },
  { ano: 2025, ortodontia: 145, implantodontia: 134, endodontia: 78, odontogeriatria: 38, odontopediatria: 87 },
  { ano: 2026, ortodontia: 152, implantodontia: 140, endodontia: 76, odontogeriatria: 42, odontopediatria: 86 },
  { ano: 2027, ortodontia: 160, implantodontia: 146, endodontia: 75, odontogeriatria: 48, odontopediatria: 85 },
  { ano: 2028, ortodontia: 168, implantodontia: 152, endodontia: 74, odontogeriatria: 55, odontopediatria: 84 },
  { ano: 2029, ortodontia: 175, implantodontia: 158, endodontia: 73, odontogeriatria: 62, odontopediatria: 83 },
  { ano: 2030, ortodontia: 182, implantodontia: 164, endodontia: 72, odontogeriatria: 70, odontopediatria: 82 },
];

export const projecaoSaturacao: ProjecaoSaturacao[] = [
  { especialidade: "Ortodontia", profissionais_atuais: 48400, formandos_ano: 4200, taxa_crescimento_demanda_pct: 2.1, taxa_crescimento_oferta_pct: 8.7, ano_equilibrio: null, status: "Saturado", projecao_5_anos: [{ ano: 2025, oferta: 52600, demanda: 36200 }, { ano: 2026, oferta: 57200, demanda: 36960 }, { ano: 2027, oferta: 62100, demanda: 37740 }, { ano: 2028, oferta: 67300, demanda: 38530 }, { ano: 2029, oferta: 72800, demanda: 39340 }, { ano: 2030, oferta: 78600, demanda: 40160 }] },
  { especialidade: "Implantodontia", profissionais_atuais: 35600, formandos_ano: 3500, taxa_crescimento_demanda_pct: 4.5, taxa_crescimento_oferta_pct: 9.8, ano_equilibrio: null, status: "Em Saturação", projecao_5_anos: [{ ano: 2025, oferta: 39100, demanda: 32800 }, { ano: 2026, oferta: 42900, demanda: 34280 }, { ano: 2027, oferta: 47100, demanda: 35820 }, { ano: 2028, oferta: 51700, demanda: 37430 }, { ano: 2029, oferta: 56800, demanda: 39110 }, { ano: 2030, oferta: 62300, demanda: 40870 }] },
  { especialidade: "Harmonização Orofacial", profissionais_atuais: 18200, formandos_ano: 3800, taxa_crescimento_demanda_pct: 5.2, taxa_crescimento_oferta_pct: 20.9, ano_equilibrio: null, status: "Em Saturação", projecao_5_anos: [{ ano: 2025, oferta: 22000, demanda: 15800 }, { ano: 2026, oferta: 26600, demanda: 16620 }, { ano: 2027, oferta: 32200, demanda: 17490 }, { ano: 2028, oferta: 38900, demanda: 18400 }, { ano: 2029, oferta: 47000, demanda: 19360 }, { ano: 2030, oferta: 56800, demanda: 20370 }] },
  { especialidade: "Endodontia", profissionais_atuais: 29000, formandos_ano: 1800, taxa_crescimento_demanda_pct: 3.2, taxa_crescimento_oferta_pct: 6.2, ano_equilibrio: 2028, status: "Equilibrado", projecao_5_anos: [{ ano: 2025, oferta: 30800, demanda: 35200 }, { ano: 2026, oferta: 32700, demanda: 36330 }, { ano: 2027, oferta: 34700, demanda: 37490 }, { ano: 2028, oferta: 36900, demanda: 38690 }, { ano: 2029, oferta: 39200, demanda: 39930 }, { ano: 2030, oferta: 41600, demanda: 41200 }] },
  { especialidade: "Periodontia", profissionais_atuais: 14200, formandos_ano: 980, taxa_crescimento_demanda_pct: 3.8, taxa_crescimento_oferta_pct: 6.9, ano_equilibrio: 2029, status: "Equilibrado", projecao_5_anos: [{ ano: 2025, oferta: 15180, demanda: 18500 }, { ano: 2026, oferta: 16230, demanda: 19200 }, { ano: 2027, oferta: 17350, demanda: 19930 }, { ano: 2028, oferta: 18540, demanda: 20690 }, { ano: 2029, oferta: 19820, demanda: 21480 }, { ano: 2030, oferta: 21180, demanda: 22300 }] },
  { especialidade: "Prótese Dentária", profissionais_atuais: 12800, formandos_ano: 850, taxa_crescimento_demanda_pct: 5.8, taxa_crescimento_oferta_pct: 6.6, ano_equilibrio: 2032, status: "Deficit", projecao_5_anos: [{ ano: 2025, oferta: 13650, demanda: 22400 }, { ano: 2026, oferta: 14550, demanda: 23700 }, { ano: 2027, oferta: 15510, demanda: 25070 }, { ano: 2028, oferta: 16530, demanda: 26520 }, { ano: 2029, oferta: 17620, demanda: 28060 }, { ano: 2030, oferta: 18780, demanda: 29690 }] },
  { especialidade: "Odontogeriatria", profissionais_atuais: 1850, formandos_ano: 320, taxa_crescimento_demanda_pct: 12.5, taxa_crescimento_oferta_pct: 17.3, ano_equilibrio: null, status: "Deficit", projecao_5_anos: [{ ano: 2025, oferta: 2170, demanda: 8500 }, { ano: 2026, oferta: 2540, demanda: 9560 }, { ano: 2027, oferta: 2980, demanda: 10760 }, { ano: 2028, oferta: 3490, demanda: 12100 }, { ano: 2029, oferta: 4100, demanda: 13610 }, { ano: 2030, oferta: 4800, demanda: 15310 }] },
  { especialidade: "Odontopediatria", profissionais_atuais: 8900, formandos_ano: 720, taxa_crescimento_demanda_pct: -0.8, taxa_crescimento_oferta_pct: 8.1, ano_equilibrio: null, status: "Em Saturação", projecao_5_anos: [{ ano: 2025, oferta: 9620, demanda: 9200 }, { ano: 2026, oferta: 10400, demanda: 9126 }, { ano: 2027, oferta: 11240, demanda: 9053 }, { ano: 2028, oferta: 12150, demanda: 8981 }, { ano: 2029, oferta: 13130, demanda: 8909 }, { ano: 2030, oferta: 14200, demanda: 8838 }] },
  { especialidade: "Cirurgia BMF", profissionais_atuais: 6200, formandos_ano: 380, taxa_crescimento_demanda_pct: 2.8, taxa_crescimento_oferta_pct: 6.1, ano_equilibrio: 2030, status: "Deficit", projecao_5_anos: [{ ano: 2025, oferta: 6580, demanda: 9800 }, { ano: 2026, oferta: 6980, demanda: 10074 }, { ano: 2027, oferta: 7410, demanda: 10356 }, { ano: 2028, oferta: 7860, demanda: 10646 }, { ano: 2029, oferta: 8340, demanda: 10944 }, { ano: 2030, oferta: 8850, demanda: 11250 }] },
  { especialidade: "Dentística", profissionais_atuais: 7500, formandos_ano: 620, taxa_crescimento_demanda_pct: 3.5, taxa_crescimento_oferta_pct: 8.3, ano_equilibrio: 2027, status: "Equilibrado", projecao_5_anos: [{ ano: 2025, oferta: 8120, demanda: 8800 }, { ano: 2026, oferta: 8800, demanda: 9108 }, { ano: 2027, oferta: 9530, demanda: 9427 }, { ano: 2028, oferta: 10320, demanda: 9757 }, { ano: 2029, oferta: 11180, demanda: 10098 }, { ano: 2030, oferta: 12100, demanda: 10451 }] },
  { especialidade: "Radiologia Odontológica", profissionais_atuais: 4200, formandos_ano: 350, taxa_crescimento_demanda_pct: 4.2, taxa_crescimento_oferta_pct: 8.3, ano_equilibrio: 2028, status: "Equilibrado", projecao_5_anos: [{ ano: 2025, oferta: 4550, demanda: 5200 }, { ano: 2026, oferta: 4928, demanda: 5418 }, { ano: 2027, oferta: 5337, demanda: 5646 }, { ano: 2028, oferta: 5780, demanda: 5883 }, { ano: 2029, oferta: 6260, demanda: 6130 }, { ano: 2030, oferta: 6780, demanda: 6388 }] },
  { especialidade: "Odontologia do Trabalho", profissionais_atuais: 2100, formandos_ano: 280, taxa_crescimento_demanda_pct: 6.5, taxa_crescimento_oferta_pct: 13.3, ano_equilibrio: 2026, status: "Equilibrado", projecao_5_anos: [{ ano: 2025, oferta: 2380, demanda: 3200 }, { ano: 2026, oferta: 2700, demanda: 3408 }, { ano: 2027, oferta: 3060, demanda: 3629 }, { ano: 2028, oferta: 3470, demanda: 3865 }, { ano: 2029, oferta: 3930, demanda: 4116 }, { ano: 2030, oferta: 4460, demanda: 4383 }] },
];

export const projecaoPorRegiao: ProjecaoRegiao[] = [
  // Sudeste
  { regiao: "Sudeste", especialidade: "Ortodontia", saturacao_atual_pct: 155, saturacao_2030_pct: 210, risco: "Crítico" },
  { regiao: "Sudeste", especialidade: "Implantodontia", saturacao_atual_pct: 135, saturacao_2030_pct: 175, risco: "Alto" },
  { regiao: "Sudeste", especialidade: "Endodontia", saturacao_atual_pct: 95, saturacao_2030_pct: 115, risco: "Moderado" },
  { regiao: "Sudeste", especialidade: "Odontogeriatria", saturacao_atual_pct: 32, saturacao_2030_pct: 45, risco: "Oportunidade" },
  { regiao: "Sudeste", especialidade: "Prótese Dentária", saturacao_atual_pct: 78, saturacao_2030_pct: 88, risco: "Baixo" },
  // Sul
  { regiao: "Sul", especialidade: "Ortodontia", saturacao_atual_pct: 148, saturacao_2030_pct: 195, risco: "Crítico" },
  { regiao: "Sul", especialidade: "Implantodontia", saturacao_atual_pct: 142, saturacao_2030_pct: 185, risco: "Crítico" },
  { regiao: "Sul", especialidade: "Endodontia", saturacao_atual_pct: 88, saturacao_2030_pct: 105, risco: "Moderado" },
  { regiao: "Sul", especialidade: "Odontogeriatria", saturacao_atual_pct: 28, saturacao_2030_pct: 40, risco: "Oportunidade" },
  { regiao: "Sul", especialidade: "Prótese Dentária", saturacao_atual_pct: 72, saturacao_2030_pct: 82, risco: "Baixo" },
  // Centro-Oeste
  { regiao: "Centro-Oeste", especialidade: "Ortodontia", saturacao_atual_pct: 128, saturacao_2030_pct: 168, risco: "Alto" },
  { regiao: "Centro-Oeste", especialidade: "Implantodontia", saturacao_atual_pct: 115, saturacao_2030_pct: 150, risco: "Alto" },
  { regiao: "Centro-Oeste", especialidade: "Endodontia", saturacao_atual_pct: 72, saturacao_2030_pct: 92, risco: "Baixo" },
  { regiao: "Centro-Oeste", especialidade: "Odontogeriatria", saturacao_atual_pct: 18, saturacao_2030_pct: 28, risco: "Oportunidade" },
  { regiao: "Centro-Oeste", especialidade: "Prótese Dentária", saturacao_atual_pct: 55, saturacao_2030_pct: 68, risco: "Oportunidade" },
  // Nordeste
  { regiao: "Nordeste", especialidade: "Ortodontia", saturacao_atual_pct: 85, saturacao_2030_pct: 125, risco: "Moderado" },
  { regiao: "Nordeste", especialidade: "Implantodontia", saturacao_atual_pct: 62, saturacao_2030_pct: 95, risco: "Baixo" },
  { regiao: "Nordeste", especialidade: "Endodontia", saturacao_atual_pct: 48, saturacao_2030_pct: 65, risco: "Oportunidade" },
  { regiao: "Nordeste", especialidade: "Odontogeriatria", saturacao_atual_pct: 8, saturacao_2030_pct: 15, risco: "Oportunidade" },
  { regiao: "Nordeste", especialidade: "Prótese Dentária", saturacao_atual_pct: 35, saturacao_2030_pct: 48, risco: "Oportunidade" },
  // Norte
  { regiao: "Norte", especialidade: "Ortodontia", saturacao_atual_pct: 55, saturacao_2030_pct: 85, risco: "Baixo" },
  { regiao: "Norte", especialidade: "Implantodontia", saturacao_atual_pct: 35, saturacao_2030_pct: 58, risco: "Oportunidade" },
  { regiao: "Norte", especialidade: "Endodontia", saturacao_atual_pct: 28, saturacao_2030_pct: 42, risco: "Oportunidade" },
  { regiao: "Norte", especialidade: "Odontogeriatria", saturacao_atual_pct: 5, saturacao_2030_pct: 10, risco: "Oportunidade" },
  { regiao: "Norte", especialidade: "Prótese Dentária", saturacao_atual_pct: 22, saturacao_2030_pct: 35, risco: "Oportunidade" },
];

export const pipelineUniversidades: PipelineUniversidade[] = [
  { uf: "SP", estado: "São Paulo", vagas_graduacao: 12500, vagas_especializacao: 4800, taxa_conclusao_pct: 82, formandos_projetados_2030: 10250, absorcao_mercado_pct: 58 },
  { uf: "MG", estado: "Minas Gerais", vagas_graduacao: 5800, vagas_especializacao: 2200, taxa_conclusao_pct: 78, formandos_projetados_2030: 4524, absorcao_mercado_pct: 65 },
  { uf: "PR", estado: "Paraná", vagas_graduacao: 3200, vagas_especializacao: 1400, taxa_conclusao_pct: 80, formandos_projetados_2030: 2560, absorcao_mercado_pct: 62 },
  { uf: "RJ", estado: "Rio de Janeiro", vagas_graduacao: 3800, vagas_especializacao: 1800, taxa_conclusao_pct: 75, formandos_projetados_2030: 2850, absorcao_mercado_pct: 55 },
  { uf: "BA", estado: "Bahia", vagas_graduacao: 2400, vagas_especializacao: 680, taxa_conclusao_pct: 72, formandos_projetados_2030: 1728, absorcao_mercado_pct: 78 },
  { uf: "RS", estado: "Rio Grande do Sul", vagas_graduacao: 2200, vagas_especializacao: 950, taxa_conclusao_pct: 81, formandos_projetados_2030: 1782, absorcao_mercado_pct: 64 },
  { uf: "GO", estado: "Goiás", vagas_graduacao: 2600, vagas_especializacao: 1100, taxa_conclusao_pct: 76, formandos_projetados_2030: 1976, absorcao_mercado_pct: 68 },
  { uf: "SC", estado: "Santa Catarina", vagas_graduacao: 1800, vagas_especializacao: 720, taxa_conclusao_pct: 83, formandos_projetados_2030: 1494, absorcao_mercado_pct: 60 },
  { uf: "CE", estado: "Ceará", vagas_graduacao: 1600, vagas_especializacao: 480, taxa_conclusao_pct: 74, formandos_projetados_2030: 1184, absorcao_mercado_pct: 82 },
  { uf: "PE", estado: "Pernambuco", vagas_graduacao: 1500, vagas_especializacao: 520, taxa_conclusao_pct: 73, formandos_projetados_2030: 1095, absorcao_mercado_pct: 80 },
  { uf: "PA", estado: "Pará", vagas_graduacao: 900, vagas_especializacao: 180, taxa_conclusao_pct: 70, formandos_projetados_2030: 630, absorcao_mercado_pct: 92 },
  { uf: "MT", estado: "Mato Grosso", vagas_graduacao: 1200, vagas_especializacao: 380, taxa_conclusao_pct: 75, formandos_projetados_2030: 900, absorcao_mercado_pct: 75 },
  { uf: "MA", estado: "Maranhão", vagas_graduacao: 800, vagas_especializacao: 120, taxa_conclusao_pct: 68, formandos_projetados_2030: 544, absorcao_mercado_pct: 95 },
  { uf: "PI", estado: "Piauí", vagas_graduacao: 1100, vagas_especializacao: 280, taxa_conclusao_pct: 71, formandos_projetados_2030: 781, absorcao_mercado_pct: 72 },
  { uf: "AM", estado: "Amazonas", vagas_graduacao: 500, vagas_especializacao: 80, taxa_conclusao_pct: 65, formandos_projetados_2030: 325, absorcao_mercado_pct: 98 },
];

export const alertasSaturacao: AlertaSaturacao[] = [
  { titulo: "Colapso Ortodontia Sudeste", descricao: "A região Sudeste atingirá 210% de saturação em ortodontia até 2030, com queda de 35% na renda média dos profissionais.", regiao: "Sudeste", especialidade: "Ortodontia", severidade: "Critico", dados_suporte: "4.200 novos ortodontistas/ano vs crescimento de demanda de 2.1%/ano" },
  { titulo: "Bolha Harmonização Orofacial", descricao: "O crescimento de 20.9% ao ano na oferta de especialistas em HOF é insustentável. Mercado deve saturar completamente até 2027.", regiao: "Nacional", especialidade: "Harmonização Orofacial", severidade: "Critico", dados_suporte: "3.800 novos especialistas/ano para demanda que cresce 5.2%/ano" },
  { titulo: "Deficit Crítico Odontogeriatria Norte", descricao: "Com apenas 5% da demanda atendida e envelhecimento acelerado, o Norte terá crise em atendimento geriátrico.", regiao: "Norte", especialidade: "Odontogeriatria", severidade: "Critico", dados_suporte: "Pop. 60+ crescerá 340% até 2040, apenas 1.850 especialistas no Brasil" },
  { titulo: "Implantodontia Sul em Risco", descricao: "Região Sul já apresenta 142% de saturação em implantodontia, tendendo a 185% até 2030.", regiao: "Sul", especialidade: "Implantodontia", severidade: "Alerta", dados_suporte: "3.500 novos implantodontistas/ano, concentração de 68% no Sul-Sudeste" },
  { titulo: "Oportunidade Prótese Nordeste", descricao: "Com apenas 35% da demanda atendida, há espaço significativo para protesistas no Nordeste.", regiao: "Nordeste", especialidade: "Prótese Dentária", severidade: "Atencao", dados_suporte: "58.3% de edentulismo em idosos vs 850 formandos/ano na especialidade" },
  { titulo: "Endodontia Norte Desassistida", descricao: "Região Norte possui apenas 28% da demanda de endodontia atendida. Oportunidade clara.", regiao: "Norte", especialidade: "Endodontia", severidade: "Atencao", dados_suporte: "Zero endodontistas em 72% dos municípios do Norte" },
  { titulo: "Odontopediatria vs Queda de Natalidade", descricao: "Com taxa de natalidade em queda (-0.8%/ano), a odontopediatria caminha para saturação apesar de crescimento moderado.", regiao: "Nacional", especialidade: "Odontopediatria", severidade: "Alerta", dados_suporte: "720 novos pediatras/ano vs redução de 0.8% na população alvo" },
  { titulo: "Cirurgia BMF Subofertada", descricao: "Déficit nacional persistente em cirurgia bucomaxilofacial, especialmente nas regiões Norte e Nordeste.", regiao: "Nacional", especialidade: "Cirurgia BMF", severidade: "Atencao", dados_suporte: "380 novos cirurgiões/ano para déficit de 3.600 profissionais" },
];
