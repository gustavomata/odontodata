"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Stethoscope,
  MapPin,
  BarChart3,
  GitCompare,
  Building2,
  TrendingUp,
  Database,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/especialidades", label: "Especialidades", icon: Stethoscope },
  { href: "/regioes", label: "Regiões & Estados", icon: MapPin },
  { href: "/cruzamento", label: "Cruzamento de Dados", icon: GitCompare },
  { href: "/estabelecimentos", label: "Estabelecimentos", icon: Building2 },
  { href: "/historico", label: "Série Histórica", icon: TrendingUp },
  { href: "/fontes", label: "Bases de Dados", icon: Database },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">OdontoData</h1>
            <p className="text-slate-400 text-xs">Plataforma Nacional</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
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
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400 font-medium mb-1">Fontes de Dados</p>
          <p className="text-xs text-slate-500">CFO · CNES · IBGE · DataSUS · ANS</p>
          <p className="text-xs text-slate-600 mt-1">Atualizado: Mar 2025</p>
        </div>
      </div>
    </aside>
  );
}
