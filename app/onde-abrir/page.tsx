"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import {
  MapPin, Users, AlertTriangle, Target, TrendingUp, Compass, Award,
  GraduationCap, DollarSign, ShieldCheck, Building2, BarChart3,
  ChevronDown, ChevronUp, RefreshCw, CheckCircle2, Circle,
  ArrowUpDown, ArrowUp, ArrowDown, Info, Stethoscope,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";
import EstadoUSADrawer from "@/components/EstadoUSADrawer";
import { cidadesUSA as cidadesUSAStatic, type CidadeUSA } from "@/lib/data-onde-abrir-usa-cidades";
import type { ScoreEstadoUSA, SaturacaoEspecialidadeUSA, CustoPorRegiaoUSA } from "@/lib/data-onde-abrir-usa";
import type { ScoreMunicipio, SaturacaoEspecialidade, RankingEstado } from "@/lib/data-onde-abrir";

// ─── Types ───────────────────────────────────────────────────────────────────

type Country = "BR" | "US";
type SortDir = "asc" | "desc" | null;
interface SortState { col: string; dir: SortDir }

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm shadow-xl">
      {label && <p className="text-slate-300 font-medium mb-1">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color || "#94a3b8" }}>
          {p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</strong>
        </p>
      ))}
    </div>
  );
};

const ScatterTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm shadow-xl">
      <p className="text-white font-semibold">{d.name}</p>
      <p className="text-slate-400">Income: <span className="text-slate-200">${(d.x / 1000).toFixed(0)}k</span></p>
      <p className="text-slate-400">Score: <span className="text-slate-200">{d.y}</span></p>
      <p className="text-slate-400">Pop: <span className="text-slate-200">{d.z?.toLocaleString()}</span></p>
    </div>
  );
};

const scoreColor = (s: number) =>
  s >= 80 ? "text-emerald-400" : s >= 65 ? "text-blue-400" : s >= 50 ? "text-amber-400" : s >= 35 ? "text-slate-300" : "text-red-400";

const scoreBarColor = (s: number) =>
  s >= 80 ? "#10b981" : s >= 65 ? "#3b82f6" : s >= 50 ? "#f59e0b" : s >= 35 ? "#94a3b8" : "#ef4444";

const classBadge = (c: string) => {
  const map: Record<string, string> = {
    Excellent: "bg-emerald-600/20 text-emerald-400",
    "Very Good": "bg-blue-600/20 text-blue-400",
    Good: "bg-amber-600/20 text-amber-400",
    Moderate: "bg-slate-600/20 text-slate-400",
    Saturated: "bg-red-600/20 text-red-400",
    Excelente: "bg-emerald-600/20 text-emerald-400",
    "Muito Bom": "bg-blue-600/20 text-blue-400",
    Bom: "bg-amber-600/20 text-amber-400",
    Moderado: "bg-slate-600/20 text-slate-400",
    Saturado: "bg-red-600/20 text-red-400",
    Oportunidade: "bg-emerald-600/20 text-emerald-400",
    Opportunity: "bg-emerald-600/20 text-emerald-400",
    Saturating: "bg-red-600/20 text-red-400",
    Saturando: "bg-red-600/20 text-red-400",
    Stable: "bg-blue-600/20 text-blue-400",
    Estavel: "bg-blue-600/20 text-blue-400",
  };
  return map[c] ?? "bg-slate-600/20 text-slate-400";
};

const SortIcon = ({ col, sort }: { col: string; sort: SortState }) => {
  if (sort.col !== col) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-40" />;
  return sort.dir === "asc"
    ? <ArrowUp className="w-3 h-3 ml-1 text-blue-400" />
    : <ArrowDown className="w-3 h-3 ml-1 text-blue-400" />;
};

// ─── Skeleton ────────────────────────────────────────────────────────────────
const Skeleton = ({ h = "h-6", w = "w-full" }: { h?: string; w?: string }) => (
  <div className={`${h} ${w} bg-slate-800 rounded animate-pulse`} />
);

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function OndeAbrirPage() {
  const { lang } = useLanguage();
  const [country, setCountry] = useState<Country>("BR");
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"live" | "static">("static");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // USA state
  const [usEstados, setUsEstados] = useState<ScoreEstadoUSA[]>([]);
  const [usIndicadores, setUsIndicadores] = useState<any>(null);
  const [usEspecialidades, setUsEspecialidades] = useState<SaturacaoEspecialidadeUSA[]>([]);
  const [usCustos, setUsCustos] = useState<CustoPorRegiaoUSA[]>([]);
  const [usChecklist, setUsChecklist] = useState<any[]>([]);
  const [usRegiaoFilter, setUsRegiaoFilter] = useState("All");
  const [usBusca, setUsBusca] = useState("");
  const [usSort, setUsSort] = useState<SortState>({ col: "score_oportunidade", dir: "desc" });
  const [selectedUF, setSelectedUF] = useState<string | null>(null);
  const [openChecklist, setOpenChecklist] = useState<string | null>(null);
  const [cidadesBusca, setCidadesBusca] = useState("");
  const [cidadesEstadoFilter, setCidadesEstadoFilter] = useState("All");
  const [cidadesTipoFilter, setCidadesTipoFilter] = useState("All");
  const [cidadesSort, setCidadesSort] = useState<SortState>({ col: "score_oportunidade", dir: "desc" });
  const [cidadesShowAll, setCidadesShowAll] = useState(false);
  const [cidadesData, setCidadesData] = useState<CidadeUSA[]>([]);
  const [cidadesTotal, setCidadesTotal] = useState(0);
  const [cidadesSource, setCidadesSource] = useState<"live" | "static" | "loading">("loading");
  const [cidadesLoading, setCidadesLoading] = useState(false);

  // BR state
  const [brMunicipios, setBrMunicipios] = useState<ScoreMunicipio[]>([]);
  const [brIndicadores, setBrIndicadores] = useState<any>(null);
  const [brEspecialidades, setBrEspecialidades] = useState<SaturacaoEspecialidade[]>([]);
  const [brRankingEstados, setBrRankingEstados] = useState<RankingEstado[]>([]);
  const [brCriterios, setBrCriterios] = useState<any>(null);
  const [brBuscaEsp, setBrBuscaEsp] = useState("");
  const [brBuscaEstado, setBrBuscaEstado] = useState("");

  const fetchData = useCallback(async (pais: Country) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/onde-abrir?pais=${pais}`);
      if (!res.ok) throw new Error("API error");
      const json = await res.json();
      setSource(json.source);
      setLastUpdated(json.ultimaAtualizacao);
      if (pais === "US") {
        setUsEstados(json.estados ?? []);
        setUsIndicadores(json.indicadores ?? null);
        setUsEspecialidades(json.especialidades ?? []);
        setUsCustos(json.custos ?? []);
        setUsChecklist(json.checklist ?? []);
      } else {
        setBrMunicipios(json.municipios ?? []);
        setBrIndicadores(json.indicadores ?? null);
        setBrEspecialidades(json.especialidades ?? []);
        setBrRankingEstados(json.rankingEstados ?? []);
        setBrCriterios(json.criteriosPeso ?? null);
      }
    } catch {
      // keep previous state; will show empty skeleton
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(country); }, [country, fetchData]);

  // ── USA computed lists ─────────────────────────────────────────────────────
  const usRegioes = useMemo(() => {
    const r = new Set(usEstados.map((e) => e.regiao));
    return ["All", ...Array.from(r).sort()];
  }, [usEstados]);

  const usFiltered = useMemo(() => {
    let list = [...usEstados];
    if (usRegiaoFilter !== "All") list = list.filter((e) => e.regiao === usRegiaoFilter);
    if (usBusca) list = list.filter((e) =>
      e.estado.toLowerCase().includes(usBusca.toLowerCase()) ||
      e.uf.toLowerCase().includes(usBusca.toLowerCase())
    );
    if (usSort.col && usSort.dir) {
      list.sort((a, b) => {
        const av = (a as any)[usSort.col] ?? 0;
        const bv = (b as any)[usSort.col] ?? 0;
        const mult = usSort.dir === "asc" ? 1 : -1;
        return typeof av === "string" ? av.localeCompare(bv) * mult : (av - bv) * mult;
      });
    }
    return list;
  }, [usEstados, usRegiaoFilter, usBusca, usSort]);

  const usTop15 = useMemo(() =>
    [...usEstados].sort((a, b) => b.score_oportunidade - a.score_oportunidade).slice(0, 15),
    [usEstados]
  );

  const usScatterData = useMemo(() =>
    usEstados.map((e) => ({ name: `${e.estado} (${e.uf})`, x: e.mediana_renda, y: e.score_oportunidade, z: e.populacao })),
    [usEstados]
  );

  // ── City-level ranking (dynamic API + static fallback) ──────────────────
  const cidadesUFList = useMemo(() => {
    const ufs = Array.from(new Set(cidadesUSAStatic.map((c) => c.uf))).sort();
    return ["All", ...ufs];
  }, []);

  // Fetch cities from API when filters/sort change
  /* eslint-disable react-compiler/react-compiler */
  const fetchCidades = useCallback(async (showAll: boolean) => {
    setCidadesLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("limit", showAll ? "500" : "50");
      params.set("page", "1");
      if (cidadesEstadoFilter !== "All") params.set("uf", cidadesEstadoFilter);
      if (cidadesTipoFilter !== "All") params.set("tipo", cidadesTipoFilter);
      if (cidadesBusca) params.set("search", cidadesBusca);
      if (cidadesSort.col && cidadesSort.dir) {
        params.set("sort", cidadesSort.col);
        params.set("dir", cidadesSort.dir);
      }

      const res = await fetch(`/api/onde-abrir/cidades?${params}`);
      if (res.ok) {
        const json = await res.json();
        setCidadesData(json.data ?? []);
        setCidadesTotal(json.total ?? 0);
        setCidadesSource(json.source ?? "static");
        return;
      }
    } catch { /* fall through */ }

    // Fallback: client-side filtering of static data
    let list = [...cidadesUSAStatic];
    if (cidadesEstadoFilter !== "All") list = list.filter((c) => c.uf === cidadesEstadoFilter);
    if (cidadesTipoFilter !== "All") list = list.filter((c) => c.tipo === cidadesTipoFilter);
    if (cidadesBusca) {
      const s = cidadesBusca.toLowerCase();
      list = list.filter((c) => c.nome.toLowerCase().includes(s) || c.uf.toLowerCase().includes(s));
    }
    if (cidadesSort.col && cidadesSort.dir) {
      list.sort((a, b) => {
        const av = (a as any)[cidadesSort.col] ?? 0;
        const bv = (b as any)[cidadesSort.col] ?? 0;
        const mult = cidadesSort.dir === "asc" ? 1 : -1;
        return typeof av === "string" ? av.localeCompare(bv) * mult : (av - bv) * mult;
      });
    }
    setCidadesData(showAll ? list : list.slice(0, 50));
    setCidadesTotal(list.length);
    setCidadesSource("static");
  }, [cidadesEstadoFilter, cidadesTipoFilter, cidadesBusca, cidadesSort]);
  /* eslint-enable react-compiler/react-compiler */

  useEffect(() => {
    if (country === "US") fetchCidades(cidadesShowAll).finally(() => setCidadesLoading(false));
  }, [country, fetchCidades, cidadesShowAll]);

  const cidadesDisplay = cidadesData;

  const handleCidadesSort = (col: string) => {
    setCidadesSort((prev) =>
      prev.col === col
        ? { col, dir: prev.dir === "desc" ? "asc" : prev.dir === "asc" ? null : "desc" }
        : { col, dir: "desc" }
    );
  };

  const handleSort = (col: string) => {
    setUsSort((prev) => ({
      col,
      dir: prev.col === col ? (prev.dir === "desc" ? "asc" : prev.dir === "asc" ? null : "desc") : "desc",
    }));
  };

  // ── BR computed lists ──────────────────────────────────────────────────────
  const brTop15 = useMemo(() =>
    [...brMunicipios].sort((a, b) => b.score_oportunidade - a.score_oportunidade).slice(0, 15),
    [brMunicipios]
  );
  const brScatterData = useMemo(() =>
    brMunicipios.map((m) => ({ name: m.municipio, x: m.renda_per_capita, y: m.score_oportunidade, z: m.populacao })),
    [brMunicipios]
  );
  const brEspFiltradas = useMemo(() =>
    brEspecialidades.filter((e) => e.especialidade.toLowerCase().includes(brBuscaEsp.toLowerCase())),
    [brEspecialidades, brBuscaEsp]
  );
  const brEstadosFiltrados = useMemo(() =>
    brRankingEstados.filter((e) =>
      e.estado.toLowerCase().includes(brBuscaEstado.toLowerCase()) ||
      e.uf.toLowerCase().includes(brBuscaEstado.toLowerCase())
    ),
    [brRankingEstados, brBuscaEstado]
  );

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <AppShell>
      <PageHeader
        title={country === "BR" ? "Onde Abrir — Inteligência Locacional" : "Where to Open — Location Intelligence"}
        subtitle={
          country === "BR"
            ? "Score de oportunidade por município baseado em saturação, demanda epidemiológica, potencial econômico e pipeline de formandos"
            : "Composite opportunity score for all 50 US states — workforce shortage, insurance access, economic potential, market growth, DSO competition"
        }
        badge={country === "BR" ? "CFO · IBGE · CNES · DataSUS · INEP" : "ADA HPI · HRSA · Census · CMS · BLS"}
      />

      {/* Country Selector */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-slate-500 text-sm">Market:</span>
        <div className="flex rounded-lg overflow-hidden border border-slate-700">
          {(["BR", "US"] as Country[]).map((c) => (
            <button
              key={c}
              onClick={() => setCountry(c)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${
                country === c
                  ? "bg-blue-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <Image
                src={c === "BR" ? "https://flagcdn.com/br.svg" : "https://flagcdn.com/us.svg"}
                alt={c} width={18} height={13} className="rounded-sm"
              />
              {c === "BR" ? "Brasil" : "United States"}
            </button>
          ))}
        </div>
        {/* Data source badge */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
          source === "live"
            ? "bg-emerald-600/10 text-emerald-400 border-emerald-600/30"
            : "bg-slate-700/40 text-slate-400 border-slate-700"
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${source === "live" ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
          {source === "live" ? "Live data" : "Static fallback"}
        </div>
        {lastUpdated && (
          <span className="text-slate-600 text-xs hidden sm:block">
            Updated {new Date(lastUpdated).toLocaleDateString()}
          </span>
        )}
        <button
          onClick={() => fetchData(country)}
          disabled={loading}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* ═══════════════ USA TAB ═══════════════ */}
      {country === "US" && (
        <div className="space-y-8">
          {/* KPI Row 1 */}
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <Skeleton h="h-3" w="w-2/3" /><Skeleton h="h-7" w="w-1/2" /><Skeleton h="h-3" w="w-3/4" />
                </div>
              ))}
            </div>
          ) : usIndicadores && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Pop. in Dental Shortage Areas" value={`${usIndicadores.populacaoDesassistida_mi}M`} icon={Users} color="red" subtitle="Living in HPSA-designated areas" />
                <StatCard title="National HPSA Designations" value={usIndicadores.hpsaDesignacoesNacionais.toLocaleString()} icon={AlertTriangle} color="red" subtitle="Dental health shortage areas" />
                <StatCard title="National Avg Score" value={`${usIndicadores.scoreMedioNacional}/100`} icon={Target} color="yellow" subtitle="Composite opportunity" />
                <StatCard title="States w/ Opportunity" value={usIndicadores.estadosOportunidade} icon={MapPin} color="green" subtitle="Score > 55" />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Top Opportunity State" value={usIndicadores.estadoMaisOportunidades} icon={Compass} color="blue" subtitle="Mississippi leads ranking" />
                <StatCard title="Most Underserved Specialty" value="Pediatrics" icon={Stethoscope} color="purple" subtitle="Highest national shortage" />
                <StatCard title="Adults w/o Dental Insurance" value={`${usIndicadores.pctSemSeguroDental}%`} icon={ShieldCheck} color="yellow" subtitle="74% of US adults uninsured" />
                <StatCard title="DSO Market Share" value={`${usIndicadores.dsoParticipacao}%`} icon={Building2} color="cyan" subtitle="Corporate/chain dentistry" />
              </div>
            </>
          )}

          {/* Alert */}
          <div className="bg-blue-600/10 border border-blue-600/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-blue-300 font-semibold text-sm">
                  68.5 million Americans live in Dental Health Professional Shortage Areas (HPSA)
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  The NHSC (National Health Service Corps) offers student loan repayment up to <strong className="text-slate-300">$50,000</strong> for dentists who practice in HPSA-designated sites for 2+ years.
                  States like MS, AL, WV, and AR have the highest concentration of HPSA areas.
                  Independent practices in these markets face <strong className="text-slate-300">12–28% DSO penetration</strong> vs 35%+ in major metros —
                  a significant advantage for establishing patient loyalty.
                </p>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top 15 States */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
              <h2 className="text-white font-semibold mb-1">Top 15 States by Opportunity Score</h2>
              <p className="text-slate-500 text-xs mb-4">Composite score (0–100) — higher = better opportunity for independent practice</p>
              {loading ? <Skeleton h="h-96" /> : (
                <ResponsiveContainer width="100%" height={420}>
                  <BarChart data={usTop15} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 10 }} />
                    <YAxis type="category" dataKey="uf" width={32} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="score_oportunidade" name="Score" radius={[0, 4, 4, 0]}>
                      {usTop15.map((e, i) => (
                        <Cell key={i} fill={scoreBarColor(e.score_oportunidade)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Score vs Income Scatter */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
              <h2 className="text-white font-semibold mb-1">Score vs Median Household Income</h2>
              <p className="text-slate-500 text-xs mb-4">
                Ideal markets: moderate income ($50k–$75k) + low dentist ratio. Circle size = population.
              </p>
              {loading ? <Skeleton h="h-96" /> : (
                <ResponsiveContainer width="100%" height={420}>
                  <ScatterChart margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis type="number" dataKey="x" name="Median Income" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <YAxis type="number" dataKey="y" name="Score" domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 10 }} />
                    <ZAxis type="number" dataKey="z" range={[30, 350]} name="Population" />
                    <Tooltip content={<ScatterTooltip />} />
                    <Scatter data={usScatterData}>
                      {usScatterData.map((e, i) => (
                        <Cell key={i} fill={scoreBarColor(e.y)} fillOpacity={0.75} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Multi-Factor Analysis Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="text-white font-semibold">Multi-Factor State Analysis</h2>
                <p className="text-slate-500 text-xs">9 dimensions — click column headers to sort</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  value={usRegiaoFilter}
                  onChange={(e) => setUsRegiaoFilter(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                >
                  {usRegioes.map((r) => <option key={r} value={r}>{r === "All" ? "All Regions" : r}</option>)}
                </select>
                <input
                  type="text" placeholder="Search state..."
                  value={usBusca} onChange={(e) => setUsBusca(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 w-40"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-800">
                    {[
                      { key: "estado", label: "State" },
                      { key: "score_oportunidade", label: "Score" },
                      { key: "dentistas_por_100k", label: "DDS/100k" },
                      { key: "hpsa_count", label: "HPSA" },
                      { key: "pct_sem_seguro_dental", label: "Uninsured%" },
                      { key: "medicaid_idx", label: "Medicaid" },
                      { key: "penetracao_dso", label: "DSO%" },
                      { key: "crescimento_pop_pct", label: "Pop Δ%" },
                      { key: "custo_aluguel_idx", label: "Rent Idx" },
                    ].map(({ key, label }) => (
                      <th
                        key={key}
                        onClick={() => handleSort(key)}
                        className="text-left py-3 px-2 text-slate-400 font-medium cursor-pointer hover:text-slate-200 select-none whitespace-nowrap"
                      >
                        <span className="flex items-center">{label}<SortIcon col={key} sort={usSort} /></span>
                      </th>
                    ))}
                    <th className="text-left py-3 px-2 text-slate-400 font-medium whitespace-nowrap">Best City</th>
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <tr key={i} className="border-b border-slate-800/50">
                          {Array.from({ length: 10 }).map((_, j) => (
                            <td key={j} className="py-3 px-2"><Skeleton h="h-3" /></td>
                          ))}
                        </tr>
                      ))
                    : usFiltered.map((e) => (
                        <tr key={e.uf} onClick={() => setSelectedUF(e.uf)} className="border-b border-slate-800/30 hover:bg-slate-800/30 group cursor-pointer">
                          <td className="py-2.5 px-2 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 font-mono w-6 shrink-0">{e.uf}</span>
                              <div>
                                <p className="text-white font-medium leading-tight hidden sm:block">{e.estado}</p>
                                <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${classBadge(e.classificacao)}`}>{e.classificacao}</span>
                              </div>
                            </div>
                          </td>
                          <td className={`py-2.5 px-2 font-bold text-base ${scoreColor(e.score_oportunidade)}`}>{e.score_oportunidade}</td>
                          <td className="py-2.5 px-2 text-slate-300">{e.dentistas_por_100k.toFixed(0)}</td>
                          <td className="py-2.5 px-2">
                            <span className={`font-medium ${e.hpsa_count >= 50 ? "text-emerald-400" : e.hpsa_count >= 25 ? "text-blue-400" : "text-slate-400"}`}>
                              {e.hpsa_count}
                            </span>
                          </td>
                          <td className="py-2.5 px-2">
                            <span className={e.pct_sem_seguro_dental >= 76 ? "text-emerald-400" : "text-slate-300"}>
                              {e.pct_sem_seguro_dental.toFixed(0)}%
                            </span>
                          </td>
                          <td className="py-2.5 px-2">
                            <div className="flex items-center gap-1">
                              <div className="w-12 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${e.medicaid_idx}%` }} />
                              </div>
                              <span className="text-slate-400">{e.medicaid_idx}</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-2">
                            <span className={e.penetracao_dso <= 15 ? "text-emerald-400" : e.penetracao_dso <= 25 ? "text-slate-300" : "text-red-400"}>
                              {e.penetracao_dso.toFixed(0)}%
                            </span>
                          </td>
                          <td className="py-2.5 px-2">
                            <span className={e.crescimento_pop_pct >= 5 ? "text-emerald-400" : e.crescimento_pop_pct >= 0 ? "text-slate-300" : "text-red-400"}>
                              {e.crescimento_pop_pct > 0 ? "+" : ""}{e.crescimento_pop_pct.toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-2.5 px-2">
                            <span className={e.custo_aluguel_idx <= 75 ? "text-emerald-400" : e.custo_aluguel_idx <= 100 ? "text-slate-300" : "text-red-400"}>
                              {e.custo_aluguel_idx}
                            </span>
                          </td>
                          <td className="py-2.5 px-2 text-blue-400 text-xs">{e.melhor_cidade}</td>
                          <td className="py-2.5 px-2">
                            <button
                              onClick={(ev) => { ev.stopPropagation(); setSelectedUF(e.uf); }}
                              className="px-2 py-1 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 text-xs rounded transition-colors whitespace-nowrap"
                            >
                              {lang === "PT" ? "Ver Estado" : "View State"}
                            </button>
                          </td>
                        </tr>
                      ))
                  }
                </tbody>
              </table>
            </div>
            <p className="text-slate-600 text-xs mt-3">
              DDS/100k: dentists per 100k pop (national avg 61) · HPSA: health shortage areas · Medicaid: reimbursement index 0–100 · DSO%: corporate chain share · Rent Idx: 100 = national average
            </p>
          </div>

          {/* Specialty Analysis */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
            <h2 className="text-white font-semibold mb-1">Specialty Analysis (ADA-Recognized)</h2>
            <p className="text-slate-500 text-xs mb-4">Avg salary, projected 10-yr job growth and saturation by specialty. Source: BLS OES 2023, ADA HPI.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-3 text-slate-400 font-medium">Specialty</th>
                    <th className="text-right py-3 px-3 text-slate-400 font-medium">Nat&apos;l /100k</th>
                    <th className="text-left py-3 px-3 text-slate-400 font-medium">Most Saturated</th>
                    <th className="text-left py-3 px-3 text-slate-400 font-medium">Best Opportunity</th>
                    <th className="text-right py-3 px-3 text-slate-400 font-medium">Avg Salary</th>
                    <th className="text-right py-3 px-3 text-slate-400 font-medium">10yr Growth</th>
                    <th className="text-center py-3 px-3 text-slate-400 font-medium">Insurance</th>
                    <th className="text-center py-3 px-3 text-slate-400 font-medium">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {(loading ? [] : usEspecialidades).map((e) => (
                    <tr key={e.especialidade} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="py-3 px-3 text-white font-medium">{e.especialidade}</td>
                      <td className="py-3 px-3 text-right text-slate-300">{e.media_nacional_por_100k}</td>
                      <td className="py-3 px-3 text-red-400">{e.top5_saturadas[0]?.cidade} ({e.top5_saturadas[0]?.valor})</td>
                      <td className="py-3 px-3 text-emerald-400">{e.top5_oportunidades[0]?.cidade} ({e.top5_oportunidades[0]?.valor})</td>
                      <td className="py-3 px-3 text-right text-slate-200 font-medium">${(e.salario_medio_anual / 1000).toFixed(0)}k</td>
                      <td className="py-3 px-3 text-right">
                        <span className={e.crescimento_emprego_pct >= 10 ? "text-emerald-400 font-medium" : "text-slate-300"}>
                          +{e.crescimento_emprego_pct}%
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        {e.seguro_cobre
                          ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                          : <Circle className="w-4 h-4 text-slate-600 mx-auto" />
                        }
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${classBadge(e.tendencia)}`}>
                          {e.tendencia}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {loading && Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-slate-800/50">
                      {Array.from({ length: 8 }).map((_, j) => <td key={j} className="py-3 px-3"><Skeleton h="h-3" /></td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Full City Ranking ── */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="text-white font-semibold">{lang === "PT" ? "Ranking Completo de Cidades" : "Complete City Ranking"} ({cidadesTotal})</h2>
                <p className="text-slate-500 text-xs">{lang === "PT" ? "Todas as 517 áreas analisadas nos EUA — clique nos cabeçalhos para ordenar" : "All 517 analyzed areas in the US — click headers to sort"}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  value={cidadesEstadoFilter}
                  onChange={(e) => setCidadesEstadoFilter(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                >
                  {cidadesUFList.map((uf) => <option key={uf} value={uf}>{uf === "All" ? (lang === "PT" ? "Todos os Estados" : "All States") : uf}</option>)}
                </select>
                <select
                  value={cidadesTipoFilter}
                  onChange={(e) => setCidadesTipoFilter(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                >
                  {["All", "Metro", "Suburban", "Secondary", "Rural", "College Town"].map((t) => (
                    <option key={t} value={t}>{t === "All" ? (lang === "PT" ? "Todos os Tipos" : "All Types") : t}</option>
                  ))}
                </select>
                <input
                  type="text" placeholder={lang === "PT" ? "Buscar cidade..." : "Search city..."}
                  value={cidadesBusca} onChange={(e) => setCidadesBusca(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 w-40"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-800">
                    {[
                      { key: "nome", label: lang === "PT" ? "Cidade" : "City" },
                      { key: "uf", label: "State" },
                      { key: "tipo", label: lang === "PT" ? "Tipo" : "Type" },
                      { key: "score_oportunidade", label: "Score" },
                      { key: "populacao", label: "Pop." },
                      { key: "dentistas_por_100k", label: "Dent/100k" },
                      { key: "mediana_renda", label: lang === "PT" ? "Renda" : "Income" },
                      { key: "penetracao_dso", label: "DSO%" },
                      { key: "crescimento_pop_pct", label: lang === "PT" ? "Cresc." : "Growth" },
                      { key: "especialidade_mais_carente", label: lang === "PT" ? "Carência" : "Needed" },
                    ].map(({ key, label }) => (
                      <th
                        key={key}
                        onClick={() => handleCidadesSort(key)}
                        className="text-left py-3 px-2 text-slate-400 font-medium cursor-pointer hover:text-white select-none whitespace-nowrap"
                      >
                        <span className="flex items-center gap-1">
                          {label}
                          {cidadesSort.col === key && cidadesSort.dir === "desc" && <ArrowDown className="w-3 h-3" />}
                          {cidadesSort.col === key && cidadesSort.dir === "asc" && <ArrowUp className="w-3 h-3" />}
                          {cidadesSort.col !== key && <ArrowUpDown className="w-3 h-3 opacity-30" />}
                        </span>
                      </th>
                    ))}
                    <th className="text-center py-3 px-2 text-slate-400 font-medium">HPSA</th>
                  </tr>
                </thead>
                <tbody>
                  {cidadesDisplay.map((c, i) => (
                    <tr
                      key={`${c.nome}-${c.uf}`}
                      onClick={() => setSelectedUF(c.uf)}
                      className="border-b border-slate-800/30 hover:bg-slate-800/30 cursor-pointer"
                    >
                      <td className="py-2.5 px-2">
                        <div>
                          <p className="text-white font-medium">{c.nome}</p>
                          <p className="text-slate-600 text-[10px] line-clamp-1 max-w-[200px]">{c.nota}</p>
                        </div>
                      </td>
                      <td className="py-2.5 px-2 text-slate-400 font-mono">{c.uf}</td>
                      <td className="py-2.5 px-2">
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                          c.tipo === "Metro" ? "bg-red-900/30 text-red-400" :
                          c.tipo === "Suburban" ? "bg-orange-900/30 text-orange-400" :
                          c.tipo === "Secondary" ? "bg-yellow-900/30 text-yellow-400" :
                          c.tipo === "Rural" ? "bg-green-900/30 text-green-400" :
                          "bg-blue-900/30 text-blue-400"
                        }`}>{c.tipo}</span>
                      </td>
                      <td className="py-2.5 px-2">
                        <span className={`font-bold text-sm ${
                          c.score_oportunidade >= 70 ? "text-emerald-400" :
                          c.score_oportunidade >= 55 ? "text-yellow-400" :
                          "text-red-400"
                        }`}>{c.score_oportunidade}</span>
                      </td>
                      <td className="py-2.5 px-2 text-slate-300">
                        {c.populacao >= 1e6 ? `${(c.populacao / 1e6).toFixed(1)}M` : c.populacao >= 1e3 ? `${(c.populacao / 1e3).toFixed(0)}k` : c.populacao}
                      </td>
                      <td className="py-2.5 px-2 text-slate-300">{c.dentistas_por_100k}</td>
                      <td className="py-2.5 px-2 text-slate-300">${(c.mediana_renda / 1000).toFixed(0)}k</td>
                      <td className="py-2.5 px-2">
                        <span className={c.penetracao_dso <= 10 ? "text-emerald-400" : c.penetracao_dso <= 20 ? "text-slate-300" : "text-red-400"}>
                          {c.penetracao_dso}%
                        </span>
                      </td>
                      <td className="py-2.5 px-2">
                        <span className={c.crescimento_pop_pct >= 1 ? "text-emerald-400" : c.crescimento_pop_pct >= 0 ? "text-slate-300" : "text-red-400"}>
                          {c.crescimento_pop_pct > 0 ? "+" : ""}{c.crescimento_pop_pct.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-blue-400">{c.especialidade_mais_carente}</td>
                      <td className="py-2.5 px-2 text-center">
                        {c.hpsa ? (
                          <span className="px-1.5 py-0.5 bg-red-900/50 text-red-300 text-[10px] rounded font-medium">HPSA</span>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {cidadesTotal > 50 && !cidadesShowAll && (
              <button
                onClick={() => setCidadesShowAll(true)}
                className="mt-4 w-full py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-slate-300 font-medium transition-colors"
              >
                {lang === "PT" ? `Mostrar todas as ${cidadesTotal} cidades` : `Show all ${cidadesTotal} cities`}
              </button>
            )}
            {cidadesShowAll && cidadesTotal > 50 && (
              <button
                onClick={() => setCidadesShowAll(false)}
                className="mt-4 w-full py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-slate-300 font-medium transition-colors"
              >
                {lang === "PT" ? "Mostrar apenas top 50" : "Show top 50 only"}
              </button>
            )}
            <p className="text-slate-600 text-xs mt-3">
              {lang === "PT"
                ? "Clique em uma linha para abrir os detalhes completos do estado. Score 70+ = excelente oportunidade, 55-69 = boa, <55 = competitivo."
                : "Click a row to open full state details. Score 70+ = excellent opportunity, 55-69 = good, <55 = competitive."}
            </p>
          </div>

          {/* Financial Planning */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
            <h2 className="text-white font-semibold mb-1">Financial Planning by Region</h2>
            <p className="text-slate-500 text-xs mb-6">
              Practice startup cost, revenue, and return estimates by US region — solo FTE dentist, primary market, general practice. Source: ADAA, ADA HPI, CoStar 2023.
            </p>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} h="h-48" />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {usCustos.map((r) => (
                  <div key={r.regiao} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
                    <h3 className="text-white text-sm font-semibold mb-3 leading-snug">{r.regiao}</h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Startup Cost</span>
                        <span className="text-white font-medium">${r.startup_min}k – ${r.startup_max}k</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Monthly Rent</span>
                        <span className="text-white">${r.aluguel_mensal.toLocaleString()}/mo</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Avg Annual Revenue</span>
                        <span className="text-emerald-400 font-medium">${(r.receita_media_anual / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Fee per Visit</span>
                        <span className="text-slate-200">${r.honorario_medio_visita}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Break-even</span>
                        <span className="text-blue-400">{r.pacientes_break_even_dia} pts/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Est. ROI</span>
                        <span className="text-amber-400 font-medium">{r.retorno_investimento_anos} years</span>
                      </div>
                      <div className="pt-1 border-t border-slate-700 flex justify-between">
                        <span className="text-slate-400">Avg Equipment</span>
                        <span className="text-slate-300">${r.equipamento_medio}k</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="text-slate-600 text-xs mt-4">
              * Estimates based on solo FTE general practice, leasing ~1,200–1,500 sqft. Revenue varies by specialty mix, payer ratio and patient volume. Equipment costs include chairs, imaging, CAD/CAM.
              Acquisition of existing practice typically achieves break-even faster than de novo startup.
            </p>
          </div>

          {/* Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
            <h2 className="text-white font-semibold mb-1">Location Evaluation Checklist</h2>
            <p className="text-slate-500 text-xs mb-4">Key factors to evaluate before opening a practice in any US market</p>
            <div className="space-y-2">
              {(loading ? [] : usChecklist).map((cat) => (
                <div key={cat.categoria} className="border border-slate-800 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenChecklist(openChecklist === cat.categoria ? null : cat.categoria)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-800/50 transition-colors"
                  >
                    <span className="text-white text-sm font-medium">{cat.categoria}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-xs">{cat.items.length} items</span>
                      {openChecklist === cat.categoria
                        ? <ChevronUp className="w-4 h-4 text-slate-400" />
                        : <ChevronDown className="w-4 h-4 text-slate-400" />
                      }
                    </div>
                  </button>
                  {openChecklist === cat.categoria && (
                    <div className="px-4 pb-4 space-y-2">
                      {cat.items.map((item: string, i: number) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                          <span className="text-slate-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Methodology */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
            <h2 className="text-white font-semibold mb-2">Score Methodology (USA)</h2>
            <p className="text-slate-400 text-xs mb-5">
              The composite score combines 6 normalized dimensions (0–100). Scores are <strong className="text-slate-300">recomputed dynamically</strong> whenever
              underlying data is updated via the quarterly cron job (Census API + manual factor updates in Supabase).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { pct: 25, label: "Workforce Shortage", desc: "Dentists per 100k (inverse) + HPSA designation count. Lower dentist density = higher score." },
                { pct: 20, label: "Insurance Access", desc: "% adults without dental insurance + Medicaid reimbursement index. More uninsured + better Medicaid = opportunity." },
                { pct: 20, label: "Economic Potential", desc: "Median household income. Sweet spot: $50k–$75k. Too low = payment risk; too high = saturated market." },
                { pct: 15, label: "Market Growth", desc: "5-year population growth %. Positive growth drives new patient demand and practice value." },
                { pct: 10, label: "Business Environment", desc: "Commercial rent cost index. Lower relative rent = better operating margin and faster ROI." },
                { pct: 10, label: "DSO Competition", desc: "Inverse of DSO market penetration %. Lower corporate share = better environment for independent practices." },
              ].map(({ pct, label, desc }) => (
                <div key={label} className="bg-slate-800 rounded-lg p-4">
                  <div className="text-blue-400 font-bold text-2xl mb-1">{pct}%</div>
                  <div className="text-white text-sm font-medium mb-1">{label}</div>
                  <div className="text-slate-500 text-xs">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ BRAZIL TAB ═══════════════ */}
      {country === "BR" && (
        <div className="space-y-8">
          {/* KPI Row 1 */}
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <Skeleton h="h-3" w="w-2/3" /><Skeleton h="h-7" w="w-1/2" /><Skeleton h="h-3" w="w-3/4" />
                </div>
              ))}
            </div>
          ) : brIndicadores && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title={t("onde_mun_sem_cd", lang)} value={brIndicadores.municipiosSemDentista} icon={AlertTriangle} color="red" subtitle={t("onde_nenhum_cd", lang)} />
                <StatCard title={t("onde_pop_desass", lang)} value={`${brIndicadores.populacaoDesassistida_mi} mi`} icon={Users} color="red" subtitle={t("onde_sem_acesso", lang)} />
                <StatCard title={t("onde_score_medio", lang)} value={`${brIndicadores.scoreMedioNacional}/100`} icon={Target} color="yellow" subtitle={t("onde_oport_media", lang)} />
                <StatCard title={t("onde_mun_oport", lang)} value={brIndicadores.municipiosOportunidade.toLocaleString("pt-BR")} icon={MapPin} color="green" subtitle="Score > 50" />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title={t("onde_estado_oport", lang)} value={brIndicadores.estadoMaisOportunidades} icon={Compass} color="blue" subtitle="Pará lidera o ranking" />
                <StatCard title={t("onde_espec_carente", lang)} value={brIndicadores.especialidadeMaisCarente} icon={TrendingUp} color="purple" subtitle="Maior déficit nacional" />
                <StatCard title={t("onde_score_max", lang)} value={brIndicadores.scoreMáximoEncontrado} icon={Award} color="green" subtitle="Breves/PA" />
                <StatCard title={t("onde_pipeline", lang)} value={brIndicadores.pipelineFormandosAno.toLocaleString("pt-BR")} icon={GraduationCap} color="cyan" subtitle={t("onde_novos_cds", lang)} />
              </div>
            </>
          )}

          {/* Alert BR */}
          <div className="bg-red-600/10 border border-red-600/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-red-400 font-semibold text-sm">
                  412 municípios brasileiros não possuem nenhum dentista registrado
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Essas localidades representam 23,4 milhões de habitantes sem acesso a atendimento odontológico. As regiões Norte e Nordeste concentram 78% desses municípios.
                  Há oportunidades reais para profissionais dispostos a atuar fora dos grandes centros — incluindo incentivos via PSF e equipes de saúde bucal do SUS.
                </p>
              </div>
            </div>
          </div>

          {/* Charts BR */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
              <h2 className="text-white font-semibold mb-1">{t("onde_top15", lang)}</h2>
              <p className="text-slate-500 text-xs mb-4">{t("onde_top15_sub", lang)}</p>
              {loading ? <Skeleton h="h-96" /> : (
                <ResponsiveContainer width="100%" height={420}>
                  <BarChart data={brTop15} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 10 }} />
                    <YAxis type="category" dataKey="municipio" width={110} tick={{ fill: "#94a3b8", fontSize: 10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="score_oportunidade" name={t("onde_score_label", lang)} radius={[0, 4, 4, 0]}>
                      {brTop15.map((m, i) => (
                        <Cell key={i} fill={scoreBarColor(m.score_oportunidade)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
              <h2 className="text-white font-semibold mb-1">{t("onde_scatter", lang)}</h2>
              <p className="text-slate-500 text-xs mb-4">{t("onde_scatter_sub", lang)}</p>
              {loading ? <Skeleton h="h-96" /> : (
                <ResponsiveContainer width="100%" height={420}>
                  <ScatterChart margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis type="number" dataKey="x" name={t("onde_renda", lang)} tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `R$${v}`} />
                    <YAxis type="number" dataKey="y" name={t("onde_score_label", lang)} domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 10 }} />
                    <ZAxis type="number" dataKey="z" range={[40, 400]} name={t("onde_pop_label", lang)} />
                    <Tooltip content={({ active, payload }: any) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm">
                          <p className="text-white font-medium">{d.name}</p>
                          <p className="text-slate-400">{t("onde_renda", lang)}: R$ {d.x?.toLocaleString("pt-BR")}</p>
                          <p className="text-slate-400">{t("onde_score_label", lang)}: {d.y}</p>
                          <p className="text-slate-400">{t("onde_pop_label", lang)}: {d.z?.toLocaleString("pt-BR")}</p>
                        </div>
                      );
                    }} />
                    <Scatter data={brScatterData}>
                      {brScatterData.map((d, i) => (
                        <Cell key={i} fill={scoreBarColor(d.y)} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Especialidades BR */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-white font-semibold">{t("onde_saturacao_esp", lang)}</h2>
                <p className="text-slate-500 text-xs">{t("onde_sat_sub", lang)}</p>
              </div>
              <input
                type="text" placeholder={t("onde_buscar_esp", lang)}
                value={brBuscaEsp} onChange={(e) => setBrBuscaEsp(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 w-full sm:w-64"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_especialidade", lang)}</th>
                    <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_media_nac", lang)}</th>
                    <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_mais_saturada", lang)}</th>
                    <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_maior_oport", lang)}</th>
                    <th className="text-center py-3 px-3 text-slate-400 font-medium">{t("col_tendencia", lang)}</th>
                  </tr>
                </thead>
                <tbody>
                  {(loading ? [] : brEspFiltradas).map((e) => (
                    <tr key={e.especialidade} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="py-3 px-3 text-white font-medium">{e.especialidade}</td>
                      <td className="py-3 px-3 text-right text-slate-300">{e.media_nacional}/100k</td>
                      <td className="py-3 px-3 text-red-400 text-xs">{e.top5_saturadas[0]?.cidade} ({e.top5_saturadas[0]?.valor})</td>
                      <td className="py-3 px-3 text-emerald-400 text-xs">{e.top5_oportunidades[0]?.cidade} ({e.top5_oportunidades[0]?.valor})</td>
                      <td className="py-3 px-3 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${classBadge(e.tendencia)}`}>{e.tendencia}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ranking estados BR */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-white font-semibold">{t("onde_ranking_estado", lang)}</h2>
                <p className="text-slate-500 text-xs">{t("onde_rank_sub", lang)}</p>
              </div>
              <input
                type="text" placeholder={t("onde_buscar_estado", lang)}
                value={brBuscaEstado} onChange={(e) => setBrBuscaEstado(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 w-full sm:w-64"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_uf", lang)}</th>
                    <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_estado", lang)}</th>
                    <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_score_medio", lang)}</th>
                    <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_melhor_mun", lang)}</th>
                    <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_pior_mun", lang)}</th>
                    <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_pct_sem_acesso", lang)}</th>
                  </tr>
                </thead>
                <tbody>
                  {(loading ? [] : brEstadosFiltrados).map((e) => (
                    <tr key={e.uf} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="py-3 px-3 text-slate-300 font-mono">{e.uf}</td>
                      <td className="py-3 px-3 text-white">{e.estado}</td>
                      <td className={`py-3 px-3 text-right font-bold ${scoreColor(e.score_medio)}`}>{e.score_medio}</td>
                      <td className="py-3 px-3 text-emerald-400 text-xs">{e.melhor_municipio}</td>
                      <td className="py-3 px-3 text-red-400 text-xs">{e.pior_municipio}</td>
                      <td className="py-3 px-3 text-right text-slate-300">{e.populacao_sem_acesso_pct}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Metodologia BR */}
          {brCriterios && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
              <h2 className="text-white font-semibold mb-4">{t("onde_metodologia", lang)}</h2>
              <p className="text-slate-400 text-xs mb-4">{t("onde_met_sub", lang)}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {Object.entries(brCriterios).map(([key, peso]) => {
                  const labels: Record<string, string> = {
                    saturacao: "Saturação Profissional",
                    demanda_epidemiologica: "Demanda Epidemiológica",
                    potencial_economico: "Potencial Econômico",
                    cobertura_sus: "Cobertura SUS",
                    pipeline_formandos: "Pipeline Formandos",
                  };
                  const descs: Record<string, string> = {
                    saturacao: "Inverso da razão dentista/hab. Menos dentistas = mais pontos",
                    demanda_epidemiologica: "CPO-D, edentulismo, doenças bucais prevalentes",
                    potencial_economico: "Renda per capita, IDH, crescimento econômico",
                    cobertura_sus: "Inverso da cobertura ESB — menos cobertura = oportunidade",
                    pipeline_formandos: "Inverso do nº de formandos locais — menos pipeline = melhor",
                  };
                  return (
                    <div key={key} className="bg-slate-800 rounded-lg p-4">
                      <div className="text-blue-400 font-bold text-2xl mb-1">{peso as number}%</div>
                      <div className="text-white text-sm font-medium mb-1">{labels[key]}</div>
                      <div className="text-slate-500 text-xs">{descs[key]}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      <EstadoUSADrawer
        uf={selectedUF}
        onClose={() => setSelectedUF(null)}
      />
    </AppShell>
  );
}
