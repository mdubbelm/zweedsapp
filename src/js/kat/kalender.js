/**
 * Feestdagenkalender: wat eraan komt, wat er vandaag is en wat dit jaar al
 * geweest is. Elke dag is gewoon speelbaar, ook achteraf: een dag die
 * voorbij is, is nergens "gemist". Per dag staat erbij wat er op tafel komt,
 * en de dagen van Skåne hebben het Skåne-vlaggetje.
 */

import { escapeHtml as esc } from '../utils/helpers.js';
import { holidayDate } from '../engine/holidays.js';
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

function tags(h) {
    const t = [];
    if (h.category === 'skane') {
        t.push(`<span class="kal-tag skane">${skaneFlag(14)} Skåne</span>`);
    }
    if (h.category === 'bakdag') {
        t.push('<span class="kal-tag">Bakdag</span>');
    }
    return t.join('');
}

function detail(app, h) {
    // De tekening en wat er op tafel komt staan al in de kop van de rij,
    // dus open komt er alleen het weetje en het rondje bij.
    const play = playablePack(h.id, app.state.srs);
    return `<div class="kal-detail" id="kal-d-${esc(h.id)}">
        <p>${esc(WEETJE[h.id] || '')}</p>
        ${
            play
                ? `<div class="kal-play"><button class="btn small" data-act="play-pack" data-pack="${esc(h.id)}">${icon('play', 16)} Speel het rondje <span class="vd-len">${play.questions} vragen</span></button>
                   <span class="kal-seen">${play.seen ? `${play.seen} van ${play.pack.items.length} woorden al gezien` : `${play.pack.items.length} woorden, nog niets gezien`}</span></div>`
                : ''
        }
    </div>`;
}

function row(app, e, kind) {
    const h = e.holiday;
    const open = app.ui.kalOpen === h.id;
    const food = OP_TAFEL[h.id];
    let when;
    if (kind === 'today') {
        when = `<b>vandaag</b> · ${esc(shortDate(e.date))}`;
    } else if (kind === 'past') {
        const next = holidayDate(h, Number(e.past.slice(0, 4)) + 1);
        when = `${esc(shortDate(e.past))}${next ? ` · weer op ${esc(shortDate(next))}` : ''}`;
    } else {
        when = `<b>${esc(inDaysText(e.inDays))}</b> · ${esc(shortDate(e.date))}`;
    }
    return `<li class="kal-item${open ? ' open' : ''}${kind === 'today' ? ' is-today' : ''}${h.category === 'skane' ? ' is-skane' : ''}">
        <button class="kal-row" data-act="kal-open" data-id="${esc(h.id)}" aria-expanded="${open}" aria-controls="kal-d-${esc(h.id)}">
            <span class="kal-thumb">${scene(h.id, { className: 'kal-thumb-art' })}</span>
            <span class="kal-text">
                <span class="kal-when">${when}</span>
                <b class="kal-title" lang="sv">${esc(svName(h))}</b>
                <span class="kal-sub"><small class="kal-nl">${esc(nlName(h))}</small>${tags(h)}</span>
                ${food ? `<span class="kal-food">${esc(food)}</span>` : ''}
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
