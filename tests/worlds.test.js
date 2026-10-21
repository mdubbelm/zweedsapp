import { describe, it, expect } from 'vitest';
import { WORLDS, CHALLENGES_PER_WORLD, currentWorld, emptyWorldProgress } from '../src/js/kat/worlds.js';
import { worldIndex } from '../src/js/engine/challenge.js';
import { WORLD_ART } from '../src/js/art/worlds.js';
import { ITEMS, RIJTJES } from '../src/js/content/items.js';
import { freshState, merge } from '../src/js/kat/store.js';

describe('werelden zijn compleet', () => {
    it('de leervolgorde volgt de lijst met werelden', () => {
        WORLDS.forEach((w, i) => expect(worldIndex(w.id)).toBe(i));
    });

    it('elke wereld heeft een scène met 11 punten op het pad', () => {
        for (const w of WORLDS) {
            expect(WORLD_ART[w.id], w.id).toBeDefined();
            expect(WORLD_ART[w.id].nodes).toHaveLength(11);
        }
    });

    it('elke wereld heeft 4 items in elke challenge', () => {
        for (const w of WORLDS) {
            for (let slot = 1; slot <= CHALLENGES_PER_WORLD; slot++) {
                const n = ITEMS.filter(it => it.world === w.id && it.slot === slot).length;
                expect(n, `${w.id} challenge ${slot}`).toBe(4);
            }
        }
    });

    it('items en rijtjes horen bij een bestaande wereld', () => {
        const ids = new Set(WORLDS.map(w => w.id));
        expect(ITEMS.filter(it => it.world && !ids.has(it.world)).map(it => it.id)).toEqual([]);
        expect(RIJTJES.filter(r => !ids.has(r.world)).map(r => r.id)).toEqual([]);
    });
});

describe('een nieuwe wereld achteraan', () => {
    it('opgeslagen voortgang van voor de nieuwe wereld loopt door na Amsterdam', () => {
        const done = { stars: Array(8).fill(3), chests: [true, true], master: { stars: 3 } };
        const old = ['volkstuin', 'camper', 'sanktolof', 'malmo', 'amsterdam'];
        const saved = { path: Object.fromEntries(old.map(id => [id, done])) };
        const state = merge(freshState(), saved);
        expect(state.path.vogels).toEqual(emptyWorldProgress());
        expect(currentWorld(state.path)).toBe('vogels');
    });

    it('wie halverwege Amsterdam is, blijft in Amsterdam', () => {
        const done = { stars: Array(8).fill(3), chests: [true, true], master: { stars: 3 } };
        const saved = {
            path: {
                volkstuin: done,
                camper: done,
                sanktolof: done,
                malmo: done,
                amsterdam: { stars: [3, 2], chests: [false, false], master: null }
            }
        };
        expect(currentWorld(merge(freshState(), saved).path)).toBe('amsterdam');
    });
});
