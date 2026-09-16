import { renderHook, act } from '@testing-library/react';
import { useAutoScroll } from './useAutoScroll';
import { describe, it, expect, vi } from 'vitest';

describe('useAutoScroll', () => {
  it('should initialize correctly', () => {
    const { result } = renderHook(() => useAutoScroll(3, true));
    expect(result.current.isScrolling).toBe(false);
    expect(result.current.isPausedByManualScroll).toBe(false);
  });

  it('should start scrolling when toggleScroll is called', () => {
    const { result } = renderHook(() => useAutoScroll(3, true));
    
    act(() => {
      result.current.toggleScroll();
    });

    expect(result.current.isScrolling).toBe(true);
  });

  it('should pause scrolling when toggleScroll is called again', () => {
    const { result } = renderHook(() => useAutoScroll(3, true));
    
    act(() => {
      result.current.toggleScroll(); // start
    });
    
    act(() => {
      result.current.toggleScroll(); // pause
    });

    expect(result.current.isScrolling).toBe(false);
  });
});
