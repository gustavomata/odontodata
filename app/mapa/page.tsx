"use client";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, type TranslationKey } from "@/lib/translations";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import { dadosPorEstado, dadosPorRegiao, CORES_REGIOES } from "@/lib/data";
import { rankingEstados, scoreOportunidadeMunicipio } from "@/lib/data-onde-abrir";
import { cidadesGeo, CORES_CLASSIFICACAO, type CidadeGeo } from "@/lib/brazil-map-data";
import { COUNTRY_CONFIGS, CORES_REGIOES_WORLD, type PaisCode } from "@/lib/world-map-data";
import { bundeslaenderDental, cidadesGeoDE, type BundeslandDental } from "@/lib/germany-map-data";
import { dadosPorEstadoUSA, dadosPorRegiaoUSA, CORES_REGIOES_USA } from "@/lib/data-usa";
import { cidadesGeoUSA } from "@/lib/usa-map-data";
import {
  Map,
  Filter,
  X,
  Users,
  TrendingUp,
  Building2,
  ChevronRight,
  MapPin,
  Eye,
  BarChart3,
  Crosshair,
  Info,
  ThumbsUp,
  ThumbsDown,
  DollarSign,
  GraduationCap,
  Heart,
  Globe2,
} from "lucide-react";

// Dynamic import do mapa (Leaflet não funciona no SSR)
const BrazilMap = dynamic(() => import("@/components/BrazilMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-900/50 rounded-xl min-h-[500px]">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-slate-400 text-sm">Loading map...</p>
      </div>
    </div>
  ),
});

type MetricaFiltro = "saturacao" | "oportunidade" | "dentistas" | "regiao";

// Ícones estáticos por métrica (sem dependência de lang)
const METRICA_ICONS: Record<MetricaFiltro, typeof Map> = {
  saturacao:    BarChart3,
  oportunidade: Crosshair,
  dentistas:    Users,
  regiao:       MapPin,
};

const METRICA_KEYS: Record<MetricaFiltro, { label: TranslationKey; desc: TranslationKey }> = {
  saturacao:    { label: "mapa_saturacao",    desc: "mapa_saturacao_desc"    },
  oportunidade: { label: "mapa_oportunidade", desc: "mapa_oportunidade_desc" },
  dentistas:    { label: "mapa_dentistas",    desc: "mapa_dentistas_desc"    },
  regiao:       { label: "mapa_regioes",      desc: "mapa_regioes_desc"      },
};

function StatMini({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-lg font-bold text-white">{value}</p>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
    </div>
  );
}

export default function MapaPage() {
  const [pais, setPais] = useState<PaisCode>("BR");
  const [metrica, setMetrica] = useState<MetricaFiltro>("saturacao");
  const [regiaoFiltro, setRegiaoFiltro] = useState("Todas");
  const [estadoSelecionado, setEstadoSelecionado] = useState<string | null>(null);
  const [cidadeSelecionada, setCidadeSelecionada] = useState<CidadeGeo | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const { lang } = useLanguage();

  const countryConfig = COUNTRY_CONFIGS[pais]!;

  const legenda = useMemo(() => ({
    saturacao: {
      label: t("legenda_hab_dentista", lang),
      items: [
        { cor: "#ef4444", texto: `< 400 (${t("legenda_saturado", lang)})` },
        { cor: "#f97316", texto: "400–600" },
        { cor: "#eab308", texto: "600–800" },
        { cor: "#84cc16", texto: "800–1200" },
        { cor: "#22c55e", texto: `> 1200 (${t("legenda_oportunidade", lang)})` },
      ],
    },
    oportunidade: {
      label: t("legenda_score", lang),
      items: [
        { cor: "#22c55e", texto: `80+ ${t("legenda_excelente", lang)}` },
        { cor: "#84cc16", texto: `60–79 ${t("legenda_bom", lang)}` },
        { cor: "#eab308", texto: `40–59 ${t("legenda_moderado", lang)}` },
        { cor: "#f97316", texto: `25–39 ${t("legenda_baixo", lang)}` },
        { cor: "#ef4444", texto: `< 25 ${t("legenda_saturado", lang)}` },
      ],
    },
    dentistas: {
      label: t("legenda_total_dentistas", lang),
      items: [
        { cor: "#3b82f6", texto: "> 30,000" },
        { cor: "#6366f1", texto: "15k–30k" },
        { cor: "#8b5cf6", texto: "8k–15k" },
        { cor: "#a855f7", texto: "4k–8k" },
        { cor: "#c084fc", texto: "< 4,000" },
      ],
    },
    regiao: {
      label: t("legenda_regioes", lang),
      items: [
        { cor: "#3B82F6", texto: "Southeast / Northeast / Eastern" },
        { cor: "#10B981", texto: "Sul / Midwest / Southern" },
        { cor: "#F59E0B", texto: "Nordeste / South / Western" },
        { cor: "#8B5CF6", texto: "Centro-Oeste / West" },
        { cor: "#EF4444", texto: "Norte / Northern" },
      ],
    },
  }), [lang]);
  const regioes = countryConfig.regioes;

  const handlePaisChange = (novoPais: PaisCode) => {
    setPais(novoPais);
    setRegiaoFiltro(COUNTRY_CONFIGS[novoPais]!.regioes[0]); // "Todas" ou "All"
    setEstadoSelecionado(null);
    setCidadeSelecionada(null);
    setShowPanel(false);
  };

  // Dados do estado selecionado
  const estadoData = useMemo(() => {
    if (!estadoSelecionado) return null;
    return dadosPorEstado.find((e) => e.uf === estadoSelecionado) || null;
  }, [estadoSelecionado]);

  const estadoRanking = useMemo(() => {
    if (!estadoSelecionado) return null;
    return rankingEstados.find((r) => r.uf === estadoSelecionado) || null;
  }, [estadoSelecionado]);

  const cidadesDoEstado = useMemo(() => {
    if (!estadoSelecionado) return [];
    return cidadesGeo
      .filter((c) => c.uf === estadoSelecionado)
      .sort((a, b) => b.populacao - a.populacao);
  }, [estadoSelecionado]);

  const municipiosDoEstado = useMemo(() => {
    if (!estadoSelecionado) return [];
    return scoreOportunidadeMunicipio
      .filter((m) => m.uf === estadoSelecionado)
      .sort((a, b) => b.score_oportunidade - a.score_oportunidade);
  }, [estadoSelecionado]);

  // Dados do estado selecionado (US)
  const usEstadoData = useMemo(() => {
    if (pais !== "US" || !estadoSelecionado) return null;
    return dadosPorEstadoUSA.find((e) => e.uf === estadoSelecionado) ?? null;
  }, [pais, estadoSelecionado]);

  const cidadesDoEstadoUS = useMemo(() => {
    if (pais !== "US" || !estadoSelecionado) return [];
    return cidadesGeoUSA
      .filter((c) => c.uf === estadoSelecionado)
      .sort((a, b) => b.populacao - a.populacao);
  }, [pais, estadoSelecionado]);

  // Dados do Bundesland selecionado (DE)
  const deEstadoData = useMemo((): BundeslandDental | null => {
    if (pais !== "DE" || !estadoSelecionado) return null;
    return bundeslaenderDental.find((b) => b.code === estadoSelecionado) ?? null;
  }, [pais, estadoSelecionado]);

  const stadteDoEstadoDE = useMemo(() => {
    if (pais !== "DE" || !estadoSelecionado) return [];
    return cidadesGeoDE
      .filter((c) => c.uf === estadoSelecionado)
      .sort((a, b) => b.populacao - a.populacao);
  }, [pais, estadoSelecionado]);

  // Dados enriquecidos da cidade selecionada
  const cidadeScoreData = useMemo(() => {
    if (!cidadeSelecionada) return null;
    return scoreOportunidadeMunicipio.find(
      (m) => m.municipio.toLowerCase() === cidadeSelecionada.cidade.toLowerCase() && m.uf === cidadeSelecionada.uf
    ) || null;
  }, [cidadeSelecionada]);

  const handleEstadoClick = (uf: string) => {
    setEstadoSelecionado(uf);
    setCidadeSelecionada(null);
    setShowPanel(true);
  };

  const handleCidadeClick = (cidade: CidadeGeo) => {
    setCidadeSelecionada(cidade);
    setEstadoSelecionado(cidade.uf);
    setShowPanel(true);
  };

  const closePanel = () => {
    setShowPanel(false);
    setEstadoSelecionado(null);
    setCidadeSelecionada(null);
  };

  return (
    <AppShell>
      <PageHeader
        title={t("mapa_title", lang)}
        subtitle={t("mapa_subtitle", lang)}
        badge="Sources: IBGE · CNES · Census · NPPES · ABS · AIHW · Destatis · BZÄK"
      />

      {/* Seletor de País */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["BR", "US", "AU", "DE"] as PaisCode[]).map((code) => {
          const isoFlag = code.toLowerCase();
          const label = t(code === "BR" ? "country_brasil" : code === "US" ? "country_usa" : code === "DE" ? "country_alemanha" : "country_australia", lang);
          return (
            <button
              key={code}
              onClick={() => handlePaisChange(code)}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                pais === code
                  ? "bg-blue-600/20 border-blue-500 text-blue-300"
                  : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300"
              }`}
            >
              <img
                src={`https://flagcdn.com/24x18/${isoFlag}.png`}
                alt={code}
                className="w-6 h-4 rounded-sm object-cover"
                style={{ minWidth: 24 }}
              />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Filtros */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Métrica */}
        <div className="flex-1">
          <label className="text-xs text-slate-400 mb-2 block font-medium">{t("mapa_visualize_by", lang)}</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(["saturacao", "oportunidade", "dentistas", "regiao"] as MetricaFiltro[]).map((key) => {
              const Icon = METRICA_ICONS[key];
              const label = t(METRICA_KEYS[key].label, lang);
              const desc  = t(METRICA_KEYS[key].desc,  lang);
              return (
                <button
                  key={key}
                  onClick={() => setMetrica(key)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all border ${
                    metrica === key
                      ? "bg-blue-600/20 border-blue-500 text-blue-400"
                      : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <div className="text-left">
                    <p className="font-medium">{label}</p>
                    <p className="text-[10px] opacity-70">{desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Região */}
        <div className="w-full lg:w-56">
          <label className="text-xs text-slate-400 mb-2 block font-medium">{t("mapa_filter_region", lang)}</label>
          <select
            value={regiaoFiltro}
            onChange={(e) => setRegiaoFiltro(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
          >
            {regioes.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Map + Side Panel */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Map Container */}
        <div className="flex-1 relative">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden" style={{ height: "calc(100vh - 320px)", minHeight: 500 }}>
            <BrazilMap
              metrica={metrica}
              regiaoFiltro={regiaoFiltro}
              pais={pais}
              onEstadoClick={handleEstadoClick}
              onCidadeClick={handleCidadeClick}
            />
          </div>

          {/* Legenda flutuante */}
          <div className="absolute bottom-4 left-4 bg-slate-900/95 backdrop-blur border border-slate-700 rounded-lg p-3 z-[1000]">
            <p className="text-xs text-slate-400 font-medium mb-2">{legenda[metrica].label}</p>
            <div className="space-y-1">
              {legenda[metrica].items.map((item) => (
                <div key={item.texto} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: item.cor }} />
                  <span className="text-xs text-slate-300">{item.texto}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dica */}
          {!showPanel && (
            <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg px-3 py-2 z-[1000] flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs text-slate-300">
                {pais === "BR" ? t("mapa_tip_br", lang) :
                 pais === "US" ? t("mapa_tip_us", lang) :
                 pais === "DE" ? t("mapa_tip_de", lang) :
                                 t("mapa_tip_au", lang)}
              </span>
            </div>
          )}
        </div>

        {/* Side Panel - Estado/Cidade Info */}
        {showPanel && (estadoData || cidadeSelecionada || deEstadoData || usEstadoData) && (
          <div className="w-full lg:w-96 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col" style={{ maxHeight: "calc(100vh - 320px)" }}>
            {/* Panel Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div>
                {cidadeSelecionada ? (
                  <>
                    <h3 className="text-white font-bold text-lg">{cidadeSelecionada.cidade}</h3>
                    <p className="text-slate-400 text-sm">
                      {deEstadoData ? `${deEstadoData.bundesland} (${deEstadoData.code})` :
                       usEstadoData ? `${usEstadoData.estado} (${usEstadoData.uf})` :
                       `${estadoData?.estado} (${estadoData?.uf})`}
                    </p>
                  </>
                ) : deEstadoData ? (
                  <>
                    <h3 className="text-white font-bold text-lg">{deEstadoData.bundesland}</h3>
                    <p className="text-slate-400 text-sm">{deEstadoData.regiao} · {deEstadoData.code}</p>
                  </>
                ) : usEstadoData ? (
                  <>
                    <h3 className="text-white font-bold text-lg">{usEstadoData.estado}</h3>
                    <p className="text-slate-400 text-sm">{usEstadoData.regiao} · {usEstadoData.uf}</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-white font-bold text-lg">{estadoData?.estado}</h3>
                    <p className="text-slate-400 text-sm">{estadoData?.regiao} - {estadoData?.uf}</p>
                  </>
                )}
              </div>
              <button onClick={closePanel} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Cidade selecionada */}
              {cidadeSelecionada && (
                <div className="space-y-3">
                  {/* Score badge */}
                  {cidadeSelecionada.classificacao && (
                    <div
                      className="flex items-center justify-between rounded-lg px-3 py-2"
                      style={{ background: (CORES_CLASSIFICACAO[cidadeSelecionada.classificacao] || "#475569") + "22", border: `1px solid ${CORES_CLASSIFICACAO[cidadeSelecionada.classificacao] || "#475569"}44` }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: CORES_CLASSIFICACAO[cidadeSelecionada.classificacao] || "#475569" }} />
                        <span className="text-sm font-semibold" style={{ color: CORES_CLASSIFICACAO[cidadeSelecionada.classificacao] || "#94a3b8" }}>{cidadeSelecionada.classificacao}</span>
                      </div>
                      {cidadeSelecionada.score_oportunidade && (
                        <span className="text-2xl font-bold" style={{ color: CORES_CLASSIFICACAO[cidadeSelecionada.classificacao] || "#94a3b8" }}>
                          {cidadeSelecionada.score_oportunidade}<span className="text-xs font-normal text-slate-400">/100</span>
                        </span>
                      )}
                    </div>
                  )}

                  {/* Dados principais */}
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-xs font-medium text-slate-400 mb-3 flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {t("mapa_dados_demo", lang)}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <StatMini label={t("mapa_pop", lang)} value={cidadeSelecionada.populacao.toLocaleString("pt-BR")} />
                      <StatMini label={t("mapa_dentistas_total", lang)} value={cidadeSelecionada.dentistas.toLocaleString("pt-BR")} />
                      <StatMini label={t("mapa_hab_dentista", lang)} value={cidadeSelecionada.dentistas_por_hab.toLocaleString("pt-BR")} sub={cidadeSelecionada.dentistas_por_hab <= 500 ? t("mapa_saturado_label", lang) : cidadeSelecionada.dentistas_por_hab <= 800 ? t("mapa_moderado_label", lang) : t("mapa_oportunidade_tag", lang)} />
                      {cidadeScoreData && (
                        <StatMini label={t("mapa_formandos", lang)} value={cidadeScoreData.formandos_ano.toString()} sub={t("common_new_dentists", lang)} />
                      )}
                    </div>
                  </div>

                  {/* Indicadores socioeconômicos */}
                  {cidadeScoreData && (
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="text-xs font-medium text-slate-400 mb-3 flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> {t("mapa_indicadores_socio", lang)}</p>
                      <div className="grid grid-cols-2 gap-3">
                        <StatMini label={t("mapa_renda", lang)} value={`R$ ${cidadeScoreData.renda_per_capita.toLocaleString("pt-BR")}`} />
                        <StatMini label={t("mapa_idh", lang)} value={cidadeScoreData.idh.toFixed(3)} sub={cidadeScoreData.idh >= 0.8 ? t("mapa_idh_alto", lang) : cidadeScoreData.idh >= 0.7 ? t("mapa_idh_medio_alto", lang) : t("mapa_idh_medio", lang)} />
                        <StatMini label={t("mapa_esb", lang)} value={`${cidadeScoreData.cobertura_esb}%`} sub="Equipe Saúde Bucal" />
                        <StatMini label={t("mapa_hab_dentista", lang)} value={cidadeScoreData.dentistas_por_hab.toString()} />
                      </div>

                      {/* Barra de score */}
                      {cidadeSelecionada.score_oportunidade && (
                        <div className="mt-3 pt-3 border-t border-slate-700">
                          <div className="flex justify-between mb-1">
                            <span className="text-[10px] text-slate-400">{t("mapa_score", lang)}</span>
                            <span className="text-[10px] font-bold" style={{ color: CORES_CLASSIFICACAO[cidadeSelecionada.classificacao || ""] || "#94a3b8" }}>{cidadeSelecionada.score_oportunidade}/100</span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{ width: `${cidadeSelecionada.score_oportunidade}%`, background: CORES_CLASSIFICACAO[cidadeSelecionada.classificacao || ""] || "#475569" }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Fatores positivos e negativos */}
                  {cidadeScoreData && (cidadeScoreData.fatores_positivos.length > 0 || cidadeScoreData.fatores_negativos.length > 0) && (
                    <div className="space-y-2">
                      {cidadeScoreData.fatores_positivos.length > 0 && (
                        <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-lg p-3">
                          <p className="text-xs font-medium text-emerald-400 mb-2 flex items-center gap-1.5"><ThumbsUp className="w-3.5 h-3.5" /> {t("mapa_fatores_pos", lang)}</p>
                          <ul className="space-y-1">
                            {cidadeScoreData.fatores_positivos.map((f, i) => (
                              <li key={i} className="text-xs text-emerald-300 flex items-start gap-1.5">
                                <span className="text-emerald-500 mt-0.5">+</span>{f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {cidadeScoreData.fatores_negativos.length > 0 && (
                        <div className="bg-red-950/40 border border-red-800/40 rounded-lg p-3">
                          <p className="text-xs font-medium text-red-400 mb-2 flex items-center gap-1.5"><ThumbsDown className="w-3.5 h-3.5" /> {t("mapa_fatores_neg", lang)}</p>
                          <ul className="space-y-1">
                            {cidadeScoreData.fatores_negativos.map((f, i) => (
                              <li key={i} className="text-xs text-red-300 flex items-start gap-1.5">
                                <span className="text-red-500 mt-0.5">–</span>{f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* State info (US) */}
              {usEstadoData && (
                <>
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5" /> State Data — ADA HPI 2022
                    </h4>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-3">
                        <StatMini label="Population" value={(usEstadoData.populacao / 1e6).toFixed(1) + "M"} />
                        <StatMini label="Dentists" value={usEstadoData.totalDentistas.toLocaleString()} />
                        <StatMini label="People/Dentist" value={usEstadoData.dentistaPorHabitante.toString()}
                          sub={usEstadoData.dentistaPorHabitante < 800 ? "High density" : usEstadoData.dentistaPorHabitante < 1400 ? "Adequate" : "Underserved"} />
                        <StatMini label="Practices" value={usEstadoData.estabelecimentos.toLocaleString()} />
                        <StatMini label="Public" value={usEstadoData.dentistasPublicos.toLocaleString()}
                          sub={`${((usEstadoData.dentistasPublicos / usEstadoData.totalDentistas) * 100).toFixed(0)}% of total`} />
                        <StatMini label="Counties" value={usEstadoData.municipios.toString()} />
                      </div>
                    </div>
                  </div>

                  {/* Public / Private bar */}
                  <div>
                    <h4 className="text-xs font-medium text-slate-400 mb-2">Public vs. Private</h4>
                    <div className="flex h-3 rounded-full overflow-hidden bg-slate-800">
                      <div
                        className="bg-emerald-500 transition-all"
                        style={{ width: `${(usEstadoData.dentistasPublicos / usEstadoData.totalDentistas) * 100}%` }}
                      />
                      <div className="bg-blue-500 flex-1" />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-emerald-400">Public {((usEstadoData.dentistasPublicos / usEstadoData.totalDentistas) * 100).toFixed(0)}%</span>
                      <span className="text-[10px] text-blue-400">Private {((usEstadoData.dentistasPrivados / usEstadoData.totalDentistas) * 100).toFixed(0)}%</span>
                    </div>
                  </div>

                  {/* Cities in this state */}
                  {cidadesDoEstadoUS.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" /> Cities ({cidadesDoEstadoUS.length})
                      </h4>
                      <div className="space-y-2">
                        {cidadesDoEstadoUS.slice(0, 6).map((c) => (
                          <button
                            key={c.cidade}
                            onClick={() => setCidadeSelecionada({
                              cidade: c.cidade, uf: c.uf,
                              lat: c.lat, lng: c.lng,
                              populacao: c.populacao, dentistas: c.dentistas,
                              dentistas_por_hab: c.dentistas_por_hab,
                              score_oportunidade: c.score_oportunidade,
                              classificacao: c.classificacao,
                            })}
                            className={`w-full text-left bg-slate-800/50 hover:bg-slate-800 rounded-lg p-3 transition-all border ${
                              cidadeSelecionada?.cidade === c.cidade ? "border-blue-500" : "border-transparent"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-white font-medium">{c.cidade}</p>
                                <p className="text-xs text-slate-400">{c.populacao.toLocaleString()} residents</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-bold" style={{ color: CORES_CLASSIFICACAO[c.classificacao || ""] || "#94a3b8" }}>
                                  {c.dentistas_por_hab}
                                </p>
                                <p className="text-[10px] text-slate-500">ppl/dentist</p>
                              </div>
                            </div>
                            {c.score_oportunidade && (
                              <div className="mt-2 flex items-center gap-2">
                                <div className="flex-1 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                                  <div className="h-full rounded-full" style={{ width: `${c.score_oportunidade}%`, background: CORES_CLASSIFICACAO[c.classificacao || ""] || "#475569" }} />
                                </div>
                                <span className="text-[10px] text-slate-400 w-6 text-right">{c.score_oportunidade}</span>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Bundesland info (DE) */}
              {deEstadoData && (
                <>
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5" /> Bundesland — BZÄK 2023
                    </h4>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-3">
                        <StatMini label="Bevölkerung" value={(deEstadoData.populacao / 1e6).toFixed(2) + "M"} />
                        <StatMini label="Zahnärzte" value={deEstadoData.totalDentistas.toLocaleString()} />
                        <StatMini label="Einw./Zahnarzt" value={deEstadoData.dentistaPorHabitante.toString()}
                          sub={deEstadoData.dentistaPorHabitante < 700 ? "Saturado" : deEstadoData.dentistaPorHabitante < 1050 ? "Adequado" : "Oportunidade"} />
                        <StatMini label="Praxen" value={deEstadoData.estabelecimentos.toLocaleString()} />
                        <StatMini label="GKV (public)" value={deEstadoData.dentistasGKV.toLocaleString()}
                          sub={`${((deEstadoData.dentistasGKV / deEstadoData.totalDentistas) * 100).toFixed(0)}% do total`} />
                        <StatMini label="CAD/CAM" value={`${deEstadoData.cadcam_pct}%`} sub="adoção digital" />
                      </div>
                    </div>
                  </div>

                  {/* Barra GKV / Privat */}
                  <div>
                    <h4 className="text-xs font-medium text-slate-400 mb-2">GKV vs. Privatpatienten</h4>
                    <div className="flex h-3 rounded-full overflow-hidden bg-slate-800">
                      <div
                        className="bg-emerald-500 transition-all"
                        style={{ width: `${(deEstadoData.dentistasGKV / deEstadoData.totalDentistas) * 100}%` }}
                      />
                      <div className="bg-blue-500 flex-1" />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-emerald-400">GKV {((deEstadoData.dentistasGKV / deEstadoData.totalDentistas) * 100).toFixed(0)}%</span>
                      <span className="text-[10px] text-blue-400">Privat {((deEstadoData.dentistasPrivat / deEstadoData.totalDentistas) * 100).toFixed(0)}%</span>
                    </div>
                  </div>

                  {/* Cidades do Bundesland */}
                  {stadteDoEstadoDE.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" /> Städte ({stadteDoEstadoDE.length})
                      </h4>
                      <div className="space-y-2">
                        {stadteDoEstadoDE.slice(0, 6).map((c) => (
                          <button
                            key={c.cidade}
                            onClick={() => setCidadeSelecionada({
                              cidade: c.cidade, uf: c.uf,
                              lat: c.lat, lng: c.lng,
                              populacao: c.populacao, dentistas: c.dentistas,
                              dentistas_por_hab: c.dentistas_por_hab,
                              score_oportunidade: c.score_oportunidade,
                              classificacao: c.classificacao,
                            })}
                            className={`w-full text-left bg-slate-800/50 hover:bg-slate-800 rounded-lg p-3 transition-all border ${
                              cidadeSelecionada?.cidade === c.cidade ? "border-blue-500" : "border-transparent"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-white font-medium">{c.cidade}</p>
                                <p className="text-xs text-slate-400">{c.populacao.toLocaleString()} Einw.</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-bold" style={{ color: CORES_CLASSIFICACAO[c.classificacao || ""] || "#94a3b8" }}>
                                  {c.dentistas_por_hab}
                                </p>
                                <p className="text-[10px] text-slate-500">Einw./Zahnarzt</p>
                              </div>
                            </div>
                            {c.score_oportunidade && (
                              <div className="mt-2 flex items-center gap-2">
                                <div className="flex-1 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                                  <div className="h-full rounded-full" style={{ width: `${c.score_oportunidade}%`, background: CORES_CLASSIFICACAO[c.classificacao || ""] || "#475569" }} />
                                </div>
                                <span className="text-[10px] text-slate-400 w-6 text-right">{c.score_oportunidade}</span>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Estado info */}
              {estadoData && (
                <>
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5" /> {t("mapa_estado_data", lang)}
                    </h4>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-3">
                        <StatMini label={t("mapa_pop", lang)} value={(estadoData.populacao / 1e6).toFixed(1) + "M"} />
                        <StatMini label={t("mapa_dentistas_total", lang)} value={estadoData.totalDentistas.toLocaleString("pt-BR")} />
                        <StatMini label={t("mapa_hab_dentista", lang)} value={estadoData.dentistaPorHabitante.toString()} sub={estadoData.dentistaPorHabitante <= 500 ? t("mapa_saturado_label", lang) : estadoData.dentistaPorHabitante <= 800 ? t("mapa_moderado_label", lang) : t("mapa_oportunidade_tag", lang)} />
                        <StatMini label={t("mapa_estabelecimentos", lang)} value={estadoData.estabelecimentos.toLocaleString("pt-BR")} />
                        <StatMini label={t("mapa_publico", lang)} value={estadoData.dentistasPublicos.toLocaleString("pt-BR")} sub={((estadoData.dentistasPublicos / estadoData.totalDentistas) * 100).toFixed(0) + "% do total"} />
                        <StatMini label={t("mapa_privado", lang)} value={estadoData.dentistasPrivados.toLocaleString("pt-BR")} sub={((estadoData.dentistasPrivados / estadoData.totalDentistas) * 100).toFixed(0) + "% do total"} />
                        <StatMini label={t("mapa_municipios", lang)} value={estadoData.municipios.toString()} />
                        {estadoRanking && (
                          <StatMini label={t("mapa_score", lang)} value={estadoRanking.score_medio.toString()} sub={`${t("mapa_sem_acesso", lang)}: ${estadoRanking.populacao_sem_acesso_pct}%`} />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Proporção público/privado */}
                  <div>
                    <h4 className="text-xs font-medium text-slate-400 mb-2">{t("mapa_pub_priv", lang)}</h4>
                    <div className="flex h-3 rounded-full overflow-hidden bg-slate-800">
                      <div
                        className="bg-emerald-500 transition-all"
                        style={{ width: `${(estadoData.dentistasPublicos / estadoData.totalDentistas) * 100}%` }}
                      />
                      <div className="bg-blue-500 flex-1" />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-emerald-400">{t("mapa_publico", lang)} {((estadoData.dentistasPublicos / estadoData.totalDentistas) * 100).toFixed(0)}%</span>
                      <span className="text-[10px] text-blue-400">{t("mapa_privado", lang)} {((estadoData.dentistasPrivados / estadoData.totalDentistas) * 100).toFixed(0)}%</span>
                    </div>
                  </div>

                  {/* Ranking info */}
                  {estadoRanking && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5" /> {t("mapa_oportunidade", lang)}
                      </h4>
                      <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-400">{t("mapa_melhor", lang)}</span>
                          <span className="text-sm text-emerald-400 font-medium">{estadoRanking.melhor_municipio}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-400">{t("mapa_mais_saturado", lang)}</span>
                          <span className="text-sm text-red-400 font-medium">{estadoRanking.pior_municipio}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-400">{t("mapa_pop_sem_acesso", lang)}</span>
                          <span className="text-sm text-amber-400 font-medium">{estadoRanking.populacao_sem_acesso_pct}%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cidades do estado */}
                  {cidadesDoEstado.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" /> {t("mapa_cidades", lang)} ({cidadesDoEstado.length})
                      </h4>
                      <div className="space-y-2">
                        {cidadesDoEstado.map((c) => (
                          <button
                            key={c.cidade}
                            onClick={() => setCidadeSelecionada(c)}
                            className={`w-full text-left bg-slate-800/50 hover:bg-slate-800 rounded-lg p-3 transition-all border ${
                              cidadeSelecionada?.cidade === c.cidade ? "border-blue-500" : "border-transparent"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-white font-medium">{c.cidade}</p>
                                <p className="text-xs text-slate-400">{c.populacao.toLocaleString("pt-BR")} {t("common_hab", lang)}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-bold" style={{ color: CORES_CLASSIFICACAO[c.classificacao || ""] || "#94a3b8" }}>
                                  {c.dentistas_por_hab}
                                </p>
                                <p className="text-[10px] text-slate-500">{t("mapa_hab_dent", lang)}</p>
                              </div>
                            </div>
                            {c.score_oportunidade && (
                              <div className="mt-2 flex items-center gap-2">
                                <div className="flex-1 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                                  <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                      width: `${c.score_oportunidade}%`,
                                      background: CORES_CLASSIFICACAO[c.classificacao || ""] || "#475569",
                                    }}
                                  />
                                </div>
                                <span className="text-[10px] text-slate-400 w-6 text-right">{c.score_oportunidade}</span>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Municípios com score (dados da página Onde Abrir) */}
                  {municipiosDoEstado.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                        <Crosshair className="w-3.5 h-3.5" /> {t("mapa_oportunidade_top", lang)}
                      </h4>
                      <div className="space-y-2">
                        {municipiosDoEstado.slice(0, 5).map((m) => (
                          <div key={m.municipio} className="bg-slate-800/50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm text-white font-medium">{m.municipio}</p>
                              <span
                                className="text-xs px-2 py-0.5 rounded-full font-medium"
                                style={{
                                  background: (CORES_CLASSIFICACAO[m.classificacao] || "#475569") + "22",
                                  color: CORES_CLASSIFICACAO[m.classificacao] || "#94a3b8",
                                }}
                              >
                                {m.score_oportunidade}
                              </span>
                            </div>
                            <div className="flex gap-3 text-[10px] text-slate-500">
                              <span>{m.populacao.toLocaleString("pt-BR")} hab</span>
                              <span>{m.dentistas_total} dent.</span>
                              <span>R$ {m.renda_per_capita}/cap</span>
                            </div>
                            <div className="mt-1.5 h-1 rounded-full bg-slate-700 overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${m.score_oportunidade}%`,
                                  background: CORES_CLASSIFICACAO[m.classificacao] || "#475569",
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Stats rápidos por região — apenas para o Brasil (dados pré-computados) */}
      {pais === "BR" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-6">
          {dadosPorRegiao.map((r) => (
            <button
              key={r.regiao}
              onClick={() => setRegiaoFiltro(r.regiao === regiaoFiltro ? "Todas" : r.regiao)}
              className={`bg-slate-800/50 rounded-lg p-3 text-left border transition-all ${
                regiaoFiltro === r.regiao ? "border-blue-500" : "border-slate-700/50 hover:border-slate-600"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: r.cor }} />
                <span className="text-xs text-slate-300 font-medium">{r.regiao}</span>
              </div>
              <p className="text-lg font-bold text-white">{(r.totalDentistas / 1000).toFixed(0)}k</p>
              <p className="text-[10px] text-slate-500">{r.dentistaPorHabitante} hab/dent</p>
            </button>
          ))}
          <button
            onClick={() => setRegiaoFiltro("Todas")}
            className={`bg-slate-800/50 rounded-lg p-3 text-left border transition-all ${
              regiaoFiltro === "Todas" ? "border-blue-500" : "border-slate-700/50 hover:border-slate-600"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Eye className="w-3 h-3 text-slate-400" />
              <span className="text-xs text-slate-300 font-medium">{t("country_brasil", lang)}</span>
            </div>
            <p className="text-lg font-bold text-white">438k</p>
            <p className="text-[10px] text-slate-500">{t("mapa_brasil_total", lang)}</p>
          </button>
        </div>
      )}

      {/* Quick regions for USA, Australia, Germany */}
      {pais !== "BR" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 mt-6">
          {countryConfig.regioes.filter((r) => r !== "All" && r !== "Todas").map((regiao) => {
            const usRegData = pais === "US" ? dadosPorRegiaoUSA.find((r2) => r2.regiao === regiao) : null;
            const cor = pais === "US" ? (CORES_REGIOES_USA[regiao] ?? "#475569")
                      : CORES_REGIOES_WORLD[pais]?.[regiao] ?? "#475569";
            return (
            <button
              key={regiao}
              onClick={() => setRegiaoFiltro(regiao === regiaoFiltro ? countryConfig.regioes[0] : regiao)}
              className={`bg-slate-800/50 rounded-lg p-3 text-left border transition-all ${
                regiaoFiltro === regiao ? "border-blue-500" : "border-slate-700/50 hover:border-slate-600"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: cor }} />
                <span className="text-xs text-slate-300 font-medium">{regiao}</span>
              </div>
              {usRegData ? (
                <>
                  <p className="text-lg font-bold text-white">{(usRegData.totalDentistas / 1000).toFixed(0)}k</p>
                  <p className="text-[10px] text-slate-500">{usRegData.dentistaPorHabitante.toLocaleString()} pop/dent</p>
                </>
              ) : (
                <p className="text-[10px] text-slate-500">
                  {countryConfig.estados.filter((e) => e.regiao === regiao).length} {t("mapa_states", lang)}
                </p>
              )}
            </button>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
