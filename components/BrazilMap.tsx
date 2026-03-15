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
  BRAZIL_GEOJSON_URL,
  type CidadeGeo,
} from "@/lib/brazil-map-data";
import { dadosPorEstado, type RegiaoData } from "@/lib/data";
import { rankingEstados } from "@/lib/data-onde-abrir";

type MetricaFiltro = "saturacao" | "oportunidade" | "dentistas" | "regiao";

interface BrazilMapProps {
  metrica: MetricaFiltro;
  regiaoFiltro: string;
  onEstadoClick: (uf: string) => void;
  onCidadeClick: (cidade: CidadeGeo) => void;
}

function getEstadoCor(uf: string, metrica: MetricaFiltro): string {
  const estado = dadosPorEstado.find((e) => e.uf === uf);
  if (!estado) return "#475569";

  switch (metrica) {
    case "saturacao":
      return getCorSaturacao(estado.dentistaPorHabitante);
    case "oportunidade": {
      const ranking = rankingEstados.find((r) => r.uf === uf);
      return ranking ? getCorScore(ranking.score_medio) : "#475569";
    }
    case "dentistas":
      return getCorDensidade(estado.totalDentistas);
    case "regiao":
      return CORES_REGIOES_MAP[estado.regiao] || "#475569";
    default:
      return "#475569";
  }
}

function getCidadeRadius(cidade: CidadeGeo, zoom: number): number {
  const base = Math.sqrt(cidade.populacao) / 200;
  const scale = Math.pow(2, zoom - 4) * 0.5;
  return Math.max(3, Math.min(base * scale, 25));
}

function getCidadeCor(cidade: CidadeGeo, metrica: MetricaFiltro): string {
  switch (metrica) {
    case "saturacao":
      return getCorSaturacao(cidade.dentistas_por_hab);
    case "oportunidade":
      return cidade.score_oportunidade ? getCorScore(cidade.score_oportunidade) : "#475569";
    case "dentistas":
      return getCorDensidade(cidade.dentistas);
    case "regiao": {
      const estado = dadosPorEstado.find((e) => e.uf === cidade.uf);
      return estado ? (CORES_REGIOES_MAP[estado.regiao] || "#475569") : "#475569";
    }
    default:
      return "#475569";
  }
}

export default function BrazilMap({ metrica, regiaoFiltro, onEstadoClick, onCidadeClick }: BrazilMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geoLayerRef = useRef<L.GeoJSON | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const [geoData, setGeoData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [mapReady, setMapReady] = useState(false);

  // Fetch GeoJSON data
  useEffect(() => {
    fetch(BRAZIL_GEOJSON_URL)
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Failed to load GeoJSON:", err));
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [-14.24, -51.93],
      zoom: 4,
      minZoom: 3,
      maxZoom: 12,
      zoomControl: false,
      attributionControl: false,
    });

    // Dark tile layer
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    // Zoom control on the right
    L.control.zoom({ position: "topright" }).addTo(map);

    // Attribution
    L.control.attribution({ position: "bottomright", prefix: false }).addTo(map);

    mapInstanceRef.current = map;
    markersLayerRef.current = L.layerGroup().addTo(map);
    setMapReady(true);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update GeoJSON layer when data or metric changes
  const updateGeoLayer = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map || !geoData) return;

    if (geoLayerRef.current) {
      map.removeLayer(geoLayerRef.current);
    }

    geoLayerRef.current = L.geoJSON(geoData, {
      style: (feature) => {
        const uf = feature?.properties?.sigla;
        const estado = dadosPorEstado.find((e) => e.uf === uf);
        const regiaoMatch = regiaoFiltro === "Todas" || (estado && estado.regiao === regiaoFiltro);

        return {
          fillColor: regiaoMatch ? getEstadoCor(uf, metrica) : "#1e293b",
          fillOpacity: regiaoMatch ? 0.7 : 0.15,
          color: regiaoMatch ? "#94a3b8" : "#334155",
          weight: 1,
          opacity: 0.8,
        };
      },
      onEachFeature: (feature, layer) => {
        const uf = feature.properties?.sigla;
        const nome = feature.properties?.name;
        const estado = dadosPorEstado.find((e) => e.uf === uf);

        if (estado) {
          layer.bindTooltip(
            `<div style="font-family: system-ui; font-size: 13px;">
              <strong>${nome} (${uf})</strong><br/>
              <span style="color: #94a3b8;">Dentistas:</span> <strong>${estado.totalDentistas.toLocaleString("pt-BR")}</strong><br/>
              <span style="color: #94a3b8;">Hab/Dentista:</span> <strong>${estado.dentistaPorHabitante}</strong><br/>
              <span style="color: #94a3b8;">Pop.:</span> ${(estado.populacao / 1e6).toFixed(1)}M
            </div>`,
            { sticky: true, className: "dark-tooltip" }
          );
        }

        layer.on({
          mouseover: (e) => {
            const l = e.target;
            l.setStyle({ weight: 2, color: "#e2e8f0", fillOpacity: 0.9 });
            l.bringToFront();
          },
          mouseout: (e) => {
            geoLayerRef.current?.resetStyle(e.target);
          },
          click: () => {
            if (uf) {
              onEstadoClick(uf);
              const geo = estadosGeo.find((eg) => eg.uf === uf);
              if (geo) {
                map.flyTo(geo.center, geo.zoom, { duration: 0.8 });
              }
            }
          },
        });
      },
    }).addTo(map);
  }, [geoData, metrica, regiaoFiltro, onEstadoClick]);

  useEffect(() => {
    if (mapReady) updateGeoLayer();
  }, [mapReady, updateGeoLayer]);

  // Update city markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer || !mapReady) return;

    const updateMarkers = () => {
      markersLayer.clearLayers();
      const zoom = map.getZoom();

      // Show city markers when zoomed in enough
      if (zoom < 5) return;

      const bounds = map.getBounds();
      const filteredCities = cidadesGeo.filter((c) => {
        const inBounds = bounds.contains([c.lat, c.lng]);
        const regiaoMatch =
          regiaoFiltro === "Todas" ||
          dadosPorEstado.find((e) => e.uf === c.uf)?.regiao === regiaoFiltro;
        // Show less cities at lower zoom
        if (zoom < 7 && c.populacao < 500000) return false;
        if (zoom < 8 && c.populacao < 200000) return false;
        return inBounds && regiaoMatch;
      });

      filteredCities.forEach((cidade) => {
        const radius = getCidadeRadius(cidade, zoom);
        const cor = getCidadeCor(cidade, metrica);

        const marker = L.circleMarker([cidade.lat, cidade.lng], {
          radius,
          fillColor: cor,
          fillOpacity: 0.8,
          color: "#e2e8f0",
          weight: 1,
          opacity: 0.6,
        });

        const scoreText = cidade.score_oportunidade
          ? `<br/><span style="color: #94a3b8;">Score:</span> <strong>${cidade.score_oportunidade}</strong> (${cidade.classificacao})`
          : "";

        marker.bindTooltip(
          `<div style="font-family: system-ui; font-size: 12px;">
            <strong>${cidade.cidade} - ${cidade.uf}</strong><br/>
            <span style="color: #94a3b8;">Pop.:</span> ${cidade.populacao.toLocaleString("pt-BR")}<br/>
            <span style="color: #94a3b8;">Dentistas:</span> ${cidade.dentistas.toLocaleString("pt-BR")}<br/>
            <span style="color: #94a3b8;">Hab/Dentista:</span> ${cidade.dentistas_por_hab.toLocaleString("pt-BR")}${scoreText}
          </div>`,
          { className: "dark-tooltip" }
        );

        marker.on("click", () => onCidadeClick(cidade));
        marker.addTo(markersLayer);

        // Add city label at higher zoom
        if (zoom >= 7 && (cidade.populacao >= 500000 || zoom >= 9)) {
          const label = L.marker([cidade.lat, cidade.lng], {
            icon: L.divIcon({
              className: "city-label",
              html: `<span>${cidade.cidade}</span>`,
              iconSize: [100, 20],
              iconAnchor: [50, -radius - 4],
            }),
          });
          label.addTo(markersLayer);
        }
      });
    };

    updateMarkers();
    map.on("zoomend moveend", updateMarkers);

    return () => {
      map.off("zoomend moveend", updateMarkers);
    };
  }, [mapReady, metrica, regiaoFiltro, onCidadeClick]);

  return (
    <>
      <style jsx global>{`
        .dark-tooltip {
          background: #1e293b !important;
          border: 1px solid #475569 !important;
          border-radius: 8px !important;
          color: #e2e8f0 !important;
          padding: 8px 12px !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4) !important;
        }
        .dark-tooltip::before {
          border-top-color: #475569 !important;
        }
        .leaflet-tooltip-top::before { border-top-color: #475569 !important; }
        .leaflet-tooltip-bottom::before { border-bottom-color: #475569 !important; }
        .leaflet-tooltip-left::before { border-left-color: #475569 !important; }
        .leaflet-tooltip-right::before { border-right-color: #475569 !important; }
        .city-label span {
          color: #e2e8f0;
          font-size: 11px;
          font-weight: 600;
          text-shadow: 0 0 4px #0f172a, 0 0 8px #0f172a, 1px 1px 2px #0f172a;
          white-space: nowrap;
          pointer-events: none;
        }
        .leaflet-control-zoom a {
          background: #1e293b !important;
          color: #e2e8f0 !important;
          border-color: #475569 !important;
        }
        .leaflet-control-zoom a:hover {
          background: #334155 !important;
        }
        .leaflet-bar {
          border: 1px solid #475569 !important;
          border-radius: 8px !important;
          overflow: hidden;
        }
      `}</style>
      <div
        ref={mapRef}
        className="w-full h-full rounded-xl overflow-hidden"
        style={{ minHeight: 500, background: "#0f172a" }}
      />
    </>
  );
}
