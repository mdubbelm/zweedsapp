/**
 * Datumhulpjes. Alles werkt met lokale kalenderdagen als 'YYYY-MM-DD',
 * zodat een avondsessie en een ochtendsessie op verschillende dagen tellen.
 */

export function toDay(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

export function addDays(day, n) {
    const [y, m, d] = day.split('-').map(Number);
    const date = new Date(y, m - 1, d + n);
    return toDay(date);
}

export function daysBetween(a, b) {
    const [ay, am, ad] = a.split('-').map(Number);
    const [by, bm, bd] = b.split('-').map(Number);
    const ms = Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad);
    return Math.round(ms / 86400000);
}
