export default function SongSkeleton({ rows = 6 }) {
  return (
    <ul className="space-y-1" aria-busy="true" aria-label="Loading songs">
      {Array.from({ length: rows }).map((_, i) => (
        <li key={i} className="flex animate-pulse items-center gap-3 px-3 py-2.5">
          <div className="h-10 w-10 rounded-lg bg-slate-800" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-2/5 rounded bg-slate-800" />
            <div className="h-3 w-1/4 rounded bg-slate-800" />
          </div>
          <div className="h-3 w-10 rounded bg-slate-800" />
        </li>
      ))}
    </ul>
  );
}