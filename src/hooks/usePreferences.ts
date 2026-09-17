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

export function usePreferences() {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    try {
      const stored = localStorage.getItem('aarti_preferences');
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
    localStorage.setItem('aarti_preferences', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreference = useCallback(<K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences(defaultPreferences);
  }, []);

  return { preferences, updatePreference, resetPreferences };
}
