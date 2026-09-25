# Changelog

All notable changes to the Aarti Sangrah devotional app will be documented in this file.

## [Unreleased] - 2026-09-22

### Added
- **Cleaned Up Calendar Trigger**:
  - Removed the redundant "Panchang Calendar" button from below the current date in the `SacredTimingBanner`, keeping only the single primary calendar button in the top navigation header beside the language/transliteration toggle.
- **Full Transliteration & Language Support for Festive Calendar Popup Modal**:
  - Connected `FestiveCalendarModal` to `preferences.showTransliteration` and `preferences.language`.
  - When English Transliteration is active:
    - Popup Title: *Panchang & Sacred Festivals Calendar*
    - Month Selector: *January, February, March, April, May, June, July, August, September, October, November, December*
    - Weekday Headers: *Sun, Mon, Tue, Wed, Thu, Fri, Sat*
    - Year Selector: *Year:* with *2026 ✦ (Adhik Maas / Leap Month)*
    - Adhik Maas Banner: *2026 Adhik Maas (Purushottam Month): Due to the 2026 Jyeshtha Adhik Maas (lunar leap month), all autumn festivals (Navratri, Karwa Chauth, Diwali, Chhath Puja) occur 3 to 4 weeks later in late October and November.*
    - Section Heading: *Major Festivals in September:* or *Festivals on 2026-09-25:*
    - Festival Titles & Descriptions: English names (*Ganesh Chaturthi (10-Day Ganeshotsav)*, *Anant Chaturdashi & Ganesh Visarjan*, *Diwali (Lakshmi Puja)*, etc.) with English descriptions and Tithis.
    - Aarti Quick-Launch Buttons: Transliterated titles (*Sukhkarta Dukhharta*, *Shri Ganesh Ji Ki Aarti*, etc.).
    - Controls: *Swipe left / right to change month*, *Show all month*, and *Close Calendar*.
- **Dynamic Language & Transliteration Responsiveness for Sacred Timing Banner**:
  - Connected `SacredTimingBanner` and `getTodaySacredContext` directly to both `preferences.showTransliteration` (toggled by the top-right `文A` button) and `preferences.language` (Hindi, Marathi, etc.).
  - When English Transliteration is active: translates the entire banner into English (Date: *Friday • 25 September 2026*, Prahar: *Aparahna (Afternoon Chants)*, Festival Badge: *TODAY'S SACRED FESTIVAL*, Festival Title: *Ganesh Chaturthi (10-Day Ganeshotsav)*, Festival Description, and Aarti card titles: *Shri Ganesh Ji Ki Aarti*, *Om Jai Lakshmi Mata*, *Jai Ambe Gauri*, *Jai Santoshi Mata*).
  - When Marathi is active: translates the banner into authentic Marathi (*शुक्रवार • २५ सप्टेंबर २०२६*, *अपराह्न प्रहर (नामस्मरण व स्तवन)*, *गणेश चतुर्थी (दहा दिवसांचा गणेशोत्सव)*, *विघ्नहर्ता श्री गणपती बाप्पाची प्राणप्रतिष्ठापना...*, and prioritizes Marathi Aartis: *सुखकर्ता दुखहर्ता*, *शेंदुर लाल चढायो*, *गणपती स्तोत्र*, *दुर्गे दुर्घट भारी*).
- **Hindu Lunisolar Calendar Engine & Real-Time Aarti Recommender**:
  - Implemented high-accuracy lunisolar festival dataset spanning 2024 to 2030 in `src/data/festivals.ts`, with dedicated support for **2026 Adhik Maas (Purushottam Maas)** which moves autumn festivals (Sharad Navratri, Karwa Chauth, Dhanteras, Diwali, Chhath Puja) 3-4 weeks later into November.
  - Implemented `getTodaySacredContext()` in `src/utils/panchang.ts` that dynamically calculates:
    - Active festival or upcoming festival within 5 days.
    - Today's Hindu Vaar (Sunday=Surya, Monday=Shiva, Tuesday=Hanuman/Ganesha, Wednesday=Krishna/Vitthal, Thursday=Guru Dattatreya/Sai, Friday=Lakshmi/Durga, Saturday=Shani/Hanuman).
    - Current Hindu Prahar across 24 hours (Pratahkaal, Madhyahna, Aparahna, Sandhyakaal, Ratrikaal).
    - Priority-ranked Aarti recommendations matched to current time and ongoing festivals.
- **Home Page Calendar Button & Interactive Festive Calendar Popup**:
  - Added a dedicated Calendar button on the Home page top header right beside the language transliteration toggle button.
  - Interactive popup modal (`FestiveCalendarModal`) featuring:
    - Year selector dropdown (2024–2030) with explicit **2026 अधिक मास (Adhik Maas)** indicator.
    - Month switcher with previous/next controls and **fluid touch swipe left/right gesture support**.
    - Informational banner explaining why 2026 festive dates shifted due to Adhik Maas.
    - Monthly day grid highlighting today and days with active festivals/vrat.
    - Filterable festival list for the month or tapped date with Tithi, deity, description, and 1-tap direct navigation to related Aartis.
- **Sacred Timing & Festive Hero Banner**:
  - Prominent banner on the Home page showing live/upcoming festival badges, Tithi descriptions, and quick-sing Aarti cards for immediate chanting.
- **Chhath Puja Mahaparv Geet Collection (5 Authentic Folk Classics)**:
  - **१. काँच ही बाँस के बहंगिया** (`hi_kaanch_hi_baans_ke_bahangiya`): Traditional Bhojpuri folk hymn featuring all authentic verses including the Batohiya dialogue, *बलम जी कहरिया*, *देवर जी कहरिया*, and the *केलवा जे फरेला घवद से / सुगवा* stanzas.
  - **२. केलवा के पात पर** (`hi_kelwa_ke_paat_par_ugelan_suraj_dev`): Classic sunrise folk song with *उगेलन सुरुज मल झाँके-झुके*, questioning the fasting devotee (*के करेलू छठ बरतिया, से केकरा लागी*), covering prayers for *बेटवा*, *स्वामी*, and *बिटिया* across *केलवा*, *अमरूद*, and *नारियर* leaves.
  - **३. उगा हो सुरुज देव** (`hi_uga_ho_suruj_dev`): Revered Usha Arghya morning hymn with *उगा हो सुरुज देव, भइल अरघ के बेर*, *जल्दी-जल्दी उगीं हे सुरुज देव*, *हाथे सुपवा, माथे दउरा*, and dawn awakening.
  - **४. हो दीनानाथ — सोना सट कुनिया** (`hi_ho_deenanaath_sona_sat_kuniya`): Iconic Maithili/Bhojpuri classic with *सोना सट कुनिया, हो दीनानाथ, हे घूमइछा संसार*, *आन दिन उगइ छा... आजू के दिनवा हे लागल एती बेर*, recounting the blessings of vision for the blind man (*अन्हरा पुरुष*) and children for the childless mother (*बाझिनिया*).
  - **५. आठ ही काठ के कोठरिया — हो दीनानाथ** (`hi_aath_hi_kaath_ke_kothariya`): Historic Chhath hymn with *आठ ही काठ के कोठरिया हो दीनानाथ, रूपे छन लागल केवाड़*, celebrating how Lord Surya cures the sick, gives sight to the visually impaired, wealth to the poor, and children to the childless.
- **Chhath Puja Mahaparv Geet (हो दीनानाथ, सुन लीं पुकार)**:
  - Added the heartful prayer `hi_ho_deenanaath_sun_leen_pukaar` (*हो दीनानाथ, सुन लीं पुकार, आइल बानी तोहरे द्वार*) dedicated to Lord Surya and Chhathi Maiya.
  - Complete with all six devotional stanzas covering dawn at the ghat (*भोर भइल पूरब ललाइल*), offerings of Thekua and fruits (*दउरा भरल फल-फूल से*), well-being of family (*बाल-बच्चा सुख से रहस*), river deep daan (*जल के भीतर दीप जरावीं*), and concluding prayer for divine affection (*जनम-जनम हम शीश नवाईं, राखीं अपना दुलार*).
  - Fully transliterated (`A/अ` mode) with extensive search keywords across *दीनानाथ*, *पुकार*, *ललाइल*, *दुलार*, *सूर्य देव*, and *deenanaath*.
- **Chhath Puja Mahaparv Geet (उगा हो सुरुज देव)**:
  - Added the venerated Usha Arghya morning hymn `hi_uga_ho_suruj_dev` (*उगा हो सुरुज देव, भइल अरघ के बेर, रात बीतल, भोर भइल हे, खोल दीं किरिनिया के द्वार*).
  - Contains all six verses including the riverbank vigil (*घाट किनारे व्रती ठाढ़ी*), eastern dawn prayer (*पूरब दिशा से आईं*), sacred offerings (*ठेकुआ, कसार, फलवा सजल बा*), and prayer for global peace and health (*रोग-दुख सब दूर भगाईं*).
  - Fully transliterated (`A/अ` mode) with extensive search tags across *उगा हो सुरुज देव*, *भइल अरघ के बेर*, *किरिनिया*, *कसार*, and *सूरज देव*.
- **Chhath Puja Mahaparv Geet (केलवा के पात पर उगेलन सूरज देव)**:
  - Added the venerated sunrise Arghya hymn `hi_kelwa_ke_paat_par_ugelan_suraj_dev` (*केलवा के पात पर उगेलन सूरज देव, अरघ के भइल बेर*) dedicated to Surya Dev and Chhathi Maiya.
  - Complete with all five verses covering the Daura Sajavani, riverside prayer, offerings (Sindoor, Thekua, Nariyal), and blessing for household peace.
  - Includes full English transliteration (`A/अ` toggle support) and search indexing across *केलवा*, *पात*, *सूरज देव*, *दीनानाथ*, *अरघ*, *दउरा*, and *thekua*.
- **Chhath Puja Mahaparv Geet (काँच ही बाँस के बहंगिया)**:
  - Added the iconic traditional Chhath hymn `hi_kaanch_hi_baans_ke_bahangiya` (*काँच ही बाँस के बहंगिया, बहंगी लचकत जाए*) with all sacred stanzas (Batohiya dialogue, Nariyarwa & Suga, and Sugani's prayer to Aadit Dev).
  - Fully transliterated with `A/अ` toggle support and search indexing across *बहंगिया*, *लचकत जाए*, *बटोहिया*, *सुगा*, *आदित*, and *bahangi*.
- **Chhath Puja Mahaparv Geet (छठी माई के घटिया पे)**:
  - Added the beloved Chhath Puja hymn `hi_chhath_mai_ke_ghatiya_pe` (*छठी माई के घटिया पे - आजन बाजन बाजा बजवाईब हो*) under the Devi category with deity dedicated to *Chhathi Maiya*.
  - Includes full English transliteration (`A/अ` toggle support) and rich search indexing across terms like *छठ*, *छठी माई*, *घटिया*, *अरघ*, *बलकवा*, *सूरूज*, and *chhath*.
- **Coming Soon Indicator for Gujarati & Bangla**:
  - Added a tiny, responsive "Coming Soon" pill badge to the Gujarati (ગુજરાતી) and Bangla (বাংলা) options in `LanguageSelector`.
  - Added helpful localized empty-state messaging when either language is selected on the home discovery feed.
- **Om Jai Jagdish Hare Verse 8 & Chorus**:
  - Added the classic 8th verse (*तन मन धन सब तेरा / Tan Man Dhan Sab Tera*) and final concluding chorus to `hi_om_jai_jagdish_hare.json`.
  - Added full English transliteration and updated search keywords.
- **Morya Morya (Ganesh Dwadash Naam) Stuti**:
  - Added in Marathi (`mr_morya_morya`) and Hindi (`hi_morya_morya`) in the beloved singing style using dative salutations: *सुमुखाय (Sumukhaya)*, *एकदन्ताय (Ekadantaya)*, *कपिलाय (Kapilaya)*, *गजकर्णकाय (Gajakarnakaya)*, *लम्बोदराय (Lambodaraya)*, *विकटाय (Vikataya)*, *विघ्ननाशाय (Vighnanashaya)*, *विनायकाय (Vinayakaya)*, *धूम्रकेतवे (Dhumraketave)*, *गणाध्यक्षाय (Ganadhyakshaya)*, *भालचन्द्राय (Bhalachandraya)*, and *गजाननाय (Gajananaya)*.
  - Included full English transliteration (`transliteratedLines` and `transliteration` metadata).
  - Appended to *Kharu’s Ganesh Chaturthi* curated singing sequence (`curated_kharus_ganesh_chaturthi`).
- **Complete Naivedya & Prarthana Sequence (Sada Sarvada Yoga Tuza)**:
  - Expanded `mr_naivedya` and added `hi_naivedya` from 2 verses to all 6 sacred verses:
    1. *सदा सर्वदा योग तुझा घडावा...* (रघुनायक प्रार्थना)
    2. *उपासनेला दृढ चालवावे...* (सत्कर्म व उपासना)
    3. *कैलास राणा शिव चंद्रमौळी...* (शिव स्तुती)
    4. *मोरया मोरया मी बाळ तान्हें...* (गणपती बाप्पा प्रार्थना)
    5. *ज्या ज्या ठिकाणी मन जाय माझे...* (सद्गुरु चरण वंदन)
    6. *अलंकापुरी पुण्य भूमी पवित्र...* (संत ज्ञानेश्वर महाराज प्रणाम)
  - Full English transliteration provided across all 6 verses.
  - Appended to *Kharu’s Ganesh Chaturthi* curated sequence at the conclusion of worship.
- **Global Transliteration Toggle**:
  - Instant on-the-fly toggling between original Devanagari script and English transliteration.
  - Reactive synchronization across Aarti Reader, Discovery cards, Playlist preview modal, and Playlist editor via `aarti_preferences_changed` event bus.
  - Accessible language toggle button (`A/अ`) in both top header and reader toolbar.
- **Search Support**:
  - Transliteration-aware search algorithm matching English transliterations and original Indic script names.

### Fixed
- Fixed React state update warning during rendering cycle by deferring event notifications with `setTimeout(..., 0)` in `usePreferences`.
- Ensured automated backward-compatible migration for cached curated playlists in `localStorage`.
