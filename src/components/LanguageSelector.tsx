import { LanguageCode } from '../types';
import { cn } from '../lib/utils';

interface LanguageSelectorProps {
  selected: LanguageCode | 'all';
  onChange: (lang: LanguageCode | 'all') => void;
  showAll?: boolean;
}

interface LanguageOption {
  code: LanguageCode | 'all';
  label: string;
  isComingSoon?: boolean;
}

const languages: LanguageOption[] = [
  { code: 'all', label: 'All' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'mr', label: 'मराठी' },
  { code: 'gu', label: 'ગુજરાતી', isComingSoon: true },
  { code: 'bn', label: 'বাংলা', isComingSoon: true },
];

export function LanguageSelector({ selected, onChange, showAll = true }: LanguageSelectorProps) {
  const options = showAll ? languages : languages.filter(l => l.code !== 'all');
  
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChange(lang.code)}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border select-none",
            selected === lang.code
              ? "bg-[#e1a774]/20 text-[#781f19] border-[#e1a774] dark:bg-[#c2410c]/20 dark:text-[#ffb067] dark:border-[#c2410c]"
              : "bg-transparent text-[#8a6b6b] border-transparent hover:bg-black/5 dark:text-[#a09c9c] dark:hover:bg-white/5"
          )}
        >
          <span>{lang.label}</span>
          {lang.isComingSoon && (
            <span
              className={cn(
                "text-[9px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded-full whitespace-nowrap leading-none transition-colors",
                selected === lang.code
                  ? "bg-[#781f19]/10 text-[#781f19] dark:bg-[#ffb067]/20 dark:text-[#ffb067]"
                  : "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
              )}
            >
              Coming Soon
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
