import { ArrowLeft, ChevronDown, ChevronUp, ListMusic, Music, Pencil, Play, Trash2, X } from 'lucide-react';
import Panel from './Panel';
import Button from './Button';
import Cover from './Cover';
import SongRow from './SongRow';
import EmptyState from './EmptyState';
import { summarize } from '../utils/format';

export default function PlaylistDetail({
  playlist, songs, current, isPlaying, onBack, onRename, onDelete,
  onPlay, onRemove, onMove, onBrowse, className = '',
}) {
  return (
    <Panel className={className}>
      <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={onBack} className="-ml-2">
        All playlists
      </Button>

      <div className="mt-3 flex items-center gap-4">
        <Cover seed={playlist.id} size="xl" icon={ListMusic} />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Playlist</p>
          <h2 className="truncate text-xl font-bold text-white sm:text-2xl">{playlist.name}</h2>
          <p className="text-sm text-slate-400">{summarize(songs)}</p>
        </div>
      </div>

      <div className="mb-4 mt-5 flex flex-wrap gap-2">
        <Button size="sm" icon={Play} disabled={songs.length === 0} onClick={() => onPlay(songs, 0)}>
          Play all
        </Button>
        <Button variant="secondary" size="sm" icon={Pencil} onClick={onRename}>
          Rename
        </Button>
        <Button variant="dangerSoft" size="sm" icon={Trash2} onClick={onDelete}>
          Delete
        </Button>
      </div>

      {songs.length === 0 ? (
        <EmptyState
          icon={Music}
          title="This playlist is empty"
          text="Add songs from the Song Library using the + button."
          action={
            <Button variant="secondary" className="lg:hidden" onClick={onBrowse}>
              Browse library
            </Button>
          }
        />
      ) : (
        <ul className="space-y-1">
          {songs.map((song, i) => (
            <SongRow
              key={song.id}
              song={song}
              isActive={current?.id === song.id}
              isPlaying={isPlaying}
              onPlay={() => onPlay(songs, i)}
              actions={
                <>
                  <Button variant="ghost" size="icon" aria-label="Move up" disabled={i === 0} onClick={() => onMove(song.id, -1)}>
                    <ChevronUp size={18} />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Move down" disabled={i === songs.length - 1} onClick={() => onMove(song.id, 1)}>
                    <ChevronDown size={18} />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Remove from playlist" onClick={() => onRemove(song.id)}>
                    <X size={18} />
                  </Button>
                </>
              }
            />
          ))}
        </ul>
      )}
    </Panel>
  );
}