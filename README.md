# Aarti Sangrah

Aarti Sangrah is a beautiful, offline-capable Progressive Web App for discovering and singing Indian devotional Aartis. It is designed to be mobile-first, distraction-free, and culturally resonant.

## Features
- **Multi-language Support:** Supports Hindi, Marathi, Gujarati, and Bengali sacred hymns.
- **English Transliteration Toggle:** Instant global switch (A/अ) to read Devanagari lyrics and titles in readable English script across all screens, playlists, and reader modes.
- **Curated Devotional Sequences:** Handcrafted singing orders including *Kharu’s Ganesh Chaturthi* concluding with the auspicious 12-name *Morya Morya* stuti and the complete 6-verse *Naivedya & Prarthana* (Sada Sarvada Yoga Tuza).
- **Autoscroll:** Sing along without having to scroll manually, with adjustable speeds.
- **Keep Awake:** Prevents the device screen from turning off while reading (uses the Screen Wake Lock API).
- **Playlists & Favorites:** Create custom playlists, import curated sangrahs, and favorite revered hymns.
- **Offline Capable:** Built as a PWA, meaning you can install it on your device and use it without internet connectivity.
- **Customizable Experience:** Adjust font sizes, toggle dark mode, and manage reduced motion.

## Local Setup

### Prerequisites
- Node.js installed

### Running Locally
1. Clone the repository and navigate to the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Content Authoring Instructions

The Aartis are stored locally in the `src/data/aartis.ts` file for this MVP. They follow a normalized JSON structure defined in `src/types.ts`. 

To add a new Aarti:
1. Open `src/data/aartis.ts`.
2. Add a new object following the `Aarti` type signature.
3. Ensure you map the verses carefully into chunks and mark the `isChorus: true` where appropriate.

## PDF Extraction Workflow

We have attached `aaratisangraha.pdf` and 'Hindi Book-Aarti-Sangrah' as source references. The PDF uses older/legacy font encoding and direct text extraction will yield corrupted text.

Please follow this rigorous workflow to import Aartis from the PDF into the app:

1. **PDF Rendering:** Convert the desired PDF page to a high-resolution image using a PDF viewer or converter tool.
2. **OCR (Optical Character Recognition):** Run the image through a Marathi/Hindi capable OCR engine (like Google Cloud Vision or Tesseract with Devanagari trained data).
3. **Unicode Normalization:** Ensure the output text is standard UTF-8 Unicode Devanagari.
4. **Structuring:** Group the extracted text into verses. Identify the repeating chorus or refrain and mark it as `isChorus: true` in your data structure.
5. **Review:** A human reviewer MUST verify the spelling against the original image. Check for missing matras, half-letters, and anusvaras.
6. **Publication:** Mark the record as `reviewed: true` only after successful human verification, and add it to `src/data/aartis.ts`.

_Do not publish AI-generated or unverified sacred lyrics._
