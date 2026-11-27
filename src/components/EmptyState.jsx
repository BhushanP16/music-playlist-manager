export default function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-white/10 px-4 py-10 text-center">
      <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
        <Icon size={28} />
      </div>
      <h3 className="font-semibold text-white">{title}</h3>
      {text && <p className="mt-1 max-w-xs text-sm text-slate-400">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}