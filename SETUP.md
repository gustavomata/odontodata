# Setup — OdontoData Concursos Aggregator

## Status atual
- [x] Schema do Supabase executado com sucesso
- [x] Project URL: `https://oszduianqmmdoyyjpmki.supabase.co`
- [ ] Chaves API copiadas (anon + service_role)
- [ ] `.env.local` criado
- [ ] Testado localmente (`npm run dev`)
- [ ] Primeiro scrape executado
- [ ] Secrets configurados no GitHub Actions

---

## Passo 1 — Pegar as chaves da API

URL direto: https://supabase.com/dashboard/project/oszduianqmmdoyyjpmki/settings/api

Copiar:
- `anon public`       → NEXT_PUBLIC_SUPABASE_ANON_KEY
- `service_role`      → SUPABASE_SERVICE_ROLE_KEY (tem aviso vermelho, normal)

---

## Passo 2 — Criar `.env.local` na raiz do projeto

Criar o arquivo `E:\Projetos\odontodata\odontodata\.env.local` com:

```
NEXT_PUBLIC_SUPABASE_URL=https://oszduianqmmdoyyjpmki.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<colar anon key aqui>
SUPABASE_SERVICE_ROLE_KEY=<colar service_role key aqui>
ADMIN_PASSWORD=<escolher uma senha forte>
CRON_SECRET=<qualquer string aleatoria longa>
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Passo 3 — Testar localmente

```bash
npm run dev
```

Acessar: http://localhost:3000/admin/login
- Login com a senha definida em ADMIN_PASSWORD
- Clicar "Executar Scrape Agora"
- Aguardar ~30s — editais aparecem na fila
- Aprovar → aparece em /vagas

---

## Passo 4 — Verificar no Supabase

Table Editor → confirmar dados nas tabelas:
- `scrape_queue` → tudo que o scraper encontrou
- `concursos`    → só os aprovados (aparecem em /vagas)

---

## Passo 5 — GitHub Actions secrets (para cron automático)

Repositório GitHub → Settings → Secrets and variables → Actions

Adicionar um a um:

| Nome                        | Valor                                      |
|-----------------------------|--------------------------------------------|
| NEXT_PUBLIC_SUPABASE_URL    | https://oszduianqmmdoyyjpmki.supabase.co   |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | <anon key>                               |
| SUPABASE_SERVICE_ROLE_KEY   | <service_role key>                         |
| ADMIN_PASSWORD              | <mesma senha do .env.local>                |
| CRON_SECRET                 | <mesma string do .env.local>               |
| NEXT_PUBLIC_APP_URL         | https://seusite.com.br (URL de produção)   |

Após o deploy, o scrape roda automaticamente todo dia às 07h (Brasília).

---

## Fluxo completo

```
GitHub Actions (07h todo dia)
        ↓
  /api/cron → scrapers (DOU, CEBRASPE, FGV, VUNESP)
        ↓
  scrape_queue (status: pending)
        ↓
  Revisão manual em /admin/concursos
        ↓
  Aprovar → tabela concursos → aparece em /vagas
```

---

## Arquivos importantes

| Arquivo                              | Função                                      |
|--------------------------------------|---------------------------------------------|
| `supabase/schema.sql`                | Schema do banco (já executado)              |
| `.env.local`                         | Variáveis locais (nunca vai ao git)         |
| `.env.local.example`                 | Template das variáveis                      |
| `lib/supabase/queries.ts`            | Queries do banco                            |
| `lib/scraper/`                       | Scrapers DOU, CEBRASPE, FGV, VUNESP         |
| `app/api/cron/route.ts`              | Endpoint chamado pelo GitHub Actions        |
| `app/api/scrape/route.ts`            | Trigger manual do scrape                    |
| `app/admin/concursos/page.tsx`       | Painel de revisão da fila                   |
| `.github/workflows/scrape.yml`       | Cron diário 07h                             |
| `.github/workflows/deploy.yml`       | Deploy automático ao fazer push             |
