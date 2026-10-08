/**
 * XP, streak, XP-level en de kist.
 *
 * XP komt alleen van goede antwoorden zonder hint, en het meest van een
 * herhaling die na dagen nog zit. Nooit van tijd in de app.
 */

import { addDays, daysBetween } from './dates.js';

export const XP = {
    card: 2,
    recall: 8,
    review: 10,
    reviewAfterDays: 15,
    challengeDone: 20,
    masterDone: 100,
    rijtje: 10,
    sprintWord: 2
};

/** XP voor één antwoord. */
export function xpFor(question, { ok, hint, record, style }) {
    if (!ok || hint || question.retry) {
        return 0;
    }
    let xp;
    if (question.phase === 'card') {
        xp = XP.card;
    } else if (question.phase === 'recall') {
        xp = XP.recall;
    } else {
        xp = record && record.step >= 2 ? XP.reviewAfterDays : XP.review;
    }
    // Met de pen op papier telt dubbel.
    return style === 'pen' && question.phase !== 'card' ? xp * 2 : xp;
}

/** XP-level: elk level vraagt iets meer dan het vorige. */
export function levelFor(totalXp) {
    let level = 1;
    let need = 150;
    let rest = totalXp;
    while (rest >= need) {
        rest -= need;
        level += 1;
        need += 50;
    }
    return { level, into: rest, need };
}

/**
 * Streak in oefendagen. Eén rustdag tussendoor breekt hem niet, want de
 * planning gaat uit van 4 à 5 oefendagen per week.
 */
export function updateStreak(streak, today) {
    const { count = 0, last = null } = streak || {};
    if (last === today) {
        return { count, last };
    }
    if (last && daysBetween(last, today) <= 2) {
        return { count: count + 1, last: today };
    }
    return { count: 1, last: today };
}

/** Toont de streak nog als "lopend" als er gisteren of eergisteren geoefend is. */
export function streakAlive(streak, today) {
    if (!streak || !streak.last) {
        return false;
    }
    return daysBetween(streak.last, today) <= 2;
}

export function streakDays(streak, today) {
    return streakAlive(streak, today) ? streak.count : 0;
}

/** Wisselende kistinhoud, voorspelbaar per kist zodat herladen niets verandert. */
export function chestLoot(seed) {
    let h = 2166136261;
    for (const ch of String(seed)) {
        h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    }
    const roll = (h >>> 0) % 100;
    if (roll < 50) {
        return { type: 'xp', amount: 25 + ((h >>> 8) % 4) * 10 };
    }
    if (roll < 80) {
        return { type: 'tnt', amount: 2 };
    }
    return { type: 'stempel' };
}

export { addDays };
