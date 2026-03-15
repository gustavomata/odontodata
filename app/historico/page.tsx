"use client";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import { serieHistorica } from "@/lib/data";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from "recharts";
import { TrendingUp } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm">
        <p className="text-slate-300 font-medium mb-1">Ano {label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color || "#94a3b8" }}>
            {p.name}: <strong>{p.value.toLocaleString("pt-BR")}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function HistoricoPage() {
  const crescimentoAnual = serieHistorica.slice(1).map((d, i) => ({
    ano: d.ano,
    crescimento: Number(((d.total - serieHistorica[i].total) / serieHistorica[i].total * 100).toFixed(2)),
    saldo: d.novosRegistros - d.cancelamentos,
  }));

  const totalCrescimento = serieHistorica[serieHistorica.length - 1].total - serieHistorica[0].total;
  const pctCrescimento = ((totalCrescimento / serieHistorica[0].total) * 100).toFixed(1);
  const mediaAnual = serieHistorica.reduce((s, d) => s + d.novosRegistros, 0) / serieHistorica.length;

  return (
    <AppShell>
      <PageHeader
        title="Série Histórica"
        subtitle="Evolução do número de cirurgiões-dentistas no Brasil (2015–2024)"
        badge="Fonte: CFO - Registros Anuais"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-600/20 border border-slate-800 rounded-xl p-3 md:p-5">
          <p className="text-slate-400 text-xs md:text-sm mb-2">Crescimento Total (10 anos)</p>
          <p className="text-blue-400 text-lg md:text-2xl font-bold">+{totalCrescimento.toLocaleString("pt-BR")}</p>
          <p className="text-slate-500 text-xs mt-1">{pctCrescimento}% de 2015 a 2024</p>
        </div>
        <div className="bg-emerald-600/20 border border-slate-800 rounded-xl p-3 md:p-5">
          <p className="text-slate-400 text-xs md:text-sm mb-2">Média Novos Registros/Ano</p>
          <p className="text-emerald-400 text-lg md:text-2xl font-bold">{Math.round(mediaAnual).toLocaleString("pt-BR")}</p>
          <p className="text-slate-500 text-xs mt-1">Novos dentistas por ano</p>
        </div>
        <div className="bg-amber-600/20 border border-slate-800 rounded-xl p-3 md:p-5">
          <p className="text-slate-400 text-xs md:text-sm mb-2">Maior Crescimento</p>
          <p className="text-amber-400 text-lg md:text-2xl font-bold">2022–2023</p>
          <p className="text-slate-500 text-xs mt-1">+21.400 registros em 2023</p>
        </div>
        <div className="bg-red-600/20 border border-slate-800 rounded-xl p-3 md:p-5">
          <p className="text-slate-400 text-xs md:text-sm mb-2">Impacto COVID-19</p>
          <p className="text-red-400 text-lg md:text-2xl font-bold">2020</p>
          <p className="text-slate-500 text-xs mt-1">Queda de 16% nos novos registros</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
        <h2 className="text-white font-semibold mb-1">Total de Dentistas (2015–2024)</h2>
        <p className="text-slate-500 text-xs mb-4">Evolução do estoque total de cirurgiões-dentistas registrados no CFO</p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={serieHistorica} margin={{ top: 5, right: 20, left: 20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="total" name="Total Dentistas" stroke="#3b82f6" fill="url(#gradTotal)" strokeWidth={2} dot={{ fill: "#3b82f6", r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">Novos Registros vs Cancelamentos</h2>
          <p className="text-slate-500 text-xs mb-4">Entradas e saídas anuais no registro do CFO</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={serieHistorica} margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
              <Bar dataKey="novosRegistros" name="Novos Registros" fill="#10b981" radius={[4,4,0,0]} />
              <Bar dataKey="cancelamentos" name="Cancelamentos" fill="#ef4444" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">Crescimento Percentual Anual</h2>
          <p className="text-slate-500 text-xs mb-4">Taxa de crescimento do número de dentistas a cada ano</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={crescimentoAnual} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
              <Line type="monotone" dataKey="crescimento" name="Crescimento %" stroke="#f59e0b" strokeWidth={2} dot={{ fill: "#f59e0b", r: 4 }} />
              <Line type="monotone" dataKey="saldo" name="Saldo Líquido" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6", r: 4 }} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
        <h2 className="text-white font-semibold mb-4">Tabela Histórica Completa</h2>
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left py-3 px-4 text-slate-400 font-medium">Ano</th>
              <th className="text-right py-3 px-4 text-slate-400 font-medium">Total Acumulado</th>
              <th className="text-right py-3 px-4 text-slate-400 font-medium">Novos Registros</th>
              <th className="text-right py-3 px-4 text-slate-400 font-medium">Cancelamentos</th>
              <th className="text-right py-3 px-4 text-slate-400 font-medium">Saldo Líquido</th>
              <th className="text-right py-3 px-4 text-slate-400 font-medium">Crescimento %</th>
            </tr>
          </thead>
          <tbody>
            {serieHistorica.map((d, i) => {
              const prev = i > 0 ? serieHistorica[i - 1].total : d.total;
              const pct = i > 0 ? ((d.total - prev) / prev * 100).toFixed(2) : "-";
              const saldo = d.novosRegistros - d.cancelamentos;
              return (
                <tr key={d.ano} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-slate-200 font-bold">{d.ano}</td>
                  <td className="py-3 px-4 text-blue-400 font-mono font-bold text-right">{d.total.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono text-right">+{d.novosRegistros.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-4 text-red-400 font-mono text-right">-{d.cancelamentos.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-4 font-mono text-right">
                    <span className={saldo >= 0 ? "text-emerald-400" : "text-red-400"}>
                      {saldo >= 0 ? "+" : ""}{saldo.toLocaleString("pt-BR")}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {pct === "-" ? (
                      <span className="text-slate-500">—</span>
                    ) : (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${Number(pct) >= 4 ? "bg-emerald-400/10 text-emerald-400" : "bg-blue-400/10 text-blue-400"}`}>
                        +{pct}%
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </AppShell>
  );
}
