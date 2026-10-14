import { describe, it, expect } from 'vitest';
import { cleoOutfit, vandaagHtml } from '../src/js/kat/ui/vandaag.js';
import { cleo, CLEO_WEAR } from '../src/js/art/cleo.js';

const app = day => ({ calendarDay: () => day });

describe('Cleo op een feestdag', () => {
    it('draagt op de dag zelf iets van die dag, op een gewone dag niets', () => {
        expect(cleoOutfit(app('2026-12-13'))).toEqual({ wear: 'lichtkroon' });
        expect(cleoOutfit(app('2026-12-24'))).toEqual({ wear: 'tomteluva' });
        expect(cleoOutfit(app('2026-10-04'))).toEqual({ wear: 'kanelbulle' });
        expect(cleoOutfit(app('2026-10-14'))).toEqual({});
    });

    it('cleo() zonder derde argument blijft gelijk, met wear komt er een laag bij', () => {
        const plain = cleo('sit', 60);
        expect(plain).toContain('aria-label="Cleo de kat"');
        for (const wear of CLEO_WEAR) {
            const dressed = cleo('sit', 60, { wear });
            expect(dressed.length, wear).toBeGreaterThan(plain.length);
            expect(dressed, wear).toMatch(/aria-label="Cleo de kat (met|bij) /);
        }
        expect(cleo('sit', 60, { wear: 'onbekend' })).toContain('aria-label="Cleo de kat"');
    });

    it('een dag van één dag gaat in de strook voor een markt die al loopt', () => {
        // 4 oktober: Kanelbullens dag en de appelmarkt in Kivik tegelijk.
        const html = vandaagHtml(app('2026-10-04'));
        expect(html).toContain('data-open="kanelbullens-dag"');
        expect(html).toContain('vd-more');
    });

    it('de strook krijgt de kleur van de dag', () => {
        expect(vandaagHtml(app('2026-12-13'))).toContain('data-tint="lucia"');
        expect(vandaagHtml(app('2026-12-24'))).toContain('data-tint="jul"');
    });
});
