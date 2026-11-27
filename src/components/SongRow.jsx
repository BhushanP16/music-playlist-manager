import { Play } from 'lucide-react';
import Cover from './Cover';
import Equalizer from './Equalizer';
import { formatDuration } from '../utils/format';

export default function SongRow({ song, isActive, isPlaying, onPlay, actions }) {
  const showEqualizer = isActive && isPlaying;

  return (
    <li
      className={`group flex items-center gap-3 rounded-2xl px-2 py-2 transition sm:px-3 ${
        isActive ? 'bg-emerald-500/10 ring-1 ring-emerald-500/20' : 'hover:bg-white/5'
      }`}
    >
      
      <button
        type="button"
        onClick={onPlay}
        aria-label={showEqualizer ? `Pause ${song.title}` : `Play ${song.title}`}
        className="relative shrink-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        <Cover seed={song.id} size="sm" />
        <span
          className={`absolute inset-0 grid place-items-center rounded-xl bg-black/55 text-white transition [@media(hover:none)]:opacity-100 ${
            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
          }`}
        >
          {showEqualizer ? <Equalizer /> : <Play size={18} fill="currentColor" />}
        </span>
      </button>

      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-semibold ${isActive ? 'text-emerald-400' : 'text-white'}`}>
          {song.title}
        </p>
        <p className="truncate text-xs text-slate-400">{song.artist}</p>
      </div>

      <span className="hidden rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300 md:inline">
        {song.genre}
      </span>
      <span className="w-11 shrink-0 text-right text-xs tabular-nums text-slate-400">
        {formatDuration(song.duration)}
      </span>

      {actions && <div className="flex shrink-0 items-center">{actions}</div>}
    </li>
  );
}