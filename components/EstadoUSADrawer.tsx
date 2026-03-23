"use client";
import { useEffect, useState, useCallback } from "react";
import {
  X, MapPin, TrendingUp, Users, DollarSign, AlertTriangle,
  Building2, Star, ChevronUp, ChevronDown,
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

interface CidadeUSA {
  nome: string;
  uf: string;
  tipo: "Metro" | "Suburban" | "Secondary" | "Rural" | "College Town";
  populacao: number;
  dentistas_por_100k: number;
  mediana_renda: number;
  hpsa: boolean;
  penetracao_dso: number;
  crescimento_pop_pct: number;
  especialidade_mais_carente: string;
  score_oportunidade: number;
  nota: string;
}

interface EstadoDetail {
  uf: string;
  nomeEstado: string;
  source: "live" | "static";
  estado: Record<string, unknown>;
  dimensoes: {
    workforce: number;
    insurance: number;
    economic: number;
    growth: number;
    business: number;
    dso: number;
  };
  cidades: CidadeUSA[];
  totalCidades: number;
  hspaCidades: number;
  topOportunidade: CidadeUSA | null;
}

interface Props {
  uf: string | null;
  onClose: () => void;
}

const TIPO_COLOR: Record<string, string> = {
  Metro: "#ef4444",
  Suburban: "#f97316",
  Secondary: "#eab308",
  Rural: "#22c55e",
  "College Town": "#3b82f6",
};

const SCORE_COLOR = (s: number) =>
  s >= 70 ? "#22c55e" : s >= 55 ? "#eab308" : "#ef4444";

function fmt(n: number) {
  return n >= 1000000
    ? `${(n / 1000000).toFixed(1)}M`
    : n >= 1000
    ? `${(n / 1000).toFixed(0)}k`
    : String(n);
}

type SortKey = keyof CidadeUSA;

export default function EstadoUSADrawer({ uf, onClose }: Props) {
  const { lang } = useLanguage();
  const [data, setData] = useState<EstadoDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"overview" | "cidades" | "financeiro">(
    "overview"
  );
  const [sortKey, setSortKey] = useState<SortKey>("score_oportunidade");
  const [sortAsc, setSortAsc] = useState(false);
  const [tipoFilter, setTipoFilter] = useState<string>("all");

  const fetchData = useCallback(async (stateUF: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/onde-abrir/estado/${stateUF}`);
      if (res.ok) setData(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (uf) {
      setData(null);
      setTab("overview");
      fetchData(uf);
    }
  }, [uf, fetchData]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!uf) return null;

  const radarData = data
    ? [
        { dim: lang === "PT" ? "Escassez" : "Shortage", val: data.dimensoes.workforce },
        { dim: lang === "PT" ? "Seguro" : "Insurance", val: data.dimensoes.insurance },
        { dim: lang === "PT" ? "Econômico" : "Economic", val: data.dimensoes.economic },
        { dim: lang === "PT" ? "Crescimento" : "Growth", val: data.dimensoes.growth },
        { dim: lang === "PT" ? "Negócio" : "Business", val: data.dimensoes.business },
        { dim: "DSO", val: data.dimensoes.dso },
      ]
    : [];

  const sortedCidades = data
    ? [...data.cidades]
        .filter((c) => tipoFilter === "all" || c.tipo === tipoFilter)
        .sort((a, b) => {
          const av = a[sortKey] as number | string;
          const bv = b[sortKey] as number | string;
          const cmp = av < bv ? -1 : av > bv ? 1 : 0;
          return sortAsc ? cmp : -cmp;
        })
    : [];

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  };

  const Th = ({
    label,
    k,
  }: {
    label: string;
    k: SortKey;
  }) => (
    <th
      onClick={() => toggleSort(k)}
      className="px-3 py-2 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer select-none hover:text-white whitespace-nowrap"
    >
      <span className="flex items-center gap-1">
        {label}
        {sortKey === k ? (
          sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
        ) : null}
      </span>
    </th>
  );

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="fixed top-0 right-0 bottom-0 w-full max-w-6xl bg-slate-900 border-l border-slate-700 z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-blue-400" />
            <div>
              <h2 className="text-white font-bold text-lg">
                {data ? data.nomeEstado : uf}
              </h2>
              {data && (
                <p className="text-slate-400 text-xs">
                  {data.totalCidades} {lang === "PT" ? "áreas analisadas" : "areas analyzed"} ·{" "}
                  {data.hspaCidades} HPSA ·{" "}
                  <span className={data.source === "live" ? "text-green-400" : "text-yellow-400"}>
                    {data.source === "live" ? "● live" : "● static"}
                  </span>
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-3 border-b border-slate-800 shrink-0">
          {(["overview", "cidades", "financeiro"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm rounded-t-lg font-medium transition-colors ${
                tab === t
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t === "overview"
                ? lang === "PT" ? "Visão Geral" : "Overview"
                : t === "cidades"
                ? lang === "PT" ? "Melhores Áreas" : "Best Areas"
                : lang === "PT" ? "Financeiro" : "Financial"}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && data && tab === "overview" && (
            <div className="space-y-6">
              {/* Score card */}
              <div className="bg-slate-800 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">
                    {lang === "PT" ? "Score de Oportunidade" : "Opportunity Score"}
                  </p>
                  <p
                    className="text-4xl font-bold"
                    style={{ color: SCORE_COLOR(Number(data.estado["score_oportunidade"]) || 50) }}
                  >
                    {Number(data.estado["score_oportunidade"] ?? 50).toFixed(0)}
                  </p>
                  <p className="text-slate-400 text-xs mt-1">
                    {String(data.estado["classificacao"] ?? "")}
                  </p>
                </div>
                {data.topOportunidade && (
                  <div className="text-right">
                    <p className="text-slate-400 text-xs mb-1">
                      {lang === "PT" ? "Melhor área" : "Best area"}
                    </p>
                    <p className="text-white font-semibold">{data.topOportunidade.nome}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span className="text-yellow-400 text-sm font-bold">
                        {data.topOportunidade.score_oportunidade}
                      </span>
                      {data.topOportunidade.hpsa && (
                        <span className="ml-1 px-1.5 py-0.5 bg-red-900/50 text-red-300 text-xs rounded">
                          HPSA
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* KPI grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  {
                    label: lang === "PT" ? "Dentistas/100k" : "Dentists/100k",
                    val: Number(data.estado["dentistas_por_100k"] ?? 0).toFixed(0),
                    icon: Users,
                  },
                  {
                    label: lang === "PT" ? "Sem Seguro Dental" : "No Dental Insurance",
                    val: `${Number(data.estado["pct_sem_seguro_dental"] ?? 0).toFixed(0)}%`,
                    icon: AlertTriangle,
                  },
                  {
                    label: lang === "PT" ? "Renda Mediana" : "Median Income",
                    val: `$${(Number(data.estado["mediana_renda"] ?? 0) / 1000).toFixed(0)}k`,
                    icon: DollarSign,
                  },
                  {
                    label: lang === "PT" ? "Crescimento Pop." : "Pop. Growth",
                    val: `${Number(data.estado["crescimento_pop_pct"] ?? 0).toFixed(1)}%/yr`,
                    icon: TrendingUp,
                  },
                  {
                    label: "Áreas HPSA",
                    val: String(data.estado["hpsa_count"] ?? 0),
                    icon: MapPin,
                  },
                  {
                    label: lang === "PT" ? "Penetração DSO" : "DSO Penetration",
                    val: `${Number(data.estado["penetracao_dso"] ?? 0).toFixed(0)}%`,
                    icon: Building2,
                  },
                ].map(({ label, val, icon: Icon }) => (
                  <div key={label} className="bg-slate-800 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <p className="text-slate-400 text-xs">{label}</p>
                    </div>
                    <p className="text-white font-bold text-lg">{val}</p>
                  </div>
                ))}
              </div>

              {/* Charts side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Radar chart */}
                <div className="bg-slate-800 rounded-xl p-4">
                  <h3 className="text-white font-semibold text-sm mb-3">
                    {lang === "PT" ? "Perfil de Oportunidade" : "Opportunity Profile"}
                  </h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis
                        dataKey="dim"
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                      />
                      <Radar
                        name="Score"
                        dataKey="val"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.25}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Bar chart top cities */}
                <div className="bg-slate-800 rounded-xl p-4">
                  <h3 className="text-white font-semibold text-sm mb-3">
                    {lang === "PT" ? "Top 10 Áreas por Score" : "Top 10 Areas by Score"}
                  </h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart
                      data={data.cidades.slice(0, 10).map((c) => ({
                        nome: c.nome,
                        score: c.score_oportunidade,
                      }))}
                      layout="vertical"
                      margin={{ left: 0, right: 20 }}
                    >
                      <XAxis type="number" domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 10 }} />
                      <YAxis type="category" dataKey="nome" width={120} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{ background: "#1e293b", border: "none", borderRadius: 8 }}
                        labelStyle={{ color: "#e2e8f0" }}
                        itemStyle={{ color: "#94a3b8" }}
                      />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                        {data.cidades.slice(0, 10).map((c) => (
                          <Cell key={c.nome} fill={SCORE_COLOR(c.score_oportunidade)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Full city table in overview */}
              <div className="bg-slate-800 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-3">
                  {lang === "PT" ? `Todas as ${data.cidades.length} áreas analisadas` : `All ${data.cidades.length} areas analyzed`}
                </h3>
                <div className="space-y-2">
                  {data.cidades.map((c, i) => (
                    <div
                      key={c.nome}
                      className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/50 hover:bg-slate-900"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 mt-0.5" style={{ background: SCORE_COLOR(c.score_oportunidade) + "22" }}>
                        <span className="text-sm font-bold" style={{ color: SCORE_COLOR(c.score_oportunidade) }}>
                          {c.score_oportunidade}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-white font-medium text-sm">{c.nome}</p>
                          <span
                            className="px-1.5 py-0.5 rounded-full text-[10px] font-medium"
                            style={{
                              background: TIPO_COLOR[c.tipo] + "22",
                              color: TIPO_COLOR[c.tipo],
                            }}
                          >
                            {c.tipo}
                          </span>
                          {c.hpsa && (
                            <span className="px-1.5 py-0.5 bg-red-900/50 text-red-300 text-[10px] rounded font-medium">
                              HPSA
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 text-xs mt-1">{c.nota}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1.5 text-[11px]">
                          <span className="text-slate-500">{lang === "PT" ? "Pop" : "Pop"}: <span className="text-slate-300">{fmt(c.populacao)}</span></span>
                          <span className="text-slate-500">Dent/100k: <span className="text-slate-300">{c.dentistas_por_100k}</span></span>
                          <span className="text-slate-500">{lang === "PT" ? "Renda" : "Income"}: <span className="text-slate-300">${(c.mediana_renda / 1000).toFixed(0)}k</span></span>
                          <span className="text-slate-500">DSO: <span className="text-slate-300">{c.penetracao_dso}%</span></span>
                          <span className="text-slate-500">{lang === "PT" ? "Cresc" : "Growth"}: <span className={c.crescimento_pop_pct >= 0 ? "text-green-400" : "text-red-400"}>{c.crescimento_pop_pct >= 0 ? "+" : ""}{c.crescimento_pop_pct.toFixed(1)}%</span></span>
                          <span className="text-slate-500">{lang === "PT" ? "Carência" : "Needed"}: <span className="text-blue-400">{c.especialidade_mais_carente}</span></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!loading && data && tab === "cidades" && (
            <div className="space-y-4">
              {/* Filter by type */}
              <div className="flex flex-wrap gap-2">
                {["all", "Metro", "Suburban", "Secondary", "Rural", "College Town"].map(
                  (tipo) => (
                    <button
                      key={tipo}
                      onClick={() => setTipoFilter(tipo)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        tipoFilter === tipo
                          ? "bg-blue-600 text-white"
                          : "bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {tipo === "all"
                        ? lang === "PT"
                          ? "Todos"
                          : "All"
                        : tipo}
                    </button>
                  )
                )}
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-700">
                <table className="w-full text-sm">
                  <thead className="bg-slate-800">
                    <tr>
                      <Th label={lang === "PT" ? "Cidade" : "City"} k="nome" />
                      <Th label="Tipo" k="tipo" />
                      <Th label="Score" k="score_oportunidade" />
                      <Th label={lang === "PT" ? "Pop." : "Pop."} k="populacao" />
                      <Th label="Dent/100k" k="dentistas_por_100k" />
                      <Th label={lang === "PT" ? "Renda" : "Income"} k="mediana_renda" />
                      <Th label="DSO%" k="penetracao_dso" />
                      <Th label={lang === "PT" ? "Cresc." : "Growth"} k="crescimento_pop_pct" />
                      <th className="px-3 py-2 text-left text-xs font-medium text-slate-400 uppercase">HPSA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedCidades.map((c) => (
                      <tr key={c.nome} className="border-t border-slate-800 hover:bg-slate-800/50">
                        <td className="px-3 py-2.5">
                          <div>
                            <p className="text-white font-medium">{c.nome}</p>
                            <p className="text-slate-500 text-xs mt-0.5">{c.nota}</p>
                            <p className="text-blue-400/70 text-xs mt-0.5">
                              {lang === "PT" ? "Mais carente:" : "Most needed:"} {c.especialidade_mais_carente}
                            </p>
                          </div>
                        </td>
                        <td className="px-3 py-2.5">
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              background: TIPO_COLOR[c.tipo] + "22",
                              color: TIPO_COLOR[c.tipo],
                            }}
                          >
                            {c.tipo}
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span
                            className="font-bold text-sm"
                            style={{ color: SCORE_COLOR(c.score_oportunidade) }}
                          >
                            {c.score_oportunidade}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-slate-300">{fmt(c.populacao)}</td>
                        <td className="px-3 py-2.5 text-slate-300">{c.dentistas_por_100k}</td>
                        <td className="px-3 py-2.5 text-slate-300">${(c.mediana_renda / 1000).toFixed(0)}k</td>
                        <td className="px-3 py-2.5 text-slate-300">{c.penetracao_dso}%</td>
                        <td className="px-3 py-2.5 text-slate-300">
                          <span className={c.crescimento_pop_pct >= 0 ? "text-green-400" : "text-red-400"}>
                            {c.crescimento_pop_pct >= 0 ? "+" : ""}{c.crescimento_pop_pct.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          {c.hpsa ? (
                            <span className="px-1.5 py-0.5 bg-red-900/50 text-red-300 text-xs rounded">
                              HPSA
                            </span>
                          ) : (
                            <span className="text-slate-600 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {sortedCidades.length === 0 && (
                      <tr>
                        <td colSpan={9} className="px-3 py-8 text-center text-slate-500">
                          {lang === "PT" ? "Nenhuma área encontrada" : "No areas found"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Best opportunity card */}
              {data.topOportunidade && (
                <div className="bg-gradient-to-r from-green-900/30 to-slate-800 rounded-xl p-4 border border-green-700/30">
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-semibold">
                        {lang === "PT" ? "Melhor Oportunidade:" : "Best Opportunity:"}{" "}
                        {data.topOportunidade.nome}
                      </p>
                      <p className="text-slate-400 text-sm mt-1">{data.topOportunidade.nota}</p>
                      <p className="text-slate-500 text-xs mt-1">
                        {lang === "PT" ? "Especialidade mais carente:" : "Most needed specialty:"}{" "}
                        <span className="text-blue-400">{data.topOportunidade.especialidade_mais_carente}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {!loading && data && tab === "financeiro" && (
            <div className="space-y-4">
              <p className="text-slate-400 text-sm">
                {lang === "PT"
                  ? "Estimativas financeiras baseadas nos dados do estado. Valores em USD."
                  : "Financial estimates based on state data. Values in USD."}
              </p>

              {/* Financial cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: lang === "PT" ? "Investimento Inicial" : "Initial Investment",
                    desc: lang === "PT"
                      ? "Abertura de clínica geral (pequeno porte)"
                      : "General dentistry practice (small)",
                    val: `$120k – $280k`,
                    icon: DollarSign,
                    color: "blue",
                  },
                  {
                    title: lang === "PT" ? "Aluguel Mensal (est.)" : "Monthly Rent (est.)",
                    desc: lang === "PT"
                      ? "Espaço comercial 1.200–2.000 sq ft"
                      : "Commercial space 1,200–2,000 sq ft",
                    val: `$${Math.round(Number(data.estado["custo_aluguel_idx"] ?? 100) * 20 / 100) * 100}/mo`,
                    icon: Building2,
                    color: "purple",
                  },
                  {
                    title: lang === "PT" ? "Receita Anual Projetada" : "Projected Annual Revenue",
                    desc: lang === "PT"
                      ? "Clínica com 1 cadeira + dentista"
                      : "Practice 1 chair + dentist",
                    val: `$280k – $480k`,
                    icon: TrendingUp,
                    color: "green",
                  },
                  {
                    title: lang === "PT" ? "Ponto de Equilíbrio" : "Break-Even Point",
                    desc: lang === "PT"
                      ? "Tempo estimado para retorno do investimento"
                      : "Estimated time to recover investment",
                    val: `18 – 36 ${lang === "PT" ? "meses" : "months"}`,
                    icon: AlertTriangle,
                    color: "yellow",
                  },
                ].map(({ title, desc, val, icon: Icon, color }) => (
                  <div key={title} className="bg-slate-800 rounded-xl p-4">
                    <div className={`w-8 h-8 rounded-lg bg-${color}-600/20 flex items-center justify-center mb-3`}>
                      <Icon className={`w-4 h-4 text-${color}-400`} />
                    </div>
                    <p className="text-white font-semibold">{title}</p>
                    <p className="text-slate-500 text-xs mt-0.5 mb-2">{desc}</p>
                    <p className={`text-${color}-400 text-xl font-bold`}>{val}</p>
                  </div>
                ))}
              </div>

              {/* Market factors */}
              <div className="bg-slate-800 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-3">
                  {lang === "PT" ? "Fatores de Mercado" : "Market Factors"}
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: lang === "PT" ? "Índice de Custo de Aluguel" : "Rent Cost Index",
                      val: Number(data.estado["custo_aluguel_idx"] ?? 100),
                      max: 200,
                      desc: lang === "PT" ? "100 = média nacional" : "100 = national avg",
                      lower: true,
                    },
                    {
                      label: lang === "PT" ? "Índice Medicaid" : "Medicaid Index",
                      val: Number(data.estado["medicaid_idx"] ?? 50),
                      max: 100,
                      desc: lang === "PT" ? "Reembolso Medicaid relativo" : "Medicaid reimbursement relative",
                      lower: false,
                    },
                    {
                      label: lang === "PT" ? "Penetração DSO" : "DSO Penetration",
                      val: Number(data.estado["penetracao_dso"] ?? 20),
                      max: 40,
                      desc: lang === "PT" ? "% mercado em DSOs" : "% market in DSOs",
                      lower: true,
                    },
                  ].map(({ label, val, max, desc, lower }) => {
                    const pct = Math.min(100, (val / max) * 100);
                    const isGood = lower ? pct < 50 : pct > 50;
                    return (
                      <div key={label}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-slate-300 text-xs">{label}</span>
                          <span className={`text-xs font-bold ${isGood ? "text-green-400" : "text-red-400"}`}>
                            {val.toFixed(0)} <span className="text-slate-500 font-normal">— {desc}</span>
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-700 rounded-full">
                          <div
                            className={`h-full rounded-full ${isGood ? "bg-green-500" : "bg-red-500"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
