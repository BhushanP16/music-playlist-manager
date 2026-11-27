export default function Input({ label, error, icon: Icon, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-slate-300">{label}</span>}
      <span className="relative block">
        {Icon && (
          <Icon
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
        )}
        <input
          className={`w-full rounded-xl border bg-white/5 py-2.5 pr-3 text-sm text-white placeholder:text-slate-500 transition focus:bg-white/[0.07] focus:outline-none focus:ring-2 ${
            Icon ? 'pl-10' : 'pl-3'
          } ${
            error
              ? 'border-red-500/70 focus:ring-red-500/30'
              : 'border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20'
          } ${className}`}
          {...props}
        />
      </span>
      {error && <span className="mt-1.5 block text-xs text-red-400">{error}</span>}
    </label>
  );
}