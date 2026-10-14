/**
 * "Vandaag in Zweden" op het startscherm.
 *
 * Eén smalle regel onder de kaart van de wereld, op de vaste kop boven de
 * tuin: nooit over de tuin heen en nooit met iets dat er half uit steekt.
 * Links een rond plaatje van de dag, daarnaast twee korte regels (wanneer,
 * en de Zweedse naam, die nooit wordt afgekapt) en een pijltje.
 * Is het vandaag een feestdag of loopt er een markt, dan krijgt de regel
 * een zachte kleur van die dag; op een gewone dag is hij kaal en zegt hij
 * wat eraan komt. Op een paar feestdagen draagt Cleo ook iets van die dag,
 * in de Vandaag-kaart en op de kaart van het pad.
 * Beide openen de kalender, op een feestdag met die dag al opengeklapt.
 * Er staat hier bewust geen speelknop: Verder blijft de enige grote knop
 * en de kaart van het pad blijft in beeld.
 */

import { escapeHtml as esc } from '../../utils/helpers.js';
import { daysBetween } from '../../engine/dates.js';
import { motif } from '../../art/scenes.js';
import { icon } from './icons.js';
import { WEETJE, calendarFor, svName, nlName, inDaysText } from '../feest.js';

/** Wat Cleo op de dag zelf draagt of bij zich heeft (zie art/cleo.js). */
const OUTFIT = {
    lucia: 'lichtkroon',
    fettisdagen: 'semla',
    midsommarafton: 'krans',
    'kanelbullens-dag': 'kanelbulle',
    julafton: 'tomteluva',
    valborgsmassoafton: 'vuurtje'
};

/** Kleur van de strook per feestdag; de rest krijgt de gewone warme kleur. */
const TINT = {
    lucia: 'lucia',
    'forsta-advent': 'lucia',
    'alla-helgons-dag': 'lucia',
    julafton: 'jul',
    nyarsafton: 'jul',
    nyarsdagen: 'jul',
    'trettondedag-jul': 'jul',
    'tjugondedag-knut': 'jul',
    midsommarafton: 'zomer',
    nationaldagen: 'zomer',
    olsmassa: 'zomer',
    paskafton: 'zomer',
    paskdagen: 'zomer',
    skartorsdagen: 'zomer',
    'mors-dag': 'zomer',
    valborgsmassoafton: 'vuur',
    kraftpremiar: 'vuur'
};

/** Opties voor cleo(): op een feestdag met iets van die dag, anders leeg. */
export function cleoOutfit(app) {
    const hit = calendarFor(app.calendarDay()).today.find(e => OUTFIT[e.holiday.id]);
    return hit ? { wear: OUTFIT[hit.holiday.id] } : {};
}

function feastLine(app, entry, others) {
    const h = entry.holiday;
    const span = h.span || 1;
    const left = span - daysBetween(entry.date, app.calendarDay());
    // Bij een markt van meerdere dagen kort houden, zodat het op één regel past.
    const kicker =
        span > 1 ? (left === 1 ? 'Laatste dag' : `Nog ${left} dagen`) : 'Vandaag in Zweden';
    const more = others.length ? `<span class="vd-more">+${others.length}</span>` : '';
    const also = others.length
        ? ` Ook vandaag: ${others.map(o => svName(o.holiday)).join(', ')}.`
        : '';
    const label = `${span > 1 ? `Nu in Zweden, ${kicker.toLowerCase()}` : kicker}: ${svName(h)}, ${nlName(h)}. ${WEETJE[h.id] || ''}${also} Opent de kalender.`;
    return `<button class="vd-line vd-feest" data-tint="${TINT[h.id] || 'warm'}" data-act="open-sub" data-sub="kalender" data-open="${esc(h.id)}" aria-label="${esc(label)}">
        <span class="vd-badge">${motif(h.id, 34)}</span>
        <span class="vd-text"><span class="vd-kick">${esc(kicker)}</span><b lang="sv">${esc(svName(h))}</b></span>
        ${more}${icon('chevron', 18)}
    </button>`;
}

function nextLine(entry) {
    const h = entry.holiday;
    return `<button class="vd-line vd-next" data-act="open-sub" data-sub="kalender" aria-label="Feestdagenkalender. ${esc(h.approx || inDaysText(entry.inDays))}: ${esc(svName(h))}, ${esc(nlName(h))}">
        <span class="vd-badge">${motif(h.id, 34)}</span>
        <span class="vd-text"><span class="vd-kick">${esc(h.approx || inDaysText(entry.inDays)).replace(/^./, c => c.toUpperCase())}</span><b lang="sv">${esc(svName(h))}</b></span>
        ${icon('chevron', 18)}
    </button>`;
}

/** HTML voor het startscherm: de regel van vandaag of wat eraan komt. */
export function vandaagHtml(app) {
    const cal = calendarFor(app.calendarDay());
    if (cal.today.length) {
        // Een dag van één dag (Kanelbullens dag) gaat voor een markt die al loopt.
        const today = [...cal.today].sort((x, y) => (x.holiday.span || 1) - (y.holiday.span || 1));
        const [first, ...others] = today;
        return feastLine(app, first, others);
    }
    return cal.upcoming.length ? nextLine(cal.upcoming[0]) : '';
}

/**
 * Zet elk plaatje in een rond badge strak om zijn eigen tekening, zodat een
 * lage kaars net zo groot en midden in beeld staat als een hoge kerstboom.
 * Draait na het tekenen van Start; zonder getBBox (tests) blijft alles staan.
 */
export function fitBadges(root) {
    for (const svg of root.querySelectorAll('.vd-badge svg')) {
        if (typeof svg.getBBox !== 'function') {
            return;
        }
        const b = svg.getBBox();
        if (!b.width || !b.height) {
            continue;
        }
        const size = Math.max(b.width, b.height) * 1.06;
        const x = b.x + b.width / 2 - size / 2;
        const y = b.y + b.height / 2 - size / 2;
        svg.setAttribute('viewBox', `${x} ${y} ${size} ${size}`);
    }
}

/** Kleine knop naar de uitjes, naast de chips bovenaan. */
export function uitjesChip() {
    return `<button class="chip chip-link" data-act="open-sub" data-sub="uitjes">${icon('map', 18)}Uitjes</button>`;
}
