// =============================================================================
// OdontoData - Monitor de Movimentação Profissional CRO
// Fontes: CFO, CROs Regionais, IBGE
// =============================================================================

export interface MovimentacaoMensal {
  mes: string;
  mes_label: string;
  novos_registros: number;
  cancelamentos: number;
  transferencias: number;
  saldo_liquido: number;
}

export interface MovimentacaoUF {
  uf: string;
  estado: string;
  novos_12_meses: number;
  cancelados_12_meses: number;
  saldo: number;
  transferencias_entrada: number;
  transferencias_saida: number;
  saldo_migratorio: number;
  tendencia: "Crescimento" | "Estável" | "Declínio";
}

export interface MovimentacaoEspecialidade {
  especialidade: string;
  novos_registros_12m: number;
  crescimento_pct: number;
  principal_destino_uf: string;
  concentracao_capital_pct: number;
}

export interface FluxoMigratorio {
  origem_uf: string;
  destino_uf: string;
  volume: number;
  principal_especialidade: string;
  motivo_provavel: string;
}

export interface AlertaCompetitivo {
  cidade: string;
  uf: string;
  especialidade: string;
  novos_ultimos_3_meses: number;
  variacao_pct: number;
  impacto: "Alto" | "Moderado" | "Baixo";
  descricao: string;
}

export const indicadoresMonitor = {
  novosRegistrosMes: 2340,
  saldoLiquido12m: "+18.750",
  maiorCrescimentoUF: "SC",
  maiorEvasaoUF: "RJ",
  especialidadeMaisCresceu: "Harmonização Orofacial",
  cidadeMaisNovos: "São Paulo",
  taxaTransferencia: "3.2%",
  mediaMensalHistorica: 2180,
};

export const movimentacaoMensal: MovimentacaoMensal[] = [
  { mes: "2024-03", mes_label: "Mar/24", novos_registros: 2180, cancelamentos: 420, transferencias: 185, saldo_liquido: 1760 },
  { mes: "2024-04", mes_label: "Abr/24", novos_registros: 2050, cancelamentos: 395, transferencias: 172, saldo_liquido: 1655 },
  { mes: "2024-05", mes_label: "Mai/24", novos_registros: 2220, cancelamentos: 410, transferencias: 198, saldo_liquido: 1810 },
  { mes: "2024-06", mes_label: "Jun/24", novos_registros: 1980, cancelamentos: 385, transferencias: 165, saldo_liquido: 1595 },
  { mes: "2024-07", mes_label: "Jul/24", novos_registros: 2450, cancelamentos: 440, transferencias: 210, saldo_liquido: 2010 },
  { mes: "2024-08", mes_label: "Ago/24", novos_registros: 2380, cancelamentos: 425, transferencias: 195, saldo_liquido: 1955 },
  { mes: "2024-09", mes_label: "Set/24", novos_registros: 2150, cancelamentos: 405, transferencias: 178, saldo_liquido: 1745 },
  { mes: "2024-10", mes_label: "Out/24", novos_registros: 2280, cancelamentos: 418, transferencias: 192, saldo_liquido: 1862 },
  { mes: "2024-11", mes_label: "Nov/24", novos_registros: 2120, cancelamentos: 390, transferencias: 168, saldo_liquido: 1730 },
  { mes: "2024-12", mes_label: "Dez/24", novos_registros: 1850, cancelamentos: 360, transferencias: 145, saldo_liquido: 1490 },
  { mes: "2025-01", mes_label: "Jan/25", novos_registros: 2580, cancelamentos: 455, transferencias: 220, saldo_liquido: 2125 },
  { mes: "2025-02", mes_label: "Fev/25", novos_registros: 2340, cancelamentos: 428, transferencias: 205, saldo_liquido: 1912 },
];

export const movimentacaoPorUF: MovimentacaoUF[] = [
  { uf: "SP", estado: "São Paulo", novos_12_meses: 5840, cancelados_12_meses: 1250, saldo: 4590, transferencias_entrada: 680, transferencias_saida: 420, saldo_migratorio: 260, tendencia: "Crescimento" },
  { uf: "MG", estado: "Minas Gerais", novos_12_meses: 2680, cancelados_12_meses: 580, saldo: 2100, transferencias_entrada: 320, transferencias_saida: 285, saldo_migratorio: 35, tendencia: "Crescimento" },
  { uf: "RJ", estado: "Rio de Janeiro", novos_12_meses: 1920, cancelados_12_meses: 850, saldo: 1070, transferencias_entrada: 180, transferencias_saida: 420, saldo_migratorio: -240, tendencia: "Declínio" },
  { uf: "PR", estado: "Paraná", novos_12_meses: 1580, cancelados_12_meses: 320, saldo: 1260, transferencias_entrada: 280, transferencias_saida: 165, saldo_migratorio: 115, tendencia: "Crescimento" },
  { uf: "SC", estado: "Santa Catarina", novos_12_meses: 1420, cancelados_12_meses: 185, saldo: 1235, transferencias_entrada: 350, transferencias_saida: 95, saldo_migratorio: 255, tendencia: "Crescimento" },
  { uf: "RS", estado: "Rio Grande do Sul", novos_12_meses: 1180, cancelados_12_meses: 420, saldo: 760, transferencias_entrada: 120, transferencias_saida: 285, saldo_migratorio: -165, tendencia: "Declínio" },
  { uf: "GO", estado: "Goiás", novos_12_meses: 1350, cancelados_12_meses: 280, saldo: 1070, transferencias_entrada: 245, transferencias_saida: 135, saldo_migratorio: 110, tendencia: "Crescimento" },
  { uf: "BA", estado: "Bahia", novos_12_meses: 1280, cancelados_12_meses: 380, saldo: 900, transferencias_entrada: 95, transferencias_saida: 220, saldo_migratorio: -125, tendencia: "Estável" },
  { uf: "CE", estado: "Ceará", novos_12_meses: 980, cancelados_12_meses: 245, saldo: 735, transferencias_entrada: 85, transferencias_saida: 165, saldo_migratorio: -80, tendencia: "Estável" },
  { uf: "PE", estado: "Pernambuco", novos_12_meses: 920, cancelados_12_meses: 265, saldo: 655, transferencias_entrada: 78, transferencias_saida: 195, saldo_migratorio: -117, tendencia: "Estável" },
  { uf: "PA", estado: "Pará", novos_12_meses: 680, cancelados_12_meses: 145, saldo: 535, transferencias_entrada: 65, transferencias_saida: 85, saldo_migratorio: -20, tendencia: "Crescimento" },
  { uf: "MT", estado: "Mato Grosso", novos_12_meses: 620, cancelados_12_meses: 125, saldo: 495, transferencias_entrada: 180, transferencias_saida: 55, saldo_migratorio: 125, tendencia: "Crescimento" },
  { uf: "MA", estado: "Maranhão", novos_12_meses: 480, cancelados_12_meses: 95, saldo: 385, transferencias_entrada: 42, transferencias_saida: 120, saldo_migratorio: -78, tendencia: "Crescimento" },
  { uf: "DF", estado: "Distrito Federal", novos_12_meses: 850, cancelados_12_meses: 280, saldo: 570, transferencias_entrada: 320, transferencias_saida: 185, saldo_migratorio: 135, tendencia: "Crescimento" },
  { uf: "ES", estado: "Espírito Santo", novos_12_meses: 520, cancelados_12_meses: 135, saldo: 385, transferencias_entrada: 95, transferencias_saida: 78, saldo_migratorio: 17, tendencia: "Estável" },
  { uf: "MS", estado: "Mato Grosso do Sul", novos_12_meses: 380, cancelados_12_meses: 85, saldo: 295, transferencias_entrada: 110, transferencias_saida: 45, saldo_migratorio: 65, tendencia: "Crescimento" },
  { uf: "PI", estado: "Piauí", novos_12_meses: 420, cancelados_12_meses: 95, saldo: 325, transferencias_entrada: 35, transferencias_saida: 145, saldo_migratorio: -110, tendencia: "Declínio" },
  { uf: "AM", estado: "Amazonas", novos_12_meses: 320, cancelados_12_meses: 75, saldo: 245, transferencias_entrada: 38, transferencias_saida: 65, saldo_migratorio: -27, tendencia: "Crescimento" },
  { uf: "RN", estado: "Rio Grande do Norte", novos_12_meses: 380, cancelados_12_meses: 110, saldo: 270, transferencias_entrada: 55, transferencias_saida: 88, saldo_migratorio: -33, tendencia: "Estável" },
  { uf: "PB", estado: "Paraíba", novos_12_meses: 350, cancelados_12_meses: 105, saldo: 245, transferencias_entrada: 42, transferencias_saida: 92, saldo_migratorio: -50, tendencia: "Estável" },
  { uf: "TO", estado: "Tocantins", novos_12_meses: 280, cancelados_12_meses: 55, saldo: 225, transferencias_entrada: 85, transferencias_saida: 42, saldo_migratorio: 43, tendencia: "Crescimento" },
  { uf: "AL", estado: "Alagoas", novos_12_meses: 245, cancelados_12_meses: 68, saldo: 177, transferencias_entrada: 28, transferencias_saida: 72, saldo_migratorio: -44, tendencia: "Estável" },
  { uf: "SE", estado: "Sergipe", novos_12_meses: 210, cancelados_12_meses: 58, saldo: 152, transferencias_entrada: 25, transferencias_saida: 65, saldo_migratorio: -40, tendencia: "Estável" },
  { uf: "RO", estado: "Rondônia", novos_12_meses: 220, cancelados_12_meses: 48, saldo: 172, transferencias_entrada: 65, transferencias_saida: 28, saldo_migratorio: 37, tendencia: "Crescimento" },
  { uf: "AC", estado: "Acre", novos_12_meses: 85, cancelados_12_meses: 18, saldo: 67, transferencias_entrada: 22, transferencias_saida: 35, saldo_migratorio: -13, tendencia: "Estável" },
  { uf: "AP", estado: "Amapá", novos_12_meses: 72, cancelados_12_meses: 15, saldo: 57, transferencias_entrada: 18, transferencias_saida: 25, saldo_migratorio: -7, tendencia: "Estável" },
  { uf: "RR", estado: "Roraima", novos_12_meses: 58, cancelados_12_meses: 12, saldo: 46, transferencias_entrada: 22, transferencias_saida: 15, saldo_migratorio: 7, tendencia: "Crescimento" },
];

export const movimentacaoPorEspecialidade: MovimentacaoEspecialidade[] = [
  { especialidade: "Harmonização Orofacial", novos_registros_12m: 3850, crescimento_pct: 42.5, principal_destino_uf: "SP", concentracao_capital_pct: 72 },
  { especialidade: "Implantodontia", novos_registros_12m: 3480, crescimento_pct: 15.2, principal_destino_uf: "SP", concentracao_capital_pct: 58 },
  { especialidade: "Ortodontia", novos_registros_12m: 4180, crescimento_pct: 8.8, principal_destino_uf: "SP", concentracao_capital_pct: 62 },
  { especialidade: "Endodontia", novos_registros_12m: 1820, crescimento_pct: 6.2, principal_destino_uf: "MG", concentracao_capital_pct: 48 },
  { especialidade: "Prótese Dentária", novos_registros_12m: 850, crescimento_pct: 3.5, principal_destino_uf: "SP", concentracao_capital_pct: 45 },
  { especialidade: "Odontopediatria", novos_registros_12m: 720, crescimento_pct: 2.8, principal_destino_uf: "SP", concentracao_capital_pct: 55 },
  { especialidade: "Periodontia", novos_registros_12m: 980, crescimento_pct: 5.4, principal_destino_uf: "SP", concentracao_capital_pct: 52 },
  { especialidade: "Cirurgia BMF", novos_registros_12m: 380, crescimento_pct: 4.2, principal_destino_uf: "SP", concentracao_capital_pct: 65 },
  { especialidade: "Odontogeriatria", novos_registros_12m: 320, crescimento_pct: 28.5, principal_destino_uf: "SP", concentracao_capital_pct: 68 },
  { especialidade: "Dentística", novos_registros_12m: 620, crescimento_pct: 4.8, principal_destino_uf: "SP", concentracao_capital_pct: 50 },
  { especialidade: "Radiologia Odontológica", novos_registros_12m: 350, crescimento_pct: 5.1, principal_destino_uf: "SP", concentracao_capital_pct: 58 },
  { especialidade: "Odontologia do Trabalho", novos_registros_12m: 280, crescimento_pct: 12.3, principal_destino_uf: "SP", concentracao_capital_pct: 42 },
  { especialidade: "Saúde Coletiva", novos_registros_12m: 450, crescimento_pct: 8.5, principal_destino_uf: "CE", concentracao_capital_pct: 38 },
  { especialidade: "Odontologia Legal", novos_registros_12m: 180, crescimento_pct: 6.8, principal_destino_uf: "SP", concentracao_capital_pct: 55 },
  { especialidade: "Patologia Bucal", novos_registros_12m: 120, crescimento_pct: 3.2, principal_destino_uf: "SP", concentracao_capital_pct: 72 },
];

export const fluxoMigratorio: FluxoMigratorio[] = [
  { origem_uf: "PI", destino_uf: "SP", volume: 145, principal_especialidade: "Clínico Geral", motivo_provavel: "Excesso de formandos em Teresina, busca por mercado maior" },
  { origem_uf: "RJ", destino_uf: "SC", volume: 135, principal_especialidade: "Implantodontia", motivo_provavel: "Qualidade de vida e mercado menos saturado" },
  { origem_uf: "RJ", destino_uf: "SP", volume: 128, principal_especialidade: "Ortodontia", motivo_provavel: "Crise econômica no RJ, mercado maior em SP" },
  { origem_uf: "BA", destino_uf: "SP", volume: 120, principal_especialidade: "Clínico Geral", motivo_provavel: "Busca por melhor remuneração" },
  { origem_uf: "MG", destino_uf: "DF", volume: 115, principal_especialidade: "Harmonização Orofacial", motivo_provavel: "Renda per capita alta do DF" },
  { origem_uf: "SP", destino_uf: "SC", volume: 108, principal_especialidade: "Clínico Geral", motivo_provavel: "Qualidade de vida, fuga da saturação" },
  { origem_uf: "RS", destino_uf: "SC", volume: 95, principal_especialidade: "Implantodontia", motivo_provavel: "Economia mais dinâmica de SC" },
  { origem_uf: "PE", destino_uf: "SP", volume: 88, principal_especialidade: "Endodontia", motivo_provavel: "Mercado mais amplo" },
  { origem_uf: "GO", destino_uf: "MT", volume: 82, principal_especialidade: "Clínico Geral", motivo_provavel: "Expansão do agronegócio em MT" },
  { origem_uf: "CE", destino_uf: "SP", volume: 75, principal_especialidade: "Ortodontia", motivo_provavel: "Saturação do mercado de Fortaleza" },
  { origem_uf: "SP", destino_uf: "MT", volume: 72, principal_especialidade: "Implantodontia", motivo_provavel: "Mercado em expansão, menos saturação" },
  { origem_uf: "MG", destino_uf: "GO", volume: 68, principal_especialidade: "Clínico Geral", motivo_provavel: "Crescimento econômico de Goiás" },
  { origem_uf: "RS", destino_uf: "PR", volume: 65, principal_especialidade: "Clínico Geral", motivo_provavel: "Proximidade e melhor mercado" },
  { origem_uf: "PA", destino_uf: "SP", volume: 55, principal_especialidade: "Cirurgia BMF", motivo_provavel: "Formação especializada em SP" },
  { origem_uf: "SP", destino_uf: "MS", volume: 48, principal_especialidade: "Ortodontia", motivo_provavel: "Mercado menos saturado no interior de MS" },
];

export const alertasCompetitivos: AlertaCompetitivo[] = [
  { cidade: "Florianópolis", uf: "SC", especialidade: "Harmonização Orofacial", novos_ultimos_3_meses: 28, variacao_pct: 85, impacto: "Alto", descricao: "Explosão de novos profissionais de HOF na Grande Florianópolis. Mercado pode saturar rapidamente." },
  { cidade: "Goiânia", uf: "GO", especialidade: "Implantodontia", novos_ultimos_3_meses: 22, variacao_pct: 45, impacto: "Alto", descricao: "Forte crescimento de implantodontistas. 3 novas clínicas especializadas abertas no trimestre." },
  { cidade: "Curitiba", uf: "PR", especialidade: "Ortodontia", novos_ultimos_3_meses: 35, variacao_pct: 32, impacto: "Alto", descricao: "Ortodontia já saturada com influxo constante de novos especialistas." },
  { cidade: "Brasília", uf: "DF", especialidade: "Harmonização Orofacial", novos_ultimos_3_meses: 18, variacao_pct: 62, impacto: "Moderado", descricao: "Crescimento acelerado de HOF no Plano Piloto e Águas Claras." },
  { cidade: "Campinas", uf: "SP", especialidade: "Implantodontia", novos_ultimos_3_meses: 15, variacao_pct: 28, impacto: "Moderado", descricao: "Mercado de implantes aquecido com novos entrantes da região metropolitana." },
  { cidade: "Ribeirão Preto", uf: "SP", especialidade: "Ortodontia", novos_ultimos_3_meses: 12, variacao_pct: 25, impacto: "Moderado", descricao: "Saturação crescente com formandos da USP-RP e Unaerp." },
  { cidade: "Salvador", uf: "BA", especialidade: "Harmonização Orofacial", novos_ultimos_3_meses: 14, variacao_pct: 55, impacto: "Moderado", descricao: "Mercado de HOF em rápida expansão na capital baiana." },
  { cidade: "Sinop", uf: "MT", especialidade: "Clínico Geral", novos_ultimos_3_meses: 8, variacao_pct: 18, impacto: "Baixo", descricao: "Crescimento moderado acompanhando expansão urbana." },
  { cidade: "Palmas", uf: "TO", especialidade: "Endodontia", novos_ultimos_3_meses: 5, variacao_pct: 42, impacto: "Baixo", descricao: "Novos endodontistas preenchendo lacuna de mercado." },
  { cidade: "Marabá", uf: "PA", especialidade: "Clínico Geral", novos_ultimos_3_meses: 6, variacao_pct: 35, impacto: "Baixo", descricao: "Crescimento natural acompanhando demanda da mineração." },
];
