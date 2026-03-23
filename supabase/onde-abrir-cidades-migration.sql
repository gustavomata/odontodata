-- =============================================================================
-- OdontoData — Where to Open: City-level opportunity data (USA)
-- Populated by cron /api/cron/onde-abrir/cidades/[uf]
-- Sources: Census ACS 5-Year, NPPES NPI Registry, HRSA HPSA
-- =============================================================================

CREATE TABLE IF NOT EXISTS onde_abrir_cidades_usa (
  -- Identity
  uf                TEXT NOT NULL,
  fips_place        TEXT NOT NULL,            -- Census 7-digit place FIPS (state+place)
  nome              TEXT NOT NULL,

  -- Classification
  tipo              TEXT DEFAULT 'Secondary', -- Metro/Suburban/Secondary/Rural/College Town

  -- Demographics (from Census ACS)
  populacao         INTEGER NOT NULL DEFAULT 0,
  mediana_renda     INTEGER,                  -- median household income USD
  crescimento_pop_pct NUMERIC(5,2),           -- 5-year pop growth %

  -- Dental workforce (from NPPES NPI Registry)
  dentistas_total   INTEGER,                  -- active dentist count from NPI
  dentistas_por_100k NUMERIC(6,1),            -- computed: (dentistas_total / populacao) * 100000

  -- HPSA (from HRSA)
  hpsa              BOOLEAN DEFAULT false,

  -- Market factors (initially from state-level, refined over time)
  penetracao_dso    NUMERIC(5,1) DEFAULT 0,
  especialidade_mais_carente TEXT,

  -- Computed scores
  score_oportunidade SMALLINT,
  classificacao     TEXT,                     -- Excellent/Very Good/Good/Moderate/Saturated
  nota              TEXT,                     -- auto-generated description

  -- Geography
  lat               NUMERIC(8,5),
  lng               NUMERIC(9,5),

  -- Metadata
  fonte_dados       TEXT DEFAULT 'Census ACS 2022, NPPES, HRSA HPSA',
  atualizado_em     TIMESTAMPTZ DEFAULT NOW(),

  PRIMARY KEY (uf, fips_place)
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_cidades_usa_uf
  ON onde_abrir_cidades_usa (uf);
CREATE INDEX IF NOT EXISTS idx_cidades_usa_score
  ON onde_abrir_cidades_usa (score_oportunidade DESC);
CREATE INDEX IF NOT EXISTS idx_cidades_usa_pop
  ON onde_abrir_cidades_usa (populacao DESC);
CREATE INDEX IF NOT EXISTS idx_cidades_usa_uf_score
  ON onde_abrir_cidades_usa (uf, score_oportunidade DESC);
CREATE INDEX IF NOT EXISTS idx_cidades_usa_hpsa
  ON onde_abrir_cidades_usa (hpsa) WHERE hpsa = true;
CREATE INDEX IF NOT EXISTS idx_cidades_usa_tipo
  ON onde_abrir_cidades_usa (tipo);

-- GiST index for viewport-based queries (lat/lng bounding box)
CREATE INDEX IF NOT EXISTS idx_cidades_usa_geo
  ON onde_abrir_cidades_usa (lat, lng);

-- RLS: public read, service_role write
ALTER TABLE onde_abrir_cidades_usa ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'onde_abrir_cidades_usa'
      AND policyname = 'public_read_cidades_usa'
  ) THEN
    CREATE POLICY public_read_cidades_usa
      ON onde_abrir_cidades_usa FOR SELECT USING (true);
  END IF;
END $$;

-- Auto-update timestamp trigger (reuse existing function)
DROP TRIGGER IF EXISTS trg_cidades_usa_timestamp ON onde_abrir_cidades_usa;
CREATE TRIGGER trg_cidades_usa_timestamp
  BEFORE UPDATE ON onde_abrir_cidades_usa
  FOR EACH ROW EXECUTE FUNCTION update_onde_abrir_timestamp();
