import { useState } from 'react';
import { X, Play, Plus, Check, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CuratedPlaylist } from '../data/curatedPlaylists';
import { aartis } from '../data/aartis';
import { usePlaylists } from '../hooks/usePlaylists';

interface CuratedPlaylistPreviewModalProps {
  playlist: CuratedPlaylist | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CuratedPlaylistPreviewModal({ playlist, isOpen, onClose }: CuratedPlaylistPreviewModalProps) {
  const { addCuratedPlaylist, isCuratedPlaylistAdded } = usePlaylists();
  const [justAdded, setJustAdded] = useState(false);

  if (!isOpen || !playlist) return null;

  const playlistAartis = playlist.aartiIds
    .map(id => aartis.find(a => a.id === id))
    .filter((a): a is NonNullable<typeof a> => !!a);

  const isAdded = justAdded || isCuratedPlaylistAdded(playlist.name);

  const handleAdd = () => {
    addCuratedPlaylist(playlist);
    setJustAdded(true);
  };

  const firstAarti = playlistAartis[0];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#fdfbf7] rounded-t-2xl sm:rounded-2xl border border-[#e2d5c3] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-white border-b border-[#e2d5c3] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#fdf4eb] text-[#c2410c] border border-[#fdd8b3]">
                {playlist.badge}
              </span>
              <span className="text-xs text-[#8a6b6b]">
                {playlist.aartiIds.length} Aartis
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#4a1515]">{playlist.name}</h3>
            <p className="text-sm font-medium text-[#c2410c]">{playlist.hindiName}</p>
            <p className="text-xs text-[#8a6b6b] mt-1.5 leading-relaxed">{playlist.description}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[#8a6b6b] hover:text-[#4a1515] hover:bg-black/5 rounded-full"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Action Bar */}
        <div className="p-4 bg-[#fbf8f2] border-b border-[#e2d5c3] flex items-center gap-3">
          {firstAarti && (
            <Link
              to={`/aarti/${firstAarti.language}/${firstAarti.slug}?playlist=${playlist.id}&index=0`}
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#781f19] hover:bg-[#5c1616] text-white rounded-xl text-sm font-semibold shadow-xs transition-colors"
            >
              <Play size={16} className="fill-current" />
              <span>Start Singing Sequence</span>
            </Link>
          )}

          <button
            onClick={handleAdd}
            disabled={isAdded}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-sm font-semibold border transition-all ${
              isAdded
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-white hover:bg-orange-50 text-[#781f19] border-[#e2d5c3] shadow-xs"
            }`}
          >
            {isAdded ? (
              <>
                <Check size={16} />
                <span>Added to Playlists</span>
              </>
            ) : (
              <>
                <Plus size={16} />
                <span>Add to My Playlists</span>
              </>
            )}
          </button>
        </div>

        {/* Aarti Items List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#a38a8a] px-1 mb-2">
            Hymns in this Sequence ({playlistAartis.length})
          </div>

          {playlistAartis.map((aarti, idx) => (
            <Link
              key={aarti.id}
              to={`/aarti/${aarti.language}/${aarti.slug}?playlist=${playlist.id}&index=${idx}`}
              onClick={onClose}
              className="flex items-center justify-between p-3 bg-white hover:bg-[#fff9f2] rounded-xl border border-[#e2d5c3] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#fdfbf7] border border-[#e2d5c3] flex items-center justify-center text-xs font-semibold text-[#8a6b6b] group-hover:text-[#c2410c] group-hover:border-[#c2410c]">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="font-semibold text-sm text-[#4a1515] group-hover:text-[#c2410c] transition-colors">
                    {aarti.title}
                  </h4>
                  <p className="text-xs text-[#8a6b6b]">
                    {aarti.deity ? aarti.deity : aarti.category} • {aarti.language.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="p-2 text-[#8a6b6b] group-hover:text-[#c2410c] rounded-full">
                <Play size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
