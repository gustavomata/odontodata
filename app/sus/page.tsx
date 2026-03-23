"use client";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import {
  producaoSUSRegiao,
  coberturaSaudeBucalUF,
  procedimentosSUS,
  brasilSorridenteIndicadores,
  ceoProducao,
  serieHistoricaSUS,
  atencaoBasicaPorPorte,
  indicadoresSUS,
} from "@/lib/data-sus";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ScatterChart, Scatter, ZAxis,
} from "recharts";
import {
  Users, ShieldCheck, Activity, DollarSign, Building2, FlaskConical,
  CheckCircle2, TrendingUp, TrendingDown, Target,
} from "lucide-react";
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

const categorias = [...new Set(brasilSorridenteIndicadores.map((b) => b.categoria))];

export default function SUSPage() {
  const { lang } = useLanguage();

  return (
    <AppShell>
      <PageHeader
        title={t("sus_title", lang)}
        subtitle={t("sus_subtitle", lang)}
        badge={t("sus_badge", lang)}
      />

      {/* Stat Cards - Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title={t("sus_equipes_esb", lang)} value={indicadoresSUS.totalEquipesESB} icon={Users} color="blue" subtitle={t("sus_esb_impl", lang)} />
        <StatCard title={t("sus_cobertura_nac", lang)} value={indicadoresSUS.coberturaNacional + "%"} icon={ShieldCheck} color="green" subtitle={t("sus_pop_coberta", lang)} />
        <StatCard title={t("sus_procedimentos_ano", lang)} value={indicadoresSUS.procedimentosAno_mi + " mi"} icon={Activity} color="purple" subtitle={t("sus_proc_odonto", lang)} />
        <StatCard title={t("sus_invest_fed", lang)} value={"R$ " + indicadoresSUS.investimentoFederal_bi + " bi"} icon={DollarSign} color="yellow" subtitle={t("sus_orcamento", lang)} />
      </div>

      {/* Stat Cards - Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title={t("sus_ceos", lang)} value={indicadoresSUS.totalCEOs} icon={Building2} color="cyan" subtitle={t("sus_centros_esp", lang)} />
        <StatCard title={t("sus_lrpds", lang)} value={indicadoresSUS.totalLRPDs} icon={FlaskConical} color="purple" subtitle={t("sus_labs_protese", lang)} />
        <StatCard title={t("sus_resolutividade", lang)} value={indicadoresSUS.taxaResolutividade + "%"} icon={CheckCircle2} color="green" subtitle={t("sus_taxa_trat", lang)} />
        <StatCard title={t("sus_razao_exo", lang)} value={indicadoresSUS.razaoExodontia_restauracao} icon={Target} color="red" subtitle={t("sus_exo_rest", lang)} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Evolução do SUS Odontológico */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("sus_evolucao", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("sus_evolucao_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={serieHistoricaSUS} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Line yAxisId="left" type="monotone" dataKey="equipesESB" name={t("sus_equipes_esb_label", lang)} stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
              <Line yAxisId="left" type="monotone" dataKey="totalCEOs" name={t("sus_ceos", lang)} stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
              <Line yAxisId="right" type="monotone" dataKey="cobertura_pct" name={t("sus_cobertura_pct", lang)} stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Produção por Região */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("sus_producao_regiao", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("sus_producao_regiao_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={producaoSUSRegiao} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="regiao" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
              <Bar dataKey="procedimentosPreventivos_mil" name={t("sus_preventivos", lang)} stackId="a" fill="#10B981" />
              <Bar dataKey="procedimentosBasicos_mil" name={t("sus_basicos", lang)} stackId="a" fill="#3B82F6" />
              <Bar dataKey="procedimentosEspecializados_mil" name={t("sus_especializados", lang)} stackId="a" fill="#F59E0B" />
              <Bar dataKey="procedimentosCirurgicos_mil" name={t("sus_cirurgicos", lang)} stackId="a" fill="#EF4444" />
              <Bar dataKey="procedimentosProtese_mil" name={t("sus_protese", lang)} stackId="a" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Brasil Sorridente Indicators */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-white font-semibold mb-1">{t("sus_brasil_sorr", lang)}</h2>
        <p className="text-slate-500 text-xs mb-5">{t("sus_brasil_sorr_sub", lang)}</p>
        <div className="space-y-6">
          {categorias.map((cat) => (
            <div key={cat}>
              <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">{cat}</h3>
              <div className="space-y-3">
                {brasilSorridenteIndicadores
                  .filter((b) => b.categoria === cat)
                  .map((ind) => (
                    <div key={ind.indicador}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-300 text-sm">{ind.indicador}</span>
                        <span className="text-slate-400 text-xs">
                          {ind.valor.toLocaleString("pt-BR")} / {ind.meta2024.toLocaleString("pt-BR")} {ind.unidade}
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${ind.atingimento >= 95 ? "bg-emerald-500" : ind.atingimento >= 85 ? "bg-blue-500" : "bg-amber-500"}`}
                          style={{ width: `${Math.min(ind.atingimento, 100)}%` }}
                        />
                      </div>
                      <p className="text-right text-xs mt-0.5">
                        <span className={ind.atingimento >= 95 ? "text-emerald-400" : ind.atingimento >= 85 ? "text-blue-400" : "text-amber-400"}>
                          {ind.atingimento}%
                        </span>
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* CEO Produção por Região */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("sus_ceo_producao", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("sus_ceo_producao_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={ceoProducao} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="regiao" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
              <Bar dataKey="producaoEndodontia_mil" name={t("sus_endodontia", lang)} fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="producaoPeriodontia_mil" name={t("sus_periodontia", lang)} fill="#10B981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="producaoCirurgia_mil" name={t("sus_cirurgia", lang)} fill="#F59E0B" radius={[2, 2, 0, 0]} />
              <Bar dataKey="producaoDiagnostico_mil" name={t("sus_diagnostico", lang)} fill="#8B5CF6" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Atenção Básica por Porte */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("sus_atencao_basica", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("sus_atencao_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={atencaoBasicaPorPorte} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="faixaPopulacao" tick={{ fill: "#94a3b8", fontSize: 9 }} />
              <YAxis yAxisId="left" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
              <Bar yAxisId="left" dataKey="cobertura_pct" name={t("sus_cobertura_pct", lang)} fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="procedimentosPerCapita" name={t("sus_proc_percapita", lang)} fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table: Cobertura por UF */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-white font-semibold mb-1">{t("sus_cobertura_uf", lang)}</h2>
        <p className="text-slate-500 text-xs mb-4">{t("sus_cobertura_uf_sub", lang)}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("col_uf", lang)}</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("col_cobertura_esb", lang)}</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("col_equipes_sb", lang)}</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("col_proporcao_esb", lang)}</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("sus_ceos", lang)}</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("sus_lrpds", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {coberturaSaudeBucalUF
                .slice()
                .sort((a, b) => b.coberturaESB_pct - a.coberturaESB_pct)
                .map((uf) => (
                  <tr key={uf.uf} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4">
                      <span className="text-slate-200 font-medium">{uf.uf}</span>
                      <span className="text-slate-500 text-xs ml-2">{uf.estado}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-slate-800 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${uf.coberturaESB_pct >= 70 ? "bg-emerald-500" : uf.coberturaESB_pct >= 45 ? "bg-blue-500" : "bg-amber-500"}`}
                            style={{ width: `${Math.min(uf.coberturaESB_pct, 100)}%` }}
                          />
                        </div>
                        <span className="text-slate-300 text-xs font-mono">{uf.coberturaESB_pct}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-mono">{uf.equipeSaudeBucal.toLocaleString("pt-BR")}</td>
                    <td className="py-3 px-4 text-slate-300 font-mono">{uf.proporcaoESB_ESF}%</td>
                    <td className="py-3 px-4 text-slate-300 font-mono">{uf.ceo}</td>
                    <td className="py-3 px-4 text-slate-300 font-mono">{uf.lrpd}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table: Procedimentos SUS */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
        <h2 className="text-white font-semibold mb-1">{t("sus_procedimentos", lang)}</h2>
        <p className="text-slate-500 text-xs mb-4">{t("sus_procedimentos_sub", lang)}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("col_grupo", lang)}</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("col_subgrupo", lang)}</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("col_qtd_mil", lang)}</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("col_valor_pago_mi", lang)}</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("col_tend_5anos", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {procedimentosSUS.map((proc) => (
                <tr key={proc.subgrupo} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      proc.grupo === "Atenção Básica" ? "bg-blue-500/20 text-blue-400" :
                      proc.grupo === "Prevenção" ? "bg-emerald-500/20 text-emerald-400" :
                      proc.grupo === "Especializada" ? "bg-amber-500/20 text-amber-400" :
                      proc.grupo === "Prótese" ? "bg-purple-500/20 text-purple-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>
                      {proc.grupo}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-200">{proc.subgrupo}</td>
                  <td className="py-3 px-4 text-slate-300 font-mono">{proc.quantidade_mil.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-4 text-slate-300 font-mono">R$ {proc.valorPago_mi.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}</td>
                  <td className="py-3 px-4">
                    <span className={`flex items-center gap-1 text-xs font-medium ${proc.tendencia5anos >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {proc.tendencia5anos >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {proc.tendencia5anos >= 0 ? "+" : ""}{proc.tendencia5anos}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
