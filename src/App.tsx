/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Routes, Route } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { Playlists } from './pages/Playlists';
import { PlaylistEditor } from './pages/PlaylistEditor';
import { Settings } from './pages/Settings';
import { AartiReader } from './pages/AartiReader';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlists/:id" element={<PlaylistEditor />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/aarti/:lang/:slug" element={<AartiReader />} />
      </Routes>
    </AppShell>
  );
}
