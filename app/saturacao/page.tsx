"use client";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import {
  projecaoSaturacao, projecaoPorRegiao, pipelineUniversidades,
  alertasSaturacao, tendenciaEspecialidades, indicadoresSaturacao,
} from "@/lib/data-saturacao";
import {
  TrendingUp, TrendingDown, AlertTriangle, GraduationCap, Target, MapPin, Calendar, Users,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, AreaChart, Area,
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

const statusColor = (s: string) => {
  if (s === "Saturado") return "bg-red-600/20 text-red-400";
  if (s === "Em Saturação") return "bg-amber-600/20 text-amber-400";
  if (s === "Equilibrado") return "bg-blue-600/20 text-blue-400";
  return "bg-emerald-600/20 text-emerald-400";
};

const riscoColor = (r: string) => {
  if (r === "Crítico") return "bg-red-600/20 text-red-400";
  if (r === "Alto") return "bg-amber-600/20 text-amber-400";
  if (r === "Moderado") return "bg-yellow-600/20 text-yellow-400";
  if (r === "Baixo") return "bg-blue-600/20 text-blue-400";
  return "bg-emerald-600/20 text-emerald-400";
};

const sevColor = (s: string) => {
  if (s === "Critico") return "bg-red-600/20 text-red-400 border-red-600/30";
  if (s === "Alerta") return "bg-amber-600/20 text-amber-400 border-amber-600/30";
  return "bg-blue-600/20 text-blue-400 border-blue-600/30";
};

const regioes = ["Sudeste", "Sul", "Centro-Oeste", "Nordeste", "Norte"];
const especialidades = ["Ortodontia", "Implantodontia", "Endodontia", "Odontogeriatria", "Prótese Dentária"];

export default function SaturacaoPage() {
  const { lang } = useLanguage();
  const [selEspec, setSelEspec] = useState("Ortodontia");
  const especData = projecaoSaturacao.find((p) => p.especialidade === selEspec);

  return (
    <AppShell>
      <PageHeader
        title={t("sat_title", lang)}
        subtitle={t("sat_subtitle", lang)}
        badge={t("sat_badge", lang)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title={t("sat_mais_saturada", lang)} value={indicadoresSaturacao.especialidadesMaisSaturadas} icon={TrendingDown} color="red" subtitle={t("sat_excesso", lang)} />
        <StatCard title={t("sat_mais_carente", lang)} value={indicadoresSaturacao.especialidadesMaisCarentes} icon={TrendingUp} color="green" subtitle={t("sat_deficit_crit", lang)} />
        <StatCard title={t("sat_formandos_ano", lang)} value={indicadoresSaturacao.formandosAnuais.toLocaleString("pt-BR")} icon={GraduationCap} color="blue" subtitle={t("sat_novos_prof", lang)} />
        <StatCard title={t("sat_taxa_abs", lang)} value={indicadoresSaturacao.taxaAbsorcaoMedia} icon={Target} color="yellow" subtitle={t("sat_mercado_abs", lang)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title={t("sat_colapso", lang)} value={indicadoresSaturacao.anoColapsoOrtodontia} icon={Calendar} color="red" subtitle={t("sat_ano_crit", lang)} />
        <StatCard title={t("sat_reg_saturada", lang)} value={indicadoresSaturacao.regiaoMaisSaturada} icon={MapPin} color="red" subtitle="Sudeste" />
        <StatCard title={t("sat_reg_oport", lang)} value={indicadoresSaturacao.regiaoMaisOportunidade} icon={MapPin} color="green" subtitle="Norte" />
        <StatCard title={t("sat_dem_idosos", lang)} value={indicadoresSaturacao.crescimentoDemandaIdosos} icon={Users} color="purple" subtitle={t("sat_cresc_2040", lang)} />
      </div>

      <div className="bg-amber-600/10 border border-amber-600/30 rounded-xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-amber-400 font-semibold text-sm">Ortodontia atingirá saturação crítica até 2027 no Sudeste e Sul</p>
            <p className="text-slate-400 text-xs mt-1">Com 4.200 novos ortodontistas formados por ano e demanda crescendo apenas 2.1%, a saturação é inevitável. Profissionais devem considerar especialidades em deficit como odontogeriatria (+340% demanda projetada) ou migração para regiões Norte/Nordeste.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("sat_tendencia", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("sat_tend_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={tendenciaEspecialidades} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} domain={[0, 200]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
              <Line type="monotone" dataKey="ortodontia" name="Ortodontia" stroke="#ef4444" strokeWidth={2} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="implantodontia" name="Implantodontia" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="endodontia" name="Endodontia" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="odontogeriatria" name="Odontogeriatria" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="odontopediatria" name="Odontopediatria" stroke="#a855f7" strokeWidth={2} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white font-semibold mb-1">{t("sat_proj_oferta", lang)}</h2>
              <p className="text-slate-500 text-xs">{t("sat_selecionar", lang)}</p>
            </div>
            <select value={selEspec} onChange={(e) => setSelEspec(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white">
              {projecaoSaturacao.map((p) => <option key={p.especialidade} value={p.especialidade}>{p.especialidade}</option>)}
            </select>
          </div>
          {especData && (
            <ResponsiveContainer width="100%" height={340}>
              <AreaChart data={especData.projecao_5_anos} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
                <Area type="monotone" dataKey="oferta" name={t("sat_oferta", lang)} stroke="#ef4444" fill="#ef4444" fillOpacity={0.15} strokeWidth={2} />
                <Area type="monotone" dataKey="demanda" name={t("sat_demanda", lang)} stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Projeção por Especialidade */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-white font-semibold mb-4">{t("sat_proj_esp", lang)}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_especialidade", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_profissionais", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_formandos_ano", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_cresc_demanda", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_cresc_oferta", lang)}</th>
                <th className="text-center py-3 px-3 text-slate-400 font-medium">{t("col_equilibrio", lang)}</th>
                <th className="text-center py-3 px-3 text-slate-400 font-medium">{t("col_status", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {projecaoSaturacao.map((p) => (
                <tr key={p.especialidade} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-3 px-3 text-white font-medium">{p.especialidade}</td>
                  <td className="py-3 px-3 text-right text-slate-300">{p.profissionais_atuais.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-3 text-right text-slate-300">{p.formandos_ano.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-3 text-right text-slate-300">{p.taxa_crescimento_demanda_pct}%</td>
                  <td className={`py-3 px-3 text-right ${p.taxa_crescimento_oferta_pct > p.taxa_crescimento_demanda_pct * 2 ? "text-red-400" : "text-slate-300"}`}>{p.taxa_crescimento_oferta_pct}%</td>
                  <td className="py-3 px-3 text-center text-slate-300">{p.ano_equilibrio || t("sat_saturado", lang)}</td>
                  <td className="py-3 px-3 text-center"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(p.status)}`}>{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Heatmap Região x Especialidade */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-white font-semibold mb-1">{t("sat_heatmap", lang)}</h2>
        <p className="text-slate-500 text-xs mb-4">{t("sat_heatmap_sub", lang)}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_regiao", lang)}</th>
                {especialidades.map((e) => <th key={e} className="text-center py-3 px-3 text-slate-400 font-medium text-xs">{e}</th>)}
              </tr>
            </thead>
            <tbody>
              {regioes.map((reg) => (
                <tr key={reg} className="border-b border-slate-800/50">
                  <td className="py-3 px-3 text-white font-medium">{reg}</td>
                  {especialidades.map((esp) => {
                    const d = projecaoPorRegiao.find((p) => p.regiao === reg && p.especialidade === esp);
                    return (
                      <td key={esp} className="py-3 px-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${riscoColor(d?.risco || "")}`}>
                          {d?.saturacao_2030_pct}%
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alertas */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-white font-semibold mb-4">{t("sat_alertas", lang)}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alertasSaturacao.map((a, i) => (
            <div key={i} className={`border rounded-xl p-4 ${sevColor(a.severidade)}`}>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span className="font-semibold text-sm">{a.titulo}</span>
              </div>
              <p className="text-xs opacity-80 mb-2">{a.descricao}</p>
              <p className="text-xs opacity-60">Dados: {a.dados_suporte}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Universidades */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
        <h2 className="text-white font-semibold mb-4">{t("sat_pipeline", lang)}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_uf", lang)}</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_estado", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_vagas_grad", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_vagas_espec", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_conclusao", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_proj_2030", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_absorcao", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {pipelineUniversidades.map((p) => (
                <tr key={p.uf} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-3 px-3 text-slate-300 font-mono">{p.uf}</td>
                  <td className="py-3 px-3 text-white">{p.estado}</td>
                  <td className="py-3 px-3 text-right text-slate-300">{p.vagas_graduacao.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-3 text-right text-slate-300">{p.vagas_especializacao.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-3 text-right text-slate-300">{p.taxa_conclusao_pct}%</td>
                  <td className="py-3 px-3 text-right text-blue-400">{p.formandos_projetados_2030.toLocaleString("pt-BR")}</td>
                  <td className={`py-3 px-3 text-right font-bold ${p.absorcao_mercado_pct >= 85 ? "text-emerald-400" : p.absorcao_mercado_pct >= 65 ? "text-blue-400" : "text-red-400"}`}>{p.absorcao_mercado_pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
