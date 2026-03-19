"use client";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import {
  edicoesSBBrasil, cpodPorIdade, prevalenciaCondicoes,
  acessoServicos, desigualdadesSociais, dadosRegionais,
  metasOMS, indicadoresSBBrasil,
} from "@/lib/data-sb-brasil";
import {
  BookOpen, TrendingDown, Users, UserX, MapPin, Award, Target, Activity,
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, Cell,
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm">
        <p className="text-slate-300 font-medium mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color || "#94a3b8" }}>
            {p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString("pt-BR") : p.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const tendColor = (trend: string) => {
  if (trend === "Melhora significativa") return "bg-emerald-600/20 text-emerald-400";
  if (trend === "Melhora moderada") return "bg-blue-600/20 text-blue-400";
  if (trend === "Estável") return "bg-slate-600/20 text-slate-400";
  return "bg-red-600/20 text-red-400";
};

const statusColor = (s: string) => {
  if (s === "Atingida") return "bg-emerald-600/20 text-emerald-400";
  if (s === "Parcialmente atingida") return "bg-amber-600/20 text-amber-400";
  return "bg-red-600/20 text-red-400";
};

// Prepare chart data
const cpod12anosChart = dadosRegionais.map((r) => ({
  regiao: r.regiao,
  "2003": r.cpod_12_2003,
  "2010": r.cpod_12_2010,
  "2023": r.cpod_12_2023,
}));

const faixas = ["5 anos", "12 anos", "15-19 anos", "35-44 anos", "65-74 anos"];
const cpodGrupoChart = faixas.map((f) => {
  const d2003 = cpodPorIdade.find((c) => c.faixa_etaria === f && c.edicao === 2003);
  const d2010 = cpodPorIdade.find((c) => c.faixa_etaria === f && c.edicao === 2010);
  const d2023 = cpodPorIdade.find((c) => c.faixa_etaria === f && c.edicao === 2023);
  return { faixa: f, "2003": d2003?.cpod_total || 0, "2010": d2010?.cpod_total || 0, "2023": d2023?.cpod_total || 0 };
});

const componentesChart = [2003, 2010, 2023].map((ano) => {
  const d = cpodPorIdade.find((c) => c.faixa_etaria === "12 anos" && c.edicao === ano);
  return { ano: String(ano), Cariado: d?.componente_cariado || 0, Perdido: d?.componente_perdido || 0, Obturado: d?.componente_obturado || 0 };
});

export default function SBBrasilPage() {
  const { lang } = useLanguage();

  return (
    <AppShell>
      <PageHeader
        title={t("sbb_title", lang)}
        subtitle={t("sbb_subtitle", lang)}
        badge={t("sbb_badge", lang)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title={t("sbb_edicao", lang)} value={indicadoresSBBrasil.edicaoAtual} icon={BookOpen} color="blue" subtitle={t("sbb_ultima", lang)} />
        <StatCard title={t("sbb_amostra", lang)} value={indicadoresSBBrasil.amostraTotal} icon={Users} color="purple" subtitle={t("sbb_examinadas", lang)} />
        <StatCard title={t("sbb_reduc_cpod", lang)} value={indicadoresSBBrasil.reducaoCPOD12anos} icon={TrendingDown} color="green" subtitle={t("sbb_desde_2003", lang)} />
        <StatCard title={t("sbb_reduc_edent", lang)} value={indicadoresSBBrasil.reducaoEdentulismo} icon={TrendingDown} color="green" subtitle={t("sbb_desde_2003", lang)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title={t("sbb_nunca_dent", lang)} value={indicadoresSBBrasil.aindaNuncaDentista_mi + " mi"} icon={UserX} color="red" subtitle={t("sbb_brasileiros", lang)} />
        <StatCard title={t("sbb_melhor_reg", lang)} value={indicadoresSBBrasil.melhorRegiao} icon={MapPin} color="green" subtitle={t("sbb_melhores_ind", lang)} />
        <StatCard title={t("sbb_pior_reg", lang)} value={indicadoresSBBrasil.piorRegiao} icon={MapPin} color="red" subtitle={t("sbb_piores_ind", lang)} />
        <StatCard title={t("sbb_metas_oms", lang)} value={indicadoresSBBrasil.metasOMSAtingidas} icon={Target} color="yellow" subtitle={t("sbb_atingidas", lang)} />
      </div>

      {/* Info Box */}
      <div className="bg-blue-600/10 border border-blue-600/30 rounded-xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-blue-400 font-semibold text-sm">O que é o SB Brasil?</p>
            <p className="text-slate-400 text-xs mt-1">O SB Brasil é a Pesquisa Nacional de Saúde Bucal, o maior inquérito epidemiológico odontológico do país. Realizado pelo Ministério da Saúde em 2003, 2010 e 2023 (atrasado pela COVID-19), examina dezenas de milhares de brasileiros em centenas de municípios para mapear a prevalência de cárie (CPO-D), doença periodontal, edentulismo, acesso a serviços e desigualdades sociais em saúde bucal. É a base para todas as políticas públicas de saúde bucal do Brasil.</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("sbb_cpod_faixa", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("sbb_cpod_comp", lang)}</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cpodGrupoChart} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="faixa" tick={{ fill: "#94a3b8", fontSize: 9 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
              <Bar dataKey="2003" name="2003" fill="#ef4444" radius={[2, 2, 0, 0]} />
              <Bar dataKey="2010" name="2010" fill="#f59e0b" radius={[2, 2, 0, 0]} />
              <Bar dataKey="2023" name="2023" fill="#10b981" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("sbb_cpod_regiao", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("sbb_cpod_reg_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cpod12anosChart} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="regiao" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} domain={[0, 4]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
              <Bar dataKey="2003" name="2003" fill="#ef4444" radius={[2, 2, 0, 0]} />
              <Bar dataKey="2010" name="2010" fill="#f59e0b" radius={[2, 2, 0, 0]} />
              <Bar dataKey="2023" name="2023" fill="#10b981" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("sbb_componentes", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("sbb_comp_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={componentesChart} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
              <Bar dataKey="Cariado" name={t("sbb_cariado", lang)} stackId="a" fill="#ef4444" />
              <Bar dataKey="Perdido" name={t("sbb_perdido", lang)} stackId="a" fill="#f59e0b" />
              <Bar dataKey="Obturado" name={t("sbb_obturado", lang)} stackId="a" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Edições */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-white font-semibold mb-4">{t("sbb_edicoes", lang)}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {edicoesSBBrasil.map((e) => (
            <div key={e.ano} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-400 mb-2">SB Brasil {e.ano}</div>
              <div className="space-y-1 mb-3">
                <p className="text-slate-400 text-xs">{t("sbb_amostra_col", lang)} <strong className="text-white">{e.amostra_total.toLocaleString("pt-BR")}</strong></p>
                <p className="text-slate-400 text-xs">{t("sbb_municipios_col", lang)} <strong className="text-white">{e.municipios_pesquisados}</strong></p>
              </div>
              <div className="border-t border-slate-700 pt-3">
                <p className="text-slate-500 text-xs font-medium mb-2">{t("sbb_principais", lang)}</p>
                <ul className="space-y-1">
                  {e.principais_achados.map((a, i) => (
                    <li key={i} className="text-slate-400 text-xs flex gap-2"><span className="text-blue-400 shrink-0">•</span>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prevalência */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-white font-semibold mb-4">{t("sbb_prevalencia", lang)}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_condicao_col", lang)}</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_grupo_et", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">2003</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">2010</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">2023</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_variacao", lang)}</th>
                <th className="text-center py-3 px-3 text-slate-400 font-medium">{t("col_tendencia", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {prevalenciaCondicoes.map((p, i) => (
                <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-3 px-3 text-white font-medium text-xs">{p.condicao}</td>
                  <td className="py-3 px-3 text-slate-300 text-xs">{p.grupo_etario}</td>
                  <td className="py-3 px-3 text-right text-red-400">{p.prevalencia_2003_pct}%</td>
                  <td className="py-3 px-3 text-right text-amber-400">{p.prevalencia_2010_pct}%</td>
                  <td className="py-3 px-3 text-right text-emerald-400">{p.prevalencia_2023_pct}%</td>
                  <td className={`py-3 px-3 text-right font-bold ${p.variacao_2003_2023_pp < 0 ? "text-emerald-400" : "text-red-400"}`}>{p.variacao_2003_2023_pp > 0 ? "+" : ""}{p.variacao_2003_2023_pp}pp</td>
                  <td className="py-3 px-3 text-center"><span className={`px-2 py-1 rounded-full text-xs font-medium ${tendColor(p.tendencia)}`}>{p.tendencia}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Acesso a Serviços */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-white font-semibold mb-4">{t("sbb_acesso", lang)}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_indicador", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">2003</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">2010</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">2023</th>
                <th className="text-center py-3 px-3 text-slate-400 font-medium">{t("col_unidade", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {acessoServicos.map((a) => (
                <tr key={a.indicador} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-3 px-3 text-white font-medium text-xs">{a.indicador}</td>
                  <td className="py-3 px-3 text-right text-red-400">{a.valor_2003}{a.unidade}</td>
                  <td className="py-3 px-3 text-right text-amber-400">{a.valor_2010}{a.unidade}</td>
                  <td className="py-3 px-3 text-right text-emerald-400">{a.valor_2023}{a.unidade}</td>
                  <td className="py-3 px-3 text-center text-slate-500">{a.unidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Desigualdades */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-white font-semibold mb-4">{t("sbb_desigualdades", lang)}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_determinante", lang)}</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_grupo_fav", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_valor", lang)}</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_grupo_desfav", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_valor", lang)}</th>
                <th className="text-right py-3 px-3 text-slate-400 font-medium">{t("col_razao", lang)}</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_ind_usado", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {desigualdadesSociais.map((d) => (
                <tr key={d.determinante} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-3 px-3 text-white font-medium">{d.determinante}</td>
                  <td className="py-3 px-3 text-emerald-400 text-xs">{d.categoria_favorecida}</td>
                  <td className="py-3 px-3 text-right text-emerald-400">{d.valor_favorecido}</td>
                  <td className="py-3 px-3 text-red-400 text-xs">{d.categoria_desfavorecida}</td>
                  <td className="py-3 px-3 text-right text-red-400">{d.valor_desfavorecido}</td>
                  <td className="py-3 px-3 text-right text-amber-400 font-bold">{d.razao_desigualdade}x</td>
                  <td className="py-3 px-3 text-slate-400 text-xs">{d.indicador_usado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Metas OMS */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
        <h2 className="text-white font-semibold mb-4">{t("sbb_metas_oms_title", lang)}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_meta", lang)}</th>
                <th className="text-left py-3 px-3 text-slate-400 font-medium">{t("col_descricao", lang)}</th>
                <th className="text-center py-3 px-3 text-slate-400 font-medium">{t("col_alvo_2020", lang)}</th>
                <th className="text-center py-3 px-3 text-slate-400 font-medium">{t("col_brasil_2023", lang)}</th>
                <th className="text-center py-3 px-3 text-slate-400 font-medium">{t("col_status", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {metasOMS.map((m) => (
                <tr key={m.meta} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="py-3 px-3 text-white font-medium text-xs">{m.meta}</td>
                  <td className="py-3 px-3 text-slate-400 text-xs">{m.descricao}</td>
                  <td className="py-3 px-3 text-center text-slate-300">{m.alvo_2020}</td>
                  <td className="py-3 px-3 text-center text-blue-400 font-bold">{m.resultado_brasil_2023}</td>
                  <td className="py-3 px-3 text-center"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(m.status)}`}>{m.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
