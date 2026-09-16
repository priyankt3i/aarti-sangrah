import { renderHook, act } from '@testing-library/react';
import { usePreferences } from './usePreferences';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('usePreferences', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with default preferences', () => {
    const { result } = renderHook(() => usePreferences());
    expect(result.current.preferences.language).toBe('hi');
    expect(result.current.preferences.fontSize).toBe(20);
  });

  it('should update preference and persist to localStorage', () => {
    const { result } = renderHook(() => usePreferences());
    
    act(() => {
      result.current.updatePreference('language', 'mr');
    });

    expect(result.current.preferences.language).toBe('mr');
    const stored = JSON.parse(localStorage.getItem('aarti_preferences')!);
    expect(stored.language).toBe('mr');
  });

  it('should handle LocalStorage error gracefully by returning defaults', () => {
    // Simulate error by mocking getItem
    const mockGetItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Simulated Error');
    });

    const { result } = renderHook(() => usePreferences());
    expect(result.current.preferences.language).toBe('hi');

    mockGetItem.mockRestore();
  });
});
