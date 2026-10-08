import { describe, it, expect } from 'vitest';
import { RULES, FALSE_FRIENDS } from '../src/js/content/ontdekken.js';
import { ruleRound, friendsRound, friendItem, findFriendWord } from '../src/js/engine/ontdek.js';
import { checkAnswer } from '../src/js/engine/check.js';

describe('Codekraker', () => {
    it('elke regel: drie woorden kraken en één andersom bouwen', () => {
        for (const rule of RULES) {
            const round = ruleRound(rule);
            expect(round.questions.map(q => q.mode)).toEqual(['decode', 'decode', 'decode', 'type']);
            expect(new Set(round.items.map(i => i.id)).size).toBe(4);
        }
    });

    it('een betekenis is goed met of zonder de, het of een', () => {
        const oog = ruleRound(RULES.find(r => r.id === 'o-oo')).items.find(i => i.show === 'öga');
        expect(checkAnswer(oog, 'oog').ok).toBe(true);
        expect(checkAnswer(oog, 'het oog').ok).toBe(true);
        expect(checkAnswer(oog, 'oor').ok).toBe(false);
    });

    it('andersom bouwen mag met of zonder en/ett', () => {
        const bouw = ruleRound(RULES.find(r => r.id === 'v-w')).items.at(-1);
        expect(checkAnswer(bouw, 'en vinter').ok).toBe(true);
        expect(checkAnswer(bouw, 'vinter').ok).toBe(true);
    });
});

describe('Valse vrienden', () => {
    it('het woord is in elke voorbeeldzin te vinden, ook verbogen', () => {
        for (const f of FALSE_FRIENDS) {
            expect(findFriendWord(f.sv, f.word), f.id).not.toBeNull();
        }
        const at = findFriendWord('Cleo sover på kudden.', 'kudde');
        expect('Cleo sover på kudden.'.slice(at.start, at.end)).toBe('kudden');
    });

    it('nieuwe valse vrienden eerst, vijf per rondje', () => {
        const seen = { 'vv-rolig': '2026-10-08', 'vv-glass': '2026-10-08' };
        const round = friendsRound(FALSE_FRIENDS, seen, 5, () => 0.5);
        expect(round.items).toHaveLength(5);
        expect(round.items.some(i => i.id === 'vv-rolig' || i.id === 'vv-glass')).toBe(false);
    });

    it('rolig betekent grappig, niet rustig', () => {
        const rolig = friendItem(FALSE_FRIENDS.find(f => f.id === 'rolig'));
        expect(checkAnswer(rolig, 'grappig').ok).toBe(true);
        expect(checkAnswer(rolig, 'leuk').ok).toBe(true);
        expect(checkAnswer(rolig, 'rustig').ok).toBe(false);
    });
});
