-- ============================================================
-- OdontoData — Migração: suporte multi-país
-- Execute no SQL Editor do Supabase ANTES de importar dados de EUA/Austrália
-- ============================================================

-- 1. Adiciona coluna pais (Brasil por padrão para todos os registros existentes)
ALTER TABLE municipios_odonto
  ADD COLUMN IF NOT EXISTS pais CHAR(2) NOT NULL DEFAULT 'BR';

-- 2. Garante que registros existentes têm pais = 'BR'
UPDATE municipios_odonto SET pais = 'BR' WHERE pais IS NULL OR pais = '';

-- 3. Muda a chave primária de (codigo_ibge) para (pais, codigo_ibge)
--    Isso evita colisão entre códigos FIPS (EUA), ABS (Austrália) e IBGE (Brasil)
ALTER TABLE municipios_odonto DROP CONSTRAINT IF EXISTS municipios_odonto_pkey;
ALTER TABLE municipios_odonto
  ADD CONSTRAINT municipios_odonto_pkey PRIMARY KEY (pais, codigo_ibge);

-- 4. Índice para filtrar por país rapidamente
CREATE INDEX IF NOT EXISTS idx_municipios_pais ON municipios_odonto(pais);

-- 5. Atualiza policy de escrita (service_role) para cobrir novos países
DROP POLICY IF EXISTS "municipios_service_write" ON municipios_odonto;
CREATE POLICY "municipios_service_write"
  ON municipios_odonto FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
