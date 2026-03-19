"use client";

import Link from "next/link";
import AppShell from "@/components/AppShell";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/concurso/StatusBadge";
import Timeline from "@/components/concurso/Timeline";
import EtapaCard from "@/components/concurso/EtapaCard";
import RemuneracaoBreakdown from "@/components/concurso/RemuneracaoBreakdown";
import ConteudoAccordion from "@/components/concurso/ConteudoAccordion";
import type { Concurso } from "@/lib/data-concursos";
import { diasRestantes } from "@/lib/data-concursos";
import { useState } from "react";
import {
  ArrowLeft, DollarSign, Users, Clock, Briefcase, MapPin,
  ExternalLink, Download, Building2, Scale, Shield, Landmark,
  Award, GraduationCap, FileText, CalendarDays, ListChecks,
  Banknote, BookOpen, FolderOpen, CheckCircle2, AlertTriangle, Share2,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

type Tab = "resumo" | "cronograma" | "etapas" | "remuneracao" | "conteudo" | "documentos";

const categoriaIcon: Record<string, typeof Building2> = {
  "Judiciário": Scale,
  "Forças Armadas": Shield,
  "TSE": Landmark,
  "Assembleia": Landmark,
  "SESC": Award,
  "SESI": Award,
  "Prefeitura": Building2,
  "Universidade": GraduationCap,
};

const docColor: Record<string, string> = {
  edital: "bg-blue-600/20 text-blue-400",
  retificacao: "bg-amber-600/20 text-amber-400",
  resultado: "bg-emerald-600/20 text-emerald-400",
  convocacao: "bg-purple-600/20 text-purple-400",
  gabarito: "bg-cyan-600/20 text-cyan-400",
  outro: "bg-slate-600/20 text-slate-400",
};

const docLabel: Record<string, string> = {
  edital: "Edital",
  retificacao: "Retificação",
  resultado: "Resultado",
  convocacao: "Convocação",
  gabarito: "Gabarito",
  outro: "Documento",
};

export default function ConcursoDetail({ concurso }: { concurso: Concurso | null }) {
  const { lang } = useLanguage();
  const [tab, setTab] = useState<Tab>("resumo");

  const TABS: { key: Tab; label: string; icon: typeof FileText }[] = [
    { key: "resumo", label: t("concurso_tab_resumo", lang), icon: FileText },
    { key: "cronograma", label: t("concurso_tab_crono", lang), icon: CalendarDays },
    { key: "etapas", label: t("concurso_tab_etapas", lang), icon: ListChecks },
    { key: "remuneracao", label: t("concurso_tab_remuneracao", lang), icon: Banknote },
    { key: "conteudo", label: t("concurso_tab_conteudo", lang), icon: BookOpen },
    { key: "documentos", label: t("concurso_tab_documentos", lang), icon: FolderOpen },
  ];

  if (!concurso) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <AlertTriangle className="w-16 h-16 text-amber-400" />
          <h1 className="text-white text-2xl font-bold">{t("concurso_nao_encontrado", lang)}</h1>
          <p className="text-slate-400">{t("concurso_removido", lang)}</p>
          <Link href="/vagas" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t("concurso_voltar", lang)}
          </Link>
        </div>
      </AppShell>
    );
  }

  const dias = diasRestantes(concurso.inscricao.fim);
  const Icon = categoriaIcon[concurso.categoria] || Briefcase;

  return (
    <AppShell>
      {/* Voltar */}
      <Link href="/vagas" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-6">
        <ArrowLeft className="w-4 h-4" /> {t("concurso_voltar", lang)}
      </Link>

      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center shrink-0">
              <Icon className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-xs font-mono">{concurso.orgaoSigla}</span>
                <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-xs">{concurso.esfera}</span>
                <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-xs">{concurso.poder}</span>
              </div>
              <h1 className="text-white text-xl md:text-2xl font-bold leading-tight">{concurso.cargo}</h1>
              <p className="text-slate-400 text-sm mt-1">{concurso.orgao}</p>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <StatusBadge status={concurso.statusAtual} size="md" />
            {dias > 0 && concurso.statusAtual === "inscricoes-abertas" && (
              <span className={`text-xs font-medium ${dias <= 7 ? "text-red-400" : dias <= 15 ? "text-amber-400" : "text-slate-400"}`}>
                {dias <= 7
                  ? `${t("concurso_urgente", lang)} ${dias} ${t("concurso_dias_rest", lang)}`
                  : `${dias} ${t("concurso_dias_inscr", lang)}`}
              </span>
            )}
            <p className="text-slate-600 text-[10px]">{t("concurso_atualizado", lang)} {new Date(concurso.atualizadoEm).toLocaleDateString("pt-BR")}</p>
          </div>
        </div>

        {/* Banca + Inscrição rápida */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={concurso.inscricao.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-500 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            {t("concurso_inscricao", lang)} ({concurso.banca.nome})
          </a>
          {concurso.documentos.find((d) => d.tipo === "edital") && (
            <a
              href={concurso.documentos.find((d) => d.tipo === "edital")!.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg font-medium text-sm hover:bg-slate-700 hover:text-white transition-colors"
            >
              <Download className="w-4 h-4" />
              {t("concurso_baixar_edital", lang)}
            </a>
          )}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title={t("concurso_remuneracao", lang)}
          value={`R$ ${concurso.remuneracao.totalEstimado.toLocaleString("pt-BR")}`}
          icon={DollarSign}
          color="green"
          subtitle={`${t("concurso_base", lang)} ${concurso.remuneracao.vencimentoBase.toLocaleString("pt-BR")}`}
        />
        <StatCard
          title={t("concurso_vagas", lang)}
          value={concurso.vagas.total.toString()}
          icon={Users}
          color="blue"
          subtitle={`${concurso.vagas.ampla} ampla + ${concurso.vagas.pcd} PCD + ${concurso.vagas.negro} negros${concurso.vagas.cadastroReserva > 0 ? ` + ${concurso.vagas.cadastroReserva} CR` : ""}`}
        />
        <StatCard
          title={t("concurso_taxa", lang)}
          value={concurso.inscricao.taxa === 0 ? t("concurso_gratuito", lang) : `R$ ${concurso.inscricao.taxa.toLocaleString("pt-BR")}`}
          icon={FileText}
          color={concurso.inscricao.taxa === 0 ? "green" : "yellow"}
          subtitle={concurso.inscricao.taxa > 0 ? t("concurso_isencao", lang) : t("concurso_sem_custo", lang)}
        />
        <StatCard
          title={t("concurso_ch", lang)}
          value={concurso.cargaHoraria}
          icon={Clock}
          color="purple"
          subtitle={concurso.regime}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
        {TABS.map((tb) => (
          <button
            key={tb.key}
            onClick={() => setTab(tb.key)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              tab === tb.key ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
            }`}
          >
            <tb.icon className="w-3.5 h-3.5" />
            {tb.label}
          </button>
        ))}
      </div>

      {/* ======== RESUMO ======== */}
      {tab === "resumo" && (
        <div className="space-y-6">
          {/* Info grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6">
            <h2 className="text-white font-semibold mb-4">{t("concurso_info_gerais", lang)}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: t("concurso_orgao", lang), value: concurso.orgao },
                { label: t("concurso_cargo", lang), value: concurso.cargo },
                { label: t("concurso_especialidade", lang), value: concurso.especialidade },
                { label: t("concurso_banca", lang), value: concurso.banca.nome },
                { label: t("concurso_esfera", lang), value: concurso.esfera.charAt(0).toUpperCase() + concurso.esfera.slice(1) },
                { label: t("concurso_poder", lang), value: concurso.poder.charAt(0).toUpperCase() + concurso.poder.slice(1) },
                { label: t("concurso_regime", lang), value: concurso.regime },
                { label: t("concurso_carga_h", lang), value: concurso.cargaHoraria },
                { label: t("concurso_local", lang), value: `${concurso.localizacao.municipio}/${concurso.localizacao.uf}` },
                { label: t("concurso_abrangencia", lang), value: concurso.localizacao.abrangencia.charAt(0).toUpperCase() + concurso.localizacao.abrangencia.slice(1) },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">{item.label}</p>
                  <p className="text-white text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Inscrição */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6">
            <h2 className="text-white font-semibold mb-4">{t("concurso_inscricao_sec", lang)}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">{t("concurso_inicio", lang)}</p>
                <p className="text-white text-sm">{new Date(concurso.inscricao.inicio).toLocaleDateString("pt-BR")}</p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">{t("concurso_fim", lang)}</p>
                <p className="text-amber-400 text-sm font-medium">{new Date(concurso.inscricao.fim).toLocaleDateString("pt-BR")}</p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">{t("concurso_taxa_sec", lang)}</p>
                <p className="text-white text-sm">{concurso.inscricao.taxa === 0 ? t("concurso_gratuito", lang) : `R$ ${concurso.inscricao.taxa.toLocaleString("pt-BR")}`}</p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">{t("concurso_banca_sec", lang)}</p>
                <a href={concurso.banca.site} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:text-blue-300">{concurso.banca.nome}</a>
              </div>
            </div>
            {concurso.inscricao.isencao && (
              <div className="bg-emerald-600/5 border border-emerald-600/20 rounded-lg p-3">
                <p className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">{t("concurso_isencao_taxa", lang)}</p>
                <p className="text-slate-300 text-xs">{concurso.inscricao.isencao}</p>
              </div>
            )}
          </div>

          {/* Vagas detalhadas */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6">
            <h2 className="text-white font-semibold mb-4">{t("concurso_dist_vagas", lang)}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: t("concurso_total_v", lang), value: concurso.vagas.total, color: "text-white" },
                { label: t("concurso_ampla", lang), value: concurso.vagas.ampla, color: "text-blue-400" },
                { label: t("concurso_pcd", lang), value: concurso.vagas.pcd, color: "text-purple-400" },
                { label: t("concurso_negros", lang), value: concurso.vagas.negro, color: "text-amber-400" },
                { label: t("concurso_indigenas", lang), value: concurso.vagas.indigena, color: "text-emerald-400" },
                { label: t("concurso_reserva", lang), value: concurso.vagas.cadastroReserva, color: "text-slate-400" },
              ].map((v) => (
                <div key={v.label} className="bg-slate-800/50 rounded-lg p-3 text-center">
                  <p className={`text-2xl font-bold ${v.color}`}>{v.value}</p>
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider mt-1">{v.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Requisitos */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6">
            <h2 className="text-white font-semibold mb-4">{t("concurso_requisitos", lang)}</h2>
            <ul className="space-y-2">
              {concurso.requisitos.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-slate-300 text-sm">{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Observações */}
          {concurso.observacoes && (
            <div className="bg-blue-600/5 border border-blue-600/20 rounded-xl p-5 md:p-6">
              <h2 className="text-white font-semibold mb-2">{t("concurso_obs", lang)}</h2>
              <p className="text-slate-300 text-sm leading-relaxed">{concurso.observacoes}</p>
            </div>
          )}
        </div>
      )}

      {/* ======== CRONOGRAMA ======== */}
      {tab === "cronograma" && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-8">
          <h2 className="text-white font-semibold mb-1">{t("concurso_crono", lang)}</h2>
          <p className="text-slate-500 text-xs mb-6">{t("concurso_crono_sub", lang)}</p>
          <Timeline events={concurso.cronograma} />
        </div>
      )}

      {/* ======== ETAPAS ======== */}
      {tab === "etapas" && (
        <div className="space-y-4">
          <div className="mb-2">
            <h2 className="text-white font-semibold">{t("concurso_etapas_title", lang)}</h2>
            <p className="text-slate-500 text-xs">{concurso.etapas.length} {t("concurso_tab_etapas", lang)} — {concurso.etapas.filter((e) => e.eliminatoria).length} {t("concurso_eliminatorias", lang)}</p>
          </div>
          {concurso.etapas.map((etapa) => (
            <EtapaCard key={etapa.ordem} etapa={etapa} />
          ))}
        </div>
      )}

      {/* ======== REMUNERAÇÃO ======== */}
      {tab === "remuneracao" && (
        <div>
          <h2 className="text-white font-semibold mb-1">{t("concurso_remuneracao_det", lang)}</h2>
          <p className="text-slate-500 text-xs mb-6">{t("concurso_remuneracao_sub", lang)}</p>
          <RemuneracaoBreakdown remuneracao={concurso.remuneracao} />
        </div>
      )}

      {/* ======== CONTEÚDO PROGRAMÁTICO ======== */}
      {tab === "conteudo" && (
        <div>
          <h2 className="text-white font-semibold mb-1">{t("concurso_conteudo", lang)}</h2>
          <p className="text-slate-500 text-xs mb-6">
            {concurso.conteudoProgramatico.length} {t("concurso_disciplinas", lang)} — {concurso.conteudoProgramatico.reduce((acc, b) => acc + b.topicos.length, 0)} {t("concurso_topicos", lang)}
          </p>
          <ConteudoAccordion blocos={concurso.conteudoProgramatico} />
        </div>
      )}

      {/* ======== DOCUMENTOS ======== */}
      {tab === "documentos" && (
        <div>
          <h2 className="text-white font-semibold mb-1">{t("concurso_docs", lang)}</h2>
          <p className="text-slate-500 text-xs mb-6">{t("concurso_docs_sub", lang)}</p>
          <div className="space-y-3">
            {concurso.documentos.map((doc, i) => (
              <a
                key={i}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-700 hover:bg-slate-800/50 transition-colors group"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${docColor[doc.tipo]}`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase ${docColor[doc.tipo]}`}>
                      {docLabel[doc.tipo]}
                    </span>
                    <span className="text-slate-600 text-[10px]">
                      {new Date(doc.dataPublicacao).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <p className="text-white text-sm group-hover:text-blue-400 transition-colors truncate">{doc.titulo}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* CTA rodapé */}
      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold">{t("concurso_interessado", lang)}</p>
            <p className="text-slate-400 text-xs mt-0.5">{t("concurso_cta_sub", lang)}</p>
          </div>
          <div className="flex gap-3">
            <a
              href={concurso.inscricao.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-500 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              {t("concurso_inscr_banca", lang)}
            </a>
            {concurso.documentos.find((d) => d.tipo === "edital") && (
              <a
                href={concurso.documentos.find((d) => d.tipo === "edital")!.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg font-medium text-sm hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Download className="w-4 h-4" />
                {t("concurso_edital_pdf", lang)}
              </a>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
