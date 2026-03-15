"use client";
import AppShell from "@/components/AppShell";
import StatCard from "@/components/StatCard";
import PageHeader from "@/components/PageHeader";
import {
  indicadoresGerais,
  dadosPorRegiao,
  especialidades,
  serieHistorica,
  CORES_REGIOES,
} from "@/lib/data";
import {
  Users,
  Stethoscope,
  Building2,
  TrendingUp,
  MapPin,
  Award,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
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

export default function Dashboard() {
  const top5Esp = especialidades.slice(0, 5);
  const ultimosAnos = serieHistorica.slice(-5);
  const coberturaPct = Math.round(
    (indicadoresGerais.totalMunicipiosComCobertura / indicadoresGerais.totalMunicipios) * 100
  );

  return (
    <AppShell>
      <PageHeader
        title="Dashboard Nacional"
        subtitle="Visão geral dos cirurgiões-dentistas registrados no Brasil"
        badge="CFO · CNES · IBGE · Março 2025"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total de Dentistas" value={indicadoresGerais.totalDentistas} subtitle="Registros ativos no CFO" icon={Users} color="blue" trend={{ value: indicadoresGerais.crescimentoUltimoAno, label: "vs ano anterior" }} />
        <StatCard title="Dentistas Ativos" value={indicadoresGerais.dentistasAtivos} subtitle="Com anuidade em dia" icon={CheckCircle2} color="green" />
        <StatCard title="Especialistas CFO" value={indicadoresGerais.totalEspecialistas} subtitle="Com especialidade reconhecida" icon={Award} color="purple" />
        <StatCard title="Faculdades de Odontologia" value={indicadoresGerais.faculdadesOdontologia} subtitle={`${indicadoresGerais.vagasAnuais.toLocaleString("pt-BR")} vagas/ano`} icon={Building2} color="cyan" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Setor Público (SUS)" value={indicadoresGerais.dentistasPublicos} subtitle="UBS, CEO, Hospitais" icon={Building2} color="yellow" />
        <StatCard title="Setor Privado" value={indicadoresGerais.dentistasPrivados} subtitle="Clínicas e consultórios" icon={Stethoscope} color="blue" />
        <StatCard title="Municípios com Cobertura" value={`${coberturaPct}%`} subtitle={`${indicadoresGerais.totalMunicipiosComCobertura} de ${indicadoresGerais.totalMunicipios} municípios`} icon={MapPin} color="green" />
        <StatCard title="Méd. Hab./Dentista" value={`1 : ${indicadoresGerais.mediaHabitantesBrasil}`} subtitle={`OMS recomenda 1:${indicadoresGerais.recomendacaoOMS}`} icon={TrendingUp} color="green" />
      </div>

      <div className="bg-amber-600/10 border border-amber-600/30 rounded-xl p-4 mb-8 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-amber-300 font-medium text-sm">Desigualdade Regional</p>
          <p className="text-amber-400/70 text-xs mt-1">
            Enquanto o Sudeste possui 1 dentista para cada <strong>421 habitantes</strong>, a Região Norte tem 1 para cada{" "}
            <strong>852 habitantes</strong>. A OMS recomenda 1 dentista por 1.500 habitantes, mas a distribuição desigual concentra profissionais em grandes centros urbanos.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-1">Dentistas por Região</h2>
          <p className="text-slate-500 text-xs mb-4">Total de registros ativos por grande região</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dadosPorRegiao}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="regiao" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="totalDentistas" name="Total" radius={[4,4,0,0]}>
                {dadosPorRegiao.map((r) => <Cell key={r.regiao} fill={CORES_REGIOES[r.regiao]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-1">Distribuição Regional (%)</h2>
          <p className="text-slate-500 text-xs mb-4">Proporção de dentistas por região do Brasil</p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="60%" height={220}>
              <PieChart>
                <Pie data={dadosPorRegiao} dataKey="totalDentistas" nameKey="regiao" cx="50%" cy="50%" innerRadius={55} outerRadius={90}>
                  {dadosPorRegiao.map((r) => <Cell key={r.regiao} fill={CORES_REGIOES[r.regiao]} />)}
                </Pie>
                <Tooltip formatter={(v: any) => [Number(v).toLocaleString("pt-BR"), "Dentistas"]} contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {dadosPorRegiao.map((r) => {
                const pct = Math.round((r.totalDentistas / indicadoresGerais.totalDentistas) * 100);
                return (
                  <div key={r.regiao} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: CORES_REGIOES[r.regiao] }} />
                    <span className="text-slate-300 text-xs flex-1">{r.regiao}</span>
                    <span className="text-slate-400 text-xs font-mono">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-1">Top 5 Especialidades</h2>
          <p className="text-slate-500 text-xs mb-4">Especialidades com maior número de profissionais</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={top5Esp} layout="vertical" margin={{ top: 0, right: 20, left: 90, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="especialidade" tick={{ fill: "#94a3b8", fontSize: 11 }} width={85} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" name="Dentistas" fill="#3b82f6" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-1">Crescimento (2020–2024)</h2>
          <p className="text-slate-500 text-xs mb-4">Evolução do total de dentistas registrados</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ultimosAnos} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
              <Line type="monotone" dataKey="total" name="Total" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6", r: 4 }} />
              <Line type="monotone" dataKey="novosRegistros" name="Novos Registros" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-white font-semibold mb-1">Público vs. Privado por Região</h2>
        <p className="text-slate-500 text-xs mb-4">Comparação da distribuição entre setor público (SUS) e privado</p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dadosPorRegiao}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="regiao" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
            <Bar dataKey="dentistasPublicos" name="Público (SUS)" fill="#f59e0b" stackId="a" />
            <Bar dataKey="dentistasPrivados" name="Privado" fill="#3b82f6" stackId="a" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AppShell>
  );
}
