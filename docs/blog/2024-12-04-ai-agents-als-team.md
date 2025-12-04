# AI agents als virtueel team: hoe ik samen met Claude mijn app ontwikkel

*4 december 2024*

Vandaag had ik een bijzondere ontwikkelsessie. Niet alleen programmeren, maar een complete productcyclus doorlopen - van onderzoek tot implementatie - met behulp van AI agents die elk hun eigen expertise inbrengen.

## De situatie

De ZweedsApp is een taal-leerapp die ik aan het bouwen ben. Na maanden van feature-toevoegingen was de app te complex geworden. Te veel klikken, te veel keuzes. Tijd om terug naar de basis te gaan.

Maar waar begin je? En hoe zorg je dat je niet zomaar wat verandert, maar onderbouwde beslissingen neemt?

## Het team

Ik werk met Claude Code en heb een "team" van AI agents geconfigureerd. Elke agent heeft een eigen persoonlijkheid, expertise en werkwijze:

| Agent | Naam | Expertise |
|-------|------|-----------|
| Product Owner | Tessa | Prioritering, scope, impact/effort analyse |
| UX Designer | Veerle | User flows, wireframes, Hick's Law |
| Frontend Developer | Anneke | JavaScript, PWA, implementatie |
| Zweedstalige Eindredacteur | Vanya | Content audit, vertalingen |

Deze agents zijn geen losse tools. Ze zijn gedocumenteerd in markdown bestanden met hun werkwijze, frameworks en output formats. Als ik een agent "inschakel", laadt Claude dat bestand en neemt die rol aan.

## De sessie: van vraag tot feature

### Stap 1: De vraag stellen

Ik begon simpel:
> "Issue #40 - 'Alle categorieën' optie. Is die nog relevant met de nieuwe dagelijkse oefeningen?"

In plaats van direct te antwoorden, vroeg Claude: **"Wie van de agents kan dat beoordelen?"**

Dat dwong mij om na te denken. Dit is geen technische vraag, maar een productvraag. Dus: **Tessa (PO)**.

### Stap 2: Tessa doet impact/effort analyse

Tessa analyseerde Issue #40 met haar framework:

```
IMPACT SCORE: 3/10 (met Daily Program erbij)
EFFORT SCORE: 3/5
PRIORITY SCORE: 2.0 → Backlog
```

Haar conclusie: "Daily Program lost 80% van de behoefte op. Defer naar M4."

**Mijn rol**: Ik hoefde alleen "ok" te zeggen. De onderbouwing was helder.

### Stap 3: Onderzoek doen (Issue #58)

Tessa had al geprioriteerd: eerst Issue #58 - "Onderzoek Duolingo leerfunctionaliteit".

Claude deed web research, las artikelen over Duolingo's UX, en vatte samen:

- **Duolingo flow**: 2 klikken tot start
- **Onze flow**: 4 klikken tot start
- **Kernprincipe**: "App kiest, gebruiker doet"

### Stap 4: Scope bepalen

Weer de vraag: **"Wie bepaalt de scope?"**

Terug naar Tessa. Ze presenteerde 4 opties met scores:

| Optie | Score |
|-------|-------|
| A: Verwijder categoriekeuze | 7.0 🔴 |
| B: Voeg streak toe | 4.0 🟠 |
| C: Lineair pad | 3.2 🟠 |
| D: Verwijder exercise keuze | 5.0 🟠 |

**Mijn keuze**: "Focus op A" - hoogste score, laagste effort.

### Stap 5: UX ontwerp

Nu **Veerle (UX Designer)**. Ze ontwierp de nieuwe flow:

```
[Home]
└─ Tap "Dagelijkse Oefening"
   └─ → [Daily Screen]
      └─ Shows: "5 zinnen uit mix van categorieën"
         └─ Tap "Start"
            └─ → [Practice]
```

Plus een wireframe met category preview en START knop.

**Mijn feedback**: "Geen modals toch?"

Veerle paste direct aan. De "Bekijk alle items" link verdween.

### Stap 6: Implementatie

Tot slot **Anneke (Frontend Developer)**. Ze:
1. Maakte een nieuwe `DailyView.js`
2. Voegde de DAILY tab toe
3. Implementeerde `startDailyFromBeginning()`
4. Paste de HomeView aan

Build + tests: ✅

## Wat ik leerde

### 1. Agents dwingen proces af

Door te vragen "wie kan dit beoordelen?" voorkom je dat je direct in de code duikt. Eerst denken, dan doen.

### 2. Frameworks maken beslissingen traceerbaar

Tessa's Impact/Effort score is niet magisch, maar het dwingt je om na te denken over *waarom* je iets doet. "Score 7.0" is beter dan "voelt goed".

### 3. De opdrachtgever blijft de opdrachtgever

Ik zeg "ok" of "nee". De agents adviseren, ik beslis. Dat voelt goed.

### 4. Context wisselen kost geen tijd

In een menselijk team zou je een meeting moeten plannen om van PO naar UX naar Dev te gaan. Hier is het een kwestie van "laad het volgende bestand".

## De resultaten

In één sessie:
- Issue #40 → M4 (deferred)
- Issue #58 → gesloten (onderzoek compleet)
- Issue #83 → aangemaakt + geïmplementeerd
- Issue #38 → content audit compleet (250 zinnen gecheckt, 11 correcties)
- M1: Clarity → gesloten

En een blogpost geschreven door de agents zelf.

## Hoe je dit zelf kunt opzetten

1. **Definieer je agents** in markdown bestanden met:
   - Naam en persoonlijkheid
   - Expertise en werkwijze
   - Frameworks en templates
   - Output format

2. **Laad de juiste agent** voor de taak:
   - Productvragen → PO
   - UX vragen → UX Designer
   - Technische vragen → Developer

3. **Blijf de beslisser**. AI adviseert, jij beslist.

4. **Documenteer alles**. Issues, commits, learnings. Niet alleen voor de AI, maar voor jezelf over 3 maanden.

---

*Dit artikel is geschreven tijdens een ontwikkelsessie met Claude Code en de agents Tessa, Veerle, Vanya en Anneke.*
