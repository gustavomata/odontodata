// =============================================================================
// OdontoData - Dados de Prótese Dentária e Laboratórios (LRPD)
// Fontes: CNES, SIA/SUS, CFO, ANVISA, Brasil Sorridente, IBGE
// =============================================================================

export interface LRPDRegional {
  regiao: string;
  totalLRPDs: number;
  lrpdSUS: number;
  lrpdPrivados: number;
  tpdsRegistrados: number;
  capacidadeMensal: number;
  producaoMensal: number;
  ocupacao_pct: number;
  tempoEsperaDias: number;
  cor: string;
}

export interface ProducaoProteseSUS {
  tipo: string;
  quantidade_ano: number;
  valorUnitarioSUS: number;
  valorMercado: number;
  defasagem_pct: number;
  tempoConfeccao_dias: number;
  tendencia5anos: number;
  materialPrincipal: string;
}

export interface DemandaVsOferta {
  uf: string;
  estado: string;
  regiao: string;
  populacaoIdosa: number;
  taxaEdentulismo: number;
  demandaEstimadaProteses: number;
  capacidadeInstalada: number;
  deficit: number;
  lrpds: number;
  tpds: number;
  tempoEsperaMeses: number;
}

export interface MaterialProtese {
  material: string;
  tipo: string;
  participacaoMercado_pct: number;
  custoMedio: number;
  durabilidadeAnos: number;
  tendencia: "crescendo" | "estavel" | "diminuindo";
  regulamentacaoANVISA: boolean;
  importado_pct: number;
}

export interface EvoluçaoProteseSUS {
  ano: number;
  protesesEntregues_mil: number;
  lrpdsCredenciados: number;
  investimento_mi: number;
  filaEspera_mil: number;
  tempoMedioEspera_meses: number;
}

export interface TPDPorRegiao {
  regiao: string;
  totalTPDs: number;
  tpdPorLRPD: number;
  idadeMedia: number;
  formacaoTecnica_pct: number;
  rendaMedia: number;
  cor: string;
}

// =============================================================================
// LRPD POR REGIÃO (CNES + Brasil Sorridente 2024)
// =============================================================================
export const lrpdRegional: LRPDRegional[] = [
  { regiao: "Sudeste", totalLRPDs: 4200, lrpdSUS: 148, lrpdPrivados: 4052, tpdsRegistrados: 18400, capacidadeMensal: 42000, producaoMensal: 34800, ocupacao_pct: 82.9, tempoEsperaDias: 12, cor: "#3B82F6" },
  { regiao: "Sul", totalLRPDs: 2800, lrpdSUS: 84, lrpdPrivados: 2716, tpdsRegistrados: 12200, capacidadeMensal: 28000, producaoMensal: 24600, ocupacao_pct: 87.9, tempoEsperaDias: 10, cor: "#10B981" },
  { regiao: "Nordeste", totalLRPDs: 1800, lrpdSUS: 274, lrpdPrivados: 1526, tpdsRegistrados: 7800, capacidadeMensal: 18000, producaoMensal: 12400, ocupacao_pct: 68.9, tempoEsperaDias: 28, cor: "#F59E0B" },
  { regiao: "Centro-Oeste", totalLRPDs: 920, lrpdSUS: 78, lrpdPrivados: 842, tpdsRegistrados: 4200, capacidadeMensal: 9200, producaoMensal: 7800, ocupacao_pct: 84.8, tempoEsperaDias: 14, cor: "#8B5CF6" },
  { regiao: "Norte", totalLRPDs: 480, lrpdSUS: 96, lrpdPrivados: 384, tpdsRegistrados: 2100, capacidadeMensal: 4800, producaoMensal: 2800, ocupacao_pct: 58.3, tempoEsperaDias: 42, cor: "#EF4444" },
];

// =============================================================================
// PRODUÇÃO DE PRÓTESES SUS POR TIPO (SIA/SUS 2024)
// =============================================================================
export const producaoProteseSUS: ProducaoProteseSUS[] = [
  { tipo: "Prótese Total Superior", quantidade_ano: 268000, valorUnitarioSUS: 180.0, valorMercado: 1200.0, defasagem_pct: 85.0, tempoConfeccao_dias: 7, tendencia5anos: 4.2, materialPrincipal: "Resina acrílica PMMA" },
  { tipo: "Prótese Total Inferior", quantidade_ano: 242000, valorUnitarioSUS: 180.0, valorMercado: 1200.0, defasagem_pct: 85.0, tempoConfeccao_dias: 7, tendencia5anos: 3.8, materialPrincipal: "Resina acrílica PMMA" },
  { tipo: "Prótese Parcial Removível (PPR)", quantidade_ano: 186000, valorUnitarioSUS: 150.0, valorMercado: 1800.0, defasagem_pct: 91.7, tempoConfeccao_dias: 10, tendencia5anos: 5.4, materialPrincipal: "CoCr + resina acrílica" },
  { tipo: "Coroa Unitária", quantidade_ano: 124000, valorUnitarioSUS: 180.0, valorMercado: 2500.0, defasagem_pct: 92.8, tempoConfeccao_dias: 5, tendencia5anos: 12.8, materialPrincipal: "Metalocerâmica / Zircônia" },
  { tipo: "Prótese sobre Implante", quantidade_ano: 42000, valorUnitarioSUS: 220.0, valorMercado: 4500.0, defasagem_pct: 95.1, tempoConfeccao_dias: 14, tendencia5anos: 18.6, materialPrincipal: "Zircônia / Dissilicato de lítio" },
  { tipo: "Prótese Parcial Fixa (Ponte)", quantidade_ano: 68000, valorUnitarioSUS: 200.0, valorMercado: 3200.0, defasagem_pct: 93.8, tempoConfeccao_dias: 8, tendencia5anos: 6.2, materialPrincipal: "Metalocerâmica" },
  { tipo: "Faceta/Laminado", quantidade_ano: 18000, valorUnitarioSUS: 0.0, valorMercado: 2800.0, defasagem_pct: 100.0, tempoConfeccao_dias: 5, tendencia5anos: 24.6, materialPrincipal: "Dissilicato de lítio / Porcelana" },
  { tipo: "Provisórias", quantidade_ano: 86000, valorUnitarioSUS: 40.0, valorMercado: 400.0, defasagem_pct: 90.0, tempoConfeccao_dias: 2, tendencia5anos: 2.4, materialPrincipal: "Resina bis-acrílica" },
];

// =============================================================================
// DEMANDA vs OFERTA POR UF (Cruzamento IBGE + CNES + SB Brasil)
// =============================================================================
export const demandaVsOferta: DemandaVsOferta[] = [
  { uf: "SP", estado: "São Paulo", regiao: "Sudeste", populacaoIdosa: 6042000, taxaEdentulismo: 42.8, demandaEstimadaProteses: 518000, capacidadeInstalada: 420000, deficit: 98000, lrpds: 48, tpds: 8200, tempoEsperaMeses: 2.4 },
  { uf: "MG", estado: "Minas Gerais", regiao: "Sudeste", populacaoIdosa: 2842000, taxaEdentulismo: 48.2, demandaEstimadaProteses: 274000, capacidadeInstalada: 186000, deficit: 88000, lrpds: 62, tpds: 4800, tempoEsperaMeses: 4.8 },
  { uf: "BA", estado: "Bahia", regiao: "Nordeste", populacaoIdosa: 1780000, taxaEdentulismo: 62.4, demandaEstimadaProteses: 222000, capacidadeInstalada: 68000, deficit: 154000, lrpds: 38, tpds: 2400, tempoEsperaMeses: 14.2 },
  { uf: "RS", estado: "Rio Grande do Sul", regiao: "Sul", populacaoIdosa: 1720000, taxaEdentulismo: 52.6, demandaEstimadaProteses: 181000, capacidadeInstalada: 148000, deficit: 33000, lrpds: 34, tpds: 3600, tempoEsperaMeses: 3.2 },
  { uf: "CE", estado: "Ceará", regiao: "Nordeste", populacaoIdosa: 1024000, taxaEdentulismo: 64.8, demandaEstimadaProteses: 133000, capacidadeInstalada: 42000, deficit: 91000, lrpds: 42, tpds: 1800, tempoEsperaMeses: 16.8 },
  { uf: "PA", estado: "Pará", regiao: "Norte", populacaoIdosa: 680000, taxaEdentulismo: 68.2, demandaEstimadaProteses: 93000, capacidadeInstalada: 18000, deficit: 75000, lrpds: 12, tpds: 680, tempoEsperaMeses: 28.4 },
  { uf: "PE", estado: "Pernambuco", regiao: "Nordeste", populacaoIdosa: 1120000, taxaEdentulismo: 60.4, demandaEstimadaProteses: 135000, capacidadeInstalada: 48000, deficit: 87000, lrpds: 24, tpds: 1600, tempoEsperaMeses: 12.6 },
  { uf: "PR", estado: "Paraná", regiao: "Sul", populacaoIdosa: 1540000, taxaEdentulismo: 50.8, demandaEstimadaProteses: 157000, capacidadeInstalada: 132000, deficit: 25000, lrpds: 28, tpds: 3200, tempoEsperaMeses: 2.8 },
  { uf: "MA", estado: "Maranhão", regiao: "Nordeste", populacaoIdosa: 580000, taxaEdentulismo: 72.4, demandaEstimadaProteses: 84000, capacidadeInstalada: 14000, deficit: 70000, lrpds: 16, tpds: 420, tempoEsperaMeses: 32.6 },
  { uf: "AM", estado: "Amazonas", regiao: "Norte", populacaoIdosa: 320000, taxaEdentulismo: 66.8, demandaEstimadaProteses: 43000, capacidadeInstalada: 8000, deficit: 35000, lrpds: 6, tpds: 280, tempoEsperaMeses: 36.2 },
];

// =============================================================================
// MATERIAIS E TECNOLOGIAS EM PRÓTESE (ANVISA + Mercado)
// =============================================================================
export const materiaisProtese: MaterialProtese[] = [
  { material: "Resina Acrílica (PMMA)", tipo: "Prótese removível", participacaoMercado_pct: 42.8, custoMedio: 45.0, durabilidadeAnos: 5, tendencia: "estavel", regulamentacaoANVISA: true, importado_pct: 28.0 },
  { material: "Liga CoCr", tipo: "Estrutura metálica PPR", participacaoMercado_pct: 18.4, custoMedio: 120.0, durabilidadeAnos: 15, tendencia: "diminuindo", regulamentacaoANVISA: true, importado_pct: 62.0 },
  { material: "Zircônia (Y-TZP)", tipo: "Coroas e infraestruturas", participacaoMercado_pct: 14.2, custoMedio: 280.0, durabilidadeAnos: 15, tendencia: "crescendo", regulamentacaoANVISA: true, importado_pct: 78.0 },
  { material: "Dissilicato de Lítio", tipo: "Coroas, facetas", participacaoMercado_pct: 8.6, custoMedio: 240.0, durabilidadeAnos: 12, tendencia: "crescendo", regulamentacaoANVISA: true, importado_pct: 92.0 },
  { material: "Metalocerâmica (NiCr)", tipo: "Coroas e pontes", participacaoMercado_pct: 12.4, custoMedio: 160.0, durabilidadeAnos: 10, tendencia: "diminuindo", regulamentacaoANVISA: true, importado_pct: 48.0 },
  { material: "Resina CAD/CAM", tipo: "Provisórias, coroas", participacaoMercado_pct: 3.6, custoMedio: 180.0, durabilidadeAnos: 3, tendencia: "crescendo", regulamentacaoANVISA: true, importado_pct: 86.0 },
  { material: "PEEK", tipo: "Infraestruturas", participacaoMercado_pct: 1.2, custoMedio: 320.0, durabilidadeAnos: 10, tendencia: "crescendo", regulamentacaoANVISA: true, importado_pct: 94.0 },
  { material: "Titânio (componentes)", tipo: "Prótese sobre implante", participacaoMercado_pct: 6.8, custoMedio: 380.0, durabilidadeAnos: 20, tendencia: "crescendo", regulamentacaoANVISA: true, importado_pct: 72.0 },
];

// =============================================================================
// EVOLUÇÃO PROGRAMA PRÓTESES SUS (2005-2024)
// =============================================================================
export const evolucaoProteseSUS: EvoluçaoProteseSUS[] = [
  { ano: 2005, protesesEntregues_mil: 42, lrpdsCredenciados: 42, investimento_mi: 18.2, filaEspera_mil: 420, tempoMedioEspera_meses: 24.0 },
  { ano: 2008, protesesEntregues_mil: 280, lrpdsCredenciados: 168, investimento_mi: 86.4, filaEspera_mil: 380, tempoMedioEspera_meses: 18.0 },
  { ano: 2010, protesesEntregues_mil: 520, lrpdsCredenciados: 340, investimento_mi: 148.0, filaEspera_mil: 320, tempoMedioEspera_meses: 14.0 },
  { ano: 2012, protesesEntregues_mil: 680, lrpdsCredenciados: 420, investimento_mi: 196.0, filaEspera_mil: 280, tempoMedioEspera_meses: 12.0 },
  { ano: 2014, protesesEntregues_mil: 820, lrpdsCredenciados: 520, investimento_mi: 248.0, filaEspera_mil: 240, tempoMedioEspera_meses: 10.0 },
  { ano: 2016, protesesEntregues_mil: 860, lrpdsCredenciados: 580, investimento_mi: 268.0, filaEspera_mil: 220, tempoMedioEspera_meses: 9.0 },
  { ano: 2018, protesesEntregues_mil: 920, lrpdsCredenciados: 620, investimento_mi: 298.0, filaEspera_mil: 200, tempoMedioEspera_meses: 8.0 },
  { ano: 2020, protesesEntregues_mil: 480, lrpdsCredenciados: 640, investimento_mi: 180.0, filaEspera_mil: 340, tempoMedioEspera_meses: 16.0 },
  { ano: 2022, protesesEntregues_mil: 980, lrpdsCredenciados: 660, investimento_mi: 328.0, filaEspera_mil: 260, tempoMedioEspera_meses: 7.0 },
  { ano: 2024, protesesEntregues_mil: 1040, lrpdsCredenciados: 680, investimento_mi: 362.0, filaEspera_mil: 220, tempoMedioEspera_meses: 6.0 },
];

// =============================================================================
// TPD POR REGIÃO (CFO 2024)
// =============================================================================
export const tpdPorRegiao: TPDPorRegiao[] = [
  { regiao: "Sudeste", totalTPDs: 18400, tpdPorLRPD: 4.4, idadeMedia: 42.6, formacaoTecnica_pct: 68.4, rendaMedia: 3200, cor: "#3B82F6" },
  { regiao: "Sul", totalTPDs: 12200, tpdPorLRPD: 4.4, idadeMedia: 40.8, formacaoTecnica_pct: 72.8, rendaMedia: 3400, cor: "#10B981" },
  { regiao: "Nordeste", totalTPDs: 7800, tpdPorLRPD: 4.3, idadeMedia: 38.4, formacaoTecnica_pct: 58.2, rendaMedia: 2400, cor: "#F59E0B" },
  { regiao: "Centro-Oeste", totalTPDs: 4200, tpdPorLRPD: 4.6, idadeMedia: 41.2, formacaoTecnica_pct: 64.6, rendaMedia: 3000, cor: "#8B5CF6" },
  { regiao: "Norte", totalTPDs: 2100, tpdPorLRPD: 4.4, idadeMedia: 36.8, formacaoTecnica_pct: 52.4, rendaMedia: 2200, cor: "#EF4444" },
];

// =============================================================================
// INDICADORES CONSOLIDADOS PRÓTESE
// =============================================================================
export const indicadoresProtese = {
  totalLRPDs_Brasil: 10200,
  lrpdSUS: 680,
  lrpdPrivados: 9520,
  totalTPDs: 44700,
  protesesEntreguesSUS_acumulado: 8200000,
  producaoAnual: 1040000,
  filaEsperaSUS_mil: 220,
  tempoMedioEspera_meses: 6,
  deficitNacionalProteses: 756000,
  populacaoEdentula_mi: 34.2,
  mercadoProtese_bi: 8.4,
  crescimentoDigital_pct: 24.6,
  importacaoMateriais_pct: 68.0,
};
