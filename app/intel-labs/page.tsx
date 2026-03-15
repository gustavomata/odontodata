"use client";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import {
  labsPorRegiao, desertosLaboratoriais, comparativoValores,
  tpdsPorEstado, tecnologiasEmergentes, serieHistoricaLabs, indicadoresLabs,
} from "@/lib/data-intel-labs";
import {
  FlaskConical, Users, AlertTriangle, Clock, TrendingUp, DollarSign, MapPin, Cpu,
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

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

const satColor = (s: string) => {
  if (s === "Saturado") return "bg-red-600/20 text-red-400";
  if (s === "Adequado") return "bg-blue-600/20 text-blue-400";
  if (s === "Carente") return "bg-amber-600/20 text-amber-400";
  return "bg-red-600/20 text-red-400";
};

const tendPColor = (t: string) => {
  if (t === "Explosivo") return "bg-purple-600/20 text-purple-400";
  if (t === "Crescente") return "bg-emerald-600/20 text-emerald-400";
  return "bg-blue-600/20 text-blue-400";
};

export default function IntelLabsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Inteligência de Laboratórios Protéticos"
        subtitle="Análise de capacidade, desertos laboratoriais, comparativo de valores e tecnologias emergentes"
        badge="CNES · CFO (TPD) · DataSUS · ANVISA"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total de Labs" value={indicadoresLabs.totalLabs} icon={FlaskConical} color="blue" subtitle="Laboratórios protéticos" />
        <StatCard title="Labs SUS" value={indicadoresLabs.labsSUS} icon={FlaskConical} color="green" subtitle="Credenciados LRPD" />
        <StatCard title="Produção Mensal" value={indicadoresLabs.producaoMensal} icon={TrendingUp} color="purple" subtitle="Próteses entregues" />
        <StatCard title="Fila de Espera" value={indicadoresLabs.filaEspera} icon={Users} color="red" subtitle="Aguardando prótese" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Tempo Médio Fila" value={indicadoresLabs.tempoMedioFila} icon={Clock} color="yellow" subtitle="Espera no SUS" />
        <StatCard title="Déficit SUS vs Mercado" value={indicadoresLabs.deficitSUSvsMercado} icon={DollarSign} color="red" subtitle="Diferença de valores" />
        <StatCard title="Municípios sem Lab" value={indicadoresLabs.municipiosSemLab_pct} icon={MapPin} color="red" subtitle="Do total de municípios" />
        <StatCard title="Crescimento CAD/CAM" value={indicadoresLabs.crescimentoCADCAM} icon={Cpu} color="cyan" subtitle="Adoção no último ano" />
      </div>

      <div className="bg-red-600/10 border border-red-600/30 rounded-xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-red-400 font-semibold text-sm">Déficit de 89% entre valor SUS e valor de mercado para próteses</p>
            <p className="text-slate-400 text-xs mt-1">Uma prótese total que custa R$ 180 no SUS tem valor de mercado de R$ 1.200-2.800. Isso inviabiliza a adesão de labs ao programa, mantendo 310 mil pessoas na fila de espera. 72% dos municípios brasileiros não possuem laboratório protético.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">Capacidade vs Produção vs Demanda por Região</h2>
          <p className="text-slate-500 text-xs mb-4">Próteses/mês — mostra o gap entre oferta e necessidade</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={labsPorRegiao} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="regiao" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
              <Bar dataKey="capacidade_mensal" name="Capacidade" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="producao_atual_mensal" name="Produção Atual" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="demanda_estimada_mensal" name="Demanda" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">Evolução Labs e Produção 2015-2024</h2>
          <p className="text-slate-500 text-xs mb-4">Crescimento dos laboratórios e fila de espera</p>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={serieHistoricaLabs} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
              <Line yAxisId="left" type="monotone" dataKey="total_labs" name="Total Labs" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2 }} />
              <Line yAxisId="right" type="monotone" dataKey="producao_total" name="Produção Anual" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
              <Line yAxisId="right" type="monotone" dataKey="fila_espera" name="Fila Espera" stroke="#ef4444" strokeWidth={2} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Desertos Laboratoriais */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-white font-semibold mb-4">Desertos Laboratoriais — Oportunidades</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-2 text-slate-400 font-medium">Microrregião</th>
                <th className="text-left py-3 px-2 text-slate-400 font-medium">UF</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium">Pop.</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium">Edêntulos</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium">Lab + Próx.</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium">Déficit/Mês</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium">Score</th>
              </tr>
            </thead>
            <tbody>
              {desertosLaboratoriais.slice(0, 12).map((d) => (
                <tr key={d.municipio} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-3 px-2 text-white font-medium text-xs">{d.municipio}</td>
                  <td className="py-3 px-2 text-slate-300">{d.uf}</td>
                  <td className="py-3 px-2 text-right text-slate-300">{(d.populacao / 1000).toFixed(0)}k</td>
                  <td className="py-3 px-2 text-right text-red-400">{(d.edentulos_estimados / 1000).toFixed(0)}k</td>
                  <td className="py-3 px-2 text-right text-amber-400">{d.lab_mais_proximo_km} km</td>
                  <td className="py-3 px-2 text-right text-red-400">{d.deficit_mensal}</td>
                  <td className={`py-3 px-2 text-right font-bold ${d.oportunidade_score >= 80 ? "text-emerald-400" : d.oportunidade_score >= 60 ? "text-blue-400" : "text-amber-400"}`}>{d.oportunidade_score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparativo Valores */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-white font-semibold mb-4">Comparativo de Valores: SUS vs Mercado</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-2 text-slate-400 font-medium">Tipo de Prótese</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium">Valor SUS</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium">Mercado Médio</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium">Premium</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium">Déficit</th>
                <th className="text-center py-3 px-2 text-slate-400 font-medium">Tendência</th>
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
                  <td className="py-3 px-2 text-center"><span className={`px-2 py-1 rounded-full text-xs font-medium ${c.tendencia_preco === "Alta" ? "bg-red-600/20 text-red-400" : c.tendencia_preco === "Queda" ? "bg-emerald-600/20 text-emerald-400" : "bg-blue-600/20 text-blue-400"}`}>{c.tendencia_preco}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tecnologias Emergentes */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-white font-semibold mb-4">Tecnologias Emergentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tecnologiasEmergentes.map((t) => (
            <div key={t.tecnologia} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-semibold text-sm">{t.tecnologia}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${tendPColor(t.tendencia)}`}>{t.tendencia}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs"><span className="text-slate-400">Adoção Brasil</span><span className="text-blue-400 font-bold">{t.adocao_brasil_pct}%</span></div>
                <div className="w-full bg-slate-700 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${t.adocao_brasil_pct}%` }} /></div>
                <div className="flex justify-between text-xs"><span className="text-slate-400">Adoção Mundial</span><span className="text-emerald-400 font-bold">{t.adocao_mundial_pct}%</span></div>
                <div className="w-full bg-slate-700 rounded-full h-1.5"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${t.adocao_mundial_pct}%` }} /></div>
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-700">
                  <div><p className="text-slate-500 text-xs">Investimento</p><p className="text-white text-xs font-medium">R$ {(t.investimento_medio / 1000).toFixed(0)}k</p></div>
                  <div><p className="text-slate-500 text-xs">ROI</p><p className="text-white text-xs font-medium">{t.roi_estimado_meses} meses</p></div>
                  <div><p className="text-slate-500 text-xs">Produtividade</p><p className="text-emerald-400 text-xs font-medium">+{t.impacto_produtividade_pct}%</p></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TPDs por Estado */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
        <h2 className="text-white font-semibold mb-4">TPDs e Laboratórios por Estado</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-3 text-slate-400 font-medium">UF</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">Estado</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">TPDs</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">Labs</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">Renda Média</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">Demanda</th>
                <th className="text-center py-3 px-3 text-slate-400 font-medium">Saturação</th>
              </tr>
            </thead>
            <tbody>
              {tpdsPorEstado.map((t) => (
                <tr key={t.uf} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-3 px-3 text-slate-300 font-mono">{t.uf}</td>
                  <td className="py-3 px-3 text-white">{t.estado}</td>
                  <td className="py-3 px-3 text-right text-blue-400">{t.tpds_total}</td>
                  <td className="py-3 px-3 text-right text-slate-300">{t.labs_total}</td>
                  <td className="py-3 px-3 text-right text-slate-300">R$ {t.renda_media.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-3 text-right text-slate-300">{t.demanda_estimada.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-3 text-center"><span className={`px-2 py-1 rounded-full text-xs font-medium ${satColor(t.saturacao)}`}>{t.saturacao}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
