import { describe, it, expect } from 'vitest';
import { matchesAartiQuery, normalizeSearchTerm } from './search';
import { aartis } from '../data/aartis';

describe('search utility and transliteration matching', () => {
  it('normalizes search terms properly', () => {
    expect(normalizeSearchTerm('  DhyanRaja!  ')).toBe('dhyanraja!');
    expect(normalizeSearchTerm("Kharu's Aarti")).toBe('kharus aarti');
  });

  it('finds Dnyaneshwar aarti using both "dhyanraja" and "dnyanraja"', () => {
    const dnyanAarti = aartis.find(a => a.id === 'mr_dnyaneshwar');
    expect(dnyanAarti).toBeDefined();

    expect(matchesAartiQuery(dnyanAarti!, 'dhyanraja')).toBe(true);
    expect(matchesAartiQuery(dnyanAarti!, 'dnyanraja')).toBe(true);
    expect(matchesAartiQuery(dnyanAarti!, 'Dhyaneshwar')).toBe(true);
    expect(matchesAartiQuery(dnyanAarti!, 'dnyaneshwar')).toBe(true);
  });

  it('finds festive aartis by their English transliterations', () => {
    const sukhkarta = aartis.find(a => a.id === 'mr_sukhkarta')!;
    const lavthavti = aartis.find(a => a.id === 'mr_lavthavti')!;
    const durge = aartis.find(a => a.id === 'mr_durge_durgat')!;
    const vitthal = aartis.find(a => a.id === 'mr_yuge_atthavis')!;
    const jagdish = aartis.find(a => a.id === 'hi_om_jai_jagdish_hare')!;
    const ghalin = aartis.find(a => a.id === 'mr_ghalin_lotangan')!;

    expect(matchesAartiQuery(sukhkarta, 'sukhkarta')).toBe(true);
    expect(matchesAartiQuery(sukhkarta, 'sukhakarta')).toBe(true);

    expect(matchesAartiQuery(lavthavti, 'lavthavti')).toBe(true);
    expect(matchesAartiQuery(lavthavti, 'shankar aarti')).toBe(true);

    expect(matchesAartiQuery(durge, 'durge durgat')).toBe(true);

    expect(matchesAartiQuery(vitthal, 'yuge atthavis')).toBe(true);
    expect(matchesAartiQuery(vitthal, 'vithoba')).toBe(true);

    expect(matchesAartiQuery(jagdish, 'om jai jagdish')).toBe(true);
    expect(matchesAartiQuery(jagdish, 'vishnu aarti')).toBe(true);

    expect(matchesAartiQuery(ghalin, 'ghalin lotangan')).toBe(true);

    const moryaMarathi = aartis.find(a => a.id === 'mr_morya_morya')!;
    const moryaHindi = aartis.find(a => a.id === 'hi_morya_morya')!;
    expect(moryaMarathi).toBeDefined();
    expect(moryaHindi).toBeDefined();

    expect(matchesAartiQuery(moryaMarathi, 'morya')).toBe(true);
    expect(matchesAartiQuery(moryaMarathi, 'sumukh')).toBe(true);
    expect(matchesAartiQuery(moryaMarathi, 'sumukhaya')).toBe(true);
    expect(matchesAartiQuery(moryaMarathi, 'मोरया')).toBe(true);
    expect(matchesAartiQuery(moryaMarathi, 'सुमुखाय')).toBe(true);

    expect(matchesAartiQuery(moryaHindi, 'morya')).toBe(true);
    expect(matchesAartiQuery(moryaHindi, 'sumukh')).toBe(true);
    expect(matchesAartiQuery(moryaHindi, 'sumukhaya')).toBe(true);
    expect(matchesAartiQuery(moryaHindi, 'मोरया')).toBe(true);
    expect(matchesAartiQuery(moryaHindi, 'सुमुखाय')).toBe(true);

    const naivedyaMarathi = aartis.find(a => a.id === 'mr_naivedya')!;
    const naivedyaHindi = aartis.find(a => a.id === 'hi_naivedya')!;
    expect(naivedyaMarathi).toBeDefined();
    expect(naivedyaHindi).toBeDefined();

    expect(matchesAartiQuery(naivedyaMarathi, 'sada sarvada')).toBe(true);
    expect(matchesAartiQuery(naivedyaMarathi, 'सदा सर्वदा')).toBe(true);
    expect(matchesAartiQuery(naivedyaMarathi, 'kailas rana')).toBe(true);

    expect(matchesAartiQuery(naivedyaHindi, 'sada sarvada')).toBe(true);
    expect(matchesAartiQuery(naivedyaHindi, 'सदा सर्वदा')).toBe(true);
    expect(matchesAartiQuery(naivedyaHindi, 'kailas rana')).toBe(true);
  });

  it('continues matching original Indic script queries', () => {
    const dnyanAarti = aartis.find(a => a.id === 'mr_dnyaneshwar')!;
    expect(matchesAartiQuery(dnyanAarti, 'ज्ञानेश्वर')).toBe(true);
    expect(matchesAartiQuery(dnyanAarti, 'ज्ञानराजा')).toBe(true);
  });

  it('handles empty or whitespace queries gracefully', () => {
    const aarti = aartis[0];
    expect(matchesAartiQuery(aarti, '')).toBe(true);
    expect(matchesAartiQuery(aarti, '   ')).toBe(true);
  });

  it('ensures every aarti has a valid transliteration in its json data', () => {
    aartis.forEach(aarti => {
      expect(aarti.transliteration).toBeDefined();
      expect(aarti.transliteration!.length).toBeGreaterThan(0);
    });
  });
});
