import { STATUS_LABELS, STATUS_COLORS, type StatusConcurso } from "@/lib/data-concursos";

export default function StatusBadge({ status, size = "sm" }: { status: StatusConcurso; size?: "sm" | "md" }) {
  const sizeClass = size === "md" ? "px-3 py-1.5 text-sm" : "px-2 py-1 text-xs";
  return (
    <span className={`inline-flex items-center rounded-full font-medium border ${STATUS_COLORS[status]} ${sizeClass}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
