import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ListMusic, Plus, Play, MoreVertical, Trash2, Edit, Pencil, Check, X } from 'lucide-react';
import { usePlaylists } from '../hooks/usePlaylists';
import { aartis } from '../data/aartis';
import { BottomNavigation } from '../components/BottomNavigation';
import { CuratedPlaylistsSection } from '../components/CuratedPlaylistsSection';

export function Playlists() {
  const { playlists, createPlaylist, updatePlaylist, deletePlaylist } = usePlaylists();
  const [showCreate, setShowCreate] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName('');
      setShowCreate(false);
    }
  };

  const startRename = (id: string, currentName: string) => {
    setRenamingId(id);
    setRenameValue(currentName);
  };

  const handleSaveRename = (e: FormEvent, id: string) => {
    e.preventDefault();
    const trimmed = renameValue.trim();
    if (trimmed) {
      updatePlaylist(id, { name: trimmed });
    }
    setRenamingId(null);
  };

  return (
    <div className="pb-24">
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-serif text-[#4a1515] dark:text-[#f3e7d3]">Playlists</h1>
          <button 
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 bg-[#781f19] dark:bg-[#c2410c] text-white px-4 py-2 rounded-full font-medium"
          >
            <Plus size={20} />
            <span>New</span>
          </button>
        </div>

        {showCreate && (
          <form onSubmit={handleCreate} className="mb-6 bg-white dark:bg-[#2a2d3d] p-4 rounded-xl shadow-sm border border-[#e2d5c3] dark:border-transparent">
            <h3 className="text-lg font-medium text-[#4a1515] dark:text-[#f3e7d3] mb-3">Create Playlist</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="E.g., Morning Routine"
                className="flex-1 min-w-0 bg-[#fdfbf7] dark:bg-[#1a1c29] border border-[#e2d5c3] dark:border-[#3f4356] rounded-lg px-3 py-2 text-[#4a1515] dark:text-[#f3e7d3] placeholder:text-[#a09c9c]"
                autoFocus
              />
              <div className="flex justify-end gap-2 shrink-0">
                <button 
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="px-4 py-2 text-[#8a6b6b] dark:text-[#a09c9c] font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={!newPlaylistName.trim()}
                  className="bg-[#781f19] dark:bg-[#c2410c] text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        )}

        {playlists.length === 0 && !showCreate ? (
          <div className="text-center py-16 px-4">
            <div className="bg-[#f5ebd9] dark:bg-[#2a2d3d] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ListMusic size={32} className="text-[#8a6b6b] dark:text-[#a09c9c]" />
            </div>
            <h3 className="text-xl font-medium text-[#4a1515] dark:text-[#f3e7d3] mb-2">No playlists yet</h3>
            <p className="text-[#8a6b6b] dark:text-[#a09c9c] mb-6">Create a playlist to sing your favorite Aartis in order.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {playlists.map(playlist => {
              const firstAarti = playlist.aartiIds.length > 0 
                ? aartis.find(a => a.id === playlist.aartiIds[0]) 
                : null;
              
              return (
                <div key={playlist.id} className="bg-white dark:bg-[#2a2d3d] p-4 rounded-xl shadow-sm border border-[#e2d5c3] dark:border-transparent">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 mr-3">
                      {renamingId === playlist.id ? (
                        <form onSubmit={(e) => handleSaveRename(e, playlist.id)} className="flex items-center gap-1.5 py-1">
                          <input
                            type="text"
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            autoFocus
                            placeholder="Playlist name"
                            className="flex-1 min-w-[140px] max-w-[260px] px-2.5 py-1 text-sm font-medium rounded-lg border border-[#c2410c] bg-[#fffaf5] dark:bg-[#1a1c29] text-[#4a1515] dark:text-[#f3e7d3] focus:outline-none focus:ring-2 focus:ring-[#c2410c]"
                          />
                          <button
                            type="submit"
                            className="p-1.5 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-lg transition-colors"
                            aria-label="Save new name"
                            title="Save name"
                          >
                            <Check size={18} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setRenamingId(null)}
                            className="p-1.5 text-[#8a6b6b] hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                            aria-label="Cancel rename"
                            title="Cancel"
                          >
                            <X size={18} />
                          </button>
                        </form>
                      ) : (
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium text-[#4a1515] dark:text-[#f3e7d3]">{playlist.name}</h3>
                          <button
                            onClick={() => startRename(playlist.id, playlist.name)}
                            className="p-1 text-[#8a6b6b] hover:text-[#4a1515] dark:hover:text-[#f3e7d3] rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            title="Rename playlist"
                            aria-label={`Rename ${playlist.name}`}
                          >
                            <Pencil size={15} />
                          </button>
                        </div>
                      )}
                      <p className="text-sm text-[#8a6b6b] dark:text-[#a09c9c] mt-0.5">{playlist.aartiIds.length} Aarti{playlist.aartiIds.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Link 
                        to={`/playlists/${playlist.id}`}
                        className="p-2 text-[#8a6b6b] dark:text-[#a09c9c] hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                        aria-label="Edit playlist"
                      >
                        <Edit size={20} />
                      </Link>
                      {confirmDeleteId === playlist.id ? (
                        <div className="flex items-center gap-1 bg-red-50 dark:bg-red-950/30 px-2 py-1 rounded-lg border border-red-200 dark:border-red-900/50">
                          <span className="text-xs text-red-700 dark:text-red-300 font-medium">Delete?</span>
                          <button
                            onClick={() => {
                              deletePlaylist(playlist.id);
                              setConfirmDeleteId(null);
                            }}
                            className="text-xs bg-red-600 text-white px-2 py-0.5 rounded font-medium hover:bg-red-700"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="text-xs text-[#8a6b6b] px-1 py-0.5 hover:text-black"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setConfirmDeleteId(playlist.id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                          aria-label="Delete playlist"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {playlist.aartiIds.length > 0 ? (
                    <Link 
                      to={firstAarti ? `/aarti/${firstAarti.language}/${firstAarti.slug}?playlist=${playlist.id}&index=0` : '#'}
                      className="flex items-center justify-center gap-2 w-full bg-[#fdfbf7] dark:bg-[#1a1c29] text-[#781f19] dark:text-[#ffb067] py-3 rounded-lg font-medium border border-[#e2d5c3] dark:border-[#3f4356]"
                    >
                      <Play size={20} className="fill-current" />
                      <span>Play</span>
                    </Link>
                  ) : (
                    <Link 
                      to={`/playlists/${playlist.id}`}
                      className="block text-center w-full bg-[#fdfbf7] dark:bg-[#1a1c29] text-[#8a6b6b] dark:text-[#a09c9c] py-3 rounded-lg font-medium border border-dashed border-[#c2b49c] dark:border-[#525770]"
                    >
                      Add Aartis
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-[#e2d5c3]">
          <CuratedPlaylistsSection 
            title="Explore Curated Playlists"
            subtitle="Add any of these devotional collections to your personal playlists with one tap"
          />
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
