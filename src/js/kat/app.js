/**
 * Svenska Kat: Cleo reist met August door vijf werelden.
 * Tabbladen: Start, Quests, Beuken, Stats, Instellingen.
 */

import { escapeHtml as esc } from '../utils/helpers.js';
import { ITEMS } from '../content/items.js';
import { WORLD_ART } from '../art/worlds.js';
import { cleo } from '../art/cleo.js';
import { toDay } from '../engine/dates.js';
import { buildChallenge, buildMaster, worldIndex } from '../engine/challenge.js';
import { dueItems } from '../engine/srs.js';
import { updateStreak, streakDays, chestLoot, levelFor } from '../engine/rewards.js';
import { createStore, addXp } from './store.js';
import { connect } from './sync.js';
import {
    WORLDS,
    CHEST_AFTER,
    CHALLENGES_PER_WORLD,
    worldById,
    currentWorld,
    nextStep,
    stepsToNextPrize
} from './worlds.js';
import { startSession } from './session.js';
import { bumpQuest } from './quests.js';
import { RunScreen } from './run.js';
import { icon } from './ui/icons.js';
import { chest, trophy } from './ui/props.js';
import {
    renderQuests,
    renderBeuken,
    renderStats,
    renderSettings,
    SprintScreen,
    installTabs
} from './tabs.js';

const TABS = [
    { id: 'start', label: 'Start', icon: 'home' },
    { id: 'quests', label: 'Quests', icon: 'quests' },
    { id: 'rabbla', label: 'Rabbla', icon: 'beuken' },
    { id: 'stats', label: 'Stats', icon: 'stats' },
    { id: 'settings', label: 'Instellingen', icon: 'settings' }
];

const STAR = (on, size = 16) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" fill="${on ? '#f6c33b' : '#ffffff'}" stroke="${on ? '#d99a12' : '#cfc7b8'}" stroke-width="1.5" stroke-linejoin="round"/></svg>`;

export class KatApp {
    constructor(root) {
        this.root = root;
        this.store = createStore();
        this.ui = {
            tab: window.location.hash.replace('#', '') || 'start',
            viewWorld: null,
            overlay: null,
            beuken: null
        };
        if (!TABS.some(t => t.id === this.ui.tab)) {
            this.ui.tab = 'start';
        }
        this.partner = null;
        this.account = null;
        this.store.subscribe(() => {
            if (!this.ui.overlay) {
                this.render();
            }
        });
        installTabs(this);
        root.addEventListener('click', e => this.onClick(e));
        root.addEventListener('submit', e => this.onSubmit(e));
        root.addEventListener('change', e => this.onChange(e));
        this.render();
        this.scrollToNow();
        this.connectAccount();
    }

    async connectAccount() {
        const acc = await connect();
        this.account = acc;
        if (acc && acc.user) {
            this.store.adopt(acc.saved);
            this.store.setRemote({ save: kat => acc.save(kat) });
            if (!this.store.get().name && acc.displayName) {
                this.store.update(s => ({ ...s, name: acc.displayName }));
            }
            this.partner = await acc.partner();
        }
        if (!this.ui.overlay) {
            this.render();
        }
    }

    get state() {
        return this.store.get();
    }

    today() {
        return toDay();
    }

    unlockedWorlds() {
        const now = worldIndex(currentWorld(this.state.path));
        return WORLDS.filter((w, i) => i <= now).map(w => w.id);
    }

    isCompressed(item) {
        const p = this.state.path[item.world];
        return !p || !p.master;
    }

    /** Samen sparen: eigen XP plus die van de partner, minus wat al verzilverd is. */
    savings() {
        const together = this.state.xp + (this.partner ? this.partner.xp : 0);
        const spent = this.state.rewards.filter(r => r.claimed).reduce((n, r) => n + r.cost, 0);
        const next = this.state.rewards.find(r => !r.claimed) || null;
        return { together, available: together - spent, next };
    }

    // ---------- rendering ----------

    render() {
        if (this.ui.overlay) {
            return;
        }
        const tab = this.ui.tab;
        let body;
        if (tab === 'quests') {
            body = renderQuests(this);
        } else if (tab === 'rabbla') {
            body = renderBeuken(this);
        } else if (tab === 'stats') {
            body = renderStats(this);
        } else if (tab === 'settings') {
            body = renderSettings(this);
        } else {
            body = this.renderStart();
        }
        this.root.innerHTML = `${body}
            <nav class="tabbar" aria-label="Hoofdmenu">${TABS.map(
                t =>
                    `<button data-tab="${t.id}" ${t.id === tab ? 'aria-current="page"' : ''}>${icon(t.icon)}<span>${t.label}</span></button>`
            ).join('')}</nav>`;
    }

    renderStart() {
        const s = this.state;
        const today = this.today();
        const worldId = this.ui.viewWorld || currentWorld(s.path);
        const world = worldById(worldId);
        const art = WORLD_ART[worldId];
        const prog = s.path[worldId];
        const step = nextStep(prog);
        const isCurrent = worldId === currentWorld(s.path);
        const done = prog.stars.length;
        const sav = this.savings();

        let goal;
        if (!sav.next) {
            goal = `Waar sparen jullie samen voor? <button class="linkish" data-tab="settings">Kies een beloning</button>`;
        } else if (sav.available >= sav.next.cost) {
            goal = `Gespaard: <b>${esc(sav.next.title)}</b>. Verzilveren kan bij Stats.`;
        } else {
            goal = `Nog <b>${sav.next.cost - sav.available} XP</b> samen tot: ${esc(sav.next.title)}`;
        }

        const style = s.settings.style || 'mix';
        const styleBtn = (id, label, ic) =>
            `<button data-style="${id}" aria-pressed="${style === id}">${icon(ic, 16)}${label}</button>`;

        const todayCard = `<div class="today" style="--world-accent:${art.accent || '#2e7d4f'};--world-sky:${art.sky}">
            <div class="thumb">${cleo('sit', 60)}</div>
            <div>
                <h2>${isCurrent ? `Vandaag: ${esc(world.title)}` : esc(world.title)}</h2>
                <div class="meta"><span>${done} van ${CHALLENGES_PER_WORLD}</span><div class="bar"><i style="width:${(done / CHALLENGES_PER_WORLD) * 100}%"></i></div></div>
            </div>
            ${isCurrent && step.type !== 'done' ? `<button class="btn" data-act="go">Verder</button>` : ''}
            ${isCurrent ? `<div class="styles" role="group" aria-label="Kies de vorm">${styleBtn('mix', 'Mix', 'pencil')}${styleBtn('luister', 'Luisteren', 'headphones')}${styleBtn('pen', 'Pen', 'paper')}</div>` : ''}
        </div>`;

        const unlocked = this.unlockedWorlds();
        const switcher =
            unlocked.length > 1
                ? `<div class="world-switch" role="group" aria-label="Werelden">${WORLDS.map(
                      w =>
                          `<button data-world="${w.id}" aria-pressed="${w.id === worldId}" ${unlocked.includes(w.id) ? '' : 'disabled'}>${esc(w.title)}</button>`
                  ).join('')}</div>`
                : '';

        return `<section class="start">
            <div class="start-top">
                <div class="chips">
                    <span class="chip"><span class="flame">${icon('flame', 20)}</span>${streakDays(s.streak, today)} ${streakDays(s.streak, today) === 1 ? 'dag' : 'dagen'}</span>
                    <span class="chip"><span class="bolt">${icon('bolt', 20)}</span>${s.xp.toLocaleString('nl-NL')} XP</span>
                </div>
                ${todayCard}
                <div class="goal">${goal}</div>
                ${switcher}
            </div>
            <div class="map">${this.mapHtml(worldId, art, prog, isCurrent)}</div>
        </section>`;
    }

    mapHtml(worldId, art, prog, isCurrent) {
        const step = nextStep(prog);
        const done = prog.stars.length;
        const left = (x, y) => `left:${(x / 390) * 100}%;top:${(y / 1500) * 100}%`;
        let challengeNo = 0;
        let chestNo = 0;
        let cleoAt = null;
        let callout = null;
        const prize = stepsToNextPrize(prog);

        const nodes = art.nodes.map(n => {
            if (n.type === 'challenge') {
                const idx = challengeNo++;
                const isDone = idx < done;
                const isNow = isCurrent && step.type === 'challenge' && step.index === idx;
                if (isNow) {
                    cleoAt = n;
                }
                const cls = isDone ? 'done' : isNow ? 'now' : 'locked';
                const stars = isDone
                    ? `<span class="stars">${[0, 1, 2].map(k => STAR(k < prog.stars[idx])).join('')}</span>`
                    : '';
                const inner = isDone ? icon('check', 34) : isNow ? '' : icon('lock', 26);
                return `<button class="node ${cls}" style="${left(n.x, n.y)}" data-node="challenge" data-index="${idx}" aria-label="Challenge ${idx + 1}${isDone ? ', gehaald' : isNow ? ', speel nu' : ', nog dicht'}"><span class="dot">${inner}</span>${stars}</button>`;
            }
            if (n.type === 'chest') {
                const c = chestNo++;
                const opened = prog.chests[c];
                const ready = isCurrent && step.type === 'chest' && step.index === c;
                if (
                    !opened &&
                    !ready &&
                    prize.prize === 'chest' &&
                    done < CHEST_AFTER[c] &&
                    !callout
                ) {
                    callout = {
                        n,
                        text: `nog ${prize.left} ${prize.left === 1 ? 'challenge' : 'challenges'}`
                    };
                }
                if (ready) {
                    cleoAt = n;
                }
                return `<button class="node ${ready ? 'prize-now' : ''}" style="${left(n.x, n.y)}" data-node="chest" data-index="${c}" aria-label="${opened ? 'Kist, al open' : ready ? 'Kist, maak open' : 'Kist'}"><span class="prop">${chest(opened, ready ? 84 : 68)}</span></button>`;
            }
            const earned = Boolean(prog.master);
            const ready = isCurrent && step.type === 'master';
            if (ready) {
                cleoAt = n;
            }
            if (!earned && !ready && prize.prize === 'master' && !callout) {
                callout = { n, text: `masterchallenge over ${prize.left}` };
            }
            return `<button class="node ${ready ? 'prize-now' : ''}" style="${left(n.x, n.y)}" data-node="master" aria-label="Masterchallenge${earned ? ', gehaald' : ready ? ', zou je het halen?' : ''}"><span class="prop">${trophy(earned, ready ? 92 : 76)}</span></button>`;
        });

        const cleoHtml = cleoAt
            ? `<div class="cleo-on-map" style="left:${((cleoAt.x + (cleoAt.x > 195 ? -88 : 88)) / 390) * 100}%;top:${(cleoAt.y / 1500) * 100}%">${cleo('sit', 92)}</div>`
            : '';
        const calloutHtml = callout
            ? `<div class="callout" style="left:${(callout.n.x / 390) * 100}%;top:${((callout.n.y + 50) / 1500) * 100}%">${callout.text}</div>`
            : '';
        return `<div class="map-art" data-world="${worldId}">${art.svg}${nodes.join('')}${cleoHtml}${calloutHtml}</div>`;
    }

    scrollToNow() {
        window.requestAnimationFrame(() => {
            const el = this.root.querySelector('.node.now, .node.prize-now');
            if (el) {
                el.scrollIntoView({ block: 'center' });
            } else {
                window.scrollTo(0, document.body.scrollHeight);
            }
        });
    }

    // ---------- spelen ----------

    play(kind = 'challenge', opts = {}) {
        const s = this.state;
        const today = this.today();
        let challenge;
        if (kind === 'master') {
            challenge = buildMaster({ items: ITEMS, srs: s.srs, world: opts.world });
        } else if (kind === 'refresh') {
            const ids = dueItems(s.srs, today).slice(0, 10);
            const byId = new Map(ITEMS.map(i => [i.id, i]));
            challenge = {
                kind: 'refresh',
                style: 'mix',
                newIds: [],
                questions: ids
                    .filter(id => byId.has(id))
                    .map(id => ({
                        itemId: id,
                        kind: byId.get(id).kind,
                        phase: 'review',
                        mode: 'type'
                    }))
                    .map(q => ({
                        ...q,
                        mode: ['gap', 'form', 'truefalse', 'builder'].includes(q.kind)
                            ? q.kind
                            : 'type'
                    }))
            };
        } else {
            challenge = buildChallenge({
                items: ITEMS,
                srs: s.srs,
                today,
                lastScore: s.lastScore,
                style: opts.style || s.settings.style || 'mix'
            });
        }
        if (challenge.questions.length === 0) {
            this.toast('Alles is opgefrist. Cleo ligt te spinnen.');
            return;
        }
        const session = startSession(challenge, {
            today,
            isCompressed: it => this.isCompressed(it)
        });
        this.openOverlay(host => {
            const screen = new RunScreen(host, {
                session,
                items: ITEMS,
                store: this.store,
                onExit: () => this.closeOverlay(),
                onFinish: result => this.finishRun(challenge, result, opts)
            });
            screen.onAnswer = ({ q, mode }) => {
                if (q.phase === 'review' && q.ok && !q.retry) {
                    this.bump('reviews');
                }
                if (mode === 'listen' && q.ok) {
                    this.bump('listen');
                }
            };
            screen.onGuess = () => this.bump('guess');
        });
    }

    bump(id, by = 1) {
        this.store.update(s => {
            const xp = bumpQuest(s, this.today(), id, by);
            if (xp) {
                addXp(s, xp);
                this.questDone = (this.questDone || 0) + xp;
            }
            return s;
        });
    }

    finishRun(challenge, result, opts) {
        const today = this.today();
        const worldId = currentWorld(this.state.path);
        let passed = true;
        this.store.update(s => {
            Object.assign(s.srs, result.srsChanges);
            addXp(s, result.xp);
            s.streak = updateStreak(s.streak, today);
            if (challenge.kind === 'challenge') {
                s.lastScore = result.score;
                const p = s.path[worldId];
                if (p.stars.length < CHALLENGES_PER_WORLD) {
                    p.stars.push(result.stars);
                }
            } else if (challenge.kind === 'master') {
                passed = result.score >= 0.7;
                if (passed) {
                    s.path[opts.world].master = { stars: result.stars, day: today };
                }
            }
            return s;
        });
        if (challenge.kind === 'challenge') {
            this.bump('challenges');
            if (challenge.style === 'pen') {
                this.bump('pen');
            }
        }
        const questXp = this.questDone || 0;
        this.questDone = 0;
        this.showReward({
            type: challenge.kind,
            result,
            passed,
            questXp,
            world: opts.world || worldId
        });
    }

    openChest(index) {
        const worldId = currentWorld(this.state.path);
        const loot = chestLoot(`${worldId}-${index}-${this.state.xp}`);
        this.store.update(s => {
            s.path[worldId].chests[index] = true;
            if (loot.type === 'xp') {
                addXp(s, loot.amount);
            } else if (loot.type === 'tnt') {
                s.tnt += loot.amount;
            } else {
                s.stempels.push({ world: worldId, day: this.today() });
            }
            return s;
        });
        this.showReward({ type: 'chest', loot, world: worldId });
    }

    showReward(r) {
        const s = this.state;
        const today = this.today();
        const art = WORLD_ART[r.world] || WORLD_ART.volkstuin;
        const world = worldById(r.world);
        let pose = 'wave';
        let head;
        let body;
        let badge = '';
        let extra = '';
        if (r.type === 'chest') {
            pose = 'happy';
            head = 'De kist is open';
            body =
                r.loot.type === 'xp'
                    ? `<p class="loot">+${r.loot.amount} XP</p><p>Cleo vond het tussen de spullen van August.</p>`
                    : r.loot.type === 'tnt'
                      ? `<p class="loot">2 pootjes extra</p><p>Cleo mag nog twee keer een vraag van tafel tikken. Die komt later gewoon terug.</p>`
                      : `<p class="loot">Een stempel van ${esc(world.title)}</p><p>Voor in jullie reispaspoort bij Stats.</p>`;
            extra = chest(true, 96);
        } else if (r.type === 'master' && r.passed) {
            pose = 'happy';
            head = `${esc(world.title)} gehaald`;
            badge = `+${r.result.xp} XP`;
            body = `<div class="bigstars">${[0, 1, 2].map(k => `<span>${STAR(k < r.result.stars, k === 1 ? 64 : 50)}</span>`).join('')}</div>
                <p>${esc(world.canNow)}</p>`;
            extra = trophy(true, 96);
        } else if (r.type === 'master') {
            pose = 'sit';
            head = 'Bijna gehaald';
            badge = `+${r.result.xp} XP`;
            body = `<p>Wat nog niet zat, komt de komende dagen vanzelf terug. Daarna nog een keer?</p>`;
        } else {
            head = r.type === 'refresh' ? 'Opgefrist' : 'Challenge klaar';
            badge = `+${r.result.xp + (r.questXp || 0)} XP`;
            const prog = s.path[r.world];
            const prize = stepsToNextPrize(prog);
            const next = nextStep(prog);
            const ahead =
                next.type === 'chest'
                    ? 'Er staat een kist voor je klaar.'
                    : next.type === 'master'
                      ? 'De masterchallenge staat klaar. Zou je het halen?'
                      : `Nog ${prize.left} ${prize.left === 1 ? 'challenge' : 'challenges'} tot de ${prize.prize === 'chest' ? 'kist' : 'trofee'}.`;
            body = `<div class="bigstars">${[0, 1, 2].map(k => `<span>${STAR(k < r.result.stars, k === 1 ? 64 : 50)}</span>`).join('')}</div>
                <p>${ahead}${r.questXp ? ` Er is ook een dagquest af.` : ''}</p>`;
        }
        const lvl = levelFor(s.xp);
        this.openOverlay(host => {
            host.innerHTML = `<section class="reward" style="--world-sky:${art.sky}">
                <div class="reward-art">${art.svg}</div>
                <div class="modal" role="dialog" aria-labelledby="reward-title">
                    ${badge ? `<span class="xp-badge">${badge}</span>` : ''}
                    ${extra ? `<div>${extra}</div>` : ''}
                    ${cleo(pose, 120)}
                    <h2 id="reward-title">${head}</h2>
                    ${body}
                    <div class="chips" style="justify-content:center">
                        <span class="chip"><span class="flame">${icon('flame', 20)}</span>${streakDays(s.streak, today)} ${streakDays(s.streak, today) === 1 ? 'dag' : 'dagen'}</span>
                        <span class="chip"><span class="bolt">${icon('bolt', 20)}</span>${s.xp.toLocaleString('nl-NL')} XP · level ${lvl.level}</span>
                    </div>
                    <button class="btn wide" data-act="reward-done">Verder</button>
                </div>
            </section>`;
            host.querySelector('[data-act="reward-done"]').focus();
            host.addEventListener('click', e => {
                if (e.target.closest('[data-act="reward-done"]')) {
                    this.closeOverlay();
                }
            });
        });
    }

    openOverlay(build) {
        this.ui.overlay = true;
        this.root.innerHTML = '';
        const host = document.createElement('div');
        this.root.append(host);
        window.scrollTo(0, 0);
        build(host);
    }

    closeOverlay() {
        this.ui.overlay = null;
        this.ui.tab = 'start';
        this.render();
        this.scrollToNow();
    }

    toast(text) {
        const t = document.createElement('div');
        t.className = 'toast';
        t.setAttribute('role', 'status');
        t.textContent = text;
        document.body.append(t);
        setTimeout(() => t.remove(), 2600);
    }

    // ---------- events ----------

    onClick(e) {
        if (this.ui.overlay) {
            return;
        }
        const t = e.target.closest('button');
        if (!t) {
            return;
        }
        if (t.dataset.tab) {
            this.ui.tab = t.dataset.tab;
            this.ui.beuken = null;
            window.history.replaceState(null, '', `#${t.dataset.tab}`);
            this.render();
            window.scrollTo(0, 0);
            if (t.dataset.tab === 'start') {
                this.scrollToNow();
            }
            return;
        }
        if (t.dataset.world) {
            this.ui.viewWorld = t.dataset.world;
            this.render();
            this.scrollToNow();
            return;
        }
        if (t.dataset.style) {
            this.store.update(s => {
                s.settings.style = t.dataset.style;
                return s;
            });
            return;
        }
        if (t.dataset.node) {
            this.onNode(t.dataset.node, Number(t.dataset.index));
            return;
        }
        const act = t.dataset.act;
        if (act === 'go') {
            this.goNext();
        } else if (act === 'refresh') {
            this.play('refresh');
        } else if (act === 'play-style') {
            this.play('challenge', { style: t.dataset.value });
        } else if (act === 'sprint') {
            this.openOverlay(host => new SprintScreen(host, this));
        } else if (this.tabAction) {
            this.tabAction(act, t, e);
        }
    }

    goNext() {
        const worldId = currentWorld(this.state.path);
        const step = nextStep(this.state.path[worldId]);
        if (step.type === 'chest') {
            this.openChest(step.index);
        } else if (step.type === 'master') {
            this.play('master', { world: worldId });
        } else if (step.type === 'challenge') {
            this.play('challenge');
        }
    }

    onNode(type, index) {
        const worldId = this.ui.viewWorld || currentWorld(this.state.path);
        if (worldId !== currentWorld(this.state.path)) {
            this.toast('Deze wereld is al gehaald. Opfrissen kan bij Quests.');
            return;
        }
        const step = nextStep(this.state.path[worldId]);
        if (type === step.type && (type === 'master' || step.index === index)) {
            this.goNext();
        } else if (type === 'challenge' && index < this.state.path[worldId].stars.length) {
            this.toast('Al gehaald. De stof komt vanzelf terug als het tijd is.');
        } else {
            this.toast('Eerst de challenges ervoor.');
        }
    }

    onSubmit(e) {
        if (this.formAction) {
            this.formAction(e);
        }
    }

    onChange(e) {
        if (this.changeAction) {
            this.changeAction(e);
        }
    }
}
