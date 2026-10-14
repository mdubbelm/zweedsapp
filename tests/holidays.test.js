import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { HOLIDAYS } from '../src/js/content/feestdagen.js';
import { easterSunday, holidayDate, holidayCalendar } from '../src/js/engine/holidays.js';

// Datums per jaar, nagelopen tegen kalender.se, sv.wikipedia en de sites van
// de markten zelf (oktober 2026). null = nog niet gepubliceerd.
const EXPECTED = JSON.parse(readFileSync(join(__dirname, 'fixtures-feestdagen.json'), 'utf8'));

describe('feestdagen vallen op de goede dag', () => {
    it('elke feestdag heeft verwachte datums', () => {
        for (const h of HOLIDAYS) {
            expect(EXPECTED[h.id], h.id).toBeDefined();
        }
    });

    for (const year of [2026, 2027, 2028]) {
        it(`klopt voor ${year}`, () => {
            const wrong = HOLIDAYS.filter(h => holidayDate(h, year) !== EXPECTED[h.id][year]).map(
                h => `${h.id}: ${holidayDate(h, year)} in plaats van ${EXPECTED[h.id][year]}`
            );
            expect(wrong).toEqual([]);
        });
    }

    it('Pasen klopt ook buiten de drie jaar (bekende jaren)', () => {
        expect(easterSunday(2019)).toBe('2019-04-21');
        expect(easterSunday(2024)).toBe('2024-03-31');
        expect(easterSunday(2025)).toBe('2025-04-20');
        expect(easterSunday(2038)).toBe('2038-04-25');
    });

    it('mors dag schuift naar juni als hij op pinksterdag valt', () => {
        // 2031: laatste zondag van mei is 25 mei, pinksteren is 1 juni, dus geen botsing.
        // 2015: laatste zondag van mei is 31 mei, pinksteren 24 mei. 2009: beide 31 mei.
        const mors = HOLIDAYS.find(h => h.id === 'mors-dag');
        expect(holidayDate(mors, 2009)).toBe('2009-06-07');
        expect(holidayDate(mors, 2015)).toBe('2015-05-31');
    });
});

describe('de kalender rond een dag', () => {
    it('op 13 december is het Lucia', () => {
        const cal = holidayCalendar(HOLIDAYS, '2026-12-13');
        expect(cal.today.map(x => x.holiday.id)).toContain('lucia');
    });

    it('op 14 oktober komt eerst alla helgons dag en is kanelbullens dag geweest', () => {
        const cal = holidayCalendar(HOLIDAYS, '2026-10-14');
        expect(cal.today).toEqual([]);
        expect(cal.upcoming[0].holiday.id).toBe('alla-helgons-dag');
        expect(cal.upcoming[0].inDays).toBe(17);
        expect(cal.past[0].holiday.id).toBe('kanelbullens-dag');
    });

    it('een markt van meerdere dagen telt elke dag mee', () => {
        const cal = holidayCalendar(HOLIDAYS, '2026-07-26');
        expect(cal.today.map(x => x.holiday.id)).toContain('kiviks-marknad');
    });

    it('een dag zonder bekende datum volgend jaar verdwijnt niet uit het verleden', () => {
        const cal = holidayCalendar(HOLIDAYS, '2026-12-01');
        expect(cal.past.map(x => x.holiday.id)).toContain('appelmarknaden');
        expect(cal.upcoming.map(x => x.holiday.id)).not.toContain('appelmarknaden');
    });
});
