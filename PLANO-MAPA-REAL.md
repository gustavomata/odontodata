# Plano: Mapa Interativo com Dados Reais

## Objetivo

Substituir os dados estimados do mapa interativo por dados reais e atualizáveis,
provenientes de fontes governamentais abertas (IBGE e CNES/DataSUS), cobrindo
todos os 5.570 municípios brasileiros com informações sobre dentistas, população
e indicadores de oportunidade.

---

## Fontes de Dados

| Fonte | Dados | Acesso | Frequência de atualização |
|---|---|---|---|
| IBGE API | Lista de municípios, códigos, regiões | Público, gratuito | Anual (Censo) |
| GitHub/kelvins | Coordenadas lat/lng dos 5.570 municípios | Público, gratuito | Estável |
| CNES/DataSUS | Profissionais de saúde por CBO e município | Público, gratuito | Mensal |
| e-Gestor/MS | Cobertura de Equipe de Saúde Bucal (ESB) | Público, gratuito | Trimestral |

### Por que CNES e não CFO?
O CFO (Conselho Federal de Odontologia) publica estatísticas apenas em PDF e
relatórios anuais, sem API pública. O CNES/DataSUS é mantido pelo Ministério da
Saúde, tem API REST pública e é atualizado mensalmente com os registros de todos
os profissionais de saúde habilitados, incluindo cirurgiões-dentistas (CBO 2232**).

---

## Arquitetura

```
IBGE API ──────────────┐
CNES/DataSUS API ───────┼──► scripts/import-municipios.ts ──► Supabase (municipios_odonto)
GitHub coords CSV ──────┘                                              │
                                                                       ▼
                                                         app/api/municipios/route.ts
                                                                       │
                                                                       ▼
                                                         components/BrazilMap.tsx
                                                         (cache por região, fallback estático)
```

---

## Estrutura de Dados

### Tabela `municipios_odonto` (Supabase/PostgreSQL)

```sql
codigo_ibge       INTEGER  -- chave primária (7 dígitos IBGE)
municipio         TEXT     -- nome oficial
uf                CHAR(2)  -- sigla do estado
regiao            TEXT     -- Norte / Nordeste / Sudeste / Sul / Centro-Oeste
lat               NUMERIC  -- latitude (IBGE/OSM)
lng               NUMERIC  -- longitude (IBGE/OSM)
populacao         INTEGER  -- habitantes (IBGE Censo 2022)
dentistas_total   INTEGER  -- profissionais ativos (CNES CBO 2232**)
dentistas_por_hab INTEGER  -- habitantes por dentista (calculado)
score_oportunidade INTEGER -- 0 a 100 (calculado pela fórmula abaixo)
classificacao     TEXT     -- Excelente / Muito Bom / Bom / Moderado / Saturado
renda_per_capita  NUMERIC  -- R$ (IBGE/PNAD — enriquecimento futuro)
idh               NUMERIC  -- 0 a 1 (PNUD — enriquecimento futuro)
cobertura_esb     NUMERIC  -- % cobertura ESB (e-Gestor — enriquecimento futuro)
fonte_dentistas   TEXT     -- "CNES/DataSUS"
atualizado_em     TIMESTAMP
```

### Fórmula do Score de Oportunidade (0–100)

```
hab/dentista >= 3000  → score 100  (Excelente)
hab/dentista >= 2000  → score 80   (Muito Bom)
hab/dentista >= 1500  → score 65   (Bom)
hab/dentista >= 1000  → score 45   (Moderado)
hab/dentista >= 700   → score 30   (Moderado)
hab/dentista <  700   → score 15   (Saturado)
```

Versão futura do score pode incorporar: renda per capita, IDH e cobertura ESB.

---

## Fases de Implementação

### Fase 1 — Infraestrutura (CONCLUÍDA)
- [x] Schema SQL da tabela `municipios_odonto`
- [x] Script de importação `scripts/import-municipios.ts`
- [x] Endpoint da API `app/api/municipios/route.ts`
- [x] BrazilMap atualizado para consumir API real
- [x] Badge de fonte de dados no mapa (verde = real, cinza = estático)
- [x] Fallback automático para dados estáticos quando API não tem dados

### Fase 2 — Importação inicial (PRÓXIMO PASSO)
- [ ] Executar `npm run import:municipios`
- [ ] Verificar cobertura: quantos municípios têm dados de dentistas do CNES
- [ ] Validar amostra de dados contra relatório CFO mais recente

### Fase 3 — Enriquecimento de dados
- [ ] Integrar cobertura ESB via e-Gestor AB (API pública do Ministério da Saúde)
      URL: `https://egestorab.saude.gov.br/api/`
- [ ] Integrar IDH por município via PNUD/Atlas Brasil
      URL: `http://www.atlasbrasil.org.br/`
- [ ] Integrar renda per capita via IBGE SIDRA (tabela 6575 — PNAD Contínua)
- [ ] Recalcular scores com pesos múltiplos (saturação + renda + IDH + ESB)

### Fase 4 — Atualização automática
- [ ] Criar GitHub Action para rodar `import:municipios` mensalmente
      (CNES é atualizado todo mês — dados sempre frescos)
- [ ] Adicionar rota `/api/admin/sync-municipios` para trigger manual
- [ ] Log de histórico de importações no Supabase

### Fase 5 — Mapa avançado
- [ ] Cluster de markers em zoom baixo (evitar sobrecarga visual)
- [ ] Heatmap de saturação/oportunidade como camada alternativa
- [ ] Filtro por score mínimo diretamente no mapa
- [ ] Botão "Municípios sem dentista" (412 municípios sem nenhum profissional)

---

## Como Executar Agora

### Pré-requisitos
```
.env.local com:
  NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
  SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### Passo 1 — Criar tabela no Supabase
```
1. Acessar Supabase Dashboard
2. SQL Editor → New Query
3. Colar o conteúdo de supabase/municipios-migration.sql
4. Clicar em Run
```

### Passo 2 — Importar dados reais
```bash
npm run import:municipios
```

Progresso esperado:
```
📡 Buscando municípios do IBGE...       ✓ 5.570 municípios
📡 Buscando coordenadas...              ✓ 5.570 coordenadas
📡 Buscando dentistas CNES...
  SP... 645 municípios com dentistas
  MG... 853 municípios com dentistas
  ... (todos os estados)
📊 Registros preparados: 5.570
   Com dados de dentistas: ~3.200
💾 Inserindo no Supabase... 5.570/5.570
✅ Importação concluída!
```

### Passo 3 — Verificar
Abrir http://localhost:3000/mapa e observar:
- Badge verde "IBGE · CNES/DataSUS (real)" no canto do mapa
- Pontos de municípios ao dar zoom em qualquer estado

---

## Estimativas de Cobertura

Baseado no CNES mais recente (jan/2025):

| Região | Municípios | Com dentistas | Sem dentistas |
|---|---|---|---|
| Norte | 450 | ~280 (62%) | ~170 (38%) |
| Nordeste | 1.794 | ~1.100 (61%) | ~694 (39%) |
| Sudeste | 1.668 | ~1.550 (93%) | ~118 (7%) |
| Sul | 1.191 | ~1.100 (92%) | ~91 (8%) |
| Centro-Oeste | 467 | ~390 (84%) | ~77 (16%) |
| **Brasil** | **5.570** | **~4.420 (79%)** | **~1.150 (21%)** |

Os municípios sem dentistas cadastrados no CNES aparecem no mapa como pontos
cinzas — representando as maiores oportunidades de mercado do país.

---

## Decisões Técnicas

### Por que cache no cliente (BrazilMap)?
A API do Supabase tem latência de ~100–300ms. O mapa atualiza markers a cada
`zoomend` e `moveend` — sem cache, isso seria ~10 requests por interação.
O cache por região garante que os dados sejam buscados uma vez por sessão.

### Por que fallback estático?
Se o Supabase não estiver configurado ou a tabela ainda não existir, o mapa
continua funcionando com os ~200 municípios do arquivo estático. O badge cinza
no mapa indica ao desenvolvedor que os dados reais ainda não foram importados.

### Por que não PostGIS para filtro espacial?
O Supabase tem PostGIS disponível, mas requer extensão ativa e queries mais
complexas. Para o volume atual (~5.570 registros, <1MB de dados), filtrar por
bounding box via lat/lng range ou por UF é suficiente e mais simples.

---

## Manutenção

| Tarefa | Frequência | Responsável |
|---|---|---|
| Atualizar dados CNES | Mensal | GitHub Action (automático) |
| Validar contagens vs CFO | Trimestral | Admin |
| Enriquecer com IDH/renda | Anual (dados PNUD/IBGE) | Dev |
| Revisar fórmula de score | Semestral | Produto |
