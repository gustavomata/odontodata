"use client";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import { dadosEstabelecimentos } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#06b6d4","#ec4899","#84cc16"];

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

export default function EstabelecimentosPage() {
  const totalEstab = dadosEstabelecimentos.reduce((s, e) => s + e.total, 0);
  const totalDentistas = dadosEstabelecimentos.reduce((s, e) => s + e.dentistasVinculados, 0);

  return (
    <AppShell>
      <PageHeader
        title="Estabelecimentos de Saúde"
        subtitle="Distribuição dos locais de atendimento odontológico no Brasil"
        badge="Fonte: CNES - Cadastro Nacional de Estabelecimentos de Saúde"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-600/20 border border-slate-800 rounded-xl p-3 md:p-5">
          <p className="text-slate-400 text-xs md:text-sm mb-2">Total de Estabelecimentos</p>
          <p className="text-blue-400 text-lg md:text-2xl font-bold">{totalEstab.toLocaleString("pt-BR")}</p>
          <p className="text-slate-500 text-xs mt-1">Cadastrados no CNES</p>
        </div>
        <div className="bg-emerald-600/20 border border-slate-800 rounded-xl p-3 md:p-5">
          <p className="text-slate-400 text-xs md:text-sm mb-2">Dentistas Vinculados</p>
          <p className="text-emerald-400 text-lg md:text-2xl font-bold">{totalDentistas.toLocaleString("pt-BR")}</p>
          <p className="text-slate-500 text-xs mt-1">Vinculações ativas</p>
        </div>
        <div className="bg-amber-600/20 border border-slate-800 rounded-xl p-3 md:p-5">
          <p className="text-slate-400 text-xs md:text-sm mb-2">Estabelecimentos Públicos</p>
          <p className="text-amber-400 text-lg md:text-2xl font-bold">{dadosEstabelecimentos.reduce((s,e)=>s+e.publicos,0).toLocaleString("pt-BR")}</p>
          <p className="text-slate-500 text-xs mt-1">SUS e governo</p>
        </div>
        <div className="bg-purple-600/20 border border-slate-800 rounded-xl p-3 md:p-5">
          <p className="text-slate-400 text-xs md:text-sm mb-2">Estabelecimentos Privados</p>
          <p className="text-purple-400 text-lg md:text-2xl font-bold">{dadosEstabelecimentos.reduce((s,e)=>s+e.privados,0).toLocaleString("pt-BR")}</p>
          <p className="text-slate-500 text-xs mt-1">Clínicas e consultórios</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">Tipos de Estabelecimento</h2>
          <p className="text-slate-500 text-xs mb-4">Quantidade por categoria de estabelecimento</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dadosEstabelecimentos} layout="vertical" margin={{ top: 0, right: 20, left: 90, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="tipo" tick={{ fill: "#94a3b8", fontSize: 10 }} width={85} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" name="Estabelecimentos" fill="#3b82f6" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">Dentistas por Tipo</h2>
          <p className="text-slate-500 text-xs mb-4">Número de dentistas vinculados por tipo de estabelecimento</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={dadosEstabelecimentos} dataKey="dentistasVinculados" nameKey="tipo" cx="50%" cy="50%" outerRadius={100}>
                {dadosEstabelecimentos.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v: any) => [String(v).replace(/\B(?=(\d{3})+(?!\d))/g, "."), "Dentistas"]} contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }} />
              <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
        <h2 className="text-white font-semibold mb-1">Público vs Privado por Tipo</h2>
        <p className="text-slate-500 text-xs mb-4">Comparação da composição pública e privada em cada tipo de estabelecimento</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={dadosEstabelecimentos} layout="vertical" margin={{ top: 0, right: 20, left: 90, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
            <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
            <YAxis type="category" dataKey="tipo" tick={{ fill: "#94a3b8", fontSize: 10 }} width={85} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
            <Bar dataKey="publicos" name="Público" fill="#f59e0b" stackId="a" />
            <Bar dataKey="privados" name="Privado" fill="#3b82f6" stackId="a" radius={[0,4,4,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto mt-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-4">Tabela Detalhada</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Tipo de Estabelecimento</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">Total</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">Públicos</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">Privados</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">Dentistas Vinculados</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">Média Dentistas/Estab.</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">% do Total Estab.</th>
              </tr>
            </thead>
            <tbody>
              {dadosEstabelecimentos.map((e, i) => (
                <tr key={e.tipo} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-slate-200 font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                      {e.tipo}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-mono text-right">{e.total.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-4 text-amber-400 font-mono text-right">{e.publicos.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-4 text-blue-400 font-mono text-right">{e.privados.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono text-right">{e.dentistasVinculados.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono text-right">{(e.dentistasVinculados / e.total).toFixed(1)}</td>
                  <td className="py-3 px-4 text-slate-400 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-slate-800 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full" style={{ width: `${(e.total / totalEstab) * 100 * 3}%`, background: COLORS[i % COLORS.length] }} />
                      </div>
                      <span className="text-xs">{((e.total / totalEstab) * 100).toFixed(1)}%</span>
                    </div>
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
