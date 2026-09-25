import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Flame, ChevronRight } from 'lucide-react';
import { getTodaySacredContext } from '../utils/panchang';
import { usePreferences } from '../hooks/usePreferences';
import { cn } from '../lib/utils';
import { Aarti } from '../types';

interface SacredTimingBannerProps {
  onOpenCalendar?: () => void;
}

export function SacredTimingBanner({ onOpenCalendar: _onOpenCalendar }: SacredTimingBannerProps) {
  const navigate = useNavigate();
  const { preferences } = usePreferences();
  
  // Re-compute sacred context whenever language or transliteration toggle changes
  const context = useMemo(
    () => getTodaySacredContext(new Date(), preferences.language, preferences.showTransliteration),
    [preferences.language, preferences.showTransliteration]
  );

  const {
    todayFormatted,
    dayOfWeekDisplay,
    praharName,
    praharTimeRange,
    praharSignificance,
    deitiesDisplay,
    badgeLabel,
    festivalTitle,
    festivalSubtitle,
    festivalTithi,
    festivalDescription,
    aartisSectionTitle,
    activeFestival,
    upcomingFestivals,
    suggestedAartis
  } = context;

  const primaryFestival = activeFestival || (upcomingFestivals.length > 0 ? upcomingFestivals[0].festival : null);
  const isLiveToday = !!activeFestival;

  // Filter suggested Aartis prioritizing current language
  const filteredSuggestions = useMemo(() => {
    if (preferences.language === 'all') return suggestedAartis.slice(0, 4);
    const matching = suggestedAartis.filter(a => a.language === preferences.language);
    if (matching.length >= 2) return matching.slice(0, 4);
    return suggestedAartis.slice(0, 4);
  }, [suggestedAartis, preferences.language]);

  return (
    <section className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#fff7ed] via-[#fffdf9] to-[#fef2f2] dark:from-[#2a221b] dark:via-[#212330] dark:to-[#2b1f24] border border-[#f0d8bd] dark:border-[#3e342f] shadow-xs space-y-4">
      {/* Top Bar: Date, Hindu Vaar & Current Prahar */}
      <div className="flex items-center gap-2 border-b border-[#ebd7c2]/70 dark:border-[#3a3d4d]/70 pb-3">
        <span className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-[#c2410c] dark:text-[#ffb067]">
          <Clock size={16} />
        </span>
        <div>
          <div className="text-xs font-bold text-[#781f19] dark:text-[#ffb067]">
            {dayOfWeekDisplay} • {todayFormatted}
          </div>
          <div className="text-[11px] text-[#8a6b6b] dark:text-[#a09c9c]">
            {praharName} ({praharTimeRange})
          </div>
        </div>
      </div>

      {/* Festival Spotlight (Active or Upcoming) */}
      {primaryFestival ? (
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span 
                  className={cn(
                    "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full text-white",
                    isLiveToday ? "bg-red-600 animate-pulse" : "bg-amber-600"
                  )}
                >
                  {badgeLabel}
                </span>
                <span className="text-xs font-medium text-[#c2410c] dark:text-[#ffb067]">
                  {festivalTithi}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#4a1515] dark:text-[#f3e7d3] mt-1">
                {festivalTitle}
              </h3>
              <p className="text-xs text-[#8a6b6b] dark:text-[#a09c9c]">
                {festivalSubtitle}
              </p>
            </div>
          </div>

          <p className="text-xs text-[#5c3a3a] dark:text-[#c4c1c1] leading-relaxed">
            {festivalDescription}
          </p>
        </div>
      ) : (
        /* Daily Vaar & Deity Spotlight when no festival is active right now */
        <div className="space-y-1">
          <div className="text-xs font-semibold text-[#c2410c] dark:text-[#ffb067]">
            <span>
              {preferences.showTransliteration
                ? "Today's Deities & Sacred Time:"
                : preferences.language === 'mr'
                ? "आजचे आराध्य व पावन वेळ:"
                : "आज का आराध्य व पावन समय:"}
            </span>
          </div>
          <h3 className="text-base font-bold text-[#4a1515] dark:text-[#f3e7d3]">
            {deitiesDisplay}
          </h3>
          <p className="text-xs text-[#8a6b6b] dark:text-[#a09c9c]">
            {praharSignificance}
          </p>
        </div>
      )}

      {/* Suggested Aartis based on Time / Festival - responds to selected language & transliteration */}
      {filteredSuggestions.length > 0 && (
        <div className="pt-2 border-t border-[#ebd7c2]/60 dark:border-[#3a3d4d]/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#781f19] dark:text-[#ffb067] flex items-center gap-1">
              <Flame size={13} className="text-[#c2410c]" />
              <span>{aartisSectionTitle}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filteredSuggestions.map((aarti: Aarti) => {
              const displayTitle = preferences.showTransliteration && aarti.transliteration
                ? aarti.transliteration
                : aarti.title;

              const displayLang = preferences.showTransliteration
                ? (aarti.language === 'hi' ? 'Hindi' : aarti.language === 'mr' ? 'Marathi' : aarti.language.toUpperCase())
                : (aarti.dialect || (aarti.language === 'mr' ? 'मराठी' : aarti.language === 'hi' ? 'हिंदी' : aarti.language.toUpperCase()));

              return (
                <button
                  key={aarti.id}
                  onClick={() => navigate(`/aarti/${aarti.language}/${aarti.slug}`)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#1a1c29] border border-[#ebd7c2] dark:border-[#3a3d4d] hover:border-[#c2410c] dark:hover:border-[#ffb067] active:scale-[0.98] transition-all text-left shadow-xs group"
                >
                  <div className="pr-2 min-w-0">
                    <div className="text-sm font-semibold text-[#4a1515] dark:text-[#f3e7d3] truncate group-hover:text-[#c2410c] dark:group-hover:text-[#ffb067] transition-colors">
                      {displayTitle}
                    </div>
                    <div className="text-[11px] text-[#8a6b6b] dark:text-[#a09c9c] truncate">
                      {aarti.deity} • {displayLang}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-[#d1c4c4] group-hover:text-[#c2410c] dark:group-hover:text-[#ffb067] shrink-0 transition-colors" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
