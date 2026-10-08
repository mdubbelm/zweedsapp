/**
 * Tabbladen Quests, Beuken, Stats en Instellingen, plus de Sprint.
 */

import { escapeHtml as esc } from '../utils/helpers.js';
import { ITEMS, RIJTJES } from '../content/items.js';
import { toDay, addDays } from '../engine/dates.js';
import { dueItems, sits } from '../engine/srs.js';
import { sprintPool, shuffle, worldIndex } from '../engine/challenge.js';
import { checkAnswer, expectedAnswer } from '../engine/check.js';
import { streakDays, levelFor, XP } from '../engine/rewards.js';
import { addXp } from './store.js';
import { WORLDS, CHALLENGES_PER_WORLD, currentWorld } from './worlds.js';
import { questsFor } from './quests.js';
import { RULES, FALSE_FRIENDS } from '../content/ontdekken.js';
import { ruleRound, friendsRound } from '../engine/ontdek.js';
import { icon } from './ui/icons.js';
import { speak } from './ui/speech.js';
import { cleo } from '../art/cleo.js';
import { signIn, signOut } from '../services/auth.js';
import { isSupabaseEnabled } from '../services/supabase.js';

const row = ({ ic, title, sub, end = '', act = '', attrs = '', done = false, disabled = false }) =>
    `<button class="row${done ? ' done' : ''}" ${act ? `data-act="${act}"` : ''} ${attrs} ${disabled ? 'disabled' : ''}>
        <span class="ic">${icon(ic)}</span>
        <span><h3>${title}</h3>${sub ? `<p>${sub}</p>` : ''}</span>
        <span class="end">${end}</span>
    </button>`;

// ---------- Quests ----------

function ontdek(app) {
    return app.state.ontdek || { cracked: {}, friends: {} };
}

function renderCodekraker(app) {
    const done = ontdek(app).cracked;
    if (app.ui.rule) {
        const rule = RULES.find(r => r.id === app.ui.rule);
        return `<main class="page">
            <button class="btn soft small" data-act="rules" style="justify-self:start">${icon('close', 18)} Alle regels</button>
            <h1>${esc(rule.title)}</h1>
            <p class="lede">Zweeds en Nederlands zijn familie. Waar het Zweeds <b>${esc(rule.sv)}</b> heeft, heeft het Nederlands vaak <b>${esc(rule.nl)}</b>.</p>
            <div class="rijtje">${rule.examples
                .map(
                    ([sv, nl]) => `<button class="rij" data-act="say" data-text="${esc(sv)}">
                    <span><span class="sv">${esc(sv)}</span><br><span class="nl">${esc(nl)}</span></span>${icon('speaker', 20)}</button>`
                )
                .join('')}</div>
            <p class="lede">Zie je het patroon? Dan kun je deze vast ook: drie woorden die je nooit hebt geleerd, en één andersom.</p>
            <button class="btn wide" data-act="crack" data-id="${rule.id}">${icon('key', 20)} Kraak de code</button>
        </main>`;
    }
    const rows = RULES.map(r => {
        const n =
            r.crack.filter(([sv]) => done[`ck-${r.id}-${sv}`]).length +
            (done[`ck-${r.id}-bouw`] ? 1 : 0);
        return row({
            ic: n === 4 ? 'check' : 'key',
            title: esc(r.title),
            sub: `${esc(r.examples[0][0])} is ${esc(r.examples[0][1])}`,
            end: `${n}/4`,
            act: 'open-rule',
            attrs: `data-id="${r.id}"`,
            done: n === 4
        });
    }).join('');
    const total = Object.keys(done).length;
    return `<main class="page">
        <button class="btn soft small" data-act="close-ontdek" style="justify-self:start">${icon('close', 18)} Quests</button>
        <h1>Codekraker</h1>
        <p class="lede">Met een paar klankregels kun je Zweedse woorden lezen die je nooit hebt geleerd. ${total ? `Je hebt er al ${total} gekraakt.` : 'Kies een regel en probeer het.'}</p>
        <div class="list">${rows}</div>
    </main>`;
}

export function renderQuests(app) {
    if (app.ui.codekraker) {
        return renderCodekraker(app);
    }
    const s = app.state;
    const seenFriends = Object.keys(ontdek(app).friends).length;
    const cracked = Object.keys(ontdek(app).cracked).length;
    const today = toDay();
    const qs = questsFor(today);
    const counts = s.quests && s.quests.day === today ? s.quests : { counts: {}, done: {} };
    const due = dueItems(s.srs, today).filter(id => ITEMS.some(i => i.id === id)).length;
    const sprintN = sprintPool(ITEMS, s.srs).length;

    const quests = qs
        .map(q => {
            const n = Math.min(q.target, counts.counts[q.id] || 0);
            const done = Boolean(counts.done[q.id]);
            return `<div class="row quest${done ? ' done' : ''}">
                <span class="ic">${icon(done ? 'check' : q.icon)}</span>
                <span><h3>${esc(q.title)}</h3><div class="bar"><i style="width:${(n / q.target) * 100}%"></i></div></span>
                <span class="end">${done ? 'Klaar' : `+${q.xp} XP`}</span>
            </div>`;
        })
        .join('');

    return `<main class="page">
        <h1>Quests</h1>
        <p class="lede">Drie opdrachtjes voor vandaag. Doe er wat je zin in hebt.</p>
        <div class="list">${quests}</div>
        <h2 style="margin:8px 0 0;font:600 19px var(--display)">Ontdekken</h2>
        <div class="list">
            ${row({ ic: 'key', title: 'Codekraker', sub: cracked ? `${cracked} woorden ontcijferd zonder ze te leren` : 'Lees Zweeds dat je nooit hebt geleerd', act: 'open-codekraker', end: icon('chevron', 20) })}
            ${row({ ic: 'mask', title: 'Valse vrienden', sub: seenFriends ? `${seenFriends} van ${FALSE_FRIENDS.length} doorzien` : 'Rolig is niet rustig. Wat dan wel?', act: 'friends' })}
        </div>
        <h2 style="margin:8px 0 0;font:600 19px var(--display)">Spelvormen</h2>
        <div class="list">
            ${row({ ic: 'refresh', title: 'Opfrissen', sub: due ? `${due} ${due === 1 ? 'woord is' : 'woorden zijn'} klaar om op te halen` : 'Niets aan de beurt. Cleo slaapt.', act: 'refresh', disabled: !due })}
            ${row({ ic: 'headphones', title: 'Geheim bericht', sub: 'De volgende challenge, maar dan luisterend', act: 'play-style', attrs: 'data-value="luister"' })}
            ${row({ ic: 'paper', title: 'Pen en papier', sub: 'Schrijf met de hand, kijk zelf na. Dubbele XP.', act: 'play-style', attrs: 'data-value="pen"' })}
            ${row({ ic: 'stopwatch', title: 'Sprint', sub: sprintN >= 4 ? `60 seconden, ${sprintN} woorden die al zitten. Record: ${s.sprintBest}` : 'Komt vrij als er 4 woorden echt zitten', act: 'sprint', disabled: sprintN < 4 })}
        </div>
    </main>`;
}

// ---------- Beuken ----------

function availableRijtjes(app) {
    const now = worldIndex(currentWorld(app.state.path));
    return RIJTJES.filter(r => worldIndex(r.world) <= now);
}

export function renderBeuken(app) {
    const s = app.state;
    const today = toDay();
    const open = app.ui.beuken;
    const list = availableRijtjes(app);
    if (!open) {
        return `<main class="page">
            <h1>Rabbla</h1>
            <p class="lede">Rijtjes hardop afratelen tot ze vanzelf gaan. Zweden noemen dat rabbla. Niemand kijkt na.</p>
            <div class="list">${list
                .map(r => {
                    const rec = s.rijtjes[r.id] || { count: 0 };
                    return row({
                        ic: rec.last === today ? 'check' : 'beuken',
                        title: esc(r.title),
                        sub: `${r.rows.length} regels${rec.count ? `, ${rec.count} keer gerabblad` : ''}`,
                        act: 'open-rijtje',
                        attrs: `data-id="${r.id}"`,
                        done: rec.last === today,
                        end: icon('chevron', 20)
                    });
                })
                .join('')}</div>
        </main>`;
    }
    const r = RIJTJES.find(x => x.id === open.id);
    const t = open;
    return `<main class="page">
        <button class="btn soft small" data-act="close-rijtje" style="justify-self:start">${icon('close', 18)} Rijtjes</button>
        <h1>${esc(r.title)}</h1>
        <div class="toggles" role="group" aria-label="Zelf kiezen">
            <button class="toggle" data-act="tg" data-k="read" aria-pressed="${t.read}">${icon('speaker', 18)} Voorlezen</button>
            <button class="toggle" data-act="tg" data-k="cover" aria-pressed="${t.cover}">${icon(t.cover ? 'eyeOff' : 'eye', 18)} Afdekken</button>
            <button class="toggle" data-act="tg" data-k="mic" aria-pressed="${t.mic}">${icon('mic', 18)} Microfoon</button>
        </div>
        ${
            t.mic
                ? `<div class="panel" style="grid-template-columns:1fr auto auto;align-items:center"><span>${t.recording ? 'Neemt op. Zeg het hele rijtje.' : t.audio ? 'Luister jezelf terug.' : 'Neem jezelf op en luister terug.'}</span>
            <button class="pill" data-act="rec">${icon(t.recording ? 'stop' : 'mic', 20)}</button>
            ${t.audio ? `<button class="pill" data-act="playback">${icon('play', 20)}</button>` : ''}</div>`
                : ''
        }
        <div class="rijtje">${r.rows
            .map(
                (
                    [sv, nl],
                    i
                ) => `<button class="rij${t.at === i ? ' active' : ''}" data-act="rij" data-i="${i}">
                <span><span class="sv${t.cover && t.at !== i ? ' covered' : ''}">${esc(sv)}</span><br><span class="nl">${esc(nl)}</span></span>
                ${icon('speaker', 20)}</button>`
            )
            .join('')}</div>
        <button class="btn wide" data-act="beuk-done">Rabblat!</button>
    </main>`;
}

let recorder = null;
let stream = null;

function stopStream() {
    if (stream) {
        stream.getTracks().forEach(tr => tr.stop());
        stream = null;
    }
}

async function toggleRecording(app) {
    const t = app.ui.beuken;
    if (t.recording && recorder) {
        recorder.stop();
        return;
    }
    try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // iOS wil mp4, de rest webm (zie LEARNINGS).
        const types = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm', 'audio/ogg'];
        const mimeType = types.find(m => window.MediaRecorder && MediaRecorder.isTypeSupported(m));
        recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
        const chunks = [];
        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = () => {
            if (t.audio) {
                URL.revokeObjectURL(t.audio);
            }
            t.audio = URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType }));
            t.recording = false;
            stopStream();
            app.render();
        };
        recorder.start();
        t.recording = true;
    } catch {
        t.mic = false;
        app.toast('De microfoon mag niet meedoen. Hardop zeggen werkt ook prima.');
    }
    app.render();
}

// ---------- Stats ----------

export function renderStats(app) {
    const s = app.state;
    const today = toDay();
    const lvl = levelFor(s.xp);
    const sitting = Object.values(s.srs).filter(sits).length;
    const sav = app.savings();

    const days = Array.from({ length: 7 }, (_, i) => addDays(today, i - 6));
    const max = Math.max(20, ...days.map(d => s.xpByDay[d] || 0));
    const dayName = d =>
        ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'][new Date(`${d}T12:00`).getDay()];
    const week = days
        .map(
            d =>
                `<div class="${d === today ? 'today-col' : ''}"><span>${s.xpByDay[d] || ''}</span><i style="height:${((s.xpByDay[d] || 0) / max) * 80}%"></i><span>${dayName(d)}</span></div>`
        )
        .join('');

    const worlds = WORLDS.map(w => {
        const p = s.path[w.id];
        const stars = p.stars.reduce((a, b) => a + b, 0);
        return row({
            ic: p.master ? 'check' : 'map',
            title: esc(w.title),
            sub: p.master
                ? esc(w.canNow)
                : `${p.stars.length} van ${CHALLENGES_PER_WORLD} challenges`,
            end: `${stars}/${CHALLENGES_PER_WORLD * 3}★`,
            done: Boolean(p.master)
        })
            .replace('<button', '<div')
            .replace('</button>', '</div>');
    }).join('');

    const almost = Object.entries(s.srs)
        .filter(([, r]) => r.misses > 0 && !sits(r))
        .sort(([, a], [, b]) => b.misses - a.misses)
        .slice(0, 6)
        .map(([id]) => ITEMS.find(i => i.id === id))
        .filter(Boolean);

    const together = `<div class="panel">
        <h2>Samen sparen</h2>
        <p class="empty" style="margin:0">${esc(s.name || 'Jij')}: ${s.xp} XP${app.partner ? ` · ${esc(app.partner.name)}: ${app.partner.xp} XP` : ''}</p>
        ${
            sav.next
                ? `<div class="bar"><i style="width:${Math.min(100, (Math.max(0, sav.available) / sav.next.cost) * 100)}%"></i></div>
                   <p style="margin:0">${sav.available >= sav.next.cost ? `<b>${esc(sav.next.title)}</b> is gespaard.` : `Nog ${sav.next.cost - sav.available} XP tot <b>${esc(sav.next.title)}</b>.`}</p>
                   ${sav.available >= sav.next.cost ? `<button class="btn" data-act="claim" data-id="${sav.next.id}">Verzilveren</button>` : ''}`
                : `<p style="margin:0">Nog geen beloning gekozen. <button class="btn soft small" data-tab="settings">Kies er een</button></p>`
        }
        ${app.account && !app.account.user ? '<p class="empty" style="margin:0">Log in bij Instellingen om de XP van je maatje mee te tellen.</p>' : ''}
    </div>`;

    return `<main class="page">
        <h1>Stats</h1>
        <div class="tiles">
            <div class="tile"><b>${lvl.level}</b><span>Level · nog ${lvl.need - lvl.into} XP</span></div>
            <div class="tile"><b>${streakDays(s.streak, today)}</b><span>dagen streak</span></div>
            <div class="tile"><b>${sitting}</b><span>woorden zitten</span></div>
        </div>
        ${together}
        <div class="panel"><h2>Deze week</h2><div class="week" aria-label="XP per dag">${week}</div></div>
        <h2 style="margin:4px 0 0;font:600 19px var(--display)">Werelden</h2>
        <div class="list">${worlds}</div>
        ${
            s.stempels.length
                ? `<div class="panel"><h2>Reispaspoort</h2><p style="margin:0">${s.stempels.length} ${s.stempels.length === 1 ? 'stempel' : 'stempels'}: ${[...new Set(s.stempels.map(x => WORLDS.find(w => w.id === x.world).title))].map(esc).join(', ')}</p></div>`
                : ''
        }
        ${
            Object.keys((s.ontdek || {}).cracked || {}).length +
            Object.keys((s.ontdek || {}).friends || {}).length
                ? `<div class="panel"><h2>Ontdekt</h2><p style="margin:0">${Object.keys(s.ontdek.cracked).length} woorden zelf ontcijferd met klankregels · ${Object.keys(s.ontdek.friends).length} valse vrienden doorzien</p></div>`
                : ''
        }
        <div class="panel"><h2>Bijna raak</h2>${
            almost.length
                ? `<div class="list">${almost.map(it => `<p style="margin:0"><span class="empty">${esc(it.kind === 'form' ? it.prompt : it.nl)}</span><br><b>${esc(expectedAnswer(it))}</b></p>`).join('')}</div>`
                : '<p class="empty" style="margin:0">Hier komt wat net nog niet zit. Het komt vanzelf terug.</p>'
        }</div>
    </main>`;
}

// ---------- Instellingen ----------

export function renderSettings(app) {
    const s = app.state;
    const acc = app.account;
    const rewards = s.rewards
        .map(
            r => `<div class="reward-row">
            <input id="rw-t-${r.id}" data-rw="title" data-id="${r.id}" value="${esc(r.title)}" aria-label="Beloning" ${r.claimed ? 'disabled' : ''}>
            <input id="rw-c-${r.id}" data-rw="cost" data-id="${r.id}" type="number" min="50" step="50" value="${r.cost}" aria-label="XP" ${r.claimed ? 'disabled' : ''}>
            <button class="pill" data-act="rw-del" data-id="${r.id}" aria-label="Verwijder ${esc(r.title)}">${r.claimed ? icon('check', 18) : icon('trash', 18)}</button>
        </div>`
        )
        .join('');

    let account;
    if (!isSupabaseEnabled() || !acc) {
        account =
            '<p class="empty" style="margin:0">Je voortgang staat op dit apparaat, in deze browser. Wissen van de browsergegevens wist ook Cleo\'s reis.</p>';
    } else if (acc && acc.user) {
        account = `<p style="margin:0">Ingelogd als ${esc(acc.user.email)}. Je voortgang gaat mee naar je andere apparaten.</p>
            <button class="btn soft" data-act="logout">Uitloggen</button>`;
    } else {
        account = `<form class="list" data-form="login">
            <p class="empty" style="margin:0">Log in om op meer apparaten te spelen en samen te sparen.</p>
            <div class="field"><label for="login-email">E-mail</label><input id="login-email" name="email" type="email" autocomplete="email" required></div>
            <div class="field"><label for="login-pw">Wachtwoord</label><input id="login-pw" name="password" type="password" autocomplete="current-password" required></div>
            <button class="btn" type="submit">Inloggen</button>
        </form>`;
    }

    return `<main class="page">
        <h1>Instellingen</h1>
        <div class="panel">
            <div class="field"><label for="set-name">Je naam</label><input id="set-name" data-set="name" value="${esc(s.name)}" placeholder="Bijvoorbeeld Monique" autocomplete="given-name"></div>
            <button class="toggle" data-act="voice" aria-pressed="${s.settings.voice !== false}">${icon('speaker', 18)} Zweedse uitspraak</button>
        </div>
        <div class="panel">
            <h2>Waar sparen jullie voor?</h2>
            <p class="empty" style="margin:0">${acc && acc.user ? 'Jullie XP telt samen op. ' : ''}Vul zelf in wat de beloning is en hoeveel XP hij kost.</p>
            ${rewards}
            <button class="btn soft small" data-act="rw-add" style="justify-self:start">${icon('plus', 18)} Beloning toevoegen</button>
        </div>
        <div class="panel"><h2>Account</h2>${account}</div>
        <div class="panel">
            <h2>Opnieuw beginnen</h2>
            ${
                app.ui.confirmReset
                    ? `<p style="margin:0">Alles op dit apparaat gaat terug naar het begin. Zeker weten?</p>
                       <div class="verdict"><button class="btn soft" data-act="reset-no">Nee, laat staan</button><button class="btn" data-act="reset-yes">Ja, opnieuw</button></div>`
                    : '<button class="btn soft" data-act="reset">Voortgang wissen</button>'
            }
        </div>
        <p class="empty" style="text-align:center">${cleo('sleep', 64)}<br>Svenska Kat · Cleo reist met August</p>
    </main>`;
}

// ---------- acties ----------

export function installTabs(app) {
    app.tabAction = (act, t) => {
        const today = toDay();
        if (act === 'open-codekraker' || act === 'rules') {
            app.ui.codekraker = true;
            app.ui.rule = null;
            app.render();
            window.scrollTo(0, 0);
            return;
        } else if (act === 'close-ontdek') {
            app.ui.codekraker = false;
            app.ui.rule = null;
            app.render();
            return;
        } else if (act === 'open-rule') {
            app.ui.rule = t.dataset.id;
            app.render();
            window.scrollTo(0, 0);
            return;
        } else if (act === 'say') {
            speak(t.dataset.text);
            return;
        } else if (act === 'crack') {
            app.ui.rule = null;
            app.play('ontdek', {
                round: ruleRound(RULES.find(r => r.id === t.dataset.id)),
                returnTab: 'quests'
            });
            return;
        } else if (act === 'friends') {
            app.play('ontdek', {
                round: friendsRound(FALSE_FRIENDS, ontdek(app).friends),
                returnTab: 'quests'
            });
            return;
        }
        if (act === 'open-rijtje') {
            app.ui.beuken = { id: t.dataset.id, read: true, cover: false, mic: false, at: null };
            app.render();
            window.scrollTo(0, 0);
        } else if (act === 'close-rijtje') {
            stopStream();
            app.ui.beuken = null;
            app.render();
        } else if (act === 'tg') {
            const k = t.dataset.k;
            app.ui.beuken[k] = !app.ui.beuken[k];
            if (k === 'mic' && !app.ui.beuken.mic) {
                stopStream();
            }
            app.render();
        } else if (act === 'rij') {
            const b = app.ui.beuken;
            const r = RIJTJES.find(x => x.id === b.id);
            b.at = Number(t.dataset.i);
            if (b.read) {
                speak(r.rows[b.at][0]);
            }
            app.render();
        } else if (act === 'rec') {
            toggleRecording(app);
        } else if (act === 'playback') {
            new Audio(app.ui.beuken.audio).play();
        } else if (act === 'beuk-done') {
            const id = app.ui.beuken.id;
            const first = (app.state.rijtjes[id] || {}).last !== today;
            app.store.update(s => {
                const rec = s.rijtjes[id] || { count: 0 };
                s.rijtjes[id] = { count: rec.count + 1, last: today };
                if (first) {
                    addXp(s, XP.rijtje);
                }
                return s;
            });
            app.bump('rabbla');
            stopStream();
            app.ui.beuken = null;
            app.render();
            app.toast(
                first
                    ? `Rabblat! +${XP.rijtje} XP`
                    : 'Rabblat! De XP had je vandaag al, het rijtje zit er wel weer beter in.'
            );
        } else if (act === 'claim') {
            app.store.update(s => {
                const r = s.rewards.find(x => x.id === t.dataset.id);
                if (r) {
                    r.claimed = today;
                }
                return s;
            });
            app.toast('Verzilverd. Veel plezier!');
        } else if (act === 'rw-add') {
            app.store.update(s => {
                s.rewards.push({
                    id: `r${Date.now()}`,
                    title: 'Nieuwe beloning',
                    cost: 500,
                    claimed: false
                });
                return s;
            });
        } else if (act === 'rw-del') {
            app.store.update(s => {
                s.rewards = s.rewards.filter(r => r.id !== t.dataset.id || r.claimed);
                return s;
            });
        } else if (act === 'voice') {
            app.store.update(s => {
                s.settings.voice = s.settings.voice === false;
                return s;
            });
        } else if (act === 'logout') {
            signOut().then(() => window.location.reload());
        } else if (act === 'reset') {
            app.ui.confirmReset = true;
            app.render();
        } else if (act === 'reset-no') {
            app.ui.confirmReset = false;
            app.render();
        } else if (act === 'reset-yes') {
            app.ui.confirmReset = false;
            app.store.reset();
        }
    };

    app.changeAction = e => {
        const el = e.target;
        if (el.dataset.set === 'name') {
            app.store.update(s => ({ ...s, name: el.value.trim().slice(0, 40) }));
        } else if (el.dataset.rw) {
            app.store.update(s => {
                const r = s.rewards.find(x => x.id === el.dataset.id);
                if (r && el.dataset.rw === 'title') {
                    r.title = el.value.trim().slice(0, 60) || 'Beloning';
                } else if (r) {
                    r.cost = Math.max(50, Math.round(Number(el.value) || 500));
                }
                return s;
            });
        }
    };

    app.formAction = async e => {
        if (e.target.dataset.form !== 'login') {
            return;
        }
        e.preventDefault();
        const data = new window.FormData(e.target);
        const res = await signIn(data.get('email'), data.get('password'));
        if (res.error) {
            app.toast(res.error);
        } else {
            window.location.reload();
        }
    };
}

// ---------- Sprint ----------

export class SprintScreen {
    constructor(host, app) {
        this.host = host;
        this.app = app;
        this.pool = shuffle(sprintPool(ITEMS, app.state.srs));
        this.i = 0;
        this.hits = 0;
        this.left = 60;
        this.timer = setInterval(() => this.tick(), 1000);
        host.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.submit();
            }
        });
        host.addEventListener('click', e => {
            if (e.target.closest('[data-act="sprint-exit"]')) {
                this.end(true);
            }
        });
        this.render();
    }

    get item() {
        return this.pool[this.i % this.pool.length];
    }

    tick() {
        this.left -= 1;
        const clock = this.host.querySelector('.sprint-clock');
        if (clock) {
            clock.textContent = `0:${String(Math.max(0, this.left)).padStart(2, '0')}`;
        }
        if (this.left <= 0) {
            this.end(false);
        }
    }

    submit() {
        const input = this.host.querySelector('[data-answer]');
        if (!input || !input.value.trim()) {
            return;
        }
        const ok = checkAnswer(this.item, input.value).ok;
        if (ok) {
            this.hits += 1;
        }
        this.flash = ok ? 'Raak' : `Bijna: ${expectedAnswer(this.item)}`;
        this.i += 1;
        this.render();
    }

    render() {
        this.host.innerHTML = `<section class="run">
            <div class="run-top"><button class="x" data-act="sprint-exit" aria-label="Stoppen">${icon('close')}</button><div class="sprint-clock" style="flex:1">0:${String(this.left).padStart(2, '0')}</div><span class="chip">${this.hits}</span></div>
            <div class="run-body">
                <div class="mode">${icon('stopwatch', 20)} Sprint</div>
                <div class="prompt"><p>Hoe zeg je dit in het Zweeds?</p><h1>${esc(this.item.nl)}</h1></div>
                <input class="answer" data-answer autocomplete="off" autocapitalize="off" spellcheck="false" lang="sv" placeholder="Typ en druk op Enter" aria-label="Je antwoord">
                ${this.flash ? `<p class="guess-note">${esc(this.flash)}</p>` : ''}
            </div>
        </section>`;
        this.host.querySelector('[data-answer]').focus();
    }

    end(early) {
        clearInterval(this.timer);
        const xp = this.hits * XP.sprintWord;
        this.app.store.update(s => {
            addXp(s, xp);
            s.sprintBest = Math.max(s.sprintBest || 0, this.hits);
            return s;
        });
        this.app.closeOverlay();
        if (!early || this.hits) {
            this.app.toast(`Sprint: ${this.hits} raak, +${xp} XP`);
        }
    }
}
