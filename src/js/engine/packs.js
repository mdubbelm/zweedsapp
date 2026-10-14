/**
 * Rondjes voor een uitje of een feestdag (een "pakket" met eigen items).
 *
 * Zelfde opbouw als een challenge, alleen kleiner: nieuwe items eerst gokken,
 * dan de kaart, dan zelf ophalen. Wat al eerder gezien is, komt als
 * herhaalvraag. De items gaan het gewone herhaalschema in.
 */

import { recallMode, shuffle } from './challenge.js';

const NEW_PER_ROUND = 3;
const REVIEW_PER_ROUND = 3;

function q(item, phase, extra = {}) {
    return {
        itemId: item.id,
        kind: item.kind,
        phase,
        mode: phase === 'card' ? 'card' : recallMode(item),
        ...extra
    };
}

/** Hoeveel items van een pakket al gezien zijn. */
export function packSeen(pack, srs) {
    return pack.items.filter(it => srs[it.id]).length;
}

/**
 * Bouw een rondje voor een pakket.
 * Nieuwe items in bestandsvolgorde, elk uit een ander betekenisveld waar dat kan.
 */
export function buildPackRound(pack, srs, rng = Math.random) {
    const fresh = [];
    const fields = new Set();
    for (const it of pack.items) {
        if (fresh.length === NEW_PER_ROUND) {
            break;
        }
        if (!srs[it.id] && !fields.has(it.field)) {
            fresh.push(it);
            fields.add(it.field);
        }
    }
    for (const it of pack.items) {
        if (fresh.length === NEW_PER_ROUND) {
            break;
        }
        if (!srs[it.id] && !fresh.includes(it)) {
            fresh.push(it);
        }
    }
    const seen = shuffle(
        pack.items.filter(it => srs[it.id]),
        rng
    ).slice(0, fresh.length ? REVIEW_PER_ROUND - 1 : REVIEW_PER_ROUND + 2);

    const [A, B, C] = fresh;
    const [R1, R2, R3, R4, R5] = seen;
    const card = it => it && q(it, 'card', { guess: true });
    const recall = it => it && q(it, 'recall');
    const rev = it => it && q(it, 'review');

    const pattern = fresh.length
        ? [card(A), card(B), rev(R1), recall(A), card(C), recall(B), rev(R2), recall(C)]
        : [rev(R1), rev(R2), rev(R3), rev(R4), rev(R5)];

    return {
        kind: 'pack',
        packId: pack.id,
        style: 'mix',
        newIds: fresh.map(i => i.id),
        questions: pattern.filter(Boolean)
    };
}
