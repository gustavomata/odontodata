// =============================================================================
// OdontoData - Radar SUS: Oportunidades no Sistema Público
// Fontes: CNES, DataSUS, e-Gestor AB, FNS, DAB/MS
// =============================================================================

export interface VagaSUS {
  municipio: string;
  uf: string;
  regiao: string;
  tipo_vaga: "ESB Modalidade I" | "ESB Modalidade II" | "CEO" | "LRPD";
  salario_estimado: number;
  carga_horaria: "20h" | "40h";
  tempo_aberta_meses: number;
  populacao_coberta: number;
  urgencia: "Crítica" | "Alta" | "Moderada";
}

export interface CEOAbaixoMeta {
  nome_ceo: string;
  municipio: string;
  uf: string;
  meta_mensal: number;
  producao_atual: number;
  cumprimento_pct: number;
  risco_descredenciamento: boolean;
  especialidades_deficitarias: string[];
}

export interface VerbaFederal {
  uf: string;
  estado: string;
  verba_aprovada_mi: number;
  verba_executada_mi: number;
  execucao_pct: number;
  equipes_previstas: number;
  equipes_implantadas: number;
  deficit_equipes: number;
}

export interface OportunidadeEspecialidade {
  especialidade: string;
  vagas_abertas_nacional: number;
  salario_medio_sus: number;
  regioes_mais_carentes: string[];
  crescimento_vagas_pct: number;
}

export interface SerieVagas {
  ano: number;
  vagas_abertas: number;
  vagas_preenchidas: number;
  taxa_preenchimento: number;
}

export const indicadoresRadarSUS = {
  vagasTotalAberto: 3247,
  salarioMedio: "R$ 7.800",
  taxaPreenchimento: "68%",
  ceosRiscoDescredenciamento: 89,
  verbaFederalNaoExecutada_bi: "R$ 1.2",
  estadoMaisVagas: "MA",
  especialidadeMaisVagas: "Cirurgia BMF",
  tempoMedioAberta: "8.3 meses",
};

export const vagasSUSNaoPreenchidas: VagaSUS[] = [
  { municipio: "Barra do Corda", uf: "MA", regiao: "Nordeste", tipo_vaga: "ESB Modalidade I", salario_estimado: 6500, carga_horaria: "40h", tempo_aberta_meses: 14, populacao_coberta: 45000, urgencia: "Crítica" },
  { municipio: "São Félix do Xingu", uf: "PA", regiao: "Norte", tipo_vaga: "ESB Modalidade I", salario_estimado: 8200, carga_horaria: "40h", tempo_aberta_meses: 18, populacao_coberta: 38000, urgencia: "Crítica" },
  { municipio: "Tefé", uf: "AM", regiao: "Norte", tipo_vaga: "ESB Modalidade II", salario_estimado: 9500, carga_horaria: "40h", tempo_aberta_meses: 22, populacao_coberta: 62000, urgencia: "Crítica" },
  { municipio: "Codó", uf: "MA", regiao: "Nordeste", tipo_vaga: "ESB Modalidade I", salario_estimado: 5800, carga_horaria: "40h", tempo_aberta_meses: 11, populacao_coberta: 52000, urgencia: "Crítica" },
  { municipio: "Altamira", uf: "PA", regiao: "Norte", tipo_vaga: "CEO", salario_estimado: 11200, carga_horaria: "20h", tempo_aberta_meses: 16, populacao_coberta: 115000, urgencia: "Crítica" },
  { municipio: "Cruzeiro do Sul", uf: "AC", regiao: "Norte", tipo_vaga: "ESB Modalidade II", salario_estimado: 10500, carga_horaria: "40h", tempo_aberta_meses: 15, populacao_coberta: 88000, urgencia: "Crítica" },
  { municipio: "Parintins", uf: "AM", regiao: "Norte", tipo_vaga: "ESB Modalidade I", salario_estimado: 7800, carga_horaria: "40h", tempo_aberta_meses: 12, populacao_coberta: 42000, urgencia: "Alta" },
  { municipio: "Bacabal", uf: "MA", regiao: "Nordeste", tipo_vaga: "CEO", salario_estimado: 9800, carga_horaria: "20h", tempo_aberta_meses: 10, populacao_coberta: 104000, urgencia: "Alta" },
  { municipio: "Pinheiro", uf: "MA", regiao: "Nordeste", tipo_vaga: "ESB Modalidade I", salario_estimado: 5500, carga_horaria: "40h", tempo_aberta_meses: 9, populacao_coberta: 38000, urgencia: "Alta" },
  { municipio: "Tucuruí", uf: "PA", regiao: "Norte", tipo_vaga: "LRPD", salario_estimado: 4800, carga_horaria: "40h", tempo_aberta_meses: 13, populacao_coberta: 112000, urgencia: "Alta" },
  { municipio: "Oiapoque", uf: "AP", regiao: "Norte", tipo_vaga: "ESB Modalidade I", salario_estimado: 12000, carga_horaria: "40h", tempo_aberta_meses: 24, populacao_coberta: 28000, urgencia: "Crítica" },
  { municipio: "Tabatinga", uf: "AM", regiao: "Norte", tipo_vaga: "ESB Modalidade I", salario_estimado: 11500, carga_horaria: "40h", tempo_aberta_meses: 20, populacao_coberta: 67000, urgencia: "Crítica" },
  { municipio: "Grajaú", uf: "MA", regiao: "Nordeste", tipo_vaga: "ESB Modalidade I", salario_estimado: 6200, carga_horaria: "40h", tempo_aberta_meses: 8, populacao_coberta: 35000, urgencia: "Alta" },
  { municipio: "Itacoatiara", uf: "AM", regiao: "Norte", tipo_vaga: "CEO", salario_estimado: 10200, carga_horaria: "20h", tempo_aberta_meses: 11, populacao_coberta: 101000, urgencia: "Alta" },
  { municipio: "Abaetetuba", uf: "PA", regiao: "Norte", tipo_vaga: "ESB Modalidade I", salario_estimado: 6800, carga_horaria: "40h", tempo_aberta_meses: 7, populacao_coberta: 42000, urgencia: "Moderada" },
  { municipio: "Santa Inês", uf: "MA", regiao: "Nordeste", tipo_vaga: "LRPD", salario_estimado: 4200, carga_horaria: "40h", tempo_aberta_meses: 6, populacao_coberta: 88000, urgencia: "Moderada" },
  { municipio: "Breves", uf: "PA", regiao: "Norte", tipo_vaga: "ESB Modalidade II", salario_estimado: 9200, carga_horaria: "40h", tempo_aberta_meses: 19, populacao_coberta: 103000, urgencia: "Crítica" },
  { municipio: "Chapadinha", uf: "MA", regiao: "Nordeste", tipo_vaga: "ESB Modalidade I", salario_estimado: 5800, carga_horaria: "40h", tempo_aberta_meses: 10, populacao_coberta: 32000, urgencia: "Alta" },
  { municipio: "Cametá", uf: "PA", regiao: "Norte", tipo_vaga: "ESB Modalidade I", salario_estimado: 7200, carga_horaria: "40h", tempo_aberta_meses: 8, populacao_coberta: 36000, urgencia: "Moderada" },
  { municipio: "Coari", uf: "AM", regiao: "Norte", tipo_vaga: "CEO", salario_estimado: 11800, carga_horaria: "20h", tempo_aberta_meses: 17, populacao_coberta: 85000, urgencia: "Crítica" },
  { municipio: "Presidente Dutra", uf: "MA", regiao: "Nordeste", tipo_vaga: "ESB Modalidade I", salario_estimado: 5200, carga_horaria: "40h", tempo_aberta_meses: 5, populacao_coberta: 28000, urgencia: "Moderada" },
  { municipio: "Tarauacá", uf: "AC", regiao: "Norte", tipo_vaga: "ESB Modalidade I", salario_estimado: 10800, carga_horaria: "40h", tempo_aberta_meses: 21, populacao_coberta: 42000, urgencia: "Crítica" },
  { municipio: "Oriximiná", uf: "PA", regiao: "Norte", tipo_vaga: "ESB Modalidade I", salario_estimado: 8500, carga_horaria: "40h", tempo_aberta_meses: 14, populacao_coberta: 35000, urgencia: "Alta" },
  { municipio: "Viana", uf: "MA", regiao: "Nordeste", tipo_vaga: "LRPD", salario_estimado: 4500, carga_horaria: "40h", tempo_aberta_meses: 7, populacao_coberta: 50000, urgencia: "Moderada" },
  { municipio: "Humaitá", uf: "AM", regiao: "Norte", tipo_vaga: "ESB Modalidade I", salario_estimado: 9800, carga_horaria: "40h", tempo_aberta_meses: 16, populacao_coberta: 55000, urgencia: "Alta" },
];

export const ceosAbaixoMeta: CEOAbaixoMeta[] = [
  { nome_ceo: "CEO Regional de Imperatriz", municipio: "Imperatriz", uf: "MA", meta_mensal: 420, producao_atual: 185, cumprimento_pct: 44, risco_descredenciamento: true, especialidades_deficitarias: ["Endodontia", "Periodontia"] },
  { nome_ceo: "CEO Tipo II Santarém", municipio: "Santarém", uf: "PA", meta_mensal: 350, producao_atual: 168, cumprimento_pct: 48, risco_descredenciamento: true, especialidades_deficitarias: ["Cirurgia BMF", "Endodontia"] },
  { nome_ceo: "CEO Municipal de Codó", municipio: "Codó", uf: "MA", meta_mensal: 280, producao_atual: 142, cumprimento_pct: 51, risco_descredenciamento: true, especialidades_deficitarias: ["Periodontia", "Diagnóstico bucal"] },
  { nome_ceo: "CEO Tipo I Marabá", municipio: "Marabá", uf: "PA", meta_mensal: 320, producao_atual: 172, cumprimento_pct: 54, risco_descredenciamento: true, especialidades_deficitarias: ["Endodontia"] },
  { nome_ceo: "CEO Regional Rio Branco", municipio: "Rio Branco", uf: "AC", meta_mensal: 400, producao_atual: 228, cumprimento_pct: 57, risco_descredenciamento: true, especialidades_deficitarias: ["Cirurgia BMF", "Periodontia"] },
  { nome_ceo: "CEO Tipo I Tefé", municipio: "Tefé", uf: "AM", meta_mensal: 240, producao_atual: 142, cumprimento_pct: 59, risco_descredenciamento: false, especialidades_deficitarias: ["Endodontia", "Cirurgia BMF", "Periodontia"] },
  { nome_ceo: "CEO Municipal de Bacabal", municipio: "Bacabal", uf: "MA", meta_mensal: 300, producao_atual: 186, cumprimento_pct: 62, risco_descredenciamento: false, especialidades_deficitarias: ["Cirurgia BMF"] },
  { nome_ceo: "CEO Tipo II Palmas", municipio: "Palmas", uf: "TO", meta_mensal: 380, producao_atual: 243, cumprimento_pct: 64, risco_descredenciamento: false, especialidades_deficitarias: ["Periodontia"] },
  { nome_ceo: "CEO Regional Porto Velho", municipio: "Porto Velho", uf: "RO", meta_mensal: 360, producao_atual: 237, cumprimento_pct: 66, risco_descredenciamento: false, especialidades_deficitarias: ["Endodontia"] },
  { nome_ceo: "CEO Municipal Macapá", municipio: "Macapá", uf: "AP", meta_mensal: 300, producao_atual: 201, cumprimento_pct: 67, risco_descredenciamento: false, especialidades_deficitarias: ["Diagnóstico bucal"] },
  { nome_ceo: "CEO Tipo I Timon", municipio: "Timon", uf: "MA", meta_mensal: 260, producao_atual: 179, cumprimento_pct: 69, risco_descredenciamento: false, especialidades_deficitarias: ["Cirurgia BMF", "Periodontia"] },
  { nome_ceo: "CEO Municipal Boa Vista", municipio: "Boa Vista", uf: "RR", meta_mensal: 340, producao_atual: 238, cumprimento_pct: 70, risco_descredenciamento: false, especialidades_deficitarias: ["Endodontia"] },
  { nome_ceo: "CEO Tipo II Manaus Norte", municipio: "Manaus", uf: "AM", meta_mensal: 420, producao_atual: 298, cumprimento_pct: 71, risco_descredenciamento: false, especialidades_deficitarias: ["Periodontia"] },
  { nome_ceo: "CEO Tipo I Parauapebas", municipio: "Parauapebas", uf: "PA", meta_mensal: 300, producao_atual: 216, cumprimento_pct: 72, risco_descredenciamento: false, especialidades_deficitarias: ["Diagnóstico bucal"] },
  { nome_ceo: "CEO Municipal Teresina Sul", municipio: "Teresina", uf: "PI", meta_mensal: 380, producao_atual: 281, cumprimento_pct: 74, risco_descredenciamento: false, especialidades_deficitarias: ["Cirurgia BMF"] },
];

export const verbaFederalDisponivel: VerbaFederal[] = [
  { uf: "MA", estado: "Maranhão", verba_aprovada_mi: 185.4, verba_executada_mi: 98.2, execucao_pct: 53, equipes_previstas: 1240, equipes_implantadas: 820, deficit_equipes: 420 },
  { uf: "PA", estado: "Pará", verba_aprovada_mi: 168.2, verba_executada_mi: 95.8, execucao_pct: 57, equipes_previstas: 1180, equipes_implantadas: 745, deficit_equipes: 435 },
  { uf: "AM", estado: "Amazonas", verba_aprovada_mi: 112.5, verba_executada_mi: 67.5, execucao_pct: 60, equipes_previstas: 680, equipes_implantadas: 428, deficit_equipes: 252 },
  { uf: "BA", estado: "Bahia", verba_aprovada_mi: 245.8, verba_executada_mi: 162.2, execucao_pct: 66, equipes_previstas: 1850, equipes_implantadas: 1350, deficit_equipes: 500 },
  { uf: "PI", estado: "Piauí", verba_aprovada_mi: 78.6, verba_executada_mi: 53.4, execucao_pct: 68, equipes_previstas: 520, equipes_implantadas: 375, deficit_equipes: 145 },
  { uf: "CE", estado: "Ceará", verba_aprovada_mi: 156.3, verba_executada_mi: 112.5, execucao_pct: 72, equipes_previstas: 1120, equipes_implantadas: 865, deficit_equipes: 255 },
  { uf: "PE", estado: "Pernambuco", verba_aprovada_mi: 142.8, verba_executada_mi: 107.1, execucao_pct: 75, equipes_previstas: 980, equipes_implantadas: 768, deficit_equipes: 212 },
  { uf: "MG", estado: "Minas Gerais", verba_aprovada_mi: 312.4, verba_executada_mi: 246.8, execucao_pct: 79, equipes_previstas: 2450, equipes_implantadas: 2050, deficit_equipes: 400 },
  { uf: "AC", estado: "Acre", verba_aprovada_mi: 32.5, verba_executada_mi: 18.8, execucao_pct: 58, equipes_previstas: 180, equipes_implantadas: 112, deficit_equipes: 68 },
  { uf: "RO", estado: "Rondônia", verba_aprovada_mi: 45.2, verba_executada_mi: 29.4, execucao_pct: 65, equipes_previstas: 280, equipes_implantadas: 195, deficit_equipes: 85 },
];

export const oportunidadesPorEspecialidade: OportunidadeEspecialidade[] = [
  { especialidade: "Cirurgia BMF", vagas_abertas_nacional: 580, salario_medio_sus: 11200, regioes_mais_carentes: ["Norte", "Nordeste"], crescimento_vagas_pct: 15.2 },
  { especialidade: "Endodontia", vagas_abertas_nacional: 520, salario_medio_sus: 9800, regioes_mais_carentes: ["Norte", "Nordeste", "Centro-Oeste"], crescimento_vagas_pct: 12.8 },
  { especialidade: "Periodontia", vagas_abertas_nacional: 445, salario_medio_sus: 9200, regioes_mais_carentes: ["Norte", "Nordeste"], crescimento_vagas_pct: 10.5 },
  { especialidade: "Diagnóstico Bucal", vagas_abertas_nacional: 380, salario_medio_sus: 10500, regioes_mais_carentes: ["Norte", "Centro-Oeste"], crescimento_vagas_pct: 18.4 },
  { especialidade: "Prótese Dentária", vagas_abertas_nacional: 350, salario_medio_sus: 8500, regioes_mais_carentes: ["Norte", "Nordeste"], crescimento_vagas_pct: 8.2 },
  { especialidade: "Odontopediatria", vagas_abertas_nacional: 320, salario_medio_sus: 8200, regioes_mais_carentes: ["Norte", "Nordeste"], crescimento_vagas_pct: 6.5 },
  { especialidade: "Pacientes Especiais", vagas_abertas_nacional: 280, salario_medio_sus: 9500, regioes_mais_carentes: ["Norte", "Nordeste", "Centro-Oeste"], crescimento_vagas_pct: 22.1 },
  { especialidade: "Estomatologia", vagas_abertas_nacional: 245, salario_medio_sus: 10800, regioes_mais_carentes: ["Norte", "Nordeste"], crescimento_vagas_pct: 14.6 },
];

export const serieHistoricaVagas: SerieVagas[] = [
  { ano: 2018, vagas_abertas: 2180, vagas_preenchidas: 1650, taxa_preenchimento: 75.7 },
  { ano: 2019, vagas_abertas: 2350, vagas_preenchidas: 1740, taxa_preenchimento: 74.0 },
  { ano: 2020, vagas_abertas: 2890, vagas_preenchidas: 1620, taxa_preenchimento: 56.1 },
  { ano: 2021, vagas_abertas: 3120, vagas_preenchidas: 2050, taxa_preenchimento: 65.7 },
  { ano: 2022, vagas_abertas: 2980, vagas_preenchidas: 2180, taxa_preenchimento: 73.2 },
  { ano: 2023, vagas_abertas: 3050, vagas_preenchidas: 2240, taxa_preenchimento: 73.4 },
  { ano: 2024, vagas_abertas: 3247, vagas_preenchidas: 2208, taxa_preenchimento: 68.0 },
];
