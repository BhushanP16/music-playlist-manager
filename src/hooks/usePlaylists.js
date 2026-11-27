import { useEffect, useState } from 'react';

const STORAGE_KEY = 'mpm_playlists_v1';

const read = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const uid = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export default function usePlaylists() {
 
  const [playlists, setPlaylists] = useState(read);

 
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
  }, [playlists]);

  
  const validateName = (name, excludeId = null) => {
    const trimmed = name.trim();
    if (!trimmed) return 'Playlist name is required.';
    const duplicate = playlists.some(
      (p) => p.id !== excludeId && p.name.toLowerCase() === trimmed.toLowerCase()
    );
    return duplicate ? 'A playlist with this name already exists.' : null;
  };

  const create = (name) => {
    const error = validateName(name);
    if (error) return error;
    setPlaylists((prev) => [...prev, { id: uid(), name: name.trim(), songIds: [] }]);
    return null;
  };

  const rename = (id, name) => {
    const error = validateName(name, id);
    if (error) return error;
    setPlaylists((prev) => prev.map((p) => (p.id === id ? { ...p, name: name.trim() } : p)));
    return null;
  };

  const remove = (id) => setPlaylists((prev) => prev.filter((p) => p.id !== id));

  const addSong = (playlistId, songId) => {
    const playlist = playlists.find((p) => p.id === playlistId);
    if (!playlist) return 'Playlist not found.';
    if (playlist.songIds.includes(songId)) return 'Song is already in this playlist.';
    setPlaylists((prev) =>
      prev.map((p) => (p.id === playlistId ? { ...p, songIds: [...p.songIds, songId] } : p))
    );
    return null;
  };

  const removeSong = (playlistId, songId) =>
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId ? { ...p, songIds: p.songIds.filter((id) => id !== songId) } : p
      )
    );

 
  const moveSong = (playlistId, songId, direction) =>
    setPlaylists((prev) =>
      prev.map((p) => {
        if (p.id !== playlistId) return p;
        const from = p.songIds.indexOf(songId);
        const to = from + direction;
        if (from === -1 || to < 0 || to >= p.songIds.length) return p;
        const ids = [...p.songIds];
        [ids[from], ids[to]] = [ids[to], ids[from]];
        return { ...p, songIds: ids };
      })
    );

  return { playlists, create, rename, remove, addSong, removeSong, moveSong };
}