"use client";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import {
  topFaculdades,
  formacaoRegional,
  posGraduacao,
  tendenciaFormacao,
  saturacaoMercado,
  producaoCientifica,
  egressosMercado,
  indicadoresUniversidades,
} from "@/lib/data-universidades";
import {
  GraduationCap,
  Users,
  BookOpen,
  Globe,
  Award,
  FileText,
  Target,
  TrendingDown,
  AlertTriangle,
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
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm">
        <p className="text-slate-300 font-medium mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString("pt-BR") : p.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const tipoBadge = (tipo: string) => {
  if (tipo.includes("Federal")) return "bg-blue-600/20 text-blue-400 border-blue-600/30";
  if (tipo.includes("Estadual")) return "bg-emerald-600/20 text-emerald-400 border-emerald-600/30";
  if (tipo === "Privada") return "bg-amber-600/20 text-amber-400 border-amber-600/30";
  return "bg-purple-600/20 text-purple-400 border-purple-600/30";
};

const saturacaoBadge = (nivel: string) => {
  const map: Record<string, string> = {
    "Crítico": "bg-red-600/20 text-red-400 border-red-600/30",
    "Alto": "bg-orange-600/20 text-orange-400 border-orange-600/30",
    "Moderado": "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
    "Baixo": "bg-green-600/20 text-green-400 border-green-600/30",
    "Adequado": "bg-emerald-600/20 text-emerald-400 border-emerald-600/30",
  };
  return map[nivel] || "bg-slate-600/20 text-slate-400 border-slate-600/30";
};

export default function UniversidadesPage() {
  return (
    <AppShell>
      <PageHeader
        title="Formação & Universidades"
        subtitle="Faculdades, pós-graduação, pesquisa e inserção no mercado de trabalho"
        badge="INEP · e-MEC · CAPES · CNPq · CFO"
      />

      {/* Indicadores principais */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Faculdades"
          value={indicadoresUniversidades.totalFaculdades}
          subtitle={`${indicadoresUniversidades.faculdadesPublicas} públicas + ${indicadoresUniversidades.faculdadesPrivadas} privadas`}
          icon={GraduationCap}
          color="blue"
        />
        <StatCard
          title="Vagas/Ano"
          value={indicadoresUniversidades.vagasAnuais}
          icon={Users}
          color="green"
        />
        <StatCard
          title="Concluintes/Ano"
          value={indicadoresUniversidades.concluintesAnuais}
          icon={BookOpen}
          color="yellow"
        />
        <StatCard
          title="Ranking Mundial Pesquisa"
          value={`${indicadoresUniversidades.brasilRankingMundial}º lugar`}
          icon={Globe}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Programas Pós-Grad"
          value={indicadoresUniversidades.programasPosGrad}
          icon={Award}
          color="cyan"
        />
        <StatCard
          title="Artigos/Ano"
          value={indicadoresUniversidades.artigosPublicados_ano}
          icon={FileText}
          color="blue"
        />
        <StatCard
          title="Cand/Vaga Pública"
          value={indicadoresUniversidades.mediaCandVagaPublica}
          icon={Target}
          color="red"
        />
        <StatCard
          title="Evasão Média"
          value={`${indicadoresUniversidades.taxaEvasaoMedia}%`}
          icon={TrendingDown}
          color="yellow"
        />
      </div>

      {/* Alerta saturação */}
      <div className="bg-amber-600/10 border border-amber-600/30 rounded-xl p-4 mb-8 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-amber-400 font-medium text-sm">Atenção: Saturação do mercado odontológico</p>
          <p className="text-slate-400 text-xs mt-1">
            O Brasil possui mais dentistas per capita do que o recomendado pela OMS, porém com severa desigualdade regional.
            Enquanto capitais do Sudeste apresentam índices de saturação críticos, vastas áreas do Norte e Nordeste permanecem
            desassistidas.
          </p>
        </div>
      </div>

      {/* Evolução faculdades */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
        <h2 className="text-white font-semibold mb-4">Evolução de Faculdades de Odontologia (2005–2024)</h2>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={tendenciaFormacao}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="ano" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
            <Line yAxisId="left" type="monotone" dataKey="faculdadesPublicas" name="Públicas" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
            <Line yAxisId="left" type="monotone" dataKey="faculdadesPrivadas" name="Privadas" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
            <Line yAxisId="right" type="monotone" dataKey="vagasOfertadas" name="Vagas Ofertadas" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Formação por região */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
        <h2 className="text-white font-semibold mb-4">Formação por Região</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={formacaoRegional}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="regiao" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tick={{ fontSize: 12 }} domain={[0, 5]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
            <Bar yAxisId="left" dataKey="faculdadesPublicas" name="Públicas" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="left" dataKey="faculdadesPrivadas" name="Privadas" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="mediaEnade" name="Média ENADE" stroke="#EF4444" strokeWidth={2} dot={{ r: 4 }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Faculdades */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6 overflow-x-auto">
        <h2 className="text-white font-semibold mb-4">Top Faculdades de Odontologia</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-slate-800">
              <th className="text-left py-2 px-3">Sigla</th>
              <th className="text-left py-2 px-3">Instituição</th>
              <th className="text-left py-2 px-3">UF</th>
              <th className="text-left py-2 px-3">Tipo</th>
              <th className="text-right py-2 px-3">ENADE</th>
              <th className="text-right py-2 px-3">CPC</th>
              <th className="text-right py-2 px-3">Vagas/Ano</th>
              <th className="text-right py-2 px-3">Concluintes</th>
              <th className="text-right py-2 px-3">Evasão %</th>
            </tr>
          </thead>
          <tbody>
            {topFaculdades.map((f) => (
              <tr key={f.sigla} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                <td className="py-2 px-3 text-white font-medium">{f.sigla}</td>
                <td className="py-2 px-3 text-slate-300">{f.instituicao}</td>
                <td className="py-2 px-3 text-slate-400">{f.uf}</td>
                <td className="py-2 px-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${tipoBadge(f.tipo)}`}>{f.tipo}</span>
                </td>
                <td className="py-2 px-3 text-right text-slate-300">{f.notaEnade}</td>
                <td className="py-2 px-3 text-right text-slate-300">{f.cpc}</td>
                <td className="py-2 px-3 text-right text-slate-300">{f.vagas_ano}</td>
                <td className="py-2 px-3 text-right text-slate-300">{f.concluintes_ano}</td>
                <td className="py-2 px-3 text-right text-slate-300">{f.taxaEvasao_pct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Egressos no mercado */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
        <h2 className="text-white font-semibold mb-4">Egressos no Mercado de Trabalho</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={egressosMercado}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="anosAposFormatura" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
            <Bar yAxisId="left" dataKey="empregado_pct" name="Empregado %" stackId="a" fill="#3B82F6" />
            <Bar yAxisId="left" dataKey="autonomo_pct" name="Autônomo %" stackId="a" fill="#10B981" />
            <Bar yAxisId="left" dataKey="desempregado_pct" name="Desempregado %" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="rendaMedia" name="Renda Média (R$)" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4 }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Saturação por UF */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6 overflow-x-auto">
        <h2 className="text-white font-semibold mb-4">Saturação do Mercado por UF</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-slate-800">
              <th className="text-left py-2 px-3">UF</th>
              <th className="text-right py-2 px-3">Concluintes/Ano</th>
              <th className="text-right py-2 px-3">Dentista:Hab</th>
              <th className="text-right py-2 px-3">Absorção %</th>
              <th className="text-left py-2 px-3">Saturação</th>
            </tr>
          </thead>
          <tbody>
            {saturacaoMercado.map((s) => (
              <tr key={s.uf} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                <td className="py-2 px-3 text-white font-medium">{s.uf}</td>
                <td className="py-2 px-3 text-right text-slate-300">{s.concluintesAnuais.toLocaleString("pt-BR")}</td>
                <td className="py-2 px-3 text-right text-slate-300">1:{s.ratioDentistaHab}</td>
                <td className="py-2 px-3 text-right text-slate-300">{s.indiceAbsorcao_pct}%</td>
                <td className="py-2 px-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${saturacaoBadge(s.indiceSaturacao)}`}>
                    {s.indiceSaturacao}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Produção Científica */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
        <h2 className="text-white font-semibold mb-4">Produção Científica por Área</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={producaoCientifica} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis dataKey="area" type="category" stroke="#94a3b8" tick={{ fontSize: 11 }} width={140} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
            <Bar dataKey="artigosNacionais_ano" name="Artigos Nacionais" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="artigosInternacionais_ano" name="Artigos Internacionais" fill="#10B981" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pós-Graduação */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6 overflow-x-auto">
        <h2 className="text-white font-semibold mb-4">Programas de Pós-Graduação por Área</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-slate-800">
              <th className="text-left py-2 px-3">Área</th>
              <th className="text-right py-2 px-3">Mestrado</th>
              <th className="text-right py-2 px-3">Doutorado</th>
              <th className="text-right py-2 px-3">Titulados Mestrado/Ano</th>
              <th className="text-right py-2 px-3">Nota CAPES</th>
            </tr>
          </thead>
          <tbody>
            {posGraduacao.map((p) => (
              <tr key={p.area} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                <td className="py-2 px-3 text-white font-medium">{p.area}</td>
                <td className="py-2 px-3 text-right text-slate-300">{p.programasMestrado}</td>
                <td className="py-2 px-3 text-right text-slate-300">{p.programasDoutorado}</td>
                <td className="py-2 px-3 text-right text-slate-300">{p.tituladosMestrado_ano}</td>
                <td className="py-2 px-3 text-right text-slate-300">{p.notaMediaCAPES}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
