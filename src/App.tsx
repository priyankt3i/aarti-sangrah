/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

import { AppShell } from './components/AppShell';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { Playlists } from './pages/Playlists';
import { PlaylistEditor } from './pages/PlaylistEditor';
import { Settings } from './pages/Settings';
import { AartiReader } from './pages/AartiReader';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    // Configure Native Status Bar & hide Splash Screen
    const initNativeFeatures = async () => {
      try {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#fdfbf7' });
      } catch (e) {
        console.warn('Status bar styling error:', e);
      }

      try {
        await SplashScreen.hide();
      } catch (e) {
        console.warn('Splash screen hide error:', e);
      }
    };

    initNativeFeatures();

    // Handle Android hardware/gesture back button
    const backListenerPromise = CapApp.addListener('backButton', () => {
      if (location.pathname !== '/') {
        navigate(-1);
      } else {
        CapApp.exitApp();
      }
    });

    return () => {
      backListenerPromise.then((handle) => handle.remove()).catch(() => {});
    };
  }, [location.pathname, navigate]);

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
