interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
}

export default function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {badge && (
        <span className="inline-block bg-blue-600/20 text-blue-400 text-xs font-medium px-3 py-1 rounded-full border border-blue-600/30 mb-3">
          {badge}
        </span>
      )}
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <p className="text-slate-400 mt-1 text-sm">{subtitle}</p>
    </div>
  );
}
