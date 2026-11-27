import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export default function useSongs() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get('/songs.json');
      
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSongs(data);
    } catch {
      setError('Could not load songs. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { songs, loading, error, reload: load };
}