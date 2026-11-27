import { Pause, Play, SkipBack, SkipForward, Music } from 'lucide-react';
import Button from './Button';
import Cover from './Cover';
import Equalizer from './Equalizer';
import { formatDuration } from '../utils/format';

export default function PlayerBar({ current, isPlaying, elapsed, onToggle, onNext, onPrev }) {
  const percent = current ? Math.min(100, (elapsed / current.duration) * 100) : 0;
  const time = current
    ? `${formatDuration(Math.min(elapsed, current.duration))} / ${formatDuration(current.duration)}`
    : '00:00 / 00:00';

  return (
    <footer className="fixed inset-x-0 bottom-0 z-30 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:px-4 sm:pb-4">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 shadow-2xl shadow-black/60 backdrop-blur-xl">
        
        <div className="h-1 bg-white/10">
          <div
            className="h-full bg-emerald-400 transition-[width] duration-1000 ease-linear"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex items-center gap-3 p-3 sm:px-5">
          
          <div className="flex min-w-0 flex-1 items-center gap-3 md:w-1/3 md:flex-none">
            {current ? (
              <Cover seed={current.id} size="md" />
            ) : (
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/5 text-slate-500">
                <Music size={20} />
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {current ? current.title : 'Nothing playing'}
              </p>
              <p className="truncate text-xs text-slate-400">
                {current ? current.artist : 'Pick a song to start'}
              </p>
            </div>
            {current && isPlaying && (
              <span className="hidden sm:block">
                <Equalizer />
              </span>
            )}
          </div>

          
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" aria-label="Previous" onClick={onPrev} disabled={!current}>
              <SkipBack size={20} />
            </Button>
            <Button
              size="play"
              aria-label={isPlaying ? 'Pause' : 'Play'}
              onClick={onToggle}
              disabled={!current}
            >
              {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Next" onClick={onNext} disabled={!current}>
              <SkipForward size={20} />
            </Button>
          </div>

          
          <div className="hidden text-right text-xs tabular-nums text-slate-400 md:block md:w-1/3">
            {time}
          </div>
        </div>
      </div>
    </footer>
  );
}