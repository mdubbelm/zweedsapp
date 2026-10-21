/**
 * Lezen: korte nieuwsberichten in makkelijk Zweeds van 8 Sidor.
 *
 * Tik op een woord: staat het al in de app, dan zie je meteen de betekenis.
 * Zo niet, dan vul je zelf de basisvorm en de betekenis in en komt het woord
 * bij Mijn woorden. Het gaat dan mee in het herhaalschema (Opfrissen, Sprint).
 * Het formulier staat onder de alinea, niet vast onderin: op de iPhone schuift
 * alles wat vast staat mee met het toetsenbord.
 */

import { escapeHtml as esc } from '../utils/helpers.js';
import { ITEMS } from '../content/items.js';
import { PACK_ITEMS } from '../content/packs.js';
import { tokenize, wordKey, findKnown, mineItems, newMineWord } from '../engine/lezen.js';
import { expectedAnswer } from '../engine/check.js';
import { fetchArticles, fetchKlartext, TOPICS, LIGHT } from '../services/lezen.js';
import { WORLDS, currentWorld, worldById } from './worlds.js';
import { icon } from './ui/icons.js';
import { speak } from './ui/speech.js';

function ui(app) {
    app.ui.lezen = app.ui.lezen || {
        topic: 'wereld',
        list: null,
        page: 1,
        loading: false,
        error: false,
        article: null,
        pick: null,
        klartext: undefined
    };
    return app.ui.lezen;
}

function worldTopic(app) {
    const w = worldById(currentWorld(app.state.path)) || WORLDS[0];
    return w.lees ? { id: 'wereld', label: `Over ${w.lees.label}`, search: w.lees.q } : null;
}

function topicQuery(app, id) {
    if (id === 'wereld') {
        const t = worldTopic(app);
        return t ? { categories: LIGHT, search: t.search } : { categories: LIGHT };
    }
    const t = TOPICS.find(x => x.id === id) || TOPICS[0];
    return { categories: t.categories };
}

function rerender(app) {
    if (!app.ui.overlay && app.ui.sub === 'lezen') {
        app.render();
    }
}

async function load(app, { more = false } = {}) {
    const L = ui(app);
    L.loading = true;
    L.error = false;
    const page = more ? L.page + 1 : 1;
    try {
        const res = await fetchArticles({ ...topicQuery(app, L.topic), page });
        L.list = more && L.list ? { ...res, articles: [...L.list.articles, ...res.articles] } : res;
        L.page = page;
    } catch {
        L.error = true;
    }
    L.loading = false;
    rerender(app);
}

async function loadKlartext(app) {
    const L = ui(app);
    if (L.klartext !== undefined) {
        return;
    }
    L.klartext = null;
    L.klartext = await fetchKlartext();
    rerender(app);
}

/** Alle woorden die de app al kent, op hun vergelijkbare vorm. */
function knownMap(app) {
    const map = new Map();
    for (const it of [...ITEMS, ...PACK_ITEMS, ...mineItems(app.state)]) {
        if (it.kind === 'noun' || it.kind === 'word') {
            const key = wordKey(expectedAnswer(it));
            if (!map.has(key)) {
                map.set(key, it);
            }
        }
    }
    return map;
}

const DAY_FMT = new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'short' });
const YEAR_FMT = new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
});

/** "11 sep", of "11 sep 2025" als het niet van dit jaar is. */
function niceDate(day, today) {
    if (!day) {
        return '';
    }
    const fmt = day.slice(0, 4) === String(today).slice(0, 4) ? DAY_FMT : YEAR_FMT;
    return fmt.format(new Date(`${day}T12:00`));
}

function listView(app) {
    const L = ui(app);
    const wt = worldTopic(app);
    const topics = [...(wt ? [wt] : []), ...TOPICS];
    const switcher = `<div class="world-switch lees-topics" role="group" aria-label="Onderwerp">${topics
        .map(
            t =>
                `<button data-act="lees-topic" data-topic="${t.id}" aria-pressed="${t.id === L.topic}">${esc(t.label)}</button>`
        )
        .join('')}</div>`;

    let body;
    if (L.error) {
        body = `<p class="empty">Ophalen lukt nu niet. Lezen werkt alleen met internet. <button class="linkish" data-act="lees-opnieuw">Opnieuw proberen</button></p>`;
    } else if (!L.list) {
        body = `<p class="empty">Even ophalen bij 8 Sidor...</p>`;
    } else if (!L.list.articles.length) {
        body = `<p class="empty">Hier staat nu niets. Kies een ander onderwerp.</p>`;
    } else {
        body = `<div class="list">${L.list.articles
            .map(
                a => `<button class="row lees-row" data-act="lees-open" data-id="${a.id}">
                    <span class="ic">${icon('paper')}</span>
                    <span><h3 lang="sv">${esc(a.title)}</h3><p lang="sv">${esc(a.intro)}</p><p class="lees-meta">${esc(niceDate(a.date, app.today()))} · ${a.words} woorden</p></span>
                    <span class="end">${icon('chevron', 20)}</span>
                </button>`
            )
            .join('')}</div>
            ${L.page < L.list.pages ? `<button class="btn soft" data-act="lees-meer" ${L.loading ? 'disabled' : ''}>${L.loading ? 'Even ophalen...' : 'Meer berichten'}</button>` : ''}`;
    }

    const kt = L.klartext;
    const klartext = kt
        ? `<div class="panel lees-luister">
            <h2>Luisteren</h2>
            <p style="margin:0"><b lang="sv">Klartext</b>, nieuws in makkelijk Zweeds van Sveriges Radio.</p>
            ${kt.description ? `<p class="empty" lang="sv" style="margin:0">${esc(kt.description)}</p>` : ''}
            <a class="btn soft small" href="${esc(kt.url)}" target="_blank" rel="noopener">${icon('headphones', 18)} Luister bij Sveriges Radio</a>
        </div>`
        : '';

    return `${switcher}${body}${klartext}${mineList(app)}`;
}

function mineList(app) {
    const mine = mineItems(app.state).sort((a, b) => (a.added < b.added ? 1 : -1));
    return `<div class="panel lees-mijn">
        <h2>Mijn woorden${mine.length ? ` (${mine.length})` : ''}</h2>
        ${
            mine.length
                ? `<ul class="lees-woorden">${mine
                      .map(
                          it => `<li><span><b lang="sv">${esc(it.sv)}</b> ${esc(it.nl)}</span>
                            <button class="btn soft tiny" data-act="lees-weg" data-id="${esc(it.id)}" aria-label="${esc(it.sv)} weghalen">${icon('trash', 16)}</button></li>`
                      )
                      .join('')}</ul>`
                : '<p class="empty" style="margin:0">Nog leeg. Tik in een bericht op een woord dat je niet kent.</p>'
        }
    </div>`;
}

function pickBlock(app, a, known) {
    const L = ui(app);
    const word = L.pick.word;
    const hit = known.get(wordKey(word));
    const say = `<button type="button" class="btn soft tiny" data-act="lees-zeg" data-text="${esc(hit ? expectedAnswer(hit) : word)}">${icon('speaker', 16)} Uitspreken</button>`;
    const close = `<button type="button" class="btn soft tiny" data-act="lees-sluit">Sluiten</button>`;
    if (hit) {
        let note = 'Dit woord komt nog in Svenska Kat.';
        if (hit.id.startsWith('mijn-')) {
            note = 'Staat al bij Mijn woorden.';
        } else if (app.state.srs[hit.id]) {
            note = 'Dit woord ken je al uit Svenska Kat.';
        }
        return `<div class="lees-pick" lang="nl">
            <p style="margin:0"><b lang="sv">${esc(expectedAnswer(hit))}</b> ${esc(hit.nl)}</p>
            <p class="empty" style="margin:0">${note}</p>
            <div class="lees-pick-acts">${say}${close}</div>
        </div>`;
    }
    const look = `https://en.wiktionary.org/wiki/${encodeURIComponent(word.toLowerCase())}#Swedish`;
    return `<form class="lees-pick" data-form="lees-bewaar" lang="nl">
        <div class="field"><label for="lees-sv">Woord, in de basisvorm</label>
            <input id="lees-sv" name="sv" value="${esc(word.toLowerCase())}" lang="sv" autocomplete="off" autocapitalize="off" spellcheck="false" required></div>
        <p class="empty lees-tip">Staat er een vervoegde vorm, zoals <i lang="sv">skjutningen</i>? Typ dan de basisvorm: <i lang="sv">en skjutning</i>. <a href="${esc(look)}" target="_blank" rel="noopener">Opzoeken in Wiktionary</a></p>
        <div class="field"><label for="lees-nl">Betekenis</label>
            <input id="lees-nl" name="nl" autocomplete="off" required></div>
        <div class="lees-pick-acts"><button class="btn" type="submit">Bewaar</button>${say}${close}</div>
    </form>`;
}

function articleView(app, a) {
    const L = ui(app);
    const known = knownMap(app);
    const paras = a.paragraphs
        .map((lines, pi) => {
            const html = lines
                .map(line =>
                    tokenize(line)
                        .map(tok => {
                            if (!tok.word) {
                                return esc(tok.t);
                            }
                            // Alleen markeren wat je al geoefend hebt.
                            const hit = known.get(wordKey(tok.t));
                            const seen = hit && app.state.srs[hit.id];
                            let cls = '';
                            if (seen) {
                                cls = hit.id.startsWith('mijn-') ? ' mine' : ' known';
                            }
                            const on = L.pick && L.pick.para === pi && L.pick.word === tok.t;
                            return `<button class="lw${cls}${on ? ' on' : ''}" data-act="lees-woord" data-w="${esc(tok.t)}" data-p="${pi}">${esc(tok.t)}</button>`;
                        })
                        .join('')
                )
                .join('<br>');
            const pick = L.pick && L.pick.para === pi ? pickBlock(app, a, known) : '';
            return `<p class="lees-p">${html}</p>${pick}`;
        })
        .join('');
    return `<button class="btn soft small" data-act="lees-terug" style="justify-self:start">${icon('close', 18)} Alle berichten</button>
        <article class="lees-artikel" lang="sv">
            <h1>${esc(a.title)}</h1>
            ${a.intro ? `<p class="lees-intro">${esc(a.intro)}</p>` : ''}
            ${paras}
        </article>
        <p class="empty lees-bron">Bron: <a href="${esc(a.link)}" target="_blank" rel="noopener">8 Sidor</a>. Daar kun je het bericht ook laten voorlezen. De tekst wordt niet bewaard, alleen de woorden die je zelf opslaat.</p>
        <p class="empty" style="margin:0">Onderstreept: woorden die je al kent uit de app. Gestippeld: Mijn woorden.</p>`;
}

/** De pagina (subpagina #lezen, net als de uitjes). */
export function renderLezen(app) {
    const L = ui(app);
    if (!L.list && !L.loading && !L.error) {
        load(app);
    }
    loadKlartext(app);
    const back = app.ui.tab === 'start' ? 'Start' : 'Quests';
    const art = L.article && L.list ? L.list.articles.find(x => x.id === L.article) : null;
    return `<main class="page lezen-page">
        ${art ? '' : `<button class="btn soft small" data-act="close-sub" style="justify-self:start">${icon('close', 18)} ${back}</button>`}
        ${
            art
                ? articleView(app, art)
                : `<h1>Lezen</h1>
            <p class="lede">Korte nieuwsberichten in makkelijk Zweeds, van 8 Sidor. Tik op een woord dat je niet kent en bewaar het. Het komt dan terug bij Opfrissen.</p>
            ${listView(app)}`
        }
    </main>`;
}

/** Knoppen op de Lezen-pagina. */
export function lezenAction(app, act, t) {
    const L = ui(app);
    if (act === 'lees-topic') {
        L.topic = t.dataset.topic;
        L.list = null;
        L.article = null;
        L.pick = null;
        load(app);
        app.render();
    } else if (act === 'lees-opnieuw') {
        load(app);
        app.render();
    } else if (act === 'lees-meer') {
        load(app, { more: true });
        app.render();
    } else if (act === 'lees-open') {
        L.article = Number(t.dataset.id);
        L.pick = null;
        app.render();
        window.scrollTo(0, 0);
    } else if (act === 'lees-terug') {
        L.article = null;
        L.pick = null;
        app.render();
    } else if (act === 'lees-woord') {
        const pick = { word: t.dataset.w, para: Number(t.dataset.p) };
        const same = L.pick && L.pick.word === pick.word && L.pick.para === pick.para;
        L.pick = same ? null : pick;
        app.render();
        const input = app.root.querySelector('#lees-nl');
        if (input) {
            input.focus({ preventScroll: true });
            input.closest('.lees-pick').scrollIntoView({ block: 'nearest' });
        }
    } else if (act === 'lees-sluit') {
        L.pick = null;
        app.render();
    } else if (act === 'lees-zeg') {
        speak(t.dataset.text);
    } else if (act === 'lees-weg') {
        const id = t.dataset.id;
        app.store.update(s => {
            delete s.mine[id];
            delete s.srs[id];
            return s;
        });
        app.toast('Weggehaald bij Mijn woorden.');
    }
}

/** Formulier: een woord bewaren. */
export function lezenSubmit(app, e) {
    e.preventDefault();
    const L = ui(app);
    const data = new window.FormData(e.target);
    const sv = String(data.get('sv') || '').trim();
    const nl = String(data.get('nl') || '').trim();
    if (!sv || !nl) {
        return;
    }
    const hit = findKnown(sv, [...ITEMS, ...PACK_ITEMS, ...mineItems(app.state)]);
    if (hit) {
        app.toast(`Staat al in de app: ${expectedAnswer(hit)}, ${hit.nl}.`);
        return;
    }
    const a = L.list && L.list.articles.find(x => x.id === L.article);
    const { item, record } = newMineWord(
        { sv, nl, title: a ? a.title : '', link: a ? a.link : '' },
        app.today()
    );
    app.store.update(s => {
        s.mine = s.mine || {};
        s.mine[item.id] = item;
        s.srs[item.id] = record;
        return s;
    });
    L.pick = null;
    app.render();
    app.toast('Bewaard. Morgen komt het terug bij Opfrissen.');
}
