"use client";
import { useState, useMemo } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import CountrySelector from "@/components/CountrySelector";
import { dadosEstabelecimentos } from "@/lib/data";
import { dadosEstabelecimentosUSA } from "@/lib/data-usa";
import { dadosEstabelecimentosDE } from "@/lib/data-germany";
import { dadosEstabelecimentosUK } from "@/lib/data-uk";
import { dadosEstabelecimentosFR } from "@/lib/data-france";
import { dadosEstabelecimentosCA } from "@/lib/data-canada";
import { dadosEstabelecimentosJP } from "@/lib/data-japan";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";
type PaisCode = "BR" | "US" | "DE" | "UK" | "FR" | "CA" | "JP";

const COLORS = ["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#06b6d4","#ec4899","#84cc16"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm">
        <p className="text-slate-300 font-medium mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color || "#94a3b8" }}>
            {p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Normalize BR field names (publicos/privados) to match US/DE (publico/privado)
function normalizeBR(d: typeof dadosEstabelecimentos[0]) {
  return { tipo: d.tipo, total: d.total, publico: d.publicos, privado: d.privados, dentistasVinculados: d.dentistasVinculados };
}

const COUNTRY_META: Record<PaisCode, { badge: string; source: string }> = {
  BR: { badge: "CNES 2023", source: "Ministério da Saúde / CNES" },
  US: { badge: "NPPES + ADA 2022", source: "ADA Health Policy Institute / HRSA" },
  DE: { badge: "BZÄK + KZBV 2023", source: "Bundeszahnärztekammer / KZBV Jahrbuch" },
  UK: { badge: "GDC + NHS Digital 2023", source: "General Dental Council / NHS Digital" },
  FR: { badge: "CNAM + ONCD 2023", source: "Caisse nationale d'assurance maladie / ONCD" },
  CA: { badge: "CDA + Provincial Colleges 2023", source: "Canadian Dental Association / CIHI" },
  JP: { badge: "MHLW Medical Facility Survey 2023", source: "厚生労働省 医療施設調査" },
};

export default function EstabelecimentosPage() {
  const { lang } = useLanguage();
  const [pais, setPais] = useState<PaisCode>("BR");

  const dados = useMemo(() => {
    if (pais === "US") return dadosEstabelecimentosUSA.map(d => ({ tipo: d.tipo, total: d.total, publico: d.publico, privado: d.privado, dentistasVinculados: d.dentistasVinculados }));
    if (pais === "DE") return dadosEstabelecimentosDE.map(d => ({ tipo: d.tipo, total: d.total, publico: d.publico, privado: d.privado, dentistasVinculados: d.dentistasVinculados }));
    if (pais === "UK") return dadosEstabelecimentosUK.map(d => ({ tipo: d.tipo, total: d.total, publico: d.publico, privado: d.privado, dentistasVinculados: d.dentistasVinculados }));
    if (pais === "FR") return dadosEstabelecimentosFR.map(d => ({ tipo: d.tipo, total: d.total, publico: d.publico, privado: d.privado, dentistasVinculados: d.dentistasVinculados }));
    if (pais === "CA") return dadosEstabelecimentosCA.map(d => ({ tipo: d.tipo, total: d.total, publico: d.publico, privado: d.privado, dentistasVinculados: d.dentistasVinculados }));
    if (pais === "JP") return dadosEstabelecimentosJP.map(d => ({ tipo: d.tipo, total: d.total, publico: d.publico, privado: d.privado, dentistasVinculados: d.dentistasVinculados }));
    return dadosEstabelecimentos.map(normalizeBR);
  }, [pais]);

  const totalEstab = dados.reduce((s, e) => s + e.total, 0);
  const totalDentistas = dados.reduce((s, e) => s + e.dentistasVinculados, 0);
  const totalPublicos = dados.reduce((s, e) => s + e.publico, 0);
  const totalPrivados = dados.reduce((s, e) => s + e.privado, 0);
  const meta = COUNTRY_META[pais];

  return (
    <AppShell>
      <PageHeader
        title={t("estab_title", lang)}
        subtitle={t("estab_subtitle", lang)}
        badge={meta.badge}
      />

      <CountrySelector value={pais} onChange={(c) => setPais(c as PaisCode)} countries={["BR", "US", "DE", "UK", "FR", "CA", "JP"]} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-600/20 border border-slate-800 rounded-xl p-3 md:p-5">
          <p className="text-slate-400 text-xs md:text-sm mb-2">{t("estab_total", lang)}</p>
          <p className="text-blue-400 text-lg md:text-2xl font-bold">{totalEstab.toLocaleString()}</p>
          <p className="text-slate-500 text-xs mt-1">{t("estab_cadastrados", lang)}</p>
        </div>
        <div className="bg-emerald-600/20 border border-slate-800 rounded-xl p-3 md:p-5">
          <p className="text-slate-400 text-xs md:text-sm mb-2">{t("estab_dentistas_vinc", lang)}</p>
          <p className="text-emerald-400 text-lg md:text-2xl font-bold">{totalDentistas.toLocaleString()}</p>
          <p className="text-slate-500 text-xs mt-1">{t("estab_vinculos_ativos", lang)}</p>
        </div>
        <div className="bg-amber-600/20 border border-slate-800 rounded-xl p-3 md:p-5">
          <p className="text-slate-400 text-xs md:text-sm mb-2">{t("estab_publicos", lang)}</p>
          <p className="text-amber-400 text-lg md:text-2xl font-bold">{totalPublicos.toLocaleString()}</p>
          <p className="text-slate-500 text-xs mt-1">{t("estab_sus_gov", lang)}</p>
        </div>
        <div className="bg-purple-600/20 border border-slate-800 rounded-xl p-3 md:p-5">
          <p className="text-slate-400 text-xs md:text-sm mb-2">{t("estab_privados", lang)}</p>
          <p className="text-purple-400 text-lg md:text-2xl font-bold">{totalPrivados.toLocaleString()}</p>
          <p className="text-slate-500 text-xs mt-1">{t("estab_clinicas", lang)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("estab_tipos", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("estab_tipos_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dados} layout="vertical" margin={{ top: 0, right: 20, left: 140, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="tipo" tick={{ fill: "#94a3b8", fontSize: 9 }} width={135} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" name={t("estab_total", lang)} fill="#3b82f6" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("estab_dentistas_tipo", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("estab_dentistas_tipo_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={dados} dataKey="dentistasVinculados" nameKey="tipo" cx="50%" cy="50%" outerRadius={100}>
                {dados.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v: any) => [String(v).replace(/\B(?=(\d{3})+(?!\d))/g, "."), t("estab_dentistas_vinc", lang)]} contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }} />
              <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
        <h2 className="text-white font-semibold mb-1">{t("estab_pub_priv", lang)}</h2>
        <p className="text-slate-500 text-xs mb-4">{t("estab_pub_priv_sub", lang)}</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={dados} layout="vertical" margin={{ top: 0, right: 20, left: 140, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
            <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
            <YAxis type="category" dataKey="tipo" tick={{ fill: "#94a3b8", fontSize: 9 }} width={135} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
            <Bar dataKey="publico" name={t("col_publicos", lang)} fill="#f59e0b" stackId="a" />
            <Bar dataKey="privado" name={t("col_privados", lang)} fill="#3b82f6" stackId="a" radius={[0,4,4,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-4">{t("estab_tabela", lang)}</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("col_tipo_estab", lang)}</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">{t("col_total", lang)}</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">{t("col_publicos", lang)}</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">{t("col_privados", lang)}</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">{t("col_dent_vinc", lang)}</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">{t("col_media_dent_estab", lang)}</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">{t("col_pct_total_estab", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((e, i) => (
                <tr key={e.tipo} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-slate-200 font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                      {e.tipo}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-mono text-right">{e.total.toLocaleString()}</td>
                  <td className="py-3 px-4 text-amber-400 font-mono text-right">{e.publico.toLocaleString()}</td>
                  <td className="py-3 px-4 text-blue-400 font-mono text-right">{e.privado.toLocaleString()}</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono text-right">{e.dentistasVinculados.toLocaleString()}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono text-right">{(e.dentistasVinculados / e.total).toFixed(1)}</td>
                  <td className="py-3 px-4 text-slate-400 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-slate-800 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full" style={{ width: `${Math.min((e.total / totalEstab) * 100 * 3, 100)}%`, background: COLORS[i % COLORS.length] }} />
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

      <p className="text-slate-600 text-xs text-right">{lang === "PT" ? "Fonte" : "Source"}: {meta.source}</p>
    </AppShell>
  );
}
