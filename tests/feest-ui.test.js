import { describe, it, expect, beforeEach } from 'vitest';
import { packById } from '../src/js/content/packs.js';
import { buildPackRound } from '../src/js/engine/packs.js';
import { vandaagHtml } from '../src/js/kat/ui/vandaag.js';
import { renderUitjes } from '../src/js/kat/uitjes.js';
import { renderKalender } from '../src/js/kat/kalender.js';
import { scene, motif, SCENE_IDS } from '../src/js/art/scenes.js';
import { HOLIDAYS } from '../src/js/content/feestdagen.js';
import { OUTINGS } from '../src/js/content/uitjes.js';

/** Een nep-app met precies wat de schermen lezen. */
function fakeApp(day, extra = {}) {
    return {
        calendarDay: () => day,
        state: { srs: {} },
        ui: { tab: 'quests', kalOpen: null, ...extra }
    };
}

function packsIn(html) {
    return [...html.matchAll(/data-pack="([^"]+)"/g)].map(m => m[1]);
}

/** Elke knop met data-pack hoort bij een pakket met een rondje vol vragen. */
function expectPlayable(html) {
    const ids = packsIn(html);
    expect(ids.length).toBeGreaterThan(0);
    for (const id of ids) {
        const pack = packById(id);
        expect(pack, id).not.toBeNull();
        expect(buildPackRound(pack, {}).questions.length, id).toBeGreaterThan(0);
    }
}

describe('vandaag in Zweden op het startscherm', () => {
    it('op 14 oktober een rustige regel: over 17 dagen Alla helgons dag', () => {
        const html = vandaagHtml(fakeApp('2026-10-14'));
        expect(html).toContain('Over 17 dagen');
        expect(html).toContain('Alla helgons dag');
        expect(html).toContain('data-sub="kalender"');
        expect(html).not.toContain('class="vandaag"');
    });

    it('op 13 december een warme regel voor Lucia, zonder eigen speelknop', () => {
        const html = vandaagHtml(fakeApp('2026-12-13'));
        expect(html).toContain('vd-feest');
        expect(html).toContain('Luciadagen');
        expect(html).toContain('data-open="lucia"');
        // Verder blijft de enige grote knop op Start.
        expect(packsIn(html)).toEqual([]);
        // Het rondje zit één tik verder, in de kalender met Lucia open.
        expectPlayable(renderKalender(fakeApp('2026-12-13', { kalOpen: 'lucia' })));
    });

    it('tijdens een markt van meerdere dagen zegt de regel hoe lang hij nog loopt', () => {
        const html = vandaagHtml(fakeApp('2026-07-25'));
        expect(html).toContain('data-open="kiviks-marknad"');
        expect(html).toMatch(/nog 2 dagen|laatste dag/i);
        expectPlayable(renderKalender(fakeApp('2026-07-25', { kalOpen: 'kiviks-marknad' })));
    });
});

describe('uitjes in Österlen', () => {
    it('elk uitje staat erop, met een knop die echt een rondje start', () => {
        const html = renderUitjes(fakeApp('2026-10-14'));
        for (const o of OUTINGS) {
            expect(packsIn(html)).toContain(o.id);
        }
        expectPlayable(html);
    });

    it('de bakker heeft een vitrine met vijf Zweedse broodjes', () => {
        const html = renderUitjes(fakeApp('2026-10-14'));
        for (const b of ['kanelbulle', 'kardemummabulle', 'semla', 'lussekatt', 'vetebröd']) {
            expect(html).toContain(`data-text="${b}"`);
        }
    });
});

describe('feestdagenkalender', () => {
    it('toont wat komt, wat al geweest is, en elke dag is speelbaar', () => {
        const app = fakeApp('2026-10-14');
        const html = renderKalender(app);
        expect(html).toContain('Binnenkort');
        expect(html).toContain('Eerder dit jaar');
        expect(html).toContain('over 17 dagen');
        // Elke feestdag kan opengeklapt worden en heeft dan een rondje.
        for (const h of HOLIDAYS) {
            app.ui.kalOpen = h.id;
            const open = renderKalender(app);
            if (open.includes(`data-id="${h.id}"`)) {
                expect(packsIn(open), h.id).toContain(h.id);
            }
        }
    });

    it('geen spijt-toon bij wat al geweest is', () => {
        const html = renderKalender(fakeApp('2026-12-20')).toLowerCase();
        for (const w of ['gemist', 'te laat', 'verlopen', 'helaas', 'voorbij']) {
            expect(html).not.toContain(w);
        }
    });

    it('Skåne-dagen hebben het vlaggetje', () => {
        const html = renderKalender(fakeApp('2026-10-14'));
        const skane = HOLIDAYS.filter(h => h.category === 'skane').length;
        expect((html.match(/kal-tag skane/g) || []).length).toBe(skane);
    });
});

describe('tekeningen', () => {
    it('elk uitje en elke feestdag heeft een eigen scène zonder id-botsingen', () => {
        for (const o of OUTINGS) {
            expect(SCENE_IDS.outings).toContain(o.id);
        }
        for (const h of HOLIDAYS) {
            expect(SCENE_IDS.feasts).toContain(h.id);
            expect(motif(h.id)).toContain('<svg');
        }
        const all = [...SCENE_IDS.outings, ...SCENE_IDS.feasts].map(id => scene(id)).join('');
        expect(all).not.toMatch(/\sid="/);
    });
});

describe('knoppen in de app', () => {
    let root;
    let app;
    let KatApp;
    beforeEach(async () => {
        // Vite zet dit bij het bouwen; in de test bestaat het niet.
        globalThis.__APP_VERSION__ = 'test';
        ({ KatApp } = await import('../src/js/kat/app.js'));
        window.history.replaceState(null, '', '/zweedsapp/?datum=2026-10-14#start');
        localStorage.clear();
        document.body.innerHTML = '<div id="app"></div>';
        root = document.getElementById('app');
        app = new KatApp(root);
    });

    const click = sel =>
        root.querySelector(sel).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    it('vanaf Start naar de uitjes en weer terug', () => {
        click('[data-act="open-sub"][data-sub="uitjes"]');
        expect(root.textContent).toContain('Uitjes in Österlen');
        click('[data-act="close-sub"]');
        expect(app.ui.sub).toBeNull();
        expect(root.querySelector('.start')).not.toBeNull();
    });

    it('vanaf Start naar de kalender, en een tab-knop sluit hem', () => {
        click('.vd-next');
        expect(root.textContent).toContain('Feestdagen in Zweden');
        click('[data-tab="quests"]');
        expect(app.ui.sub).toBeNull();
        expect(root.textContent).toContain('Quests');
    });

    it('op een feestdag opent de regel op Start de kalender met die dag open', () => {
        window.history.replaceState(null, '', '/zweedsapp/?datum=2026-12-13#start');
        document.body.innerHTML = '<div id="app"></div>';
        root = document.getElementById('app');
        app = new KatApp(root);
        expect(root.querySelectorAll('.start [data-pack]').length).toBe(0);
        click('.vd-feest');
        expect(root.textContent).toContain('Feestdagen in Zweden');
        expect(app.ui.kalOpen).toBe('lucia');
        expect(root.querySelector('[data-pack="lucia"]')).not.toBeNull();
    });

    it('een rij in de kalender klapt open en het rondje start', () => {
        click('[data-tab="quests"]');
        click('[data-act="open-sub"][data-sub="kalender"]');
        expect(root.textContent).toContain('Feestdagen in Zweden');
        click('[data-act="kal-open"][data-id="lucia"]');
        expect(root.querySelector('[data-pack="lucia"]')).not.toBeNull();
        click('[data-pack="lucia"]');
        expect(root.querySelector('.run')).not.toBeNull();
        // Ook het gokje van een feestdag staat in zijn eigen tekening.
        expect(root.querySelector('.pack-run .run-scene svg')).not.toBeNull();
    });

    it('een rondje bij de bakker toont de scène bij het nieuwe woord', () => {
        click('[data-tab="quests"]');
        click('[data-act="open-sub"][data-sub="uitjes"]');
        expect(root.textContent).toContain('Uitjes in Österlen');
        click('[data-pack="bageriet"]');
        click('[data-act="reveal"]');
        expect(root.querySelector('.run-scene svg')).not.toBeNull();
    });
});
