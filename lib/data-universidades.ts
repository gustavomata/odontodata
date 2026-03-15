// =============================================================================
// OdontoData - Dados de Formação Profissional e Universidades
// Fontes: INEP, e-MEC, CAPES, CNPq, CFO, Plataforma Sucupira
// =============================================================================

export interface FaculdadeOdontologia {
  instituicao: string;
  sigla: string;
  uf: string;
  regiao: string;
  tipo: "Pública Federal" | "Pública Estadual" | "Privada" | "Comunitária";
  vagas_ano: number;
  concluintes_ano: number;
  taxaEvasao_pct: number;
  notaEnade: number;
  cpc: number;
  temPosGrad: boolean;
  anoCriacao: number;
}

export interface FormacaoRegional {
  regiao: string;
  faculdadesPublicas: number;
  faculdadesPrivadas: number;
  totalFaculdades: number;
  vagasAnuais: number;
  concluintesAnuais: number;
  taxaEvasao_pct: number;
  mediaEnade: number;
  programasPosGrad: number;
  pesquisadores: number;
  cor: string;
}

export interface PosGraduacao {
  area: string;
  programasMestrado: number;
  programasDoutorado: number;
  tituladosMestrado_ano: number;
  tituladosDoutorado_ano: number;
  notaMediaCAPES: number;
  bolsasCNPq: number;
}

export interface TendenciaFormacao {
  ano: number;
  faculdadesTotal: number;
  faculdadesPublicas: number;
  faculdadesPrivadas: number;
  vagasOfertadas: number;
  ingressantes: number;
  concluintes: number;
  taxaOcupacao_pct: number;
  razaoCandidatoVaga_publica: number;
  razaoCandidatoVaga_privada: number;
}

export interface SaturacaoMercado {
  uf: string;
  estado: string;
  regiao: string;
  concluintesAnuais: number;
  dentistasAtivos: number;
  populacao: number;
  ratioDentistaHab: number;
  taxaCrescimentoAnual_pct: number;
  indiceAbsorcao_pct: number;
  indiceSaturacao: "Crítico" | "Alto" | "Moderado" | "Baixo" | "Adequado";
}

export interface ProducaoCientifica {
  area: string;
  artigosNacionais_ano: number;
  artigosInternacionais_ano: number;
  fatorImpactoMedio: number;
  patentes_acumulado: number;
  gruposPesquisa: number;
  tendencia: "crescendo" | "estavel" | "diminuindo";
}

export interface EgressoMercado {
  anosAposFormatura: string;
  empregado_pct: number;
  autonomo_pct: number;
  desempregado_pct: number;
  rendaMedia: number;
  atuandoEspecialidade_pct: number;
  satisfacao_pct: number;
}

// =============================================================================
// TOP FACULDADES DE ODONTOLOGIA (INEP/e-MEC 2024)
// =============================================================================
export const topFaculdades: FaculdadeOdontologia[] = [
  { instituicao: "Universidade de São Paulo", sigla: "USP", uf: "SP", regiao: "Sudeste", tipo: "Pública Estadual", vagas_ano: 180, concluintes_ano: 162, taxaEvasao_pct: 4.2, notaEnade: 4.8, cpc: 5, temPosGrad: true, anoCriacao: 1898 },
  { instituicao: "Universidade Estadual de Campinas", sigla: "UNICAMP", uf: "SP", regiao: "Sudeste", tipo: "Pública Estadual", vagas_ano: 80, concluintes_ano: 74, taxaEvasao_pct: 3.8, notaEnade: 4.7, cpc: 5, temPosGrad: true, anoCriacao: 1920 },
  { instituicao: "Universidade Federal de Minas Gerais", sigla: "UFMG", uf: "MG", regiao: "Sudeste", tipo: "Pública Federal", vagas_ano: 96, concluintes_ano: 86, taxaEvasao_pct: 5.4, notaEnade: 4.6, cpc: 5, temPosGrad: true, anoCriacao: 1907 },
  { instituicao: "Universidade Federal do Rio Grande do Sul", sigla: "UFRGS", uf: "RS", regiao: "Sul", tipo: "Pública Federal", vagas_ano: 82, concluintes_ano: 72, taxaEvasao_pct: 6.2, notaEnade: 4.5, cpc: 5, temPosGrad: true, anoCriacao: 1898 },
  { instituicao: "Universidade Estadual Paulista", sigla: "UNESP", uf: "SP", regiao: "Sudeste", tipo: "Pública Estadual", vagas_ano: 240, concluintes_ano: 214, taxaEvasao_pct: 4.8, notaEnade: 4.6, cpc: 5, temPosGrad: true, anoCriacao: 1923 },
  { instituicao: "Universidade Federal do Rio de Janeiro", sigla: "UFRJ", uf: "RJ", regiao: "Sudeste", tipo: "Pública Federal", vagas_ano: 96, concluintes_ano: 82, taxaEvasao_pct: 7.2, notaEnade: 4.4, cpc: 4, temPosGrad: true, anoCriacao: 1884 },
  { instituicao: "Universidade Federal de Pelotas", sigla: "UFPel", uf: "RS", regiao: "Sul", tipo: "Pública Federal", vagas_ano: 60, concluintes_ano: 52, taxaEvasao_pct: 8.4, notaEnade: 4.3, cpc: 4, temPosGrad: true, anoCriacao: 1911 },
  { instituicao: "Universidade Federal de Santa Catarina", sigla: "UFSC", uf: "SC", regiao: "Sul", tipo: "Pública Federal", vagas_ano: 72, concluintes_ano: 64, taxaEvasao_pct: 6.8, notaEnade: 4.4, cpc: 4, temPosGrad: true, anoCriacao: 1946 },
  { instituicao: "Universidade Federal do Paraná", sigla: "UFPR", uf: "PR", regiao: "Sul", tipo: "Pública Federal", vagas_ano: 68, concluintes_ano: 58, taxaEvasao_pct: 7.4, notaEnade: 4.3, cpc: 4, temPosGrad: true, anoCriacao: 1912 },
  { instituicao: "Universidade Federal da Bahia", sigla: "UFBA", uf: "BA", regiao: "Nordeste", tipo: "Pública Federal", vagas_ano: 80, concluintes_ano: 68, taxaEvasao_pct: 8.2, notaEnade: 4.2, cpc: 4, temPosGrad: true, anoCriacao: 1946 },
  { instituicao: "Universidade Federal de Pernambuco", sigla: "UFPE", uf: "PE", regiao: "Nordeste", tipo: "Pública Federal", vagas_ano: 72, concluintes_ano: 62, taxaEvasao_pct: 7.8, notaEnade: 4.1, cpc: 4, temPosGrad: true, anoCriacao: 1947 },
  { instituicao: "Universidade Federal do Ceará", sigla: "UFC", uf: "CE", regiao: "Nordeste", tipo: "Pública Federal", vagas_ano: 80, concluintes_ano: 68, taxaEvasao_pct: 8.6, notaEnade: 4.0, cpc: 4, temPosGrad: true, anoCriacao: 1916 },
  { instituicao: "Universidade Federal do Pará", sigla: "UFPA", uf: "PA", regiao: "Norte", tipo: "Pública Federal", vagas_ano: 64, concluintes_ano: 52, taxaEvasao_pct: 10.2, notaEnade: 3.8, cpc: 3, temPosGrad: true, anoCriacao: 1914 },
  { instituicao: "Universidade Federal de Goiás", sigla: "UFG", uf: "GO", regiao: "Centro-Oeste", tipo: "Pública Federal", vagas_ano: 60, concluintes_ano: 52, taxaEvasao_pct: 8.4, notaEnade: 4.0, cpc: 4, temPosGrad: true, anoCriacao: 1960 },
  { instituicao: "Universidade de Brasília", sigla: "UnB", uf: "DF", regiao: "Centro-Oeste", tipo: "Pública Federal", vagas_ano: 40, concluintes_ano: 36, taxaEvasao_pct: 6.8, notaEnade: 4.2, cpc: 4, temPosGrad: true, anoCriacao: 1966 },
];

// =============================================================================
// FORMAÇÃO POR REGIÃO (INEP 2024)
// =============================================================================
export const formacaoRegional: FormacaoRegional[] = [
  { regiao: "Sudeste", faculdadesPublicas: 28, faculdadesPrivadas: 168, totalFaculdades: 196, vagasAnuais: 10200, concluintesAnuais: 8400, taxaEvasao_pct: 14.8, mediaEnade: 3.2, programasPosGrad: 62, pesquisadores: 2400, cor: "#3B82F6" },
  { regiao: "Sul", faculdadesPublicas: 14, faculdadesPrivadas: 64, totalFaculdades: 78, vagasAnuais: 3800, concluintesAnuais: 3100, taxaEvasao_pct: 12.4, mediaEnade: 3.4, programasPosGrad: 28, pesquisadores: 980, cor: "#10B981" },
  { regiao: "Nordeste", faculdadesPublicas: 18, faculdadesPrivadas: 108, totalFaculdades: 126, vagasAnuais: 6200, concluintesAnuais: 4600, taxaEvasao_pct: 18.2, mediaEnade: 2.8, programasPosGrad: 22, pesquisadores: 680, cor: "#F59E0B" },
  { regiao: "Centro-Oeste", faculdadesPublicas: 8, faculdadesPrivadas: 48, totalFaculdades: 56, vagasAnuais: 2600, concluintesAnuais: 2000, taxaEvasao_pct: 15.4, mediaEnade: 3.0, programasPosGrad: 10, pesquisadores: 320, cor: "#8B5CF6" },
  { regiao: "Norte", faculdadesPublicas: 12, faculdadesPrivadas: 72, totalFaculdades: 84, vagasAnuais: 2200, concluintesAnuais: 1400, taxaEvasao_pct: 22.6, mediaEnade: 2.6, programasPosGrad: 6, pesquisadores: 180, cor: "#EF4444" },
];

// =============================================================================
// PÓS-GRADUAÇÃO POR ÁREA (CAPES/Sucupira 2024)
// =============================================================================
export const posGraduacao: PosGraduacao[] = [
  { area: "Dentística/Materiais Dentários", programasMestrado: 24, programasDoutorado: 18, tituladosMestrado_ano: 186, tituladosDoutorado_ano: 82, notaMediaCAPES: 4.8, bolsasCNPq: 124 },
  { area: "Ortodontia", programasMestrado: 18, programasDoutorado: 12, tituladosMestrado_ano: 142, tituladosDoutorado_ano: 64, notaMediaCAPES: 4.6, bolsasCNPq: 96 },
  { area: "Periodontia", programasMestrado: 16, programasDoutorado: 14, tituladosMestrado_ano: 128, tituladosDoutorado_ano: 72, notaMediaCAPES: 4.7, bolsasCNPq: 108 },
  { area: "Endodontia", programasMestrado: 14, programasDoutorado: 10, tituladosMestrado_ano: 98, tituladosDoutorado_ano: 48, notaMediaCAPES: 4.4, bolsasCNPq: 82 },
  { area: "Implantodontia", programasMestrado: 12, programasDoutorado: 8, tituladosMestrado_ano: 86, tituladosDoutorado_ano: 38, notaMediaCAPES: 4.2, bolsasCNPq: 68 },
  { area: "Cirurgia Bucomaxilofacial", programasMestrado: 14, programasDoutorado: 10, tituladosMestrado_ano: 92, tituladosDoutorado_ano: 42, notaMediaCAPES: 4.5, bolsasCNPq: 74 },
  { area: "Saúde Coletiva/Epidemiologia", programasMestrado: 12, programasDoutorado: 8, tituladosMestrado_ano: 78, tituladosDoutorado_ano: 36, notaMediaCAPES: 4.6, bolsasCNPq: 92 },
  { area: "Odontopediatria", programasMestrado: 10, programasDoutorado: 6, tituladosMestrado_ano: 64, tituladosDoutorado_ano: 28, notaMediaCAPES: 4.3, bolsasCNPq: 54 },
  { area: "Prótese Dentária", programasMestrado: 10, programasDoutorado: 8, tituladosMestrado_ano: 72, tituladosDoutorado_ano: 34, notaMediaCAPES: 4.4, bolsasCNPq: 62 },
  { area: "Radiologia/Diagnóstico", programasMestrado: 8, programasDoutorado: 6, tituladosMestrado_ano: 54, tituladosDoutorado_ano: 26, notaMediaCAPES: 4.2, bolsasCNPq: 48 },
  { area: "Patologia Oral", programasMestrado: 8, programasDoutorado: 6, tituladosMestrado_ano: 48, tituladosDoutorado_ano: 24, notaMediaCAPES: 4.5, bolsasCNPq: 58 },
  { area: "Estomatologia", programasMestrado: 6, programasDoutorado: 4, tituladosMestrado_ano: 32, tituladosDoutorado_ano: 16, notaMediaCAPES: 4.3, bolsasCNPq: 42 },
];

// =============================================================================
// SÉRIE HISTÓRICA FORMAÇÃO (2005-2024)
// =============================================================================
export const tendenciaFormacao: TendenciaFormacao[] = [
  { ano: 2005, faculdadesTotal: 186, faculdadesPublicas: 62, faculdadesPrivadas: 124, vagasOfertadas: 14800, ingressantes: 13200, concluintes: 10200, taxaOcupacao_pct: 89.2, razaoCandidatoVaga_publica: 18.4, razaoCandidatoVaga_privada: 2.8 },
  { ano: 2008, faculdadesTotal: 248, faculdadesPublicas: 68, faculdadesPrivadas: 180, vagasOfertadas: 18400, ingressantes: 15800, concluintes: 11600, taxaOcupacao_pct: 85.9, razaoCandidatoVaga_publica: 22.6, razaoCandidatoVaga_privada: 2.4 },
  { ano: 2010, faculdadesTotal: 304, faculdadesPublicas: 72, faculdadesPrivadas: 232, vagasOfertadas: 20600, ingressantes: 17400, concluintes: 13200, taxaOcupacao_pct: 84.5, razaoCandidatoVaga_publica: 28.4, razaoCandidatoVaga_privada: 2.2 },
  { ano: 2012, faculdadesTotal: 348, faculdadesPublicas: 74, faculdadesPrivadas: 274, vagasOfertadas: 22400, ingressantes: 18600, concluintes: 14400, taxaOcupacao_pct: 83.0, razaoCandidatoVaga_publica: 32.8, razaoCandidatoVaga_privada: 1.8 },
  { ano: 2014, faculdadesTotal: 392, faculdadesPublicas: 76, faculdadesPrivadas: 316, vagasOfertadas: 24200, ingressantes: 19800, concluintes: 15800, taxaOcupacao_pct: 81.8, razaoCandidatoVaga_publica: 36.2, razaoCandidatoVaga_privada: 1.6 },
  { ano: 2016, faculdadesTotal: 420, faculdadesPublicas: 78, faculdadesPrivadas: 342, vagasOfertadas: 25800, ingressantes: 20200, concluintes: 16800, taxaOcupacao_pct: 78.3, razaoCandidatoVaga_publica: 38.6, razaoCandidatoVaga_privada: 1.4 },
  { ano: 2018, faculdadesTotal: 456, faculdadesPublicas: 78, faculdadesPrivadas: 378, vagasOfertadas: 27200, ingressantes: 21400, concluintes: 17600, taxaOcupacao_pct: 78.7, razaoCandidatoVaga_publica: 42.4, razaoCandidatoVaga_privada: 1.3 },
  { ano: 2020, faculdadesTotal: 486, faculdadesPublicas: 80, faculdadesPrivadas: 406, vagasOfertadas: 28400, ingressantes: 20800, concluintes: 16200, taxaOcupacao_pct: 73.2, razaoCandidatoVaga_publica: 44.8, razaoCandidatoVaga_privada: 1.2 },
  { ano: 2022, faculdadesTotal: 520, faculdadesPublicas: 80, faculdadesPrivadas: 440, vagasOfertadas: 29200, ingressantes: 22600, concluintes: 18400, taxaOcupacao_pct: 77.4, razaoCandidatoVaga_publica: 48.2, razaoCandidatoVaga_privada: 1.1 },
  { ano: 2024, faculdadesTotal: 540, faculdadesPublicas: 80, faculdadesPrivadas: 460, vagasOfertadas: 25000, concluintes: 19500, ingressantes: 23400, taxaOcupacao_pct: 93.6, razaoCandidatoVaga_publica: 52.6, razaoCandidatoVaga_privada: 1.0 },
];

// =============================================================================
// SATURAÇÃO DO MERCADO POR UF (CFO × INEP × IBGE)
// =============================================================================
export const saturacaoMercado: SaturacaoMercado[] = [
  { uf: "SP", estado: "São Paulo", regiao: "Sudeste", concluintesAnuais: 4200, dentistasAtivos: 114200, populacao: 46649132, ratioDentistaHab: 408, taxaCrescimentoAnual_pct: 3.8, indiceAbsorcao_pct: 72.4, indiceSaturacao: "Crítico" },
  { uf: "MG", estado: "Minas Gerais", regiao: "Sudeste", concluintesAnuais: 2400, dentistasAtivos: 48600, populacao: 21411923, ratioDentistaHab: 441, taxaCrescimentoAnual_pct: 4.2, indiceAbsorcao_pct: 68.2, indiceSaturacao: "Alto" },
  { uf: "RJ", estado: "Rio de Janeiro", regiao: "Sudeste", concluintesAnuais: 1800, dentistasAtivos: 40200, populacao: 17374819, ratioDentistaHab: 432, taxaCrescimentoAnual_pct: 3.4, indiceAbsorcao_pct: 64.8, indiceSaturacao: "Crítico" },
  { uf: "RS", estado: "Rio Grande do Sul", regiao: "Sul", concluintesAnuais: 1200, dentistasAtivos: 30100, populacao: 11466630, ratioDentistaHab: 381, taxaCrescimentoAnual_pct: 2.8, indiceAbsorcao_pct: 74.6, indiceSaturacao: "Alto" },
  { uf: "PR", estado: "Paraná", regiao: "Sul", concluintesAnuais: 1100, dentistasAtivos: 29400, populacao: 11597484, ratioDentistaHab: 395, taxaCrescimentoAnual_pct: 3.2, indiceAbsorcao_pct: 76.8, indiceSaturacao: "Alto" },
  { uf: "SC", estado: "Santa Catarina", regiao: "Sul", concluintesAnuais: 800, dentistasAtivos: 21800, populacao: 7762154, ratioDentistaHab: 356, taxaCrescimentoAnual_pct: 3.6, indiceAbsorcao_pct: 78.2, indiceSaturacao: "Alto" },
  { uf: "BA", estado: "Bahia", regiao: "Nordeste", concluintesAnuais: 1400, dentistasAtivos: 20800, populacao: 14873064, ratioDentistaHab: 715, taxaCrescimentoAnual_pct: 5.8, indiceAbsorcao_pct: 82.4, indiceSaturacao: "Moderado" },
  { uf: "CE", estado: "Ceará", regiao: "Nordeste", concluintesAnuais: 900, dentistasAtivos: 13800, populacao: 9240580, ratioDentistaHab: 669, taxaCrescimentoAnual_pct: 5.2, indiceAbsorcao_pct: 84.6, indiceSaturacao: "Moderado" },
  { uf: "PA", estado: "Pará", regiao: "Norte", concluintesAnuais: 600, dentistasAtivos: 9200, populacao: 8777124, ratioDentistaHab: 954, taxaCrescimentoAnual_pct: 6.4, indiceAbsorcao_pct: 92.8, indiceSaturacao: "Baixo" },
  { uf: "GO", estado: "Goiás", regiao: "Centro-Oeste", concluintesAnuais: 800, dentistasAtivos: 16400, populacao: 7206589, ratioDentistaHab: 440, taxaCrescimentoAnual_pct: 4.6, indiceAbsorcao_pct: 74.2, indiceSaturacao: "Alto" },
  { uf: "DF", estado: "Distrito Federal", regiao: "Centro-Oeste", concluintesAnuais: 400, dentistasAtivos: 10200, populacao: 3094325, ratioDentistaHab: 303, taxaCrescimentoAnual_pct: 3.2, indiceAbsorcao_pct: 62.4, indiceSaturacao: "Crítico" },
  { uf: "AM", estado: "Amazonas", regiao: "Norte", concluintesAnuais: 280, dentistasAtivos: 4800, populacao: 4269995, ratioDentistaHab: 890, taxaCrescimentoAnual_pct: 7.2, indiceAbsorcao_pct: 94.6, indiceSaturacao: "Adequado" },
  { uf: "MA", estado: "Maranhão", regiao: "Nordeste", concluintesAnuais: 420, dentistasAtivos: 7600, populacao: 7153262, ratioDentistaHab: 941, taxaCrescimentoAnual_pct: 6.8, indiceAbsorcao_pct: 96.2, indiceSaturacao: "Adequado" },
  { uf: "PI", estado: "Piauí", regiao: "Nordeste", concluintesAnuais: 280, dentistasAtivos: 4200, populacao: 3289290, ratioDentistaHab: 783, taxaCrescimentoAnual_pct: 5.4, indiceAbsorcao_pct: 88.4, indiceSaturacao: "Baixo" },
];

// =============================================================================
// PRODUÇÃO CIENTÍFICA POR ÁREA (CNPq/Lattes + Scopus + WoS 2024)
// =============================================================================
export const producaoCientifica: ProducaoCientifica[] = [
  { area: "Dentística/Materiais", artigosNacionais_ano: 680, artigosInternacionais_ano: 420, fatorImpactoMedio: 3.2, patentes_acumulado: 86, gruposPesquisa: 124, tendencia: "crescendo" },
  { area: "Periodontia", artigosNacionais_ano: 520, artigosInternacionais_ano: 380, fatorImpactoMedio: 3.8, patentes_acumulado: 42, gruposPesquisa: 98, tendencia: "crescendo" },
  { area: "Implantodontia", artigosNacionais_ano: 480, artigosInternacionais_ano: 420, fatorImpactoMedio: 3.4, patentes_acumulado: 124, gruposPesquisa: 86, tendencia: "crescendo" },
  { area: "Ortodontia", artigosNacionais_ano: 420, artigosInternacionais_ano: 320, fatorImpactoMedio: 2.8, patentes_acumulado: 38, gruposPesquisa: 72, tendencia: "estavel" },
  { area: "Endodontia", artigosNacionais_ano: 380, artigosInternacionais_ano: 280, fatorImpactoMedio: 3.1, patentes_acumulado: 56, gruposPesquisa: 68, tendencia: "crescendo" },
  { area: "Saúde Coletiva", artigosNacionais_ano: 360, artigosInternacionais_ano: 180, fatorImpactoMedio: 2.4, patentes_acumulado: 12, gruposPesquisa: 82, tendencia: "crescendo" },
  { area: "Cirurgia BMF", artigosNacionais_ano: 320, artigosInternacionais_ano: 260, fatorImpactoMedio: 2.9, patentes_acumulado: 34, gruposPesquisa: 56, tendencia: "estavel" },
  { area: "Odontopediatria", artigosNacionais_ano: 280, artigosInternacionais_ano: 200, fatorImpactoMedio: 2.6, patentes_acumulado: 18, gruposPesquisa: 62, tendencia: "estavel" },
  { area: "Prótese/Reabilitação", artigosNacionais_ano: 340, artigosInternacionais_ano: 240, fatorImpactoMedio: 2.7, patentes_acumulado: 68, gruposPesquisa: 54, tendencia: "crescendo" },
  { area: "Patologia/Estomatologia", artigosNacionais_ano: 240, artigosInternacionais_ano: 180, fatorImpactoMedio: 3.4, patentes_acumulado: 28, gruposPesquisa: 48, tendencia: "estavel" },
];

// =============================================================================
// PERFIL DO EGRESSO NO MERCADO (Pesquisas CFO + CROs 2023)
// =============================================================================
export const egressosMercado: EgressoMercado[] = [
  { anosAposFormatura: "< 1 ano", empregado_pct: 42.8, autonomo_pct: 18.4, desempregado_pct: 38.8, rendaMedia: 3200, atuandoEspecialidade_pct: 8.2, satisfacao_pct: 48.6 },
  { anosAposFormatura: "1-3 anos", empregado_pct: 38.2, autonomo_pct: 34.6, desempregado_pct: 27.2, rendaMedia: 4800, atuandoEspecialidade_pct: 22.4, satisfacao_pct: 56.2 },
  { anosAposFormatura: "3-5 anos", empregado_pct: 32.4, autonomo_pct: 48.2, desempregado_pct: 19.4, rendaMedia: 6400, atuandoEspecialidade_pct: 38.6, satisfacao_pct: 62.8 },
  { anosAposFormatura: "5-10 anos", empregado_pct: 24.8, autonomo_pct: 62.4, desempregado_pct: 12.8, rendaMedia: 9200, atuandoEspecialidade_pct: 52.4, satisfacao_pct: 68.4 },
  { anosAposFormatura: "10-20 anos", empregado_pct: 18.2, autonomo_pct: 72.6, desempregado_pct: 9.2, rendaMedia: 14800, atuandoEspecialidade_pct: 64.8, satisfacao_pct: 72.6 },
  { anosAposFormatura: "> 20 anos", empregado_pct: 12.4, autonomo_pct: 78.8, desempregado_pct: 8.8, rendaMedia: 18600, atuandoEspecialidade_pct: 72.4, satisfacao_pct: 74.2 },
];

// =============================================================================
// INDICADORES CONSOLIDADOS UNIVERSIDADES
// =============================================================================
export const indicadoresUniversidades = {
  totalFaculdades: 540,
  faculdadesPublicas: 80,
  faculdadesPrivadas: 460,
  vagasAnuais: 25000,
  concluintesAnuais: 19500,
  taxaEvasaoMedia: 16.4,
  programasPosGrad: 128,
  programasMestrado: 92,
  programasDoutorado: 62,
  tituladosMestrado_ano: 980,
  tituladosDoutorado_ano: 510,
  gruposPesquisa: 748,
  pesquisadoresAtivos: 4560,
  artigosPublicados_ano: 6420,
  patentes_acumulado: 524,
  mediaCandVagaPublica: 52.6,
  mediaCandVagaPrivada: 1.0,
  mediaENADE: 3.0,
  brasilRankingMundial: 2, // 2º maior produtor de pesquisa odontológica
};
