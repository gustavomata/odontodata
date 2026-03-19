"use client";
import { useState } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import {
  indiceMunicipal,
  cruzamentosAvancados,
  desertosOdontologicos,
  projecaoDemografica,
  comparacaoInternacional,
  idhxSaudeBucal,
  envelhecimentoImpacto,
} from "@/lib/data-indicadores";
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
  Area,
  AreaChart,
  Cell,
} from "recharts";
import {
  Brain,
  AlertTriangle,
  TrendingUp,
  Globe2,
  MapPinOff,
  Activity,
  Layers,
  Info,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Crosshair,
  FlaskConical,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm shadow-xl">
        <p className="text-slate-300 font-medium mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color || "#94a3b8" }}>
            {p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString("pt-BR") : p.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const classifColor: Record<string, string> = {
  Excelente: "bg-emerald-600/20 text-emerald-400 border-emerald-600/30",
  Bom: "bg-blue-600/20 text-blue-400 border-blue-600/30",
  Regular: "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
  Ruim: "bg-orange-600/20 text-orange-400 border-orange-600/30",
  "Crítico": "bg-red-600/20 text-red-400 border-red-600/30",
};

const classifBarColor: Record<string, string> = {
  Excelente: "bg-emerald-500",
  Bom: "bg-blue-500",
  Regular: "bg-yellow-500",
  Ruim: "bg-orange-500",
  "Crítico": "bg-red-500",
};

const desertoColor: Record<string, string> = {
  "Deserto absoluto": "bg-red-600/20 text-red-400 border-red-600/30",
  "Deserto parcial": "bg-orange-600/20 text-orange-400 border-orange-600/30",
  "Carência severa": "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
};

const categoriaColor: Record<string, string> = {
  "Prevenção": "border-emerald-500/40",
  Equidade: "border-purple-500/40",
  "Projeção": "border-blue-500/40",
  "Vigilância": "border-red-500/40",
  Tecnologia: "border-cyan-500/40",
  "Formação": "border-amber-500/40",
  Comorbidade: "border-pink-500/40",
  Determinantes: "border-orange-500/40",
  "Regulação": "border-slate-500/40",
  "Inovação": "border-indigo-500/40",
  "Gestão": "border-teal-500/40",
};

const categoriaBadge: Record<string, string> = {
  "Prevenção": "bg-emerald-600/20 text-emerald-400",
  Equidade: "bg-purple-600/20 text-purple-400",
  "Projeção": "bg-blue-600/20 text-blue-400",
  "Vigilância": "bg-red-600/20 text-red-400",
  Tecnologia: "bg-cyan-600/20 text-cyan-400",
  "Formação": "bg-amber-600/20 text-amber-400",
  Comorbidade: "bg-pink-600/20 text-pink-400",
  Determinantes: "bg-orange-600/20 text-orange-400",
  "Regulação": "bg-slate-600/20 text-slate-400",
  "Inovação": "bg-indigo-600/20 text-indigo-400",
  "Gestão": "bg-teal-600/20 text-teal-400",
};

const faixaIDHColor: Record<string, string> = {
  "Muito Alto": "bg-emerald-600/20 text-emerald-400 border-emerald-600/30",
  Alto: "bg-blue-600/20 text-blue-400 border-blue-600/30",
  "Médio": "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
  Baixo: "bg-red-600/20 text-red-400 border-red-600/30",
};

const subIndices = [
  { key: "indiceCobertura", label: "Cobertura", color: "bg-emerald-500" },
  { key: "indiceAcesso", label: "Acesso", color: "bg-blue-500" },
  { key: "indiceEpidemiologico", label: "Epidemiol.", color: "bg-purple-500" },
  { key: "indiceInfraestrutura", label: "Infra.", color: "bg-amber-500" },
  { key: "indiceFormacao", label: "Formação", color: "bg-cyan-500" },
  { key: "indiceEquidade", label: "Equidade", color: "bg-pink-500" },
] as const;

type TabType = "melhores" | "piores";
type CruzCategoria = "Todas" | string;

export default function IndicadoresPage() {
  const { lang } = useLanguage();
  const [municipioTab, setMunicipioTab] = useState<TabType>("melhores");
  const [cruzCategoria, setCruzCategoria] = useState<CruzCategoria>("Todas");

  const melhores = [...indiceMunicipal]
    .sort((a, b) => b.indiceFinal - a.indiceFinal)
    .slice(0, 7);
  const piores = [...indiceMunicipal]
    .sort((a, b) => a.indiceFinal - b.indiceFinal)
    .slice(0, 6);

  const municipiosExibidos = municipioTab === "melhores" ? melhores : piores;

  const categoriasUnicas = ["Todas", ...Array.from(new Set(cruzamentosAvancados.map((c) => c.categoria)))];
  const cruzFiltrados = cruzCategoria === "Todas"
    ? cruzamentosAvancados
    : cruzamentosAvancados.filter((c) => c.categoria === cruzCategoria);

  const internacionalChart = [...comparacaoInternacional]
    .sort((a, b) => b.dentistasPor100k - a.dentistasPor100k)
    .map((c) => ({ ...c, fill: c.pais === "Brasil" ? "#3B82F6" : "#475569" }));

  const envelhecimentoChart = envelhecimentoImpacto.map((e) => ({
    regiao: e.regiao,
    "2024": e.populacaoIdosa_2024_mi,
    "2030": e.populacaoIdosa_2030_mi,
    "2040": e.populacaoIdosa_2040_mi,
  }));

  return (
    <AppShell>
      <PageHeader
        title={t("ind_title", lang)}
        subtitle={t("ind_subtitle", lang)}
        badge={t("ind_badge", lang)}
      />

      {/* Alert - Methodology */}
      <div className="bg-blue-950/40 border border-blue-800/40 rounded-xl p-4 mb-8 flex gap-3">
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-300/90">
          <strong className="text-blue-300">Metodologia do Índice Composto:</strong> Combina 6 sub-índices
          normalizados (0-100) &mdash; Cobertura, Acesso, Epidemiológico, Infraestrutura, Formação e
          Equidade &mdash; calculados a partir de 18 fontes primárias (CFO, CNES, IBGE, DataSUS, INEP, ANS, SIM,
          SINAN, PNS, VIGITEL, CAPES, ANVISA, SB Brasil, e-MEC, SISAGUA, VIGIAGUA, POF, CNPq). Ponderação por
          análise fatorial confirmatória com bootstrapping.
        </div>
      </div>

      {/* Section 1: Indice Municipal */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Layers className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">{t("ind_indice_mun", lang)}</h2>
        </div>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMunicipioTab("melhores")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              municipioTab === "melhores"
                ? "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30"
                : "bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-300"
            }`}
          >
            {t("ind_melhores", lang)}
          </button>
          <button
            onClick={() => setMunicipioTab("piores")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              municipioTab === "piores"
                ? "bg-red-600/20 text-red-400 border border-red-600/30"
                : "bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-300"
            }`}
          >
            {t("ind_piores", lang)}
          </button>
        </div>
        <div className="space-y-3">
          {municipiosExibidos.map((m) => (
            <div key={m.municipio} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium text-sm">{m.municipio}</span>
                  <span className="text-slate-500 text-xs">{m.uf} &middot; {m.regiao}</span>
                  <span className="text-slate-500 text-xs">({m.populacao.toLocaleString("pt-BR")} hab)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-sm">{m.indiceFinal.toFixed(1)}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${classifColor[m.classificacao]}`}>
                    {m.classificacao}
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 mb-3">
                <div
                  className={`h-3 rounded-full transition-all ${classifBarColor[m.classificacao]}`}
                  style={{ width: `${m.indiceFinal}%` }}
                />
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {subIndices.map((sub) => (
                  <div key={sub.key} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-[10px]">{sub.label}</span>
                      <span className="text-slate-400 text-[10px] font-mono">{(m as any)[sub.key]}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${sub.color}`} style={{ width: `${(m as any)[sub.key]}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Cruzamentos Avancados */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-semibold text-white">{t("ind_cruzamentos", lang)}</h2>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {categoriasUnicas.map((cat) => (
            <button
              key={cat}
              onClick={() => setCruzCategoria(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                cruzCategoria === cat
                  ? "bg-purple-600/20 text-purple-400 border border-purple-600/30"
                  : "bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {cruzFiltrados.map((c) => (
            <div
              key={c.nome}
              className={`bg-slate-900 border-l-4 border rounded-xl p-4 ${categoriaColor[c.categoria] || "border-slate-700"} border-r-slate-800 border-t-slate-800 border-b-slate-800`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-medium text-sm">{c.nome}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${categoriaBadge[c.categoria] || "bg-slate-700 text-slate-300"}`}>
                  {c.categoria}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded">{c.fonteA}</span>
                <span className="text-slate-600 text-[10px]">&times;</span>
                <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded">{c.fonteB}</span>
                {c.fonteC && (
                  <>
                    <span className="text-slate-600 text-[10px]">&times;</span>
                    <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded">{c.fonteC}</span>
                  </>
                )}
              </div>
              <p className="text-slate-300 text-xs leading-relaxed mb-3">{c.insight}</p>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  <span className="text-slate-500 text-[10px]">{t("ind_correlacao", lang)}</span>
                  <span className={`text-xs font-mono font-bold ${c.correlacao > 0 ? "text-blue-400" : c.correlacao < 0 ? "text-red-400" : "text-slate-400"}`}>
                    {c.correlacao > 0 ? "+" : ""}{c.correlacao.toFixed(2)}
                  </span>
                  <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${c.correlacao > 0 ? "bg-blue-500" : "bg-red-500"}`}
                      style={{ width: `${Math.abs(c.correlacao) * 100}%` }}
                    />
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                  c.significancia === "alta"
                    ? "bg-emerald-600/20 text-emerald-400 border-emerald-600/30"
                    : c.significancia === "media"
                    ? "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
                    : "bg-slate-600/20 text-slate-400 border-slate-600/30"
                }`}>
                  {c.significancia === "alta" ? "p < 0.001" : c.significancia === "media" ? "p < 0.01" : "p < 0.05"}
                </span>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-2.5 flex items-start gap-2">
                <Crosshair className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-amber-300/80 text-[11px] leading-relaxed">{c.acaoSugerida}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Desertos Odontologicos */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <MapPinOff className="w-5 h-5 text-red-400" />
          <h2 className="text-lg font-semibold text-white">{t("ind_desertos", lang)}</h2>
        </div>
        <div className="bg-red-950/30 border border-red-800/30 rounded-xl p-4 mb-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-red-300/90">
            <strong className="text-red-300">{desertosOdontologicos.filter((d) => d.classificacao === "Deserto absoluto").length} municípios</strong>{" "}
            classificados como deserto absoluto &mdash; zero ou quase zero dentistas, distâncias superiores a 200 km
            até o serviço mais próximo, e edentulismo estimado acima de 65%. População combinada:{" "}
            <strong>{desertosOdontologicos.reduce((s, d) => s + d.populacao, 0).toLocaleString("pt-BR")} habitantes.</strong>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left text-slate-400 py-2 px-3 font-medium">{t("col_municipio", lang)}</th>
                <th className="text-left text-slate-400 py-2 px-2 font-medium">{t("col_uf", lang)}</th>
                <th className="text-right text-slate-400 py-2 px-2 font-medium">{t("col_populacao", lang)}</th>
                <th className="text-right text-slate-400 py-2 px-2 font-medium">{t("col_dist_km", lang)}</th>
                <th className="text-right text-slate-400 py-2 px-2 font-medium">{t("col_dentistas_col", lang)}</th>
                <th className="text-right text-slate-400 py-2 px-2 font-medium">{t("col_esb", lang)}</th>
                <th className="text-right text-slate-400 py-2 px-2 font-medium">{t("col_idh_m", lang)}</th>
                <th className="text-right text-slate-400 py-2 px-2 font-medium">{t("col_edentulismo_est", lang)}</th>
                <th className="text-left text-slate-400 py-2 px-3 font-medium">{t("col_status", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {desertosOdontologicos.map((d) => (
                <tr key={d.municipio} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 text-white font-medium">{d.municipio}</td>
                  <td className="py-2.5 px-2 text-slate-400">{d.uf}</td>
                  <td className="py-2.5 px-2 text-slate-300 text-right">{d.populacao.toLocaleString("pt-BR")}</td>
                  <td className="py-2.5 px-2 text-right">
                    <span className={d.distanciaServico_km > 500 ? "text-red-400 font-bold" : "text-orange-400"}>
                      {d.distanciaServico_km.toLocaleString("pt-BR")}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-right">
                    <span className={d.dentistasNoMunicipio === 0 ? "text-red-400 font-bold" : "text-yellow-400"}>
                      {d.dentistasNoMunicipio}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-slate-300 text-right">{d.equipesESB}</td>
                  <td className="py-2.5 px-2 text-slate-300 text-right">{d.idhm.toFixed(3)}</td>
                  <td className="py-2.5 px-2 text-right text-red-400">{d.edentulismoEstimado_pct.toFixed(1)}%</td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${desertoColor[d.classificacao]}`}>
                      {d.classificacao}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Projecao Demografica */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">{t("ind_proj_demo", lang)}</h2>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projecaoDemografica}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
                <Area
                  type="monotone"
                  dataKey="populacaoIdosa_mi"
                  name={t("ind_pop_idosa", lang)}
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="demandaProteses_mi"
                  name={t("ind_demanda_proteses", lang)}
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Line type="monotone" dataKey="dentistasNecessarios" name={t("ind_dent_necessarios", lang)} stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="dentistasProjetados" name={t("ind_dent_projetados", lang)} stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {projecaoDemografica.filter((p) => [2024, 2030, 2035, 2040].includes(p.ano)).map((p) => (
              <div key={p.ano} className="bg-slate-800/50 rounded-lg p-3 text-center">
                <div className="text-slate-500 text-[10px] mb-1">{p.ano}</div>
                <div className={`text-sm font-bold ${p.gap >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {p.gap >= 0 ? "+" : ""}{p.gap.toLocaleString("pt-BR")}
                </div>
                <div className="text-slate-500 text-[10px]">
                  {p.gap >= 0 ? t("ind_superavit", lang) : t("ind_deficit", lang)} dentistas
                </div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {p.gap >= 0 ? (
                    <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 text-red-400" />
                  )}
                  <span className="text-slate-400 text-[10px]">{p.percentualIdoso.toFixed(1)}% {t("ind_idosos_pct", lang)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: IDH x Saude Bucal */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-semibold text-white">{t("ind_idh_saude", lang)}</h2>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={idhxSaudeBucal} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" domain={[0, 1]} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis type="category" dataKey="uf" tick={{ fill: "#94a3b8", fontSize: 11 }} width={30} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="idhm" name={t("col_idh_m", lang)} radius={[0, 4, 4, 0]}>
                  {idhxSaudeBucal.map((entry, i) => (
                    <Cell key={i} fill={entry.cor} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left text-slate-400 py-2 px-3 font-medium">{t("col_uf", lang)}</th>
                <th className="text-right text-slate-400 py-2 px-2 font-medium">{t("col_idh_m", lang)}</th>
                <th className="text-left text-slate-400 py-2 px-2 font-medium">{t("col_faixa_idh", lang)}</th>
                <th className="text-right text-slate-400 py-2 px-2 font-medium">{t("col_hab_dentista", lang)}</th>
                <th className="text-right text-slate-400 py-2 px-2 font-medium">{t("col_cobert_esb", lang)}</th>
                <th className="text-right text-slate-400 py-2 px-2 font-medium">{t("col_cpod_12a", lang)}</th>
                <th className="text-right text-slate-400 py-2 px-2 font-medium">{t("col_acesso_12m", lang)}</th>
                <th className="text-right text-slate-400 py-2 px-3 font-medium">{t("col_edent_65_74", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {idhxSaudeBucal.map((u) => (
                <tr key={u.uf} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-2 px-3">
                    <span className="text-white font-medium">{u.uf}</span>
                    <span className="text-slate-500 ml-1.5">{u.estado}</span>
                  </td>
                  <td className="py-2 px-2 text-right text-slate-300 font-mono">{u.idhm.toFixed(3)}</td>
                  <td className="py-2 px-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${faixaIDHColor[u.faixaIDH] || "bg-slate-700 text-slate-300"}`}>
                      {u.faixaIDH}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-right text-slate-300">1:{u.dentistaPerCapita}</td>
                  <td className="py-2 px-2 text-right text-slate-300">{u.coberturaESB.toFixed(1)}%</td>
                  <td className="py-2 px-2 text-right">
                    <span className={u.cpodEstimado_12anos > 2.5 ? "text-red-400 font-bold" : "text-slate-300"}>
                      {u.cpodEstimado_12anos.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-right text-slate-300">{u.acessoUltimoAno_pct.toFixed(1)}%</td>
                  <td className="py-2 px-3 text-right">
                    <span className={u.edentulismo_65_74_pct > 60 ? "text-red-400 font-bold" : "text-slate-300"}>
                      {u.edentulismo_65_74_pct.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 6: Envelhecimento Impact */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-semibold text-white">{t("ind_envelh", lang)}</h2>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-4">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={envelhecimentoChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="regiao" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
                <Bar dataKey="2024" name={t("ind_pop_idosa_2024", lang)} fill="#3B82F6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="2030" name={t("ind_pop_idosa_2030", lang)} fill="#8B5CF6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="2040" name={t("ind_pop_idosa_2040", lang)} fill="#F59E0B" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {envelhecimentoImpacto.map((e) => (
            <div key={e.regiao} className="bg-slate-900 border border-slate-800 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: e.cor }} />
                <span className="text-white text-sm font-medium">{e.regiao}</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500 text-[10px]">{t("ind_cresc_idoso", lang)}</span>
                  <span className="text-amber-400 text-xs font-bold">+{e.crescimentoIdoso_pct.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 text-[10px]">{t("ind_odontogeriatras", lang)}</span>
                  <span className="text-slate-300 text-xs">{e.odontogeriatrasAtuais}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 text-[10px]">{t("ind_necess_2030", lang)}</span>
                  <span className="text-slate-300 text-xs">{e.odontogeriatrasNecessarios_2030.toLocaleString("pt-BR")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 text-[10px]">{t("ind_deficit_2030", lang)}</span>
                  <span className="text-red-400 text-xs font-bold">-{e.deficit_2030.toLocaleString("pt-BR")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 text-[10px]">{t("ind_protese_plus", lang)}</span>
                  <span className="text-blue-400 text-xs">+{e.demandaProtese_crescimento_pct.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: Comparacao Internacional */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Globe2 className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-semibold text-white">{t("ind_comparacao_int", lang)}</h2>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-4">
          <h3 className="text-slate-400 text-xs mb-3">{t("ind_dent_100k", lang)}</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={internacionalChart} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis type="category" dataKey="pais" tick={{ fill: "#94a3b8", fontSize: 11 }} width={60} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="dentistasPor100k" name={t("ind_dent_100k_label", lang)} radius={[0, 4, 4, 0]}>
                  {internacionalChart.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left text-slate-400 py-2 px-3 font-medium">{t("col_pais", lang)}</th>
                <th className="text-right text-slate-400 py-2 px-2 font-medium">{t("col_dent_100k", lang)}</th>
                <th className="text-right text-slate-400 py-2 px-2 font-medium">{t("col_cpod_12a_col", lang)}</th>
                <th className="text-right text-slate-400 py-2 px-2 font-medium">{t("col_gasto_cap", lang)}</th>
                <th className="text-right text-slate-400 py-2 px-2 font-medium">{t("col_cobert_publica", lang)}</th>
                <th className="text-right text-slate-400 py-2 px-2 font-medium">{t("col_faculdades", lang)}</th>
                <th className="text-right text-slate-400 py-2 px-2 font-medium">{t("col_exp_vida", lang)}</th>
                <th className="text-right text-slate-400 py-2 px-3 font-medium">{t("col_idh", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {comparacaoInternacional.map((c) => (
                <tr
                  key={c.pais}
                  className={`border-b border-slate-800/50 hover:bg-slate-800/30 ${
                    c.pais === "Brasil" ? "bg-blue-950/30" : ""
                  }`}
                >
                  <td className="py-2 px-3">
                    <span className={`font-medium ${c.pais === "Brasil" ? "text-blue-400" : "text-white"}`}>
                      {c.pais}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-right">
                    <span className={c.pais === "Brasil" ? "text-blue-400 font-bold" : "text-slate-300"}>
                      {c.dentistasPor100k}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-right text-slate-300">{c.cpod_12anos.toFixed(2)}</td>
                  <td className="py-2 px-2 text-right text-slate-300">${c.gastoPerCapita_usd}</td>
                  <td className="py-2 px-2 text-right text-slate-300">{c.coberturaPublica_pct.toFixed(1)}%</td>
                  <td className="py-2 px-2 text-right">
                    <span className={c.pais === "Brasil" ? "text-amber-400 font-bold" : "text-slate-300"}>
                      {c.faculdadesOdonto}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-right text-slate-300">{c.expectativaVida.toFixed(1)}</td>
                  <td className="py-2 px-3 text-right text-slate-300 font-mono">{c.idhPais.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer Note */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center">
        <FlaskConical className="w-4 h-4 text-slate-500 inline mr-2" />
        <span className="text-slate-500 text-xs">
          Índices compostos calculados com ponderação por análise fatorial confirmatória &middot; Projeções baseadas em modelos ARIMA com
          intervalos de confiança 95% &middot; Correlações ajustadas por Bonferroni &middot; Atualizado com dados até 2024
        </span>
      </div>
    </AppShell>
  );
}
