/**
 * Herhaalschema per item (successive relearning).
 *
 * - Dag 0 leren, daarna herhalen op dag 1, 3, 8, 16 en 30.
 * - Zolang de masterchallenge van een wereld nog open staat, geldt het
 *   ingeschoven schema 1, 3, 6, 12 voor de stof van die wereld.
 * - Een gemiste herhaling zet het item terug naar dag 1.
 * - Een item "zit" na drie keer goed op drie verschillende dagen.
 *   Zelf iets uit de rotatie halen kan niet; TNT stelt alleen uit.
 */

import { addDays, daysBetween } from './dates.js';

export const INTERVALS = [1, 3, 8, 16, 30];
export const COMPRESSED_INTERVALS = [1, 3, 6, 12];
export const DAYS_TO_SIT = 3;

function intervalFor(step, compressed) {
    const list = compressed ? COMPRESSED_INTERVALS : INTERVALS;
    return list[Math.min(step, list.length - 1)];
}

/** Nieuw item na de eerste keer leren. */
export function learn(today, { correct = true, compressed = false } = {}) {
    return {
        learned: today,
        step: 0,
        due: addDays(today, intervalFor(0, compressed)),
        correctDays: correct ? [today] : [],
        lastSeen: today,
        misses: correct ? 0 : 1
    };
}

/** Verwerk een herhaling. Geeft een nieuw record terug. */
export function review(record, today, { correct, compressed = false }) {
    if (!record) {
        return learn(today, { correct, compressed });
    }
    if (!correct) {
        return {
            ...record,
            step: 0,
            due: addDays(today, intervalFor(0, compressed)),
            lastSeen: today,
            misses: (record.misses || 0) + 1
        };
    }
    const correctDays = record.correctDays.includes(today)
        ? record.correctDays
        : [...record.correctDays, today];
    // Alleen een herhaling op of na de vervaldag schuift het schema op;
    // vaker op dezelfde dag oefenen telt niet als extra spreiding.
    const isDue = daysBetween(record.due, today) >= 0;
    const step = isDue && record.lastSeen !== today ? record.step + 1 : record.step;
    return {
        ...record,
        step,
        due: isDue ? addDays(today, intervalFor(step, compressed)) : record.due,
        correctDays,
        lastSeen: today
    };
}

export function sits(record) {
    return Boolean(record) && record.correctDays.length >= DAYS_TO_SIT;
}

export function isDue(record, today) {
    return Boolean(record) && daysBetween(record.due, today) >= 0;
}

/** Items die vandaag aan de beurt zijn, de meest achterstallige eerst. */
export function dueItems(srs, today) {
    return Object.entries(srs)
        .filter(([, rec]) => isDue(rec, today))
        .sort(([, a], [, b]) => (a.due < b.due ? -1 : a.due > b.due ? 1 : 0))
        .map(([id]) => id);
}
