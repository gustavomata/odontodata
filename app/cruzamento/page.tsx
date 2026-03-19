"use client";
import { useState } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import { cruzamentoEspecialidadeRegiao, dadosPorEstado, rankingMunicipios, dadosPorRegiao, CORES_REGIOES } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { GitCompare, Trophy } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

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

const regioes = ["Sudeste", "Sul", "Nordeste", "Centro-Oeste", "Norte"];

export default function CruzamentoPage() {
  const { lang } = useLanguage();
  const [estado1, setEstado1] = useState("SP");
  const [estado2, setEstado2] = useState("PA");

  const e1 = dadosPorEstado.find((e) => e.uf === estado1)!;
  const e2 = dadosPorEstado.find((e) => e.uf === estado2)!;

  const comparacaoData = e1 && e2 ? [
    { metrica: "Total Dentistas", [e1.uf]: e1.totalDentistas, [e2.uf]: e2.totalDentistas },
    { metrica: "Público", [e1.uf]: e1.dentistasPublicos, [e2.uf]: e2.dentistasPublicos },
    { metrica: "Privado", [e1.uf]: e1.dentistasPrivados, [e2.uf]: e2.dentistasPrivados },
    { metrica: "Estabelec.", [e1.uf]: e1.estabelecimentos, [e2.uf]: e2.estabelecimentos },
  ] : [];

  const radarData = regioes.map((r) => {
    const d = dadosPorRegiao.find((x) => x.regiao === r)!;
    return {
      regiao: r.split("-")[0],
      "Cobertura": Math.round(1000 - d.dentistaPorHabitante + 100),
      "Volume": Math.round(d.totalDentistas / 3000),
      "Público": Math.round(d.dentistasPublicos / 1000),
    };
  });

  return (
    <AppShell>
      <PageHeader
        title={t("cruz_title", lang)}
        subtitle={t("cruz_subtitle", lang)}
        badge={t("cruz_badge", lang)}
      />

      {/* Especialidade x Região */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <GitCompare className="w-4 h-4 text-blue-400" />
          <h2 className="text-white font-semibold">{t("cruz_esp_regiao", lang)}</h2>
        </div>
        <p className="text-slate-500 text-xs mb-4">{t("cruz_esp_regiao_sub", lang)}</p>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={cruzamentoEspecialidadeRegiao} margin={{ top: 0, right: 0, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="especialidade" tick={{ fill: "#94a3b8", fontSize: 10 }} angle={-25} textAnchor="end" />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
            {regioes.map((r) => (
              <Bar key={r} dataKey={r} name={r} fill={CORES_REGIOES[r]} stackId="a" />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Radar */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("cruz_radar", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("cruz_radar_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
              <PolarGrid stroke="#1e293b" />
              <PolarAngleAxis dataKey="regiao" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <PolarRadiusAxis tick={{ fill: "#475569", fontSize: 9 }} />
              <Radar name="Cobertura" dataKey="Cobertura" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
              <Radar name="Volume" dataKey="Volume" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
              <Radar name="Público" dataKey="Público" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
              <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Comparação Direta */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-4">{t("cruz_comparacao", lang)}</h2>
          <div className="flex gap-3 mb-5">
            <div className="flex-1">
              <label className="text-slate-400 text-xs mb-1 block">{t("cruz_estado1", lang)}</label>
              <select value={estado1} onChange={(e) => setEstado1(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500">
                {dadosPorEstado.map((e) => <option key={e.uf} value={e.uf}>{e.uf} - {e.estado}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-slate-400 text-xs mb-1 block">{t("cruz_estado2", lang)}</label>
              <select value={estado2} onChange={(e) => setEstado2(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500">
                {dadosPorEstado.map((e) => <option key={e.uf} value={e.uf}>{e.uf} - {e.estado}</option>)}
              </select>
            </div>
          </div>
          {e1 && e2 && (
            <div className="space-y-3">
              {[
                { label: "Total Dentistas", v1: e1.totalDentistas, v2: e2.totalDentistas },
                { label: "Dentistas Públicos", v1: e1.dentistasPublicos, v2: e2.dentistasPublicos },
                { label: "Dentistas Privados", v1: e1.dentistasPrivados, v2: e2.dentistasPrivados },
                { label: "Hab/Dentista", v1: e1.dentistaPorHabitante, v2: e2.dentistaPorHabitante, inverse: true },
                { label: "Estabelecimentos", v1: e1.estabelecimentos, v2: e2.estabelecimentos },
                { label: "Municípios", v1: e1.municipios, v2: e2.municipios },
              ].map(({ label, v1, v2, inverse }) => {
                const max = Math.max(v1, v2);
                const pct1 = Math.round((v1 / max) * 100);
                const pct2 = Math.round((v2 / max) * 100);
                const winner = inverse ? (v1 < v2 ? 1 : 2) : (v1 > v2 ? 1 : 2);
                return (
                  <div key={label}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-400 text-xs">{label}</span>
                      {winner === 1 ? <span className="text-xs text-emerald-400 font-medium">{e1.uf} {t("cruz_melhor", lang)}</span> : <span className="text-xs text-blue-400 font-medium">{e2.uf} {t("cruz_melhor", lang)}</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 text-xs font-mono w-16 text-right">{v1.toLocaleString("pt-BR")}</span>
                      <div className="flex-1 flex gap-0.5">
                        <div className="flex-1 flex justify-end">
                          <div className="bg-emerald-500 h-2 rounded-l-full" style={{ width: `${pct1}%` }} />
                        </div>
                        <div className="flex-1">
                          <div className="bg-blue-500 h-2 rounded-r-full" style={{ width: `${pct2}%` }} />
                        </div>
                      </div>
                      <span className="text-blue-400 text-xs font-mono w-16">{v2.toLocaleString("pt-BR")}</span>
                    </div>
                    <div className="flex justify-between mt-0.5">
                      <span className="text-emerald-600 text-xs">{e1.uf}</span>
                      <span className="text-blue-600 text-xs">{e2.uf}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Ranking Municípios */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
        <div className="flex items-center gap-2 mb-1">
          <Trophy className="w-4 h-4 text-amber-400" />
          <h2 className="text-white font-semibold">{t("cruz_ranking", lang)}</h2>
        </div>
        <p className="text-slate-500 text-xs mb-5">{t("cruz_ranking_sub", lang)}</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-emerald-400 text-sm font-medium mb-3">{t("cruz_melhor_cobertura", lang)}</h3>
            {rankingMunicipios.slice(0, 5).map((m, i) => (
              <div key={m.municipio} className="flex items-center justify-between py-2.5 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-emerald-600/20 text-emerald-400 text-xs font-bold rounded-full flex items-center justify-center">{i+1}</span>
                  <div>
                    <p className="text-slate-200 text-sm">{m.municipio} <span className="text-slate-500">({m.uf})</span></p>
                    <p className="text-slate-500 text-xs">{m.populacao.toLocaleString("pt-BR")} hab · {m.dentistas.toLocaleString("pt-BR")} dentistas</p>
                  </div>
                </div>
                <span className="bg-emerald-400/10 text-emerald-400 text-xs font-bold px-2 py-1 rounded-full">1:{m.ratio}</span>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-red-400 text-sm font-medium mb-3">{t("cruz_pior_cobertura", lang)}</h3>
            {rankingMunicipios.slice(5).map((m, i) => (
              <div key={m.municipio} className="flex items-center justify-between py-2.5 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-red-600/20 text-red-400 text-xs font-bold rounded-full flex items-center justify-center">{i+1}</span>
                  <div>
                    <p className="text-slate-200 text-sm">{m.municipio} <span className="text-slate-500">({m.uf})</span></p>
                    <p className="text-slate-500 text-xs">{m.populacao.toLocaleString("pt-BR")} hab · {m.dentistas.toLocaleString("pt-BR")} dentistas</p>
                  </div>
                </div>
                <span className="bg-red-400/10 text-red-400 text-xs font-bold px-2 py-1 rounded-full">1:{m.ratio}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
