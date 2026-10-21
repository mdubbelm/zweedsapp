/**
 * Lezen: artikelen van 8 Sidor omzetten naar leesbare regels, en woorden die
 * je aantikt bewaren als eigen leerstof ("Mijn woorden").
 *
 * De tekst van 8 Sidor wordt alleen tijdens het lezen opgehaald en nooit
 * bewaard. Bewaard worden alleen het woord, jouw betekenis en de link.
 * Alles van buiten wordt als platte tekst behandeld: geparsed met DOMParser
 * (een inerte kopie, laadt geen plaatjes) en daarna alleen textContent.
 */

import { normalize, expectedAnswer } from './check.js';
import { learn } from './srs.js';

export const SOURCE_HOST = 'https://8sidor.se/';

/** Categorie met alleen ingesproken nieuws, zonder tekst. */
const AUDIO_ONLY = 187;
const MIN_WORDS = 40;

/** Voorleesknop (ReadSpeaker), stijl en scripts: nooit meelezen. */
const SKIP = 'style, script, .rs_skip, .rsbtn';

/** Regels per alinea uit de HTML van een artikel. Slaat voorleesknop, stijl en fotobijschriften over. */
export function parseArticle(html, Parser = globalThis.DOMParser) {
    const doc = new Parser().parseFromString(String(html || ''), 'text/html');
    doc.querySelectorAll(`${SKIP}, li, figure, figcaption`).forEach(el => el.remove());

    const paragraphs = [];
    for (const p of doc.querySelectorAll('p')) {
        p.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
        const lines = p.textContent
            .split('\n')
            .map(l => l.replace(/\s+/g, ' ').trim())
            .filter(Boolean);
        if (lines.length) {
            paragraphs.push(lines);
        }
    }
    return paragraphs;
}

/** HTML-entiteiten in een titel of inleiding omzetten naar gewone tekst. */
export function plainText(html, Parser = globalThis.DOMParser) {
    const doc = new Parser().parseFromString(String(html || ''), 'text/html');
    doc.querySelectorAll(SKIP).forEach(el => el.remove());
    return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
}

/** Alleen links naar 8 Sidor zelf. */
export function safeLink(link) {
    return typeof link === 'string' && link.startsWith(SOURCE_HOST) ? link : SOURCE_HOST;
}

/** Een regel opdelen in woorden (aantikbaar) en de rest (leestekens, spaties). */
export function tokenize(line) {
    return (String(line).match(/[\p{L}\p{N}]+(?:[-'][\p{L}\p{N}]+)*|[^\p{L}\p{N}]+/gu) || []).map(
        t => ({ t, word: /^[\p{L}]/u.test(t) })
    );
}

/** Een post van de API omzetten naar een artikel, of null als er te weinig tekst is. */
export function toArticle(post, Parser = globalThis.DOMParser) {
    if (!post || (post.categories || []).includes(AUDIO_ONLY)) {
        return null;
    }
    const paragraphs = parseArticle(post.content && post.content.rendered, Parser);
    const words = paragraphs.flat().join(' ').split(/\s+/).filter(Boolean).length;
    if (words < MIN_WORDS) {
        return null;
    }
    return {
        id: post.id,
        date: String(post.date || '').slice(0, 10),
        title: plainText(post.title && post.title.rendered, Parser),
        intro: plainText(post.excerpt && post.excerpt.rendered, Parser),
        link: safeLink(post.link),
        paragraphs,
        words
    };
}

/** Vergelijkbare vorm: kleine letters, zonder att/en/ett ervoor. */
export function wordKey(text) {
    return normalize(text).replace(/^(att|en|ett) /, '');
}

/** Staat dit woord al in de app (leerstof, uitjes, feestdagen of mijn woorden)? */
export function findKnown(word, items) {
    const key = wordKey(word);
    if (!key) {
        return null;
    }
    return (
        items.find(
            it => ['noun', 'word'].includes(it.kind) && wordKey(expectedAnswer(it)) === key
        ) || null
    );
}

/** Mijn woorden als items, zodat ze meedoen met Opfrissen en de Sprint. */
export function mineItems(state) {
    return Object.values((state && state.mine) || {});
}

export function mineId(sv) {
    return `mijn-${wordKey(sv)
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')}`;
}

/**
 * Een nieuw eigen woord, plus het herhaalrecord: morgen komt het voor het
 * eerst terug. Aantikken telt nog niet als een keer goed.
 */
export function newMineWord({ sv, nl, title, link }, today) {
    const item = {
        id: mineId(sv),
        kind: 'word',
        field: 'mijn',
        nl: String(nl).trim(),
        sv: String(sv).trim(),
        why: title ? `Uit "${title}" op 8 Sidor.` : 'Een woord dat je zelf bewaarde.',
        accept: [],
        source: { title: title || '', link: safeLink(link) },
        added: today
    };
    const record = { ...learn(today), correctDays: [], misses: 0 };
    return { item, record };
}

/** Mijlpalen voor het aantal woorden dat blijft hangen. */
export const MILESTONES = [25, 50, 100, 250, 500, 750, 1000, 1500, 2000, 2500, 3000, 4000, 5000];

export function nextMilestone(count) {
    const next = MILESTONES.find(m => m > count) || Math.ceil((count + 1) / 1000) * 1000;
    const prev = [0, ...MILESTONES].filter(m => m <= count).pop() || 0;
    return {
        next,
        prev,
        left: next - count,
        pct: Math.round(((count - prev) / (next - prev)) * 100)
    };
}
