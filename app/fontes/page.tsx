"use client";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import { fontesDados } from "@/lib/data";
import { Database, CheckCircle2, XCircle, ExternalLink, Clock, Globe } from "lucide-react";

const TIPO_CORES: Record<string, string> = {
  "Registro Profissional": "text-blue-400 bg-blue-400/10",
  "Saúde Pública": "text-emerald-400 bg-emerald-400/10",
  "Dados Demográficos": "text-amber-400 bg-amber-400/10",
  "Produção Ambulatorial": "text-purple-400 bg-purple-400/10",
  "Saúde Suplementar": "text-cyan-400 bg-cyan-400/10",
  "Educação": "text-pink-400 bg-pink-400/10",
  "Epidemiologia": "text-red-400 bg-red-400/10",
  "Vigilância Epidemiológica": "text-orange-400 bg-orange-400/10",
  "Oncologia": "text-rose-400 bg-rose-400/10",
  "Atenção Básica": "text-teal-400 bg-teal-400/10",
  "Fatores de Risco": "text-yellow-400 bg-yellow-400/10",
  "Pesquisa & Pós-Graduação": "text-indigo-400 bg-indigo-400/10",
  "Regulação Educacional": "text-violet-400 bg-violet-400/10",
  "Pesquisa Científica": "text-sky-400 bg-sky-400/10",
  "Regulação Sanitária": "text-lime-400 bg-lime-400/10",
  "Vigilância Ambiental": "text-green-400 bg-green-400/10",
  "Comparação Internacional": "text-fuchsia-400 bg-fuchsia-400/10",
  "Inovação & Patentes": "text-amber-400 bg-amber-400/10",
};

export default function FontesPage() {
  return (
    <AppShell>
      <PageHeader
        title="Bases de Dados"
        subtitle="Fontes oficiais utilizadas na plataforma OdontoData"
        badge="18 bases integradas"
      />

      {/* Plano */}
      <div className="bg-slate-900 border border-blue-600/30 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3 mb-4">
          <Database className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <h2 className="text-white font-semibold">Plano de Integração de Dados</h2>
            <p className="text-slate-500 text-xs mt-0.5">Estratégia de coleta, cruzamento e atualização das fontes</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-blue-400 font-medium text-sm mb-2">1. Dados de Profissionais</h3>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>→ CFO: Total de registros ativos/inativos</li>
              <li>→ CROs Estaduais: Registros por UF e especialidade</li>
              <li>→ Atualização: Semanal via scraping e API</li>
            </ul>
          </div>
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-emerald-400 font-medium text-sm mb-2">2. Dados de Saúde Pública</h3>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>→ CNES: Estabelecimentos e profissionais vinculados</li>
              <li>→ DataSUS/SIASUS: Procedimentos realizados</li>
              <li>→ Atualização: Mensal via FTP DataSUS</li>
            </ul>
          </div>
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-amber-400 font-medium text-sm mb-2">3. Dados Demográficos e Educação</h3>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>→ IBGE: População por município/estado</li>
              <li>→ INEP: Faculdades, vagas e concluintes</li>
              <li>→ Atualização: Anual (pós-censo/ENADE)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cruzamentos */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
        <h2 className="text-white font-semibold mb-4">Cruzamentos Implementados</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {[
            { a: "CFO", b: "IBGE", resultado: "Dentistas por habitante por estado/município", badge: "text-emerald-400" },
            { a: "CFO", b: "CNES", resultado: "Vinculação de profissionais a estabelecimentos", badge: "text-blue-400" },
            { a: "CNES", b: "IBGE", resultado: "Cobertura de estabelecimentos por região", badge: "text-purple-400" },
            { a: "CFO", b: "ANS", resultado: "Profissionais atendendo plano de saúde", badge: "text-cyan-400" },
            { a: "INEP", b: "CFO", resultado: "Taxa de absorção de formandos no mercado", badge: "text-amber-400" },
            { a: "DataSUS", b: "CNES", resultado: "Produção odontológica por estabelecimento", badge: "text-pink-400" },
            { a: "SB Brasil", b: "IBGE", resultado: "CPO-D × IDH × renda por município", badge: "text-red-400" },
            { a: "VIGIAGUA", b: "SB Brasil", resultado: "Fluoretação da água × prevalência de cárie", badge: "text-teal-400" },
            { a: "INCA", b: "CNES", resultado: "Câncer bucal × cobertura CEO × diagnóstico precoce", badge: "text-rose-400" },
            { a: "VIGITEL", b: "SIM", resultado: "Tabagismo × mortalidade por câncer de boca", badge: "text-orange-400" },
            { a: "CAPES", b: "INPI", resultado: "Pesquisa científica × conversão em patentes", badge: "text-indigo-400" },
            { a: "IBGE", b: "CFO", resultado: "Envelhecimento populacional × demanda odontogeriatria", badge: "text-violet-400" },
            { a: "ANVISA", b: "SIA/SUS", resultado: "Materiais disponíveis × tecnologia usada no SUS", badge: "text-lime-400" },
            { a: "INEP", b: "IBGE", resultado: "Saturação mercado × formação × distribuição regional", badge: "text-sky-400" },
            { a: "PNS", b: "DataSUS", resultado: "Determinantes sociais × acesso a saúde bucal", badge: "text-yellow-400" },
          ].map(({ a, b, resultado, badge }) => (
            <div key={resultado} className="bg-slate-800 rounded-lg p-3 flex items-start gap-3">
              <div className="flex items-center gap-1 shrink-0">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${badge} bg-slate-700`}>{a}</span>
                <span className="text-slate-500 text-xs">×</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${badge} bg-slate-700`}>{b}</span>
              </div>
              <p className="text-slate-300 text-xs">{resultado}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cards das Fontes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {fontesDados.map((fonte) => (
          <div key={fonte.nome} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${TIPO_CORES[fonte.tipo] || "text-slate-400 bg-slate-700"}`}>
                    {fonte.tipo}
                  </span>
                  {fonte.api && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full text-emerald-400 bg-emerald-400/10">API disponível</span>
                  )}
                  {fonte.abertoAcesso && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full text-blue-400 bg-blue-400/10">Acesso aberto</span>
                  )}
                </div>
                <h3 className="text-white font-semibold text-sm">{fonte.nome}</h3>
              </div>
            </div>

            <div className="space-y-1 mb-4">
              {fonte.dados.map((d) => (
                <div key={d} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  <p className="text-slate-400 text-xs">{d}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-slate-800 pt-3">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                <Clock className="w-3 h-3" />
                Atualização: {fonte.atualizacao}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs">
                  {fonte.abertoAcesso ? (
                    <><Globe className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">Aberto</span></>
                  ) : (
                    <><XCircle className="w-3 h-3 text-red-400" /><span className="text-red-400">Restrito</span></>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabela de Acesso */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-6">
        <h2 className="text-white font-semibold mb-4">Resumo Técnico das Bases</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left py-3 px-4 text-slate-400 font-medium">Base</th>
              <th className="text-left py-3 px-4 text-slate-400 font-medium">Tipo</th>
              <th className="text-center py-3 px-4 text-slate-400 font-medium">Acesso Aberto</th>
              <th className="text-center py-3 px-4 text-slate-400 font-medium">API REST</th>
              <th className="text-left py-3 px-4 text-slate-400 font-medium">Atualização</th>
              <th className="text-left py-3 px-4 text-slate-400 font-medium">Dados Principais</th>
            </tr>
          </thead>
          <tbody>
            {fontesDados.map((f) => (
              <tr key={f.nome} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 text-slate-200 font-medium text-xs">{f.nome.split(" - ")[0]}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${TIPO_CORES[f.tipo] || "text-slate-400 bg-slate-700"}`}>{f.tipo}</span>
                </td>
                <td className="py-3 px-4 text-center">
                  {f.abertoAcesso ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                </td>
                <td className="py-3 px-4 text-center">
                  {f.api ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-600 mx-auto" />}
                </td>
                <td className="py-3 px-4 text-slate-400 text-xs">{f.atualizacao}</td>
                <td className="py-3 px-4 text-slate-500 text-xs">{f.dados[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
