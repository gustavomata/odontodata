"use client";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/concurso/StatusBadge";
import Link from "next/link";
import { diasRestantes } from "@/lib/data-concursos";
import type { Concurso } from "@/lib/data-concursos";
import {
  Briefcase, DollarSign, Building2, Scale, Shield, GraduationCap,
  Landmark, Award, FileText, Search, Star, ArrowRight,
  Users, Stethoscope, ExternalLink, RefreshCw, Database,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

const categoriaIcon = (c: string) => {
  if (c === "Judiciário") return Scale;
  if (c === "Forças Armadas") return Shield;
  if (c === "TSE" || c === "Assembleia") return Landmark;
  if (c === "SESC" || c === "SESI") return Award;
  if (c === "Universidade") return GraduationCap;
  if (c === "Prefeitura") return Building2;
  return Briefcase;
};

const CATEGORIAS_FILTRO = [
  "Todas", "SUS / ESF", "Judiciário", "Forças Armadas", "TSE / TRE",
  "Assembleias", "SESC", "SESI", "SENAC", "Prefeituras", "Universidades",
];

function matchCategoria(c: Concurso, filtro: string): boolean {
  if (filtro === "Todas") return true;
  const orgao = c.orgao.toLowerCase();
  const cat = c.categoria?.toLowerCase() ?? "";
  if (filtro === "SUS / ESF") return orgao.includes("prefeitura") || cat.includes("sus") || cat.includes("esf");
  if (filtro === "Judiciário") return orgao.includes("tj") || orgao.includes("trf") || orgao.includes("stj") || orgao.includes("stf");
  if (filtro === "Forças Armadas") return orgao.includes("exército") || orgao.includes("marinha") || orgao.includes("aeronáutica") || orgao.includes("exercito");
  if (filtro === "TSE / TRE") return orgao.includes("tse") || orgao.includes("tre");
  if (filtro === "Assembleias") return orgao.includes("assembleia");
  if (filtro === "SESC") return orgao.includes("sesc");
  if (filtro === "SESI") return orgao.includes("sesi");
  if (filtro === "SENAC") return orgao.includes("senac");
  if (filtro === "Prefeituras") return orgao.includes("prefeitura");
  if (filtro === "Universidades") return orgao.includes("universidade") || orgao.includes(" uf") || orgao.includes("usp") || orgao.includes("unicamp");
  return true;
}

export default function VagasPage() {
  const { lang } = useLanguage();
  const [concursos, setConcursos] = useState<Concurso[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [ufFiltro, setUfFiltro] = useState("Todas");
  const [abaAtiva, setAbaAtiva] = useState<"abertos" | "detalhados">("abertos");

  useEffect(() => {
    fetch("/api/concursos?limit=200")
      .then((r) => r.json())
      .then((json) => setConcursos(json.data ?? []))
      .catch(() => setConcursos([]))
      .finally(() => setLoading(false));
  }, []);

  const ufsDisponiveis = useMemo(() => {
    const ufs = [...new Set(concursos.map((c) => c.localizacao.uf).filter(Boolean))].sort();
    return ["Todas", ...ufs];
  }, [concursos]);

  const filtrados = useMemo(() => {
    return concursos.filter((c) => {
      const matchBusca =
        !busca ||
        c.orgao.toLowerCase().includes(busca.toLowerCase()) ||
        c.cargo.toLowerCase().includes(busca.toLowerCase());
      const matchUf = ufFiltro === "Todas" || c.localizacao.uf === ufFiltro;
      return matchBusca && matchCategoria(c, categoriaFiltro) && matchUf;
    });
  }, [concursos, busca, categoriaFiltro, ufFiltro]);

  // KPIs calculados a partir dos dados reais
  const totalVagas = concursos.reduce((sum, c) => sum + (c.vagas.total || 0), 0);
  const abertas = concursos.filter((c) => c.statusAtual === "inscricoes-abertas");
  const salarios = concursos.map((c) => c.remuneracao.totalEstimado).filter((v) => v > 0);
  const salarioMedio = salarios.length
    ? Math.round(salarios.reduce((a, b) => a + b, 0) / salarios.length)
    : 0;

  return (
    <AppShell>
      <PageHeader
        title={t("vagas_title", lang)}
        subtitle={t("vagas_subtitle", lang)}
        badge={t("vagas_badge", lang)}
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title={t("vagas_total", lang)}
          value={loading ? "—" : totalVagas.toLocaleString("pt-BR")}
          icon={Briefcase}
          color="blue"
          subtitle={t("vagas_coletadas", lang)}
        />
        <StatCard
          title={t("vagas_inscr_abertas", lang)}
          value={loading ? "—" : abertas.length.toString()}
          icon={FileText}
          color="green"
          subtitle={t("vagas_prazo_ativo", lang)}
        />
        <StatCard
          title={t("vagas_remuneracao", lang)}
          value={loading || !salarioMedio ? "—" : `R$ ${salarioMedio.toLocaleString("pt-BR")}`}
          icon={DollarSign}
          color="purple"
          subtitle={t("vagas_total_est", lang)}
        />
        <StatCard
          title={t("vagas_cadastrados", lang)}
          value={loading ? "—" : concursos.length.toString()}
          icon={Database}
          color="yellow"
          subtitle={t("vagas_base_ativa", lang)}
        />
      </div>

      {/* Abas */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {[
          { key: "abertos" as const, label: t("vagas_lista", lang), icon: FileText },
          { key: "detalhados" as const, label: t("vagas_com_edital", lang), icon: Star },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setAbaAtiva(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              abaAtiva === tab.key
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder={t("vagas_buscar", lang)}
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <select
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          className="px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {CATEGORIAS_FILTRO.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={ufFiltro}
          onChange={(e) => setUfFiltro(e.target.value)}
          className="px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {ufsDisponiveis.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </div>

      {/* Estado vazio / loading */}
      {loading && (
        <div className="flex items-center justify-center py-16 text-slate-500 gap-2">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span className="text-sm">{t("vagas_carregando", lang)}</span>
        </div>
      )}

      {!loading && concursos.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-10 text-center mb-8">
          <Database className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-white font-semibold mb-1">{t("vagas_nenhum", lang)}</p>
          <p className="text-slate-400 text-sm mb-4">
            {t("vagas_scraper_info", lang)}<br />
            {t("vagas_admin_info", lang)}
          </p>
          <Link
            href="/admin/concursos"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors"
          >
            {t("vagas_ir_admin", lang)} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Aba: Lista */}
      {!loading && abaAtiva === "abertos" && filtrados.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
          <p className="text-slate-500 text-xs mb-3">
            {filtrados.length} {filtrados.length !== 1 ? t("vagas_resultados_pl", lang) : t("vagas_resultados", lang)} {filtrados.length !== 1 ? t("vagas_encontrados", lang) : t("vagas_encontrado", lang)}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_orgao", lang)}</th>
                  <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_cargo", lang)}</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">{t("col_vagas", lang)}</th>
                  <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_remuneracao", lang)}</th>
                  <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_uf", lang)}</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">{t("col_status", lang)}</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">{t("col_edital", lang)}</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">{t("col_detalhe", lang)}</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((c) => {
                  const edital = c.documentos.find((d) => d.tipo === "edital");
                  return (
                    <tr key={c.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="py-3 px-3 text-white font-medium text-xs">{c.orgao}</td>
                      <td className="py-3 px-3 text-slate-300 text-xs">{c.cargo}</td>
                      <td className="py-3 px-3 text-center text-blue-400 font-bold">{c.vagas.total || "—"}</td>
                      <td className="py-3 px-3 text-right text-emerald-400 font-medium">
                        {c.remuneracao.totalEstimado > 0
                          ? `R$ ${c.remuneracao.totalEstimado.toLocaleString("pt-BR")}`
                          : t("vagas_a_confirmar", lang)}
                      </td>
                      <td className="py-3 px-3 text-slate-300">{c.localizacao.uf || "—"}</td>
                      <td className="py-3 px-3 text-center">
                        <StatusBadge status={c.statusAtual} />
                      </td>
                      <td className="py-3 px-3 text-center">
                        {(edital?.url || c.inscricao.url) ? (
                          <a
                            href={edital?.url || c.inscricao.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg text-xs font-medium hover:bg-blue-600/30 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {edital ? t("col_edital", lang) : "Ver"}
                          </a>
                        ) : (
                          <span className="text-slate-600 text-xs">—</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <Link
                          href={`/vagas/${c.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-700 text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-600 transition-colors"
                        >
                          {t("vagas_ver_mais", lang)}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Aba: Cards com edital completo */}
      {!loading && abaAtiva === "detalhados" && (
        <>
          {filtrados.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center mb-8">
              <p className="text-slate-400 text-sm">{t("vagas_nenhum_filtro", lang)}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
              {filtrados.map((c) => {
                const dias = diasRestantes(c.inscricao.fim);
                const Icon = categoriaIcon(c.categoria);
                return (
                  <Link
                    key={c.id}
                    href={`/vagas/${c.id}`}
                    className="block bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-5 hover:border-blue-600/50 hover:bg-slate-800/30 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            {c.orgaoSigla && (
                              <span className="bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded text-[10px] font-mono">{c.orgaoSigla}</span>
                            )}
                            <span className="bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded text-[10px]">{c.banca.nome}</span>
                          </div>
                          <p className="text-white font-semibold text-sm group-hover:text-blue-400 transition-colors">{c.cargo}</p>
                          <p className="text-slate-400 text-xs">{c.orgao}</p>
                        </div>
                      </div>
                      <StatusBadge status={c.statusAtual} />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                      <div>
                        <p className="text-slate-500 text-xs">{t("vagas_remuneracao_card", lang)}</p>
                        <p className="text-emerald-400 font-bold text-sm">
                          {c.remuneracao.totalEstimado > 0
                            ? `R$ ${c.remuneracao.totalEstimado.toLocaleString("pt-BR")}`
                            : t("vagas_a_confirmar", lang)}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs">{t("col_vagas", lang)}</p>
                        <p className="text-blue-400 font-bold text-sm">
                          {c.vagas.total || "—"}
                          {c.vagas.cadastroReserva > 0 && (
                            <span className="text-slate-500 font-normal text-xs"> +{c.vagas.cadastroReserva} CR</span>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs">{t("vagas_local", lang)}</p>
                        <p className="text-white text-sm">
                          {c.localizacao.municipio
                            ? `${c.localizacao.municipio}/${c.localizacao.uf}`
                            : c.localizacao.uf || "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs">{t("vagas_inscricao_ate", lang)}</p>
                        <p className={`text-sm font-medium ${dias <= 7 ? "text-red-400" : dias <= 15 ? "text-amber-400" : "text-white"}`}>
                          {c.inscricao.fim
                            ? new Date(c.inscricao.fim).toLocaleDateString("pt-BR")
                            : t("vagas_a_definir", lang)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {c.etapas.length > 0 && (
                          <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px]">{c.etapas.length} {t("vagas_etapas", lang)}</span>
                        )}
                        {c.conteudoProgramatico.length > 0 && (
                          <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px]">{c.conteudoProgramatico.length} {t("vagas_disciplinas", lang)}</span>
                        )}
                        {c.documentos.length > 0 && (
                          <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px]">{c.documentos.length} {t("vagas_documentos", lang)}</span>
                        )}
                        {dias > 0 && dias <= 15 && (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${dias <= 7 ? "bg-red-600/20 text-red-400" : "bg-amber-600/20 text-amber-400"}`}>
                            {dias} {t("vagas_dias_rest", lang)}
                          </span>
                        )}
                      </div>
                      <span className="flex items-center gap-1 text-blue-400 text-xs font-medium group-hover:gap-2 transition-all">
                        {t("vagas_ver_completo", lang)} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Rodapé */}
      <div className="bg-slate-800/50 rounded-xl p-4 md:p-6">
        <div className="flex items-start gap-3">
          <Stethoscope className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-white font-semibold text-sm mb-2">{t("vagas_como_funciona", lang)}</p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Os concursos são coletados automaticamente todos os dias às 07h (Brasília) a partir do{" "}
              <strong className="text-slate-300">{t("vagas_diario_oficial", lang)}</strong> (via Querido Diário API),{" "}
              <strong className="text-slate-300">CEBRASPE</strong>,{" "}
              <strong className="text-slate-300">FGV Projetos</strong> e{" "}
              <strong className="text-slate-300">VUNESP</strong>.
              Cada edital coletado passa por revisão manual no painel admin antes de ser publicado aqui.
            </p>
            <p className="text-slate-500 text-xs mt-2">
              {t("vagas_fontes_info", lang)}
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
