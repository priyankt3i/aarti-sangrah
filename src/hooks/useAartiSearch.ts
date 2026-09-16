import { useState, useMemo } from 'react';
import { aartis } from '../data/aartis';
import { Aarti, LanguageCode } from '../types';

export function useAartiSearch(currentLanguage: LanguageCode | 'all') {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');

  const filteredAartis = useMemo(() => {
    return aartis.filter((aarti) => {
      // Language filter
      if (currentLanguage !== 'all' && aarti.language !== currentLanguage) {
        return false;
      }
      
      // Category filter
      if (selectedCategory !== 'all' && aarti.category !== selectedCategory) {
        return false;
      }
      
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = aarti.title.toLowerCase().includes(query);
        const matchesAltTitle = aarti.alternativeTitles.some(alt => alt.toLowerCase().includes(query));
        const matchesKeywords = aarti.searchKeywords.some(kw => kw.toLowerCase().includes(query));
        const matchesDeity = aarti.deity.toLowerCase().includes(query);
        
        if (!matchesTitle && !matchesAltTitle && !matchesKeywords && !matchesDeity) {
          return false;
        }
      }
      
      return true;
    });
  }, [searchQuery, currentLanguage, selectedCategory]);

  const categories = useMemo(() => {
    // If we want category list to be language-specific:
    // const cats = new Set(aartis.filter(a => currentLanguage === 'all' || a.language === currentLanguage).map(a => a.category));
    const cats = new Set(aartis.map(a => a.category));
    return ['all', ...Array.from(cats)];
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredAartis,
    categories
  };
}
