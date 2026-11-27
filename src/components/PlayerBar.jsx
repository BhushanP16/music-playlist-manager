import { Music, Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import Button from './Button';
import { formatDuration } from '../utils/format';

export default function PlayerBar({ current, isPlaying, elapsed, onToggle, onNext, onPrev }) {
  const percent = current ? Math.min(100, (elapsed / current.duration) * 100) : 0;

  return (
    <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800 bg-slate-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      
      <div className="h-1 bg-slate-800">
        <div
          className="h-full bg-emerald-500 transition-[width] duration-1000 ease-linear"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 text-white">
            <Music size={20} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {current ? current.title : 'Nothing playing'}
            </p>
            <p className="truncate text-xs text-slate-400">
              {current ? current.artist : 'Pick a song to start'}
            </p>
          </div>
        </div>

       
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" aria-label="Previous" onClick={onPrev} disabled={!current}>
            <SkipBack size={20} />
          </Button>
          <Button
            size="icon"
            className="!h-11 !w-11 !rounded-full"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            onClick={onToggle}
            disabled={!current}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </Button>
          <Button variant="ghost" size="icon" aria-label="Next" onClick={onNext} disabled={!current}>
            <SkipForward size={20} />
          </Button>
        </div>

        
        <div className="hidden flex-1 text-right text-xs tabular-nums text-slate-400 md:block">
          {current ? `${formatDuration(Math.min(elapsed, current.duration))} / ${formatDuration(current.duration)}` : '00:00 / 00:00'}
        </div>
      </div>
    </footer>
  );
}