import { renderHook, act } from '@testing-library/react';
import { usePlaylists } from './usePlaylists';
import { curatedPlaylists } from '../data/curatedPlaylists';
import { describe, it, expect, beforeEach } from 'vitest';

describe('usePlaylists', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty playlists', () => {
    const { result } = renderHook(() => usePlaylists());
    expect(result.current.playlists).toEqual([]);
  });

  it('should create a custom playlist and save to localStorage', () => {
    const { result } = renderHook(() => usePlaylists());
    act(() => {
      result.current.createPlaylist('Evening Prayers');
    });

    expect(result.current.playlists).toHaveLength(1);
    expect(result.current.playlists[0].name).toBe('Evening Prayers');
    expect(JSON.parse(localStorage.getItem('aarti-playlists')!)).toHaveLength(1);
  });

  it('should import a curated playlist correctly', () => {
    const { result } = renderHook(() => usePlaylists());
    const morningCurated = curatedPlaylists[0];

    act(() => {
      result.current.addCuratedPlaylist(morningCurated);
    });

    expect(result.current.playlists).toHaveLength(1);
    expect(result.current.playlists[0].name).toBe(morningCurated.name);
    expect(result.current.playlists[0].aartiIds).toEqual(morningCurated.aartiIds);
    expect(result.current.isCuratedPlaylistAdded(morningCurated.name)).toBe(true);
  });

  it('should rename an existing playlist', () => {
    const { result } = renderHook(() => usePlaylists());
    act(() => {
      result.current.createPlaylist('Old Name');
    });

    const playlistId = result.current.playlists[0].id;
    act(() => {
      result.current.updatePlaylist(playlistId, { name: 'New Festive Name' });
    });

    expect(result.current.playlists[0].name).toBe('New Festive Name');
    const stored = JSON.parse(localStorage.getItem('aarti-playlists')!);
    expect(stored[0].name).toBe('New Festive Name');
  });
});
