import { Pause, Play } from 'lucide-react';
import { formatDuration } from '../utils/format';

export default function SongRow({ song, isActive, isPlaying, onPlay, actions }) {
  return (
    <li
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${
        isActive ? 'bg-emerald-500/10' : 'hover:bg-slate-800/70'
      }`}
    >
      <button
        type="button"
        onClick={onPlay}
        aria-label={isActive && isPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-slate-800 text-slate-300 transition hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        {isActive && isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>

      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-medium ${isActive ? 'text-emerald-400' : 'text-white'}`}>
          {song.title}
        </p>
        <p className="truncate text-xs text-slate-400">{song.artist}</p>
      </div>

      <span className="hidden rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300 sm:inline">
        {song.genre}
      </span>
      <span className="w-11 shrink-0 text-right text-xs tabular-nums text-slate-400">
        {formatDuration(song.duration)}
      </span>

      {actions && <div className="flex shrink-0 items-center gap-1">{actions}</div>}
    </li>
  );
}