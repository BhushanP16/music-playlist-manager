import { Check, ListMusic, Plus } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import Cover from './Cover';
import EmptyState from './EmptyState';

export default function AddToPlaylistModal({ song, playlists, onAdd, onCreate, onClose }) {
  return (
    <Modal title="Add to playlist" onClose={onClose}>
      <div className="mb-4 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
        <Cover seed={song.id} size="sm" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{song.title}</p>
          <p className="truncate text-xs text-slate-400">{song.artist}</p>
        </div>
      </div>

      {playlists.length === 0 ? (
        <EmptyState
          icon={ListMusic}
          title="No playlists yet"
          text="Create a playlist first, then add this song."
          action={<Button icon={Plus} onClick={onCreate}>New playlist</Button>}
        />
      ) : (
        <ul className="max-h-72 space-y-1 overflow-y-auto">
          {playlists.map((p) => {
            const added = p.songIds.includes(song.id); 
            return (
              <li
                key={p.id}
                className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 hover:bg-white/5"
              >
                <span className="truncate text-sm text-white">{p.name}</span>
                {added ? (
                  <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-emerald-400">
                    <Check size={14} /> Added
                  </span>
                ) : (
                  <Button size="sm" variant="secondary" onClick={() => onAdd(p.id, song.id)}>
                    Add
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Modal>
  );
}