/**
 * Speelstand van Svenska Kat.
 *
 * Altijd lokaal bewaard; met een account ook in Supabase, als veld `kat` in
 * de bestaande stats-JSON van user_progress (geen nieuwe tabel of migratie).
 * De partner (samen sparen) wordt gelezen via dezelfde publieke stats.
 */

import { toDay } from '../engine/dates.js';
import { WORLDS, emptyWorldProgress } from './worlds.js';

const KEY = 'svenska-kat-v2';

export function freshState() {
    return {
        version: 2,
        name: '',
        xp: 0,
        streak: { count: 0, last: null },
        srs: {},
        path: Object.fromEntries(WORLDS.map(w => [w.id, emptyWorldProgress()])),
        lastScore: null,
        tnt: 3,
        stempels: [],
        rewards: [],
        xpByDay: {},
        quests: { day: null, done: {} },
        rijtjes: {},
        sprintBest: 0,
        ontdek: { cracked: {}, friends: {} },
        settings: { voice: true, style: 'mix' },
        updatedAt: null
    };
}

function readLocal() {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function writeLocal(state) {
    try {
        localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
        // Opslag vol of geblokkeerd: de sessie werkt gewoon door.
    }
}

export function merge(base, saved) {
    if (!saved) {
        return base;
    }
    return {
        ...base,
        ...saved,
        path: { ...base.path, ...(saved.path || {}) },
        settings: { ...base.settings, ...(saved.settings || {}) }
    };
}

export function createStore({ remote = null } = {}) {
    let state = merge(freshState(), readLocal());
    const listeners = new Set();
    let saveTimer = null;

    function emit() {
        for (const fn of listeners) {
            fn(state);
        }
    }

    function persist() {
        state.updatedAt = new Date().toISOString();
        writeLocal(state);
        if (remote) {
            clearTimeout(saveTimer);
            saveTimer = setTimeout(() => remote.save(state), 800);
        }
    }

    return {
        get: () => state,
        subscribe(fn) {
            listeners.add(fn);
            return () => listeners.delete(fn);
        },
        update(fn) {
            const next = fn(JSON.parse(JSON.stringify(state)));
            state = next || state;
            persist();
            emit();
        },
        /** Neem een opgeslagen stand over als die nieuwer is dan de lokale. */
        adopt(saved) {
            if (
                saved &&
                (!state.updatedAt || (saved.updatedAt && saved.updatedAt > state.updatedAt))
            ) {
                state = merge(freshState(), saved);
                writeLocal(state);
                emit();
            }
        },
        setRemote(r) {
            remote = r;
        },
        reset() {
            state = freshState();
            persist();
            emit();
        },
        /** Zet een back-up terug: vervangt de stand op dit apparaat. */
        restore(saved) {
            state = merge(freshState(), saved);
            persist();
            emit();
        }
    };
}

const BACKUP_APP = 'svenska-kat';

/** De speelstand als back-upbestand (JSON-tekst). */
export function backupJson(state, now = new Date()) {
    return JSON.stringify(
        { app: BACKUP_APP, backup: 1, savedAt: now.toISOString(), state },
        null,
        2
    );
}

/** Bestandsnaam voor een back-up, met de datum erin. */
export function backupFileName(day = toDay()) {
    return `svenska-kat-backup-${day}.json`;
}

/**
 * Lees een back-upbestand. Geeft { ok: true, state, savedAt } of
 * { ok: false, reason } met een zin die op het scherm kan.
 * Een losse speelstand (zonder omhulsel) wordt ook geaccepteerd.
 */
export function parseBackup(text) {
    let data;
    try {
        data = JSON.parse(text);
    } catch {
        return { ok: false, reason: 'Dit bestand is geen back-up van Svenska Kat.' };
    }
    const wrapped = data && data.app === BACKUP_APP && data.state;
    const state = wrapped ? data.state : data;
    const looksRight =
        state &&
        typeof state === 'object' &&
        state.version === 2 &&
        typeof state.xp === 'number' &&
        state.path &&
        typeof state.path === 'object' &&
        state.srs &&
        typeof state.srs === 'object';
    if (!looksRight) {
        return { ok: false, reason: 'Dit bestand is geen back-up van Svenska Kat.' };
    }
    return { ok: true, state, savedAt: (wrapped && data.savedAt) || state.updatedAt || null };
}

/** XP vandaag bijhouden voor de weekgrafiek in Stats. */
export function addXp(state, amount, day = toDay()) {
    state.xp += amount;
    state.xpByDay[day] = (state.xpByDay[day] || 0) + amount;
    return state;
}
