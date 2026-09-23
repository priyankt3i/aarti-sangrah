<p align="center">
  <img src="public/header.png" alt="Aarti Sangrah Banner" width="100%" style="border-radius: 12px; max-width: 800px;" />
</p>

<h1 align="center">🪔 Aarti Sangrah (आरती संग्रह)</h1>

<p align="center">
  <strong>A sacred, offline-first devotional reader and singing companion for Indian Aartis, Stotras, and Chalisas.</strong>
</p>

<p align="center">
  <a href="https://aarti.yantralab.com/"><img src="https://img.shields.io/badge/Live_Webapp-aarti.yantralab.com-c2410c?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live App" /></a>
  <img src="https://img.shields.io/badge/Platform-Web%20%7C%20iOS%20%7C%20Android-781f19?style=for-the-badge" alt="Platforms" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Capacitor-7.6-1192e8?style=for-the-badge&logo=capacitor" alt="Capacitor 7" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
</p>

---

## 🌟 Overview

**Aarti Sangrah** is a culturally resonant, mobile-first devotional application designed to provide devotees with an authentic, distraction-free experience during daily worship and festive pujas. Available as a **Progressive Web App (PWA)** and native **iOS** & **Android** mobile applications powered by **Capacitor 7**.

🌐 **Official Hosted Webapp**: [https://aarti.yantralab.com/](https://aarti.yantralab.com/)

---

## ✨ Key Features

<p align="center">
  <img src="public/as-logo-192x192.png" alt="Aarti Sangrah Emblem" width="100" />
</p>

### 📖 Sacred Library & Multilingual Support
* **100+ Devotional Texts**: Comprehensive collection across deities (Lord Ganesha, Shiva, Vishnu, Hanuman, Devi Durga, Lakshmi, Krishna, and revered saints like Sant Dnyaneshwar and Swami Samarth).
* **Multi-Language Orthography**: Verified native texts in **Marathi (मराठी)**, **Hindi (हिंदी)**, **Gujarati (ગુજરાતી)**, and **Bengali (বাংলা)**.
* **Global English Transliteration Toggle (`A/अ`)**: Instantly convert Devanagari verses into phonetic Latin English script across all views, reader screens, and playlists.

### 🎵 Hands-Free Singing & Reader Mode
* **Synchronized Auto-Scroll**: Hands-free scrolling during singing with adjustable speed controls.
* **Manual Scroll Intelligence**: Detects manual touches, temporarily pausing auto-scroll and presenting an intuitive "Resume" badge.
* **Screen Keep-Awake**: Native wake-lock keeps the screen illuminated throughout singing rituals, preventing sleep and dimming.
* **Dynamic Typography**: Adjustable font sizing for devotees of all age groups.

### 📜 Devotional Playlists & Puja Sequences
* **Curated Ritual Sangrahs**: Pre-sequenced sets matching authentic puja traditions (such as *Kharu’s Ganesh Chaturthi* complete sequence ending with 12-name *Morya Morya* and concluding *Naivedya*).
* **Custom Playlists**: Create, reorder, and save personalized chanting playlists locally.
* **Quick Favorites**: One-tap favoriting to quickly access daily prayers.

### 📄 Branded Watermarked PDF Export & Native Sharing
* **Print & Share Ready**: Render high-resolution, watermarked devotional PDFs formatted for WhatsApp, printing, and temple reading.
* **Native File Sharing Bridge**: Shares PDFs and lyrics directly via native OS share sheets (WhatsApp, AirDrop, Messages, Gmail, Drive).

### 📶 100% Offline-First
* Bundled locally with zero external network dependencies for reading. Works flawlessly in temple basements or remote pilgrimage destinations without cellular connectivity.

---

## 📱 Mobile Architecture (iOS & Android)

Aarti Sangrah uses a unified single-codebase architecture powered by **Capacitor 7**:

```
                       ┌──────────────────────────────────────────────┐
                       │   Aarti Sangrah React 19 + TypeScript Core   │
                       └──────────────────────┬───────────────────────┘
                                              │
                      ┌───────────────────────┴───────────────────────┐
                      │        Capacitor 7 Native Bridge Layer        │
                      └───────┬───────────────────────────────┬───────┘
                              │                               │
              ┌───────────────▼───────────────┐ ┌─────────────▼───────────────┐
              │     Android (Gradle / APK)    │ │       iOS (Xcode / IPA)     │
              │  - Target SDK 35 (Android 15) │ │  - CocoaPods & WKWebView    │
              │  - Hardware Back Navigation   │ │  - Dynamic Island / Notches │
              │  - Native Keep-Awake & Share  │ │  - Native Keep-Awake        │
              └───────────────────────────────┘ └─────────────────────────────┘
```

* **App ID**: `com.yantralab.aarti`
* **App Name**: `Aarti Sangrah`
* **Android Studio Project**: Located in [`android/`](android)
* **iOS Xcode Project**: Located in [`ios/`](ios)

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: `v20.x` or `v22.x` (LTS recommended)
* **npm**: `v10.x` or higher

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/priyankt3i/aarti-sangrah.git
   cd aarti-sangrah
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local Vite development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Build & Verification Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Start the local hot-reloading development server on port 3000 |
| `npm run build` | Compile optimized production web bundle into `dist/` |
| `npm test` | Run the Vitest automated test suite |
| `npm run lint` | Run TypeScript typechecking (`tsc --noEmit`) |
| `npm run cap:sync` | Compile web assets and synchronize with native `android/` and `ios/` |
| `npm run cap:open:android` | Launch the native Android project in Android Studio |
| `npm run cap:open:ios` | Launch the native iOS project in Xcode (macOS only) |
| `npm run build:mobile` | Full pipeline: Vite production build + Capacitor sync |

---

## 📦 Building Native Mobile Apps

### 1. Automated Cloud Builds (GitHub Actions)
You don't need a Mac or local Android SDK installed. Whenever changes are pushed to `main`, GitHub Actions automatically compiles:
* **Android**: `app-debug.apk` and `app-release.aab`
* **iOS**: `AartiSangrah.xcarchive` (compiled on macOS runners with Xcode)

Download compiled binaries directly from the **Actions** tab on GitHub under **Artifacts**.

### 2. Local Android Build (Windows / macOS / Linux)
1. Install [Android Studio](https://developer.android.com/studio).
2. Open the Android project:
   ```bash
   npm run cap:open:android
   ```
3. Click **Run** (Green Play button) to test on an emulator/device, or navigate to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

### 3. Local iOS Build (macOS with Xcode)
1. Install Xcode and CocoaPods (`sudo gem install cocoapods`).
2. Open the iOS project:
   ```bash
   npm run cap:open:ios
   ```
3. In Xcode, select your connected iPhone or simulator, and press **Cmd + R**.

---

## 📂 Project Structure

```
aarti-sangrah/
├── .github/
│   └── workflows/
│       └── build-mobile.yml    # Automated CI/CD workflow for Android & iOS builds
├── android/                    # Native Android Studio project (Gradle / SDK 35)
├── ios/                        # Native Xcode iOS project (CocoaPods / WKWebView)
├── public/                     # Static assets, branding logos, and app icons
│   ├── header.png              # Official branding banner image
│   ├── as-logo-512x512.png     # High-resolution emblem
│   └── apple-touch-icon.png    # iOS touch icon
├── src/
│   ├── components/             # Reusable UI components (Dock, Header, Nav, Share)
│   ├── data/
│   │   ├── aartis/             # Over 100+ individual JSON Aarti data files
│   │   └── aartis.ts           # Central Aarti registry and loader
│   ├── hooks/                  # Custom React hooks (WakeLock, AutoScroll, Playlists)
│   ├── pages/                  # Route views (Home, AartiReader, Playlists, Favorites)
│   ├── utils/                  # PDF export, search indexing, and transliteration
│   ├── App.tsx                 # Root application shell & mobile back-button handler
│   └── main.tsx                # React DOM entrypoint
├── capacitor.config.ts         # Capacitor mobile packager configuration
└── vite.config.ts              # Vite + PWA build configuration
```

---

## 🪔 Content Authoring & Verification Guidelines

Sacred texts must maintain religious fidelity and correct orthography:
1. **JSON Data Schema**: Aarti data files reside in `src/data/aartis/` with structured verse chunks, chorus indicators (`isChorus: true`), and transliterations.
2. **Spelling & Review**: Sacred lyrics must be verified against authentic texts for accurate Devanagari matras, conjuncts (जोडाक्षरे), and anusvaras.
3. **No AI Hallucinations**: Sacred texts must never be generated by generative models without human validation.

---

## 📜 License

Distributed under the Apache 2.0 License. See `LICENSE` for more information.

<p align="center">
  ॥ श्री गणेशाय नमः ॥ ॐ ॥
</p>
