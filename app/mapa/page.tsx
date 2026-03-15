"use client";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import { dadosPorEstado, dadosPorRegiao, CORES_REGIOES } from "@/lib/data";
import { rankingEstados, scoreOportunidadeMunicipio } from "@/lib/data-onde-abrir";
import { cidadesGeo, CORES_CLASSIFICACAO, type CidadeGeo } from "@/lib/brazil-map-data";
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
} from "lucide-react";

// Dynamic import do mapa (Leaflet não funciona no SSR)
const BrazilMap = dynamic(() => import("@/components/BrazilMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-900/50 rounded-xl min-h-[500px]">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-slate-400 text-sm">Carregando mapa...</p>
      </div>
    </div>
  ),
});

type MetricaFiltro = "saturacao" | "oportunidade" | "dentistas" | "regiao";

const METRICAS: { key: MetricaFiltro; label: string; icon: typeof Map; desc: string }[] = [
  { key: "saturacao", label: "Saturação", icon: BarChart3, desc: "Hab. por dentista" },
  { key: "oportunidade", label: "Oportunidade", icon: Crosshair, desc: "Score de oportunidade" },
  { key: "dentistas", label: "Dentistas", icon: Users, desc: "Total de profissionais" },
  { key: "regiao", label: "Regiões", icon: MapPin, desc: "Por região geográfica" },
];

const LEGENDA: Record<MetricaFiltro, { label: string; items: { cor: string; texto: string }[] }> = {
  saturacao: {
    label: "Habitantes por Dentista",
    items: [
      { cor: "#ef4444", texto: "< 400 (Saturado)" },
      { cor: "#f97316", texto: "400-600" },
      { cor: "#eab308", texto: "600-800" },
      { cor: "#84cc16", texto: "800-1200" },
      { cor: "#22c55e", texto: "> 1200 (Oportunidade)" },
    ],
  },
  oportunidade: {
    label: "Score de Oportunidade",
    items: [
      { cor: "#22c55e", texto: "80+ Excelente" },
      { cor: "#84cc16", texto: "60-79 Bom" },
      { cor: "#eab308", texto: "40-59 Moderado" },
      { cor: "#f97316", texto: "25-39 Baixo" },
      { cor: "#ef4444", texto: "< 25 Saturado" },
    ],
  },
  dentistas: {
    label: "Total de Dentistas",
    items: [
      { cor: "#3b82f6", texto: "> 30.000" },
      { cor: "#6366f1", texto: "15.000-30.000" },
      { cor: "#8b5cf6", texto: "8.000-15.000" },
      { cor: "#a855f7", texto: "4.000-8.000" },
      { cor: "#c084fc", texto: "< 4.000" },
    ],
  },
  regiao: {
    label: "Regiões do Brasil",
    items: [
      { cor: "#3B82F6", texto: "Sudeste" },
      { cor: "#10B981", texto: "Sul" },
      { cor: "#F59E0B", texto: "Nordeste" },
      { cor: "#8B5CF6", texto: "Centro-Oeste" },
      { cor: "#EF4444", texto: "Norte" },
    ],
  },
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
  const [metrica, setMetrica] = useState<MetricaFiltro>("saturacao");
  const [regiaoFiltro, setRegiaoFiltro] = useState("Todas");
  const [estadoSelecionado, setEstadoSelecionado] = useState<string | null>(null);
  const [cidadeSelecionada, setCidadeSelecionada] = useState<CidadeGeo | null>(null);
  const [showPanel, setShowPanel] = useState(false);

  const regioes = ["Todas", "Norte", "Nordeste", "Sudeste", "Sul", "Centro-Oeste"];

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
        title="Mapa Interativo"
        subtitle="Visualize a distribuição de dentistas, saturação e oportunidades em todo o Brasil"
        badge="Fonte: CFO · IBGE · CNES 2024"
      />

      {/* Filtros */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Métrica */}
        <div className="flex-1">
          <label className="text-xs text-slate-400 mb-2 block font-medium">Visualizar por</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {METRICAS.map(({ key, label, icon: Icon, desc }) => (
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
            ))}
          </div>
        </div>

        {/* Região */}
        <div className="w-full lg:w-56">
          <label className="text-xs text-slate-400 mb-2 block font-medium">Filtrar Região</label>
          <select
            value={regiaoFiltro}
            onChange={(e) => setRegiaoFiltro(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
          >
            {regioes.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
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
              onEstadoClick={handleEstadoClick}
              onCidadeClick={handleCidadeClick}
            />
          </div>

          {/* Legenda flutuante */}
          <div className="absolute bottom-4 left-4 bg-slate-900/95 backdrop-blur border border-slate-700 rounded-lg p-3 z-[1000]">
            <p className="text-xs text-slate-400 font-medium mb-2">{LEGENDA[metrica].label}</p>
            <div className="space-y-1">
              {LEGENDA[metrica].items.map((item) => (
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
              <span className="text-xs text-slate-300">Clique em um estado para ver detalhes. Dê zoom para ver as cidades.</span>
            </div>
          )}
        </div>

        {/* Side Panel - Estado/Cidade Info */}
        {showPanel && (estadoData || cidadeSelecionada) && (
          <div className="w-full lg:w-96 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col" style={{ maxHeight: "calc(100vh - 320px)" }}>
            {/* Panel Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div>
                {cidadeSelecionada ? (
                  <>
                    <h3 className="text-white font-bold text-lg">{cidadeSelecionada.cidade}</h3>
                    <p className="text-slate-400 text-sm">{estadoData?.estado} ({estadoData?.uf})</p>
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
                <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <StatMini label="População" value={cidadeSelecionada.populacao.toLocaleString("pt-BR")} />
                    <StatMini label="Dentistas" value={cidadeSelecionada.dentistas.toLocaleString("pt-BR")} />
                    <StatMini label="Hab/Dentista" value={cidadeSelecionada.dentistas_por_hab.toLocaleString("pt-BR")} />
                    {cidadeSelecionada.score_oportunidade && (
                      <StatMini label="Score" value={cidadeSelecionada.score_oportunidade.toString()} sub={cidadeSelecionada.classificacao} />
                    )}
                  </div>
                  {cidadeSelecionada.classificacao && (
                    <div className="flex items-center gap-2 pt-1">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: CORES_CLASSIFICACAO[cidadeSelecionada.classificacao] || "#475569" }} />
                      <span className="text-sm text-slate-300">{cidadeSelecionada.classificacao}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Estado info */}
              {estadoData && (
                <>
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5" /> Dados do Estado
                    </h4>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-3">
                        <StatMini label="População" value={(estadoData.populacao / 1e6).toFixed(1) + "M"} />
                        <StatMini label="Dentistas" value={estadoData.totalDentistas.toLocaleString("pt-BR")} />
                        <StatMini label="Hab/Dentista" value={estadoData.dentistaPorHabitante.toString()} sub={estadoData.dentistaPorHabitante <= 500 ? "Saturado" : estadoData.dentistaPorHabitante <= 800 ? "Moderado" : "Oportunidade"} />
                        <StatMini label="Estabelecimentos" value={estadoData.estabelecimentos.toLocaleString("pt-BR")} />
                        <StatMini label="Públicos" value={estadoData.dentistasPublicos.toLocaleString("pt-BR")} sub={((estadoData.dentistasPublicos / estadoData.totalDentistas) * 100).toFixed(0) + "% do total"} />
                        <StatMini label="Privados" value={estadoData.dentistasPrivados.toLocaleString("pt-BR")} sub={((estadoData.dentistasPrivados / estadoData.totalDentistas) * 100).toFixed(0) + "% do total"} />
                        <StatMini label="Municípios" value={estadoData.municipios.toString()} />
                        {estadoRanking && (
                          <StatMini label="Score Oport." value={estadoRanking.score_medio.toString()} sub={`Sem acesso: ${estadoRanking.populacao_sem_acesso_pct}%`} />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Proporção público/privado */}
                  <div>
                    <h4 className="text-xs font-medium text-slate-400 mb-2">Público vs. Privado</h4>
                    <div className="flex h-3 rounded-full overflow-hidden bg-slate-800">
                      <div
                        className="bg-emerald-500 transition-all"
                        style={{ width: `${(estadoData.dentistasPublicos / estadoData.totalDentistas) * 100}%` }}
                      />
                      <div className="bg-blue-500 flex-1" />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-emerald-400">Público {((estadoData.dentistasPublicos / estadoData.totalDentistas) * 100).toFixed(0)}%</span>
                      <span className="text-[10px] text-blue-400">Privado {((estadoData.dentistasPrivados / estadoData.totalDentistas) * 100).toFixed(0)}%</span>
                    </div>
                  </div>

                  {/* Ranking info */}
                  {estadoRanking && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5" /> Oportunidade
                      </h4>
                      <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-400">Melhor município</span>
                          <span className="text-sm text-emerald-400 font-medium">{estadoRanking.melhor_municipio}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-400">Mais saturado</span>
                          <span className="text-sm text-red-400 font-medium">{estadoRanking.pior_municipio}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-400">Pop. sem acesso</span>
                          <span className="text-sm text-amber-400 font-medium">{estadoRanking.populacao_sem_acesso_pct}%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cidades do estado */}
                  {cidadesDoEstado.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" /> Cidades ({cidadesDoEstado.length})
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
                                <p className="text-xs text-slate-400">{c.populacao.toLocaleString("pt-BR")} hab.</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-bold" style={{ color: CORES_CLASSIFICACAO[c.classificacao || ""] || "#94a3b8" }}>
                                  {c.dentistas_por_hab}
                                </p>
                                <p className="text-[10px] text-slate-500">hab/dent</p>
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
                        <Crosshair className="w-3.5 h-3.5" /> Top Municípios - Oportunidade
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

      {/* Stats rápidos abaixo do mapa */}
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
            <span className="text-xs text-slate-300 font-medium">Brasil</span>
          </div>
          <p className="text-lg font-bold text-white">438k</p>
          <p className="text-[10px] text-slate-500">Total nacional</p>
        </button>
      </div>
    </AppShell>
  );
}
