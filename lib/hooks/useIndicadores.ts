"use client";
import { useState, useEffect } from "react";
import type { PaisCode } from "@/components/CountrySelector";

// Shape returned by /api/indicadores
export interface IndicadoresPais {
  pais?: string;
  totalDentistas: number;
  dentistasAtivos: number;
  dentistasPublicos: number;
  dentistasPrivados: number;
  totalEspecialistas: number;
  totalGeneralistas: number;
  mediaHabitantesBrasil: number;
  recomendacaoOMS: number;
  totalEstabelecimentos: number;
  faculdadesOdontologia: number;
  vagasAnuais: number;
  crescimentoUltimoAno: number;
  // Supabase fields (snake_case) — present when source = "live"
  total_dentistas?: number;
  dentistas_ativos?: number;
  dentistas_publicos?: number;
  dentistas_privados?: number;
  total_especialistas?: number;
  total_generalistas?: number;
  media_habitantes?: number;
  total_estabelecimentos?: number;
  faculdades_odontologia?: number;
  vagas_anuais?: number;
  crescimento_pct?: number;
  ultima_atualizacao?: string;
}

// Normalize Supabase snake_case to camelCase matching static data shape
function normalize(raw: Record<string, unknown>): IndicadoresPais {
  return {
    pais: raw.pais as string,
    totalDentistas:        (raw.total_dentistas        ?? raw.totalDentistas        ?? 0) as number,
    dentistasAtivos:       (raw.dentistas_ativos        ?? raw.dentistasAtivos       ?? 0) as number,
    dentistasPublicos:     (raw.dentistas_publicos      ?? raw.dentistasPublicos     ?? 0) as number,
    dentistasPrivados:     (raw.dentistas_privados      ?? raw.dentistasPrivados     ?? 0) as number,
    totalEspecialistas:    (raw.total_especialistas     ?? raw.totalEspecialistas    ?? 0) as number,
    totalGeneralistas:     (raw.total_generalistas      ?? raw.totalGeneralistas     ?? 0) as number,
    mediaHabitantesBrasil: (raw.media_habitantes        ?? raw.mediaHabitantesBrasil ?? 0) as number,
    recomendacaoOMS:       (raw.recomendacaoOMS         ?? 1500) as number,
    totalEstabelecimentos: (raw.total_estabelecimentos  ?? raw.totalEstabelecimentos ?? 0) as number,
    faculdadesOdontologia: (raw.faculdades_odontologia  ?? raw.faculdadesOdontologia ?? 0) as number,
    vagasAnuais:           (raw.vagas_anuais            ?? raw.vagasAnuais           ?? 0) as number,
    crescimentoUltimoAno:  (raw.crescimento_pct         ?? raw.crescimentoUltimoAno  ?? 0) as number,
    ultima_atualizacao:    raw.ultima_atualizacao as string | undefined,
  };
}

interface UseIndicadoresResult {
  data: IndicadoresPais | null;
  isLoading: boolean;
  isLive: boolean;
  ultimaAtualizacao: string | null;
  refetch: () => void;
}

const cache: Record<string, { data: IndicadoresPais; fetchedAt: number; isLive: boolean; ultimaAtualizacao: string | null }> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function useIndicadores(pais: PaisCode): UseIndicadoresResult {
  const [data, setData] = useState<IndicadoresPais | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const cached = cache[pais];
    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL) {
      setData(cached.data);
      setIsLive(cached.isLive);
      setUltimaAtualizacao(cached.ultimaAtualizacao);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetch(`/api/indicadores?pais=${pais}`)
      .then((r) => r.json())
      .then(({ data: raw, source, ultimaAtualizacao: ua }) => {
        if (!raw) return;
        const normalized = normalize(raw);
        const live = source === "live";
        cache[pais] = { data: normalized, fetchedAt: Date.now(), isLive: live, ultimaAtualizacao: ua ?? null };
        setData(normalized);
        setIsLive(live);
        setUltimaAtualizacao(ua ?? null);
      })
      .catch(() => { /* keep previous data / static fallback already set */ })
      .finally(() => setIsLoading(false));
  }, [pais, tick]);

  return { data, isLoading, isLive, ultimaAtualizacao, refetch: () => setTick((t) => t + 1) };
}
