// ============================================================
// CONCURSOS AGREGADOR — Modelo Completo de Edital
// Plataforma OdontoData — Agregador Nacional de Concursos Odontológicos
// ============================================================

// --- TIPOS ---

export interface BancaOrganizadora {
  nome: string;
  site: string;
  areaInscricao: string;
}

export interface Localizacao {
  municipio: string;
  uf: string;
  regiao: string;
  abrangencia: "local" | "estadual" | "nacional";
}

export interface VagasDetalhe {
  total: number;
  ampla: number;
  pcd: number;
  negro: number;
  indigena: number;
  cadastroReserva: number;
}

export interface ItemRemuneracao {
  descricao: string;
  valor: number | string;
}

export interface Remuneracao {
  vencimentoBase: number;
  gratificacoes: ItemRemuneracao[];
  beneficios: ItemRemuneracao[];
  totalEstimado: number;
  observacao?: string;
}

export interface Inscricao {
  inicio: string;
  fim: string;
  taxa: number;
  isencao: string;
  url: string;
}

export interface Etapa {
  ordem: number;
  tipo: "prova-objetiva" | "prova-discursiva" | "prova-pratica" | "titulos" | "teste-fisico" | "exame-medico" | "curso-formacao" | "heteroidentificacao";
  descricao: string;
  data?: string;
  local?: string;
  peso?: number;
  eliminatoria: boolean;
  detalhes?: string;
}

export interface EventoCronograma {
  data: string;
  descricao: string;
  status: "concluido" | "atual" | "futuro";
}

export interface BlocoConteudo {
  disciplina: string;
  topicos: string[];
}

export interface Documento {
  tipo: "edital" | "retificacao" | "resultado" | "convocacao" | "gabarito" | "outro";
  titulo: string;
  url: string;
  dataPublicacao: string;
}

export type StatusConcurso =
  | "edital-publicado"
  | "inscricoes-abertas"
  | "inscricoes-encerradas"
  | "prova-objetiva"
  | "resultado-parcial"
  | "resultado-final"
  | "homologado"
  | "convocacao"
  | "previsto"
  | "suspenso";

export interface Concurso {
  id: string;
  orgao: string;
  orgaoSigla: string;
  esfera: "federal" | "estadual" | "municipal" | "sistema-s";
  poder: "executivo" | "legislativo" | "judiciario" | "militar" | "autonomo";
  categoria: string;
  cargo: string;
  especialidade: string;
  banca: BancaOrganizadora;
  localizacao: Localizacao;
  vagas: VagasDetalhe;
  remuneracao: Remuneracao;
  inscricao: Inscricao;
  etapas: Etapa[];
  cronograma: EventoCronograma[];
  conteudoProgramatico: BlocoConteudo[];
  documentos: Documento[];
  statusAtual: StatusConcurso;
  requisitos: string[];
  cargaHoraria: string;
  regime: string;
  observacoes: string;
  destaque: boolean;
  atualizadoEm: string;
}

// --- HELPERS ---

export const STATUS_LABELS: Record<StatusConcurso, string> = {
  "edital-publicado": "Edital Publicado",
  "inscricoes-abertas": "Inscrições Abertas",
  "inscricoes-encerradas": "Inscrições Encerradas",
  "prova-objetiva": "Prova Objetiva",
  "resultado-parcial": "Resultado Parcial",
  "resultado-final": "Resultado Final",
  "homologado": "Homologado",
  "convocacao": "Convocação",
  "previsto": "Previsto",
  "suspenso": "Suspenso",
};

export const STATUS_COLORS: Record<StatusConcurso, string> = {
  "edital-publicado": "bg-blue-600/20 text-blue-400 border-blue-600/30",
  "inscricoes-abertas": "bg-emerald-600/20 text-emerald-400 border-emerald-600/30",
  "inscricoes-encerradas": "bg-slate-600/20 text-slate-400 border-slate-600/30",
  "prova-objetiva": "bg-amber-600/20 text-amber-400 border-amber-600/30",
  "resultado-parcial": "bg-purple-600/20 text-purple-400 border-purple-600/30",
  "resultado-final": "bg-cyan-600/20 text-cyan-400 border-cyan-600/30",
  "homologado": "bg-emerald-600/20 text-emerald-400 border-emerald-600/30",
  "convocacao": "bg-emerald-600/20 text-emerald-400 border-emerald-600/30",
  "previsto": "bg-amber-600/20 text-amber-400 border-amber-600/30",
  "suspenso": "bg-red-600/20 text-red-400 border-red-600/30",
};

export function diasRestantes(dataFim: string): number {
  const fim = new Date(dataFim);
  const hoje = new Date();
  const diff = fim.getTime() - hoje.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// --- DADOS ---
// Concursos são gerenciados via Supabase (painel /admin/concursos).
// Este array serve apenas de fallback local para desenvolvimento sem banco configurado.

export const concursos: Concurso[] = [];
