/**
 * Kleine scènes voor de uitjes en feestdagen, als hand-geschreven SVG.
 * Zelfde stijl als worlds.js: donkerbruine contour, egale kleuren, een
 * lichte streep linksboven en een zachte schaduw rechtsonder. Geen tekst in
 * de tekening en geen <defs>, zodat dezelfde scène twee keer op een scherm
 * kan staan zonder dat id's botsen.
 *
 *  - scene(id): landschap 320x180 voor een uitje of een feestdag.
 *  - motif(id): alleen het hoofdmotief van een feestdag, vierkant, voor lijstjes.
 *  - bun(kind): een Zweeds broodje (bulle) voor de vitrine van de bakker.
 *  - spotScene(id, woord): het nieuwe woord als deel van zijn plek, de rest zacht.
 *  - spotThing(id, tekst): dat ding in zijn plek bij het oefenen, ook voor een hoger vak.
 *  - sceneSky(id): achtergrondkleur die bij de scène hoort.
 */

const O = '#5b3a29';
const SH = 'rgba(70,45,20,.17)';
const r1 = n => Math.round(n * 10) / 10;

const st = (w = 2.6) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round"`;
const shadow = (cx, cy, rx, ry = rx / 4) =>
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${SH}"/>`;
/** dikke lijn met contour, zoals de stelen en takken in worlds.js */
const line = (d, w, color) =>
    `<path d="${d}" fill="none" stroke="${O}" stroke-width="${w + 5}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const at = (x, y, s, body) => `<g transform="translate(${r1(x)} ${r1(y)}) scale(${s})">${body}</g>`;

function rng(seed) {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/* ---------- bouwstenen ---------- */

function sun(x, y, r = 15) {
    return `<circle cx="${x}" cy="${y}" r="${r + 7}" fill="#fff3b0" opacity=".55"/><circle cx="${x}" cy="${y}" r="${r}" fill="#ffd84a" ${st(2.2)}/><path d="M${x - r * 0.5} ${y - r * 0.35}a${r * 0.6} ${r * 0.6} 0 0 1 ${r * 0.55} -${r * 0.4}" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>`;
}

function cloud(x, y, s = 1) {
    return at(
        x,
        y,
        s,
        `<path d="M-26 6C-34 6 -34 -6 -24 -6C-24 -16 -8 -18 -4 -10C0 -20 18 -18 18 -6C28 -8 30 6 22 6Z" fill="#fff" ${st(2)}/><path d="M-20 -2C-18 -8 -12 -9 -8 -6" fill="none" stroke="#e1edf5" stroke-width="2.4" stroke-linecap="round"/>`
    );
}

function gull(x, y, s = 1) {
    return at(
        x,
        y,
        s,
        `<path d="M-10 0Q-5 -6 0 0Q5 -6 10 0" fill="none" stroke="${O}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`
    );
}

/** zweeds huisje, muur in de gegeven kleur, witte hoeken */
function house(x, y, w, h, wall, roof = '#4a4a55', o = {}) {
    const hw = w / 2;
    const door =
        o.door === false
            ? ''
            : `<rect x="${-hw * 0.6}" y="${-h * 0.62}" width="${hw * 0.42}" height="${h * 0.62}" fill="#9a5b3a" ${st(1.6)}/>`;
    return at(
        x,
        y,
        1,
        shadow(8, 2, hw + 10, 5) +
            `<rect x="${-hw}" y="${-h}" width="${w}" height="${h}" fill="${wall}" ${st()}/>` +
            `<rect x="${hw - 7}" y="${-h}" width="7" height="${h}" fill="#000" opacity=".1"/>` +
            `<rect x="${-hw}" y="${-h}" width="4" height="${h}" fill="#fff" ${st(1.4)}/><rect x="${hw - 4}" y="${-h}" width="4" height="${h}" fill="#fff" ${st(1.4)}/>` +
            `<path d="M${-hw - 6} ${-h + 2}L0 ${-h - w * 0.42}L${hw + 6} ${-h + 2}Z" fill="${roof}" ${st()}/>` +
            `<path d="M${-hw - 2} ${-h}L-2 ${-h - w * 0.38}" stroke="#fff" stroke-width="2" opacity=".3" stroke-linecap="round"/>` +
            `<rect x="${hw * 0.15}" y="${-h * 0.78}" width="${hw * 0.5}" height="${h * 0.38}" fill="#cfe9f7" stroke="#fff" stroke-width="2.4"/><rect x="${hw * 0.15}" y="${-h * 0.78}" width="${hw * 0.5}" height="${h * 0.38}" fill="none" ${st(1.2)}/>` +
            door
    );
}

function tree(x, y, s = 1, leaf = '#5fae45', fruit = null) {
    const fr = fruit
        ? [
              [-14, -40],
              [10, -50],
              [4, -30],
              [-4, -54],
              [18, -34],
              [-20, -28]
          ]
              .map(
                  ([fx, fy]) =>
                      `<circle cx="${fx}" cy="${fy}" r="3.6" fill="${fruit}" ${st(1.2)}/><circle cx="${fx - 1}" cy="${fy - 1.2}" r="1" fill="#fff" opacity=".7"/>`
              )
              .join('')
        : '';
    return at(
        x,
        y,
        s,
        shadow(8, 2, 26, 6) +
            `<path d="M-5 2C-4 -10 -4 -20 -7 -30L7 -30C4 -20 4 -10 5 2Z" fill="#8a5a3a" ${st(2.2)}/>` +
            `<path d="M-30 -36C-36 -54 -20 -70 -4 -66C6 -78 30 -70 30 -52C40 -44 32 -24 18 -24C10 -16 -6 -18 -10 -24C-24 -20 -34 -26 -30 -36Z" fill="${leaf}" ${st(2.6)}/>` +
            `<path d="M-22 -44C-22 -54 -12 -60 -4 -58" fill="none" stroke="#fff" stroke-width="3" opacity=".3" stroke-linecap="round"/>` +
            fr
    );
}

function flowers(x, y, petal, s = 1) {
    const one = (dx, dy) =>
        `<path d="M${dx} ${dy}V${dy + 9}" stroke="#3f7f31" stroke-width="2" stroke-linecap="round"/>` +
        [0, 72, 144, 216, 288]
            .map(
                a =>
                    `<circle cx="${r1(dx + Math.sin((a * Math.PI) / 180) * 3.6)}" cy="${r1(dy - Math.cos((a * Math.PI) / 180) * 3.6)}" r="2.8" fill="${petal}" stroke="${O}" stroke-width="1"/>`
            )
            .join('') +
        `<circle cx="${dx}" cy="${dy}" r="2" fill="#f2a33a"/>`;
    return at(x, y, s, one(-7, -9) + one(4, -13) + one(10, -6));
}

function tuft(x, y, s = 1, c = '#5aa43f') {
    return at(
        x,
        y,
        s,
        `<path d="M-8 1C-7 -6 -10 -10 -13 -12C-8 -11 -5 -7 -4 -2C-3 -9 -1 -14 1 -17C3 -12 4 -7 3 -2C5 -7 8 -10 12 -12C9 -7 8 -3 7 1Z" fill="${c}" stroke="${O}" stroke-width="1.4" stroke-linejoin="round"/>`
    );
}

function sheep(x, y, s = 1, flip = false) {
    const body = [
        [-10, -14, 8],
        [0, -17, 9],
        [10, -14, 8],
        [-4, -9, 8],
        [6, -9, 8]
    ];
    return at(
        x,
        y,
        flip ? `${-s} ${s}` : s,
        shadow(2, 1, 20, 4) +
            `<path d="M-8 -6V1M8 -6V1" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M-8 -6V1M8 -6V1" stroke="#3a3540" stroke-width="2.6" stroke-linecap="round"/>` +
            `<g fill="${O}">${body.map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r + 2}"/>`).join('')}</g>` +
            `<g fill="#f7f4ee">${body.map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`).join('')}</g>` +
            `<ellipse cx="20" cy="-15" rx="6" ry="7.5" fill="#3a3540" ${st(1.8)}/><circle cx="22" cy="-17" r="1.3" fill="#fff"/><path d="M15 -20l-4 -3" stroke="${O}" stroke-width="3" stroke-linecap="round"/>`
    );
}

function candle(x, y, h = 30, color = '#fff8ec', s = 1, lit = true) {
    const flame = lit
        ? `<path d="M0 ${-h - 16}C4 ${-h - 10} 4 ${-h - 5} 0 ${-h - 4}C-4 ${-h - 5} -4 ${-h - 10} 0 ${-h - 16}Z" fill="#ffb02e" ${st(1.4)}/><path d="M0 ${-h - 11}C1.6 ${-h - 8} 1.4 ${-h - 6} 0 ${-h - 5}" fill="none" stroke="#fff3b0" stroke-width="1.6" stroke-linecap="round"/>`
        : '';
    return at(
        x,
        y,
        s,
        `<rect x="-4" y="${-h}" width="8" height="${h}" rx="2" fill="${color}" ${st(1.8)}/>` +
            `<path d="M0 ${-h}V${-h - 4}" stroke="${O}" stroke-width="1.6"/>` +
            flame
    );
}

/* ---------- broodjes (bullar) ---------- */

const PEARL = (pts, r = 1.5) =>
    pts
        .map(
            ([x, y]) =>
                `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${O}" stroke-width=".7"/>`
        )
        .join('');

const BUNS = {
    kanelbulle: () =>
        shadow(4, 4, 30, 6) +
        `<path d="M-30 0L-26 -14H26L30 0Z" fill="#f7f1e3" ${st(2)}/><path d="M-22 -14V0M-12 -14V0M0 -14V0M12 -14V0M22 -14V0" stroke="${O}" stroke-width="1" opacity=".35"/>` +
        `<ellipse cx="0" cy="-20" rx="27" ry="15" fill="#c9843e" ${st(2.4)}/>` +
        `<path d="M0 -20c4 -1 5 4 1 5c-6 1 -8 -6 -3 -9c8 -4 15 3 12 10c-4 8 -18 7 -21 -2c-4 -11 9 -18 19 -14" fill="none" stroke="#7a4220" stroke-width="2.6" stroke-linecap="round"/>` +
        `<path d="M-20 -28c4 -4 10 -6 16 -6" fill="none" stroke="#f0c088" stroke-width="2.4" stroke-linecap="round"/>` +
        PEARL([
            [-14, -24],
            [-6, -30],
            [8, -29],
            [16, -22],
            [10, -14],
            [-2, -12],
            [-17, -15],
            [3, -22]
        ]),
    kardemummabulle: () =>
        shadow(4, 4, 30, 6) +
        `<path d="M-28 0L-24 -12H24L28 0Z" fill="#f7f1e3" ${st(2)}/>` +
        line(
            'M-18 -14C-24 -30 -4 -36 0 -24C4 -12 20 -14 20 -26C20 -36 6 -36 2 -26C-2 -16 -12 -8 -18 -14Z',
            9,
            '#d39a52'
        ) +
        `<path d="M-18 -26c2 -5 7 -6 10 -4M6 -32c4 -2 8 -1 10 2" fill="none" stroke="#f3c98e" stroke-width="2.2" stroke-linecap="round"/>` +
        PEARL([
            [-16, -20],
            [-8, -28],
            [10, -30],
            [16, -22],
            [6, -18],
            [-4, -16]
        ]),
    semla: () =>
        shadow(4, 4, 30, 6) +
        `<path d="M-26 -2C-28 -14 -18 -20 0 -20C18 -20 28 -14 26 -2C20 2 -20 2 -26 -2Z" fill="#d79a52" ${st(2.4)}/>` +
        `<path d="M-27 -16C-30 -28 -20 -34 -10 -30C-6 -38 8 -38 12 -30C22 -34 32 -26 26 -16C14 -12 -14 -12 -27 -16Z" fill="#fffaf2" ${st(2.2)}/>` +
        `<path d="M-14 -22c4 -3 9 -3 12 0M6 -24c3 -2 7 -2 9 1" fill="none" stroke="#e6dccb" stroke-width="2" stroke-linecap="round"/>` +
        `<path d="M-22 -28C-20 -42 -10 -48 0 -48C10 -48 20 -42 22 -28C10 -34 -10 -34 -22 -28Z" fill="#d79a52" ${st(2.4)}/>` +
        `<path d="M-14 -38C-8 -44 2 -45 10 -42" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".85"/>` +
        `<path d="M-18 -32c4 -8 10 -11 18 -11" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".7" stroke-dasharray="1 4"/>`,
    lussekatt: () =>
        shadow(4, 4, 30, 6) +
        line(
            'M-20 -6C-30 -6 -30 -22 -20 -22C-8 -22 -8 -8 0 -16C8 -24 8 -38 20 -38C30 -38 30 -22 20 -22',
            9,
            '#f2b52c'
        ) +
        `<path d="M-22 -16c0 -2 2 -4 4 -4M18 -34c2 -1 4 -1 5 1" fill="none" stroke="#fde08a" stroke-width="2" stroke-linecap="round"/>` +
        `<circle cx="-21" cy="-14" r="3.2" fill="#4a2a3a" ${st(1.2)}/><circle cx="21" cy="-30" r="3.2" fill="#4a2a3a" ${st(1.2)}/>`,
    vetebrod: () => {
        const strand = (dy, c) =>
            [-30, -15, 0, 15]
                .map(
                    x =>
                        `<ellipse cx="${x + 8}" cy="${-18 + dy}" rx="10" ry="7" fill="${c}" ${st(2)} transform="rotate(${dy < 0 ? -24 : 24} ${x + 8} ${-18 + dy})"/>`
                )
                .join('');
        return (
            shadow(4, 4, 38, 6) +
            `<path d="M-38 -10C-40 -24 40 -24 38 -10C38 0 -38 0 -38 -10Z" fill="#c98a45" ${st(2.4)}/>` +
            strand(4, '#d79a52') +
            strand(-4, '#e0aa62') +
            PEARL([
                [-24, -24],
                [-10, -16],
                [6, -24],
                [18, -14],
                [28, -22],
                [-30, -14]
            ])
        );
    }
};

/** Een broodje als losse SVG. kind: kanelbulle, kardemummabulle, semla, lussekatt, vetebrod */
export function bun(kind, size = 72) {
    const draw = BUNS[kind] || BUNS.kanelbulle;
    return `<svg viewBox="-40 -54 80 64" width="${size}" height="${r1((size * 64) / 80)}" aria-hidden="true" focusable="false">${draw()}</svg>`;
}

/* ---------- feestmotieven (midden onderaan op 0,0) ---------- */

function plate(w = 54) {
    return `${shadow(6, 4, w, 7)}<ellipse cx="0" cy="0" rx="${w}" ry="10" fill="#fff" ${st(2.4)}/><ellipse cx="0" cy="-1" rx="${w - 12}" ry="6" fill="#eef1f4"/>`;
}

const MOTIFS = {
    lucia() {
        const ring = '#3f7f31';
        const cands = [-30, -15, 0, 15, 30]
            .map((x, i) => candle(x, -54 + Math.abs(x) * 0.18, 22 - (i % 2) * 2, '#fff8ec', 0.9))
            .join('');
        return (
            `<g transform="translate(-50 0)">${plate(34)}${at(-10, -6, 0.7, BUNS.lussekatt())}${at(12, -2, 0.7, BUNS.lussekatt())}</g>` +
            `<g transform="translate(36 0)">${shadow(4, 4, 46, 8)}<ellipse cx="0" cy="-42" rx="42" ry="12" fill="none" stroke="${O}" stroke-width="12"/><ellipse cx="0" cy="-42" rx="42" ry="12" fill="none" stroke="${ring}" stroke-width="7"/>` +
            `<path d="M-38 -46l6 -4M-20 -54l6 -2M10 -54l6 2M30 -48l6 4M-30 -32l6 2M20 -31l6 -2" stroke="#7dc356" stroke-width="3" stroke-linecap="round"/>` +
            `<circle cx="-34" cy="-36" r="3" fill="#d9302a" ${st(1)}/><circle cx="28" cy="-35" r="3" fill="#d9302a" ${st(1)}/><circle cx="2" cy="-30" r="3" fill="#d9302a" ${st(1)}/>` +
            `${cands}</g>`
        );
    },
    semla: () => at(0, 0, 1.9, BUNS.semla()),
    kanelbulle: () => at(-34, 0, 1.5, BUNS.kanelbulle()) + at(30, 2, 1.25, BUNS.kardemummabulle()),
    waffle() {
        // halve breedte van het hart per rij, zodat de putjes binnen de rand blijven
        const half = y => (y < -50 ? 34 : y < -40 ? 38 : y < -30 ? 30 : y < -22 ? 20 : 10);
        let dimples = '';
        for (let y = -60; y <= -18; y += 8) {
            for (let x = -40; x <= 40; x += 8) {
                const lobe = y < -56 && Math.abs(x) < 6;
                if (Math.abs(x) + 4 < half(y) && !lobe) {
                    dimples += `<rect x="${x - 2.6}" y="${y - 2.6}" width="5.2" height="5.2" rx="1.2" fill="#c98a3a" opacity=".6"/>`;
                }
            }
        }
        return (
            plate(56) +
            `<path d="M0 -8C-30 -26 -46 -40 -44 -54C-42 -68 -22 -72 0 -58C22 -72 42 -68 44 -54C46 -40 30 -26 0 -8Z" fill="#e8b25c" ${st(2.6)}/>` +
            dimples +
            `<path d="M-34 -56C-30 -64 -20 -66 -12 -62" fill="none" stroke="#f6d494" stroke-width="3" stroke-linecap="round"/>` +
            `<path d="M4 -44C2 -56 14 -60 20 -54C28 -60 38 -52 32 -44C26 -38 10 -38 4 -44Z" fill="#fffaf2" ${st(1.8)}/>` +
            `<path d="M-26 -40C-30 -46 -22 -52 -16 -48C-10 -52 -4 -44 -10 -38C-14 -34 -22 -34 -26 -40Z" fill="#c7243a" ${st(1.8)}/><path d="M-22 -44c1 -2 3 -2 4 -1" stroke="#ef7a8a" stroke-width="1.6" stroke-linecap="round"/>`
        );
    },
    paask() {
        const egg = (x, y, c, r = 0) =>
            `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M0 -14C8 -14 11 -2 11 4C11 11 6 14 0 14C-6 14 -11 11 -11 4C-11 -2 -8 -14 0 -14Z" fill="${c}" ${st(2)}/><path d="M-9 2H9" stroke="#fff" stroke-width="2.4" opacity=".8"/><path d="M-5 -8c2 -2 4 -2 5 -2" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/></g>`;
        const feather = (x, y, c, r) =>
            `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M0 0C-5 -6 -5 -16 0 -22C5 -16 5 -6 0 0Z" fill="${c}" ${st(1.4)}/></g>`;
        return (
            `<g transform="translate(40 -6)">${line('M0 0L-4 -90M-2 -44L-24 -72M-3 -64L16 -96M-1 -28L22 -50', 3, '#7a5a3a')}` +
            feather(-24, -70, '#f2c14e', -30) +
            feather(16, -94, '#e85a8a', 20) +
            feather(22, -48, '#4fb3d9', 30) +
            feather(-4, -88, '#8fd14f', 0) +
            `</g>` +
            `<g transform="translate(-30 0)">${shadow(4, 4, 40, 7)}<path d="M-34 -22H34L28 0H-28Z" fill="#c9924f" ${st(2.4)}/><path d="M-30 -14H31M-29 -7H30" stroke="${O}" stroke-width="1.2" opacity=".4"/>` +
            egg(-18, -30, '#f2c14e', -10) +
            egg(0, -34, '#e85a8a', 4) +
            egg(18, -30, '#4fb3d9', 12) +
            `<path d="M-34 -22H34" stroke="${O}" stroke-width="2.4"/></g>`
        );
    },
    bonfire() {
        const logs = line('M-30 -2L26 -14', 7, '#8a5a3a') + line('M-26 -14L30 -2', 7, '#7a4a2e');
        return (
            shadow(6, 4, 46, 8) +
            `<ellipse cx="0" cy="0" rx="60" ry="12" fill="#ff9a3a" opacity=".35"/>` +
            `<path d="M-30 -10C-36 -30 -20 -44 -18 -62C-8 -52 -6 -42 -4 -36C0 -54 6 -74 4 -92C22 -76 26 -56 22 -42C26 -48 30 -54 30 -60C40 -44 38 -24 30 -10Z" fill="#ef7a2a" ${st(2.6)}/>` +
            `<path d="M-18 -10C-22 -24 -12 -32 -10 -44C-4 -36 -2 -30 0 -26C4 -38 6 -48 6 -58C16 -46 18 -32 14 -24C18 -28 20 -32 20 -36C26 -24 24 -16 18 -10Z" fill="#ffc23a"/>` +
            `<path d="M-6 -10C-8 -18 -2 -22 0 -30C6 -22 8 -16 6 -10Z" fill="#fff3b0"/>` +
            logs +
            `<circle cx="-34" cy="-80" r="2" fill="#ffc23a"/><circle cx="30" cy="-96" r="2.4" fill="#ffc23a"/><circle cx="14" cy="-108" r="1.6" fill="#ffc23a"/>`
        );
    },
    chokladboll() {
        const ball = (x, y, s = 1) =>
            at(
                x,
                y,
                s,
                `<circle cx="0" cy="-12" r="13" fill="#6b3d26" ${st(2.2)}/><path d="M-7 -18c3 -3 7 -4 10 -3" fill="none" stroke="#9c6040" stroke-width="2.4" stroke-linecap="round"/>` +
                    PEARL(
                        [
                            [-6, -10],
                            [4, -6],
                            [6, -16],
                            [-2, -20],
                            [-9, -4],
                            [9, -9]
                        ],
                        1.3
                    )
            );
        return (
            plate(54) +
            ball(-24, -2) +
            ball(4, -3, 1.05) +
            ball(28, -2, 0.95) +
            ball(-8, -20, 1) +
            ball(16, -21, 0.95)
        );
    },
    bouquet() {
        const fl = (x, y, c, r = 9) =>
            `<g transform="translate(${x} ${y})">${[0, 60, 120, 180, 240, 300]
                .map(
                    a =>
                        `<circle cx="${r1(Math.sin((a * Math.PI) / 180) * r * 0.62)}" cy="${r1(-Math.cos((a * Math.PI) / 180) * r * 0.62)}" r="${r * 0.55}" fill="${c}" stroke="${O}" stroke-width="1.4"/>`
                )
                .join('')}<circle r="${r * 0.4}" fill="#ffd84a" ${st(1.2)}/></g>`;
        return (
            shadow(4, 2, 30, 6) +
            line('M0 0L-16 -54M0 0L0 -62M0 0L16 -54M0 0L-28 -40M0 0L28 -42', 3, '#4f9a3a') +
            `<path d="M-14 -4L-20 -34H20L14 -4Z" fill="#f4d6e4" ${st(2.4)}/><path d="M-20 -34L0 -18L20 -34" fill="none" ${st(1.6)}/>` +
            fl(-16, -58, '#e85a8a') +
            fl(0, -68, '#f2c14e', 10) +
            fl(16, -58, '#ffffff') +
            fl(-30, -42, '#b48be0', 8) +
            fl(30, -44, '#e85a8a', 8)
        );
    },
    gift() {
        return (
            shadow(6, 4, 46, 7) +
            `<rect x="-40" y="-46" width="58" height="46" fill="#2f6fb3" ${st()}/><rect x="-16" y="-46" width="10" height="46" fill="#f2c14e" ${st(1.8)}/>` +
            `<rect x="-44" y="-56" width="66" height="12" fill="#3b82c8" ${st()}/><rect x="-16" y="-56" width="10" height="12" fill="#f2c14e" ${st(1.8)}/>` +
            `<path d="M-11 -56C-24 -76 -36 -64 -24 -58ZM-11 -56C2 -76 14 -64 2 -58Z" fill="#f2c14e" ${st(1.8)}/>` +
            `<g transform="translate(36 0)">${shadow(2, 2, 16, 4)}<path d="M-12 -2V-30H12V-2Z" fill="#fff" ${st(2.2)}/><path d="M12 -24C22 -24 22 -10 12 -10" fill="none" ${st(3)}/><path d="M-12 -30H12" stroke="${O}" stroke-width="2"/><path d="M-6 -36q3 -4 0 -8M4 -36q3 -4 0 -8" fill="none" stroke="#b9a99a" stroke-width="2" stroke-linecap="round"/></g>`
        );
    },
    flag() {
        const wave = 'M0 0C16 -6 30 6 48 0C66 -6 80 6 96 0V60C80 66 66 54 48 60C30 66 16 54 0 60Z';
        return (
            shadow(4, 2, 18, 4) +
            line('M-40 0V-120', 4, '#e8e0d0') +
            `<circle cx="-40" cy="-124" r="5" fill="#f2c14e" ${st(1.8)}/>` +
            `<g transform="translate(-38 -116)"><path d="${wave}" fill="#2a6ebb" ${st(2.6)}/>` +
            `<path d="M28 -2V58" stroke="#f6c33b" stroke-width="12"/><path d="M0 27C16 21 30 33 48 27C66 21 80 33 96 27" fill="none" stroke="#f6c33b" stroke-width="12"/>` +
            `<path d="${wave}" fill="none" ${st(2.6)}/></g>`
        );
    },
    maypole() {
        const wreath = (y, w) =>
            `<ellipse cx="0" cy="${y}" rx="${w}" ry="9" fill="none" stroke="${O}" stroke-width="11"/><ellipse cx="0" cy="${y}" rx="${w}" ry="9" fill="none" stroke="#5aa43f" stroke-width="7"/>` +
            [-0.8, -0.3, 0.3, 0.8]
                .map(
                    f =>
                        `<circle cx="${r1(w * f)}" cy="${r1(y + 6 * (1 - Math.abs(f)))}" r="3" fill="${f > 0 ? '#ffd84a' : '#ffffff'}" ${st(1)}/>`
                )
                .join('');
        return (
            shadow(4, 2, 40, 7) +
            line('M0 0V-118', 6, '#5aa43f') +
            line('M-6 -86H-36M6 -86H36', 5, '#5aa43f') +
            wreath(-86, 34) +
            `<path d="M-36 -86C-42 -74 -40 -66 -34 -60M36 -86C42 -74 40 -66 34 -60" fill="none" stroke="#5aa43f" stroke-width="5" stroke-linecap="round"/>` +
            `<circle cx="-34" cy="-58" r="10" fill="none" stroke="${O}" stroke-width="7"/><circle cx="-34" cy="-58" r="10" fill="none" stroke="#5aa43f" stroke-width="4"/><circle cx="34" cy="-58" r="10" fill="none" stroke="${O}" stroke-width="7"/><circle cx="34" cy="-58" r="10" fill="none" stroke="#5aa43f" stroke-width="4"/>` +
            `<path d="M-4 -118L4 -118L0 -128Z" fill="#2a6ebb" ${st(1.4)}/>` +
            flowers(-44, 0, '#ffffff', 1.2) +
            flowers(46, 0, '#e85a8a', 1.2) +
            `<path d="M-12 -40L12 -46M-12 -30L12 -36" stroke="#2a6ebb" stroke-width="3"/><path d="M-12 -35L12 -41" stroke="#f6c33b" stroke-width="3"/>`
        );
    },
    church() {
        return (
            shadow(8, 3, 66, 7) +
            `<rect x="-24" y="-46" width="84" height="46" fill="#f6f1e6" ${st()}/>` +
            `<path d="M-30 -44L18 -76L66 -44Z" fill="#a3392b" ${st()}/>` +
            `<rect x="-58" y="-86" width="34" height="86" fill="#f6f1e6" ${st()}/>` +
            `<path d="M-62 -84L-41 -122L-20 -84Z" fill="#a3392b" ${st()}/><path d="M-41 -122V-136M-47 -130H-35" stroke="${O}" stroke-width="3" stroke-linecap="round"/>` +
            `<path d="M-48 -66a7 7 0 0 1 14 0V-52H-48Z" fill="#cfe9f7" ${st(1.8)}/>` +
            `<path d="M-48 0V-20a7 7 0 0 1 14 0V0" fill="#9a5b3a" ${st(1.8)}/>` +
            `<path d="M0 -36a6 6 0 0 1 12 0V-22H0ZM24 -36a6 6 0 0 1 12 0V-22H24Z" fill="#cfe9f7" ${st(1.6)}/>` +
            `<rect x="-58" y="-86" width="6" height="86" fill="#fff" opacity=".4"/>`
        );
    },
    star() {
        return (
            `<g transform="translate(34 -104)"><path d="M0 -22L5 -6L22 -6L8 4L13 21L0 11L-13 21L-8 4L-22 -6L-5 -6Z" fill="#ffd84a" ${st(2.2)}/></g>` +
            MOTIFS.church()
        );
    },
    market() {
        const stall = (x, c, w = 52) =>
            at(
                x,
                0,
                1,
                shadow(6, 3, w / 2 + 6, 5) +
                    `<path d="M${-w / 2 + 4} 0V-34M${w / 2 - 4} 0V-34" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M${-w / 2 + 4} 0V-34M${w / 2 - 4} 0V-34" stroke="#c58a52" stroke-width="2.4" stroke-linecap="round"/>` +
                    `<rect x="${-w / 2}" y="-18" width="${w}" height="12" fill="#c58a52" ${st(2)}/>` +
                    `<path d="M${-w / 2 - 4} -34L${-w / 2 + 4} -52H${w / 2 - 4}L${w / 2 + 4} -34Z" fill="${c}" ${st(2.4)}/>` +
                    `<path d="M${-w / 2 - 4} -34${Array.from({ length: 5 }, (_, i) => `q${(w + 8) / 10} 8 ${(w + 8) / 5} 0`).join('')}" fill="${c}" ${st(2)}/>` +
                    `<path d="M${-w / 6} -52L${-w / 6 - 3} -34M${w / 6} -52L${w / 6 + 3} -34" stroke="#fff" stroke-width="5" opacity=".85"/>` +
                    `<circle cx="-8" cy="-22" r="4" fill="#d9302a" ${st(1)}/><circle cx="2" cy="-23" r="4" fill="#f2c14e" ${st(1)}/><circle cx="12" cy="-22" r="4" fill="#8fd14f" ${st(1)}/>`
            );
        return (
            stall(-56, '#d9302a') +
            stall(4, '#2a6ebb', 56) +
            stall(62, '#e8742c', 48) +
            `<path d="M-90 -86Q-40 -70 0 -84Q40 -70 90 -86" fill="none" stroke="${O}" stroke-width="1.4"/>${[-70, -46, -20, 20, 46, 70].map((x, i) => `<path d="M${x - 5} ${-78 - (i % 2)}L${x + 5} ${-78 - (i % 2)}L${x} ${-68}Z" fill="${['#f2c14e', '#d9302a', '#2a6ebb'][i % 3]}" ${st(1)}/>`).join('')}`
        );
    },
    crayfish() {
        const red = '#d9302a';
        const claw = flip =>
            `<g transform="scale(1 ${flip ? -1 : 1})">` +
            line('M-14 -6L-30 -14L-42 -12', 4, red) +
            `<path d="M-42 -12C-56 -20 -64 -14 -66 -8C-58 -10 -50 -8 -44 -6Z" fill="${red}" ${st(1.8)}/>` +
            `<path d="M-44 -12C-56 -6 -62 2 -62 6C-54 2 -48 -2 -42 -6Z" fill="#e0432f" ${st(1.8)}/></g>`;
        const seg = [8, 16, 24, 32, 40]
            .map(
                (x, i) =>
                    `<ellipse cx="${x}" cy="0" rx="6" ry="${11 - i * 1.2}" fill="${i % 2 ? '#e0432f' : red}" ${st(1.8)}/>`
            )
            .join('');
        const one =
            `<path d="M-16 -4C-30 -20 -40 -34 -56 -40M-16 4C-32 -6 -46 -14 -62 -16" fill="none" stroke="${O}" stroke-width="1.4" stroke-linecap="round"/>` +
            claw(false) +
            claw(true) +
            `<path d="M-4 8L-8 16M2 9L0 17M-4 -8L-8 -16M2 -9L0 -17" stroke="${O}" stroke-width="2.4" stroke-linecap="round"/>` +
            seg +
            `<path d="M44 0L58 -10C62 -4 62 4 58 10Z" fill="#e0432f" ${st(1.8)}/><path d="M46 0L60 0" stroke="${O}" stroke-width="1.2"/>` +
            `<ellipse cx="-6" cy="0" rx="16" ry="11" fill="${red}" ${st(2.2)}/><path d="M-16 -4c4 -4 10 -5 16 -3" fill="none" stroke="#f08a7a" stroke-width="2.4" stroke-linecap="round"/>` +
            `<circle cx="-18" cy="-5" r="2" fill="${O}"/><circle cx="-18" cy="5" r="2" fill="${O}"/>`;
        return (
            `<g transform="translate(-58 -100)"><path d="M0 -12V-2" stroke="${O}" stroke-width="2"/><circle cx="0" cy="16" r="20" fill="#ffd84a" ${st(2.2)}/><path d="M-16 6H16M-19 16H19M-16 26H16" stroke="#e8a326" stroke-width="2"/><path d="M-11 28c-6 -7 -6 -16 0 -23" fill="none" stroke="#fff" stroke-width="2.4" opacity=".6" stroke-linecap="round"/></g>` +
            `<g transform="translate(46 -104)"><path d="M0 -8V0" stroke="${O}" stroke-width="2"/><circle cx="0" cy="12" r="14" fill="#ef8fb0" ${st(2)}/><path d="M-12 6H12M-12 18H12" stroke="#c75a80" stroke-width="1.6"/></g>` +
            plate(64) +
            at(2, -16, 1.05, one) +
            `<path d="M34 -4c4 -8 10 -12 16 -12M40 -8l-2 -8M46 -12l4 -6" fill="none" stroke="#4f9a3a" stroke-width="2.4" stroke-linecap="round"/>`
        );
    },
    can() {
        return (
            shadow(6, 4, 40, 7) +
            `<ellipse cx="0" cy="-6" rx="34" ry="10" fill="#a9b2bd" ${st(2.2)}/>` +
            `<path d="M-34 -6V-36C-34 -46 -26 -52 0 -52C26 -52 34 -46 34 -36V-6" fill="#c9d1da" ${st(2.4)}/>` +
            `<path d="M-34 -40C-30 -54 30 -54 34 -40C30 -36 -30 -36 -34 -40Z" fill="#dfe5eb" ${st(2)}/>` +
            `<rect x="-34" y="-30" width="68" height="18" fill="#f2c14e" ${st(1.6)}/><path d="M-18 -21c6 -6 18 -6 24 0c-6 6 -18 6 -24 0ZM6 -21l8 -5v10Z" fill="#4a7fb0" ${st(1)}/>` +
            `<path d="M-30 -62c4 -6 0 -10 4 -16M-6 -68c4 -6 0 -10 4 -16M18 -62c4 -6 0 -10 4 -16" fill="none" stroke="#8fae6a" stroke-width="3" stroke-linecap="round" opacity=".8"/>`
        );
    },
    apples() {
        const apple = (x, y, c) =>
            `<g transform="translate(${x} ${y})"><path d="M0 -6C-4 -12 -14 -12 -14 -2C-14 8 -6 13 0 10C6 13 14 8 14 -2C14 -12 4 -12 0 -6Z" fill="${c}" ${st(1.8)}/><path d="M0 -6V-12" stroke="${O}" stroke-width="2" stroke-linecap="round"/><path d="M1 -11c4 -4 8 -3 9 -1c-3 3 -7 3 -9 1Z" fill="#5aa43f" ${st(1)}/><path d="M-8 -4c1 -3 3 -4 5 -4" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".7"/></g>`;
        return (
            shadow(6, 4, 52, 7) +
            [
                [-30, -50, '#d9302a'],
                [-6, -54, '#f2c14e'],
                [18, -50, '#d9302a'],
                [40, -48, '#8fd14f'],
                [-40, -44, '#e85a2a']
            ]
                .map(([x, y, c]) => apple(x, y, c))
                .join('') +
            `<path d="M-50 -40H50L46 0H-46Z" fill="#c58a52" ${st(2.4)}/><path d="M-48 -26H48M-47 -13H47" stroke="${O}" stroke-width="1.4" opacity=".45"/><path d="M-50 -40H50" stroke="${O}" stroke-width="2.4"/>` +
            `<g transform="translate(66 0)">${shadow(2, 2, 12, 3)}<path d="M-9 0V-30C-9 -36 -4 -38 -4 -44V-52H4V-44C4 -38 9 -36 9 -30V0Z" fill="#e8a33d" ${st(2)}/><rect x="-9" y="-24" width="18" height="12" fill="#fff" ${st(1.2)}/><rect x="-5" y="-56" width="10" height="5" fill="#a3392b" ${st(1.2)}/></g>`
        );
    },
    prinsesstarta() {
        return (
            plate(56) +
            `<path d="M-44 -6C-46 -34 -30 -60 0 -60C30 -60 46 -34 44 -6C30 -2 -30 -2 -44 -6Z" fill="#9fd07a" ${st(2.6)}/>` +
            `<path d="M-32 -30C-30 -46 -18 -54 -4 -54" fill="none" stroke="#d6efc0" stroke-width="5" stroke-linecap="round"/>` +
            `<path d="M-44 -10C-30 -4 30 -4 44 -10" fill="none" stroke="#7fb85a" stroke-width="2"/>` +
            `<g transform="translate(0 -62)"><circle r="9" fill="#ef8fb0" ${st(1.8)}/><path d="M-4 -2c2 -4 6 -3 6 0c0 4 -6 4 -7 0M0 -6c4 0 6 3 5 6" fill="none" stroke="#c75a80" stroke-width="1.6" stroke-linecap="round"/><path d="M8 4c8 -2 12 2 12 6c-6 1 -10 -1 -12 -6ZM-8 4c-8 -2 -12 2 -12 6c6 1 10 -1 12 -6Z" fill="#5aa43f" ${st(1.2)}/></g>` +
            `<path d="M-20 -40c1 2 1 2 0 4M14 -30c1 2 1 2 0 4M26 -44c1 2 1 2 0 4" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>`
        );
    },
    kladdkaka() {
        return (
            plate(58) +
            `<path d="M-46 -8V-26L10 -40L46 -26V-8L10 6Z" fill="#4a2a1c" ${st(2.4)}/>` +
            `<path d="M-46 -26L10 -40L46 -26L-6 -12Z" fill="#6b3d26" ${st(2.2)}/>` +
            `<path d="M-6 -12V6M-6 6L-46 -8" stroke="${O}" stroke-width="2"/>` +
            `<path d="M-26 -16c-4 -10 8 -16 14 -10c8 -6 18 2 12 8c-6 4 -20 6 -26 2Z" fill="#fffaf2" ${st(1.8)}/>` +
            `<path d="M-40 -24l40 -10" stroke="#e8e0d0" stroke-width="2" stroke-dasharray="1 6" stroke-linecap="round"/>`
        );
    },
    bakelse() {
        return (
            plate(50) +
            `<path d="M-30 -6V-34H30V-6Z" fill="#f3e1b6" ${st(2.4)}/>` +
            `<path d="M-30 -22H30" stroke="#d7a85a" stroke-width="5"/><path d="M-30 -22H30" stroke="${O}" stroke-width="1" opacity=".4"/>` +
            `<path d="M-32 -34C-32 -42 32 -42 32 -34Z" fill="#fff" ${st(2)}/>` +
            `<g transform="translate(0 -46)"><circle r="14" fill="#4a2a1c" ${st(2)}/><circle r="10" fill="#6b3d26"/><path d="M-3 7c-2 -4 -2 -8 0 -10c-1 -3 1 -6 4 -6c3 0 4 3 3 6c2 3 1 7 -1 10Z" fill="#e8d4a8"/></g>`
        );
    },
    goose() {
        return (
            shadow(6, 4, 44, 7) +
            `<path d="M-40 -18C-44 -34 -24 -44 -2 -40C12 -38 22 -30 26 -22C30 -14 20 -4 0 -4C-22 -4 -36 -8 -40 -18Z" fill="#f7f4ee" ${st(2.6)}/>` +
            `<path d="M-30 -24C-20 -34 -4 -34 8 -28" fill="none" stroke="#dcd6ca" stroke-width="3" stroke-linecap="round"/>` +
            `<path d="M18 -26C24 -40 22 -54 28 -64C32 -72 44 -72 46 -64C40 -62 36 -58 34 -52C32 -42 34 -32 26 -22Z" fill="#f7f4ee" ${st(2.6)}/>` +
            `<path d="M46 -66L58 -62L46 -58Z" fill="#f2a33a" ${st(1.8)}/><circle cx="38" cy="-64" r="2" fill="${O}"/>` +
            `<path d="M-6 -4V4M6 -4V4" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M-6 -4V4M6 -4V4" stroke="#f2a33a" stroke-width="2.6" stroke-linecap="round"/>`
        );
    },
    tree() {
        const tier = (y, w, h) =>
            `<path d="M0 ${y - h}C${w * 0.35} ${y - h * 0.55} ${w * 0.8} ${y - h * 0.2} ${w} ${y}Q0 ${y + 8} ${-w} ${y}C${-w * 0.8} ${y - h * 0.2} ${-w * 0.35} ${y - h * 0.55} 0 ${y - h}Z" fill="#2f7d4a" ${st(2.6)}/>`;
        const ball = (x, y, c) => `<circle cx="${x}" cy="${y}" r="4" fill="${c}" ${st(1.2)}/>`;
        return (
            shadow(6, 4, 50, 7) +
            `<rect x="-6" y="-18" width="12" height="18" fill="#8a5a3a" ${st(2)}/>` +
            tier(-14, 40, 40) +
            tier(-44, 32, 38) +
            tier(-72, 22, 36) +
            ball(-20, -22, '#d9302a') +
            ball(14, -28, '#f2c14e') +
            ball(-8, -54, '#f2c14e') +
            ball(18, -58, '#d9302a') +
            ball(4, -86, '#d9302a') +
            `<path d="M0 -118L4 -108L14 -108L6 -102L9 -92L0 -98L-9 -92L-6 -102L-14 -108L-4 -108Z" fill="#ffd84a" ${st(1.6)}/>` +
            `<rect x="26" y="-22" width="26" height="22" fill="#d9302a" ${st(2)}/><path d="M39 -22V0M26 -11H52" stroke="#f2c14e" stroke-width="3"/>` +
            `<rect x="-52" y="-16" width="22" height="16" fill="#2a6ebb" ${st(2)}/><path d="M-41 -16V0" stroke="#fff" stroke-width="3"/>`
        );
    },
    candles() {
        return (
            shadow(6, 4, 50, 7) +
            `<path d="M-48 -4C-48 -14 48 -14 48 -4C48 4 -48 4 -48 -4Z" fill="#4f9a3a" ${st(2.2)}/><path d="M-40 -8l6 -4M-20 -10l6 -3M6 -10l6 -3M28 -9l6 -3" stroke="#8fd14f" stroke-width="2.6" stroke-linecap="round"/>` +
            candle(-30, -8, 30, '#fff8ec') +
            candle(-10, -8, 38, '#fff8ec') +
            candle(10, -8, 34, '#fff8ec') +
            candle(30, -8, 28, '#fff8ec') +
            `<circle cx="-40" cy="-4" r="3" fill="#d9302a" ${st(1)}/><circle cx="40" cy="-4" r="3" fill="#d9302a" ${st(1)}/>`
        );
    },
    advent() {
        return (
            shadow(6, 4, 54, 7) +
            `<path d="M-50 -2H50L44 -14H-44Z" fill="#c58a52" ${st(2.2)}/>` +
            candle(-33, -14, 32) +
            candle(-11, -14, 32, '#fff8ec', 1, false) +
            candle(11, -14, 32, '#fff8ec', 1, false) +
            candle(33, -14, 32, '#fff8ec', 1, false) +
            `<path d="M-46 -14c6 -6 10 -2 16 -6M30 -18c6 4 10 -2 16 2" fill="none" stroke="#4f9a3a" stroke-width="3" stroke-linecap="round"/>`
        );
    },
    fireworks() {
        const burst = (x, y, r, c) =>
            `<g transform="translate(${x} ${y})">${Array.from({ length: 12 }, (_, i) => {
                const a = (i * Math.PI) / 6;
                return `<path d="M${r1(Math.cos(a) * r * 0.35)} ${r1(Math.sin(a) * r * 0.35)}L${r1(Math.cos(a) * r)} ${r1(Math.sin(a) * r)}" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`;
            }).join('')}<circle r="3" fill="#fff"/></g>`;
        return (
            burst(-40, -96, 28, '#ffd84a') +
            burst(30, -110, 22, '#ef8fb0') +
            burst(52, -70, 16, '#7fd0f0') +
            `<g transform="translate(-6 0)">${shadow(2, 2, 18, 4)}<path d="M-12 -2L-4 -2L-2 -26C-14 -32 -14 -50 -10 -58H10C14 -50 14 -32 2 -26L4 -2L12 -2" fill="#fff" fill-opacity=".85" ${st(2)}/><path d="M-10 -48H10C11 -40 8 -32 0 -30C-8 -32 -11 -40 -10 -48Z" fill="#f6dc8a"/><circle cx="-3" cy="-40" r="1.4" fill="#fff"/><circle cx="3" cy="-36" r="1.2" fill="#fff"/></g>`
        );
    }
};

/* ---------- feestdagen: welk motief, welke lucht ---------- */

const WINTER = { sky: '#26375f', ground: '#e8eef5', night: true, snow: true };
const SPRING = { sky: '#d3ecf7', ground: '#9bd06a' };
const SUMMER = { sky: '#bfe6f8', ground: '#7cc35a' };
const AUTUMN = { sky: '#f3d9b4', ground: '#c9a46a' };
const KITCHEN = { sky: '#f6e3c6', ground: '#c58a52', table: true };
const DUSK = { sky: '#3a3f6b', ground: '#7a8a5a', night: true };

const FEASTS = {
    nyarsdagen: { motif: 'fireworks', ...WINTER },
    'trettondedag-jul': { motif: 'star', ...WINTER },
    'tjugondedag-knut': { motif: 'tree', ...WINTER, night: false, sky: '#cfe0ef' },
    fettisdagen: { motif: 'semla', ...KITCHEN },
    vaffeldagen: { motif: 'waffle', ...KITCHEN, sky: '#f7e8c8' },
    skartorsdagen: { motif: 'paask', ...SPRING },
    paskafton: { motif: 'paask', ...SPRING },
    paskdagen: { motif: 'paask', ...SPRING, sky: '#e4f2d8' },
    valborgsmassoafton: { motif: 'bonfire', ...DUSK },
    'chokladbollens-dag': { motif: 'chokladboll', ...KITCHEN },
    'mors-dag': { motif: 'bouquet', ...SPRING, sky: '#f6dfe8' },
    nationaldagen: { motif: 'flag', ...SUMMER },
    midsommarafton: { motif: 'maypole', ...SUMMER },
    olsmassa: { motif: 'church', ...SUMMER },
    'kiviks-marknad': { motif: 'market', ...SUMMER },
    kraftpremiar: { motif: 'crayfish', ...DUSK, sky: '#2f3e6e' },
    surstromningspremiaren: { motif: 'can', ...SUMMER, sky: '#d8ecd0' },
    appelmarknaden: { motif: 'apples', ...AUTUMN },
    'prinsesstartans-vecka': { motif: 'prinsesstarta', ...KITCHEN, sky: '#f4e6ef' },
    'kanelbullens-dag': { motif: 'kanelbulle', ...KITCHEN },
    'gustav-adolfsdagen': { motif: 'bakelse', ...KITCHEN, sky: '#e9e2f2' },
    'kladdkakans-dag': { motif: 'kladdkaka', ...KITCHEN },
    'alla-helgons-dag': { motif: 'candles', ...DUSK, ground: '#6b6a55' },
    martensafton: { motif: 'goose', ...AUTUMN },
    'fars-dag': { motif: 'gift', ...AUTUMN, sky: '#dfe9f3' },
    'forsta-advent': { motif: 'advent', ...WINTER },
    lucia: { motif: 'lucia', ...WINTER },
    julafton: { motif: 'tree', ...WINTER },
    nyarsafton: { motif: 'fireworks', ...WINTER, snow: false }
};

function backdrop(f, seed) {
    const rnd = rng(seed);
    let s = `<rect width="320" height="180" fill="${f.sky}"/>`;
    if (f.night) {
        for (let i = 0; i < 26; i++) {
            const x = r1(rnd() * 320);
            const y = r1(rnd() * 110);
            s += `<circle cx="${x}" cy="${y}" r="${r1(0.8 + rnd() * 1.3)}" fill="#fff" opacity="${r1(0.4 + rnd() * 0.5)}"/>`;
        }
        s += `<circle cx="276" cy="34" r="14" fill="#fff6d8"/><circle cx="282" cy="30" r="12" fill="${f.sky}"/>`;
    } else if (!f.table) {
        s += sun(272, 36, 14) + cloud(70, 40, 1) + cloud(196, 26, 0.7);
    }
    if (f.table) {
        s +=
            `<rect y="-640" width="320" height="760" fill="#fff" opacity=".18"/>` +
            Array.from(
                { length: 9 },
                (_, i) =>
                    `<path d="M${i * 40 + 20} -640V128" stroke="#fff" stroke-width="10" opacity=".22"/>`
            ).join('') +
            `<rect x="0" y="128" width="320" height="52" fill="${f.ground}" ${st(2.6)}/><path d="M0 138H320" stroke="#fff" stroke-width="3" opacity=".25"/>`;
    } else {
        s +=
            `<path d="M-10 132C60 118 120 126 170 130C230 134 280 120 330 126V190H-10Z" fill="${f.ground}" ${st(2.6)}/>` +
            `<path d="M10 136C60 126 110 130 150 134" fill="none" stroke="#fff" stroke-width="3" opacity=".25" stroke-linecap="round"/>`;
    }
    if (f.snow) {
        for (let i = 0; i < 30; i++) {
            s += `<circle cx="${r1(rnd() * 320)}" cy="${r1(rnd() * 170)}" r="${r1(1 + rnd() * 1.6)}" fill="#fff" opacity=".85"/>`;
        }
    }
    return s;
}

const TALL = new Set([
    'church',
    'star',
    'maypole',
    'flag',
    'fireworks',
    'paask',
    'bonfire',
    'tree',
    'crayfish'
]);

function feastSvg(id) {
    const f = FEASTS[id];
    const draw = MOTIFS[f.motif];
    return (
        backdrop(f, id.length * 97 + id.charCodeAt(0)) +
        at(160, 152, TALL.has(f.motif) ? 1 : 1.22, draw())
    );
}

/* ---------- uitjes ---------- */

const OUTING_SKY = {
    simrishamn: '#bfe6f8',
    bageriet: '#f6e3c6',
    plockstalle: '#cdeaf7',
    loppis: '#e3eef3',
    kivik: '#cfe8f3',
    'ales-stenar': '#c3e3f2',
    brosarp: '#d3ecf7'
};

const OUTINGS = {
    simrishamn() {
        const boat =
            `<path d="M-34 -10H34L26 6H-26Z" fill="#d9452f" ${st(2.4)}/><path d="M-32 -6H32" stroke="#fff" stroke-width="3"/>` +
            `<rect x="-14" y="-26" width="20" height="16" fill="#fff" ${st(2)}/><rect x="-10" y="-22" width="6" height="6" fill="#cfe9f7" ${st(1)}/>` +
            `<path d="M14 -10V-46" stroke="${O}" stroke-width="3"/><path d="M14 -44L30 -16H14Z" fill="#fffaf2" ${st(1.8)}/>`;
        const rokeri =
            shadow(8, 2, 30, 5) +
            `<rect x="-22" y="-36" width="44" height="36" fill="#4a3b35" ${st()}/><path d="M-26 -34L0 -56L26 -34Z" fill="#2e2a2e" ${st()}/>` +
            `<rect x="8" y="-74" width="10" height="34" fill="#d9cfc0" ${st(2)}/><path d="M-14 -36V0M-6 -36V0M2 -36V0M10 -36V0" stroke="#000" stroke-width="1" opacity=".25"/>` +
            `<rect x="-12" y="-24" width="12" height="24" fill="#9a5b3a" ${st(1.6)}/>` +
            `<g fill="#fff" opacity=".85" ${st(1.4)}><circle cx="16" cy="-82" r="6"/><circle cx="24" cy="-92" r="7"/><circle cx="34" cy="-100" r="8"/></g>`;
        return (
            sun(282, 34) +
            cloud(80, 34, 0.9) +
            `<path d="M-10 108H330V190H-10Z" fill="#4aa3d8"/><path d="M150 120q10 -5 20 0q10 5 20 0M220 150q10 -5 20 0q10 5 20 0M190 168q10 -5 20 0" fill="none" stroke="#bfe6f8" stroke-width="2.4" stroke-linecap="round"/>` +
            `<path d="M-10 110H176L184 190H-10Z" fill="#d6ccba" ${st(2.6)}/><path d="M0 132H178M0 156H180M30 110V132M80 110V132M130 110V132M55 132V156M105 132V156M155 132V156" stroke="${O}" stroke-width="1.2" opacity=".35"/>` +
            house(32, 112, 44, 34, '#f2c14e', '#a3392b') +
            house(84, 112, 42, 32, '#b5452f', '#4a4a55') +
            at(140, 112, 1, rokeri) +
            at(248, 140, 1, boat) +
            gull(200, 50) +
            gull(222, 64, 0.8) +
            `<path d="M176 112V176" stroke="${O}" stroke-width="5"/><path d="M176 112V176" stroke="#8a5a3a" stroke-width="2.4"/>`
        );
    },
    bageriet() {
        const awning = Array.from(
            { length: 10 },
            (_, i) =>
                `<path d="M${54 + i * 22} 70H${76 + i * 22}V88Q${65 + i * 22} 96 ${54 + i * 22} 88Z" fill="${i % 2 ? '#fff' : '#d9452f'}" ${st(1.8)}/>`
        ).join('');
        const shelf = (y, kinds) =>
            `<path d="M76 ${y}H196" stroke="${O}" stroke-width="2"/>` +
            kinds.map((k, i) => at(90 + i * 34, y, 0.42, BUNS[k]())).join('');
        const kringla =
            line(
                'M0 22C-26 22 -30 -6 -12 -10C2 -12 6 6 0 12C-6 6 -2 -12 12 -10C30 -6 26 22 0 22',
                5,
                '#e0a526'
            ) +
            `<path d="M-18 4c0 -4 2 -7 5 -8" fill="none" stroke="#fff3b0" stroke-width="2" stroke-linecap="round"/>`;
        return (
            `<rect x="0" y="150" width="320" height="30" fill="#d9cdb8" ${st(2)}/><path d="M0 162H320M40 150V180M110 150V180M180 150V180M250 150V180" stroke="${O}" stroke-width="1" opacity=".3"/>` +
            shadow(170, 152, 130, 6) +
            `<rect x="44" y="30" width="242" height="122" fill="#f3e1b6" ${st()}/><rect x="44" y="30" width="242" height="14" fill="#8c4a38" ${st()}/>` +
            `<rect x="270" y="44" width="16" height="108" fill="#000" opacity=".08"/>` +
            awning +
            `<rect x="70" y="100" width="132" height="50" fill="#cfe9f7" ${st()}/><path d="M72 104l20 -2" stroke="#fff" stroke-width="3" opacity=".8" stroke-linecap="round"/>` +
            shelf(122, ['kanelbulle', 'semla', 'lussekatt', 'kardemummabulle']) +
            shelf(146, ['vetebrod', 'kanelbulle', 'semla']) +
            `<rect x="218" y="96" width="44" height="56" fill="#2f6f5a" ${st()}/><rect x="224" y="102" width="32" height="20" fill="#cfe9f7" ${st(1.4)}/><circle cx="254" cy="128" r="2.4" fill="#f2c14e"/>` +
            `<path d="M286 52H302" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M286 52H302" stroke="#3a3a46" stroke-width="2.4"/>` +
            at(302, 72, 0.7, kringla) +
            `<path d="M302 52V58" stroke="${O}" stroke-width="2"/>` +
            at(
                24,
                152,
                1,
                `${shadow(2, 2, 16, 3)}<path d="M-12 -20H12M0 -20V0M-8 0H8" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M-12 -20H12M0 -20V0" stroke="#3a3a46" stroke-width="2.4" stroke-linecap="round"/><path d="M-6 -22V-30H5V-22Z" fill="#fff" ${st(1.6)}/><path d="M5 -28c4 0 4 5 0 5" fill="none" ${st(1.6)}/><path d="M-3 -34q2 -3 0 -6" fill="none" stroke="#b9a99a" stroke-width="1.6" stroke-linecap="round"/>`
            )
        );
    },
    plockstalle() {
        const plant = (x, y) =>
            at(
                x,
                y,
                1,
                `<path d="M-12 0C-14 -8 -6 -14 0 -10C6 -14 14 -8 12 0Z" fill="#4f9a3a" ${st(1.6)}/><path d="M-4 -6c2 -2 4 -2 6 0" fill="none" stroke="#8fd14f" stroke-width="1.6"/>` +
                    `<path d="M-9 -2C-11 2 -7 6 -5 4C-3 2 -5 -2 -9 -2Z" fill="#e0302a" ${st(1)}/><path d="M7 -1C5 3 9 7 11 5C13 3 11 -1 7 -1Z" fill="#e0302a" ${st(1)}/>`
            );
        let rows = '';
        [112, 132, 154].forEach((y, r) => {
            for (let x = 14 + (r % 2) * 14; x < 230; x += 28) {
                rows += plant(x, y);
            }
            rows =
                `<path d="M0 ${y + 3}H232" stroke="#a7784a" stroke-width="6" opacity=".35"/>` +
                rows;
        });
        return (
            sun(272, 34) +
            cloud(150, 30, 0.8) +
            `<path d="M-10 92C80 84 200 88 330 94V190H-10Z" fill="#7cc35a" ${st(2.6)}/>` +
            house(70, 92, 60, 30, '#b5452f', '#4a4a55', { door: false }) +
            tree(150, 94, 0.7, '#5fae45') +
            rows +
            at(
                272,
                166,
                1,
                `${shadow(4, 3, 30, 5)}<path d="M-26 -22H26L20 0H-20Z" fill="#c9924f" ${st(2.4)}/><path d="M-20 -24C-20 -48 20 -48 20 -24" fill="none" stroke="${O}" stroke-width="6"/><path d="M-20 -24C-20 -48 20 -48 20 -24" fill="none" stroke="#c9924f" stroke-width="3"/>` +
                    [-14, -4, 6, 14, -9, 1, 10]
                        .map(
                            (x, i) =>
                                `<path d="M${x} ${-22 - (i > 3 ? 6 : 0)}c-4 0 -5 6 0 9c5 -3 4 -9 0 -9Z" fill="#e0302a" ${st(1)}/>`
                        )
                        .join('') +
                    `<path d="M-22 -14H22" stroke="${O}" stroke-width="1.2" opacity=".4"/>`
            ) +
            at(
                250,
                110,
                1,
                `<path d="M0 0V-30" stroke="${O}" stroke-width="5"/><path d="M0 0V-30" stroke="#8a5a3a" stroke-width="2.4"/><rect x="-18" y="-46" width="36" height="20" fill="#fffaf2" ${st(2)}/><path d="M-6 -36c-4 0 -5 6 0 8c5 -2 4 -8 0 -8Z" fill="#e0302a" ${st(1)}/><path d="M4 -40H12M4 -34H10" stroke="${O}" stroke-width="1.6"/>`
            )
        );
    },
    loppis() {
        const table = (x, y, w) =>
            `<g transform="translate(${x} ${y})">${shadow(4, 2, w / 2 + 6, 4)}<path d="M${-w / 2 + 6} 0V-22M${w / 2 - 6} 0V-22" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M${-w / 2 + 6} 0V-22M${w / 2 - 6} 0V-22" stroke="#c58a52" stroke-width="2.4" stroke-linecap="round"/><rect x="${-w / 2}" y="-26" width="${w}" height="6" fill="#d79c62" ${st(2)}/></g>`;
        const lamp = `<path d="M-10 0H10L6 -4H-6Z" fill="#3a3a46" ${st(1.6)}/><path d="M0 -4V-26" stroke="${O}" stroke-width="2.4"/><path d="M-14 -24L-8 -42H8L14 -24Z" fill="#f2c14e" ${st(2)}/><path d="M-8 -30L-5 -40" stroke="#fff3b0" stroke-width="2" stroke-linecap="round"/>`;
        const sweater = `<path d="M-16 0V-14L-24 -10L-26 -20L-12 -26H12L26 -20L24 -10L16 -14V0Z" fill="#2a6ebb" ${st(2)}/><path d="M-16 -8H16M-16 -4H16" stroke="#fff" stroke-width="2"/><path d="M-6 -26q6 6 12 0" fill="none" ${st(1.4)}/>`;
        const books = `<rect x="-16" y="-8" width="32" height="8" fill="#a3392b" ${st(1.6)}/><rect x="-14" y="-16" width="28" height="8" fill="#4f9a3a" ${st(1.6)}/><rect x="-12" y="-23" width="26" height="7" fill="#f2c14e" ${st(1.6)}/>`;
        const vase = `<path d="M-6 0C-12 -6 -12 -18 -5 -22V-30H5V-22C12 -18 12 -6 6 0Z" fill="#7fd0f0" ${st(1.8)}/><path d="M-6 -18c0 -2 1 -3 2 -4" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>`;
        const tag = (x, y) =>
            `<path d="M${x} ${y}l8 -10" stroke="${O}" stroke-width="1"/><path d="M${x + 6} ${y - 14}h12v8h-12l-3 -4Z" fill="#fffaf2" ${st(1.2)}/>`;
        return (
            cloud(260, 30, 0.9) +
            sun(54, 34, 12) +
            `<path d="M-10 124C80 118 220 122 330 126V190H-10Z" fill="#8fc46a" ${st(2.6)}/>` +
            house(160, 124, 140, 56, '#b5452f', '#4a4a55', { door: false }) +
            `<rect x="128" y="86" width="64" height="38" fill="#2e2a2e" ${st(2)}/>` +
            `<path d="M10 64Q90 84 160 64Q230 84 310 64" fill="none" stroke="${O}" stroke-width="1.4"/>` +
            [30, 60, 90, 130, 190, 230, 262, 290]
                .map((x, i) => {
                    // vlaggetjes volgen de doorhangende lijn
                    const y = 64 + (x < 160 ? x - 10 : 310 - x) * 0.108;
                    return `<path d="M${x - 6} ${r1(y)}H${x + 6}L${x} ${r1(y + 12)}Z" fill="${['#f2c14e', '#d9302a', '#2a6ebb', '#8fd14f'][i % 4]}" ${st(1)}/>`;
                })
                .join('') +
            table(70, 162, 96) +
            table(240, 166, 104) +
            at(50, 136, 1, lamp) +
            at(88, 136, 1, books) +
            at(222, 140, 1, sweater) +
            at(266, 140, 1, vase) +
            tag(96, 116) +
            tag(232, 120)
        );
    },
    kivik() {
        return (
            sun(272, 34) +
            cloud(90, 30, 0.8) +
            `<path d="M-10 74H330V100H-10Z" fill="#6fb8e0"/><path d="M40 84q8 -4 16 0q8 4 16 0M210 88q8 -4 16 0" fill="none" stroke="#cfe8f3" stroke-width="2" stroke-linecap="round"/>` +
            `<path d="M-10 96C70 84 150 92 220 90C270 88 300 92 330 96V190H-10Z" fill="#9bd06a" ${st(2.6)}/>` +
            house(250, 112, 70, 36, '#fffaf2', '#a3392b') +
            tree(40, 132, 0.95, '#5fae45', '#d9302a') +
            tree(110, 122, 0.8, '#6cb84c', '#d9302a') +
            tree(176, 128, 0.7, '#5fae45', '#f2c14e') +
            at(150, 170, 0.62, MOTIFS.apples())
        );
    },
    'ales-stenar'() {
        // Scheepsvorm: puntig aan voor- en achtersteven, en daar de hoogste stenen.
        // Ruwe, scheve bovenkanten, zodat het geen rij grafstenen wordt.
        const stones = [];
        const n = 16;
        const rand = rng(59);
        for (let i = 0; i < n; i++) {
            const a = (i / n) * Math.PI * 2;
            const s = Math.sin(a);
            const x = 168 + Math.cos(a) * 104;
            const y = 124 + s * Math.abs(s) * 20;
            const end = Math.abs(Math.cos(a)) > 0.97;
            const h = end ? 32 : 13 + Math.abs(Math.cos(a)) * 9 + rand() * 4;
            stones.push({ x, y, h, tilt: (rand() - 0.5) * 6, w: 6 + rand() * 2 });
        }
        stones.sort((p, q) => p.y - q.y);
        return (
            sun(60, 36) +
            cloud(230, 34, 0.9) +
            `<path d="M-10 96H330V190H-10Z" fill="#4aa3d8"/><path d="M240 160q10 -5 20 0q10 5 20 0M270 140q8 -4 16 0" fill="none" stroke="#bfe6f8" stroke-width="2.4" stroke-linecap="round"/>` +
            `<path d="M-10 100C60 94 160 96 300 104C306 130 290 160 296 190H-10Z" fill="#a4cf6a" ${st(2.6)}/>` +
            `<path d="M300 104C306 130 290 160 296 190" fill="none" stroke="#e1c48a" stroke-width="6"/><path d="M300 104C306 130 290 160 296 190" fill="none" ${st(2)}/>` +
            `<ellipse cx="168" cy="126" rx="112" ry="26" fill="#93c05a" opacity=".6"/>` +
            stones
                .map(
                    ({ x, y, h, tilt, w }) =>
                        `<g transform="translate(${r1(x)} ${r1(y)})">${shadow(5, 1, 9, 3)}<path d="M${r1(-w)} 0L${r1(-w - 1)} ${r1(-h * 0.7)}L${r1(-w * 0.4)} ${r1(-h - tilt)}L${r1(w * 0.5)} ${r1(-h + tilt)}L${r1(w + 1)} ${r1(-h * 0.55)}L${r1(w)} 0Z" fill="#9aa3a8" ${st(2)}/><path d="M${r1(w * 0.2)} -2L${r1(w * 0.6)} ${r1(-h * 0.55)}L${r1(w - 0.5)} -2Z" fill="#7d878d"/></g>`
                )
                .join('') +
            tuft(30, 170) +
            tuft(70, 160, 0.8) +
            tuft(250, 172, 0.9) +
            gull(250, 64)
        );
    },
    brosarp() {
        return (
            sun(270, 36) +
            cloud(120, 34, 0.8) +
            `<path d="M-10 108C40 70 90 70 140 100C180 76 240 66 330 98V190H-10Z" fill="#8cc45e" ${st(2.6)}/>` +
            `<path d="M-10 140C60 112 120 116 180 136C230 118 290 116 330 130V190H-10Z" fill="#6fb24a" ${st(2.6)}/>` +
            `<path d="M150 190C140 168 170 150 150 132C140 122 160 112 176 104" fill="none" stroke="${O}" stroke-width="16" stroke-linecap="round"/><path d="M150 190C140 168 170 150 150 132C140 122 160 112 176 104" fill="none" stroke="#e1c48a" stroke-width="11" stroke-linecap="round"/>` +
            tree(240, 104, 0.6, '#4f9a3a') +
            sheep(70, 150, 1) +
            sheep(104, 160, 0.9, true) +
            sheep(230, 158, 0.85) +
            flowers(32, 172, '#ffd84a', 1.1) +
            flowers(196, 176, '#ffd84a', 1) +
            flowers(282, 170, '#ffd84a', 1.1) +
            tuft(130, 176) +
            tuft(300, 150, 0.8)
        );
    }
};

/* ---------- export ---------- */

/** Achtergrondkleur bij een scène (voor het beloningsscherm). */
export function sceneSky(id) {
    if (OUTING_SKY[id]) {
        return OUTING_SKY[id];
    }
    return FEASTS[id] ? FEASTS[id].sky : '#cdeaf7';
}

/** Is de scène donker (nachtlucht)? Dan hoort er lichte tekst overheen. */
export function sceneIsDark(id) {
    return Boolean(FEASTS[id] && FEASTS[id].night);
}

/** Heeft deze id een eigen tekening? */
export function hasScene(id) {
    return Boolean(OUTINGS[id] || FEASTS[id]);
}

function sceneBody(id) {
    if (OUTINGS[id]) {
        return `<rect width="320" height="180" fill="${OUTING_SKY[id]}"/>${OUTINGS[id]()}`;
    }
    if (FEASTS[id]) {
        return feastSvg(id);
    }
    return `<rect width="320" height="180" fill="#cdeaf7"/>${sun(160, 80, 20)}`;
}

const svgScene = (className, body) =>
    `<svg class="${className}" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${body}</svg>`;

/** Wat er boven de tekening in de doorlopende lucht staat: wolken, of sterren en sneeuw bij nacht. */
function skyAbove(id) {
    const f = FEASTS[id];
    if (f && f.table) {
        return '';
    }
    if (f && f.night) {
        const rnd = rng(id.length * 31 + 7);
        let s = '';
        for (let i = 0; i < 22; i++) {
            s += `<circle cx="${r1(rnd() * 320)}" cy="${r1(-150 + rnd() * 145)}" r="${r1(0.8 + rnd() * 1.3)}" fill="#fff" opacity="${r1(0.4 + rnd() * 0.5)}"/>`;
        }
        if (f.snow) {
            for (let i = 0; i < 18; i++) {
                s += `<circle cx="${r1(rnd() * 320)}" cy="${r1(-150 + rnd() * 145)}" r="${r1(1 + rnd() * 1.6)}" fill="#fff" opacity=".85"/>`;
            }
        }
        return s;
    }
    return cloud(64, -86, 1.15) + cloud(238, -110, 0.85) + cloud(196, -40, 0.65);
}

/**
 * Scène van een uitje of feestdag, 320x180.
 * fit 'bottom': voor een hoger vak. De hele tekening staat dan onderin, op
 * volle breedte, en de lucht loopt erboven door (niets van de zijkanten valt weg).
 */
export function scene(id, { className = 'scene', fit = 'cover' } = {}) {
    if (fit === 'bottom') {
        return svgScene(
            className,
            `<rect x="-480" y="-640" width="1280" height="900" fill="${sceneSky(id)}"/>${skyAbove(id)}${sceneBody(id)}`
        ).replace('xMidYMid slice', 'xMidYMax meet');
    }
    return svgScene(className, sceneBody(id));
}

/* ---------- uitgelicht: het nieuwe woord in zijn eigen plek ---------- */

/** Dingen voor op de toonbank die geen broodje zijn. Zelfde maat en nulpunt als BUNS. */
const PROPS = {
    kaffe: () =>
        shadow(4, 3, 28, 5) +
        `<ellipse cx="0" cy="-3" rx="28" ry="6" fill="#fff" ${st(2.2)}/>` +
        line('M14 -30C28 -30 28 -12 12 -12', 3, '#fff') +
        `<path d="M-17 -36H17L13 -7H-13Z" fill="#fff" ${st(2.4)}/>` +
        `<ellipse cx="0" cy="-36" rx="17" ry="4" fill="#6b3f22" ${st(1.8)}/>` +
        `<path d="M-11 -29V-13" stroke="#e1edf5" stroke-width="3" stroke-linecap="round"/>` +
        `<path d="M-5 -45q-4 -6 0 -12M6 -47q4 -6 0 -12" fill="none" stroke="#b9a99a" stroke-width="2" stroke-linecap="round"/>`
};

/**
 * Woorden met een eigen tekening: een broodje, iets voor op tafel, een
 * feestmotief, of een plek die zelf een tekening heeft.
 */
const WORD_ART = {
    bageri: { place: 'bageriet' },
    kanelbulle: { bun: 'kanelbulle' },
    kardemummabulle: { bun: 'kardemummabulle' },
    semla: { bun: 'semla' },
    lussekatt: { bun: 'lussekatt' },
    vetebröd: { bun: 'vetebrod' },
    kaffe: { prop: 'kaffe' },
    kräfta: { motif: 'crayfish' },
    chokladboll: { motif: 'chokladboll' },
    prinsesstårta: { motif: 'prinsesstarta' },
    stjärna: { motif: 'star' },
    flagga: { motif: 'flag' },
    midsommarstång: { motif: 'maypole' },
    julgran: { motif: 'tree' },
    brasa: { motif: 'bonfire' }
};

/**
 * Welk getekend woord staat in deze tekst? Ook verbogen of in een zin:
 * "Två kanelbullar och ett kaffe" geeft kanelbulle. Leeg als er geen is.
 */
export function wordArtKey(text) {
    const words = String(text || '')
        .toLowerCase()
        .split(/[^a-zåäöé]+/);
    for (const w of words) {
        for (const key of Object.keys(WORD_ART)) {
            if (w.startsWith(key.replace(/[ae]$/, '')) && w.length <= key.length + 3) {
                return key;
            }
        }
    }
    return '';
}

/** Binnen bij de bakker: schappen vol broodjes tegen de wand en een lamp boven de toonbank. */
function bakeryInside() {
    const shelf = (x, y, kinds) =>
        `<path d="M${x - 22} ${y}H${x + kinds.length * 34 - 12}" stroke="${O}" stroke-width="3" stroke-linecap="round"/>` +
        kinds.map((k, i) => at(x + i * 34, y, 0.42, BUNS[k]())).join('');
    return (
        `<rect width="320" height="180" fill="#f3e1b6"/>` +
        `<path d="M24 0V134M72 0V134M248 0V134M296 0V134" stroke="#fff" stroke-width="10" opacity=".25"/>` +
        shelf(18, 60, ['kanelbulle', 'semla', 'lussekatt']) +
        shelf(18, 100, ['vetebrod', 'kardemummabulle']) +
        shelf(234, 60, ['semla', 'kanelbulle', 'kardemummabulle']) +
        shelf(254, 100, ['lussekatt', 'kanelbulle'])
    );
}

/** De lamp boven de toonbank, met zijn lichtbundel. */
function lamp() {
    return (
        `<path d="M146 30L84 140H236L174 30Z" fill="#fff3b0" opacity=".38"/>` +
        `<path d="M160 -640V16" stroke="${O}" stroke-width="2.2"/>` +
        `<ellipse cx="160" cy="31" rx="9" ry="4" fill="#fff3b0" ${st(1.4)}/>` +
        `<path d="M142 31C142 20 150 14 160 14C170 14 178 20 178 31Z" fill="#2f6f5a" ${st(2.2)}/>` +
        `<path d="M149 25c1 -4 4 -6 8 -7" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".6"/>`
    );
}

/** De toonbank of tafel op de voorgrond, met het licht dat erop valt. */
function counter() {
    return (
        `<path d="M-10 134H330V146H-10Z" fill="#e4bb82" ${st()}/>` +
        `<path d="M-10 146H330V190H-10Z" fill="#b8784a" ${st()}/>` +
        `<path d="M40 146V180M120 146V180M200 146V180M280 146V180" stroke="${O}" stroke-width="1.2" opacity=".3"/>` +
        `<path d="M10 139H110" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".45"/>` +
        `<ellipse cx="160" cy="140" rx="84" ry="6" fill="#fff8dc" opacity=".75"/>`
    );
}

/** Een zachte gloed achter het ding, zoals om de zon in sun(). Niet bij nacht: dan wordt het grijs. */
function glow(id, cx, cy) {
    if (FEASTS[id] && FEASTS[id].night) {
        return '';
    }
    return `<circle cx="${cx}" cy="${cy}" r="66" fill="#fffaf2" opacity=".35"/><circle cx="${cx}" cy="${cy}" r="46" fill="#fffaf2" opacity=".4"/>`;
}

/** Plek zonder hoofdmotief: bij een feestdag de lucht en de grond, bij een uitje de tekening zacht. */
function softPlace(id) {
    const f = FEASTS[id];
    if (f) {
        return backdrop(f, id.length * 97 + id.charCodeAt(0));
    }
    return `${sceneBody(id)}<rect x="-480" y="-640" width="1280" height="820" fill="${sceneSky(id)}" opacity=".55"/>`;
}

/**
 * Het woord als deel van zijn plek, op 320x180. Een motief staat buiten op
 * de grond; een broodje of een kop koffie staat altijd bij de bakker op de
 * toonbank, ook in een rondje van een feestdag (een lussekatt hoort niet in de sneeuw).
 */
function spotBody(id, art) {
    if (art.place) {
        return sceneBody(art.place);
    }
    if (art.motif) {
        const s = TALL.has(art.motif) ? 0.8 : 0.95;
        return softPlace(id) + glow(id, 160, 96) + at(160, 152, s, MOTIFS[art.motif]());
    }
    return (
        bakeryInside() +
        `<rect width="320" height="180" fill="#f3e1b6" opacity=".5"/>` +
        lamp() +
        counter() +
        at(160, 141, 1.45, art.bun ? BUNS[art.bun]() : PROPS[art.prop]())
    );
}

/**
 * Het nieuwe woord als deel van de plek: de kanelbulle op de toonbank in het
 * licht van de lamp, de rest van de bakkerij zacht erachter. Leeg als het
 * woord geen eigen tekening heeft, of als de scène al precies dat ding laat zien.
 */
export function spotScene(id, word, { className = 'scene' } = {}) {
    const art = WORD_ART[wordArtKey(word)];
    if (!art) {
        return '';
    }
    if (art.place === id || (FEASTS[id] && FEASTS[id].motif === (art.bun || art.motif))) {
        return '';
    }
    return svgScene(className, spotBody(id, art));
}

/**
 * Wat er boven de 320x180 doorloopt als het vak hoger is dan 16:9: bij de
 * bakker de muur met zijn lichte banen (de lamp hangt al aan een lang snoer),
 * buiten de lucht met wolken of sterren.
 */
function spotAbove(id, art) {
    if (art.bun || art.prop) {
        return (
            `<rect x="-480" y="-640" width="1280" height="900" fill="#f3e1b6"/>` +
            `<path d="M24 -640V0M72 -640V0M248 -640V0M296 -640V0" stroke="#fff" stroke-width="10" opacity=".125"/>`
        );
    }
    const place = art.place || id;
    return `<rect x="-480" y="-640" width="1280" height="900" fill="${sceneSky(place)}"/>${skyAbove(place)}`;
}

/**
 * Beeld bij het oefenen: het ding uit de tekst in zijn plek, zoals bij het
 * kennismaken. Bij een feestdag anders het motief van die dag; bij een uitje
 * zonder getekend ding leeg. De hele breedte blijft staan (er valt geen
 * broodje half van de plank); is het vak hoger, dan loopt de muur of de lucht
 * erboven door. Het vak hoort dus niet breder te zijn dan 16:9.
 */
export function spotThing(id, text, { className = 'scene' } = {}) {
    // Een feestdag draait om zijn motief; staat er niets getekend in de zin, dan dat.
    const art = WORD_ART[wordArtKey(text)] || (FEASTS[id] && { motif: FEASTS[id].motif });
    if (!art) {
        return '';
    }
    return svgScene(className, spotAbove(id, art) + spotBody(id, art)).replace(
        'xMidYMid slice',
        'xMidYMax meet'
    );
}

/** Alleen het motief van een feestdag, in een rond tegeltje. */
export function motif(id, size = 52) {
    const f = FEASTS[id];
    if (!f) {
        return '';
    }
    return `<svg viewBox="-80 -138 160 150" width="${size}" height="${size}" aria-hidden="true" focusable="false">${MOTIFS[f.motif]()}</svg>`;
}

export const SCENE_IDS = { outings: Object.keys(OUTINGS), feasts: Object.keys(FEASTS) };
