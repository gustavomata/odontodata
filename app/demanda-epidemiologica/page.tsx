"use client";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import {
  demandaPorCondicao, demandaRegional, projecaoDemografica,
  envelhecimentoImpacto, gapOfertaDemanda, indicadoresDemanda,
} from "@/lib/data-demanda-epidemiologica";
import {
  Users, AlertTriangle, Activity, MapPin, TrendingUp, DollarSign, Stethoscope, Clock,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm">
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

const classColor = (c: string) => {
  if (c === "Crítico") return "bg-red-600/20 text-red-400";
  if (c === "Insuficiente") return "bg-amber-600/20 text-amber-400";
  if (c === "Adequado") return "bg-blue-600/20 text-blue-400";
  return "bg-emerald-600/20 text-emerald-400";
};

const tendColor = (t: string) => {
  if (t === "Crescente") return "text-red-400";
  if (t === "Estável") return "text-blue-400";
  return "text-emerald-400";
};

const condicoes = ["Cárie não tratada", "Doença periodontal", "Edentulismo", "Má oclusão", "Câncer bucal"];
const regioes = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];

const demandaChart = demandaPorCondicao.filter((d) => d.deficit_profissionais > 0).map((d) => ({
  condicao: d.condicao.length > 20 ? d.condicao.slice(0, 18) + "..." : d.condicao,
  disponivel: d.profissionais_disponiveis,
  necessario: d.profissionais_disponiveis + d.deficit_profissionais,
  deficit: d.deficit_profissionais,
}));

export default function DemandaEpidemiologicaPage() {
  const { lang } = useLanguage();
  const [busca, setBusca] = useState("");
  const gapFiltrado = gapOfertaDemanda.filter((g) => g.estado.toLowerCase().includes(busca.toLowerCase()) || g.uf.toLowerCase().includes(busca.toLowerCase()));

  return (
    <AppShell>
      <PageHeader
        title={t("demanda_title", lang)}
        subtitle={t("demanda_subtitle", lang)}
        badge={t("demanda_badge", lang)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title={t("demanda_pop_nec", lang)} value={indicadoresDemanda.populacaoNecessitaTratamento_mi + " mi"} icon={Users} color="red" subtitle={t("demanda_estimada", lang)} />
        <StatCard title={t("demanda_deficit_cons", lang)} value={indicadoresDemanda.deficitConsultas_mi + " mi/ano"} icon={Activity} color="red" subtitle={t("demanda_nao_realizadas", lang)} />
        <StatCard title={t("demanda_cond_prevalente", lang)} value={indicadoresDemanda.condicaoMaisPrevalente} icon={Stethoscope} color="purple" subtitle={t("demanda_afetados", lang)} />
        <StatCard title={t("demanda_regiao_deficit", lang)} value={indicadoresDemanda.regiaoMaiorDeficit} icon={MapPin} color="red" subtitle={t("demanda_norte", lang)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title={t("demanda_idosos", lang)} value={indicadoresDemanda.crescimentoDemandaIdosos_pct} icon={TrendingUp} color="purple" subtitle={t("demanda_cresc_2040", lang)} />
        <StatCard title={t("demanda_custo", lang)} value={indicadoresDemanda.custoTotalEstimado_bi} icon={DollarSign} color="yellow" subtitle={t("demanda_tratamento", lang)} />
        <StatCard title={t("demanda_prof_nec", lang)} value={indicadoresDemanda.profissionaisNecessarios.toLocaleString("pt-BR")} icon={Users} color="blue" subtitle={t("demanda_deficit_nac", lang)} />
        <StatCard title={t("demanda_tempo_espera", lang)} value={indicadoresDemanda.tempoEsperaMedio} icon={Clock} color="yellow" subtitle={t("demanda_meses_sus", lang)} />
      </div>

      <div className="bg-purple-600/10 border border-purple-600/30 rounded-xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-purple-400 font-semibold text-sm">Envelhecimento populacional impulsionará +340% na demanda por atendimento geriátrico até 2040</p>
            <p className="text-slate-400 text-xs mt-1">A população 60+ passará de 32.7 milhões (2024) para 73.2 milhões (2040). A demanda por próteses, implantes e atendimento periodontal geriátrico crescerá exponencialmente, enquanto a oferta de odontogeriatras cobre apenas 5-35% da necessidade atual.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("demanda_proj", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("demanda_proj_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={340}>
            <AreaChart data={projecaoDemografica} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${v}mi`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
              <Area type="monotone" dataKey="demanda_geriatrica_mi" name={t("demanda_geriatrica", lang)} stackId="1" stroke="#a855f7" fill="#a855f7" fillOpacity={0.4} />
              <Area type="monotone" dataKey="demanda_adulto_mi" name={t("demanda_adulto", lang)} stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Area type="monotone" dataKey="demanda_pediatrica_mi" name={t("demanda_pediatrica", lang)} stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("demanda_deficit_prof", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("demanda_deficit_prof_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={demandaChart} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="condicao" width={120} tick={{ fill: "#94a3b8", fontSize: 9 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
              <Bar dataKey="disponivel" name={t("demanda_disponivel", lang)} fill="#3b82f6" stackId="a" radius={[0, 0, 0, 0]} />
              <Bar dataKey="deficit" name={t("demanda_deficit_bar", lang)} fill="#ef4444" stackId="a" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Demanda por Condição */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-white font-semibold mb-4">{t("demanda_por_condicao", lang)}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-2 text-slate-400 font-medium">{t("col_condicao", lang)}</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium">{t("col_prev_adulto", lang)}</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium">{t("col_pop_afetada", lang)}</th>
                <th className="text-left py-3 px-2 text-slate-400 font-medium">{t("col_especialidade_col", lang)}</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium">{t("col_profissionais_col", lang)}</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium">{t("col_deficit_col", lang)}</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium">{t("col_custo_medio_col", lang)}</th>
                <th className="text-center py-3 px-2 text-slate-400 font-medium">{t("col_tendencia_col", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {demandaPorCondicao.map((d) => (
                <tr key={d.condicao} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-3 px-2 text-white font-medium text-xs">{d.condicao}</td>
                  <td className="py-3 px-2 text-right text-slate-300">{d.prevalencia_adultos_pct}%</td>
                  <td className="py-3 px-2 text-right text-slate-300">{d.populacao_afetada_mi} mi</td>
                  <td className="py-3 px-2 text-slate-300 text-xs">{d.especialidade_principal}</td>
                  <td className="py-3 px-2 text-right text-blue-400">{d.profissionais_disponiveis.toLocaleString("pt-BR")}</td>
                  <td className={`py-3 px-2 text-right font-bold ${d.deficit_profissionais > 0 ? "text-red-400" : "text-emerald-400"}`}>{d.deficit_profissionais > 0 ? `-${d.deficit_profissionais.toLocaleString("pt-BR")}` : "Adequado"}</td>
                  <td className="py-3 px-2 text-right text-slate-300">R$ {d.custo_tratamento_medio}</td>
                  <td className={`py-3 px-2 text-center font-medium text-xs ${tendColor(d.tendencia)}`}>{d.tendencia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Heatmap Regional */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-white font-semibold mb-1">{t("demanda_gap_regiao", lang)}</h2>
        <p className="text-slate-500 text-xs mb-4">{t("demanda_gap_regiao_sub", lang)}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_regiao", lang)}</th>
                {condicoes.map((c) => <th key={c} className="text-center py-3 px-2 text-slate-400 font-medium text-xs">{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {regioes.map((reg) => (
                <tr key={reg} className="border-b border-slate-800/50">
                  <td className="py-3 px-3 text-white font-medium">{reg}</td>
                  {condicoes.map((cond) => {
                    const d = demandaRegional.find((dr) => dr.regiao === reg && dr.condicao === cond);
                    return (
                      <td key={cond} className="py-3 px-2 text-center">
                        <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: d?.cor + "20", color: d?.cor }}>{d?.gap_pct}%</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gap por Estado */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-white font-semibold">{t("demanda_gap_estado", lang)}</h2>
            <p className="text-slate-500 text-xs">{t("demanda_gap_estado_sub", lang)}</p>
          </div>
          <input type="text" placeholder={t("demanda_buscar", lang)} value={busca} onChange={(e) => setBusca(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 w-full sm:w-64" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_uf", lang)}</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_estado", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_demanda_mi", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_capacidade_mi", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_gap_pct", lang)}</th>
                <th className="text-center py-3 px-3 text-slate-400 font-medium">{t("col_classificacao", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {gapFiltrado.map((g) => (
                <tr key={g.uf} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-3 px-3 text-slate-300 font-mono">{g.uf}</td>
                  <td className="py-3 px-3 text-white">{g.estado}</td>
                  <td className="py-3 px-3 text-right text-slate-300">{g.demanda_total_consultas_mi}</td>
                  <td className="py-3 px-3 text-right text-slate-300">{g.capacidade_total_consultas_mi}</td>
                  <td className={`py-3 px-3 text-right font-bold ${g.gap_pct < 0 ? "text-red-400" : "text-emerald-400"}`}>{g.gap_pct}%</td>
                  <td className="py-3 px-3 text-center"><span className={`px-2 py-1 rounded-full text-xs font-medium ${classColor(g.classificacao)}`}>{g.classificacao}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Impacto Envelhecimento */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
        <h2 className="text-white font-semibold mb-4">{t("demanda_envelh", lang)}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_faixa_etaria", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_pop_2024", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_pop_2030", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_pop_2040", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_edentulismo", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_d_protese", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_d_implante", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {envelhecimentoImpacto.map((e) => (
                <tr key={e.faixa_etaria} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-3 px-3 text-white font-medium">{e.faixa_etaria}</td>
                  <td className="py-3 px-3 text-right text-slate-300">{e.populacao_2024_mi} mi</td>
                  <td className="py-3 px-3 text-right text-blue-400">{e.populacao_2030_mi} mi</td>
                  <td className="py-3 px-3 text-right text-purple-400 font-bold">{e.populacao_2040_mi} mi</td>
                  <td className="py-3 px-3 text-right text-red-400">{e.prevalencia_edentulismo_pct}%</td>
                  <td className="py-3 px-3 text-right text-amber-400">{e.demanda_protese_mi} mi</td>
                  <td className="py-3 px-3 text-right text-cyan-400">{e.demanda_implante_mi} mi</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
