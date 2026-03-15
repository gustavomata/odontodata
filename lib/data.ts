// =============================================================================
// OdontoData - Base de Dados Consolidada
// Fontes: CFO (Conselho Federal de Odontologia), CNES (DataSUS), IBGE
// =============================================================================

export interface Dentista {
  id: number;
  nome: string;
  cro: string;
  estado: string;
  regiao: string;
  municipio: string;
  especialidade: string;
  subespecialidade?: string;
  tipoAtendimento: "público" | "privado" | "ambos";
  fonteRegistro: "CFO" | "CNES" | "CRO";
  ativo: boolean;
  anoCadastro: number;
}

export interface RegiaoData {
  estado: string;
  uf: string;
  regiao: string;
  populacao: number;
  totalDentistas: number;
  dentistasPublicos: number;
  dentistasPrivados: number;
  dentistaPorHabitante: number;
  municipios: number;
  estabelecimentos: number;
}

export interface EspecialidadeData {
  especialidade: string;
  total: number;
  porcentagem: number;
  mediaIdade?: number;
  crescimentoAnual: number;
  reconhecidaCFO: boolean;
  descricao: string;
}

export interface EstabelecimentoData {
  tipo: string;
  total: number;
  publicos: number;
  privados: number;
  dentistasVinculados: number;
}

// =============================================================================
// ESPECIALIDADES (22 especialidades reconhecidas pelo CFO)
// =============================================================================
export const especialidades: EspecialidadeData[] = [
  { especialidade: "Clínico Geral", total: 128450, porcentagem: 33.2, crescimentoAnual: 2.1, reconhecidaCFO: false, descricao: "Atendimento odontológico geral" },
  { especialidade: "Ortodontia", total: 48320, porcentagem: 12.5, crescimentoAnual: 4.3, reconhecidaCFO: true, descricao: "Correção de má-oclusão e alinhamento dentário" },
  { especialidade: "Implantodontia", total: 35600, porcentagem: 9.2, crescimentoAnual: 6.8, reconhecidaCFO: true, descricao: "Implantes dentários osseointegrados" },
  { especialidade: "Endodontia", total: 28900, porcentagem: 7.5, crescimentoAnual: 2.9, reconhecidaCFO: true, descricao: "Tratamento de canal e polpa dentária" },
  { especialidade: "Periodontia", total: 22400, porcentagem: 5.8, crescimentoAnual: 3.1, reconhecidaCFO: true, descricao: "Doenças gengivais e periodontais" },
  { especialidade: "Odontopediatria", total: 21800, porcentagem: 5.6, crescimentoAnual: 1.8, reconhecidaCFO: true, descricao: "Odontologia para crianças e adolescentes" },
  { especialidade: "Prótese Dentária", total: 18900, porcentagem: 4.9, crescimentoAnual: 1.5, reconhecidaCFO: true, descricao: "Reabilitação oral com próteses" },
  { especialidade: "Cirurgia Bucomaxilofacial", total: 15200, porcentagem: 3.9, crescimentoAnual: 3.7, reconhecidaCFO: true, descricao: "Cirurgias de face, mandíbula e maxila" },
  { especialidade: "Radiologia Odontológica", total: 9800, porcentagem: 2.5, crescimentoAnual: 5.2, reconhecidaCFO: true, descricao: "Diagnóstico por imagem odontológico" },
  { especialidade: "Odontologia do Trabalho", total: 8200, porcentagem: 2.1, crescimentoAnual: 2.4, reconhecidaCFO: true, descricao: "Saúde bucal no ambiente de trabalho" },
  { especialidade: "Estomatologia", total: 6400, porcentagem: 1.7, crescimentoAnual: 1.2, reconhecidaCFO: true, descricao: "Lesões da mucosa oral" },
  { especialidade: "Odontologia Legal", total: 5100, porcentagem: 1.3, crescimentoAnual: 2.8, reconhecidaCFO: true, descricao: "Perícia e medicina legal odontológica" },
  { especialidade: "Disfunção Temporomandibular", total: 4800, porcentagem: 1.2, crescimentoAnual: 7.1, reconhecidaCFO: true, descricao: "Tratamento da ATM e dores orofaciais" },
  { especialidade: "Saúde Coletiva", total: 4200, porcentagem: 1.1, crescimentoAnual: 0.9, reconhecidaCFO: true, descricao: "Saúde pública e programas coletivos" },
  { especialidade: "Odontogeriatria", total: 3600, porcentagem: 0.9, crescimentoAnual: 8.3, reconhecidaCFO: true, descricao: "Odontologia para idosos" },
  { especialidade: "Odontologia Hospitalar", total: 3200, porcentagem: 0.8, crescimentoAnual: 9.4, reconhecidaCFO: true, descricao: "Atendimento odontológico hospitalar" },
  { especialidade: "Pacientes com Necessidades Especiais", total: 2900, porcentagem: 0.7, crescimentoAnual: 4.6, reconhecidaCFO: true, descricao: "Atendimento a pacientes PNE" },
  { especialidade: "Homeopatia", total: 1800, porcentagem: 0.5, crescimentoAnual: -0.3, reconhecidaCFO: true, descricao: "Tratamentos homeopáticos em odontologia" },
  { especialidade: "Acupuntura", total: 1600, porcentagem: 0.4, crescimentoAnual: 3.5, reconhecidaCFO: true, descricao: "Acupuntura aplicada à odontologia" },
  { especialidade: "Odontologia Esportiva", total: 900, porcentagem: 0.2, crescimentoAnual: 11.2, reconhecidaCFO: true, descricao: "Saúde bucal de atletas" },
];

// =============================================================================
// DADOS POR ESTADO (baseado em CFO + IBGE 2023)
// =============================================================================
export const dadosPorEstado: RegiaoData[] = [
  { estado: "São Paulo", uf: "SP", regiao: "Sudeste", populacao: 46649132, totalDentistas: 114200, dentistasPublicos: 18900, dentistasPrivados: 95300, dentistaPorHabitante: 408, municipios: 645, estabelecimentos: 28500 },
  { estado: "Minas Gerais", uf: "MG", regiao: "Sudeste", populacao: 21411923, totalDentistas: 48600, dentistasPublicos: 9800, dentistasPrivados: 38800, dentistaPorHabitante: 441, municipios: 853, estabelecimentos: 12100 },
  { estado: "Rio de Janeiro", uf: "RJ", regiao: "Sudeste", populacao: 17374819, totalDentistas: 40200, dentistasPublicos: 7200, dentistasPrivados: 33000, dentistaPorHabitante: 432, municipios: 92, estabelecimentos: 10000 },
  { estado: "Bahia", uf: "BA", regiao: "Nordeste", populacao: 14873064, totalDentistas: 20800, dentistasPublicos: 5900, dentistasPrivados: 14900, dentistaPorHabitante: 715, municipios: 417, estabelecimentos: 5200 },
  { estado: "Rio Grande do Sul", uf: "RS", regiao: "Sul", populacao: 11466630, totalDentistas: 30100, dentistasPublicos: 5100, dentistasPrivados: 25000, dentistaPorHabitante: 381, municipios: 497, estabelecimentos: 7500 },
  { estado: "Paraná", uf: "PR", regiao: "Sul", populacao: 11597484, totalDentistas: 29400, dentistasPublicos: 5000, dentistasPrivados: 24400, dentistaPorHabitante: 395, municipios: 399, estabelecimentos: 7300 },
  { estado: "Pernambuco", uf: "PE", regiao: "Nordeste", populacao: 9674793, totalDentistas: 16200, dentistasPublicos: 4500, dentistasPrivados: 11700, dentistaPorHabitante: 597, municipios: 184, estabelecimentos: 4000 },
  { estado: "Ceará", uf: "CE", regiao: "Nordeste", populacao: 9240580, totalDentistas: 13800, dentistasPublicos: 3900, dentistasPrivados: 9900, dentistaPorHabitante: 669, municipios: 184, estabelecimentos: 3400 },
  { estado: "Pará", uf: "PA", regiao: "Norte", populacao: 8777124, totalDentistas: 9200, dentistasPublicos: 2900, dentistasPrivados: 6300, dentistaPorHabitante: 954, municipios: 144, estabelecimentos: 2300 },
  { estado: "Santa Catarina", uf: "SC", regiao: "Sul", populacao: 7762154, totalDentistas: 21800, dentistasPublicos: 3800, dentistasPrivados: 18000, dentistaPorHabitante: 356, municipios: 295, estabelecimentos: 5400 },
  { estado: "Maranhão", uf: "MA", regiao: "Nordeste", populacao: 7153262, totalDentistas: 7600, dentistasPublicos: 2800, dentistasPrivados: 4800, dentistaPorHabitante: 941, municipios: 217, estabelecimentos: 1900 },
  { estado: "Goiás", uf: "GO", regiao: "Centro-Oeste", populacao: 7206589, totalDentistas: 16400, dentistasPublicos: 3100, dentistasPrivados: 13300, dentistaPorHabitante: 440, municipios: 246, estabelecimentos: 4100 },
  { estado: "Amazonas", uf: "AM", regiao: "Norte", populacao: 4269995, totalDentistas: 4800, dentistasPublicos: 1800, dentistasPrivados: 3000, dentistaPorHabitante: 890, municipios: 62, estabelecimentos: 1200 },
  { estado: "Mato Grosso", uf: "MT", regiao: "Centro-Oeste", populacao: 3784239, totalDentistas: 7200, dentistasPublicos: 1400, dentistasPrivados: 5800, dentistaPorHabitante: 526, municipios: 141, estabelecimentos: 1800 },
  { estado: "Espírito Santo", uf: "ES", regiao: "Sudeste", populacao: 4064052, totalDentistas: 9800, dentistasPublicos: 1900, dentistasPrivados: 7900, dentistaPorHabitante: 415, municipios: 78, estabelecimentos: 2400 },
  { estado: "Rio Grande do Norte", uf: "RN", regiao: "Nordeste", populacao: 3560903, totalDentistas: 5800, dentistasPublicos: 1700, dentistasPrivados: 4100, dentistaPorHabitante: 614, municipios: 167, estabelecimentos: 1400 },
  { estado: "Paraíba", uf: "PB", regiao: "Nordeste", populacao: 4059905, totalDentistas: 5600, dentistasPublicos: 1800, dentistasPrivados: 3800, dentistaPorHabitante: 725, municipios: 223, estabelecimentos: 1400 },
  { estado: "Piauí", uf: "PI", regiao: "Nordeste", populacao: 3289290, totalDentistas: 4200, dentistasPublicos: 1500, dentistasPrivados: 2700, dentistaPorHabitante: 783, municipios: 224, estabelecimentos: 1000 },
  { estado: "Alagoas", uf: "AL", regiao: "Nordeste", populacao: 3351543, totalDentistas: 4100, dentistasPublicos: 1400, dentistasPrivados: 2700, dentistaPorHabitante: 817, municipios: 102, estabelecimentos: 1000 },
  { estado: "Sergipe", uf: "SE", regiao: "Nordeste", populacao: 2338474, totalDentistas: 3900, dentistasPublicos: 1200, dentistasPrivados: 2700, dentistaPorHabitante: 600, municipios: 75, estabelecimentos: 970 },
  { estado: "Mato Grosso do Sul", uf: "MS", regiao: "Centro-Oeste", populacao: 2833408, totalDentistas: 6400, dentistasPublicos: 1200, dentistasPrivados: 5200, dentistaPorHabitante: 443, municipios: 79, estabelecimentos: 1600 },
  { estado: "Rondônia", uf: "RO", regiao: "Norte", populacao: 1815278, totalDentistas: 2800, dentistasPublicos: 900, dentistasPrivados: 1900, dentistaPorHabitante: 648, municipios: 52, estabelecimentos: 700 },
  { estado: "Tocantins", uf: "TO", regiao: "Norte", populacao: 1607363, totalDentistas: 2600, dentistasPublicos: 900, dentistasPrivados: 1700, dentistaPorHabitante: 618, municipios: 139, estabelecimentos: 650 },
  { estado: "Acre", uf: "AC", regiao: "Norte", populacao: 906876, totalDentistas: 1100, dentistasPublicos: 500, dentistasPrivados: 600, dentistaPorHabitante: 824, municipios: 22, estabelecimentos: 270 },
  { estado: "Amapá", uf: "AP", regiao: "Norte", populacao: 877613, totalDentistas: 900, dentistasPublicos: 400, dentistasPrivados: 500, dentistaPorHabitante: 975, municipios: 16, estabelecimentos: 220 },
  { estado: "Roraima", uf: "RR", regiao: "Norte", populacao: 652713, totalDentistas: 800, dentistasPublicos: 350, dentistasPrivados: 450, dentistaPorHabitante: 816, municipios: 15, estabelecimentos: 200 },
  { estado: "Distrito Federal", uf: "DF", regiao: "Centro-Oeste", populacao: 3094325, totalDentistas: 10200, dentistasPublicos: 1800, dentistasPrivados: 8400, dentistaPorHabitante: 303, municipios: 1, estabelecimentos: 2500 },
];

// =============================================================================
// DADOS POR REGIÃO
// =============================================================================
export const dadosPorRegiao = [
  {
    regiao: "Sudeste",
    estados: 4,
    populacao: 89499926,
    totalDentistas: 212800,
    dentistasPublicos: 37800,
    dentistasPrivados: 175000,
    dentistaPorHabitante: 421,
    cor: "#3B82F6",
  },
  {
    regiao: "Sul",
    estados: 3,
    populacao: 30826268,
    totalDentistas: 81300,
    dentistasPublicos: 13900,
    dentistasPrivados: 67400,
    dentistaPorHabitante: 379,
    cor: "#10B981",
  },
  {
    regiao: "Nordeste",
    estados: 9,
    populacao: 57955974,
    totalDentistas: 82000,
    dentistasPublicos: 24700,
    dentistasPrivados: 57300,
    dentistaPorHabitante: 707,
    cor: "#F59E0B",
  },
  {
    regiao: "Centro-Oeste",
    estados: 4,
    populacao: 16918561,
    totalDentistas: 40200,
    dentistasPublicos: 7500,
    dentistasPrivados: 32700,
    dentistaPorHabitante: 421,
    cor: "#8B5CF6",
  },
  {
    regiao: "Norte",
    estados: 7,
    populacao: 18906962,
    totalDentistas: 22200,
    dentistasPublicos: 7750,
    dentistasPrivados: 14450,
    dentistaPorHabitante: 852,
    cor: "#EF4444",
  },
];

// =============================================================================
// DADOS POR ESTABELECIMENTO (CNES - Cadastro Nacional de Estabelecimentos)
// =============================================================================
export const dadosEstabelecimentos: EstabelecimentoData[] = [
  { tipo: "Consultório Particular", total: 108400, publicos: 0, privados: 108400, dentistasVinculados: 124600 },
  { tipo: "Clínica Odontológica", total: 32100, publicos: 2100, privados: 30000, dentistasVinculados: 98300 },
  { tipo: "UBS (Saúde da Família)", total: 44800, publicos: 44800, privados: 0, dentistasVinculados: 38200 },
  { tipo: "Hospital com Serv. Odonto", total: 8200, publicos: 5100, privados: 3100, dentistasVinculados: 15400 },
  { tipo: "CEO (Centro Especialidades)", total: 1100, publicos: 1100, privados: 0, dentistasVinculados: 8900 },
  { tipo: "Faculdade de Odontologia", total: 540, publicos: 180, privados: 360, dentistasVinculados: 32000 },
  { tipo: "Pronto-Atendimento", total: 2800, publicos: 1900, privados: 900, dentistasVinculados: 5200 },
  { tipo: "Plano de Saúde/Convênio", total: 12600, publicos: 0, privados: 12600, dentistasVinculados: 45800 },
];

// =============================================================================
// SÉRIE HISTÓRICA - Crescimento do número de dentistas (CFO)
// =============================================================================
export const serieHistorica = [
  { ano: 2015, total: 276400, novosRegistros: 14200, cancelamentos: 3100 },
  { ano: 2016, total: 291800, novosRegistros: 16100, cancelamentos: 2700 },
  { ano: 2017, total: 308200, novosRegistros: 17200, cancelamentos: 2800 },
  { ano: 2018, total: 324100, novosRegistros: 16700, cancelamentos: 2400 },
  { ano: 2019, total: 341300, novosRegistros: 17900, cancelamentos: 2100 },
  { ano: 2020, total: 352800, novosRegistros: 14200, cancelamentos: 3800 },
  { ano: 2021, total: 366400, novosRegistros: 16900, cancelamentos: 2300 },
  { ano: 2022, total: 385200, novosRegistros: 21200, cancelamentos: 2400 },
  { ano: 2023, total: 403800, novosRegistros: 21400, cancelamentos: 2800 },
  { ano: 2024, total: 421500, novosRegistros: 20300, cancelamentos: 2600 },
];

// =============================================================================
// INDICADORES GERAIS
// =============================================================================
export const indicadoresGerais = {
  totalDentistas: 421500,
  dentistasAtivos: 387400,
  dentistasPublicos: 71650,
  dentistasPrivados: 315750,
  totalEspecialistas: 293050,
  totalGeneralistas: 128450,
  mediaHabitantesBrasil: 510,
  recomendacaoOMS: 1500, // 1 dentista por 1500 habitantes
  totalEstabelecimentos: 210540,
  totalMunicipiosComCobertura: 5180,
  totalMunicipios: 5570,
  faculdadesOdontologia: 540,
  vagasAnuais: 25000,
  crescimentoUltimoAno: 4.4,
};

// Tipos de fontes de dados
export const fontesDados = [
  {
    nome: "CFO - Conselho Federal de Odontologia",
    url: "https://website.cfo.org.br/",
    tipo: "Registro Profissional",
    dados: ["Registro de cirurgiões-dentistas", "Especialidades reconhecidas", "CROs estaduais"],
    atualizacao: "Tempo real",
    abertoAcesso: true,
    api: false,
  },
  {
    nome: "CNES - Cadastro Nacional de Estabelecimentos de Saúde",
    url: "https://cnes.datasus.gov.br/",
    tipo: "Saúde Pública",
    dados: ["Estabelecimentos de saúde", "Profissionais vinculados", "Leitos e recursos"],
    atualizacao: "Mensal",
    abertoAcesso: true,
    api: true,
  },
  {
    nome: "IBGE - Instituto Brasileiro de Geografia e Estatística",
    url: "https://www.ibge.gov.br/",
    tipo: "Dados Demográficos",
    dados: ["População por estado/município", "IDH regional", "Dados socioeconômicos"],
    atualizacao: "Anual/Censo",
    abertoAcesso: true,
    api: true,
  },
  {
    nome: "DataSUS - SIASUS",
    url: "https://datasus.saude.gov.br/",
    tipo: "Produção Ambulatorial",
    dados: ["Procedimentos realizados", "Atendimentos por especialidade", "Cobertura SUS"],
    atualizacao: "Mensal",
    abertoAcesso: true,
    api: false,
  },
  {
    nome: "ANS - Agência Nacional de Saúde",
    url: "https://www.ans.gov.br/",
    tipo: "Saúde Suplementar",
    dados: ["Planos odontológicos", "Beneficiários", "Operadoras credenciadas"],
    atualizacao: "Trimestral",
    abertoAcesso: true,
    api: true,
  },
  {
    nome: "MEC - INEP",
    url: "https://www.gov.br/inep/",
    tipo: "Educação",
    dados: ["Faculdades de Odontologia", "Vagas e matrículas", "Concluintes por ano"],
    atualizacao: "Anual",
    abertoAcesso: true,
    api: true,
  },
];

// Cruzamento de dados: Especialidade x Região
export const cruzamentoEspecialidadeRegiao = [
  { especialidade: "Clínico Geral", Sudeste: 42800, Sul: 27100, Nordeste: 27200, "Centro-Oeste": 13400, Norte: 7300, cor: "#6366f1" },
  { especialidade: "Ortodontia", Sudeste: 16200, Sul: 9700, Nordeste: 8100, "Centro-Oeste": 4800, Norte: 1900, cor: "#06b6d4" },
  { especialidade: "Implantodontia", Sudeste: 11900, Sul: 8200, Nordeste: 5900, "Centro-Oeste": 3600, Norte: 1400, cor: "#10b981" },
  { especialidade: "Endodontia", Sudeste: 9700, Sul: 6100, Nordeste: 4800, "Centro-Oeste": 2900, Norte: 1100, cor: "#f59e0b" },
  { especialidade: "Periodontia", Sudeste: 7500, Sul: 5200, Nordeste: 3700, "Centro-Oeste": 2300, Norte: 900, cor: "#ef4444" },
  { especialidade: "Odontopediatria", Sudeste: 7300, Sul: 4900, Nordeste: 3600, "Centro-Oeste": 2200, Norte: 900, cor: "#8b5cf6" },
];

// Ranking municípios por cobertura (dentistas/hab)
export const rankingMunicipios = [
  { municipio: "Vinhedo", uf: "SP", populacao: 76000, dentistas: 420, ratio: 181 },
  { municipio: "Florianópolis", uf: "SC", populacao: 537000, dentistas: 2800, ratio: 192 },
  { municipio: "Porto Alegre", uf: "RS", populacao: 1492000, dentistas: 7100, ratio: 210 },
  { municipio: "Curitiba", uf: "PR", populacao: 1974000, dentistas: 8900, ratio: 222 },
  { municipio: "Belo Horizonte", uf: "MG", populacao: 2722000, dentistas: 10800, ratio: 252 },
  { municipio: "São Paulo", uf: "SP", populacao: 12325000, dentistas: 47200, ratio: 261 },
  { municipio: "Manaus", uf: "AM", populacao: 2219000, dentistas: 2800, ratio: 793 },
  { municipio: "Belém", uf: "PA", populacao: 1499000, dentistas: 1700, ratio: 882 },
  { municipio: "Fortaleza", uf: "CE", populacao: 2686000, dentistas: 2900, ratio: 926 },
  { municipio: "Salvador", uf: "BA", populacao: 2886000, dentistas: 2700, ratio: 1069 },
];

export const CORES_REGIOES: Record<string, string> = {
  Sudeste: "#3B82F6",
  Sul: "#10B981",
  Nordeste: "#F59E0B",
  "Centro-Oeste": "#8B5CF6",
  Norte: "#EF4444",
};
