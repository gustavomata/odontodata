"use client";
import { useState, useMemo } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import CountrySelector from "@/components/CountrySelector";
import { especialidades } from "@/lib/data";
import { especialidadesUSA } from "@/lib/data-usa";
import { especialidadesDE } from "@/lib/data-germany";
import { especialidadesUK } from "@/lib/data-uk";
import { especialidadesFR } from "@/lib/data-france";
import { especialidadesCA } from "@/lib/data-canada";
import { especialidadesJP } from "@/lib/data-japan";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, TrendingDown, CheckCircle2, XCircle, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

type PaisCode = "BR" | "US" | "DE" | "UK" | "FR" | "CA" | "JP";
const COLORS = ["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#06b6d4","#ec4899","#84cc16","#f97316","#6366f1","#14b8a6","#e11d48","#7c3aed","#0284c7","#16a34a","#ca8a04","#dc2626","#9333ea","#0891b2","#65a30d"];

const BADGES: Record<PaisCode, string> = {
  BR: "CFO - Conselho Federal de Odontologia",
  US: "ADA Health Policy Institute · NPPES/CMS 2022",
  DE: "BZÄK · Landeszahnärztekammern 2023",
  UK: "GDC - General Dental Council 2023",
  FR: "ONCD - Ordre National des Chirurgiens-Dentistes 2023",
  CA: "CIHI · CDA · RCDC 2023",
  JP: "MHLW 歯科医師統計 2022 · JDA",
};

const SUBTITLES: Record<PaisCode, { PT: string; EN: string }> = {
  BR: { PT: "22 especialidades reconhecidas pelo CFO — distribuição e crescimento", EN: "22 CFO-recognized specialties — distribution and growth" },
  US: { PT: "10 especialidades reconhecidas pela ADA — distribuição e crescimento", EN: "10 ADA-recognized specialties — distribution and growth" },
  DE: { PT: "9 especialidades reconhecidas pela BZÄK — distribuição e crescimento", EN: "9 BZÄK-recognized specialties — distribution and growth" },
  UK: { PT: "13 especialidades reconhecidas pelo GDC — distribuição e crescimento", EN: "13 GDC-recognised specialties — distribution and growth" },
  FR: { PT: "4 especialidades reconhecidas pela ONCD — distribuição e crescimento", EN: "4 ONCD-recognised specialties — distribution and growth" },
  CA: { PT: "12 especialidades reconhecidas pelo RCDC — distribuição e crescimento", EN: "12 RCDC-recognised specialties — distribution and growth" },
  JP: { PT: "10 especialidades reconhecidas pela JDSB — distribuição e crescimento", EN: "10 JDSB-recognised specialties — distribution and growth" },
};

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

export default function EspecialidadesPage() {
  const { lang } = useLanguage();
  const [pais, setPais] = useState<PaisCode>("BR");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"total" | "crescimentoAnual">("total");

  const dataSource = useMemo(() => {
    if (pais === "US") return especialidadesUSA;
    if (pais === "DE") return especialidadesDE;
    if (pais === "UK") return especialidadesUK;
    if (pais === "FR") return especialidadesFR;
    if (pais === "CA") return especialidadesCA;
    if (pais === "JP") return especialidadesJP;
    return especialidades;
  }, [pais]);

  const filtered = useMemo(() =>
    dataSource
      .filter((e) => e.especialidade.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => (b[sortBy] as number) - (a[sortBy] as number)),
    [dataSource, search, sortBy]
  );

  const crescimento = useMemo(() =>
    dataSource.slice().sort((a, b) => b.crescimentoAnual - a.crescimentoAnual).slice(0, 8),
    [dataSource]
  );

  const subtitle = SUBTITLES[pais][lang];

  return (
    <AppShell>
      <PageHeader
        title={t("esp_title", lang)}
        subtitle={subtitle}
        badge={BADGES[pais]}
      />

      <CountrySelector value={pais} onChange={setPais} countries={["BR", "US", "DE", "UK", "FR", "CA", "JP"]} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("esp_volume", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("esp_volume_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={dataSource.slice(0, 10)} layout="vertical" margin={{ top: 0, right: 10, left: 80, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="especialidade" tick={{ fill: "#94a3b8", fontSize: 10 }} width={75} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" name={t("esp_dentistas", lang)} radius={[0,4,4,0]}>
                {dataSource.slice(0,10).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("esp_crescimento", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("esp_crescimento_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={crescimento} layout="vertical" margin={{ top: 0, right: 10, left: 80, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="especialidade" tick={{ fill: "#94a3b8", fontSize: 10 }} width={75} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="crescimentoAnual" name={t("esp_cresc_pct", lang)} radius={[0,4,4,0]}>
                {crescimento.map((e, i) => <Cell key={i} fill={e.crescimentoAnual >= 5 ? "#10b981" : e.crescimentoAnual >= 0 ? "#3b82f6" : "#ef4444"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-white font-semibold">{t("esp_todas", lang)}</h2>
            <p className="text-slate-500 text-xs mt-0.5">{filtered.length} {t("esp_encontradas", lang)}</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder={t("esp_buscar", lang)}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 w-full sm:w-52"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="total">{t("esp_por_volume", lang)}</option>
              <option value="crescimentoAnual">{t("esp_por_crescimento", lang)}</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">#</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("col_especialidade", lang)}</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("col_profissionais", lang)}</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("col_pct_total", lang)}</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("col_cresc_anual", lang)}</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{pais === "BR" ? t("col_reconh_cfo", lang) : lang === "PT" ? "Reconhecida" : "Recognized"}</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("col_descricao", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((esp, idx) => (
                <tr key={esp.especialidade} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-slate-500">{idx + 1}</td>
                  <td className="py-3 px-4 text-slate-200 font-medium">{esp.especialidade}</td>
                  <td className="py-3 px-4 text-slate-300 font-mono">{esp.total.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-800 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${Math.min((esp.porcentagem / 40) * 100, 100)}%` }} />
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
                      <span className="flex items-center gap-1 text-emerald-400 text-xs"><CheckCircle2 className="w-3 h-3" /> {t("esp_sim", lang)}</span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-500 text-xs"><XCircle className="w-3 h-3" /> {t("esp_nao", lang)}</span>
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
