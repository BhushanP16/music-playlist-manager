import { ListMusic, Pencil, Trash2 } from 'lucide-react';
import Button from './Button';
import Cover from './Cover';
import { summarize } from '../utils/format';

export default function PlaylistCard({ playlist, songs, onOpen, onRename, onDelete }) {
  return (
    <li className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-2 transition hover:border-emerald-500/30 hover:bg-white/[0.06]">
      <button
        type="button"
        onClick={onOpen}
        className="flex min-w-0 flex-1 items-center gap-3 rounded-xl p-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        <Cover seed={playlist.id} size="lg" icon={ListMusic} />
        <div className="min-w-0">
          <p className="truncate font-semibold text-white">{playlist.name}</p>
          <p className="text-xs text-slate-400">{summarize(songs)}</p>
        </div>
      </button>
      <Button variant="ghost" size="icon" aria-label={`Rename ${playlist.name}`} onClick={onRename}>
        <Pencil size={16} />
      </Button>
      <Button variant="ghost" size="icon" aria-label={`Delete ${playlist.name}`} onClick={onDelete}>
        <Trash2 size={16} />
      </Button>
    </li>
  );
}