import { Languages } from 'lucide-react';
import { usePreferences } from '../hooks/usePreferences';
import { cn } from '../lib/utils';

export function Header() {
  const { preferences, updatePreference } = usePreferences();
  
  return (
    <header className="pt-safe-top bg-gradient-to-b from-[#fdfbf7] to-transparent dark:from-[#1a1c29] pb-4 px-4 sticky top-0 z-40 backdrop-blur-sm">
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-2.5">
          <img 
            src="/as-logo-48x48.png" 
            alt="Aarti Sangrah Logo" 
            className="w-8 h-8 rounded-md object-contain" 
          />
          <img 
            src="/header.png" 
            alt="Aarti Sangrah" 
            className="h-7 sm:h-8 w-auto object-contain" 
          />
          <h1 className="sr-only">Aarti Sangrah</h1>
        </div>
        <button
          onClick={() => updatePreference('showTransliteration', !preferences.showTransliteration)}
          className={cn(
            "p-2 rounded-full transition-colors flex items-center gap-2",
            preferences.showTransliteration 
              ? "bg-[#781f19]/10 text-[#781f19] dark:bg-[#ffb067]/10 dark:text-[#ffb067]" 
              : "text-[#8a6b6b] dark:text-[#a09c9c] hover:bg-black/5 dark:hover:bg-white/5"
          )}
          aria-label="Toggle English Transliteration"
          title="Toggle English Transliteration"
        >
          <Languages size={24} />
        </button>
      </div>
    </header>
  );
}
