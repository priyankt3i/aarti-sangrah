import { festivalsData, FestivalEvent, adhikMaasSchedule, AdhikMaasInfo } from '../data/festivals';
import { aartis } from '../data/aartis';
import { Aarti, LanguageCode } from '../types';

export interface PraharInfo {
  id: 'pratah' | 'madhyahna' | 'aparahna' | 'sandhya' | 'ratrikaal';
  nameHindi: string;
  nameMarathi: string;
  nameEnglish: string;
  timeRange: string;
  significanceHindi: string;
  significanceMarathi: string;
  significanceEnglish: string;
}

export interface DayDeityInfo {
  dayIndex: number;
  dayNameHindi: string;
  dayNameMarathi: string;
  dayNameEnglish: string;
  deitiesHindi: string;
  deitiesMarathi: string;
  deitiesEnglish: string;
  recommendedAartiIds: string[];
}

export interface SacredContext {
  todayDateStr: string;
  todayFormatted: string;
  dayOfWeekDisplay: string;
  dayOfWeekEnglish: string;
  praharName: string;
  praharTimeRange: string;
  praharSignificance: string;
  deitiesDisplay: string;
  calendarButtonLabel: string;
  badgeLabel: string;
  festivalTitle: string;
  festivalSubtitle: string;
  festivalTithi: string;
  festivalDescription: string;
  aartisSectionTitle: string;
  prahar: PraharInfo;
  dayDeity: DayDeityInfo;
  activeFestival: FestivalEvent | null;
  activeSubDay: {
    date: string;
    name: string;
    nameHindi: string;
    nameMarathi?: string;
    description: string;
    descriptionMarathi?: string;
    descriptionEnglish?: string;
    recommendedAartiIds: string[];
  } | null;
  upcomingFestivals: {
    festival: FestivalEvent;
    daysRemaining: number;
  }[];
  adhikMaasInfo: AdhikMaasInfo | null;
  suggestedAartis: Aarti[];
}

export const hinduDayDeities: Record<number, DayDeityInfo> = {
  0: {
    dayIndex: 0,
    dayNameHindi: "रविवार (Ravivar)",
    dayNameMarathi: "रविवार (Ravivar)",
    dayNameEnglish: "Sunday",
    deitiesHindi: "भगवान सूर्य देव व गायत्री माता",
    deitiesMarathi: "भगवान सूर्यदेव व गायत्री माता",
    deitiesEnglish: "Lord Surya & Gayatri Mata",
    recommendedAartiIds: ["hi_surya_bhagwan", "hi_gayatri_mata", "mr_pradakshina"]
  },
  1: {
    dayIndex: 1,
    dayNameHindi: "सोमवार (Somvar)",
    dayNameMarathi: "सोमवार (Somvar)",
    dayNameEnglish: "Monday",
    deitiesHindi: "देवाधिदेव महादेव शिव शंकर",
    deitiesMarathi: "देवाधिदेव महादेव शिवशंकर",
    deitiesEnglish: "Lord Shiva",
    recommendedAartiIds: ["mr_shankar_2", "hi_shiv_omkara", "mr_karpur_gauram", "mr_shankar_3"]
  },
  2: {
    dayIndex: 2,
    dayNameHindi: "मंगलवार (Mangalvar)",
    dayNameMarathi: "मंगळवार (Mangalvar)",
    dayNameEnglish: "Tuesday",
    deitiesHindi: "संकटमोचन श्री हनुमान जी व विघ्नहर्ता गणेश जी",
    deitiesMarathi: "संकटमोचन श्री हनुमान व विघ्नहर्ता गणपती बाप्पा",
    deitiesEnglish: "Lord Hanuman & Lord Ganesha",
    recommendedAartiIds: ["mr_sukhkarta", "hi_hanuman_chalisa", "hi_sankatmochan_hanuman", "mr_shendur_lal", "hi_jai_ganesh_deva"]
  },
  3: {
    dayIndex: 3,
    dayNameHindi: "बुधवार (Budhvar)",
    dayNameMarathi: "बुधवार (Budhvar)",
    dayNameEnglish: "Wednesday",
    deitiesHindi: "भगवान श्री कृष्ण व विट्ठल-रुक्मिणी",
    deitiesMarathi: "भगवान श्रीकृष्ण व विठ्ठल-रुक्मिणी",
    deitiesEnglish: "Lord Krishna & Lord Vitthal",
    recommendedAartiIds: ["mr_yuge_atthavis", "mr_yei_ho_vitthale", "hi_kunj_bihari", "mr_krishna_madangopala"]
  },
  4: {
    dayIndex: 4,
    dayNameHindi: "गुरुवार (Guruvar)",
    dayNameMarathi: "गुरुवार (Guruvar)",
    dayNameEnglish: "Thursday",
    deitiesHindi: "श्री गुरुदेव दत्त, स्वामी समर्थ व साईं बाबा",
    deitiesMarathi: "श्री गुरुदेव दत्त, स्वामी समर्थ व साईबाबा",
    deitiesEnglish: "Guru Dattatreya, Swami Samarth & Sai Baba",
    recommendedAartiIds: ["mr_swami_samarth", "mr_datta", "mr_sai_baba", "hi_brihaspati_deva"]
  },
  5: {
    dayIndex: 5,
    dayNameHindi: "शुक्रवार (Shukravar)",
    dayNameMarathi: "शुक्रवार (Shukravar)",
    dayNameEnglish: "Friday",
    deitiesHindi: "माता महालक्ष्मी, संतोषी माता व माँ दुर्गा",
    deitiesMarathi: "माता महालक्ष्मी, संतोषी माता व श्री दुर्गा देवी",
    deitiesEnglish: "Maa Lakshmi, Santoshi Mata & Durga",
    recommendedAartiIds: ["mr_durge_durgat", "hi_lakshmi_mata", "hi_ambe_gauri", "hi_santoshi_mata"]
  },
  6: {
    dayIndex: 6,
    dayNameHindi: "शनिवार (Shanivar)",
    dayNameMarathi: "शनिवार (Shanivar)",
    dayNameEnglish: "Saturday",
    deitiesHindi: "न्याय देवता शनि देव व श्री हनुमान जी",
    deitiesMarathi: "न्यायदेवता शनिदेव व श्री मारुतीराया",
    deitiesEnglish: "Lord Shani & Lord Hanuman",
    recommendedAartiIds: ["mr_maruti_stotra", "hi_shanidev", "hi_hanuman_lala", "hi_hanuman_chalisa"]
  }
};

export function getCurrentPrahar(hours: number): PraharInfo {
  if (hours >= 4 && hours < 9) {
    return {
      id: 'pratah',
      nameHindi: 'प्रातःकाल (ब्रह्म मुहूर्त व उषा प्रहर)',
      nameMarathi: 'प्रातःकाळ (काकड आरती व उषा प्रहर)',
      nameEnglish: 'Pratahkaal (Morning Dawn)',
      timeRange: '4:00 AM - 9:00 AM',
      significanceHindi: 'काकड आरती, मंगलाचरण, सूर्य वंदना व दिन के शुभारंभ की मंगल स्तुति।',
      significanceMarathi: 'काकड आरती, मंगलाचरण, सूर्य वंदना व दिवसाच्या सुरुवातीची मंगल स्तुती.',
      significanceEnglish: 'Dawn awakening, Kakad Aarti, Surya Vandana, and morning auspicious chants.'
    };
  }
  if (hours >= 9 && hours < 13) {
    return {
      id: 'madhyahna',
      nameHindi: 'मध्याह्न प्रहर (नैवेद्य व पूजा)',
      nameMarathi: 'मध्यान्ह प्रहर (नैवेद्य व दुपारची पूजा)',
      nameEnglish: 'Madhyahna (Noon Prahar)',
      timeRange: '9:00 AM - 1:00 PM',
      significanceHindi: 'देवताओं को पावन नैवेद्य, भोग समर्पण व मध्याह्न मंगल आरती।',
      significanceMarathi: 'देवतांना पावन नैवेद्य, समर्पण व दुपारची मंगल आरती.',
      significanceEnglish: 'Noon offerings, sacred naivedya bhog, and midday prayer rituals.'
    };
  }
  if (hours >= 13 && hours < 17) {
    return {
      id: 'aparahna',
      nameHindi: 'अपराह्न प्रहर (चालीसा व स्मरण)',
      nameMarathi: 'अपराह्न प्रहर (नामस्मरण व स्तवन)',
      nameEnglish: 'Aparahna (Afternoon Chants)',
      timeRange: '1:00 PM - 5:00 PM',
      significanceHindi: 'शांत मन से चालीसा पाठ, नाम जप व स्तुति गान का पावन समय।',
      significanceMarathi: 'शांत चित्ताने नामजप, स्तुती व ध्यान करण्याचा पावन समय.',
      significanceEnglish: 'Peaceful afternoon hours ideal for Chalisa recitations, stutis, and mantra chanting.'
    };
  }
  if (hours >= 17 && hours < 21) {
    return {
      id: 'sandhya',
      nameHindi: 'संध्या प्रहर (दीपदान व सांध्य आरती)',
      nameMarathi: 'संध्याकाळ (दीपप्रज्वलन व धूपारती)',
      nameEnglish: 'Sandhyakaal (Twilight Dusk)',
      timeRange: '5:00 PM - 9:00 PM',
      significanceHindi: 'संध्या दीप प्रज्वलन, धूप आरती व परिवार सहित मंगल गान।',
      significanceMarathi: 'सांजवात, दीपदान, धूपारती व कौटुंबिक मंगल गान.',
      significanceEnglish: 'Lighting the evening lamp, Dhoop Aarti, and twilight devotional singing.'
    };
  }
  return {
    id: 'ratrikaal',
    nameHindi: 'रात्रि प्रहर (शेजारती व विश्राम)',
    nameMarathi: 'रात्रिकाळ (शेजारती व विश्रांती)',
    nameEnglish: 'Shej / Ratrikaal (Night Rest)',
    timeRange: '9:00 PM - 4:00 AM',
    significanceHindi: 'शेजारती, प्रभु को शयन विश्राम समर्पण व शांति मंत्र पाठ।',
    significanceMarathi: 'शेजारती, प्रभूंच्या चरणी विश्राम समर्पण व शांतता मंत्र.',
    significanceEnglish: 'Night repose, Shejarati, and closing peace mantras before restful sleep.'
  };
}

export function formatISODate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getFestivalsForMonth(year: number, monthIndex: number): FestivalEvent[] {
  const monthStr = String(monthIndex + 1).padStart(2, '0');
  const monthPrefix = `${year}-${monthStr}`;

  return festivalsData.filter(f => {
    if (f.date.startsWith(monthPrefix)) return true;
    if (f.endDate && f.endDate.startsWith(monthPrefix)) return true;
    if (f.endDate && f.date <= `${year}-${monthStr}-31` && f.endDate >= `${year}-${monthStr}-01`) {
      return true;
    }
    return false;
  }).sort((a, b) => a.date.localeCompare(b.date));
}

export function getFestivalsForDate(dateStr: string): FestivalEvent[] {
  return festivalsData.filter(f => {
    if (f.date === dateStr) return true;
    if (f.endDate && dateStr >= f.date && dateStr <= f.endDate) return true;
    return false;
  });
}

export function getTodaySacredContext(
  currentDate: Date = new Date(),
  preferredLanguage: LanguageCode | 'all' = 'all',
  showTransliteration: boolean = false
): SacredContext {
  const todayDateStr = formatISODate(currentDate);
  const dayOfWeek = currentDate.getDay();
  const hours = currentDate.getHours();

  const prahar = getCurrentPrahar(hours);
  const dayDeity = hinduDayDeities[dayOfWeek];
  const year = currentDate.getFullYear();
  const adhikMaasInfo = adhikMaasSchedule[year] || null;

  // Active festivals today
  const activeMatches = getFestivalsForDate(todayDateStr);
  const activeFestival = activeMatches.length > 0 ? activeMatches[0] : null;

  // Check subday (e.g., specific Chhath day)
  let activeSubDay = null;
  if (activeFestival?.subDays) {
    activeSubDay = activeFestival.subDays.find(s => s.date === todayDateStr) || null;
  }

  // Upcoming festivals in next 7 days
  const upcomingFestivals: { festival: FestivalEvent; daysRemaining: number }[] = [];
  const currentTimestamp = new Date(todayDateStr).getTime();

  festivalsData.forEach(fest => {
    const festStartTimestamp = new Date(fest.date).getTime();
    const diffDays = Math.round((festStartTimestamp - currentTimestamp) / (1000 * 60 * 60 * 24));
    if (diffDays > 0 && diffDays <= 7) {
      upcomingFestivals.push({
        festival: fest,
        daysRemaining: diffDays
      });
    }
  });

  upcomingFestivals.sort((a, b) => a.daysRemaining - b.daysRemaining);

  // Suggested Aartis prioritization
  const candidateIds: string[] = [];

  // 1. Current subday or active festival
  if (activeSubDay?.recommendedAartiIds) {
    activeSubDay.recommendedAartiIds.forEach(id => candidateIds.push(id));
  }
  if (activeFestival?.recommendedAartiIds) {
    activeFestival.recommendedAartiIds.forEach(id => candidateIds.push(id));
  }

  // 2. Immediate upcoming festival (if within 3 days)
  if (upcomingFestivals.length > 0 && upcomingFestivals[0].daysRemaining <= 3) {
    upcomingFestivals[0].festival.recommendedAartiIds.forEach(id => candidateIds.push(id));
  }

  // 3. Today's Vaar deity
  dayDeity.recommendedAartiIds.forEach(id => candidateIds.push(id));

  // 4. Prahar specific additions
  if (prahar.id === 'pratah') {
    candidateIds.push('mr_kakad_aarti', 'hi_gayatri_mata');
  } else if (prahar.id === 'madhyahna') {
    candidateIds.push('mr_naivedya', 'hi_naivedya');
  } else if (prahar.id === 'sandhya') {
    candidateIds.push('mr_dhooparti');
  } else if (prahar.id === 'ratrikaal') {
    candidateIds.push('mr_shejarati', 'mr_shanti_mantra');
  }

  // Deduplicate preserving order
  const uniqueCandidateIds = Array.from(new Set(candidateIds));

  // Resolve Aarti objects
  const candidateAartis = uniqueCandidateIds
    .map(id => aartis.find(a => a.id === id))
    .filter((a): a is Aarti => !!a);

  // Filter & rank based on preferredLanguage
  let resolvedAartis: Aarti[] = [];
  if (preferredLanguage === 'all') {
    resolvedAartis = candidateAartis;
  } else {
    const matchingLangAartis = candidateAartis.filter(a => a.language === preferredLanguage);
    const otherLangAartis = candidateAartis.filter(a => a.language !== preferredLanguage);
    resolvedAartis = [...matchingLangAartis, ...otherLangAartis];
  }

  const isMarathi = preferredLanguage === 'mr';
  const primaryFestival = activeFestival || (upcomingFestivals.length > 0 ? upcomingFestivals[0].festival : null);
  const isLiveToday = !!activeFestival;
  const daysUntil = !isLiveToday && upcomingFestivals.length > 0 ? upcomingFestivals[0].daysRemaining : 0;

  const monthsHindi = ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितम्बर', 'अक्टूबर', 'नवम्बर', 'दिसम्बर'];
  const monthsMarathi = ['जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून', 'जुलै', 'ऑगस्ट', 'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर', 'डिसेंबर'];
  const monthsEnglish = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let todayFormatted = '';
  let dayOfWeekDisplay = '';
  let praharName = '';
  let praharSignificance = '';
  let deitiesDisplay = '';
  let calendarButtonLabel = '';
  let badgeLabel = '';
  let festivalTitle = '';
  let festivalSubtitle = '';
  let festivalTithi = '';
  let festivalDescription = '';
  let aartisSectionTitle = '';

  if (showTransliteration) {
    todayFormatted = `${currentDate.getDate()} ${monthsEnglish[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    dayOfWeekDisplay = `${dayDeity.dayNameEnglish}`;
    praharName = `${prahar.nameEnglish}`;
    praharSignificance = `${prahar.significanceEnglish}`;
    deitiesDisplay = `${dayDeity.deitiesEnglish}`;
    calendarButtonLabel = 'Panchang Calendar';
    badgeLabel = isLiveToday 
      ? "🔴 TODAY'S SACRED FESTIVAL" 
      : `UPCOMING FESTIVAL • ${daysUntil} DAYS LEFT`;
    
    if (primaryFestival) {
      festivalTitle = activeSubDay ? activeSubDay.name : primaryFestival.name;
      festivalSubtitle = `${primaryFestival.name} • ${primaryFestival.deity}`;
      festivalTithi = primaryFestival.tithiEnglish;
      festivalDescription = activeSubDay?.descriptionEnglish || primaryFestival.descriptionEnglish || activeSubDay?.description || primaryFestival.description;
    }

    aartisSectionTitle = isLiveToday
      ? "FESTIVAL'S SPECIAL AARTIS (SING NOW):"
      : "RECOMMENDED AARTIS FOR THIS PRAHAR & DAY:";
  } else if (isMarathi) {
    todayFormatted = `${currentDate.getDate()} ${monthsMarathi[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    dayOfWeekDisplay = `${dayDeity.dayNameMarathi}`;
    praharName = `${prahar.nameMarathi}`;
    praharSignificance = `${prahar.significanceMarathi}`;
    deitiesDisplay = `${dayDeity.deitiesMarathi}`;
    calendarButtonLabel = 'पंचांग कॅलेंडर';
    badgeLabel = isLiveToday 
      ? "🔴 आजचा पावन सण / उत्सव" 
      : `आगामी सण • ${daysUntil} दिवस बाकी`;

    if (primaryFestival) {
      festivalTitle = activeSubDay?.nameMarathi || activeSubDay?.nameHindi || primaryFestival.nameMarathi || primaryFestival.nameHindi;
      festivalSubtitle = `${primaryFestival.name} • ${primaryFestival.deity}`;
      festivalTithi = primaryFestival.tithiMarathi || primaryFestival.tithi;
      festivalDescription = activeSubDay?.descriptionMarathi || primaryFestival.descriptionMarathi || activeSubDay?.description || primaryFestival.description;
    }

    aartisSectionTitle = isLiveToday
      ? "उत्सवाची प्रमुख आरती व भजने (आता म्हणा):"
      : "वर्तमान प्रहर व वारानुसार सुचवलेल्या आरत्या:";
  } else {
    todayFormatted = `${currentDate.getDate()} ${monthsHindi[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    dayOfWeekDisplay = `${dayDeity.dayNameHindi}`;
    praharName = `${prahar.nameHindi}`;
    praharSignificance = `${prahar.significanceHindi}`;
    deitiesDisplay = `${dayDeity.deitiesHindi}`;
    calendarButtonLabel = 'पंचांग कैलेंडर';
    badgeLabel = isLiveToday 
      ? "🔴 आज का पावन महापर्व" 
      : `आगामी पर्व • ${daysUntil} दिन शेष`;

    if (primaryFestival) {
      festivalTitle = activeSubDay ? activeSubDay.nameHindi : primaryFestival.nameHindi;
      festivalSubtitle = `${primaryFestival.name} • ${primaryFestival.deity}`;
      festivalTithi = primaryFestival.tithi;
      festivalDescription = activeSubDay ? activeSubDay.description : primaryFestival.description;
    }

    aartisSectionTitle = isLiveToday
      ? "पर्व की मुख्य आरतियाँ व गीत (SING NOW):"
      : "वर्तमान प्रहर व दिवस हेतु सुझाई गई आरतियाँ:";
  }

  return {
    todayDateStr,
    todayFormatted,
    dayOfWeekDisplay,
    dayOfWeekEnglish: dayDeity.dayNameEnglish,
    praharName,
    praharTimeRange: prahar.timeRange,
    praharSignificance,
    deitiesDisplay,
    calendarButtonLabel,
    badgeLabel,
    festivalTitle,
    festivalSubtitle,
    festivalTithi,
    festivalDescription,
    aartisSectionTitle,
    prahar,
    dayDeity,
    activeFestival,
    activeSubDay,
    upcomingFestivals,
    adhikMaasInfo,
    suggestedAartis: resolvedAartis
  };
}
