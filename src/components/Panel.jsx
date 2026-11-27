export default function Panel({ title, subtitle, action, children, className = '' }) {
  return (
    <section
      className={`animate-fade-up rounded-3xl border border-white/10 bg-white/[0.03] p-4 shadow-xl shadow-black/20 backdrop-blur sm:p-6 ${className}`}
    >
      {title && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-white">{title}</h2>
            {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}