-- =============================================================================
-- OdontoData — pais_indicadores table
-- Stores live dental workforce indicators per country
-- Updated by cron scrapers; pages fall back to static data if unavailable
-- =============================================================================

CREATE TABLE IF NOT EXISTS pais_indicadores (
  pais                        CHAR(2)       PRIMARY KEY,
  total_dentistas             INTEGER       NOT NULL,
  dentistas_ativos            INTEGER       NOT NULL,
  dentistas_publicos          INTEGER       NOT NULL,
  dentistas_privados          INTEGER       NOT NULL,
  total_especialistas         INTEGER       NOT NULL,
  total_generalistas          INTEGER       NOT NULL,
  media_habitantes            INTEGER       NOT NULL,  -- people per dentist
  total_estabelecimentos      INTEGER       NOT NULL,
  faculdades_odontologia      INTEGER       NOT NULL,
  vagas_anuais                INTEGER       NOT NULL,
  crescimento_pct             DECIMAL(4,1)  NOT NULL,
  fonte                       TEXT          NOT NULL,
  fonte_url                   TEXT,
  ultima_atualizacao          TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- RLS: public read, service_role write
ALTER TABLE pais_indicadores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read pais_indicadores"
  ON pais_indicadores FOR SELECT
  USING (true);

CREATE POLICY "Service role write pais_indicadores"
  ON pais_indicadores FOR ALL
  USING (auth.role() = 'service_role');

-- Seed with current data (matches static fallback values)
INSERT INTO pais_indicadores (pais, total_dentistas, dentistas_ativos, dentistas_publicos, dentistas_privados, total_especialistas, total_generalistas, media_habitantes, total_estabelecimentos, faculdades_odontologia, vagas_anuais, crescimento_pct, fonte, fonte_url, ultima_atualizacao)
VALUES
  ('BR', 464129, 428000, 71650,  392479, 293050, 171079, 462,  210540, 540, 25000, 4.1, 'CFO - Conselho Federal de Odontologia', 'https://website.cfo.org.br/estatisticas/quantidade-geral-de-entidades-e-profissionais-ativos/', NOW()),
  ('US', 205800, 187900, 14800,  191000, 61400,  144400, 1639, 196000, 67,  6100,  0.8, 'ADA Health Policy Institute · NPPES/CMS 2022', 'https://www.ada.org/resources/research/health-policy-institute', NOW()),
  ('DE', 77800,  70200,  14160,  63640,  35800,  42000,  1075, 54200,  30,  2900,  1.2, 'BZÄK - Bundeszahnärztekammer 2023', 'https://www.bzaek.de/ueber-uns/daten-und-zahlen.html', NOW()),
  ('AU', 30041,  27200,  4800,   25241,  6800,   23241,  840,  15200,  10,  900,   2.1, 'AHPRA · AIHW Dental Workforce 2022', 'https://www.aihw.gov.au/reports/dental-oral-health/dental-workforce', NOW()),
  ('UK', 42200,  38500,  24600,  17600,  5400,   36800,  1581, 14200,  16,  1200,  0.0, 'GDC Annual Statistics 2023 · NHS Digital', 'https://www.gdc-uk.org/about-us/what-we-do/research-and-analysis/registrant-numbers', NOW()),
  ('FR', 42200,  41100,  27500,  14700,  8700,   33500,  1568, 39000,  16,  1400,  0.0, 'ONCD - Ordre National des Chirurgiens-Dentistes 2023', 'https://www.ordre-chirurgiens-dentistes.fr/lordre/statistiques.html', NOW()),
  ('CA', 22800,  21800,  1670,   21130,  7060,   15740,  1711, 17800,  10,  600,   1.8, 'CIHI Dental Workforce in Canada 2023', 'https://www.cihi.ca/en/health-workforce', NOW()),
  ('JP', 107000, 102000, 9600,   97400,  28800,  78200,  1179, 68200,  29,  3200,  0.4, 'MHLW 歯科医師・薬剤師統計 2022', 'https://www.mhlw.go.jp/toukei/saikin/hw/ishi/22/index.html', NOW())
ON CONFLICT (pais) DO UPDATE
  SET total_dentistas        = EXCLUDED.total_dentistas,
      dentistas_ativos       = EXCLUDED.dentistas_ativos,
      dentistas_publicos     = EXCLUDED.dentistas_publicos,
      dentistas_privados     = EXCLUDED.dentistas_privados,
      total_especialistas    = EXCLUDED.total_especialistas,
      total_generalistas     = EXCLUDED.total_generalistas,
      media_habitantes       = EXCLUDED.media_habitantes,
      total_estabelecimentos = EXCLUDED.total_estabelecimentos,
      faculdades_odontologia = EXCLUDED.faculdades_odontologia,
      vagas_anuais           = EXCLUDED.vagas_anuais,
      crescimento_pct        = EXCLUDED.crescimento_pct,
      fonte                  = EXCLUDED.fonte,
      fonte_url              = EXCLUDED.fonte_url,
      ultima_atualizacao     = NOW();
