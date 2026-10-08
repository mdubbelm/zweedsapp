import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { ITEMS, RIJTJES } from '../src/js/content/items.js';

// Woorden die op het scherm een slecht gevoel geven of naar school ruiken.
const FORBIDDEN = [
    'fout',
    'fouten',
    'moet',
    'moeten',
    'dagdoel',
    'toets',
    'proefwerk',
    'huiswerk',
    'overslaan',
    'leaderboard',
    'ranglijst',
    'les',
    'lektion'
];

function stripComments(code) {
    return code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
}

function uiSources() {
    const dir = join(__dirname, '../src/js/kat');
    const files = [];
    const walk = d => {
        for (const e of readdirSync(d, { withFileTypes: true })) {
            const p = join(d, e.name);
            if (e.isDirectory()) {
                walk(p);
            } else if (p.endsWith('.js')) {
                files.push(p);
            }
        }
    };
    walk(dir);
    return files;
}

/** Alleen tekst tussen quotes of backticks telt als schermtekst. */
function strings(code) {
    return [...code.matchAll(/'([^'\n]*)'|`([^`]*)`/g)].map(m => m[1] ?? m[2]);
}

describe('woorden met een goed gevoel', () => {
    it('schermteksten bevatten geen school- of faalwoorden', () => {
        const hits = [];
        for (const file of uiSources()) {
            for (const s of strings(stripComments(readFileSync(file, 'utf8')))) {
                for (const w of FORBIDDEN) {
                    if (new RegExp(`(^|[^a-zà-ÿ])${w}([^a-zà-ÿ]|$)`, 'i').test(s.replace(/<[^>]+>/g, ' '))) {
                        hits.push(`${file.split('/src/')[1]}: "${w}" in ${s.slice(0, 60)}`);
                    }
                }
            }
        }
        expect(hits).toEqual([]);
    });

    it('de Nederlandse kant van de leerstof bevat geen faalwoorden', () => {
        const hits = [];
        for (const it of ITEMS) {
            for (const text of [it.why, it.nl, it.prompt].filter(Boolean)) {
                for (const w of ['fout', 'toets', 'huiswerk', 'dagdoel']) {
                    if (new RegExp(`\\b${w}\\b`, 'i').test(text)) {
                        hits.push(`${it.id}: ${w}`);
                    }
                }
            }
        }
        expect(hits).toEqual([]);
    });

    it('nergens een em-dash', () => {
        const texts = [
            ...uiSources().map(f => readFileSync(f, 'utf8')),
            JSON.stringify(ITEMS),
            JSON.stringify(RIJTJES)
        ];
        expect(texts.some(t => t.includes('—'))).toBe(false);
    });
});

describe('leerstof', () => {
    it('elk zelfstandig naamwoord heeft en of ett', () => {
        const bad = ITEMS.filter(i => i.kind === 'noun' && !['en', 'ett'].includes(i.article));
        expect(bad.map(i => i.id)).toEqual([]);
    });

    it('vier nieuwe items per challenge, elk uit een ander betekenisveld', () => {
        const slots = {};
        for (const it of ITEMS) {
            (slots[`${it.world}:${it.slot}`] ||= []).push(it.field);
        }
        const bad = Object.entries(slots).filter(([, f]) => f.length !== 4 || new Set(f).size !== 4);
        expect(bad).toEqual([]);
    });

    it('elke bouwer-zin is precies de som van zijn stukjes', () => {
        const bad = ITEMS.filter(i => i.kind === 'builder' && i.pieces.join(' ') !== i.sv);
        expect(bad.map(i => i.id)).toEqual([]);
    });
});
