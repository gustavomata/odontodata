import type { Remuneracao } from "@/lib/data-concursos";
import { DollarSign, Gift, TrendingUp } from "lucide-react";

function formatVal(v: number | string): string {
  if (typeof v === "number") return `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  return v;
}

export default function RemuneracaoBreakdown({ remuneracao }: { remuneracao: Remuneracao }) {
  const { vencimentoBase, gratificacoes, beneficios, totalEstimado, observacao } = remuneracao;

  return (
    <div className="space-y-6">
      {/* Total destaque */}
      <div className="bg-emerald-600/10 border border-emerald-600/30 rounded-xl p-5 text-center">
        <p className="text-emerald-400/80 text-xs uppercase tracking-wider font-medium mb-1">Remuneração Total Estimada</p>
        <p className="text-emerald-400 text-4xl font-bold">R$ {totalEstimado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
      </div>

      {/* Vencimento base */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-4 h-4 text-blue-400" />
          <h3 className="text-white font-semibold text-sm">Vencimento Base</h3>
        </div>
        <p className="text-blue-400 text-2xl font-bold">R$ {vencimentoBase.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
      </div>

      {/* Gratificações */}
      {gratificacoes.length > 0 && (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <h3 className="text-white font-semibold text-sm">Gratificações</h3>
          </div>
          <div className="space-y-2">
            {gratificacoes.map((g, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-slate-700/30 last:border-0">
                <span className="text-slate-300 text-xs flex-1 pr-4">{g.descricao}</span>
                <span className="text-amber-400 font-medium text-sm whitespace-nowrap">{formatVal(g.valor)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Benefícios */}
      {beneficios.length > 0 && (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Gift className="w-4 h-4 text-purple-400" />
            <h3 className="text-white font-semibold text-sm">Benefícios</h3>
          </div>
          <div className="space-y-2">
            {beneficios.map((b, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-slate-700/30 last:border-0">
                <span className="text-slate-300 text-xs flex-1 pr-4">{b.descricao}</span>
                <span className="text-purple-400 font-medium text-sm whitespace-nowrap">{formatVal(b.valor)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Observação */}
      {observacao && (
        <div className="bg-blue-600/5 border border-blue-600/20 rounded-xl p-4">
          <p className="text-slate-400 text-xs leading-relaxed">{observacao}</p>
        </div>
      )}
    </div>
  );
}
