"use client";
import { useState } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import { dadosPorEstado, dadosPorRegiao, CORES_REGIOES } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from "recharts";
import { Search } from "lucide-react";

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

const getRatioCor = (ratio: number) => {
  if (ratio <= 400) return "text-emerald-400 bg-emerald-400/10";
  if (ratio <= 600) return "text-blue-400 bg-blue-400/10";
  if (ratio <= 800) return "text-amber-400 bg-amber-400/10";
  return "text-red-400 bg-red-400/10";
};

export default function RegioesPage() {
  const [search, setSearch] = useState("");
  const [regiao, setRegiao] = useState("Todas");
  const [sortBy, setSortBy] = useState<keyof typeof dadosPorEstado[0]>("totalDentistas");

  const regioes = ["Todas", ...Array.from(new Set(dadosPorEstado.map((e) => e.regiao)))];

  const filtered = dadosPorEstado
    .filter((e) => {
      const matchSearch = e.estado.toLowerCase().includes(search.toLowerCase()) || e.uf.toLowerCase().includes(search.toLowerCase());
      const matchRegiao = regiao === "Todas" || e.regiao === regiao;
      return matchSearch && matchRegiao;
    })
    .sort((a, b) => (Number(b[sortBy]) || 0) - (Number(a[sortBy]) || 0));

  const top10 = dadosPorEstado.slice().sort((a, b) => b.totalDentistas - a.totalDentistas).slice(0, 10);
  const ratioData = dadosPorEstado.slice().sort((a, b) => a.dentistaPorHabitante - b.dentistaPorHabitante);

  return (
    <AppShell>
      <PageHeader
        title="Regiões & Estados"
        subtitle="Distribuição de dentistas pelos 26 estados + DF do Brasil"
        badge="Fonte: CFO · IBGE 2023"
      />

      {/* Região Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        {dadosPorRegiao.map((r) => (
          <div key={r.regiao} className="bg-slate-900 border border-slate-800 rounded-xl p-4" style={{ borderLeftColor: CORES_REGIOES[r.regiao], borderLeftWidth: 3 }}>
            <p className="text-slate-400 text-xs mb-1">{r.regiao}</p>
            <p className="text-white font-bold text-lg">{r.totalDentistas.toLocaleString("pt-BR")}</p>
            <p className="text-slate-500 text-xs mt-1">{r.estados} estados · 1:{r.dentistaPorHabitante}</p>
            <div className="mt-2 grid grid-cols-2 gap-1">
              <div>
                <p className="text-amber-400 text-xs font-medium">{r.dentistasPublicos.toLocaleString("pt-BR")}</p>
                <p className="text-slate-600 text-xs">Público</p>
              </div>
              <div>
                <p className="text-blue-400 text-xs font-medium">{r.dentistasPrivados.toLocaleString("pt-BR")}</p>
                <p className="text-slate-600 text-xs">Privado</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">Top 10 Estados por Volume</h2>
          <p className="text-slate-500 text-xs mb-4">Estados com maior número de dentistas</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={top10} layout="vertical" margin={{ top: 0, right: 20, left: 40, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="uf" tick={{ fill: "#94a3b8", fontSize: 11 }} width={35} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="totalDentistas" name="Dentistas" fill="#3b82f6" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">Habitantes por Dentista</h2>
          <p className="text-slate-500 text-xs mb-4">Cobertura — menor valor = melhor atendimento</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ratioData} layout="vertical" margin={{ top: 0, right: 20, left: 40, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis type="category" dataKey="uf" tick={{ fill: "#94a3b8", fontSize: 10 }} width={35} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="dentistaPorHabitante" name="Hab/Dentista" fill="#f59e0b" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabela de Estados */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-white font-semibold">Tabela por Estado</h2>
            <p className="text-slate-500 text-xs mt-0.5">{filtered.length} estados</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-500" />
              <input type="text" placeholder="Buscar estado..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 w-full sm:w-44" />
            </div>
            <select value={regiao} onChange={(e) => setRegiao(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500">
              {regioes.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <select value={sortBy as string} onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500">
              <option value="totalDentistas">Por total</option>
              <option value="dentistaPorHabitante">Por cobertura</option>
              <option value="populacao">Por população</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-3 text-slate-400 font-medium">UF</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">Estado</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">Região</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">População</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">Total Dentistas</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">Público</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">Privado</th>
                <th className="text-center py-3 px-3 text-slate-400 font-medium">Hab/Dentista</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">Municípios</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">Estabelec.</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.uf} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3">
                    <span className="bg-slate-800 text-slate-300 text-xs font-mono font-bold px-2 py-1 rounded">{e.uf}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-200 font-medium">{e.estado}</td>
                  <td className="py-3 px-3">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: CORES_REGIOES[e.regiao] + "30", color: CORES_REGIOES[e.regiao] }}>{e.regiao}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-400 text-right font-mono">{e.populacao.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-3 text-white font-bold text-right font-mono">{e.totalDentistas.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-3 text-amber-400 text-right font-mono">{e.dentistasPublicos.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-3 text-blue-400 text-right font-mono">{e.dentistasPrivados.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-3 text-center">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${getRatioCor(e.dentistaPorHabitante)}`}>
                      1:{e.dentistaPorHabitante}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400 text-right font-mono">{e.municipios.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-3 text-slate-400 text-right font-mono">{e.estabelecimentos.toLocaleString("pt-BR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
