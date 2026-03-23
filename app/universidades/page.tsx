"use client";
import { useState, useMemo } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import CountrySelector from "@/components/CountrySelector";
import {
  universidadesUSA, universidadesDE,
  indicadoresUniversidadesUSA, indicadoresUniversidadesDE,
  formacaoRegionalUSA, formacaoRegionalDE,
  type UniversidadeIntl,
} from "@/lib/data-universidades-intl";
import {
  topFaculdades,
  todasFaculdades,
  formacaoRegional,
  posGraduacao,
  tendenciaFormacao,
  saturacaoMercado,
  producaoCientifica,
  egressosMercado,
  indicadoresUniversidades,
  FaculdadeOdontologia,
} from "@/lib/data-universidades";
import {
  GraduationCap,
  Users,
  BookOpen,
  Globe,
  Award,
  FileText,
  Target,
  TrendingDown,
  AlertTriangle,
  X,
  Search,
  ChevronDown,
  ChevronUp,
  DollarSign,
  MapPin,
  Filter,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

type Lang = "PT" | "EN";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm">
        <p className="text-slate-300 font-medium mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString("pt-BR") : p.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const tipoBadge = (tipo: string) => {
  if (tipo.includes("Federal")) return "bg-blue-600/20 text-blue-400 border-blue-600/30";
  if (tipo.includes("Estadual")) return "bg-emerald-600/20 text-emerald-400 border-emerald-600/30";
  if (tipo === "Privada") return "bg-amber-600/20 text-amber-400 border-amber-600/30";
  return "bg-purple-600/20 text-purple-400 border-purple-600/30";
};

const saturacaoBadge = (nivel: string) => {
  const map: Record<string, string> = {
    "Crítico": "bg-red-600/20 text-red-400 border-red-600/30",
    "Alto": "bg-orange-600/20 text-orange-400 border-orange-600/30",
    "Moderado": "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
    "Baixo": "bg-green-600/20 text-green-400 border-green-600/30",
    "Adequado": "bg-emerald-600/20 text-emerald-400 border-emerald-600/30",
  };
  return map[nivel] || "bg-slate-600/20 text-slate-400 border-slate-600/30";
};

type PaisCode = "BR" | "US" | "DE";
type ModalType = "faculdades" | "posgrad" | null;
type ModalIntlType = "escolas" | null;

// ── Card de Universidade Internacional ───────────────────────────────
function UniversidadeIntlCard({ u, lang }: { u: UniversidadeIntl; lang: Lang }) {
  const [open, setOpen] = useState(false);
  const tipoBadgeIntl = (tipo: string) => {
    if (tipo === "Private") return "bg-amber-600/20 text-amber-400 border-amber-600/30";
    return "bg-blue-600/20 text-blue-400 border-blue-600/30";
  };
  const currency = u.acreditacao === "CODA" ? "$" : "€";
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden hover:border-slate-600/50 transition-colors">
      <button onClick={() => setOpen(!open)} className="w-full text-left p-4 flex items-center gap-4">
        <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs">
          {u.ranking ?? "—"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white font-semibold text-sm">{u.sigla}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${tipoBadgeIntl(u.tipo)}`}>{u.tipo}</span>
            {u.mensalidade_ano > 0 ? (
              <span className="text-xs px-2 py-0.5 rounded-full border bg-amber-600/10 text-amber-400 border-amber-600/30 flex items-center gap-1">
                <DollarSign className="w-3 h-3" />{currency}{u.mensalidade_ano.toLocaleString()}/{lang === "PT" ? "ano" : "yr"}
              </span>
            ) : (
              <span className="text-xs px-2 py-0.5 rounded-full border bg-emerald-600/10 text-emerald-400 border-emerald-600/30">
                {lang === "PT" ? "Gratuita" : "Free"}
              </span>
            )}
          </div>
          <p className="text-slate-300 text-sm mt-1 truncate">{u.instituicao}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{u.cidade}, {u.estado}</span>
            <span>{lang === "PT" ? "Vagas/ano" : "Seats/yr"}: <strong className="text-slate-200">{u.vagas_ano}</strong></span>
            <span>{lang === "PT" ? "Duração" : "Duration"}: <strong className="text-slate-200">{u.duracao_anos} {lang === "PT" ? "anos" : "yrs"}</strong></span>
            {u.temPosGrad && <span className="text-cyan-400">{lang === "PT" ? "Pós-grad" : "Postgrad"}</span>}
            {u.temAdvancedStanding && <span className="text-emerald-400">Adv. Standing</span>}
          </div>
        </div>
        <div className="shrink-0 text-slate-500">
          {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-slate-700/50">
          {u.programasPosGrad && u.programasPosGrad.length > 0 && (
            <div className="mt-3">
              <p className="text-slate-400 text-xs font-medium mb-2">{lang === "PT" ? "Programas de Pós-Graduação" : "Postgraduate Programs"} ({u.programasPosGrad.length})</p>
              <div className="flex flex-wrap gap-1.5">
                {u.programasPosGrad.map((p) => (
                  <span key={p} className="text-xs px-2.5 py-1 rounded-lg bg-cyan-600/15 text-cyan-400 border border-cyan-600/25">{p}</span>
                ))}
              </div>
            </div>
          )}
          {u.pontosFocais.length > 0 && (
            <div className="mt-3">
              <p className="text-slate-400 text-xs font-medium mb-2">{lang === "PT" ? "Focos de Pesquisa" : "Research Focus"}</p>
              <div className="flex flex-wrap gap-1.5">
                {u.pontosFocais.map((p) => (
                  <span key={p} className="text-xs px-2.5 py-1 rounded-lg bg-purple-600/15 text-purple-400 border border-purple-600/25">{p}</span>
                ))}
              </div>
            </div>
          )}
          <p className="text-slate-600 text-xs mt-3">{u.acreditacao} · {u.regiao}</p>
        </div>
      )}
    </div>
  );
}

// ── Modal de Lista Completa de Universidades Internacionais ──────────
function UniversidadesIntlModal({
  universidades,
  onClose,
  lang,
  pais,
}: {
  universidades: UniversidadeIntl[];
  onClose: () => void;
  lang: Lang;
  pais: PaisCode;
}) {
  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("All");
  const [filtroRegiao, setFiltroRegiao] = useState("All");
  const [filtroEstado, setFiltroEstado] = useState("All");
  const [apenasAEGD, setApenasAEGD] = useState(false);
  const [apenasAdvStanding, setApenasAdvStanding] = useState(false);

  const currency = pais === "US" ? "$" : "€";
  const regioes = useMemo(() => ["All", ...Array.from(new Set(universidades.map((u) => u.regiao))).sort()], [universidades]);
  const tipos = useMemo(() => ["All", ...Array.from(new Set(universidades.map((u) => u.tipo))).sort()], [universidades]);
  const estados = useMemo(() => ["All", ...Array.from(new Set(universidades.map((u) => u.estado))).sort()], [universidades]);

  const filtradas = useMemo(() => {
    let lista = [...universidades];
    if (busca) {
      const q = busca.toLowerCase();
      lista = lista.filter((u) => u.instituicao.toLowerCase().includes(q) || u.sigla.toLowerCase().includes(q) || u.cidade.toLowerCase().includes(q) || u.estado.toLowerCase().includes(q));
    }
    if (filtroTipo !== "All") lista = lista.filter((u) => u.tipo === filtroTipo);
    if (filtroRegiao !== "All") lista = lista.filter((u) => u.regiao === filtroRegiao);
    if (filtroEstado !== "All") lista = lista.filter((u) => u.estado === filtroEstado);
    if (apenasAEGD) lista = lista.filter((u) => u.programasPosGrad?.includes("AEGD"));
    if (apenasAdvStanding) lista = lista.filter((u) => u.temAdvancedStanding);
    return lista.sort((a, b) => (a.ranking ?? 99) - (b.ranking ?? 99));
  }, [universidades, busca, filtroTipo, filtroRegiao, filtroEstado, apenasAEGD, apenasAdvStanding]);

  const totalAEGD = universidades.filter((u) => u.programasPosGrad?.includes("AEGD")).length;
  const totalAdvStanding = universidades.filter((u) => u.temAdvancedStanding).length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto p-4 pt-8 md:pt-16">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-6xl max-h-[85vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-800 shrink-0">
          <div>
            <h2 className="text-white font-bold text-lg md:text-xl">
              {lang === "PT" ? "Lista Completa de Universidades" : "Complete University List"}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {filtradas.length} {lang === "PT" ? "universidades encontradas" : "universities found"}
              {apenasAEGD && <span className="ml-2 text-cyan-400">· AEGD</span>}
              {apenasAdvStanding && <span className="ml-2 text-emerald-400">· Advanced Standing</span>}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filtros */}
        <div className="p-4 md:px-6 border-b border-slate-800 shrink-0">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder={lang === "PT" ? "Buscar por nome, sigla, cidade ou estado..." : "Search by name, code, city or state..."}
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
              {tipos.map((t) => <option key={t} value={t}>{t === "All" ? (lang === "PT" ? "Todos tipos" : "All types") : t}</option>)}
            </select>
            <select value={filtroRegiao} onChange={(e) => { setFiltroRegiao(e.target.value); setFiltroEstado("All"); }} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
              {regioes.map((r) => <option key={r} value={r}>{r === "All" ? (lang === "PT" ? "Todas regiões" : "All regions") : r}</option>)}
            </select>
            <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
              {estados.map((e) => <option key={e} value={e}>{e === "All" ? (lang === "PT" ? "Todos estados" : "All states") : e}</option>)}
            </select>
            {pais === "US" && (<>
              <button
                onClick={() => setApenasAEGD(!apenasAEGD)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  apenasAEGD
                    ? "bg-cyan-600/20 text-cyan-400 border-cyan-600/40"
                    : "bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600"
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                AEGD ({totalAEGD})
              </button>
              <button
                onClick={() => setApenasAdvStanding(!apenasAdvStanding)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  apenasAdvStanding
                    ? "bg-emerald-600/20 text-emerald-400 border-emerald-600/40"
                    : "bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600"
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                Adv. Standing ({totalAdvStanding})
              </button>
            </>)}
          </div>
        </div>

        {/* Lista */}
        <div className="overflow-y-auto flex-1 p-4 md:px-6">
          <div className="space-y-2">
            {filtradas.map((u) => (
              <UniversidadeIntlCard key={u.sigla} u={u} lang={lang} />
            ))}
            {filtradas.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                {lang === "PT" ? "Nenhuma universidade encontrada." : "No universities found."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Modal de Lista Completa de Universidades ─────────────────────────
function UniversidadesModal({
  type,
  onClose,
  lang,
}: {
  type: ModalType;
  onClose: () => void;
  lang: Lang;
}) {
  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<string>("Todos");
  const [filtroUF, setFiltroUF] = useState<string>("Todos");
  const [filtroRegiao, setFiltroRegiao] = useState<string>("Todos");
  const [expandida, setExpandida] = useState<string | null>(null);
  const [ordenacao, setOrdenacao] = useState<"enade" | "mensalidade" | "vagas" | "nome">("enade");

  const ufs = useMemo(() => ["Todos", ...Array.from(new Set(todasFaculdades.map((f) => f.uf))).sort()], []);
  const regioes = useMemo(() => ["Todos", ...Array.from(new Set(todasFaculdades.map((f) => f.regiao))).sort()], []);

  const faculdadesFiltradas = useMemo(() => {
    let lista = [...todasFaculdades];

    if (type === "posgrad") {
      lista = lista.filter((f) => f.temPosGrad && f.programasPosGrad && f.programasPosGrad.length > 0);
    }

    if (busca) {
      const term = busca.toLowerCase();
      lista = lista.filter(
        (f) =>
          f.instituicao.toLowerCase().includes(term) ||
          f.sigla.toLowerCase().includes(term) ||
          f.uf.toLowerCase().includes(term)
      );
    }

    if (filtroTipo !== "Todos") {
      lista = lista.filter((f) => f.tipo === filtroTipo);
    }
    if (filtroUF !== "Todos") {
      lista = lista.filter((f) => f.uf === filtroUF);
    }
    if (filtroRegiao !== "Todos") {
      lista = lista.filter((f) => f.regiao === filtroRegiao);
    }

    lista.sort((a, b) => {
      switch (ordenacao) {
        case "enade":
          return b.notaEnade - a.notaEnade;
        case "mensalidade":
          return (a.mensalidade || 0) - (b.mensalidade || 0);
        case "vagas":
          return b.vagas_ano - a.vagas_ano;
        case "nome":
          return a.instituicao.localeCompare(b.instituicao);
        default:
          return 0;
      }
    });

    return lista;
  }, [busca, filtroTipo, filtroUF, filtroRegiao, ordenacao, type]);

  const privadas = faculdadesFiltradas.filter((f) => f.tipo === "Privada" || f.tipo === "Comunitária");
  const mediaMensalidade =
    privadas.length > 0
      ? Math.round(privadas.reduce((acc, f) => acc + (f.mensalidade || 0), 0) / privadas.filter((f) => f.mensalidade).length)
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto p-4 pt-8 md:pt-16">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-6xl max-h-[85vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-800 shrink-0">
          <div>
            <h2 className="text-white font-bold text-lg md:text-xl">
              {type === "posgrad" ? t("univ_com_posgrad", lang) : t("univ_lista_completa", lang)}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {faculdadesFiltradas.length} {t("univ_inst_encontradas", lang)}
              {mediaMensalidade > 0 && (
                <span className="ml-3 text-amber-400">
                  {t("univ_mens_media", lang)} {mediaMensalidade.toLocaleString("pt-BR")}
                </span>
              )}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filtros */}
        <div className="p-4 md:px-6 border-b border-slate-800 shrink-0">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder={t("univ_buscar", lang)}
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option value="Todos">{t("univ_tipos_todos", lang)}</option>
              <option value="Pública Federal">{t("univ_publ_federal", lang)}</option>
              <option value="Pública Estadual">{t("univ_publ_estadual", lang)}</option>
              <option value="Privada">{t("univ_privada", lang)}</option>
              <option value="Comunitária">{t("univ_comunitaria", lang)}</option>
            </select>
            <select
              value={filtroRegiao}
              onChange={(e) => { setFiltroRegiao(e.target.value); setFiltroUF("Todos"); }}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              {regioes.map((r) => (
                <option key={r} value={r}>{r === "Todos" ? t("univ_todas_regioes", lang) : r}</option>
              ))}
            </select>
            <select
              value={filtroUF}
              onChange={(e) => setFiltroUF(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              {ufs.map((uf) => (
                <option key={uf} value={uf}>{uf === "Todos" ? t("univ_todos_ufs", lang) : uf}</option>
              ))}
            </select>
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option value="enade">{t("univ_ord_enade", lang)}</option>
              <option value="mensalidade">{t("univ_ord_mens", lang)}</option>
              <option value="vagas">{t("univ_ord_vagas", lang)}</option>
              <option value="nome">{t("univ_ord_nome", lang)}</option>
            </select>
          </div>
        </div>

        {/* Lista */}
        <div className="overflow-y-auto flex-1 p-4 md:px-6">
          <div className="space-y-2">
            {faculdadesFiltradas.map((f) => (
              <UniversidadeCard
                key={f.sigla + f.uf}
                faculdade={f}
                expandida={expandida === f.sigla + f.uf}
                onToggle={() => setExpandida(expandida === f.sigla + f.uf ? null : f.sigla + f.uf)}
                lang={lang}
              />
            ))}
            {faculdadesFiltradas.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                {t("univ_nenhuma", lang)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Card Expansível de Universidade ──────────────────────────────────
function UniversidadeCard({
  faculdade: f,
  expandida,
  onToggle,
  lang,
}: {
  faculdade: FaculdadeOdontologia;
  expandida: boolean;
  onToggle: () => void;
  lang: Lang;
}) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden hover:border-slate-600/50 transition-colors">
      <button onClick={onToggle} className="w-full text-left p-4 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white font-semibold text-sm">{f.sigla}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${tipoBadge(f.tipo)}`}>{f.tipo}</span>
            {f.mensalidade && (
              <span className="text-xs px-2 py-0.5 rounded-full border bg-amber-600/10 text-amber-400 border-amber-600/30 flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                R$ {f.mensalidade.toLocaleString("pt-BR")}/mês
              </span>
            )}
          </div>
          <p className="text-slate-300 text-sm mt-1 truncate">{f.instituicao}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{f.uf} - {f.regiao}</span>
            <span>ENADE: <strong className="text-slate-200">{f.notaEnade}</strong></span>
            <span>CPC: <strong className="text-slate-200">{f.cpc}</strong></span>
            <span>{t("univ_vagas_ano", lang)}: <strong className="text-slate-200">{f.vagas_ano}</strong></span>
            {f.temPosGrad && <span className="text-cyan-400">{t("univ_posgrad", lang)}</span>}
          </div>
        </div>
        <div className="shrink-0 text-slate-500">
          {expandida ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {expandida && (
        <div className="px-4 pb-4 border-t border-slate-700/50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
            <div className="bg-slate-900/50 rounded-lg p-3">
              <p className="text-slate-500 text-xs">{t("univ_vagas_ano_card", lang)}</p>
              <p className="text-white font-semibold">{f.vagas_ano}</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <p className="text-slate-500 text-xs">{t("univ_concluintes_card", lang)}</p>
              <p className="text-white font-semibold">{f.concluintes_ano}</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <p className="text-slate-500 text-xs">{t("univ_evasao_card", lang)}</p>
              <p className="text-white font-semibold">{f.taxaEvasao_pct}%</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <p className="text-slate-500 text-xs">{t("univ_fundacao", lang)}</p>
              <p className="text-white font-semibold">{f.anoCriacao}</p>
            </div>
          </div>

          {f.mensalidade && (
            <div className="mt-3 bg-amber-600/10 border border-amber-600/20 rounded-lg p-3">
              <p className="text-amber-400 text-xs font-medium">{t("univ_mens_media_card", lang)}</p>
              <p className="text-white font-bold text-lg">R$ {f.mensalidade.toLocaleString("pt-BR")}<span className="text-slate-400 text-sm font-normal">/mês</span></p>
              <p className="text-slate-400 text-xs mt-1">{t("univ_val_anual", lang)} R$ {(f.mensalidade * 12).toLocaleString("pt-BR")}</p>
            </div>
          )}

          {f.programasPosGrad && f.programasPosGrad.length > 0 && (
            <div className="mt-3">
              <p className="text-slate-400 text-xs font-medium mb-2">{t("univ_prog_posgrad", lang)} ({f.programasPosGrad.length})</p>
              <div className="flex flex-wrap gap-1.5">
                {f.programasPosGrad.map((prog) => (
                  <span key={prog} className="text-xs px-2.5 py-1 rounded-lg bg-cyan-600/15 text-cyan-400 border border-cyan-600/25">
                    {prog}
                  </span>
                ))}
              </div>
            </div>
          )}

          {!f.temPosGrad && (
            <div className="mt-3 text-slate-500 text-xs italic">
              {t("univ_sem_posgrad", lang)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Página Principal ─────────────────────────────────────────────────
export default function UniversidadesPage() {
  const { lang } = useLanguage();
  const [modalAberto, setModalAberto] = useState<ModalType>(null);
  const [modalIntl, setModalIntl] = useState<ModalIntlType>(null);
  const [pais, setPais] = useState<PaisCode>("BR");
  const [busca, setBusca] = useState("");
  const [filtroTipoIntl, setFiltroTipoIntl] = useState("All");
  const [filtroRegiaoIntl, setFiltroRegiaoIntl] = useState("All");

  const univIntl = pais === "US" ? universidadesUSA : universidadesDE;
  const indicadoresIntl = pais === "US" ? indicadoresUniversidadesUSA : indicadoresUniversidadesDE;
  const formacaoIntl = pais === "US" ? formacaoRegionalUSA : formacaoRegionalDE;
  const currency = pais === "US" ? "$" : "€";

  const univFiltradas = useMemo(() => {
    let lista = [...univIntl];
    if (busca) {
      const q = busca.toLowerCase();
      lista = lista.filter(u => u.instituicao.toLowerCase().includes(q) || u.sigla.toLowerCase().includes(q) || u.cidade.toLowerCase().includes(q));
    }
    if (filtroTipoIntl !== "All") lista = lista.filter(u => u.tipo === filtroTipoIntl);
    if (filtroRegiaoIntl !== "All") lista = lista.filter(u => u.regiao === filtroRegiaoIntl);
    return lista.sort((a, b) => (a.ranking ?? 99) - (b.ranking ?? 99));
  }, [univIntl, busca, filtroTipoIntl, filtroRegiaoIntl]);

  const regioesList = useMemo(() => ["All", ...Array.from(new Set(univIntl.map(u => u.regiao))).sort()], [univIntl]);
  const tiposList = useMemo(() => ["All", ...Array.from(new Set(univIntl.map(u => u.tipo))).sort()], [univIntl]);

  return (
    <AppShell>
      <PageHeader
        title={t("univ_title", lang)}
        subtitle={t("univ_subtitle", lang)}
        badge={pais === "BR" ? t("univ_badge", lang) : pais === "US" ? "ADEA / CODA 2024" : "BZÄK / Hochschulkompass 2023"}
      />

      <CountrySelector value={pais} onChange={(c) => { setPais(c as PaisCode); setBusca(""); setFiltroTipoIntl("All"); setFiltroRegiaoIntl("All"); }} countries={["BR", "US", "DE"]} />

      {/* ══ BRAZIL ══════════════════════════════════════════════════════ */}
      {pais === "BR" && (<>

      {/* Indicadores principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title={t("univ_faculdades", lang)}
          value={indicadoresUniversidades.totalFaculdades}
          subtitle={`${indicadoresUniversidades.faculdadesPublicas} públicas + ${indicadoresUniversidades.faculdadesPrivadas} privadas · ${t("univ_clique_lista", lang)}`}
          icon={GraduationCap}
          color="blue"
          onClick={() => setModalAberto("faculdades")}
        />
        <StatCard
          title={t("univ_vagas_ano", lang)}
          value={indicadoresUniversidades.vagasAnuais}
          subtitle={t("univ_clique_uni", lang)}
          icon={Users}
          color="green"
          onClick={() => setModalAberto("faculdades")}
        />
        <StatCard
          title={t("univ_concluintes", lang)}
          value={indicadoresUniversidades.concluintesAnuais}
          subtitle={t("univ_clique_uni", lang)}
          icon={BookOpen}
          color="yellow"
          onClick={() => setModalAberto("faculdades")}
        />
        <StatCard
          title={t("univ_ranking", lang)}
          value={`${indicadoresUniversidades.brasilRankingMundial}${t("univ_lugar", lang)}`}
          icon={Globe}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title={t("univ_posgrad", lang)}
          value={indicadoresUniversidades.programasPosGrad}
          subtitle={t("univ_clique_pos", lang)}
          icon={Award}
          color="cyan"
          onClick={() => setModalAberto("posgrad")}
        />
        <StatCard
          title={t("univ_artigos", lang)}
          value={indicadoresUniversidades.artigosPublicados_ano}
          icon={FileText}
          color="blue"
        />
        <StatCard
          title={t("univ_cand_vaga", lang)}
          value={indicadoresUniversidades.mediaCandVagaPublica}
          icon={Target}
          color="red"
        />
        <StatCard
          title={t("univ_evasao", lang)}
          value={`${indicadoresUniversidades.taxaEvasaoMedia}%`}
          icon={TrendingDown}
          color="yellow"
        />
      </div>

      {/* Alerta saturação */}
      <div className="bg-amber-600/10 border border-amber-600/30 rounded-xl p-4 mb-8 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-amber-400 font-medium text-sm">{t("univ_alerta", lang)}</p>
          <p className="text-slate-400 text-xs mt-1">
            O Brasil possui mais dentistas per capita do que o recomendado pela OMS, porém com severa desigualdade regional.
            Enquanto capitais do Sudeste apresentam índices de saturação críticos, vastas áreas do Norte e Nordeste permanecem
            desassistidas.
          </p>
        </div>
      </div>

      {/* Evolução faculdades */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
        <h2 className="text-white font-semibold mb-4">{t("univ_evolucao", lang)}</h2>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={tendenciaFormacao}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="ano" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
            <Line yAxisId="left" type="monotone" dataKey="faculdadesPublicas" name={t("univ_publicas", lang)} stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
            <Line yAxisId="left" type="monotone" dataKey="faculdadesPrivadas" name={t("univ_privadas", lang)} stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
            <Line yAxisId="right" type="monotone" dataKey="vagasOfertadas" name={t("univ_vagas_ofertadas", lang)} stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Formação por região */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
        <h2 className="text-white font-semibold mb-4">{t("univ_formacao_reg", lang)}</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={formacaoRegional}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="regiao" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tick={{ fontSize: 12 }} domain={[0, 5]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
            <Bar yAxisId="left" dataKey="faculdadesPublicas" name={t("univ_publicas", lang)} fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="left" dataKey="faculdadesPrivadas" name={t("univ_privadas", lang)} fill="#F59E0B" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="mediaEnade" name={t("univ_media_enade", lang)} stroke="#EF4444" strokeWidth={2} dot={{ r: 4 }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Faculdades */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">{t("univ_top_fac", lang)}</h2>
          <button
            onClick={() => setModalAberto("faculdades")}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            {t("univ_ver_todas", lang)}
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-slate-800">
              <th className="text-left py-2 px-3">{t("col_sigla", lang)}</th>
              <th className="text-left py-2 px-3">{t("col_instituicao", lang)}</th>
              <th className="text-left py-2 px-3">{t("col_uf", lang)}</th>
              <th className="text-left py-2 px-3">{t("col_tipo", lang)}</th>
              <th className="text-right py-2 px-3">{t("col_enade", lang)}</th>
              <th className="text-right py-2 px-3">{t("col_cpc", lang)}</th>
              <th className="text-right py-2 px-3">{t("col_vagas_ano", lang)}</th>
              <th className="text-right py-2 px-3">{t("col_concluintes_ano", lang)}</th>
              <th className="text-right py-2 px-3">{t("col_evasao_pct", lang)}</th>
              <th className="text-right py-2 px-3">{t("col_mensalidade", lang)}</th>
            </tr>
          </thead>
          <tbody>
            {topFaculdades
              .sort((a, b) => b.notaEnade - a.notaEnade)
              .slice(0, 20)
              .map((f) => (
              <tr key={f.sigla + f.uf} className="border-b border-slate-800/50 hover:bg-slate-800/30 cursor-pointer" onClick={() => setModalAberto("faculdades")}>
                <td className="py-2 px-3 text-white font-medium">{f.sigla}</td>
                <td className="py-2 px-3 text-slate-300">{f.instituicao}</td>
                <td className="py-2 px-3 text-slate-400">{f.uf}</td>
                <td className="py-2 px-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${tipoBadge(f.tipo)}`}>{f.tipo}</span>
                </td>
                <td className="py-2 px-3 text-right text-slate-300">{f.notaEnade}</td>
                <td className="py-2 px-3 text-right text-slate-300">{f.cpc}</td>
                <td className="py-2 px-3 text-right text-slate-300">{f.vagas_ano}</td>
                <td className="py-2 px-3 text-right text-slate-300">{f.concluintes_ano}</td>
                <td className="py-2 px-3 text-right text-slate-300">{f.taxaEvasao_pct}%</td>
                <td className="py-2 px-3 text-right text-slate-300">
                  {f.mensalidade ? `R$ ${f.mensalidade.toLocaleString("pt-BR")}` : <span className="text-slate-600">{t("univ_gratuita", lang)}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 text-center">
          <button
            onClick={() => setModalAberto("faculdades")}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            {t("univ_ver_todas_btn", lang)} {todasFaculdades.length} {t("univ_universidades", lang)}
          </button>
        </div>
      </div>

      {/* Egressos no mercado */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
        <h2 className="text-white font-semibold mb-4">{t("univ_egressos", lang)}</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={egressosMercado}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="anosAposFormatura" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
            <Bar yAxisId="left" dataKey="empregado_pct" name={t("univ_empregado", lang)} stackId="a" fill="#3B82F6" />
            <Bar yAxisId="left" dataKey="autonomo_pct" name={t("univ_autonomo", lang)} stackId="a" fill="#10B981" />
            <Bar yAxisId="left" dataKey="desempregado_pct" name={t("univ_desempregado", lang)} stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="rendaMedia" name={t("univ_renda_media", lang)} stroke="#F59E0B" strokeWidth={2} dot={{ r: 4 }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Saturação por UF */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6 overflow-x-auto">
        <h2 className="text-white font-semibold mb-4">{t("univ_saturacao_uf", lang)}</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-slate-800">
              <th className="text-left py-2 px-3">{t("col_uf", lang)}</th>
              <th className="text-right py-2 px-3">{t("col_concluintes_ano", lang)}</th>
              <th className="text-right py-2 px-3">{t("col_dentista_hab", lang)}</th>
              <th className="text-right py-2 px-3">{t("col_absorcao_pct", lang)}</th>
              <th className="text-left py-2 px-3">{t("col_saturacao", lang)}</th>
            </tr>
          </thead>
          <tbody>
            {saturacaoMercado.map((s) => (
              <tr key={s.uf} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                <td className="py-2 px-3 text-white font-medium">{s.uf}</td>
                <td className="py-2 px-3 text-right text-slate-300">{s.concluintesAnuais.toLocaleString("pt-BR")}</td>
                <td className="py-2 px-3 text-right text-slate-300">1:{s.ratioDentistaHab}</td>
                <td className="py-2 px-3 text-right text-slate-300">{s.indiceAbsorcao_pct}%</td>
                <td className="py-2 px-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${saturacaoBadge(s.indiceSaturacao)}`}>
                    {s.indiceSaturacao}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Produção Científica */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
        <h2 className="text-white font-semibold mb-4">{t("univ_prod_cient", lang)}</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={producaoCientifica} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis dataKey="area" type="category" stroke="#94a3b8" tick={{ fontSize: 11 }} width={80} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
            <Bar dataKey="artigosNacionais_ano" name={t("univ_artigos_nac", lang)} fill="#3B82F6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="artigosInternacionais_ano" name={t("univ_artigos_int", lang)} fill="#10B981" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pós-Graduação */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">{t("univ_pos_grad", lang)}</h2>
          <button
            onClick={() => setModalAberto("posgrad")}
            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
          >
            {t("univ_ver_pos", lang)}
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-slate-800">
              <th className="text-left py-2 px-3">{t("col_area", lang)}</th>
              <th className="text-right py-2 px-3">{t("col_mestrado", lang)}</th>
              <th className="text-right py-2 px-3">{t("col_doutorado", lang)}</th>
              <th className="text-right py-2 px-3">{t("col_tit_mestrado", lang)}</th>
              <th className="text-right py-2 px-3">{t("col_nota_capes", lang)}</th>
            </tr>
          </thead>
          <tbody>
            {posGraduacao.map((p) => (
              <tr key={p.area} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                <td className="py-2 px-3 text-white font-medium">{p.area}</td>
                <td className="py-2 px-3 text-right text-slate-300">{p.programasMestrado}</td>
                <td className="py-2 px-3 text-right text-slate-300">{p.programasDoutorado}</td>
                <td className="py-2 px-3 text-right text-slate-300">{p.tituladosMestrado_ano}</td>
                <td className="py-2 px-3 text-right text-slate-300">{p.notaMediaCAPES}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal BR */}
      {modalAberto && <UniversidadesModal type={modalAberto} onClose={() => setModalAberto(null)} lang={lang} />}

      </>)} {/* end BR */}

      {/* ══ USA / GERMANY ═══════════════════════════════════════════════ */}
      {pais !== "BR" && (<>

        {/* Key indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title={lang === "PT" ? "Escolas de Odontologia" : "Dental Schools"} value={indicadoresIntl.totalEscolas} icon={GraduationCap} color="blue" subtitle={`${indicadoresIntl.escolasPublicas} ${lang === "PT" ? "públicas" : "public"} · ${indicadoresIntl.escolasPrivadas} ${lang === "PT" ? "privadas" : "private"} · ${lang === "PT" ? "Clique para ver lista" : "Click to see list"}`} onClick={() => setModalIntl("escolas")} />
          <StatCard title={lang === "PT" ? "Vagas por Ano" : "Seats per Year"} value={indicadoresIntl.totalVagasAno.toLocaleString()} icon={Users} color="green" subtitle={lang === "PT" ? "primeiros anos" : "first-year students"} />
          <StatCard title={lang === "PT" ? "Mensalidade Pública" : "Public Tuition"} value={`${currency}${indicadoresIntl.mensalidadeMediaPublica.toLocaleString()}`} icon={DollarSign} color={pais === "DE" ? "green" : "yellow"} subtitle={lang === "PT" ? "média anual" : "avg per year"} />
          <StatCard title={lang === "PT" ? "Mensalidade Privada" : "Private Tuition"} value={indicadoresIntl.mensalidadeMediaPrivada > 0 ? `${currency}${indicadoresIntl.mensalidadeMediaPrivada.toLocaleString()}` : lang === "PT" ? "N/A" : "N/A"} icon={DollarSign} color="red" subtitle={lang === "PT" ? "média anual" : "avg per year"} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-xs mb-1">{lang === "PT" ? "Duração do Curso" : "Program Duration"}</p>
            <p className="text-white font-bold text-xl">{indicadoresIntl.duracaoMedia} {lang === "PT" ? "anos" : "years"}</p>
            <p className="text-slate-500 text-xs mt-1">{pais === "US" ? (lang === "PT" ? "após bacharelado (DDS/DMD)" : "after bachelor's degree (DDS/DMD)") : (lang === "PT" ? "Staatsexamen (diretamente)" : "Staatsexamen (direct entry)")}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-xs mb-1">{lang === "PT" ? "Acreditadora" : "Accreditor"}</p>
            <p className="text-blue-400 font-bold text-sm">{indicadoresIntl.acreditadora.split(" (")[0]}</p>
            <p className="text-slate-500 text-xs mt-1">{indicadoresIntl.acreditadora.match(/\(([^)]+)\)/)?.[1] ?? ""}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-xs mb-1">{lang === "PT" ? "Fonte dos Dados" : "Data Source"}</p>
            <p className="text-slate-200 font-medium text-sm">{indicadoresIntl.fonteAnno}</p>
          </div>
        </div>

        {/* Regional distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
          <h2 className="text-white font-semibold mb-1">{lang === "PT" ? "Distribuição Regional" : "Regional Distribution"}</h2>
          <p className="text-slate-500 text-xs mb-4">{lang === "PT" ? "Escolas e vagas por região" : "Schools and seats by region"}</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={formacaoIntl}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="regiao" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${currency}${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
              <Bar yAxisId="left" dataKey="escolas" name={lang === "PT" ? "Escolas" : "Schools"} fill="#3b82f6" radius={[4,4,0,0]} />
              <Bar yAxisId="left" dataKey="vagas" name={lang === "PT" ? "Vagas/ano" : "Seats/yr"} fill="#10b981" radius={[4,4,0,0]} />
              <Line yAxisId="right" type="monotone" dataKey="mensalidade_media" name={lang === "PT" ? `Mensalidade média (${currency})` : `Avg tuition (${currency})`} stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* University list */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-white font-semibold">{lang === "PT" ? "Lista de Universidades" : "University List"}</h2>
              <p className="text-slate-500 text-xs mt-0.5">{univFiltradas.length} {lang === "PT" ? "universidades encontradas" : "universities found"}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder={lang === "PT" ? "Buscar..." : "Search..."} value={busca} onChange={e => setBusca(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-40" />
              </div>
              <select value={filtroTipoIntl} onChange={e => setFiltroTipoIntl(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500">
                {tiposList.map(t => <option key={t} value={t}>{t === "All" ? (lang === "PT" ? "Todos tipos" : "All types") : t}</option>)}
              </select>
              <select value={filtroRegiaoIntl} onChange={e => setFiltroRegiaoIntl(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500">
                {regioesList.map(r => <option key={r} value={r}>{r === "All" ? (lang === "PT" ? "Todas regiões" : "All regions") : r}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {univFiltradas.map(u => <UniversidadeIntlCard key={u.sigla} u={u} lang={lang} />)}
            {univFiltradas.length === 0 && <p className="text-slate-500 text-sm text-center py-8">{lang === "PT" ? "Nenhuma universidade encontrada." : "No universities found."}</p>}
          </div>
        </div>

        {/* Modal Intl */}
        {modalIntl && <UniversidadesIntlModal universidades={univIntl} onClose={() => setModalIntl(null)} lang={lang} pais={pais} />}

      </>)} {/* end US/DE */}
    </AppShell>
  );
}
