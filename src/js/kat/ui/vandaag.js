/**
 * "Vandaag in Zweden" op het startscherm.
 *
 * Eén regel onder de kaart van de wereld. Is het vandaag een feestdag of
 * loopt er een markt, dan een warme strook met het motief en de naam; anders
 * een rustige regel met wat eraan komt. Beide openen de kalender, op een
 * feestdag met die dag al opengeklapt (tekening, weetje, het rondje).
 * Er staat hier bewust geen speelknop: Verder blijft de enige grote knop
 * en de kaart van het pad blijft in beeld.
 */

import { escapeHtml as esc } from '../../utils/helpers.js';
import { daysBetween } from '../../engine/dates.js';
import { motif } from '../../art/scenes.js';
import { icon } from './icons.js';
import { WEETJE, calendarFor, svName, nlName, inDaysText } from '../feest.js';

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
    return `<button class="vd-next vd-feest" data-act="open-sub" data-sub="kalender" data-open="${esc(h.id)}" aria-label="${esc(label)}">
        <span class="vd-motif">${motif(h.id, 36)}</span>
        <span class="vd-next-text"><span class="vd-kick">${esc(kicker)}:</span> <b lang="sv">${esc(svName(h))}</b>${more}</span>
        ${icon('chevron', 18)}
    </button>`;
}

function nextLine(entry) {
    const h = entry.holiday;
    return `<button class="vd-next" data-act="open-sub" data-sub="kalender" aria-label="Feestdagenkalender. ${esc(inDaysText(entry.inDays))}: ${esc(svName(h))}, ${esc(nlName(h))}">
        <span class="vd-motif">${motif(h.id, 30)}</span>
        <span class="vd-next-text">${esc(inDaysText(entry.inDays)).replace(/^./, c => c.toUpperCase())}: <b lang="sv">${esc(svName(h))}</b></span>
        ${icon('chevron', 18)}
    </button>`;
}

/** HTML voor het startscherm: de feeststrook of de rustige regel. */
export function vandaagHtml(app) {
    const cal = calendarFor(app.calendarDay());
    if (cal.today.length) {
        const [first, ...others] = cal.today;
        return feastLine(app, first, others);
    }
    return cal.upcoming.length ? nextLine(cal.upcoming[0]) : '';
}

/** Kleine knop naar de uitjes, naast de chips bovenaan. */
export function uitjesChip() {
    return `<button class="chip chip-link" data-act="open-sub" data-sub="uitjes">${icon('map', 18)}Uitjes</button>`;
}
