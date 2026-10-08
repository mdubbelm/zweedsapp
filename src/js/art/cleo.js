/**
 * Cleo, de tuxedo-kat van de gebruikers, als hand-geschreven SVG.
 * Vijf poses: sit, wave, startle, happy, sleep. Zelfde karakter in elke pose:
 * zwarte kop en oren, witte bles die breed over de snuit loopt, roze neusje,
 * groene ogen, witte kin/borst/buik/sokjes, zwarte rug en staart.
 * Alle id's in <defs> krijgen de posenaam als prefix, zodat meerdere
 * instanties op een pagina elkaar niet bijten.
 */

const OUT = '#33262c';
const BK = '#2a2731';
const BKH = '#4b4655';
const WH = '#ffffff';
const WS = '#e1e6ef';
const PINK = '#f4a3ae';
const PINKD = '#c9707f';
const INNER = '#dd909d';
const GRN = '#92c93f';
const GRND = '#4d9a3a';

const r1 = n => Math.round(n * 10) / 10;
let instance = 0;
const POSES = ['sit', 'wave', 'startle', 'happy', 'sleep'];

/* ---------- onderdelen (kop in lokale coordinaten, midden 0,0) ---------- */

const HEAD_D =
    'M-57 6C-57 -26 -35 -46 0 -46C35 -46 57 -26 57 6C57 32 35 47 0 47C-35 47 -57 32 -57 6Z';

function ear(flat) {
    if (flat) {
        return `<g><path d="M-48 -24C-62 -36 -80 -34 -94 -22C-84 -10 -66 -4 -50 -2Z" fill="${BK}" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/><path d="M-54 -20C-64 -26 -76 -26 -84 -21C-76 -14 -65 -11 -54 -11Z" fill="${INNER}"/></g>`;
    }
    // linkeroor; rechter is gespiegeld
    const outer = 'M-53 -14C-59 -38 -55 -60 -46 -75C-30 -69 -15 -57 -6 -44Z';
    const inner = 'M-46 -26C-49 -41 -47 -55 -43 -62C-34 -57 -25 -50 -20 -44Z';
    return `<g><path d="${outer}" fill="${BK}" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/><path d="${inner}" fill="${INNER}"/><path d="M-50 -30C-51 -44 -48 -56 -44 -66" fill="none" stroke="${BKH}" stroke-width="2" stroke-linecap="round" opacity=".8"/></g>`;
}

function openEye(id, cx, cy, big) {
    const rx = big ? 11.5 : 10.6;
    const ry = big ? 13 : 11.8;
    const px = big ? 3.4 : 3.9;
    const py = big ? 5.2 : 9.2;
    const sclera = big
        ? `<ellipse cx="${cx}" cy="${cy}" rx="${rx + 2.4}" ry="${ry + 2.4}" fill="${WH}" stroke="#1c1a20" stroke-width="1.6"/>`
        : '';
    return (
        sclera +
        `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${id}-iris)" stroke="#1c1a20" stroke-width="1.4"/>` +
        `<ellipse cx="${cx}" cy="${cy}" rx="${px}" ry="${py}" fill="#121017"/>` +
        `<circle cx="${cx - 3.2}" cy="${cy - 4}" r="3" fill="${WH}"/>` +
        `<circle cx="${cx + 3.4}" cy="${cy + 4.2}" r="1.5" fill="${WH}" opacity=".85"/>` +
        (big
            ? ''
            : `<path d="M${cx - rx - 1.2} ${cy - 3.5}Q${cx} ${cy - ry - 5.5} ${cx + rx + 1.2} ${cy - 3.5}" fill="none" stroke="#14121a" stroke-width="2.4" stroke-linecap="round"/>`)
    );
}

function closedEye(cx, cy, up) {
    const d = up
        ? `M${cx - 9} ${cy + 2}Q${cx} ${cy - 9} ${cx + 9} ${cy + 2}`
        : `M${cx - 9} ${cy - 2}Q${cx} ${cy + 8} ${cx + 9} ${cy - 2}`;
    return `<path d="${d}" fill="none" stroke="#dbeab9" stroke-width="3" stroke-linecap="round"/>`;
}

/**
 * Kop. o.eyes: open | wide | happy | sleepy. o.mouth: smile | grin | o.
 */
function head(id, o = {}) {
    const eyes = o.eyes || 'open';
    const mouth = o.mouth || 'smile';
    let eyeSvg;
    if (eyes === 'wide') {
        eyeSvg = openEye(id, -23, -3, true) + openEye(id, 23, -3, true);
    } else if (eyes === 'happy') {
        eyeSvg = closedEye(-23, -1, true) + closedEye(23, -1, true);
    } else if (eyes === 'sleepy') {
        eyeSvg = closedEye(-23, -2, false) + closedEye(23, -2, false);
    } else {
        eyeSvg = openEye(id, -23, -3, false) + openEye(id, 23, -3, false);
    }

    let mouthSvg;
    if (mouth === 'grin') {
        mouthSvg =
            `<path d="M-10 21C-9 35 9 35 10 21Z" fill="#7d2d3d" stroke="${OUT}" stroke-width="1.8" stroke-linejoin="round"/>` +
            `<path d="M-5 30C-3 25 3 25 5 30C3 34 -3 34 -5 30Z" fill="#ee8c9c"/>` +
            `<path d="M0 17V21" stroke="${OUT}" stroke-width="1.8" stroke-linecap="round"/>`;
    } else if (mouth === 'o') {
        mouthSvg =
            `<ellipse cx="0" cy="27" rx="4.6" ry="6.2" fill="#7d2d3d" stroke="${OUT}" stroke-width="1.8"/>` +
            `<path d="M0 17V21" stroke="${OUT}" stroke-width="1.8" stroke-linecap="round"/>`;
    } else {
        mouthSvg = `<path d="M0 17V21M0 21C-3 26.5 -9.5 26.5 -12.5 22M0 21C3 26.5 9.5 26.5 12.5 22" fill="none" stroke="${OUT}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>`;
    }

    const blush = o.blush
        ? `<ellipse cx="-39" cy="14" rx="8" ry="5" fill="#f08a9a" opacity=".5"/><ellipse cx="39" cy="14" rx="8" ry="5" fill="#f08a9a" opacity=".5"/>`
        : '';

    const brows = `<path d="M-40 -14Q-33 -20 -26 -19M-42 -8Q-35 -13 -29 -12" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".85"/><path d="M40 -14Q33 -20 26 -19M42 -8Q35 -13 29 -12" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".85"/>`;
    const whiskers = `<g fill="none" stroke="#f6f6fa" stroke-width="1.3" stroke-linecap="round" opacity=".9"><path d="M-24 17Q-40 12 -57 13M-24 21Q-40 21 -56 25M-23 25Q-37 30 -50 36"/><path d="M24 17Q40 12 57 13M24 21Q40 21 56 25M23 25Q37 30 50 36"/></g>`;

    return (
        `<defs><clipPath id="${id}-hc"><path d="${HEAD_D}"/></clipPath>` +
        `<radialGradient id="${id}-iris" cx=".5" cy=".62" r=".7"><stop offset="0" stop-color="#c3e66a"/><stop offset=".6" stop-color="${GRN}"/><stop offset="1" stop-color="${GRND}"/></radialGradient></defs>` +
        `<g>${ear(o.flat)}<g transform="scale(-1 1)">${ear(o.flat)}</g></g>` +
        `<path d="${HEAD_D}" fill="${BK}"/>` +
        `<g clip-path="url(#${id}-hc)">` +
        `<ellipse cx="-22" cy="-33" rx="20" ry="7" fill="${BKH}" opacity=".55" transform="rotate(-12 -22 -33)"/>` +
        `<ellipse cx="45" cy="-20" rx="14" ry="5" fill="${BKH}" opacity=".35" transform="rotate(35 45 -20)"/>` +
        `<path d="M0 -41C3 -41 5 -37 6 -29L9 -6C28 -1 36 14 28 30C22 42 11 48 0 48C-11 48 -22 42 -28 30C-36 14 -28 -1 -9 -6L-6 -29C-5 -37 -3 -41 0 -41Z" fill="${WH}"/>` +
        `<path d="M-9 -6C-28 -1 -36 14 -28 30C-24 38 -18 44 -10 47C-24 40 -30 26 -24 14C-20 6 -14 2 -9 -6Z" fill="${WS}"/>` +
        `</g>` +
        `<path d="${HEAD_D}" fill="none" stroke="${OUT}" stroke-width="2.8" stroke-linejoin="round"/>` +
        `<path d="M-4 14C-4 9 4 9 4 14C4 18 1 20.5 0 21C-1 20.5 -4 18 -4 14Z" transform="translate(0 -3) scale(1.6 1.45) translate(0 -2)" fill="${PINK}" stroke="${PINKD}" stroke-width="1.1" stroke-linejoin="round"/>` +
        mouthSvg +
        `<path d="M-30 28C-26 33 -20 33 -17 29M30 28C26 33 20 33 17 29" fill="none" stroke="${WS}" stroke-width="0" />` +
        brows +
        eyeSvg +
        blush +
        whiskers
    );
}

function paw(cx, cy, rx, ry, toes) {
    const t = toes
        ? `<path d="M${cx - rx * 0.28} ${cy + ry * 0.15}V${cy + ry * 0.75}M${cx + rx * 0.28} ${cy + ry * 0.15}V${cy + ry * 0.75}" stroke="${OUT}" stroke-width="1.3" stroke-linecap="round" opacity=".75"/>`
        : '';
    return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${WH}" stroke="${OUT}" stroke-width="2.4"/>${t}`;
}

function shadow(cx, cy, rx, ry) {
    return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#2b1f1a" opacity=".16"/>`;
}

function strokeLine(d, w, color, outW = 3) {
    return `<path d="${d}" fill="none" stroke="${OUT}" stroke-width="${w + outW * 2}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

/* ---------- zittend lichaam (sit / wave / startle) ---------- */

function sittingBody(o = {}) {
    const fat = o.fat; // startle: staart bottle-brush
    const raiseRight = o.raiseRight; // wave
    const tail = fat
        ? strokeLine('M172 220C204 226 226 200 214 164C208 150 214 136 224 130', 20, BK, 2.6) +
          `<g fill="${BK}" stroke="${OUT}" stroke-width="2.2" stroke-linejoin="round"><path d="M192 226l-3 10 11-6ZM212 218l9 7-1-12ZM228 200l12 3-6-10ZM228 178l12 0-8-9ZM224 156l11-4-10-7ZM214 140l8-9-12 1Z"/></g>`
        : strokeLine('M172 224C206 236 232 214 224 184C220 168 206 158 208 146', 15, BK, 2.6) +
          `<path d="M178 226C204 234 226 216 221 190" fill="none" stroke="${BKH}" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>`;

    const bodyD =
        'M120 120C72 120 48 160 50 204C52 230 82 238 120 238C158 238 188 230 190 204C192 160 168 120 120 120Z';
    const chestD =
        'M120 128C92 128 78 160 82 204C84 226 100 236 120 236C140 236 156 226 158 204C162 160 148 128 120 128Z';

    const legR = raiseRight
        ? strokeLine('M144 172C158 168 170 150 178 124', 17, WH, 2.5) +
          `<path d="M150 168C160 164 168 150 173 134" fill="none" stroke="${WS}" stroke-width="3" stroke-linecap="round" opacity=".9"/>`
        : `<rect x="127" y="182" width="24" height="50" rx="12" fill="${WH}" stroke="${OUT}" stroke-width="2.6"/>`;

    const pawR = raiseRight
        ? `<g transform="rotate(14 182 114)"><ellipse cx="182" cy="114" rx="14.5" ry="13" fill="${WH}" stroke="${OUT}" stroke-width="2.6"/><ellipse cx="182" cy="118" rx="6" ry="4.6" fill="${PINK}"/><circle cx="174.5" cy="109" r="2.7" fill="${PINK}"/><circle cx="182" cy="106" r="2.7" fill="${PINK}"/><circle cx="189.5" cy="109" r="2.7" fill="${PINK}"/></g>`
        : paw(139, 230, 15, 10.5, true);

    return (
        shadow(122, 240, 74, 9) +
        tail +
        `<path d="${bodyD}" fill="${BK}" stroke="${OUT}" stroke-width="2.8" stroke-linejoin="round"/>` +
        `<path d="M70 150C60 168 58 190 62 208" fill="none" stroke="${BKH}" stroke-width="3" stroke-linecap="round" opacity=".75"/>` +
        // achterpoten, zwarte dijen met witte sokjes
        `<ellipse cx="73" cy="212" rx="20" ry="25" fill="${BK}" stroke="${OUT}" stroke-width="2.6"/><path d="M62 196C58 206 60 218 66 226" fill="none" stroke="${BKH}" stroke-width="2.2" stroke-linecap="round" opacity=".7"/>` +
        `<ellipse cx="169" cy="212" rx="20" ry="25" fill="${BK}" stroke="${OUT}" stroke-width="2.6"/>` +
        `<ellipse cx="68" cy="236" rx="15" ry="7.5" fill="${WH}" stroke="${OUT}" stroke-width="2.4"/><ellipse cx="172" cy="236" rx="15" ry="7.5" fill="${WH}" stroke="${OUT}" stroke-width="2.4"/>` +
        `<path d="${chestD}" fill="${WH}" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/>` +
        `<path d="M92 190C96 218 106 230 120 230C134 230 144 218 148 190C140 206 128 212 120 212C112 212 100 206 92 190Z" fill="${WS}" opacity=".75"/>` +
        `<rect x="91" y="182" width="24" height="50" rx="12" fill="${WH}" stroke="${OUT}" stroke-width="2.6"/>` +
        legR +
        paw(103, 230, 15, 10.5, true) +
        pawR
    );
}

/* ---------- poses ---------- */

function sit(id) {
    return (
        sittingBody() +
        `<g transform="translate(120 94)">${head(id, { eyes: 'open', mouth: 'smile' })}</g>`
    );
}

function wave(id) {
    return (
        sittingBody({ raiseRight: true }) +
        `<g transform="translate(120 94) rotate(-3)">${head(id, { eyes: 'open', mouth: 'grin', blush: true })}</g>`
    );
}

function startle(id) {
    const spikes = `<g fill="${BK}" stroke="${OUT}" stroke-width="2.2" stroke-linejoin="round"><path d="M56 176l-14-2 11-9ZM54 196l-15 3 14-11ZM58 216l-14 5 14-1Z"/><path d="M184 176l14-2-11-9ZM186 196l15 3-14-11Z"/></g>`;
    const shock = `<g fill="none" stroke="#e9a43a" stroke-width="3" stroke-linecap="round"><path d="M38 40L26 30M30 62L14 60M205 40L217 30M213 63L229 61M120 14V2"/></g>`;
    const sweat = `<path d="M188 70C193 78 196 83 193 88C190 92 184 91 183 86C182 81 185 76 188 70Z" fill="#8fd0f0" stroke="#3b7da0" stroke-width="1.8" stroke-linejoin="round"/>`;
    return (
        '<g transform="translate(0 4)">' +
        sittingBody({ fat: true }) +
        spikes +
        '</g>' +
        `<g transform="translate(120 98)">${head(id, { eyes: 'wide', mouth: 'o', flat: true })}</g>` +
        shock +
        sweat
    );
}

function happy(id) {
    // rollend op haar rug, buik bloot, pootjes in de lucht (zoals foto 2)
    const pads = (cx, cy, r) =>
        `<ellipse cx="${cx}" cy="${r1(cy + r * 0.25)}" rx="${r1(r * 0.52)}" ry="${r1(r * 0.4)}" fill="${PINK}"/><circle cx="${r1(cx - r * 0.55)}" cy="${r1(cy - r * 0.3)}" r="${r1(r * 0.21)}" fill="${PINK}"/><circle cx="${cx}" cy="${r1(cy - r * 0.55)}" r="${r1(r * 0.21)}" fill="${PINK}"/><circle cx="${r1(cx + r * 0.55)}" cy="${r1(cy - r * 0.3)}" r="${r1(r * 0.21)}" fill="${PINK}"/>`;
    const upPaw = (d, w, cx, cy, rx, ry, rot) =>
        strokeLine(d, w, WH, 2.6) +
        `<g transform="rotate(${rot} ${cx} ${cy})"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${WH}" stroke="${OUT}" stroke-width="2.6"/>${pads(cx, cy + 1, rx * 0.95)}</g>`;
    const heart = (x, y, sc, rot) =>
        `<path transform="translate(${x} ${y}) rotate(${rot}) scale(${sc})" d="M0 5C-9 -3 -6 -10 0 -6C6 -10 9 -3 0 5Z" fill="#ee7f93" stroke="#b44a5f" stroke-width="1.4" stroke-linejoin="round"/>`;
    return (
        shadow(130, 238, 98, 9) +
        strokeLine('M196 196C226 206 232 230 206 238C190 242 176 238 166 230', 14, BK, 2.6) +
        // achterpoten omhoog
        upPaw('M188 172C202 158 208 136 206 108', 21, 206, 100, 17, 15.5, 6) +
        upPaw('M204 190C220 180 228 164 226 142', 19, 226, 134, 14.5, 13.5, 10) +
        // rug (zwart) onder, buik (wit) erboven
        `<ellipse cx="128" cy="186" rx="88" ry="52" fill="${BK}" stroke="${OUT}" stroke-width="2.8"/>` +
        `<path d="M62 190C80 226 150 236 196 214" fill="none" stroke="${BKH}" stroke-width="3" stroke-linecap="round" opacity=".7"/>` +
        `<path d="M54 172C54 136 92 118 134 120C184 122 214 146 210 180C206 208 170 224 128 224C86 224 54 204 54 172Z" fill="${WH}" stroke="${OUT}" stroke-width="2.8" stroke-linejoin="round"/>` +
        `<path d="M138 124C168 124 196 142 204 166C186 160 160 160 146 172C130 184 118 152 138 124Z" fill="${BK}" stroke="${OUT}" stroke-width="2.4" stroke-linejoin="round"/>` +
        `<path d="M146 130C164 130 184 140 196 154" fill="none" stroke="${BKH}" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>` +
        `<path d="M86 206C110 224 150 222 176 206C150 210 112 206 92 190Z" fill="${WS}" opacity=".9"/>` +
        `<path d="M110 176C116 181 126 181 132 175" fill="none" stroke="#f0c4cc" stroke-width="2.6" stroke-linecap="round"/>` +
        // voorpootjes
        upPaw('M112 150C112 130 118 112 124 100', 17, 126, 92, 14, 13, -6) +
        upPaw('M134 154C142 134 152 122 160 112', 16, 164, 104, 13, 12.5, 14) +
        // kop, schuin achterover
        `<g transform="translate(70 128) rotate(-24) scale(.96)">${head(id, { eyes: 'happy', mouth: 'grin', blush: true })}</g>` +
        heart(26, 62, 1.1, -14) +
        heart(100, 30, 0.8, 10) +
        `<path d="M20 90l-9-5M10 110l-10 1M50 44l-5-8" stroke="#e9a43a" stroke-width="3" stroke-linecap="round" fill="none"/>`
    );
}

function sleep(id) {
    const z = (x, y, s) =>
        `<path d="M${x} ${y}h${10 * s}l${-10 * s} ${10 * s}h${10 * s}" fill="none" stroke="#7aa6e0" stroke-width="${2.6}" stroke-linecap="round" stroke-linejoin="round"/>`;
    const bodyD =
        'M26 206C24 146 68 112 128 112C190 112 224 150 220 196C218 224 192 234 124 234C62 234 28 226 26 206Z';
    return (
        shadow(124, 238, 98, 8) +
        `<path d="${bodyD}" fill="${BK}" stroke="${OUT}" stroke-width="2.8" stroke-linejoin="round"/>` +
        `<path d="M70 130C102 114 150 112 190 130" fill="none" stroke="${BKH}" stroke-width="3" stroke-linecap="round" opacity=".7"/>` +
        // zwarte ruglijn / witte buikrand onder
        `<path d="M70 226C96 232 150 234 188 226C200 216 204 204 200 194C170 214 100 216 66 200C64 210 64 218 70 226Z" fill="${WH}" stroke="${OUT}" stroke-width="2.4" stroke-linejoin="round"/>` +
        // achterpoot
        `<ellipse cx="176" cy="186" rx="30" ry="26" fill="${BK}" stroke="${OUT}" stroke-width="2.6"/><path d="M158 170C176 162 196 168 202 184" fill="none" stroke="${BKH}" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>` +
        `<ellipse cx="206" cy="212" rx="12" ry="9" fill="${WH}" stroke="${OUT}" stroke-width="2.4"/>` +
        // staart om haar heen
        strokeLine('M210 214C190 238 128 244 76 238C54 236 40 230 30 220', 14, BK, 2.6) +
        // voorpootjes onder de kin
        `<g transform="rotate(-6 100 218)">${paw(96, 218, 17, 10.5, true)}${paw(128, 220, 17, 10.5, true)}</g>` +
        `<g transform="translate(88 176) rotate(-10) scale(.82)">${head(id, { eyes: 'sleepy', mouth: 'smile' })}</g>` +
        z(168, 84, 1.5) +
        z(190, 58, 1.1) +
        z(206, 38, 0.8)
    );
}

const BUILDERS = { sit, wave, startle, happy, sleep };

/**
 * @param {'sit'|'wave'|'startle'|'happy'|'sleep'} pose
 * @param {number} size breedte en hoogte in px
 * @returns {string} <svg>-string
 */
export function cleo(pose = 'sit', size = 120) {
    const key = POSES.includes(pose) ? pose : 'sit';
    instance += 1;
    const id = `cleo-${key}-${instance}`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 250" width="${size}" height="${size}" role="img" aria-label="Cleo de kat" focusable="false">${BUILDERS[key](id)}</svg>`;
}
