import { useState, useEffect, useCallback } from 'react';
import { Preferences } from '../types';

const defaultPreferences: Preferences = {
  language: 'hi',
  fontSize: 20,
  autoScrollSpeed: 2,
  keepAwake: true,
  reducedMotion: false,
  showTransliteration: false,
};

const PREF_KEY = 'aarti_preferences';
const PREF_EVENT = 'aarti_preferences_changed';

export function usePreferences() {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    try {
      const stored = localStorage.getItem(PREF_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.fontSize === 24) {
          parsed.fontSize = 20;
        }
        return { ...defaultPreferences, ...parsed };
      }
      
      const browserLang = navigator.language.substring(0, 2);
      let defaultLang: Preferences['language'] = 'hi';
      if (['hi', 'mr', 'gu', 'bn'].includes(browserLang)) {
        defaultLang = browserLang as Preferences['language'];
      }
      
      return { ...defaultPreferences, language: defaultLang };
    } catch (error) {
      return defaultPreferences;
    }
  });

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === PREF_KEY && e.newValue) {
        setPreferences(JSON.parse(e.newValue));
      }
    };
    
    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<Preferences>;
      setPreferences(customEvent.detail);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(PREF_EVENT, handleCustomEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(PREF_EVENT, handleCustomEvent);
    };
  }, []);

  const updatePreference = useCallback(<K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    setPreferences(prev => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem(PREF_KEY, JSON.stringify(updated));
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent(PREF_EVENT, { detail: updated }));
      }, 0);
      return updated;
    });
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences(defaultPreferences);
    localStorage.setItem(PREF_KEY, JSON.stringify(defaultPreferences));
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent(PREF_EVENT, { detail: defaultPreferences }));
    }, 0);
  }, []);

  return { preferences, updatePreference, resetPreferences };
}
