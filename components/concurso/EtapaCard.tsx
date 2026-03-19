import type { Etapa } from "@/lib/data-concursos";
import {
  FileText, PenTool, Wrench, Award, Dumbbell, HeartPulse, GraduationCap, Users,
} from "lucide-react";

const etapaIcon: Record<Etapa["tipo"], typeof FileText> = {
  "prova-objetiva": FileText,
  "prova-discursiva": PenTool,
  "prova-pratica": Wrench,
  "titulos": Award,
  "teste-fisico": Dumbbell,
  "exame-medico": HeartPulse,
  "curso-formacao": GraduationCap,
  "heteroidentificacao": Users,
};

const etapaColor: Record<Etapa["tipo"], string> = {
  "prova-objetiva": "bg-blue-600/20 text-blue-400",
  "prova-discursiva": "bg-purple-600/20 text-purple-400",
  "prova-pratica": "bg-amber-600/20 text-amber-400",
  "titulos": "bg-emerald-600/20 text-emerald-400",
  "teste-fisico": "bg-red-600/20 text-red-400",
  "exame-medico": "bg-cyan-600/20 text-cyan-400",
  "curso-formacao": "bg-indigo-600/20 text-indigo-400",
  "heteroidentificacao": "bg-pink-600/20 text-pink-400",
};

export default function EtapaCard({ etapa }: { etapa: Etapa }) {
  const Icon = etapaIcon[etapa.tipo];
  const color = etapaColor[etapa.tipo];

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-slate-600 transition-colors">
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-500 text-xs font-mono">Etapa {etapa.ordem}</span>
            {etapa.eliminatoria && (
              <span className="bg-red-600/20 text-red-400 border border-red-600/30 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase">
                Eliminatória
              </span>
            )}
            {etapa.peso !== undefined && (
              <span className="bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded text-[10px]">
                Peso: {etapa.peso}
              </span>
            )}
          </div>
          <p className="text-white font-medium text-sm mt-1">{etapa.descricao}</p>
        </div>
      </div>

      {(etapa.data || etapa.local) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          {etapa.data && (
            <div>
              <p className="text-slate-500 text-[10px] uppercase tracking-wider">Data</p>
              <p className="text-blue-400 text-xs font-medium">
                {new Date(etapa.data).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </p>
            </div>
          )}
          {etapa.local && (
            <div>
              <p className="text-slate-500 text-[10px] uppercase tracking-wider">Local</p>
              <p className="text-slate-300 text-xs">{etapa.local}</p>
            </div>
          )}
        </div>
      )}

      {etapa.detalhes && (
        <p className="text-slate-400 text-xs leading-relaxed border-t border-slate-700/50 pt-3">{etapa.detalhes}</p>
      )}
    </div>
  );
}
