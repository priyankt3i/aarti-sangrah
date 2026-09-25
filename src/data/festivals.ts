export interface FestivalEvent {
  id: string;
  name: string;
  nameHindi: string;
  nameMarathi?: string;
  tithi: string;
  tithiMarathi?: string;
  tithiEnglish: string;
  description: string;
  descriptionMarathi?: string;
  descriptionEnglish?: string;
  date: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD for multi-day
  category: 'major' | 'vrat' | 'jayanti';
  deity: string;
  recommendedAartiIds: string[];
  subDays?: {
    date: string;
    name: string;
    nameHindi: string;
    nameMarathi?: string;
    description: string;
    descriptionMarathi?: string;
    descriptionEnglish?: string;
    recommendedAartiIds: string[];
  }[];
}

export interface AdhikMaasInfo {
  year: number;
  hasAdhikMaas: boolean;
  name: string;
  nameHindi: string;
  nameMarathi?: string;
  nameEnglish?: string;
  approxSpan: string;
  note: string;
  noteMarathi?: string;
  noteEnglish?: string;
}

export const adhikMaasSchedule: Record<number, AdhikMaasInfo> = {
  2026: {
    year: 2026,
    hasAdhikMaas: true,
    name: "Jyeshtha Adhik Maas",
    nameHindi: "ज्येष्ठ अधिक मास (पुरुषोत्तम मास)",
    nameMarathi: "ज्येष्ठ अधिक मास (पुरुषोत्तम मास)",
    nameEnglish: "Jyeshtha Adhik Maas (Purushottam Month)",
    approxSpan: "17 मई - 15 जून 2026",
    note: "2026 में अधिक मास होने के कारण सभी शरद उत्सव (नवरात्रि, करवा चौथ, दिवाली, छठ पूजा) सामान्य से 3 से 4 सप्ताह विलंब से हैं।",
    noteMarathi: "2026 मध्ये अधिक मास (पुरुषोत्तम मास) असल्यामुळे सर्व शरद ऋतूतील सण (नवरात्र, करवा चौथ, दिवाळी, छठ पूजा) सामान्यपेक्षा ३ ते ४ आठवडे उशिरा आहेत.",
    noteEnglish: "Due to the 2026 Jyeshtha Adhik Maas (lunar leap month), all autumn festivals (Navratri, Karwa Chauth, Diwali, Chhath Puja) occur 3 to 4 weeks later in late October and November."
  }
};

export const festivalsData: FestivalEvent[] = [
  // ================= 2024 FESTIVALS (DRIK PANCHANG CERTIFIED) =================
  {
    id: "makar_sankranti_2024",
    name: "Makar Sankranti & Pongal",
    nameHindi: "मकर संक्रांति व पोंगल",
    tithi: "पौष शुक्ल पंचमी (सूर्य मकर संक्रमण)",
    tithiEnglish: "Pausha Shukla Panchami / Solar Transit",
    description: "भगवान सूर्य का मकर राशि में प्रवेश, उत्तरायण प्रारंभ व पवित्र नदियों में स्नान-दान।",
    date: "2024-01-15",
    category: "major",
    deity: "Lord Surya",
    recommendedAartiIds: ["hi_surya_bhagwan", "hi_gayatri_mata", "mr_pradakshina"]
  },
  {
    id: "vasant_panchami_2024",
    name: "Vasant Panchami (Saraswati Puja)",
    nameHindi: "बसंत पंचमी (माँ सरस्वती पूजन)",
    tithi: "माघ शुक्ल पंचमी",
    tithiEnglish: "Magha Shukla Panchami",
    description: "विद्या, ज्ञान, वाणी व संगीत की अधिष्ठात्री देवी माँ सरस्वती का पावन प्रकटोत्सव।",
    date: "2024-02-14",
    category: "major",
    deity: "Goddess Saraswati",
    recommendedAartiIds: ["hi_saraswati_mata", "hi_gayatri_mata", "hi_ambe_gauri"]
  },
  {
    id: "maha_shivratri_2024",
    name: "Maha Shivratri",
    nameHindi: "महाशिवरात्रि",
    tithi: "फाल्गुन कृष्ण चतुर्दशी",
    tithiEnglish: "Phalguna Krishna Chaturdashi",
    description: "देवाधिदेव महादेव शिव और माता पार्वती के विवाह व रुद्राभिषेक का महापर्व।",
    date: "2024-03-08",
    category: "major",
    deity: "Lord Shiva",
    recommendedAartiIds: ["hi_shiv_omkara", "mr_shankar_2", "mr_karpur_gauram", "mr_shankar_3"]
  },
  {
    id: "holi_2024",
    name: "Holika Dahan & Holi",
    nameHindi: "होलिका दहन व रंगवाली होली",
    tithi: "फाल्गुन पूर्णिमा",
    tithiEnglish: "Phalguna Purnima",
    description: "भक्त प्रह्लाद की रक्षा, अधर्म पर धर्म की विजय और रंगों का पावन उत्सव।",
    date: "2024-03-24",
    endDate: "2024-03-25",
    category: "major",
    deity: "Lord Vishnu / Krishna",
    recommendedAartiIds: ["hi_om_jai_jagdish_hare", "hi_kunj_bihari"]
  },
  {
    id: "chaitra_navratri_2024",
    name: "Chaitra Navratri & Ram Navami",
    nameHindi: "चैत्र नवरात्रि व श्री राम नवमी",
    tithi: "चैत्र शुक्ल प्रतिपदा - नवमी",
    tithiEnglish: "Chaitra Shukla Pratipada - Navami",
    description: "माँ दुर्गा के नव रूपों का पूजन व मर्यादा पुरुषोत्तम प्रभु श्री राम का जन्मोत्सव।",
    date: "2024-04-09",
    endDate: "2024-04-17",
    category: "major",
    deity: "Devi & Lord Rama",
    recommendedAartiIds: ["hi_ambe_gauri", "hi_ramchandra_kripalu", "hi_raghuvar_ji"]
  },
  {
    id: "hanuman_jayanti_2024",
    name: "Hanuman Jayanti",
    nameHindi: "हनुमान जयंती",
    tithi: "चैत्र पूर्णिमा",
    tithiEnglish: "Chaitra Purnima",
    description: "पवनपुत्र संकटमोचन श्री हनुमान जी का जन्मोत्सव।",
    date: "2024-04-23",
    category: "jayanti",
    deity: "Lord Hanuman",
    recommendedAartiIds: ["hi_hanuman_chalisa", "hi_sankatmochan_hanuman", "hi_hanuman_lala"]
  },
  {
    id: "guru_purnima_2024",
    name: "Guru Purnima",
    nameHindi: "गुरु पूर्णिमा (व्यास पूर्णिमा)",
    tithi: "आषाढ़ पूर्णिमा",
    tithiEnglish: "Ashadha Purnima",
    description: "वेदव्यास जी व सभी पूज्य गुरुजनों के पूजन का पावन दिन।",
    date: "2024-07-21",
    category: "vrat",
    deity: "Guru Dattatreya & Saints",
    recommendedAartiIds: ["mr_swami_samarth", "mr_sai_baba", "mr_datta"]
  },
  {
    id: "raksha_bandhan_2024",
    name: "Raksha Bandhan",
    nameHindi: "रक्षाबंधन पर्व",
    tithi: "श्रावण पूर्णिमा",
    tithiEnglish: "Shravana Purnima",
    description: "भाई-बहन के पवित्र स्नेह व रक्षा सूत्र का पावन पर्व।",
    date: "2024-08-19",
    category: "major",
    deity: "Lord Vishnu",
    recommendedAartiIds: ["hi_om_jai_jagdish_hare", "hi_lakshmi_mata"]
  },
  {
    id: "krishna_janmashtami_2024",
    name: "Krishna Janmashtami",
    nameHindi: "श्री कृष्ण जन्माष्टमी",
    tithi: "भाद्रपद कृष्ण अष्टमी",
    tithiEnglish: "Bhadrapada Krishna Ashtami",
    description: "भगवान योगेश्वर श्री कृष्ण का मध्यरात्रि अवतार दिवस व दही हांडी।",
    date: "2024-08-26",
    category: "major",
    deity: "Lord Krishna",
    recommendedAartiIds: ["hi_kunj_bihari", "mr_krishna_madangopala"]
  },
  {
    id: "ganesh_chaturthi_2024",
    name: "Ganesh Chaturthi (Ganeshotsav)",
    nameHindi: "गणेश चतुर्थी (दश दिवसीय गणेशोत्सव)",
    tithi: "भाद्रपद शुक्ल चतुर्थी",
    tithiEnglish: "Bhadrapada Shukla Chaturthi",
    description: "विघ्नहर्ता श्री गणेश जी की घटस्थापना व दस दिवसीय पावन गणेशोत्सव (अनंत चतुर्दशी: 17 सितम्बर)।",
    date: "2024-09-07",
    endDate: "2024-09-17",
    category: "major",
    deity: "Lord Ganesha",
    recommendedAartiIds: ["hi_jai_ganesh_deva", "mr_sukhkarta", "mr_shendur_lal"]
  },
  {
    id: "sharad_navratri_2024",
    name: "Shardiya Navratri & Dussehra",
    nameHindi: "शारदीय नवरात्रि व विजयादशमी",
    tithi: "आश्विन शुक्ल प्रतिपदा - दशमी",
    tithiEnglish: "Ashwin Shukla Pratipada - Dashami",
    description: "माँ दुर्गा के नव रूपों की आराधना व विजयादशमी।",
    date: "2024-10-03",
    endDate: "2024-10-12",
    category: "major",
    deity: "Goddess Durga",
    recommendedAartiIds: ["hi_ambe_gauri", "hi_ambe_tu_hai_jagdambe", "mr_durge_durgat"]
  },
  {
    id: "karwa_chauth_2024",
    name: "Karwa Chauth",
    nameHindi: "करवा चौथ व्रत",
    tithi: "कार्तिक कृष्ण चतुर्थी",
    tithiEnglish: "Kartik Krishna Chaturthi",
    description: "अखंड सौभाग्य का निर्जला व्रत।",
    date: "2024-10-20",
    category: "vrat",
    deity: "Goddess Parvati",
    recommendedAartiIds: ["hi_ambe_gauri", "hi_santoshi_mata"]
  },
  {
    id: "dhanteras_2024",
    name: "Dhanteras & Kuber Puja",
    nameHindi: "धनतेरस व कुबेर पूजन",
    tithi: "कार्तिक कृष्ण त्रयोदशी",
    tithiEnglish: "Kartik Krishna Trayodashi",
    description: "आरोग्य देवता धन्वन्तरि व कुबेर देव का पूजन।",
    date: "2024-10-29",
    category: "major",
    deity: "Lord Kuber & Dhanvantari",
    recommendedAartiIds: ["hi_kuber_ji", "hi_lakshmi_mata"]
  },
  {
    id: "diwali_2024",
    name: "Diwali (Lakshmi Puja)",
    nameHindi: "दीपावली (महालक्ष्मी पूजन)",
    tithi: "कार्तिक कृष्ण अमावस्या",
    tithiEnglish: "Kartik Krishna Amavasya",
    description: "दीपावली महापर्व, माता महालक्ष्मी व भगवान गणेश का पूजन।",
    date: "2024-10-31",
    category: "major",
    deity: "Goddess Lakshmi & Ganesha",
    recommendedAartiIds: ["hi_lakshmi_mata", "hi_jai_ganesh_deva", "mr_sukhkarta"]
  },
  {
    id: "chhath_puja_2024",
    name: "Chhath Puja Mahaparv",
    nameHindi: "छठ पूजा महापर्व",
    tithi: "कार्तिक शुक्ल चतुर्थी - सप्तमी",
    tithiEnglish: "Kartik Shukla Chaturthi - Saptami",
    description: "सूर्य देव व छठी मइया का चार दिवसीय पावन लोक महापर्व।",
    date: "2024-11-05",
    endDate: "2024-11-08",
    category: "major",
    deity: "Chhathi Maiya & Surya Dev",
    recommendedAartiIds: [
      "hi_kaanch_hi_baans_ke_bahangiya",
      "hi_uga_ho_suruj_dev",
      "hi_kelwa_ke_paat_par_ugelan_suraj_dev",
      "hi_ho_deenanaath_sona_sat_kuniya"
    ]
  },

  // ================= 2025 FESTIVALS (DRIK PANCHANG CERTIFIED) =================
  {
    id: "makar_sankranti_2025",
    name: "Makar Sankranti",
    nameHindi: "मकर संक्रांति",
    tithi: "पौष शुक्ल पूर्णिमा (सूर्य मकर संक्रमण)",
    tithiEnglish: "Pausha Shukla / Solar Transit",
    description: "भगवान सूर्य का मकर राशि में प्रवेश व उत्तरायण।",
    date: "2025-01-14",
    category: "major",
    deity: "Lord Surya",
    recommendedAartiIds: ["hi_surya_bhagwan", "hi_gayatri_mata"]
  },
  {
    id: "vasant_panchami_2025",
    name: "Vasant Panchami (Saraswati Puja)",
    nameHindi: "बसंत पंचमी (सरस्वती पूजन)",
    tithi: "माघ शुक्ल पंचमी",
    tithiEnglish: "Magha Shukla Panchami",
    description: "माँ सरस्वती का प्राकट्योत्सव।",
    date: "2025-02-02",
    category: "major",
    deity: "Goddess Saraswati",
    recommendedAartiIds: ["hi_saraswati_mata", "hi_gayatri_mata"]
  },
  {
    id: "maha_shivratri_2025",
    name: "Maha Shivratri",
    nameHindi: "महाशिवरात्रि",
    tithi: "फाल्गुन कृष्ण चतुर्दशी",
    tithiEnglish: "Phalguna Krishna Chaturdashi",
    description: "देवाधिदेव महादेव शिव और माता पार्वती के विवाह व रुद्राभिषेक का महापर्व।",
    date: "2025-02-26",
    category: "major",
    deity: "Lord Shiva",
    recommendedAartiIds: ["hi_shiv_omkara", "mr_shankar_2", "mr_shankar_3", "mr_karpur_gauram"]
  },
  {
    id: "holi_2025",
    name: "Holika Dahan & Holi",
    nameHindi: "होलिका दहन व रंगवाली होली",
    tithi: "फाल्गुन पूर्णिमा",
    tithiEnglish: "Phalguna Purnima",
    description: "भक्त प्रह्लाद की रक्षा, अधर्म पर धर्म की विजय और रंगों का पावन उत्सव।",
    date: "2025-03-14",
    endDate: "2025-03-15",
    category: "major",
    deity: "Lord Vishnu / Krishna",
    recommendedAartiIds: ["hi_om_jai_jagdish_hare", "hi_kunj_bihari", "mr_krishna_madangopala"]
  },
  {
    id: "chaitra_navratri_2025",
    name: "Chaitra Navratri & Ram Navami",
    nameHindi: "चैत्र नवरात्रि व श्री राम नवमी",
    tithi: "चैत्र शुक्ल प्रतिपदा - नवमी",
    tithiEnglish: "Chaitra Shukla Pratipada - Navami",
    description: "नवदुर्गा साधना, चैत्र प्रतिपदा नवसंवत्सर व मर्यादा पुरुषोत्तम प्रभु श्री राम का जन्मोत्सव।",
    date: "2025-03-30",
    endDate: "2025-04-07",
    category: "major",
    deity: "Devi & Lord Rama",
    recommendedAartiIds: ["hi_ambe_gauri", "hi_ramchandra_kripalu", "hi_raghuvar_ji", "hi_ramayan_ji"]
  },
  {
    id: "hanuman_jayanti_2025",
    name: "Hanuman Jayanti",
    nameHindi: "हनुमान जयंती",
    tithi: "चैत्र पूर्णिमा",
    tithiEnglish: "Chaitra Purnima",
    description: "पवनपुत्र संकटमोचन श्री हनुमान जी का जन्मोत्सव।",
    date: "2025-04-12",
    category: "jayanti",
    deity: "Lord Hanuman",
    recommendedAartiIds: ["hi_hanuman_chalisa", "hi_sankatmochan_hanuman", "hi_hanuman_lala", "mr_maruti_stotra"]
  },
  {
    id: "guru_purnima_2025",
    name: "Guru Purnima",
    nameHindi: "गुरु पूर्णिमा (व्यास पूर्णिमा)",
    tithi: "आषाढ़ पूर्णिमा",
    tithiEnglish: "Ashadha Purnima",
    description: "वेदव्यास जी व सभी पूज्य गुरुजनों के पूजन व कृतज्ञता का पावन दिन।",
    date: "2025-07-10",
    category: "vrat",
    deity: "Guru Dattatreya & Saints",
    recommendedAartiIds: ["mr_swami_samarth", "mr_sai_baba", "mr_datta", "mr_dnyaneshwar"]
  },
  {
    id: "raksha_bandhan_2025",
    name: "Raksha Bandhan",
    nameHindi: "रक्षाबंधन पर्व",
    tithi: "श्रावण पूर्णिमा",
    tithiEnglish: "Shravana Purnima",
    description: "स्नेह व रक्षा सूत्र का पावन पर्व।",
    date: "2025-08-09",
    category: "major",
    deity: "Lord Vishnu",
    recommendedAartiIds: ["hi_om_jai_jagdish_hare", "hi_lakshmi_mata"]
  },
  {
    id: "krishna_janmashtami_2025",
    name: "Krishna Janmashtami",
    nameHindi: "श्री कृष्ण जन्माष्टमी",
    tithi: "भाद्रपद कृष्ण अष्टमी (रोहिणी नक्षत्र)",
    tithiEnglish: "Bhadrapada Krishna Ashtami",
    description: "भगवान योगेश्वर श्री कृष्ण का मध्यरात्रि अवतार दिवस व दही हांडी उत्सव।",
    date: "2025-08-16",
    category: "major",
    deity: "Lord Krishna",
    recommendedAartiIds: ["hi_kunj_bihari", "mr_krishna_madangopala", "mr_krishna_2", "hi_om_jai_jagdish_hare"]
  },
  {
    id: "ganesh_chaturthi_2025",
    name: "Ganesh Chaturthi (Ganeshotsav)",
    nameHindi: "गणेश चतुर्थी (दश दिवसीय गणेशोत्सव)",
    tithi: "भाद्रपद शुक्ल चतुर्थी",
    tithiEnglish: "Bhadrapada Shukla Chaturthi",
    description: "विघ्नहर्ता श्री गणेश जी की घटस्थापना व दस दिवसीय पावन गणेशोत्सव (विसर्जन: 6 सितम्बर)।",
    date: "2025-08-27",
    endDate: "2025-09-06",
    category: "major",
    deity: "Lord Ganesha",
    recommendedAartiIds: ["hi_jai_ganesh_deva", "mr_sukhkarta", "mr_shendur_lal", "mr_ganapati_stotra"]
  },
  {
    id: "sharad_navratri_2025",
    name: "Shardiya Navratri & Dussehra",
    nameHindi: "शारदीय नवरात्रि व विजयादशमी",
    tithi: "आश्विन शुक्ल प्रतिपदा - दशमी",
    tithiEnglish: "Ashwin Shukla Pratipada - Dashami",
    description: "माँ दुर्गा के नव रूपों की आराधना, गरबा व अधर्म पर विजय का महापर्व दशहरा।",
    date: "2025-09-22",
    endDate: "2025-10-02",
    category: "major",
    deity: "Goddess Durga",
    recommendedAartiIds: ["hi_ambe_gauri", "hi_ambe_tu_hai_jagdambe", "mr_durge_durgat", "hi_vaishno_devi"]
  },
  {
    id: "karwa_chauth_2025",
    name: "Karwa Chauth",
    nameHindi: "करवा चौथ व्रत",
    tithi: "कार्तिक कृष्ण चतुर्थी",
    tithiEnglish: "Kartik Krishna Chaturthi",
    description: "अखंड सौभाग्य, पति की दीर्घायु और चंद्र दर्शन व अर्घ्य का पावन निर्जला व्रत।",
    date: "2025-10-10",
    category: "vrat",
    deity: "Goddess Parvati & Shiva",
    recommendedAartiIds: ["hi_ambe_gauri", "hi_santoshi_mata", "hi_shiv_omkara"]
  },
  {
    id: "dhanteras_2025",
    name: "Dhanteras & Kuber Puja",
    nameHindi: "धनतेरस व यम दीपदान",
    tithi: "कार्तिक कृष्ण त्रयोदशी",
    tithiEnglish: "Kartik Krishna Trayodashi",
    description: "आरोग्य के देवता भगवान धन्वन्तरि व कुबेर देव का पूजन और यम दीपदान।",
    date: "2025-10-18",
    category: "major",
    deity: "Lord Kuber & Dhanvantari",
    recommendedAartiIds: ["hi_kuber_ji", "hi_lakshmi_mata", "hi_om_jai_jagdish_hare"]
  },
  {
    id: "diwali_2025",
    name: "Diwali (Lakshmi Puja)",
    nameHindi: "दीपावली (महालक्ष्मी व गणेश पूजन)",
    tithi: "कार्तिक कृष्ण अमावस्या",
    tithiEnglish: "Kartik Krishna Amavasya",
    description: "प्रकाश व आनंद का महापर्व, माता महालक्ष्मी, भगवान गणेश व सरस्वती की आराधना।",
    date: "2025-10-20",
    category: "major",
    deity: "Goddess Lakshmi & Ganesha",
    recommendedAartiIds: ["hi_lakshmi_mata", "hi_jai_ganesh_deva", "hi_om_jai_jagdish_hare", "mr_sukhkarta"]
  },
  {
    id: "chhath_puja_2025",
    name: "Chhath Puja Mahaparv",
    nameHindi: "छठ पूजा महापर्व",
    tithi: "कार्तिक शुक्ल चतुर्थी - सप्तमी",
    tithiEnglish: "Kartik Shukla Chaturthi - Saptami",
    description: "सूर्य देव व छठी मइया का चार दिवसीय पावन लोक महापर्व (नहाय-खाय, खरना, संध्या व उषा अर्घ्य)।",
    date: "2025-10-25",
    endDate: "2025-10-28",
    category: "major",
    deity: "Chhathi Maiya & Lord Surya",
    recommendedAartiIds: [
      "hi_kaanch_hi_baans_ke_bahangiya",
      "hi_uga_ho_suruj_dev",
      "hi_kelwa_ke_paat_par_ugelan_suraj_dev",
      "hi_ho_deenanaath_sona_sat_kuniya",
      "hi_aath_hi_kaath_ke_kothariya",
      "hi_surya_bhagwan"
    ]
  },
  {
    id: "tulsi_vivah_2025",
    name: "Devutthana Ekadashi & Tulsi Vivah",
    nameHindi: "देवउठनी एकादशी व तुलसी विवाह",
    tithi: "कार्तिक शुक्ल एकादशी",
    tithiEnglish: "Kartik Shukla Ekadashi",
    description: "भगवान विष्णु के शयन से जागृत होने का दिन व माता तुलसी और भगवान शालिग्राम का पावन विवाह।",
    date: "2025-11-01",
    category: "vrat",
    deity: "Tulsi Mata & Lord Vishnu",
    recommendedAartiIds: ["hi_tulsi_mata", "hi_satyanarayan", "hi_om_jai_jagdish_hare"]
  },

  // ================= 2026 FESTIVALS (DRIK PANCHANG CERTIFIED WITH ADHIK MAAS) =================
  {
    id: "makar_sankranti_2026",
    name: "Makar Sankranti",
    nameHindi: "मकर संक्रांति व पोंगल",
    tithi: "माघ कृष्ण एकादशी (सूर्य मकर संक्रमण)",
    tithiEnglish: "Magha Krishna / Solar Transit",
    description: "भगवान सूर्य का मकर राशि में उत्तरायण प्रवेश।",
    date: "2026-01-14",
    category: "major",
    deity: "Lord Surya",
    recommendedAartiIds: ["hi_surya_bhagwan", "hi_gayatri_mata"]
  },
  {
    id: "vasant_panchami_2026",
    name: "Vasant Panchami (Saraswati Puja)",
    nameHindi: "बसंत पंचमी (माँ सरस्वती पूजन)",
    tithi: "माघ शुक्ल पंचमी",
    tithiEnglish: "Magha Shukla Panchami",
    description: "ज्ञान व संगीत की देवी माँ सरस्वती का प्रकटोत्सव।",
    date: "2026-01-23",
    category: "major",
    deity: "Goddess Saraswati",
    recommendedAartiIds: ["hi_saraswati_mata", "hi_gayatri_mata"]
  },
  {
    id: "maha_shivratri_2026",
    name: "Maha Shivratri",
    nameHindi: "महाशिवरात्रि",
    tithi: "फाल्गुन कृष्ण चतुर्दशी",
    tithiEnglish: "Phalguna Krishna Chaturdashi",
    description: "देवाधिदेव महादेव शिव और माता पार्वती के विवाह व रुद्राभिषेक का महापर्व।",
    date: "2026-02-15",
    category: "major",
    deity: "Lord Shiva",
    recommendedAartiIds: ["hi_shiv_omkara", "mr_shankar_2", "mr_shankar_3", "mr_karpur_gauram"]
  },
  {
    id: "holi_2026",
    name: "Holika Dahan & Holi",
    nameHindi: "होलिका दहन व रंगवाली होली",
    tithi: "फाल्गुन पूर्णिमा",
    tithiEnglish: "Phalguna Purnima",
    description: "भक्त प्रह्लाद की रक्षा, अधर्म पर धर्म की विजय और रंगों का पावन उत्सव।",
    date: "2026-03-03",
    endDate: "2026-03-04",
    category: "major",
    deity: "Lord Vishnu / Krishna",
    recommendedAartiIds: ["hi_om_jai_jagdish_hare", "hi_kunj_bihari", "mr_krishna_madangopala"]
  },
  {
    id: "chaitra_navratri_2026",
    name: "Chaitra Navratri & Ram Navami",
    nameHindi: "चैत्र नवरात्रि व श्री राम नवमी",
    tithi: "चैत्र शुक्ल प्रतिपदा - नवमी",
    tithiEnglish: "Chaitra Shukla Pratipada - Navami",
    description: "नवदुर्गा साधना, चैत्र प्रतिपदा नवसंवत्सर व मर्यादा पुरुषोत्तम प्रभु श्री राम का जन्मोत्सव।",
    date: "2026-03-19",
    endDate: "2026-03-27",
    category: "major",
    deity: "Devi & Lord Rama",
    recommendedAartiIds: ["hi_ambe_gauri", "hi_ramchandra_kripalu", "hi_raghuvar_ji", "hi_ramayan_ji"]
  },
  {
    id: "hanuman_jayanti_2026",
    name: "Hanuman Jayanti",
    nameHindi: "हनुमान जयंती",
    tithi: "चैत्र पूर्णिमा",
    tithiEnglish: "Chaitra Purnima",
    description: "पवनपुत्र संकटमोचन श्री हनुमान जी का जन्मोत्सव।",
    date: "2026-04-02",
    category: "jayanti",
    deity: "Lord Hanuman",
    recommendedAartiIds: ["hi_hanuman_chalisa", "hi_sankatmochan_hanuman", "hi_hanuman_lala", "mr_maruti_stotra"]
  },
  {
    id: "adhik_maas_start_2026",
    name: "Jyeshtha Adhik Maas Begins",
    nameHindi: "ज्येष्ठ अधिक मास (पुरुषोत्तम मास) प्रारंभ",
    tithi: "ज्येष्ठ अधिक कृष्ण प्रतिपदा",
    tithiEnglish: "Jyeshtha Adhik Krishna Pratipada",
    description: "भगवान विष्णु को समर्पित पवित्र अधिक मास प्रारंभ। इस वर्ष 30 दिनों का अतिरिक्त चंद्र मास जुड़ने से शरद ऋतु के पर्व विलंब से हैं।",
    date: "2026-05-17",
    endDate: "2026-06-15",
    category: "vrat",
    deity: "Lord Vishnu (Purushottama)",
    recommendedAartiIds: ["hi_om_jai_jagdish_hare", "hi_satyanarayan", "mr_vishnu"]
  },
  {
    id: "guru_purnima_2026",
    name: "Guru Purnima",
    nameHindi: "गुरु पूर्णिमा (व्यास पूर्णिमा)",
    tithi: "आषाढ़ पूर्णिमा",
    tithiEnglish: "Ashadha Purnima",
    description: "वेदव्यास जी व सभी पूज्य गुरुजनों के पूजन व कृतज्ञता का पावन दिन।",
    date: "2026-07-29",
    category: "vrat",
    deity: "Guru Dattatreya & Saints",
    recommendedAartiIds: ["mr_swami_samarth", "mr_sai_baba", "mr_datta", "mr_dnyaneshwar"]
  },
  {
    id: "raksha_bandhan_2026",
    name: "Raksha Bandhan",
    nameHindi: "रक्षाबंधन पर्व",
    tithi: "श्रावण पूर्णिमा",
    tithiEnglish: "Shravana Purnima",
    description: "भाई-बहन के पवित्र स्नेह व रक्षा सूत्र का पावन पर्व।",
    date: "2026-08-28",
    category: "major",
    deity: "Lord Vishnu",
    recommendedAartiIds: ["hi_om_jai_jagdish_hare", "hi_lakshmi_mata"]
  },
  {
    id: "krishna_janmashtami_2026",
    name: "Krishna Janmashtami",
    nameHindi: "श्री कृष्ण जन्माष्टमी",
    tithi: "भाद्रपद कृष्ण अष्टमी",
    tithiEnglish: "Bhadrapada Krishna Ashtami",
    description: "भगवान योगेश्वर श्री कृष्ण का मध्यरात्रि अवतार दिवस व दही हांडी उत्सव।",
    date: "2026-09-04",
    category: "major",
    deity: "Lord Krishna",
    recommendedAartiIds: ["hi_kunj_bihari", "mr_krishna_madangopala", "mr_krishna_2", "hi_om_jai_jagdish_hare"]
  },
  {
    id: "ganesh_chaturthi_2026",
    name: "Ganesh Chaturthi (10-Day Ganeshotsav)",
    nameHindi: "गणेश चतुर्थी (दश दिवसीय गणेशोत्सव)",
    nameMarathi: "गणेश चतुर्थी (दहा दिवसांचा गणेशोत्सव)",
    tithi: "भाद्रपद शुक्ल चतुर्थी",
    tithiMarathi: "भाद्रपद शुक्ल चतुर्थी",
    tithiEnglish: "Bhadrapada Shukla Chaturthi",
    description: "विघ्नहर्ता श्री गणेश जी की घटस्थापना व दस दिवसीय पावन गणेशोत्सव (अनंत चतुर्दशी विसर्जन: 25 सितम्बर)।",
    descriptionMarathi: "विघ्नहर्ता श्री गणपती बाप्पाची प्राणप्रतिष्ठापना व दहा दिवसांचा पावन गणेशोत्सव (अनंत चतुर्दशी विसर्जन: २५ सप्टेंबर).",
    descriptionEnglish: "Ghatasthapana of Lord Ganesha and 10-day sacred Ganeshotsav festival (Anant Chaturdashi Visarjan: 25 September).",
    date: "2026-09-14",
    endDate: "2026-09-25",
    category: "major",
    deity: "Lord Ganesha",
    recommendedAartiIds: ["hi_jai_ganesh_deva", "mr_sukhkarta", "mr_shendur_lal", "mr_ganapati_stotra"]
  },
  {
    id: "anant_chaturdashi_2026",
    name: "Anant Chaturdashi & Ganesh Visarjan",
    nameHindi: "अनंत चतुर्दशी व श्री गणेश विसर्जन",
    nameMarathi: "अनंत चतुर्दशी व श्री गणेश विसर्जन",
    tithi: "भाद्रपद शुक्ल चतुर्दशी",
    tithiMarathi: "भाद्रपद शुक्ल चतुर्दशी",
    tithiEnglish: "Bhadrapada Shukla Chaturdashi",
    description: "दश दिवसीय गणेशोत्सव की पूर्णाहुति, भगवान अनंत (श्री हरि विष्णु) का पूजन व भावपूर्ण श्री गणेश विसर्जन।",
    descriptionMarathi: "दहा दिवसांच्या गणेशोत्सवाची सांगता, भगवान अनंत (श्री विष्णू) पूजन व भावपूर्ण गणपती बाप्पा विसर्जन.",
    descriptionEnglish: "Culmination of 10-day Ganeshotsav, worship of Lord Ananta (Vishnu), and auspicious Ganesh Visarjan.",
    date: "2026-09-25",
    category: "major",
    deity: "Lord Ganesha & Lord Vishnu",
    recommendedAartiIds: ["hi_jai_ganesh_deva", "mr_sukhkarta", "mr_shendur_lal", "hi_om_jai_jagdish_hare"]
  },
  {
    id: "sharad_navratri_2026",
    name: "Shardiya Navratri & Dussehra",
    nameHindi: "शारदीय नवरात्रि व विजयादशमी",
    tithi: "आश्विन शुक्ल प्रतिपदा - दशमी",
    tithiEnglish: "Ashwin Shukla Pratipada - Dashami",
    description: "माँ दुर्गा के नव रूपों की आराधना व विजयादशमी (अधिक मास के प्रभाव से अक्टूबर मध्य में)।",
    date: "2026-10-11",
    endDate: "2026-10-20",
    category: "major",
    deity: "Goddess Durga",
    recommendedAartiIds: ["hi_ambe_gauri", "hi_ambe_tu_hai_jagdambe", "mr_durge_durgat", "hi_vaishno_devi"]
  },
  {
    id: "karwa_chauth_2026",
    name: "Karwa Chauth",
    nameHindi: "करवा चौथ व्रत",
    tithi: "कार्तिक कृष्ण चतुर्थी",
    tithiEnglish: "Kartik Krishna Chaturthi",
    description: "अखंड सौभाग्य व पति की दीर्घायु का निर्जला व्रत।",
    date: "2026-10-29",
    category: "vrat",
    deity: "Goddess Parvati & Shiva",
    recommendedAartiIds: ["hi_ambe_gauri", "hi_santoshi_mata", "hi_shiv_omkara"]
  },
  {
    id: "dhanteras_2026",
    name: "Dhanteras & Kuber Puja",
    nameHindi: "धनतेरस व यम दीपदान",
    tithi: "कार्तिक कृष्ण त्रयोदशी",
    tithiEnglish: "Kartik Krishna Trayodashi",
    description: "आरोग्य के देवता भगवान धन्वन्तरि व कुबेर देव का पूजन और यम दीपदान।",
    date: "2026-11-06",
    category: "major",
    deity: "Lord Kuber & Dhanvantari",
    recommendedAartiIds: ["hi_kuber_ji", "hi_lakshmi_mata", "hi_om_jai_jagdish_hare"]
  },
  {
    id: "diwali_2026",
    name: "Diwali (Lakshmi Puja)",
    nameHindi: "दीपावली (महालक्ष्मी व गणेश पूजन)",
    tithi: "कार्तिक कृष्ण अमावस्या",
    tithiEnglish: "Kartik Krishna Amavasya",
    description: "दीपावली महापर्व (अधिक मास के कारण नवम्बर में), माता महालक्ष्मी व भगवान गणेश का पावन पूजन।",
    date: "2026-11-08",
    category: "major",
    deity: "Goddess Lakshmi & Ganesha",
    recommendedAartiIds: ["hi_lakshmi_mata", "hi_jai_ganesh_deva", "hi_om_jai_jagdish_hare", "mr_sukhkarta"]
  },
  {
    id: "govardhan_bhai_dooj_2026",
    name: "Govardhan Puja & Bhai Dooj",
    nameHindi: "गोवर्धन पूजा व भाई दूज",
    tithi: "कार्तिक शुक्ल प्रतिपदा - द्वितीया",
    tithiEnglish: "Kartik Shukla Pratipada - Dwitiya",
    description: "भगवान श्री कृष्ण द्वारा गोवर्धन धारण व भाई-बहन के पावन स्नेह का पर्व।",
    date: "2026-11-09",
    endDate: "2026-11-10",
    category: "major",
    deity: "Lord Krishna & Yamuna-Yama",
    recommendedAartiIds: ["hi_kunj_bihari", "hi_gange_mata", "hi_om_jai_jagdish_hare"]
  },
  {
    id: "chhath_puja_2026",
    name: "Chhath Puja Mahaparv",
    nameHindi: "छठ पूजा महापर्व (नहाय-खाय से उषा अर्घ्य)",
    tithi: "कार्तिक शुक्ल चतुर्थी - सप्तमी",
    tithiEnglish: "Kartik Shukla Chaturthi - Saptami",
    description: "सूर्य देव व छठी मइया का चार दिवसीय पावन लोक महापर्व (अधिक मास के कारण 13-16 नवम्बर 2026)।",
    date: "2026-11-13",
    endDate: "2026-11-16",
    category: "major",
    deity: "Chhathi Maiya & Lord Surya",
    recommendedAartiIds: [
      "hi_kaanch_hi_baans_ke_bahangiya",
      "hi_uga_ho_suruj_dev",
      "hi_kelwa_ke_paat_par_ugelan_suraj_dev",
      "hi_ho_deenanaath_sona_sat_kuniya",
      "hi_aath_hi_kaath_ke_kothariya",
      "hi_surya_bhagwan"
    ],
    subDays: [
      {
        date: "2026-11-13",
        name: "Nahay-Khay",
        nameHindi: "नहाय-खाय (छठ प्रथम दिन)",
        description: "पवित्र स्नान, कद्दू-भात का सात्विक प्रसाद व व्रत का पावन संकल्प।",
        recommendedAartiIds: ["hi_kaanch_hi_baans_ke_bahangiya", "hi_gange_mata"]
      },
      {
        date: "2026-11-14",
        name: "Kharna (Lohanda)",
        nameHindi: "खरना / लोहंडा (छठ द्वितीय दिन)",
        description: "दिनभर निर्जला उपवास व संध्याकाल में गुड़ की खीर व रोटी का पावन भोग।",
        recommendedAartiIds: ["hi_kaanch_hi_baans_ke_bahangiya", "hi_ho_deenanaath_sun_leen_pukaar"]
      },
      {
        date: "2026-11-15",
        name: "Sandhya Arghya (Pehla Arghya)",
        nameHindi: "संध्या अर्घ्य (पहला अर्घ्य - अस्ताचलगामी सूर्य)",
        description: "दउरा व सूप लेकर पवित्र घाटों पर अस्ताचलगामी सूर्य देव को पहला अर्घ्य दान।",
        recommendedAartiIds: ["hi_kaanch_hi_baans_ke_bahangiya", "hi_aath_hi_kaath_ke_kothariya", "hi_kelwa_ke_paat_par_ugelan_suraj_dev"]
      },
      {
        date: "2026-11-16",
        name: "Usha Arghya (Bhor Arghya & Paran)",
        nameHindi: "उषा अर्घ्य व पारण (दूसरा अर्घ्य - उदीयमान सूर्य)",
        description: "अरुणोदय की लालिमा में उदीयमान सूर्य को दूसरा अर्घ्य दान व 36 घंटे के निर्जला व्रत का पारण।",
        recommendedAartiIds: ["hi_uga_ho_suruj_dev", "hi_ho_deenanaath_sona_sat_kuniya", "hi_surya_bhagwan"]
      }
    ]
  },
  {
    id: "tulsi_vivah_2026",
    name: "Devutthana Ekadashi & Tulsi Vivah",
    nameHindi: "देवउठनी एकादशी व तुलसी विवाह",
    tithi: "कार्तिक शुक्ल एकादशी",
    tithiEnglish: "Kartik Shukla Ekadashi",
    description: "भगवान विष्णु का योगनिद्रा से जागरण व माता तुलसी-शालिग्राम का पावन विवाह।",
    date: "2026-11-20",
    category: "vrat",
    deity: "Tulsi Mata & Lord Vishnu",
    recommendedAartiIds: ["hi_tulsi_mata", "hi_satyanarayan", "hi_om_jai_jagdish_hare"]
  },

  // ================= 2027 FESTIVALS (DRIK PANCHANG CERTIFIED) =================
  {
    id: "makar_sankranti_2027",
    name: "Makar Sankranti",
    nameHindi: "मकर संक्रांति",
    tithi: "पौष शुक्ल षष्ठी (सूर्य मकर संक्रमण)",
    tithiEnglish: "Pausha Shukla / Solar Transit",
    description: "भगवान सूर्य का उत्तरायण प्रवेश।",
    date: "2027-01-14",
    category: "major",
    deity: "Lord Surya",
    recommendedAartiIds: ["hi_surya_bhagwan", "hi_gayatri_mata"]
  },
  {
    id: "vasant_panchami_2027",
    name: "Vasant Panchami (Saraswati Puja)",
    nameHindi: "बसंत पंचमी (माँ सरस्वती पूजन)",
    tithi: "माघ शुक्ल पंचमी",
    tithiEnglish: "Magha Shukla Panchami",
    description: "माँ सरस्वती का पावन प्रकटोत्सव।",
    date: "2027-02-11",
    category: "major",
    deity: "Goddess Saraswati",
    recommendedAartiIds: ["hi_saraswati_mata", "hi_gayatri_mata"]
  },
  {
    id: "maha_shivratri_2027",
    name: "Maha Shivratri",
    nameHindi: "महाशिवरात्रि",
    tithi: "फाल्गुन कृष्ण चतुर्दशी",
    tithiEnglish: "Phalguna Krishna Chaturdashi",
    description: "देवाधिदेव महादेव शिव और माता पार्वती के विवाह व रुद्राभिषेक का महापर्व।",
    date: "2027-03-06",
    category: "major",
    deity: "Lord Shiva",
    recommendedAartiIds: ["hi_shiv_omkara", "mr_shankar_2", "mr_karpur_gauram"]
  },
  {
    id: "holi_2027",
    name: "Holika Dahan & Holi",
    nameHindi: "होलिका दहन व होली",
    tithi: "फाल्गुन पूर्णिमा",
    tithiEnglish: "Phalguna Purnima",
    description: "रंगों व उल्लास का पावन वसंत उत्सव।",
    date: "2027-03-22",
    category: "major",
    deity: "Lord Krishna",
    recommendedAartiIds: ["hi_kunj_bihari", "hi_om_jai_jagdish_hare"]
  },
  {
    id: "chaitra_navratri_2027",
    name: "Chaitra Navratri & Ram Navami",
    nameHindi: "चैत्र नवरात्रि व श्री राम नवमी",
    tithi: "चैत्र शुक्ल प्रतिपदा - नवमी",
    tithiEnglish: "Chaitra Shukla Pratipada - Navami",
    description: "नवसंवत्सर, माँ दुर्गा की उपासना व प्रभु श्री राम का जन्मोत्सव।",
    date: "2027-04-07",
    endDate: "2027-04-15",
    category: "major",
    deity: "Devi & Lord Rama",
    recommendedAartiIds: ["hi_ambe_gauri", "hi_ramchandra_kripalu"]
  },
  {
    id: "hanuman_jayanti_2027",
    name: "Hanuman Jayanti",
    nameHindi: "हनुमान जयंती",
    tithi: "चैत्र पूर्णिमा",
    tithiEnglish: "Chaitra Purnima",
    description: "पवनपुत्र हनुमान जी जन्मोत्सव।",
    date: "2027-04-20",
    category: "jayanti",
    deity: "Lord Hanuman",
    recommendedAartiIds: ["hi_hanuman_chalisa", "hi_sankatmochan_hanuman"]
  },
  {
    id: "raksha_bandhan_2027",
    name: "Raksha Bandhan",
    nameHindi: "रक्षाबंधन पर्व",
    tithi: "श्रावण पूर्णिमा",
    tithiEnglish: "Shravana Purnima",
    description: "स्नेह व रक्षा सूत्र का पावन पर्व।",
    date: "2027-08-17",
    category: "major",
    deity: "Lord Vishnu",
    recommendedAartiIds: ["hi_om_jai_jagdish_hare"]
  },
  {
    id: "krishna_janmashtami_2027",
    name: "Krishna Janmashtami",
    nameHindi: "श्री कृष्ण जन्माष्टमी",
    tithi: "भाद्रपद कृष्ण अष्टमी",
    tithiEnglish: "Bhadrapada Krishna Ashtami",
    description: "भगवान श्री कृष्ण जन्मोत्सव।",
    date: "2027-08-25",
    category: "major",
    deity: "Lord Krishna",
    recommendedAartiIds: ["hi_kunj_bihari", "mr_krishna_madangopala"]
  },
  {
    id: "ganesh_chaturthi_2027",
    name: "Ganesh Chaturthi",
    nameHindi: "गणेश चतुर्थी (गणेशोत्सव)",
    tithi: "भाद्रपद शुक्ल चतुर्थी",
    tithiEnglish: "Bhadrapada Shukla Chaturthi",
    description: "विघ्नहर्ता श्री गणेश जी का जन्मोत्सव।",
    date: "2027-09-04",
    endDate: "2027-09-14",
    category: "major",
    deity: "Lord Ganesha",
    recommendedAartiIds: ["hi_jai_ganesh_deva", "mr_sukhkarta"]
  },
  {
    id: "sharad_navratri_2027",
    name: "Shardiya Navratri & Dussehra",
    nameHindi: "शारदीय नवरात्रि व विजयादशमी",
    tithi: "आश्विन शुक्ल प्रतिपदा - दशमी",
    tithiEnglish: "Ashwin Shukla Pratipada - Dashami",
    description: "माँ दुर्गा के नव रूपों का पूजन व दशहरा।",
    date: "2027-09-30",
    endDate: "2027-10-09",
    category: "major",
    deity: "Goddess Durga",
    recommendedAartiIds: ["hi_ambe_gauri", "hi_ambe_tu_hai_jagdambe", "mr_durge_durgat"]
  },
  {
    id: "diwali_2027",
    name: "Diwali (Lakshmi Puja)",
    nameHindi: "दीपावली (महालक्ष्मी पूजन)",
    tithi: "कार्तिक कृष्ण अमावस्या",
    tithiEnglish: "Kartik Krishna Amavasya",
    description: "महालक्ष्मी व गणेश पूजन का महापर्व।",
    date: "2027-10-29",
    category: "major",
    deity: "Goddess Lakshmi",
    recommendedAartiIds: ["hi_lakshmi_mata", "hi_jai_ganesh_deva", "hi_om_jai_jagdish_hare"]
  },
  {
    id: "chhath_puja_2027",
    name: "Chhath Puja Mahaparv",
    nameHindi: "छठ पूजा महापर्व",
    tithi: "कार्तिक शुक्ल चतुर्थी - सप्तमी",
    tithiEnglish: "Kartik Shukla Chaturthi - Saptami",
    description: "भगवान भास्कर व छठी मइया का पावन लोक महापर्व।",
    date: "2027-11-03",
    endDate: "2027-11-06",
    category: "major",
    deity: "Chhathi Maiya & Surya Dev",
    recommendedAartiIds: [
      "hi_kaanch_hi_baans_ke_bahangiya",
      "hi_uga_ho_suruj_dev",
      "hi_kelwa_ke_paat_par_ugelan_suraj_dev",
      "hi_ho_deenanaath_sona_sat_kuniya"
    ]
  },

  // ================= 2028-2030 SAMPLE FESTIVALS =================
  {
    id: "diwali_2028",
    name: "Diwali (Lakshmi Puja)",
    nameHindi: "दीपावली (महालक्ष्मी पूजन)",
    tithi: "कार्तिक कृष्ण अमावस्या",
    tithiEnglish: "Kartik Krishna Amavasya",
    description: "दीपावली महापर्व।",
    date: "2028-10-17",
    category: "major",
    deity: "Goddess Lakshmi",
    recommendedAartiIds: ["hi_lakshmi_mata", "hi_jai_ganesh_deva"]
  },
  {
    id: "chhath_puja_2028",
    name: "Chhath Puja Mahaparv",
    nameHindi: "छठ पूजा महापर्व",
    tithi: "कार्तिक शुक्ल चतुर्थी - सप्तमी",
    tithiEnglish: "Kartik Shukla Chaturthi - Saptami",
    description: "छठी मइया व सूर्य देव का महापर्व।",
    date: "2028-10-22",
    endDate: "2028-10-25",
    category: "major",
    deity: "Chhathi Maiya & Lord Surya",
    recommendedAartiIds: ["hi_kaanch_hi_baans_ke_bahangiya", "hi_uga_ho_suruj_dev"]
  },
  {
    id: "diwali_2029",
    name: "Diwali (Lakshmi Puja)",
    nameHindi: "दीपावली (महालक्ष्मी पूजन)",
    tithi: "कार्तिक कृष्ण अमावस्या",
    tithiEnglish: "Kartik Krishna Amavasya",
    description: "दीपावली महापर्व।",
    date: "2029-11-05",
    category: "major",
    deity: "Goddess Lakshmi",
    recommendedAartiIds: ["hi_lakshmi_mata", "hi_jai_ganesh_deva"]
  },
  {
    id: "chhath_puja_2029",
    name: "Chhath Puja Mahaparv",
    nameHindi: "छठ पूजा महापर्व",
    tithi: "कार्तिक शुक्ल चतुर्थी - सप्तमी",
    tithiEnglish: "Kartik Shukla Chaturthi - Saptami",
    description: "छठी मइया व सूर्य देव का महापर्व।",
    date: "2029-11-10",
    endDate: "2029-11-13",
    category: "major",
    deity: "Chhathi Maiya & Lord Surya",
    recommendedAartiIds: ["hi_kaanch_hi_baans_ke_bahangiya", "hi_uga_ho_suruj_dev"]
  },
  {
    id: "diwali_2030",
    name: "Diwali (Lakshmi Puja)",
    nameHindi: "दीपावली (महालक्ष्मी पूजन)",
    tithi: "कार्तिक कृष्ण अमावस्या",
    tithiEnglish: "Kartik Krishna Amavasya",
    description: "दीपावली महापर्व।",
    date: "2030-10-26",
    category: "major",
    deity: "Goddess Lakshmi",
    recommendedAartiIds: ["hi_lakshmi_mata", "hi_jai_ganesh_deva"]
  },
  {
    id: "chhath_puja_2030",
    name: "Chhath Puja Mahaparv",
    nameHindi: "छठ पूजा महापर्व",
    tithi: "कार्तिक शुक्ल चतुर्थी - सप्तमी",
    tithiEnglish: "Kartik Shukla Chaturthi - Saptami",
    description: "छठी मइया व सूर्य देव का महापर्व।",
    date: "2030-10-31",
    endDate: "2030-11-03",
    category: "major",
    deity: "Chhathi Maiya & Lord Surya",
    recommendedAartiIds: ["hi_kaanch_hi_baans_ke_bahangiya", "hi_uga_ho_suruj_dev"]
  }
];
