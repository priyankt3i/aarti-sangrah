import { useState, type MouseEvent } from 'react';
import { Sun, Flame, Sparkles, Shield, Moon, Music, Heart, Plus, Check, Play, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { curatedPlaylists, CuratedPlaylist } from '../data/curatedPlaylists';
import { aartis } from '../data/aartis';
import { usePlaylists } from '../hooks/usePlaylists';
import { CuratedPlaylistPreviewModal } from './CuratedPlaylistPreviewModal';

interface CuratedPlaylistsSectionProps {
  title?: string;
  subtitle?: string;
  showAll?: boolean;
}

export function CuratedPlaylistsSection({ 
  title = "Curated Devotional Playlists", 
  subtitle = "Handcrafted singing sequences for rituals, festivals & daily worship",
}: CuratedPlaylistsSectionProps) {
  const { addCuratedPlaylist, isCuratedPlaylistAdded } = usePlaylists();
  const [selectedPlaylist, setSelectedPlaylist] = useState<CuratedPlaylist | null>(null);
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  const handleAddPlaylist = (e: MouseEvent, cp: CuratedPlaylist) => {
    e.stopPropagation();
    addCuratedPlaylist(cp);
    setAddedMap(prev => ({ ...prev, [cp.name]: true }));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun size={18} className="text-amber-500" />;
      case 'Flame': return <Flame size={18} className="text-orange-500" />;
      case 'Sparkles': return <Sparkles size={18} className="text-rose-500" />;
      case 'Shield': return <Shield size={18} className="text-amber-600" />;
      case 'Moon': return <Moon size={18} className="text-sky-500" />;
      case 'Music': return <Music size={18} className="text-amber-700" />;
      default: return <Heart size={18} className="text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a38a8a]">
              {title}
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#c2410c] text-white">
              Curated
            </span>
          </div>
          {subtitle && (
            <p className="text-xs text-[#8a6b6b] mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {curatedPlaylists.map(cp => {
          const isAdded = addedMap[cp.name] || isCuratedPlaylistAdded(cp.name);
          const firstAartiId = cp.aartiIds[0];
          const firstAarti = aartis.find(a => a.id === firstAartiId);

          // Get preview of first 3 hymns
          const previewAartis = cp.aartiIds
            .slice(0, 3)
            .map(id => aartis.find(a => a.id === id)?.title)
            .filter(Boolean);

          return (
            <div
              key={cp.id}
              onClick={() => setSelectedPlaylist(cp)}
              className="bg-white rounded-2xl border border-[#e2d5c3] p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group hover:border-[#c2410c]/40"
            >
              <div>
                {/* Header line */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-[#fdf8f3] border border-[#fae5d2]">
                      {getIcon(cp.iconName)}
                    </div>
                    <div>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#fdf5ed] text-[#c2410c] border border-[#fce2cb]">
                        {cp.badge}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#8a6b6b]">
                    {cp.aartiIds.length} Aartis
                  </span>
                </div>

                {/* Title and subtitle */}
                <h4 className="font-bold text-base text-[#4a1515] group-hover:text-[#c2410c] transition-colors leading-snug">
                  {cp.name}
                </h4>
                <p className="text-xs font-medium text-[#c2410c] mb-1.5">
                  {cp.hindiName}
                </p>
                <p className="text-xs text-[#8a6b6b] line-clamp-2 leading-relaxed">
                  {cp.subtitle}
                </p>

                {/* Hymns snippet */}
                <div className="mt-3 pt-2.5 border-t border-[#f0e6da] space-y-1">
                  <div className="text-[11px] font-semibold text-[#a38a8a] flex items-center justify-between">
                    <span>Includes:</span>
                    <span className="text-[10px] text-[#c2410c] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      View all {cp.aartiIds.length} <ChevronRight size={12} />
                    </span>
                  </div>
                  <div className="text-xs text-[#5c3e3e] truncate">
                    {previewAartis.join(' • ')}...
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-[#f0e6da] flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                {firstAarti && (
                  <Link
                    to={`/aarti/${firstAarti.language}/${firstAarti.slug}?playlist=${cp.id}&index=0`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#781f19] hover:bg-[#5c1616] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Play size={13} className="fill-current" />
                    <span>Play Now</span>
                  </Link>
                )}

                <button
                  onClick={(e) => handleAddPlaylist(e, cp)}
                  disabled={isAdded}
                  className={`flex items-center justify-center gap-1 py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    isAdded 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                      : "bg-[#fdfbf7] hover:bg-orange-50 text-[#781f19] border-[#e2d5c3] shadow-xs active:scale-[0.98]"
                  }`}
                  title={isAdded ? "Already in your playlists" : "Add to your personal playlists"}
                >
                  {isAdded ? (
                    <>
                      <Check size={14} />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <Plus size={14} />
                      <span>Add</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details modal */}
      <CuratedPlaylistPreviewModal
        playlist={selectedPlaylist}
        isOpen={!!selectedPlaylist}
        onClose={() => setSelectedPlaylist(null)}
      />
    </div>
  );
}
