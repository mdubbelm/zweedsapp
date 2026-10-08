/**
 * Drie dagquests: kleine opdrachtjes met XP, geen dagdoel.
 * Per dag dezelfde drie, zodat herladen niets verandert.
 */

export const QUEST_POOL = [
    { id: 'challenges', title: 'Speel 2 challenges', target: 2, xp: 30, icon: 'map' },
    { id: 'reviews', title: 'Haal 5 oude woorden goed op', target: 5, xp: 25, icon: 'refresh' },
    { id: 'listen', title: 'Ontcijfer 2 geheime berichten', target: 2, xp: 20, icon: 'headphones' },
    { id: 'rabbla', title: 'Rabbla een rijtje', target: 1, xp: 15, icon: 'beuken' },
    { id: 'pen', title: 'Speel een challenge met pen en papier', target: 1, xp: 30, icon: 'paper' },
    { id: 'guess', title: 'Raad 3 nieuwe woorden goed', target: 3, xp: 20, icon: 'dice' }
];

function hash(text) {
    let h = 2166136261;
    for (const ch of text) {
        h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    }
    return h >>> 0;
}

export function questsFor(day) {
    const pool = [...QUEST_POOL];
    const out = [];
    let h = hash(day);
    while (out.length < 3) {
        const i = h % pool.length;
        out.push(pool.splice(i, 1)[0]);
        h = hash(String(h));
    }
    return out;
}

/** Tel voortgang op en geef de XP terug van quests die nu af zijn. */
export function bumpQuest(state, day, id, by = 1) {
    if (!state.quests || state.quests.day !== day) {
        state.quests = { day, counts: {}, done: {} };
    }
    const active = questsFor(day).find(q => q.id === id);
    if (!active || state.quests.done[id]) {
        return 0;
    }
    state.quests.counts[id] = (state.quests.counts[id] || 0) + by;
    if (state.quests.counts[id] >= active.target) {
        state.quests.done[id] = true;
        return active.xp;
    }
    return 0;
}
