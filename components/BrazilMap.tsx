"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  estadosGeo,
  cidadesGeo,
  CORES_REGIOES_MAP,
  CORES_CLASSIFICACAO,
  getCorSaturacao,
  getCorScore,
  getCorDensidade,
  type CidadeGeo,
} from "@/lib/brazil-map-data";
import { dadosPorEstado } from "@/lib/data";
import { rankingEstados, scoreOportunidadeMunicipio } from "@/lib/data-onde-abrir";
import {
  COUNTRY_CONFIGS,
  CORES_REGIOES_WORLD,
  type PaisCode,
} from "@/lib/world-map-data";
import {
  bundeslaenderDental,
  cidadesGeoDE,
} from "@/lib/germany-map-data";
import { dadosPorEstadoUSA } from "@/lib/data-usa";
import { cidadesGeoUSA } from "@/lib/usa-map-data";
import type { MunicipioOdonto } from "@/app/api/municipios/route";

type MetricaFiltro = "saturacao" | "oportunidade" | "dentistas" | "regiao";

interface BrazilMapProps {
  metrica: MetricaFiltro;
  regiaoFiltro: string;
  pais: PaisCode;
  onEstadoClick: (uf: string) => void;
  onCidadeClick: (cidade: CidadeGeo) => void;
}

// ─── Helpers de cor ───────────────────────────────────────────────────────────

function getEstadoCor(uf: string, metrica: MetricaFiltro, pais: PaisCode): string {
  if (pais === "BR") {
    const estado = dadosPorEstado.find((e) => e.uf === uf);
    if (!estado) return "#475569";
    switch (metrica) {
      case "saturacao":   return getCorSaturacao(estado.dentistaPorHabitante);
      case "oportunidade": {
        const ranking = rankingEstados.find((r) => r.uf === uf);
        return ranking ? getCorScore(ranking.score_medio) : "#475569";
      }
      case "dentistas": return getCorDensidade(estado.totalDentistas);
      case "regiao":    return CORES_REGIOES_MAP[estado.regiao] || "#475569";
    }
  }

  if (pais === "US") {
    const estado = dadosPorEstadoUSA.find((e) => e.uf === uf);
    if (!estado) return "#475569";
    switch (metrica) {
      case "saturacao":    return getCorSaturacao(estado.dentistaPorHabitante);
      case "oportunidade": {
        const score = Math.round(Math.max(5, Math.min(95, ((estado.dentistaPorHabitante - 600) / 2000) * 90)));
        return getCorScore(score);
      }
      case "dentistas": return getCorDensidade(estado.totalDentistas);
      case "regiao":    return CORES_REGIOES_WORLD[pais][estado.regiao] || "#475569";
    }
  }

  if (pais === "DE") {
    const bl = bundeslaenderDental.find((b) => b.code === uf);
    if (!bl) return "#475569";
    switch (metrica) {
      case "saturacao":    return getCorSaturacao(bl.dentistaPorHabitante);
      case "oportunidade": {
        const score = Math.round(Math.max(5, Math.min(95, ((bl.dentistaPorHabitante - 400) / 1200) * 90)));
        return getCorScore(score);
      }
      case "dentistas": return getCorDensidade(bl.totalDentistas);
      case "regiao":    return CORES_REGIOES_WORLD[pais][bl.regiao] || "#475569";
    }
  }

  // Para EUA e Austrália: colorir por região
  const config = COUNTRY_CONFIGS[pais];
  const estadoConfig = config.estados.find((e) => e.code === uf);
  if (!estadoConfig) return "#475569";
  return CORES_REGIOES_WORLD[pais][estadoConfig.regiao] || "#475569";
}

function getMunicipioCor(m: MunicipioOdonto, metrica: MetricaFiltro, pais: PaisCode): string {
  switch (metrica) {
    case "saturacao":    return m.dentistas_por_hab ? getCorSaturacao(m.dentistas_por_hab) : "#475569";
    case "oportunidade": return m.score_oportunidade ? getCorScore(m.score_oportunidade) : "#475569";
    case "dentistas":   return getCorDensidade(m.dentistas_total);
    case "regiao": {
      const coresRegiao = CORES_REGIOES_WORLD[pais];
      return coresRegiao[m.regiao] || CORES_REGIOES_MAP[m.regiao] || "#475569";
    }
    default: return "#475569";
  }
}

function getMunicipioRadius(m: MunicipioOdonto, zoom: number): number {
  const base = Math.sqrt(m.populacao ?? 50000) / 200;
  const scale = Math.pow(2, zoom - 4) * 0.5;
  return Math.max(3, Math.min(base * scale, 25));
}

function toCidadeGeo(m: MunicipioOdonto): CidadeGeo {
  return {
    cidade: m.municipio,
    uf: m.uf,
    lat: m.lat,
    lng: m.lng,
    populacao: m.populacao ?? 0,
    dentistas: m.dentistas_total,
    dentistas_por_hab: m.dentistas_por_hab ?? 0,
    score_oportunidade: m.score_oportunidade ?? undefined,
    classificacao: m.classificacao ?? undefined,
  };
}

// ─── Cache por país ───────────────────────────────────────────────────────────

const municipiosCache = new Map<string, MunicipioOdonto[]>();

function cacheKey(pais: string, suffix: string) {
  return `${pais}:${suffix}`;
}

async function fetchMunicipios(pais: string, params: string): Promise<MunicipioOdonto[]> {
  const key = cacheKey(pais, params);
  if (municipiosCache.has(key)) return municipiosCache.get(key)!;
  try {
    const res = await fetch(`/api/municipios?pais=${pais}&${params}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json() as { data: MunicipioOdonto[] };
    municipiosCache.set(key, json.data ?? []);
    return json.data ?? [];
  } catch {
    return [];
  }
}

function getStaticFallback(pais: PaisCode): MunicipioOdonto[] {
  if (pais === "US") {
    return cidadesGeoUSA.map((c) => ({
      codigo_ibge: 0,
      municipio: c.cidade,
      uf: c.uf,
      regiao: c.regiao,
      lat: c.lat,
      lng: c.lng,
      populacao: c.populacao,
      dentistas_total: c.dentistas,
      dentistas_por_hab: c.dentistas_por_hab,
      score_oportunidade: c.score_oportunidade,
      classificacao: c.classificacao,
      renda_per_capita: null,
      idh: null,
      cobertura_esb: null,
      fonte_dentistas: "estático",
      atualizado_em: "",
    }));
  }
  if (pais === "DE") {
    return cidadesGeoDE.map((c) => ({
      codigo_ibge: 0,
      municipio: c.cidade,
      uf: c.uf,
      regiao: c.regiao,
      lat: c.lat,
      lng: c.lng,
      populacao: c.populacao,
      dentistas_total: c.dentistas,
      dentistas_por_hab: c.dentistas_por_hab,
      score_oportunidade: c.score_oportunidade,
      classificacao: c.classificacao,
      renda_per_capita: null,
      idh: null,
      cobertura_esb: null,
      fonte_dentistas: "estático",
      atualizado_em: "",
    }));
  }
  if (pais !== "BR") return [];
  return cidadesGeo.map((c) => ({
    codigo_ibge: 0,
    municipio: c.cidade,
    uf: c.uf,
    regiao: dadosPorEstado.find((e) => e.uf === c.uf)?.regiao ?? "",
    lat: c.lat,
    lng: c.lng,
    populacao: c.populacao,
    dentistas_total: c.dentistas,
    dentistas_por_hab: c.dentistas_por_hab,
    score_oportunidade: c.score_oportunidade ?? null,
    classificacao: c.classificacao ?? null,
    renda_per_capita: null,
    idh: null,
    cobertura_esb: null,
    fonte_dentistas: "estático",
    atualizado_em: "",
  }));
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function BrazilMap({
  metrica,
  regiaoFiltro,
  pais,
  onEstadoClick,
  onCidadeClick,
}: BrazilMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geoLayerRef = useRef<L.GeoJSON | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const [geoData, setGeoData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [municipios, setMunicipios] = useState<MunicipioOdonto[]>([]);
  const [dataSource, setDataSource] = useState<"api" | "static" | "loading">("loading");

  const countryConfig = COUNTRY_CONFIGS[pais];

  // Recarrega GeoJSON quando o país muda
  useEffect(() => {
    setGeoData(null);
    fetch(countryConfig.geojsonUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`GeoJSON fetch failed: ${res.status} ${res.url}`);
        return res.json();
      })
      .then((data: GeoJSON.FeatureCollection) => {
        // Debug: log first feature properties so we can verify property names
        if (data.features?.[0]) {
          console.log(`[GeoJSON ${countryConfig.pais}] first feature props:`, data.features[0].properties);
        }
        setGeoData(data);
      })
      .catch((err) => console.error("Failed to load GeoJSON:", err));
  }, [countryConfig.geojsonUrl, countryConfig.pais]);

  // Inicializa (ou reinicializa) o mapa quando o país muda
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove mapa anterior
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapRef.current, {
      center: countryConfig.center,
      zoom: countryConfig.initialZoom,
      minZoom: 3,
      maxZoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      subdomains: "abcd",
      maxZoom: 19,
      attribution: countryConfig.atribuicao,
    }).addTo(map);

    L.control.zoom({ position: "topright" }).addTo(map);
    L.control.attribution({ position: "bottomright", prefix: false }).addTo(map);

    mapInstanceRef.current = map;
    markersLayerRef.current = L.layerGroup().addTo(map);
    setMapReady(true);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      setMapReady(false);
    };
  }, [pais]); // eslint-disable-line react-hooks/exhaustive-deps

  // Carrega dados de municípios/condados/LGAs
  useEffect(() => {
    setDataSource("loading");
    const isAllRegions = regiaoFiltro === "Todas" || regiaoFiltro === "All";
    const load = async () => {
      let data: MunicipioOdonto[] = [];

      if (isAllRegions) {
        data = await fetchMunicipios(pais, "limit=5000");
      } else {
        data = await fetchMunicipios(pais, `regiao=${encodeURIComponent(regiaoFiltro)}&limit=5000`);
      }

      if (data.length > 0) {
        setMunicipios(data);
        setDataSource("api");
      } else {
        const fallback = getStaticFallback(pais).filter(
          (m) => isAllRegions || m.regiao === regiaoFiltro
        );
        setMunicipios(fallback);
        setDataSource(fallback.length > 0 ? "static" : "loading");
      }
    };
    load();
  }, [regiaoFiltro, pais]);

  // Extrai o código do estado/território de uma feature GeoJSON
  const getStateCode = useCallback((properties: Record<string, unknown>): string | null => {
    if (countryConfig.geojsonCodeProp) {
      return String(properties[countryConfig.geojsonCodeProp] ?? "");
    }
    // Usa lookup por nome
    const name = String(properties[countryConfig.geojsonNameProp] ?? "");
    return countryConfig.nameToCode?.[name] ?? null;
  }, [countryConfig]);

  // Camada GeoJSON dos estados/províncias
  const updateGeoLayer = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map || !geoData) return;

    if (geoLayerRef.current) map.removeLayer(geoLayerRef.current);

    const isAllRegions = regiaoFiltro === "Todas" || regiaoFiltro === "All";
    const coresRegiao = CORES_REGIOES_WORLD[pais];

    geoLayerRef.current = L.geoJSON(geoData, {
      style: (feature) => {
        const props = feature?.properties as Record<string, unknown>;
        const uf = getStateCode(props) ?? "";
        const estadoConfig = countryConfig.estados.find((e) => e.code === uf);
        const regiaoMatch = isAllRegions || (estadoConfig && estadoConfig.regiao === regiaoFiltro);

        return {
          fillColor: regiaoMatch ? getEstadoCor(uf, metrica, pais) : "#1e293b",
          fillOpacity: regiaoMatch ? 0.7 : 0.15,
          color: regiaoMatch ? "#94a3b8" : "#334155",
          weight: 1,
          opacity: 0.8,
        };
      },
      onEachFeature: (feature, layer) => {
        const props = feature.properties as Record<string, unknown>;
        const uf = getStateCode(props) ?? "";
        const nome = String(props[countryConfig.geojsonNameProp] ?? uf);

        // Tooltip do estado
        if (pais === "BR") {
          const estado = dadosPorEstado.find((e) => e.uf === uf);
          if (estado) {
            layer.bindTooltip(
              `<div style="font-family:system-ui;font-size:13px;">
                <strong>${nome} (${uf})</strong><br/>
                <span style="color:#94a3b8;">Dentistas:</span> <strong>${estado.totalDentistas.toLocaleString("pt-BR")}</strong><br/>
                <span style="color:#94a3b8;">Hab/Dentista:</span> <strong>${estado.dentistaPorHabitante}</strong><br/>
                <span style="color:#94a3b8;">Pop.:</span> ${(estado.populacao / 1e6).toFixed(1)}M
              </div>`,
              { sticky: true, className: "dark-tooltip" }
            );
          }
        } else if (pais === "US") {
          const estado = dadosPorEstadoUSA.find((e) => e.uf === uf);
          const estadoConfig = countryConfig.estados.find((e) => e.code === uf);
          const corRegiao = estadoConfig ? (CORES_REGIOES_WORLD[pais][estadoConfig.regiao] ?? "#94a3b8") : "#94a3b8";
          if (estado) {
            layer.bindTooltip(
              `<div style="font-family:system-ui;font-size:13px;min-width:180px;">
                <strong>${estado.estado} (${uf})</strong><br/>
                <span style="color:${corRegiao};">● ${estado.regiao}</span>
                <div style="margin-top:6px;display:grid;grid-template-columns:1fr 1fr;gap:3px 10px;font-size:11px;">
                  <span style="color:#94a3b8;">Dentists</span><strong>${estado.totalDentistas.toLocaleString()}</strong>
                  <span style="color:#94a3b8;">People/Dentist</span><strong>${estado.dentistaPorHabitante.toLocaleString()}</strong>
                  <span style="color:#94a3b8;">Population</span><strong>${(estado.populacao / 1e6).toFixed(1)}M</strong>
                  <span style="color:#94a3b8;">Practices</span><strong>${estado.estabelecimentos.toLocaleString()}</strong>
                  <span style="color:#94a3b8;">Public</span><strong>${estado.dentistasPublicos.toLocaleString()}</strong>
                  <span style="color:#94a3b8;">Counties</span><strong>${estado.municipios}</strong>
                </div>
              </div>`,
              { sticky: true, className: "dark-tooltip" }
            );
          }
        } else if (pais === "DE") {
          const bl = bundeslaenderDental.find((b) => b.code === uf);
          const estadoConfig = countryConfig.estados.find((e) => e.code === uf);
          const corRegiao = estadoConfig ? (CORES_REGIOES_WORLD[pais][estadoConfig.regiao] ?? "#94a3b8") : "#94a3b8";
          if (bl) {
            layer.bindTooltip(
              `<div style="font-family:system-ui;font-size:13px;min-width:180px;">
                <strong>${bl.bundesland}</strong><br/>
                <span style="color:${corRegiao};">● ${bl.regiao}</span>
                <div style="margin-top:6px;display:grid;grid-template-columns:1fr 1fr;gap:3px 10px;font-size:11px;">
                  <span style="color:#94a3b8;">Zahnärzte</span><strong>${bl.totalDentistas.toLocaleString()}</strong>
                  <span style="color:#94a3b8;">Einw./Zahnarzt</span><strong>${bl.dentistaPorHabitante.toLocaleString()}</strong>
                  <span style="color:#94a3b8;">Bevölkerung</span><strong>${(bl.populacao / 1e6).toFixed(1)}M</strong>
                  <span style="color:#94a3b8;">CAD/CAM</span><strong>${bl.cadcam_pct}%</strong>
                  <span style="color:#94a3b8;">GKV</span><strong>${bl.dentistasGKV.toLocaleString()}</strong>
                  <span style="color:#94a3b8;">Praxen</span><strong>${bl.estabelecimentos.toLocaleString()}</strong>
                </div>
              </div>`,
              { sticky: true, className: "dark-tooltip" }
            );
          }
        } else {
          const estadoConfig = countryConfig.estados.find((e) => e.code === uf);
          if (estadoConfig) {
            const corRegiao = CORES_REGIOES_WORLD[pais][estadoConfig.regiao] ?? "#94a3b8";
            layer.bindTooltip(
              `<div style="font-family:system-ui;font-size:13px;">
                <strong>${nome}</strong><br/>
                <span style="color:${corRegiao};">● ${estadoConfig.regiao}</span>
              </div>`,
              { sticky: true, className: "dark-tooltip" }
            );
          }
        }

        layer.on({
          mouseover: (e) => { e.target.setStyle({ weight: 2, color: "#e2e8f0", fillOpacity: 0.9 }); e.target.bringToFront(); },
          mouseout: (e) => geoLayerRef.current?.resetStyle(e.target),
          click: () => {
            if (!uf) return;
            onEstadoClick(uf);
            // Fly para o centro do estado
            const estadoConfig = countryConfig.estados.find((e) => e.code === uf);
            // Para Brasil também usa estadosGeo para compatibilidade
            if (pais === "BR") {
              const geo = estadosGeo.find((eg) => eg.uf === uf);
              if (geo) mapInstanceRef.current?.flyTo(geo.center, geo.zoom, { duration: 0.8 });
            } else if (estadoConfig) {
              mapInstanceRef.current?.flyTo(estadoConfig.center, estadoConfig.zoom, { duration: 0.8 });
            }
          },
        });
      },
    }).addTo(map);
  }, [geoData, metrica, regiaoFiltro, pais, onEstadoClick, countryConfig, getStateCode]);

  useEffect(() => {
    if (mapReady) updateGeoLayer();
  }, [mapReady, updateGeoLayer]);

  // Markers dos municípios/condados/LGAs
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer || !mapReady || municipios.length === 0) return;

    const labels = countryConfig.labels;

    const updateMarkers = () => {
      markersLayer.clearLayers();
      const zoom = map.getZoom();
      if (zoom < 4) return;

      const bounds = map.getBounds();
      const visible = municipios.filter((m) => {
        if (!bounds.contains([m.lat, m.lng])) return false;
        const pop = m.populacao ?? 0;
        // Non-BR countries have curated static city lists — show all at lower zoom
        if (pais !== "BR") {
          if (zoom < 5 && pop < 300000) return false;
          return true;
        }
        // Brazil: progressive thresholds (can have 5000+ API cities)
        if (zoom < 6 && pop < 500000) return false;
        if (zoom < 7 && pop < 200000) return false;
        if (zoom < 8 && pop < 100000) return false;
        if (zoom < 9 && pop < 50000)  return false;
        return true;
      });

      visible.forEach((m) => {
        const radius = getMunicipioRadius(m, zoom);
        const cor = getMunicipioCor(m, metrica, pais);
        const corClassif = m.classificacao ? CORES_CLASSIFICACAO[m.classificacao] ?? cor : cor;

        const scoreExtra = pais === "BR"
          ? scoreOportunidadeMunicipio.find(
              (s) => s.municipio.toLowerCase() === m.municipio.toLowerCase() && s.uf === m.uf
            )
          : null;

        const marker = L.circleMarker([m.lat, m.lng], {
          radius,
          fillColor: cor,
          fillOpacity: 0.85,
          color: "#e2e8f0",
          weight: 1.5,
          opacity: 0.8,
        });

        const fonteTag = m.fonte_dentistas !== "estático"
          ? `<span style="font-size:9px;color:#22c55e;border:1px solid #22c55e33;border-radius:3px;padding:1px 4px;">${m.fonte_dentistas}</span>`
          : `<span style="font-size:9px;color:#64748b;border:1px solid #33415533;border-radius:3px;padding:1px 4px;">estimated</span>`;

        const scoreBlock = m.score_oportunidade
          ? `<div style="margin-top:8px;padding-top:8px;border-top:1px solid #334155;display:flex;align-items:center;justify-content:space-between;">
              <span style="color:#94a3b8;font-size:11px;">Opportunity Score</span>
              <strong style="color:${corClassif};font-size:14px;">${m.score_oportunidade} <span style="font-size:10px;font-weight:400;">${m.classificacao}</span></strong>
            </div>`
          : "";

        const extraBlock = (m.idh || m.renda_per_capita || scoreExtra)
          ? `<div style="margin-top:6px;display:grid;grid-template-columns:1fr 1fr;gap:3px 10px;font-size:11px;">
              ${m.renda_per_capita ? `<span style="color:#64748b;">Income/cap</span><strong style="color:#cbd5e1;">R$ ${m.renda_per_capita.toLocaleString()}</strong>` : ""}
              ${m.idh ? `<span style="color:#64748b;">HDI</span><strong style="color:#cbd5e1;">${m.idh.toFixed(3)}</strong>` : ""}
              ${scoreExtra ? `<span style="color:#64748b;">Graduates/yr</span><strong style="color:#cbd5e1;">${scoreExtra.formandos_ano}</strong>` : ""}
            </div>`
          : "";

        marker.bindTooltip(
          `<div style="font-family:system-ui;font-size:12px;min-width:200px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
              <span style="font-weight:700;font-size:13px;color:${cor};">${m.municipio} <span style="color:#64748b;font-weight:400;font-size:11px;">· ${m.uf}</span></span>
              ${fonteTag}
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px 10px;font-size:11px;">
              <span style="color:#64748b;">${labels.populacao}</span><strong style="color:#cbd5e1;">${(m.populacao ?? 0).toLocaleString()}</strong>
              <span style="color:#64748b;">${labels.dentistas}</span><strong style="color:#cbd5e1;">${m.dentistas_total.toLocaleString()}</strong>
              <span style="color:#64748b;">${labels.habPorDentista}</span><strong style="color:#cbd5e1;">${m.dentistas_por_hab?.toLocaleString() ?? "–"}</strong>
            </div>
            ${extraBlock}
            ${scoreBlock}
            <div style="margin-top:6px;font-size:10px;color:#475569;text-align:center;">Click for full details</div>
          </div>`,
          { className: "dark-tooltip" }
        );

        marker.on("click", () => onCidadeClick(toCidadeGeo(m)));
        marker.addTo(markersLayer);

        // Label em zoom maior
        if (zoom >= 6 && ((m.populacao ?? 0) >= 500000 || zoom >= 8)) {
          L.marker([m.lat, m.lng], {
            icon: L.divIcon({
              className: "city-label",
              html: `<span>${m.municipio}</span>`,
              iconSize: [120, 20],
              iconAnchor: [60, -radius - 4],
            }),
          }).addTo(markersLayer);
        }
      });
    };

    updateMarkers();
    map.on("zoomend moveend", updateMarkers);
    return () => { map.off("zoomend moveend", updateMarkers); };
  }, [mapReady, metrica, municipios, onCidadeClick, pais, countryConfig]);

  // Badge de fonte de dados
  const fonteLabel =
    pais === "BR" ? (dataSource === "api" ? "IBGE · CNES/DataSUS (real)" : "Static data") :
    pais === "US" ? (dataSource === "api" ? "Census 2020 · NPPES/CMS (real)" : "ADA HPI 2022 · Census 2020 (static)") :
    pais === "DE" ? (dataSource === "api" ? "Destatis · BZÄK 2023 (real)" : "Destatis · BZÄK 2023 (static)") :
                   (dataSource === "api" ? "ABS Census · AIHW/AHPRA (real)" : "No data imported yet");

  return (
    <>
      <style jsx global>{`
        .dark-tooltip {
          background: #1e293b !important;
          border: 1px solid #475569 !important;
          border-radius: 8px !important;
          color: #e2e8f0 !important;
          padding: 8px 12px !important;
          box-shadow: 0 4px 16px rgba(0,0,0,0.5) !important;
        }
        .leaflet-tooltip-top::before   { border-top-color:    #475569 !important; }
        .leaflet-tooltip-bottom::before{ border-bottom-color: #475569 !important; }
        .leaflet-tooltip-left::before  { border-left-color:   #475569 !important; }
        .leaflet-tooltip-right::before { border-right-color:  #475569 !important; }
        .city-label span {
          color: #e2e8f0; font-size: 11px; font-weight: 600;
          text-shadow: 0 0 4px #0f172a, 0 0 8px #0f172a, 1px 1px 2px #0f172a;
          white-space: nowrap; pointer-events: none;
        }
        .leaflet-control-zoom a { background: #1e293b !important; color: #e2e8f0 !important; border-color: #475569 !important; }
        .leaflet-control-zoom a:hover { background: #334155 !important; }
        .leaflet-bar { border: 1px solid #475569 !important; border-radius: 8px !important; overflow: hidden; }
      `}</style>

      <div
        ref={mapRef}
        className="w-full h-full rounded-xl overflow-hidden"
        style={{ minHeight: 500, background: "#0f172a" }}
      />

      {dataSource !== "loading" && (
        <div
          className="absolute bottom-16 right-4 z-[1000] text-[10px] px-2 py-1 rounded-md flex items-center gap-1.5"
          style={{
            background: dataSource === "api" ? "#052e1688" : "#1e293b88",
            border: `1px solid ${dataSource === "api" ? "#22c55e44" : "#47556944"}`,
            color: dataSource === "api" ? "#86efac" : "#94a3b8",
            backdropFilter: "blur(4px)",
          }}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${dataSource === "api" ? "bg-green-400" : "bg-slate-500"}`} />
          {fonteLabel}
        </div>
      )}
    </>
  );
}
