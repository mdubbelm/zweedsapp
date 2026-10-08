/**
 * Lijniconen (24x24, stroke currentColor). Elke spelvorm heeft er een.
 */

const wrap = (body, size = 24) =>
    `<svg class="ico" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

const P = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
    quests: '<path d="M14.5 4.5l5 5L9 20H4v-5z"/><path d="M12.5 6.5l5 5"/>',
    beuken: '<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
    stats: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    settings:
        '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
    flame: '<path d="M12 22c4 0 7-2.7 7-6.8 0-3.4-2.2-5.6-3.6-7.3-.4 1.9-1.4 3-2.6 3.5.3-3.7-1.5-6.9-4.3-8.4.3 3.3-1.7 5.4-3 7.3A8 8 0 0 0 5 15.2C5 19.3 8 22 12 22z"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    speaker:
        '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
    pencil: '<path d="M14.5 4.5l5 5L9 20H4v-5z"/>',
    dice: '<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
    headphones:
        '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="5" height="7" rx="2"/><rect x="16" y="14" width="5" height="7" rx="2"/>',
    puzzle: '<path d="M10 3h4v3a2 2 0 1 0 4 0V3h3v7h-3a2 2 0 1 0 0 4h3v7h-7v-3a2 2 0 1 0-4 0v3H3v-7h3a2 2 0 1 0 0-4H3V3z"/>',
    scale: '<path d="M12 3v18M5 21h14M6 7h12"/><path d="M6 7l-3 7a3 3 0 0 0 6 0zM18 7l-3 7a3 3 0 0 0 6 0z"/>',
    joker: '<path d="M4 20 6 6l6 5 6-5 2 14z"/><circle cx="6" cy="5" r="1.5"/><circle cx="12" cy="9" r="1.5"/><circle cx="18" cy="5" r="1.5"/>',
    gap: '<path d="M3 12h4M17 12h4"/><rect x="9" y="8" width="6" height="8" rx="1.5" stroke-dasharray="2 2"/>',
    stopwatch: '<circle cx="12" cy="14" r="7"/><path d="M12 14V10M10 2h4M18.5 7.5 20 6"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>',
    paper: '<path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h8M9 17h6"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    check: '<path d="M5 12.5 10 17.5 19 7"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4M6.6 6.6C3.8 8.3 2 12 2 12s3.6 7 10 7a9.8 9.8 0 0 0 4.4-1"/>',
    play: '<path d="M7 4v16l13-8z"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
    gift: '<rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v8h14v-8M12 8v13M12 8c-1.5-3.5-6-4-6-1.5S9 8 12 8zm0 0c1.5-3.5 6-4 6-1.5S15 8 12 8z"/>',
    heart: '<path d="M12 20s-7-4.4-9.2-9A5 5 0 0 1 12 6a5 5 0 0 1 9.2 5c-2.2 4.6-9.2 9-9.2 9z"/>',
    map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    chevron: '<path d="M9 6l6 6-6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    paw: '<ellipse cx="12" cy="16" rx="5" ry="4.2" fill="currentColor" stroke="none"/><ellipse cx="5.5" cy="10.5" rx="2.2" ry="2.8" fill="currentColor" stroke="none"/><ellipse cx="9.5" cy="6.5" rx="2.2" ry="2.9" fill="currentColor" stroke="none"/><ellipse cx="14.5" cy="6.5" rx="2.2" ry="2.9" fill="currentColor" stroke="none"/><ellipse cx="18.5" cy="10.5" rx="2.2" ry="2.8" fill="currentColor" stroke="none"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M10.8 12.2 20 3M16 7l3 3M18 5l2 2"/>',
    mask: '<path d="M3 7c3-1.5 6-1.5 9 0 3-1.5 6-1.5 9 0 0 6-3 10-6 10-1.6 0-2.4-1.5-3-3-.6 1.5-1.4 3-3 3-3 0-6-4-6-10z"/><path d="M7 11.5h2M15 11.5h2"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>'
};

export function icon(name, size) {
    return wrap(P[name] || '', size);
}

/** Spelvormen met naam en icoon, zodat het een modus is en geen oefening. */
export const MODES = {
    card: { label: 'Woorden', icon: 'pencil' },
    guess: { label: 'Gokje', icon: 'dice' },
    type: { label: 'Woorden', icon: 'pencil' },
    listen: { label: 'Geheim bericht', icon: 'headphones' },
    gap: { label: 'Gatenzin', icon: 'gap' },
    form: { label: 'Vormen', icon: 'refresh' },
    builder: { label: 'Bouwer', icon: 'puzzle' },
    truefalse: { label: 'Sant eller falskt', icon: 'scale' },
    silly: { label: 'Rare zin', icon: 'joker' },
    decode: { label: 'Codekraker', icon: 'key' },
    friend: { label: 'Valse vriend', icon: 'mask' },
    pen: { label: 'Pen en papier', icon: 'paper' },
    sprint: { label: 'Sprint', icon: 'stopwatch' }
};
