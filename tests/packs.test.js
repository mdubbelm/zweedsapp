import { describe, it, expect } from 'vitest';
import { ITEMS } from '../src/js/content/items.js';
import { OUTINGS } from '../src/js/content/uitjes.js';
import { HOLIDAYS } from '../src/js/content/feestdagen.js';
import { PACK_ITEMS } from '../src/js/content/packs.js';
import { buildPackRound } from '../src/js/engine/packs.js';

const PACKS = [...OUTINGS, ...HOLIDAYS];
const EM_DASH = String.fromCharCode(8212);

/** Alle tekst in een object of lijst, ook diep verstopt. */
function allStrings(value, out = []) {
    if (typeof value === 'string') {
        out.push(value);
    } else if (Array.isArray(value)) {
        value.forEach(v => allStrings(v, out));
    } else if (value && typeof value === 'object') {
        Object.values(value).forEach(v => allStrings(v, out));
    }
    return out;
}

describe('pakketten (uitjes en feestdagen)', () => {
    it('elk pakket heeft minstens 6 items', () => {
        const short = PACKS.filter(p => p.items.length < 6).map(p => `${p.id}: ${p.items.length}`);
        expect(short).toEqual([]);
    });

    it('ids zijn uniek over ITEMS en PACK_ITEMS samen', () => {
        const ids = [...ITEMS, ...PACK_ITEMS].map(i => i.id);
        const dupes = ids.filter((id, n) => ids.indexOf(id) !== n);
        expect(dupes).toEqual([]);
    });

    it('zelfstandige naamwoorden hebben lidwoord, bepaalde vorm en meervoud', () => {
        const bad = PACKS.flatMap(p => p.items)
            .filter(i => i.kind === 'noun' && !(i.article && i.definite && i.plural))
            .map(i => i.id);
        expect(bad).toEqual([]);
        const articles = PACKS.flatMap(p => p.items)
            .filter(i => i.kind === 'noun' && !['en', 'ett'].includes(i.article))
            .map(i => i.id);
        expect(articles).toEqual([]);
    });

    it('gatzinnen hebben ___ in sv en een answer', () => {
        const bad = PACKS.flatMap(p => p.items)
            .filter(i => i.kind === 'gap' && !(i.sv.includes('___') && i.answer))
            .map(i => i.id);
        expect(bad).toEqual([]);
    });

    it('elk item heeft een level van 1 of 2 en een lijst met alternatieven', () => {
        const bad = PACKS.flatMap(p => p.items)
            .filter(i => ![1, 2].includes(i.level) || !Array.isArray(i.accept))
            .map(i => i.id);
        expect(bad).toEqual([]);
    });

    it('nergens een em-dash', () => {
        const hits = PACKS.flatMap(p => allStrings(p).filter(s => s.includes(EM_DASH)).map(s => `${p.id}: ${s.slice(0, 50)}`));
        expect(hits).toEqual([]);
    });
});

describe('een rondje voor een pakket', () => {
    it('begint bij een leeg herhaalschema met 3 nieuwe items en eerst een kaartvraag', () => {
        for (const pack of PACKS) {
            const round = buildPackRound(pack, {}, () => 0.5);
            expect(round.newIds, pack.id).toHaveLength(3);
            expect(round.questions[0].phase, pack.id).toBe('card');
            expect(round.questions[0].itemId).toBe(round.newIds[0]);
            expect(new Set(round.newIds).size).toBe(3);
        }
    });
});
