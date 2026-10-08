/**
 * Eén lopende challenge: de rij vragen, wat er al beantwoord is en wat het
 * herhaalschema ervan vindt. Puur, zonder DOM, zodat het te testen is.
 */

import { learn, review } from '../engine/srs.js';
import { reinsert, tnt, score, stars } from '../engine/challenge.js';
import { xpFor, XP } from '../engine/rewards.js';

export function startSession(challenge, { today, isCompressed = () => false }) {
    return {
        kind: challenge.kind,
        style: challenge.style,
        newIds: challenge.newIds,
        queue: challenge.questions,
        index: 0,
        results: [],
        srsChanges: {},
        xp: 0,
        today,
        isCompressed,
        total: challenge.questions.length
    };
}

export function current(session) {
    return session.queue[session.index] || null;
}

export function isDone(session) {
    return session.index >= session.queue.length;
}

/** Hoe ver we zijn, voor de voortgangsbalk (herkansingen tellen niet mee). */
export function progress(session) {
    const answered = session.results.filter(r => !r.retry).length;
    return Math.min(1, answered / session.total);
}

/**
 * Verwerk een antwoord.
 * @param {object} srs het huidige herhaalschema (wordt niet aangepast)
 * @param {{ok: boolean, hint?: boolean}} answer
 */
export function answer(session, srs, item, { ok, hint = false }, rng = Math.random) {
    const q = current(session);
    const s = { ...session, results: [...session.results], srsChanges: { ...session.srsChanges } };
    const compressed = s.isCompressed(item);
    const before = s.srsChanges[q.itemId] || srs[q.itemId];

    if (!q.retry) {
        if (q.phase === 'recall') {
            s.srsChanges[q.itemId] = learn(s.today, { correct: ok && !hint, compressed });
        } else if (q.phase === 'review') {
            s.srsChanges[q.itemId] = review(before, s.today, { correct: ok && !hint, compressed });
        }
    }

    const gained = xpFor(q, { ok, hint, record: before, style: s.style });
    s.xp += gained;
    s.results.push({
        itemId: q.itemId,
        phase: q.phase,
        ok,
        hint,
        retry: Boolean(q.retry),
        xp: gained
    });

    if (!ok && q.phase !== 'card') {
        s.queue = reinsert(s.queue, s.index, rng);
    }
    s.index += 1;
    return { session: s, gained };
}

/** TNT: vraag wegblazen, hij komt achteraan terug. Kost een TNT-blok. */
export function blowUp(session) {
    const queue = tnt(session.queue, session.index);
    return { ...session, queue };
}

/** Rond af: score, sterren en de bonus voor het afmaken. */
export function finish(session) {
    const s = score(session.results);
    const bonus = session.kind === 'master' ? XP.masterDone : XP.challengeDone;
    return {
        score: s,
        stars: stars(s),
        xp: session.xp + bonus,
        bonus,
        srsChanges: session.srsChanges
    };
}
