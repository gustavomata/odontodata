"use client";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import {
  vagasSUSNaoPreenchidas, ceosAbaixoMeta, verbaFederalDisponivel,
  oportunidadesPorEspecialidade, serieHistoricaVagas, indicadoresRadarSUS,
} from "@/lib/data-radar-sus";
import {
  Briefcase, DollarSign, AlertTriangle, Building2, Banknote, MapPin, Stethoscope, Clock,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
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

const urgColor = (u: string) => {
  if (u === "Crítica") return "bg-red-600/20 text-red-400";
  if (u === "Alta") return "bg-amber-600/20 text-amber-400";
  return "bg-blue-600/20 text-blue-400";
};

export default function RadarSUSPage() {
  const { lang } = useLanguage();

  return (
    <AppShell>
      <PageHeader
        title={t("radar_title", lang)}
        subtitle={t("radar_subtitle", lang)}
        badge={t("radar_badge", lang)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title={t("radar_vagas_sus", lang)} value={indicadoresRadarSUS.vagasTotalAberto.toLocaleString("pt-BR")} icon={Briefcase} color="blue" subtitle={t("radar_em_brasil", lang)} />
        <StatCard title={t("radar_salario", lang)} value={indicadoresRadarSUS.salarioMedio} icon={DollarSign} color="green" subtitle={t("radar_remuneracao", lang)} />
        <StatCard title={t("radar_taxa_preench", lang)} value={indicadoresRadarSUS.taxaPreenchimento} icon={MapPin} color="yellow" subtitle={t("radar_vagas_vazias", lang)} />
        <StatCard title={t("radar_ceos_risco", lang)} value={indicadoresRadarSUS.ceosRiscoDescredenciamento} icon={Building2} color="red" subtitle={t("radar_risco_desc", lang)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title={t("radar_verba", lang)} value={indicadoresRadarSUS.verbaFederalNaoExecutada_bi} icon={Banknote} color="red" subtitle={t("radar_recursos", lang)} />
        <StatCard title={t("radar_estado_vagas", lang)} value={indicadoresRadarSUS.estadoMaisVagas} icon={MapPin} color="purple" subtitle="Maranhão lidera" />
        <StatCard title={t("radar_espec_vagas", lang)} value={indicadoresRadarSUS.especialidadeMaisVagas} icon={Stethoscope} color="cyan" subtitle="Cirurgia BMF" />
        <StatCard title={t("radar_tempo_aberta", lang)} value={indicadoresRadarSUS.tempoMedioAberta} icon={Clock} color="yellow" subtitle={t("radar_meses_sem", lang)} />
      </div>

      <div className="bg-red-600/10 border border-red-600/30 rounded-xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-red-400 font-semibold text-sm">89 CEOs estão em risco de descredenciamento por não atingirem metas mínimas de produção</p>
            <p className="text-slate-400 text-xs mt-1">Isso representa oportunidade direta para especialistas em endodontia, periodontia e cirurgia BMF. Muitos CEOs não conseguem produzir por falta de profissionais, não por falta de demanda. R$ 1.2 bilhão em verba federal aprovada não foi executada por falta de equipes.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("radar_evolucao", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("radar_evolucao_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={serieHistoricaVagas} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Line type="monotone" dataKey="vagas_abertas" name={t("radar_vagas_abertas", lang)} stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="vagas_preenchidas" name={t("radar_vagas_preenchidas", lang)} stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("radar_verba_chart", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("radar_verba_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={verbaFederalDisponivel} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="uf" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${v}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Bar dataKey="verba_aprovada_mi" name={t("radar_verba_aprov", lang)} fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="verba_executada_mi" name={t("radar_verba_exec", lang)} fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Vagas SUS */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-white font-semibold mb-1">{t("radar_vagas_nao_preench", lang)}</h2>
        <p className="text-slate-500 text-xs mb-4">{t("radar_vagas_nao_sub", lang)}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_municipio", lang)}</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_uf", lang)}</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_tipo_vaga", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_salario", lang)}</th>
                <th className="text-center py-3 px-3 text-slate-400 font-medium">{t("col_ch", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_meses_aberta", lang)}</th>
                <th className="text-center py-3 px-3 text-slate-400 font-medium">{t("col_urgencia", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {vagasSUSNaoPreenchidas.slice(0, 15).map((v, i) => (
                <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-3 px-3 text-white font-medium">{v.municipio}</td>
                  <td className="py-3 px-3 text-slate-300">{v.uf}</td>
                  <td className="py-3 px-3 text-slate-300 text-xs">{v.tipo_vaga}</td>
                  <td className="py-3 px-3 text-right text-emerald-400">R$ {v.salario_estimado.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-3 text-center text-slate-300">{v.carga_horaria}</td>
                  <td className="py-3 px-3 text-right text-slate-300">{v.tempo_aberta_meses}</td>
                  <td className="py-3 px-3 text-center"><span className={`px-2 py-1 rounded-full text-xs font-medium ${urgColor(v.urgencia)}`}>{v.urgencia}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CEOs abaixo da meta */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-white font-semibold mb-1">{t("radar_ceos_meta", lang)}</h2>
        <p className="text-slate-500 text-xs mb-4">{t("radar_ceos_sub", lang)}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_ceo", lang)}</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_municipio", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_meta", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_producao", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_cumprimento", lang)}</th>
                <th className="text-center py-3 px-3 text-slate-400 font-medium">{t("col_risco", lang)}</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_esp_falta", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {ceosAbaixoMeta.map((c, i) => (
                <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-3 px-3 text-white text-xs">{c.nome_ceo}</td>
                  <td className="py-3 px-3 text-slate-300">{c.municipio}/{c.uf}</td>
                  <td className="py-3 px-3 text-right text-slate-300">{c.meta_mensal}</td>
                  <td className="py-3 px-3 text-right text-slate-300">{c.producao_atual}</td>
                  <td className={`py-3 px-3 text-right font-bold ${c.cumprimento_pct < 60 ? "text-red-400" : "text-amber-400"}`}>{c.cumprimento_pct}%</td>
                  <td className="py-3 px-3 text-center">
                    {c.risco_descredenciamento ? <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded-full text-xs font-medium">{t("radar_sim", lang)}</span> : <span className="bg-slate-700 text-slate-400 px-2 py-1 rounded-full text-xs">{t("radar_nao", lang)}</span>}
                  </td>
                  <td className="py-3 px-3 text-xs text-amber-400">{c.especialidades_deficitarias.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Oportunidades por Especialidade */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
        <h2 className="text-white font-semibold mb-1">{t("radar_oport_esp", lang)}</h2>
        <p className="text-slate-500 text-xs mb-4">{t("radar_oport_sub", lang)}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_especialidade", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_vagas_abertas", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_salario_medio", lang)}</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_regioes_carentes", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_crescimento", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {oportunidadesPorEspecialidade.map((o) => (
                <tr key={o.especialidade} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-3 px-3 text-white font-medium">{o.especialidade}</td>
                  <td className="py-3 px-3 text-right text-blue-400 font-bold">{o.vagas_abertas_nacional}</td>
                  <td className="py-3 px-3 text-right text-emerald-400">R$ {o.salario_medio_sus.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-3 text-slate-300 text-xs">{o.regioes_mais_carentes.join(", ")}</td>
                  <td className="py-3 px-3 text-right text-emerald-400">+{o.crescimento_vagas_pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
