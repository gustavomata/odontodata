import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: "blue" | "green" | "yellow" | "red" | "purple" | "cyan";
  trend?: { value: number; label: string };
}

const colorMap = {
  blue: { bg: "bg-blue-600/20", text: "text-blue-400", icon: "bg-blue-600" },
  green: { bg: "bg-emerald-600/20", text: "text-emerald-400", icon: "bg-emerald-600" },
  yellow: { bg: "bg-amber-600/20", text: "text-amber-400", icon: "bg-amber-600" },
  red: { bg: "bg-red-600/20", text: "text-red-400", icon: "bg-red-600" },
  purple: { bg: "bg-purple-600/20", text: "text-purple-400", icon: "bg-purple-600" },
  cyan: { bg: "bg-cyan-600/20", text: "text-cyan-400", icon: "bg-cyan-600" },
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "blue",
  trend,
}: StatCardProps) {
  const c = colorMap[color];
  return (
    <div className={`${c.bg} border border-slate-800 rounded-xl p-5 flex flex-col gap-3`}>
      <div className="flex items-center justify-between">
        <p className="text-slate-400 text-sm">{title}</p>
        <div className={`${c.icon} w-8 h-8 rounded-lg flex items-center justify-center`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      <div>
        <p className={`text-2xl font-bold ${c.text}`}>
          {typeof value === "number" ? value.toLocaleString("pt-BR") : value}
        </p>
        {subtitle && <p className="text-slate-500 text-xs mt-1">{subtitle}</p>}
      </div>
      {trend && (
        <div className="flex items-center gap-1">
          <span className={`text-xs font-medium ${trend.value >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            {trend.value >= 0 ? "+" : ""}{trend.value}%
          </span>
          <span className="text-slate-500 text-xs">{trend.label}</span>
        </div>
      )}
    </div>
  );
}
