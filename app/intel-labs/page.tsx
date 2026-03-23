"use client";
import { useState } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import CountrySelector from "@/components/CountrySelector";
import {
  labsPorRegiao, desertosLaboratoriais, comparativoValores,
  tpdsPorEstado, tecnologiasEmergentes, serieHistoricaLabs, indicadoresLabs,
} from "@/lib/data-intel-labs";
import {
  indicadoresLabsUSA, labsPorRegiaoUSA, comparativoValoresUSA,
  tecnologiasLabsUSA, serieHistoricaLabsUSA, cdtsPorRegiaoUSA,
  labsPorEstadoUSA,
} from "@/lib/data-intel-labs-intl";
import {
  indicadoresLabsDE, labsPorEstadoDE, comparativoValoresDE,
  tecnologiasLabsDE, serieHistoricaLabsDE,
} from "@/lib/data-intel-labs-intl";
import {
  FlaskConical, Users, AlertTriangle, Clock, TrendingUp, DollarSign, MapPin, Cpu,
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";
type PaisCode = "BR" | "US" | "DE";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm">
        <p className="text-slate-300 font-medium mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color || "#94a3b8" }}>
            {p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const satColor = (s: string) => {
  if (s === "Saturado" || s === "Saturated") return "bg-red-600/20 text-red-400";
  if (s === "Adequado" || s === "Adequate") return "bg-blue-600/20 text-blue-400";
  if (s === "Carente" || s === "Shortage") return "bg-amber-600/20 text-amber-400";
  return "bg-red-600/20 text-red-400";
};

const tendPColor = (t: string) => {
  if (t === "Explosivo") return "bg-purple-600/20 text-purple-400";
  if (t === "Crescente") return "bg-emerald-600/20 text-emerald-400";
  return "bg-blue-600/20 text-blue-400";
};

const tendPriceColor = (t: string) => {
  if (t === "Alta" || t === "Rising" || t === "Steigend") return "bg-red-600/20 text-red-400";
  if (t === "Queda" || t === "Falling" || t === "Sinkend") return "bg-emerald-600/20 text-emerald-400";
  return "bg-blue-600/20 text-blue-400";
};

export default function IntelLabsPage() {
  const { lang } = useLanguage();
  const [pais, setPais] = useState<PaisCode>("BR");

  return (
    <AppShell>
      <PageHeader
        title={t("labs_title", lang)}
        subtitle={t("labs_subtitle", lang)}
        badge={pais === "BR" ? t("labs_badge", lang) : pais === "US" ? "NADL + ADA HPI 2022" : "VDZI + BZÄK 2023"}
      />

      <CountrySelector value={pais} onChange={(c) => setPais(c as PaisCode)} countries={["BR", "US", "DE"]} />

      {/* ══════════════════════════════════════════════════════════ BRAZIL */}
      {pais === "BR" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard title={t("labs_total", lang)} value={indicadoresLabs.totalLabs.toLocaleString("pt-BR")} icon={FlaskConical} color="blue" subtitle={t("labs_laboratorios", lang)} />
            <StatCard title={lang === "PT" ? "TPDs Ativos" : "Active Lab Technicians"} value={indicadoresLabs.tpdsAtivos.toLocaleString("pt-BR")} icon={Users} color="green" subtitle={lang === "PT" ? "registrados CFO · Mar/2025" : "registered CFO · Mar/2025"} />
            <StatCard title={t("labs_producao", lang)} value={indicadoresLabs.producaoMensal} icon={TrendingUp} color="purple" subtitle={t("labs_proteses", lang)} />
            <StatCard title={t("labs_fila", lang)} value={indicadoresLabs.filaEspera} icon={Users} color="red" subtitle={t("labs_aguardando", lang)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard title={lang === "PT" ? "Mercado Anual" : "Annual Market"} value={indicadoresLabs.mercadoAnualBR} icon={DollarSign} color="green" subtitle={lang === "PT" ? "prótese dentária Brasil 2024" : "dental prosthetics Brazil 2024"} />
            <StatCard title={t("labs_deficit_sus", lang)} value={indicadoresLabs.deficitSUSvsMercado} icon={DollarSign} color="red" subtitle={t("labs_diferenca", lang)} />
            <StatCard title={t("labs_mun_sem", lang)} value={indicadoresLabs.municipiosSemLab_pct} icon={MapPin} color="red" subtitle={t("labs_total_mun", lang)} />
            <StatCard title={t("labs_cadcam", lang)} value={indicadoresLabs.crescimentoCADCAM} icon={Cpu} color="cyan" subtitle={t("labs_adocao", lang)} />
          </div>

          <div className="bg-red-600/10 border border-red-600/30 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-red-400 font-semibold text-sm">Déficit de 89% entre valor SUS e valor de mercado para próteses</p>
                <p className="text-slate-400 text-xs mt-1">Uma prótese total que custa R$ 180 no SUS tem valor de mercado de R$ 1.200–2.800. Isso inviabiliza a adesão de labs ao programa, mantendo 310 mil pessoas na fila de espera. 72% dos municípios brasileiros não possuem laboratório protético.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
              <h2 className="text-white font-semibold mb-1">{t("labs_cap_prod", lang)}</h2>
              <p className="text-slate-500 text-xs mb-4">{t("labs_cap_sub", lang)}</p>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={labsPorRegiao} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="regiao" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
                  <Bar dataKey="capacidade_mensal" name={t("labs_capacidade", lang)} fill="#3b82f6" radius={[4,4,0,0]} />
                  <Bar dataKey="producao_atual_mensal" name={t("labs_producao_atual", lang)} fill="#10b981" radius={[4,4,0,0]} />
                  <Bar dataKey="demanda_estimada_mensal" name={t("labs_demanda_label", lang)} fill="#ef4444" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
              <h2 className="text-white font-semibold mb-1">{t("labs_evolucao", lang)}</h2>
              <p className="text-slate-500 text-xs mb-4">{t("labs_evolucao_sub", lang)}</p>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={serieHistoricaLabs} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <YAxis yAxisId="left" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
                  <Line yAxisId="left" type="monotone" dataKey="total_labs" name={t("labs_total_label", lang)} stroke="#3b82f6" strokeWidth={2} dot={{ r: 2 }} />
                  <Line yAxisId="right" type="monotone" dataKey="producao_total" name={t("labs_producao_anual", lang)} stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
                  <Line yAxisId="right" type="monotone" dataKey="fila_espera" name={t("labs_fila_espera", lang)} stroke="#ef4444" strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Desertos Laboratoriais */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
            <h2 className="text-white font-semibold mb-4">{t("labs_desertos", lang)}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-2 text-slate-400 font-medium">{t("col_microregiao", lang)}</th>
                    <th className="text-left py-3 px-2 text-slate-400 font-medium">{t("col_uf", lang)}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{t("col_populacao", lang)}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{t("col_edentulos", lang)}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{t("col_lab_prox", lang)}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{t("col_deficit_mes", lang)}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{t("col_score", lang)}</th>
                  </tr>
                </thead>
                <tbody>
                  {desertosLaboratoriais.slice(0, 12).map((d) => (
                    <tr key={d.municipio} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="py-3 px-2 text-white font-medium text-xs">{d.municipio}</td>
                      <td className="py-3 px-2 text-slate-300">{d.uf}</td>
                      <td className="py-3 px-2 text-right text-slate-300">{(d.populacao/1000).toFixed(0)}k</td>
                      <td className="py-3 px-2 text-right text-red-400">{(d.edentulos_estimados/1000).toFixed(0)}k</td>
                      <td className="py-3 px-2 text-right text-amber-400">{d.lab_mais_proximo_km} km</td>
                      <td className="py-3 px-2 text-right text-red-400">{d.deficit_mensal}</td>
                      <td className={`py-3 px-2 text-right font-bold ${d.oportunidade_score >= 80 ? "text-emerald-400" : d.oportunidade_score >= 60 ? "text-blue-400" : "text-amber-400"}`}>{d.oportunidade_score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Comparativo Valores BR */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
            <h2 className="text-white font-semibold mb-4">{t("labs_comparativo", lang)}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-2 text-slate-400 font-medium">{t("col_tipo_protese", lang)}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{t("col_valor_sus_col", lang)}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{t("col_mercado_medio", lang)}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{t("col_premium", lang)}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{t("col_deficit_pct", lang)}</th>
                    <th className="text-center py-3 px-2 text-slate-400 font-medium">{t("col_tendencia_col", lang)}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparativoValores.map((c) => (
                    <tr key={c.tipo_protese} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="py-3 px-2 text-white font-medium text-xs">{c.tipo_protese}</td>
                      <td className="py-3 px-2 text-right text-red-400">{c.valor_sus > 0 ? `R$ ${c.valor_sus}` : "—"}</td>
                      <td className="py-3 px-2 text-right text-blue-400">R$ {c.valor_mercado_medio.toLocaleString("pt-BR")}</td>
                      <td className="py-3 px-2 text-right text-purple-400">R$ {c.valor_mercado_premium.toLocaleString("pt-BR")}</td>
                      <td className="py-3 px-2 text-right text-red-400 font-bold">{c.deficit_pct}%</td>
                      <td className="py-3 px-2 text-center"><span className={`px-2 py-1 rounded-full text-xs font-medium ${tendPriceColor(c.tendencia_preco)}`}>{c.tendencia_preco}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tecnologias BR */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
            <h2 className="text-white font-semibold mb-4">{t("labs_tecnologias", lang)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tecnologiasEmergentes.map((item) => (
                <div key={item.tecnologia} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-semibold text-sm">{item.tecnologia}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${tendPColor(item.tendencia)}`}>{item.tendencia}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs"><span className="text-slate-400">{lang === "PT" ? "Adoção Brasil" : "Brazil Adoption"}</span><span className="text-blue-400 font-bold">{item.adocao_brasil_pct}%</span></div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${item.adocao_brasil_pct}%` }} /></div>
                    <div className="flex justify-between text-xs"><span className="text-slate-400">{lang === "PT" ? "Adoção Mundial" : "World Adoption"}</span><span className="text-emerald-400 font-bold">{item.adocao_mundial_pct}%</span></div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${item.adocao_mundial_pct}%` }} /></div>
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-700">
                      <div><p className="text-slate-500 text-xs">{lang === "PT" ? "Investimento" : "Investment"}</p><p className="text-white text-xs font-medium">R$ {(item.investimento_medio/1000).toFixed(0)}k</p></div>
                      <div><p className="text-slate-500 text-xs">ROI</p><p className="text-white text-xs font-medium">{item.roi_estimado_meses} {lang === "PT" ? "meses" : "months"}</p></div>
                      <div><p className="text-slate-500 text-xs">{lang === "PT" ? "Produtividade" : "Productivity"}</p><p className="text-emerald-400 text-xs font-medium">+{item.impacto_produtividade_pct}%</p></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ranking de Labs por Estado */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
            <h2 className="text-white font-semibold mb-1">{t("labs_tpds_estado", lang)}</h2>
            <p className="text-slate-500 text-xs mb-4">{lang === "PT" ? "Ranking por número de laboratórios — TPDs, renda média e nível de saturação" : "Ranking by number of labs — TPDs, avg income and saturation level"} · CFO / CNES 2024</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-center py-3 px-2 text-slate-400 font-medium w-8">#</th>
                    <th className="text-left py-3 px-2 text-slate-400 font-medium">{t("col_estado", lang)}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{t("col_labs", lang)}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{t("labs_tpds_label", lang)}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{t("col_renda_media", lang)}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{t("col_demanda", lang)}</th>
                    <th className="text-center py-3 px-2 text-slate-400 font-medium">{t("col_saturacao", lang)}</th>
                  </tr>
                </thead>
                <tbody>
                  {[...tpdsPorEstado].sort((a, b) => b.labs_total - a.labs_total).map((item, i) => (
                    <tr key={item.uf} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="py-3 px-2 text-center text-slate-500 font-mono text-xs">{i + 1}</td>
                      <td className="py-3 px-2 text-white font-medium">
                        <span className="text-slate-500 font-mono text-xs mr-1">{item.uf}</span> {item.estado}
                      </td>
                      <td className="py-3 px-2 text-right text-blue-400 font-bold">{item.labs_total.toLocaleString("pt-BR")}</td>
                      <td className="py-3 px-2 text-right text-slate-300">{item.tpds_total.toLocaleString("pt-BR")}</td>
                      <td className="py-3 px-2 text-right text-slate-300">R$ {item.renda_media.toLocaleString("pt-BR")}</td>
                      <td className="py-3 px-2 text-right text-slate-300">{item.demanda_estimada.toLocaleString("pt-BR")}</td>
                      <td className="py-3 px-2 text-center"><span className={`px-2 py-1 rounded-full text-xs font-medium ${satColor(item.saturacao)}`}>{item.saturacao}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs">{lang === "PT" ? "Maior concentração" : "Most concentrated"}</p>
                <p className="text-white text-sm font-semibold">São Paulo</p>
                <p className="text-blue-400 text-xs">2.380 labs · 9.340 TPDs</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs">{lang === "PT" ? "Maior déficit" : "Largest deficit"}</p>
                <p className="text-white text-sm font-semibold">{lang === "PT" ? "Norte / Nordeste" : "North / Northeast"}</p>
                <p className="text-red-400 text-xs">{lang === "PT" ? "72% dos municípios sem lab" : "72% of municipalities without a lab"}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs">{lang === "PT" ? "Melhor renda TPD" : "Highest TPD income"}</p>
                <p className="text-white text-sm font-semibold">Distrito Federal</p>
                <p className="text-emerald-400 text-xs">R$ 5.200 {lang === "PT" ? "renda média" : "avg income"}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════ USA */}
      {pais === "US" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard title={lang === "PT" ? "Total de Labs" : "Total Labs"} value={indicadoresLabsUSA.totalLabs} icon={FlaskConical} color="blue" subtitle={lang === "PT" ? "laboratórios registrados" : "registered dental labs"} />
            <StatCard title={lang === "PT" ? "Laboratoristas (CDTs)" : "Lab Technicians (CDTs)"} value={indicadoresLabsUSA.laboratoristas} icon={Users} color="green" subtitle={lang === "PT" ? "técnicos certificados" : "certified dental technicians"} />
            <StatCard title={lang === "PT" ? "Mercado Anual" : "Annual Market"} value={indicadoresLabsUSA.mercadoAnual} icon={DollarSign} color="purple" subtitle={lang === "PT" ? "receita total de labs" : "total lab revenue"} />
            <StatCard title="CAD/CAM" value={indicadoresLabsUSA.adocaoCADCAM} icon={Cpu} color="cyan" subtitle={lang === "PT" ? "crescimento de adoção digital" : "digital adoption growth"} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard title={lang === "PT" ? "Labs Digitais" : "Digital Labs"} value={indicadoresLabsUSA.labsDigitais} icon={TrendingUp} color="blue" subtitle={lang === "PT" ? "com CAD/CAM ou 3D" : "with CAD/CAM or 3D printing"} />
            <StatCard title="DSO Growth" value={indicadoresLabsUSA.crescimentoDSO} icon={TrendingUp} color="yellow" subtitle={lang === "PT" ? "crescimento de DSOs" : "Dental Service Orgs growth"} />
            <StatCard title={lang === "PT" ? "Entrega Média" : "Avg Turnaround"} value={indicadoresLabsUSA.tempoMedioEntrega} icon={Clock} color="green" subtitle={lang === "PT" ? "dias por caso" : "days per case"} />
            <StatCard title={lang === "PT" ? "Produção Mensal" : "Monthly Output"} value={indicadoresLabsUSA.producaoMensal} icon={FlaskConical} color="purple" subtitle={lang === "PT" ? "unidades protéticas" : "prosthetic units"} />
          </div>

          <div className="bg-amber-600/10 border border-amber-600/30 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-amber-300 font-semibold text-sm">{lang === "PT" ? "Consolidação de mercado acelerada por DSOs" : "Market consolidation driven by Dental Service Organizations"}</p>
                <p className="text-amber-400/70 text-xs mt-1">{lang === "PT" ? "O número de labs comerciais reduziu de ~9.200 (2015) para ~7.500 (2023) pela consolidação de DSOs com labs in-house. Ao mesmo tempo, o mercado cresceu de $3.1B para $4.5B — menos labs processando maior volume. A adoção de CAD/CAM e impressão 3D é 3x maior que no Brasil." : "The number of commercial labs dropped from ~9,200 (2015) to ~7,500 (2023) due to DSO consolidation with in-house labs. The market still grew from $3.1B to $4.5B — fewer labs processing higher volume. CAD/CAM and 3D printing adoption is 3× higher than in Brazil."}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
              <h2 className="text-white font-semibold mb-1">{lang === "PT" ? "Labs por Região" : "Labs by Region"}</h2>
              <p className="text-slate-500 text-xs mb-4">{lang === "PT" ? "Produção atual vs demanda estimada" : "Current production vs estimated demand"}</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={labsPorRegiaoUSA} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="regiao" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
                  <Bar dataKey="producao_atual_mensal" name={lang === "PT" ? "Produção atual" : "Current output"} fill="#10b981" radius={[4,4,0,0]} />
                  <Bar dataKey="demanda_estimada_mensal" name={lang === "PT" ? "Demanda estimada" : "Estimated demand"} fill="#ef4444" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
              <h2 className="text-white font-semibold mb-1">{lang === "PT" ? "Evolução do Mercado" : "Market Evolution"}</h2>
              <p className="text-slate-500 text-xs mb-4">{lang === "PT" ? "Labs totais e receita anual (NADL)" : "Total labs and annual revenue (NADL)"}</p>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={serieHistoricaLabsUSA} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <YAxis yAxisId="left" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `$${v}B`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
                  <Line yAxisId="left" type="monotone" dataKey="total_labs" name={lang === "PT" ? "Total de labs" : "Total labs"} stroke="#3b82f6" strokeWidth={2} dot={{ r: 2 }} />
                  <Line yAxisId="left" type="monotone" dataKey="labs_digitais" name={lang === "PT" ? "Labs digitais" : "Digital labs"} stroke="#8b5cf6" strokeWidth={2} dot={{ r: 2 }} />
                  <Line yAxisId="right" type="monotone" dataKey="mercado_bi" name={lang === "PT" ? "Mercado ($B)" : "Market ($B)"} stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Preços USA */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
            <h2 className="text-white font-semibold mb-1">{lang === "PT" ? "Comparativo: Seguro vs Mercado" : "Price Comparison: Insurance vs Market"}</h2>
            <p className="text-slate-500 text-xs mb-4">{lang === "PT" ? "Reembolso médio de seguro vs preço de mercado (USD)" : "Average insurance reimbursement vs market price (USD)"} · ADA HPI / NADL 2022</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-2 text-slate-400 font-medium">{lang === "PT" ? "Tipo de Prótese" : "Prosthesis Type"}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{lang === "PT" ? "Reembolso Seguro" : "Insurance Reimb."}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{lang === "PT" ? "Mercado Médio" : "Market Avg"}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">Premium</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{lang === "PT" ? "Gap %" : "Gap %"}</th>
                    <th className="text-center py-3 px-2 text-slate-400 font-medium">{lang === "PT" ? "Tendência" : "Trend"}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparativoValoresUSA.map((c) => (
                    <tr key={c.tipo} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="py-3 px-2 text-white font-medium text-xs">{c.tipo}</td>
                      <td className="py-3 px-2 text-right text-amber-400">{c.seguro_reembolso > 0 ? `$${c.seguro_reembolso.toLocaleString()}` : "—"}</td>
                      <td className="py-3 px-2 text-right text-blue-400">${c.mercado_medio.toLocaleString()}</td>
                      <td className="py-3 px-2 text-right text-purple-400">${c.mercado_premium.toLocaleString()}</td>
                      <td className={`py-3 px-2 text-right font-bold ${c.gap_pct >= 80 ? "text-red-400" : c.gap_pct >= 40 ? "text-amber-400" : "text-slate-300"}`}>{c.gap_pct}%</td>
                      <td className="py-3 px-2 text-center"><span className={`px-2 py-1 rounded-full text-xs font-medium ${tendPriceColor(c.tendencia)}`}>{c.tendencia}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tecnologias USA */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
            <h2 className="text-white font-semibold mb-4">{lang === "PT" ? "Tecnologias em Laboratórios" : "Lab Technologies"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tecnologiasLabsUSA.map((item) => (
                <div key={item.tecnologia} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-semibold text-sm">{item.tecnologia}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${tendPColor(item.tendencia)}`}>{item.tendencia}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs"><span className="text-slate-400">{lang === "PT" ? "Adoção EUA" : "USA Adoption"}</span><span className="text-blue-400 font-bold">{item.adocao_pais_pct}%</span></div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${item.adocao_pais_pct}%` }} /></div>
                    <div className="flex justify-between text-xs"><span className="text-slate-400">{lang === "PT" ? "Adoção Mundial" : "World Adoption"}</span><span className="text-emerald-400 font-bold">{item.adocao_mundial_pct}%</span></div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${item.adocao_mundial_pct}%` }} /></div>
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-700">
                      <div><p className="text-slate-500 text-xs">{lang === "PT" ? "Investimento" : "Investment"}</p><p className="text-white text-xs font-medium">${(item.investimento_usd/1000).toFixed(0)}k</p></div>
                      <div><p className="text-slate-500 text-xs">ROI</p><p className="text-white text-xs font-medium">{item.roi_meses} {lang === "PT" ? "meses" : "months"}</p></div>
                      <div><p className="text-slate-500 text-xs">{lang === "PT" ? "Produtividade" : "Productivity"}</p><p className="text-emerald-400 text-xs font-medium">+{item.produtividade_pct}%</p></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CDTs por Região */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
            <h2 className="text-white font-semibold mb-4">{lang === "PT" ? "CDTs por Região" : "CDTs by Region"}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-3 text-slate-400 font-medium">{lang === "PT" ? "Região" : "Region"}</th>
                    <th className="text-right py-3 px-3 text-slate-400 font-medium">CDTs</th>
                    <th className="text-right py-3 px-3 text-slate-400 font-medium">{lang === "PT" ? "Labs" : "Labs"}</th>
                    <th className="text-right py-3 px-3 text-slate-400 font-medium">{lang === "PT" ? "Renda Média" : "Avg Salary"}</th>
                    <th className="text-right py-3 px-3 text-slate-400 font-medium">{lang === "PT" ? "Demanda Estimada" : "Est. Demand"}</th>
                    <th className="text-center py-3 px-3 text-slate-400 font-medium">{lang === "PT" ? "Saturação" : "Status"}</th>
                  </tr>
                </thead>
                <tbody>
                  {cdtsPorRegiaoUSA.map((item) => (
                    <tr key={item.regiao} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="py-3 px-3 text-white font-medium">{item.regiao}</td>
                      <td className="py-3 px-3 text-right text-blue-400">{item.cdts.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right text-slate-300">{item.labs.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right text-slate-300">${item.renda_media_usd.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right text-slate-300">{item.demanda_estimada.toLocaleString()}</td>
                      <td className="py-3 px-3 text-center"><span className={`px-2 py-1 rounded-full text-xs font-medium ${satColor(item.saturacao)}`}>{item.saturacao}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ranking de Labs por Estado */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
            <h2 className="text-white font-semibold mb-1">{lang === "PT" ? "Ranking de Labs por Estado" : "Lab Ranking by State"}</h2>
            <p className="text-slate-500 text-xs mb-4">{lang === "PT" ? "Top 20 estados por número de laboratórios protéticos — densidade, receita média e digitalização" : "Top 20 states by number of dental labs — density, avg revenue and digitization"} · NADL / BLS 2022</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-center py-3 px-2 text-slate-400 font-medium w-8">#</th>
                    <th className="text-left py-3 px-2 text-slate-400 font-medium">{lang === "PT" ? "Estado" : "State"}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">Labs</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{lang === "PT" ? "Técnicos" : "Technicians"}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{lang === "PT" ? "Pop. (mi)" : "Pop. (M)"}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">Labs/100k</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{lang === "PT" ? "Receita Média" : "Avg Revenue"}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">CAD/CAM</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{lang === "PT" ? "Crescimento 5a" : "5yr Growth"}</th>
                  </tr>
                </thead>
                <tbody>
                  {[...labsPorEstadoUSA].sort((a, b) => b.labs - a.labs).map((item, i) => (
                    <tr key={item.uf} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="py-3 px-2 text-center text-slate-500 font-mono text-xs">{i + 1}</td>
                      <td className="py-3 px-2 text-white font-medium">
                        <span className="text-slate-500 font-mono text-xs mr-1">{item.uf}</span> {item.estado}
                      </td>
                      <td className="py-3 px-2 text-right text-blue-400 font-bold">{item.labs.toLocaleString()}</td>
                      <td className="py-3 px-2 text-right text-slate-300">{item.laboratoristas.toLocaleString()}</td>
                      <td className="py-3 px-2 text-right text-slate-400">{item.populacao_mi.toFixed(1)}</td>
                      <td className={`py-3 px-2 text-right font-mono ${item.labs_por_100k >= 3 ? "text-emerald-400" : item.labs_por_100k >= 2.5 ? "text-blue-400" : "text-amber-400"}`}>{item.labs_por_100k.toFixed(2)}</td>
                      <td className="py-3 px-2 text-right text-slate-300">${(item.receita_media_usd / 1000).toFixed(0)}k</td>
                      <td className="py-3 px-2 text-right text-emerald-400">{item.cadcam_pct}%</td>
                      <td className={`py-3 px-2 text-right font-mono font-bold ${item.crescimento_5a_pct >= 0 ? "text-emerald-400" : "text-red-400"}`}>{item.crescimento_5a_pct > 0 ? "+" : ""}{item.crescimento_5a_pct}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs">{lang === "PT" ? "Maior densidade" : "Highest density"}</p>
                <p className="text-white text-sm font-semibold">{[...labsPorEstadoUSA].sort((a, b) => b.labs_por_100k - a.labs_por_100k)[0].estado}</p>
                <p className="text-emerald-400 text-xs">{[...labsPorEstadoUSA].sort((a, b) => b.labs_por_100k - a.labs_por_100k)[0].labs_por_100k.toFixed(2)} labs/100k</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs">{lang === "PT" ? "Maior receita média" : "Highest avg revenue"}</p>
                <p className="text-white text-sm font-semibold">{[...labsPorEstadoUSA].sort((a, b) => b.receita_media_usd - a.receita_media_usd)[0].estado}</p>
                <p className="text-blue-400 text-xs">${([...labsPorEstadoUSA].sort((a, b) => b.receita_media_usd - a.receita_media_usd)[0].receita_media_usd / 1000).toFixed(0)}k/year</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs">{lang === "PT" ? "Maior crescimento" : "Fastest growing"}</p>
                <p className="text-white text-sm font-semibold">{[...labsPorEstadoUSA].sort((a, b) => b.crescimento_5a_pct - a.crescimento_5a_pct)[0].estado}</p>
                <p className="text-emerald-400 text-xs">+{[...labsPorEstadoUSA].sort((a, b) => b.crescimento_5a_pct - a.crescimento_5a_pct)[0].crescimento_5a_pct}% {lang === "PT" ? "em 5 anos" : "in 5 years"}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════ GERMANY */}
      {pais === "DE" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard title={lang === "PT" ? "Total de Labs" : "Total Labs"} value={indicadoresLabsDE.totalLabs} icon={FlaskConical} color="blue" subtitle={lang === "PT" ? "Dentallabore registrados" : "registered Dentallabore"} />
            <StatCard title={lang === "PT" ? "Zahntechniker" : "Lab Technicians"} value={indicadoresLabsDE.laboratoristas} icon={Users} color="green" subtitle={lang === "PT" ? "técnicos em prótese" : "dental technicians"} />
            <StatCard title={lang === "PT" ? "Mercado Total" : "Total Market"} value={indicadoresLabsDE.marktvolumen} icon={DollarSign} color="purple" subtitle={lang === "PT" ? "volume anual zahntechnik" : "annual Zahntechnik market"} />
            <StatCard title="CAD/CAM" value={indicadoresLabsDE.adocaoCADCAM} icon={Cpu} color="cyan" subtitle={lang === "PT" ? "maior adoção global" : "world-leading digital adoption"} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard title={lang === "PT" ? "Pacientes GKV" : "GKV Patients"} value={indicadoresLabsDE.gkvAnteil} icon={Users} color="blue" subtitle={lang === "PT" ? "plano público de saúde" : "public insurance share"} />
            <StatCard title={lang === "PT" ? "Labs / Dentista" : "Labs / Dentist"} value={indicadoresLabsDE.laboratoriosPorDentista} icon={FlaskConical} color="green" subtitle={lang === "PT" ? "ratio mais alto da Europa" : "highest ratio in Europe"} />
            <StatCard title={lang === "PT" ? "Entrega Média" : "Avg Turnaround"} value={indicadoresLabsDE.tempoMedioEntrega} icon={Clock} color="yellow" subtitle={lang === "PT" ? "dias por caso" : "days per case"} />
            <StatCard title={lang === "PT" ? "Receita por Lab" : "Revenue per Lab"} value={indicadoresLabsDE.umsatzJeLab} icon={TrendingUp} color="purple" subtitle={lang === "PT" ? "faturamento médio anual" : "avg annual revenue"} />
          </div>

          <div className="bg-emerald-600/10 border border-emerald-600/30 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <Cpu className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-emerald-300 font-semibold text-sm">{lang === "PT" ? "Alemanha: líder global em digitalização de laboratórios" : "Germany: global leader in dental lab digitization"}</p>
                <p className="text-emerald-400/70 text-xs mt-1">{lang === "PT" ? "Com 85% de adoção de CAD/CAM (vs 18% no Brasil e 68% nos EUA), a Alemanha lidera a transformação digital em laboratórios protéticos. O sistema GKV com Festzuschuss garante cobertura básica para próteses, mas 48% dos pacientes pagam diferença por tratamentos premium. O mercado de €6.2B é o maior da Europa." : "With 85% CAD/CAM adoption (vs 18% in Brazil, 68% in USA), Germany leads the digital transformation of dental labs. The GKV Festzuschuss system guarantees basic prosthetic coverage, but 48% of patients pay a difference for premium treatments. The €6.2B market is the largest in Europe."}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
              <h2 className="text-white font-semibold mb-1">{lang === "PT" ? "Labs por Estado (Bundesland)" : "Labs by State (Bundesland)"}</h2>
              <p className="text-slate-500 text-xs mb-4">{lang === "PT" ? "Top 10 estados por número de laboratórios" : "Top 10 states by number of labs"} · VDZI 2023</p>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={labsPorEstadoDE} layout="vertical" margin={{ top: 5, right: 20, left: 120, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                  <YAxis type="category" dataKey="estado" tick={{ fill: "#94a3b8", fontSize: 10 }} width={115} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
                  <Bar dataKey="labs" name="Labs" fill="#3b82f6" radius={[0,4,4,0]} />
                  <Bar dataKey="zahntechniker" name="Zahntechniker" fill="#10b981" radius={[0,4,4,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
              <h2 className="text-white font-semibold mb-1">{lang === "PT" ? "Evolução do Mercado" : "Market Evolution"}</h2>
              <p className="text-slate-500 text-xs mb-4">{lang === "PT" ? "Total de labs e volume de mercado (VDZI)" : "Total labs and market volume (VDZI)"}</p>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={serieHistoricaLabsDE} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <YAxis yAxisId="left" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `€${v}B`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
                  <Line yAxisId="left" type="monotone" dataKey="total_labs" name={lang === "PT" ? "Total de labs" : "Total labs"} stroke="#3b82f6" strokeWidth={2} dot={{ r: 2 }} />
                  <Line yAxisId="left" type="monotone" dataKey="labs_digitais" name={lang === "PT" ? "Labs digitais" : "Digital labs"} stroke="#8b5cf6" strokeWidth={2} dot={{ r: 2 }} />
                  <Line yAxisId="right" type="monotone" dataKey="mercado_bi_eur" name={lang === "PT" ? "Mercado (€B)" : "Market (€B)"} stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Preços DE */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
            <h2 className="text-white font-semibold mb-1">{lang === "PT" ? "Comparativo: GKV Festzuschuss vs Mercado" : "Price Comparison: GKV Festzuschuss vs Market"}</h2>
            <p className="text-slate-500 text-xs mb-4">{lang === "PT" ? "Subsídio fixo GKV vs preço de mercado (EUR) — Pacientes pagam a diferença" : "GKV fixed subsidy vs market price (EUR) — Patients pay the difference"} · GKV-SV / BZÄK 2023</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-2 text-slate-400 font-medium">{lang === "PT" ? "Tipo de Prótese" : "Prosthesis Type"}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">GKV Festzuschuss</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{lang === "PT" ? "Mercado Médio" : "Market Avg"}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">Premium</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{lang === "PT" ? "Gap %" : "Gap %"}</th>
                    <th className="text-center py-3 px-2 text-slate-400 font-medium">{lang === "PT" ? "Tendência" : "Trend"}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparativoValoresDE.map((c) => (
                    <tr key={c.tipo} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="py-3 px-2 text-white font-medium text-xs">{c.tipo}</td>
                      <td className="py-3 px-2 text-right text-amber-400">{c.gkv_festzuschuss > 0 ? `€${c.gkv_festzuschuss.toLocaleString()}` : "—"}</td>
                      <td className="py-3 px-2 text-right text-blue-400">€{c.mercado_medio.toLocaleString()}</td>
                      <td className="py-3 px-2 text-right text-purple-400">€{c.mercado_premium.toLocaleString()}</td>
                      <td className={`py-3 px-2 text-right font-bold ${c.gap_pct >= 80 ? "text-red-400" : c.gap_pct >= 40 ? "text-amber-400" : "text-slate-300"}`}>{c.gap_pct}%</td>
                      <td className="py-3 px-2 text-center"><span className={`px-2 py-1 rounded-full text-xs font-medium ${tendPriceColor(c.tendencia)}`}>{c.tendencia}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tecnologias DE */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
            <h2 className="text-white font-semibold mb-4">{lang === "PT" ? "Tecnologias em Laboratórios" : "Lab Technologies"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tecnologiasLabsDE.map((item) => (
                <div key={item.tecnologia} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-semibold text-sm">{item.tecnologia}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${tendPColor(item.tendencia)}`}>{item.tendencia}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs"><span className="text-slate-400">{lang === "PT" ? "Adoção Alemanha" : "Germany Adoption"}</span><span className="text-blue-400 font-bold">{item.adocao_pais_pct}%</span></div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${item.adocao_pais_pct}%` }} /></div>
                    <div className="flex justify-between text-xs"><span className="text-slate-400">{lang === "PT" ? "Adoção Mundial" : "World Adoption"}</span><span className="text-emerald-400 font-bold">{item.adocao_mundial_pct}%</span></div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${item.adocao_mundial_pct}%` }} /></div>
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-700">
                      <div><p className="text-slate-500 text-xs">{lang === "PT" ? "Investimento" : "Investment"}</p><p className="text-white text-xs font-medium">€{(item.investimento_eur/1000).toFixed(0)}k</p></div>
                      <div><p className="text-slate-500 text-xs">ROI</p><p className="text-white text-xs font-medium">{item.roi_meses} {lang === "PT" ? "meses" : "months"}</p></div>
                      <div><p className="text-slate-500 text-xs">{lang === "PT" ? "Produtividade" : "Productivity"}</p><p className="text-emerald-400 text-xs font-medium">+{item.produtividade_pct}%</p></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ranking de Labs por Bundesland */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
            <h2 className="text-white font-semibold mb-1">{lang === "PT" ? "Ranking de Labs por Bundesland" : "Lab Ranking by Bundesland"}</h2>
            <p className="text-slate-500 text-xs mb-4">{lang === "PT" ? "Todos os 16 estados federais — densidade, digitalização e balanço oferta/demanda" : "All 16 federal states — density, digitization and supply/demand balance"} · VDZI 2023</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-center py-3 px-2 text-slate-400 font-medium w-8">#</th>
                    <th className="text-left py-3 px-2 text-slate-400 font-medium">Bundesland</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">Labs</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">Zahntechniker</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{lang === "PT" ? "Pop. (mi)" : "Pop. (M)"}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">Labs/100k</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{lang === "PT" ? "Faturamento (M€)" : "Revenue (M€)"}</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">CAD/CAM</th>
                    <th className="text-right py-3 px-2 text-slate-400 font-medium">{lang === "PT" ? "Digital %" : "Digital %"}</th>
                    <th className="text-center py-3 px-2 text-slate-400 font-medium">Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {[...labsPorEstadoDE].sort((a, b) => b.labs - a.labs).map((item, i) => (
                    <tr key={item.estado} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="py-3 px-2 text-center text-slate-500 font-mono text-xs">{i + 1}</td>
                      <td className="py-3 px-2 text-white font-medium">{item.estado}</td>
                      <td className="py-3 px-2 text-right text-blue-400 font-bold">{item.labs.toLocaleString()}</td>
                      <td className="py-3 px-2 text-right text-slate-300">{item.zahntechniker.toLocaleString()}</td>
                      <td className="py-3 px-2 text-right text-slate-400">{(item as any).populacao_mi?.toFixed(1) ?? "—"}</td>
                      <td className={`py-3 px-2 text-right font-mono ${(item as any).labs_por_100k >= 10 ? "text-emerald-400" : (item as any).labs_por_100k >= 7 ? "text-blue-400" : "text-amber-400"}`}>{(item as any).labs_por_100k?.toFixed(1) ?? "—"}</td>
                      <td className="py-3 px-2 text-right text-slate-300">{item.umsatz_mi}</td>
                      <td className="py-3 px-2 text-right text-emerald-400">{item.cadcam_pct}%</td>
                      <td className="py-3 px-2 text-right text-purple-400">{(item as any).digitalisierung_pct ?? "—"}%</td>
                      <td className={`py-3 px-2 text-center font-bold text-xs ${item.gap > 0 ? "text-emerald-400" : item.gap < 0 ? "text-red-400" : "text-slate-400"}`}>{item.gap > 0 ? `+${item.gap}` : item.gap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs">{lang === "PT" ? "Maior densidade" : "Highest density"}</p>
                <p className="text-white text-sm font-semibold">{[...labsPorEstadoDE].sort((a, b) => ((b as any).labs_por_100k ?? 0) - ((a as any).labs_por_100k ?? 0))[0].estado}</p>
                <p className="text-emerald-400 text-xs">{((labsPorEstadoDE as any[]).sort((a, b) => (b.labs_por_100k ?? 0) - (a.labs_por_100k ?? 0))[0].labs_por_100k ?? 0).toFixed(1)} labs/100k</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs">{lang === "PT" ? "Maior digitalização" : "Most digitized"}</p>
                <p className="text-white text-sm font-semibold">{[...labsPorEstadoDE].sort((a, b) => ((b as any).digitalisierung_pct ?? 0) - ((a as any).digitalisierung_pct ?? 0))[0].estado}</p>
                <p className="text-purple-400 text-xs">{(labsPorEstadoDE as any[]).sort((a, b) => (b.digitalisierung_pct ?? 0) - (a.digitalisierung_pct ?? 0))[0].digitalisierung_pct}% {lang === "PT" ? "digital workflow" : "digital workflow"}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-slate-400 text-xs">{lang === "PT" ? "Maior mercado" : "Largest market"}</p>
                <p className="text-white text-sm font-semibold">{[...labsPorEstadoDE].sort((a, b) => b.umsatz_mi - a.umsatz_mi)[0].estado}</p>
                <p className="text-blue-400 text-xs">€{[...labsPorEstadoDE].sort((a, b) => b.umsatz_mi - a.umsatz_mi)[0].umsatz_mi}M {lang === "PT" ? "receita anual" : "annual revenue"}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </AppShell>
  );
}
