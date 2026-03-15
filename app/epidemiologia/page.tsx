"use client";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import {
  dadosCPOD,
  prevalenciaRegional,
  cancerBucalPorUF,
  tendenciasEpidemiologicas,
  doencasBucais,
  fluoretacaoImpacto,
  determinantesSociais,
  indicadoresEpidemiologia,
} from "@/lib/data-epidemiologia";
import {
  Activity,
  AlertCircle,
  HeartPulse,
  Skull,
  UserX,
  Microscope,
  Search,
  Droplets,
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
import { useState } from "react";

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

const CORES_CATEGORIAS: Record<string, string> = {
  Renda: "#3B82F6",
  Escolaridade: "#10B981",
  "Localiza\u00e7\u00e3o": "#F59E0B",
  "Ra\u00e7a/cor": "#8B5CF6",
};

const corTendencia = (t: string) => {
  if (t === "aumentando") return "bg-red-500/20 text-red-400";
  if (t === "diminuindo") return "bg-green-500/20 text-green-400";
  return "bg-slate-500/20 text-slate-400";
};

const corImpacto = (i: string) => {
  if (i === "alto") return "text-red-400";
  if (i === "medio") return "text-amber-400";
  return "text-slate-400";
};

export default function EpidemiologiaPage() {
  const [buscaDoenca, setBuscaDoenca] = useState("");
  const [buscaCancer, setBuscaCancer] = useState("");

  const doencasFiltradas = doencasBucais.filter((d) =>
    d.doenca.toLowerCase().includes(buscaDoenca.toLowerCase())
  );

  const cancerSorted = [...cancerBucalPorUF]
    .sort((a, b) => b.incidencia_100k - a.incidencia_100k)
    .filter(
      (c) =>
        c.uf.toLowerCase().includes(buscaCancer.toLowerCase()) ||
        c.estado.toLowerCase().includes(buscaCancer.toLowerCase())
    );

  return (
    <AppShell>
      <PageHeader
        title="Epidemiologia da Sa\u00fade Bucal"
        subtitle="Dados epidemiol\u00f3gicos abrangentes sobre as condi\u00e7\u00f5es de sa\u00fade bucal da popula\u00e7\u00e3o brasileira"
        badge="SB Brasil \u00b7 PNS \u00b7 SIM \u00b7 SINAN \u00b7 VIGITEL"
      />

      {/* Indicadores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="CPO-D Brasil 12 anos"
          value={indicadoresEpidemiologia.cpodBrasil_12anos}
          subtitle={indicadoresEpidemiologia.classificacaoOMS}
          icon={Activity}
          color="blue"
        />
        <StatCard
          title="Edentulismo 65-74 anos"
          value={`${indicadoresEpidemiologia.edentulismoBrasil_65_74}%`}
          subtitle="Perda total de dentes"
          icon={Skull}
          color="red"
        />
        <StatCard
          title="Nunca foi ao dentista"
          value={`${(indicadoresEpidemiologia.populacaoNuncaDentista / 1000000).toFixed(1)} mi`}
          subtitle={`${indicadoresEpidemiologia.percentualNuncaDentista}% da popula\u00e7\u00e3o`}
          icon={UserX}
          color="yellow"
        />
        <StatCard
          title="C\u00e2ncer bucal/ano"
          value={indicadoresEpidemiologia.casosNovosCanBucal_ano.toLocaleString("pt-BR")}
          subtitle={`${indicadoresEpidemiologia.obitosCanBucal_ano.toLocaleString("pt-BR")} \u00f3bitos/ano`}
          icon={HeartPulse}
          color="purple"
        />
      </div>

      {/* Tend\u00eancia Hist\u00f3rica */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
        <h2 className="text-white font-semibold mb-1">Tend\u00eancia Hist\u00f3rica (1986\u20132024)</h2>
        <p className="text-slate-500 text-xs mb-4">
          Evolu\u00e7\u00e3o do CPO-D aos 12 anos, edentulismo e cobertura de equipes de sa\u00fade bucal
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={tendenciasEpidemiologicas} margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis yAxisId="left" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
            <Line yAxisId="left" type="monotone" dataKey="cpod_12anos" name="CPO-D 12 anos" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#3B82F6", r: 4 }} />
            <Line yAxisId="right" type="monotone" dataKey="edentulismo_65_74" name="Edentulismo 65-74 (%)" stroke="#EF4444" strokeWidth={2} dot={{ fill: "#EF4444", r: 4 }} />
            <Line yAxisId="right" type="monotone" dataKey="coberturaSaudeBucal" name="Cobertura ESB (%)" stroke="#10B981" strokeWidth={2} dot={{ fill: "#10B981", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Preval\u00eancia Regional + Fluoreta\u00e7\u00e3o */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">Preval\u00eancia Regional</h2>
          <p className="text-slate-500 text-xs mb-4">CPO-D 12 anos, edentulismo e doen\u00e7a periodontal por regi\u00e3o</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={prevalenciaRegional}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="regiao" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
              <Bar dataKey="cpod_12anos" name="CPO-D 12 anos" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="edentulismo_65_74" name="Edentulismo 65-74 (%)" fill="#EF4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="doencaPeriodontal_adulto" name="D. Periodontal (%)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">Fluoreta\u00e7\u00e3o \u00d7 CPO-D</h2>
          <p className="text-slate-500 text-xs mb-4">Cobertura de fluoreta\u00e7\u00e3o e CPO-D m\u00e9dio por porte municipal</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={fluoretacaoImpacto}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="faixaPopulacao" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis yAxisId="left" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
              <Bar yAxisId="left" dataKey="comFluoretacao" name="Munic. c/ fluoreta\u00e7\u00e3o" fill="#06B6D4" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="cpodMedio" name="CPO-D m\u00e9dio" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerta Desigualdades */}
      <div className="bg-amber-600/10 border border-amber-600/30 rounded-xl p-4 mb-8 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-amber-300 font-medium text-sm">Desigualdades em Sa\u00fade Bucal</p>
          <p className="text-amber-400/70 text-xs mt-1">
            A Regi\u00e3o Norte apresenta CPO-D de <strong>3.16</strong> aos 12 anos, mais que o dobro do Sudeste (<strong>1.48</strong>).
            O edentulismo entre idosos no Norte (<strong>68.4%</strong>) \u00e9 42% superior ao do Sudeste (<strong>48.2%</strong>).
            Pessoas com renda at\u00e9 1 SM t\u00eam 2.7x menos acesso ao dentista comparado a quem ganha mais de 5 SM.
          </p>
        </div>
      </div>

      {/* Tabela Doen\u00e7as Bucais */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-white font-semibold mb-1">Doen\u00e7as Bucais</h2>
            <p className="text-slate-500 text-xs">Preval\u00eancia, tend\u00eancia e impacto das principais doen\u00e7as</p>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar doen\u00e7a..."
              value={buscaDoenca}
              onChange={(e) => setBuscaDoenca(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-full sm:w-48"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs">
                <th className="text-left py-2 px-3">Doen\u00e7a</th>
                <th className="text-right py-2 px-3">Prev. Adultos</th>
                <th className="text-right py-2 px-3">Prev. Crian\u00e7as</th>
                <th className="text-center py-2 px-3">Tend\u00eancia</th>
                <th className="text-right py-2 px-3">Custo SUS (mi)</th>
                <th className="text-center py-2 px-3">Impacto</th>
              </tr>
            </thead>
            <tbody>
              {doencasFiltradas.map((d) => (
                <tr key={d.doenca} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 text-slate-200 font-medium">{d.doenca}</td>
                  <td className="py-2.5 px-3 text-right text-slate-300">{d.prevalencia_adultos}%</td>
                  <td className="py-2.5 px-3 text-right text-slate-300">{d.prevalencia_criancas}%</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${corTendencia(d.tendencia)}`}>
                      {d.tendencia}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-300">R$ {d.custoSUS_estimado_mi.toLocaleString("pt-BR")}</td>
                  <td className={`py-2.5 px-3 text-center font-medium text-xs uppercase ${corImpacto(d.impactoCargaDoenca)}`}>
                    {d.impactoCargaDoenca}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Determinantes Sociais */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
        <h2 className="text-white font-semibold mb-1">Determinantes Sociais</h2>
        <p className="text-slate-500 text-xs mb-4">Acesso ao dentista (%) por determinante social da sa\u00fade</p>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3">
          {Object.entries(CORES_CATEGORIAS).map(([cat, cor]) => (
            <div key={cat} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: cor }} />
              <span className="text-slate-400 text-xs">{cat}</span>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={determinantesSociais} layout="vertical" margin={{ top: 0, right: 20, left: 70, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
            <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <YAxis type="category" dataKey="fator" tick={{ fill: "#94a3b8", fontSize: 11 }} width={65} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="acessoDentista" name="Acesso ao dentista (%)" radius={[0, 4, 4, 0]}>
              {determinantesSociais.map((d, i) => (
                <Cell key={i} fill={CORES_CATEGORIAS[d.categoria] || "#64748b"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabela C\u00e2ncer Bucal por UF */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-white font-semibold mb-1">C\u00e2ncer Bucal por UF</h2>
            <p className="text-slate-500 text-xs">Incid\u00eancia, mortalidade e indicadores por unidade federativa</p>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar UF ou estado..."
              value={buscaCancer}
              onChange={(e) => setBuscaCancer(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-full sm:w-52"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs">
                <th className="text-left py-2 px-3">UF</th>
                <th className="text-right py-2 px-3">Incid\u00eancia /100k</th>
                <th className="text-right py-2 px-3">Mortalidade /100k</th>
                <th className="text-right py-2 px-3">Raz\u00e3o M/I</th>
                <th className="text-right py-2 px-3">Diag. Precoce</th>
                <th className="text-right py-2 px-3">Cobertura CEO</th>
                <th className="text-right py-2 px-3">IDH</th>
              </tr>
            </thead>
            <tbody>
              {cancerSorted.map((c) => (
                <tr key={c.uf} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-2.5 px-3">
                    <span className="text-slate-200 font-medium">{c.uf}</span>
                    <span className="text-slate-500 text-xs ml-1.5">{c.estado}</span>
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-300">{c.incidencia_100k}</td>
                  <td className="py-2.5 px-3 text-right text-slate-300">{c.mortalidade_100k}</td>
                  <td className={`py-2.5 px-3 text-right font-medium ${c.razaoMortalidadeIncidencia >= 0.5 ? "text-red-400" : "text-green-400"}`}>
                    {c.razaoMortalidadeIncidencia.toFixed(2)}
                  </td>
                  <td className={`py-2.5 px-3 text-right ${c.diagnosticoPrecoce < 40 ? "text-red-400" : "text-slate-300"}`}>
                    {c.diagnosticoPrecoce}%
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-300">{c.coberturaCEO}%</td>
                  <td className="py-2.5 px-3 text-right text-slate-400">{c.idh.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
