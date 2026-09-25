export type LanguageCode = "hi" | "mr" | "gu" | "bn";

export type AartiVerse = {
  id: string;
  lines: string[];
  transliteratedLines?: string[];
  isChorus?: boolean;
};

export type Aarti = {
  id: string;
  slug: string;
  title: string;
  transliteration?: string;
  alternativeTitles: string[];
  language: LanguageCode;
  dialect?: string;
  regionalLanguage?: string;
  deity: string;
  category: string;
  durationMinutes: number;
  searchKeywords: string[];
  verses: AartiVerse[];
  source?: string;
  reviewed: boolean;
  updatedAt: string;
};

export type Preferences = {
  language: LanguageCode | 'all';
  fontSize: number; // base size
  autoScrollSpeed: number; // 1 to 3 (Slow, Medium, Fast)
  keepAwake: boolean;
  reducedMotion: boolean;
  showTransliteration: boolean;
};

export type Playlist = {
  id: string;
  name: string;
  aartiIds: string[];
  createdAt: number;
};
