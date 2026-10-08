/**
 * Het vraagscherm. Kaal: vraag, invoerveld, klaar. Geen Cleo en geen
 * meldingen tijdens een vraag; die komen pas bij de beloning.
 */

import { escapeHtml as esc } from '../utils/helpers.js';
import { checkAnswer, expectedAnswer, filledSentence, nudge, normalize } from '../engine/check.js';
import { current, isDone, progress, answer, blowUp, finish } from './session.js';
import { icon, MODES } from './ui/icons.js';
import { speak } from './ui/speech.js';
import { shuffle } from '../engine/challenge.js';

const PRAISE = ['Goed zo!', 'Precies.', 'Ja, raak!', 'Snyggt!', 'Klopt helemaal.'];

function articleClass(item) {
    return item.kind === 'noun' ? `art-${item.article}` : '';
}

function hintFor(text) {
    return text
        .split(' ')
        .map(w => (w.length <= 1 ? w : w[0] + '·'.repeat(w.length - 1)))
        .join(' ');
}

/** Wat er op de kaart staat bij het eerste kennismaken. */
function cardHtml(item) {
    const exp = expectedAnswer(item);
    let sub = '';
    if (item.kind === 'noun') {
        sub = [item.definite, item.plural].filter(Boolean).map(esc).join(' · ');
    } else if (item.forms) {
        sub = [item.forms.presens, item.forms.preteritum, item.forms.supinum]
            .filter(Boolean)
            .map(esc)
            .join(' · ');
    }
    let main = `<span class="${articleClass(item)}">${esc(exp)}</span>`;
    if (item.kind === 'gap') {
        main = esc(item.sv).replace('___', `<u class="art-en">${esc(item.answer)}</u>`);
    }
    const nl = item.kind === 'form' ? item.prompt : item.nl;
    return `<div class="wordcard">
        <div class="sv">${main}</div>
        <button class="say" data-say="${esc(item.kind === 'gap' ? item.sv.replace('___', item.answer) : exp)}" aria-label="Uitspreken">${icon('speaker')}</button>
        ${sub ? `<div class="sub">${sub}</div>` : ''}
        <div class="nl">${esc(nl || '')}</div>
    </div>`;
}

export class RunScreen {
    /**
     * @param {HTMLElement} root
     * @param {object} opts
     */
    constructor(root, { session, items, store, onExit, onFinish }) {
        this.root = root;
        this.session = session;
        this.items = new Map(items.map(i => [i.id, i]));
        this.store = store;
        this.onExit = onExit;
        this.onFinish = onFinish;
        this.step = 'ask';
        this.local = {};
        this.root.addEventListener('click', e => this.onClick(e));
        this.root.addEventListener('keydown', e => this.onKey(e));
        this.root.addEventListener('input', e => {
            if (e.target.matches('[data-answer]')) {
                this.local.value = e.target.value;
                this.syncCheck();
            }
        });
        this.render();
    }

    get q() {
        return current(this.session);
    }

    get item() {
        return this.items.get(this.q.itemId);
    }

    mode() {
        if (this.q.phase === 'card' && this.q.guess && this.step === 'guess') {
            return 'guess';
        }
        if (this.q.mode === 'type' && this.item.kind === 'silly') {
            return 'silly';
        }
        return this.q.mode;
    }

    begin() {
        this.local = { hint: false, picked: [], pool: null, tf: null, penShown: false };
        this.step = this.q.phase === 'card' && this.q.guess ? 'guess' : 'ask';
        if (this.q.mode === 'builder') {
            this.local.pool = shuffle(this.item.pieces.map((p, i) => ({ p, i })));
        }
    }

    render() {
        if (isDone(this.session)) {
            this.onFinish(finish(this.session));
            return;
        }
        if (this.step === 'ask' && !this.local.started) {
            this.begin();
            this.local.started = true;
        }
        const m = MODES[this.mode()] || MODES.type;
        const pct = Math.round(progress(this.session) * 100);
        this.root.innerHTML = `<section class="run" aria-label="Challenge">
            <div class="run-top">
                <button class="x" data-act="exit" aria-label="Stoppen">${icon('close')}</button>
                <div class="bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div>
            </div>
            <div class="run-body tnt-wrap">
                <div class="mode">${icon(m.icon, 20)} ${m.label}</div>
                <div class="tnt-target">${this.bodyHtml()}</div>
            </div>
            ${this.footHtml()}
        </section>`;
        const input = this.root.querySelector('[data-answer]');
        if (input && this.step !== 'feedback') {
            input.focus({ preventScroll: true });
        }
        if (this.mode() === 'listen' && this.step === 'ask' && !this.local.played) {
            this.local.played = true;
            this.say(expectedAnswer(this.item));
        }
    }

    bodyHtml() {
        const it = this.item;
        const mode = this.mode();
        const exp = expectedAnswer(it);
        const typeBox = (ph = 'Typ hier') =>
            `<input class="answer" data-answer autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" lang="sv" placeholder="${ph}" aria-label="Je antwoord" ${this.step === 'feedback' ? 'disabled' : ''} value="${esc(this.local.value || '')}">`;
        const keys = `<div class="keys">${['å', 'ä', 'ö']
            .map(k => `<button class="pill" data-key="${k}" aria-label="Typ ${k}">${k}</button>`)
            .join('')}</div>`;
        const hint = this.local.hint
            ? `<p class="guess-note">Hint: <b>${esc(hintFor(exp))}</b></p>`
            : '';

        if (mode === 'guess') {
            return `<div class="prompt"><h1>${esc(it.kind === 'form' ? it.prompt : it.nl)}</h1>
                <p>Gokje: wat zou het in het Zweeds zijn? Raden mag, het telt niet.</p></div>
                ${typeBox('Gok maar')}${keys}`;
        }
        if (mode === 'card') {
            return `<div class="prompt"><h1>Typ het na.</h1><p>Nieuw voor Cleo en jou.</p></div>
                ${this.local.guessed ? `<p class="guess-note">${this.local.guessed}</p>` : ''}
                ${cardHtml(it)}${typeBox()}${keys}`;
        }
        if (mode === 'listen') {
            return `<div class="prompt"><h1>Geheim bericht.</h1><p>Luister en typ wat je hoort.</p></div>
                <button class="say big" data-say="${esc(exp)}" aria-label="Nog een keer afspelen">${icon('speaker', 40)}</button>
                ${typeBox()}${keys}${hint}`;
        }
        if (mode === 'gap') {
            const field = `<input data-answer autocomplete="off" autocapitalize="off" spellcheck="false" lang="sv" aria-label="Het ontbrekende woord" ${this.step === 'feedback' ? 'disabled' : ''} value="${esc(this.local.value || '')}">`;
            return `<div class="prompt"><h1>Vul het gat.</h1><p>${esc(it.nl)}</p></div>
                <p class="gapline">${esc(it.sv).replace('___', field)}</p>${keys}${hint}`;
        }
        if (mode === 'form') {
            return `<div class="prompt"><h1>${esc(it.prompt)}</h1><p>Welke vorm hoort hierbij?</p></div>
                ${typeBox()}${keys}${hint}`;
        }
        if (mode === 'builder') {
            const picked = this.local.picked.map(
                (x, n) => `<button class="piece" data-unpick="${n}">${esc(x.p)}</button>`
            );
            const pool = this.local.pool
                .filter(x => !this.local.picked.includes(x))
                .map(x => `<button class="piece" data-pick="${x.i}">${esc(x.p)}</button>`);
            const ready = this.local.picked.length === it.pieces.length;
            return `<div class="prompt"><h1>${esc(it.nl)}</h1><p>Zet de stukjes op volgorde${ready ? ' en typ dan de hele zin' : ''}.</p></div>
                <div class="pieces target" aria-label="Jouw zin">${picked.join('')}</div>
                <div class="pieces" aria-label="Stukjes">${pool.join('')}</div>
                ${ready ? typeBox('Typ de hele zin') + keys : ''}${hint}`;
        }
        if (mode === 'truefalse') {
            const choose =
                this.local.tf === null
                    ? `<div class="verdict"><button class="btn soft" data-tf="1">Sant</button><button class="btn soft" data-tf="0">Falskt</button></div>`
                    : '';
            const fix =
                this.local.tf === false && !it.isTrue
                    ? `<p class="guess-note">Typ de zin zoals hij wel klopt.</p>${typeBox()}${keys}`
                    : '';
            return `<div class="prompt"><h1>${esc(it.sv)}</h1><p>Klopt dit? Sant (waar) of falskt (niet waar).</p></div>
                <button class="say" data-say="${esc(it.sv)}" aria-label="Uitspreken">${icon('speaker')}</button>
                ${choose}${fix}`;
        }
        if (mode === 'pen') {
            return `<div class="prompt"><h1>${esc(it.kind === 'form' ? it.prompt : it.nl)}</h1>
                <p>Schrijf het op papier, met de hand. Daarna kijk je zelf na.</p></div>
                ${this.local.penShown ? cardHtml(it) : ''}`;
        }
        // type en silly
        const title =
            mode === 'silly' ? 'Rare zin. Hoe zeg je dit?' : 'Hoe zeg je dit in het Zweeds?';
        return `<div class="prompt"><p>${title}</p><h1>${esc(it.nl)}</h1></div>${typeBox()}${keys}${hint}`;
    }

    footHtml() {
        if (this.step === 'feedback') {
            const f = this.local.feedback;
            if (f.ok) {
                return `<div class="feedback good" role="status">
                    <h2>${f.praise}</h2>
                    ${f.xp ? `<p>+${f.xp} XP</p>` : ''}
                    <button class="btn wide" data-act="next">Verder</button>
                </div>`;
            }
            return `<div class="feedback almost" role="status">
                <h2>Bijna.</h2>
                <p class="answer-line">Het is: ${f.correctHtml}</p>
                ${f.nudge ? `<p>${esc(f.nudge)}</p>` : ''}
                ${this.item.why && f.nudge !== this.item.why ? (this.local.showWhy ? `<p>${esc(this.item.why)}</p>` : '<button class="why" data-act="why">Waarom?</button>') : ''}
                <button class="btn wide" data-act="next">Verder</button>
            </div>`;
        }
        const mode = this.mode();
        const noHints = this.q.noHints || this.q.phase === 'card';
        const tnt = this.store.get().tnt;
        const aids = `<div class="aids">
            ${noHints || mode === 'guess' ? '' : `<button class="pill" data-act="hint" ${this.local.hint ? 'disabled' : ''}>Hint</button>`}
            ${mode === 'guess' ? '' : `<button class="pill" data-act="tnt" ${tnt > 0 ? '' : 'disabled'} aria-label="Van tafel: Cleo tikt de vraag weg, hij komt later terug">${icon('paw', 18)} Van tafel <small>×${tnt}</small></button>`}
        </div>`;
        let main;
        if (mode === 'guess') {
            main = `<button class="btn wide" data-act="reveal">Kijk maar</button>`;
        } else if (mode === 'pen') {
            main = this.local.penShown
                ? `<div class="verdict"><button class="btn soft" data-pen="0">Bijna</button><button class="btn" data-pen="1">Goed</button></div>`
                : `<button class="btn wide" data-act="pen-show">Laat zien</button>`;
        } else if (mode === 'truefalse' && this.local.tf === null) {
            main = '';
        } else if (mode === 'builder' && this.local.picked.length < this.item.pieces.length) {
            main = `<button class="btn wide" disabled>Controleer</button>`;
        } else {
            main = `<button class="btn wide" data-act="check" ${this.local.value ? '' : 'disabled'}>Controleer</button>`;
        }
        return `<div class="run-foot">${aids}${main}</div>`;
    }

    say(text) {
        if (this.store.get().settings.voice !== false) {
            speak(text);
        }
    }

    grade(ok, reason = null) {
        const exp = expectedAnswer(this.item);
        const res = answer(this.session, this.store.get().srs, this.item, {
            ok,
            hint: this.local.hint
        });
        // De volgende vraag komt pas bij Verder; tot dan gaat de feedback over deze.
        this.nextSession = res.session;
        this.local.feedback = {
            ok,
            xp: res.gained,
            praise: PRAISE[Math.floor(Math.random() * PRAISE.length)],
            correct: exp,
            correctHtml:
                this.item.kind === 'gap'
                    ? esc(this.item.sv).replace(
                          '___',
                          `<span class="art-en">${esc(this.item.answer)}</span>`
                      )
                    : `<span class="${articleClass(this.item)}">${esc(exp)}</span>`,
            nudge: ok ? '' : nudge(this.item, reason)
        };
        this.step = 'feedback';
        if (this.onAnswer) {
            this.onAnswer({ q: res.session.results.at(-1), item: this.item, mode: this.mode() });
        }
        this.render();
        if (ok) {
            this.say(filledSentence(this.item));
        }
    }

    onClick(e) {
        const t = e.target.closest('button');
        if (!t) {
            return;
        }
        if (t.dataset.say) {
            this.say(t.dataset.say);
            return;
        }
        if (t.dataset.key) {
            const input = this.root.querySelector('[data-answer]');
            if (input) {
                const { selectionStart: s, selectionEnd: en, value } = input;
                input.value = value.slice(0, s) + t.dataset.key + value.slice(en);
                this.local.value = input.value;
                input.focus();
                input.setSelectionRange(s + 1, s + 1);
                this.syncCheck();
            }
            return;
        }
        if (t.dataset.pick !== undefined) {
            this.local.picked.push(this.local.pool.find(x => x.i === Number(t.dataset.pick)));
            this.render();
            return;
        }
        if (t.dataset.unpick !== undefined) {
            this.local.picked.splice(Number(t.dataset.unpick), 1);
            this.render();
            return;
        }
        if (t.dataset.tf !== undefined) {
            const said = t.dataset.tf === '1';
            this.local.tf = said;
            if (said !== this.item.isTrue) {
                this.grade(false, 'anders');
            } else if (said) {
                this.grade(true);
            } else {
                this.render();
            }
            return;
        }
        if (t.dataset.pen !== undefined) {
            this.grade(t.dataset.pen === '1', 'anders');
            return;
        }
        const act = t.dataset.act;
        if (act === 'exit') {
            this.onExit(this.session);
        } else if (act === 'check') {
            this.check();
        } else if (act === 'next') {
            this.session = this.nextSession || this.session;
            this.nextSession = null;
            this.step = 'ask';
            this.local = {};
            this.render();
        } else if (act === 'why') {
            this.local.showWhy = true;
            this.render();
        } else if (act === 'hint') {
            this.local.hint = true;
            this.keepValue();
            this.render();
        } else if (act === 'reveal') {
            this.reveal();
        } else if (act === 'pen-show') {
            this.local.penShown = true;
            this.render();
        } else if (act === 'tnt') {
            this.tnt();
        }
    }

    keepValue() {
        const input = this.root.querySelector('[data-answer]');
        if (input) {
            this.local.value = input.value;
        }
    }

    reveal() {
        this.keepValue();
        const guess = this.local.value || '';
        const ok = guess && checkAnswer(this.item, guess).ok;
        this.local.guessed = guess
            ? ok
                ? 'Je gokje was goed. Knap!'
                : `Je gokte: ${esc(guess)}. Zo is het:`
            : '';
        if (ok && this.onGuess) {
            this.onGuess();
        }
        this.local.value = '';
        this.step = 'ask';
        this.render();
    }

    check() {
        this.keepValue();
        const given = this.local.value || '';
        if (!normalize(given)) {
            return;
        }
        const r = checkAnswer(this.item, given);
        this.grade(r.ok, r.reason);
    }

    /** Van tafel: Cleo tikt de vraag van tafel. Hij valt, en komt later terug. */
    tnt() {
        const body = this.root.querySelector('.run-body');
        const target = this.root.querySelector('.tnt-target');
        const paw = document.createElement('div');
        paw.className = 'paw-swipe';
        paw.innerHTML = icon('paw', 96);
        body.append(paw);
        this.store.update(s => {
            s.tnt = Math.max(0, s.tnt - 1);
            return s;
        });
        setTimeout(() => target.classList.add('swat'), 420);
        setTimeout(() => {
            this.session = blowUp(this.session);
            this.step = 'ask';
            this.local = {};
            this.render();
        }, 1300);
    }

    syncCheck() {
        const btn = this.root.querySelector('[data-act="check"]');
        if (btn) {
            btn.disabled = !this.local.value;
        }
    }

    onKey(e) {
        if (e.target.matches('[data-answer]')) {
            this.local.value = e.target.value;
            if (e.key !== 'Enter') {
                setTimeout(() => {
                    this.local.value = e.target.value;
                    this.syncCheck();
                });
                return;
            }
        }
        if (e.key !== 'Enter') {
            return;
        }
        e.preventDefault();
        if (this.step === 'feedback') {
            this.root.querySelector('[data-act="next"]')?.click();
        } else if (this.mode() === 'guess') {
            this.reveal();
        } else if (this.root.querySelector('[data-act="check"]:not([disabled])')) {
            this.check();
        }
    }
}
