"use client";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import {
  lrpdRegional,
  producaoProteseSUS,
  demandaVsOferta,
  materiaisProtese,
  evolucaoProteseSUS,
  tpdPorRegiao,
  indicadoresProtese,
} from "@/lib/data-protese";
import type { EvoluçaoProteseSUS } from "@/lib/data-protese";
import {
  Building2,
  Users,
  Factory,
  TrendingUp,
  Clock,
  AlertTriangle,
  ShieldAlert,
  DollarSign,
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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm">
        <p className="text-slate-300 font-medium mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: <strong>{p.value.toLocaleString("pt-BR")}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ProtesePage() {
  const { lang } = useLanguage();

  const avgDefasagem =
    producaoProteseSUS
      .filter((p) => p.defasagem_pct > 0)
      .reduce((acc, p) => acc + p.defasagem_pct, 0) /
    producaoProteseSUS.filter((p) => p.defasagem_pct > 0).length;

  return (
    <AppShell>
      <PageHeader
        title={t("protese_title", lang)}
        subtitle={t("protese_subtitle", lang)}
        badge={t("protese_badge", lang)}
      />

      {/* Indicadores principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title={t("protese_total_lrpds", lang)}
          value={indicadoresProtese.totalLRPDs_Brasil}
          subtitle={t("protese_labs_brasil", lang)}
          icon={Building2}
          color="blue"
        />
        <StatCard
          title={t("protese_lrpds_sus", lang)}
          value={indicadoresProtese.lrpdSUS}
          subtitle={t("protese_credenciados", lang)}
          icon={Factory}
          color="green"
        />
        <StatCard
          title={t("protese_tpds", lang)}
          value={indicadoresProtese.totalTPDs}
          subtitle={t("protese_tecnicos", lang)}
          icon={Users}
          color="purple"
        />
        <StatCard
          title={t("protese_producao", lang)}
          value={`${(indicadoresProtese.producaoAnual / 1000).toFixed(0)} ${t("protese_mil_proteses", lang)}`}
          subtitle={t("protese_entregues", lang)}
          icon={TrendingUp}
          color="cyan"
        />
      </div>

      {/* Indicadores secundarios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title={t("protese_fila", lang)}
          value={`${indicadoresProtese.filaEsperaSUS_mil} ${t("protese_mil_label", lang)}`}
          subtitle={t("protese_aguardando", lang)}
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title={t("protese_deficit", lang)}
          value={indicadoresProtese.deficitNacionalProteses}
          subtitle={t("protese_deficit_sub", lang)}
          icon={AlertTriangle}
          color="red"
        />
        <StatCard
          title={t("protese_pop_edentula", lang)}
          value={`${indicadoresProtese.populacaoEdentula_mi} mi`}
          subtitle={t("protese_brasileiros", lang)}
          icon={ShieldAlert}
          color="red"
        />
        <StatCard
          title={t("protese_mercado", lang)}
          value={`R$ ${indicadoresProtese.mercadoProtese_bi} bi`}
          subtitle={t("protese_mercado_sub", lang)}
          icon={DollarSign}
          color="green"
        />
      </div>

      {/* Alerta defasagem */}
      <div className="bg-red-600/10 border border-red-600/30 rounded-xl p-4 mb-8 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-red-300 font-medium text-sm">{t("protese_alerta", lang)}</p>
          <p className="text-red-400/70 text-xs mt-1">
            A tabela SUS apresenta defasagem media de <strong>{avgDefasagem.toFixed(1)}%</strong> em
            relacao aos precos de mercado. Uma protese total que custa R$ 1.200 no privado e
            remunerada a R$ 180 pelo SUS. Essa defasagem compromete a qualidade dos materiais
            utilizados e a sustentabilidade dos laboratorios credenciados.
          </p>
        </div>
      </div>

      {/* Graficos lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Evolucao proteses SUS */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("protese_evolucao", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("protese_evolucao_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={evolucaoProteseSUS} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="protesesEntregues_mil"
                name={t("protese_entregues_label", lang)}
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="filaEspera_mil"
                name={t("protese_fila_label", lang)}
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: "#ef4444", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* LRPD por regiao */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("protese_lrpd_regiao", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">
            {t("protese_lrpd_regiao_sub", lang)}
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={lrpdRegional}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="regiao" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
              <Bar dataKey="lrpdSUS" name={t("protese_lrpd_sus", lang)} fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="lrpdPrivados" name={t("protese_lrpd_priv", lang)} fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-3">
            {lrpdRegional.map((r) => (
              <div key={r.regiao} className="text-center">
                <p className="text-slate-500 text-[10px]">{r.regiao}</p>
                <p className="text-slate-300 text-xs font-mono">{r.ocupacao_pct}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demanda vs Oferta */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
        <h2 className="text-white font-semibold mb-1">{t("protese_demanda_uf", lang)}</h2>
        <p className="text-slate-500 text-xs mb-4">
          {t("protese_demanda_uf_sub", lang)}
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={demandaVsOferta} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="uf" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
            <Bar dataKey="demandaEstimadaProteses" name={t("protese_dem_est", lang)} fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="capacidadeInstalada" name={t("protese_cap_inst", lang)} fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="deficit" name={t("protese_deficit_label", lang)} fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabela producao proteses SUS */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
        <h2 className="text-white font-semibold mb-1">{t("protese_tipos_sus", lang)}</h2>
        <p className="text-slate-500 text-xs mb-4">{t("protese_tipos_sus_sub", lang)}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left text-slate-400 font-medium py-2 px-3">{t("col_tipo", lang)}</th>
                <th className="text-right text-slate-400 font-medium py-2 px-3">{t("col_qtd_ano", lang)}</th>
                <th className="text-right text-slate-400 font-medium py-2 px-3">{t("col_valor_sus", lang)}</th>
                <th className="text-right text-slate-400 font-medium py-2 px-3">{t("col_valor_mercado", lang)}</th>
                <th className="text-right text-slate-400 font-medium py-2 px-3">{t("col_defasagem", lang)}</th>
                <th className="text-left text-slate-400 font-medium py-2 px-3">{t("col_material", lang)}</th>
                <th className="text-right text-slate-400 font-medium py-2 px-3">{t("col_tend_5a", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {producaoProteseSUS.map((p) => (
                <tr key={p.tipo} className="border-b border-slate-800 hover:bg-slate-800/50">
                  <td className="text-slate-300 py-2 px-3 max-w-[200px]">{p.tipo}</td>
                  <td className="text-slate-300 py-2 px-3 text-right font-mono">
                    {p.quantidade_ano.toLocaleString("pt-BR")}
                  </td>
                  <td className="text-slate-300 py-2 px-3 text-right font-mono">
                    {p.valorUnitarioSUS > 0 ? `R$ ${p.valorUnitarioSUS.toFixed(0)}` : "-"}
                  </td>
                  <td className="text-slate-300 py-2 px-3 text-right font-mono">
                    R$ {p.valorMercado.toLocaleString("pt-BR")}
                  </td>
                  <td className="text-right py-2 px-3">
                    <span
                      className={`font-mono text-xs px-2 py-0.5 rounded ${
                        p.defasagem_pct >= 95
                          ? "bg-red-600/20 text-red-400"
                          : p.defasagem_pct >= 90
                          ? "bg-amber-600/20 text-amber-400"
                          : "bg-yellow-600/20 text-yellow-400"
                      }`}
                    >
                      {p.defasagem_pct}%
                    </span>
                  </td>
                  <td className="text-slate-400 py-2 px-3 text-xs">{p.materialPrincipal}</td>
                  <td className="text-right py-2 px-3">
                    <span className={`text-xs font-mono ${p.tendencia5anos >= 10 ? "text-emerald-400" : "text-slate-400"}`}>
                      +{p.tendencia5anos}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabela materiais */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
        <h2 className="text-white font-semibold mb-1">{t("protese_materiais", lang)}</h2>
        <p className="text-slate-500 text-xs mb-4">{t("protese_materiais_sub", lang)}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left text-slate-400 font-medium py-2 px-3">{t("col_material", lang)}</th>
                <th className="text-right text-slate-400 font-medium py-2 px-3">{t("col_mercado_pct", lang)}</th>
                <th className="text-right text-slate-400 font-medium py-2 px-3">{t("col_custo_medio", lang)}</th>
                <th className="text-center text-slate-400 font-medium py-2 px-3">{t("col_tendencia", lang)}</th>
                <th className="text-right text-slate-400 font-medium py-2 px-3">{t("col_importado_pct", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {materiaisProtese.map((m) => (
                <tr key={m.material} className="border-b border-slate-800 hover:bg-slate-800/50">
                  <td className="text-slate-300 py-2 px-3">{m.material}</td>
                  <td className="text-slate-300 py-2 px-3 text-right font-mono">
                    {m.participacaoMercado_pct}%
                  </td>
                  <td className="text-slate-300 py-2 px-3 text-right font-mono">
                    R$ {m.custoMedio.toFixed(0)}
                  </td>
                  <td className="text-center py-2 px-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        m.tendencia === "crescendo"
                          ? "bg-emerald-600/20 text-emerald-400"
                          : m.tendencia === "estavel"
                          ? "bg-slate-600/20 text-slate-400"
                          : "bg-red-600/20 text-red-400"
                      }`}
                    >
                      {m.tendencia}
                    </span>
                  </td>
                  <td className="text-slate-300 py-2 px-3 text-right font-mono">
                    {m.importado_pct}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TPDs por regiao */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
        <h2 className="text-white font-semibold mb-1">{t("protese_tpds_regiao", lang)}</h2>
        <p className="text-slate-500 text-xs mb-4">
          {t("protese_tpds_regiao_sub", lang)}
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={tpdPorRegiao} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="regiao" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis yAxisId="left" tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `R$${(v / 1000).toFixed(1)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
            <Bar yAxisId="left" dataKey="totalTPDs" name={t("protese_total_tpds", lang)} radius={[4, 4, 0, 0]}>
              {tpdPorRegiao.map((r) => (
                <Cell key={r.regiao} fill={r.cor} />
              ))}
            </Bar>
            <Bar yAxisId="right" dataKey="rendaMedia" name={t("protese_renda_media", lang)} fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AppShell>
  );
}
