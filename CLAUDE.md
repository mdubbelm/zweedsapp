# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Zweeds B1** is a Swedish language learning web application built as a single-page HTML file with Supabase backend integration. The app features audio recording for pronunciation practice, flashcards, gamification with achievements, and a competitive leaderboard.

- **Technology**: Vanilla JavaScript (ES6+), single HTML file architecture
- **Styling**: Tailwind CSS (CDN)
- **Backend**: Supabase (PostgreSQL + Auth)
- **APIs**: MediaRecorder, Web Speech API, Web Audio API
- **PWA**: Service Worker with auto-update system and offline support
- **Deployment**: Static file hosting (any platform) with GitHub Pages

## Development Commands

### Local Development
```bash
# No build process - open file directly in browser
open index.html

# Or use a simple HTTP server for testing
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Version Control
```bash
# Standard git workflow
git add index.html
git commit -m "Version X.X.X: Feature description"
git push origin main

# Deploy by pushing to main branch
```

### Testing
- Manual testing in browser (Chrome, Safari, Firefox)
- **Critical**: Test audio recording on iOS Safari (special handling required)
- Test authentication flow and session persistence
- Verify Supabase data sync across browser sessions

## Architecture

### Single-File Monolithic Structure
The entire application is contained in `index.html` (~1809 lines):
- **Head**: Meta tags, Supabase SDK, Tailwind CSS, Font Awesome
- **Style**: Custom CSS animations and mobile optimizations
- **Script**: Single `SwedishApp` class managing all functionality

### Core Class: `SwedishApp`
```javascript
class SwedishApp {
    constructor()          // Initialize state and auth
    render()              // Main rendering orchestrator (calls specific render methods)
    renderHome()          // Dashboard with progress overview
    renderPractice()      // Audio recording practice mode
    renderFlashcards()    // Memory flashcard mode
    renderBadges()        // Achievement gallery
    renderLeaderboard()   // Competitive ranking
    renderSettings()      // Account management
    renderLogin()         // Authentication UI
    renderSetup()         // Initial setup wizard
}
```

### State Management Pattern
- **Centralized state**: Everything in `this.state` object
- **Reactive rendering**: Call `this.render()` after any state mutation
- **Persistence**: Auto-sync to Supabase on important changes
- **No virtual DOM**: Full HTML regeneration on each render

```javascript
this.state = {
    // Navigation
    currentTab: 'home'|'practice'|'flashcards'|'badges'|'leaderboard'|'settings',

    // Practice mode
    currentCategory: string,
    currentPhraseIndex: number,
    isRecording: boolean,
    audioURL: string|null,

    // User data
    user: object,
    stats: { totalPoints, level, streak, badges, ... },
    completedPhrases: ['greetings-g1', ...]
}
```

### Data Models

**Categories**: 5 language topic areas
```javascript
categories = {
    greetings: { icon, name, color, phrases[] },
    daily: { ... },
    work: { ... },
    travel: { ... },
    conversation: { ... }
}
```

**Phrases**: 35 total (~7 per category)
```javascript
phrase = {
    id: 'g1',
    swedish: 'Hej! Hur mår du?',
    dutch: 'Hoi! Hoe gaat het met je?',
    pronunciation: 'Hey! Hur mor doo?',
    difficulty: 'easy'|'medium'|'hard'
}
```

**Badges**: 14 achievements
- Phrase milestones: firstSteps, beginner, intermediate, expert
- Streak-based: dedicated, onFire, unstoppable
- Category-based: categoryMaster, allRounder
- Performance: perfectionist, speedster, levelUp, master

## Key Implementation Details

### Audio Recording (Cross-Browser Compatibility)
The audio recording system has **extensive iOS Safari compatibility handling**:

```javascript
// MIME type detection with 5 fallback formats
if (MediaRecorder.isTypeSupported('audio/mp4'))
else if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus'))
else if (MediaRecorder.isTypeSupported('audio/webm'))
else if (MediaRecorder.isTypeSupported('audio/ogg'))
else 'audio/wav' // fallback
```

**Important**: Always clean up audio resources:
```javascript
// Stop all tracks when leaving practice mode
stream.getTracks().forEach(track => track.stop())
URL.revokeObjectURL(this.state.audioURL)
```

### Text-to-Speech
```javascript
const utterance = new SpeechSynthesisUtterance(phrase.swedish)
utterance.lang = 'sv-SE'  // Swedish language code
utterance.rate = 0.8      // Slower for clarity
window.speechSynthesis.speak(utterance)
```

### Supabase Integration

**Configuration** (in script head):
```javascript
const SUPABASE_URL = 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = 'eyJ...'
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        storage: window.localStorage,  // or sessionStorage
        autoRefreshToken: true,
        persistSession: true
    }
})
```

**Database Schema**:
```sql
CREATE TABLE user_progress (
    user_id UUID PRIMARY KEY REFERENCES auth.users,
    stats JSONB NOT NULL,
    completed_phrases TEXT[] NOT NULL,
    updated_at TIMESTAMP DEFAULT now()
);

-- Row Level Security (users only see/edit their own data)
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
```

**Data Operations**:
```javascript
// Load user data
const { data } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .single()

// Save user data (upsert)
await supabase
    .from('user_progress')
    .upsert({
        user_id: user.id,
        stats: this.state.stats,
        completed_phrases: this.state.completedPhrases
    })
```

## Common Development Tasks

### Adding New Phrases
1. Locate the `categories` object in the `<script>` section
2. Add to the appropriate category's `phrases` array:
```javascript
{
    id: 'g8',  // Use next sequential ID
    swedish: 'God morgon!',
    dutch: 'Goedemorgen!',
    pronunciation: 'Good mor-on',
    difficulty: 'easy'
}
```

### Adding New Categories
1. Add to `categories` object following the existing pattern:
```javascript
food: {
    icon: 'utensils',  // Font Awesome icon name
    name: 'Eten',
    color: 'bg-green-500',
    phrases: [ /* phrase objects */ ]
}
```
2. No other changes needed - the UI auto-generates from this data

### Creating New Badges
1. Add to `badges` object:
```javascript
newBadge: {
    icon: 'star',
    color: 'bg-purple-500',
    name: 'Badge Name',
    description: 'Badge description',
    requirement: 100,
    type: 'custom'  // Define your own type
}
```
2. Implement logic in `checkBadges()` method:
```javascript
case 'custom':
    if (this.state.stats.someMetric >= badge.requirement) {
        this.awardBadge(badgeId)
    }
    break
```

### Modifying UI Components
All UI is generated via render methods. Example pattern:
```javascript
renderHome() {
    return `
        <div class="p-6">
            <h1>${this.state.stats.displayName}</h1>
            <!-- Component HTML -->
        </div>
    `
}
```

After updating render methods, state changes automatically trigger re-render.

### Updating App Version
1. Update version constants at top of script:
```javascript
const APP_VERSION = '1.2.0'
const VERSION_DATE = '2025-11-10'
const UPDATE_NOTES = [
    'New feature description',
    'Bug fix description'
]
```
2. Update notification will automatically show to users on next load

## Mobile Optimization

### iOS-Specific Considerations
- Audio playback requires user interaction to start
- MediaRecorder MIME types differ (prefer mp4 on iOS)
- Use `-webkit-overflow-scrolling: touch` for smooth scrolling
- Fixed bottom nav uses `z-index: 1000` to stay above content
- Audio element may need forced reload: `setTimeout(() => audio.load(), 100)`

### Touch Interactions
```css
* {
    -webkit-tap-highlight-color: transparent;  /* Remove tap flash */
}
```

## PWA & Service Worker

### Service Worker Architecture
The app implements a Progressive Web App with automatic update management via Service Worker (`sw.js`).

**Key Features:**
- **Version-based caching**: Cache name includes version number (`svenska-kat-v1.6.4`)
- **Automatic updates**: Detects new versions and notifies users
- **Offline support**: App works without internet after first load
- **Cache cleanup**: Old caches automatically deleted on activation

### Service Worker Lifecycle

**Install Event:**
```javascript
// Caches app shell files
event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    .then(() => self.skipWaiting())
)
```

**Activate Event:**
```javascript
// Deletes old caches
caches.keys().then(names =>
    Promise.all(names.map(name =>
        name !== CACHE_NAME ? caches.delete(name) : null
    ))
).then(() => self.clients.claim())
```

**Fetch Event:**
- Network-first strategy for fresh content
- Falls back to cache if network fails
- Updates cache with successful network responses

### Update Detection System

**In index.html:**
```javascript
// Register Service Worker
navigator.serviceWorker.register('/sw.js')

// Listen for updates
registration.addEventListener('updatefound', () => {
    const newWorker = registration.installing
    newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New version available - show notification
            showUpdateNotification()
        }
    })
})

// Check for updates every 60 seconds
setInterval(() => registration.update(), 60000)
```

**Update Flow:**
1. Service Worker detects new version (different cache name)
2. `showUpdateNotification()` displays update banner
3. User clicks "Update Nu" button
4. `applyUpdate()` sends SKIP_WAITING message to SW
5. Service Worker activates immediately
6. Page reloads with new version

### Cached Resources
- `/` - Root path
- `/index.html` - Main application file
- `/manifest.json` - PWA manifest
- External CDN resources (Tailwind, Font Awesome, Supabase) handled by browser cache

### Testing PWA Updates
1. Make changes to `index.html`
2. Update `APP_VERSION` constant (e.g., 1.6.4 → 1.6.5)
3. Update `CACHE_VERSION` in `sw.js` to match
4. Commit and push to GitHub
5. Wait 2-3 minutes for GitHub Pages deployment
6. Open installed PWA - update notification appears within 60 seconds
7. Click "Update Nu" - app reloads with new version

### Important Notes
- **Always update both versions**: `APP_VERSION` in index.html AND `CACHE_VERSION` in sw.js must match
- **Service Worker scope**: Registered at root (`/sw.js`) so it controls all app routes
- **HTTPS required**: Service Workers only work over HTTPS (or localhost for testing)
- **Cache strategy**: Network-first ensures users always get latest content when online

## Security & Data

### Row-Level Security (RLS)
All database access is protected by Supabase RLS policies. Users can only:
- Read their own `user_progress` row
- Update their own `user_progress` row
- View leaderboard (aggregated data)

### API Keys
The `SUPABASE_ANON_KEY` is intentionally exposed in the client code. This is safe because:
- RLS policies protect all data access
- Anonymous key is scoped to specific tables
- No sensitive operations possible with this key alone

### Authentication
- Email/password via Supabase Auth
- Email verification required on signup
- Session persistence controlled by "Remember Me" checkbox
- Password reset via email link

## Gamification System

### Points & Levels
- Easy phrases: 10 points
- Medium phrases: 15 points
- Hard phrases: 20 points
- "Perfect" bonus: +5 points
- Level calculation: `Math.floor(totalPoints / 100) + 1`

### Streak Logic
- Increments daily on first phrase completion
- Resets to 0 if a day is skipped
- Uses `toDateString()` comparison for day boundaries
- Daily goal: 10 phrases (tracked separately from streak)

### Badge Award System
`checkBadges()` runs after every phrase completion:
1. Iterates all badge definitions
2. Checks condition based on `badge.type` and `badge.requirement`
3. Awards badge if eligible and not already owned
4. Shows 3-second popup animation
5. Saves to database

## Version History

- **v1.6.4** (2025-11-18): PWA Auto-Update System, Service Worker, offline support
- **v1.6.3** (2025-11-18): Category icons flat design (Font Awesome)
- **v1.6.2** (2025-11-18): Complete icon flat design & WCAG optimization
- **v1.6.1** (2025-11-18): Badge icons redesign with WCAG colors
- **v1.6.0** (2025-11-18): Compact homepage layout, WCAG compliance
- **v1.5.0** (2025-11-18): Scandinavian design overhaul
- **v1.4.0** (2025-11-18): August Avonturen category, category preferences
- **v1.3.x** (2025-11-18): Katten category expansion, version history, bug fixes
- **v1.2.0** (2025-11-18): Daily Program, Onboarding Tour, Katten category
- **v1.1.3** (2025-11-09): iOS audio fixes, bottom nav positioning
- **v1.1.2** (2025-11-09): Remember Me feature, session persistence
- **v1.1.1** (2025-11-09): Audio playback fixes, password reset
- **v1.1.0** (2025-11-09): Account settings, audio playback, update notifications
- **v1.0.0+**: Initial releases with core functionality

## Code Style Guidelines

### HTML Generation
Use template literals with proper indentation:
```javascript
return `
    <div class="container">
        <h1 class="text-2xl font-bold">${title}</h1>
        ${items.map(item => `
            <div class="item">${item.name}</div>
        `).join('')}
    </div>
`
```

### State Updates
Always call `render()` after mutations:
```javascript
updateStats(newPoints) {
    this.state.stats.totalPoints += newPoints
    this.state.stats.level = Math.floor(this.state.stats.totalPoints / 100) + 1
    this.render()  // Critical!
}
```

### Async Operations
Use async/await consistently:
```javascript
async saveUserData() {
    try {
        const { error } = await supabase.from('user_progress').upsert(...)
        if (error) throw error
    } catch (err) {
        console.error('Save failed:', err)
        alert('Failed to save progress')
    }
}
```

## Deployment

### Requirements
1. Static file hosting with HTTPS (GitHub Pages, Netlify, Vercel, etc.)
2. Supabase project with `user_progress` table configured
3. RLS policies enabled on database table
4. Email authentication enabled in Supabase
5. Service Worker support (requires HTTPS in production)

### Environment Setup
Update Supabase credentials in `<script>` section:
```javascript
const SUPABASE_URL = 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = 'your-anon-key'
```

### Database Setup Script
Run once on new Supabase project:
```sql
CREATE TABLE user_progress (
    user_id uuid references auth.users primary key,
    stats jsonb,
    completed_phrases text[],
    updated_at timestamp with time zone default now()
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
    ON user_progress FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
    ON user_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
    ON user_progress FOR UPDATE
    USING (auth.uid() = user_id);
```

## Troubleshooting

### Audio Recording Not Working
- Check microphone permissions in browser
- Verify HTTPS (required for MediaRecorder API)
- Test different MIME types (iOS vs desktop)
- Check console for MediaRecorder support errors

### Login Issues
- Verify email is confirmed (check spam folder)
- Check Supabase Auth settings (email provider enabled)
- Confirm RLS policies are correctly configured
- Check browser console for Supabase errors

### Data Not Syncing
- Verify user is authenticated (`this.state.user` exists)
- Check network tab for failed Supabase requests
- Confirm RLS policies allow user's operations
- Verify `user_id` matches authenticated user

### Leaderboard Not Loading
- Check `stats` column exists in `user_progress` table
- Verify multiple users have data (need 2+ for testing)
- Check console for query errors
- Confirm RLS allows reading aggregate stats

### Service Worker / PWA Update Issues
**Update notification not appearing:**
- Check browser console for Service Worker registration errors
- Verify HTTPS is enabled (required for Service Workers)
- Check that `CACHE_VERSION` in `sw.js` matches `APP_VERSION` in `index.html`
- Wait up to 60 seconds for automatic update check
- Manually trigger update check: Navigate to Chrome DevTools → Application → Service Workers → Update

**Old version still showing after update:**
- Hard refresh the page (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check Chrome DevTools → Application → Service Workers → ensure new SW is "activated"
- Clear all Service Worker caches: Application → Cache Storage → Delete all
- Unregister Service Worker and reload: Application → Service Workers → Unregister
- Verify GitHub Pages has deployed latest version (check repository Actions tab)

**PWA won't install or update:**
- Verify `manifest.json` is accessible at root path
- Check that all required manifest fields are present
- Ensure HTTPS is enabled
- Check console for manifest parsing errors
- Try uninstalling PWA and reinstalling after cache clear

**Offline mode not working:**
- Check Service Worker is registered and active
- Verify cached resources in DevTools → Application → Cache Storage
- Test offline: DevTools → Network → set to "Offline"
- Ensure Service Worker fetch event is working (check Network tab for "(ServiceWorker)" source)

**Debugging Service Workers:**
```javascript
// In browser console:
navigator.serviceWorker.getRegistrations().then(registrations => {
    console.log('Active Service Workers:', registrations)
})

// Check cache contents:
caches.keys().then(names => {
    console.log('Cache names:', names)
    names.forEach(name => {
        caches.open(name).then(cache => {
            cache.keys().then(keys => console.log(name, keys))
        })
    })
})

// Force update:
navigator.serviceWorker.getRegistration().then(reg => reg.update())
```

## File Reference

- **index.html** (~2690 lines) - Main application file
  - App version constant and release notes
  - Service Worker registration and update management
  - SwedishApp class with all UI and logic
  - Inline CSS with animations (including slideDown for update notification)
  - Complete single-file architecture
- **sw.js** (~95 lines) - Service Worker for PWA functionality
  - Version-based caching strategy
  - Network-first fetch with cache fallback
  - Automatic cache cleanup on activation
  - Offline support
- **manifest.json** - PWA manifest configuration
  - App name, icons, theme colors
  - Display mode: standalone
  - Cat emoji SVG icons
- **CHANGELOG.md** - Detailed version history and roadmap
- **README.md** - User-facing documentation
- **CLAUDE.md** - This file (development guide for Claude Code)
- **zweeds-b1-supabase.html** - Backup copy (may be outdated)
- **.git/** - Version control history
