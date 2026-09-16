import { Heart, ListPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { MouseEvent } from 'react';
import { Aarti } from '../types';
import { cn } from '../lib/utils';

interface AartiCardProps {
  key?: string | number;
  aarti: Aarti;
  isFavorite: boolean;
  onToggleFavorite: (e: MouseEvent) => void;
  onAddToPlaylist?: (e: MouseEvent) => void;
}

export function AartiCard({ aarti, isFavorite, onToggleFavorite, onAddToPlaylist }: AartiCardProps) {
  const langLabel = {
    hi: 'हिंदी',
    mr: 'मराठी',
    gu: 'ગુજરાતી',
    bn: 'বাংলা'
  }[aarti.language];

  return (
    <Link 
      to={`/aarti/${aarti.language}/${aarti.slug}`}
      className="block bg-white dark:bg-[#232635] rounded-xl p-4 shadow-sm border border-[#f0e6d5] dark:border-[#2a2d3d] active:scale-[0.98] transition-transform"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1 pr-4">
          <h3 className="text-xl font-medium text-[#781f19] dark:text-[#ff8a65] font-[Noto_Sans_Devanagari]">
            {aarti.title}
          </h3>
          <p className="text-sm text-[#8a6b6b] dark:text-[#a09c9c] mt-1">
            {aarti.deity} • {langLabel}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {onAddToPlaylist && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                onAddToPlaylist(e);
              }}
              className="p-2 rounded-full transition-colors text-[#d1c4c4] dark:text-[#5a5d6d] hover:text-[#781f19] dark:hover:text-[#ffb067]"
              aria-label="Add to playlist"
            >
              <ListPlus size={22} />
            </button>
          )}
          <button 
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(e);
            }}
            className={cn(
              "p-2 rounded-full transition-colors",
              isFavorite ? "text-[#c2410c] dark:text-[#ffb067]" : "text-[#d1c4c4] dark:text-[#5a5d6d] hover:text-[#c2410c] dark:hover:text-[#ffb067]"
            )}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart size={22} className={isFavorite ? "fill-current" : ""} />
          </button>
        </div>
      </div>
      <div className="flex items-center text-xs text-[#a38a8a] dark:text-[#8a8d9d] mt-4">
        <span>~ {aarti.durationMinutes} min sing</span>
      </div>
    </Link>
  );
}
