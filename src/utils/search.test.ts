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
    expect(matchesAartiQuery(jagdish, 'tan man dhan')).toBe(true);
    expect(matchesAartiQuery(jagdish, 'तन मन धन')).toBe(true);

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

    const chhathGeet = aartis.find(a => a.id === 'hi_chhath_mai_ke_ghatiya_pe')!;
    expect(chhathGeet).toBeDefined();
    expect(matchesAartiQuery(chhathGeet, 'chhathi mai')).toBe(true);
    expect(matchesAartiQuery(chhathGeet, 'छठी माई')).toBe(true);
    expect(matchesAartiQuery(chhathGeet, 'ghatiya pe')).toBe(true);
    expect(matchesAartiQuery(chhathGeet, 'balakawa')).toBe(true);
    expect(matchesAartiQuery(chhathGeet, 'अरघ')).toBe(true);

    const bahangiyaGeet = aartis.find(a => a.id === 'hi_kaanch_hi_baans_ke_bahangiya')!;
    expect(bahangiyaGeet).toBeDefined();
    expect(matchesAartiQuery(bahangiyaGeet, 'bahangiya')).toBe(true);
    expect(matchesAartiQuery(bahangiyaGeet, 'बहंगिया')).toBe(true);
    expect(matchesAartiQuery(bahangiyaGeet, 'लचकत जाए')).toBe(true);
    expect(matchesAartiQuery(bahangiyaGeet, 'batohiya')).toBe(true);
    expect(matchesAartiQuery(bahangiyaGeet, 'suga')).toBe(true);
    expect(matchesAartiQuery(bahangiyaGeet, 'सुगवा')).toBe(true);

    const kelwaGeet = aartis.find(a => a.id === 'hi_kelwa_ke_paat_par_ugelan_suraj_dev')!;
    expect(kelwaGeet).toBeDefined();
    expect(matchesAartiQuery(kelwaGeet, 'kelwa')).toBe(true);
    expect(matchesAartiQuery(kelwaGeet, 'केलवा')).toBe(true);
    expect(matchesAartiQuery(kelwaGeet, 'झाँके-झुके')).toBe(true);
    expect(matchesAartiQuery(kelwaGeet, 'बरतिया')).toBe(true);
    expect(matchesAartiQuery(kelwaGeet, 'amrood')).toBe(true);

    const ugaGeet = aartis.find(a => a.id === 'hi_uga_ho_suruj_dev')!;
    expect(ugaGeet).toBeDefined();
    expect(matchesAartiQuery(ugaGeet, 'uga ho suruj dev')).toBe(true);
    expect(matchesAartiQuery(ugaGeet, 'उगा हो सुरुज देव')).toBe(true);
    expect(matchesAartiQuery(ugaGeet, 'supwa')).toBe(true);
    expect(matchesAartiQuery(ugaGeet, 'सुपवा')).toBe(true);
    expect(matchesAartiQuery(ugaGeet, 'ललकार')).toBe(true);

    const deenanaathGeet = aartis.find(a => a.id === 'hi_ho_deenanaath_sun_leen_pukaar')!;
    expect(deenanaathGeet).toBeDefined();
    expect(matchesAartiQuery(deenanaathGeet, 'ho deenanaath')).toBe(true);
    expect(matchesAartiQuery(deenanaathGeet, 'दीनानाथ')).toBe(true);
    expect(matchesAartiQuery(deenanaathGeet, 'sun leen pukaar')).toBe(true);
    expect(matchesAartiQuery(deenanaathGeet, 'ललाइल')).toBe(true);
    expect(matchesAartiQuery(deenanaathGeet, 'दुलार')).toBe(true);

    const sonaSatKuniya = aartis.find(a => a.id === 'hi_ho_deenanaath_sona_sat_kuniya')!;
    expect(sonaSatKuniya).toBeDefined();
    expect(matchesAartiQuery(sonaSatKuniya, 'sona sat kuniya')).toBe(true);
    expect(matchesAartiQuery(sonaSatKuniya, 'सोना सट कुनिया')).toBe(true);
    expect(matchesAartiQuery(sonaSatKuniya, 'भिनसार')).toBe(true);
    expect(matchesAartiQuery(sonaSatKuniya, 'baajhiniya')).toBe(true);
    expect(matchesAartiQuery(sonaSatKuniya, 'बाझिनिया')).toBe(true);

    const aathKaath = aartis.find(a => a.id === 'hi_aath_hi_kaath_ke_kothariya')!;
    expect(aathKaath).toBeDefined();
    expect(matchesAartiQuery(aathKaath, 'aath hi kaath')).toBe(true);
    expect(matchesAartiQuery(aathKaath, 'आठ ही काठ')).toBe(true);
    expect(matchesAartiQuery(aathKaath, 'कोठरिया')).toBe(true);
    expect(matchesAartiQuery(aathKaath, 'केवाड़')).toBe(true);
    expect(matchesAartiQuery(aathKaath, 'kodhiya')).toBe(true);
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
