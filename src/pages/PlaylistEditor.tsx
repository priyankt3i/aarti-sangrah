import { useState, useMemo, type FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Trash2, ArrowUp, ArrowDown, GripVertical, Pencil, Check, X } from 'lucide-react';
import { usePlaylists } from '../hooks/usePlaylists';
import { aartis } from '../data/aartis';
import { cn } from '../lib/utils';
import { Aarti } from '../types';

export function PlaylistEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPlaylist, updatePlaylist } = usePlaylists();
  
  const playlist = id ? getPlaylist(id) : null;
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState('');

  const handleSaveTitle = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!playlist) return;
    const trimmed = titleInput.trim();
    if (trimmed) {
      updatePlaylist(playlist.id, { name: trimmed });
    }
    setIsEditingTitle(false);
  };

  if (!playlist) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] px-4 text-center">
        <h2 className="text-xl font-medium text-[#4a1515] dark:text-[#f3e7d3] mb-2">Playlist not found</h2>
        <button onClick={() => navigate('/playlists')} className="text-[#781f19] dark:text-[#ffb067] font-medium">Go back to Playlists</button>
      </div>
    );
  }

  const playlistAartis = playlist.aartiIds
    .map(id => aartis.find(a => a.id === id))
    .filter((a): a is Aarti => !!a);

  const availableAartis = aartis.filter(a => {
    if (playlist.aartiIds.includes(a.id)) return false;
    
    if (categoryFilter !== 'all' && a.category !== categoryFilter) return false;
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.alternativeTitles.some(t => t.toLowerCase().includes(q)) ||
        a.searchKeywords.some(k => k.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const categories = useMemo(() => {
    const cats = new Set(aartis.map(a => a.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const moveAarti = (index: number, direction: 'up' | 'down') => {
    const newIds = [...playlist.aartiIds];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newIds.length) {
      const temp = newIds[index];
      newIds[index] = newIds[targetIndex];
      newIds[targetIndex] = temp;
      updatePlaylist(playlist.id, { aartiIds: newIds });
    }
  };

  const removeAarti = (aartiId: string) => {
    updatePlaylist(playlist.id, { 
      aartiIds: playlist.aartiIds.filter(id => id !== aartiId) 
    });
  };

  const addAarti = (aartiId: string) => {
    updatePlaylist(playlist.id, {
      aartiIds: [...playlist.aartiIds, aartiId]
    });
  };

  return (
    <div className="pb-24">
      <div className="sticky top-0 z-30 bg-[#fdfbf7]/90 dark:bg-[#1a1c29]/90 backdrop-blur-md border-b border-[#e2d5c3] dark:border-[#2a2d3d] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1 min-w-0 mr-2">
          <button 
            onClick={() => navigate('/playlists')}
            className="p-1 -ml-1 text-[#4a1515] dark:text-[#f3e7d3] shrink-0"
            aria-label="Back to playlists"
          >
            <ChevronLeft size={28} />
          </button>

          {isEditingTitle ? (
            <form onSubmit={handleSaveTitle} className="flex items-center gap-1.5 flex-1 min-w-0">
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setIsEditingTitle(false);
                }}
                className="flex-1 min-w-0 px-2.5 py-1 text-base font-medium rounded-lg border border-[#c2410c] bg-white dark:bg-[#232635] text-[#4a1515] dark:text-[#f3e7d3] focus:outline-none focus:ring-2 focus:ring-[#c2410c]"
                placeholder="Playlist name"
              />
              <button
                type="submit"
                className="p-1.5 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-lg transition-colors shrink-0"
                aria-label="Save title"
                title="Save"
              >
                <Check size={18} />
              </button>
              <button
                type="button"
                onClick={() => setIsEditingTitle(false)}
                className="p-1.5 text-[#8a6b6b] hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors shrink-0"
                aria-label="Cancel rename"
                title="Cancel"
              >
                <X size={18} />
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-1.5 min-w-0">
              <h1 
                onClick={() => {
                  setTitleInput(playlist.name);
                  setIsEditingTitle(true);
                }}
                className="text-xl font-serif font-semibold text-[#4a1515] dark:text-[#f3e7d3] truncate cursor-pointer hover:opacity-80"
                title="Click to rename playlist"
              >
                {playlist.name}
              </h1>
              <button 
                onClick={() => {
                  setTitleInput(playlist.name);
                  setIsEditingTitle(true);
                }}
                className="p-1.5 text-[#8a6b6b] hover:text-[#4a1515] dark:hover:text-[#f3e7d3] rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors shrink-0"
                title="Rename playlist"
                aria-label="Rename playlist"
              >
                <Pencil size={16} />
              </button>
            </div>
          )}
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1 text-[#781f19] dark:text-[#ffb067] font-medium p-2"
        >
          <Plus size={20} />
          <span>Add</span>
        </button>
      </div>

      <div className="p-4">
        {playlistAartis.length === 0 ? (
          <div className="text-center py-12 px-4 border-2 border-dashed border-[#e2d5c3] dark:border-[#3f4356] rounded-xl mt-4">
            <p className="text-[#8a6b6b] dark:text-[#a09c9c] mb-4">No Aartis in this playlist yet.</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-[#781f19] dark:bg-[#c2410c] text-white px-6 py-2 rounded-full font-medium inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Add Aartis
            </button>
          </div>
        ) : (
          <div className="space-y-3 mt-4">
            {playlistAartis.map((aarti, index) => (
              <div 
                key={aarti.id} 
                className="flex items-center gap-3 bg-white dark:bg-[#2a2d3d] p-3 rounded-xl shadow-sm border border-[#e2d5c3] dark:border-transparent"
              >
                <div className="flex flex-col gap-1 text-[#8a6b6b] dark:text-[#a09c9c]">
                  <button 
                    onClick={() => moveAarti(index, 'up')} 
                    disabled={index === 0}
                    className="disabled:opacity-20 hover:text-[#4a1515] dark:hover:text-[#f3e7d3]"
                  >
                    <ArrowUp size={20} />
                  </button>
                  <button 
                    onClick={() => moveAarti(index, 'down')} 
                    disabled={index === playlistAartis.length - 1}
                    className="disabled:opacity-20 hover:text-[#4a1515] dark:hover:text-[#f3e7d3]"
                  >
                    <ArrowDown size={20} />
                  </button>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[#4a1515] dark:text-[#f3e7d3] truncate">{aarti.title}</h3>
                  <p className="text-sm text-[#8a6b6b] dark:text-[#a09c9c]">{aarti.deity}</p>
                </div>
                
                <button 
                  onClick={() => removeAarti(aarti.id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col justify-end sm:items-center sm:justify-center">
          <div className="bg-[#fdfbf7] dark:bg-[#1a1c29] w-full sm:w-[90%] sm:max-w-md h-[85vh] sm:h-[80vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-[#e2d5c3] dark:border-[#2a2d3d] flex justify-between items-center bg-white dark:bg-[#2a2d3d]">
              <h2 className="text-lg font-medium text-[#4a1515] dark:text-[#f3e7d3]">Add to Playlist</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-[#781f19] dark:text-[#ffb067] font-medium p-2"
              >
                Done
              </button>
            </div>
            
            <div className="p-4 border-b border-[#e2d5c3] dark:border-[#2a2d3d]">
              <input
                type="text"
                placeholder="Search aartis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-[#2a2d3d] border border-[#e2d5c3] dark:border-[#3f4356] rounded-xl px-4 py-3 text-[#4a1515] dark:text-[#f3e7d3] mb-3"
              />
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border",
                      categoryFilter === cat
                        ? "bg-[#781f19] dark:bg-[#c2410c] text-white border-transparent"
                        : "bg-white dark:bg-[#2a2d3d] text-[#8a6b6b] dark:text-[#a09c9c] border-[#e2d5c3] dark:border-[#3f4356]"
                    )}
                  >
                    {cat === 'all' ? 'All' : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {availableAartis.length === 0 ? (
                <p className="text-center text-[#8a6b6b] dark:text-[#a09c9c] py-8">No aartis found.</p>
              ) : (
                availableAartis.map(aarti => (
                  <div 
                    key={aarti.id}
                    className="flex justify-between items-center p-3 bg-white dark:bg-[#2a2d3d] rounded-xl border border-[#e2d5c3] dark:border-transparent"
                  >
                    <div>
                      <h4 className="font-medium text-[#4a1515] dark:text-[#f3e7d3]">{aarti.title}</h4>
                      <p className="text-sm text-[#8a6b6b] dark:text-[#a09c9c]">{aarti.deity}</p>
                    </div>
                    <button
                      onClick={() => addAarti(aarti.id)}
                      className="p-2 bg-[#fdfbf7] dark:bg-[#1a1c29] text-[#781f19] dark:text-[#ffb067] border border-[#e2d5c3] dark:border-[#3f4356] rounded-full hover:bg-[#f5ebd9] dark:hover:bg-[#2a2d3d]"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
