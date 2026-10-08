/**
 * Opbouw van een challenge (een bolletje op het pad).
 *
 * - 10 vragen: 4 nieuwe items, elk twee keer (eerst met kaart, daarna
 *   zonder), plus 2 herhaalvragen. Na een challenge onder de 80 procent
 *   wordt het 3 nieuw en 3 herhaling.
 * - De vier nieuwe items komen uit verschillende betekenisvelden.
 * - De moeilijkste nieuwe items staan aan het begin en het eind.
 * - Een gemiste vraag komt na 3 tot 5 vragen terug.
 */

import { dueItems, sits } from './srs.js';

export const QUESTIONS_NEW = 4;
export const QUESTIONS_NEW_EASY = 3;
export const TARGET_SCORE = 0.8;
export const MASTER_SIZE = 20;
export const MAX_RETRIES = 3;

const WORLD_ORDER = ['volkstuin', 'camper', 'sanktolof', 'malmo', 'amsterdam'];

export function worldIndex(world) {
    return WORLD_ORDER.indexOf(world);
}

/** Alle items in leervolgorde: wereld, slot, positie in het bestand. */
export function orderedItems(items) {
    return items
        .map((item, i) => ({ item, i }))
        .sort(
            (a, b) =>
                worldIndex(a.item.world) - worldIndex(b.item.world) ||
                a.item.slot - b.item.slot ||
                a.i - b.i
        )
        .map(({ item }) => item);
}

/** Kies de volgende nieuwe items, elk uit een ander betekenisveld. */
export function pickNew(items, srs, count) {
    const picked = [];
    const fields = new Set();
    for (const item of orderedItems(items)) {
        if (picked.length === count) {
            break;
        }
        if (srs[item.id] || fields.has(item.field)) {
            continue;
        }
        picked.push(item);
        fields.add(item.field);
    }
    return picked;
}

/** Herhaalvragen: eerst wat vandaag aan de beurt is, anders wat nog niet zit. */
export function pickReview(items, srs, today, count, exclude = new Set()) {
    const byId = new Map(items.map(it => [it.id, it]));
    const due = dueItems(srs, today).filter(id => byId.has(id) && !exclude.has(id));
    const chosen = due.slice(0, count);
    if (chosen.length < count) {
        const notYet = Object.entries(srs)
            .filter(
                ([id, rec]) =>
                    byId.has(id) && !sits(rec) && !chosen.includes(id) && !exclude.has(id)
            )
            .sort(([, a], [, b]) => (a.lastSeen < b.lastSeen ? -1 : 1))
            .map(([id]) => id);
        chosen.push(...notYet.slice(0, count - chosen.length));
    }
    return chosen.map(id => byId.get(id));
}

/** Moeilijkste vooraan en achteraan, de makkelijkste in het midden. */
export function hardestAtEdges(newItems) {
    const sorted = [...newItems].sort((a, b) => (b.level || 1) - (a.level || 1));
    if (sorted.length < 3) {
        return sorted;
    }
    const [first, second, ...rest] = sorted;
    return [first, ...rest.reverse(), second];
}

export function recallMode(item) {
    switch (item.kind) {
        case 'gap':
        case 'form':
        case 'truefalse':
        case 'builder':
            return item.kind;
        default:
            return 'type';
    }
}

function q(item, phase, extra = {}) {
    return {
        itemId: item.id,
        kind: item.kind,
        phase,
        mode: phase === 'card' ? 'card' : recallMode(item),
        ...extra
    };
}

/**
 * @param {object} opts
 * @param {Array} opts.items alle items
 * @param {object} opts.srs herhaalrecords per item-id
 * @param {string} opts.today 'YYYY-MM-DD'
 * @param {number|null} opts.lastScore score van de vorige challenge
 * @param {'mix'|'luister'|'pen'} opts.style gekozen vorm
 */
export function buildChallenge({ items, srs, today, lastScore = null, style = 'mix' }) {
    const newCount =
        lastScore !== null && lastScore < TARGET_SCORE ? QUESTIONS_NEW_EASY : QUESTIONS_NEW;
    const reviewCount = 6 - newCount;
    const fresh = hardestAtEdges(pickNew(items, srs, newCount));
    const reviews = pickReview(items, srs, today, reviewCount, new Set(fresh.map(i => i.id)));

    const [A, B, C, D] = fresh;
    const [R1, R2, R3] = reviews;
    const card = it => it && q(it, 'card', { guess: true });
    const recall = it => it && q(it, 'recall');
    const rev = it => it && q(it, 'review');

    let pattern;
    if (newCount === 4) {
        pattern = [
            card(A),
            card(B),
            rev(R1),
            recall(A),
            card(C),
            recall(B),
            card(D),
            rev(R2),
            recall(C),
            recall(D)
        ];
    } else {
        pattern = [
            card(A),
            card(B),
            rev(R1),
            recall(A),
            card(C),
            rev(R2),
            recall(B),
            rev(R3),
            recall(C)
        ];
    }
    let questions = pattern.filter(Boolean);

    if (style === 'luister') {
        questions = questions.map(x =>
            x.phase !== 'card' && (x.mode === 'type' || x.mode === 'gap')
                ? { ...x, mode: 'listen' }
                : x
        );
    } else if (style === 'pen') {
        questions = questions.map(x => (x.phase !== 'card' ? { ...x, mode: 'pen' } : x));
    } else {
        // Eén geheim bericht per challenge: een herhaalvraag om te beluisteren.
        const idx = questions.findIndex(x => x.phase === 'review' && x.mode === 'type');
        if (idx >= 0) {
            questions[idx] = { ...questions[idx], mode: 'listen' };
        }
    }

    return { kind: 'challenge', style, newIds: fresh.map(i => i.id), questions };
}

/** Masterchallenge: twintig vragen uit een wereld, zonder kaart en zonder hints. */
export function buildMaster({ items, srs, world, rng = Math.random }) {
    const pool = items.filter(it => it.world === world && srs[it.id]);
    const shuffled = shuffle(pool, rng).slice(0, MASTER_SIZE);
    return {
        kind: 'master',
        style: 'mix',
        newIds: [],
        questions: shuffled.map(it => q(it, 'review', { noHints: true }))
    };
}

/** Sprint: alleen stof die al zit. */
export function sprintPool(items, srs) {
    return items.filter(it => sits(srs[it.id]) && (it.kind === 'noun' || it.kind === 'word'));
}

/**
 * Zet een gemiste vraag 3 tot 5 plekken verderop terug in de rij.
 * Geeft een nieuwe array terug.
 */
export function reinsert(queue, index, rng = Math.random) {
    const missed = queue[index];
    const tries = (missed.tries || 0) + 1;
    if (tries > MAX_RETRIES) {
        return queue;
    }
    const offset = 3 + Math.floor(rng() * 3);
    const at = Math.min(index + offset + 1, queue.length);
    const copy = {
        ...missed,
        phase: missed.phase === 'card' ? 'recall' : missed.phase,
        retry: true,
        tries
    };
    if (copy.mode === 'card') {
        copy.mode = recallMode({ kind: missed.kind });
        copy.guess = false;
    }
    return [...queue.slice(0, at), copy, ...queue.slice(at)];
}

/** TNT: de vraag gaat naar achteren en komt later terug. */
export function tnt(queue, index) {
    const item = { ...queue[index], blown: (queue[index].blown || 0) + 1 };
    return [...queue.slice(0, index), ...queue.slice(index + 1), item];
}

export function shuffle(list, rng = Math.random) {
    const out = [...list];
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
}

/** Score telt alleen ophaalvragen bij de eerste poging (geen kaartvragen, geen herkansingen). */
export function score(results) {
    const scored = results.filter(r => r.phase !== 'card' && !r.retry && !r.blown);
    if (scored.length === 0) {
        return 1;
    }
    return scored.filter(r => r.ok && !r.hint).length / scored.length;
}

export function stars(s) {
    if (s >= 0.9) {
        return 3;
    }
    if (s >= 0.7) {
        return 2;
    }
    return 1;
}
