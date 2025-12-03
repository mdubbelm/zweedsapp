# Changelog

All notable changes to Svenska Kat (formerly Zweeds B1) Language Learning App will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.12.0] - 2025-12-03

### Added
- **Uitbreiding grammatica** 📚 - Zelfstandige naamwoorden en lidwoorden
  - Uitgebreide uitleg en-woorden (utrum) vs ett-woorden (neutrum)
  - Bepaalde lidwoorden met suffixen (-en/-n, -et/-t)
  - Alle 5 meervoudsgroepen met voorbeelden
  - 32+ voorbeeldwoorden voor en- en ett-woorden
- **Spraakherkenning** 🎤 - Vergelijk je uitspraak met de correcte uitspraak
  - Web Speech Recognition API integratie
  - Gelijkheidspercentage berekening
  - Graceful fallback voor iOS (niet ondersteund door Apple)
- **Streak kalender** 📅 - Visuele weergave van je leerstreak
  - Verplaatst naar Voortgang tab (geen modal meer)
  - Toont afgelopen 30 dagen met checkmarks
- **Pre-push hook** 🔒 - Voorkomt pushen zonder tests/build

### Changed
- **Practice View redesign** 🎨 - Verbeterde UI voor oefenmodus
  - Nieuwe Voortgang tab met gecombineerde statistieken
  - Duidelijkere "Voltooien" knop states met feedback
- **Categorieën naar aparte tab** 📂 - Minder cognitive load op homepage
- **Daily Program navigatie** ⏭️ - Automatisch naar volgende zin na voltooien

### Fixed
- **Daily Program phrase index bug** 🐛 - Juiste zin opent nu bij klikken
- **Daily Program new day reset** 🔄 - Programma reset correct bij nieuwe dag (PWA fix)
- **Grammar tables mobile** 📱 - Tabellen scrollen nu horizontaal op smalle schermen
- **iOS speech recognition** 🍎 - Duidelijke melding i.p.v. crash op iOS
- **Streak kalender modal** - Verwijderd, nu inline in Voortgang tab

### Technical
- GitHub Pages deployment fixes (base path, env vars)
- Known Bugs documentatie toegevoegd aan CLAUDE.md
- Verbeterde foutafhandeling voor edge cases

## [1.11.0] - 2025-11-27

### Added
- **Vite Build System** 🚀 - Modern build tooling for better DX and performance
  - Vite 7 with hot module replacement (HMR) for instant updates
  - Production builds with tree-shaking and minification
  - Path aliases for cleaner imports (`@components`, `@services`, etc.)
- **ESLint 9 + Prettier** 📝 - Code quality enforcement
  - ESLint flat config with strict rules
  - Prettier integration for consistent formatting
  - Pre-commit hooks via Husky + lint-staged
- **Vitest Testing Framework** ✅ - Unit tests for data integrity
  - 16 tests covering phrases and badges data
  - jsdom environment for browser API mocking
  - Coverage reporting support
- **GitHub Actions CI/CD** 🔄 - Automated quality checks
  - CI workflow: lint → test → build on every push/PR
  - Deploy workflow: automatic GitHub Pages deployment
  - Node.js 20 environment
- **Modular Architecture** 🏗️ - Code organization overhaul
  - Services layer: `auth.js`, `data.js`, `analytics.js`, `supabase.js`
  - Components: `Navigation.js`, `Header.js`, `CategoryCard.js`, `PhraseCard.js`, `BadgeCard.js`
  - Utilities: `constants.js`, `helpers.js`
  - Data: `phrases.js` (220+ phrases), `badges.js` (13 badges)
- **PWA with Workbox** 📱 - Improved offline support
  - vite-plugin-pwa for automatic service worker generation
  - Precaching of all app assets
  - Auto-update prompts for new versions

### Changed
- **Project Structure** 📁 - From single-file to modular
  - Source code in `src/` directory
  - Build output in `dist/` directory
  - Static assets in `public/`
  - Tests in `tests/`
- **CSS Architecture** 🎨 - Split into logical files
  - `variables.css` - CSS custom properties
  - `animations.css` - Keyframe animations
  - `main.css` - Component styles
- **Environment Variables** 🔐 - Secure credential handling
  - Supabase credentials via `.env` file
  - `VITE_` prefix for client-exposed variables
  - `.env.example` template provided
- **Documentation** 📚 - Updated CLAUDE.md
  - New development commands (npm scripts)
  - Project structure documentation
  - Environment setup instructions

### Technical
- Dependencies: Vite 7.2.4, ESLint 9.39.1, Vitest 4.0.14, Husky 9.1.7
- Node.js 20+ required
- Build size: 41.07 kB JS, 3.83 kB CSS (gzipped: ~12.5 kB total)
- PWA precaches 9 entries (46.11 KiB)
- ESLint configured with browser globals for MediaRecorder, SpeechSynthesis, etc.

## [1.10.2] - 2025-11-24

### Added
- **Performance Quick Wins (Issue #17)** 🚀 - LCP improved from 4.2s → ~2.0s (52% faster)
  - Resource hints (preconnect, preload) for 5 CDN domains
  - Google Fonts optimized (-20KB, removed unused weight 800)
  - Service Worker CDN caching with stale-while-revalidate strategy
  - Expected repeat visit LCP: ~1.5s
- **Homepage UX Improvements (Issue #20 - Partial)**
  - Enhanced Daily Program card with 3px blue border, gradient background, larger padding/icon
  - "View All Progress" link added for easy Badges tab access
  - Removed Recent Badges section (still accessible via Badges tab)

### Changed
- **WCAG AA Compliance (Issue #18)** ♿ - All 9 colors now pass 4.5:1 contrast ratio
  - Primary colors darkened: Blue (#3E7DB8), Green (#3E8B3E), Amber (#D97B2E), Teal (#217A83), Red (#D93030)
  - Category colors darkened: Dusty Rose (#A67171), Steel Blue (#4F6A8C), Lavender Grey (#6D7893), Coral (#C96F56), Clay (#A06247)
  - Expected Accessibility score improvement: 75 → 85+
  - Scandinavian design aesthetic preserved

### Fixed
- **Critical Bug: "Sov gott" Writing Validation** 🐛
  - Root cause: `checkWriting()` used unfiltered array while `renderWriting()` used filtered array
  - Fix: Apply `getCurrentPhrases()` in `checkWriting()` method
  - User types correct answer → app now validates correct phrase
- **Critical Bug: "All Categories" Crash** 🐛
  - Root cause: `markAsCompleted()` crashes when `currentCategory === 'all'` or undefined
  - Fix: Added defensive check before accessing `categories[currentCategory]`
  - "All Categories" practice mode now stable
- **Analytics Re-enabled** 📊
  - Removed blocking `return;` statement from `trackEvent()` method
  - Now tracking 10 events for learning outcomes analysis (Issue #19)
  - User confirmed `analytics_events` table exists in Supabase
- **Manifest Path Fix**
  - Changed `start_url` from absolute `/index.html` to relative `./index.html`
  - Updated `theme_color` to new WCAG blue (#3E7DB8)
  - Fixes GitHub Pages subdirectory deployment

### Technical
- Service Worker v1.10.2 with separate CDN cache (`svenska-kat-cdn-v1.10.2`)
- Cache-first strategy for CDN resources, network-first for app resources
- Performance baseline documented: Lighthouse score 79/100, LCP 4.2s
- All 5 preconnect hints working (Tailwind, Font Awesome, jsDelivr, Google Fonts)
- Files modified: index.html (4 bug fixes, 9 color updates, 3 performance optimizations), sw.js, manifest.json

## [1.10.1] - 2025-11-23

### Added
- **Difficulty Filter System** 🎯 - Perfect for beginners!
  - Settings section: "Moeilijkheidsgraad Voorkeur" with 5 filter options
    - Alles (All difficulty levels)
    - Makkelijk (Easy only)
    - Makkelijk + Gemiddeld (Easy + Medium)
    - Gemiddeld (Medium only)
    - Moeilijk (Hard only)
  - Filter works in ALL modes: Practice, Flashcards, Writing, Daily Program
  - Visual badges show active filter in all modes
  - Preference saved permanently per user in database
  - Cache automatically regenerates when preference changes
- **Daily Program Redesign** 📅 - Duolingo-style compact card + modal
  - Homepage: Compact card with progress bar (like Duolingo)
  - Click opens modal with full phrase list
  - Modal shows filter status + link to Settings
  - 50/50 mix of speech (🎤) and writing (⌨️) exercises
  - Icon badges distinguish exercise types
  - Refresh button to regenerate program

### Fixed
- **XSS Vulnerability (Issue #16)** 🔒 - Critical security fix
  - User display names not escaped → JavaScript injection possible
  - Created `escapeHtml()` utility function
  - Applied to 4 locations: header, home greeting, leaderboard, settings
  - Now safe from `<script>` injection attacks
- **Writing Validation Index Mismatch** 🐛
  - Daily Program used full array indices, but `renderWriting()` used filtered array indices
  - With difficulty filter active: mismatch between arrays causes wrong phrase validation
  - Fix: Use `getFilteredPhrases()` BEFORE `findIndex()` in `startDailyPhrase()`
- **Empty Phrase Array Crashes** 🐛
  - Difficulty filter can remove all phrases → `phrases.length = 0` → crash
  - Added defensive checks for empty arrays + user-friendly message
  - Button to Settings page to adjust filter
- **Service Worker 404 Error** 🐛
  - Absolute path `/sw.js` doesn't work on GitHub Pages subdirectory deployment
  - Changed to relative path `./sw.js`
- **Audio Playback Debugging**
  - Added comprehensive error logging for MediaError codes
  - Log audio URL creation, element discovery, loading, playback
  - Helps diagnose iOS/browser-specific issues

### Technical
- New `difficultyPreference` property in user stats (persistent)
- New `getFilteredPhrases()` helper method
- New `exerciseType` property on daily phrases ('practice' | 'writing')
- Updated `getCurrentPhrases()` to apply filtering globally
- New `refreshDailyProgram()` method for cache invalidation
- Daily Program modal with `openDailyProgramModal()` and `closeDailyProgramModal()`
- Analytics framework implemented (10 events tracked, temporarily disabled until table creation)
- Testing protocol documented in CLAUDE.md (mandatory checklist before commits)
- Deployment: 13 commits, ~4-5 hours of implementation

## [1.10.0] - 2025-11-22

### Added
- **Grammar Learning Mode** 📖 - New 4th learning tab
  - 6 essential Swedish verbs with full conjugations:
    - vara (to be), ha (to have), göra (to do/make)
    - kunna (can/to be able), vilja (to want), se (to see)
  - 3 pronoun types with tables:
    - Personal pronouns (jag, du, han, hon, etc.)
    - Object pronouns (mig, dig, honom, henne, etc.)
    - Possessive pronouns (min, din, hans, hennes, etc.)
  - Beautiful card-based UI with color-coded sections
  - Toggle between Verbs and Pronouns views
- **Category Selector with Bi-directional Navigation** 🔄
  - Mode-first flow: Select mode → choose category (including "All Categories Random")
  - Category-first flow: Select category → choose mode (Practice, Flashcards, Writing)
  - Modal-based selector with visual category cards
  - Flexible navigation supporting both user preferences
- **"All Categories Random" Mode** 🎲
  - Practice across all 220+ phrases shuffled
  - Random selection from entire phrase library
  - Great for variety and reinforcement
  - Available in Practice, Flashcards, and Writing modes
- **Shuffle Mode per Category** 🔀
  - Toggle button to randomize phrase order within category
  - Prevents predictable patterns
  - Enhances learning through varied exposure
- **New Category: Winkelen & Eten (Shopping & Dining)** 🛒
  - 30 new Swedish phrases for shopping and dining situations
  - Restaurant ordering, grocery shopping, market phrases
  - Authentic Nordic shopping vocabulary
  - Clay/terracotta color theme (#C9826B) - Scandinavian hygge aesthetic

### Changed
- **Complete Scandinavian Color Palette Implementation** 🎨
  - All 8 categories updated to authentic Nordic colors
  - Color philosophy: Low saturation (<60%), grey/blue undertones, WCAG AA compliant
  - Category color assignments:
    - Begroetingen: dusty-rose (#D4A5A5) - Soft, welcoming
    - Dagelijks: amber (#F4A261) - Warm, everyday
    - Werk: blue (#5B9BD5) - Professional, reliable
    - Reizen: steel-blue (#6B8CAE) - Adventure, movement
    - Praten: green (#5AAD5A) - Natural, growth
    - Katten: lavender-grey (#9FA8BC) - Mysterious, soft
    - August: coral (#E89E8D) - Summer warmth
    - Winkelen & Eten: clay (#C9826B) - Kitchen, hygge
  - Comprehensive Scandinavian Design Guidelines added to CLAUDE.md
  - 9 detailed rules for maintaining design consistency
- **Total Phrase Count** 📚
  - Expanded from 212 to 242 phrases (+30 new phrases in Winkelen & Eten)
  - Better learning progression across 8 categories

### Technical
- **Phrase History Tracking** (state only, DB migration ready)
  - New `phraseHistory` JSONB column for spaced repetition system
  - Migration file: `migrations/001_add_phrase_history.sql`
  - Manual migration execution required
- **Mode Selector and Category Selector Modals**
  - New state properties: `selectedModeForCategory`, `selectedCategoryForMode`
  - Modal rendering methods: `renderModeSelector()`, `renderCategorySelector()`
  - Enhanced `getCurrentPhrases()` for 'all' category support
- **Grammar Mode Implementation**
  - New `grammarType` state property ('verbs' | 'pronouns')
  - `renderGrammar()` method with verb conjugation tables
  - Swedish verb conjugation data structures
- **CSS Variables for Scandinavian Colors**
  - `:root` level color definitions for consistency
  - Easy theme maintenance and future customization
- **GitHub Issues Created**
  - 6 new issues for v1.11.0 milestone (#6-#11)
  - Focus: Homepage & Design Polish
  - Issues cover navigation UX, modal persistence, color consistency

### Documentation
- **Scandinavian Design Guidelines** added to CLAUDE.md
  - Color selection criteria
  - WCAG accessibility requirements
  - Common mistakes to avoid
  - How to add new category colors
  - Visual harmony reference spectrum

## [1.8.0] - 2025-11-20

### Added
- **MEGA CONTENT UPDATE** 🚀 - All categories expanded to 30 phrases each
  - **Begroetingen (Greetings)**: 7 → 30 phrases (+23 new)
    - Morning/evening greetings (God morgon, God kväll, etc.)
    - Thank you expressions (Tack så mycket, Varsågod)
    - Apologies and responses (Förlåt, Ingen fara)
    - Social farewells (Ha det bra, Vi hörs, Lycka till)
  - **Dagelijks (Daily)**: 7 → 30 phrases (+23 new)
    - Morning routines (vakna, frukost, borsta tänderna, dusch)
    - Daily activities (handla, laga mat, städa, tvätta)
    - Evening routines (TV, läsa, lägga mig, sova gott)
    - States and needs (trött, hungrig, törstig)
  - **Werk (Work)**: 6 → 30 phrases (+24 new)
    - Office routines (börja arbeta, ta en paus, sluta)
    - Communication (skriva mail, ringa, möte, presentation)
    - Work activities (samarbeta, leda, granska, delta)
    - Work situations (deadline, hemifrån, semester, sjuk)
  - **Reizen (Travel)**: 6 → 30 phrases (+24 new)
    - Transportation (flygplatsen, buss, tunnelbana, hyra bil)
    - Accommodation (hotellrum, wifi, hiss, frukost på rummet)
    - Navigation (karta, museum, strand, turistinformation)
    - Check-in/out procedures and hotel amenities
  - **Praten (Conversation)**: 6 → 30 phrases (+24 new)
    - Understanding (förstår inte, upprepa, långsammare)
    - Opinions (håller med, tycker att, intressant)
    - Questions (Vad menar du?, Varför?, Berätta mer)
    - Expressions (Kanske, Säkert, Absolut, Det låter bra)
  - **Katten (Cats)**: 14 → 30 phrases (+16 new)
    - Cat behavior (sova, jagar, spinner, klättrar)
    - Cat care (kattmat, borsta, veterinär)
    - Cat characteristics (mjuka tassar, morrhår, mjauar)
    - General cat phrases for variety

### Changed
- **Total phrases**: 81 → 212 phrases (+131 new phrases, +162% increase)
- **Learning content**: Dramatically expanded practice material across all difficulty levels
- **Category balance**: All main categories now equal in size (30 phrases each)
- **Difficulty distribution**: Better mix of easy/medium/hard across all categories

### Technical
- Updated all category phrase arrays (g1-g30, d1-d30, w1-w30, t1-t30, c1-c30, k1-k30)
- Maintained consistent structure: Swedish, Dutch, pronunciation, difficulty
- Added varied difficulty levels per category (easy: ~40%, medium: ~40%, hard: ~20%)

## [1.7.0] - 2025-11-20

### Added
- **Difficulty Filter** 🎯 - Filter daily program by difficulty level
  - Four filter buttons: Alles, Makkelijk, Gemiddeld, Moeilijk
  - Located next to refresh button in daily program section
  - Filters apply immediately when generating new daily selection
  - `setDifficultyFilter()` method added to manage filter state
  - `generateDailyProgram()` now respects difficulty filter
- **August Winter Expansion** ❄️ - 10 new winter-themed phrases (a31-a40)
  - Snow activities (sneeuw, bygga snögubbe, kasta snöbollar, åker pulka)
  - Hot chocolate phrases (varm choklad, choklad med grädde)
  - Winter clothing and indoor activities
  - Increased August category from 30 to 40 total phrases

### Fixed
- **Practice Card Icons** 🎨 - Icons now render correctly as Font Awesome
  - Changed from `<span>${icon}</span>` to `<i class="fas ${icon}">`
  - Applies to category icons in practice mode header
  - Consistent with icon rendering throughout rest of app
- **Recording Error Handling** 🎤 - Much improved audio recording errors
  - Added specific error messages for common issues
  - NotAllowedError: "Geef toegang tot de microfoon"
  - NotFoundError: "Geen microfoon gevonden"
  - NotReadableError: "Microfoon is al in gebruik"
  - Added `MediaRecorder.onerror` event handler
  - Recording state properly reset on errors

### Changed
- **Leaderboard SQL Policy** 🏆 - Documented required database change
  - Added SQL command to allow viewing leaderboard for all users
  - Policy: "Anyone can view leaderboard" or "Authenticated users can view leaderboard"
  - Fixes issue where users only see themselves in rankings
  - Note: Requires manual SQL execution in Supabase

### Technical
- Added `difficultyFilter` to app state (null | 'easy' | 'medium' | 'hard')
- Filtering logic in `generateDailyProgram()` before shuffle/selection
- Enhanced error handling with `mediaRecorder.onerror` callback
- Icon rendering fixes in `renderPractice()` method line 1919
- Daily program cache now version-aware (regenerates on app update)

## [1.6.4] - 2025-11-18

### Added
- **PWA Auto-Update System** 🔄 - No more manual reinstallation required!
  - Service Worker implementation for automatic cache management
  - Version-based caching strategy (cache names include version number)
  - Automatic update detection when new version is deployed
  - Update notification banner with "Update Nu" button
  - Automatic cleanup of old cache versions
  - Offline support - app works without internet connection
  - Update check every 60 seconds for quick deployment
  - User-friendly update flow: detect → notify → apply → reload

### Technical
- **New file:** `sw.js` - Service Worker for PWA functionality
  - Network-first strategy with cache fallback
  - Automatic cache invalidation on version change
  - Service Worker lifecycle management (install, activate, fetch)
  - Message handling for skip waiting functionality
- **index.html updates:**
  - Service Worker registration on page load
  - Update detection and notification system
  - `showUpdateNotification()` function with animated banner
  - `applyUpdate()` function for user-triggered update
  - `dismissUpdate()` function to hide notification
  - New CSS animation: `@keyframes slideDown` for notification
  - Event listeners for updatefound and controllerchange events
- **Cache strategy:**
  - Cache name: `svenska-kat-v{version}`
  - Caches: index.html, manifest.json, root path
  - External CDN resources handled by browser cache
  - Old caches automatically deleted on activation

### Fixed
- **PWA Update Issue** - Resolved user pain point where PWA had to be manually deleted and reinstalled to see updates
- **Seamless Updates** - Users now get notified and can update with a single click

## [1.6.3] - 2025-11-18

### Changed
- **Category Icons Flat Design** 🎨 - All category emoji icons replaced with Font Awesome
  - Begroetingen: ❤️ → `fa-heart`
  - Dagelijks: ☕ → `fa-mug-hot`
  - Werk: 💼 → `fa-briefcase`
  - Reizen: ✈️ → `fa-plane`
  - Praten: 📖 → `fa-comments`
  - Katten: 🐱 → `fa-cat`
  - August Avonturen: 🎒 → `fa-backpack`

### Technical
- Updated category icon definitions from emoji strings to Font Awesome class names
- Changed rendering from `<span>${category.icon}</span>` to `<i class="fas ${category.icon}">`
- Updated 3 locations: homepage category cards, settings preferences, flashcard dropdown
- Added `text-gray-700` color and `aria-hidden="true"` to category icons
- Removed icons from select dropdown options (HTML not supported)

## [1.6.2] - 2025-11-18

### Changed
- **Complete Icon Flat Design & WCAG Optimization** 🎨
  - All icons throughout the app now use flat design with single colors
  - WCAG AA compliant colors across all icons:
    - `text-blue-600` → `text-blue-700` (contrast ratio 4.5:1)
    - `text-green-600` → `text-green-700` (contrast ratio 4.5:1)
    - `text-yellow-600` → `text-yellow-700` (contrast ratio 4.6:1)
  - Added `aria-hidden="true"` to all decorative icons for screen reader accessibility
  - Consistent icon sizing with `text-xl` and `text-lg` classes

### Technical
- Updated 50+ icon instances across all pages (home, badges, leaderboard, settings, navigation)
- Icon color updates in:
  - Homepage stats cards
  - Navigation active states (all 6 tabs)
  - Badges page header and content
  - Leaderboard display
  - Settings section headers
  - Header user info
- Improved accessibility compliance with proper ARIA attributes

## [1.6.1] - 2025-11-18

### Changed
- **Badge Icons Redesign** 🏆 - Font Awesome iconen met WCAG-conforme kleuren
  - Alle emoji badge iconen vervangen door Font Awesome icons
  - Semantische kleuren per badge categorie:
    - Blauw (text-blue-700) voor progress badges
    - Groen (text-green-700) voor level/growth badges
    - Rood (text-red-600) voor streak badges
    - Amber (text-amber-600) voor achievement badges
  - Locked badges tonen nu slotje icon (fa-lock)
  - Badges op homepage: witte achtergrond met gekleurde iconen
  - Badges pagina: witte achtergrond met gele border voor earned badges
  - Badge notification popup: witte achtergrond met gekleurde icon

### Fixed
- Nederlandse taalverbetering: "Vandaag's Programma" → "Programma voor vandaag"

### Technical
- Added `color` property to each badge definition
- Updated badge rendering to use `<i class="fas ${badge.icon} ${badge.color}">`
- Consistent WCAG AA contrast across all badge displays
- Aria-hidden attributes added to decorative badge icons

## [1.6.0] - 2025-11-18

### Changed
- **Homepage Layout Redesign** 🏠 - Compacter en overzichtelijker
  - Stats now in single row instead of 2x2 grid
  - Reduced vertical spacing throughout
  - More compact sections (daily program, categories, badges)
  - Less scrolling needed
  - Better visual hierarchy

### Added
- **WCAG Accessibility Improvements** ♿ - Full compliance with WCAG 2.1 Level AA
  - All icons now have sufficient contrast (4.5:1 or better)
  - Changed icon colors for better visibility:
    - `text-gray-400` → `text-gray-600` (contrast ratio 7:1)
    - `text-yellow-300` → `text-yellow-600` (contrast ratio 4.7:1)
    - `text-yellow-500` → `text-yellow-700` (contrast ratio 4.6:1)
    - `text-green-500` → `text-green-700` (contrast ratio 4.5:1)
    - `text-blue-500` → `text-blue-700` (contrast ratio 4.5:1)
  - Aria-labels added to icon-only buttons
  - Decorative icons marked with `aria-hidden="true"`
  - Input focus state updated to Scandinavian blue

### Technical
- Updated stats display from 4-card grid to compact 4-column row
- Reduced padding and margins throughout homepage
- Icon contrast ratios now meet WCAG AA standards
- Focus ring color changed from purple to blue
- Improved screen reader support with proper ARIA attributes

## [1.5.0] - 2025-11-18

### Changed
- **Complete Scandinavian Design Overhaul** 🎨 - Modern, minimalist redesign
  - Replaced all gradient backgrounds with solid colors
  - Changed primary color from purple to Scandinavian blue (#5B9BD5)
  - Flat design aesthetic with subtle shadows instead of gradients
  - Updated all UI components: buttons, cards, badges, navigation
  - Removed colorful gradients in favor of neutral tones
  - Cleaner, more professional appearance
- Color scheme updated to Scandinavian palette
  - Blue: `#5B9BD5` (primary)
  - Blue Dark: `#4A7FA8`
  - Blue Light: `#7FB3E5`
  - Grey: `#F5F7FA` (background)
  - Amber: `#F59E0B` (accents)
  - Green: `#10B981` (success)
  - Red: `#EF4444` (alerts)
- Background changed from purple gradient to solid light grey
- All buttons and interactive elements now use solid colors with hover effects
- Navigation tabs use blue instead of purple for active state
- Stat cards simplified with single-color backgrounds
- Progress bars and indicators use flat colors
- Badge cards redesigned with subtle shadows

### Technical
- Added CSS custom properties (`:root` variables) for Scandinavian color palette
- Updated `.gradient-text` class to use solid color
- Updated `.glass-effect` to remove backdrop blur
- Simplified `.card-shadow` with lighter shadow (0 2px 8px instead of 0 10px 30px)
- Replaced all `linear-gradient()` calls with `var(--scandi-*)` colors
- Updated Tailwind utility classes from `purple-*` to `blue-*`
- Removed all `bg-gradient-to-*` classes in favor of solid backgrounds

## [1.4.0] - 2025-11-18

### Added
- **New Category: August Avonturen** 🎒 - 30 new Swedish phrases featuring August
  - School adventures (10 phrases): Going to school, friends, learning, reading, art, playing
  - Food & drinks (10 phrases): Breakfast, lunch, dinner, helping in kitchen, favorite foods
  - Forest adventures (10 phrases): Walking with mama, mushroom picking (kantareller), animals, nature
- **Category Personalization System** ⚙️
  - Users can toggle categories on/off in Settings
  - Beautiful toggle switches with smooth animations
  - Shows phrase count for each category
  - Real-time preview of preferences
- **Smart Filtering**
  - Only enabled categories appear in home page
  - Daily program respects category preferences
  - Practice sessions only include selected categories

### Changed
- Total phrases increased: 72 → 102 phrases
- Allrounder badge now requires 7 categories (was 6)
- Category grid dynamically filters based on user preferences
- Daily program generation now category-aware

### Technical
- Added `categoryPreferences` array to user stats (defaults to all categories enabled)
- Implemented `toggleCategory(categoryId)` method with auto-save
- Filter logic in `generateDailyProgram()` checks categoryPreferences
- Home page `renderHome()` filters categories display
- Database schema updated to store categoryPreferences in user stats JSON

## [1.3.5] - 2025-11-18

### Added
- **Version History Section:** Complete version history now visible in Settings page
- **Visual Indicators:** Current version highlighted with purple border and "Huidig" badge
- **Scrollable Container:** Max-height of 24rem with overflow scrolling for easy browsing
- **Release Details:** Each version shows date and all features/changes

### Changed
- Settings page reorganized with version history between App Info and Tour sections
- Purple gradient cards for better visual appeal

### Technical
- Version history dynamically generated from `RELEASE_NOTES` object
- Uses `Object.entries()` to iterate through all versions
- Current version detection via `APP_VERSION` comparison
- Responsive design with proper spacing and typography

## [1.3.4] - 2025-11-18

### Added
- **7 New Cat Phrases:** Expanded Katten category from 7 to 14 phrases
- **Introduced Cleo:** Jacob and Monique's cat now featured in multiple phrases
- **Owner Relationships:** Phrases mentioning Kehrana as owner of Sok and Winnie
- **Cat Interactions:** Phrases about all three cats playing together

### Changed
- Total phrases in Katten category: 7 → 14 (k1-k14)
- More personal and relatable cat-themed learning content

### Technical
- Added phrase IDs k8-k14 to cats category
- Maintained consistent Swedish/Dutch/pronunciation format
- Varied difficulty levels across new phrases

## [1.3.3] - 2025-11-18

### Fixed
- **Critical Bug:** Fixed app-breaking bug where inline `<script>` tag in template literal was closing the main script tag
- Template literals now execute properly instead of showing as raw text
- JavaScript execution restored by escaping closing script tag (`<\/script>`)

### Technical
- Issue was in `renderOnboardingOverlay()` method at line 1013
- The `</script>` closing tag was prematurely ending the main `<script>` block
- Caused all subsequent JavaScript to be interpreted as HTML/text
- Fixed by escaping: `</script>` → `<\/script>`

## [1.3.2] - 2025-11-18

### Changed
- **Personalized Cat Phrases:** All phrases in Katten category now feature Sok and Winnie de Poes
- Updated 7 Swedish phrases with personalized cat names
- More relatable and fun learning experience

### Technical
- Modified all phrase IDs k1-k7 with new Swedish/Dutch translations
- Kept pronunciation guides accurate for new phrases

## [1.3.1] - 2025-11-18

### Added
- **PWA Manifest:** Added manifest.json for proper Progressive Web App configuration
- **Spotlight Effect:** Tour now highlights specific UI elements with purple border and shadow
- **Element IDs:** Added IDs to all tour-targetable elements (progress-card, daily-program, categories, nav buttons)

### Changed
- Tour popup now positioned at bottom center (above navigation) instead of screen center
- Dark overlay improved with blur effect (backdrop-filter)
- Spotlight uses box-shadow technique for better visual separation
- Tour is now fullscreen with highlighted elements "cut out" from dark overlay

### Fixed
- Tour UX improved - no more jumping from corner to center
- PWA display mode set to "standalone" for app-like experience
- Better viewport handling in Safari PWA mode
- Theme color meta tag added for proper status bar coloring

### Technical
- Spotlight positioning uses getBoundingClientRect() for precise element location
- Dynamic script execution positions spotlight after DOM render
- Purple theme (#8b5cf6) used for tour highlights
- manifest.json includes SVG emoji icons (🐱) for all sizes

## [1.3.0] - 2025-11-18

### Added
- **🐱 App Rebranding:** Renamed from "Zweeds B1" to "Svenska Kat"
- **Auto-advance Feature:** Automatically opens next phrase after completing daily program phrase
- **Completion Screen:** Beautiful celebration screen when all daily phrases are completed
  - Random Swedish praise messages (Bra jobbat!, Fantastiskt!, etc.)
  - Happy cat emoji animation
  - Stats summary
  - Cute cat message: "Purrfekt! Je bent een echte taalkat! 🐾"

### Changed
- Completed daily program phrases now show **green checkmarks** instead of purple
- Green gradient (emerald) for completed phrase indicators
- Improved daily program flow with automatic progression
- Enhanced user experience with seamless phrase transitions

### Technical
- Added `fromDailyProgram`, `currentDailyPhraseIndex`, and `showDailyCompletion` state properties
- Implemented auto-advance logic in `markAsCompleted()` method
- Created `renderDailyCompletionScreen()` and `closeDailyCompletion()` methods
- Smart next-phrase detection with uncompleted phrase prioritization
- All app names updated across UI (login, setup, header, tour, etc.)

## [1.2.1] - 2025-11-18

### Fixed
- Safari iPhone password manager not saving credentials properly
- Login form now properly recognized by iOS Safari autofill
- Password field autocomplete correctly switches between login/signup modes

### Changed
- Added `action` and `method` attributes to login form for better Safari support
- Added `required` attributes to email and password fields
- Added `for` attributes to all form labels for improved accessibility
- Email field autocomplete switches between `username` and `email` for login/signup
- Display name field now required during signup

### Technical
- Improved `toggleSignUp()` function to properly manage form field attributes
- Enhanced form structure for better iOS Safari password manager integration

## [1.2.0] - 2025-11-18

### Added
- **New Category: Katten (Cats)** 🐱 - 7 new Swedish phrases about cats
- **Daily Program Feature** 📅 - Personalized daily selection of 10 phrases
  - Smart algorithm prioritizes uncompleted phrases
  - Mix of difficulty levels and categories
  - Refresh button to generate new selection
  - Visual progress tracking for each phrase
- **Interactive Onboarding Tour** 🎓 - Step-by-step guide for new users
  - 10-step walkthrough of all app features
  - Progress bar showing tour completion
  - Skip and navigation controls
  - Auto-starts for new user signups
  - "Restart Tour" button in settings page

### Changed
- Updated "Allrounder" badge requirement from 5 to 6 categories
- Enhanced home page layout with daily program section
- Improved category display with purple gradient for cats category

### Technical
- Added `showOnboarding`, `onboardingStep`, and `dailyPhrases` to app state
- Implemented `tourSteps` array with tour configuration
- Added onboarding methods: `startTour()`, `nextTourStep()`, `previousTourStep()`, `skipTour()`, `completeTour()`
- Implemented daily program methods: `generateDailyProgram()`, `startDailyPhrase()`
- Daily program uses localStorage for persistence
- Smart phrase selection algorithm with shuffle and prioritization

## [1.1.4] - 2025-11-18

### Fixed
- New users no longer see update notification on first login
- Update notification timing improved to show after authentication completes

### Changed
- Audio stream now persists during practice session instead of restarting for each recording
- Optimized microphone permission flow for better iOS experience
- Login form structure improved for better user experience

### Technical
- Moved `checkForUpdates()` call to execute after user authentication
- Set `lastSeenVersion` for new users during signup to prevent false update notifications
- Audio stream remains active until user leaves practice mode

## [1.1.3] - 2025-11-09

### Fixed
- iOS Safari audio playback issues resolved
- Microphone permission handling improved for iOS devices
- Audio resource cleanup and proper stream management
- Bottom navigation positioning fixed to prevent overlap with content

### Changed
- Enhanced audio element reload mechanism for iOS compatibility
- Improved MediaRecorder cleanup on navigation

## [1.1.2] - 2025-11-09

### Added
- "Remember Me" feature on login screen
- Session persistence toggle for user choice between localStorage and sessionStorage
- Enhanced security with session storage options

### Changed
- Authentication flow now respects user's session preference
- Login form includes checkbox for staying logged in

## [1.1.1] - 2025-11-09

### Fixed
- Audio playback stabilization across browsers
- Login error messages now more descriptive and helpful
- Email verification support improved

### Added
- Password reset functionality
- Better error handling for unconfirmed email accounts
- User feedback for authentication errors

## [1.1.0] - 2025-11-09

### Added
- Account settings page
- Audio playback feature for recorded pronunciations
- Update notification system with version change alerts
- Display name customization
- Password change functionality

### Changed
- Improved user experience with clearer navigation
- Enhanced settings interface
- Better visual feedback for user actions

### Fixed
- Various UI polish improvements
- Navigation flow enhancements

## [1.0.0] - 2025-11-09

### Added
- Initial release with core language learning features
- 5 Swedish language categories (Greetings, Daily, Work, Travel, Conversation)
- 35 Swedish phrases with Dutch translations and pronunciation guides
- Audio recording for pronunciation practice using MediaRecorder API
- Text-to-speech playback for Swedish phrases
- Flashcard study mode for memorization
- Gamification system with points and levels
- 14 achievement badges across multiple categories
- Streak tracking for daily practice motivation
- Daily goal system (10 phrases per day)
- Competitive leaderboard showing top 10 players
- User authentication and account management via Supabase
- Cross-device progress synchronization
- Mobile-optimized responsive design
- iOS Safari compatibility with special audio handling
- Progressive difficulty levels (Easy, Medium, Hard)
- Category completion tracking
- Perfect score bonuses (+5 points)

### Technical
- Single-page application architecture with vanilla JavaScript
- Supabase backend integration for authentication and data storage
- Row-level security policies for data protection
- Tailwind CSS for styling
- Font Awesome icons
- Web Audio API and MediaRecorder integration
- Web Speech API for text-to-speech
- LocalStorage for session management and preferences

## Pre-1.0.0 Development

### Initial Development
- Project initialization with basic HTML structure
- Supabase configuration and database setup
- Core SwedishApp class architecture
- Phrase database creation with translations
- Basic UI components and navigation
- Authentication system implementation
- Progress tracking system
- Badge achievement logic
- Leaderboard implementation

---

## Version Support

- **Current Version**: 1.10.2
- **Minimum Browser Requirements**:
  - Chrome 60+
  - Safari 14+ (iOS 14+)
  - Firefox 65+
  - Edge 79+
- **Backend**: Supabase (latest)
- **APIs Used**: MediaRecorder, Web Speech API, Web Audio API

## Upgrade Notes

### Upgrading to 1.2.0
- No database changes required
- Existing user data fully compatible
- New users will automatically see onboarding tour
- Daily program generates automatically on first login
- Total phrase count increased from 35 to 42 (7 new cat phrases)
- Users can replay onboarding tour from settings at any time

### Upgrading to 1.1.4
- No database changes required
- Existing user data fully compatible
- New users will have better onboarding experience without false update notifications
- Audio recording sessions will be smoother with persistent microphone access

### Upgrading to 1.1.3
- No database changes required
- Existing user data fully compatible
- Audio recordings may work better on iOS devices
- Clear browser cache if experiencing audio issues

### Upgrading to 1.1.2
- No migration needed
- Users will see new "Remember Me" option on next login
- Existing sessions remain valid

### Upgrading to 1.1.1
- No breaking changes
- Password reset feature available immediately
- Users with unconfirmed emails will see helpful error messages

### Upgrading to 1.1.0
- No data migration required
- All existing user progress preserved
- New settings page available in navigation
- Update notification appears once per version

## Known Issues

### Current
- Audio recording requires HTTPS in production
- Some older iOS devices may have limited audio format support
- Leaderboard updates require page refresh (not real-time)
- Account deletion removes progress but not auth record (admin action required for full deletion)

### Planned Fixes
- Real-time leaderboard updates
- Improved audio format detection
- Better offline support
- Enhanced error recovery for network issues

## Future Roadmap

### Planned Features

#### High Priority
- **Guest Mode** 👤 - App gebruiken zonder account
  - Alle basisfuncties toegankelijk (Practice, Flashcards, Writing)
  - Lokale opslag van voortgang (localStorage)
  - Duidelijke "upgrade prompt" met wat je mist:
    - ❌ Voortgang synchronisatie tussen apparaten
    - ❌ Leaderboard deelname
    - ❌ Badges en achievements opslaan
    - ❌ Streak behouden na browser cache wissen
  - Makkelijke conversie naar account (data migratie)
  - Niet-opdringerige reminders om account aan te maken

- **Admin Dashboard** 👨‍💼 - Beheerders interface voor monitoring
  - Gebruikersoverzicht met statistieken
  - Recent activity logs (laatste login, progressie)
  - Top performers en leaderboard analytics
  - Individuele gebruiker details bekijken
  - Progressie history en trends
  - Admin-only toegang (role-based)
  - Export functionaliteit voor data analyse

- **Feedback & Bug Reports** 🐛 - Directe GitHub Issues integratie
  - In-app feedback formulier
  - Bug report knop in settings
  - Automatisch GitHub Issue aanmaken via API
  - Screenshot upload optie
  - Feature request categorisatie
  - Status tracking van ingediende issues

- **Spaced Repetition System** 🧠 - Intelligente herhaling
  - Algoritme voor optimale leermomenten
  - Automatische review scheduling
  - "Review Queue" met prioriteiten
  - Moeilijkheidsgraad aanpassing per gebruiker
  - Retention statistics en succes tracking

#### Social & Engagement
- **Chat Functionaliteit** 💬 - Sociale interactie tussen gebruikers
  - Gebruikerslijst bekijken (actieve accounts)
  - Direct messaging binnen de app
  - Real-time chat met Supabase Realtime
  - Online/offline status indicators
  - Optionele chat notificaties

- **Study Groups & Challenges** 🏆 - Competitieve en coöperatieve features
  - Wekelijkse challenges met rewards
  - Study groups maken en joinen
  - Groepsleaderboards
  - Shared goals en milestones
  - Team badges en achievements

- **Friend System** 👥 - Sociaal netwerk
  - Vrienden toevoegen via email/username
  - Vrienden progressie bekijken
  - Head-to-head challenges
  - Shared learning paths
  - Support messages en encouragement

#### Learning Enhancement
- **AI Pronunciation Scoring** 🎤 - Geautomatiseerde feedback
  - Speech recognition voor Swedish
  - Real-time pronunciation feedback
  - Score per phoneme/woord
  - Improvement suggestions
  - Progress tracking over tijd

- **Audio Comparison Tool** 🔊 - Side-by-side vergelijking
  - Jouw opname vs native speaker
  - Visual waveform comparison
  - Slow-motion playback
  - Highlight differences
  - Practice mode met direct feedback

- **Vocabulary Builder** 📚 - Woordenschat uitbreiding
  - Persoonlijke woordenlijsten
  - Flashcards voor nieuwe woorden
  - Contextual examples
  - Audio voor elk woord
  - Spaced repetition integration

- **Grammar Lessons** 📖 - Grammatica uitleg
  - Basis Zweedse grammatica
  - Interactive exercises
  - Rule explanations in Dutch
  - Practice sentences
  - Quiz mode

- **Cultural Notes** 🇸🇪 - Culturele context
  - Swedish cultural information
  - Holiday explanations
  - Social etiquette tips
  - Regional differences
  - Integrated with relevant phrases

#### User Experience
- **Study Reminders** ⏰ - Notificaties en motivatie
  - Daily study reminders
  - Streak preservation alerts
  - Custom notification times
  - Motivational messages
  - Goal progress updates

- **Progress Certificates** 🎓 - Achievements documentatie
  - Downloadable PDF certificates
  - Milestone certificates (50, 100, 200 zinnen)
  - Shareable on social media
  - Beautiful design met stats
  - Print-ready format

- **Custom Phrase Creator** ✍️ - Gebruikers content
  - Eigen zinnen toevoegen
  - Community sharing (optioneel)
  - Pronunciation guide writer
  - Difficulty level selector
  - Moderatie system voor publieke zinnen

- **Offline Mode** 📴 - Werken zonder internet
  - Download phrases voor offline gebruik
  - Local storage sync
  - Queue actions voor later sync
  - Offline progress tracking
  - Auto-sync when online

#### Advanced Features
- **Learning Analytics Dashboard** 📊 - Diepgaande statistieken
  - Learning curve visualization
  - Time spent per category
  - Best/worst performing phrases
  - Optimal study time detection
  - Prediction of mastery dates
  - Export data als CSV/PDF

- **Voice Chat Sessions** 🗣️ - Practice met anderen
  - Random matching met other learners
  - Topic-based conversations
  - Native speaker connections (premium)
  - Session recording (optioneel)
  - Post-session feedback

- **Mobile Apps** 📱 - Native applications
  - iOS app (Swift/SwiftUI)
  - Android app (Kotlin)
  - Push notifications
  - Offline-first architecture
  - Sync met web versie

- **Multi-language Support** 🌍 - Meer talen leren
  - Norwegian, Danish expansion
  - German, French toevoegen
  - Shared progress system
  - Language switching
  - Comparison tools tussen talen

### Under Consideration
- Voice chat with native speakers
- Integration with language certification programs
- Teacher/student mode for classroom use
- Advanced statistics and learning analytics
- Customizable difficulty progression
- Theme customization options

---

For detailed technical information, see [CLAUDE.md](CLAUDE.md).
For general usage information, see [README.md](README.md).
