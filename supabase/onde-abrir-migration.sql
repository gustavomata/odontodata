-- =============================================================================
-- OdontoData — Onde Abrir / Where to Open: USA state-level opportunity data
-- Scores are recomputed by cron (/api/cron/onde-abrir) using Census + manual factors
-- =============================================================================

CREATE TABLE IF NOT EXISTS onde_abrir_estados_usa (
  uf                     TEXT PRIMARY KEY,
  estado                 TEXT NOT NULL,
  regiao                 TEXT NOT NULL,
  -- Demographics (refreshed from Census Bureau API)
  populacao              INTEGER,
  mediana_renda          INTEGER,
  crescimento_pop_pct    NUMERIC(5,2),
  -- Dental workforce (refreshed from ADA/HRSA data annually)
  dentistas_total        INTEGER,
  dentistas_por_100k     NUMERIC(6,1),
  hpsa_count             INTEGER,
  -- Updateable factors (refreshed semi-annually or manually)
  pct_sem_seguro_dental  NUMERIC(5,1),
  medicaid_idx           SMALLINT,
  penetracao_dso         NUMERIC(5,1),
  dental_grads_ano       INTEGER,
  custo_aluguel_idx      SMALLINT,
  -- Computed score (recomputed by cron after factor update)
  score_oportunidade     SMALLINT,
  classificacao          TEXT,
  fatores_positivos      TEXT[],
  fatores_negativos      TEXT[],
  melhor_cidade          TEXT,
  pior_cidade            TEXT,
  -- Metadata
  fonte_dados            TEXT DEFAULT 'ADA HPI 2023, HRSA 2023, ACS 2022, CMS, CoStar',
  atualizado_em          TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_onde_abrir_usa_score    ON onde_abrir_estados_usa (score_oportunidade DESC);
CREATE INDEX IF NOT EXISTS idx_onde_abrir_usa_regiao   ON onde_abrir_estados_usa (regiao);
CREATE INDEX IF NOT EXISTS idx_onde_abrir_usa_class    ON onde_abrir_estados_usa (classificacao);

-- RLS: public read, service_role write
ALTER TABLE onde_abrir_estados_usa ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'onde_abrir_estados_usa'
      AND policyname = 'public_read_onde_abrir_usa'
  ) THEN
    CREATE POLICY public_read_onde_abrir_usa
      ON onde_abrir_estados_usa FOR SELECT USING (true);
  END IF;
END $$;

-- Trigger: auto-update atualizado_em
CREATE OR REPLACE FUNCTION update_onde_abrir_timestamp()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_onde_abrir_usa_timestamp ON onde_abrir_estados_usa;
CREATE TRIGGER trg_onde_abrir_usa_timestamp
  BEFORE UPDATE ON onde_abrir_estados_usa
  FOR EACH ROW EXECUTE FUNCTION update_onde_abrir_timestamp();

-- =============================================================================
-- SEED DATA — all 50 states + DC
-- =============================================================================
INSERT INTO onde_abrir_estados_usa (
  uf, estado, regiao, populacao, mediana_renda, crescimento_pop_pct,
  dentistas_total, dentistas_por_100k, hpsa_count,
  pct_sem_seguro_dental, medicaid_idx, penetracao_dso, dental_grads_ano, custo_aluguel_idx,
  score_oportunidade, classificacao, fatores_positivos, fatores_negativos,
  melhor_cidade, pior_cidade
) VALUES
('MS','Mississippi',         'South',     2961279,  46637, -1.5,  1800,  61.0, 85, 79.0, 45, 12.0, 120, 62,  91, 'Excellent', ARRAY['Highest workforce shortage in US','85 HPSA designations','Lowest DSO penetration','Low startup costs'],        ARRAY['Lowest state income','Negative pop growth','Low Medicaid reimbursement'],   'Tupelo',             'Jackson'),
('AL','Alabama',             'South',     5024279,  54943,  0.5,  2800,  55.7, 78, 76.0, 50, 14.0, 120, 65,  88, 'Excellent', ARRAY['Lowest dentist ratio in US','78 HPSA designations','Low commercial rents','Growing rural markets'],            ARRAY['Below-average income','Low Medicaid reimbursement','Limited specialist network'], 'Huntsville',         'Birmingham'),
('AR','Arkansas',            'South',     3011524,  49228,  1.2,  1900,  63.1, 68, 77.0, 48, 15.0,  60, 63,  85, 'Excellent', ARRAY['High workforce shortage','68 HPSA designations','Low competition','Positive pop growth','Very low startup costs'], ARRAY['Low income market','Limited dental lab infra','Rural geography challenges'],   'Fayetteville',       'Little Rock'),
('WV','West Virginia',       'South',     1793716,  48037, -2.1,  1500,  83.6, 65, 75.0, 72, 11.0,  40, 60,  83, 'Excellent', ARRAY['High HPSA per capita','Good Medicaid reimbursement','Very low competition','Lowest rents','NHSC loan eligible'],  ARRAY['Declining population','Aging demographics','Economic transition'],            'Morgantown',         'Charleston'),
('LA','Louisiana',           'South',     4657757,  52087,  0.3,  3200,  68.7, 72, 78.0, 52, 16.0, 140, 68,  81, 'Excellent', ARRAY['72 HPSA designations','Strong oil/gas corridors','Low DSO penetration','Large underserved pop'],                ARRAY['Hurricane risk','Below-average income','New Orleans competitive'],           'Shreveport',         'New Orleans'),
('KY','Kentucky',            'South',     4505836,  55629,  1.0,  3100,  68.8, 70, 74.0, 68, 18.0, 100, 65,  79, 'Very Good', ARRAY['Good Medicaid reimbursement','70 HPSA areas','Amazon/Toyota growth','Rural opportunity'],                      ARRAY['Appalachian challenges','Low income eastern counties','Higher default rates'], 'Lexington',          'Louisville'),
('OK','Oklahoma',            'South',     3959353,  54449,  1.8,  2900,  73.2, 63, 76.0, 42, 17.0,  80, 67,  77, 'Very Good', ARRAY['Good pop growth','63 HPSA designations','Energy sector employment','Low rents','Low DSO'],                    ARRAY['Low Medicaid reimbursement','OKC competitive','High uninsured rate'],         'Tulsa',              'Oklahoma City'),
('TN','Tennessee',           'South',     6910840,  57581,  4.2,  5300,  76.7, 58, 74.0, 55, 22.0, 160, 75,  74, 'Very Good', ARRAY['Fast pop growth','Strong economy','58 HPSA','Affordable costs','Nashville healthcare hub'],                   ARRAY['Growing DSO presence','Nashville competitive','Urban-rural divide'],          'Clarksville',        'Nashville'),
('GA','Georgia',             'South',    10711908,  61224,  5.8,  7500,  70.0, 68, 75.0, 48, 25.0, 200, 85,  72, 'Very Good', ARRAY['Fastest growing major state','68 HPSA','Strong tech sector','Large underserved rural'],                       ARRAY['Atlanta metro highly competitive','Growing DSO','Low Medicaid'],              'Savannah',           'Atlanta'),
('TX','Texas',               'South',    29145505,  63826,  8.9, 20500,  70.3,105, 77.0, 40, 28.0, 460, 85,  70, 'Very Good', ARRAY['No state income tax','Massive market','Fastest growing','105 HPSA rural/suburban'],                           ARRAY['Major cities saturated','High DSO','Very low Medicaid','Large pipeline'],    'El Paso',            'Houston Medical Ctr'),
('NV','Nevada',              'West',      3104614,  63276,  9.5,  2500,  80.5, 32, 79.0, 55, 24.0,   0, 88,  68, 'Very Good', ARRAY['Fastest growing state','No state income tax','No in-state dental schools','Casino corridor'],                 ARRAY['Las Vegas competitive','High uninsured rate','Tourism-dependent'],           'Henderson',          'Las Vegas Strip'),
('SC','South Carolina',      'South',     5118425,  57216,  7.4,  3900,  76.2, 52, 74.0, 52, 21.0,  80, 75,  66, 'Very Good', ARRAY['Strong retirement growth','7.4% pop growth','52 HPSA','BMW/Boeing manufacturing'],                            ARRAY['Coastal markets competitive','Low Medicaid','Limited specialists'],           'Greenville',         'Charleston'),
('IN','Indiana',             'Midwest',   6785528,  58235,  1.5,  4800,  70.7, 55, 74.0, 58, 19.0, 100, 70,  65, 'Very Good', ARRAY['Low commercial rents','55 HPSA','Stable manufacturing','Moderate DSO','Good Medicaid'],                      ARRAY['Flat pop growth','Indianapolis saturated','Limited acquisition targets'],    'Fort Wayne',         'Indianapolis'),
('DE','Delaware',            'South',      989948,  72234,  5.9,   700,  70.7,  8, 73.0, 75, 18.0,   0, 80,  64, 'Good',      ARRAY['No sales tax','5.9% pop growth','High Medicaid index','No dental schools','High income corridor'],            ARRAY['Small total market','Only 8 HPSA','Near saturated DC/Philly'],              'Dover',              'Wilmington'),
('NM','New Mexico',          'West',      2117522,  51243,  0.8,  1500,  70.8, 48, 79.0, 65, 15.0,   0, 72,  62, 'Good',      ARRAY['48 HPSA designations','Good Medicaid','No dental schools','Low DSO','Tribal opportunities'],                ARRAY['Low income state','Flat pop growth','Small market'],                         'Rio Rancho',         'Albuquerque'),
('KS','Kansas',              'Midwest',   2937880,  61091,  0.5,  2300,  78.3, 42, 73.0, 55, 16.0,  40, 68,  60, 'Good',      ARRAY['42 HPSA','Very low rents','Low DSO','Stable agricultural economy','Good Medicaid'],                          ARRAY['Flat pop growth','Small market','Limited acquisition targets'],              'Overland Park',      'Wichita'),
('IA','Iowa',                'Midwest',   3190369,  61691,  0.8,  2500,  78.4, 38, 72.0, 62, 17.0,  80, 67,  59, 'Good',      ARRAY['Good Medicaid','38 HPSA','Stable economy','Low practice costs','Strong dental tradition'],                   ARRAY['Aging/flat pop growth','Limited urban market','College town saturation'],   'Cedar Rapids',       'Iowa City'),
('NC','North Carolina',      'South',    10439388,  57341,  6.1,  7800,  74.7, 72, 74.0, 55, 24.0, 200, 82,  57, 'Good',      ARRAY['72 HPSA','6.1% pop growth','Research Triangle growth','Strong suburban demand'],                             ARRAY['Charlotte/Raleigh competitive','Growing DSO','Large pipeline'],              'Fayetteville',       'Raleigh'),
('AZ','Arizona',             'West',      7151502,  62055,  7.6,  5400,  75.5, 45, 78.0, 55, 26.0, 120, 88,  55, 'Good',      ARRAY['7.6% pop growth','45 HPSA','Retiree boom','Sun Belt economy'],                                               ARRAY['Phoenix highly competitive','Growing DSO','High metro rents'],               'Tucson',             'Scottsdale'),
('FL','Florida',             'South',    21538187,  58000, 11.0, 18500,  85.9, 65, 76.0, 45, 32.0, 300, 95,  52, 'Good',      ARRAY['Fastest growing by migration','No state income tax','Large retiree market','65 HPSA rural north FL'],         ARRAY['Coastal areas saturated','Highest DSO in South','Hurricane risk'],          'Tallahassee',        'Miami Beach'),
('SD','South Dakota',        'Midwest',    886667,  59533,  6.1,   800,  90.2, 32, 73.0, 55, 11.0,   0, 63,  54, 'Good',      ARRAY['No state income tax','No dental schools','Low DSO','Very low rents','Tribal opportunities'],                 ARRAY['Very small market','Extreme weather','Limited specialist network'],          'Rapid City',         'Sioux Falls'),
('ND','North Dakota',        'Midwest',    779094,  62410,  6.5,   700,  89.9, 28, 72.0, 58, 10.0,   0, 63,  53, 'Good',      ARRAY['Lowest DSO in US','No dental schools','Energy sector economy','Low rents','Good Medicaid'],                  ARRAY['Very small market','Extremely cold','Rural pop decline'],                    'Bismarck',           'Fargo'),
('ID','Idaho',               'West',      1839106,  59321, 14.8,  1500,  81.6, 22, 76.0, 52, 16.0,   0, 82,  52, 'Good',      ARRAY['Fastest growing state (14.8%)','No dental schools','CA/OR migration','Low competition'],                     ARRAY['Rapidly rising rents','Small current market','Low Medicaid'],               'Nampa',              'Boise'),
('MT','Montana',             'West',      1084225,  56539,  7.8,   900,  83.0, 18, 75.0, 62, 12.0,   0, 75,  51, 'Good',      ARRAY['7.8% pop growth','No dental schools','Low DSO','QoL migration magnet','Good Medicaid'],                     ARRAY['Very small market','Extreme seasonal weather','Limited support infra'],     'Billings',           'Missoula'),
('AK','Alaska',              'West',       733391,  77790, -1.0,   600,  81.8, 28, 72.0, 72,  8.0,   0,125,  51, 'Good',      ARRAY['Highest income state','Lowest DSO in US','Good Medicaid','No state income tax'],                            ARRAY['Extremely high costs','Isolation/logistics','Declining pop','Harsh climate'],'Fairbanks',          'Anchorage'),
('WY','Wyoming',             'West',       576851,  64049,  2.5,   500,  86.7, 18, 74.0, 55,  8.0,   0, 72,  51, 'Good',      ARRAY['No state income tax','Lowest DSO','No dental schools','Energy sector income','Low competition'],             ARRAY['Smallest market','Very small population','Extreme weather/remote'],          'Casper',             'Cheyenne'),
('MO','Missouri',            'Midwest',   6154913,  57290,  0.5,  4900,  79.6, 48, 73.0, 58, 20.0, 120, 70,  48, 'Moderate',  ARRAY['48 HPSA','Low rents','Stable economy','Suburban KC/STL pockets','Good Medicaid'],                          ARRAY['Flat pop growth','Major cities competitive','Moderate DSO'],                'Springfield',        'St. Louis'),
('PA','Pennsylvania',        'Northeast', 13002700,  62433, -0.5, 10800,  83.1, 78, 72.0, 75, 22.0, 280, 78,  47, 'Moderate',  ARRAY['78 HPSA','Excellent Medicaid','Large rural pop','Affordable outside Philly/PGH'],                         ARRAY['Declining pop','Big cities competitive','Large dental pipeline'],            'Allentown',          'Philadelphia'),
('CO','Colorado',            'West',      5773714,  74217,  4.8,  4600,  79.7, 38, 72.0, 62, 24.0,  80,110,  46, 'Moderate',  ARRAY['Good income market','Pop growth','38 HPSA','Outdoor lifestyle talent magnet'],                              ARRAY['Denver/Boulder highly competitive','Very high rents','Growing DSO'],         'Fort Collins',       'Denver'),
('OH','Ohio',                'Midwest',  11799448,  58116,  0.2,  9500,  80.5, 65, 72.0, 70, 23.0, 200, 72,  46, 'Moderate',  ARRAY['65 HPSA','Excellent Medicaid','Low rents','Large market','Good dental programs'],                          ARRAY['Columbus/Cleveland competitive','Flat growth','Moderate DSO'],               'Dayton',             'Columbus'),
('VA','Virginia',            'South',     8631393,  76456,  3.0,  7000,  81.1, 55, 72.0, 65, 25.0, 160, 95,  44, 'Moderate',  ARRAY['High income market','55 HPSA rural','Strong military/govt employment','Good Medicaid'],                    ARRAY['N.Virginia highly competitive','High DC-suburb rents','Growing DSO'],       'Roanoke',            'Arlington'),
('MI','Michigan',            'Midwest',  10077331,  59235, -0.2,  9200,  91.3, 58, 72.0, 68, 22.0, 200, 75,  43, 'Moderate',  ARRAY['Good Medicaid','58 HPSA','Affordable outside Detroit','Auto industry comeback'],                           ARRAY['Detroit struggling','Declining pop','Moderate DSO'],                         'Grand Rapids',       'Detroit'),
('HI','Hawaii',              'West',      1455271,  83102,  2.0,  1200,  82.5, 15, 70.0, 72, 12.0,   0,135,  43, 'Moderate',  ARRAY['Highest income in West','Good Medicaid','Low DSO','No dental schools','Tourism cash-pay patients'],        ARRAY['Extremely high rents','Very high cost of living','Island isolation'],       'Kahului (Maui)',     'Honolulu'),
('WI','Wisconsin',           'Midwest',   5893718,  63293,  0.4,  5400,  91.6, 42, 71.0, 75, 19.0,  80, 78,  42, 'Moderate',  ARRAY['Excellent Medicaid','42 HPSA','Low rents','Strong manufacturing','Good insurance'],                       ARRAY['Flat pop growth','Milwaukee competitive','Cold climate limits migration'],  'Green Bay',          'Madison'),
('CT','Connecticut',         'Northeast', 3605944,  80065,  0.8,  2900,  80.4, 32, 70.0, 80, 22.0,  80,108,  41, 'Moderate',  ARRAY['Excellent Medicaid','High income','32 HPSA','Strong insurance','NY/Boston proximity'],                    ARRAY['High rents','Moderate DSO','Flat growth'],                                   'Waterbury',          'Greenwich'),
('MN','Minnesota',           'Midwest',   5706494,  74593,  2.4,  5200,  91.1, 38, 70.0, 78, 21.0,  80, 88,  40, 'Moderate',  ARRAY['Excellent Medicaid','High income','38 HPSA','Strong insurance','Healthcare hub'],                         ARRAY['Minneapolis competitive','Cold climate','High rents','Saturating metros'],  'Rochester',          'Minneapolis'),
('ME','Maine',               'Northeast', 1362359,  59489,  2.4,  1200,  88.1, 22, 72.0, 72, 14.0,   0, 78,  40, 'Moderate',  ARRAY['Low DSO','Good Medicaid','No dental schools','Tourism/retiree growth'],                                   ARRAY['Very small market','Aging rural pop','Harsh winters'],                      'Bangor',             'Portland'),
('NE','Nebraska',            'Midwest',   1961504,  62473,  3.2,  1800,  91.8, 28, 73.0, 62, 17.0,  40, 72,  38, 'Moderate',  ARRAY['3.2% pop growth','Low rents','Stable agricultural economy','28 HPSA','Good Medicaid'],                    ARRAY['Omaha increasingly competitive','Flat rural market','Limited specialists'],  'Lincoln',            'Omaha'),
('RI','Rhode Island',        'Northeast', 1097379,  70305,  2.8,  1000,  91.1, 18, 71.0, 80, 22.0,   0,100,  37, 'Moderate',  ARRAY['Excellent Medicaid','Good income','No dental schools','Providence urban pocket'],                         ARRAY['Small total market','High rents','Competitive for size'],                    'Woonsocket',         'Providence'),
('IL','Illinois',            'Midwest',  12812508,  68428, -0.9, 11500,  89.8, 55, 72.0, 72, 25.0, 280, 90,  38, 'Moderate',  ARRAY['Good Medicaid','55 HPSA (rural IL)','High income Chicago suburbs','Large market'],                       ARRAY['Declining pop','Chicago very competitive','Growing DSO','High taxes'],       'Peoria',             'Chicago Loop'),
('WA','Washington',          'West',      7705281,  77006,  6.8,  6600,  85.7, 45, 71.0, 72, 26.0, 120,110,  38, 'Moderate',  ARRAY['No state income tax','High income','6.8% growth','45 HPSA rural WA','Strong tech sector'],                ARRAY['Seattle extremely competitive','Very high rents','High DSO','High costs'],   'Spokane',            'Seattle'),
('OR','Oregon',              'West',      4237256,  66836,  4.2,  3800,  89.7, 38, 72.0, 70, 23.0,   0,102,  38, 'Moderate',  ARRAY['38 HPSA','No dental schools','Good Medicaid','Rural Eastern OR opportunity'],                             ARRAY['Portland very competitive','High rents','High DSO','High cost of living'],  'Eugene',             'Portland'),
('MD','Maryland',            'South',     6177224,  87063,  1.0,  5100,  82.5, 42, 70.0, 82, 26.0, 160,115,  37, 'Moderate',  ARRAY['Top 3 median income US','Excellent Medicaid','42 HPSA','Strong federal employment'],                     ARRAY['DC suburbs extremely competitive','Very high rents','High overall costs'],  'Frederick',          'Bethesda'),
('CA','California',          'West',     39538223,  78672,  0.6, 34000,  85.9, 95, 72.0, 72, 35.0, 820,140,  36, 'Moderate',  ARRAY['95 HPSA (rural inland CA)','Largest market','High income coast','Good Denti-Cal'],                     ARRAY['Highest rents in US','Highest DSO','Largest pipeline','Extreme cost'],     'Fresno',             'San Francisco'),
('UT','Utah',                'West',      3271616,  74197, 16.5,  3100,  94.8, 22, 73.0, 52, 22.0, 120, 95,  33, 'Saturated', ARRAY['Highest pop growth US (16.5%)','High income','Young families = pediatric demand'],                         ARRAY['High dentist density','Multiple dental schools','Low Medicaid','Very competitive'], 'St. George',    'Salt Lake City'),
('NY','New York',            'Northeast',20201249,  71117, -0.8, 19000,  94.1, 95, 72.0, 80, 28.0, 440,150,  32, 'Saturated', ARRAY['Excellent Medicaid','95 HPSA (upstate)','Huge market','Strong insurance'],                                ARRAY['NYC most expensive','Declining pop','Largest dental pipeline','High taxes'],  'Buffalo',           'Manhattan'),
('NJ','New Jersey',          'Northeast', 9288994,  85751,  0.9,  8900,  95.8, 48, 70.0, 78, 28.0, 120,135,  30, 'Saturated', ARRAY['Highest income E.Coast','Good Medicaid','48 HPSA','Strong insurance'],                                   ARRAY['Very high dentist density','Extreme rents','NYC/Philly spill-over','High taxes'], 'Trenton',       'Hoboken'),
('VT','Vermont',             'Northeast',  643077,  65000,  2.1,   700, 108.9,  8, 70.0, 82, 12.0,   0, 85,  30, 'Saturated', ARRAY['Excellent Medicaid','Low DSO','No dental schools','Tourism/second-home market'],                        ARRAY['Highest dentist density NE','Very small market','Extremely limited growth'], 'Burlington',        'Montpelier'),
('MA','Massachusetts',       'Northeast', 7029917,  84385,  1.9,  6800,  96.7, 38, 70.0, 82, 28.0, 200,145,  25, 'Saturated', ARRAY['Excellent Medicaid','Highest insurance coverage US','High income','38 HPSA rural'],                    ARRAY['Boston extremely competitive','Highest NE rents','High DSO','Large pipeline'], 'Worcester',         'Cambridge'),
('NH','New Hampshire',       'Northeast', 1377529,  77923,  2.6,  1400, 101.6, 12, 71.0, 62, 20.0,   0, 92,  26, 'Saturated', ARRAY['No state income tax','High income','No dental schools','Growing pop'],                                  ARRAY['High dentist density','Only 12 HPSA','Low Medicaid','Small market'],         'Manchester',        'Portsmouth'),
('DC','District of Columbia','South',      689545,  92266,  3.4,  1600, 231.9, 12, 68.0, 82, 35.0,   0,185,   8, 'Saturated', ARRAY['Highest income US','Excellent Medicaid','Large federal employee benefits'],                             ARRAY['Most saturated US (232/100k)','Highest rents US','Extreme DSO','Tiny market'], 'N/A (entire market)','Dupont Circle area')
ON CONFLICT (uf) DO UPDATE SET
  populacao             = EXCLUDED.populacao,
  mediana_renda         = EXCLUDED.mediana_renda,
  crescimento_pop_pct   = EXCLUDED.crescimento_pop_pct,
  dentistas_total       = EXCLUDED.dentistas_total,
  dentistas_por_100k    = EXCLUDED.dentistas_por_100k,
  hpsa_count            = EXCLUDED.hpsa_count,
  pct_sem_seguro_dental = EXCLUDED.pct_sem_seguro_dental,
  medicaid_idx          = EXCLUDED.medicaid_idx,
  penetracao_dso        = EXCLUDED.penetracao_dso,
  dental_grads_ano      = EXCLUDED.dental_grads_ano,
  custo_aluguel_idx     = EXCLUDED.custo_aluguel_idx,
  score_oportunidade    = EXCLUDED.score_oportunidade,
  classificacao         = EXCLUDED.classificacao,
  fatores_positivos     = EXCLUDED.fatores_positivos,
  fatores_negativos     = EXCLUDED.fatores_negativos,
  melhor_cidade         = EXCLUDED.melhor_cidade,
  pior_cidade           = EXCLUDED.pior_cidade,
  atualizado_em         = NOW();
