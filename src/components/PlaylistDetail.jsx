import { ArrowLeft, ChevronDown, ChevronUp, Music, Pencil, Play, Trash2, X } from 'lucide-react';
import Panel from './Panel';
import Button from './Button';
import SongRow from './SongRow';
import EmptyState from './EmptyState';
import { summarize } from '../utils/format';

export default function PlaylistDetail({
  playlist, songs, current, isPlaying, onBack, onRename, onDelete,
  onPlay, onRemove, onMove, className = '',
}) {
  return (
    <Panel
      title={playlist.name}
      subtitle={summarize(songs)}
      className={className}
      action={
        <div className="flex shrink-0 gap-1">
          <Button variant="ghost" size="icon" aria-label="Rename playlist" onClick={onRename}>
            <Pencil size={16} />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Delete playlist" onClick={onDelete}>
            <Trash2 size={16} />
          </Button>
        </div>
      }
    >
      <div className="mb-3 flex gap-2">
        <Button variant="secondary" size="sm" icon={ArrowLeft} onClick={onBack}>
          All playlists
        </Button>
        <Button size="sm" icon={Play} disabled={songs.length === 0} onClick={() => onPlay(songs, 0)}>
          Play all
        </Button>
      </div>

      {songs.length === 0 ? (
        <EmptyState
          icon={Music}
          title="This playlist is empty"
          text="Go to the Song Library and tap + to add songs."
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