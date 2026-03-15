"use client";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import {
  scoreOportunidadeMunicipio,
  saturacaoPorEspecialidade,
  rankingEstados,
  criteriosPeso,
  indicadoresOndeAbrir,
} from "@/lib/data-onde-abrir";
import {
  MapPin, Users, AlertTriangle, Target, TrendingUp, Compass, Award, GraduationCap,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis, Cell,
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

const scoreColor = (score: number) => {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-blue-400";
  if (score >= 40) return "text-amber-400";
  return "text-red-400";
};

const classColor = (c: string) => {
  if (c === "Excelente") return "bg-emerald-600/20 text-emerald-400";
  if (c === "Muito Bom") return "bg-blue-600/20 text-blue-400";
  if (c === "Bom") return "bg-cyan-600/20 text-cyan-400";
  if (c === "Moderado") return "bg-amber-600/20 text-amber-400";
  return "bg-red-600/20 text-red-400";
};

const tendColor = (t: string) => {
  if (t === "Oportunidade") return "bg-emerald-600/20 text-emerald-400";
  if (t === "Estavel") return "bg-blue-600/20 text-blue-400";
  return "bg-red-600/20 text-red-400";
};

const top15 = [...scoreOportunidadeMunicipio].sort((a, b) => b.score_oportunidade - a.score_oportunidade).slice(0, 15);
const scatterData = scoreOportunidadeMunicipio.map((m) => ({ name: m.municipio, x: m.renda_per_capita, y: m.score_oportunidade, z: m.populacao }));

export default function OndeAbrirPage() {
  const [busca, setBusca] = useState("");
  const [buscaEstado, setBuscaEstado] = useState("");

  const especFiltradas = saturacaoPorEspecialidade.filter((e) => e.especialidade.toLowerCase().includes(busca.toLowerCase()));
  const estadosFiltrados = rankingEstados.filter((e) => e.estado.toLowerCase().includes(buscaEstado.toLowerCase()) || e.uf.toLowerCase().includes(buscaEstado.toLowerCase()));

  return (
    <AppShell>
      <PageHeader
        title="Onde Abrir — Inteligência Locacional"
        subtitle="Score de oportunidade por município baseado em saturação, demanda epidemiológica, potencial econômico e pipeline de formandos"
        badge="CFO · IBGE · CNES · DataSUS · INEP"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Municípios sem Dentista" value={indicadoresOndeAbrir.municipiosSemDentista} icon={AlertTriangle} color="red" subtitle="Nenhum CD registrado" />
        <StatCard title="Pop. Desassistida" value={indicadoresOndeAbrir.populacaoDesassistida_mi + " mi"} icon={Users} color="red" subtitle="Sem acesso a CD" />
        <StatCard title="Score Médio Nacional" value={indicadoresOndeAbrir.scoreMedioNacional + "/100"} icon={Target} color="yellow" subtitle="Oportunidade média" />
        <StatCard title="Municípios c/ Oportunidade" value={indicadoresOndeAbrir.municipiosOportunidade.toLocaleString("pt-BR")} icon={MapPin} color="green" subtitle="Score > 50" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Estado + Oportunidades" value={indicadoresOndeAbrir.estadoMaisOportunidades} icon={Compass} color="blue" subtitle="Pará lidera o ranking" />
        <StatCard title="Especialidade + Carente" value={indicadoresOndeAbrir.especialidadeMaisCarente} icon={TrendingUp} color="purple" subtitle="Maior déficit nacional" />
        <StatCard title="Score Máximo" value={indicadoresOndeAbrir.scoreMáximoEncontrado} icon={Award} color="green" subtitle="Breves/PA" />
        <StatCard title="Pipeline Formandos/Ano" value={indicadoresOndeAbrir.pipelineFormandosAno.toLocaleString("pt-BR")} icon={GraduationCap} color="cyan" subtitle="Novos CDs entrando no mercado" />
      </div>

      {/* Alert */}
      <div className="bg-red-600/10 border border-red-600/30 rounded-xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-red-400 font-semibold text-sm">412 municípios brasileiros não possuem nenhum dentista registrado</p>
            <p className="text-slate-400 text-xs mt-1">Essas localidades representam 23.4 milhões de habitantes sem acesso a atendimento odontológico. As regiões Norte e Nordeste concentram 78% desses municípios. Há oportunidades reais para profissionais dispostos a atuar fora dos grandes centros.</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">Top 15 Municípios por Score de Oportunidade</h2>
          <p className="text-slate-500 text-xs mb-4">Score composto (0-100) — quanto maior, melhor a oportunidade</p>
          <ResponsiveContainer width="100%" height={420}>
            <BarChart data={top15} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis type="category" dataKey="municipio" width={110} tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score_oportunidade" name="Score" radius={[0, 4, 4, 0]}>
                {top15.map((entry, i) => (
                  <Cell key={i} fill={entry.score_oportunidade >= 80 ? "#10b981" : entry.score_oportunidade >= 60 ? "#3b82f6" : "#f59e0b"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">Score vs Renda per Capita</h2>
          <p className="text-slate-500 text-xs mb-4">Oportunidade não é apenas baixa renda — municípios com boa renda e pouca concorrência são ideais</p>
          <ResponsiveContainer width="100%" height={420}>
            <ScatterChart margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" dataKey="x" name="Renda per Capita" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `R$${v}`} />
              <YAxis type="number" dataKey="y" name="Score" domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <ZAxis type="number" dataKey="z" range={[40, 400]} name="População" />
              <Tooltip content={({ active, payload }: any) => {
                if (active && payload?.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm">
                      <p className="text-white font-medium">{d.name}</p>
                      <p className="text-slate-400">Renda: R$ {d.x.toLocaleString("pt-BR")}</p>
                      <p className="text-slate-400">Score: {d.y}</p>
                      <p className="text-slate-400">Pop: {d.z.toLocaleString("pt-BR")}</p>
                    </div>
                  );
                }
                return null;
              }} />
              <Scatter data={scatterData} fill="#3b82f6">
                {scatterData.map((entry, i) => (
                  <Cell key={i} fill={entry.y >= 80 ? "#10b981" : entry.y >= 60 ? "#3b82f6" : entry.y >= 40 ? "#f59e0b" : "#ef4444"} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Saturação por Especialidade */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-white font-semibold">Saturação por Especialidade</h2>
            <p className="text-slate-500 text-xs">Profissionais por 100k habitantes — média nacional vs extremos</p>
          </div>
          <input
            type="text" placeholder="Buscar especialidade..." value={busca} onChange={(e) => setBusca(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 w-full sm:w-64"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-3 text-slate-400 font-medium">Especialidade</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">Média Nacional</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">Mais Saturada</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">Maior Oportunidade</th>
                <th className="text-center py-3 px-3 text-slate-400 font-medium">Tendência</th>
              </tr>
            </thead>
            <tbody>
              {especFiltradas.map((e) => (
                <tr key={e.especialidade} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-3 px-3 text-white font-medium">{e.especialidade}</td>
                  <td className="py-3 px-3 text-right text-slate-300">{e.media_nacional}/100k</td>
                  <td className="py-3 px-3 text-red-400 text-xs">{e.top5_saturadas[0].cidade} ({e.top5_saturadas[0].valor})</td>
                  <td className="py-3 px-3 text-emerald-400 text-xs">{e.top5_oportunidades[0].cidade} ({e.top5_oportunidades[0].valor})</td>
                  <td className="py-3 px-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${tendColor(e.tendencia)}`}>{e.tendencia}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ranking por Estado */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-white font-semibold">Ranking de Oportunidade por Estado</h2>
            <p className="text-slate-500 text-xs">Score médio dos municípios de cada estado</p>
          </div>
          <input
            type="text" placeholder="Buscar estado..." value={buscaEstado} onChange={(e) => setBuscaEstado(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 w-full sm:w-64"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-3 text-slate-400 font-medium">UF</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">Estado</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">Score Médio</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">Melhor Município</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">Pior Município</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">% Sem Acesso</th>
              </tr>
            </thead>
            <tbody>
              {estadosFiltrados.map((e) => (
                <tr key={e.uf} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-3 px-3 text-slate-300 font-mono">{e.uf}</td>
                  <td className="py-3 px-3 text-white">{e.estado}</td>
                  <td className={`py-3 px-3 text-right font-bold ${scoreColor(e.score_medio)}`}>{e.score_medio}</td>
                  <td className="py-3 px-3 text-emerald-400 text-xs">{e.melhor_municipio}</td>
                  <td className="py-3 px-3 text-red-400 text-xs">{e.pior_municipio}</td>
                  <td className="py-3 px-3 text-right text-slate-300">{e.populacao_sem_acesso_pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Methodology */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
        <h2 className="text-white font-semibold mb-4">Metodologia do Score de Oportunidade</h2>
        <p className="text-slate-400 text-xs mb-4">O score combina 5 dimensões normalizadas (0-100) com os seguintes pesos:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(criteriosPeso).map(([key, peso]) => {
            const labels: Record<string, string> = {
              saturacao: "Saturação Profissional",
              demanda_epidemiologica: "Demanda Epidemiológica",
              potencial_economico: "Potencial Econômico",
              cobertura_sus: "Cobertura SUS",
              pipeline_formandos: "Pipeline Formandos",
            };
            const descs: Record<string, string> = {
              saturacao: "Inverso da razão dentista/hab. Menos dentistas = mais pontos",
              demanda_epidemiologica: "CPO-D, edentulismo, doenças bucais prevalentes",
              potencial_economico: "Renda per capita, IDH, crescimento econômico",
              cobertura_sus: "Inverso da cobertura ESB — menos cobertura = oportunidade",
              pipeline_formandos: "Inverso do nº de formandos locais — menos pipeline = melhor",
            };
            return (
              <div key={key} className="bg-slate-800 rounded-lg p-4">
                <div className="text-blue-400 font-bold text-2xl mb-1">{peso}%</div>
                <div className="text-white text-sm font-medium mb-1">{labels[key]}</div>
                <div className="text-slate-500 text-xs">{descs[key]}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
