# Performance Audit: Svenska Kat v1.10.1

**Audited:** 2025-11-23  
**Live URL:** https://mdubbelm.github.io/zweedsapp  
**Architecture:** Single-file monolithic HTML app (281 KB)  
**Deployment:** GitHub Pages with Service Worker PWA

---

## Executive Summary

Svenska Kat is a Swedish language learning PWA with a **single-file architecture** containing 281 KB of HTML, inline JavaScript, and CSS. While the app provides good offline support and PWA features, there are **significant performance bottlenecks** related to:

1. **Full-page re-renders on every state change** (52+ `this.render()` calls)
2. **Large CDN dependencies** loaded on every page load
3. **No code splitting or lazy loading**
4. **Inefficient rendering pattern** (innerHTML replacement destroys and recreates DOM)

**Performance Score Estimate:** 60-75/100 (would need actual Lighthouse test)

---

## 1. Core Web Vitals Analysis

### LCP (Largest Contentful Paint) - Estimated: 2.5-3.5s ⚠️

**Current Issues:**
- **Blocking CDN resources:**
  - Tailwind CSS: ~70 KB (JIT compiler, runtime overhead)
  - Font Awesome: ~75-80 KB CSS + web fonts
  - Supabase SDK: ~200-250 KB (full client library)
  - Google Fonts (Inter): ~15-20 KB per weight (5 weights = 75-100 KB)

- **Total blocking resources:** ~420-500 KB before first paint
- **GitHub Pages cold start:** 200-500ms TTFB
- **No resource preloading** for critical assets

**Impact:** 
- Users on 3G: 3-5 seconds LCP
- Users on 4G: 1.5-2.5 seconds LCP  
- **Target: <2.5s** - Currently borderline/failing

**Root Cause:** Render-blocking CDN scripts in `<head>`

---

### FID (First Input Delay) - Estimated: 100-200ms ⚠️

**Current Issues:**
- **Large JavaScript bundle** (281 KB HTML file, ~150 KB is JavaScript)
- **Long tasks during initialization:**
  - Categories object with 8 categories × 30-40 phrases = ~220 phrase objects
  - Badge definitions, release notes, all loaded upfront
- **Full re-render pattern** creates blocking main thread work

**Blocking Operations:**
```javascript
// Every state change triggers FULL re-render:
this.render() {
    app.innerHTML = `...` // Destroys entire DOM
    setTimeout(() => this.attachEventListeners(), 0) // Re-attaches ALL listeners
}
```

**Impact:**
- First click/tap: 100-150ms delay (acceptable)
- During re-renders: 50-200ms delay (borderline)
- **Target: <100ms** - Likely failing during heavy operations

**Root Cause:** Synchronous innerHTML replacement + event listener re-attachment

---

### CLS (Cumulative Layout Shift) - Estimated: 0.05-0.15 ⚠️

**Current Issues:**
- **Web fonts loading** (Inter font, 5 weights):
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  ```
  - No `font-display: swap` fallback strategy
  - FOUT (Flash of Unstyled Text) likely on slow connections

- **Dynamic content injection** during render:
  - Update notifications slide down from top
  - Badge popups overlay content
  - Daily program modal

- **No image dimension reservations** (though app uses mostly icons)

**Impact:**
- Font swap: ~0.05-0.10 shift
- Notification animations: ~0.02-0.05 shift
- **Target: <0.1** - Borderline, depends on font loading

**Root Cause:** Unoptimized web font loading

---

### INP (Interaction to Next Paint) - Estimated: 150-300ms ⚠️

**Current Issues:**
- **52+ full re-render calls** throughout the codebase
- Each re-render:
  1. Generates ~50-200 KB of HTML string
  2. Destroys entire DOM tree
  3. Re-creates entire DOM tree
  4. Re-attaches all event listeners (via `setTimeout`)

**Example bottleneck:**
```javascript
// User clicks "Next phrase" button:
nextPhrase() {
    this.state.currentPhraseIndex++
    this.render() // ← Full page re-render for single phrase change!
}
```

**Impact:**
- Simple interactions: 50-100ms (acceptable)
- Complex renders (leaderboard, badges): 200-400ms (poor)
- **Target: <200ms** - Likely failing on complex views

**Root Cause:** No incremental rendering or virtual DOM

---

## 2. Loading Performance Analysis

### Initial Page Load - Estimated: 3-5s on 3G, 1.5-2.5s on 4G

**Waterfall (estimated):**

```
0ms     ─ DNS + TCP + TLS (GitHub Pages)
200ms   ─ TTFB (index.html 281 KB)
450ms   ─ index.html downloaded
550ms   ─ Tailwind CSS requested
680ms   ─ Tailwind CSS loaded (70 KB)
700ms   ─ Font Awesome requested
900ms   ─ Font Awesome loaded (80 KB)
920ms   ─ Supabase SDK requested
1400ms  ─ Supabase SDK loaded (250 KB)
1420ms  ─ Google Fonts requested
1620ms  ─ Google Fonts loaded (100 KB)
1700ms  ─ JavaScript execution starts
2000ms  ─ DOMContentLoaded
2200ms  ─ First Contentful Paint (FCP)
2500ms  ─ Largest Contentful Paint (LCP)
3000ms  ─ Time to Interactive (TTI)
```

**Bottlenecks:**
1. **Sequential resource loading** (no HTTP/2 multiplexing optimization)
2. **Render-blocking scripts** in `<head>`
3. **No critical CSS inlining**
4. **Large external dependencies** (~500 KB total)

---

### Time to Interactive (TTI) - Estimated: 2.5-3.5s

**Blocking factors:**
- Supabase SDK initialization
- Category data parsing (220+ phrase objects)
- Auth state check (async Supabase call)
- Service Worker registration + update check

**Code analysis:**
```javascript
// All categories loaded upfront (no lazy loading):
const categories = {
    greetings: { phrases: [30 objects] },
    daily: { phrases: [30 objects] },
    work: { phrases: [30 objects] },
    travel: { phrases: [30 objects] },
    conversation: { phrases: [30 objects] },
    cats: { phrases: [30 objects] },
    august: { phrases: [40 objects] },
    shopping: { phrases: [30 objects] }
}
```

**Impact:** 
- User sees blank screen for 1.5-2s
- Cannot interact for 2.5-3s
- **Target: <3.8s** - Likely passing, but not optimal

---

### TTFB (Time To First Byte) - Estimated: 150-500ms

**GitHub Pages Performance:**
- Cold start (no CDN cache): 300-500ms
- Warm CDN cache: 100-200ms
- Geographic latency: 50-150ms (Europe)

**Opportunities:**
- ✅ GitHub Pages uses CDN (Fastly)
- ✅ HTTPS/2 enabled
- ❌ No edge caching optimization (Cloudflare Workers, etc.)
- ❌ No server-side compression beyond default

---

## 3. Runtime Performance Analysis

### Rendering Performance - MAJOR BOTTLENECK 🚨

**Current Pattern:**
```javascript
// Every state change = full re-render
this.state.currentPhraseIndex++
this.render() // ← Destroys and recreates ENTIRE page
```

**Performance Impact:**
- **52+ render calls** throughout codebase
- Each render:
  - Generates 50-200 KB HTML string (template literal)
  - Executes `.innerHTML = ...` (destroys DOM tree)
  - Browser re-parses HTML
  - Browser re-creates DOM nodes
  - Re-flows layout
  - Re-paints pixels
  - `setTimeout` re-attaches event listeners

**Measured Operations (estimated):**
- `renderHome()`: ~80-120ms (generates ~150 KB HTML)
- `renderPractice()`: ~50-80ms (generates ~80 KB HTML)
- `renderFlashcards()`: ~50-80ms
- `renderLeaderboard()`: ~100-150ms (loops through all users)
- `renderBadges()`: ~60-100ms (14 badge cards)

**Memory Impact:**
- Constant DOM churn creates garbage collection pressure
- Event listeners recreated on every render (potential memory leaks if not cleaned up)
- No object pooling or reuse

---

### Array Iterations - 16+ `.map()` Calls

**Template rendering uses frequent array mapping:**
```javascript
renderHome() {
    return `
        ${Object.keys(categories).map(key => `
            <div>...</div> // Category card
        `).join('')}
        
        ${this.state.recentPhrases.map(phrase => `
            <div>...</div> // Recent phrase
        `).join('')}
    `
}
```

**Performance Notes:**
- `.map()` + `.join('')` is acceptable for small arrays (<100 items)
- Categories: 8 items (fast)
- Phrases: 30-40 per category (fast)
- Badges: 14 items (fast)
- Leaderboard: 10-50 users (acceptable)

**Not a bottleneck** currently, but could be if data scales.

---

### MediaRecorder API Performance - GOOD ✅

**Audio Recording Implementation:**
```javascript
// Efficient MIME type detection with fallbacks
const mimeType = MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4'
    : MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus'
    : 'audio/webm'
```

**Performance Characteristics:**
- ✅ Proper cleanup: `stream.getTracks().forEach(track => track.stop())`
- ✅ URL revocation: `URL.revokeObjectURL(audioURL)`
- ✅ iOS Safari compatibility handled
- ❌ No audio compression before storage (could grow localStorage)

---

### Text-to-Speech Performance - GOOD ✅

**Implementation:**
```javascript
const utterance = new SpeechSynthesisUtterance(phrase.swedish)
utterance.lang = 'sv-SE'
utterance.rate = 0.8
window.speechSynthesis.speak(utterance)
```

**Performance:** Native browser API, no blocking overhead.

---

## 4. Bundle Size Analysis

### Current File Sizes

| Resource | Size | Type | Cacheable |
|----------|------|------|-----------|
| **index.html** | 281 KB | Inline HTML+JS+CSS | Yes (SW) |
| Tailwind CSS (CDN) | ~70 KB | External CSS | Browser cache |
| Font Awesome (CDN) | ~80 KB | External CSS | Browser cache |
| Supabase SDK (CDN) | ~250 KB | External JS | Browser cache |
| Google Fonts (Inter) | ~100 KB | External Fonts | Browser cache |
| **TOTAL (First Load)** | **~781 KB** | - | - |
| **TOTAL (Repeat)** | **281 KB** | From SW cache | - |

### Code Breakdown (index.html)

**Estimated distribution:**
- JavaScript: ~150 KB (53%)
  - Categories data: ~30 KB
  - SwedishApp class: ~80 KB
  - Release notes: ~10 KB
  - Event handlers: ~30 KB
- CSS: ~40 KB (14%)
  - Scandinavian design variables
  - Animations
  - Custom styles
- HTML: ~91 KB (33%)
  - Meta tags, structure
  - Inline comments

### External Dependencies Analysis

#### 1. Tailwind CSS CDN (~70 KB) - MAJOR OVERHEAD 🚨

**Current Usage:**
```html
<script src="https://cdn.tailwindcss.com"></script>
```

**Problems:**
- **JIT compiler runs at runtime** (slow)
- **Entire Tailwind library loaded** (most unused)
- **Render-blocking script** in `<head>`
- **Cannot be cached by Service Worker** (external domain)

**Actual Usage:**
- Estimate: ~200-300 Tailwind classes used
- Compiled CSS size would be: ~15-20 KB (vs 70 KB runtime)

**Opportunity:** 
- **Switch to Tailwind CLI build process**
- Reduce bundle by ~50 KB (70 KB → 20 KB)
- Eliminate runtime overhead
- Enable Service Worker caching

---

#### 2. Font Awesome CDN (~80 KB) - MODERATE OVERHEAD ⚠️

**Current Usage:**
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

**Problems:**
- **Full Font Awesome library loaded** (7,000+ icons)
- **Render-blocking CSS**
- **External font files** (separate requests)

**Actual Usage:**
- Estimate: ~30-50 icons used (`fa-heart`, `fa-star`, `fa-book`, etc.)
- Subset size would be: ~10-15 KB

**Opportunity:**
- **Switch to Font Awesome subset** or SVG icons
- Reduce bundle by ~65 KB (80 KB → 15 KB)
- Inline critical icons as SVG

---

#### 3. Supabase SDK (~250 KB) - LARGEST DEPENDENCY 🚨

**Current Usage:**
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

**Problems:**
- **Full Supabase client** (includes Auth, Database, Realtime, Storage)
- **Render-blocking script**
- **Largest single dependency**

**Actual Usage:**
- Auth: ✅ (login, signup, session)
- Database: ✅ (user_progress table)
- Realtime: ❌ (not used)
- Storage: ❌ (not used)
- Functions: ❌ (not used)

**Opportunity:**
- **Tree-shake unused modules** (requires build process)
- Reduce bundle by ~100-150 KB (250 KB → 100 KB)
- Or: Use REST API directly (50 KB implementation)

---

#### 4. Google Fonts (~100 KB) - MODERATE OVERHEAD ⚠️

**Current Usage:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
```

**Problems:**
- **5 font weights loaded**
- **No `font-display` strategy** (causes FOUT/FOIT)
- **Render-blocking @import**

**Actual Usage:**
- 400 (regular): ✅ Body text
- 500 (medium): ✅ UI elements
- 600 (semi-bold): ✅ Headings
- 700 (bold): ✅ Titles
- 800 (extra-bold): ❓ Rarely used?

**Opportunity:**
- **Remove 800 weight** (-20 KB)
- **Self-host fonts** (better caching)
- **Add `font-display: swap`** (reduce CLS)
- Reduce by ~30 KB + improve CLS

---

### Bundle Size Recommendations

**Quick Wins (1-4 hours):**
- [ ] Remove Inter 800 weight: **-20 KB**
- [ ] Add `font-display: swap`: **-0 KB, improves CLS**
- [ ] Preload critical fonts: **improves LCP**

**Medium Effort (4-8 hours):**
- [ ] Replace Tailwind CDN with compiled CSS: **-50 KB**
- [ ] Replace Font Awesome with SVG subset: **-65 KB**
- [ ] Self-host Google Fonts: **-0 KB, improves caching**

**Long-term (8+ hours):**
- [ ] Replace Supabase SDK with REST API: **-150-200 KB**
- [ ] Code splitting (require build process): **-50-100 KB initial**
- [ ] Lazy load categories: **-30 KB initial**

**Total Potential Savings:** ~285-335 KB (781 KB → 450-500 KB)

---

## 5. Mobile Performance Analysis

### iOS Safari Specific

**Handled Well:**
- ✅ Audio MIME type detection
- ✅ Touch event optimization (`-webkit-tap-highlight-color: transparent`)
- ✅ Overflow scrolling (`-webkit-overflow-scrolling: touch`)
- ✅ PWA meta tags

**Issues:**
- ⚠️ Large JavaScript bundle on mobile networks (3G common in rural areas)
- ⚠️ Full re-renders on mobile CPU (slower than desktop)
- ⚠️ No lazy loading (all data loaded upfront)

### 3G Performance Estimate

**Network Profile (3G):**
- Download: 400 kbps (50 KB/s)
- Upload: 200 kbps
- Latency: 300-500ms

**Load Timeline:**
```
0ms     ─ Request index.html
500ms   ─ TTFB
6500ms  ─ index.html downloaded (281 KB @ 50 KB/s)
7000ms  ─ CDN resources start downloading
21000ms ─ All resources loaded (500 KB @ 50 KB/s)
22000ms ─ Time to Interactive
```

**Verdict:** 
- **22 seconds to interactive on 3G** 🚨
- **Target: <10s** - Currently failing badly

**Recommendations:**
- Critical: Reduce bundle size by 50%+
- Critical: Implement code splitting
- Critical: Lazy load non-critical features

---

### 4G Performance Estimate

**Network Profile (4G):**
- Download: 4 Mbps (500 KB/s)
- Latency: 100-200ms

**Load Timeline:**
```
0ms     ─ Request index.html
200ms   ─ TTFB
800ms   ─ index.html downloaded
1800ms  ─ All CDN resources loaded
2500ms  ─ Time to Interactive
```

**Verdict:**
- **2.5 seconds to interactive on 4G** ✅
- **Target: <3.8s** - Passing

---

## 6. Caching Strategy Analysis

### Service Worker - WELL IMPLEMENTED ✅

**Current Strategy:**
```javascript
// Network-first, fallback to cache
fetch(request)
    .then(response => {
        // Update cache with fresh content
        cache.put(request, response.clone())
        return response
    })
    .catch(() => caches.match(request)) // Fallback to cache
```

**Performance Characteristics:**
- ✅ Fresh content prioritized (good for PWA updates)
- ✅ Offline support (cached fallback)
- ✅ Version-based cache invalidation
- ✅ Auto-cleanup of old caches

**Opportunities:**
- ⚠️ **CDN resources not cached** (different origin)
- ⚠️ **Network-first** means slow on poor connections (could use stale-while-revalidate)

**Recommendation:**
```javascript
// For CDN resources: Cache-first (with revalidation)
if (event.request.url.includes('cdn.')) {
    return caches.match(event.request)
        .then(cached => cached || fetch(event.request))
}
```

---

### localStorage Usage - ACCEPTABLE ⚠️

**Current Usage:**
```javascript
localStorage.setItem('dailyProgram', JSON.stringify(program))
localStorage.setItem('lastSeenVersion', APP_VERSION)
localStorage.setItem('onboardingCompleted', 'true')
```

**Performance:**
- ✅ Synchronous (no async overhead for small data)
- ✅ Persists across sessions
- ⚠️ No size limit checking (could hit 5-10 MB quota)
- ⚠️ Audio URLs stored (could grow large)

**Recommendation:**
- Add quota checking
- Limit stored audio recordings
- Consider IndexedDB for larger data

---

### Supabase Data Sync - ASYNC, ACCEPTABLE ✅

**Pattern:**
```javascript
async saveUserData() {
    await supabase.from('user_progress').upsert({
        user_id: user.id,
        stats: this.state.stats,
        completed_phrases: this.state.completedPhrases
    })
}
```

**Performance:**
- ✅ Non-blocking (async)
- ✅ Debounced (not called on every render)
- ⚠️ No optimistic UI updates (user waits for server response)

---

## 7. Performance Bottleneck Summary

### CRITICAL Bottlenecks (Fix Immediately)

#### 1. Full-Page Re-renders 🚨🚨🚨

**Problem:**
```javascript
// 52+ times in codebase:
this.state.something = newValue
this.render() // ← Destroys and recreates ENTIRE page
```

**Impact:**
- 50-200ms blocking time per render
- Main thread blocked
- Poor FID/INP
- Memory churn

**Fix Priority:** **CRITICAL**  
**Estimated Effort:** 16-24 hours (requires architectural refactor)

**Solutions:**
1. **Virtual DOM library** (Preact, Vue, React - 3-10 KB)
2. **Incremental rendering** (update only changed DOM nodes)
3. **Web Components** (native, no library)

**Example with Preact (3 KB):**
```javascript
import { h, render } from 'preact'
import { useState } from 'preact/hooks'

function App() {
    const [phraseIndex, setPhraseIndex] = useState(0)
    
    return (
        <div>
            <Phrase index={phraseIndex} />
            <button onClick={() => setPhraseIndex(i => i + 1)}>Next</button>
        </div>
    )
}
```

---

#### 2. Tailwind CDN Runtime Overhead 🚨

**Problem:**
- 70 KB runtime JavaScript compiler
- Render-blocking
- Runs on every page load

**Impact:**
- +200-500ms LCP
- Blocking FCP
- Wasted bandwidth

**Fix Priority:** **HIGH**  
**Estimated Effort:** 2-4 hours

**Solution:**
```bash
# Install Tailwind CLI
npm install -D tailwindcss

# Generate static CSS
npx tailwindcss -i ./src/input.css -o ./dist/output.css --minify
```

**Benefit:** -50 KB, +300-500ms faster LCP

---

#### 3. Supabase SDK Bundle Size 🚨

**Problem:**
- 250 KB for full SDK
- Only using Auth + Database

**Impact:**
- +1-2s TTI on 3G
- Large initial download

**Fix Priority:** **MEDIUM**  
**Estimated Effort:** 8-12 hours

**Solutions:**
1. **Use REST API directly** (50 KB implementation)
2. **Tree-shake with bundler** (100-150 KB)

---

### HIGH Priority Bottlenecks

#### 4. Font Awesome Full Library ⚠️

**Fix:** Use subset or inline SVG icons  
**Effort:** 4-6 hours  
**Benefit:** -65 KB

#### 5. No Code Splitting ⚠️

**Fix:** Lazy load categories, modals  
**Effort:** 6-8 hours  
**Benefit:** -50-100 KB initial load

---

### MEDIUM Priority Bottlenecks

#### 6. Google Fonts Optimization ⚠️

**Fix:** Self-host, remove unused weights, add font-display  
**Effort:** 2-3 hours  
**Benefit:** -20 KB, improved CLS

#### 7. No Resource Preloading ⚠️

**Fix:** Add preload/prefetch hints  
**Effort:** 1 hour  
**Benefit:** +200-300ms faster LCP

---

## 8. Recommendations by Priority

### QUICK WINS (< 1 Day Effort)

**Total Expected Impact:** +10-15 Lighthouse points, -70 KB bundle

#### 1. Add Resource Hints (30 min)

```html
<head>
    <!-- Preconnect to CDNs -->
    <link rel="preconnect" href="https://cdn.tailwindcss.com">
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
    <link rel="preconnect" href="https://cdn.jsdelivr.net">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Preload critical resources -->
    <link rel="preload" href="https://cdn.tailwindcss.com" as="script">
</head>
```

**Expected:** +200-300ms LCP

---

#### 2. Optimize Google Fonts (1 hour)

```css
/* Before */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

/* After */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

**Changes:**
- Remove 800 weight (-20 KB)
- Add `&display=swap` to URL (reduces CLS)

**Expected:** -20 KB, CLS: 0.15 → 0.08

---

#### 3. Optimize Service Worker Caching (1 hour)

```javascript
// Cache CDN resources (different origin)
const CDN_CACHE = 'svenska-kat-cdn-v1'

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url)
    
    // Cache-first for CDN resources
    if (url.hostname.includes('cdn.') || url.hostname.includes('cdnjs.')) {
        event.respondWith(
            caches.open(CDN_CACHE).then(cache =>
                cache.match(event.request).then(cached => {
                    const fetchPromise = fetch(event.request).then(response => {
                        cache.put(event.request, response.clone())
                        return response
                    })
                    return cached || fetchPromise
                })
            )
        )
        return
    }
    
    // Network-first for app
    // ... existing code
})
```

**Expected:** Repeat visits: 3s TTI → 1s TTI

---

#### 4. Add Performance Monitoring (2 hours)

```javascript
// Add web-vitals library (1 KB)
import {getLCP, getFID, getCLS, getINP} from 'web-vitals'

function sendToAnalytics(metric) {
    // Log to console (or send to analytics)
    console.log(metric.name, metric.value)
    
    // Optional: Send to Supabase for monitoring
    supabase.from('performance_metrics').insert({
        metric: metric.name,
        value: metric.value,
        user_id: user?.id
    })
}

getLCP(sendToAnalytics)
getFID(sendToAnalytics)
getCLS(sendToAnalytics)
getINP(sendToAnalytics)
```

**Expected:** Visibility into real user metrics

---

### MEDIUM-TERM (1-4 Days Effort)

**Total Expected Impact:** +15-25 points, -165 KB bundle

#### 5. Replace Tailwind CDN with Build Process (4 hours)

**Steps:**
1. Install Tailwind CLI
2. Create `tailwind.config.js`
3. Extract classes from HTML
4. Build static CSS
5. Replace CDN with `<link rel="stylesheet" href="styles.css">`

**Expected:** -50 KB, +500ms LCP

---

#### 6. Replace Font Awesome with SVG Subset (6 hours)

**Steps:**
1. Audit icon usage (grep for `fa-*`)
2. Export used icons as SVG from Font Awesome
3. Create icon sprite or inline SVGs
4. Replace `<i class="fas fa-heart">` with `<svg>...</svg>`

**Expected:** -65 KB

---

#### 7. Implement Incremental Rendering (8 hours)

**Option A: Targeted Updates (No Library)**

```javascript
// Instead of full re-render:
updatePhraseDisplay(newIndex) {
    const phraseEl = document.getElementById('current-phrase')
    const phrase = this.getCurrentPhrase()
    
    phraseEl.querySelector('.swedish').textContent = phrase.swedish
    phraseEl.querySelector('.dutch').textContent = phrase.dutch
    // Only update changed elements
}

nextPhrase() {
    this.state.currentPhraseIndex++
    this.updatePhraseDisplay(this.state.currentPhraseIndex)
    // No full render!
}
```

**Expected:** FID: 150ms → 50ms, INP: 250ms → 100ms

---

**Option B: Adopt Preact (Recommended)**

- Bundle size: +3 KB
- Development time: Same as Option A
- Benefits: 
  - Automatic incremental updates
  - Better state management
  - Future-proof architecture
  - Hook-based patterns

---

#### 8. Self-host Google Fonts (3 hours)

**Steps:**
1. Download Inter WOFF2 files
2. Add to `/fonts/` directory
3. Update `@font-face` declarations
4. Add to Service Worker cache

**Expected:** -0 KB (same size), but better caching + control

---

### LONG-TERM (4+ Days Effort)

**Total Expected Impact:** +20-30 points, architectural improvements

#### 9. Replace Supabase SDK with REST API (12 hours)

**Custom implementation:**
```javascript
class SupabaseClient {
    constructor(url, key) {
        this.url = url
        this.key = key
    }
    
    async from(table) {
        return {
            select: (columns) => this.select(table, columns),
            upsert: (data) => this.upsert(table, data)
        }
    }
    
    async select(table, columns) {
        const response = await fetch(`${this.url}/rest/v1/${table}?select=${columns}`, {
            headers: { 'apikey': this.key, 'Authorization': `Bearer ${this.token}` }
        })
        return response.json()
    }
    
    // ... implement only needed methods
}
```

**Expected:** -150-200 KB

---

#### 10. Introduce Build Process + Code Splitting (16 hours)

**Architecture:**
```
src/
  components/
    Home.js          (lazy loaded)
    Practice.js      (lazy loaded)
    Flashcards.js    (lazy loaded)
  data/
    categories.js    (lazy loaded per category)
  App.js             (main app shell)
  
dist/
  index.html         (20 KB - shell only)
  app.js             (50 KB - core)
  home.js            (30 KB - lazy)
  practice.js        (40 KB - lazy)
  categories/
    greetings.js     (5 KB - lazy)
    daily.js         (5 KB - lazy)
```

**Benefits:**
- Initial load: 70 KB (vs 281 KB currently)
- Route-based splitting
- Category-based splitting
- Tree-shaking enabled

**Expected:** -211 KB initial, TTI: 3s → 1.5s

---

#### 11. Implement Virtual DOM (Preact Migration) (24 hours)

**Full refactor to component-based architecture:**

```javascript
// Before (current):
renderPractice() {
    return `<div>${phrase.swedish}</div>` // String template
}

// After (Preact):
function Practice({ phrase }) {
    return <div>{phrase.swedish}</div> // JSX component
}
```

**Benefits:**
- Automatic incremental rendering
- 50x faster re-renders
- Better state management
- Modern React patterns
- Easier testing

**Expected:** 
- INP: 250ms → 80ms
- FID: 150ms → 50ms
- Better memory management

---

## 9. Performance Budget (Proposed)

**Targets after optimization:**

| Metric | Current (Est.) | Target | Strategy |
|--------|----------------|--------|----------|
| **LCP** | 2.5-3.5s | <2.0s | Resource hints, Tailwind build, incremental rendering |
| **FID** | 100-200ms | <50ms | Incremental rendering, reduce JS execution |
| **CLS** | 0.05-0.15 | <0.05 | Font optimization, dimension reservations |
| **INP** | 150-300ms | <150ms | Incremental rendering, event delegation |
| **TTI** | 2.5-3.5s | <2.0s | Code splitting, lazy loading |
| **Bundle (Initial)** | 781 KB | <400 KB | Build process, tree-shaking |
| **Bundle (3G TTI)** | 22s | <8s | Critical: Bundle reduction |

---

## 10. Monitoring Setup

### Tools to Implement

#### 1. Lighthouse CI (Automated Testing)

```bash
npm install -g @lhci/cli

# .lighthouserc.js
module.exports = {
    ci: {
        collect: {
            url: ['https://mdubbelm.github.io/zweedsapp'],
            numberOfRuns: 3
        },
        assert: {
            assertions: {
                'largest-contentful-paint': ['error', {maxNumericValue: 2000}],
                'first-input-delay': ['error', {maxNumericValue: 100}],
                'cumulative-layout-shift': ['error', {maxNumericValue: 0.1}],
                'interactive': ['error', {maxNumericValue: 3000}]
            }
        }
    }
}
```

**Run in CI/CD:**
```bash
lhci autorun --config=.lighthouserc.js
```

---

#### 2. Real User Monitoring (RUM)

```javascript
// Add to index.html
import {getLCP, getFID, getCLS, getINP, getTTFB} from 'web-vitals'

function sendToAnalytics(metric) {
    // Option 1: Console (development)
    console.log(`[Performance] ${metric.name}:`, metric.value)
    
    // Option 2: Supabase (production)
    if (window.supabase && metric.value > 0) {
        supabase.from('performance_logs').insert({
            metric_name: metric.name,
            metric_value: metric.value,
            user_agent: navigator.userAgent,
            connection: navigator.connection?.effectiveType,
            timestamp: new Date().toISOString()
        })
    }
}

// Track all Core Web Vitals
getLCP(sendToAnalytics)
getFID(sendToAnalytics)
getCLS(sendToAnalytics)
getINP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

**Database Schema:**
```sql
CREATE TABLE performance_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_name TEXT NOT NULL,
    metric_value NUMERIC NOT NULL,
    user_agent TEXT,
    connection TEXT, -- '4g', '3g', etc.
    timestamp TIMESTAMPTZ DEFAULT now()
);

-- Index for queries
CREATE INDEX idx_performance_metric ON performance_logs(metric_name, timestamp DESC);
```

---

#### 3. Google Search Console (Free)

- Monitor Core Web Vitals for real users
- See performance across different URLs
- Identify slow pages
- Track improvements over time

**URL:** https://search.google.com/search-console

---

#### 4. WebPageTest (Manual Testing)

**Test Configuration:**
- Location: Amsterdam, Netherlands (closest to target users)
- Connection: 3G, 4G, Cable
- Browser: Chrome, Safari iOS
- Repeat Views: Yes (test caching)

**URL:** https://www.webpagetest.org/

**Focus Areas:**
- Waterfall chart (identify blocking resources)
- Filmstrip view (visual progress)
- Lighthouse scores
- Repeat view (cache effectiveness)

---

## 11. Action Plan

### Phase 1: Quick Wins (Week 1) - 1 day effort

**Goal:** +10-15 points, validate monitoring

- [ ] Add resource hints (preconnect, preload)
- [ ] Optimize Google Fonts (remove 800 weight, add display=swap)
- [ ] Improve Service Worker CDN caching
- [ ] Setup web-vitals monitoring
- [ ] Run baseline Lighthouse tests (mobile + desktop)
- [ ] Setup Google Search Console

**Expected Results:**
- LCP: 3s → 2.5s
- CLS: 0.12 → 0.08
- Bundle: -20 KB

---

### Phase 2: Build Process (Week 2) - 2-3 days effort

**Goal:** -115 KB bundle, +500ms LCP

- [ ] Setup Tailwind CLI build process
- [ ] Replace Tailwind CDN with static CSS
- [ ] Audit and export Font Awesome icons
- [ ] Replace Font Awesome CDN with SVG subset
- [ ] Self-host Google Fonts

**Expected Results:**
- LCP: 2.5s → 2.0s
- Bundle: 781 KB → 666 KB (-115 KB)
- Repeat visits: 1s TTI (all cached)

---

### Phase 3: Rendering Optimization (Week 3-4) - 5-8 days effort

**Goal:** Fix critical rendering bottleneck

**Option A: Incremental Updates (No Library)**
- [ ] Identify high-frequency render calls
- [ ] Implement targeted DOM updates for practice mode
- [ ] Implement targeted updates for flashcard flips
- [ ] Remove unnecessary `this.render()` calls

**Option B: Preact Migration (Recommended)**
- [ ] Setup Preact build process
- [ ] Convert main App shell to Preact
- [ ] Convert Home component
- [ ] Convert Practice component
- [ ] Convert Flashcards component
- [ ] Convert remaining components
- [ ] Test all functionality

**Expected Results:**
- FID: 150ms → 50ms
- INP: 250ms → 100ms
- Frame rate: 30fps → 60fps
- Bundle: +3 KB (Preact), but better performance

---

### Phase 4: Code Splitting (Week 5) - 3-4 days effort

**Goal:** Reduce initial bundle by 50%

- [ ] Setup Webpack/Rollup bundler
- [ ] Implement route-based code splitting
- [ ] Lazy load category data
- [ ] Lazy load badge/leaderboard components
- [ ] Update Service Worker to cache lazy chunks

**Expected Results:**
- Initial bundle: 666 KB → 300-350 KB
- TTI (3G): 22s → 10s
- TTI (4G): 2.5s → 1.5s

---

### Phase 5: Advanced Optimizations (Week 6+) - Optional

**Goal:** Further refinements

- [ ] Evaluate Supabase SDK replacement with REST API
- [ ] Implement image optimization (if images added later)
- [ ] Add service worker background sync for offline saves
- [ ] Implement request batching for Supabase calls
- [ ] A/B test performance improvements

---

## 12. Success Metrics

**Track these weekly after each phase:**

| Metric | Baseline | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Target |
|--------|----------|---------|---------|---------|---------|--------|
| Lighthouse Score | 60-70 | 70-75 | 75-80 | 85-90 | 90-95 | 90+ |
| LCP (4G) | 2.8s | 2.5s | 2.0s | 1.8s | 1.5s | <2.0s |
| FID | 120ms | 110ms | 100ms | 50ms | 40ms | <100ms |
| CLS | 0.12 | 0.08 | 0.06 | 0.05 | 0.03 | <0.1 |
| INP | 220ms | 200ms | 180ms | 100ms | 80ms | <200ms |
| TTI (4G) | 2.8s | 2.5s | 2.0s | 1.8s | 1.5s | <3.8s |
| TTI (3G) | 22s | 20s | 15s | 12s | 8s | <10s |
| Bundle (initial) | 781 KB | 761 KB | 646 KB | 649 KB | 350 KB | <400 KB |

---

## 13. Conclusion

Svenska Kat has **solid PWA fundamentals** (Service Worker, offline support, caching) but suffers from **significant performance bottlenecks** related to its monolithic architecture:

### Critical Issues:
1. **Full-page re-renders** - 52+ times, blocking main thread
2. **Large CDN dependencies** - 500 KB external resources
3. **No code splitting** - 281 KB monolithic file
4. **Runtime overhead** - Tailwind JIT compiler

### Biggest Opportunities:
1. **Incremental rendering** (Preact migration) - **+40-50 Lighthouse points**
2. **Build process** (Tailwind/Font Awesome) - **-115 KB**
3. **Code splitting** - **-300 KB initial load**

### Recommended Approach:
1. **Phase 1 (Quick Wins)** - Low risk, immediate gains
2. **Phase 2 (Build Process)** - Moderate effort, high impact
3. **Phase 3 (Preact Migration)** - High effort, critical for long-term scalability

**Total Investment:** 2-4 weeks  
**Expected Result:** 60-70 → 90+ Lighthouse score, 3s → 1.5s TTI

The app is currently **functional but not optimal**. With focused optimization, it can become a **lightning-fast PWA** that delights users even on slow connections.

---

**Next Steps:**
1. Run actual Lighthouse audit to validate estimates
2. Setup monitoring (web-vitals, Search Console)
3. Prioritize Phase 1 quick wins
4. Decide on Phase 3: Incremental updates vs. Preact migration

