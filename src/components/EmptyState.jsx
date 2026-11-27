export default function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="flex flex-col items-center px-4 py-10 text-center">
      <div className="mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-slate-800 text-slate-400">
        <Icon size={26} />
      </div>
      <h3 className="font-semibold text-white">{title}</h3>
      {text && <p className="mt-1 max-w-xs text-sm text-slate-400">{text}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}