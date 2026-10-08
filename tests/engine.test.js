import { describe, it, expect } from 'vitest';
import { addDays } from '../src/js/engine/dates.js';
import { learn, review, sits, INTERVALS, COMPRESSED_INTERVALS, dueItems } from '../src/js/engine/srs.js';
import { checkAnswer, nudge } from '../src/js/engine/check.js';
import {
    buildChallenge,
    buildMaster,
    reinsert,
    tnt,
    score,
    stars,
    pickNew
} from '../src/js/engine/challenge.js';
import { xpFor, updateStreak, streakDays, levelFor } from '../src/js/engine/rewards.js';

const D0 = '2026-10-01';
const seq = vals => {
    let i = 0;
    return () => vals[i++ % vals.length];
};

function fakeItems() {
    const fields = ['eten', 'dieren', 'weer', 'huis', 'mensen', 'tijd', 'natuur', 'reizen'];
    const items = [];
    for (let slot = 1; slot <= 4; slot++) {
        for (let k = 0; k < 4; k++) {
            items.push({
                id: `i${slot}${k}`,
                world: 'volkstuin',
                slot,
                kind: 'noun',
                field: fields[(slot + k) % fields.length],
                level: (k % 3) + 1,
                nl: 'de tuin',
                sv: 'trädgård',
                article: 'en'
            });
        }
    }
    return items;
}

describe('herhaalschema', () => {
    it('gebruikt de tussenpozen 1, 3, 8, 16, 30', () => {
        expect(INTERVALS).toEqual([1, 3, 8, 16, 30]);
        let rec = learn(D0);
        expect(rec.due).toBe(addDays(D0, 1));
        let day = rec.due;
        const gaps = [];
        for (let n = 0; n < 5; n++) {
            rec = review(rec, day, { correct: true });
            gaps.push(Math.round((new Date(rec.due) - new Date(day)) / 86400000));
            day = rec.due;
        }
        expect(gaps).toEqual([3, 8, 16, 30, 30]);
    });

    it('schuift in naar 1, 3, 6, 12 zolang de masterchallenge open staat', () => {
        expect(COMPRESSED_INTERVALS).toEqual([1, 3, 6, 12]);
        let rec = learn(D0, { compressed: true });
        rec = review(rec, rec.due, { correct: true, compressed: true });
        expect(rec.due).toBe(addDays(addDays(D0, 1), 3));
        rec = review(rec, rec.due, { correct: true, compressed: true });
        expect(rec.due).toBe(addDays(addDays(D0, 4), 6));
    });

    it('zet een item na een gemiste herhaling terug naar dag 1', () => {
        let rec = learn(D0);
        rec = review(rec, rec.due, { correct: true });
        rec = review(rec, rec.due, { correct: true });
        const day = rec.due;
        rec = review(rec, day, { correct: false });
        expect(rec.step).toBe(0);
        expect(rec.due).toBe(addDays(day, 1));
    });

    it('telt een item pas als het zit na drie keer goed op drie verschillende dagen', () => {
        let rec = learn(D0);
        rec = review(rec, D0, { correct: true });
        rec = review(rec, D0, { correct: true });
        expect(sits(rec)).toBe(false);
        rec = review(rec, addDays(D0, 1), { correct: true });
        expect(sits(rec)).toBe(false);
        rec = review(rec, addDays(D0, 4), { correct: true });
        expect(sits(rec)).toBe(true);
    });

    it('vaker oefenen op dezelfde dag schuift het schema niet op', () => {
        let rec = learn(D0);
        rec = review(rec, D0, { correct: true });
        expect(rec.step).toBe(0);
        expect(rec.due).toBe(addDays(D0, 1));
    });

    it('geeft achterstallige items eerst', () => {
        const srs = { a: { ...learn(D0), due: '2026-10-05' }, b: { ...learn(D0), due: '2026-10-03' } };
        expect(dueItems(srs, '2026-10-06')).toEqual(['b', 'a']);
    });
});

describe('challenge', () => {
    it('heeft 10 vragen: 4 nieuw elk twee keer en 2 herhaling', () => {
        const items = fakeItems();
        const srs = { i10: learn('2026-09-20'), i11: learn('2026-09-20') };
        const c = buildChallenge({ items, srs, today: D0 });
        expect(c.questions).toHaveLength(10);
        expect(c.newIds).toHaveLength(4);
        for (const id of c.newIds) {
            const qs = c.questions.filter(x => x.itemId === id);
            expect(qs.map(x => x.phase)).toEqual(['card', 'recall']);
            expect(qs[0].guess).toBe(true);
        }
        expect(c.questions.filter(x => x.phase === 'review')).toHaveLength(2);
    });

    it('haalt een nieuw item terug zonder kaart, niet direct na de kaart', () => {
        const c = buildChallenge({ items: fakeItems(), srs: {}, today: D0 });
        for (const id of c.newIds) {
            const card = c.questions.findIndex(x => x.itemId === id && x.phase === 'card');
            const rec = c.questions.findIndex(x => x.itemId === id && x.phase === 'recall');
            expect(rec - card).toBeGreaterThanOrEqual(2);
        }
    });

    it('wordt 3 nieuw en 3 herhaling na een score onder 80 procent', () => {
        const items = fakeItems();
        const srs = { i10: learn('2026-09-20'), i11: learn('2026-09-20'), i12: learn('2026-09-20') };
        const c = buildChallenge({ items, srs, today: D0, lastScore: 0.6 });
        expect(c.newIds).toHaveLength(3);
        expect(c.questions.filter(x => x.phase === 'review')).toHaveLength(3);
        expect(c.questions).toHaveLength(9);
    });

    it('kiest nieuwe items uit verschillende betekenisvelden', () => {
        const items = fakeItems().map(it => ({ ...it, field: it.slot <= 2 ? 'eten' : it.field }));
        const picked = pickNew(items, {}, 4);
        expect(new Set(picked.map(i => i.field)).size).toBe(picked.length);
    });

    it('zet de moeilijkste nieuwe items aan het begin en het eind', () => {
        const items = fakeItems().map((it, i) => ({ ...it, field: `f${i}`, level: [1, 3, 1, 2][i % 4] }));
        const c = buildChallenge({ items, srs: {}, today: D0 });
        const levels = c.newIds.map(id => items.find(i => i.id === id).level);
        expect(levels[0]).toBe(3);
        expect(levels[levels.length - 1]).toBe(2);
    });

    it('laat een gemiste vraag na 3 tot 5 vragen terugkomen', () => {
        const queue = Array.from({ length: 10 }, (_, i) => ({ itemId: `q${i}`, phase: 'recall', mode: 'type' }));
        for (const r of [0, 0.5, 0.99]) {
            const out = reinsert(queue, 2, () => r);
            const back = out.findIndex((x, i) => i > 2 && x.itemId === 'q2');
            expect(back - 2 - 1).toBeGreaterThanOrEqual(3);
            expect(back - 2 - 1).toBeLessThanOrEqual(5);
        }
    });

    it('TNT schuift de vraag naar achteren in plaats van weg', () => {
        const queue = [{ itemId: 'a' }, { itemId: 'b' }, { itemId: 'c' }];
        const out = tnt(queue, 0);
        expect(out.map(x => x.itemId)).toEqual(['b', 'c', 'a']);
    });

    it('masterchallenge: twintig vragen zonder hints of kaart', () => {
        const items = Array.from({ length: 30 }, (_, i) => ({ id: `m${i}`, world: 'camper', kind: 'word' }));
        const srs = Object.fromEntries(items.map(i => [i.id, learn(D0)]));
        const m = buildMaster({ items, srs, world: 'camper', rng: seq([0.3, 0.7]) });
        expect(m.questions).toHaveLength(20);
        expect(m.questions.every(x => x.noHints && x.phase !== 'card')).toBe(true);
    });

    it('score telt alleen ophalen bij de eerste poging', () => {
        const s = score([
            { phase: 'card', ok: true },
            { phase: 'recall', ok: true },
            { phase: 'recall', ok: false },
            { phase: 'recall', ok: true, retry: true },
            { phase: 'review', ok: true, hint: true }
        ]);
        expect(s).toBeCloseTo(1 / 3);
        expect(stars(0.95)).toBe(3);
        expect(stars(0.75)).toBe(2);
        expect(stars(0.2)).toBe(1);
    });
});

describe('nakijken', () => {
    const tuin = { kind: 'noun', sv: 'trädgård', article: 'en', why: 'Trädgård is een en-woord.' };

    it('een woord zonder lidwoord is bijna, niet goed', () => {
        expect(checkAnswer(tuin, 'trädgård')).toEqual({ ok: false, reason: 'lidwoord' });
        expect(checkAnswer(tuin, 'ett trädgård')).toEqual({ ok: false, reason: 'ander-lidwoord' });
        expect(checkAnswer(tuin, 'En trädgård.')).toEqual({ ok: true, reason: null });
    });

    it('herkent ontbrekende å, ä, ö als bijna', () => {
        expect(checkAnswer(tuin, 'en tradgard').reason).toBe('tekens');
    });

    it('bij een gatzin is het woord goed, en de hele zin ook', () => {
        const gap = { kind: 'gap', sv: 'Jacob ___ en vattenkanna.', answer: 'har' };
        expect(checkAnswer(gap, 'har').ok).toBe(true);
        expect(checkAnswer(gap, 'jacob har en vattenkanna').ok).toBe(true);
        expect(checkAnswer(gap, 'Jacob har en vattenkanna.').ok).toBe(true);
        expect(checkAnswer(gap, 'jacob är en vattenkanna').ok).toBe(false);
    });

    it('werkwoorden mogen met of zonder att', () => {
        const vattna = { kind: 'word', sv: 'att vattna' };
        expect(checkAnswer(vattna, 'vattna').ok).toBe(true);
    });

    it('feedback zegt nooit fout', () => {
        for (const reason of ['lidwoord', 'ander-lidwoord', 'tekens', 'typo', 'anders']) {
            expect(nudge(tuin, reason).toLowerCase()).not.toMatch(/\bfout\b/);
        }
    });
});

describe('XP en streak', () => {
    it('geeft geen XP met hint, en het meest voor een herhaling na dagen', () => {
        expect(xpFor({ phase: 'recall' }, { ok: true, hint: true })).toBe(0);
        const late = xpFor({ phase: 'review' }, { ok: true, record: { step: 2 } });
        const early = xpFor({ phase: 'review' }, { ok: true, record: { step: 0 } });
        const fresh = xpFor({ phase: 'recall' }, { ok: true });
        expect(late).toBeGreaterThan(early);
        expect(early).toBeGreaterThan(fresh);
    });

    it('pen op papier geeft dubbele XP', () => {
        expect(xpFor({ phase: 'recall' }, { ok: true, style: 'pen' })).toBe(
            2 * xpFor({ phase: 'recall' }, { ok: true })
        );
    });

    it('één rustdag breekt de streak niet', () => {
        let s = updateStreak(null, D0);
        s = updateStreak(s, addDays(D0, 2));
        expect(s.count).toBe(2);
        s = updateStreak(s, addDays(D0, 6));
        expect(s.count).toBe(1);
        expect(streakDays(s, addDays(D0, 20))).toBe(0);
    });

    it('XP-level loopt op', () => {
        expect(levelFor(0).level).toBe(1);
        expect(levelFor(150).level).toBe(2);
    });
});
