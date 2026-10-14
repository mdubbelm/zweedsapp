import { describe, it, expect } from 'vitest';
import { freshState, backupJson, backupFileName, parseBackup } from '../src/js/kat/store.js';

describe('back-up van de voortgang', () => {
    it('een bewaarde back-up komt ongeschonden terug', () => {
        const state = freshState();
        state.xp = 240;
        state.srs = { 'vt-n-01': { box: 2 } };
        const back = parseBackup(backupJson(state, new Date('2026-10-14T12:00:00Z')));
        expect(back.ok).toBe(true);
        expect(back.state).toEqual(state);
        expect(back.savedAt).toBe('2026-10-14T12:00:00.000Z');
    });

    it('een losse speelstand zonder omhulsel werkt ook', () => {
        const state = freshState();
        expect(parseBackup(JSON.stringify(state)).ok).toBe(true);
    });

    it('een ander bestand wordt netjes geweigerd', () => {
        expect(parseBackup('geen json').ok).toBe(false);
        expect(parseBackup('{"foo": 1}').ok).toBe(false);
        expect(parseBackup('{"app":"svenska-kat","state":{"version":1}}').ok).toBe(false);
        expect(parseBackup('{"foo": 1}').reason).toMatch(/geen back-up/);
    });

    it('de bestandsnaam heeft de datum erin', () => {
        expect(backupFileName('2026-10-14')).toBe('svenska-kat-backup-2026-10-14.json');
    });
});
