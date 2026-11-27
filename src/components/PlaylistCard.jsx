import { ListMusic, Pencil, Trash2 } from 'lucide-react';
import Button from './Button';
import { summarize } from '../utils/format';

export default function PlaylistCard({ playlist, songs, onOpen, onRename, onDelete }) {
  return (
    <li className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 p-2 transition hover:border-slate-700">
      <button
        type="button"
        onClick={onOpen}
        className="flex min-w-0 flex-1 items-center gap-3 rounded-lg p-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 text-white">
          <ListMusic size={22} />
        </div>
        <div className="min-w-0">
          <p className="truncate font-medium text-white">{playlist.name}</p>
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