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
  const avgDefasagem =
    producaoProteseSUS
      .filter((p) => p.defasagem_pct > 0)
      .reduce((acc, p) => acc + p.defasagem_pct, 0) /
    producaoProteseSUS.filter((p) => p.defasagem_pct > 0).length;

  return (
    <AppShell>
      <PageHeader
        title="Protese Dentaria & Laboratorios"
        subtitle="Panorama completo da reabilitacao protetica: LRPDs, TPDs, materiais, demanda e oferta"
        badge="CNES . SIA/SUS . CFO . ANVISA . Brasil Sorridente"
      />

      {/* Indicadores principais */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total LRPDs"
          value={indicadoresProtese.totalLRPDs_Brasil}
          subtitle="Laboratorios no Brasil"
          icon={Building2}
          color="blue"
        />
        <StatCard
          title="LRPDs SUS"
          value={indicadoresProtese.lrpdSUS}
          subtitle="Credenciados pelo SUS"
          icon={Factory}
          color="green"
        />
        <StatCard
          title="TPDs Registrados"
          value={indicadoresProtese.totalTPDs}
          subtitle="Tecnicos em protese dentaria"
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Producao Anual"
          value={`${(indicadoresProtese.producaoAnual / 1000).toFixed(0)} mil proteses`}
          subtitle="Proteses entregues pelo SUS"
          icon={TrendingUp}
          color="cyan"
        />
      </div>

      {/* Indicadores secundarios */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Fila de Espera SUS"
          value={`${indicadoresProtese.filaEsperaSUS_mil} mil`}
          subtitle="Pacientes aguardando protese"
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Deficit Nacional"
          value={indicadoresProtese.deficitNacionalProteses}
          subtitle="Proteses/ano abaixo da demanda"
          icon={AlertTriangle}
          color="red"
        />
        <StatCard
          title="Pop. Edentula"
          value={`${indicadoresProtese.populacaoEdentula_mi} mi`}
          subtitle="Brasileiros sem dentes"
          icon={ShieldAlert}
          color="red"
        />
        <StatCard
          title="Mercado"
          value={`R$ ${indicadoresProtese.mercadoProtese_bi} bi`}
          subtitle="Mercado de proteses dentarias"
          icon={DollarSign}
          color="green"
        />
      </div>

      {/* Alerta defasagem */}
      <div className="bg-red-600/10 border border-red-600/30 rounded-xl p-4 mb-8 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-red-300 font-medium text-sm">Defasagem Critica nos Valores SUS</p>
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
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-1">Evolucao Proteses SUS (2005-2024)</h2>
          <p className="text-slate-500 text-xs mb-4">Proteses entregues vs fila de espera (em milhares)</p>
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
                name="Proteses Entregues (mil)"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="filaEspera_mil"
                name="Fila de Espera (mil)"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: "#ef4444", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* LRPD por regiao */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-1">LRPD por Regiao</h2>
          <p className="text-slate-500 text-xs mb-4">
            Laboratorios SUS vs Privados e taxa de ocupacao
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={lrpdRegional}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="regiao" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
              <Bar dataKey="lrpdSUS" name="LRPD SUS" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="lrpdPrivados" name="LRPD Privados" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
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
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
        <h2 className="text-white font-semibold mb-1">Demanda vs Oferta por UF</h2>
        <p className="text-slate-500 text-xs mb-4">
          Demanda estimada de proteses vs capacidade instalada (destaque para deficit)
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={demandaVsOferta} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="uf" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
            <Bar dataKey="demandaEstimadaProteses" name="Demanda Estimada" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="capacidadeInstalada" name="Capacidade Instalada" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="deficit" name="Deficit" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabela producao proteses SUS */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
        <h2 className="text-white font-semibold mb-1">Tipos de Protese SUS</h2>
        <p className="text-slate-500 text-xs mb-4">Producao anual, valores e defasagem por tipo</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left text-slate-400 font-medium py-2 px-3">Tipo</th>
                <th className="text-right text-slate-400 font-medium py-2 px-3">Qtd/ano</th>
                <th className="text-right text-slate-400 font-medium py-2 px-3">Valor SUS</th>
                <th className="text-right text-slate-400 font-medium py-2 px-3">Valor Mercado</th>
                <th className="text-right text-slate-400 font-medium py-2 px-3">Defasagem</th>
                <th className="text-left text-slate-400 font-medium py-2 px-3">Material</th>
                <th className="text-right text-slate-400 font-medium py-2 px-3">Tend. 5a</th>
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
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
        <h2 className="text-white font-semibold mb-1">Materiais e Tecnologias</h2>
        <p className="text-slate-500 text-xs mb-4">Participacao de mercado, custos e tendencias</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left text-slate-400 font-medium py-2 px-3">Material</th>
                <th className="text-right text-slate-400 font-medium py-2 px-3">Mercado (%)</th>
                <th className="text-right text-slate-400 font-medium py-2 px-3">Custo Medio</th>
                <th className="text-center text-slate-400 font-medium py-2 px-3">Tendencia</th>
                <th className="text-right text-slate-400 font-medium py-2 px-3">Importado (%)</th>
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
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
        <h2 className="text-white font-semibold mb-1">TPDs por Regiao</h2>
        <p className="text-slate-500 text-xs mb-4">
          Total de tecnicos em protese dentaria e renda media por regiao
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={tpdPorRegiao} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="regiao" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis yAxisId="left" tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `R$${(v / 1000).toFixed(1)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
            <Bar yAxisId="left" dataKey="totalTPDs" name="Total TPDs" radius={[4, 4, 0, 0]}>
              {tpdPorRegiao.map((r) => (
                <Cell key={r.regiao} fill={r.cor} />
              ))}
            </Bar>
            <Bar yAxisId="right" dataKey="rendaMedia" name="Renda Media (R$)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AppShell>
  );
}
