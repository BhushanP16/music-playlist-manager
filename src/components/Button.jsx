const variants = {
  primary:
    'bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400',
  secondary: 'bg-white/10 text-slate-100 hover:bg-white/15',
  ghost: 'text-slate-300 hover:bg-white/10 hover:text-white',
  danger: 'bg-red-500 text-white hover:bg-red-400',
  dangerSoft: 'bg-red-500/10 text-red-300 hover:bg-red-500/20',
};

const sizes = {
  sm: 'rounded-xl px-3 py-1.5 text-sm',
  md: 'rounded-xl px-4 py-2.5 text-sm',
  icon: 'h-9 w-9 shrink-0 rounded-xl',
  play: 'h-12 w-12 shrink-0 rounded-full',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  children,
  className = '',
  ...props
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 font-medium transition active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:pointer-events-none disabled:opacity-40 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'md' ? 18 : 16} />}
      {children}
    </button>
  );
}