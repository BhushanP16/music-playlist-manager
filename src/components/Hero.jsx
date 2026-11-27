import { Clock, ListMusic, Music, Plus } from 'lucide-react';
import Button from './Button';
import { formatLong } from '../utils/format';

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-3 sm:p-4">
      <Icon size={16} className="mb-2 text-emerald-400" />
      <p className="text-lg font-bold tabular-nums text-white sm:text-2xl">{value}</p>
      <p className="text-[11px] text-slate-400 sm:text-xs">{label}</p>
    </div>
  );
}

export default function Hero({ loading, songCount, playlistCount, totalSeconds, onCreate }) {
  return (
    <section className="animate-fade-up relative mb-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/15 via-slate-900/60 to-violet-500/15 p-5 sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold leading-tight text-white sm:text-4xl">
            Your music, <span className="text-emerald-400">perfectly organised.</span>
          </h2>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            Browse the library, build playlists, reorder tracks and play them in one place.
          </p>
          <Button className="mt-5" icon={Plus} onClick={onCreate}>
            New playlist
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:w-96">
          <Stat icon={Music} label="Songs" value={loading ? '—' : songCount} />
          <Stat icon={ListMusic} label="Playlists" value={playlistCount} />
          <Stat icon={Clock} label="Library time" value={loading ? '—' : formatLong(totalSeconds)} />
        </div>
      </div>
    </section>
  );
}