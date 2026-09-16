import { useState, useEffect, useCallback } from 'react';

const MAX_RECENTS = 10;

export function useRecentAartis() {
  const [recentAartis, setRecentAartis] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('aarti_recents');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('aarti_recents', JSON.stringify(recentAartis));
  }, [recentAartis]);

  const addRecent = useCallback((id: string) => {
    setRecentAartis(prev => {
      if (prev[0] === id) return prev;
      const filtered = prev.filter(fId => fId !== id);
      return [id, ...filtered].slice(0, MAX_RECENTS);
    });
  }, []);

  const clearRecents = useCallback(() => {
    setRecentAartis([]);
  }, []);

  return { recentAartis, addRecent, clearRecents };
}
