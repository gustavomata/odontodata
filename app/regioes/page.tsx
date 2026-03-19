"use client";
import { useState, useMemo } from "react";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import CountrySelector from "@/components/CountrySelector";
import { dadosPorEstado, dadosPorRegiao, CORES_REGIOES } from "@/lib/data";
import { dadosPorEstadoUSA, dadosPorRegiaoUSA, CORES_REGIOES_USA } from "@/lib/data-usa";
import { dadosPorEstadoDE, dadosPorRegiaoDE, CORES_REGIOES_DE } from "@/lib/data-germany";
import { dadosPorEstadoUK, dadosPorRegiaoUK, CORES_REGIOES_UK } from "@/lib/data-uk";
import { dadosPorEstadoFR, dadosPorRegiaoFR, CORES_REGIOES_FR } from "@/lib/data-france";
import { dadosPorEstadoCA, dadosPorRegiaoCA, CORES_REGIOES_CA } from "@/lib/data-canada";
import { dadosPorEstadoJP, dadosPorRegiaoJP, CORES_REGIOES_JP } from "@/lib/data-japan";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Search } from "lucide-react";

type PaisCode = "BR" | "US" | "DE" | "UK" | "FR" | "CA" | "JP";

const BADGES: Record<PaisCode, string> = {
  BR: "CFO · IBGE 2023",
  US: "ADA · NPPES/CMS · Census 2022",
  DE: "BZÄK · Destatis 2023",
  UK: "GDC · ONS 2023",
  FR: "ONCD · INSEE 2023",
  CA: "CIHI · Statistics Canada 2023",
  JP: "MHLW · Statistics Japan 2023",
};

const SUBTITLES: Record<PaisCode, { PT: string; EN: string }> = {
  BR: { PT: "Distribuição de dentistas pelos 26 estados + DF do Brasil", EN: "Distribution of dentists across Brazil's 26 states + DF" },
  US: { PT: "Distribuição de dentistas pelos 50 estados + DC dos EUA", EN: "Distribution of dentists across all 50 US states + DC" },
  DE: { PT: "Distribuição de dentistas pelos 16 estados federais (Bundesländer)", EN: "Distribution of dentists across Germany's 16 federal states (Bundesländer)" },
  UK: { PT: "Distribuição pelos 10 regiões do Reino Unido (4 nações + NHS regions)", EN: "Distribution across 10 UK regions (4 nations + NHS regions)" },
  FR: { PT: "Distribuição pelas 14 regiões da França", EN: "Distribution across France's 14 regions" },
  CA: { PT: "Distribuição pelas 13 províncias e territórios do Canadá", EN: "Distribution across Canada's 13 provinces and territories" },
  JP: { PT: "Distribuição pelas 47 prefeituras do Japão", EN: "Distribution across Japan's 47 prefectures" },
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

const getRatioCor = (ratio: number) => {
  if (ratio <= 600) return "text-emerald-400 bg-emerald-400/10";
  if (ratio <= 900) return "text-blue-400 bg-blue-400/10";
  if (ratio <= 1300) return "text-amber-400 bg-amber-400/10";
  return "text-red-400 bg-red-400/10";
};

export default function RegioesPage() {
  const { lang } = useLanguage();
  const [pais, setPais] = useState<PaisCode>("BR");
  const [search, setSearch] = useState("");
  const [regiao, setRegiao] = useState("Todas");
  const [sortBy, setSortBy] = useState<"totalDentistas" | "dentistaPorHabitante" | "populacao">("totalDentistas");

  const { estados, regioes, cores } = useMemo(() => {
    if (pais === "US") return { estados: dadosPorEstadoUSA, regioes: dadosPorRegiaoUSA, cores: CORES_REGIOES_USA };
    if (pais === "DE") return { estados: dadosPorEstadoDE, regioes: dadosPorRegiaoDE, cores: CORES_REGIOES_DE };
    if (pais === "UK") return { estados: dadosPorEstadoUK, regioes: dadosPorRegiaoUK, cores: CORES_REGIOES_UK };
    if (pais === "FR") return { estados: dadosPorEstadoFR, regioes: dadosPorRegiaoFR, cores: CORES_REGIOES_FR };
    if (pais === "CA") return { estados: dadosPorEstadoCA, regioes: dadosPorRegiaoCA, cores: CORES_REGIOES_CA };
    if (pais === "JP") return { estados: dadosPorEstadoJP, regioes: dadosPorRegiaoJP, cores: CORES_REGIOES_JP };
    return { estados: dadosPorEstado, regioes: dadosPorRegiao, cores: CORES_REGIOES };
  }, [pais]);

  const regioesList = useMemo(() => {
    const all = lang === "PT" ? "Todas" : "All";
    return [all, ...Array.from(new Set(estados.map((e) => e.regiao)))];
  }, [estados, lang]);

  const filtered = useMemo(() => {
    const all = lang === "PT" ? "Todas" : "All";
    return estados
      .filter((e) => {
        const matchSearch = e.estado.toLowerCase().includes(search.toLowerCase()) || e.uf.toLowerCase().includes(search.toLowerCase());
        const matchRegiao = regiao === all || regiao === "Todas" || e.regiao === regiao;
        return matchSearch && matchRegiao;
      })
      .sort((a, b) => (Number(b[sortBy]) || 0) - (Number(a[sortBy]) || 0));
  }, [estados, search, regiao, sortBy, lang]);

  const top10 = useMemo(() => estados.slice().sort((a, b) => b.totalDentistas - a.totalDentistas).slice(0, 10), [estados]);
  const ratioData = useMemo(() => estados.slice().sort((a, b) => a.dentistaPorHabitante - b.dentistaPorHabitante).slice(0, 15), [estados]);

  return (
    <AppShell>
      <PageHeader
        title={t("regioes_title", lang)}
        subtitle={SUBTITLES[pais][lang]}
        badge={BADGES[pais]}
      />

      <CountrySelector value={pais} onChange={(code) => { setPais(code); setRegiao(lang === "PT" ? "Todas" : "All"); }} countries={["BR", "US", "DE", "UK", "FR", "CA", "JP"]} />

      {/* Região Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {regioes.map((r) => (
          <div key={r.regiao} className="bg-slate-900 border border-slate-800 rounded-xl p-4" style={{ borderLeftColor: cores[r.regiao], borderLeftWidth: 3 }}>
            <p className="text-slate-400 text-xs mb-1">{r.regiao}</p>
            <p className="text-white font-bold text-lg">{r.totalDentistas.toLocaleString()}</p>
            <p className="text-slate-500 text-xs mt-1">{r.estados} {t("regioes_estados_unit", lang)} · 1:{r.dentistaPorHabitante}</p>
            <div className="mt-2 grid grid-cols-2 gap-1">
              <div>
                <p className="text-amber-400 text-xs font-medium">{r.dentistasPublicos.toLocaleString()}</p>
                <p className="text-slate-600 text-xs">{t("regioes_publico", lang)}</p>
              </div>
              <div>
                <p className="text-blue-400 text-xs font-medium">{r.dentistasPrivados.toLocaleString()}</p>
                <p className="text-slate-600 text-xs">{t("regioes_privado", lang)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("regioes_top10", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("regioes_top10_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={top10} layout="vertical" margin={{ top: 0, right: 20, left: 40, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="uf" tick={{ fill: "#94a3b8", fontSize: 11 }} width={35} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="totalDentistas" name={t("esp_dentistas", lang)} fill="#3b82f6" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("regioes_hab_dentista", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("regioes_hab_dentista_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ratioData} layout="vertical" margin={{ top: 0, right: 20, left: 40, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis type="category" dataKey="uf" tick={{ fill: "#94a3b8", fontSize: 10 }} width={35} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="dentistaPorHabitante" name={t("col_hab_dentista", lang)} fill="#f59e0b" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-white font-semibold">{t("regioes_table_title", lang)}</h2>
            <p className="text-slate-500 text-xs mt-0.5">{filtered.length} {t("regioes_estados_unit", lang)}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-500" />
              <input type="text" placeholder={t("regioes_buscar", lang)} value={search} onChange={(e) => setSearch(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 w-full sm:w-44" />
            </div>
            <select value={regiao} onChange={(e) => setRegiao(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500">
              {regioesList.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500">
              <option value="totalDentistas">{t("regioes_por_total", lang)}</option>
              <option value="dentistaPorHabitante">{t("regioes_por_cobertura", lang)}</option>
              <option value="populacao">{t("regioes_por_populacao", lang)}</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_uf", lang)}</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_estado", lang)}</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_regiao", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_populacao", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_total_dentistas", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_publico", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_privado", lang)}</th>
                <th className="text-center py-3 px-3 text-slate-400 font-medium">{t("col_hab_dentista", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_municipios", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_estabelec", lang)}</th>
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
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: (cores[e.regiao] || "#3b82f6") + "30", color: cores[e.regiao] || "#3b82f6" }}>{e.regiao}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-400 text-right font-mono">{e.populacao.toLocaleString()}</td>
                  <td className="py-3 px-3 text-white font-bold text-right font-mono">{e.totalDentistas.toLocaleString()}</td>
                  <td className="py-3 px-3 text-amber-400 text-right font-mono">{e.dentistasPublicos.toLocaleString()}</td>
                  <td className="py-3 px-3 text-blue-400 text-right font-mono">{e.dentistasPrivados.toLocaleString()}</td>
                  <td className="py-3 px-3 text-center">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${getRatioCor(e.dentistaPorHabitante)}`}>
                      1:{e.dentistaPorHabitante}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400 text-right font-mono">{e.municipios.toLocaleString()}</td>
                  <td className="py-3 px-3 text-slate-400 text-right font-mono">{e.estabelecimentos.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
