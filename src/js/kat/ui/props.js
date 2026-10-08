/**
 * Kleine illustraties die op het pad liggen: kist en trofee.
 * Zelfde tekenstijl als de wereldkaarten: donkerbruine contour, zachte schaduw.
 */

const OUT = '#4a2f1f';

export function chest(open = false, size = 64) {
    const lid = open
        ? `<path d="M10 30 L14 12 Q32 4 50 12 L54 30 Z" fill="#c98a4b" stroke="${OUT}" stroke-width="2.5" stroke-linejoin="round"/>
           <path d="M14 12 Q32 4 50 12" fill="none" stroke="#e8b04a" stroke-width="4"/>
           <ellipse cx="32" cy="31" rx="20" ry="5" fill="#ffe27a"/>
           <circle cx="25" cy="29" r="3" fill="#ffd23f" stroke="#c99a1c" stroke-width="1.2"/>
           <circle cx="33" cy="27.5" r="3" fill="#ffd23f" stroke="#c99a1c" stroke-width="1.2"/>
           <circle cx="40" cy="30" r="3" fill="#ffd23f" stroke="#c99a1c" stroke-width="1.2"/>`
        : `<path d="M8 32 Q8 16 32 14 Q56 16 56 32 Z" fill="#c98a4b" stroke="${OUT}" stroke-width="2.5" stroke-linejoin="round"/>
           <path d="M16 31 Q16 20 32 18" fill="none" stroke="#dca066" stroke-width="3" stroke-linecap="round"/>
           <path d="M30 14.5 V32 M34 14.5 V32" stroke="#e8b04a" stroke-width="3"/>`;
    return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true">
        <ellipse cx="32" cy="57" rx="24" ry="4" fill="#000" opacity=".15"/>
        <rect x="8" y="31" width="48" height="24" rx="3" fill="#b5733b" stroke="${OUT}" stroke-width="2.5"/>
        <path d="M8 38 H56" stroke="${OUT}" stroke-width="1.5" opacity=".5"/>
        <path d="M30 31 V55 M34 31 V55" stroke="#e8b04a" stroke-width="3"/>
        <rect x="27" y="35" width="10" height="9" rx="2" fill="#ffd23f" stroke="${OUT}" stroke-width="2"/>
        <circle cx="32" cy="39.5" r="1.4" fill="${OUT}"/>
        ${lid}
    </svg>`;
}

export function trophy(earned = false, size = 64) {
    const gold = earned ? '#ffc93c' : '#e7e1d6';
    const shade = earned ? '#e0a21b' : '#cfc7b8';
    return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true">
        <ellipse cx="32" cy="59" rx="18" ry="3.5" fill="#000" opacity=".15"/>
        <path d="M18 10 H46 V24 Q46 40 32 42 Q18 40 18 24 Z" fill="${gold}" stroke="${OUT}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M18 14 H10 Q10 28 20 30 M46 14 H54 Q54 28 44 30" fill="none" stroke="${OUT}" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M38 13 V26 Q38 34 32 37" fill="none" stroke="${shade}" stroke-width="3" stroke-linecap="round"/>
        <rect x="28" y="42" width="8" height="7" fill="${gold}" stroke="${OUT}" stroke-width="2.5"/>
        <rect x="20" y="49" width="24" height="8" rx="2" fill="${earned ? '#8b5a33' : '#b9b0a2'}" stroke="${OUT}" stroke-width="2.5"/>
        ${earned ? '<path d="M32 17 l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.6-4.8 2.6.9-5.4-3.9-3.8 5.4-.8z" fill="#fff5d1"/>' : ''}
    </svg>`;
}
