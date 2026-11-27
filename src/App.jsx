import { useMemo, useRef, useState } from 'react';
import { ListMusic, Library as LibraryIcon, Music } from 'lucide-react';
import useSongs from './hooks/useSongs';
import usePlaylists from './hooks/usePlaylists';
import usePlayer from './hooks/usePlayer';
import Hero from './components/Hero';
import Toast from './components/Toast';
import LibrarySection from './components/LibrarySection';
import PlaylistsSection from './components/PlaylistsSection';
import PlaylistDetail from './components/PlaylistDetail';
import PlayerBar from './components/PlayerBar';
import PlaylistFormModal from './components/PlaylistFormModal';
import ConfirmModal from './components/ConfirmModal';
import AddToPlaylistModal from './components/AddToPlaylistModal';

export default function App() {
  const { songs, loading, error, reload } = useSongs();
  const pl = usePlaylists();
  const player = usePlayer();

  const [tab, setTab] = useState('library'); 
  const [selectedId, setSelectedId] = useState(null);
  const [modal, setModal] = useState(null); 
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const closeModal = () => setModal(null);

  const notify = (message, type = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };

  const songMap = useMemo(() => new Map(songs.map((s) => [s.id, s])), [songs]);
  const totalSeconds = useMemo(() => songs.reduce((sum, s) => sum + s.duration, 0), [songs]);
  const selected = pl.playlists.find((p) => p.id === selectedId) ?? null;
  const selectedSongs = selected ? selected.songIds.map((id) => songMap.get(id)).filter(Boolean) : [];

  
  const handlePlay = (list, index) => {
    if (player.current?.id === list[index].id) player.toggle();
    else player.playQueue(list, index);
  };

  
  const handleCreate = (name) => {
    const err = pl.create(name);
    if (!err) {
      notify(`Playlist "${name.trim()}" created`);
      setTab('playlists');
    }
    return err;
  };

  const handleRename = (id, name) => {
    const err = pl.rename(id, name);
    if (!err) notify('Playlist renamed');
    return err;
  };

  const handleDelete = (playlist) => {
    pl.remove(playlist.id);
    if (selectedId === playlist.id) setSelectedId(null);
    notify(`"${playlist.name}" deleted`);
  };

  const handleAddSong = (playlistId, songId) => {
    const err = pl.addSong(playlistId, songId);
    const name = pl.playlists.find((p) => p.id === playlistId)?.name;
    if (err) notify(err, 'error');
    else notify(`Added to "${name}"`);
  };

  const tabs = [
    { id: 'library', label: 'Library', icon: LibraryIcon, count: songs.length },
    { id: 'playlists', label: 'Playlists', icon: ListMusic, count: pl.playlists.length },
  ];
  const hiddenOnMobile = (id) => (tab === id ? '' : 'hidden lg:block');

  return (
    <div className="min-h-screen text-slate-100">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/30">
            <Music size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight text-white">Playlist Manager</h1>
            <p className="text-xs text-slate-400">Build and organise your music</p>
          </div>
        </div>
      </header>

      <Toast toast={toast} />

      <main className="mx-auto max-w-7xl px-4 pb-40 pt-6 sm:px-6">
        <Hero
          loading={loading}
          songCount={songs.length}
          playlistCount={pl.playlists.length}
          totalSeconds={totalSeconds}
          onCreate={() => setModal({ type: 'create' })}
        />

        
        <div className="mb-4 grid grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-white/5 p-1 lg:hidden">
          {tabs.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              aria-pressed={tab === id}
              className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                tab === id ? 'bg-emerald-500 text-emerald-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon size={16} /> {label}
              <span
                className={`rounded-full px-1.5 text-xs tabular-nums ${
                  tab === id ? 'bg-emerald-950/20' : 'bg-white/10'
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <LibrarySection
            className={hiddenOnMobile('library')}
            songs={songs}
            loading={loading}
            error={error}
            onRetry={reload}
            current={player.current}
            isPlaying={player.isPlaying}
            onPlay={handlePlay}
            onAdd={(song) => setModal({ type: 'add', song })}
          />

          {/* desktop: right column stays visible while the library scrolls */}
          <div className={`${hiddenOnMobile('playlists')} lg:sticky lg:top-24 lg:self-start`}>
            {selected ? (
              <PlaylistDetail
                className="lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto"
                playlist={selected}
                songs={selectedSongs}
                current={player.current}
                isPlaying={player.isPlaying}
                onBack={() => setSelectedId(null)}
                onRename={() => setModal({ type: 'rename', playlist: selected })}
                onDelete={() => setModal({ type: 'delete', playlist: selected })}
                onPlay={handlePlay}
                onRemove={(songId) => {
                  pl.removeSong(selected.id, songId);
                  notify('Song removed');
                }}
                onMove={(songId, dir) => pl.moveSong(selected.id, songId, dir)}
                onBrowse={() => setTab('library')}
              />
            ) : (
              <PlaylistsSection
                className="lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto"
                playlists={pl.playlists}
                songMap={songMap}
                onCreate={() => setModal({ type: 'create' })}
                onOpen={setSelectedId}
                onRename={(playlist) => setModal({ type: 'rename', playlist })}
                onDelete={(playlist) => setModal({ type: 'delete', playlist })}
              />
            )}
          </div>
        </div>
      </main>

      <PlayerBar
        current={player.current}
        isPlaying={player.isPlaying}
        elapsed={player.elapsed}
        onToggle={player.toggle}
        onNext={player.next}
        onPrev={player.prev}
      />

      
      {modal?.type === 'create' && (
        <PlaylistFormModal title="Create playlist" submitLabel="Create" onSubmit={handleCreate} onClose={closeModal} />
      )}
      {modal?.type === 'rename' && (
        <PlaylistFormModal
          title="Rename playlist"
          submitLabel="Save"
          initialName={modal.playlist.name}
          onSubmit={(name) => handleRename(modal.playlist.id, name)}
          onClose={closeModal}
        />
      )}
      {modal?.type === 'delete' && (
        <ConfirmModal
          title="Delete playlist?"
          message={`"${modal.playlist.name}" will be permanently deleted. This cannot be undone.`}
          onConfirm={() => handleDelete(modal.playlist)}
          onClose={closeModal}
        />
      )}
      {modal?.type === 'add' && (
        <AddToPlaylistModal
          song={modal.song}
          playlists={pl.playlists}
          onAdd={handleAddSong}
          onCreate={() => setModal({ type: 'create' })}
          onClose={closeModal}
        />
      )}
    </div>
  );
}