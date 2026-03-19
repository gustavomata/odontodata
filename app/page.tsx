"use client";
import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";
import AppShell from "@/components/AppShell";
import StatCard from "@/components/StatCard";
import PageHeader from "@/components/PageHeader";
import {
  indicadoresGerais,
  dadosPorRegiao,
  especialidades,
  serieHistorica,
  CORES_REGIOES,
} from "@/lib/data";
import {
  indicadoresGeraisUSA,
  dadosPorRegiaoUSA,
  especialidadesUSA,
  serieHistoricaUSA,
  CORES_REGIOES_USA,
} from "@/lib/data-usa";
import {
  indicadoresGeraisAU,
  dadosPorRegiaoAU,
  especialidadesAU,
  serieHistoricaAU,
  CORES_REGIOES_AU,
} from "@/lib/data-australia";
import {
  indicadoresGeraisDE,
  dadosPorRegiaoDE,
  especialidadesDE,
  serieHistoricaDE,
  CORES_REGIOES_DE,
} from "@/lib/data-germany";
import {
  indicadoresGeraisUK,
  dadosPorRegiaoUK,
  especialidadesUK,
  serieHistoricaUK,
  CORES_REGIOES_UK,
} from "@/lib/data-uk";
import {
  indicadoresGeraisFR,
  dadosPorRegiaoFR,
  especialidadesFR,
  serieHistoricaFR,
  CORES_REGIOES_FR,
} from "@/lib/data-france";
import {
  indicadoresGeraisCA,
  dadosPorRegiaoCA,
  especialidadesCA,
  serieHistoricaCA,
  CORES_REGIOES_CA,
} from "@/lib/data-canada";
import {
  indicadoresGeraisJP,
  dadosPorRegiaoJP,
  especialidadesJP,
  serieHistoricaJP,
  CORES_REGIOES_JP,
} from "@/lib/data-japan";
import type { PaisCode } from "@/lib/world-map-data";
import {
  Users,
  Stethoscope,
  Building2,
  TrendingUp,
  MapPin,
  Award,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

// ─── Configuração por país ────────────────────────────────────────────────────

const PAISES: { code: PaisCode; labelKey: "country_brasil" | "country_usa" | "country_australia" | "country_alemanha" | "country_uk" | "country_franca" | "country_canada" | "country_japao"; flagSrc: string }[] = [
  { code: "BR", labelKey: "country_brasil",    flagSrc: "https://flagcdn.com/br.svg" },
  { code: "US", labelKey: "country_usa",       flagSrc: "https://flagcdn.com/us.svg" },
  { code: "AU", labelKey: "country_australia", flagSrc: "https://flagcdn.com/au.svg" },
  { code: "DE", labelKey: "country_alemanha",  flagSrc: "https://flagcdn.com/de.svg" },
  { code: "UK", labelKey: "country_uk",        flagSrc: "https://flagcdn.com/gb.svg" },
  { code: "FR", labelKey: "country_franca",    flagSrc: "https://flagcdn.com/fr.svg" },
  { code: "CA", labelKey: "country_canada",    flagSrc: "https://flagcdn.com/ca.svg" },
  { code: "JP", labelKey: "country_japao",     flagSrc: "https://flagcdn.com/jp.svg" },
];

type CountryLabels = {
  totalDentistas: string; dentistasAtivos: string; especialistas: string;
  faculdades: string; setorPublico: string; setorPrivado: string;
  cobertura: string; ratio: string; regiao: string; fonte: string;
  alertTitle: string; alertText: string; chartRegiao: string;
  chartDistrib: string; chartGrowth: string; chartPublicPrivate: string;
  publicLabel: string; privateLabel: string;
};

const COUNTRY_LABELS: Record<PaisCode, Record<"PT" | "EN", CountryLabels>> = {
  BR: {
    PT: {
      totalDentistas: "Total de Dentistas", dentistasAtivos: "Dentistas Ativos",
      especialistas: "Especialistas CFO", faculdades: "Faculdades de Odontologia",
      setorPublico: "Setor Público (SUS)", setorPrivado: "Setor Privado",
      cobertura: "Municípios com Cobertura", ratio: "Méd. Hab./Dentista",
      regiao: "Região", fonte: "CFO · CNES · IBGE · Março 2025",
      alertTitle: "Desigualdade Regional",
      alertText: "Enquanto o Sudeste possui 1 dentista para cada 421 habitantes, a Região Norte tem 1 para cada 852 habitantes. A OMS recomenda 1 dentista por 1.500 habitantes, mas a distribuição desigual concentra profissionais em grandes centros urbanos.",
      chartRegiao: "Dentistas por Região", chartDistrib: "Distribuição Regional (%)",
      chartGrowth: "Crescimento (2020–2024)", chartPublicPrivate: "Público vs. Privado por Região",
      publicLabel: "Público (SUS)", privateLabel: "Privado",
    },
    EN: {
      totalDentistas: "Total Dentists", dentistasAtivos: "Active Dentists",
      especialistas: "CFO Specialists", faculdades: "Dental Schools",
      setorPublico: "Public Sector (SUS)", setorPrivado: "Private Sector",
      cobertura: "Municipalities Covered", ratio: "Avg People/Dentist",
      regiao: "Region", fonte: "CFO · CNES · IBGE · March 2025",
      alertTitle: "Regional Inequality",
      alertText: "While the Southeast has 1 dentist per 421 residents, the North region has only 1 per 852. The WHO recommends 1 per 1,500, but uneven distribution concentrates professionals in major urban centers.",
      chartRegiao: "Dentists by Region", chartDistrib: "Regional Distribution (%)",
      chartGrowth: "Growth (2020–2024)", chartPublicPrivate: "Public vs. Private by Region",
      publicLabel: "Public (SUS)", privateLabel: "Private",
    },
  },
  US: {
    PT: {
      totalDentistas: "Total de Dentistas", dentistasAtivos: "Dentistas Ativos",
      especialistas: "Especialistas ADA", faculdades: "Faculdades de Odontologia (CODA)",
      setorPublico: "Setor Público (FQHC)", setorPrivado: "Setor Privado",
      cobertura: "Condados com Cobertura", ratio: "Méd. Hab./Dentista",
      regiao: "Região", fonte: "ADA · NPPES/CMS · Census 2022",
      alertTitle: "Crise de Acesso Odontológico",
      alertText: "57 milhões de americanos vivem em Áreas de Escassez de Profissionais de Saúde Bucal (HPSAs). O Sul tem a maior escassez, com 1 dentista para cada 1.857 habitantes vs. 1:1.280 no Nordeste. Comunidades rurais são desproporcionalmente afetadas.",
      chartRegiao: "Dentistas por Região do Census", chartDistrib: "Distribuição Regional (%)",
      chartGrowth: "Crescimento da Força de Trabalho (2020–2024)", chartPublicPrivate: "Público vs. Privado por Região",
      publicLabel: "Público (FQHC/Rede Pública)", privateLabel: "Consultório Privado",
    },
    EN: {
      totalDentistas: "Total Dentists", dentistasAtivos: "Active Dentists",
      especialistas: "ADA Specialists", faculdades: "Dental Schools (CODA)",
      setorPublico: "Public Sector (FQHC)", setorPrivado: "Private Sector",
      cobertura: "Counties with Coverage", ratio: "Avg People/Dentist",
      regiao: "Region", fonte: "ADA · NPPES/CMS · Census 2022",
      alertTitle: "Dental Access Crisis",
      alertText: "57 million Americans live in Dental Health Professional Shortage Areas (HPSAs). The South has the highest shortage, with 1 dentist per 1,857 residents vs. the Northeast's 1:1,280. Rural communities are disproportionately affected.",
      chartRegiao: "Dentists by Census Region", chartDistrib: "Regional Distribution (%)",
      chartGrowth: "Workforce Growth (2020–2024)", chartPublicPrivate: "Public vs. Private by Region",
      publicLabel: "Public (FQHC/Safety Net)", privateLabel: "Private Practice",
    },
  },
  AU: {
    PT: {
      totalDentistas: "Total de Dentistas", dentistasAtivos: "Dentistas Ativos",
      especialistas: "Especialistas AHPRA", faculdades: "Faculdades de Odontologia (TEQSA)",
      setorPublico: "Serviços Odontológicos Públicos", setorPrivado: "Setor Privado",
      cobertura: "LGAs com Cobertura", ratio: "Méd. Hab./Dentista",
      regiao: "Região", fonte: "AIHW · AHPRA · ABS Census 2021",
      alertTitle: "Lacuna de Acesso Rural e Indígena",
      alertText: "Comunidades aborígines e das Ilhas do Estreito de Torres enfrentam taxas 3× maiores de cárie não tratada. Apenas 55% dos australianos visitam um dentista anualmente, com disparidades significativas entre áreas metropolitanas e remotas.",
      chartRegiao: "Dentistas por Região", chartDistrib: "Distribuição Regional (%)",
      chartGrowth: "Crescimento da Força de Trabalho (2020–2024)", chartPublicPrivate: "Público vs. Privado por Região",
      publicLabel: "Odontologia Pública", privateLabel: "Consultório Privado",
    },
    EN: {
      totalDentistas: "Total Dentists", dentistasAtivos: "Active Dentists",
      especialistas: "AHPRA Specialists", faculdades: "Dental Schools (TEQSA)",
      setorPublico: "Public Dental Services", setorPrivado: "Private Sector",
      cobertura: "LGAs with Coverage", ratio: "Avg People/Dentist",
      regiao: "Region", fonte: "AIHW · AHPRA · ABS Census 2021",
      alertTitle: "Rural & Indigenous Access Gap",
      alertText: "Aboriginal and Torres Strait Islander communities experience 3× higher rates of untreated tooth decay. Only 55% of Australians visit a dentist annually, with significant disparities between metropolitan and remote/rural areas.",
      chartRegiao: "Dentists by Region", chartDistrib: "Regional Distribution (%)",
      chartGrowth: "Workforce Growth (2020–2024)", chartPublicPrivate: "Public vs. Private by Region",
      publicLabel: "Public Dental", privateLabel: "Private Practice",
    },
  },
  DE: {
    PT: {
      totalDentistas: "Total de Dentistas", dentistasAtivos: "Dentistas Ativos",
      especialistas: "Fachzahnärzte (BZÄK)", faculdades: "Clínicas Universitárias (ZZQ)",
      setorPublico: "Setor Público (GKV)", setorPrivado: "Setor Privado (PKV)",
      cobertura: "Municípios com Cobertura", ratio: "Méd. Hab./Dentista",
      regiao: "Região", fonte: "BZÄK · KZBV · Destatis 2023",
      alertTitle: "Desafio Demográfico",
      alertText: "Cerca de 40% dos dentistas alemães têm mais de 55 anos, gerando risco de escassez na próxima década. Regiões do Leste (antiga RDA) enfrentam déficit de profissionais, enquanto cidades como Berlim e Hamburgo têm cobertura superior à recomendação da OMS.",
      chartRegiao: "Dentistas por Região", chartDistrib: "Distribuição Regional (%)",
      chartGrowth: "Crescimento da Força de Trabalho (2020–2024)", chartPublicPrivate: "Público vs. Privado por Região",
      publicLabel: "Público (GKV)", privateLabel: "Privado (PKV)",
    },
    EN: {
      totalDentistas: "Total Dentists", dentistasAtivos: "Active Dentists",
      especialistas: "Fachzahnärzte (BZÄK)", faculdades: "University Dental Clinics (ZZQ)",
      setorPublico: "Public Sector (GKV)", setorPrivado: "Private Sector (PKV)",
      cobertura: "Municipalities with Coverage", ratio: "Avg People/Dentist",
      regiao: "Region", fonte: "BZÄK · KZBV · Destatis 2023",
      alertTitle: "Demographic Challenge",
      alertText: "Around 40% of German dentists are over 55, creating a shortage risk in the next decade. Eastern regions (former GDR) face workforce deficits, while cities like Berlin and Hamburg have coverage exceeding WHO recommendations.",
      chartRegiao: "Dentists by Region", chartDistrib: "Regional Distribution (%)",
      chartGrowth: "Workforce Growth (2020–2024)", chartPublicPrivate: "Public vs. Private by Region",
      publicLabel: "Public (GKV)", privateLabel: "Private (PKV)",
    },
  },
  UK: {
    PT: {
      totalDentistas: "Total de Dentistas", dentistasAtivos: "Dentistas Ativos",
      especialistas: "Especialistas GDC", faculdades: "Faculdades de Odontologia",
      setorPublico: "Setor Público (NHS)", setorPrivado: "Setor Privado",
      cobertura: "Regiões com Cobertura", ratio: "Méd. Hab./Dentista",
      regiao: "Região", fonte: "GDC · NHS Digital · ONS 2023",
      alertTitle: "Crise de Acesso NHS",
      alertText: "Milhões de pacientes no Reino Unido não conseguem encontrar um dentista NHS, forçando muitos a buscar tratamento privado ou a adiar cuidados. As regiões do Norte de Inglaterra têm cobertura NHS significativamente menor que Londres e o Sudeste.",
      chartRegiao: "Dentistas por Região", chartDistrib: "Distribuição Regional (%)",
      chartGrowth: "Crescimento da Força de Trabalho (2020–2024)", chartPublicPrivate: "NHS vs. Privado por Região",
      publicLabel: "Público (NHS)", privateLabel: "Privado",
    },
    EN: {
      totalDentistas: "Total Dentists", dentistasAtivos: "Active Dentists",
      especialistas: "GDC Specialists", faculdades: "Dental Schools",
      setorPublico: "Public Sector (NHS)", setorPrivado: "Private Sector",
      cobertura: "Regions with Coverage", ratio: "Avg People/Dentist",
      regiao: "Region", fonte: "GDC · NHS Digital · ONS 2023",
      alertTitle: "NHS Access Crisis",
      alertText: "Millions of patients in the UK cannot find an NHS dentist, forcing many to seek private treatment or defer care. Regions in Northern England have significantly lower NHS coverage than London and the South East.",
      chartRegiao: "Dentists by Region", chartDistrib: "Regional Distribution (%)",
      chartGrowth: "Workforce Growth (2020–2024)", chartPublicPrivate: "NHS vs. Private by Region",
      publicLabel: "Public (NHS)", privateLabel: "Private",
    },
  },
  FR: {
    PT: {
      totalDentistas: "Total de Dentistas", dentistasAtivos: "Dentistas Ativos",
      especialistas: "Especialistas ONCD", faculdades: "UFR d'Odontologie",
      setorPublico: "Setor Público (CNAM)", setorPrivado: "Setor Privado (Libéral)",
      cobertura: "Départements com Cobertura", ratio: "Méd. Hab./Dentista",
      regiao: "Região", fonte: "ONCD · DREES · INSEE 2023",
      alertTitle: "Desertos Odontológicos",
      alertText: "Mais de 8 milhões de franceses vivem em 'déserts médicaux dentaires', especialmente nas regiões rurais e ultramarinas. O número de cirurgiões-dentistas diminuiu nas últimas décadas devido ao numerus clausus, criando graves desigualdades de acesso.",
      chartRegiao: "Dentistas por Região", chartDistrib: "Distribuição Regional (%)",
      chartGrowth: "Crescimento da Força de Trabalho (2020–2024)", chartPublicPrivate: "Público vs. Libéral por Região",
      publicLabel: "Público (CNAM)", privateLabel: "Libéral",
    },
    EN: {
      totalDentistas: "Total Dentists", dentistasAtivos: "Active Dentists",
      especialistas: "ONCD Specialists", faculdades: "Dental Schools (UFR)",
      setorPublico: "Public Sector (CNAM)", setorPrivado: "Private (Libéral)",
      cobertura: "Départements with Coverage", ratio: "Avg People/Dentist",
      regiao: "Region", fonte: "ONCD · DREES · INSEE 2023",
      alertTitle: "Dental Deserts",
      alertText: "More than 8 million French people live in dental deserts, especially in rural and overseas regions. The number of dentists has declined in recent decades due to the numerus clausus system, creating serious access inequalities.",
      chartRegiao: "Dentists by Region", chartDistrib: "Regional Distribution (%)",
      chartGrowth: "Workforce Growth (2020–2024)", chartPublicPrivate: "Public vs. Libéral by Region",
      publicLabel: "Public (CNAM)", privateLabel: "Libéral",
    },
  },
  CA: {
    PT: {
      totalDentistas: "Total de Dentistas", dentistasAtivos: "Dentistas Ativos",
      especialistas: "Especialistas RCDC", faculdades: "Faculdades de Odontologia",
      setorPublico: "Setor Público", setorPrivado: "Setor Privado",
      cobertura: "Províncias com Cobertura", ratio: "Méd. Hab./Dentista",
      regiao: "Região", fonte: "CIHI · CDA · Statistics Canada 2023",
      alertTitle: "Acesso Limitado ao Cuidado Dental",
      alertText: "Apenas cerca de 65% dos canadenses têm cobertura de seguro dental. O programa federal Canadian Dental Care Plan, lançado em 2023, visa estender a cobertura a mais de 9 milhões de canadenses sem seguro. Províncias do Norte e territórios enfrentam escassez crítica.",
      chartRegiao: "Dentistas por Região", chartDistrib: "Distribuição Regional (%)",
      chartGrowth: "Crescimento da Força de Trabalho (2020–2024)", chartPublicPrivate: "Público vs. Privado por Região",
      publicLabel: "Público", privateLabel: "Privado",
    },
    EN: {
      totalDentistas: "Total Dentists", dentistasAtivos: "Active Dentists",
      especialistas: "RCDC Specialists", faculdades: "Dental Schools",
      setorPublico: "Public Sector", setorPrivado: "Private Sector",
      cobertura: "Provinces with Coverage", ratio: "Avg People/Dentist",
      regiao: "Region", fonte: "CIHI · CDA · Statistics Canada 2023",
      alertTitle: "Limited Dental Care Access",
      alertText: "Only about 65% of Canadians have dental insurance coverage. The federal Canadian Dental Care Plan, launched in 2023, aims to extend coverage to over 9 million uninsured Canadians. Northern provinces and territories face critical shortages.",
      chartRegiao: "Dentists by Region", chartDistrib: "Regional Distribution (%)",
      chartGrowth: "Workforce Growth (2020–2024)", chartPublicPrivate: "Public vs. Private by Region",
      publicLabel: "Public", privateLabel: "Private",
    },
  },
  JP: {
    PT: {
      totalDentistas: "Total de Dentistas", dentistasAtivos: "Dentistas Ativos",
      especialistas: "Especialistas JDSB", faculdades: "Faculdades de Odontologia",
      setorPublico: "Setor Público (Seguro Nacional)", setorPrivado: "Clínicas Privadas",
      cobertura: "Prefeituras com Cobertura", ratio: "Méd. Hab./Dentista",
      regiao: "Região", fonte: "MHLW · JDA · Statistics Japan 2023",
      alertTitle: "Supersaturação e Envelhecimento",
      alertText: "O Japão tem mais dentistas per capita que qualquer outro país desenvolvido, mas enfrenta duplo desafio: supersaturação nas áreas urbanas e escassez em regiões rurais. O envelhecimento da população aumenta a demanda por odontologia geriátrica, com foco em saúde bucal para idosos.",
      chartRegiao: "Dentistas por Região", chartDistrib: "Distribuição Regional (%)",
      chartGrowth: "Crescimento da Força de Trabalho (2020–2024)", chartPublicPrivate: "Público vs. Privado por Região",
      publicLabel: "Público", privateLabel: "Privado",
    },
    EN: {
      totalDentistas: "Total Dentists", dentistasAtivos: "Active Dentists",
      especialistas: "JDSB Specialists", faculdades: "Dental Schools",
      setorPublico: "Public (National Insurance)", setorPrivado: "Private Clinics",
      cobertura: "Prefectures with Coverage", ratio: "Avg People/Dentist",
      regiao: "Region", fonte: "MHLW · JDA · Statistics Japan 2023",
      alertTitle: "Oversaturation & Aging Population",
      alertText: "Japan has more dentists per capita than any other developed country, yet faces a dual challenge: oversaturation in urban areas and shortages in rural regions. The aging population is increasing demand for geriatric dentistry focused on elderly oral health.",
      chartRegiao: "Dentists by Region", chartDistrib: "Regional Distribution (%)",
      chartGrowth: "Workforce Growth (2020–2024)", chartPublicPrivate: "Public vs. Private by Region",
      publicLabel: "Public", privateLabel: "Private",
    },
  },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm">
        <p className="text-slate-300 font-medium mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: <strong>{p.value.toLocaleString()}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [pais, setPais] = useState<PaisCode>("BR");
  const { lang } = useLanguage();

  const data = useMemo(() => {
    if (pais === "US") return {
      indicadores: indicadoresGeraisUSA,
      regioes: dadosPorRegiaoUSA,
      especialidades: especialidadesUSA,
      serie: serieHistoricaUSA,
      cores: CORES_REGIOES_USA,
    };
    if (pais === "AU") return {
      indicadores: indicadoresGeraisAU,
      regioes: dadosPorRegiaoAU,
      especialidades: especialidadesAU,
      serie: serieHistoricaAU,
      cores: CORES_REGIOES_AU,
    };
    if (pais === "DE") return {
      indicadores: indicadoresGeraisDE,
      regioes: dadosPorRegiaoDE,
      especialidades: especialidadesDE,
      serie: serieHistoricaDE,
      cores: CORES_REGIOES_DE,
    };
    if (pais === "UK") return {
      indicadores: indicadoresGeraisUK,
      regioes: dadosPorRegiaoUK,
      especialidades: especialidadesUK,
      serie: serieHistoricaUK,
      cores: CORES_REGIOES_UK,
    };
    if (pais === "FR") return {
      indicadores: indicadoresGeraisFR,
      regioes: dadosPorRegiaoFR,
      especialidades: especialidadesFR,
      serie: serieHistoricaFR,
      cores: CORES_REGIOES_FR,
    };
    if (pais === "CA") return {
      indicadores: indicadoresGeraisCA,
      regioes: dadosPorRegiaoCA,
      especialidades: especialidadesCA,
      serie: serieHistoricaCA,
      cores: CORES_REGIOES_CA,
    };
    if (pais === "JP") return {
      indicadores: indicadoresGeraisJP,
      regioes: dadosPorRegiaoJP,
      especialidades: especialidadesJP,
      serie: serieHistoricaJP,
      cores: CORES_REGIOES_JP,
    };
    return {
      indicadores: indicadoresGerais,
      regioes: dadosPorRegiao,
      especialidades,
      serie: serieHistorica,
      cores: CORES_REGIOES,
    };
  }, [pais]);

  const labels = useMemo(() => COUNTRY_LABELS[pais][lang], [pais, lang]);
  const top5Esp = data.especialidades.slice(0, 5);
  const ultimosAnos = data.serie.slice(-5);
  const coberturaPct = Math.round(
    (data.indicadores.totalMunicipiosComCobertura / data.indicadores.totalMunicipios) * 100
  );

  return (
    <AppShell>
      <PageHeader
        title={t("dash_global_title", lang)}
        subtitle={pais === "BR"
          ? t("dash_subtitle_br", lang)
          : pais === "US"
          ? t("dash_subtitle_us", lang)
          : pais === "AU"
          ? t("dash_subtitle_au", lang)
          : labels.fonte}
        badge={labels.fonte}
      />

      {/* Seletor de País */}
      <div className="flex gap-3 mb-6">
        {PAISES.map(({ code, labelKey, flagSrc }) => (
          <button
            key={code}
            onClick={() => setPais(code)}
            className={`flex flex-col items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all border ${
              pais === code
                ? "bg-blue-600/20 border-blue-500 text-blue-300"
                : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300"
            }`}
          >
            <img
              src={flagSrc}
              alt={code}
              className="w-10 h-7 rounded object-cover shadow-sm"
            />
            <span className="text-xs">{t(labelKey, lang)}</span>
          </button>
        ))}
      </div>

      {/* KPIs — Linha 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title={labels.totalDentistas}
          value={data.indicadores.totalDentistas}
          subtitle={pais === "BR" ? t("dash_registros_cfo", lang) : pais === "US" ? t("dash_nppes", lang) : pais === "AU" ? t("dash_ahpra", lang) : pais === "DE" ? "BZÄK registriert" : pais === "UK" ? "GDC registered" : pais === "FR" ? "ONCD inscrit" : pais === "CA" ? "Provincial registrations" : "MHLW 登録"}
          icon={Users}
          color="blue"
          trend={{ value: data.indicadores.crescimentoUltimoAno, label: t("dash_vs_last_year", lang) }}
        />
        <StatCard
          title={labels.dentistasAtivos}
          value={data.indicadores.dentistasAtivos}
          subtitle={pais === "BR" ? t("dash_anuidade", lang) : t("dash_practicing", lang)}
          icon={CheckCircle2}
          color="green"
        />
        <StatCard
          title={labels.especialistas}
          value={data.indicadores.totalEspecialistas}
          subtitle={pais === "BR" ? t("dash_especialidade_reconhecida", lang) : t("dash_board_cert", lang)}
          icon={Award}
          color="purple"
        />
        <StatCard
          title={labels.faculdades}
          value={data.indicadores.faculdadesOdontologia}
          subtitle={`${data.indicadores.vagasAnuais.toLocaleString()} ${t("dash_graduates_year", lang)}`}
          icon={Building2}
          color="cyan"
        />
      </div>

      {/* KPIs — Linha 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title={labels.setorPublico}
          value={data.indicadores.dentistasPublicos}
          subtitle={pais === "BR" ? t("dash_ubs_ceo", lang) : pais === "US" ? t("dash_fqhc", lang) : t("dash_community_dental", lang)}
          icon={Building2}
          color="yellow"
        />
        <StatCard
          title={labels.setorPrivado}
          value={data.indicadores.dentistasPrivados}
          subtitle={pais === "BR" ? t("dash_clinicas", lang) : t("dash_clinics_practices", lang)}
          icon={Stethoscope}
          color="blue"
        />
        <StatCard
          title={labels.cobertura}
          value={`${coberturaPct}%`}
          subtitle={`${data.indicadores.totalMunicipiosComCobertura.toLocaleString()} of ${data.indicadores.totalMunicipios.toLocaleString()} ${pais === "BR" ? t("dash_municipios_unit", lang) : pais === "US" ? t("dash_counties", lang) : pais === "AU" ? t("dash_lgas", lang) : pais === "DE" ? "Gemeinden" : pais === "UK" ? "regions" : pais === "FR" ? "départements" : pais === "CA" ? "provinces" : "prefectures"}`}
          icon={MapPin}
          color="green"
        />
        <StatCard
          title={labels.ratio}
          value={`1 : ${data.indicadores.mediaHabitantesBrasil}`}
          subtitle={`${t("dash_who_rec", lang)}${data.indicadores.recomendacaoOMS}`}
          icon={TrendingUp}
          color={data.indicadores.mediaHabitantesBrasil <= data.indicadores.recomendacaoOMS ? "green" : "yellow"}
        />
      </div>

      {/* Alert por país */}
      <div className="bg-amber-600/10 border border-amber-600/30 rounded-xl p-4 mb-8 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-amber-300 font-medium text-sm">{labels.alertTitle}</p>
          <p className="text-amber-400/70 text-xs mt-1">{labels.alertText}</p>
        </div>
      </div>

      {/* Charts — Linha 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{labels.chartRegiao}</h2>
          <p className="text-slate-500 text-xs mb-4">{pais === "BR" ? t("dash_chart_region_sub", lang) : t("dash_region_sub_intl", lang)}</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.regioes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="regiao" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="totalDentistas" name={t("dash_total", lang)} radius={[4, 4, 0, 0]}>
                {data.regioes.map((r) => <Cell key={r.regiao} fill={data.cores[r.regiao] ?? "#3b82f6"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{labels.chartDistrib}</h2>
          <p className="text-slate-500 text-xs mb-4">{pais === "BR" ? t("dash_chart_distrib_sub", lang) : t("dash_distrib_sub_intl", lang)}</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <ResponsiveContainer width="60%" height={220}>
              <PieChart>
                <Pie data={data.regioes} dataKey="totalDentistas" nameKey="regiao" cx="50%" cy="50%" innerRadius={55} outerRadius={90}>
                  {data.regioes.map((r) => <Cell key={r.regiao} fill={data.cores[r.regiao] ?? "#3b82f6"} />)}
                </Pie>
                <Tooltip
                  formatter={(v: any) => [Number(v).toLocaleString(), t("dash_dentistas", lang)]}

                  contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {data.regioes.map((r) => {
                const pct = Math.round((r.totalDentistas / data.indicadores.totalDentistas) * 100);
                return (
                  <div key={r.regiao} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: data.cores[r.regiao] ?? "#3b82f6" }} />
                    <span className="text-slate-300 text-xs flex-1">{r.regiao}</span>
                    <span className="text-slate-400 text-xs font-mono">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Charts — Linha 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{t("dash_chart_top5", lang)}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("dash_chart_top5_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={top5Esp} layout="vertical" margin={{ top: 0, right: 10, left: 80, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="especialidade" tick={{ fill: "#94a3b8", fontSize: 11 }} width={75} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" name={t("dash_dentistas", lang)} fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
          <h2 className="text-white font-semibold mb-1">{labels.chartGrowth}</h2>
          <p className="text-slate-500 text-xs mb-4">{t("dash_chart_growth_sub", lang)}</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ultimosAnos} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="ano" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
              <Line type="monotone" dataKey="total" name={t("dash_total", lang)} stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6", r: 4 }} />
              <Line type="monotone" dataKey="novosRegistros" name={t("dash_novos_registros", lang)} stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart — Público vs Privado */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
        <h2 className="text-white font-semibold mb-1">{labels.chartPublicPrivate}</h2>
        <p className="text-slate-500 text-xs mb-4">{t("dash_chart_pp_sub", lang)}</p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.regioes}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="regiao" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
            <Bar dataKey="dentistasPublicos" name={labels.publicLabel}  fill="#f59e0b" stackId="a" />
            <Bar dataKey="dentistasPrivados" name={labels.privateLabel} fill="#3b82f6" stackId="a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AppShell>
  );
}
