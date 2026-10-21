import { describe, it, expect } from 'vitest';
import {
    parseArticle,
    toArticle,
    tokenize,
    safeLink,
    findKnown,
    newMineWord,
    mineItems,
    nextMilestone
} from '../src/js/engine/lezen.js';
import { ITEMS } from '../src/js/content/items.js';
import { freshState, merge } from '../src/js/kat/store.js';
import { sits } from '../src/js/engine/srs.js';

// Zelfgeschreven tekst in de opbouw van een 8 Sidor-bericht: voorleesknop,
// stijlblok, fotoslider met bijschriften en alinea's met korte regels.
const HTML = `<div class="rs_skip rsbtn"><a href="#"><span>Lyssna</span></a></div>
<div id="rspeak_read_1"><style>#gallery-1 { margin: auto; }</style>
<div class='tin-slider-wrapper'><ul class='wp-slides'><li><img src="x.jpg" onerror="alert(1)"><p class="description_text">En bild på en fågel. Foto: Test</p></li></ul></div>
<p>Vi går till fågeltornet.<br />
Det är tidigt på morgonen.<br />
Cleo är tyst.</p>
<p>Vi ser tranor på fältet.<br />
De har kommit från Spanien.</p>
<p>Tranorna dansar <script>alert(2)</script>och ropar.<br />
Många människor vill se dem.<br />
De kommer varje år i april.<br />
Det är vackert att titta på.</p></div>`;

function post(extra = {}) {
    return {
        id: 7,
        date: '2026-10-20T10:00:00',
        link: 'https://8sidor.se/vardags/2026/10/test/',
        title: { rendered: 'Tranor p&aring; f&auml;ltet' },
        excerpt: {
            rendered: '<div class="rs_skip rsbtn"><span>Lyssna</span></div><p>M&aring;nga vill se tranorna.</p>'
        },
        content: { rendered: HTML },
        categories: [925],
        ...extra
    };
}

describe('8 Sidor-bericht inlezen', () => {
    it('houdt alinea’s en korte regels, zonder voorleesknop, stijl of bijschrift', () => {
        const p = parseArticle(HTML);
        expect(p).toHaveLength(3);
        expect(p[0]).toEqual([
            'Vi går till fågeltornet.',
            'Det är tidigt på morgonen.',
            'Cleo är tyst.'
        ]);
        const all = p.flat().join(' ');
        expect(all).not.toMatch(/Lyssna|margin|Foto|alert/);
    });

    it('maakt van een post een artikel met platte titel en veilige link', () => {
        const a = toArticle(post());
        expect(a.title).toBe('Tranor på fältet');
        expect(a.intro).toBe('Många vill se tranorna.');
        expect(a.link).toBe('https://8sidor.se/vardags/2026/10/test/');
        expect(a.date).toBe('2026-10-20');
        expect(a.words).toBeGreaterThan(40);
    });

    it('slaat ingesproken nieuws en te korte berichten over', () => {
        expect(toArticle(post({ categories: [187] }))).toBeNull();
        expect(toArticle(post({ content: { rendered: '<p>Kort.</p>' } }))).toBeNull();
    });

    it('links buiten 8 Sidor worden de voorpagina', () => {
        expect(safeLink('javascript:alert(1)')).toBe('https://8sidor.se/');
        expect(safeLink('https://example.com/')).toBe('https://8sidor.se/');
    });

    it('deelt een regel op in woorden en leestekens', () => {
        const t = tokenize('– Jag är jätterädd, säger Kate.');
        expect(t.filter(x => x.word).map(x => x.t)).toEqual([
            'Jag',
            'är',
            'jätterädd',
            'säger',
            'Kate'
        ]);
        expect(t.map(x => x.t).join('')).toBe('– Jag är jätterädd, säger Kate.');
    });
});

describe('Mijn woorden', () => {
    it('herkent een woord dat al in de leerstof staat, ook zonder en of att', () => {
        expect(findKnown('fågel', ITEMS).id).toBe('vg-n-01');
        expect(findKnown('Höra', ITEMS).id).toBe('vg-w-02');
        expect(findKnown('skjutning', ITEMS)).toBeNull();
    });

    it('een nieuw woord komt morgen terug en telt nog niet als goed', () => {
        const { item, record } = newMineWord(
            {
                sv: 'en skjutning',
                nl: 'een schietpartij',
                title: 'Test',
                link: 'https://8sidor.se/x/'
            },
            '2026-10-21'
        );
        expect(item.id).toBe('mijn-skjutning');
        expect(item.kind).toBe('word');
        expect(record.due).toBe('2026-10-22');
        expect(record.correctDays).toEqual([]);
        expect(sits(record)).toBe(false);
    });

    it('Mijn woorden blijven bewaard bij laden en terugzetten', () => {
        const { item } = newMineWord({ sv: 'ringa', nl: 'ringen' }, '2026-10-21');
        const state = merge(freshState(), { mine: { [item.id]: item } });
        expect(mineItems(state).map(i => i.sv)).toEqual(['ringa']);
        expect(freshState().mine).toEqual({});
    });
});

describe('mijlpalen', () => {
    it('er is altijd een volgende', () => {
        expect(nextMilestone(0)).toMatchObject({ next: 25, left: 25 });
        expect(nextMilestone(160)).toMatchObject({ next: 250, prev: 100, left: 90 });
        expect(nextMilestone(5000).next).toBe(6000);
    });
});
