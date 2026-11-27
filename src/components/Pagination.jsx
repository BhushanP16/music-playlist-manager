import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';


const getPages = (total, current) => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const wanted = new Set([1, total, current - 1, current, current + 1]);
  const list = [...wanted].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const result = [];
  list.forEach((p, i) => {
    if (i > 0 && p - list[i - 1] > 1) result.push(`gap-${p}`);
    result.push(p);
  });
  return result;
};

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-4">
      <Button
        variant="secondary"
        size="sm"
        icon={ChevronLeft}
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        <span className="hidden sm:inline">Prev</span>
      </Button>

      
      <p className="text-sm text-slate-400 sm:hidden">
        Page <span className="font-semibold text-white">{page}</span> of {totalPages}
      </p>

      
      <ul className="hidden items-center gap-1 sm:flex">
        {getPages(totalPages, page).map((p) =>
          typeof p === 'string' ? (
            <li key={p} className="px-1 text-slate-500" aria-hidden="true">…</li>
          ) : (
            <li key={p}>
              <button
                type="button"
                onClick={() => onChange(p)}
                aria-current={p === page ? 'page' : undefined}
                aria-label={`Page ${p}`}
                className={`h-9 min-w-9 rounded-xl px-2 text-sm font-medium tabular-nums transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  p === page
                    ? 'bg-emerald-500 text-emerald-950'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                {p}
              </button>
            </li>
          )
        )}
      </ul>

      <Button
        variant="secondary"
        size="sm"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </Button>
    </nav>
  );
}