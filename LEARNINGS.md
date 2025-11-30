# LEARNINGS.md - Svenska Kat

Dit bestand documenteert learnings, opgeloste problemen en belangrijke beslissingen voor Svenska Kat.

---

## Learnings

### [2025-11] Vite base path voor GitHub Pages

**Context**: Na migratie naar Vite werden assets niet geladen op GitHub Pages.

**Probleem**: Vite genereert absolute paths (`/assets/...`) maar GitHub Pages serveert vanuit subdirectory (`/zweedsapp/`).

**Oplossing**:
```javascript
// vite.config.js
export default defineConfig({
  base: '/zweedsapp/',
  // ...
})
```

**Waarom**: GitHub Pages serveert repos als subdirectories van `username.github.io`. De `base` config zorgt dat alle asset URLs worden geprefixed met de subdirectory.

**Tags**: #deployment #vite #github-pages

---

### [2025-11] MediaRecorder MIME type per browser

**Context**: Audio opname werkte niet consistent across browsers.

**Probleem**: Safari ondersteunt `audio/webm` niet, Chrome ondersteunt `audio/mp4` niet altijd.

**Oplossing**:
```javascript
const mimeType = MediaRecorder.isTypeSupported('audio/mp4')
  ? 'audio/mp4'
  : 'audio/webm';

mediaRecorder = new MediaRecorder(stream, { mimeType });
```

**Waarom**: Browsers hebben verschillende codec support. Feature detection is betrouwbaarder dan user-agent sniffing.

**Tags**: #browser-quirks #audio #mediarecorder #safari

---

### [2025-11] Speech Recognition niet beschikbaar op iOS Safari

**Context**: Wilde speech-to-text toevoegen voor uitspraak feedback.

**Probleem**: iOS Safari **exposeert** `webkitSpeechRecognition` in de window, maar Apple **blokkeert** het daadwerkelijk gebruiken. Feature detection (`'webkitSpeechRecognition' in window`) retourneert `true`, maar de API werkt niet.

**Fout**: Alleen checken of API bestaat:
```javascript
// Dit werkt NIET op iOS - retourneert true maar API is geblokkeerd
if (hasSpeechRecognition()) { ... }
```

**Oplossing**: Altijd iOS detecteren en blokkeren, ongeacht feature detection:
```javascript
const onIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
              (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

// iOS: ALTIJD fallback tonen, negeer feature detection
if (onIOS) {
    return showFallbackMessage();
}
```

**Waarom**: Apple blokkeert Web Speech Recognition API op iOS om privacy redenen. De API object bestaat wel in de browser, maar throws errors bij gebruik.

**Tags**: #browser-quirks #ios #safari #speech-api #limitation #feature-detection

---

### [2025-11] Supabase environment variables in Vite

**Context**: Na Vite migratie werkten Supabase calls niet meer.

**Probleem**: `process.env.SUPABASE_URL` is undefined in Vite.

**Oplossing**:
```javascript
// .env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx

// supabase.js
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

**Waarom**: Vite gebruikt `import.meta.env` ipv `process.env`. Alleen variabelen met `VITE_` prefix worden exposed naar client code (security).

**Tags**: #vite #supabase #environment-variables

---

### [2025-11] GitHub Actions secrets voor build

**Context**: CI build faalde na toevoegen van environment variables.

**Probleem**: Supabase env vars waren niet beschikbaar in GitHub Actions.

**Oplossing**:
```yaml
# .github/workflows/deploy.yml
- name: Build
  run: npm run build
  env:
    VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
    VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
```

Plus secrets toevoegen via: `gh secret set VITE_SUPABASE_URL`

**Waarom**: GitHub Actions heeft geen toegang tot lokale .env bestanden. Secrets moeten expliciet worden doorgegeven aan de build step.

**Tags**: #github-actions #ci-cd #secrets #deployment

---

### [2025-11] Legacy index.html conflicteert met Vite build

**Context**: Na deployment toonde de app nog steeds de oude versie.

**Probleem**: Root `index.html` (legacy single-file app) werd geserveerd ipv `dist/index.html`.

**Oplossing**:
1. Verwijder legacy `index.html` uit root
2. Configureer GitHub Pages om `dist/` folder te deployen via Actions workflow

**Waarom**: GitHub Pages serveert standaard vanuit root. Als daar een index.html staat, wordt die gebruikt ongeacht de Actions output.

**Tags**: #deployment #github-pages #migration

---

### [2025-11-30] ALTIJD feature branch + lokaal testen voor push

**Context**: Streak kalender feature direct naar main gepusht zonder review of lokaal testen.

**Probleem**:
- Feature direct op main = geen review mogelijk
- Geen lokaal testen = bugs in productie
- UX/UI feedback achteraf = rework nodig
- Dit is HERHAALDELIJK fout gegaan

**Correcte workflow**:
```bash
# 1. ALTIJD feature branch
git checkout -b feat/feature-naam

# 2. Bouw de feature
# ...

# 3. LOKAAL TESTEN (npm run dev)
npm run dev
# Open browser, test handmatig!

# 4. Vraag UX/UI feedback VOORDAT je klaar bent

# 5. Lint + test + build
npm run lint && npm run test && npm run build

# 6. Commit naar feature branch
git add . && git commit -m "feat: ..."

# 7. Push feature branch
git push -u origin feat/feature-naam

# 8. Maak PR voor review
gh pr create

# 9. PAS NA GOEDKEURING merge naar main
```

**Waarom**:
- Feature branches maken review mogelijk
- Lokaal testen vangt bugs voor productie
- UX/UI feedback vooraf voorkomt rework
- PRs documenteren changes en rationale

**Tags**: #workflow #git #discipline #herhaling

---

## Index per Tag

### Browser Quirks
- MediaRecorder MIME type per browser
- Speech Recognition niet beschikbaar op iOS Safari

### Deployment
- Vite base path voor GitHub Pages
- GitHub Actions secrets voor build
- Legacy index.html conflicteert met Vite build

### Vite
- Vite base path voor GitHub Pages
- Supabase environment variables in Vite

### Supabase
- Supabase environment variables in Vite

### CI/CD
- GitHub Actions secrets voor build

### Workflow
- ALTIJD feature branch + lokaal testen voor push

---

**Laatste update**: November 2025
