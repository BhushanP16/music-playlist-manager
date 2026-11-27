import { ListMusic, Plus } from 'lucide-react';
import Panel from './Panel';
import Button from './Button';
import EmptyState from './EmptyState';
import PlaylistCard from './PlaylistCard';

export default function PlaylistsSection({
  playlists, songMap, onCreate, onOpen, onRename, onDelete, className = '',
}) {
  return (
    <Panel
      title="Your Playlists"
      subtitle={`${playlists.length} ${playlists.length === 1 ? 'playlist' : 'playlists'}`}
      className={className}
      action={<Button size="sm" icon={Plus} onClick={onCreate}>New</Button>}
    >
      {playlists.length === 0 ? (
        <EmptyState
          icon={ListMusic}
          title="No playlists yet"
          text="Create your first playlist and start adding songs."
          action={<Button icon={Plus} onClick={onCreate}>Create playlist</Button>}
        />
      ) : (
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {playlists.map((p) => (
            <PlaylistCard
              key={p.id}
              playlist={p}
              songs={p.songIds.map((id) => songMap.get(id)).filter(Boolean)}
              onOpen={() => onOpen(p.id)}
              onRename={() => onRename(p)}
              onDelete={() => onDelete(p)}
            />
          ))}
        </ul>
      )}
    </Panel>
  );
}