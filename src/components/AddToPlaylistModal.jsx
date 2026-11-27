import { Check, Plus } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import EmptyState from './EmptyState';
import { ListMusic } from 'lucide-react';

export default function AddToPlaylistModal({ song, playlists, onAdd, onCreate, onClose }) {
  return (
    <Modal title="Add to playlist" onClose={onClose}>
      <p className="mb-3 truncate text-sm text-slate-400">
        {song.title} · {song.artist}
      </p>

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
              <li key={p.id} className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 hover:bg-slate-800/70">
                <span className="truncate text-sm text-white">{p.name}</span>
                {added ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-400">
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