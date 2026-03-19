import { createServerClient } from "./server";
import type {
  Concurso, Etapa, EventoCronograma, Documento,
  ItemRemuneracao, BlocoConteudo, StatusConcurso,
} from "@/lib/data-concursos";
import type { ScrapedItem } from "@/lib/scraper/types";

// ============================================================
// HELPERS DE MONTAGEM (DB row → TypeScript Concurso)
// ============================================================

function assembleRemuneracao(base: number, total: number, obs: string | null, itens: any[]) {
  return {
    vencimentoBase: base,
    gratificacoes: itens
      .filter((i) => i.categoria === "gratificacao")
      .map((i): ItemRemuneracao => ({ descricao: i.descricao, valor: isNaN(Number(i.valor)) ? i.valor : Number(i.valor) })),
    beneficios: itens
      .filter((i) => i.categoria === "beneficio")
      .map((i): ItemRemuneracao => ({ descricao: i.descricao, valor: isNaN(Number(i.valor)) ? i.valor : Number(i.valor) })),
    totalEstimado: total,
    observacao: obs ?? undefined,
  };
}

function assembleFromRows(row: any, etapasRows: any[], cronRows: any[], docsRows: any[], remRows: any[], conteudoRows: any[]): Concurso {
  return {
    id: row.id,
    orgao: row.orgao,
    orgaoSigla: row.orgao_sigla,
    esfera: row.esfera,
    poder: row.poder,
    categoria: row.categoria,
    cargo: row.cargo,
    especialidade: row.especialidade,
    banca: {
      nome: row.banca_nome,
      site: row.banca_site ?? "",
      areaInscricao: row.banca_area_inscricao ?? "",
    },
    localizacao: {
      municipio: row.municipio ?? "",
      uf: row.uf ?? "",
      regiao: row.regiao ?? "",
      abrangencia: row.abrangencia ?? "local",
    },
    vagas: {
      total: row.vagas_total ?? 0,
      ampla: row.vagas_ampla ?? 0,
      pcd: row.vagas_pcd ?? 0,
      negro: row.vagas_negro ?? 0,
      indigena: row.vagas_indigena ?? 0,
      cadastroReserva: row.vagas_cadastro_reserva ?? 0,
    },
    remuneracao: assembleRemuneracao(
      row.vencimento_base ?? 0,
      row.total_estimado ?? 0,
      row.remuneracao_obs,
      remRows
    ),
    inscricao: {
      inicio: row.inscricao_inicio ?? "",
      fim: row.inscricao_fim ?? "",
      taxa: row.inscricao_taxa ?? 0,
      isencao: row.inscricao_isencao ?? "",
      url: row.inscricao_url ?? "",
    },
    etapas: etapasRows.map((e): Etapa => ({
      ordem: e.ordem,
      tipo: e.tipo,
      descricao: e.descricao,
      data: e.data ?? undefined,
      local: e.local ?? undefined,
      peso: e.peso ?? undefined,
      eliminatoria: e.eliminatoria,
      detalhes: e.detalhes ?? undefined,
    })),
    cronograma: cronRows.map((c): EventoCronograma => ({
      data: c.data,
      descricao: c.descricao,
      status: c.status,
    })),
    documentos: docsRows.map((d): Documento => ({
      tipo: d.tipo,
      titulo: d.titulo,
      url: d.url,
      dataPublicacao: d.data_publicacao ?? "",
    })),
    conteudoProgramatico: conteudoRows.map((c): BlocoConteudo => ({
      disciplina: c.disciplina,
      topicos: c.topicos ?? [],
    })),
    statusAtual: row.status_atual as StatusConcurso,
    requisitos: row.requisitos ?? [],
    cargaHoraria: row.carga_horaria ?? "",
    regime: row.regime ?? "",
    observacoes: row.observacoes ?? "",
    destaque: row.destaque ?? false,
    atualizadoEm: row.atualizado_em?.split("T")[0] ?? "",
  };
}

// ============================================================
// QUERIES PÚBLICAS
// ============================================================

export async function listConcursos(opts?: {
  status?: string;
  uf?: string;
  search?: string;
  limit?: number;
}): Promise<Concurso[]> {
  const sb = createServerClient();
  let q = sb.from("concursos").select("*").eq("validado", true);

  if (opts?.status) q = q.eq("status_atual", opts.status);
  if (opts?.uf) q = q.eq("uf", opts.uf);
  if (opts?.search) q = q.or(`orgao.ilike.%${opts.search}%,cargo.ilike.%${opts.search}%`);
  q = q.order("inscricao_fim", { ascending: true }).limit(opts?.limit ?? 100);

  const { data: rows, error } = await q;
  if (error || !rows?.length) return [];

  // Batch-load child tables for all concursos
  const ids = rows.map((r: any) => r.id);
  const [etapasRes, cronRes, docsRes, remRes, conteudoRes] = await Promise.all([
    sb.from("etapas").select("*").in("concurso_id", ids).order("ordem"),
    sb.from("cronograma").select("*").in("concurso_id", ids).order("data"),
    sb.from("documentos").select("*").in("concurso_id", ids),
    sb.from("remuneracao_itens").select("*").in("concurso_id", ids),
    sb.from("conteudo_programatico").select("*").in("concurso_id", ids),
  ]);

  const byId = (arr: any[], key = "concurso_id") =>
    arr?.reduce((acc: any, r: any) => { (acc[r[key]] = acc[r[key]] || []).push(r); return acc; }, {}) ?? {};

  const etapasById   = byId(etapasRes.data ?? []);
  const cronById     = byId(cronRes.data ?? []);
  const docsById     = byId(docsRes.data ?? []);
  const remById      = byId(remRes.data ?? []);
  const conteudoById = byId(conteudoRes.data ?? []);

  return rows.map((row: any) =>
    assembleFromRows(
      row,
      etapasById[row.id] ?? [],
      cronById[row.id] ?? [],
      docsById[row.id] ?? [],
      remById[row.id] ?? [],
      conteudoById[row.id] ?? []
    )
  );
}

export async function getConcursoById(id: string): Promise<Concurso | null> {
  const sb = createServerClient();
  const { data: row, error } = await sb.from("concursos").select("*").eq("id", id).single();
  if (error || !row) return null;

  const [etapasRes, cronRes, docsRes, remRes, conteudoRes] = await Promise.all([
    sb.from("etapas").select("*").eq("concurso_id", id).order("ordem"),
    sb.from("cronograma").select("*").eq("concurso_id", id).order("data"),
    sb.from("documentos").select("*").eq("concurso_id", id),
    sb.from("remuneracao_itens").select("*").eq("concurso_id", id),
    sb.from("conteudo_programatico").select("*").eq("concurso_id", id),
  ]);

  return assembleFromRows(
    row,
    etapasRes.data ?? [],
    cronRes.data ?? [],
    docsRes.data ?? [],
    remRes.data ?? [],
    conteudoRes.data ?? []
  );
}

// ============================================================
// UPSERT (admin aprovação)
// ============================================================

export async function upsertConcurso(concurso: Concurso): Promise<void> {
  const sb = createServerClient();

  // 1. Upsert tabela principal
  const { error: mainErr } = await sb.from("concursos").upsert({
    id: concurso.id,
    orgao: concurso.orgao,
    orgao_sigla: concurso.orgaoSigla,
    esfera: concurso.esfera,
    poder: concurso.poder,
    categoria: concurso.categoria,
    cargo: concurso.cargo,
    especialidade: concurso.especialidade,
    banca_nome: concurso.banca.nome,
    banca_site: concurso.banca.site,
    banca_area_inscricao: concurso.banca.areaInscricao,
    municipio: concurso.localizacao.municipio,
    uf: concurso.localizacao.uf,
    regiao: concurso.localizacao.regiao,
    abrangencia: concurso.localizacao.abrangencia,
    vagas_total: concurso.vagas.total,
    vagas_ampla: concurso.vagas.ampla,
    vagas_pcd: concurso.vagas.pcd,
    vagas_negro: concurso.vagas.negro,
    vagas_indigena: concurso.vagas.indigena,
    vagas_cadastro_reserva: concurso.vagas.cadastroReserva,
    vencimento_base: concurso.remuneracao.vencimentoBase,
    total_estimado: concurso.remuneracao.totalEstimado,
    remuneracao_obs: concurso.remuneracao.observacao,
    inscricao_inicio: concurso.inscricao.inicio || null,
    inscricao_fim: concurso.inscricao.fim || null,
    inscricao_taxa: concurso.inscricao.taxa,
    inscricao_isencao: concurso.inscricao.isencao,
    inscricao_url: concurso.inscricao.url,
    status_atual: concurso.statusAtual,
    carga_horaria: concurso.cargaHoraria,
    regime: concurso.regime,
    observacoes: concurso.observacoes,
    requisitos: concurso.requisitos,
    destaque: concurso.destaque,
    validado: true,
    atualizado_em: new Date().toISOString(),
  });
  if (mainErr) throw new Error(`upsertConcurso main: ${mainErr.message}`);

  // 2. Substituir tabelas filho (delete + insert)
  await Promise.all([
    sb.from("etapas").delete().eq("concurso_id", concurso.id),
    sb.from("cronograma").delete().eq("concurso_id", concurso.id),
    sb.from("documentos").delete().eq("concurso_id", concurso.id),
    sb.from("remuneracao_itens").delete().eq("concurso_id", concurso.id),
    sb.from("conteudo_programatico").delete().eq("concurso_id", concurso.id),
  ]);

  const ops: PromiseLike<any>[] = [];

  if (concurso.etapas.length)
    ops.push(sb.from("etapas").insert(concurso.etapas.map((e) => ({ concurso_id: concurso.id, ...mapEtapa(e) }))));

  if (concurso.cronograma.length)
    ops.push(sb.from("cronograma").insert(concurso.cronograma.map((c) => ({ concurso_id: concurso.id, data: c.data, descricao: c.descricao, status: c.status }))));

  if (concurso.documentos.length)
    ops.push(sb.from("documentos").insert(concurso.documentos.map((d) => ({ concurso_id: concurso.id, tipo: d.tipo, titulo: d.titulo, url: d.url, data_publicacao: d.dataPublicacao || null }))));

  const remItens = [
    ...concurso.remuneracao.gratificacoes.map((g) => ({ concurso_id: concurso.id, categoria: "gratificacao", descricao: g.descricao, valor: String(g.valor) })),
    ...concurso.remuneracao.beneficios.map((b) => ({ concurso_id: concurso.id, categoria: "beneficio", descricao: b.descricao, valor: String(b.valor) })),
  ];
  if (remItens.length) ops.push(sb.from("remuneracao_itens").insert(remItens));

  if (concurso.conteudoProgramatico.length)
    ops.push(sb.from("conteudo_programatico").insert(concurso.conteudoProgramatico.map((c) => ({ concurso_id: concurso.id, disciplina: c.disciplina, topicos: c.topicos }))));

  await Promise.all(ops);
}

function mapEtapa(e: Etapa) {
  return { ordem: e.ordem, tipo: e.tipo, descricao: e.descricao, data: e.data ?? null, local: e.local ?? null, peso: e.peso ?? null, eliminatoria: e.eliminatoria, detalhes: e.detalhes ?? null };
}

// ============================================================
// FILA DE SCRAPING
// ============================================================

export async function addToQueue(item: ScrapedItem): Promise<void> {
  const sb = createServerClient();

  // Evitar duplicatas por URL
  if (item.url_fonte) {
    const { data: existing } = await sb.from("scrape_queue").select("id").eq("url_fonte", item.url_fonte).maybeSingle();
    if (existing) return;
  }

  await sb.from("scrape_queue").insert({
    fonte: item.fonte,
    titulo_raw: item.titulo_raw,
    orgao_raw: item.orgao_raw ?? null,
    cargo_raw: item.cargo_raw ?? null,
    url_fonte: item.url_fonte ?? null,
    data_publicacao: item.data_publicacao ?? null,
    raw_payload: item.raw_payload,
    status: "pending",
  });
}

export async function getPendingQueue() {
  const sb = createServerClient();
  const { data, error } = await sb
    .from("scrape_queue")
    .select("*")
    .eq("status", "pending")
    .order("criado_em", { ascending: false })
    .limit(100);
  if (error) throw error;
  return data ?? [];
}

export async function approveQueueItem(queueId: number, concursoId: string): Promise<void> {
  const sb = createServerClient();
  await sb.from("scrape_queue").update({ status: "approved", concurso_id: concursoId, processado_em: new Date().toISOString() }).eq("id", queueId);
}

export async function rejectQueueItem(queueId: number, notes: string): Promise<void> {
  const sb = createServerClient();
  await sb.from("scrape_queue").update({ status: "rejected", notas_admin: notes, processado_em: new Date().toISOString() }).eq("id", queueId);
}

export async function getQueueStats() {
  const sb = createServerClient();
  const { data } = await sb.from("scrape_queue").select("status");
  const stats = { pending: 0, approved: 0, rejected: 0, duplicate: 0 };
  data?.forEach((r: any) => { if (r.status in stats) stats[r.status as keyof typeof stats]++; });
  return stats;
}
