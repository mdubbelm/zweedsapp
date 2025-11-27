# Svenska Kat - Design Quick Reference

**Version:** 1.10.1
**Last Updated:** 2025-11-23

---

## Scandinavian Color Palette 🎨

### Primary Colors
```
Blue:   #5B9BD5  ⬛  Primary actions, navigation, brand
Green:  #5AAD5A  ⬛  Success, correct answers
Amber:  #F4A261  ⬛  Warnings, difficulty badges
Teal:   #2D9DA8  ⬛  Writing/Spelling mode
Red:    #EF4444  ⬛  Errors, incorrect answers
Grey:   #F5F7FA  ⬛  Background, secondary UI
```

### Category Colors
```
Dusty Rose:     #D4A5A5  🌸  Begroetingen (soft, welcoming)
Steel Blue:     #6B8CAE  🌊  Reizen (adventure, sky)
Lavender Grey:  #9FA8BC  🌫️  Katten (Nordic mist)
Coral:          #E89E8D  🌅  August (summer warmth)
Clay:           #C9826B  🍂  Winkelen & Eten (kitchen hygge)
```

### Extended Palette (NEW)
```
Nordic Lavender: #B8AED4  💜  Grammar mode (muted purple)
Nordic Slate:    #8B95A8  ⬛  "All categories" indicator
```

---

## Typography Scale 📝

```
h1 (Mobile):   text-2xl (24px) font-bold
h1 (Desktop):  text-3xl (30px) font-bold

h2 (Mobile):   text-xl (20px) font-semibold
h2 (Desktop):  text-2xl (24px) font-semibold

h3:            text-lg (18px) font-semibold
Body:          text-base (16px) font-regular
Small:         text-sm (14px) font-regular
Tiny:          text-xs (12px) font-medium
```

**Font:** Inter (Google Fonts)
**Weights:** 400, 600, 700, 800

---

## Spacing System (8pt Grid) 📏

```
p-2:   8px   →  Tight spacing, icon gaps
p-3:  12px   →  Compact cards
p-4:  16px   →  Input padding, buttons ⭐ Most common
p-5:  20px   →  Standard cards
p-6:  24px   →  Modals, spacious sections
p-8:  32px   →  Page margins (desktop)
```

**Gaps:**
```
gap-2:  8px   →  Icon + text
gap-3: 12px   →  Button groups
gap-4: 16px   →  Card sections ⭐ Most common
gap-6: 24px   →  Page sections
```

---

## Border Radius 🔘

```
Buttons:      12px  →  rounded-xl
Cards:        16px  →  rounded-2xl
Modals:       20px  →  rounded-2xl (slightly more)
Input fields: 12px  →  rounded-xl
Pills/Badges: Full  →  rounded-full
```

---

## Component Patterns 🧩

### Primary Button
```html
<button class="w-full py-4 px-6 rounded-xl font-bold text-white card-hover card-shadow"
        style="background: var(--scandi-blue);">
    Button Text
</button>
```

### Secondary Button
```html
<button class="w-full py-4 px-6 glass-effect rounded-xl font-bold text-gray-700 card-hover card-shadow border-2 border-gray-300">
    Button Text
</button>
```

### Icon Button
```html
<button class="p-4 rounded-full card-hover"
        style="background: var(--scandi-blue);"
        aria-label="Play audio">
    <i class="fas fa-volume-up text-white text-xl"></i>
</button>
```

### Standard Card
```html
<div class="glass-effect rounded-2xl p-5 card-shadow">
    Card content
</div>
```

### Interactive Card
```html
<div class="glass-effect rounded-2xl p-5 card-shadow card-hover cursor-pointer">
    Card content
</div>
```

### Hero Card
```html
<div class="rounded-2xl p-5 card-shadow"
     style="background: var(--scandi-blue);">
    <p class="text-white font-bold text-2xl">Hero Content</p>
</div>
```

### Text Input
```html
<input type="text"
       class="w-full p-4 text-xl border-2 border-gray-300 rounded-xl focus:border-blue-500"
       placeholder="Type hier...">
```

### Badge (Small)
```html
<span class="text-xs text-white px-2 py-0.5 rounded-full"
      style="background: var(--scandi-amber);">
    Badge
</span>
```

---

## CSS Utility Classes 🎯

### Glass Effect
```css
.glass-effect {
    background: var(--scandi-white);
    border: 1px solid var(--scandi-grey-dark);
}
```

### Card Shadow
```css
.card-shadow {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
```

### Card Hover
```css
.card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.card-hover:active {
    transform: scale(0.98);
}
```

### Animations
```css
.animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
}

.animate-slideUp {
    animation: slideUp 0.4s ease-out;
}

.animate-bounce {
    animation: bounce 1s infinite;
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

---

## Icon Sizing 🎨

```
text-sm:  14px  →  Inline with small text
text-xl:  20px  →  Buttons, category badges ⭐ Most common
text-2xl: 24px  →  Headers, emphasis
text-4xl: 36px  →  Empty states
text-5xl: 48px  →  Badge icons
```

### Icon Colors
```
Primary:      text-blue-700
Success:      text-green-700
Warning:      text-amber-700 / text-amber-600
Error:        text-red-600
Muted:        text-gray-600
Fire/Streak:  text-red-600
Trophy:       text-yellow-700
```

**Font Awesome 6.4.0**
- All decorative icons: `aria-hidden="true"`
- Meaningful icons: paired with text labels

---

## Semantic Colors 🚦

### Success
```
Border:     border-green-500
Background: bg-green-50
Text:       text-green-800
Icon:       text-green-700
```

### Error
```
Border:     border-red-500
Background: bg-red-50
Text:       text-red-800
Icon:       text-red-600
```

### Info
```
Border:     border-blue-200
Background: bg-blue-50
Text:       text-blue-800
Icon:       text-blue-700
```

### Warning
```
Border:     border-yellow-400
Background: bg-yellow-50
Text:       text-yellow-800
Icon:       text-yellow-700
```

---

## Accessibility Checklist ♿

### Color Contrast (WCAG AA)
- [ ] Text on white ≥ 4.5:1 (normal text)
- [ ] Large text ≥ 3:1 (18pt+ or 14pt+ bold)
- [ ] Icons with text labels (not icon-only)
- [ ] Decorative icons: `aria-hidden="true"`

### Touch Targets
- [ ] Minimum 44x44px (iOS guideline)
- [ ] Navigation buttons: 64px tall ✅
- [ ] Primary buttons: 64px tall ✅
- [ ] Icon buttons: 56px+ ✅

### Keyboard Navigation
- [ ] Visible focus indicators (`:focus-visible`)
- [ ] Tab order logical
- [ ] Escape closes modals
- [ ] Enter activates buttons

### Responsive
- [ ] Mobile-first (320px+)
- [ ] Touch-friendly spacing
- [ ] Allow user zoom (no `user-scalable=no`)

---

## Design Principles 💡

### Minimalism
- Clean interfaces, no clutter
- Proper white space (16px+ between sections)
- Max 3 colors per screen
- One primary action per view

### Natural Colors
- Muted tones (saturation < 60%)
- Grey undertones required
- Earthy associations (clay, coral, stone)
- No neon/vibrant colors ❌

### Warmth (Hygge)
- Friendly copy (never condescending)
- Cat theme (playful but sophisticated)
- Encouragement over criticism
- Success celebrations

### Consistency
- Same radius across component types
- Same spacing system (8pt grid)
- Same animation timing (0.2s ease)
- Same color meanings (blue = primary)

---

## Common Mistakes ⚠️

### ❌ Don't
```css
background: #9333EA;              /* Vibrant purple */
color: purple;                    /* Unspecified Tailwind color */
padding: 15px;                    /* Not 8pt grid */
border-radius: 10px;              /* Inconsistent radius */
```

### ✅ Do
```css
background: var(--nordic-lavender);  /* Scandinavian purple */
color: var(--scandi-blue);           /* CSS variable */
padding: 16px;                       /* p-4 = 8pt grid */
border-radius: 12px;                 /* rounded-xl */
```

---

## Category Icon Reference 📚

```
Begroetingen:      fa-heart          (Dusty Rose)
Dagelijks:         fa-mug-hot        (Amber)
Werk:              fa-briefcase      (Blue)
Reizen:            fa-plane          (Steel Blue)
Praten:            fa-comments       (Green)
Katten:            fa-cat            (Lavender Grey)
August:            fa-hiking         (Coral)
Winkelen & Eten:   fa-utensils       (Clay)
Grammatica:        fa-book           (Nordic Lavender) 🆕
```

---

## Badge Icon Reference 🏆

```
firstSteps:      fa-shoe-prints      (Blue)
beginner:        fa-seedling         (Green)
intermediate:    fa-leaf             (Green)
expert:          fa-tree             (Green)
perfectionist:   fa-gem              (Blue)
dedicated:       fa-fire             (Red)
onFire:          fa-fire-flame-curved (Red)
unstoppable:     fa-bolt             (Amber)
categoryMaster:  fa-bullseye         (Blue)
allRounder:      fa-star             (Amber)
speedster:       fa-rocket           (Blue)
levelUp:         fa-chart-line       (Green)
master:          fa-trophy           (Amber)
```

---

## Responsive Breakpoints 📱

```css
/* Mobile First (default) */
320px+:  Base styles

/* Tablet */
640px+:  sm:  2-column grids
768px+:  md:  Increased font sizes

/* Desktop */
1024px+: lg:  3-column grids (max)
1280px+: xl:  Hover states active

Max-width:  2xl (672px) mobile, 4xl (896px) desktop
```

---

## Animation Timing ⏱️

```
Hover states:      150ms  (could add)
Transitions:       200ms  ⭐ Most common
FadeIn:            300ms
SlideUp/Down:      400ms
Page transitions:  500ms  (not used)

Easing:
- ease-out:    Entering elements
- ease-in:     Exiting elements
- ease:        State changes
```

---

## Testing Commands 🧪

### Visual Regression
```bash
# Compare before/after screenshots
open index.html
# Screenshot homepage, practice, flashcards, badges
```

### Contrast Testing
```javascript
// In browser console
const colors = {
  'scandi-blue': '#5B9BD5',
  'nordic-lavender': '#B8AED4',
  'nordic-slate': '#8B95A8'
};

// Test contrast ratios
// https://webaim.org/resources/contrastchecker/
```

### Accessibility
```bash
# macOS VoiceOver
Cmd + F5

# Keyboard navigation
Tab, Shift+Tab, Enter, Escape

# Zoom test
Cmd + (zoom in)
```

---

## Version History 📜

- **1.10.1**: Difficulty filter, daily program redesign
- **1.10.0**: Grammar mode, category selector
- **1.9.0**: Writing mode (teal color)
- **1.8.0**: All categories expanded to 30 phrases
- **1.7.0**: Difficulty filter, winter phrases
- **1.6.0**: Compact homepage, WCAG compliance
- **1.5.0**: Scandinavian design overhaul

---

## Related Files 📄

- `DESIGN_AUDIT.md` - Full design audit report
- `DESIGN_FIXES.md` - Critical fixes implementation guide
- `CLAUDE.md` - Developer documentation (design guidelines section)
- `ACCESSIBILITY_AUDIT.md` - Accessibility findings (if exists)

---

**Quick Tip:** When adding new features, always check this reference first to maintain design consistency! 🎨
