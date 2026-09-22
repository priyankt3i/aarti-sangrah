export interface CuratedPlaylist {
  id: string;
  name: string;
  hindiName: string;
  subtitle: string;
  description: string;
  badge: string;
  iconName: 'Sun' | 'Sparkles' | 'Flame' | 'Shield' | 'Moon' | 'Music' | 'Heart';
  gradient: string;
  aartiIds: string[];
}

export const curatedPlaylists: CuratedPlaylist[] = [
  {
    id: 'curated_kharus_ganesh_chaturthi',
    name: 'Kharu’s Ganesh Chaturthi',
    hindiName: 'खारू गणेश चतुर्थी विशेष',
    subtitle: 'Classic festive singing order with Bappa, Shankar, Devi & Vitthal',
    description: 'Special Ganesh Chaturthi sequence in sacred order: starting with Sukhkarta Dukhharta, followed by Lavthavti Vikrala, Durge Durgat Bhari, Yuge Atthavis, Yei Ho Vitthale, Sant Dnyaneshwar Aarti, Om Jai Jagdish Hare, Ghalin Lotangan, Morya Morya, and concluding with Naivedya (Sada Sarvada Yoga Tuza).',
    badge: 'Special Sangrah',
    iconName: 'Flame',
    gradient: 'from-[#ea580c] to-[#991b1b]',
    aartiIds: [
      'mr_sukhkarta',
      'mr_lavthavti',
      'mr_durge_durgat',
      'mr_yuge_atthavis',
      'mr_yei_ho_vitthale',
      'mr_dnyaneshwar',
      'hi_om_jai_jagdish_hare',
      'mr_ghalin_lotangan',
      'mr_morya_morya',
      'mr_naivedya'
    ]
  },
  {
    id: 'curated_daily_morning',
    name: 'Daily Morning Puja',
    hindiName: 'नित्य प्रातः पूजा',
    subtitle: 'Begin your day with peace, purity & auspiciousness',
    description: 'Essential morning sequence starting with Lord Ganesha, followed by the universal Vishnu prayer, Gayatri Mata, Surya Dev, and sacred Tulsi.',
    badge: 'Daily Ritual',
    iconName: 'Sun',
    gradient: 'from-[#c2410c] to-[#781f19]',
    aartiIds: [
      'hi_jai_ganesh_deva',
      'hi_om_jai_jagdish_hare',
      'hi_gayatri_mata',
      'hi_surya_bhagwan',
      'hi_tulsi_mata',
      'mr_karpur_gauram'
    ]
  },
  {
    id: 'curated_ganesh_utsav',
    name: 'Ganesh Utsav & Sankashti',
    hindiName: 'गणेश उत्सव व संकष्टी',
    subtitle: 'Vighnaharta Bappa complete singing sequence',
    description: 'The beloved traditional Aarti sequence sung across Maharashtra and India during Ganesh Chaturthi, Tuesday pujas, and monthly Sankashti Chaturthi.',
    badge: 'Festive Special',
    iconName: 'Flame',
    gradient: 'from-[#ea580c] to-[#b91c1c]',
    aartiIds: [
      'mr_sukhkarta',
      'mr_shendur_lal',
      'mr_nana_parimal',
      'mr_ganapati_stotra',
      'hi_jai_ganesh_deva',
      'mr_ghalin_lotangan',
      'mr_mantrapushpanjali'
    ]
  },
  {
    id: 'curated_navratri_durga',
    name: 'Navratri & Durga Sangrah',
    hindiName: 'नवरात्री व देवी उपासना',
    subtitle: 'Divine Mother Shakti hymns & garba stutis',
    description: 'Sacred Aartis celebrating Maa Ambe, Jagdamba Kali, Mahalakshmi, and Saraswati for Navratri, Friday pujas, and daily Devi devotion.',
    badge: 'Mata Ki Chowki',
    iconName: 'Sparkles',
    gradient: 'from-[#be123c] to-[#831843]',
    aartiIds: [
      'hi_ambe_gauri',
      'hi_ambe_tu_hai_jagdambe',
      'mr_durge_durgat',
      'hi_lakshmi_mata',
      'hi_saraswati_mata',
      'gu_jai_adhya_shakti'
    ]
  },
  {
    id: 'curated_sankat_mochan_hanuman',
    name: 'Sankat Mochan Hanuman',
    hindiName: 'संकटमोचन हनुमान संग्रह',
    subtitle: 'Courage, strength, and protection from all obstacles',
    description: 'The powerful recitation of Hanuman Chalisa, Sankat Mochan Ashtak, and Hanuman Lala Aarti for Tuesdays, Saturdays, and times of distress.',
    badge: 'Courage & Protection',
    iconName: 'Shield',
    gradient: 'from-[#d97706] to-[#b45309]',
    aartiIds: [
      'hi_hanuman_chalisa',
      'hi_sankatmochan_hanuman',
      'hi_hanuman_lala',
      'mr_maruti_stotra'
    ]
  },
  {
    id: 'curated_mahadev_shiva',
    name: 'Mahadev & Somwar Bhakti',
    hindiName: 'महादेव व शिव उपासना',
    subtitle: 'Sacred chants for Bholenath & Pradosh',
    description: 'Om Jai Shiv Omkara and ancient stutis dedicated to Lord Shiva for Mondays, Pradosh Vrat, Shravan Maas, and Maha Shivratri.',
    badge: 'Bholenath',
    iconName: 'Moon',
    gradient: 'from-[#0369a1] to-[#0f172a]',
    aartiIds: [
      'hi_shiv_omkara',
      'mr_lavthavti',
      'hi_bhairav_ji',
      'mr_karpur_gauram'
    ]
  },
  {
    id: 'curated_sandhya_vitthal',
    name: 'Sandhya Aarti & Vitthal Bhakti',
    hindiName: 'संध्या आरती व विठ्ठल दर्शन',
    subtitle: 'Evening twilight peace and soulful Pandurang hymns',
    description: 'Traditional twilight prayers to bring peace to the household, culminating with Saint Dnyaneshwar’s universal blessing prayer Pasaydan.',
    badge: 'Evening Peace',
    iconName: 'Music',
    gradient: 'from-[#854d0e] to-[#713f12]',
    aartiIds: [
      'mr_yuge_atthavis',
      'mr_yei_ho_vitthale',
      'mr_ghalin_lotangan',
      'mr_pasaydan',
      'mr_shanti_mantra'
    ]
  },
  {
    id: 'curated_shri_ram_krishna',
    name: 'Shri Ram & Krishna Bhajan',
    hindiName: 'श्री राम व कृष्ण उपासना',
    subtitle: 'Melodious prayers for Raghuvar and Kunj Bihari',
    description: 'Soulful hymns in praise of Lord Ram and Lord Krishna, including Goswami Tulsidas’s Shri Ramchandra Kripalu Bhaju Man and Aarti Kunj Bihari Ki.',
    badge: 'Bhakti Ras',
    iconName: 'Heart',
    gradient: 'from-[#4338ca] to-[#312e81]',
    aartiIds: [
      'hi_ramchandra_kripalu',
      'hi_raghuvar_ji',
      'hi_kunj_bihari',
      'hi_khatu_shyam',
      'hi_ramayan_ji'
    ]
  }
];
