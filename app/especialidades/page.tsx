"use client";
import { useState } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import { especialidades } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, Cell } from "recharts";
import { TrendingUp, TrendingDown, CheckCircle2, XCircle, Search } from "lucide-react";

const COLORS = ["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#06b6d4","#ec4899","#84cc16","#f97316","#6366f1","#14b8a6","#e11d48","#7c3aed","#0284c7","#16a34a","#ca8a04","#dc2626","#9333ea","#0891b2","#65a30d"];

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

export default function EspecialidadesPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"total" | "crescimentoAnual">("total");

  const filtered = especialidades
    .filter((e) => e.especialidade.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (b[sortBy] as number) - (a[sortBy] as number));

  const crescimento = especialidades.slice().sort((a, b) => b.crescimentoAnual - a.crescimentoAnual).slice(0, 8);

  return (
    <AppShell>
      <PageHeader
        title="Especialidades Odontológicas"
        subtitle="22 especialidades reconhecidas pelo CFO — distribuição e crescimento"
        badge="Fonte: CFO - Conselho Federal de Odontologia"
      />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-1">Volume por Especialidade</h2>
          <p className="text-slate-500 text-xs mb-4">Número de profissionais registrados por especialidade</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={especialidades.slice(0, 10)} layout="vertical" margin={{ top: 0, right: 20, left: 130, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="especialidade" tick={{ fill: "#94a3b8", fontSize: 10 }} width={125} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" name="Dentistas" radius={[0,4,4,0]}>
                {especialidades.slice(0,10).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-1">Crescimento Anual (%)</h2>
          <p className="text-slate-500 text-xs mb-4">Especialidades com maior expansão no último ano</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={crescimento} layout="vertical" margin={{ top: 0, right: 20, left: 130, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="especialidade" tick={{ fill: "#94a3b8", fontSize: 10 }} width={125} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="crescimentoAnual" name="Crescimento %" radius={[0,4,4,0]}>
                {crescimento.map((e, i) => <Cell key={i} fill={e.crescimentoAnual >= 5 ? "#10b981" : e.crescimentoAnual >= 0 ? "#3b82f6" : "#ef4444"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-white font-semibold">Todas as Especialidades</h2>
            <p className="text-slate-500 text-xs mt-0.5">{filtered.length} especialidades encontradas</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar especialidade..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 w-52"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="total">Por volume</option>
              <option value="crescimentoAnual">Por crescimento</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">#</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Especialidade</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Profissionais</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">% do Total</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Cresc. Anual</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Reconh. CFO</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((esp, idx) => (
                <tr key={esp.especialidade} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-slate-500">{idx + 1}</td>
                  <td className="py-3 px-4 text-slate-200 font-medium">{esp.especialidade}</td>
                  <td className="py-3 px-4 text-slate-300 font-mono">{esp.total.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-800 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(esp.porcentagem / 33.2) * 100}%` }} />
                      </div>
                      <span className="text-slate-400 text-xs">{esp.porcentagem}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`flex items-center gap-1 text-xs font-medium ${esp.crescimentoAnual >= 5 ? "text-emerald-400" : esp.crescimentoAnual >= 0 ? "text-blue-400" : "text-red-400"}`}>
                      {esp.crescimentoAnual >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {esp.crescimentoAnual >= 0 ? "+" : ""}{esp.crescimentoAnual}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {esp.reconhecidaCFO ? (
                      <span className="flex items-center gap-1 text-emerald-400 text-xs"><CheckCircle2 className="w-3 h-3" /> Sim</span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-500 text-xs"><XCircle className="w-3 h-3" /> Não</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-xs max-w-xs">{esp.descricao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
