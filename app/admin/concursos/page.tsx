"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  RefreshCw, Check, X, Play, ExternalLink, AlertTriangle,
  ChevronDown, ChevronUp, LogOut, Stethoscope, Database,
  Search,
} from "lucide-react";

interface QueueItem {
  id: number;
  fonte: string;
  titulo_raw: string;
  orgao_raw?: string;
  cargo_raw?: string;
  url_fonte?: string;
  data_publicacao?: string;
  raw_payload?: Record<string, unknown>;
  status: string;
  criado_em: string;
}

interface Stats {
  pending: number;
  approved: number;
  rejected: number;
  duplicate: number;
}

const FONTE_COLORS: Record<string, string> = {
  dou:      "bg-blue-600/20 text-blue-400",
  cebraspe: "bg-purple-600/20 text-purple-400",
  fgv:      "bg-amber-600/20 text-amber-400",
  vunesp:   "bg-cyan-600/20 text-cyan-400",
  manual:   "bg-emerald-600/20 text-emerald-400",
};

export default function AdminConcursosPage() {
  const [queue, setQueue]           = useState<QueueItem[]>([]);
  const [stats, setStats]           = useState<Stats>({ pending: 0, approved: 0, rejected: 0, duplicate: 0 });
  const [loading, setLoading]       = useState(true);
  const [scraping, setScraping]     = useState(false);
  const [expanded, setExpanded]     = useState<number | null>(null);
  const [busca, setBusca]           = useState("");
  const [scrapeMsg, setScrapeMsg]   = useState("");
  const [processingId, setProcessingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/concursos");
      const json = await res.json();
      setQueue(json.queue ?? []);
      setStats(json.stats ?? {});
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function triggerScrape() {
    setScraping(true);
    setScrapeMsg("");
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ daysBack: 7 }),
      });
      const json = await res.json();
      if (json.ok) {
        setScrapeMsg(`✓ Scrape concluído: ${json.result.total} novos itens (${json.result.durationMs}ms)`);
        await load();
      } else {
        setScrapeMsg(`✗ Erro: ${json.error}`);
      }
    } catch (e: any) {
      setScrapeMsg(`✗ Erro: ${e.message}`);
    }
    setScraping(false);
  }

  async function approve(item: QueueItem) {
    setProcessingId(item.id);
    // Gerar ID slug a partir do título
    const slug = (item.titulo_raw + "-" + item.id)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80);

    const concurso = {
      id: slug,
      orgao: item.orgao_raw || item.titulo_raw.slice(0, 60),
      orgaoSigla: "",
      esfera: "municipal",
      poder: "executivo",
      categoria: "SUS / ESF",
      cargo: item.cargo_raw || "Cirurgião-Dentista",
      especialidade: "Clínico Geral",
      banca: { nome: (item.raw_payload?.banca_extraida as string) || "A confirmar", site: "", areaInscricao: item.url_fonte || "" },
      localizacao: { municipio: "", uf: (item.raw_payload?.uf as string) || "", regiao: "", abrangencia: "local" },
      vagas: { total: 0, ampla: 0, pcd: 0, negro: 0, indigena: 0, cadastroReserva: 0 },
      remuneracao: { vencimentoBase: 0, gratificacoes: [], beneficios: [], totalEstimado: 0 },
      inscricao: { inicio: "", fim: "", taxa: 0, isencao: "", url: item.url_fonte || "" },
      etapas: [],
      cronograma: [],
      documentos: item.url_fonte
        ? [{ tipo: "edital", titulo: item.titulo_raw, url: item.url_fonte, dataPublicacao: item.data_publicacao || "" }]
        : [],
      conteudoProgramatico: [],
      statusAtual: "edital-publicado",
      requisitos: ["Graduação em Odontologia", "CRO ativo"],
      cargaHoraria: "40h",
      regime: "A confirmar",
      observacoes: `Fonte: ${item.fonte}. Dados coletados automaticamente — editar para completar.`,
      destaque: false,
      atualizadoEm: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await fetch("/api/admin/concursos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve", queueId: item.id, concurso }),
      });
      if (res.ok) await load();
    } catch (e) { console.error(e); }
    setProcessingId(null);
  }

  async function reject(id: number) {
    setProcessingId(id);
    await fetch("/api/admin/concursos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reject", queueId: id, notes: "Rejeitado manualmente" }),
    });
    await load();
    setProcessingId(null);
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.href = "/admin/login";
  }

  const filtered = queue.filter((i) => {
    if (!busca) return true;
    const b = busca.toLowerCase();
    return (i.titulo_raw + i.orgao_raw + i.cargo_raw + i.fonte).toLowerCase().includes(b);
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Stethoscope className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-sm">OdontoData Admin</h1>
            <p className="text-slate-400 text-xs">Painel de Concursos</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/vagas" target="_blank" className="flex items-center gap-1 text-slate-400 hover:text-white text-xs transition-colors">
            <ExternalLink className="w-3.5 h-3.5" /> Ver site
          </Link>
          <button onClick={logout} className="flex items-center gap-1 text-slate-400 hover:text-red-400 text-xs transition-colors">
            <LogOut className="w-3.5 h-3.5" /> Sair
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Pendentes", value: stats.pending, color: "text-amber-400" },
            { label: "Aprovados", value: stats.approved, color: "text-emerald-400" },
            { label: "Rejeitados", value: stats.rejected, color: "text-red-400" },
            { label: "Duplicatas", value: stats.duplicate, color: "text-slate-400" },
          ].map((s) => (
            <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-slate-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            onClick={triggerScrape}
            disabled={scraping}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 disabled:opacity-50 transition-colors"
          >
            {scraping ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            {scraping ? "Scraping..." : "Executar Scrape Agora"}
          </button>
          <button
            onClick={load}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Atualizar Lista
          </button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar na fila..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {scrapeMsg && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${scrapeMsg.startsWith("✓") ? "bg-emerald-600/10 text-emerald-400 border border-emerald-600/30" : "bg-red-600/10 text-red-400 border border-red-600/30"}`}>
            {scrapeMsg}
          </div>
        )}

        {/* Fila */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-400" />
            <h2 className="text-white font-semibold text-sm">Fila de Revisão ({filtered.length})</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-500 text-sm">Carregando...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">Nenhum item pendente.</div>
          ) : (
            <div className="divide-y divide-slate-800">
              {filtered.map((item) => (
                <div key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <div className="px-5 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${FONTE_COLORS[item.fonte] ?? "bg-slate-700 text-slate-400"}`}>
                            {item.fonte}
                          </span>
                          <span className="text-slate-600 text-[10px]">
                            {new Date(item.criado_em).toLocaleString("pt-BR")}
                          </span>
                        </div>
                        <p className="text-white text-sm font-medium truncate">{item.titulo_raw}</p>
                        <p className="text-slate-400 text-xs mt-0.5">
                          {item.orgao_raw && <span>{item.orgao_raw} · </span>}
                          {item.cargo_raw && <span>{item.cargo_raw}</span>}
                        </p>
                        {item.url_fonte && (
                          <a href={item.url_fonte} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-400 text-xs hover:text-blue-300 mt-1">
                            <ExternalLink className="w-3 h-3" /> Ver fonte
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                          className="p-1.5 text-slate-400 hover:text-white transition-colors"
                          title="Ver dados brutos"
                        >
                          {expanded === item.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => approve(item)}
                          disabled={processingId === item.id}
                          className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600/20 text-emerald-400 border border-emerald-600/30 rounded-lg text-xs hover:bg-emerald-600/30 disabled:opacity-50 transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Aprovar
                        </button>
                        <button
                          onClick={() => reject(item.id)}
                          disabled={processingId === item.id}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg text-xs hover:bg-red-600/30 disabled:opacity-50 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                          Rejeitar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Dados brutos */}
                  {expanded === item.id && (
                    <div className="px-5 pb-4">
                      <div className="bg-slate-800 rounded-lg p-3 text-xs font-mono text-slate-300 overflow-x-auto">
                        <pre>{JSON.stringify(item.raw_payload, null, 2)}</pre>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Aviso */}
        <div className="mt-6 bg-amber-600/10 border border-amber-600/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-amber-400 text-sm font-medium">Fluxo de trabalho</p>
              <p className="text-slate-400 text-xs mt-1">
                1. <strong>Executar Scrape</strong> coleta novos editais do DOU, CEBRASPE, FGV e VUNESP e adiciona à fila.
                2. <strong>Revisar</strong> cada item — clique em &quot;Aprovar&quot; para publicar com dados básicos ou &quot;Rejeitar&quot; para descartar.
                3. Após aprovação, o concurso aparece em <strong>/vagas</strong> com status <em>edital-publicado</em>.
                4. <strong>Edite o concurso</strong> na plataforma para completar cronograma, etapas, remuneração e conteúdo programático.
                5. O <strong>GitHub Actions</strong> executa o scrape automaticamente todo dia às 10h UTC.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
