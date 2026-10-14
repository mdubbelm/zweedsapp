/**
 * Zweedse feestdagen: op welke dag valt een dag in een bepaald jaar?
 *
 * Elke dag heeft een regel. Vaste dagen staan op een datum, beweeglijke
 * dagen hangen aan Pasen of aan een weekdag in een maand. Alles werkt met
 * lokale kalenderdagen als 'YYYY-MM-DD', net als dates.js.
 */

import { toDay, addDays, daysBetween } from './dates.js';

const pad = n => String(n).padStart(2, '0');
const ymd = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;

/** Weekdag van een datum: 0 = zondag, 6 = zaterdag. */
function weekday(y, m, d) {
    return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

/** Påskdagen (eerste paasdag), gregoriaanse computus (Meeus/Jones/Butcher). */
export function easterSunday(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return ymd(year, month, day);
}

/** De n-de weekdag (0 = zondag) van een maand; n = -1 is de laatste. */
export function nthWeekday(year, month, dow, n) {
    if (n > 0) {
        const first = weekday(year, month, 1);
        const day = 1 + ((dow - first + 7) % 7) + (n - 1) * 7;
        return ymd(year, month, day);
    }
    const last = new Date(Date.UTC(year, month, 0)).getUTCDate();
    const lastDow = weekday(year, month, last);
    return ymd(year, month, last - ((lastDow - dow + 7) % 7));
}

/** De eerste gegeven weekdag op of na een datum. */
export function weekdayOnOrAfter(year, month, day, dow) {
    const start = ymd(year, month, day);
    return addDays(start, (dow - weekday(year, month, day) + 7) % 7);
}

/**
 * Rekent een regel om naar een datum in een jaar.
 * Vormen:
 *   { fixed: [maand, dag] }
 *   { easter: offsetInDagen }
 *   { nth: [maand, weekdag, n] }               n = -1 voor de laatste
 *   { onOrAfter: [maand, dag, weekdag], offset? }
 *   { dates: { '2026': 'YYYY-MM-DD', ... } }    alleen bekende jaren, anders null
 * Bij nth en onOrAfter kan offset (dagen) erbij. avoidEaster: valt de dag op
 * Pasen plus zoveel dagen (bijv. 49, Pinksteren), dan geldt rule.instead.
 */
export function resolveRule(rule, year) {
    if (rule.avoidEaster !== undefined) {
        const plain = resolveRule({ ...rule, avoidEaster: undefined }, year);
        const clash = addDays(easterSunday(year), rule.avoidEaster);
        return plain === clash ? resolveRule(rule.instead, year) : plain;
    }
    if (rule.dates) {
        return rule.dates[String(year)] || null;
    }
    if (rule.fixed) {
        return ymd(year, rule.fixed[0], rule.fixed[1]);
    }
    if (rule.easter !== undefined) {
        return addDays(easterSunday(year), rule.easter);
    }
    if (rule.nth) {
        const [month, dow, n] = rule.nth;
        return addDays(nthWeekday(year, month, dow, n), rule.offset || 0);
    }
    if (rule.onOrAfter) {
        const [month, day, dow] = rule.onOrAfter;
        return addDays(weekdayOnOrAfter(year, month, day, dow), rule.offset || 0);
    }
    throw new Error('Onbekende regel');
}

/** Datum van een feestdag in een jaar. */
export function holidayDate(holiday, year) {
    return resolveRule(holiday.rule, year);
}

/**
 * Alle feestdagen rond een dag, gesorteerd: wat vandaag is, wat eraan komt
 * en wat al geweest is dit jaar. Een feestdag met span (aantal dagen, zoals
 * een markt) telt als vandaag zolang hij loopt.
 */
export function holidayCalendar(holidays, day = toDay()) {
    const year = Number(day.slice(0, 4));
    const entries = holidays.map(h => {
        const thisYear = holidayDate(h, year);
        const span = h.span || 1;
        const running = thisYear && thisYear <= day && daysBetween(thisYear, day) < span;
        const date = running || (thisYear && thisYear >= day) ? thisYear : holidayDate(h, year + 1);
        return {
            holiday: h,
            date,
            inDays: running ? 0 : date ? daysBetween(day, date) : null,
            past: thisYear && thisYear < day && !running ? thisYear : null
        };
    });
    const dated = entries.filter(x => x.inDays !== null).sort((a, b) => a.inDays - b.inDays);
    return {
        today: dated.filter(x => x.inDays === 0),
        upcoming: dated.filter(x => x.inDays > 0),
        past: entries.filter(x => x.past).sort((a, b) => (a.past < b.past ? 1 : -1))
    };
}
