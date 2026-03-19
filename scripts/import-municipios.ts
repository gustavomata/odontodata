/**
 * OdontoData — Script de importação de municípios
 *
 * Fontes reais utilizadas:
 *  - IBGE API: lista de municípios, regiões e codigos
 *  - GitHub/kelvins: coordenadas geográficas de todos os 5.570 municípios
 *  - CNES/DataSUS API: contagem de dentistas (CBO 2232**) por município
 *
 * Como executar:
 *   npm run import:municipios
 *
 * Pré-requisitos no .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL=...
 *   SUPABASE_SERVICE_ROLE_KEY=...
 */

import { config } from "dotenv";
import { resolve } from "path";
// Carrega .env.local automaticamente
config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";

// ─── CONFIG ──────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// IBGE API endpoints (gratuitos, sem autenticação)
const IBGE_MUNICIPIOS_URL =
  "https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome";

// Dataset com coordenadas de todos os 5.570 municípios (IBGE/OSM-derived)
const COORDS_CSV_URL =
  "https://raw.githubusercontent.com/kelvins/municipios-brasileiros/main/csv/municipios.csv";

// CNES DataSUS — contagem de profissionais por município e CBO
// CBO 2232** = Cirurgião-Dentista (todos os tipos)
const CNES_BASE_URL = "https://apidadosabertos.saude.gov.br/cnes";

// Mapeamento de código de UF IBGE → sigla
const UF_MAP: Record<number, string> = {
  11: "RO", 12: "AC", 13: "AM", 14: "RR", 15: "PA",
  16: "AP", 17: "TO", 21: "MA", 22: "PI", 23: "CE",
  24: "RN", 25: "PB", 26: "PE", 27: "AL", 28: "SE",
  29: "BA", 31: "MG", 32: "ES", 33: "RJ", 35: "SP",
  41: "PR", 42: "SC", 43: "RS", 50: "MS", 51: "MT",
  52: "GO", 53: "DF",
};

const REGIAO_MAP: Record<string, string> = {
  RO: "Norte", AC: "Norte", AM: "Norte", RR: "Norte", PA: "Norte",
  AP: "Norte", TO: "Norte",
  MA: "Nordeste", PI: "Nordeste", CE: "Nordeste", RN: "Nordeste",
  PB: "Nordeste", PE: "Nordeste", AL: "Nordeste", SE: "Nordeste", BA: "Nordeste",
  MG: "Sudeste", ES: "Sudeste", RJ: "Sudeste", SP: "Sudeste",
  PR: "Sul", SC: "Sul", RS: "Sul",
  MS: "Centro-Oeste", MT: "Centro-Oeste", GO: "Centro-Oeste", DF: "Centro-Oeste",
};

// ─── TIPOS ───────────────────────────────────────────────────────────────────

interface MunicipioIBGE {
  id: number;
  nome: string;
  microrregiao: {
    mesorregiao: {
      UF: { sigla: string; id: number };
    };
  };
}

interface CoordRow {
  codigo_ibge: number;
  lat: number;
  lng: number;
  populacao?: number;
}

interface MunicipioFinal {
  codigo_ibge: number;
  municipio: string;
  uf: string;
  regiao: string;
  lat: number;
  lng: number;
  populacao: number | null;
  dentistas_total: number;
  dentistas_por_hab: number | null;
  score_oportunidade: number | null;
  classificacao: string | null;
  fonte_dentistas: string;
  fonte_populacao: string;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchJson(url: string, retries = 3): Promise<unknown> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (i < retries - 1) {
        console.warn(`  Retry ${i + 1} for ${url}`);
        await sleep(1000 * (i + 1));
      } else throw e;
    }
  }
}

/** Parseia CSV simples sem dependências externas */
function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim().replace(/"/g, ""));
    return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""]));
  });
}

/**
 * Calcula score de oportunidade (0–100) com base em:
 *  - Habitantes por dentista (peso 60%)
 *  - Cobertura ESB (peso 40%)
 */
function calcScore(dentPorHab: number | null): {
  score: number;
  classificacao: string;
} {
  if (!dentPorHab) return { score: 0, classificacao: "Sem dados" };

  // Escala de saturação (menor hab/dent = mais saturado)
  let scoreSat = 0;
  if (dentPorHab >= 3000) scoreSat = 100;
  else if (dentPorHab >= 2000) scoreSat = 80;
  else if (dentPorHab >= 1500) scoreSat = 65;
  else if (dentPorHab >= 1000) scoreSat = 45;
  else if (dentPorHab >= 700)  scoreSat = 30;
  else scoreSat = 15;

  const score = Math.min(100, Math.max(0, scoreSat));

  let classificacao = "Moderado";
  if (score >= 85) classificacao = "Excelente";
  else if (score >= 70) classificacao = "Muito Bom";
  else if (score >= 55) classificacao = "Bom";
  else if (score >= 35) classificacao = "Moderado";
  else classificacao = "Saturado";

  return { score, classificacao };
}

// ─── ETAPAS DE IMPORTAÇÃO ────────────────────────────────────────────────────

/** 1. Busca lista de municípios do IBGE (código + nome + UF) */
async function fetchMunicipiosIBGE(): Promise<
  { id: number; nome: string; uf: string }[]
> {
  console.log("📡 Buscando municípios do IBGE...");
  const data = (await fetchJson(IBGE_MUNICIPIOS_URL)) as MunicipioIBGE[];
  return data.map((m) => ({
    id: m.id,
    nome: m.nome,
    uf: m.microrregiao.mesorregiao.UF.sigla,
  }));
}

/** 2. Busca coordenadas de todos os municípios via dataset CSV */
async function fetchCoordenadas(): Promise<Map<number, CoordRow>> {
  console.log("📡 Buscando coordenadas (kelvins/municipios-brasileiros)...");
  const res = await fetch(COORDS_CSV_URL, { signal: AbortSignal.timeout(30000) });
  const text = await res.text();
  const rows = parseCSV(text);

  const map = new Map<number, CoordRow>();
  for (const row of rows) {
    const code = parseInt(row["codigo_ibge"] || row["codigo_municipio"] || "0");
    const lat = parseFloat(row["latitude"] || row["lat"] || "0");
    const lng = parseFloat(row["longitude"] || row["lng"] || "0");
    const pop = row["populacao"] ? parseInt(row["populacao"]) : undefined;
    if (code && lat && lng) {
      map.set(code, { codigo_ibge: code, lat, lng, populacao: pop });
    }
  }
  console.log(`  ✓ ${map.size} coordenadas carregadas`);
  return map;
}

/**
 * 3. Busca contagem de dentistas do CNES por UF
 *    CBO 2232** = Cirurgião-Dentista
 *    Endpoint público: /profissionais?co_cbo=2232&sg_uf=XX&limit=...
 */
async function fetchDentistasPorUF(
  uf: string
): Promise<Map<number, number>> {
  const map = new Map<number, number>(); // codigo_ibge → contagem
  let offset = 0;
  const limit = 100;

  while (true) {
    const url = `${CNES_BASE_URL}/profissionais?co_cbo=2232&sg_uf=${uf}&limit=${limit}&offset=${offset}`;
    let data: unknown;
    try {
      data = await fetchJson(url);
    } catch {
      console.warn(`  ⚠ Falha ao buscar CNES UF=${uf} offset=${offset}`);
      break;
    }

    const items = (data as { items?: unknown[] })?.items ?? [];
    if (items.length === 0) break;

    for (const item of items as Record<string, unknown>[]) {
      const coMunicipio = Number(
        item["co_municipio_gestor"] ||
        item["co_municipio"] ||
        item["CO_MUNICIPIO_GESTOR"] ||
        0
      );
      if (coMunicipio) {
        map.set(coMunicipio, (map.get(coMunicipio) ?? 0) + 1);
      }
    }

    if (items.length < limit) break;
    offset += limit;
    await sleep(200); // respeitar rate limit
  }

  return map;
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("❌ NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não definidos");
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false },
  });

  // 1. Municípios IBGE
  const municipiosIBGE = await fetchMunicipiosIBGE();
  console.log(`  ✓ ${municipiosIBGE.length} municípios do IBGE`);

  // 2. Coordenadas
  const coordsMap = await fetchCoordenadas();

  // 3. Dentistas por UF (CNES)
  const ufs = [...new Set(municipiosIBGE.map((m) => m.uf))].sort();
  const dentistasPorMunicipio = new Map<number, number>();

  console.log(`\n📡 Buscando dentistas do CNES para ${ufs.length} estados...`);
  for (const uf of ufs) {
    process.stdout.write(`  ${uf}...`);
    try {
      const mapa = await fetchDentistasPorUF(uf);
      for (const [cod, count] of mapa) {
        dentistasPorMunicipio.set(cod, (dentistasPorMunicipio.get(cod) ?? 0) + count);
      }
      console.log(` ${mapa.size} municípios com dentistas`);
    } catch {
      console.log(" falhou (usando 0)");
    }
    await sleep(300);
  }

  // 4. Montar registros finais
  const registros: MunicipioFinal[] = [];
  let semCoords = 0;

  for (const mun of municipiosIBGE) {
    // Código IBGE de município tem 7 dígitos, o CNES usa 6 (sem dígito verificador)
    const codigoIBGE7 = mun.id;
    const codigoCNES6 = Math.floor(codigoIBGE7 / 10);

    const coord = coordsMap.get(codigoIBGE7) ?? coordsMap.get(codigoCNES6);
    if (!coord) {
      semCoords++;
      continue;
    }

    const dentistas = dentistasPorMunicipio.get(codigoCNES6) ??
                      dentistasPorMunicipio.get(codigoIBGE7) ?? 0;
    const populacao = coord.populacao ?? null;
    const dentPorHab = dentistas > 0 && populacao ? Math.round(populacao / dentistas) : null;
    const { score, classificacao } = calcScore(dentPorHab);

    registros.push({
      codigo_ibge: codigoIBGE7,
      municipio: mun.nome,
      uf: mun.uf,
      regiao: REGIAO_MAP[mun.uf] ?? "Desconhecida",
      lat: coord.lat,
      lng: coord.lng,
      populacao,
      dentistas_total: dentistas,
      dentistas_por_hab: dentPorHab,
      score_oportunidade: dentistas > 0 ? score : null,
      classificacao: dentistas > 0 ? classificacao : null,
      fonte_dentistas: "CNES/DataSUS",
      fonte_populacao: "IBGE",
    });
  }

  console.log(`\n📊 Registros preparados: ${registros.length} (sem coords: ${semCoords})`);
  console.log(`   Com dados de dentistas: ${registros.filter((r) => r.dentistas_total > 0).length}`);

  // 5. Inserir no Supabase em lotes de 500
  console.log("\n💾 Inserindo no Supabase...");
  const BATCH = 500;
  let total = 0;

  for (let i = 0; i < registros.length; i += BATCH) {
    const batch = registros.slice(i, i + BATCH);
    const { error } = await supabase
      .from("municipios_odonto")
      .upsert(
        batch.map((r) => ({ ...r, pais: "BR" })),
        { onConflict: "pais,codigo_ibge" }
      );

    if (error) {
      console.error(`  ❌ Erro no lote ${i}–${i + BATCH}:`, error.message);
    } else {
      total += batch.length;
      process.stdout.write(`  ${total}/${registros.length} inseridos...\r`);
    }
  }

  console.log(`\n\n✅ Importação concluída! ${total} municípios no Supabase.`);
  console.log("   Agora o mapa usará dados reais do IBGE + CNES.");
}

main().catch((e) => {
  console.error("❌ Erro fatal:", e);
  process.exit(1);
});
