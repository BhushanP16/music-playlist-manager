import { useCallback, useEffect, useState } from 'react';

export default function usePlayer() {
  const [queue, setQueue] = useState([]);
  const [index, setIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const current = queue[index] ?? null;

  const playQueue = useCallback((songs, startIndex) => {
    setQueue(songs);
    setIndex(startIndex);
    setElapsed(0);
    setIsPlaying(true);
  }, []);

  const toggle = useCallback(() => {
    if (current) setIsPlaying((p) => !p);
  }, [current]);

  const next = useCallback(() => {
    if (!queue.length) return;
    setIndex((i) => (i + 1) % queue.length);
    setElapsed(0);
  }, [queue.length]);

  const prev = useCallback(() => {
    if (!queue.length) return;
    
    if (elapsed > 3) {
      setElapsed(0);
      return;
    }
    setIndex((i) => (i - 1 + queue.length) % queue.length);
    setElapsed(0);
  }, [queue.length, elapsed]);

  
  useEffect(() => {
    if (!isPlaying || !current) return;
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, [isPlaying, current]);

  
  useEffect(() => {
    if (current && elapsed >= current.duration) next();
  }, [elapsed, current, next]);

  return { current, isPlaying, elapsed, playQueue, toggle, next, prev };
}