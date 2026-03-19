import type { EventoCronograma } from "@/lib/data-concursos";
import { Check, Circle, Clock } from "lucide-react";

const statusIcon = (s: EventoCronograma["status"]) => {
  if (s === "concluido") return <Check className="w-3.5 h-3.5 text-emerald-400" />;
  if (s === "atual") return <Circle className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />;
  return <Clock className="w-3.5 h-3.5 text-slate-500" />;
};

const dotBg = (s: EventoCronograma["status"]) => {
  if (s === "concluido") return "bg-emerald-600/20 border-emerald-500";
  if (s === "atual") return "bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/30";
  return "bg-slate-800 border-slate-600";
};

const lineBg = (s: EventoCronograma["status"]) => {
  if (s === "concluido") return "bg-emerald-600/40";
  return "bg-slate-700";
};

export default function Timeline({ events }: { events: EventoCronograma[] }) {
  return (
    <div className="relative">
      {events.map((ev, i) => {
        const isLast = i === events.length - 1;
        return (
          <div key={i} className="flex gap-4 relative">
            {/* Dot + Line */}
            <div className="flex flex-col items-center shrink-0">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${dotBg(ev.status)}`}>
                {statusIcon(ev.status)}
              </div>
              {!isLast && <div className={`w-0.5 flex-1 min-h-[24px] ${lineBg(ev.status)}`} />}
            </div>

            {/* Content */}
            <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
              <p className={`text-xs font-mono ${ev.status === "atual" ? "text-blue-400 font-semibold" : "text-slate-500"}`}>
                {new Date(ev.data).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
              </p>
              <p className={`text-sm mt-0.5 ${ev.status === "concluido" ? "text-slate-400" : ev.status === "atual" ? "text-white font-medium" : "text-slate-300"}`}>
                {ev.descricao}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
