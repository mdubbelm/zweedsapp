# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ CRITICAL: Deployment Workflow

**THIS APP IS DEPLOYED VIA GITHUB PAGES**

After making ANY changes to the codebase:
1. **ALWAYS commit and push to GitHub** - changes are NOT visible until pushed
2. **Wait 2-3 minutes** for GitHub Pages to deploy
3. **User must refresh their browser** or wait for PWA auto-update notification

**Workflow for every change:**
```bash
git add <files>
git commit -m "Version X.X.X: Description"
git push origin main
# → GitHub Pages auto-deploys to: https://mdubbelm.github.io/zweedsapp
```

**Never tell the user to "refresh the page" without first pushing to GitHub!**
The live app URL is GitHub Pages, NOT a local file. Local changes are invisible until deployed.

## Project Overview

**Svenska Kat** (formerly Zweeds B1) is a Swedish language learning web application built as a single-page HTML file with Supabase backend integration. The app features audio recording for pronunciation practice, flashcards, gamification with achievements, and a competitive leaderboard.

- **Technology**: Vanilla JavaScript (ES6+), single HTML file architecture
- **Styling**: Tailwind CSS (CDN)
- **Backend**: Supabase (PostgreSQL + Auth)
- **APIs**: MediaRecorder, Web Speech API, Web Audio API
- **PWA**: Service Worker with auto-update system and offline support
- **Deployment**: GitHub Pages (https://mdubbelm.github.io/zweedsapp)
- **Repository**: https://github.com/mdubbelm/zweedsapp

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

## Scandinavian Design Guidelines

**CRITICAL: Always consult these guidelines when adding visual elements, colors, or UI components.**

### Design Philosophy
Svenska Kat follows **authentic Scandinavian design principles**:
- **Minimalism**: Clean, uncluttered interfaces
- **Natural Colors**: Low saturation, earthy tones with grey undertones
- **Warmth**: Hygge-inspired, inviting atmosphere
- **Accessibility**: WCAG 2.1 Level AA compliant colors
- **Consistency**: Cohesive color family across all categories

### Scandinavian Color Palette

**Primary Colors** (Core Brand):
```css
--scandi-blue: #5B9BD5        /* Main brand color */
--scandi-green: #5AAD5A       /* Natural green */
--scandi-amber: #F4A261       /* Warm gold */
--scandi-teal: #2D9DA8        /* Writing/Spelling mode */
--scandi-red: #EF4444         /* Accents */
--scandi-grey: #F5F7FA        /* Background */
```

**Category Colors** (Must use these specific colors):
```css
--dusty-rose: #D4A5A5         /* Begroetingen - soft pink */
--steel-blue: #6B8CAE         /* Reizen - steel blue */
--lavender-grey: #9FA8BC      /* Katten - lavender grey */
--coral: #E89E8D              /* August - soft coral */
--clay: #C9826B               /* Winkelen & Eten - terracotta */
```

**Category Assignments**:
```javascript
greetings:    'dusty-rose'    // Soft, welcoming
daily:        'amber'         // Warm, everyday
work:         'blue'          // Professional, reliable
travel:       'steel-blue'    // Adventure, movement
conversation: 'green'         // Natural, growth
cats:         'lavender-grey' // Mysterious, soft
august:       'coral'         // Summer warmth
shopping:     'clay'          // Kitchen, hygge
```

### Design Rules (MUST FOLLOW)

1. **Never use vibrant/neon colors** (#9333EA, #EC4899, #6366F1)
   - ❌ Purple, hot pink, bright indigo
   - ✅ Lavender-grey, dusty rose, steel blue

2. **Color saturation must be < 60%**
   - All colors should feel "muted" or "dusty"
   - Grey undertones required

3. **When adding new categories**:
   - Consult UI Designer agent FIRST
   - Choose from existing Scandinavian palette
   - Never introduce new bright colors
   - Consider: What natural material/feeling does this represent?

4. **Color accessibility**:
   - All category colors are WCAG AA compliant on white backgrounds
   - Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text

5. **Scandinavian associations**:
   - Clay/Terracotta → Kitchen, ceramics, warmth
   - Lavender-grey → Nordic mist, soft nature
   - Coral → Summer sunset, warmth without brightness
   - Dusty rose → Soft textiles, hygge
   - Steel blue → Scandinavian sky, professional

### Common Mistakes to Avoid

❌ **Wrong**: Adding `purple: #9333EA` (vibrant, not Scandinavian)
✅ **Right**: Using `lavender-grey: #9FA8BC` (muted, Nordic)

❌ **Wrong**: `color: 'pink'` without checking if it's dusty rose
✅ **Right**: `color: 'dusty-rose'` with CSS variable

❌ **Wrong**: Choosing colors based on brightness/pop
✅ **Right**: Choosing colors based on natural materials and Nordic aesthetics

### How to Add a New Category Color

1. **Consult UI Designer agent**:
   ```
   "I need a color for [category] that fits Scandinavian design"
   ```

2. **Check criteria**:
   - Is it a natural material/element?
   - Does it have grey/blue undertones?
   - Is saturation < 60%?
   - WCAG AA compliant?

3. **Add to CSS**:
   ```css
   :root {
       --new-color: #XXXXXX;  /* Description */
   }
   ```

4. **Update color maps** in:
   - `renderHome()` colors object
   - `renderCategorySelector()` colorMap
   - Any other color mapping logic

5. **Document** the color in this file

### Color Harmony Reference

The palette creates visual harmony through:
- **Temperature balance**: Mix of warm (coral, clay, amber) and cool (blue, lavender-grey, steel-blue)
- **Tonal consistency**: All colors at similar saturation levels
- **Natural progression**: Colors flow like Scandinavian landscape (sky → mist → earth → warmth)

**Visual spectrum**:
```
Cool ←→ Warm
Steel Blue → Lavender Grey → Dusty Rose → Coral → Clay → Amber
#6B8CAE      #9FA8BC          #D4A5A5        #E89E8D  #C9826B  #F4A261
```

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

**Categories**: 7 language topic areas
```javascript
categories = {
    greetings: { icon, name, color, phrases[] },    // 30 phrases
    daily: { ... },                                 // 30 phrases
    work: { ... },                                  // 30 phrases
    travel: { ... },                                // 30 phrases
    conversation: { ... },                          // 30 phrases
    cats: { ... },                                  // 30 phrases
    august: { ... }                                 // 40 phrases
}
```

**Phrases**: 212 total (30 per category, 40 for August)
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

**CRITICAL: Always update ALL three version numbers together!**

1. Update version in `index.html`:
```javascript
const APP_VERSION = '1.6.5'
const RELEASE_NOTES = {
    '1.6.5': {
        date: '2025-11-20',
        features: [
            'Feature description',
            'Bug fix description'
        ]
    },
    // ... previous versions
}
```

2. Update version in `sw.js`:
```javascript
const CACHE_VERSION = '1.6.5';
```

3. Update version in `package.json`:
```json
"version": "1.6.5"
```

4. **COMMIT AND PUSH to GitHub Pages**:
```bash
git add index.html sw.js package.json
git commit -m "Version 1.6.5: Description"
git push origin main
```

5. Wait 2-3 minutes for GitHub Pages deployment

6. Users will see update notification automatically (checks every 60 seconds)

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

- **v1.8.0** (2025-11-20): MEGA UPDATE - All categories expanded to 30 phrases (+131 new phrases)
- **v1.7.0** (2025-11-20): Difficulty filter, winter phrases, icon & error handling fixes
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

### Current Deployment: GitHub Pages

**Live URL**: https://mdubbelm.github.io/zweedsapp
**Repository**: https://github.com/mdubbelm/zweedsapp

**Deployment Process:**
1. Make changes locally
2. Update version numbers (index.html, sw.js, package.json)
3. Commit changes: `git commit -m "Version X.X.X: Description"`
4. Push to main: `git push origin main`
5. GitHub Pages auto-deploys in 2-3 minutes
6. Users get auto-update notification within 60 seconds

**Monitoring Deployment:**
- Check deployment status: https://github.com/mdubbelm/zweedsapp/actions
- Green checkmark = deployed successfully
- GitHub Pages serves from main branch automatically

### Requirements
1. Static file hosting with HTTPS (✅ GitHub Pages configured)
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

-- Analytics Events Table (v1.10.2+)
CREATE TABLE analytics_events (
    id bigserial primary key,
    user_id uuid references auth.users not null,
    event_name text not null,
    properties jsonb default '{}'::jsonb,
    created_at timestamp with time zone default now()
);

-- Index for fast querying by user and event type
CREATE INDEX idx_analytics_user_id ON analytics_events(user_id);
CREATE INDEX idx_analytics_event_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_created_at ON analytics_events(created_at DESC);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Users can insert their own events
CREATE POLICY "Users can insert own analytics"
    ON analytics_events FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can view their own analytics (for debugging/insights)
CREATE POLICY "Users can view own analytics"
    ON analytics_events FOR SELECT
    USING (auth.uid() = user_id);

-- Note: Admins/developers need direct database access or service role key
-- to query cross-user analytics for learning outcomes analysis
```

**Analytics Events Tracked:**
- `user_signup` - New user registration
- `phrase_completed_first_time` - First completion of specific phrase
- `phrase_practiced` - Repeated practice of completed phrase
- `badge_earned` - Achievement unlocked
- `flashcards_opened`, `writing_mode_opened`, `grammar_opened` - Feature discovery
- `badges_viewed`, `leaderboard_viewed`, `settings_opened` - Navigation tracking

**Properties Captured:**
- User context: `user_level`, `total_points`, `streak`
- Learning metrics: `difficulty`, `is_perfect`, `practice_count`, `category`
- Feature usage: `from_tab`, `badge_id`, `is_first_phrase_ever`

**Querying Analytics (Supabase Dashboard or Service Role):**
```sql
-- Most popular features (last 7 days)
SELECT event_name, COUNT(*) as usage
FROM analytics_events
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY event_name
ORDER BY usage DESC;

-- User retention: D1, D7, D30
SELECT
    DATE(created_at) as signup_date,
    COUNT(DISTINCT CASE WHEN created_at <= signup_date + INTERVAL '1 day' THEN user_id END) as d1_retained,
    COUNT(DISTINCT CASE WHEN created_at <= signup_date + INTERVAL '7 days' THEN user_id END) as d7_retained
FROM analytics_events
WHERE event_name = 'user_signup'
GROUP BY signup_date;

-- Learning outcomes: phrases by difficulty
SELECT
    properties->>'difficulty' as difficulty,
    COUNT(*) as completions,
    AVG((properties->>'is_perfect')::boolean::int) as perfect_rate
FROM analytics_events
WHERE event_name = 'phrase_completed_first_time'
GROUP BY difficulty;
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
