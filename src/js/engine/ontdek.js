/**
 * Rondjes voor Ontdekken: de Codekraker (klankregels) en Valse vrienden.
 *
 * Het blijft ophalen, geen herkennen: de leerling typt zelf de betekenis.
 * Eerst de regel met voorbeelden, dan raden met woorden die nooit geleerd zijn.
 */

import { shuffle } from './challenge.js';

const stripArticle = text => text.replace(/^(en|ett|att) /, '');

/** Virtuele items voor één klankregel: drie woorden kraken, één bouwen. */
export function ruleItems(rule) {
    const crack = rule.crack.map(([sv, nl, ...alt]) => ({
        id: `ck-${rule.id}-${sv}`,
        kind: 'decode',
        show: sv,
        sv: nl,
        accept: alt,
        why: `${rule.sv} wordt ${rule.nl}: ${sv} is ${nl}.`
    }));
    const [nl, sv] = rule.build;
    const build = {
        id: `ck-${rule.id}-bouw`,
        kind: 'word',
        nl,
        sv,
        accept: [stripArticle(sv)],
        why: `Andersom werkt het ook: ${rule.nl} wordt ${rule.sv}.`
    };
    return [...crack, build];
}

export function ruleRound(rule) {
    const items = ruleItems(rule);
    const questions = items.map(it => ({
        itemId: it.id,
        kind: it.kind,
        phase: 'recall',
        mode: it.kind === 'decode' ? 'decode' : 'type'
    }));
    return { kind: 'ontdek', style: 'mix', newIds: [], questions, items, ruleId: rule.id };
}

export function friendItem(f) {
    return {
        id: `vv-${f.id}`,
        kind: 'friend',
        word: f.word,
        show: f.sv,
        sv: f.means[0],
        accept: f.means.slice(1),
        nl: f.nl,
        looksLike: f.looksLike,
        why: f.wink
    };
}

/** Vijf valse vrienden: eerst die je nog niet doorzag. */
export function friendsRound(friends, seen = {}, count = 5, rng = Math.random) {
    const fresh = shuffle(
        friends.filter(f => !seen[`vv-${f.id}`]),
        rng
    );
    const old = shuffle(
        friends.filter(f => seen[`vv-${f.id}`]),
        rng
    );
    const items = [...fresh, ...old].slice(0, count).map(friendItem);
    const questions = items.map(it => ({
        itemId: it.id,
        kind: 'friend',
        phase: 'recall',
        mode: 'friend'
    }));
    return { kind: 'ontdek', style: 'mix', newIds: [], questions, items };
}

/** Het woord in de zin dat de valse vriend is, ook als het verbogen is (kudden, taket). */
export function findFriendWord(sentence, word) {
    const stem = word.slice(0, Math.max(3, word.length - 1));
    const re = new RegExp(`(^|[^\\p{L}])(${stem}\\p{L}*)`, 'iu');
    const m = sentence.match(re);
    if (!m) {
        return null;
    }
    const start = m.index + m[1].length;
    return { start, end: start + m[2].length };
}
