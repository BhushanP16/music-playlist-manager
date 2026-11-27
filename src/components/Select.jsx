import { ChevronDown } from 'lucide-react';

export default function Select({ options, className = '', ...props }) {
  return (
    <span className={`relative block ${className}`}>
      <select
        className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 py-2.5 pl-3 pr-9 text-sm text-white transition focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 [&>option]:bg-slate-900"
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </span>
  );
}