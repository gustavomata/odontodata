"use client";
import { useState, useMemo } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
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

type ModalType = "faculdades" | "posgrad" | null;

// ── Modal de Lista Completa de Universidades ─────────────────────────
function UniversidadesModal({
  type,
  onClose,
}: {
  type: ModalType;
  onClose: () => void;
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
              {type === "posgrad" ? "Universidades com Pós-Graduação" : "Lista Completa de Universidades"}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {faculdadesFiltradas.length} instituições encontradas
              {mediaMensalidade > 0 && (
                <span className="ml-3 text-amber-400">
                  Mensalidade média (privadas): R$ {mediaMensalidade.toLocaleString("pt-BR")}
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
                placeholder="Buscar por nome, sigla ou UF..."
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
              <option value="Todos">Todos os Tipos</option>
              <option value="Pública Federal">Pública Federal</option>
              <option value="Pública Estadual">Pública Estadual</option>
              <option value="Privada">Privada</option>
              <option value="Comunitária">Comunitária</option>
            </select>
            <select
              value={filtroRegiao}
              onChange={(e) => { setFiltroRegiao(e.target.value); setFiltroUF("Todos"); }}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              {regioes.map((r) => (
                <option key={r} value={r}>{r === "Todos" ? "Todas Regiões" : r}</option>
              ))}
            </select>
            <select
              value={filtroUF}
              onChange={(e) => setFiltroUF(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              {ufs.map((uf) => (
                <option key={uf} value={uf}>{uf === "Todos" ? "Todos UFs" : uf}</option>
              ))}
            </select>
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option value="enade">Ordenar: Nota ENADE</option>
              <option value="mensalidade">Ordenar: Mensalidade</option>
              <option value="vagas">Ordenar: Vagas</option>
              <option value="nome">Ordenar: Nome</option>
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
              />
            ))}
            {faculdadesFiltradas.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                Nenhuma universidade encontrada com os filtros selecionados.
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
}: {
  faculdade: FaculdadeOdontologia;
  expandida: boolean;
  onToggle: () => void;
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
            <span>Vagas: <strong className="text-slate-200">{f.vagas_ano}</strong></span>
            {f.temPosGrad && <span className="text-cyan-400">Pós-Grad</span>}
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
              <p className="text-slate-500 text-xs">Vagas/Ano</p>
              <p className="text-white font-semibold">{f.vagas_ano}</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <p className="text-slate-500 text-xs">Concluintes/Ano</p>
              <p className="text-white font-semibold">{f.concluintes_ano}</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <p className="text-slate-500 text-xs">Evasão</p>
              <p className="text-white font-semibold">{f.taxaEvasao_pct}%</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <p className="text-slate-500 text-xs">Fundação</p>
              <p className="text-white font-semibold">{f.anoCriacao}</p>
            </div>
          </div>

          {f.mensalidade && (
            <div className="mt-3 bg-amber-600/10 border border-amber-600/20 rounded-lg p-3">
              <p className="text-amber-400 text-xs font-medium">Mensalidade Média</p>
              <p className="text-white font-bold text-lg">R$ {f.mensalidade.toLocaleString("pt-BR")}<span className="text-slate-400 text-sm font-normal">/mês</span></p>
              <p className="text-slate-400 text-xs mt-1">Valor anual estimado: R$ {(f.mensalidade * 12).toLocaleString("pt-BR")}</p>
            </div>
          )}

          {f.programasPosGrad && f.programasPosGrad.length > 0 && (
            <div className="mt-3">
              <p className="text-slate-400 text-xs font-medium mb-2">Programas de Pós-Graduação ({f.programasPosGrad.length})</p>
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
              Esta instituição não oferece programas de pós-graduação em Odontologia.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Página Principal ─────────────────────────────────────────────────
export default function UniversidadesPage() {
  const [modalAberto, setModalAberto] = useState<ModalType>(null);

  return (
    <AppShell>
      <PageHeader
        title="Formação & Universidades"
        subtitle="Faculdades, pós-graduação, pesquisa e inserção no mercado de trabalho"
        badge="INEP · e-MEC · CAPES · CNPq · CFO"
      />

      {/* Indicadores principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Faculdades"
          value={indicadoresUniversidades.totalFaculdades}
          subtitle={`${indicadoresUniversidades.faculdadesPublicas} públicas + ${indicadoresUniversidades.faculdadesPrivadas} privadas · Clique para ver lista`}
          icon={GraduationCap}
          color="blue"
          onClick={() => setModalAberto("faculdades")}
        />
        <StatCard
          title="Vagas/Ano"
          value={indicadoresUniversidades.vagasAnuais}
          subtitle="Clique para ver por universidade"
          icon={Users}
          color="green"
          onClick={() => setModalAberto("faculdades")}
        />
        <StatCard
          title="Concluintes/Ano"
          value={indicadoresUniversidades.concluintesAnuais}
          subtitle="Clique para ver por universidade"
          icon={BookOpen}
          color="yellow"
          onClick={() => setModalAberto("faculdades")}
        />
        <StatCard
          title="Ranking Mundial Pesquisa"
          value={`${indicadoresUniversidades.brasilRankingMundial}º lugar`}
          icon={Globe}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Programas Pós-Grad"
          value={indicadoresUniversidades.programasPosGrad}
          subtitle="Clique para ver universidades com pós"
          icon={Award}
          color="cyan"
          onClick={() => setModalAberto("posgrad")}
        />
        <StatCard
          title="Artigos/Ano"
          value={indicadoresUniversidades.artigosPublicados_ano}
          icon={FileText}
          color="blue"
        />
        <StatCard
          title="Cand/Vaga Pública"
          value={indicadoresUniversidades.mediaCandVagaPublica}
          icon={Target}
          color="red"
        />
        <StatCard
          title="Evasão Média"
          value={`${indicadoresUniversidades.taxaEvasaoMedia}%`}
          icon={TrendingDown}
          color="yellow"
        />
      </div>

      {/* Alerta saturação */}
      <div className="bg-amber-600/10 border border-amber-600/30 rounded-xl p-4 mb-8 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-amber-400 font-medium text-sm">Atenção: Saturação do mercado odontológico</p>
          <p className="text-slate-400 text-xs mt-1">
            O Brasil possui mais dentistas per capita do que o recomendado pela OMS, porém com severa desigualdade regional.
            Enquanto capitais do Sudeste apresentam índices de saturação críticos, vastas áreas do Norte e Nordeste permanecem
            desassistidas.
          </p>
        </div>
      </div>

      {/* Evolução faculdades */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
        <h2 className="text-white font-semibold mb-4">Evolução de Faculdades de Odontologia (2005–2024)</h2>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={tendenciaFormacao}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="ano" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
            <Line yAxisId="left" type="monotone" dataKey="faculdadesPublicas" name="Públicas" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
            <Line yAxisId="left" type="monotone" dataKey="faculdadesPrivadas" name="Privadas" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
            <Line yAxisId="right" type="monotone" dataKey="vagasOfertadas" name="Vagas Ofertadas" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Formação por região */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
        <h2 className="text-white font-semibold mb-4">Formação por Região</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={formacaoRegional}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="regiao" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tick={{ fontSize: 12 }} domain={[0, 5]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
            <Bar yAxisId="left" dataKey="faculdadesPublicas" name="Públicas" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="left" dataKey="faculdadesPrivadas" name="Privadas" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="mediaEnade" name="Média ENADE" stroke="#EF4444" strokeWidth={2} dot={{ r: 4 }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Faculdades */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Top Faculdades de Odontologia</h2>
          <button
            onClick={() => setModalAberto("faculdades")}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            Ver todas →
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-slate-800">
              <th className="text-left py-2 px-3">Sigla</th>
              <th className="text-left py-2 px-3">Instituição</th>
              <th className="text-left py-2 px-3">UF</th>
              <th className="text-left py-2 px-3">Tipo</th>
              <th className="text-right py-2 px-3">ENADE</th>
              <th className="text-right py-2 px-3">CPC</th>
              <th className="text-right py-2 px-3">Vagas/Ano</th>
              <th className="text-right py-2 px-3">Concluintes</th>
              <th className="text-right py-2 px-3">Evasão %</th>
              <th className="text-right py-2 px-3">Mensalidade</th>
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
                  {f.mensalidade ? `R$ ${f.mensalidade.toLocaleString("pt-BR")}` : <span className="text-slate-600">Gratuita</span>}
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
            Ver todas as {todasFaculdades.length} universidades →
          </button>
        </div>
      </div>

      {/* Egressos no mercado */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
        <h2 className="text-white font-semibold mb-4">Egressos no Mercado de Trabalho</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={egressosMercado}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="anosAposFormatura" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
            <Bar yAxisId="left" dataKey="empregado_pct" name="Empregado %" stackId="a" fill="#3B82F6" />
            <Bar yAxisId="left" dataKey="autonomo_pct" name="Autônomo %" stackId="a" fill="#10B981" />
            <Bar yAxisId="left" dataKey="desempregado_pct" name="Desempregado %" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="rendaMedia" name="Renda Média (R$)" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4 }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Saturação por UF */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6 overflow-x-auto">
        <h2 className="text-white font-semibold mb-4">Saturação do Mercado por UF</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-slate-800">
              <th className="text-left py-2 px-3">UF</th>
              <th className="text-right py-2 px-3">Concluintes/Ano</th>
              <th className="text-right py-2 px-3">Dentista:Hab</th>
              <th className="text-right py-2 px-3">Absorção %</th>
              <th className="text-left py-2 px-3">Saturação</th>
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
        <h2 className="text-white font-semibold mb-4">Produção Científica por Área</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={producaoCientifica} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis dataKey="area" type="category" stroke="#94a3b8" tick={{ fontSize: 11 }} width={80} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
            <Bar dataKey="artigosNacionais_ano" name="Artigos Nacionais" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="artigosInternacionais_ano" name="Artigos Internacionais" fill="#10B981" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pós-Graduação */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Programas de Pós-Graduação por Área</h2>
          <button
            onClick={() => setModalAberto("posgrad")}
            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
          >
            Ver universidades com pós →
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-slate-800">
              <th className="text-left py-2 px-3">Área</th>
              <th className="text-right py-2 px-3">Mestrado</th>
              <th className="text-right py-2 px-3">Doutorado</th>
              <th className="text-right py-2 px-3">Titulados Mestrado/Ano</th>
              <th className="text-right py-2 px-3">Nota CAPES</th>
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

      {/* Modal */}
      {modalAberto && <UniversidadesModal type={modalAberto} onClose={() => setModalAberto(null)} />}
    </AppShell>
  );
}
