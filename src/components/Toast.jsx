import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Toast({ toast }) {
  if (!toast) return null;
  const isError = toast.type === 'error';
  const Icon = isError ? AlertCircle : CheckCircle2;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-[60] flex justify-center px-4">
      <div
        key={toast.id}
        role="status"
        className={`animate-toast pointer-events-auto flex max-w-full items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium shadow-2xl backdrop-blur-xl ${
          isError
            ? 'border-red-500/30 bg-red-950/80 text-red-200'
            : 'border-emerald-500/30 bg-emerald-950/80 text-emerald-200'
        }`}
      >
        <Icon size={18} className="shrink-0" />
        <span className="truncate">{toast.message}</span>
      </div>
    </div>
  );
}