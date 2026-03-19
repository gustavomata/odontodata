-- ============================================================
-- OdontoData — Agregador de Concursos
-- Schema completo do Supabase (PostgreSQL)
-- Execute este arquivo no SQL Editor do Supabase
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABELA PRINCIPAL: concursos
-- ============================================================
CREATE TABLE IF NOT EXISTS concursos (
  id                       TEXT PRIMARY KEY,
  orgao                    TEXT NOT NULL,
  orgao_sigla              TEXT NOT NULL DEFAULT '',
  esfera                   TEXT NOT NULL DEFAULT 'federal'
                             CHECK (esfera IN ('federal','estadual','municipal','sistema-s')),
  poder                    TEXT NOT NULL DEFAULT 'executivo'
                             CHECK (poder IN ('executivo','legislativo','judiciario','militar','autonomo')),
  categoria                TEXT NOT NULL DEFAULT '',
  cargo                    TEXT NOT NULL,
  especialidade            TEXT NOT NULL DEFAULT 'Clínico Geral',
  -- banca
  banca_nome               TEXT NOT NULL DEFAULT '',
  banca_site               TEXT,
  banca_area_inscricao     TEXT,
  -- localização
  municipio                TEXT,
  uf                       CHAR(2),
  regiao                   TEXT,
  abrangencia              TEXT DEFAULT 'local'
                             CHECK (abrangencia IN ('local','estadual','nacional')),
  -- vagas
  vagas_total              INTEGER DEFAULT 0,
  vagas_ampla              INTEGER DEFAULT 0,
  vagas_pcd                INTEGER DEFAULT 0,
  vagas_negro              INTEGER DEFAULT 0,
  vagas_indigena           INTEGER DEFAULT 0,
  vagas_cadastro_reserva   INTEGER DEFAULT 0,
  -- remuneração
  vencimento_base          NUMERIC(10,2) DEFAULT 0,
  total_estimado           NUMERIC(10,2) DEFAULT 0,
  remuneracao_obs          TEXT,
  -- inscrição
  inscricao_inicio         DATE,
  inscricao_fim            DATE,
  inscricao_taxa           NUMERIC(8,2) DEFAULT 0,
  inscricao_isencao        TEXT,
  inscricao_url            TEXT,
  -- status e metadados
  status_atual             TEXT NOT NULL DEFAULT 'previsto'
                             CHECK (status_atual IN (
                               'edital-publicado','inscricoes-abertas','inscricoes-encerradas',
                               'prova-objetiva','resultado-parcial','resultado-final',
                               'homologado','convocacao','previsto','suspenso')),
  carga_horaria            TEXT,
  regime                   TEXT,
  observacoes              TEXT,
  requisitos               TEXT[],
  destaque                 BOOLEAN DEFAULT FALSE,
  -- rastreabilidade
  fonte                    TEXT DEFAULT 'manual',
  fonte_url                TEXT,
  dou_date                 DATE,
  validado                 BOOLEAN DEFAULT FALSE,
  atualizado_em            TIMESTAMPTZ DEFAULT NOW(),
  criado_em                TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ETAPAS
-- ============================================================
CREATE TABLE IF NOT EXISTS etapas (
  id           SERIAL PRIMARY KEY,
  concurso_id  TEXT NOT NULL REFERENCES concursos(id) ON DELETE CASCADE,
  ordem        INTEGER NOT NULL,
  tipo         TEXT NOT NULL CHECK (tipo IN (
                 'prova-objetiva','prova-discursiva','prova-pratica','titulos',
                 'teste-fisico','exame-medico','curso-formacao','heteroidentificacao')),
  descricao    TEXT NOT NULL,
  data         DATE,
  local        TEXT,
  peso         NUMERIC(4,2),
  eliminatoria BOOLEAN DEFAULT FALSE,
  detalhes     TEXT
);

-- ============================================================
-- CRONOGRAMA
-- ============================================================
CREATE TABLE IF NOT EXISTS cronograma (
  id           SERIAL PRIMARY KEY,
  concurso_id  TEXT NOT NULL REFERENCES concursos(id) ON DELETE CASCADE,
  data         DATE NOT NULL,
  descricao    TEXT NOT NULL,
  status       TEXT NOT NULL DEFAULT 'futuro'
                 CHECK (status IN ('concluido','atual','futuro'))
);

-- ============================================================
-- DOCUMENTOS
-- ============================================================
CREATE TABLE IF NOT EXISTS documentos (
  id               SERIAL PRIMARY KEY,
  concurso_id      TEXT NOT NULL REFERENCES concursos(id) ON DELETE CASCADE,
  tipo             TEXT NOT NULL CHECK (tipo IN ('edital','retificacao','resultado','convocacao','gabarito','outro')),
  titulo           TEXT NOT NULL,
  url              TEXT NOT NULL,
  data_publicacao  DATE
);

-- ============================================================
-- ITENS DE REMUNERAÇÃO (gratificações + benefícios)
-- ============================================================
CREATE TABLE IF NOT EXISTS remuneracao_itens (
  id           SERIAL PRIMARY KEY,
  concurso_id  TEXT NOT NULL REFERENCES concursos(id) ON DELETE CASCADE,
  categoria    TEXT NOT NULL CHECK (categoria IN ('gratificacao','beneficio')),
  descricao    TEXT NOT NULL,
  valor        TEXT NOT NULL
);

-- ============================================================
-- CONTEÚDO PROGRAMÁTICO
-- ============================================================
CREATE TABLE IF NOT EXISTS conteudo_programatico (
  id           SERIAL PRIMARY KEY,
  concurso_id  TEXT NOT NULL REFERENCES concursos(id) ON DELETE CASCADE,
  disciplina   TEXT NOT NULL,
  topicos      TEXT[] NOT NULL
);

-- ============================================================
-- FILA DE SCRAPING (revisão admin)
-- ============================================================
CREATE TABLE IF NOT EXISTS scrape_queue (
  id               SERIAL PRIMARY KEY,
  fonte            TEXT NOT NULL,
  titulo_raw       TEXT NOT NULL,
  orgao_raw        TEXT,
  cargo_raw        TEXT,
  url_fonte        TEXT,
  data_publicacao  DATE,
  raw_payload      JSONB,
  status           TEXT NOT NULL DEFAULT 'pending'
                     CHECK (status IN ('pending','approved','rejected','duplicate')),
  concurso_id      TEXT REFERENCES concursos(id),
  notas_admin      TEXT,
  criado_em        TIMESTAMPTZ DEFAULT NOW(),
  processado_em    TIMESTAMPTZ
);

-- ============================================================
-- ÍNDICES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_concursos_status        ON concursos(status_atual);
CREATE INDEX IF NOT EXISTS idx_concursos_uf            ON concursos(uf);
CREATE INDEX IF NOT EXISTS idx_concursos_inscricao_fim ON concursos(inscricao_fim);
CREATE INDEX IF NOT EXISTS idx_concursos_destaque      ON concursos(destaque);
CREATE INDEX IF NOT EXISTS idx_concursos_validado      ON concursos(validado);
CREATE INDEX IF NOT EXISTS idx_scrape_queue_status     ON scrape_queue(status);
CREATE INDEX IF NOT EXISTS idx_scrape_queue_fonte      ON scrape_queue(fonte);
CREATE INDEX IF NOT EXISTS idx_etapas_concurso         ON etapas(concurso_id);
CREATE INDEX IF NOT EXISTS idx_cronograma_concurso     ON cronograma(concurso_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE concursos            ENABLE ROW LEVEL SECURITY;
ALTER TABLE etapas               ENABLE ROW LEVEL SECURITY;
ALTER TABLE cronograma           ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos           ENABLE ROW LEVEL SECURITY;
ALTER TABLE remuneracao_itens    ENABLE ROW LEVEL SECURITY;
ALTER TABLE conteudo_programatico ENABLE ROW LEVEL SECURITY;
ALTER TABLE scrape_queue         ENABLE ROW LEVEL SECURITY;

-- Leitura pública em todas as tabelas de concursos
CREATE POLICY "public_read_concursos"             ON concursos             FOR SELECT USING (true);
CREATE POLICY "public_read_etapas"                ON etapas                FOR SELECT USING (true);
CREATE POLICY "public_read_cronograma"            ON cronograma            FOR SELECT USING (true);
CREATE POLICY "public_read_documentos"            ON documentos            FOR SELECT USING (true);
CREATE POLICY "public_read_remuneracao_itens"     ON remuneracao_itens     FOR SELECT USING (true);
CREATE POLICY "public_read_conteudo_programatico" ON conteudo_programatico FOR SELECT USING (true);
-- scrape_queue: sem política pública (apenas service_role)

-- ============================================================
-- FUNÇÃO: atualiza updated_at automaticamente
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_concursos_updated_at
  BEFORE UPDATE ON concursos
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
