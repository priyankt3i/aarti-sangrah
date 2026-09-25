import { describe, it, expect } from 'vitest';
import {
  getTodaySacredContext,
  getFestivalsForMonth,
  getFestivalsForDate,
  getCurrentPrahar,
  hinduDayDeities
} from './panchang';
import { adhikMaasSchedule } from '../data/festivals';

describe('Hindu Lunisolar Panchang & Festival Engine', () => {
  it('identifies 2026 Adhik Maas shift correctly', () => {
    expect(adhikMaasSchedule[2026]).toBeDefined();
    expect(adhikMaasSchedule[2026].hasAdhikMaas).toBe(true);
    expect(adhikMaasSchedule[2026].note).toContain('अधिक मास');

    // In 2026, Chhath Puja is in November (13-16 Nov) due to Adhik Maas
    const nov2026Festivals = getFestivalsForMonth(2026, 10); // 10 = November (0-indexed)
    const chhath2026 = nov2026Festivals.find(f => f.id === 'chhath_puja_2026');
    expect(chhath2026).toBeDefined();
    expect(chhath2026?.date).toBe('2026-11-13');
    expect(chhath2026?.endDate).toBe('2026-11-16');

    // In 2025 (standard year), Chhath Puja is in October (25-28 Oct)
    const oct2025Festivals = getFestivalsForMonth(2025, 9); // 9 = October
    const chhath2025 = oct2025Festivals.find(f => f.id === 'chhath_puja_2025');
    expect(chhath2025).toBeDefined();
    expect(chhath2025?.date).toBe('2025-10-25');
  });

  it('provides matching Aartis for specific festival dates like Chhath Puja 2026', () => {
    const fests = getFestivalsForDate('2026-11-16');
    expect(fests.length).toBeGreaterThan(0);
    const chhath = fests[0];
    expect(chhath.recommendedAartiIds).toContain('hi_uga_ho_suruj_dev');
    expect(chhath.recommendedAartiIds).toContain('hi_ho_deenanaath_sona_sat_kuniya');
  });

  it('correctly maps 4 Prahar windows across 24 hours', () => {
    expect(getCurrentPrahar(6).id).toBe('pratah');
    expect(getCurrentPrahar(11).id).toBe('madhyahna');
    expect(getCurrentPrahar(15).id).toBe('aparahna');
    expect(getCurrentPrahar(19).id).toBe('sandhya');
    expect(getCurrentPrahar(23).id).toBe('ratrikaal');
    expect(getCurrentPrahar(2).id).toBe('ratrikaal');
  });

  it('maps Hindu Vaar deities accurately', () => {
    // Sunday (0) = Surya
    expect(hinduDayDeities[0].recommendedAartiIds).toContain('hi_surya_bhagwan');
    // Monday (1) = Shiva
    expect(hinduDayDeities[1].recommendedAartiIds).toContain('hi_shiv_omkara');
    // Tuesday (2) = Hanuman & Ganesha
    expect(hinduDayDeities[2].recommendedAartiIds).toContain('hi_hanuman_chalisa');
    expect(hinduDayDeities[2].recommendedAartiIds).toContain('hi_jai_ganesh_deva');
  });

  it('generates rich sacred context with suggested Aartis for any given date', () => {
    // Test on Chhath Morning Arghya day 2026-11-16
    const testDate = new Date(2026, 10, 16, 6, 0, 0); // 6 AM Nov 16, 2026
    const context = getTodaySacredContext(testDate);

    expect(context.activeFestival).toBeDefined();
    expect(context.activeFestival?.id).toBe('chhath_puja_2026');
    expect(context.activeSubDay?.nameHindi).toContain('उषा अर्घ्य');
    expect(context.suggestedAartis.length).toBeGreaterThan(0);

    const suggestedTitles = context.suggestedAartis.map(a => a.id);
    expect(suggestedTitles).toContain('hi_uga_ho_suruj_dev');
  });

  it('responds to language switching for Marathi vs Hindi suggestions', () => {
    // Test on Friday afternoon (e.g., today 2026-09-25)
    const testDate = new Date(2026, 8, 25, 12, 0, 0); // 12 PM Sep 25, 2026

    // Marathi preference
    const mrContext = getTodaySacredContext(testDate, 'mr');
    expect(mrContext.dayOfWeekDisplay).toContain('शुक्रवार');
    expect(mrContext.suggestedAartis.length).toBeGreaterThan(0);
    // The top suggested Aartis should be Marathi (mr)
    const mrFirstAarti = mrContext.suggestedAartis[0];
    expect(mrFirstAarti.language).toBe('mr');

    // Hindi preference
    const hiContext = getTodaySacredContext(testDate, 'hi', false);
    expect(hiContext.dayOfWeekDisplay).toContain('शुक्रवार');
    expect(hiContext.suggestedAartis.length).toBeGreaterThan(0);
    const hiFirstAarti = hiContext.suggestedAartis[0];
    expect(hiFirstAarti.language).toBe('hi');

    // English Transliteration mode (toggled by the header button)
    const enContext = getTodaySacredContext(testDate, 'hi', true);
    expect(enContext.dayOfWeekDisplay).toContain('Friday');
    expect(enContext.calendarButtonLabel).toBe('Panchang Calendar');
    expect(enContext.badgeLabel).toContain("TODAY'S SACRED FESTIVAL");
    expect(enContext.festivalTitle).toContain('Ganesh Chaturthi');
    expect(enContext.festivalTithi).toBe('Bhadrapada Shukla Chaturthi');
    expect(enContext.aartisSectionTitle).toContain("FESTIVAL'S SPECIAL AARTIS");
  });
});
