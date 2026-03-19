"use client";
import { useState, useMemo } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import CountrySelector from "@/components/CountrySelector";
import {
  prevalenciaRegional,
  cancerBucalPorUF,
  tendenciasEpidemiologicas,
  doencasBucais,
  fluoretacaoImpacto,
  determinantesSociais,
  indicadoresEpidemiologia,
} from "@/lib/data-epidemiologia";
import { epidemiologiaUSA } from "@/lib/data-usa";
import { epidemiologiaDE } from "@/lib/data-germany";
import { epidemiologiaUK } from "@/lib/data-uk";
import { epidemiologiaFR } from "@/lib/data-france";
import { epidemiologiaCA } from "@/lib/data-canada";
import { epidemiologiaJP } from "@/lib/data-japan";
import {
  Activity,
  AlertCircle,
  HeartPulse,
  Skull,
  UserX,
  Search,
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
  Cell,
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";
type PaisCode = "BR" | "US" | "DE" | "UK" | "FR" | "CA" | "JP";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm">
        <p className="text-slate-300 font-medium mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CORES_CATEGORIAS: Record<string, string> = {
  Renda: "#3B82F6",
  Escolaridade: "#10B981",
  "Localização": "#F59E0B",
  "Raça/cor": "#8B5CF6",
};

const corTendencia = (trend: string) => {
  if (trend === "aumentando" || trend === "increasing") return "bg-red-500/20 text-red-400";
  if (trend === "diminuindo" || trend === "decreasing") return "bg-green-500/20 text-green-400";
  return "bg-slate-500/20 text-slate-400";
};

const corImpacto = (i: string) => {
  if (i === "alto") return "text-red-400";
  if (i === "medio") return "text-amber-400";
  return "text-slate-400";
};

const COUNTRY_META: Record<PaisCode, { badge: string; source: string }> = {
  BR: { badge: "SB Brasil 2010 / SB+", source: "Ministério da Saúde / INCA" },
  US: { badge: "CDC NHANES 2017-2020", source: "CDC / NIH / ADA Health Policy Institute" },
  DE: { badge: "IDZ DMS V / RKI GEDA 2021", source: "Institut der Deutschen Zahnärzte / RKI" },
  UK: { badge: "NHS ADHS / OHID 2022", source: "NHS England / Office for Health Disparities" },
  FR: { badge: "InVS / ONCD Enquête 2019", source: "Santé Publique France / ONCD" },
  CA: { badge: "CHMS / CIHI 2018-2019", source: "Statistics Canada / CIHI" },
  JP: { badge: "MHLW Dental Disease Survey 2022", source: "厚生労働省 歯科疾患実態調査" },
};

export default function EpidemiologiaPage() {
  const { lang } = useLanguage();
  const [pais, setPais] = useState<PaisCode>("BR");
  const [buscaDoenca, setBuscaDoenca] = useState("");
  const [buscaCancer, setBuscaCancer] = useState("");

  const intlData = useMemo(() => {
    if (pais === "US") return epidemiologiaUSA;
    if (pais === "DE") return epidemiologiaDE;
    if (pais === "UK") return epidemiologiaUK;
    if (pais === "FR") return epidemiologiaFR;
    if (pais === "CA") return epidemiologiaCA;
    if (pais === "JP") return epidemiologiaJP;
    return null;
  }, [pais]);

  const meta = COUNTRY_META[pais];

  // BR-specific filtered data
  const doencasFiltradas = doencasBucais.filter((d) =>
    d.doenca.toLowerCase().includes(buscaDoenca.toLowerCase())
  );
  const cancerSorted = [...cancerBucalPorUF]
    .sort((a, b) => b.incidencia_100k - a.incidencia_100k)
    .filter(
      (c) =>
        c.uf.toLowerCase().includes(buscaCancer.toLowerCase()) ||
        c.estado.toLowerCase().includes(buscaCancer.toLowerCase())
    );

  return (
    <AppShell>
      <PageHeader
        title={t("epid_title", lang)}
        subtitle={t("epid_subtitle", lang)}
        badge={meta.badge}
      />

      <CountrySelector value={pais} onChange={(c) => setPais(c as PaisCode)} countries={["BR", "US", "DE", "UK", "FR", "CA", "JP"]} />

      {/* ── BRAZIL ─────────────────────────────────────────────────────────── */}
      {pais === "BR" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard title={t("epid_cpod", lang)} value={indicadoresEpidemiologia.cpodBrasil_12anos} subtitle={indicadoresEpidemiologia.classificacaoOMS} icon={Activity} color="blue" />
            <StatCard title={t("epid_edentulismo", lang)} value={`${indicadoresEpidemiologia.edentulismoBrasil_65_74}%`} subtitle={t("epid_perda_dentes", lang)} icon={Skull} color="red" />
            <StatCard title={t("epid_nunca", lang)} value={`${(indicadoresEpidemiologia.populacaoNuncaDentista / 1000000).toFixed(1)} mi`} subtitle={`${indicadoresEpidemiologia.percentualNuncaDentista}% da população`} icon={UserX} color="yellow" />
            <StatCard title={t("epid_cancer", lang)} value={indicadoresEpidemiologia.casosNovosCanBucal_ano.toLocaleString("pt-BR")} subtitle={`${indicadoresEpidemiologia.obitosCanBucal_ano.toLocaleString("pt-BR")} ${t("epid_obitos", lang)}`} icon={HeartPulse} color="purple" />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
            <h2 className="text-white font-semibold mb-1">{t("epid_tendencia", lang)}</h2>
            <p className="text-slate-500 text-xs mb-4">{t("epid_tendencia_sub", lang)}</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={tendenciasEpidemiologicas} margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
                <Line yAxisId="left" type="monotone" dataKey="cpod_12anos" name={t("epid_cpod_12anos", lang)} stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#3B82F6", r: 4 }} />
                <Line yAxisId="right" type="monotone" dataKey="edentulismo_65_74" name={t("epid_edent_label", lang)} stroke="#EF4444" strokeWidth={2} dot={{ fill: "#EF4444", r: 4 }} />
                <Line yAxisId="right" type="monotone" dataKey="coberturaSaudeBucal" name={t("epid_cobertura_esb", lang)} stroke="#10B981" strokeWidth={2} dot={{ fill: "#10B981", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
              <h2 className="text-white font-semibold mb-1">{t("epid_prevalencia", lang)}</h2>
              <p className="text-slate-500 text-xs mb-4">{t("epid_prev_sub", lang)}</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={prevalenciaRegional}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="regiao" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
                  <Bar dataKey="cpod_12anos" name={t("epid_cpod_12anos", lang)} fill="#3B82F6" radius={[4,4,0,0]} />
                  <Bar dataKey="edentulismo_65_74" name={t("epid_edent_label", lang)} fill="#EF4444" radius={[4,4,0,0]} />
                  <Bar dataKey="doencaPeriodontal_adulto" name={t("epid_period_label", lang)} fill="#F59E0B" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
              <h2 className="text-white font-semibold mb-1">{t("epid_fluoretacao", lang)}</h2>
              <p className="text-slate-500 text-xs mb-4">{t("epid_fluor_sub", lang)}</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={fluoretacaoImpacto}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="faixaPopulacao" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                  <YAxis yAxisId="left" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
                  <Bar yAxisId="left" dataKey="comFluoretacao" name={t("epid_munic_fluor", lang)} fill="#06B6D4" radius={[4,4,0,0]} />
                  <Bar yAxisId="right" dataKey="cpodMedio" name={t("epid_cpod_medio", lang)} fill="#F59E0B" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-amber-600/10 border border-amber-600/30 rounded-xl p-4 mb-8 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-amber-300 font-medium text-sm">{t("epid_desigualdades", lang)}</p>
              <p className="text-amber-400/70 text-xs mt-1">
                A Região Norte apresenta CPO-D de <strong>3.16</strong> aos 12 anos, mais que o dobro do Sudeste (<strong>1.48</strong>).
                O edentulismo entre idosos no Norte (<strong>68.4%</strong>) é 42% superior ao do Sudeste (<strong>48.2%</strong>).
                Pessoas com renda até 1 SM têm 2.7x menos acesso ao dentista comparado a quem ganha mais de 5 SM.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-white font-semibold mb-1">{t("epid_doencas", lang)}</h2>
                <p className="text-slate-500 text-xs">{t("epid_doencas_sub", lang)}</p>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder={t("epid_buscar_doenca", lang)} value={buscaDoenca} onChange={(e) => setBuscaDoenca(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-full sm:w-48" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs">
                    <th className="text-left py-2 px-3">{t("col_doenca", lang)}</th>
                    <th className="text-right py-2 px-3">{t("col_prev_adultos", lang)}</th>
                    <th className="text-right py-2 px-3">{t("col_prev_criancas", lang)}</th>
                    <th className="text-center py-2 px-3">{t("col_tendencia_col", lang)}</th>
                    <th className="text-right py-2 px-3">{t("col_custo_sus_mi", lang)}</th>
                    <th className="text-center py-2 px-3">{t("col_impacto", lang)}</th>
                  </tr>
                </thead>
                <tbody>
                  {doencasFiltradas.map((d) => (
                    <tr key={d.doenca} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 text-slate-200 font-medium">{d.doenca}</td>
                      <td className="py-2.5 px-3 text-right text-slate-300">{d.prevalencia_adultos}%</td>
                      <td className="py-2.5 px-3 text-right text-slate-300">{d.prevalencia_criancas}%</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${corTendencia(d.tendencia)}`}>{d.tendencia}</span>
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-300">R$ {d.custoSUS_estimado_mi.toLocaleString("pt-BR")}</td>
                      <td className={`py-2.5 px-3 text-center font-medium text-xs uppercase ${corImpacto(d.impactoCargaDoenca)}`}>{d.impactoCargaDoenca}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
            <h2 className="text-white font-semibold mb-1">{t("epid_det_sociais", lang)}</h2>
            <p className="text-slate-500 text-xs mb-4">{t("epid_det_sub", lang)}</p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3">
              {Object.entries(CORES_CATEGORIAS).map(([cat, cor]) => (
                <div key={cat} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: cor }} />
                  <span className="text-slate-400 text-xs">{cat}</span>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={determinantesSociais} layout="vertical" margin={{ top: 0, right: 20, left: 70, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="fator" tick={{ fill: "#94a3b8", fontSize: 11 }} width={65} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="acessoDentista" name={t("epid_acesso_dentista", lang)} radius={[0, 4, 4, 0]}>
                  {determinantesSociais.map((d, i) => (
                    <Cell key={i} fill={CORES_CATEGORIAS[d.categoria] || "#64748b"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-white font-semibold mb-1">{t("epid_cancer_uf", lang)}</h2>
                <p className="text-slate-500 text-xs">{t("epid_cancer_sub", lang)}</p>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder={t("epid_buscar_uf", lang)} value={buscaCancer} onChange={(e) => setBuscaCancer(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-full sm:w-52" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs">
                    <th className="text-left py-2 px-3">{t("col_uf", lang)}</th>
                    <th className="text-right py-2 px-3">{t("col_incidencia", lang)}</th>
                    <th className="text-right py-2 px-3">{t("col_mortalidade", lang)}</th>
                    <th className="text-right py-2 px-3">{t("col_razao_mi", lang)}</th>
                    <th className="text-right py-2 px-3">{t("col_diag_precoce", lang)}</th>
                    <th className="text-right py-2 px-3">{t("col_cobertura_ceo", lang)}</th>
                    <th className="text-right py-2 px-3">{t("col_idh", lang)}</th>
                  </tr>
                </thead>
                <tbody>
                  {cancerSorted.map((c) => (
                    <tr key={c.uf} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="py-2.5 px-3">
                        <span className="text-slate-200 font-medium">{c.uf}</span>
                        <span className="text-slate-500 text-xs ml-1.5">{c.estado}</span>
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-300">{c.incidencia_100k}</td>
                      <td className="py-2.5 px-3 text-right text-slate-300">{c.mortalidade_100k}</td>
                      <td className={`py-2.5 px-3 text-right font-medium ${c.razaoMortalidadeIncidencia >= 0.5 ? "text-red-400" : "text-green-400"}`}>{c.razaoMortalidadeIncidencia.toFixed(2)}</td>
                      <td className={`py-2.5 px-3 text-right ${c.diagnosticoPrecoce < 40 ? "text-red-400" : "text-slate-300"}`}>{c.diagnosticoPrecoce}%</td>
                      <td className="py-2.5 px-3 text-right text-slate-300">{c.coberturaCEO}%</td>
                      <td className="py-2.5 px-3 text-right text-slate-400">{c.idh.toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ── USA / GERMANY ──────────────────────────────────────────────────── */}
      {intlData && (
        <>
          {/* Key Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-600/20 border border-slate-800 rounded-xl p-3 md:p-5">
              <p className="text-slate-400 text-xs mb-2">{lang === "PT" ? "CPO-D Adultos (35–44)" : "DMFT Adults (35–44)"}</p>
              <p className="text-blue-400 text-2xl font-bold">{intlData.indicadores.cpodAdultos35_44}</p>
              <p className="text-slate-500 text-xs mt-1">{lang === "PT" ? "índice médio" : "avg index"}</p>
            </div>
            <div className="bg-red-600/20 border border-slate-800 rounded-xl p-3 md:p-5">
              <p className="text-slate-400 text-xs mb-2">{lang === "PT" ? "Edentulismo 65+" : "Edentulism 65+"}</p>
              <p className="text-red-400 text-2xl font-bold">{intlData.indicadores.edentulismo65mais}%</p>
              <p className="text-slate-500 text-xs mt-1">{lang === "PT" ? "perda total de dentes" : "complete tooth loss"}</p>
            </div>
            <div className="bg-amber-600/20 border border-slate-800 rounded-xl p-3 md:p-5">
              <p className="text-slate-400 text-xs mb-2">{lang === "PT" ? "Cárie Não Tratada" : "Untreated Caries"}</p>
              <p className="text-amber-400 text-2xl font-bold">{intlData.indicadores.cariesNaoTratadas}%</p>
              <p className="text-slate-500 text-xs mt-1">{lang === "PT" ? "adultos afetados" : "adults affected"}</p>
            </div>
            <div className="bg-purple-600/20 border border-slate-800 rounded-xl p-3 md:p-5">
              <p className="text-slate-400 text-xs mb-2">{lang === "PT" ? "Periodontite" : "Periodontitis"}</p>
              <p className="text-purple-400 text-2xl font-bold">{intlData.indicadores.periodontiteAdultos}%</p>
              <p className="text-slate-500 text-xs mt-1">{lang === "PT" ? "prevalência adultos" : "adult prevalence"}</p>
            </div>
          </div>

          {/* Historical Trends */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
            <h2 className="text-white font-semibold mb-1">{lang === "PT" ? "Tendências Históricas" : "Historical Trends"}</h2>
            <p className="text-slate-500 text-xs mb-4">{lang === "PT" ? "Evolução dos indicadores epidemiológicos ao longo do tempo" : "Evolution of epidemiological indicators over time"} · {intlData.indicadores.fonteAnno}</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={intlData.tendencias} margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
                <Line yAxisId="left" type="monotone" dataKey="cpod12anos" name={lang === "PT" ? "CPO-D 12 anos" : "DMFT age 12"} stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#3B82F6", r: 4 }} />
                <Line yAxisId="right" type="monotone" dataKey="edentulismo" name={lang === "PT" ? "Edentulismo 65+ (%)" : "Edentulism 65+ (%)"} stroke="#EF4444" strokeWidth={2} dot={{ fill: "#EF4444", r: 4 }} />
                <Line yAxisId="right" type="monotone" dataKey="cariesNaoTratadas" name={lang === "PT" ? "Cárie não tratada (%)" : "Untreated caries (%)"} stroke="#F59E0B" strokeWidth={2} dot={{ fill: "#F59E0B", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Regional Prevalence */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
              <h2 className="text-white font-semibold mb-1">{lang === "PT" ? "Prevalência Regional" : "Regional Prevalence"}</h2>
              <p className="text-slate-500 text-xs mb-4">{lang === "PT" ? "Indicadores por região" : "Key indicators by region"}</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={intlData.prevalenciaPorRegiao}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="regiao" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
                  <Bar dataKey="cpod" name={lang === "PT" ? "CPO-D" : "DMFT"} fill="#3B82F6" radius={[4,4,0,0]} />
                  <Bar dataKey="edentulismo" name={lang === "PT" ? "Edentulismo (%)" : "Edentulism (%)"} fill="#EF4444" radius={[4,4,0,0]} />
                  <Bar dataKey="periodontite" name={lang === "PT" ? "Periodontite (%)" : "Periodontitis (%)"} fill="#F59E0B" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Disease Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
              <h2 className="text-white font-semibold mb-1">{lang === "PT" ? "Doenças Bucais" : "Oral Diseases"}</h2>
              <p className="text-slate-500 text-xs mb-4">{lang === "PT" ? "Prevalência e tendência" : "Prevalence & trend"} · {intlData.indicadores.fonteAnno}</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-xs">
                      <th className="text-left py-2 px-2">{lang === "PT" ? "Doença" : "Disease"}</th>
                      <th className="text-right py-2 px-2">{lang === "PT" ? "Adultos" : "Adults"}</th>
                      <th className="text-right py-2 px-2">{lang === "PT" ? "Crianças" : "Children"}</th>
                      <th className="text-center py-2 px-2">{lang === "PT" ? "Tendência" : "Trend"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {intlData.doencasBucais.map((d) => (
                      <tr key={d.doenca} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                        <td className="py-2 px-2 text-slate-200 font-medium text-xs">{d.doenca}</td>
                        <td className="py-2 px-2 text-right text-slate-300 text-xs">{d.adultos > 0 ? `${d.adultos}%` : "—"}</td>
                        <td className="py-2 px-2 text-right text-slate-300 text-xs">{d.criancas > 0 ? `${d.criancas}%` : "—"}</td>
                        <td className="py-2 px-2 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${corTendencia(d.tendencia)}`}>{d.tendencia}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Never visited dentist */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                <p className="text-slate-400 text-xs mb-1">{lang === "PT" ? "Cárie (histórico)" : "Caries (ever)"}</p>
                <p className="text-blue-400 text-2xl font-bold">{intlData.indicadores.cariesPrevalencia}%</p>
              </div>
              <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                <p className="text-slate-400 text-xs mb-1">{lang === "PT" ? "Nunca foi ao dentista" : "Never visited dentist"}</p>
                <p className="text-amber-400 text-2xl font-bold">{intlData.indicadores.nuncaFoiDentista}%</p>
              </div>
              <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                <p className="text-slate-400 text-xs mb-1">{lang === "PT" ? "CPO-D Idosos (65–74)" : "DMFT Elderly (65–74)"}</p>
                <p className="text-red-400 text-2xl font-bold">{intlData.indicadores.cpodIdosos65_74}</p>
              </div>
              <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                <p className="text-slate-400 text-xs mb-1">{lang === "PT" ? "Cárie não tratada" : "Untreated caries"}</p>
                <p className="text-purple-400 text-2xl font-bold">{intlData.indicadores.cariesNaoTratadas}%</p>
              </div>
            </div>
          </div>

          <p className="text-slate-600 text-xs text-right">{lang === "PT" ? "Fonte" : "Source"}: {meta.source}</p>
        </>
      )}
    </AppShell>
  );
}
