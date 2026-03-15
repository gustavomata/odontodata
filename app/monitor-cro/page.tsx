"use client";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import {
  movimentacaoMensal, movimentacaoPorUF, movimentacaoPorEspecialidade,
  fluxoMigratorio, alertasCompetitivos, indicadoresMonitor,
} from "@/lib/data-monitor-cro";
import {
  UserPlus, TrendingUp, ArrowUpRight, ArrowDownRight, Activity, MapPin, Zap, BarChart3,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { useState } from "react";

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

const tendColor = (t: string) => {
  if (t === "Crescimento") return "bg-emerald-600/20 text-emerald-400";
  if (t === "Estável") return "bg-blue-600/20 text-blue-400";
  return "bg-red-600/20 text-red-400";
};

const impactoColor = (i: string) => {
  if (i === "Alto") return "bg-red-600/20 text-red-400";
  if (i === "Moderado") return "bg-amber-600/20 text-amber-400";
  return "bg-blue-600/20 text-blue-400";
};

const topMigratorios = [...movimentacaoPorUF].sort((a, b) => b.saldo_migratorio - a.saldo_migratorio).slice(0, 10);

export default function MonitorCROPage() {
  const [busca, setBusca] = useState("");
  const ufFiltrados = movimentacaoPorUF.filter((u) => u.estado.toLowerCase().includes(busca.toLowerCase()) || u.uf.toLowerCase().includes(busca.toLowerCase()));

  return (
    <AppShell>
      <PageHeader
        title="Monitor de Movimentação Profissional"
        subtitle="Novos registros, cancelamentos, transferências e fluxos migratórios de cirurgiões-dentistas"
        badge="CFO · CROs Regionais"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Novos Registros/Mês" value={indicadoresMonitor.novosRegistrosMes.toLocaleString("pt-BR")} icon={UserPlus} color="blue" subtitle="Média últimos 12m" />
        <StatCard title="Saldo Líquido 12m" value={indicadoresMonitor.saldoLiquido12m} icon={TrendingUp} color="green" subtitle="Novos - Cancelados" />
        <StatCard title="Maior Crescimento" value={indicadoresMonitor.maiorCrescimentoUF} icon={ArrowUpRight} color="green" subtitle="Santa Catarina" />
        <StatCard title="Maior Evasão" value={indicadoresMonitor.maiorEvasaoUF} icon={ArrowDownRight} color="red" subtitle="Rio de Janeiro" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Espec. + Cresceu" value={indicadoresMonitor.especialidadeMaisCresceu} icon={Zap} color="purple" subtitle="Harmonização Orofacial" />
        <StatCard title="Cidade + Novos" value={indicadoresMonitor.cidadeMaisNovos} icon={MapPin} color="cyan" subtitle="Volume absoluto" />
        <StatCard title="Taxa Transferência" value={indicadoresMonitor.taxaTransferencia} icon={Activity} color="yellow" subtitle="Profissionais migrando" />
        <StatCard title="Média Mensal Histórica" value={indicadoresMonitor.mediaMensalHistorica.toLocaleString("pt-BR")} icon={BarChart3} color="blue" subtitle="Novos registros" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">Movimentação Mensal</h2>
          <p className="text-slate-500 text-xs mb-4">Novos registros vs cancelamentos — Mar/24 a Fev/25</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={movimentacaoMensal} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="mes_label" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
              <Bar dataKey="novos_registros" name="Novos" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cancelamentos" name="Cancelamentos" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="transferencias" name="Transferências" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">Top 10 Estados por Saldo Migratório</h2>
          <p className="text-slate-500 text-xs mb-4">Transferências de entrada menos saída</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={topMigratorios} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis type="category" dataKey="uf" width={40} tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="saldo_migratorio" name="Saldo Migratório" radius={[0, 4, 4, 0]}>
                {topMigratorios.map((entry, i) => (
                  <rect key={i} fill={entry.saldo_migratorio >= 0 ? "#10b981" : "#ef4444"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Movimentação por UF */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-white font-semibold">Movimentação por Estado</h2>
            <p className="text-slate-500 text-xs">Últimos 12 meses — registros, cancelamentos e migrações</p>
          </div>
          <input type="text" placeholder="Buscar estado..." value={busca} onChange={(e) => setBusca(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 w-full sm:w-64" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-2 text-slate-400 font-medium">UF</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium">Novos</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium">Cancel.</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium">Saldo</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium">Migr. In</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium">Migr. Out</th>
                <th className="text-right py-3 px-2 text-slate-400 font-medium">Saldo Migr.</th>
                <th className="text-center py-3 px-2 text-slate-400 font-medium">Tendência</th>
              </tr>
            </thead>
            <tbody>
              {ufFiltrados.map((u) => (
                <tr key={u.uf} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-2 px-2 text-white font-medium">{u.uf}</td>
                  <td className="py-2 px-2 text-right text-blue-400">{u.novos_12_meses.toLocaleString("pt-BR")}</td>
                  <td className="py-2 px-2 text-right text-red-400">{u.cancelados_12_meses.toLocaleString("pt-BR")}</td>
                  <td className="py-2 px-2 text-right text-emerald-400">{u.saldo.toLocaleString("pt-BR")}</td>
                  <td className="py-2 px-2 text-right text-slate-300">{u.transferencias_entrada}</td>
                  <td className="py-2 px-2 text-right text-slate-300">{u.transferencias_saida}</td>
                  <td className={`py-2 px-2 text-right font-bold ${u.saldo_migratorio >= 0 ? "text-emerald-400" : "text-red-400"}`}>{u.saldo_migratorio >= 0 ? "+" : ""}{u.saldo_migratorio}</td>
                  <td className="py-2 px-2 text-center"><span className={`px-2 py-1 rounded-full text-xs font-medium ${tendColor(u.tendencia)}`}>{u.tendencia}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Crescimento por Especialidade */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-white font-semibold mb-4">Crescimento por Especialidade</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-3 text-slate-400 font-medium">Especialidade</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">Novos 12m</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">Crescimento</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">Principal Destino</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">% Capital</th>
              </tr>
            </thead>
            <tbody>
              {movimentacaoPorEspecialidade.map((m) => (
                <tr key={m.especialidade} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-3 px-3 text-white font-medium">{m.especialidade}</td>
                  <td className="py-3 px-3 text-right text-blue-400">{m.novos_registros_12m.toLocaleString("pt-BR")}</td>
                  <td className={`py-3 px-3 text-right font-bold ${m.crescimento_pct >= 15 ? "text-amber-400" : "text-emerald-400"}`}>+{m.crescimento_pct}%</td>
                  <td className="py-3 px-3 text-slate-300">{m.principal_destino_uf}</td>
                  <td className="py-3 px-3 text-right text-slate-300">{m.concentracao_capital_pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fluxos Migratórios */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-white font-semibold mb-4">Principais Fluxos Migratórios</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-3 text-slate-400 font-medium">Origem</th>
                <th className="text-center py-3 px-3 text-slate-400 font-medium">→</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">Destino</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">Volume</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">Especialidade</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">Motivo Provável</th>
              </tr>
            </thead>
            <tbody>
              {fluxoMigratorio.map((f, i) => (
                <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-3 px-3 text-red-400 font-mono">{f.origem_uf}</td>
                  <td className="py-3 px-3 text-center text-slate-500">→</td>
                  <td className="py-3 px-3 text-emerald-400 font-mono">{f.destino_uf}</td>
                  <td className="py-3 px-3 text-right text-white font-bold">{f.volume}</td>
                  <td className="py-3 px-3 text-slate-300 text-xs">{f.principal_especialidade}</td>
                  <td className="py-3 px-3 text-slate-400 text-xs">{f.motivo_provavel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alertas Competitivos */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
        <h2 className="text-white font-semibold mb-4">Alertas Competitivos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alertasCompetitivos.map((a, i) => (
            <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium text-sm">{a.cidade}/{a.uf}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${impactoColor(a.impacto)}`}>{a.impacto}</span>
              </div>
              <p className="text-slate-400 text-xs mb-2">{a.especialidade} — <strong className="text-amber-400">+{a.novos_ultimos_3_meses} novos</strong> nos últimos 3 meses ({a.variacao_pct > 0 ? "+" : ""}{a.variacao_pct}% vs ano anterior)</p>
              <p className="text-slate-500 text-xs">{a.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
