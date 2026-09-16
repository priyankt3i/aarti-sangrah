import { useState, type FormEvent } from 'react';
import { X, Plus, Check } from 'lucide-react';
import { usePlaylists } from '../hooks/usePlaylists';
import { Aarti } from '../types';
import { cn } from '../lib/utils';

interface AddToPlaylistModalProps {
  aarti: Aarti | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AddToPlaylistModal({ aarti, isOpen, onClose }: AddToPlaylistModalProps) {
  const { playlists, createPlaylist, updatePlaylist } = usePlaylists();
  const [showCreate, setShowCreate] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  if (!isOpen || !aarti) return null;

  const handleCreateAndAdd = (e: FormEvent) => {
    e.preventDefault();
    if (newPlaylistName.trim()) {
      const newPlaylist = createPlaylist(newPlaylistName.trim());
      updatePlaylist(newPlaylist.id, { aartiIds: [aarti.id] });
      setNewPlaylistName('');
      setShowCreate(false);
      onClose();
    }
  };

  const toggleInPlaylist = (playlistId: string, currentlyInPlaylist: boolean) => {
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) return;

    if (currentlyInPlaylist) {
      updatePlaylist(playlistId, {
        aartiIds: playlist.aartiIds.filter(id => id !== aarti.id)
      });
    } else {
      updatePlaylist(playlistId, {
        aartiIds: [...playlist.aartiIds, aarti.id]
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col justify-end sm:items-center sm:justify-center p-4">
      <div className="bg-[#fdfbf7] dark:bg-[#1a1c29] w-full sm:max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 sm:zoom-in-95">
        <div className="p-4 border-b border-[#e2d5c3] dark:border-[#2a2d3d] flex justify-between items-center bg-white dark:bg-[#2a2d3d]">
          <div>
            <h2 className="text-lg font-medium text-[#4a1515] dark:text-[#f3e7d3]">Add to Playlist</h2>
            <p className="text-xs text-[#8a6b6b] dark:text-[#a09c9c] truncate max-w-[200px]">{aarti.title}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-[#8a6b6b] dark:text-[#a09c9c] p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 max-h-[50vh] overflow-y-auto space-y-2">
          {playlists.length === 0 && !showCreate && (
            <p className="text-center text-[#8a6b6b] dark:text-[#a09c9c] py-4">No playlists available.</p>
          )}

          {playlists.map(playlist => {
            const isAdded = playlist.aartiIds.includes(aarti.id);
            return (
              <button
                key={playlist.id}
                onClick={() => toggleInPlaylist(playlist.id, isAdded)}
                className="w-full flex items-center justify-between p-3 bg-white dark:bg-[#2a2d3d] rounded-xl border border-[#e2d5c3] dark:border-[#3f4356] hover:border-[#c2410c] dark:hover:border-[#ffb067] transition-colors"
              >
                <span className="font-medium text-[#4a1515] dark:text-[#f3e7d3]">{playlist.name}</span>
                <div className={cn(
                  "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                  isAdded 
                    ? "bg-[#781f19] dark:bg-[#c2410c] border-transparent text-white" 
                    : "border-[#c2b49c] dark:border-[#525770] text-transparent"
                )}>
                  <Check size={14} />
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-[#e2d5c3] dark:border-[#2a2d3d] bg-white dark:bg-[#2a2d3d]">
          {!showCreate ? (
            <button 
              onClick={() => setShowCreate(true)}
              className="flex items-center justify-center gap-2 w-full text-[#781f19] dark:text-[#ffb067] py-3 rounded-xl font-medium border border-dashed border-[#c2b49c] dark:border-[#525770] hover:bg-black/5 dark:hover:bg-white/5"
            >
              <Plus size={20} />
              <span>New Playlist</span>
            </button>
          ) : (
            <form onSubmit={handleCreateAndAdd} className="space-y-3">
              <input 
                type="text" 
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="Playlist name..."
                className="w-full bg-[#fdfbf7] dark:bg-[#1a1c29] border border-[#e2d5c3] dark:border-[#3f4356] rounded-xl px-4 py-3 text-[#4a1515] dark:text-[#f3e7d3] placeholder:text-[#a09c9c]"
                autoFocus
              />
              <div className="flex justify-end gap-2">
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
                  className="bg-[#781f19] dark:bg-[#c2410c] text-white px-6 py-2 rounded-xl font-medium disabled:opacity-50"
                >
                  Create & Add
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
