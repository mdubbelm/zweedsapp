---
description: Sluit de huidige sessie af en sla de status op
---

# End Session - Svenska Kat Project

Sluit de sessie professioneel af en sla alle voortgang op.

## Instructies

1. **Analyseer de huidige conversatie** en bepaal:
   - Welke files zijn gewijzigd?
   - Welke taken zijn afgerond?
   - Wat staat er nog open?
   - Zijn er nieuwe issues/blockers ontdekt?

2. **Update `.session-status.json`** met:
   ```json
   {
     "timestamp": "2025-11-23T10:30:00Z",
     "sessionVersion": "v1.X.X",
     "summary": "Korte samenvatting van wat er is gedaan",
     "filesModified": ["file1.html", "file2.js"],
     "completedTasks": [
       "✅ Taak 1",
       "✅ Taak 2"
     ],
     "pendingTasks": [
       "⏳ Taak 3 (in progress)",
       "📋 Taak 4 (nog te doen)"
     ],
     "nextSteps": [
       "Volgende stap 1",
       "Volgende stap 2"
     ],
     "blockers": [
       "Eventuele blocker"
     ],
     "notes": "Belangrijke notities voor volgende sessie"
   }
   ```

3. **Geef een samenvatting** aan de gebruiker:
   - ✅ Wat er is bereikt
   - 📊 Statistieken (als relevant)
   - 🎯 Volgende prioriteiten
   - 💡 Tips voor volgende sessie

4. **Commit advies** (indien van toepassing):
   - Als er uncommitted changes zijn, vraag of er een commit gemaakt moet worden
   - Suggereer commit message format: "Version X.X.X: Description"

5. **Afsluitende vraag:**
   - "Is er nog iets wat je wilt documenteren voor de volgende sessie?"

## Tone
- Positief en opbouwend
- Geef gevoel van vooruitgang
- Eindig met duidelijke volgende stappen
- Bedank voor de samenwerking

## Format voorbeeld
```
## Sessie Samenvatting 🎯

### ✅ Afgerond
- Feature X geïmplementeerd
- 3 bugs gefixed
- Tests geslaagd

### 📊 Status
- Files gewijzigd: 2
- Commits: 1
- Open issues: 5

### 🎯 Volgende Sessie
1. Deploy naar GitHub Pages
2. Test op iOS
3. Fix accessibility issues

De status is opgeslagen in `.session-status.json` voor de volgende keer.
Type `/start-session` bij je volgende sessie voor een volledig overzicht! 🚀

Nog iets wat je wilt toevoegen aan de notities?
```

## Belangrijk
- Wees compleet maar beknopt
- Focus op vooruitgang (positief)
- Geef duidelijke next steps
- Sla ALTIJD `.session-status.json` op
