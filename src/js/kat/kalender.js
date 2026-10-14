/**
 * Feestdagenkalender: wat eraan komt, wat er vandaag is en wat dit jaar al
 * geweest is. Elke dag is gewoon speelbaar, ook achteraf: een dag die
 * voorbij is, is nergens "gemist". Per dag staat erbij wat er op tafel komt,
 * en de dagen van Skåne hebben het Skåne-vlaggetje.
 */

import { escapeHtml as esc } from '../utils/helpers.js';
import { buildPackRound } from '../engine/packs.js';
import { scene } from '../art/scenes.js';
import { icon } from './ui/icons.js';
import {
    WEETJE,
    OP_TAFEL,
    calendarFor,
    playablePack,
    shortDate,
    inDaysText,
    svName,
    nlName
} from './feest.js';

/** Het vlaggetje van Skåne: rood met een geel kruis. */
export function skaneFlag(size = 16) {
    return `<svg class="skane-flag" viewBox="0 0 16 11" width="${size}" height="${Math.round((size * 11) / 16)}" aria-hidden="true" focusable="false"><rect width="16" height="11" rx="1.5" fill="#d32f2f"/><path d="M5 0V11M0 5.5H16" stroke="#fcd116" stroke-width="2.2"/></svg>`;
}

/** Skåne-dagen krijgen alleen het vlaggetje in de datumregel, geen extra label. */
function skaneMark(h) {
    return h.category === 'skane'
        ? `<span class="kal-tag skane" role="img" aria-label="Skåne" title="Skåne">${skaneFlag(14)}</span>`
        : '';
}

/**
 * Wat de knop doet, in gewone woorden: hoeveel woorden dit rondje nieuw
 * brengt. Alles al gezien? Dan herhaal je ze.
 */
function playLabel(play, srs) {
    const fresh = buildPackRound(play.pack, srs).newIds.length;
    if (!fresh) {
        return play.questions === 1 ? 'Herhaal 1 woord' : `Herhaal ${play.questions} woorden`;
    }
    return fresh === 1 ? 'Leer 1 nieuw woord' : `Leer ${fresh} nieuwe woorden`;
}

function detail(app, h) {
    // Dicht toont de rij alleen datum, naam en vertaling. Open komen erbij:
    // wat er op tafel komt, het weetje en de knop. Meer niet, zodat de kern
    // (wat is dit, en wat kun je ermee) in één blik te zien is.
    const play = playablePack(h.id, app.state.srs);
    const food = OP_TAFEL[h.id];
    return `<div class="kal-detail" id="kal-d-${esc(h.id)}">
        ${food ? `<p class="kal-food"><span>Op tafel:</span> ${esc(food)}</p>` : ''}
        <p>${esc(WEETJE[h.id] || '')}</p>
        ${
            play
                ? `<button class="btn small kal-go" data-act="play-pack" data-pack="${esc(h.id)}">${icon('play', 16)} ${playLabel(play, app.state.srs || {})}</button>`
                : ''
        }
    </div>`;
}

/** Tot zo ver vooruit tel je dagen af; daarna zegt een datum meer. */
const COUNT_DAYS = 30;

function row(app, e, kind) {
    const h = e.holiday;
    const open = app.ui.kalOpen === h.id;
    // Eén ding op de datumregel: vandaag, een aftelling of een datum.
    let when;
    if (h.approx) {
        when = esc(h.approx);
    } else if (kind === 'today') {
        when = '<b>vandaag</b>';
    } else if (kind === 'past') {
        when = esc(shortDate(e.past));
    } else if (e.inDays <= COUNT_DAYS) {
        when = esc(inDaysText(e.inDays));
    } else {
        when = esc(shortDate(e.date));
    }
    return `<li class="kal-item${open ? ' open' : ''}${kind === 'today' ? ' is-today' : ''}${h.category === 'skane' ? ' is-skane' : ''}">
        <button class="kal-row" data-act="kal-open" data-id="${esc(h.id)}" aria-expanded="${open}" aria-controls="kal-d-${esc(h.id)}">
            <span class="kal-thumb">${scene(h.id, { className: 'kal-thumb-art' })}</span>
            <span class="kal-text">
                <span class="kal-when"><span>${when}</span>${skaneMark(h)}</span>
                <b class="kal-title" lang="sv">${esc(svName(h))}</b>
                <span class="kal-nl">${esc(nlName(h))}</span>
            </span>
            <span class="kal-chev">${icon('chevron', 18)}</span>
        </button>
        ${open ? detail(app, h) : ''}
    </li>`;
}

/** De kalenderpagina. */
export function renderKalender(app) {
    const cal = calendarFor(app.calendarDay());
    const back = app.ui.tab === 'start' ? 'Start' : 'Quests';
    const section = (title, list, kind, hint = '') =>
        list.length
            ? `<h2 class="kal-h">${title}</h2>${hint ? `<p class="kal-hint">${hint}</p>` : ''}<ol class="kal-list">${list.map(e => row(app, e, kind)).join('')}</ol>`
            : '';
    // Wat al geweest is, staat ook (met de datum van volgend jaar) bij Binnenkort;
    // daar laten we alleen zien wat dit jaar nog komt.
    const year = app.calendarDay().slice(0, 4);
    const upcoming = cal.upcoming.filter(e => e.date.slice(0, 4) === year);
    const nextYear = cal.upcoming.filter(
        e => e.date.slice(0, 4) !== year && !cal.past.some(p => p.holiday.id === e.holiday.id)
    );
    return `<main class="page kalender-page">
        <button class="btn soft small" data-act="close-sub" style="justify-self:start">${icon('close', 18)} ${back}</button>
        <h1>Feestdagen in Zweden</h1>
        <p class="lede kal-lede">Wat er gevierd en gegeten wordt.</p>
        ${section('Vandaag', cal.today, 'today')}
        ${section('Binnenkort', upcoming, 'upcoming')}
        ${section('Volgend jaar', nextYear, 'upcoming')}
        ${section('Eerder dit jaar', cal.past, 'past', 'Elke dag blijft speelbaar')}
    </main>`;
}
