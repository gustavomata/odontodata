"use client";
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
} from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/especialidades", label: "Especialidades", icon: Stethoscope },
  { href: "/regioes", label: "Regioes & Estados", icon: MapPin },
  { href: "/epidemiologia", label: "Epidemiologia", icon: HeartPulse },
  { href: "/sus", label: "Producao SUS", icon: Hospital },
  { href: "/protese", label: "Protese & Labs", icon: Puzzle },
  { href: "/universidades", label: "Universidades", icon: GraduationCap },
  { href: "/cruzamento", label: "Cruzamento de Dados", icon: GitCompare },
  { href: "/indicadores", label: "Indicadores SOTA", icon: Brain },
  { href: "/estabelecimentos", label: "Estabelecimentos", icon: Building2 },
  { href: "/historico", label: "Serie Historica", icon: TrendingUp },
  { href: "/fontes", label: "Bases de Dados", icon: Database },
  // --- Inteligência Disruptiva ---
  { href: "/onde-abrir", label: "Onde Abrir", icon: Compass },
  { href: "/radar-sus", label: "Radar SUS", icon: Radar },
  { href: "/saturacao", label: "Saturação Futura", icon: BarChart3 },
  { href: "/monitor-cro", label: "Monitor CRO", icon: Activity },
  { href: "/demanda-epidemiologica", label: "Demanda Epidemiológica", icon: Microscope },
  { href: "/intel-labs", label: "Intel Labs Protéticos", icon: FlaskConical },
  { href: "/sb-brasil", label: "SB Brasil", icon: BookOpen },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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
            <p className="text-slate-400 text-xs">Plataforma Nacional</p>
          </div>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 md:p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
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
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 md:p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400 font-medium mb-1">19 Bases de Dados</p>
          <p className="text-xs text-slate-500">CFO · CNES · IBGE · DataSUS · ANS · INEP · INCA · CAPES · ANVISA</p>
          <p className="text-xs text-slate-600 mt-1">Atualizado: Mar 2025</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center gap-3">
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
