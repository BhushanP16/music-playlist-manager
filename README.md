# Music Playlist Manager

A responsive playlist manager built with React, Tailwind CSS and Axios.

## Live demo
<Vercel URL>

## Features
- Song library with search and genre filter (data loaded via Axios from `public/songs.json`)
- Create, rename, delete playlists (unique, required names; delete confirmation)
- Add/remove songs, no duplicates, reorder with up/down buttons
- Playlist summary, e.g. "8 songs · 32 min"
- Now Playing bar (simulated playback with progress)
- Loading, empty and no-results states
- Fully responsive: 375px, 768px, 1440px
- Playlists persisted in localStorage

## Run locally
npm install
npm run dev

## Build
npm run build

## Assumptions
- Playlist names are compared case-insensitively
- Playback is simulated (no audio); a timer advances the progress bar
- Playlists store song IDs only; song details come from songs.json
- Reordering is done with buttons (simpler and accessible on mobile)

## What I would improve
- Drag-and-drop reordering (dnd-kit)
- Shuffle / repeat, volume and seek bar
- Unit tests (Vitest + React Testing Library)
- Context/Zustand for global state, TypeScript
- Toast notifications and keyboard shortcuts