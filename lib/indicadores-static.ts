// =============================================================================
// OdontoData — Re-export of all static indicadoresGerais per country
// Used as fallback by /api/indicadores when Supabase is unavailable
// =============================================================================

export { indicadoresGerais } from "@/lib/data";
export { indicadoresGeraisUSA } from "@/lib/data-usa";
export { indicadoresGeraisDE } from "@/lib/data-germany";
export { indicadoresGeraisAU } from "@/lib/data-australia";
export { indicadoresGeraisUK } from "@/lib/data-uk";
export { indicadoresGeraisFR } from "@/lib/data-france";
export { indicadoresGeraisCA } from "@/lib/data-canada";
export { indicadoresGeraisJP } from "@/lib/data-japan";
