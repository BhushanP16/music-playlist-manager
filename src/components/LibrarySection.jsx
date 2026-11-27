import { useMemo, useRef, useState } from 'react';
import { Plus, Search, SearchX } from 'lucide-react';
import Panel from './Panel';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import SongRow from './SongRow';
import SongSkeleton from './SongSkeleton';
import EmptyState from './EmptyState';
import Pagination from './Pagination';

const PAGE_SIZE = 10;

const SORT_OPTIONS = [
  { value: 'default', label: 'Default order' },
  { value: 'title', label: 'Title (A–Z)' },
  { value: 'artist', label: 'Artist (A–Z)' },
  { value: 'short', label: 'Shortest first' },
  { value: 'long', label: 'Longest first' },
];

const SORTERS = {
  title: (a, b) => a.title.localeCompare(b.title),
  artist: (a, b) => a.artist.localeCompare(b.artist),
  short: (a, b) => a.duration - b.duration,
  long: (a, b) => b.duration - a.duration,
};

export default function LibrarySection({
  songs, loading, error, onRetry, current, isPlaying, onPlay, onAdd, className = '',
}) {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('All');
  const [sort, setSort] = useState('default');
  const [page, setPage] = useState(1);
  const topRef = useRef(null);

  const genres = useMemo(() => ['All', ...new Set(songs.map((s) => s.genre))], [songs]);

  // search + genre filter + sort
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = songs.filter(
      (s) =>
        (genre === 'All' || s.genre === genre) &&
        (!q || s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q))
    );
    return SORTERS[sort] ? [...list].sort(SORTERS[sort]) : list;
  }, [songs, query, genre, sort]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  // every filter change goes back to page 1
  const changeQuery = (v) => { setQuery(v); setPage(1); };
  const changeGenre = (v) => { setGenre(v); setPage(1); };
  const changeSort = (v) => { setSort(v); setPage(1); };
  const clearFilters = () => { setQuery(''); setGenre('All'); setSort('default'); setPage(1); };

  const goToPage = (p) => {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isFiltered = query.trim() !== '' || genre !== 'All';
  const subtitle = loading
    ? 'Loading…'
    : filtered.length === 0
      ? `0 of ${songs.length} songs`
      : `Showing ${start + 1}–${start + visible.length} of ${filtered.length}${
          isFiltered ? ` (${songs.length} total)` : ' songs'
        }`;

  return (
    <Panel title="Song Library" subtitle={subtitle} className={className}>
      <div ref={topRef} className="scroll-mt-24" />

      <div className="mb-4 space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex-1">
            <Input
              icon={Search}
              type="search"
              placeholder="Search by title or artist"
              aria-label="Search songs"
              value={query}
              onChange={(e) => changeQuery(e.target.value)}
            />
          </div>
          <Select
            className="sm:w-44"
            aria-label="Sort songs"
            options={SORT_OPTIONS}
            value={sort}
            onChange={(e) => changeSort(e.target.value)}
          />
        </div>

        {/* chips scroll inside their own container -> no page horizontal scroll */}
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter by genre">
          {genres.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => changeGenre(g)}
              aria-pressed={genre === g}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                genre === g
                  ? 'border-emerald-400 bg-emerald-500 text-emerald-950'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <SongSkeleton rows={PAGE_SIZE} />
      ) : error ? (
        <EmptyState
          icon={SearchX}
          title="Something went wrong"
          text={error}
          action={<Button onClick={onRetry}>Retry</Button>}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No results found"
          text="Try a different search term or genre."
          action={<Button variant="secondary" onClick={clearFilters}>Clear filters</Button>}
        />
      ) : (
        <>
          <ul className="space-y-1">
            {visible.map((song, i) => (
              <SongRow
                key={song.id}
                song={song}
                isActive={current?.id === song.id}
                isPlaying={isPlaying}
                onPlay={() => onPlay(filtered, start + i)}
                actions={
                  <Button variant="ghost" size="icon" aria-label={`Add ${song.title} to playlist`} onClick={() => onAdd(song)}>
                    <Plus size={18} />
                  </Button>
                }
              />
            ))}
          </ul>
          <Pagination page={safePage} totalPages={totalPages} onChange={goToPage} />
        </>
      )}
    </Panel>
  );
}