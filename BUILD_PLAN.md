# Build Plan - Aarti Sangrah

## Architecture & Design Principles
1. **Lightweight & Offline First**: Client-side single-page application with PWA capabilities and local caching via `localStorage`.
2. **Accurate Sacred Texts**: Strictly formatted verses with verse IDs, chorus markers, and verified Marathi/Hindi orthography.
3. **Accessibility & Transliteration**:
   - High-contrast, typography-first reading view.
   - Dual script support: Devanagari script alongside Latin English phonetic transliteration.
   - Global reactive state syncing preferences seamlessly across navigation roots.
4. **Devotional Sequencing**:
   - Curated ritual playlists matching traditional puja sequence orders.
   - *Kharu’s Ganesh Chaturthi* sacred order: Lord Ganesh (`mr_sukhkarta`), Shiva (`mr_lavthavti`), Devi Durga (`mr_durge_durgat`), Lord Vitthal (`mr_yuge_atthavis`, `mr_yei_ho_vitthale`), Sant Dnyaneshwar (`mr_dnyaneshwar`), Lord Vishnu (`hi_om_jai_jagdish_hare`), Prasad/Namaskar (`mr_ghalin_lotangan`), Morya chants (`mr_morya_morya`), and concluding Naivedya prarthana (`mr_naivedya`).

## Implementation Checklist
- [x] Transliteration support in type definitions and JSON schemas.
- [x] Global language toggle in header and reader views.
- [x] Cross-component event synchronization with non-blocking dispatches.
- [x] Addition of "Morya Morya" 12-name stuti in Hindi (`hi_morya_morya`) and Marathi (`mr_morya_morya`) in the singing style (Sumukhaya, Ekadantaya, etc.).
- [x] Expansion of "Naivedya (Sada Sarvada Yoga Tuza)" to all 6 traditional verses with full transliteration in Marathi and Hindi.
- [x] Append "Naivedya" to Kharu’s Ganesh Chaturthi playlist at the conclusion.
- [x] Verification with Vitest automated test suite and TypeScript compiler.
