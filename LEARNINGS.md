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

**Probleem**: `webkitSpeechRecognition` bestaat niet in iOS Safari (Apple beperking).

**Oplossing**: Geen client-side oplossing mogelijk. Alternatieven:
1. Server-side speech recognition (Whisper API) - te duur
2. Alleen TTS gebruiken (Web Speech Synthesis) - werkt wel
3. Accepteren als platform limitatie

**Waarom**: Apple blokkeert Web Speech Recognition API op iOS om privacy redenen. Dit is een platform-level beslissing.

**Tags**: #browser-quirks #ios #safari #speech-api #limitation

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

---

**Laatste update**: November 2025
