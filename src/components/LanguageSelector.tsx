import { LanguageCode } from '../types';
import { cn } from '../lib/utils';

interface LanguageSelectorProps {
  selected: LanguageCode | 'all';
  onChange: (lang: LanguageCode | 'all') => void;
  showAll?: boolean;
}

const languages: { code: LanguageCode | 'all'; label: string }[] = [
  { code: 'all', label: 'All' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'mr', label: 'मराठी' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'bn', label: 'বাংলা' },
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
            "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border",
            selected === lang.code
              ? "bg-[#e1a774]/20 text-[#781f19] border-[#e1a774] dark:bg-[#c2410c]/20 dark:text-[#ffb067] dark:border-[#c2410c]"
              : "bg-transparent text-[#8a6b6b] border-transparent hover:bg-black/5 dark:text-[#a09c9c] dark:hover:bg-white/5"
          )}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
