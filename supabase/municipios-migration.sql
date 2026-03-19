-- ============================================================
-- OdontoData — Tabela de Municípios com dados odontológicos
-- Fontes: IBGE (coordenadas + população) + CNES/DataSUS (dentistas)
-- Execute este arquivo no SQL Editor do Supabase
-- ============================================================

CREATE TABLE IF NOT EXISTS municipios_odonto (
  codigo_ibge         INTEGER PRIMARY KEY,
  municipio           TEXT NOT NULL,
  uf                  CHAR(2) NOT NULL,
  regiao              TEXT NOT NULL,
  lat                 NUMERIC(9,6) NOT NULL,
  lng                 NUMERIC(9,6) NOT NULL,
  populacao           INTEGER,
  dentistas_total     INTEGER DEFAULT 0,
  dentistas_por_hab   INTEGER,          -- habitantes por dentista (menor = mais saturado)
  score_oportunidade  INTEGER,          -- 0–100 calculado
  classificacao       TEXT CHECK (classificacao IN ('Excelente','Muito Bom','Bom','Moderado','Saturado')),
  renda_per_capita    NUMERIC(10,2),    -- IBGE/PNAD
  idh                 NUMERIC(5,3),     -- PNUD
  cobertura_esb       NUMERIC(5,2),     -- % cobertura Equipe Saúde Bucal (DataSUS e-Gestor)
  fonte_dentistas     TEXT DEFAULT 'CNES',
  fonte_populacao     TEXT DEFAULT 'IBGE',
  atualizado_em       TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance no mapa
CREATE INDEX IF NOT EXISTS idx_municipios_uf       ON municipios_odonto(uf);
CREATE INDEX IF NOT EXISTS idx_municipios_regiao   ON municipios_odonto(regiao);
CREATE INDEX IF NOT EXISTS idx_municipios_populacao ON municipios_odonto(populacao DESC);
CREATE INDEX IF NOT EXISTS idx_municipios_lat_lng  ON municipios_odonto(lat, lng);

-- RLS: leitura pública
ALTER TABLE municipios_odonto ENABLE ROW LEVEL SECURITY;
CREATE POLICY "municipios_public_read"
  ON municipios_odonto FOR SELECT
  USING (true);

-- Permissão de insert/update apenas via service role (script de importação)
CREATE POLICY "municipios_service_write"
  ON municipios_odonto FOR ALL
  USING (auth.role() = 'service_role');
