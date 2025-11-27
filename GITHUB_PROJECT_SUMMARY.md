# Svenska Kat - GitHub Project Structure Summary

**Created:** 2025-11-23
**Product Owner:** Claude (Svenska Kat PO Agent)
**Strategic Focus:** 2025 = Learning Outcomes (Pedagogical Excellence)

---

## Executive Summary

Based on comprehensive audits by 7 expert agents (Performance, Accessibility, UX, Design, Security, Pedagogy), I've created a structured GitHub project for Svenska Kat with:

- **4 Milestones** (v1.11.0 → v2.0.0)
- **10 New Issues** (5 P0 Critical, 3 P1 High, 2 Documentation)
- **3 Existing Issues Updated** (prioritized, contextualized)
- **9 New Labels** (priority levels, categories)
- **Anti-Roadmap** (8 deferred features with rationale)
- **2025 Product Roadmap** (learning outcomes first)

**Total Project Value:** 15 hours of critical fixes (v1.11.0) → 6 months to expert-validated curriculum (v2.0.0)

---

## GitHub Project Structure

### Milestones Created

1. **v1.11.0 - Critical Fixes** (Due: 2025-11-30)
   - Focus: Security, Performance, Accessibility, Analytics, UX
   - Duration: 1 week
   - Total Effort: ~15 hours

2. **v1.12.0 - Learning Foundation** (Due: 2025-12-23)
   - Focus: Progressive Learning Path (Issue #15), Code Refactoring, UX
   - Duration: 1 month
   - Total Effort: ~3 weeks development

3. **v1.13.0 - Pedagogical Improvements** (Due: 2026-02-15)
   - Focus: Expert consultation, data-driven iteration
   - Duration: 2-3 months

4. **v2.0.0 - Expert-Validated Learning Path** (Due: 2026-06-30)
   - Focus: CEFR alignment, professional curriculum
   - Duration: Q2 2025

### Labels Created

**Priority Levels:**
- `P0: Critical` (red #d73a4a) - This week
- `P1: High` (orange #ff6b6b) - Next sprint (2 weeks)
- `P2: Medium` (yellow #ffa500) - Future sprints

**Categories:**
- `security` (dark red #b60205)
- `performance` (yellow #fbca04)
- `ux` (light blue #c5def5)
- `accessibility` (orange #F97316 - existing)
- `pedagogy` (green #0e8a16)
- `analytics` (purple #5319e7)
- `anti-roadmap` (gray #cccccc)

---

## New Issues Created

### P0 Critical Issues (v1.11.0 - 1 week)

#### [Issue #16] Fix: XSS vulnerability in user display names
- **Labels:** P0: Critical, security, bug
- **Time:** 2 hours
- **Impact:** CRITICAL - All 250 users at risk
- **Solution:** Implement `escapeHtml()` helper for all user input
- **Priority Justification:** Security vulnerability must be fixed before any features

#### [Issue #17] Performance: Reduce initial load time for 3G users (22s → <5s)
- **Labels:** P0: Critical, performance, enhancement
- **Time:** 4 hours (Phase 1 quick wins)
- **Impact:** 20-30% of users (3G connections)
- **Solution:** Inline critical CSS, optimize Font Awesome, defer non-critical JS
- **Expected:** 22s → 8-10s on 3G (55% improvement)

#### [Issue #18] Accessibility: Fix color contrast failures (WCAG 2.1 AA)
- **Labels:** P0: Critical, accessibility, bug
- **Time:** 2 hours
- **Impact:** 15-20% of users (low vision, color blind)
- **Solution:** Create text-safe color variants (darken Scandinavian colors for text)
- **Compliance:** Currently 53% WCAG AA → Target 100%

#### [Issue #19] Analytics: Implement Koko Analytics tracking
- **Labels:** P0: Critical, analytics, enhancement, pedagogy
- **Time:** 3 hours
- **Impact:** Blocks entire 2025 roadmap (no data = no learning validation)
- **Solution:** Integrate Koko Analytics, track 5 core learning events
- **Strategic:** Required to measure pedagogical effectiveness (2025 primary goal)

#### [Issue #20] UX: Reduce homepage cognitive load (12+ elements → 6)
- **Labels:** P0: Critical, ux, enhancement
- **Time:** 4 hours
- **Impact:** New user activation, decision paralysis
- **Solution:** Remove category grid, simplify to Daily Program + 3 mode buttons
- **UX Issue:** Dual navigation paths (category-first vs mode-first) = confusion

### P1 High Priority Issues (v1.11.0 or v1.12.0)

#### [Issue #21] Accessibility: Font sizes too small (12px → 14px minimum)
- **Labels:** P1: High, accessibility, enhancement
- **Time:** 1 hour
- **Impact:** Low vision users (15%), elderly (30% of 60+)
- **Solution:** Find/replace `text-xs` → `text-sm` (45 instances)
- **Bundle with:** Issue #18 (same deployment)

#### [Issue #22] Code Quality: Refactor monolithic index.html (2,690 lines → modules)
- **Labels:** P1: High, enhancement
- **Milestone:** v1.12.0
- **Time:** 5 hours (Phase 1: Extract data)
- **Impact:** Technical debt blocking collaboration
- **Solution Phase 1:** Extract categories, badges, release notes to `/src/data/`
- **Expected:** 2,690 → 1,500 lines (-44%)
- **Enables:** Issue #15 (Progressive Learning) with cleaner architecture

#### [Issue #23] UX: Shorten onboarding tour (10 steps → 3-5 steps)
- **Labels:** P1: High, ux, enhancement
- **Milestone:** v1.12.0
- **Time:** 4 hours
- **Impact:** New user retention (40% drop-off after 7 days)
- **Solution:** 10 steps → 4 steps (Welcome → Daily Program → Modes → Progress)
- **Expected:** >70% completion rate (from ~50%)

### Documentation Issues

#### [Issue #24] Anti-Roadmap: What We're NOT Building (and Why)
- **Labels:** documentation, anti-roadmap
- **Purpose:** Maintain focus on pedagogical excellence
- **Deferred Features:**
  1. Multiple choice exercises (Issue #13) - depth before breadth
  2. Native mobile apps - PWA sufficient until 10K+ MAU
  3. Additional languages - master Swedish first
  4. AI-powered features - too expensive, unreliable
  5. Social features - privacy-first approach
  6. Avatar customization - extrinsic motivation risk
  7. Video lessons - bandwidth-heavy
  8. Monetization - focus on learning first

#### [Issue #25] Product Roadmap 2025: Learning Outcomes First
- **Labels:** documentation, pedagogy
- **Purpose:** Strategic direction for 2025
- **Key Milestones:**
  - v1.11.0: Critical fixes (1 week)
  - v1.12.0: Progressive learning foundation (1 month)
  - v1.13.0: Expert consultation + iteration (2-3 months)
  - v2.0.0: CEFR-aligned curriculum (Q2 2025)
- **Success Metrics:** Mastery rate 80%+, 30-day retention 75%+

---

## Existing Issues Updated

### [Issue #15] Progressive Learning Path (Updated)
- **Labels Added:** P1: High, pedagogy
- **Milestone:** v1.12.0 - Learning Foundation
- **Priority:** HIGHEST (cornerstone feature for 2025 goal)
- **Dependencies:**
  - Issue #19 (Analytics) - measure learning effectiveness
  - Issue #22 (Refactoring) - cleaner architecture
  - Issue #20 (Homepage) - clear navigation foundation
- **Comment Added:** Explains strategic importance, implementation sequence, expert validation plan

### [Issue #13] Multiple Choice Exercises (Updated)
- **Labels Added:** anti-roadmap, P2: Medium
- **Status:** DEFERRED
- **Rationale:**
  - Already 4 exercise modes
  - Multiple choice = least effective for retention (passive vs active)
  - Focus on Issue #15 (mastery) before adding modes
  - 2 weeks to build = 2 weeks NOT spent on progressive learning
- **Reconsider:** Only if Issue #15 complete + analytics show 80%+ mastery + expert recommends

### [Issue #14] Category counts respect filter (Updated)
- **Labels Added:** P1: High, ux
- **Milestone:** v1.12.0 - Learning Foundation
- **Dependency:** Supports Issue #15 (accurate counts for unlock logic)
- **Time:** 2 hours
- **Sequence:** Issue #22 → #14 → #15

---

## Impact Analysis by Priority

### P0 Critical Issues (v1.11.0)
**Total Time:** ~15 hours (1 week sprint)

| Issue | Time | Impact | Users Affected |
|-------|------|--------|----------------|
| #16 Security (XSS) | 2h | CRITICAL | 100% (250 MAU) |
| #17 Performance | 4h | CRITICAL | 20-30% (3G users) |
| #18 Color Contrast | 2h | CRITICAL | 15-20% (accessibility) |
| #19 Analytics | 3h | CRITICAL | Blocks roadmap |
| #20 Homepage UX | 4h | HIGH | 100% (new users) |
| #21 Font Size | 1h | HIGH | 15-30% (accessibility) |

**Business Impact:**
- Fixes security vulnerability (legal/reputation risk)
- Improves performance for underserved users (3G)
- Achieves WCAG baseline compliance (legal requirement)
- Enables data-driven decisions (analytics foundation)
- Improves new user activation (UX clarity)

### P1 High Priority Issues (v1.12.0)
**Total Time:** ~3 weeks

| Issue | Time | Impact | Strategic Value |
|-------|------|--------|-----------------|
| #15 Progressive Learning | 2 weeks | HIGHEST | 2025 core goal |
| #22 Code Refactoring | 5h | HIGH | Technical foundation |
| #14 Category Counts | 2h | MEDIUM | Supports #15 |
| #23 Onboarding | 4h | HIGH | User retention |

**Strategic Impact:**
- Issue #15 = cornerstone for pedagogical excellence (2025 goal)
- Issue #22 = enables future development velocity
- Issue #23 = improves retention (40% → 30% drop-off)

---

## Product Philosophy: Depth Over Breadth

### What We're Building
1. **Progressive Learning Path** (Issue #15) - pedagogical core
2. **Analytics** (Issue #19) - measure learning outcomes
3. **Performance** - accessible to all users (3G connections)
4. **Accessibility** - inclusive learning (WCAG 2.1 Level AA)
5. **Expert Consultation** - SLA specialist + Swedish teacher validation

### What We're NOT Building (Anti-Roadmap)
1. ❌ More exercise modes (Issue #13) - master existing 4 first
2. ❌ Native apps - PWA sufficient for 250 MAU
3. ❌ Additional languages - master Swedish curriculum first
4. ❌ AI features - too expensive, unreliable for pedagogy
5. ❌ Social features - privacy-first approach
6. ❌ Monetization - focus on learning, not revenue

**Mantra:** "Build fewer features, make them pedagogically excellent."

---

## Success Metrics by Milestone

### v1.11.0 Success Criteria
- ✅ Zero P0 issues open
- ✅ Analytics dashboard live (Koko Analytics)
- ✅ Performance: TTI <10s on 3G (from 22s)
- ✅ Accessibility: 70%+ WCAG compliance (from 53%)
- ✅ Security: Zero vulnerabilities

### v1.12.0 Success Criteria
- ✅ Progressive learning system deployed (Issue #15)
- ✅ 2 weeks of learning analytics data collected
- ✅ Onboarding completion rate >70% (from ~50%)
- ✅ Code refactored: 2,690 → 1,500 lines (-44%)
- ✅ Mastery-based unlock working

### v1.13.0 Success Criteria
- ✅ Expert consultation sessions completed (SLA + Swedish teacher)
- ✅ Pedagogical improvements validated by data
- ✅ WCAG 2.1 Level AA 100% compliant
- ✅ 30-day retention >50% (from 40%)

### v2.0.0 Success Criteria
- ✅ CEFR alignment expert-validated (A1 → B2)
- ✅ 500+ phrases across all levels
- ✅ Measurable learning outcomes proven
- ✅ App ready for scaled growth

---

## Expert Consultation Plan

### Phase 1: Initial Review (After v1.12.0)
**Who:** SLA (Second Language Acquisition) specialist
**Focus:** Progressive learning algorithm validation
**Questions:**
- Is mastery-based unlock effective for Swedish?
- Are difficulty categories sufficient?
- What forgetting curve algorithm to use?

### Phase 2: Content Review (v1.13.0)
**Who:** Swedish teacher (native or certified)
**Focus:** Phrase quality, grammar accuracy, CEFR mapping
**Deliverables:**
- Review all 220+ phrases for accuracy
- Suggest grammar explanations
- Map phrases to CEFR levels (A1-B2)

### Phase 3: Curriculum Design (v2.0.0)
**Who:** Both SLA + Swedish teacher
**Focus:** Structured learning path design
**Deliverables:**
- CEFR-aligned curriculum (A1 → B2)
- Placement test design
- Assessment rubrics

---

## Key Performance Indicators (KPIs)

### Learning Outcomes (Primary - 2025 Goal)
- **Mastery Rate:** % phrases retained after 3 reviews (target: 80%+)
- **Retention Curve:** Forgetting rate over time (target: <20% after 30 days)
- **Progression Rate:** Days to complete difficulty level (target: 2 weeks Easy→Medium)
- **Session Quality:** Average phrases per session (target: 10-15)

### Engagement (Secondary)
- **7-day Retention:** % users active after 7 days (current: 60%, target: 75%)
- **30-day Retention:** % users active after 30 days (target: 50%+)
- **Daily Program Completion:** % daily goals met (target: 70%+)
- **Session Duration:** Average time per session (maintain: 10-15 min)

### Technical Quality (Foundation)
- **Performance:** TTI on 3G <5s (currently 22s)
- **Accessibility:** WCAG 2.1 Level AA compliance 100% (currently 53%)
- **Reliability:** Error rate <1%
- **Security:** Zero vulnerabilities (currently 1 XSS)

---

## Decision-Making Framework

### Impact/Effort Scoring
```
IMPACT SCORE (1-10)
├─ Pedagogical Value: Does it improve learning outcomes?
├─ User Need: Do analytics/feedback show demand?
├─ Retention Impact: Does it keep users learning?
└─ Differentiation: Is it unique vs Duolingo/Babbel?

EFFORT SCORE (1-5)
├─ Development Time: Hours required
├─ Complexity: New tech or risky changes?
├─ Testing Burden: Edge cases and QA
└─ Maintenance: Ongoing costs

PRIORITY = (Impact × 2) / Effort
```

**Thresholds:**
- 🔴 **P0 Critical:** Score > 5.0 → Do immediately (v1.11.0)
- 🟠 **P1 High:** Score 3.0-5.0 → This sprint/month (v1.12.0)
- 🟡 **P2 Medium:** Score 1.5-3.0 → Next quarter (v1.13.0+)
- 🟢 **P3 Low:** Score < 1.5 → Backlog or anti-roadmap

### Example Scores

| Feature | Impact | Effort | Score | Priority |
|---------|--------|--------|-------|----------|
| XSS Fix (#16) | 9 | 1 | 18.0 | P0 🔴 |
| Analytics (#19) | 9 | 2 | 9.0 | P0 🔴 |
| Progressive Learning (#15) | 10 | 4 | 5.0 | P1 🟠 |
| Multiple Choice (#13) | 5 | 3 | 3.3 | P2 🟡 (Deferred) |
| Avatar Customization | 3 | 3 | 2.0 | Anti-Roadmap ❌ |

---

## Risk Management

### Risk 1: Expert consultation delayed
**Impact:** v2.0.0 timeline slips
**Probability:** MEDIUM
**Mitigation:**
- Start outreach during v1.12.0 development
- Build 4-week buffer in v1.13.0
- Have backup consultant contacts

### Risk 2: Analytics show progressive learning ineffective
**Impact:** Major pivot needed in v1.13.0
**Probability:** LOW
**Mitigation:**
- MVP approach in v1.12.0 (fail fast)
- Multiple iterations based on data
- Expert consultation validates approach

### Risk 3: Performance issues persist after v1.11.0
**Impact:** User retention suffers
**Probability:** MEDIUM
**Mitigation:**
- Phase 1 quick wins (4h) in v1.11.0
- Phase 2 structural improvements in v1.12.0 (refactoring)
- Phase 3 deep optimization in v1.13.0 if needed

### Risk 4: Scope creep from new feature requests
**Impact:** Milestones delayed
**Probability:** HIGH
**Mitigation:**
- Anti-roadmap discipline (Issue #24)
- Ruthless prioritization using Impact/Effort framework
- Weekly roadmap reviews

### Risk 5: Single developer bottleneck
**Impact:** Development velocity limited
**Probability:** HIGH
**Mitigation:**
- Issue #22 (Refactoring) enables future collaboration
- Clear documentation (CLAUDE.md, roadmap)
- Modular architecture (v1.12.0+)

---

## Communication Plan

### Weekly Updates (During Active Development)
- Progress on current milestone
- Blockers and risks
- Analytics insights (after Issue #19)

### Release Notes (Each Deployment)
- User-facing changelog
- Pedagogical rationale for changes
- Data-driven decisions explained

### User Feedback Loop
- Analytics-driven feature requests (Issue #19)
- Surveys after major releases (v1.12.0, v2.0.0)
- Expert recommendations shared with community

### GitHub Project Transparency
- All issues public
- Milestones tracked in GitHub
- Anti-roadmap explains "why not" (Issue #24)
- Roadmap shows strategic direction (Issue #25)

---

## Next Steps (Immediate Actions)

### Developer (This Week)
1. **Start v1.11.0 sprint** (target: 2025-11-30)
2. **Fix Issue #16 first** (XSS security - 2h) - CRITICAL
3. **Then Issue #19** (Analytics - 3h) - enables data collection
4. **Then Issues #17, #18, #20** (Performance, Accessibility, UX)
5. **Deploy v1.11.0** by Friday 2025-11-29

### Product Owner (This Week)
1. **Start expert consultation outreach**
   - Research SLA specialists (universities, language learning research)
   - Find Swedish teachers (native speakers, CEFR-certified)
   - Prepare consultation brief (questions, goals)

2. **Monitor GitHub project**
   - Track v1.11.0 progress
   - Review pull requests with pedagogical lens
   - Update roadmap if blockers arise

3. **Prepare analytics dashboard**
   - After Issue #19 deploys, configure Koko Analytics views
   - Create learning outcomes dashboard mockup
   - Define weekly report format

### Stakeholder (This Month)
1. **Review roadmap** (Issue #25) - validate strategic direction
2. **Approve anti-roadmap** (Issue #24) - confirm focus areas
3. **Budget for expert consultation** (v1.13.0 / v2.0.0 phases)
4. **Celebrate v1.11.0 launch** (critical fixes shipped!)

---

## Conclusion

Svenska Kat now has a **data-driven, pedagogically-focused roadmap** for 2025. The GitHub project structure provides:

1. **Clarity:** 4 milestones, clear priorities (P0/P1/P2)
2. **Focus:** Anti-roadmap prevents feature creep
3. **Measurability:** Analytics (Issue #19) tracks learning outcomes
4. **Quality:** Expert consultation validates pedagogy
5. **Sustainability:** Code refactoring (Issue #22) enables growth

**The path from 250 MAU with ad-hoc features → expert-validated learning app is now clear.**

**Core Philosophy:**
> "Build fewer features, make them pedagogically excellent."

**2025 Success = Measurable learning outcomes, not feature count.**

---

**Project Owner:** Product Owner Agent (Svenska Kat)
**Created:** 2025-11-23
**Last Updated:** 2025-11-23
**Next Review:** After v1.11.0 ships (2025-11-30)

**GitHub Project:** https://github.com/mdubbelm/zweedsapp
**Milestones:** https://github.com/mdubbelm/zweedsapp/milestones
**Issues:** https://github.com/mdubbelm/zweedsapp/issues
**Roadmap:** Issue #25
**Anti-Roadmap:** Issue #24
