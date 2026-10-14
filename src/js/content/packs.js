/**
 * Alle pakketten (uitjes en feestdagen) en hun items bij elkaar.
 */

import { OUTINGS } from './uitjes.js';
import { HOLIDAYS } from './feestdagen.js';

export const PACKS = [...OUTINGS, ...HOLIDAYS];

export const PACK_ITEMS = PACKS.flatMap(p => p.items.map(it => ({ ...it, pack: p.id })));

export function packById(id) {
    return PACKS.find(p => p.id === id) || null;
}
