import { getConcursoById } from "@/lib/supabase/queries";
import { concursos as staticConcursos } from "@/lib/data-concursos";
import ConcursoDetail from "./ConcursoDetail";

export default async function ConcursoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let concurso = null;

  // Tenta buscar no Supabase se configurado
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      concurso = await getConcursoById(id);
    } catch {
      // Supabase indisponível — usa dados estáticos
    }
  }

  // Fallback para dados estáticos
  if (!concurso) {
    concurso = staticConcursos.find((c) => c.id === id) ?? null;
  }

  return <ConcursoDetail concurso={concurso} />;
}
