import { useState, useRef, type TouchEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info } from 'lucide-react';
import { getFestivalsForMonth, formatISODate } from '../utils/panchang';
import { FestivalEvent, adhikMaasSchedule } from '../data/festivals';
import { aartis } from '../data/aartis';
import { usePreferences } from '../hooks/usePreferences';
import { cn } from '../lib/utils';

interface FestiveCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: Date;
}

const MONTH_NAMES_HI = [
  'जनवरी (January)',
  'फ़रवरी (February)',
  'मार्च (March)',
  'अप्रैल (April)',
  'मई (May)',
  'जून (June)',
  'जुलाई (July)',
  'अगस्त (August)',
  'सितम्बर (September)',
  'अक्टूबर (October)',
  'नवम्बर (November)',
  'दिसम्बर (December)'
];

const MONTH_NAMES_MR = [
  'जानेवारी (January)',
  'फेब्रुवारी (February)',
  'मार्च (March)',
  'एप्रिल (April)',
  'मे (May)',
  'जून (June)',
  'जुलै (July)',
  'ऑगस्ट (August)',
  'सप्टेंबर (September)',
  'ऑक्टोबर (October)',
  'नोव्हेंबर (November)',
  'डिसेंबर (December)'
];

const MONTH_NAMES_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const WEEKDAY_NAMES_HI = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];
const WEEKDAY_NAMES_MR = ['रवि', 'सोम', 'मंगळ', 'बुध', 'गुरु', 'शुक्र', 'शनि'];
const WEEKDAY_NAMES_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const AVAILABLE_YEARS = [2024, 2025, 2026, 2027, 2028, 2029, 2030];

export function FestiveCalendarModal({ isOpen, onClose, initialDate = new Date() }: FestiveCalendarModalProps) {
  const navigate = useNavigate();
  const { preferences } = usePreferences();
  const [selectedYear, setSelectedYear] = useState<number>(initialDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(initialDate.getMonth());
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

  // Swipe gesture detection
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  if (!isOpen) return null;

  const isTranslit = preferences.showTransliteration;
  const isMarathi = !isTranslit && preferences.language === 'mr';

  const todayStr = formatISODate(new Date());
  const festivalsInMonth = getFestivalsForMonth(selectedYear, selectedMonth);
  const adhikInfo = adhikMaasSchedule[selectedYear];

  // Calendar matrix calculation
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

  const currentMonthNames = isTranslit
    ? MONTH_NAMES_EN
    : isMarathi
    ? MONTH_NAMES_MR
    : MONTH_NAMES_HI;

  const currentWeekdayNames = isTranslit
    ? WEEKDAY_NAMES_EN
    : isMarathi
    ? WEEKDAY_NAMES_MR
    : WEEKDAY_NAMES_HI;

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      if (selectedYear > AVAILABLE_YEARS[0]) {
        setSelectedYear(prev => prev - 1);
        setSelectedMonth(11);
      }
    } else {
      setSelectedMonth(prev => prev - 1);
    }
    setSelectedDateStr(null);
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      if (selectedYear < AVAILABLE_YEARS[AVAILABLE_YEARS.length - 1]) {
        setSelectedYear(prev => prev + 1);
        setSelectedMonth(0);
      }
    } else {
      setSelectedMonth(prev => prev + 1);
    }
    setSelectedDateStr(null);
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 50;

    if (diff > minSwipeDistance) {
      handleNextMonth();
    } else if (diff < -minSwipeDistance) {
      handlePrevMonth();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const handleAartiClick = (aartiId: string) => {
    const targetAarti = aartis.find(a => a.id === aartiId);
    if (targetAarti) {
      onClose();
      navigate(`/aarti/${targetAarti.language}/${targetAarti.slug}`);
    }
  };

  // Filter festivals based on whether a specific date was tapped
  const displayedFestivals = selectedDateStr
    ? festivalsInMonth.filter(f => {
        if (f.date === selectedDateStr) return true;
        if (f.endDate && selectedDateStr >= f.date && selectedDateStr <= f.endDate) return true;
        return false;
      })
    : festivalsInMonth;

  // Localized Strings
  const modalTitle = isTranslit
    ? 'Panchang & Sacred Festivals Calendar'
    : isMarathi
    ? 'पंचांग व पावन सण-उत्सव कॅलेंडर'
    : 'पंचांग व पावन पर्व कैलेंडर';

  const modalSubtitle = isTranslit
    ? 'Lunisolar Hindu Festive Calendar'
    : isMarathi
    ? 'हिंदू पंचांग व सण-उत्सव कॅलेंडर'
    : 'Lunisolar Hindu Festive Calendar';

  const yearLabel = isTranslit ? 'Year:' : 'वर्ष (Year):';

  const adhikMaasNoteTitle = isTranslit
    ? '2026 Adhik Maas (Purushottam Month): '
    : isMarathi
    ? '2026 अधिक मास (पुरुषोत्तम मास): '
    : '2026 अधिक मास (पुरुषोत्तम मास): ';

  const adhikMaasNoteText = isTranslit
    ? adhikInfo?.noteEnglish || adhikInfo?.note
    : isMarathi
    ? adhikInfo?.noteMarathi || adhikInfo?.note
    : adhikInfo?.note;

  const swipeHint = isTranslit
    ? '← Swipe left / right to change month →'
    : isMarathi
    ? '← स्वाइप करून महिना बदला (Swipe to change month) →'
    : '← स्वाइप करके महीना बदलें (Swipe to change month) →';

  const clearFilterLabel = isTranslit
    ? 'Show all month'
    : isMarathi
    ? 'संपूर्ण महिना पहा'
    : 'पूरा महीना देखें (Show all month)';

  const sectionHeading = selectedDateStr
    ? (isTranslit ? `Festivals on ${selectedDateStr}:` : isMarathi ? `सण दिनांक ${selectedDateStr}:` : `पर्व दिनांक ${selectedDateStr}:`)
    : (isTranslit
        ? `Major Festivals in ${MONTH_NAMES_EN[selectedMonth]}:`
        : isMarathi
        ? `${MONTH_NAMES_MR[selectedMonth]} मधील प्रमुख सण व व्रत:`
        : `${MONTH_NAMES_HI[selectedMonth]} के प्रमुख व्रत व महापर्व:`);

  const festivalCountBadge = isTranslit
    ? `${displayedFestivals.length} Festivals`
    : isMarathi
    ? `${displayedFestivals.length} सण`
    : `${displayedFestivals.length} पर्व`;

  const emptyStateMessage = selectedDateStr
    ? (isTranslit
        ? 'No major festival recorded on this date. Sing daily Prahar Aartis.'
        : isMarathi
        ? 'या तिथीवर कोणताही विशेष सण नोंदवलेला नाही. दैनिक प्रहर आरती म्हणा.'
        : 'इस तिथि पर कोई विशेष महापर्व दर्ज नहीं है। दैनिक प्रहर आरती गाएँ।')
    : (isTranslit
        ? 'No major festivals recorded in this month.'
        : isMarathi
        ? 'या महिन्यात कोणतेही प्रमुख सण नोंदवलेले नाहीत.'
        : 'इस माह में कोई प्रमुख महापर्व दर्ज नहीं है।');

  const closeButtonLabel = isTranslit
    ? 'Close Calendar'
    : isMarathi
    ? 'कॅलेंडर बंद करा'
    : 'कैलेंडर बंद करें (Done)';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4"
      onClick={onClose}
    >
      <div 
        className="w-full sm:max-w-lg bg-[#fdfbf7] dark:bg-[#1f2230] rounded-t-2xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl border border-[#e2d5c3] dark:border-[#2a2d3d] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#e2d5c3]/70 dark:border-[#2a2d3d]">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-[#e1a774]/20 text-[#781f19] dark:bg-[#c2410c]/20 dark:text-[#ffb067]">
              <CalendarIcon size={20} />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-[#4a1515] dark:text-[#f3e7d3]">
                {modalTitle}
              </h2>
              <p className="text-xs text-[#8a6b6b] dark:text-[#a09c9c]">
                {modalSubtitle}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-[#8a6b6b] hover:bg-black/5 dark:hover:bg-white/5"
            aria-label="Close calendar"
          >
            <X size={22} />
          </button>
        </div>

        {/* Year Selector & Month Controls */}
        <div className="px-5 py-3 bg-[#f7f2ea]/60 dark:bg-[#252837]/60 border-b border-[#e2d5c3]/50 dark:border-[#2a2d3d]/50 flex items-center justify-between gap-2">
          {/* Year selector dropdown */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="year-select" className="text-xs font-medium text-[#8a6b6b] dark:text-[#a09c9c]">
              {yearLabel}
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(Number(e.target.value));
                setSelectedDateStr(null);
              }}
              className="text-sm font-semibold bg-white dark:bg-[#1a1c29] text-[#781f19] dark:text-[#ffb067] border border-[#e2d5c3] dark:border-[#3a3d4d] rounded-lg px-2.5 py-1 focus:outline-hidden"
            >
              {AVAILABLE_YEARS.map(year => (
                <option key={year} value={year}>
                  {year} {year === 2026 ? (isTranslit ? '✦ (Adhik Maas / Leap Month)' : '✦ (अधिक मास / Adhik Maas)') : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Month switcher buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg border border-[#e2d5c3] dark:border-[#3a3d4d] bg-white dark:bg-[#1a1c29] text-[#781f19] dark:text-[#ffb067] hover:bg-orange-50 active:scale-95 transition-transform"
              title="Previous Month (Swipe Right)"
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm font-semibold text-[#4a1515] dark:text-[#f3e7d3] px-2 min-w-[130px] text-center">
              {currentMonthNames[selectedMonth]}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg border border-[#e2d5c3] dark:border-[#3a3d4d] bg-white dark:bg-[#1a1c29] text-[#781f19] dark:text-[#ffb067] hover:bg-orange-50 active:scale-95 transition-transform"
              title="Next Month (Swipe Left)"
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* 2026 Adhik Maas Special Note Banner */}
        {selectedYear === 2026 && (
          <div className="mx-4 mt-3 px-3 py-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200">
            <Info size={16} className="text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">{adhikMaasNoteTitle}</span>
              {adhikMaasNoteText}
            </div>
          </div>
        )}

        {/* Calendar Grid & Swipe Notice */}
        <div className="p-4 overflow-y-auto space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#8a6b6b] dark:text-[#a09c9c]">
                {swipeHint}
              </span>
              {selectedDateStr && (
                <button
                  onClick={() => setSelectedDateStr(null)}
                  className="text-xs text-[#c2410c] dark:text-[#ffb067] font-medium underline"
                >
                  {clearFilterLabel}
                </button>
              )}
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#8a6b6b] dark:text-[#a09c9c] mb-1">
              {currentWeekdayNames.map((w, idx) => (
                <div key={w} className={cn("py-1", idx === 0 && "text-red-600 dark:text-red-400")}>
                  {w}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty offset padding cells */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="h-10 rounded-lg opacity-20" />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const mStr = String(selectedMonth + 1).padStart(2, '0');
                const dStr = String(dayNum).padStart(2, '0');
                const dateKey = `${selectedYear}-${mStr}-${dStr}`;

                const dayFestivals = festivalsInMonth.filter(f => {
                  if (f.date === dateKey) return true;
                  if (f.endDate && dateKey >= f.date && dateKey <= f.endDate) return true;
                  return false;
                });

                const isToday = dateKey === todayStr;
                const isSelected = selectedDateStr === dateKey;
                const hasFestival = dayFestivals.length > 0;

                const festivalTitlesTooltip = dayFestivals
                  .map(f => (isTranslit ? f.name : isMarathi ? (f.nameMarathi || f.nameHindi) : f.nameHindi))
                  .join(', ');

                return (
                  <button
                    key={dateKey}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedDateStr(null);
                      } else {
                        setSelectedDateStr(dateKey);
                      }
                    }}
                    className={cn(
                      "h-11 rounded-lg flex flex-col items-center justify-center text-xs font-medium relative transition-colors border",
                      isSelected
                        ? "bg-[#781f19] text-white border-[#781f19] dark:bg-[#c2410c] dark:border-[#c2410c] shadow-xs"
                        : isToday
                        ? "bg-amber-100 dark:bg-amber-950/50 text-[#781f19] dark:text-[#ffb067] border-amber-300 dark:border-amber-700"
                        : "bg-white dark:bg-[#252837] text-[#4a1515] dark:text-[#e0dede] border-transparent hover:border-[#e2d5c3] dark:hover:border-[#3a3d4d]"
                    )}
                  >
                    <span>{dayNum}</span>
                    {hasFestival && (
                      <span 
                        className={cn(
                          "w-1.5 h-1.5 rounded-full mt-0.5",
                          isSelected ? "bg-amber-300" : "bg-[#c2410c] dark:bg-[#ffb067]"
                        )} 
                        title={festivalTitlesTooltip}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Festival List for the Month / Selected Day */}
          <div className="pt-2 border-t border-[#e2d5c3]/60 dark:border-[#2a2d3d]/60 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#781f19] dark:text-[#ff8a65]">
                <span>{sectionHeading}</span>
              </h3>
              <span className="text-xs bg-[#e1a774]/20 text-[#781f19] dark:bg-[#c2410c]/20 dark:text-[#ffb067] px-2 py-0.5 rounded-full font-medium">
                {festivalCountBadge}
              </span>
            </div>

            {displayedFestivals.length === 0 ? (
              <p className="text-xs text-[#8a6b6b] dark:text-[#a09c9c] py-4 text-center bg-white dark:bg-[#252837] rounded-xl border border-[#e2d5c3]/50 dark:border-[#2a2d3d]">
                {emptyStateMessage}
              </p>
            ) : (
              <div className="space-y-3">
                {displayedFestivals.map((fest: FestivalEvent) => {
                  const isFestToday = fest.date === todayStr || (fest.endDate && todayStr >= fest.date && todayStr <= fest.endDate);

                  const festTitle = isTranslit
                    ? fest.name
                    : isMarathi
                    ? (fest.nameMarathi || fest.nameHindi)
                    : fest.nameHindi;

                  const festSubtitle = isTranslit
                    ? fest.deity
                    : `${fest.name} • ${fest.deity}`;

                  const festTithiDisplay = isTranslit
                    ? `Tithi: ${fest.tithiEnglish}`
                    : isMarathi
                    ? `तिथी: ${fest.tithiMarathi || fest.tithi} (${fest.tithiEnglish})`
                    : `तिथि: ${fest.tithi} (${fest.tithiEnglish})`;

                  const festDescription = isTranslit
                    ? (fest.descriptionEnglish || fest.description)
                    : isMarathi
                    ? (fest.descriptionMarathi || fest.description)
                    : fest.description;

                  const dateSpanDisplay = `${fest.date}${fest.endDate ? (isTranslit ? ` to ${fest.endDate.slice(5)}` : isMarathi ? ` ते ${fest.endDate.slice(5)}` : ` से ${fest.endDate.slice(5)}`) : ''}`;

                  const relatedAartisLabel = isTranslit
                    ? 'Sing related Aartis:'
                    : isMarathi
                    ? 'या सणाची विशेष आरती व भजने (Sing Aartis):'
                    : 'इस पर्व की विशेष आरतियाँ व गीत (Sing related Aartis):';

                  return (
                    <div 
                      key={fest.id}
                      className={cn(
                        "p-3.5 rounded-xl border transition-all space-y-2",
                        isFestToday
                          ? "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-300 dark:border-amber-700 shadow-xs"
                          : "bg-white dark:bg-[#252837] border-[#e2d5c3] dark:border-[#2a2d3d]"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-semibold text-[#4a1515] dark:text-[#f3e7d3]">
                              {festTitle}
                            </h4>
                            {isFestToday && (
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-600 text-white animate-pulse">
                                {isTranslit ? "TODAY • LIVE" : "आज • Live"}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#8a6b6b] dark:text-[#a09c9c]">
                            {festSubtitle}
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-md bg-[#e1a774]/20 text-[#781f19] dark:bg-[#c2410c]/20 dark:text-[#ffb067]">
                            {dateSpanDisplay}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-[#781f19] dark:text-[#ffb067] font-medium flex items-center gap-1.5">
                        <span>{festTithiDisplay}</span>
                      </div>

                      <p className="text-xs text-[#5c3a3a] dark:text-[#c4c1c1] leading-relaxed">
                        {festDescription}
                      </p>

                      {/* Sub-days (if Chhath etc.) */}
                      {fest.subDays && fest.subDays.length > 0 && (
                        <div className="pt-1.5 space-y-1 border-t border-[#e2d5c3]/50 dark:border-[#2a2d3d]/50">
                          <span className="text-[11px] font-semibold text-[#8a6b6b] dark:text-[#a09c9c]">
                            {isTranslit ? 'Sacred Observances:' : 'चार दिवसीय अनुष्ठान:'}
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                            {fest.subDays.map((sub) => {
                              const subName = isTranslit
                                ? sub.name
                                : isMarathi
                                ? (sub.nameMarathi || sub.nameHindi)
                                : sub.nameHindi;

                              const subDesc = isTranslit
                                ? (sub.descriptionEnglish || sub.description)
                                : isMarathi
                                ? (sub.descriptionMarathi || sub.description)
                                : sub.description;

                              return (
                                <div 
                                  key={sub.date} 
                                  className="text-[11px] p-2 rounded-lg bg-[#fdfbf7] dark:bg-[#1a1c29] border border-[#e2d5c3]/40 dark:border-[#2a2d3d]"
                                >
                                  <div className="font-semibold text-[#781f19] dark:text-[#ff8a65]">
                                    {subName} ({sub.date.slice(5)})
                                  </div>
                                  <div className="text-[#8a6b6b] dark:text-[#a09c9c] text-[10px] mt-0.5">
                                    {subDesc}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Recommended Aartis for this festival */}
                      {fest.recommendedAartiIds && fest.recommendedAartiIds.length > 0 && (
                        <div className="pt-2 border-t border-[#e2d5c3]/50 dark:border-[#2a2d3d]/50">
                          <p className="text-[11px] font-semibold text-[#781f19] dark:text-[#ff8a65] mb-1.5">
                            {relatedAartisLabel}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {fest.recommendedAartiIds.map((aId) => {
                              const item = aartis.find(a => a.id === aId);
                              if (!item) return null;
                              const displayAartiTitle = isTranslit && item.transliteration
                                ? item.transliteration
                                : item.title;

                              return (
                                <button
                                  key={aId}
                                  onClick={() => handleAartiClick(aId)}
                                  className="text-xs px-2.5 py-1 rounded-full bg-white dark:bg-[#1a1c29] text-[#781f19] dark:text-[#ffb067] border border-[#e2d5c3] dark:border-[#3a3d4d] hover:bg-orange-50 active:scale-95 transition-all text-left"
                                >
                                  🪔 {displayAartiTitle}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#f7f2ea]/60 dark:bg-[#252837]/60 border-t border-[#e2d5c3]/70 dark:border-[#2a2d3d] text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-[#781f19] dark:bg-[#c2410c] text-white rounded-xl text-sm font-semibold active:scale-[0.98] transition-transform"
          >
            {closeButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
