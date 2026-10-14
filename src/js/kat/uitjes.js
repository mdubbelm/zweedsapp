/**
 * Uitjes in Österlen: overzichtspagina en het beloningsscherm na een rondje.
 *
 * Elk uitje is een plek met een eigen tekening, de Zweedse naam, hoeveel
 * woorden je al gezien hebt en hoe lang het rondje is. De bakker staat
 * bovenaan, met een vitrine van Zweedse broodjes (bullar) om te beluisteren.
 */

import { escapeHtml as esc } from '../utils/helpers.js';
import { OUTINGS } from '../content/uitjes.js';
import { PACK_ITEMS, packById } from '../content/packs.js';
import { buildPackRound } from '../engine/packs.js';
import { sits } from '../engine/srs.js';
import { expectedAnswer } from '../engine/check.js';
import { scene, sceneSky, bun } from '../art/scenes.js';
import { cleo } from '../art/cleo.js';
import { icon } from './ui/icons.js';
import { calendarFor, inDaysText, dayMonth } from './feest.js';

/** Eigen korte zin per uitje (de scene-teksten in de content zijn voor later). */
const BLURB = {
    simrishamn: 'Haven, rookvis en een ijsje. Met de bus of de trein erheen.',
    bageriet:
        'Het ruikt er naar kaneel en kardemom. Bestellen, afrekenen en de broodjes uit elkaar houden.',
    plockstalle: 'Zelf aardbeien plukken, wegen en betalen met Swish.',
    loppis: 'Snuffelen tussen lampen en truien, en een beetje afdingen.',
    kivik: 'Appelbomen, most en de markt bij het water.',
    'ales-stenar': 'Een schip van 59 stenen boven op de klif bij Kåseberga.',
    brosarp: 'Wandelen over de heuvels, tussen de schapen en sleutelbloemen.'
};

/** De vitrine van de bakker. holiday: de dag waarop dit broodje de hoofdrol heeft. */
const BULLAR = [
    { kind: 'kanelbulle', sv: 'kanelbulle', nl: 'met kaneel', holiday: 'kanelbullens-dag' },
    {
        kind: 'kardemummabulle',
        sv: 'kardemummabulle',
        nl: 'met kardemom, vaak geknoopt',
        when: 'Het hele jaar bij de fika'
    },
    { kind: 'semla', sv: 'semla', nl: 'met slagroom en amandelspijs', holiday: 'fettisdagen' },
    { kind: 'lussekatt', sv: 'lussekatt', nl: 'met saffraan', holiday: 'lucia' },
    {
        kind: 'vetebrod',
        sv: 'vetebröd',
        nl: 'het zoete deeg onder de meeste bullar',
        when: 'Ook als vlecht: vetelängd'
    }
];

function knownDots(pack, srs) {
    const dots = pack.items
        .map(it => {
            const rec = srs[it.id];
            return `<i class="${rec ? (sits(rec) ? 'sits' : 'seen') : ''}"></i>`;
        })
        .join('');
    const seen = pack.items.filter(it => srs[it.id]).length;
    const label = seen
        ? `${seen} van ${pack.items.length} woorden al gezien`
        : `${pack.items.length} woorden, nog niets gezien`;
    return `<div class="ut-known"><span class="ut-dots" aria-hidden="true">${dots}</span><span>${label}</span></div>`;
}

function vitrine(day) {
    const cal = calendarFor(day);
    const when = b => {
        if (b.when) {
            return b.when;
        }
        const all = [...cal.today, ...cal.upcoming];
        const e = all.find(x => x.holiday.id === b.holiday);
        if (!e) {
            return '';
        }
        if (e.inDays === 0) {
            return 'Vandaag is het zijn dag';
        }
        // Dichtbij: aftellen. Verder weg: gewoon de datum, zonder lange telling.
        return e.inDays <= 45
            ? `Eigen dag ${inDaysText(e.inDays)}`
            : `Eigen dag: ${dayMonth(e.date)}`;
    };
    return `<div class="bullar" aria-label="Zweedse broodjes">${BULLAR.map(
        b => `<button class="bulle" data-act="say" data-text="${esc(b.sv)}" aria-label="${esc(b.sv)}, ${esc(b.nl)}. Tik om te horen.">
            <span class="bulle-art">${bun(b.kind, 64)}</span>
            <span class="bulle-sv" lang="sv">${esc(b.sv).replace('mumma', 'mumma&shy;')}</span>
            <span class="bulle-nl">${esc(b.nl)}</span>
            <span class="bulle-when">${esc(when(b))}</span>
        </button>`
    ).join('')}</div>`;
}

function card(app, outing, featured) {
    const pack = packById(outing.id);
    const srs = app.state.srs;
    const n = buildPackRound(pack, srs).questions.length;
    return `<article class="uitje${featured ? ' featured' : ''}" aria-labelledby="ut-${outing.id}">
        <div class="ut-art">${scene(outing.id)}</div>
        <div class="ut-body">
            <h2 id="ut-${outing.id}">${esc(outing.title)}</h2>
            <p class="ut-sv" lang="sv">${esc(outing.sv)}</p>
            <p class="ut-blurb">${esc(BLURB[outing.id] || '')}</p>
            ${knownDots(pack, srs)}
            <button class="btn small ut-go" data-act="play-pack" data-pack="${esc(outing.id)}">${icon('play', 16)} Start <span class="vd-len">${n} vragen</span></button>
            ${featured ? vitrine(app.calendarDay()) : ''}
        </div>
    </article>`;
}

/** De overzichtspagina. */
export function renderUitjes(app) {
    const back = app.ui.tab === 'start' ? 'Start' : 'Quests';
    const bakery = OUTINGS.find(o => o.id === 'bageriet');
    const rest = OUTINGS.filter(o => o.id !== 'bageriet');
    return `<main class="page uitjes-page">
        <button class="btn soft small" data-act="close-sub" style="justify-self:start">${icon('close', 18)} ${back}</button>
        <h1>Uitjes in Österlen</h1>
        <p class="lede">Plekken om de hoek, elk met een kort rondje. De woorden komen daarna vanzelf terug bij Opfrissen.</p>
        ${card(app, bakery, true)}
        <div class="uitjes-grid">${rest.map(o => card(app, o, false)).join('')}</div>
    </main>`;
}

/**
 * Beloning na een rondje van een uitje of feestdag: de scène, wat je nu
 * kunt en de woorden die nieuw waren.
 */
export function packReward(r, star) {
    const pack = packById(r.pack);
    const byId = new Map(PACK_ITEMS.map(i => [i.id, i]));
    const fresh = (r.newIds || []).map(id => byId.get(id)).filter(Boolean);
    const list = fresh.length
        ? `<ul class="pr-new" aria-label="Nieuw">${fresh
              .map(
                  it =>
                      `<li><b lang="sv">${esc(expectedAnswer(it))}</b><span>${esc(it.kind === 'form' ? it.prompt : it.nl)}</span></li>`
              )
              .join('')}</ul>`
        : '';
    const title = pack.title.replace(/\s*\(.*\)\s*$/, '');
    return {
        sky: sceneSky(pack.id),
        art: `<div class="pr-art">${scene(pack.id)}<span class="pr-cleo">${cleo('happy', 92)}</span></div>`,
        head: esc(title),
        body: `<div class="bigstars">${[0, 1, 2].map(k => `<span>${star(k < r.result.stars, k === 1 ? 46 : 36)}</span>`).join('')}</div>
            <p class="pr-can">${esc(pack.canNow || `Nu kun je woorden en zinnen over ${title} gebruiken.`)}</p>
            ${list}
            <p class="muted">${fresh.length ? 'De nieuwe woorden komen de komende dagen terug bij Opfrissen.' : 'Lekker opgefrist.'}</p>`
    };
}
