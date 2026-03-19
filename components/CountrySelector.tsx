"use client";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

export type PaisCode = "BR" | "US" | "DE" | "AU" | "UK" | "FR" | "CA" | "JP";

const PAISES: { code: PaisCode; labelKey: keyof ReturnType<typeof getLabels>; flag: string }[] = [
  { code: "BR", labelKey: "country_brasil",    flag: "https://flagcdn.com/br.svg" },
  { code: "US", labelKey: "country_usa",       flag: "https://flagcdn.com/us.svg" },
  { code: "DE", labelKey: "country_alemanha",  flag: "https://flagcdn.com/de.svg" },
  { code: "AU", labelKey: "country_australia", flag: "https://flagcdn.com/au.svg" },
  { code: "UK", labelKey: "country_uk",        flag: "https://flagcdn.com/gb.svg" },
  { code: "FR", labelKey: "country_franca",    flag: "https://flagcdn.com/fr.svg" },
  { code: "CA", labelKey: "country_canada",    flag: "https://flagcdn.com/ca.svg" },
  { code: "JP", labelKey: "country_japao",     flag: "https://flagcdn.com/jp.svg" },
];

function getLabels() {
  return {
    country_brasil: "", country_usa: "", country_alemanha: "",
    country_australia: "", country_uk: "", country_franca: "",
    country_canada: "", country_japao: "",
  };
}

interface Props {
  value: PaisCode;
  onChange: (code: PaisCode) => void;
  countries?: PaisCode[];
}

export default function CountrySelector({ value, onChange, countries = ["BR", "US", "DE"] }: Props) {
  const { lang } = useLanguage();
  const filtered = PAISES.filter((p) => countries.includes(p.code));
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filtered.map(({ code, labelKey, flag }) => (
        <button
          key={code}
          onClick={() => onChange(code)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
            value === code
              ? "bg-blue-600/20 border-blue-500 text-blue-300"
              : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300"
          }`}
        >
          <Image src={flag} alt={code} width={28} height={20} className="rounded object-cover" />
          <span className="text-xs">{t(labelKey as any, lang)}</span>
        </button>
      ))}
    </div>
  );
}
