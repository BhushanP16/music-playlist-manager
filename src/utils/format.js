
export const formatDuration = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(Math.floor(seconds % 60)).padStart(2, '0');
  return `${m}:${s}`;
};


export const summarize = (songs) => {
  const total = songs.reduce((sum, s) => sum + s.duration, 0);
  const minutes = Math.round(total / 60);
  return `${songs.length} ${songs.length === 1 ? 'song' : 'songs'} · ${minutes} min`;
};


export const formatLong = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return h ? `${h}h ${m}m` : `${m} min`;
};


const PALETTES = [
  ['#10b981', '#0f766e'],
  ['#8b5cf6', '#4338ca'],
  ['#f43f5e', '#9f1239'],
  ['#f59e0b', '#b45309'],
  ['#0ea5e9', '#1d4ed8'],
  ['#ec4899', '#7e22ce'],
  ['#14b8a6', '#0369a1'],
  ['#f97316', '#be123c'],
];

export const gradientFor = (seed) => {
  let hash = 0;
  for (const ch of String(seed)) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  const [from, to] = PALETTES[hash % PALETTES.length];
  return `linear-gradient(135deg, ${from}, ${to})`;
};