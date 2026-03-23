"use client";
import { useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import CountrySelector from "@/components/CountrySelector";
import { serieHistorica } from "@/lib/data";
import { serieHistoricaUSA } from "@/lib/data-usa";
import { serieHistoricaDE } from "@/lib/data-germany";
import { serieHistoricaUK } from "@/lib/data-uk";
import { serieHistoricaFR } from "@/lib/data-france";
import { serieHistoricaCA } from "@/lib/data-canada";
import { serieHistoricaJP } from "@/lib/data-japan";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";
type PaisCode = "BR" | "US" | "DE" | "UK" | "FR" | "CA" | "JP";

function CustomTooltip({ active, payload, label, lang }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm">
        <p className="text-slate-300 font-medium mb-1">{t("hist_ano_label", lang)} {label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color || "#94a3b8" }}>
            {p.name}: <strong>{p.value.toLocaleString()}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

const BADGES: Record<PaisCode, string> = {
  BR: "CFO - Registros Anuais",
  US: "ADA · NPPES/CMS — Annual Records",
  DE: "BZÄK — Statistische Jahrbuch",
  UK: "GDC Annual Reports 2015-2024",
  FR: "ONCD / DREES — Statistiques annuelles",
  CA: "CIHI Dental Workforce — Annual Records",
  JP: "MHLW 歯科医師統計 — Biennial Survey",
};

const SUBTITLES: Record<PaisCode, { PT: string; EN: string }> = {
  BR: { PT: "Evolução do número de cirurgiões-dentistas no Brasil (2015–2025)", EN: "Evolution of dentist registrations in Brazil (2015–2025)" },
  US: { PT: "Evolução da força de trabalho odontológica nos EUA (2015–2025)", EN: "Evolution of the dental workforce in the United States (2015–2025)" },
  DE: { PT: "Evolução do número de dentistas na Alemanha (2015–2025)", EN: "Evolution of dentist registrations in Germany (2015–2025)" },
  UK: { PT: "Evolução do número de dentistas no Reino Unido (2015–2025)", EN: "Evolution of dentist registrations in the United Kingdom (2015–2025)" },
  FR: { PT: "Evolução do número de dentistas na França (2015–2025)", EN: "Evolution of dentist registrations in France (2015–2025)" },
  CA: { PT: "Evolução da força de trabalho odontológica no Canadá (2015–2025)", EN: "Evolution of the dental workforce in Canada (2015–2025)" },
  JP: { PT: "Evolução do número de dentistas no Japão (2015–2025)", EN: "Evolution of the dental workforce in Japan (2015–2025)" },
};

const PEAK_YEAR: Record<PaisCode, string> = { BR: "2022–2023", US: "2022–2023", DE: "2023–2024", UK: "2022–2023", FR: "2022–2023", CA: "2023–2024", JP: "2022–2023" };
const PEAK_LABEL: Record<PaisCode, { PT: string; EN: string }> = {
  BR: { PT: "+21.400 registros em 2023", EN: "+21,400 registrations in 2023" },
  US: { PT: "+6.100 novos dentistas em 2023", EN: "+6,100 new dentists in 2023" },
  DE: { PT: "+2.900 novos dentistas em 2023", EN: "+2,900 new dentists in 2023" },
  UK: { PT: "+1.800 registros em 2022", EN: "+1,800 registrations in 2022" },
  FR: { PT: "+1.600 registros em 2022", EN: "+1,600 registrations in 2022" },
  CA: { PT: "+920 novos dentistas em 2023", EN: "+920 new dentists in 2023" },
  JP: { PT: "+3.200 novos dentistas em 2022", EN: "+3,200 new dentists in 2022" },
};
const COVID_LABEL: Record<PaisCode, { PT: string; EN: string }> = {
  BR: { PT: "Queda de 16% nos novos registros", EN: "16% drop in new registrations" },
  US: { PT: "Queda de 27% nos novos registros", EN: "27% drop in new registrations" },
  DE: { PT: "Queda de 24% nos novos registros", EN: "24% drop in new registrations" },
  UK: { PT: "Queda de 37% nos novos registros", EN: "37% drop in new registrations" },
  FR: { PT: "Queda de 27% nos novos registros", EN: "27% drop in new registrations" },
  CA: { PT: "Queda de 29% nos novos registros", EN: "29% drop in new registrations" },
  JP: { PT: "Queda de 48% nos novos registros", EN: "48% drop in new registrations" },
};

export default function HistoricoPage() {
  const { lang } = useLanguage();
  const [pais, setPais] = useState<PaisCode>("BR");

  const serie = useMemo(() => {
    if (pais === "US") return serieHistoricaUSA;
    if (pais === "DE") return serieHistoricaDE;
    if (pais === "UK") return serieHistoricaUK;
    if (pais === "FR") return serieHistoricaFR;
    if (pais === "CA") return serieHistoricaCA;
    if (pais === "JP") return serieHistoricaJP;
    return serieHistorica;
  }, [pais]);

  const crescimentoAnual = useMemo(() =>
    serie.slice(1).map((d, i) => ({
      ano: d.ano,
      crescimento: Number(((d.total - serie[i].total) / serie[i].total * 100).toFixed(2)),
      saldo: d.novosRegistros - d.cancelamentos,
    })),
    [serie]
  );

  const totalCrescimento = serie[serie.length - 1].total - serie[0].total;
  const pctCrescimento = ((totalCrescimento / serie[0].total) * 100).toFixed(1);
  const mediaAnual = serie.reduce((s, d) => s + d.novosRegistros, 0) / serie.length;

  return (
    <AppShell>
      <PageHeader
        title={t("hist_title", lang)}
        subtitle={SUBTITLES[pais][lang]}
        badge={BADGES[pais]}
      />

      <CountrySelector value={pais} onChange={setPais} countries={["BR", "US", "DE", "UK", "FR", "CA", "JP"]} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-600/20 border border-slate-800 rounded-xl p-3 md:p-5">
          <p className="text-slate-400 text-xs md:text-sm mb-2">{t("hist_crescimento_total", lang)}</p>
          <p className="text-blue-400 text-lg md:text-2xl font-bold">+{totalCrescimento.toLocaleString()}</p>
          <p className="text-slate-500 text-xs mt-1">{pctCrescimento}{t("hist_pct_2015_2024", lang)}</p>
        </div>
        <div className="bg-emerald-600/20 border border-slate-800 rounded-xl p-3 md:p-5">
          <p className="text-slate-400 text-xs md:text-sm mb-2">{t("hist_media_novos", lang)}</p>
          <p className="text-emerald-400 text-lg md:text-2xl font-bold">{Math.round(mediaAnual).toLocaleString()}</p>
          <p className="text-slate-500 text-xs mt-1">{t("hist_novos_dentistas_ano", lang)}</p>
        </div>
        <div className="bg-amber-600/20 border border-slate-800 rounded-xl p-3 md:p-5">
          <p className="text-slate-400 text-xs md:text-sm mb-2">{t("hist_maior_cresc", lang)}</p>
          <p className="text-amber-400 text-lg md:text-2xl font-bold">{PEAK_YEAR[pais]}</p>
          <p className="text-slate-500 text-xs mt-1">{PEAK_LABEL[pais][lang]}</p>
        </div>
        <div className="bg-red-600/20 border border-slate-800 rounded-xl p-3 md:p-5">
          <p className="text-slate-400 text-xs md:text-sm mb-2">{t("hist_covid", lang)}</p>
          <p className="text-red-400 text-lg md:text-2xl font-bold">2020</p>
          <p className="text-slate-500 text-xs mt-1">{COVID_LABEL[pais][lang]}</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-6">
        <h2 className="text-white font-semibold mb-1">{t("hist_total_2015_2024", lang)}</h2>
        <p className="text-slate-500 text-xs mb-4">{t("hist_total_sub", lang)}</p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={serie} margin={{ top: 5, right: 20, left: 20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip lang={lang} />} />
            <Area type="monotone" dataKey="total" name={t("col_total_dentistas", lang)} stroke="#3b82f6" fill="url(#gradTotal)" strokeWidth={2} dot={{ fill: "#3b82f6", r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("hist_novos_vs_cancel", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("hist_novos_vs_cancel_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={serie} margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip lang={lang} />} />
              <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
              <Bar dataKey="novosRegistros" name={t("hist_novos_registros", lang)} fill="#10b981" radius={[4,4,0,0]} />
              <Bar dataKey="cancelamentos" name={t("hist_cancelamentos", lang)} fill="#ef4444" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("hist_cresc_pct", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("hist_cresc_pct_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={crescimentoAnual} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip lang={lang} />} />
              <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
              <Line type="monotone" dataKey="crescimento" name={t("hist_cresc_label", lang)} stroke="#f59e0b" strokeWidth={2} dot={{ fill: "#f59e0b", r: 4 }} />
              <Line type="monotone" dataKey="saldo" name={t("hist_saldo_liquido", lang)} stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6", r: 4 }} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
        <h2 className="text-white font-semibold mb-4">{t("hist_tabela", lang)}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("col_ano", lang)}</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">{t("col_total_acum", lang)}</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">{t("col_novos_reg", lang)}</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">{t("col_cancelamentos", lang)}</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">{t("col_saldo_liquido", lang)}</th>
                <th className="text-right py-3 px-4 text-slate-400 font-medium">{t("col_cresc_pct", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {serie.map((d, i) => {
                const prev = i > 0 ? serie[i - 1].total : d.total;
                const pct = i > 0 ? ((d.total - prev) / prev * 100).toFixed(2) : "-";
                const saldo = d.novosRegistros - d.cancelamentos;
                return (
                  <tr key={d.ano} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 text-slate-200 font-bold">{d.ano}</td>
                    <td className="py-3 px-4 text-blue-400 font-mono font-bold text-right">{d.total.toLocaleString()}</td>
                    <td className="py-3 px-4 text-emerald-400 font-mono text-right">+{d.novosRegistros.toLocaleString()}</td>
                    <td className="py-3 px-4 text-red-400 font-mono text-right">-{d.cancelamentos.toLocaleString()}</td>
                    <td className="py-3 px-4 font-mono text-right">
                      <span className={saldo >= 0 ? "text-emerald-400" : "text-red-400"}>
                        {saldo >= 0 ? "+" : ""}{saldo.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {pct === "-" ? (
                        <span className="text-slate-500">—</span>
                      ) : (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${Number(pct) >= 3 ? "bg-emerald-400/10 text-emerald-400" : "bg-blue-400/10 text-blue-400"}`}>
                          +{pct}%
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
