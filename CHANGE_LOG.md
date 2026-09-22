# Changelog

All notable changes to the Aarti Sangrah devotional app will be documented in this file.

## [Unreleased] - 2026-09-22

### Added
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
