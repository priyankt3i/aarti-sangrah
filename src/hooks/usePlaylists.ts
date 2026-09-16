import { useState, useEffect, useCallback } from 'react';
import { Playlist } from '../types';
import { curatedPlaylists, CuratedPlaylist } from '../data/curatedPlaylists';

export function usePlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    try {
      const saved = localStorage.getItem('aarti-playlists');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse playlists from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('aarti-playlists', JSON.stringify(playlists));
  }, [playlists]);

  const createPlaylist = useCallback((name: string, aartiIds: string[] = []) => {
    const newPlaylist: Playlist = {
      id: `pl_${Date.now()}`,
      name,
      aartiIds,
      createdAt: Date.now()
    };
    setPlaylists(prev => [...prev, newPlaylist]);
    return newPlaylist;
  }, []);

  const addCuratedPlaylist = useCallback((curated: CuratedPlaylist) => {
    // Check if user already has a playlist with this name
    const existing = playlists.find(p => p.name.toLowerCase() === curated.name.toLowerCase());
    if (existing) {
      return existing;
    }
    const newPlaylist: Playlist = {
      id: `pl_${Date.now()}`,
      name: curated.name,
      aartiIds: [...curated.aartiIds],
      createdAt: Date.now()
    };
    setPlaylists(prev => [...prev, newPlaylist]);
    return newPlaylist;
  }, [playlists]);

  const isCuratedPlaylistAdded = useCallback((curatedName: string) => {
    return playlists.some(p => p.name.toLowerCase() === curatedName.toLowerCase());
  }, [playlists]);

  const updatePlaylist = useCallback((id: string, updates: Partial<Playlist>) => {
    setPlaylists(prev => prev.map(pl => pl.id === id ? { ...pl, ...updates } : pl));
  }, []);

  const deletePlaylist = useCallback((id: string) => {
    setPlaylists(prev => prev.filter(pl => pl.id !== id));
  }, []);

  const getPlaylist = useCallback((id: string) => {
    const userPl = playlists.find(pl => pl.id === id);
    if (userPl) return userPl;

    // Check if it matches a curated playlist
    const curated = curatedPlaylists.find(cp => cp.id === id);
    if (curated) {
      return {
        id: curated.id,
        name: curated.name,
        aartiIds: curated.aartiIds,
        createdAt: 0
      };
    }
    return undefined;
  }, [playlists]);

  return { 
    playlists, 
    createPlaylist, 
    addCuratedPlaylist,
    isCuratedPlaylistAdded,
    updatePlaylist, 
    deletePlaylist, 
    getPlaylist 
  };
}

