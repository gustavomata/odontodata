"use client";
import { useState } from "react";
import Image from "next/image";
import AppShell from "@/components/AppShell";
import PageHeader from "@/components/PageHeader";
import { fontesDados } from "@/lib/data";
import { Database, CheckCircle2, XCircle, Clock, Globe, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

// ─── Tipos ────────────────────────────────────────────────────────────────────
type Country = "BR" | "US" | "DE";

interface DataSource {
  nome: string;
  sigla: string;
  tipo: string;
  dados: string[];
  atualizacao: string;
  abertoAcesso: boolean;
  api: boolean;
  url?: string;
}

interface CrossRef {
  a: string;
  b: string;
  resultado: string;
  badge: string;
}

interface CountryData {
  flag: string;
  label: string;
  labelEn: string;
  badge: string;
  strategy: { color: string; title: string; titleEn: string; items: string[]; itemsEn: string[] }[];
  crossRefs: CrossRef[];
  sources: DataSource[];
}

// ─── Cores por tipo ───────────────────────────────────────────────────────────
const TIPO_CORES: Record<string, string> = {
  // BR
  "Registro Profissional":         "text-blue-400 bg-blue-400/10",
  "Saúde Pública":                 "text-emerald-400 bg-emerald-400/10",
  "Dados Demográficos":            "text-amber-400 bg-amber-400/10",
  "Produção Ambulatorial":         "text-purple-400 bg-purple-400/10",
  "Saúde Suplementar":             "text-cyan-400 bg-cyan-400/10",
  "Educação":                      "text-pink-400 bg-pink-400/10",
  "Epidemiologia":                 "text-red-400 bg-red-400/10",
  "Vigilância Epidemiológica":     "text-orange-400 bg-orange-400/10",
  "Oncologia":                     "text-rose-400 bg-rose-400/10",
  "Atenção Básica":                "text-teal-400 bg-teal-400/10",
  "Fatores de Risco":              "text-yellow-400 bg-yellow-400/10",
  "Pesquisa & Pós-Graduação":      "text-indigo-400 bg-indigo-400/10",
  "Regulação Educacional":         "text-violet-400 bg-violet-400/10",
  "Pesquisa Científica":           "text-sky-400 bg-sky-400/10",
  "Regulação Sanitária":           "text-lime-400 bg-lime-400/10",
  "Vigilância Ambiental":          "text-green-400 bg-green-400/10",
  "Comparação Internacional":      "text-fuchsia-400 bg-fuchsia-400/10",
  "Inovação & Patentes":           "text-amber-400 bg-amber-400/10",
  // US
  "Professional Registry":         "text-blue-400 bg-blue-400/10",
  "Public Health":                 "text-emerald-400 bg-emerald-400/10",
  "Demographics":                  "text-amber-400 bg-amber-400/10",
  "Workforce & Economics":         "text-purple-400 bg-purple-400/10",
  "Insurance & Coverage":          "text-cyan-400 bg-cyan-400/10",
  "Education & Accreditation":     "text-pink-400 bg-pink-400/10",
  "Epidemiology & Surveys":        "text-red-400 bg-red-400/10",
  "Shortage Areas":                "text-orange-400 bg-orange-400/10",
  "Healthcare Quality":            "text-teal-400 bg-teal-400/10",
  "International Comparison":      "text-fuchsia-400 bg-fuchsia-400/10",
  // DE
  "Berufsregister":                "text-blue-400 bg-blue-400/10",
  "Gesundheitsversorgung":         "text-emerald-400 bg-emerald-400/10",
  "Demografie":                    "text-amber-400 bg-amber-400/10",
  "Kassenzahnärztlich":            "text-purple-400 bg-purple-400/10",
  "Bildung & Akkreditierung":      "text-pink-400 bg-pink-400/10",
  "Epidemiologie":                 "text-red-400 bg-red-400/10",
  "Wirtschaftsforschung":          "text-indigo-400 bg-indigo-400/10",
  "Qualitätssicherung":            "text-teal-400 bg-teal-400/10",
  "Internationaler Vergleich":     "text-fuchsia-400 bg-fuchsia-400/10",
};

// ─── Dados por país ───────────────────────────────────────────────────────────
const COUNTRY_DATA: Record<Country, CountryData> = {
  BR: {
    flag: "https://flagcdn.com/br.svg",
    label: "Brasil",
    labelEn: "Brazil",
    badge: "CFO · CNES · IBGE · DataSUS · INEP · CAPES · ANVISA",
    strategy: [
      {
        color: "text-blue-400",
        title: "1. Dados de Profissionais",
        titleEn: "1. Professional Data",
        items: ["CFO: Total de registros ativos/inativos", "CROs Estaduais: Registros por UF e especialidade", "Atualização: Semanal via scraping e API"],
        itemsEn: ["CFO: Total active/inactive registrations", "State CROs: Records by state and specialty", "Update: Weekly via scraping and API"],
      },
      {
        color: "text-emerald-400",
        title: "2. Dados de Saúde Pública",
        titleEn: "2. Public Health Data",
        items: ["CNES: Estabelecimentos e profissionais vinculados", "DataSUS/SIASUS: Procedimentos realizados", "Atualização: Mensal via FTP DataSUS"],
        itemsEn: ["CNES: Establishments and linked professionals", "DataSUS/SIASUS: Procedures performed", "Update: Monthly via DataSUS FTP"],
      },
      {
        color: "text-amber-400",
        title: "3. Demográficos e Educação",
        titleEn: "3. Demographics & Education",
        items: ["IBGE: População por município/estado", "INEP: Faculdades, vagas e concluintes", "Atualização: Anual (pós-censo/ENADE)"],
        itemsEn: ["IBGE: Population by city/state", "INEP: Schools, places and graduates", "Update: Annual (post-census/ENADE)"],
      },
    ],
    crossRefs: [
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
    ],
    sources: [], // uses fontesDados from data.ts
  },

  US: {
    flag: "https://flagcdn.com/us.svg",
    label: "Estados Unidos",
    labelEn: "United States",
    badge: "ADA · NPPES/CMS · HRSA · CDC · BLS · Census · CODA",
    strategy: [
      {
        color: "text-blue-400",
        title: "1. Registro de Profissionais",
        titleEn: "1. Professional Registry",
        items: ["NPPES/CMS: National Provider Identifier Registry", "ADA: Workforce surveys, specialty counts", "Atualização: Semanal via CMS API"],
        itemsEn: ["NPPES/CMS: National Provider Identifier Registry", "ADA: Workforce surveys, specialty counts", "Update: Weekly via CMS API"],
      },
      {
        color: "text-emerald-400",
        title: "2. Saúde Pública Federal",
        titleEn: "2. Federal Public Health",
        items: ["HRSA: Dental HPSA shortage area designations", "Medicaid/CHIP CMS: Public dental coverage data", "Atualização: Trimestral via HRSA Data Warehouse"],
        itemsEn: ["HRSA: Dental HPSA shortage area designations", "Medicaid/CHIP CMS: Public dental coverage data", "Update: Quarterly via HRSA Data Warehouse"],
      },
      {
        color: "text-amber-400",
        title: "3. Demográficos e Educação",
        titleEn: "3. Demographics & Education",
        items: ["Census Bureau: Population by county/state", "CODA: Accredited dental school enrollment/graduates", "BLS OES: Salary, employment & occupational projections"],
        itemsEn: ["Census Bureau: Population by county/state", "CODA: Accredited dental school enrollment/graduates", "BLS OES: Salary, employment & occupational projections"],
      },
    ],
    crossRefs: [
      { a: "NPPES", b: "Census", resultado: "Dentists per capita by county and state", badge: "text-emerald-400" },
      { a: "HRSA", b: "Census", resultado: "Shortage area population × unmet dental need", badge: "text-orange-400" },
      { a: "ADA HPI", b: "BLS OES", resultado: "Workforce supply vs. projected demand 2025–2035", badge: "text-purple-400" },
      { a: "CODA", b: "NPPES", resultado: "Graduate output × active licensure rate by state", badge: "text-pink-400" },
      { a: "CDC NHANES", b: "Census", resultado: "Oral health prevalence × income × race/ethnicity", badge: "text-red-400" },
      { a: "Medicaid", b: "HRSA", resultado: "Public coverage access × HPSA shortage areas", badge: "text-cyan-400" },
      { a: "ADA HPI", b: "NPPES", resultado: "Specialty distribution × geographic concentration", badge: "text-blue-400" },
      { a: "BLS OES", b: "Census", resultado: "Dentist salary variation × cost of living by metro area", badge: "text-amber-400" },
      { a: "AHRQ MEPS", b: "CDC", resultado: "Dental expenditure × utilization × insurance status", badge: "text-teal-400" },
      { a: "CODA", b: "BLS OES", resultado: "Dental school pipeline × 10-year workforce projection", badge: "text-indigo-400" },
    ],
    sources: [
      {
        nome: "ADA Health Policy Institute",
        sigla: "ADA HPI",
        tipo: "Workforce & Economics",
        dados: ["Dentist workforce size and distribution", "Specialty counts and trends", "Annual economic surveys", "Practice characteristics and income data"],
        atualizacao: "Annual",
        abertoAcesso: true,
        api: false,
        url: "https://www.ada.org/resources/research/health-policy-institute",
      },
      {
        nome: "NPPES / CMS National Provider Registry",
        sigla: "NPPES",
        tipo: "Professional Registry",
        dados: ["All licensed dentists by NPI", "Specialty taxonomy codes", "Practice address and state license", "Active vs. inactive providers"],
        atualizacao: "Weekly",
        abertoAcesso: true,
        api: true,
        url: "https://npiregistry.cms.hhs.gov",
      },
      {
        nome: "HRSA Data Warehouse",
        sigla: "HRSA",
        tipo: "Shortage Areas",
        dados: ["Dental Health Professional Shortage Areas (HPSA)", "57M Americans in dental deserts", "Medically underserved areas", "National Health Service Corps placements"],
        atualizacao: "Quarterly",
        abertoAcesso: true,
        api: true,
        url: "https://data.hrsa.gov",
      },
      {
        nome: "Commission on Dental Accreditation",
        sigla: "CODA",
        tipo: "Education & Accreditation",
        dados: ["67 accredited dental schools", "Annual enrollment and graduates", "Specialty program counts", "School-level outcome metrics"],
        atualizacao: "Annual",
        abertoAcesso: true,
        api: false,
        url: "https://www.ada.org/coda",
      },
      {
        nome: "Bureau of Labor Statistics — OES",
        sigla: "BLS OES",
        tipo: "Workforce & Economics",
        dados: ["Dentist employment by state and metro area", "Median and percentile wages", "10-year occupational projections", "Industry employment breakdown"],
        atualizacao: "Annual",
        abertoAcesso: true,
        api: true,
        url: "https://www.bls.gov/oes",
      },
      {
        nome: "CDC — National Health & Nutrition Examination Survey",
        sigla: "CDC NHANES",
        tipo: "Epidemiology & Surveys",
        dados: ["Oral health prevalence (caries, periodontitis)", "Edentulism rates by age group", "Access to dental care metrics", "Social determinants of oral health"],
        atualizacao: "Biennial",
        abertoAcesso: true,
        api: true,
        url: "https://www.cdc.gov/nchs/nhanes",
      },
      {
        nome: "Centers for Medicare & Medicaid Services",
        sigla: "CMS Medicaid",
        tipo: "Insurance & Coverage",
        dados: ["Medicaid dental enrollment by state", "CHIP pediatric dental coverage", "FQHCs dental service utilization", "Dental expenditures per beneficiary"],
        atualizacao: "Quarterly",
        abertoAcesso: true,
        api: true,
        url: "https://data.medicaid.gov",
      },
      {
        nome: "US Census Bureau — American Community Survey",
        sigla: "Census ACS",
        tipo: "Demographics",
        dados: ["Population by county and state", "Income, poverty, and insurance rates", "Age distribution and projections", "Rural vs. urban classification"],
        atualizacao: "Annual",
        abertoAcesso: true,
        api: true,
        url: "https://data.census.gov",
      },
      {
        nome: "Agency for Healthcare Research & Quality",
        sigla: "AHRQ MEPS",
        tipo: "Healthcare Quality",
        dados: ["Medical Expenditure Panel Survey", "Dental visit rates and out-of-pocket costs", "Insurance coverage and utilization", "Disparities in dental care access"],
        atualizacao: "Annual",
        abertoAcesso: true,
        api: false,
        url: "https://www.ahrq.gov/data/meps",
      },
      {
        nome: "OECD Health Statistics",
        sigla: "OECD",
        tipo: "International Comparison",
        dados: ["Dentists per 1,000 population", "Public vs. private dental spending", "Dental care utilization rates", "Cross-country oral health outcomes"],
        atualizacao: "Annual",
        abertoAcesso: true,
        api: true,
        url: "https://stats.oecd.org",
      },
    ],
  },

  DE: {
    flag: "https://flagcdn.com/de.svg",
    label: "Alemanha",
    labelEn: "Germany",
    badge: "BZÄK · KZBV · Destatis · GKV · IDZ · RKI · OECD",
    strategy: [
      {
        color: "text-blue-400",
        title: "1. Registro de Profissionais",
        titleEn: "1. Professional Registry",
        items: ["BZÄK: Registro nacional de cirurgiões-dentistas", "Landeszahnärztekammern: Registros por Bundesland", "Atualização: Anual via relatório BZÄK"],
        itemsEn: ["BZÄK: National dentist registration authority", "Landeszahnärztekammern: State-level registrations", "Update: Annual via BZÄK annual report"],
      },
      {
        color: "text-emerald-400",
        title: "2. Sistema de Saúde (GKV/PKV)",
        titleEn: "2. Health System (GKV/PKV)",
        items: ["KZBV: Produção odontológica no sistema GKV", "GKV-Spitzenverband: Cobertura de seguro público", "Atualização: Trimestral via relatório KZBV"],
        itemsEn: ["KZBV: Dental production in GKV public system", "GKV-Spitzenverband: Public insurance coverage stats", "Update: Quarterly via KZBV report"],
      },
      {
        color: "text-amber-400",
        title: "3. Demográficos e Educação",
        titleEn: "3. Demographics & Education",
        items: ["Destatis: População por Bundesland e Kreis", "ZZQ/HRK: 30 faculdades universitárias dentárias", "IDZ: Instituto de pesquisa econômica odontológica"],
        itemsEn: ["Destatis: Population by Bundesland and Kreis", "ZZQ/HRK: 30 university dental clinics", "IDZ: Dental economic research institute"],
      },
    ],
    crossRefs: [
      { a: "BZÄK", b: "Destatis", resultado: "Dentistas por habitante por Bundesland e Kreis", badge: "text-emerald-400" },
      { a: "KZBV", b: "GKV", resultado: "Produção odontológica × cobertura de seguro público", badge: "text-blue-400" },
      { a: "IDZ", b: "Destatis", resultado: "Projeção de oferta × envelhecimento demográfico até 2035", badge: "text-amber-400" },
      { a: "BZÄK", b: "ZZQ", resultado: "Formandos × taxa de absorção no mercado", badge: "text-pink-400" },
      { a: "RKI", b: "Destatis", resultado: "Saúde bucal epidemiológica × determinantes sociais", badge: "text-red-400" },
      { a: "KZBV", b: "PKV-Verband", resultado: "Acesso GKV vs. PKV × distribuição regional", badge: "text-cyan-400" },
      { a: "IDZ", b: "BZÄK", resultado: "Especialização × rentabilidade × tendências de mercado", badge: "text-purple-400" },
      { a: "Destatis", b: "BZÄK", resultado: "Projeção de aposentadoria × risco de escassez regional", badge: "text-orange-400" },
      { a: "OECD", b: "Destatis", resultado: "Comparação internacional × gasto per capita em saúde bucal", badge: "text-fuchsia-400" },
      { a: "RKI DMS", b: "GKV", resultado: "Deutsche Mundgesundheitsstudie × utilização de serviços", badge: "text-teal-400" },
    ],
    sources: [
      {
        nome: "Bundeszahnärztekammer",
        sigla: "BZÄK",
        tipo: "Berufsregister",
        dados: ["77.800 dentistas registrados (2024)", "Distribuição por Bundesland e especialidade", "Dados demográficos da força de trabalho", "Relatório anual Statistische Jahrbuch"],
        atualizacao: "Annual",
        abertoAcesso: true,
        api: false,
        url: "https://www.bzaek.de",
      },
      {
        nome: "Kassenzahnärztliche Bundesvereinigung",
        sigla: "KZBV",
        tipo: "Kassenzahnärztlich",
        dados: ["Produção odontológica no sistema GKV", "54.200 consultórios credenciados", "Procedimentos por especialidade e região", "Honorários e faturamento GKV"],
        atualizacao: "Quarterly",
        abertoAcesso: true,
        api: false,
        url: "https://www.kzbv.de",
      },
      {
        nome: "Statistisches Bundesamt",
        sigla: "Destatis",
        tipo: "Demografie",
        dados: ["População por Bundesland, Kreis e Gemeinde", "Projeções demográficas até 2060", "Estrutura etária e envelhecimento", "Dados socioeconômicos regionais"],
        atualizacao: "Annual",
        abertoAcesso: true,
        api: true,
        url: "https://www.destatis.de",
      },
      {
        nome: "GKV-Spitzenverband",
        sigla: "GKV",
        tipo: "Kassenzahnärztlich",
        dados: ["74M segurados no sistema público (GKV)", "Gastos com saúde bucal por categoria", "Cobertura por estado federal", "Estatísticas de utilização dental"],
        atualizacao: "Quarterly",
        abertoAcesso: true,
        api: false,
        url: "https://www.gkv-spitzenverband.de",
      },
      {
        nome: "Institut der Deutschen Zahnärzte",
        sigla: "IDZ",
        tipo: "Wirtschaftsforschung",
        dados: ["Projeções de oferta/demanda 2025–2040", "Análise econômica do mercado odontológico", "Estudos de rentabilidade por especialidade", "Deutsche Mundgesundheitsstudie (DMS)"],
        atualizacao: "Every 10–15 years (DMS) / Annual (economic)",
        abertoAcesso: false,
        api: false,
        url: "https://www.idz.institute",
      },
      {
        nome: "Robert Koch Institut",
        sigla: "RKI",
        tipo: "Epidemiologie",
        dados: ["Dados epidemiológicos de saúde bucal", "Pesquisa de saúde alemã (GEDA)", "Prevalência de cárie por grupo etário", "Determinantes sociais da saúde bucal"],
        atualizacao: "Every 5 years",
        abertoAcesso: true,
        api: true,
        url: "https://www.rki.de",
      },
      {
        nome: "Zentrum Zahnärztliche Qualität",
        sigla: "ZZQ",
        tipo: "Qualitätssicherung",
        dados: ["Acreditação das 30 faculdades universitárias", "Diretrizes clínicas odontológicas", "Indicadores de qualidade assistencial", "Certificações de especialistas"],
        atualizacao: "Ongoing",
        abertoAcesso: true,
        api: false,
        url: "https://www.zzq-online.de",
      },
      {
        nome: "PKV-Verband (Private Krankenversicherung)",
        sigla: "PKV",
        tipo: "Gesundheitsversorgung",
        dados: ["8,7M segurados privados com cobertura dental", "Gastos dental PKV vs. GKV", "Taxa de utilização de serviços privados", "Tratamentos de alto custo (implantes, próteses)"],
        atualizacao: "Annual",
        abertoAcesso: true,
        api: false,
        url: "https://www.pkv.de",
      },
      {
        nome: "Deutsche Gesellschaft für Zahn-, Mund- und Kieferheilkunde",
        sigla: "DGZMK",
        tipo: "Qualitätssicherung",
        dados: ["S3-Leitlinien clínicas baseadas em evidências", "Dados de pesquisa científica por especialidade", "Epidemiologia de doenças bucais", "Publicações científicas nacionais"],
        atualizacao: "Ongoing",
        abertoAcesso: true,
        api: false,
        url: "https://www.dgzmk.de",
      },
      {
        nome: "OECD Health Statistics",
        sigla: "OECD",
        tipo: "Internationaler Vergleich",
        dados: ["Alemanha: 0,93 dentistas por 1.000 hab.", "Gastos públicos e privados em saúde bucal", "Comparação com 38 países membros", "Indicadores de saúde bucal da população"],
        atualizacao: "Annual",
        abertoAcesso: true,
        api: true,
        url: "https://stats.oecd.org",
      },
    ],
  },
};

// ─── Componente ───────────────────────────────────────────────────────────────
export default function FontesPage() {
  const { lang } = useLanguage();
  const [pais, setPais] = useState<Country>("BR");
  const cd = COUNTRY_DATA[pais];
  const sources = pais === "BR" ? fontesDados : cd.sources;
  const totalSources = pais === "BR" ? fontesDados.length : cd.sources.length;
  const crossCount = cd.crossRefs.length;

  return (
    <AppShell>
      <PageHeader
        title={t("fontes_title", lang)}
        subtitle={t("fontes_subtitle", lang)}
        badge={`${totalSources} ${lang === "PT" ? "bases integradas" : "integrated databases"} · ${crossCount} ${lang === "PT" ? "cruzamentos" : "cross-references"}`}
      />

      {/* Seletor de país */}
      <div className="flex gap-3 mb-8">
        {(["BR", "US", "DE"] as Country[]).map((code) => {
          const c = COUNTRY_DATA[code];
          return (
            <button
              key={code}
              onClick={() => setPais(code)}
              className={`flex flex-col items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all border ${
                pais === code
                  ? "bg-blue-600/20 border-blue-500 text-blue-300"
                  : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300"
              }`}
            >
              <Image src={c.flag} alt={code} width={40} height={28} className="rounded object-cover shadow-sm" />
              <span className="text-xs">{lang === "PT" ? c.label : c.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Badge de fontes */}
      <div className="flex items-center gap-2 mb-6 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg w-fit text-xs text-slate-400">
        <Database className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <span>{cd.badge}</span>
      </div>

      {/* Estratégia de coleta */}
      <div className="bg-slate-900 border border-blue-600/30 rounded-xl p-4 md:p-6 mb-8">
        <div className="flex items-start gap-3 mb-4">
          <Database className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <h2 className="text-white font-semibold">{t("fontes_plano", lang)}</h2>
            <p className="text-slate-500 text-xs mt-0.5">{t("fontes_plano_sub", lang)}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {cd.strategy.map((s) => (
            <div key={s.title} className="bg-slate-800 rounded-lg p-4">
              <h3 className={`${s.color} font-medium text-sm mb-2`}>{lang === "PT" ? s.title : s.titleEn}</h3>
              <ul className="space-y-1 text-xs text-slate-400">
                {(lang === "PT" ? s.items : s.itemsEn).map((item) => (
                  <li key={item}>→ {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Cruzamentos */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
        <h2 className="text-white font-semibold mb-4">{t("fontes_cruzamentos", lang)}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {cd.crossRefs.map(({ a, b, resultado, badge }) => (
            <div key={resultado} className="bg-slate-800 rounded-lg p-3 flex items-start gap-3">
              <div className="flex items-center gap-1 shrink-0">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${badge} bg-slate-700`}>{a}</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${badge} bg-slate-700`}>{b}</span>
              </div>
              <p className="text-slate-300 text-xs">{resultado}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cards das Fontes */}
      <h2 className="text-white font-semibold mb-4">{t("fontes_resumo", lang)}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        {pais === "BR"
          ? fontesDados.map((fonte) => (
              <div key={fonte.nome} className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 hover:border-slate-700 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${TIPO_CORES[fonte.tipo] || "text-slate-400 bg-slate-700"}`}>{fonte.tipo}</span>
                      {fonte.api && <span className="text-xs font-medium px-2 py-0.5 rounded-full text-emerald-400 bg-emerald-400/10">{t("fontes_api_disp", lang)}</span>}
                      {fonte.abertoAcesso && <span className="text-xs font-medium px-2 py-0.5 rounded-full text-blue-400 bg-blue-400/10">{t("fontes_acesso_aberto", lang)}</span>}
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
                    {t("fontes_atualizacao", lang)} {fonte.atualizacao}
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    {fonte.abertoAcesso
                      ? <><Globe className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">{t("fontes_aberto", lang)}</span></>
                      : <><XCircle className="w-3 h-3 text-red-400" /><span className="text-red-400">{t("fontes_restrito", lang)}</span></>}
                  </div>
                </div>
              </div>
            ))
          : (cd.sources as DataSource[]).map((fonte) => (
              <div key={fonte.nome} className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6 hover:border-slate-700 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-300`}>{fonte.sigla}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${TIPO_CORES[fonte.tipo] || "text-slate-400 bg-slate-700"}`}>{fonte.tipo}</span>
                      {fonte.api && <span className="text-xs font-medium px-2 py-0.5 rounded-full text-emerald-400 bg-emerald-400/10">{t("fontes_api_disp", lang)}</span>}
                      {fonte.abertoAcesso && <span className="text-xs font-medium px-2 py-0.5 rounded-full text-blue-400 bg-blue-400/10">{t("fontes_acesso_aberto", lang)}</span>}
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
                    {t("fontes_atualizacao", lang)} {fonte.atualizacao}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs">
                      {fonte.abertoAcesso
                        ? <><Globe className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">{t("fontes_aberto", lang)}</span></>
                        : <><XCircle className="w-3 h-3 text-red-400" /><span className="text-red-400">{t("fontes_restrito", lang)}</span></>}
                    </div>
                    {fonte.url && (
                      <a href={fonte.url} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                        <Globe className="w-3 h-3" />{lang === "PT" ? "Acessar" : "Visit"}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Tabela resumo */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
        <h2 className="text-white font-semibold mb-4">{lang === "PT" ? "Resumo Técnico das Bases" : "Technical Database Summary"}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("col_base", lang)}</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("col_tipo", lang)}</th>
                <th className="text-center py-3 px-4 text-slate-400 font-medium">{t("col_acesso_aberto", lang)}</th>
                <th className="text-center py-3 px-4 text-slate-400 font-medium">{t("col_api_rest", lang)}</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("col_atualizacao", lang)}</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">{t("col_dados_principais", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {(pais === "BR" ? fontesDados : cd.sources as DataSource[]).map((f) => (
                <tr key={f.nome} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-slate-200 font-medium text-xs">
                    {pais === "BR" ? f.nome.split(" - ")[0] : (f as DataSource).sigla}
                  </td>
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
      </div>
    </AppShell>
  );
}
