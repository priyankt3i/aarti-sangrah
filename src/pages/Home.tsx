import { useState } from 'react';
import { useAartiSearch } from '../hooks/useAartiSearch';
import { usePreferences } from '../hooks/usePreferences';
import { useFavorites } from '../hooks/useFavorites';
import { useRecentAartis } from '../hooks/useRecentAartis';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { SearchBar } from '../components/SearchBar';
import { LanguageSelector } from '../components/LanguageSelector';
import { CategoryChips } from '../components/CategoryChips';
import { AartiCard } from '../components/AartiCard';
import { AddToPlaylistModal } from '../components/AddToPlaylistModal';
import { CuratedPlaylistsSection } from '../components/CuratedPlaylistsSection';
import { SacredTimingBanner } from '../components/SacredTimingBanner';
import { FestiveCalendarModal } from '../components/FestiveCalendarModal';
import { aartis } from '../data/aartis';
import { Aarti } from '../types';

export function Home() {
  const { preferences, updatePreference } = usePreferences();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { recentAartis } = useRecentAartis();
  
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredAartis,
    categories
  } = useAartiSearch(preferences.language);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedAarti, setSelectedAarti] = useState<Aarti | null>(null);

  const handleOpenModal = (aarti: Aarti) => {
    setSelectedAarti(aarti);
    setModalOpen(true);
  };

  // Derive recent and favorite lists
  const recentList = recentAartis
    .map(id => aartis.find(a => a.id === id))
    .filter((a): a is NonNullable<typeof a> => !!a)
    .filter(a => preferences.language === 'all' || a.language === preferences.language);
    
  const showRecents = searchQuery === '' && selectedCategory === 'all' && recentList.length > 0;

  return (
    <div className="pb-24">
      <Header onOpenCalendar={() => setCalendarOpen(true)} />
      
      <main className="px-4 mt-2 max-w-md mx-auto space-y-6">
        {/* Dynamic Lunisolar Time & Festival Suggestions Banner */}
        {searchQuery === '' && (
          <SacredTimingBanner onOpenCalendar={() => setCalendarOpen(true)} />
        )}

        <section className="space-y-4">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-medium text-[#4a1515] dark:text-[#f3e7d3]">
              Discover Aartis
            </h2>
            <LanguageSelector 
              selected={preferences.language} 
              onChange={(lang) => {
                if (lang !== 'all') {
                  updatePreference('language', lang);
                }
              }} 
              showAll={false}
            />
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          {searchQuery === '' && (
            <CategoryChips 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onSelect={setSelectedCategory} 
            />
          )}
        </section>

        {showRecents && (
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a38a8a] dark:text-[#8a8d9d] mb-3">
              Recently Viewed
            </h3>
            <div className="grid gap-3">
              {recentList.slice(0, 3).map(aarti => (
                <AartiCard 
                  key={`recent-${aarti.id}`} 
                  aarti={aarti} 
                  isFavorite={isFavorite(aarti.id)} 
                  onToggleFavorite={() => toggleFavorite(aarti.id)} 
                  onAddToPlaylist={() => handleOpenModal(aarti)}
                />
              ))}
            </div>
          </section>
        )}

        {searchQuery === '' && (
          <section>
            <CuratedPlaylistsSection 
              title="Explore Curated Playlists"
              subtitle="Choose handpicked sequences to add to your playlists or start singing"
            />
          </section>
        )}

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#a38a8a] dark:text-[#8a8d9d] mb-3">
            {searchQuery ? 'Search Results' : 'All Aartis'}
          </h3>
          {filteredAartis.length === 0 ? (
            <div className="text-center py-10 px-4 bg-white dark:bg-[#232635] rounded-xl border border-[#e2d5c3] dark:border-[#2a2d3d] space-y-2">
              <p className="font-medium text-[#781f19] dark:text-[#ff8a65]">
                {preferences.language === 'gu'
                  ? 'ગુજરાતી આરતીઓ ટૂંક સમયમાં ઉમેરવામાં આવશે'
                  : preferences.language === 'bn'
                  ? 'বাংলা আরতি শীঘ্রই আসছে'
                  : 'No Aartis found.'}
              </p>
              <p className="text-xs text-[#8a6b6b] dark:text-[#a09c9c]">
                {preferences.language === 'gu' || preferences.language === 'bn'
                  ? 'Aartis in this language are currently in preparation. In the meantime, feel free to explore our Hindi and Marathi collections!'
                  : 'Try searching with different keywords or switch categories.'}
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              {filteredAartis.map(aarti => (
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
        </section>
      </main>

      <AddToPlaylistModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        aarti={selectedAarti} 
      />

      <FestiveCalendarModal
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
      />

      <BottomNavigation />
    </div>
  );
}
