"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Stethoscope,
  MapPin,
  GitCompare,
  Building2,
  TrendingUp,
  Database,
  HeartPulse,
  Hospital,
  Puzzle,
  GraduationCap,
  Brain,
  Menu,
  X,
  Compass,
  Radar,
  BarChart3,
  Activity,
  Microscope,
  FlaskConical,
  BookOpen,
  Globe,
  Briefcase,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, type TranslationKey } from "@/lib/translations";

type NavItem = { href: string; key: TranslationKey; icon: typeof LayoutDashboard };

// Pages available for multiple countries (BR / US / DE)
const globalItems: NavItem[] = [
  { href: "/",                 key: "nav_dashboard",        icon: LayoutDashboard },
  { href: "/especialidades",   key: "nav_especialidades",   icon: Stethoscope },
  { href: "/regioes",          key: "nav_regioes",          icon: MapPin },
  { href: "/epidemiologia",    key: "nav_epidemiologia",    icon: HeartPulse },
  { href: "/estabelecimentos", key: "nav_estabelecimentos", icon: Building2 },
  { href: "/historico",        key: "nav_historico",        icon: TrendingUp },
  { href: "/indicadores",      key: "nav_indicadores",      icon: Brain },
  { href: "/intel-labs",       key: "nav_intel_labs",       icon: FlaskConical },
  { href: "/universidades",    key: "nav_universidades",    icon: GraduationCap },
  { href: "/mapa",             key: "nav_mapa",             icon: Globe },
  { href: "/fontes",           key: "nav_fontes",           icon: Database },
];

// Pages exclusive to Brazil
const brasilItems: NavItem[] = [
  { href: "/sus",                    key: "nav_sus",           icon: Hospital },
  { href: "/radar-sus",              key: "nav_radar_sus",     icon: Radar },
  { href: "/protese",                key: "nav_protese",       icon: Puzzle },
  { href: "/onde-abrir",             key: "nav_onde_abrir",    icon: Compass },
  { href: "/saturacao",              key: "nav_saturacao",     icon: BarChart3 },
  { href: "/cruzamento",             key: "nav_cruzamento",    icon: GitCompare },
  { href: "/demanda-epidemiologica", key: "nav_demanda",       icon: Microscope },
  { href: "/monitor-cro",            key: "nav_monitor_cro",   icon: Activity },
  { href: "/vagas",                  key: "nav_vagas",         icon: Briefcase },
  { href: "/sb-brasil",              key: "nav_sb_brasil",     icon: BookOpen },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { lang, toggle } = useLanguage();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-4 md:p-6 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">OdontoData</h1>
            <p className="text-slate-400 text-xs">{t("sidebar_subtitle", lang)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Toggle de idioma */}
          <button
            onClick={toggle}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 rounded-md px-2.5 py-1.5 transition-all"
            title={lang === "PT" ? "Switch to English" : "Mudar para Português"}
          >
            <span className={`text-xs font-bold transition-colors ${lang === "PT" ? "text-blue-400" : "text-slate-500"}`}>PT</span>
            <span className="text-slate-600 text-xs">/</span>
            <span className={`text-xs font-bold transition-colors ${lang === "EN" ? "text-blue-400" : "text-slate-500"}`}>EN</span>
          </button>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 md:p-4 overflow-y-auto">
        <div className="space-y-1">
          {globalItems.map(({ href, key, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  active
                    ? "bg-blue-600 text-white font-medium"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {t(key, lang)}
              </Link>
            );
          })}
        </div>

        {/* Brazil-only section */}
        <div className="mt-4 pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2 px-3 mb-2">
            <Image src="https://flagcdn.com/br.svg" alt="BR" width={16} height={12} className="rounded-sm object-cover opacity-70" />
            <span className="text-slate-600 text-xs font-medium uppercase tracking-wider">
              {lang === "PT" ? "Exclusivo Brasil" : "Brazil Only"}
            </span>
          </div>
          <div className="space-y-1">
            {brasilItems.map(({ href, key, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    active
                      ? "bg-blue-600 text-white font-medium"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {t(key, lang)}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 md:p-4 border-t border-slate-800">
        {/* Info box */}
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400 font-medium mb-1">{t("sidebar_data_count", lang)}</p>
          <p className="text-xs text-slate-500">CFO · CNES · IBGE · DataSUS · ANS · INEP · INCA · CAPES · ANVISA</p>
          <p className="text-xs text-slate-600 mt-1">{t("sidebar_updated", lang)}</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-sm">OdontoData</span>
          </div>
        </div>
        {/* Toggle compacto no mobile */}
        <button
          onClick={toggle}
          className="flex items-center gap-1 bg-slate-800 rounded-md px-2.5 py-1.5 text-xs font-bold"
        >
          <span className={lang === "PT" ? "text-blue-400" : "text-slate-500"}>PT</span>
          <span className="text-slate-600">/</span>
          <span className={lang === "EN" ? "text-blue-400" : "text-slate-500"}>EN</span>
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 bottom-0 w-72 bg-slate-900 z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-slate-900 border-r border-slate-800 flex-col min-h-screen shrink-0">
        {sidebarContent}
      </aside>
    </>
  );
}
