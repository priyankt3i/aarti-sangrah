import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ChevronLeft, Share2, Heart, Smartphone, ArrowRight, FileText, Languages } from 'lucide-react';
import { aartis } from '../data/aartis';
import { usePreferences } from '../hooks/usePreferences';
import { useFavorites } from '../hooks/useFavorites';
import { useRecentAartis } from '../hooks/useRecentAartis';
import { useWakeLock } from '../hooks/useWakeLock';
import { useAutoScroll } from '../hooks/useAutoScroll';
import { usePlaylists } from '../hooks/usePlaylists';
import { SingingControlDock } from '../components/SingingControlDock';
import { ShareAartiModal } from '../components/ShareAartiModal';
import { cn } from '../lib/utils';
import { LanguageCode } from '../types';

export function AartiReader() {
  const { lang, slug } = useParams<{ lang: LanguageCode; slug: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const playlistId = searchParams.get('playlist');
  const indexParam = searchParams.get('index');
  
  const aarti = useMemo(() => aartis.find(a => a.language === lang && a.slug === slug), [lang, slug]);
  
  const { preferences, updatePreference } = usePreferences();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { addRecent } = useRecentAartis();
  const { getPlaylist } = usePlaylists();
  
  // Playlist logic
  const playlist = playlistId ? getPlaylist(playlistId) : null;
  const currentIndex = indexParam ? parseInt(indexParam, 10) : -1;
  const nextAartiId = playlist && currentIndex >= 0 && currentIndex < playlist.aartiIds.length - 1 
    ? playlist.aartiIds[currentIndex + 1] 
    : null;
  const nextAarti = nextAartiId ? aartis.find(a => a.id === nextAartiId) : null;
  
  const [speed, setSpeed] = useState(preferences.autoScrollSpeed);
  const [fontSize, setFontSize] = useState(preferences.fontSize);
  const [wakeLockActiveLocal, setWakeLockActiveLocal] = useState(preferences.keepAwake);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  useEffect(() => {
    setFontSize(preferences.fontSize);
  }, [preferences.fontSize]);

  const { isSupported: isWakeLockSupported, isActive: isWakeLockActive } = useWakeLock(wakeLockActiveLocal);
  
  const { 
    isScrolling, 
    isPausedByManualScroll, 
    toggleScroll, 
    resumeScroll 
  } = useAutoScroll(speed, true);

  useEffect(() => {
    if (aarti) {
      addRecent(aarti.id);
    }
  }, [aarti, addRecent]);

  if (!aarti) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-medium mb-4">Aarti not found</h2>
        <button onClick={() => navigate('/')} className="px-6 py-2 bg-[#781f19] text-white rounded-full">
          Return Home
        </button>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: aarti.title,
          text: `Read and sing ${aarti.title} on Aarti Sangrah`,
          url: window.location.href,
        });
      } catch (err) {
        console.warn('Share failed', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const getFontFamily = () => {
    switch (aarti.language) {
      case 'gu': return 'font-[Noto_Sans_Gujarati]';
      case 'bn': return 'font-[Noto_Sans_Bengali]';
      default: return 'font-[Noto_Sans_Devanagari]';
    }
  };

  return (
    <div className="pb-32 bg-[#fdfbf7] dark:bg-[#1a1c29] min-h-screen">
      {/* Top Bar */}
      <header className="pt-safe-top sticky top-0 z-40 bg-[#fdfbf7]/90 dark:bg-[#1a1c29]/90 backdrop-blur-md border-b border-[#e2d5c3]/50 dark:border-[#2a2d3d]/50">
        <div className="flex items-center justify-between p-2 max-w-2xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 text-[#4a1515] dark:text-[#f3e7d3] hover:bg-black/5 dark:hover:bg-white/5 rounded-full"
            aria-label="Go back"
          >
            <ChevronLeft size={28} />
          </button>
          <div className="flex gap-1 items-center">
            <button
              onClick={() => updatePreference('showTransliteration', !preferences.showTransliteration)}
              className={cn(
                "p-2 rounded-full transition-colors flex items-center gap-2",
                preferences.showTransliteration 
                  ? "bg-[#781f19]/10 text-[#781f19] dark:bg-[#ffb067]/10 dark:text-[#ffb067]" 
                  : "text-[#8a6b6b] dark:text-[#a09c9c] hover:bg-black/5 dark:hover:bg-white/5"
              )}
              aria-label="Toggle English Transliteration"
              title="Toggle English Transliteration"
            >
              <Languages size={22} />
            </button>
            <button 
              onClick={() => setWakeLockActiveLocal(!wakeLockActiveLocal)}
              className={cn(
                "p-2 rounded-full transition-colors",
                isWakeLockActive ? "text-[#e1a774] dark:text-[#ffb067]" : "text-[#8a6b6b] dark:text-[#a09c9c] hover:bg-black/5 dark:hover:bg-white/5"
              )}
              aria-label={isWakeLockActive ? "Screen awake active" : "Keep screen awake"}
            >
              <Smartphone size={22} />
            </button>
            
            <div className="w-px h-6 bg-[#e2d5c3] dark:bg-[#2a2d3d] mx-1"></div>
            
            <button 
              onClick={() => toggleFavorite(aarti.id)}
              className={cn("p-2 rounded-full", isFavorite(aarti.id) ? "text-[#c2410c] dark:text-[#ffb067]" : "text-[#4a1515] dark:text-[#f3e7d3]")}
              aria-label="Toggle favorite"
            >
              <Heart size={24} className={isFavorite(aarti.id) ? "fill-current" : ""} />
            </button>

            <button 
              onClick={() => setShareModalOpen(true)}
              className="flex items-center gap-1 p-2 text-[#4a1515] dark:text-[#f3e7d3] rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Share Aarti or Export PDF"
              title="Share Aarti or Export PDF"
            >
              <Share2 size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 mt-6">
        <div className="text-center mb-10">
          <h1 className={cn("text-3xl sm:text-4xl font-semibold text-[#781f19] dark:text-[#ff8a65] mb-2", !preferences.showTransliteration && getFontFamily())}>
            {preferences.showTransliteration && aarti.transliteration ? aarti.transliteration : aarti.title}
          </h1>
          <p className="text-[#8a6b6b] dark:text-[#a09c9c]">
            {aarti.deity} • {aarti.dialect ? `${aarti.dialect} • ` : ''}~{aarti.durationMinutes} mins
          </p>

          <div className="flex items-center justify-center gap-2 mt-3">
            <button
              onClick={() => setShareModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white dark:bg-[#232635] hover:bg-orange-50 dark:hover:bg-[#2a2d3d] border border-[#e2d5c3] dark:border-[#2a2d3d] rounded-full text-xs font-semibold text-[#781f19] dark:text-[#ffb067] shadow-xs transition-colors"
              title="Share or Download as PDF with Aarti Sangrah branding & watermark"
            >
              <FileText size={13} className="text-[#c2410c]" />
              <span>Share / Download PDF</span>
            </button>
          </div>

          {!isWakeLockSupported && wakeLockActiveLocal && (
            <p className="text-xs text-[#c2410c] mt-2 bg-[#e1a774]/20 p-2 rounded-lg inline-block">
              Screen wake not supported by your browser. You may need to change device settings.
            </p>
          )}
        </div>

        <div 
          className={cn("space-y-8 pb-10 text-center leading-relaxed", !preferences.showTransliteration && getFontFamily())}
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
          lang={preferences.showTransliteration ? 'en' : aarti.language}
        >
          {aarti.verses.map((verse, vIndex) => (
            <div 
              key={verse.id} 
              className={cn(
                "px-2",
                verse.isChorus ? "text-[#c2410c] dark:text-[#ffb067] font-medium" : "text-[#4a1515] dark:text-[#f3e7d3]"
              )}
            >
              {(preferences.showTransliteration && verse.transliteratedLines ? verse.transliteratedLines : verse.lines).map((line, lIndex) => (
                <p key={lIndex} className="min-h-[1.5em]">{line}</p>
              ))}
            </div>
          ))}
        </div>
        
        {/* End of Aarti mark */}
        <div className="flex flex-col items-center justify-center my-12">
          <span className="text-2xl opacity-50 mb-8" aria-hidden="true">🪔 🪔 🪔</span>
          
          {nextAarti && playlist && (
            <div className="w-full max-w-md bg-white dark:bg-[#2a2d3d] p-6 rounded-2xl shadow-sm border border-[#e2d5c3] dark:border-transparent text-center animate-in fade-in slide-in-from-bottom-4">
              <p className="text-sm text-[#8a6b6b] dark:text-[#a09c9c] mb-2 font-sans">
                Next in {playlist.name}
              </p>
              <h3 className="text-xl font-medium text-[#4a1515] dark:text-[#f3e7d3] mb-6">
                {nextAarti.title}
              </h3>
              <Link
                to={`/aarti/${nextAarti.language}/${nextAarti.slug}?playlist=${playlist.id}&index=${currentIndex + 1}`}
                onClick={() => window.scrollTo(0, 0)}
                className="flex items-center justify-center gap-2 w-full bg-[#781f19] dark:bg-[#c2410c] text-white py-3 rounded-full font-medium shadow-md font-sans"
              >
                <span>Play Next</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Manual Scroll Resume Button */}
      {isPausedByManualScroll && (
        <div className="fixed bottom-[130px] left-0 right-0 flex justify-center z-40 pointer-events-none">
          <button 
            onClick={resumeScroll}
            className="pointer-events-auto bg-[#e1a774] dark:bg-[#c2410c] text-[#4a1515] dark:text-white px-4 py-2 rounded-full shadow-lg font-medium text-sm animate-bounce"
          >
            Resume Autoscroll
          </button>
        </div>
      )}

      {/* Controls */}
      <SingingControlDock
        isAutoScrolling={isScrolling}
        onToggleAutoScroll={toggleScroll}
        autoScrollSpeed={speed}
        onChangeSpeed={setSpeed}
        fontSize={fontSize}
        onChangeFontSize={(newSize) => {
          setFontSize(newSize);
          updatePreference('fontSize', newSize);
        }}
      />

      {/* Share Modal */}
      <ShareAartiModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        aarti={aarti}
      />
    </div>
  );
}
