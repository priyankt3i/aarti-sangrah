import { Aarti } from '../types';

/**
 * Normalizes a string for forgiving transliteration and keyword searching:
 * - Lowercases and trims
 * - Strips accents/diacritics
 * - Normalizes quotes/apostrophes
 */
export function normalizeSearchTerm(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['"’`]/g, '')
    .trim();
}

/**
 * Generates common phonetic variations for Indian transliterated queries:
 * e.g., 'dhyan' <-> 'dnyan', 'shri' <-> 'shree', 'laxmi' <-> 'lakshmi'
 */
function getQueryVariants(query: string): string[] {
  const norm = normalizeSearchTerm(query);
  if (!norm) return [];

  const variants = new Set<string>([norm]);

  // dhyan <-> dnyan
  if (norm.includes('dhyan')) {
    variants.add(norm.replace(/dhyan/g, 'dnyan'));
  }
  if (norm.includes('dnyan')) {
    variants.add(norm.replace(/dnyan/g, 'dhyan'));
  }

  // shri <-> shree
  if (norm.includes('shri')) {
    variants.add(norm.replace(/shri/g, 'shree'));
  }
  if (norm.includes('shree')) {
    variants.add(norm.replace(/shree/g, 'shri'));
  }

  // laxmi <-> lakshmi
  if (norm.includes('laxmi')) {
    variants.add(norm.replace(/laxmi/g, 'lakshmi'));
  }
  if (norm.includes('lakshmi')) {
    variants.add(norm.replace(/lakshmi/g, 'laxmi'));
  }

  return Array.from(variants);
}

/**
 * Checks if an Aarti matches the user's search query across:
 * - Indic title (Devanagari, Gujarati, Bengali)
 * - English transliteration of the title
 * - Alternative titles
 * - Search keywords
 * - Deity
 * - Slug
 */
export function matchesAartiQuery(aarti: Aarti, rawQuery: string): boolean {
  if (!rawQuery || rawQuery.trim() === '') return true;

  const rawLower = rawQuery.toLowerCase().trim();
  // Quick direct substring check on Indic title & deity
  if (aarti.title.toLowerCase().includes(rawLower) || aarti.deity.toLowerCase().includes(rawLower)) {
    return true;
  }

  // Search corpus including transliterated title, alternatives, keywords, deity, slug, and verse lyrics (both original and transliterated)
  const verseLines = (aarti.verses || []).flatMap(v => [
    ...(v.lines || []),
    ...(v.transliteratedLines || [])
  ]);
  const corpusParts = [
    aarti.transliteration || '',
    aarti.title,
    ...(aarti.alternativeTitles || []),
    ...(aarti.searchKeywords || []),
    aarti.deity,
    aarti.slug,
    ...verseLines
  ];

  const normalizedCorpus = corpusParts.map(normalizeSearchTerm);
  const queryVariants = getQueryVariants(rawQuery);

  return queryVariants.some(q => {
    return normalizedCorpus.some(target => target.includes(q));
  });
}
