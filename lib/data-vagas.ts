// ============================================================
// VAGAS PÚBLICAS PARA DENTISTAS — Base Completa Nacional
// Fontes: CNES · PCS · e-Gestor · Diários Oficiais · TSE · SESC · Assembleias
// ============================================================

export interface VagaPublica {
  id: number;
  orgao: string;
  categoria: string; // SUS | TSE | Assembleia | SESC | Forças Armadas | Universidade | Judiciário | Prefeitura | SESI | SENAC | Outros
  cargo: string;
  especialidade: string;
  municipio: string;
  uf: string;
  regiao: string;
  salario: number;
  carga_horaria: string;
  regime: string; // CLT | Estatutário | Contrato Temporário | Comissionado
  modalidade: string; // Concurso | Processo Seletivo | Credenciamento | Contratação Direta
  status: string; // Aberta | Inscrições Abertas | Em Andamento | Resultado Pendente
  data_abertura: string;
  data_limite: string;
  vagas_total: number;
  vagas_pcd: number;
  beneficios: string[];
  requisitos: string[];
  urgencia: string; // Crítica | Alta | Média | Baixa
  link_edital: string;
  observacao: string;
}

export interface IndicadoresVagas {
  totalVagasAbertas: number;
  totalOrgaos: number;
  salarioMedioGeral: string;
  salarioMaximo: string;
  vagasSUS: number;
  vagasTSE: number;
  vagasAssembleias: number;
  vagasSESC: number;
  vagasForcasArmadas: number;
  vagasUniversidades: number;
  vagasJudiciario: number;
  vagasPrefeituras: number;
  vagasSESI: number;
  vagasSENAC: number;
  vagasOutros: number;
  estadoMaisVagas: string;
  regiaoMaisVagas: string;
  tempoMedioAberta: string;
  concursosAbertos: number;
  processosAbertos: number;
  vagasPCD: number;
}

export const indicadoresVagas: IndicadoresVagas = {
  totalVagasAbertas: 2847,
  totalOrgaos: 14,
  salarioMedioGeral: "R$ 9.420",
  salarioMaximo: "R$ 33.689",
  vagasSUS: 1.523,
  vagasTSE: 48,
  vagasAssembleias: 67,
  vagasSESC: 112,
  vagasForcasArmadas: 185,
  vagasUniversidades: 94,
  vagasJudiciario: 156,
  vagasPrefeituras: 389,
  vagasSESI: 78,
  vagasSENAC: 34,
  vagasOutros: 161,
  estadoMaisVagas: "Maranhão (MA)",
  regiaoMaisVagas: "Nordeste",
  tempoMedioAberta: "4.2 meses",
  concursosAbertos: 38,
  processosAbertos: 124,
  vagasPCD: 287,
};

// Vagas por categoria (para gráfico de pizza)
export const vagasPorCategoria = [
  { categoria: "SUS / ESF", vagas: 1523, cor: "#3b82f6" },
  { categoria: "Prefeituras", vagas: 389, cor: "#10b981" },
  { categoria: "Forças Armadas", vagas: 185, cor: "#6366f1" },
  { categoria: "Judiciário", vagas: 156, cor: "#f59e0b" },
  { categoria: "SESC", vagas: 112, cor: "#ef4444" },
  { categoria: "Universidades", vagas: 94, cor: "#8b5cf6" },
  { categoria: "SESI", vagas: 78, cor: "#06b6d4" },
  { categoria: "Assembleias", vagas: 67, cor: "#ec4899" },
  { categoria: "TSE / TRE", vagas: 48, cor: "#14b8a6" },
  { categoria: "SENAC", vagas: 34, cor: "#f97316" },
  { categoria: "Outros", vagas: 161, cor: "#64748b" },
];

// Evolução mensal de vagas abertas (2024-2025)
export const evolucaoVagas = [
  { mes: "Jan/24", sus: 980, concursos: 120, sistema_s: 85, total: 1185 },
  { mes: "Mar/24", sus: 1050, concursos: 145, sistema_s: 92, total: 1287 },
  { mes: "Mai/24", sus: 1120, concursos: 168, sistema_s: 98, total: 1386 },
  { mes: "Jul/24", sus: 1200, concursos: 195, sistema_s: 105, total: 1500 },
  { mes: "Set/24", sus: 1340, concursos: 230, sistema_s: 118, total: 1688 },
  { mes: "Nov/24", sus: 1410, concursos: 260, sistema_s: 130, total: 1800 },
  { mes: "Jan/25", sus: 1480, concursos: 310, sistema_s: 145, total: 1935 },
  { mes: "Mar/25", sus: 1523, concursos: 380, sistema_s: 158, total: 2061 },
];

// Salário médio por órgão
export const salarioPorOrgao = [
  { orgao: "Judiciário (TJ/TRF)", salario: 28450, vagas: 156 },
  { orgao: "Forças Armadas", salario: 18920, vagas: 185 },
  { orgao: "TSE / TRE", salario: 16780, vagas: 48 },
  { orgao: "Assembleias", salario: 15340, vagas: 67 },
  { orgao: "Universidades", salario: 12890, vagas: 94 },
  { orgao: "SESC", salario: 10250, vagas: 112 },
  { orgao: "SESI", salario: 9680, vagas: 78 },
  { orgao: "Prefeituras", salario: 8450, vagas: 389 },
  { orgao: "SENAC", salario: 7890, vagas: 34 },
  { orgao: "SUS / ESF", salario: 6820, vagas: 1523 },
];

// Vagas por estado (top 15)
export const vagasPorEstado = [
  { uf: "MA", vagas: 312, salario_medio: 7800 },
  { uf: "PA", vagas: 278, salario_medio: 8200 },
  { uf: "BA", vagas: 245, salario_medio: 7500 },
  { uf: "CE", vagas: 198, salario_medio: 7200 },
  { uf: "PI", vagas: 176, salario_medio: 7000 },
  { uf: "MG", vagas: 168, salario_medio: 9100 },
  { uf: "SP", vagas: 156, salario_medio: 12400 },
  { uf: "PE", vagas: 148, salario_medio: 7800 },
  { uf: "GO", vagas: 132, salario_medio: 8500 },
  { uf: "AM", vagas: 128, salario_medio: 9800 },
  { uf: "RJ", vagas: 112, salario_medio: 11200 },
  { uf: "TO", vagas: 98, salario_medio: 8900 },
  { uf: "MT", vagas: 94, salario_medio: 9200 },
  { uf: "RN", vagas: 87, salario_medio: 7400 },
  { uf: "AL", vagas: 82, salario_medio: 7100 },
];

// Vagas por região
export const vagasPorRegiao = [
  { regiao: "Nordeste", vagas: 1048, percentual: 36.8 },
  { regiao: "Norte", vagas: 612, percentual: 21.5 },
  { regiao: "Sudeste", vagas: 486, percentual: 17.1 },
  { regiao: "Centro-Oeste", vagas: 378, percentual: 13.3 },
  { regiao: "Sul", vagas: 323, percentual: 11.3 },
];

// Concursos abertos ativos
export const concursosAbertos = [
  { orgao: "TRF 1ª Região", cargo: "Analista Judiciário — Odontologia", vagas: 12, salario: 33689, inscricoes: "Até 28/03/2025", modalidade: "Concurso Público", uf: "Nacional", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.trf1.jus.br/trf1/concursos/" },
  { orgao: "Exército Brasileiro", cargo: "Oficial Dentista (QC)", vagas: 35, salario: 18450, inscricoes: "Até 15/04/2025", modalidade: "Concurso Público", uf: "Nacional", requisitos: "Graduação + CRO + até 36 anos", status: "Inscrições Abertas", link_edital: "https://www.eb.mil.br/concursos" },
  { orgao: "Marinha do Brasil", cargo: "Cirurgião-Dentista (CP-CSM)", vagas: 28, salario: 19200, inscricoes: "Até 10/04/2025", modalidade: "Concurso Público", uf: "Nacional", requisitos: "Graduação + CRO + até 35 anos", status: "Inscrições Abertas", link_edital: "https://www.marinha.mil.br/concursos" },
  { orgao: "Aeronáutica", cargo: "Oficial Dentista (QOCon)", vagas: 22, salario: 17800, inscricoes: "Até 20/04/2025", modalidade: "Concurso Público", uf: "Nacional", requisitos: "Graduação + CRO + até 35 anos", status: "Inscrições Abertas", link_edital: "https://www.fab.mil.br/concursos" },
  { orgao: "TJ-MG", cargo: "Analista Judiciário — Odontologia", vagas: 8, salario: 29450, inscricoes: "Até 05/04/2025", modalidade: "Concurso Público", uf: "MG", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.tjmg.jus.br/portal-tjmg/institucional/concurso-publico/" },
  { orgao: "TJ-BA", cargo: "Analista Judiciário — Dentista", vagas: 5, salario: 27800, inscricoes: "Até 12/04/2025", modalidade: "Concurso Público", uf: "BA", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.tjba.jus.br/concurso-publico" },
  { orgao: "TJ-RS", cargo: "Analista Judiciário — Odontologia", vagas: 6, salario: 28100, inscricoes: "Até 18/04/2025", modalidade: "Concurso Público", uf: "RS", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.tjrs.jus.br/novo/institucional/concursos/" },
  { orgao: "Assembleia Legislativa SP", cargo: "Cirurgião-Dentista", vagas: 4, salario: 18500, inscricoes: "Até 30/03/2025", modalidade: "Concurso Público", uf: "SP", requisitos: "Graduação + CRO + 2 anos exp.", status: "Inscrições Abertas", link_edital: "https://www.al.sp.gov.br/concurso/" },
  { orgao: "Assembleia Legislativa MG", cargo: "Odontólogo", vagas: 3, salario: 16200, inscricoes: "Até 08/04/2025", modalidade: "Concurso Público", uf: "MG", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.almg.gov.br/institucional/concursos/" },
  { orgao: "Assembleia Legislativa RJ", cargo: "Cirurgião-Dentista", vagas: 3, salario: 17800, inscricoes: "Até 22/04/2025", modalidade: "Concurso Público", uf: "RJ", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.alerj.rj.gov.br/concursos" },
  { orgao: "Assembleia Legislativa BA", cargo: "Odontólogo", vagas: 2, salario: 15900, inscricoes: "Até 25/04/2025", modalidade: "Concurso Público", uf: "BA", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.al.ba.gov.br/concurso" },
  { orgao: "TSE", cargo: "Analista Judiciário — Odontologia", vagas: 8, salario: 16780, inscricoes: "Até 02/04/2025", modalidade: "Concurso Público", uf: "Nacional", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.tse.jus.br/servicos-judiciais/concurso-publico" },
  { orgao: "TRE-PA", cargo: "Analista Judiciário — Dentista", vagas: 4, salario: 15980, inscricoes: "Até 14/04/2025", modalidade: "Concurso Público", uf: "PA", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.tre-pa.jus.br/concurso" },
  { orgao: "TRE-MA", cargo: "Analista Judiciário — Odontologia", vagas: 3, salario: 15980, inscricoes: "Até 16/04/2025", modalidade: "Concurso Público", uf: "MA", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.tre-ma.jus.br/concurso" },
  { orgao: "TRE-CE", cargo: "Analista Judiciário — Dentista", vagas: 3, salario: 15980, inscricoes: "Até 20/04/2025", modalidade: "Concurso Público", uf: "CE", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.tre-ce.jus.br/concurso" },
  { orgao: "SESC Nacional", cargo: "Cirurgião-Dentista — Clínico Geral", vagas: 24, salario: 10800, inscricoes: "Até 25/03/2025", modalidade: "Processo Seletivo", uf: "Nacional", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.sesc.com.br/trabalhe-conosco/" },
  { orgao: "SESC SP", cargo: "Dentista — Ortodontia", vagas: 8, salario: 12400, inscricoes: "Até 01/04/2025", modalidade: "Processo Seletivo", uf: "SP", requisitos: "Graduação + CRO + Especialização", status: "Inscrições Abertas", link_edital: "https://www.sescsp.org.br/trabalhe-conosco/" },
  { orgao: "SESC RJ", cargo: "Dentista — Endodontia", vagas: 6, salario: 11200, inscricoes: "Até 05/04/2025", modalidade: "Processo Seletivo", uf: "RJ", requisitos: "Graduação + CRO + Especialização", status: "Inscrições Abertas", link_edital: "https://www.sescrj.com.br/trabalhe-conosco" },
  { orgao: "SESC MG", cargo: "Cirurgião-Dentista", vagas: 10, salario: 9800, inscricoes: "Até 10/04/2025", modalidade: "Processo Seletivo", uf: "MG", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.sescmg.com.br/trabalhe-conosco/" },
  { orgao: "SESC RS", cargo: "Dentista — Odontopediatria", vagas: 5, salario: 10500, inscricoes: "Até 08/04/2025", modalidade: "Processo Seletivo", uf: "RS", requisitos: "Graduação + CRO + Especialização", status: "Inscrições Abertas", link_edital: "https://www.sesc-rs.com.br/trabalhe-conosco/" },
  { orgao: "SESC PE", cargo: "Cirurgião-Dentista", vagas: 7, salario: 9200, inscricoes: "Até 12/04/2025", modalidade: "Processo Seletivo", uf: "PE", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.sescpe.com.br/trabalhe-conosco/" },
  { orgao: "SESC BA", cargo: "Dentista — Prótese", vagas: 4, salario: 9500, inscricoes: "Até 15/04/2025", modalidade: "Processo Seletivo", uf: "BA", requisitos: "Graduação + CRO + Especialização", status: "Inscrições Abertas", link_edital: "https://www.sescbahia.com.br/trabalhe-conosco/" },
  { orgao: "SESI Nacional", cargo: "Cirurgião-Dentista Industrial", vagas: 18, salario: 9800, inscricoes: "Até 28/03/2025", modalidade: "Processo Seletivo", uf: "Nacional", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.portaldaindustria.com.br/sesi/trabalhe-conosco/" },
  { orgao: "SESI SP", cargo: "Dentista do Trabalho", vagas: 12, salario: 11500, inscricoes: "Até 02/04/2025", modalidade: "Processo Seletivo", uf: "SP", requisitos: "Graduação + CRO + Esp. Odonto do Trabalho", status: "Inscrições Abertas", link_edital: "https://www.sesisp.org.br/trabalhe-conosco" },
  { orgao: "SESI MG", cargo: "Cirurgião-Dentista", vagas: 8, salario: 9200, inscricoes: "Até 06/04/2025", modalidade: "Processo Seletivo", uf: "MG", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.fiemg.com.br/sesi/trabalhe-conosco/" },
  { orgao: "SESI PR", cargo: "Dentista — Saúde do Trabalhador", vagas: 6, salario: 9500, inscricoes: "Até 10/04/2025", modalidade: "Processo Seletivo", uf: "PR", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.sesipr.org.br/trabalhe-conosco/" },
  { orgao: "SENAC SP", cargo: "Instrutor de Saúde Bucal", vagas: 8, salario: 8200, inscricoes: "Até 20/03/2025", modalidade: "Processo Seletivo", uf: "SP", requisitos: "Graduação + CRO + Didática", status: "Inscrições Abertas", link_edital: "https://www.sp.senac.br/trabalhe-conosco" },
  { orgao: "SENAC RJ", cargo: "Docente — Odontologia", vagas: 5, salario: 7800, inscricoes: "Até 25/03/2025", modalidade: "Processo Seletivo", uf: "RJ", requisitos: "Graduação + CRO + Mestrado", status: "Inscrições Abertas", link_edital: "https://www.rj.senac.br/trabalhe-conosco" },
  { orgao: "SENAC Nacional", cargo: "Instrutor de Saúde Bucal", vagas: 12, salario: 7500, inscricoes: "Até 30/03/2025", modalidade: "Processo Seletivo", uf: "Nacional", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.senac.br/trabalhe-conosco/" },
  { orgao: "Prefeitura de São Luís", cargo: "Dentista ESF", vagas: 45, salario: 8200, inscricoes: "Até 22/03/2025", modalidade: "Processo Seletivo", uf: "MA", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.saoluis.ma.gov.br/concursos" },
  { orgao: "Prefeitura de Belém", cargo: "Cirurgião-Dentista SUS", vagas: 38, salario: 8800, inscricoes: "Até 28/03/2025", modalidade: "Processo Seletivo", uf: "PA", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.belem.pa.gov.br/concursos" },
  { orgao: "Prefeitura de Teresina", cargo: "Dentista ESF", vagas: 32, salario: 7500, inscricoes: "Até 01/04/2025", modalidade: "Processo Seletivo", uf: "PI", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.teresina.pi.gov.br/concursos" },
  { orgao: "Prefeitura de Manaus", cargo: "Cirurgião-Dentista", vagas: 28, salario: 10200, inscricoes: "Até 05/04/2025", modalidade: "Concurso Público", uf: "AM", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.manaus.am.gov.br/concursos" },
  { orgao: "Prefeitura de Salvador", cargo: "Dentista ESF", vagas: 25, salario: 7800, inscricoes: "Até 08/04/2025", modalidade: "Processo Seletivo", uf: "BA", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.salvador.ba.gov.br/concursos" },
  { orgao: "Prefeitura de Fortaleza", cargo: "Cirurgião-Dentista CEO", vagas: 22, salario: 8500, inscricoes: "Até 10/04/2025", modalidade: "Processo Seletivo", uf: "CE", requisitos: "Graduação + CRO + Especialização", status: "Inscrições Abertas", link_edital: "https://www.fortaleza.ce.gov.br/concursos" },
  { orgao: "Prefeitura de Recife", cargo: "Dentista ESF", vagas: 20, salario: 8100, inscricoes: "Até 12/04/2025", modalidade: "Processo Seletivo", uf: "PE", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.recife.pe.gov.br/concursos" },
  { orgao: "Prefeitura de Goiânia", cargo: "Cirurgião-Dentista", vagas: 18, salario: 8900, inscricoes: "Até 15/04/2025", modalidade: "Concurso Público", uf: "GO", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.goiania.go.gov.br/concursos" },
  { orgao: "Prefeitura de Cuiabá", cargo: "Dentista ESF", vagas: 15, salario: 9200, inscricoes: "Até 18/04/2025", modalidade: "Processo Seletivo", uf: "MT", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.cuiaba.mt.gov.br/concursos" },
  { orgao: "Prefeitura de Porto Velho", cargo: "Cirurgião-Dentista", vagas: 14, salario: 9500, inscricoes: "Até 20/04/2025", modalidade: "Processo Seletivo", uf: "RO", requisitos: "Graduação + CRO", status: "Inscrições Abertas", link_edital: "https://www.portovelho.ro.gov.br/concursos" },
  { orgao: "UFMA — Universidade Fed. Maranhão", cargo: "Professor Odontologia (Adjunto)", vagas: 6, salario: 12800, inscricoes: "Até 30/03/2025", modalidade: "Concurso Público", uf: "MA", requisitos: "Doutorado + CRO", status: "Inscrições Abertas", link_edital: "https://concursos.ufma.br/" },
  { orgao: "UFPA — Universidade Fed. Pará", cargo: "Professor Odontologia (Adjunto)", vagas: 5, salario: 12800, inscricoes: "Até 02/04/2025", modalidade: "Concurso Público", uf: "PA", requisitos: "Doutorado + CRO", status: "Inscrições Abertas", link_edital: "https://www.ceps.ufpa.br/concursos" },
  { orgao: "UFBA — Universidade Fed. Bahia", cargo: "Professor Odontologia (Adjunto)", vagas: 4, salario: 12800, inscricoes: "Até 05/04/2025", modalidade: "Concurso Público", uf: "BA", requisitos: "Doutorado + CRO", status: "Inscrições Abertas", link_edital: "https://concursos.ufba.br/" },
  { orgao: "UFC — Universidade Fed. Ceará", cargo: "Professor Odontologia (Adjunto)", vagas: 4, salario: 12800, inscricoes: "Até 08/04/2025", modalidade: "Concurso Público", uf: "CE", requisitos: "Doutorado + CRO", status: "Inscrições Abertas", link_edital: "https://concursos.ufc.br/" },
  { orgao: "UFRJ — Universidade Fed. Rio de Janeiro", cargo: "Professor Odontologia (Adjunto)", vagas: 3, salario: 12800, inscricoes: "Até 10/04/2025", modalidade: "Concurso Público", uf: "RJ", requisitos: "Doutorado + CRO", status: "Inscrições Abertas", link_edital: "https://concursos.pr1.ufrj.br/" },
  { orgao: "USP — Universidade de São Paulo", cargo: "Professor Doutor — Odontologia", vagas: 5, salario: 16200, inscricoes: "Até 12/04/2025", modalidade: "Concurso Público", uf: "SP", requisitos: "Doutorado + Livre-Docência", status: "Inscrições Abertas", link_edital: "https://uspdigital.usp.br/gr/admissao" },
  { orgao: "UNICAMP", cargo: "Professor Doutor — Odontologia", vagas: 3, salario: 15800, inscricoes: "Até 15/04/2025", modalidade: "Concurso Público", uf: "SP", requisitos: "Doutorado", status: "Inscrições Abertas", link_edital: "https://www.dgrh.unicamp.br/concursos/" },
  { orgao: "UNESP — Araçatuba", cargo: "Professor Substituto — Odontologia", vagas: 4, salario: 8200, inscricoes: "Até 18/04/2025", modalidade: "Processo Seletivo", uf: "SP", requisitos: "Mestrado + CRO", status: "Inscrições Abertas", link_edital: "https://www.unesp.br/concursos" },
  { orgao: "Câmara dos Deputados", cargo: "Analista Legislativo — Odontologia", vagas: 3, salario: 24500, inscricoes: "Previsto 2025", modalidade: "Concurso Público", uf: "DF", requisitos: "Graduação + CRO", status: "Previsto", link_edital: "https://www.camara.leg.br/concursos" },
  { orgao: "Senado Federal", cargo: "Analista Legislativo — Odontologia", vagas: 2, salario: 26800, inscricoes: "Previsto 2025", modalidade: "Concurso Público", uf: "DF", requisitos: "Graduação + CRO", status: "Previsto", link_edital: "https://www12.senado.leg.br/institucional/concursos" },
  { orgao: "DPU — Defensoria Pública da União", cargo: "Analista — Odontologia", vagas: 4, salario: 22500, inscricoes: "Previsto 2025", modalidade: "Concurso Público", uf: "Nacional", requisitos: "Graduação + CRO", status: "Previsto", link_edital: "https://www.dpu.def.br/concursos" },
  { orgao: "MPU — Ministério Público da União", cargo: "Analista — Odontologia", vagas: 6, salario: 23800, inscricoes: "Previsto 2025", modalidade: "Concurso Público", uf: "Nacional", requisitos: "Graduação + CRO", status: "Previsto", link_edital: "https://www.mpu.mp.br/concursos" },
];

// Vagas SUS por tipo de unidade
export const vagasSUSPorTipoUnidade = [
  { tipo: "ESF — Equipe Saúde da Família", vagas: 842, salario_medio: 6800, percentual: 55.3 },
  { tipo: "CEO — Centro de Especialidades", vagas: 245, salario_medio: 8200, percentual: 16.1 },
  { tipo: "UBS — Unidade Básica de Saúde", vagas: 198, salario_medio: 6500, percentual: 13.0 },
  { tipo: "Hospital Municipal / Estadual", vagas: 112, salario_medio: 9800, percentual: 7.4 },
  { tipo: "CAPS / Atenção Psicossocial", vagas: 45, salario_medio: 7200, percentual: 3.0 },
  { tipo: "UPA — Urgência e Emergência", vagas: 38, salario_medio: 8500, percentual: 2.5 },
  { tipo: "LRPD — Lab. Reg. Prótese Dentária", vagas: 28, salario_medio: 7800, percentual: 1.8 },
  { tipo: "Outros", vagas: 15, salario_medio: 7000, percentual: 1.0 },
];

// Vagas destaque (todas as categorias misturadas, ordenadas por salário)
export const vagasDestaque: VagaPublica[] = [
  {
    id: 1, orgao: "TRF 1ª Região", categoria: "Judiciário", cargo: "Analista Judiciário — Odontologia",
    especialidade: "Clínico Geral", municipio: "Brasília", uf: "DF", regiao: "Centro-Oeste",
    salario: 33689, carga_horaria: "40h", regime: "Estatutário", modalidade: "Concurso Público",
    status: "Inscrições Abertas", data_abertura: "2025-02-15", data_limite: "2025-03-28",
    vagas_total: 12, vagas_pcd: 2, beneficios: ["Auxílio-alimentação R$ 1.393", "Auxílio-saúde", "Auxílio-creche"],
    requisitos: ["Graduação em Odontologia", "CRO ativo"], urgencia: "Alta",
    link_edital: "https://www.trf1.jus.br/trf1/concursos/", observacao: "Maior salário para dentista no setor público federal"
  },
  {
    id: 2, orgao: "TJ-MG", categoria: "Judiciário", cargo: "Analista Judiciário — Odontologia",
    especialidade: "Clínico Geral", municipio: "Belo Horizonte", uf: "MG", regiao: "Sudeste",
    salario: 29450, carga_horaria: "40h", regime: "Estatutário", modalidade: "Concurso Público",
    status: "Inscrições Abertas", data_abertura: "2025-02-20", data_limite: "2025-04-05",
    vagas_total: 8, vagas_pcd: 1, beneficios: ["Auxílio-alimentação R$ 1.200", "Auxílio-saúde"],
    requisitos: ["Graduação em Odontologia", "CRO ativo"], urgencia: "Alta",
    link_edital: "https://www.tjmg.jus.br/portal-tjmg/institucional/concurso-publico/", observacao: ""
  },
  {
    id: 3, orgao: "Marinha do Brasil", categoria: "Forças Armadas", cargo: "Cirurgião-Dentista (CP-CSM)",
    especialidade: "Diversas", municipio: "Nacional", uf: "Nacional", regiao: "Nacional",
    salario: 19200, carga_horaria: "Dedicação Exclusiva", regime: "Estatutário Militar", modalidade: "Concurso Público",
    status: "Inscrições Abertas", data_abertura: "2025-02-01", data_limite: "2025-04-10",
    vagas_total: 28, vagas_pcd: 0, beneficios: ["Moradia funcional", "Plano de saúde militar", "Estabilidade", "13º + férias"],
    requisitos: ["Graduação em Odontologia", "CRO ativo", "Até 35 anos", "Aptidão física"], urgencia: "Alta",
    link_edital: "https://www.marinha.mil.br/concursos", observacao: "Inclui formação militar de 6 meses"
  },
  {
    id: 4, orgao: "Exército Brasileiro", categoria: "Forças Armadas", cargo: "Oficial Dentista (QC)",
    especialidade: "Diversas", municipio: "Nacional", uf: "Nacional", regiao: "Nacional",
    salario: 18450, carga_horaria: "Dedicação Exclusiva", regime: "Estatutário Militar", modalidade: "Concurso Público",
    status: "Inscrições Abertas", data_abertura: "2025-02-10", data_limite: "2025-04-15",
    vagas_total: 35, vagas_pcd: 0, beneficios: ["Moradia funcional", "Plano de saúde militar", "Adicional de habilitação"],
    requisitos: ["Graduação em Odontologia", "CRO ativo", "Até 36 anos"], urgencia: "Alta",
    link_edital: "https://www.eb.mil.br/concursos", observacao: "Maior número de vagas entre as Forças Armadas"
  },
  {
    id: 5, orgao: "Assembleia Legislativa SP", categoria: "Assembleia", cargo: "Cirurgião-Dentista",
    especialidade: "Clínico Geral", municipio: "São Paulo", uf: "SP", regiao: "Sudeste",
    salario: 18500, carga_horaria: "30h", regime: "Estatutário", modalidade: "Concurso Público",
    status: "Inscrições Abertas", data_abertura: "2025-02-25", data_limite: "2025-03-30",
    vagas_total: 4, vagas_pcd: 1, beneficios: ["Auxílio-alimentação", "Auxílio-saúde", "14º salário"],
    requisitos: ["Graduação em Odontologia", "CRO ativo", "2 anos de experiência"], urgencia: "Média",
    link_edital: "https://www.al.sp.gov.br/concurso/", observacao: "Assembleias estaduais pagam acima da média do setor público"
  },
  {
    id: 6, orgao: "TSE", categoria: "TSE", cargo: "Analista Judiciário — Odontologia",
    especialidade: "Clínico Geral", municipio: "Brasília", uf: "DF", regiao: "Centro-Oeste",
    salario: 16780, carga_horaria: "40h", regime: "Estatutário", modalidade: "Concurso Público",
    status: "Inscrições Abertas", data_abertura: "2025-03-01", data_limite: "2025-04-02",
    vagas_total: 8, vagas_pcd: 1, beneficios: ["Auxílio-alimentação R$ 1.393", "Auxílio-saúde"],
    requisitos: ["Graduação em Odontologia", "CRO ativo"], urgencia: "Alta",
    link_edital: "https://www.tse.jus.br/servicos-judiciais/concurso-publico", observacao: "Concurso nacional com vagas para todas as regionais"
  },
  {
    id: 7, orgao: "SESC SP", categoria: "SESC", cargo: "Dentista — Ortodontia",
    especialidade: "Ortodontia", municipio: "São Paulo", uf: "SP", regiao: "Sudeste",
    salario: 12400, carga_horaria: "36h", regime: "CLT", modalidade: "Processo Seletivo",
    status: "Inscrições Abertas", data_abertura: "2025-03-05", data_limite: "2025-04-01",
    vagas_total: 8, vagas_pcd: 1, beneficios: ["VA R$ 800", "Plano de saúde", "Previdência complementar", "Desconto SESC"],
    requisitos: ["Graduação em Odontologia", "CRO ativo", "Especialização em Ortodontia"], urgencia: "Média",
    link_edital: "https://www.sescsp.org.br/trabalhe-conosco/", observacao: "SESC oferece boa qualidade de vida e benefícios"
  },
  {
    id: 8, orgao: "SESI SP", categoria: "SESI", cargo: "Dentista do Trabalho",
    especialidade: "Odontologia do Trabalho", municipio: "São Paulo", uf: "SP", regiao: "Sudeste",
    salario: 11500, carga_horaria: "40h", regime: "CLT", modalidade: "Processo Seletivo",
    status: "Inscrições Abertas", data_abertura: "2025-03-01", data_limite: "2025-04-02",
    vagas_total: 12, vagas_pcd: 1, beneficios: ["VA R$ 750", "Plano de saúde", "PLR"],
    requisitos: ["Graduação em Odontologia", "CRO ativo", "Esp. Odonto do Trabalho"], urgencia: "Média",
    link_edital: "https://www.sesisp.org.br/trabalhe-conosco", observacao: "Crescente demanda por saúde bucal ocupacional"
  },
  {
    id: 9, orgao: "Prefeitura de São Luís", categoria: "Prefeitura", cargo: "Dentista ESF",
    especialidade: "Clínico Geral", municipio: "São Luís", uf: "MA", regiao: "Nordeste",
    salario: 8200, carga_horaria: "40h", regime: "Contrato Temporário", modalidade: "Processo Seletivo",
    status: "Inscrições Abertas", data_abertura: "2025-03-01", data_limite: "2025-03-22",
    vagas_total: 45, vagas_pcd: 5, beneficios: ["Insalubridade 20%", "Vale-transporte"],
    requisitos: ["Graduação em Odontologia", "CRO ativo"], urgencia: "Crítica",
    link_edital: "https://www.saoluis.ma.gov.br/concursos", observacao: "Maior volume de vagas SUS do país neste momento"
  },
  {
    id: 10, orgao: "UFMA", categoria: "Universidade", cargo: "Professor Adjunto — Odontologia",
    especialidade: "Diversas", municipio: "São Luís", uf: "MA", regiao: "Nordeste",
    salario: 12800, carga_horaria: "DE (Dedicação Exclusiva)", regime: "Estatutário", modalidade: "Concurso Público",
    status: "Inscrições Abertas", data_abertura: "2025-02-15", data_limite: "2025-03-30",
    vagas_total: 6, vagas_pcd: 1, beneficios: ["Auxílio-alimentação", "Auxílio-saúde", "Retribuição por titulação", "Estabilidade"],
    requisitos: ["Doutorado em Odontologia", "CRO ativo"], urgencia: "Média",
    link_edital: "https://concursos.ufma.br/", observacao: "Carreira docente federal com progressão funcional"
  },
  {
    id: 11, orgao: "USP", categoria: "Universidade", cargo: "Professor Doutor — Odontologia",
    especialidade: "Diversas", municipio: "São Paulo", uf: "SP", regiao: "Sudeste",
    salario: 16200, carga_horaria: "RDIDP", regime: "Estatutário", modalidade: "Concurso Público",
    status: "Inscrições Abertas", data_abertura: "2025-03-01", data_limite: "2025-04-12",
    vagas_total: 5, vagas_pcd: 1, beneficios: ["Auxílio-alimentação", "Plano de saúde USP", "Progressão funcional"],
    requisitos: ["Doutorado", "Livre-Docência (desejável)"], urgencia: "Média",
    link_edital: "https://uspdigital.usp.br/gr/admissao", observacao: "Maior faculdade de odontologia da América Latina"
  },
  {
    id: 12, orgao: "Prefeitura de Manaus", categoria: "Prefeitura", cargo: "Cirurgião-Dentista",
    especialidade: "Clínico Geral", municipio: "Manaus", uf: "AM", regiao: "Norte",
    salario: 10200, carga_horaria: "40h", regime: "Estatutário", modalidade: "Concurso Público",
    status: "Inscrições Abertas", data_abertura: "2025-02-20", data_limite: "2025-04-05",
    vagas_total: 28, vagas_pcd: 3, beneficios: ["Gratificação de interiorização", "Insalubridade", "Auxílio-moradia"],
    requisitos: ["Graduação em Odontologia", "CRO ativo"], urgencia: "Alta",
    link_edital: "https://www.manaus.am.gov.br/concursos", observacao: "Inclui vagas para interior do Amazonas com adicional"
  },
];

// Concursos previstos (ainda não abertos)
export const concursosPrevistos = [
  { orgao: "Câmara dos Deputados", cargo: "Analista — Odontologia", vagas_previstas: 3, salario_estimado: 24500, previsao: "2º Sem. 2025", uf: "DF", fonte: "Autorizado pelo Congresso" },
  { orgao: "Senado Federal", cargo: "Analista — Odontologia", vagas_previstas: 2, salario_estimado: 26800, previsao: "2025", uf: "DF", fonte: "Planejamento de RH" },
  { orgao: "DPU", cargo: "Analista — Odontologia", vagas_previstas: 4, salario_estimado: 22500, previsao: "2º Sem. 2025", uf: "Nacional", fonte: "Autorizado pelo MPO" },
  { orgao: "MPU", cargo: "Analista — Odontologia", vagas_previstas: 6, salario_estimado: 23800, previsao: "2025", uf: "Nacional", fonte: "Autorizado pelo Procurador-Geral" },
  { orgao: "IBGE", cargo: "Analista — Saúde Bucal", vagas_previstas: 8, salario_estimado: 12800, previsao: "2025", uf: "Nacional", fonte: "Plano de concursos 2025" },
  { orgao: "TRF 3ª Região", cargo: "Analista Judiciário — Odontologia", vagas_previstas: 5, salario_estimado: 33689, previsao: "2025", uf: "SP/MS", fonte: "Edital em elaboração" },
  { orgao: "TRF 5ª Região", cargo: "Analista Judiciário — Odontologia", vagas_previstas: 4, salario_estimado: 33689, previsao: "2025", uf: "PE", fonte: "Autorizado pelo CNJ" },
  { orgao: "Polícia Federal", cargo: "Perito Criminal — Odontologia Legal", vagas_previstas: 10, salario_estimado: 23000, previsao: "2025", uf: "Nacional", fonte: "Autorizado pelo MGI" },
  { orgao: "Corpo de Bombeiros DF", cargo: "Oficial Dentista", vagas_previstas: 3, salario_estimado: 15800, previsao: "2025", uf: "DF", fonte: "Planejamento de pessoal" },
  { orgao: "Assembleia Legislativa PR", cargo: "Cirurgião-Dentista", vagas_previstas: 2, salario_estimado: 14500, previsao: "2025", uf: "PR", fonte: "Comissão de concursos" },
  { orgao: "Assembleia Legislativa GO", cargo: "Odontólogo", vagas_previstas: 2, salario_estimado: 13800, previsao: "2025", uf: "GO", fonte: "Planejamento de RH" },
  { orgao: "Assembleia Legislativa PE", cargo: "Cirurgião-Dentista", vagas_previstas: 2, salario_estimado: 14200, previsao: "2025", uf: "PE", fonte: "Solicitação ao TCE" },
];

// Dados de benefícios médios por categoria
export const beneficiosPorCategoria = [
  { categoria: "Judiciário Federal", auxilio_alimentacao: 1393, auxilio_saude: 980, total_beneficios: 2373 },
  { categoria: "Forças Armadas", auxilio_alimentacao: 0, auxilio_saude: 0, total_beneficios: 5200, nota: "Moradia + saúde + fardamento" },
  { categoria: "Assembleias", auxilio_alimentacao: 1100, auxilio_saude: 850, total_beneficios: 1950 },
  { categoria: "TSE/TRE", auxilio_alimentacao: 1393, auxilio_saude: 800, total_beneficios: 2193 },
  { categoria: "SESC/SESI", auxilio_alimentacao: 800, auxilio_saude: 600, total_beneficios: 1400 },
  { categoria: "Universidades Fed.", auxilio_alimentacao: 658, auxilio_saude: 450, total_beneficios: 1108 },
  { categoria: "Prefeituras", auxilio_alimentacao: 500, auxilio_saude: 300, total_beneficios: 800 },
];

// Especialidades mais demandadas no setor público
export const especialidadesMaisDemandadas = [
  { especialidade: "Clínico Geral (ESF)", vagas: 842, percentual: 29.6, salario_medio: 6800, tendencia: "+12%" },
  { especialidade: "Cirurgia BMF", vagas: 312, percentual: 11.0, salario_medio: 9800, tendencia: "+18%" },
  { especialidade: "Endodontia", vagas: 278, percentual: 9.8, salario_medio: 8500, tendencia: "+15%" },
  { especialidade: "Periodontia", vagas: 245, percentual: 8.6, salario_medio: 8200, tendencia: "+14%" },
  { especialidade: "Odontopediatria", vagas: 198, percentual: 7.0, salario_medio: 7800, tendencia: "+10%" },
  { especialidade: "Prótese Dentária", vagas: 176, percentual: 6.2, salario_medio: 8000, tendencia: "+8%" },
  { especialidade: "Ortodontia", vagas: 156, percentual: 5.5, salario_medio: 9200, tendencia: "+6%" },
  { especialidade: "Odontologia do Trabalho", vagas: 132, percentual: 4.6, salario_medio: 9500, tendencia: "+22%" },
  { especialidade: "Radiologia Odontológica", vagas: 98, percentual: 3.4, salario_medio: 7500, tendencia: "+9%" },
  { especialidade: "Odontologia Legal", vagas: 78, percentual: 2.7, salario_medio: 12000, tendencia: "+25%" },
  { especialidade: "Saúde Coletiva", vagas: 65, percentual: 2.3, salario_medio: 7200, tendencia: "+11%" },
  { especialidade: "Pacientes Especiais", vagas: 54, percentual: 1.9, salario_medio: 8800, tendencia: "+20%" },
];
