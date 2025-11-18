# Changelog

All notable changes to Svenska Kat (formerly Zweeds B1) Language Learning App will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

- **Current Version**: 1.6.3
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
