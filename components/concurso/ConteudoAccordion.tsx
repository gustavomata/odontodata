"use client";
import type { BlocoConteudo } from "@/lib/data-concursos";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { useState } from "react";

function BlocoItem({ bloco, defaultOpen }: { bloco: BlocoConteudo; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-3">
          <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="text-white font-medium text-sm text-left">{bloco.disciplina}</span>
          <span className="text-slate-500 text-xs">{bloco.topicos.length} tópicos</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-slate-700/30">
          <ol className="mt-3 space-y-1.5">
            {bloco.topicos.map((t, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-slate-600 text-xs font-mono mt-0.5 shrink-0 w-5 text-right">{i + 1}.</span>
                <span className="text-slate-300 text-xs leading-relaxed">{t}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default function ConteudoAccordion({ blocos }: { blocos: BlocoConteudo[] }) {
  return (
    <div className="space-y-2">
      {blocos.map((b, i) => (
        <BlocoItem key={i} bloco={b} defaultOpen={i === blocos.length - 1} />
      ))}
    </div>
  );
}
