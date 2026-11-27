
export const formatDuration = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
};


export const summarize = (songs) => {
  const total = songs.reduce((sum, s) => sum + s.duration, 0);
  const minutes = Math.round(total / 60);
  return `${songs.length} ${songs.length === 1 ? 'song' : 'songs'} · ${minutes} min`;
};