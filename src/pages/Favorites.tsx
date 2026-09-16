import { useState } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { AartiCard } from '../components/AartiCard';
import { AddToPlaylistModal } from '../components/AddToPlaylistModal';
import { aartis } from '../data/aartis';
import { Aarti } from '../types';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { HeartOff } from 'lucide-react';

export function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAarti, setSelectedAarti] = useState<Aarti | null>(null);

  const handleOpenModal = (aarti: Aarti) => {
    setSelectedAarti(aarti);
    setModalOpen(true);
  };
  
  const favoriteList = favorites
    .map(id => aartis.find(a => a.id === id))
    .filter((a): a is NonNullable<typeof a> => !!a);

  return (
    <div className="pb-24">
      <Header />
      
      <main className="px-4 mt-6 max-w-md mx-auto space-y-6">
        <h2 className="text-2xl font-medium text-[#781f19] dark:text-[#ffb067]">
          Your Favorites
        </h2>
        
        {favoriteList.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white dark:bg-[#232635] rounded-xl border border-[#e2d5c3] dark:border-[#2a2d3d] flex flex-col items-center">
            <HeartOff size={48} className="text-[#d1c4c4] dark:text-[#5a5d6d] mb-4" />
            <h3 className="text-[#4a1515] dark:text-[#f3e7d3] font-medium text-lg mb-2">No favorites yet</h3>
            <p className="text-[#8a6b6b] dark:text-[#a09c9c] text-sm">
              Tap the heart icon on any Aarti to save it here for quick access.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {favoriteList.map(aarti => (
              <AartiCard 
                key={aarti.id} 
                aarti={aarti} 
                isFavorite={isFavorite(aarti.id)} 
                onToggleFavorite={() => toggleFavorite(aarti.id)} 
                onAddToPlaylist={() => handleOpenModal(aarti)}
              />
            ))}
          </div>
        )}
      </main>

      <AddToPlaylistModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        aarti={selectedAarti} 
      />

      <BottomNavigation />
    </div>
  );
}
