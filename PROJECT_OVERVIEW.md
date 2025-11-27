# Svenska Kat - GitHub Project Overview

Quick reference for all issues, milestones, and priorities.

---

## Milestones

| Milestone | Target Date | Duration | Focus |
|-----------|-------------|----------|-------|
| **v1.11.0 - Critical Fixes** | 2025-11-30 | 1 week | Security, Performance, Accessibility, Analytics |
| **v1.12.0 - Learning Foundation** | 2025-12-23 | 1 month | Progressive Learning (Issue #15), Refactoring |
| **v1.13.0 - Pedagogical Improvements** | 2026-02-15 | 2-3 months | Expert consultation, data-driven iteration |
| **v2.0.0 - Expert-Validated** | 2026-06-30 | Q2 2025 | CEFR alignment, professional curriculum |

---

## All Issues by Priority

### P0 - Critical (v1.11.0 - This Week)

| # | Title | Labels | Time | Impact |
|---|-------|--------|------|--------|
| [#16](https://github.com/mdubbelm/zweedsapp/issues/16) | Fix: XSS vulnerability in user display names | security, bug | 2h | 100% users at risk |
| [#17](https://github.com/mdubbelm/zweedsapp/issues/17) | Performance: Reduce 3G load time (22s → <10s) | performance | 4h | 20-30% users (3G) |
| [#18](https://github.com/mdubbelm/zweedsapp/issues/18) | Accessibility: Fix color contrast (WCAG AA) | accessibility, bug | 2h | 15-20% users |
| [#19](https://github.com/mdubbelm/zweedsapp/issues/19) | Analytics: Implement Koko Analytics | analytics, pedagogy | 3h | Blocks roadmap |
| [#20](https://github.com/mdubbelm/zweedsapp/issues/20) | UX: Reduce homepage cognitive load (12+ → 6) | ux | 4h | New user activation |

**Total:** ~15 hours

### P1 - High (v1.11.0 or v1.12.0)

| # | Title | Labels | Milestone | Time |
|---|-------|--------|-----------|------|
| [#15](https://github.com/mdubbelm/zweedsapp/issues/15) | Progressive Learning Path (CORNERSTONE) | pedagogy | v1.12.0 | 2 weeks |
| [#21](https://github.com/mdubbelm/zweedsapp/issues/21) | Accessibility: Font sizes 12px → 14px | accessibility | v1.11.0 | 1h |
| [#22](https://github.com/mdubbelm/zweedsapp/issues/22) | Code Quality: Refactor (2690 lines → modules) | enhancement | v1.12.0 | 5h |
| [#14](https://github.com/mdubbelm/zweedsapp/issues/14) | Category counts respect filter | ux | v1.12.0 | 2h |
| [#23](https://github.com/mdubbelm/zweedsapp/issues/23) | UX: Shorten onboarding (10 → 4 steps) | ux | v1.12.0 | 4h |

### P2 - Medium (Deferred)

| # | Title | Labels | Status |
|---|-------|--------|--------|
| [#13](https://github.com/mdubbelm/zweedsapp/issues/13) | Multiple choice exercises | anti-roadmap | DEFERRED - Depth before breadth |
| [#1-12](https://github.com/mdubbelm/zweedsapp/issues) | Design improvements | design | Lower priority design polish |

### Documentation

| # | Title | Purpose |
|---|-------|---------|
| [#24](https://github.com/mdubbelm/zweedsapp/issues/24) | Anti-Roadmap: What We're NOT Building | Focus discipline, prevent feature creep |
| [#25](https://github.com/mdubbelm/zweedsapp/issues/25) | Product Roadmap 2025: Learning Outcomes First | Strategic direction, milestones, KPIs |

---

## Quick Stats

**Total Issues Created:** 10 new + 15 existing = 25 issues
**Total Milestones:** 4 (v1.11.0 → v2.0.0)
**Total Labels:** 9 new + 3 existing = 12 labels

**v1.11.0 Effort:** ~15 hours (1 week sprint)
**v1.12.0 Effort:** ~3 weeks development
**Full Roadmap:** November 2025 → June 2025 (6 months)

---

## Issue Dependencies

```
v1.11.0 (Week 1)
├─ #16 XSS Fix (2h) ────────────────────────┐
├─ #19 Analytics (3h) ──────────────────────┼─→ Foundation for all other work
├─ #17 Performance (4h) ────────────────────┤
├─ #18 Color Contrast (2h) ─────────────────┤
├─ #20 Homepage UX (4h) ────────────────────┤
└─ #21 Font Size (1h) ──────────────────────┘

v1.12.0 (Month 2)
├─ #22 Refactoring (5h) ────┐
│                            ├─→ Enables cleaner implementation
├─ #14 Category Counts (2h) ┘
│
├─ #15 Progressive Learning (2 weeks) ←─ CORNERSTONE
│   └─ Requires #19 (Analytics) for measurement
│
└─ #23 Onboarding (4h)

v1.13.0 (Months 3-5)
└─ Expert consultation → Iterate on #15

v2.0.0 (Month 6)
└─ CEFR alignment + validation
```

---

## Priority Scoring (Top Issues)

| Issue | Impact | Effort | Score | Priority |
|-------|--------|--------|-------|----------|
| #16 XSS | 9 | 1 | 18.0 | P0 🔴 |
| #19 Analytics | 9 | 2 | 9.0 | P0 🔴 |
| #20 Homepage UX | 8 | 2 | 8.0 | P0 🔴 |
| #17 Performance | 8 | 2 | 8.0 | P0 🔴 |
| #18 Color Contrast | 7 | 1 | 14.0 | P0 🔴 |
| #15 Progressive Learning | 10 | 4 | 5.0 | P1 🟠 |
| #22 Refactoring | 6 | 2 | 6.0 | P1 🟠 |
| #23 Onboarding | 7 | 2 | 7.0 | P1 🟠 |
| #14 Category Counts | 5 | 1 | 10.0 | P1 🟠 |
| #13 Multiple Choice | 5 | 3 | 3.3 | P2 🟡 (Deferred) |

**Formula:** Priority = (Impact × 2) / Effort

---

## Strategic Focus: 2025 = Learning Outcomes

### What We're Building ✅
1. Progressive Learning Path (#15)
2. Analytics for learning measurement (#19)
3. Performance for 3G users (#17)
4. Accessibility (WCAG 2.1 AA) (#18, #21)
5. Expert consultation (SLA + Swedish teacher)

### What We're NOT Building ❌
1. Multiple choice exercises (#13) - master existing 4 modes first
2. Native mobile apps - PWA sufficient for 250 MAU
3. Additional languages - master Swedish curriculum first
4. AI-powered features - too expensive, unreliable
5. Social features (chat, friends) - privacy-first approach
6. Avatar customization - extrinsic motivation risk
7. Video lessons - bandwidth-heavy
8. Monetization - focus on pedagogy, not revenue

**Philosophy:** Depth over breadth. Build fewer features, make them excellent.

---

## Success Metrics

### v1.11.0 Success
- ✅ Zero security vulnerabilities
- ✅ Performance: TTI <10s on 3G (from 22s)
- ✅ Accessibility: 70%+ WCAG compliance (from 53%)
- ✅ Analytics dashboard live

### v1.12.0 Success
- ✅ Progressive learning system deployed
- ✅ 2 weeks of analytics data collected
- ✅ Onboarding completion >70% (from ~50%)
- ✅ Codebase: 2,690 → 1,500 lines (-44%)

### v2.0.0 Success
- ✅ CEFR alignment expert-validated
- ✅ 500+ phrases (A1 → B2)
- ✅ 30-day retention 75%+ (from 60%)
- ✅ Mastery rate 80%+

---

## Next Actions

### Developer (This Week)
1. Start v1.11.0 sprint
2. Fix #16 (XSS) FIRST - 2h
3. Implement #19 (Analytics) - 3h
4. Fix #17, #18, #20 (Performance, Accessibility, UX)
5. Deploy v1.11.0 by 2025-11-30

### Product Owner (This Week)
1. Start expert consultation outreach (SLA + Swedish teacher)
2. Monitor v1.11.0 progress
3. Prepare analytics dashboard (after #19)

### Stakeholder
1. Review roadmap (#25) - validate strategy
2. Approve anti-roadmap (#24) - confirm focus
3. Budget for expert consultation

---

**Last Updated:** 2025-11-23
**GitHub Project:** https://github.com/mdubbelm/zweedsapp
**Full Summary:** /GITHUB_PROJECT_SUMMARY.md
