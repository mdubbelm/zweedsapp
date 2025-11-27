# Svenska Kat - Roadmap Analyse door Tessa (Product Owner)

*Datum: 27 november 2025*

---

## 1. Team Samenstelling Review

### Huidig Team (12 agents)

| Rol | Agent | Nodig? | Notitie |
|-----|-------|--------|---------|
| Product Owner | Tessa | ✅ Ja | Strategische beslissingen |
| Scrum Master | Sophie | ⚠️ Optioneel | Alleen bij team ceremonies |
| Agile Coach | Titia | ⚠️ Optioneel | User stories schrijven |
| Data Analyst | Connie | ✅ Ja | Analytics interpretatie |
| UX Researcher | Diewerke | ✅ Ja | User research nodig |
| UX Designer | Veerle | ✅ Ja | User flows, IA |
| UI Designer | Kehrana | ✅ Ja | Scandinavisch design |
| Accessibility Expert | Rian | ✅ Ja | WCAG compliance |
| Frontend Developer | Anneke | ✅ Ja | Vanilla JS expert |
| Performance Optimizer | Sabrina | ⚠️ Optioneel | Bij performance issues |
| Content Designer | Sarah | ✅ Ja | Microcopy, UX writing |
| Copywriter | Pauline | ⚠️ Optioneel | Marketing teksten |

### ❌ ONTBREKEND - Kritiek voor deze app:

| Rol | Agent | Waarom nodig? |
|-----|-------|---------------|
| **Zweedstalige Eindredacteur** | Vanya | 🔴 KRITIEK - Zweedse zinnen valideren! |
| **Pedagogy Expert** | *Niet beschikbaar* | 🟠 HOOG - Spaced repetition, learning paths |

### Aanbeveling: Team aanpassen

**Toevoegen:**
```bash
# Kritiek - zonder Vanya geen content validatie
ln -s ~/Projecten/_agents/content/zweedstalige-eindredacteur.md ~/Projecten/zweedsapp/.claude/agents/
```

**Verwijderen (optioneel, ter vereenvoudiging):**
- `scrum-master.md` - Solo project, geen ceremonies
- `agile-coach.md` - Overlap met Product Owner
- `copywriter.md` - Geen marketing focus nu
- `performance-optimizer.md` - Kan later toegevoegd worden

**Ideaal kernteam (8 agents):**
1. Tessa (Product Owner) - Prioritering
2. Connie (Data Analyst) - Metrics
3. Diewerke (UX Researcher) - Research
4. Veerle (UX Designer) - Flows
5. Kehrana (UI Designer) - Visual
6. Rian (Accessibility) - WCAG
7. Anneke (Frontend Dev) - Code
8. Vanya (Zweeds) - Content validatie

---

## 2. Issue Analyse & Prioritering

### Impact/Effort Matrix

| # | Issue | Impact | Effort | Score | Prioriteit |
|---|-------|--------|--------|-------|------------|
| 20 | Homepage cognitive load | 9/10 | 3/5 | **6.0** | 🔴 P0 |
| 23 | Shorten onboarding | 8/10 | 2/5 | **8.0** | 🔴 P0 |
| 35 | Replace modals | 8/10 | 3/5 | **5.3** | 🔴 P0 |
| 36 | Voltooid UX | 7/10 | 4/5 | **3.5** | 🟠 P1 |
| 29 | Guest Mode | 8/10 | 4/5 | **4.0** | 🟠 P1 |
| 15 | Progressive Learning | 9/10 | 5/5 | **3.6** | 🟠 P1 |
| 28 | Langzamere uitspraak | 6/10 | 2/5 | **6.0** | 🟠 P1 |
| 31 | Disabled button feedback | 4/10 | 1/5 | **8.0** | 🟡 P2 |
| 27 | Dark mode | 6/10 | 4/5 | **3.0** | 🟡 P2 |
| 26 | In-app feedback | 5/10 | 4/5 | **2.5** | 🟢 P3 |
| 11 | Badge colors | 3/10 | 1/5 | **6.0** | 🟢 P3 |
| 10 | Grammatica colors | 3/10 | 1/5 | **6.0** | 🟢 P3 |
| 3-9 | Design polish | 3/10 | 2/5 | **3.0** | 🟢 P3 |
| 12 | Account management | 4/10 | 3/5 | **2.7** | 🟢 P3 |

---

## 3. Voorgestelde Milestones

### 🎯 Milestone 1: "Clarity" (Sprint 1-2)
**Doel:** UX versimpelen, conversie verhogen
**Deadline:** 2 weken

| Issue | Titel | SP |
|-------|-------|-----|
| #20 | Homepage cognitive load | 5 |
| #23 | Shorten onboarding | 3 |
| #35 | Replace modals | 5 |
| #31 | Disabled button feedback | 2 |

**Totaal:** 15 SP

---

### 🎓 Milestone 2: "Learning" (Sprint 3-4)
**Doel:** Pedagogische verbeteringen
**Deadline:** 4 weken

| Issue | Titel | SP |
|-------|-------|-----|
| #36 | Voltooid UX (spaced rep basis) | 8 |
| #28 | Langzamere uitspraak | 3 |
| #15 | Progressive Learning (MVP) | 8 |

**Totaal:** 19 SP

---

### 🚀 Milestone 3: "Growth" (Sprint 5-6)
**Doel:** Nieuwe gebruikers aantrekken
**Deadline:** 6 weken

| Issue | Titel | SP |
|-------|-------|-----|
| #29 | Guest Mode | 8 |
| #27 | Dark mode | 8 |
| #26 | In-app feedback | 5 |

**Totaal:** 21 SP

---

### ✨ Milestone 4: "Polish" (Sprint 7-8)
**Doel:** Afwerking en consistentie
**Deadline:** 8 weken

| Issue | Titel | SP |
|-------|-------|-----|
| #11 | Badge colors | 3 |
| #10 | Grammatica colors | 3 |
| #3-9 | Design polish | 2-3 elk |
| #12 | Account management | 5 |

**Totaal:** ~20 SP

---

## 4. Nieuwe Issues Nodig

### Ontbrekende tickets voor complete roadmap:

| Nieuw Issue | Beschrijving | Milestone |
|-------------|--------------|-----------|
| **Analytics Dashboard** | Koko Analytics / custom metrics | Clarity |
| **Zweedse Content Audit** | Validatie door Vanya | Learning |
| **Offline Mode** | PWA caching verbeteren | Growth |
| **Push Notifications** | Streak reminders | Growth |
| **Social Sharing** | Deel badges op socials | Growth |

---

## 5. Roadmap Visualisatie

```
Week:  1    2    3    4    5    6    7    8
       |----|----|----|----|----|----|----|----|

M1: Clarity
       [#20 Homepage      ]
       [#23 Onboarding    ]
       [#35 No Modals     ]
       [#31 Button FB     ]

M2: Learning
                 [#36 Voltooid UX         ]
                 [#28 Slow Speech  ]
                 [#15 Progressive Learning]

M3: Growth
                           [#29 Guest Mode        ]
                           [#27 Dark Mode         ]
                           [#26 Feedback          ]

M4: Polish
                                     [#11 Badge colors    ]
                                     [#10 Grammar colors  ]
                                     [#3-9 Design polish  ]
```

---

## 6. Acties

### Direct uitvoeren:

1. **Team aanpassen** - Vanya toevoegen
2. **Milestones aanmaken** in GitHub
3. **Issues labelen** met milestone
4. **Nieuwe issues aanmaken** (Analytics, Content Audit, etc.)

### Vragen voor Monique:

1. Akkoord met team aanpassingen?
2. Zijn de milestones realistisch qua tijdlijn?
3. Welke nieuwe issues zijn prioriteit?
4. Is er budget/tijd voor pedagogy expertise (extern)?

---

*Tessa - Product Owner*
