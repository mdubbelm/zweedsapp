/**
 * Illustratie-werelden voor de Zweeds-app, als hand-geschreven SVG.
 * Elke wereld: { name, sky, svg, nodes }.
 *  - svg: viewBox 0 0 390 1500, preserveAspectRatio xMidYMax slice. Geen tekst.
 *  - nodes: 11 punten van onder naar boven op het pad. De app legt daar zelf
 *    de bolletjes, kisten en de trofee overheen; in de tekening is dus alleen
 *    een open plekje op het pad gelaten.
 * Stijl voor alle werelden: donkerbruine contour (#5b3a29), zachte schaduw
 * rechtsonder, licht van linksboven, zandpad met stippellijn in het midden.
 * Alle id's in de svg zijn geprefixt met de wereldnaam.
 */

const OUT = '#5b3a29';
const SHADOW = 'rgba(70,45,20,.17)';
const NODE_TYPES = [
    'challenge',
    'challenge',
    'challenge',
    'chest',
    'challenge',
    'challenge',
    'challenge',
    'chest',
    'challenge',
    'challenge',
    'trophy'
];
const PATH_W = 62;

const r1 = n => Math.round(n * 10) / 10;

function rng(seed) {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/** Maak de 11 knooppunten van onder (y=1375) naar boven (y=125). */
function makeNodes(xs) {
    return xs.map((x, i) => ({ x, y: 1375 - i * 125, type: NODE_TYPES[i] }));
}

/**
 * Tekencontext: verzamelt defs, lagen en het pad, en kan controleren of er
 * iets op het pad belandt.
 */
function makeCtx(id, nodes, opts = {}) {
    const defs = [];
    const layers = { ground: [], water: [], path: [], bridge: [], items: [], over: [] };
    const placed = [];
    const syms = {};
    const tops = {};
    const aliases = {};
    const warnings = [];
    const used = new Set();
    const boxes = [];
    const notes = [];
    const start = opts.start || [nodes[0].x + 6, 1560];
    const end = opts.end || [nodes[10].x, 30];
    const pts = [start, ...nodes.map(n => [n.x, n.y]), end];

    // Catmull-Rom -> bezier, en samples voor afstandscontroles
    let d = `M${start[0]} ${start[1]}`;
    const samples = [];
    for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] || pts[i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2] || p2;
        const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
        const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        d += `C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${p2[0]} ${p2[1]}`;
        for (let k = 0; k < 24; k++) {
            const t = k / 24;
            const u = 1 - t;
            samples.push([
                u * u * u * p1[0] +
                    3 * u * u * t * c1[0] +
                    3 * u * t * t * c2[0] +
                    t * t * t * p2[0],
                u * u * u * p1[1] +
                    3 * u * u * t * c1[1] +
                    3 * u * t * t * c2[1] +
                    t * t * t * p2[1]
            ]);
        }
    }
    samples.push(end);

    const dist = (x, y) => {
        let m = 1e9;
        for (const s of samples) {
            const dd = Math.hypot(s[0] - x, s[1] - y);
            if (dd < m) {
                m = dd;
            }
        }
        return m;
    };
    const pathX = y => {
        let best = samples[0];
        for (const s of samples) {
            if (Math.abs(s[1] - y) < Math.abs(best[1] - y)) {
                best = s;
            }
        }
        return best[0];
    };
    const nodeDist = (x, y) => Math.min(...nodes.map(n => Math.hypot(n.x - x, n.y - y)));
    const free = (x, y, r = 10) =>
        dist(x, y) > PATH_W / 2 + 4 + r && (r < 12 || nodeDist(x, y) > 62 + r * 0.6);

    const ctx = {
        id,
        nodes,
        pathD: d,
        samples,
        warnings,
        notes,
        used,
        /** reserveer een gebied (meer, duin) zodat strooiwerk er niet in valt */
        block(x0, y0, x1, y1, n = 'blok') {
            boxes.push([x0, y0, x1, y1, n]);
        },
        /** controleer dat verplichte onderdelen ook echt getekend zijn */
        require(...names) {
            names.forEach(n => {
                if (!used.has(n)) {
                    warnings.push(`VERPLICHT ONTBREEKT: ${n}`);
                }
            });
        },
        dist,
        pathX,
        free,
        def(s) {
            defs.push(s);
        },
        add(layer, s) {
            layers[layer].push(s);
        },
        /** registreer een symbool; r = voetafdruk-straal voor de controle */
        sym(name, content, r = 14, top) {
            syms[name] = r;
            if (top) {
                tops[name] = top;
            }
            defs.push(`<g id="${id}-${name}">${content}</g>`);
        },
        /** alias: zelfde symbool met een eigen kleur (via currentColor) */
        alias(name, base, color) {
            aliases[name] = [base, color];
            syms[name] = syms[base];
        },
        /** plaats een symbool; items worden op y gesorteerd (painter) */
        use(name, x, y, s = 1, o = {}) {
            const r = (o.r !== undefined ? o.r : syms[name] || 14) * s;
            const top = tops[name];
            if (
                !o.force &&
                (!free(x, y, r * 0.8) || (top && !free(x, y + top[0] * s, top[1] * s * 0.85)))
            ) {
                if (!o.scatter) {
                    warnings.push(`${name}@${r1(x)},${r1(y)} ligt op het pad`);
                }
                return false;
            }
            used.add(name);
            const hw = top ? top[1] * 0.9 * s : r;
            const box = [
                x - hw,
                top ? y + (top[0] - top[1] * 0.85) * s : y - r * 1.2,
                x + hw,
                y,
                name
            ];
            const hit = boxes.find(
                b =>
                    Math.min(b[2], box[2]) - Math.max(b[0], box[0]) > 14 &&
                    Math.min(b[3], box[3]) - Math.max(b[1], box[1]) > 14
            );
            if (hit && !o.scatter && (hw > 18 || hit[4] !== undefined)) {
                notes.push(`${name}@${r1(x)},${r1(y)} overlapt ${hit[4]}`);
            }
            if (hit && o.scatter) {
                return false;
            }
            boxes.push(box);
            let color = o.color;
            let real = name;
            if (aliases[name]) {
                real = aliases[name][0];
                color = aliases[name][1];
            }
            const sc = o.flip ? `${r1(-s)} ${r1(s)}` : `${r1(s)}`;
            layers.items.push({
                y: y + (o.dy || 0),
                s: `<use href="#${id}-${real}" transform="translate(${r1(x)} ${r1(y)}) scale(${sc})"${color ? ` color="${color}"` : ''}/>`
            });
            placed.push([x, y, r]);
            return true;
        },
        /** strooi symbolen op vrije plekken */
        scatter(names, n, o = {}) {
            const rnd = rng(o.seed || 7);
            const x0 = o.x0 ?? 8;
            const x1 = o.x1 ?? 382;
            const y0 = o.y0 ?? 60;
            const y1 = o.y1 ?? 1490;
            let tries = 0;
            let ok = 0;
            while (ok < n && tries < n * 60) {
                tries++;
                const x = x0 + rnd() * (x1 - x0);
                const y = y0 + rnd() * (y1 - y0);
                const name = names[Math.floor(rnd() * names.length)];
                const s =
                    (o.s ? o.s[0] + rnd() * (o.s[1] - o.s[0]) : 1) *
                    (o.flipRandom && rnd() < 0.5 ? 1 : 1);
                const r = (syms[name] || 14) * s;
                if (!free(x, y, r * 0.8 + (o.gap || 0))) {
                    continue;
                }
                if (
                    placed.some(
                        p => Math.hypot(p[0] - x, p[1] - y) < (p[2] + r) * (o.spread ?? 0.75)
                    )
                ) {
                    continue;
                }
                if (o.avoid && o.avoid.some(a => Math.hypot(a[0] - x, a[1] - y) < a[2] + r)) {
                    continue;
                }
                if (ctx.use(name, x, y, s, { flip: rnd() < 0.5, scatter: true })) {
                    ok++;
                }
            }
            return ok;
        },
        left(y, gap = 0) {
            return pathX(y) - PATH_W / 2 - gap;
        },
        right(y, gap = 0) {
            return pathX(y) + PATH_W / 2 + gap;
        },
        /** hoek (graden) van het pad op hoogte y, 0 = recht omhoog */
        angleAt(y) {
            let bi = 0;
            for (let i = 0; i < samples.length; i++) {
                if (Math.abs(samples[i][1] - y) < Math.abs(samples[bi][1] - y)) {
                    bi = i;
                }
            }
            const a = samples[Math.max(0, bi - 2)];
            const b = samples[Math.min(samples.length - 1, bi + 2)];
            return (Math.atan2(b[0] - a[0], -(b[1] - a[1])) * 180) / Math.PI;
        },
        /** beekje dwars over het pad, met steenbrug */
        stream(sy, c) {
            const sx = pathX(sy);
            const d = `M-20 ${sy - 20}C60 ${sy - 34} ${sx - 70} ${sy + 18} ${sx} ${sy}C${sx + 70} ${sy - 18} 340 ${sy + 20} 410 ${sy - 6}`;
            layers.water.push(
                `<path d="${d}" fill="none" stroke="rgba(40,70,20,.2)" stroke-width="56" transform="translate(2 5)"/>` +
                    `<path d="${d}" fill="none" stroke="${c.edge}" stroke-width="52" stroke-linecap="round"/>` +
                    `<path d="${d}" fill="none" stroke="${c.water}" stroke-width="44"/>` +
                    `<path d="${d}" fill="none" stroke="${c.light}" stroke-width="22" opacity=".55"/>` +
                    `<path d="${d}" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="16 44" stroke-linecap="round" transform="translate(0 -9)" opacity=".85"/>` +
                    `<path d="${d}" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="10 50" stroke-dashoffset="20" stroke-linecap="round" transform="translate(0 9)" opacity=".7"/>`
            );
            const ang = ctx.angleAt(sy);
            const wall = x =>
                `<rect x="${x}" y="-48" width="9" height="96" rx="4" fill="${c.wall}" stroke="${OUT}" stroke-width="2.4"/><path d="M${x} -30H${x + 9}M${x} -8H${x + 9}M${x} 14H${x + 9}M${x} 34H${x + 9}" stroke="${OUT}" stroke-width="1.4" opacity=".5"/><path d="M${x + 2} -44V44" stroke="#fff" stroke-width="1.6" opacity=".35"/>`;
            layers.bridge.push(
                `<g transform="translate(${r1(sx)} ${sy}) rotate(${r1(ang)})"><rect x="-44" y="-44" width="88" height="90" rx="6" fill="rgba(40,30,10,.2)" transform="translate(3 5)"/>` +
                    `<rect x="-38" y="-44" width="76" height="88" fill="${c.deck}" stroke="${OUT}" stroke-width="2.6"/><path d="M0 -38V38" stroke="#fff" stroke-width="3" stroke-dasharray="1 12" stroke-linecap="round" opacity=".8"/>` +
                    wall(-46) +
                    wall(37) +
                    `<circle cx="-41" cy="-52" r="6" fill="${c.wall}" stroke="${OUT}" stroke-width="2.2"/><circle cx="41" cy="-52" r="6" fill="${c.wall}" stroke="${OUT}" stroke-width="2.2"/><circle cx="-41" cy="52" r="6" fill="${c.wall}" stroke="${OUT}" stroke-width="2.2"/><circle cx="41" cy="52" r="6" fill="${c.wall}" stroke="${OUT}" stroke-width="2.2"/></g>`
            );
        },
        /** pad tekenen */
        drawPath(c) {
            const dd = ctx.pathD;
            layers.path.push(
                `<path d="${dd}" fill="none" stroke="rgba(60,40,10,.2)" stroke-width="${PATH_W + 12}" stroke-linecap="round" transform="translate(3 5)"/>` +
                    `<path d="${dd}" fill="none" stroke="${c.edge}" stroke-width="${PATH_W + 8}" stroke-linecap="round" stroke-linejoin="round"/>` +
                    `<path d="${dd}" fill="none" stroke="${c.sand}" stroke-width="${PATH_W}" stroke-linecap="round" stroke-linejoin="round"/>` +
                    `<path d="${dd}" fill="none" stroke="${c.light}" stroke-width="${PATH_W - 24}" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>` +
                    `<path d="${dd}" fill="none" stroke="${c.dot || '#fffaf0'}" stroke-width="3.6" stroke-linecap="round" stroke-dasharray="0.1 13" opacity=".85"/>`
            );
        },
        clearing(x, y, rx, ry, fill, op = 0.5) {
            layers.ground.push(
                `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" opacity="${op}"/>`
            );
        },
        out(sky) {
            const items = layers.items
                .map((o, i) => [o, i])
                .sort((a, b) => a[0].y - b[0].y || a[1] - b[1])
                .map(a => a[0].s)
                .join('');
            return (
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 1500" preserveAspectRatio="xMidYMax slice" width="100%" height="100%" focusable="false" aria-hidden="true">` +
                `<defs>${defs.join('')}</defs>` +
                layers.ground.join('') +
                layers.water.join('') +
                layers.path.join('') +
                layers.bridge.join('') +
                items +
                layers.over.join('') +
                `</svg>`
            );
        }
    };
    return ctx;
}

/* ---------- gedeelde bouwstenen (symbolen) ---------- */

const circ = (cs, dx, dy, dr, attr = '') =>
    cs.map(([x, y, r]) => `<circle cx="${x + dx}" cy="${y + dy}" r="${r + dr}" ${attr}/>`).join('');

/** Ronde loofboom. p: {leaf, leafD, leafL, trunk, trunkD, fruit?} */
function symTree(clipId, p, o = {}) {
    const cs = o.cs || [
        [0, -88, 34],
        [-27, -70, 26],
        [27, -72, 27],
        [-13, -106, 24],
        [17, -103, 23],
        [0, -64, 28]
    ];
    const fruit = p.fruit
        ? [
              [-24, -76],
              [20, -94],
              [8, -62],
              [-8, -102],
              [34, -66],
              [-36, -58]
          ]
              .map(
                  ([x, y]) =>
                      `<circle cx="${x}" cy="${y}" r="5.2" fill="${p.fruit}" stroke="${OUT}" stroke-width="1.6"/><circle cx="${x - 1.6}" cy="${y - 1.8}" r="1.5" fill="#fff" opacity=".7"/>`
              )
              .join('')
        : '';
    return (
        `<ellipse cx="12" cy="2" rx="40" ry="10" fill="${SHADOW}"/>` +
        `<path d="M-8 2C-7 -18 -6 -40 -11 -62L11 -62C6 -40 7 -18 8 2Z" fill="${p.trunk}" stroke="${OUT}" stroke-width="3" stroke-linejoin="round"/>` +
        `<path d="M2 -2C3 -22 3 -42 6 -60L11 -62C6 -40 7 -18 8 2Z" fill="${p.trunkD}" opacity=".75"/>` +
        `<path d="M-1 -34L-14 -52M2 -40L16 -58" stroke="${p.trunkD}" stroke-width="3" stroke-linecap="round"/>` +
        `<clipPath id="${clipId}">${circ(cs, 0, 0, 0)}</clipPath>` +
        `<g fill="${OUT}" stroke="${OUT}" stroke-width="4.8" stroke-linejoin="round">${circ(cs, 0, 0, 0)}</g>` +
        `<g fill="${p.leafD}">${circ(cs, 0, 0, 0)}</g>` +
        `<g clip-path="url(#${clipId})"><g fill="${p.leaf}">${circ(cs, -6, -8, -3)}</g><g fill="${p.leafL}">${circ(cs, -14, -18, -13)}</g>` +
        `<path d="M-30 -62q7 -9 14 0M10 -78q7 -9 14 0M-6 -96q7 -9 14 0M18 -58q7 -9 14 0M-40 -84q7 -9 14 0M-14 -76q5 -7 10 0" fill="none" stroke="${p.leafD}" stroke-width="2.4" stroke-linecap="round" opacity=".8"/></g>` +
        fruit
    );
}

/** Spar. p: {a, b, c (licht, midden, donker), trunk} */
function symPine(p) {
    const tier = (y, w, h) =>
        `<path d="M0 ${y - h}C${w * 0.35} ${y - h * 0.55} ${w * 0.8} ${y - h * 0.2} ${w} ${y}Q0 ${y + 9} ${-w} ${y}C${-w * 0.8} ${y - h * 0.2} ${-w * 0.35} ${y - h * 0.55} 0 ${y - h}Z" fill="${p.b}" stroke="${OUT}" stroke-width="3.2" stroke-linejoin="round"/>` +
        `<path d="M0 ${y - h}C${w * 0.35} ${y - h * 0.55} ${w * 0.8} ${y - h * 0.2} ${w} ${y}Q${w * 0.5} ${y + 5} 0 ${y + 6}Q${w * 0.2} ${y - h * 0.4} 0 ${y - h}Z" fill="${p.c}" opacity=".85"/>` +
        `<path d="M${-w * 0.55} ${y - 5}q${w * 0.2} -${h * 0.35} ${w * 0.35} -${h * 0.55}" fill="none" stroke="${p.a}" stroke-width="3.4" stroke-linecap="round" opacity=".8"/>`;
    return (
        `<ellipse cx="9" cy="2" rx="28" ry="8" fill="${SHADOW}"/>` +
        `<rect x="-6" y="-24" width="12" height="26" rx="2" fill="${p.trunk}" stroke="${OUT}" stroke-width="2.6"/>` +
        tier(-18, 38, 46) +
        tier(-48, 31, 42) +
        tier(-76, 23, 40)
    );
}

function symBush(p, berryColor) {
    const cs = [
        [-20, -14, 17],
        [4, -22, 21],
        [24, -13, 16],
        [-2, -8, 16]
    ];
    const berries = berryColor
        ? [
              [-18, -16],
              [-4, -28],
              [12, -24],
              [24, -14],
              [0, -10],
              [-26, -8],
              [14, -10]
          ]
              .map(
                  ([x, y]) =>
                      `<circle cx="${x}" cy="${y}" r="3.6" fill="${berryColor}" stroke="${OUT}" stroke-width="1.3"/><circle cx="${x - 1.1}" cy="${y - 1.2}" r="1" fill="#fff" opacity=".75"/>`
              )
              .join('')
        : '';
    return (
        `<ellipse cx="6" cy="2" rx="34" ry="7" fill="${SHADOW}"/>` +
        `<g fill="${OUT}" stroke="${OUT}" stroke-width="4.4" stroke-linejoin="round">${circ(cs, 0, 0, 0)}</g>` +
        `<g fill="${p.leafD}">${circ(cs, 0, 0, 0)}</g>` +
        `<clipPath id="${p.clip}">${circ(cs, 0, 0, 0)}</clipPath><g clip-path="url(#${p.clip})"><g fill="${p.leaf}">${circ(cs, -4, -5, -3)}</g><g fill="${p.leafL}">${circ(cs, -9, -11, -10)}</g></g>` +
        `<path d="M-12 -4q5 -6 10 0M10 -12q5 -6 10 0M-26 -12q4 -5 8 0" fill="none" stroke="${p.leafD}" stroke-width="2" stroke-linecap="round" opacity=".8"/>` +
        berries
    );
}

function symFlowers(petal, center = '#ffd84a', leaf = '#4f9a3a') {
    const fl = (x, y, s) =>
        `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0V16" stroke="#3f7f31" stroke-width="2.2" stroke-linecap="round"/>` +
        [0, 72, 144, 216, 288]
            .map(
                a =>
                    `<circle cx="${r1(Math.sin((a * Math.PI) / 180) * 5)}" cy="${r1(-Math.cos((a * Math.PI) / 180) * 5)}" r="3.8" fill="${petal}" stroke="${OUT}" stroke-width="1.2"/>`
            )
            .join('') +
        `<circle r="2.8" fill="${center}" stroke="${OUT}" stroke-width="1"/></g>`;
    return (
        `<ellipse cx="3" cy="2" rx="16" ry="4" fill="${SHADOW}"/>` +
        `<path d="M-12 2q-4 -9 -9 -12M-2 2q0 -8 2 -14M10 2q4 -8 10 -10" stroke="${OUT}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M-12 2q-4 -9 -9 -12M-2 2q0 -8 2 -14M10 2q4 -8 10 -10" stroke="${leaf}" stroke-width="2" fill="none" stroke-linecap="round"/>` +
        fl(-14, -16, 1) +
        fl(0, -22, 1.15) +
        fl(15, -12, 0.95)
    );
}

function symMushroom() {
    return (
        `<ellipse cx="3" cy="1" rx="12" ry="3.5" fill="${SHADOW}"/>` +
        `<path d="M-4 0C-5 -6 -4 -9 -3 -12L4 -12C5 -9 5 -6 4 0Z" fill="#f6ead2" stroke="${OUT}" stroke-width="1.8" stroke-linejoin="round"/>` +
        `<path d="M-12 -11C-12 -22 12 -22 12 -11C6 -9 -6 -9 -12 -11Z" fill="#e0453a" stroke="${OUT}" stroke-width="2" stroke-linejoin="round"/>` +
        `<path d="M-9 -14C-8 -19 -2 -21 1 -21" fill="none" stroke="#f58b7a" stroke-width="2" stroke-linecap="round"/>` +
        `<circle cx="-4" cy="-15" r="1.7" fill="#fff"/><circle cx="3" cy="-17" r="1.9" fill="#fff"/><circle cx="7" cy="-13" r="1.3" fill="#fff"/>`
    );
}

function symRock(p, clip) {
    const d = 'M-30 0C-34 -14 -26 -28 -10 -32C4 -38 22 -30 28 -18C34 -8 32 0 28 2Z';
    return (
        `<ellipse cx="6" cy="2" rx="36" ry="7" fill="${SHADOW}"/>` +
        `<path d="${d}" fill="${p.base}" stroke="${OUT}" stroke-width="2.8" stroke-linejoin="round"/>` +
        `<clipPath id="${clip}"><path d="${d}"/></clipPath><g clip-path="url(#${clip})"><path d="M8 -36C22 -30 32 -14 30 4L2 4C14 -8 14 -22 8 -36Z" fill="${p.dark}"/><path d="M-26 -22C-18 -32 -4 -34 6 -32C-6 -30 -18 -26 -22 -14Z" fill="${p.light}"/>` +
        (p.moss
            ? `<path d="M-32 -6C-24 -14 -14 -16 -6 -12C-4 -8 -10 -6 -14 -4C-18 -2 -28 -2 -34 2Z" fill="${p.moss}"/>`
            : '') +
        `</g><path d="M-14 -12l8 -3M6 -22l7 4" stroke="${OUT}" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>`
    );
}

function symTuft(c1 = '#5aa43f', c2 = '#7dc356') {
    return (
        `<path d="M-9 1C-8 -8 -12 -13 -15 -16C-9 -14 -6 -9 -4 -3C-3 -11 -1 -17 1 -21C3 -15 4 -9 3 -3C6 -9 9 -13 14 -15C11 -9 9 -4 8 1Z" fill="${c1}" stroke="${OUT}" stroke-width="1.5" stroke-linejoin="round"/>` +
        `<path d="M-4 -3C-3 -10 -1 -15 1 -19" stroke="${c2}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`
    );
}

/** blobachtige grondvlekken voor wat variatie */
function groundBlobs(ctx, color, n, seed, opts = {}) {
    const rnd = rng(seed);
    let s = '';
    for (let i = 0; i < n; i++) {
        const x = rnd() * 390;
        const y = (opts.y0 ?? 0) + rnd() * ((opts.y1 ?? 1500) - (opts.y0 ?? 0));
        const rx = 40 + rnd() * 70;
        const ry = 20 + rnd() * 40;
        s += `<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="${color}" opacity="${opts.op ?? 0.35}" transform="rotate(${r1(rnd() * 40 - 20)} ${r1(x)} ${r1(y)})"/>`;
    }
    ctx.add('ground', s);
}

/** Zweeds houten huisje: muren in currentColor, witte hoeken en raamlijsten. */
function symHouse(clip, roof = '#4a4a55', o = {}) {
    const w = o.w || 56;
    const h = o.h || 44;
    return (
        `<ellipse cx="10" cy="3" rx="${w + 12}" ry="9" fill="${SHADOW}"/>` +
        `<rect x="${-w}" y="${-h}" width="${w * 2}" height="${h}" fill="currentColor" stroke="${OUT}" stroke-width="2.8"/>` +
        `<clipPath id="${clip}"><rect x="${-w}" y="${-h}" width="${w * 2}" height="${h}"/></clipPath>` +
        `<g clip-path="url(#${clip})"><rect x="${-w}" y="${-h}" width="${w * 0.3}" height="${h}" fill="#fff" opacity=".18"/><rect x="${w * 0.7}" y="${-h}" width="${w * 0.3}" height="${h}" fill="#000" opacity=".12"/>` +
        Array.from(
            { length: Math.floor(w / 6) },
            (_, i) =>
                `<path d="M${-w + 7 + i * 12} ${-h}V0" stroke="#000" stroke-width="1" opacity=".13"/>`
        ).join('') +
        `</g>` +
        `<rect x="${-w}" y="${-h}" width="5" height="${h}" fill="#fff" stroke="${OUT}" stroke-width="1.8"/><rect x="${w - 5}" y="${-h}" width="5" height="${h}" fill="#fff" stroke="${OUT}" stroke-width="1.8"/>` +
        `<path d="M${-w - 9} ${-h + 2}L0 ${-h - 34}L${w + 9} ${-h + 2}Z" fill="${roof}" stroke="${OUT}" stroke-width="2.8" stroke-linejoin="round"/>` +
        `<path d="M${-w - 4} ${-h}L-2 ${-h - 31}" stroke="#fff" stroke-width="2.4" opacity=".28" stroke-linecap="round"/>` +
        `<path d="M${-w - 9} ${-h + 2}H${w + 9}" stroke="#fff" stroke-width="3.4"/><path d="M${-w - 9} ${-h + 2}H${w + 9}" stroke="${OUT}" stroke-width="1.2" opacity=".5"/>` +
        `<rect x="${w * 0.25}" y="${-h * 0.8}" width="${w * 0.32}" height="${h * 0.42}" fill="#cfe9f7" stroke="#fff" stroke-width="3"/><path d="M${w * 0.41} ${-h * 0.8}V${-h * 0.38}M${w * 0.25} ${-h * 0.59}H${w * 0.57}" stroke="#fff" stroke-width="2"/><rect x="${w * 0.25}" y="${-h * 0.8}" width="${w * 0.32}" height="${h * 0.42}" fill="none" stroke="${OUT}" stroke-width="1.4"/>` +
        `<rect x="${-w * 0.55}" y="${-h * 0.75}" width="${w * 0.3}" height="${h * 0.75}" fill="#fff" stroke="${OUT}" stroke-width="2.2"/><rect x="${-w * 0.5}" y="${-h * 0.68}" width="${w * 0.2}" height="${h * 0.68}" fill="#9a5b3a" stroke="${OUT}" stroke-width="1.4"/><circle cx="${-w * 0.33}" cy="${-h * 0.3}" r="1.7" fill="#ffd84a"/>` +
        `<rect x="${w * 0.04}" y="${-h + 6}" width="9" height="9" rx="4.5" fill="#fff" stroke="${OUT}" stroke-width="1.4"/>`
    );
}

/** parkbank */
function symBench() {
    return (
        `<ellipse cx="6" cy="3" rx="26" ry="5" fill="${SHADOW}"/>` +
        `<path d="M-20 0V-10M20 0V-10" stroke="${OUT}" stroke-width="6" stroke-linecap="round"/><path d="M-20 0V-10M20 0V-10" stroke="#4a4550" stroke-width="3" stroke-linecap="round"/>` +
        `<rect x="-26" y="-14" width="52" height="6" rx="2" fill="#c58a52" stroke="${OUT}" stroke-width="2.2"/><rect x="-26" y="-34" width="52" height="5" rx="2" fill="#d79c62" stroke="${OUT}" stroke-width="2.2"/><rect x="-26" y="-25" width="52" height="5" rx="2" fill="#c58a52" stroke="${OUT}" stroke-width="2.2"/><path d="M-22 -34V-8M22 -34V-8" stroke="${OUT}" stroke-width="2.4"/>`
    );
}

/** straatlantaarn (lantaarnpaal), kleur via currentColor */
function symLamp() {
    return (
        `<ellipse cx="5" cy="2" rx="10" ry="3" fill="${SHADOW}"/>` +
        `<path d="M-5 2H5L3 -6H-3Z" fill="currentColor" stroke="${OUT}" stroke-width="2" stroke-linejoin="round"/><rect x="-2" y="-74" width="4" height="70" fill="currentColor" stroke="${OUT}" stroke-width="2"/>` +
        `<path d="M-9 -74L-6 -88L6 -88L9 -74Z" fill="#fff3b0" stroke="${OUT}" stroke-width="2.2" stroke-linejoin="round"/><path d="M-5 -74L-3 -86" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M-10 -88L0 -96L10 -88Z" fill="currentColor" stroke="${OUT}" stroke-width="2.2" stroke-linejoin="round"/><circle cx="0" cy="-98" r="2.4" fill="currentColor" stroke="${OUT}" stroke-width="1.4"/>`
    );
}

/** geparkeerde fiets, frame via currentColor */
function symBike() {
    return (
        `<ellipse cx="4" cy="3" rx="32" ry="5" fill="${SHADOW}"/>` +
        `<circle cx="-20" cy="-12" r="12" fill="none" stroke="${OUT}" stroke-width="5"/><circle cx="-20" cy="-12" r="12" fill="none" stroke="#3a3a46" stroke-width="2.4"/><circle cx="20" cy="-12" r="12" fill="none" stroke="${OUT}" stroke-width="5"/><circle cx="20" cy="-12" r="12" fill="none" stroke="#3a3a46" stroke-width="2.4"/>` +
        `<path d="M-20 -12L-6 -12L2 -30L18 -30L20 -12M-6 -12L-12 -30M-12 -30H2M2 -30L6 -38H14" fill="none" stroke="${OUT}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M-20 -12L-6 -12L2 -30L18 -30L20 -12M-6 -12L-12 -30M-12 -30H2M2 -30L6 -38H14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` +
        `<path d="M-18 -34H-6" stroke="${OUT}" stroke-width="5" stroke-linecap="round"/><path d="M-18 -34H-6" stroke="#4a4550" stroke-width="2.4" stroke-linecap="round"/>` +
        `<path d="M22 -36L28 -34L28 -24L20 -24Z" fill="#c58a52" stroke="${OUT}" stroke-width="2" stroke-linejoin="round"/><path d="M24 -36V-24M26 -35V-25" stroke="${OUT}" stroke-width="1" opacity=".5"/><circle cx="-20" cy="-12" r="2.4" fill="#d9dde6"/><circle cx="20" cy="-12" r="2.4" fill="#d9dde6"/>`
    );
}

/** gebouw met vensterpatroon (pattern id = `${pid}`), muren via currentColor */
function symBuilding(pid, w, floors, roof = 'flat') {
    const h = floors * 18 + 6;
    const hw = w / 2;
    let top = '';
    if (roof === 'flat') {
        top = `<rect x="${-hw - 3}" y="${-h - 6}" width="${w + 6}" height="8" fill="#e8e4dc" stroke="${OUT}" stroke-width="2.4"/>`;
    } else if (roof === 'gable') {
        top = `<path d="M${-hw - 4} ${-h + 2}L0 ${-h - 26}L${hw + 4} ${-h + 2}Z" fill="#8c4a38" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/><path d="M${-hw} ${-h}L-2 ${-h - 22}" stroke="#fff" stroke-width="2.4" opacity=".3" stroke-linecap="round"/>`;
    } else if (roof === 'mansard') {
        top = `<path d="M${-hw - 3} ${-h + 2}L${-hw + 6} ${-h - 16}H${hw - 6}L${hw + 3} ${-h + 2}Z" fill="#5a6070" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/><rect x="-6" y="${-h - 13}" width="12" height="10" fill="#cfe9f7" stroke="${OUT}" stroke-width="1.6"/>`;
    }
    return (
        `<ellipse cx="8" cy="3" rx="${hw + 8}" ry="6" fill="${SHADOW}"/>` +
        `<rect x="${-hw}" y="${-h}" width="${w}" height="${h}" fill="currentColor" stroke="${OUT}" stroke-width="2.8"/>` +
        `<rect x="${hw - 8}" y="${-h}" width="8" height="${h}" fill="#000" opacity=".1"/><rect x="${-hw}" y="${-h}" width="7" height="${h}" fill="#fff" opacity=".22"/>` +
        `<rect x="${-hw}" y="${-h}" width="${w}" height="${h - 20}" fill="url(#${pid})"/>` +
        `<rect x="${-hw}" y="-20" width="${w}" height="20" fill="#fff" opacity=".25"/><rect x="${-hw + 6}" y="-18" width="${w * 0.36}" height="16" fill="#cfe9f7" stroke="${OUT}" stroke-width="1.6"/><rect x="${hw - 20}" y="-20" width="12" height="20" fill="#7a5a44" stroke="${OUT}" stroke-width="1.6"/>` +
        `<path d="M${-hw} -20H${hw}" stroke="${OUT}" stroke-width="1.6" opacity=".6"/>` +
        top
    );
}

/* ======================================================================
 * DE VOLKSTUIN
 * ====================================================================== */

function volkstuin() {
    const id = 'vt';
    const nodes = makeNodes([195, 115, 215, 290, 205, 110, 190, 285, 200, 105, 200]);
    const C = makeCtx(id, nodes, { start: [200, 1560], end: [200, 24] });
    const G = {
        leaf: '#78c04c',
        leafD: '#4f9a3b',
        leafL: '#9cdc66',
        trunk: '#9a6a43',
        trunkD: '#6f4629'
    };
    const A = { ...G, fruit: '#e8483a' };

    // grond
    C.add('ground', `<rect width="390" height="1500" fill="#8fd05b"/>`);
    groundBlobs(C, '#a9de74', 14, 11, { op: 0.4, y0: 80 });
    groundBlobs(C, '#74b845', 10, 23, { op: 0.28, y0: 80 });
    nodes.forEach((n, i) => {
        if (i % 2 === 0) {
            C.clearing(n.x + (n.x > 195 ? -30 : 30), n.y, 105, 60, '#b4e47f', 0.55);
        }
    });

    // hemel + heg bovenin
    C.add(
        'ground',
        `<rect width="390" height="92" fill="#cdeaf7"/>` +
            `<ellipse cx="70" cy="30" rx="44" ry="11" fill="#fff" opacity=".85"/><ellipse cx="96" cy="22" rx="30" ry="10" fill="#fff" opacity=".85"/><ellipse cx="300" cy="44" rx="40" ry="10" fill="#fff" opacity=".8"/>` +
            `<path d="M0 76C20 60 40 70 62 62C86 54 104 68 130 62C156 56 176 68 204 62C230 56 250 68 278 60C304 54 326 68 352 62C368 58 380 62 390 66V120H0Z" fill="#4f9a3b" stroke="${OUT}" stroke-width="3"/>` +
            `<path d="M0 90C30 82 60 96 96 88C130 82 160 96 200 90C236 84 270 96 310 88C340 84 370 92 390 88V120H0Z" fill="#5eaa44"/>`
    );

    // symbolen
    C.sym('tree', symTree(`${id}-tc1`, G), 24, [-85, 46]);
    C.sym('apple', symTree(`${id}-tc2`, A), 24, [-85, 46]);
    C.sym('bush', symBush({ ...G, clip: `${id}-bc1` }), 26);
    C.sym('bushB', symBush({ ...G, clip: `${id}-bc2` }, 'currentColor'), 26);
    C.alias('bushRed', 'bushB', '#e84a4a');
    C.alias('bushBlue', 'bushB', '#4a5fc4');
    C.sym('flower', symFlowers('currentColor', '#f08a2b'), 14);
    C.alias('flowY', 'flower', '#ffd84a');
    C.alias('flowP', 'flower', '#f58fc1');
    C.alias('flowW', 'flower', '#ffffff');
    C.alias('flowB', 'flower', '#8fb4f5');
    C.sym('mush', symMushroom(), 10);
    C.sym(
        'rock',
        symRock(
            { base: '#b9bcc4', dark: '#9296a0', light: '#d9dce2', moss: '#79b45a' },
            `${id}-rk1`
        ),
        24
    );
    C.sym('tuft', symTuft(), 8);
    C.sym('tuft2', symTuft('#4f9a3b', '#7dc356'), 8);

    // moestuinbak: basis + planten (los gedefinieerd, de bakken verwijzen ernaar)
    C.def(
        `<g id="${id}-bed"><ellipse cx="8" cy="12" rx="70" ry="9" fill="${SHADOW}"/>` +
            `<path d="M-60 -6L-62 -34Q-62 -38 -58 -38L58 -38Q62 -38 62 -34L60 -6Z" fill="#7b5236" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/>` +
            `<path d="M-56 -30l8 3M-30 -26l6 2M-8 -31l7 2M20 -27l6 3M40 -31l7 2M-40 -14l7 2M-12 -17l6 2M16 -13l7 3M42 -16l6 2" stroke="#5a3a24" stroke-width="2" stroke-linecap="round"/>` +
            `<rect x="-64" y="-8" width="128" height="20" rx="3" fill="#e1a96f" stroke="${OUT}" stroke-width="2.6"/>` +
            `<path d="M-64 2H64" stroke="${OUT}" stroke-width="1.6" opacity=".6"/><path d="M-50 -5V0M-20 -4V1M26 -5V0M52 -4V1M-40 6V10M0 5V9M38 6V10" stroke="${OUT}" stroke-width="1.2" opacity=".35"/>` +
            `<rect x="-66" y="-12" width="12" height="26" rx="2" fill="#f0bd85" stroke="${OUT}" stroke-width="2.4"/><rect x="54" y="-12" width="12" height="26" rx="2" fill="#f0bd85" stroke="${OUT}" stroke-width="2.4"/></g>`
    );
    C.def(
        `<g id="${id}-tom"><path d="M0 0V-46" stroke="#a8743f" stroke-width="3.6" stroke-linecap="round"/>` +
            `<g fill="${OUT}" stroke="${OUT}" stroke-width="4"><circle cx="-8" cy="-26" r="13"/><circle cx="8" cy="-34" r="13"/><circle cx="-6" cy="-44" r="11"/></g><g fill="#58a83e"><circle cx="-8" cy="-26" r="13"/><circle cx="8" cy="-34" r="13"/><circle cx="-6" cy="-44" r="11"/></g><g fill="#7bc851"><circle cx="-10" cy="-29" r="7"/><circle cx="5" cy="-38" r="7"/></g>` +
            [
                [-14, -22],
                [10, -26],
                [-2, -36],
                [14, -42]
            ]
                .map(
                    ([a, b]) =>
                        `<circle cx="${a}" cy="${b}" r="5.4" fill="#e8453a" stroke="${OUT}" stroke-width="1.6"/><circle cx="${a - 1.6}" cy="${b - 1.8}" r="1.5" fill="#fff" opacity=".75"/>`
                )
                .join('') +
            `</g>`
    );
    C.def(
        `<g id="${id}-cab"><ellipse cx="0" cy="2" rx="16" ry="5" fill="#5d7d3b" opacity=".6"/><path d="M-17 0C-20 -10 -12 -14 -8 -9C-6 -17 6 -17 8 -9C12 -14 20 -10 17 0C10 5 -10 5 -17 0Z" fill="#9fcf8e" stroke="${OUT}" stroke-width="2" stroke-linejoin="round"/>` +
            `<circle cx="0" cy="-10" r="11" fill="#a9dd9a" stroke="${OUT}" stroke-width="2"/><circle cx="-3" cy="-13" r="5.5" fill="#c9eebc"/><path d="M-8 -8C-4 -4 4 -4 8 -8M0 -20V-12" stroke="#6aa468" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`
    );
    const SUNH = 78;
    C.sym(
        'sunflower',
        `<path d="M0 0V${-SUNH}" stroke="${OUT}" stroke-width="7" stroke-linecap="round"/><path d="M0 0V${-SUNH}" stroke="#5fae42" stroke-width="3.8" stroke-linecap="round"/>` +
            `<path d="M0 -27Q-18 -31 -22 -16Q-8 -11 0 -23Z M0 -43Q16 -47 20 -33Q8 -28 0 -39Z" fill="#5fae42" stroke="${OUT}" stroke-width="1.8" stroke-linejoin="round"/>` +
            `<g transform="translate(0 ${-SUNH})">` +
            Array.from(
                { length: 12 },
                (_, i) =>
                    `<ellipse cx="0" cy="-16" rx="5.4" ry="9" fill="${i % 2 ? '#ffd23a' : '#ffbf24'}" stroke="${OUT}" stroke-width="1.5" transform="rotate(${i * 30})"/>`
            ).join('') +
            `<circle r="11" fill="#7a4a24" stroke="${OUT}" stroke-width="2"/><circle r="6.5" fill="#5a3418"/><circle cx="-3" cy="-3" r="2" fill="#a8743f"/></g>`,
        14,
        [-70, 22]
    );
    C.def(
        `<g id="${id}-car"><path d="M-3 0C-2 -4 0 -5 0 -5C0 -5 2 -4 3 0Z" fill="#f08a2b" stroke="${OUT}" stroke-width="1.4"/>` +
            `<path d="M0 -4C-6 -14 -10 -22 -8 -28M0 -4C0 -14 0 -22 0 -32M0 -4C6 -14 10 -22 8 -28" stroke="${OUT}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M0 -4C-6 -14 -10 -22 -8 -28M0 -4C0 -14 0 -22 0 -32M0 -4C6 -14 10 -22 8 -28" stroke="#6cba45" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>`
    );
    C.def(
        `<g id="${id}-str"><g fill="${OUT}" stroke="${OUT}" stroke-width="3.6"><circle cx="-8" cy="-6" r="9"/><circle cx="7" cy="-8" r="9"/></g><g fill="#6cba45"><circle cx="-8" cy="-6" r="9"/><circle cx="7" cy="-8" r="9"/></g>` +
            `<path d="M-6 0C-8 4 -4 7 -2 5C0 8 4 6 2 2Z" fill="#e8384a" stroke="${OUT}" stroke-width="1.4"/><path d="M6 -1C4 3 8 6 10 4C12 6 15 3 12 0Z" fill="#e8384a" stroke="${OUT}" stroke-width="1.4"/><circle cx="0" cy="-14" r="2.6" fill="#fff" stroke="${OUT}" stroke-width="1"/></g>`
    );
    const u = (n, x, y, sc = 1) =>
        `<use href="#${id}-${n}" transform="translate(${x} ${y}) scale(${sc})"/>`;
    const bedTop = [-30, 62];
    C.sym(
        'bedTomato',
        u('bed', 0, 0) + u('tom', -38, -20) + u('tom', 0, -20) + u('tom', 38, -20),
        62,
        bedTop
    );
    C.sym(
        'bedCabbage',
        u('bed', 0, 0) +
            u('cab', -40, -22) +
            u('cab', 0, -22) +
            u('cab', 40, -22) +
            u('cab', -20, -8, 1.05) +
            u('cab', 20, -8, 1.05),
        62,
        bedTop
    );
    C.sym(
        'bedSun',
        u('bed', 0, 0) +
            u('sunflower', -40, -22, 0.72) +
            u('sunflower', 2, -24, 0.95) +
            u('sunflower', 42, -22, 0.68),
        62,
        [-60, 62]
    );
    C.sym(
        'bedCarrot',
        u('bed', 0, 0) + [-50, -34, -18, -2, 14, 30, 46].map(x => u('car', x, -20)).join(''),
        62,
        bedTop
    );
    C.sym(
        'bedStraw',
        u('bed', 0, 0) + [-42, -14, 14, 42].map(x => u('str', x, -20)).join(''),
        62,
        bedTop
    );

    // schuur
    const shed =
        `<ellipse cx="10" cy="3" rx="64" ry="10" fill="${SHADOW}"/>` +
        `<rect x="-46" y="-56" width="92" height="58" fill="#6db98b" stroke="${OUT}" stroke-width="3"/>` +
        Array.from(
            { length: 8 },
            (_, i) => `<path d="M${-46 + (i + 1) * 10.2} -56V2" stroke="#4d9a6c" stroke-width="2"/>`
        ).join('') +
        `<rect x="-46" y="-56" width="14" height="58" fill="#87cca4" opacity=".55"/><rect x="-46" y="-8" width="92" height="10" fill="#4d9a6c" opacity=".5"/>` +
        `<path d="M-58 -50L-38 -88L38 -88L58 -50Z" fill="#a0673e" stroke="${OUT}" stroke-width="3" stroke-linejoin="round"/>` +
        `<path d="M-52 -54L-36 -84L36 -84L52 -54" fill="none" stroke="#c88a58" stroke-width="3" stroke-linecap="round" opacity=".8"/>` +
        Array.from(
            { length: 4 },
            (_, i) =>
                `<path d="M${-52 + i * 4} ${-56 + i * 10}H${52 - i * 4}" stroke="${OUT}" stroke-width="1.6" opacity=".45"/>`
        ).join('') +
        `<path d="M-58 -50H58V-46H-58Z" fill="#7d4c2c" stroke="${OUT}" stroke-width="2.4"/>` +
        `<rect x="-34" y="-36" width="24" height="38" rx="2" fill="#e9bc7e" stroke="${OUT}" stroke-width="2.6"/><path d="M-22 -36V2M-34 -18H-10" stroke="${OUT}" stroke-width="1.4" opacity=".5"/><circle cx="-14" cy="-16" r="2.6" fill="#7a4a24" stroke="${OUT}" stroke-width="1"/>` +
        `<rect x="10" y="-40" width="26" height="22" fill="#cfe9f7" stroke="${OUT}" stroke-width="2.6"/><path d="M23 -40V-18M10 -29H36" stroke="${OUT}" stroke-width="2"/><path d="M13 -37l8 0M13 -34l5 0" stroke="#fff" stroke-width="2" stroke-linecap="round"/>` +
        `<rect x="6" y="-17" width="34" height="9" rx="1.5" fill="#c58a52" stroke="${OUT}" stroke-width="2.2"/>` +
        `<circle cx="12" cy="-20" r="4" fill="#f58fc1" stroke="${OUT}" stroke-width="1.2"/><circle cx="21" cy="-22" r="4" fill="#ffd84a" stroke="${OUT}" stroke-width="1.2"/><circle cx="30" cy="-20" r="4" fill="#f58fc1" stroke="${OUT}" stroke-width="1.2"/><path d="M8 -17q4 -4 8 0M24 -17q4 -4 8 0" stroke="#4f9a3b" stroke-width="2" fill="none"/>`;
    C.sym('shed', shed, 56, [-50, 54]);

    // gieter
    C.sym(
        'can',
        `<ellipse cx="4" cy="2" rx="22" ry="5" fill="${SHADOW}"/>` +
            `<path d="M-14 -2L-12 -26Q-12 -30 -8 -30L10 -30Q14 -30 14 -26L16 -2Q16 2 12 2L-10 2Q-14 2 -14 -2Z" fill="#6fb0e0" stroke="${OUT}" stroke-width="2.4" stroke-linejoin="round"/>` +
            `<path d="M-9 -26L-10 -5" stroke="#a9d7f2" stroke-width="3" stroke-linecap="round"/>` +
            `<path d="M14 -10L32 -30" stroke="${OUT}" stroke-width="7" stroke-linecap="round"/><path d="M14 -10L32 -30" stroke="#6fb0e0" stroke-width="3.6" stroke-linecap="round"/><path d="M28 -37L38 -27L30 -23Z" fill="#6fb0e0" stroke="${OUT}" stroke-width="2" stroke-linejoin="round"/>` +
            `<path d="M-14 -24C-30 -24 -30 -6 -14 -8" fill="none" stroke="${OUT}" stroke-width="6" stroke-linecap="round"/><path d="M-14 -24C-30 -24 -30 -6 -14 -8" fill="none" stroke="#4d93c8" stroke-width="2.6" stroke-linecap="round"/>` +
            `<path d="M-6 -31h14" stroke="#4d93c8" stroke-width="2"/>`,
        20
    );

    // kruiwagen
    C.sym(
        'barrow',
        `<ellipse cx="6" cy="4" rx="36" ry="6" fill="${SHADOW}"/>` +
            `<path d="M-6 -4L-28 -30M-6 -4L-22 -2" stroke="${OUT}" stroke-width="7" stroke-linecap="round"/><path d="M-6 -4L-28 -30" stroke="#c58a52" stroke-width="3.6" stroke-linecap="round"/>` +
            `<path d="M-14 -34Q-14 -38 -10 -38L34 -38Q40 -38 38 -32L30 -12Q28 -8 24 -8L-4 -8Q-8 -8 -10 -12Z" fill="#e5503f" stroke="${OUT}" stroke-width="2.8" stroke-linejoin="round"/>` +
            `<path d="M-8 -34L-2 -14" stroke="#f58a76" stroke-width="3" stroke-linecap="round"/><path d="M-14 -34C-8 -46 6 -50 14 -44C20 -52 32 -48 36 -38Z" fill="#7b5236" stroke="${OUT}" stroke-width="2.2" stroke-linejoin="round"/>` +
            `<path d="M22 -44V-60M22 -52q-8 -4 -10 -12M22 -50q8 -4 10 -12" stroke="${OUT}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M22 -44V-60M22 -52q-8 -4 -10 -12M22 -50q8 -4 10 -12" stroke="#6cba45" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
            `<circle cx="34" cy="-2" r="10" fill="#4a4550" stroke="${OUT}" stroke-width="2.6"/><circle cx="34" cy="-2" r="3.6" fill="#b9b3c2"/>` +
            `<path d="M26 -10L34 -2" stroke="${OUT}" stroke-width="2.4"/><path d="M10 -8L16 4M24 -8L30 4" stroke="${OUT}" stroke-width="3" stroke-linecap="round"/>`,
        32
    );

    // slak op een blaadje
    C.sym(
        'snail',
        `<ellipse cx="2" cy="3" rx="22" ry="5" fill="${SHADOW}"/>` +
            `<path d="M-22 2C-12 -8 14 -8 24 0C14 6 -12 6 -22 2Z" fill="#6cba45" stroke="${OUT}" stroke-width="2" stroke-linejoin="round"/>` +
            `<path d="M-14 -3C-12 -6 -8 -5 -8 -1L10 -1L10 -3C10 -6 14 -6 16 -3L16 1" fill="none"/>` +
            `<path d="M-16 -4C-18 -12 -14 -16 -9 -14L-9 -4Z" fill="#d9c9a0" stroke="${OUT}" stroke-width="1.8" stroke-linejoin="round"/><path d="M-16 -4H12C14 -4 15 -2 13 -1L-14 -1Z" fill="#d9c9a0" stroke="${OUT}" stroke-width="1.8" stroke-linejoin="round"/>` +
            `<path d="M-14 -13L-17 -22M-10 -13L-8 -22" stroke="${OUT}" stroke-width="1.6" stroke-linecap="round"/><circle cx="-17" cy="-23" r="2" fill="#d9c9a0" stroke="${OUT}" stroke-width="1.2"/><circle cx="-8" cy="-23" r="2" fill="#d9c9a0" stroke="${OUT}" stroke-width="1.2"/>` +
            `<circle cx="5" cy="-12" r="11" fill="#eaa457" stroke="${OUT}" stroke-width="2.2"/><path d="M5 -12m0 0a2.5 2.5 0 1 1 4 -2a6 6 0 1 1 -8 2" fill="none" stroke="#a8631f" stroke-width="2" stroke-linecap="round"/><path d="M-2 -18q4 -4 9 -3" stroke="#f7c98a" stroke-width="2" fill="none" stroke-linecap="round"/>`,
        20
    );

    // vogelhuisje
    C.sym(
        'birdhouse',
        `<ellipse cx="6" cy="2" rx="14" ry="4" fill="${SHADOW}"/>` +
            `<rect x="-3" y="-60" width="6" height="62" fill="#a8743f" stroke="${OUT}" stroke-width="2.2"/>` +
            `<rect x="-17" y="-96" width="34" height="34" fill="#f2b84e" stroke="${OUT}" stroke-width="2.6"/><rect x="-17" y="-96" width="9" height="34" fill="#f8cd7a" opacity=".7"/>` +
            `<circle cx="0" cy="-81" r="6.5" fill="#5b3a29" stroke="${OUT}" stroke-width="1.8"/>` +
            `<path d="M-24 -94L0 -114L24 -94Z" fill="#d94d3d" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/><path d="M-18 -97L0 -110" stroke="#f58a76" stroke-width="2.4" stroke-linecap="round"/>` +
            `<path d="M-6 -62H6" stroke="${OUT}" stroke-width="3" stroke-linecap="round"/><path d="M-12 -62h24" stroke="#c58a52" stroke-width="3"/>` +
            `<g transform="translate(14 -118)"><ellipse cx="0" cy="0" rx="8" ry="6.4" fill="#6ca3e0" stroke="${OUT}" stroke-width="1.8"/><circle cx="-6" cy="-5" r="5" fill="#ffe46a" stroke="${OUT}" stroke-width="1.6"/><path d="M-10 -6l-4 1l4 2Z" fill="#f08a2b" stroke="${OUT}" stroke-width="1"/><circle cx="-7" cy="-6" r="1" fill="#222"/><path d="M5 2L12 5L5 5Z" fill="#4f7fc0" stroke="${OUT}" stroke-width="1.2"/></g>`,
        14,
        [-95, 22]
    );

    // hekje
    const picket = x =>
        `<path d="M${x - 4} 0V-26L${x} -31L${x + 4} -26V0Z" fill="#fbf1dc" stroke="${OUT}" stroke-width="1.8" stroke-linejoin="round"/>`;
    C.sym(
        'fence',
        `<ellipse cx="4" cy="2" rx="26" ry="3.5" fill="${SHADOW}"/><rect x="-22" y="-20" width="44" height="4" fill="#e8d3a8" stroke="${OUT}" stroke-width="1.6"/><rect x="-22" y="-9" width="44" height="4" fill="#e8d3a8" stroke="${OUT}" stroke-width="1.6"/>` +
            [-17, -6, 6, 17].map(picket).join(''),
        18
    );
    C.sym(
        'post',
        `<ellipse cx="4" cy="2" rx="10" ry="3" fill="${SHADOW}"/><path d="M-6 0V-38L0 -45L6 -38V0Z" fill="#e8c88f" stroke="${OUT}" stroke-width="2.2" stroke-linejoin="round"/><path d="M-2 -2V-36" stroke="#f6e2b6" stroke-width="2" stroke-linecap="round"/>`,
        8
    );

    // regenton
    C.sym(
        'barrel',
        `<ellipse cx="8" cy="3" rx="30" ry="7" fill="${SHADOW}"/><path d="M-24 -4V-52Q0 -60 24 -52V-4Q0 6 -24 -4Z" fill="#4f8fcf" stroke="${OUT}" stroke-width="2.8" stroke-linejoin="round"/>` +
            `<path d="M-24 -48Q0 -40 24 -48M-24 -12Q0 -4 24 -12" fill="none" stroke="#2f5f9a" stroke-width="3.4"/><path d="M-16 -50V-8" stroke="#8cc0ee" stroke-width="3.6" stroke-linecap="round"/><ellipse cx="0" cy="-54" rx="24" ry="6" fill="#2a6fa8" stroke="${OUT}" stroke-width="2.4"/><ellipse cx="0" cy="-54" rx="19" ry="3.6" fill="#6fc2ee"/><rect x="20" y="-22" width="9" height="5" fill="#ccc" stroke="${OUT}" stroke-width="1.6"/>`,
        26
    );

    // pompoenen
    const pump = (x, y, s, c) =>
        `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="4" rx="20" ry="5" fill="${SHADOW}"/><path d="M0 -26C-18 -30 -26 -14 -22 -4C-18 4 -6 6 0 4C6 6 18 4 22 -4C26 -14 18 -30 0 -26Z" fill="${c}" stroke="${OUT}" stroke-width="2.4" stroke-linejoin="round"/><path d="M0 -26C-8 -20 -8 -2 0 4C8 -2 8 -20 0 -26Z" fill="#f2992a" stroke="${OUT}" stroke-width="1.8"/><path d="M-12 -20C-18 -12 -16 -4 -12 0" stroke="#f9c06a" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M0 -26V-32" stroke="#5a8a2a" stroke-width="3.6" stroke-linecap="round"/><path d="M4 -30q10 -8 14 -2" stroke="#5fae42" stroke-width="2.2" fill="none"/></g>`;
    C.sym(
        'pumpkins',
        pump(-18, 0, 0.9, '#f5a02e') + pump(16, 3, 1.1, '#f08a2b') + pump(2, -14, 0.75, '#f7b248'),
        30
    );

    // rozenboog
    const rose = (x, y, c) =>
        `<circle cx="${x}" cy="${y}" r="5.4" fill="${c}" stroke="${OUT}" stroke-width="1.6"/><path d="M${x - 2} ${y}q2 -3 4 0" stroke="${OUT}" stroke-width="1.2" fill="none"/>`;
    C.sym(
        'arch',
        `<ellipse cx="6" cy="4" rx="74" ry="9" fill="${SHADOW}"/>` +
            `<path d="M-60 0V-86Q0 -150 60 -86V0" fill="none" stroke="${OUT}" stroke-width="12" stroke-linecap="round"/><path d="M-60 0V-86Q0 -150 60 -86V0" fill="none" stroke="#e6e0d2" stroke-width="7" stroke-linecap="round"/>` +
            `<g fill="#58a83e" stroke="${OUT}" stroke-width="1.6">` +
            Array.from({ length: 16 }, (_, i) => {
                const t = i / 15;
                const x = -60 + 120 * t;
                const y = -86 - Math.sin(t * Math.PI) * 52 + (t < 0.5 ? (0.5 - t) * 0 : 0);
                return `<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="8" ry="5" transform="rotate(${r1((t - 0.5) * 80)} ${r1(x)} ${r1(y)})"/>`;
            }).join('') +
            `</g>` +
            [
                [-58, -70, '#f06a8e'],
                [-56, -40, '#ff9ab5'],
                [-34, -118, '#f06a8e'],
                [-8, -134, '#ffd0dc'],
                [20, -130, '#f06a8e'],
                [42, -108, '#ff9ab5'],
                [58, -62, '#f06a8e'],
                [57, -32, '#ffd0dc'],
                [-46, -96, '#ffd0dc'],
                [48, -90, '#ffd0dc']
            ]
                .map(([x, y, c]) => rose(x, y, c))
                .join(''),
        60
    );

    C.sym(
        'butterfly',
        `<g transform="rotate(-18)"><path d="M0 -1C-4 -12 -14 -12 -13 -4C-13 0 -6 2 0 0Z M0 -1C4 -12 14 -12 13 -4C13 0 6 2 0 0Z" fill="#fbb04a" stroke="${OUT}" stroke-width="1.4" stroke-linejoin="round"/><path d="M0 0C-5 2 -10 7 -7 9C-4 10 -1 5 0 1Z M0 0C5 2 10 7 7 9C4 10 1 5 0 1Z" fill="#f58fc1" stroke="${OUT}" stroke-width="1.3" stroke-linejoin="round"/><circle cx="-8" cy="-6" r="2" fill="#fff" opacity=".85"/><circle cx="8" cy="-6" r="2" fill="#fff" opacity=".85"/><path d="M0 -3V6M0 -3l-3 -5M0 -3l3 -5" stroke="${OUT}" stroke-width="1.5" stroke-linecap="round"/></g>`,
        6
    );

    C.drawPath({ edge: '#c79a5d', sand: '#f3dca4', light: '#fbefc9' });

    // beekje met plankenbrug
    const sy = 1068;
    const sx = C.pathX(sy);
    const streamD = `M-20 ${sy - 24}C60 ${sy - 40} ${sx - 70} ${sy + 20} ${sx} ${sy}C${sx + 70} ${sy - 20} 340 ${sy + 20} 410 ${sy - 6}`;
    C.add(
        'water',
        `<path d="${streamD}" fill="none" stroke="rgba(40,70,20,.2)" stroke-width="58" transform="translate(2 5)"/>` +
            `<path d="${streamD}" fill="none" stroke="#3f86b8" stroke-width="54" stroke-linecap="round"/>` +
            `<path d="${streamD}" fill="none" stroke="#6bbbe6" stroke-width="46"/>` +
            `<path d="${streamD}" fill="none" stroke="#9fd8f2" stroke-width="22" opacity=".55"/>` +
            `<path d="${streamD}" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="18 40" stroke-linecap="round" transform="translate(0 -9)" opacity=".85"/>` +
            `<path d="${streamD}" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="12 52" stroke-dashoffset="20" stroke-linecap="round" transform="translate(0 9)" opacity=".7"/>`
    );
    const ang = C.angleAt(sy);
    const plank = y =>
        `<rect x="-45" y="${y}" width="90" height="11" rx="2" fill="#a56a3d" stroke="${OUT}" stroke-width="2.2"/><path d="M-40 ${y + 3}H20" stroke="#c98d5a" stroke-width="1.8" stroke-linecap="round"/>`;
    C.add(
        'bridge',
        `<g transform="translate(${sx} ${sy}) rotate(${r1(ang)})"><rect x="-47" y="-46" width="94" height="96" rx="4" fill="rgba(60,40,10,.18)" transform="translate(3 5)"/>` +
            `<rect x="-47" y="-50" width="8" height="100" fill="#7d4c2c" stroke="${OUT}" stroke-width="2.4"/><rect x="39" y="-50" width="8" height="100" fill="#7d4c2c" stroke="${OUT}" stroke-width="2.4"/>` +
            Array.from({ length: 8 }, (_, i) => plank(-46 + i * 12)).join('') +
            `<rect x="-52" y="-54" width="10" height="14" rx="2" fill="#8d5a3c" stroke="${OUT}" stroke-width="2.4"/><rect x="42" y="-54" width="10" height="14" rx="2" fill="#8d5a3c" stroke="${OUT}" stroke-width="2.4"/><rect x="-52" y="40" width="10" height="14" rx="2" fill="#8d5a3c" stroke="${OUT}" stroke-width="2.4"/><rect x="42" y="40" width="10" height="14" rx="2" fill="#8d5a3c" stroke="${OUT}" stroke-width="2.4"/></g>`
    );

    /* --- plaatsing --- */
    const L = (y, g) => C.left(y, g);
    const R = (y, g) => C.right(y, g);

    // ingang: hekje met opengeslagen poort en brievenbus
    const fy = 1470;
    for (let x = 22; x < L(fy, 36); x += 41) {
        C.use('fence', x, fy, 1);
    }
    for (let x = R(fy, 36) + 20; x < 380; x += 41) {
        C.use('fence', x, fy, 1);
    }
    C.use('post', L(fy, 12), fy + 3, 1.15);
    C.use('post', R(fy, 12), fy + 3, 1.15);
    C.use('bushRed', 40, 1425, 0.9);
    C.use('bushBlue', 352, 1428, 0.85);
    C.use('flowY', R(1440, 30), 1442, 1);
    C.use('flowP', L(1440, 32), 1440, 1);

    // onder
    C.use('apple', 30, 1405, 1.1);
    C.use('bedTomato', 292, 1345, 1);
    C.use('flowW', R(1385, 30), 1392, 0.9);
    C.use('bedCabbage', 285, 1225, 1);
    C.use('bushRed', 40, 1300, 0.8);
    C.use('flowB', 62, 1262, 0.9);

    // rond de beek
    C.use('bedSun', 108, 1025, 1);
    C.use('bushRed', 34, 1150, 0.9);
    C.use('rock', 338, 1125, 0.9);
    C.use('mush', R(1125, 26), 1140, 1);
    C.use('mush', R(1125, 38), 1148, 0.8);
    C.use('flowY', 348, 1022, 0.9);

    // schuur-hoek
    C.use('shed', 62, 905, 1.05, { force: true });
    C.use('barrel', 30, 1222, 0.9);
    C.use('can', 24, 940, 1);
    C.use('barrow', 322, 905, 1);
    C.use('tree', 362, 835, 0.95);
    C.use('flowP', R(850, 48), 858, 0.9);
    C.use('bedCarrot', 262, 775, 1);

    // slak, vogelhuisje, bessen
    C.use('snail', R(700, 36), 706, 1.1);
    C.use('birdhouse', 34, 690, 1.05);
    C.use('bedStraw', 92, 575, 0.95);
    C.use('flowY', R(640, 30), 648, 1);
    C.use('apple', 345, 690, 1.1);
    C.use('bushRed', 348, 566, 0.8);
    C.use('bushBlue', 62, 505, 0.95);
    C.use('mush', L(520, 44), 528, 0.9);

    // bovenin: pompoenen, zonnebloemen, boog
    C.use('bedSun', 88, 445, 0.95);
    C.use('pumpkins', 62, 335, 1);
    C.use('tree', 346, 445, 1.05);
    C.use('bedCabbage', 262, 262, 0.95);
    C.use('sunflower', 30, 268, 1);
    C.use('sunflower', 362, 244, 1);
    C.use('flowW', R(335, 50), 338, 0.9);
    C.use('flowP', L(420, 32), 424, 0.9);
    C.use('tree', 40, 150, 1);
    C.use('tree', 352, 128, 1);
    C.use('arch', C.pathX(172), 172, 1, { force: true });

    // strooi: bloemen, rotsen, paddenstoelen, grasstukjes
    C.scatter(['flowY', 'flowP', 'flowW', 'flowB'], 22, { seed: 3, y0: 130, s: [0.75, 1] });
    C.scatter(['rock'], 5, { seed: 5, y0: 200, s: [0.55, 0.8] });
    C.scatter(['mush'], 6, { seed: 9, y0: 250, s: [0.7, 1] });
    C.scatter(['tuft', 'tuft2'], 70, { seed: 13, y0: 100, s: [0.8, 1.2], spread: 0.35, gap: 6 });
    [
        [250, 1300],
        [150, 1050],
        [40, 760],
        [345, 700],
        [250, 430],
        [45, 480]
    ].forEach(([x, y], i) =>
        C.use('butterfly', x, y - 40, 1 + (i % 2) * 0.2, { force: true, dy: 80 })
    );

    C.require(
        'shed',
        'can',
        'barrow',
        'snail',
        'birdhouse',
        'fence',
        'bedTomato',
        'bedCabbage',
        'bedSun',
        'sunflower',
        'bushRed',
        'arch'
    );
    C.warn = C.warnings;
    return {
        name: 'De volkstuin',
        sky: '#cdeaf7',
        svg: C.out(),
        nodes,
        warnings: C.warnings,
        notes: C.notes
    };
}

/* ======================================================================
 * DE CAMPER
 * ====================================================================== */

function camper() {
    const id = 'cp';
    const nodes = makeNodes([190, 260, 150, 95, 190, 280, 210, 110, 170, 260, 200]);
    const C = makeCtx(id, nodes, { start: [190, 1560], end: [200, 30] });
    const PINE = { a: '#5cba85', b: '#2f8f60', c: '#1f6e4a', trunk: '#8a5a38' };
    const PINE2 = { a: '#6bc38a', b: '#3c9a62', c: '#2a7a4e', trunk: '#8a5a38' };
    const BIRCH = {
        leaf: '#a6d55e',
        leafD: '#6fae3f',
        leafL: '#c8ec84',
        trunk: '#f3f0e6',
        trunkD: '#cfc8b2'
    };

    // grond: bosbodem + zand
    C.add('ground', `<rect width="390" height="1500" fill="#85bb5a"/>`);
    groundBlobs(C, '#9ccc6c', 14, 31, { op: 0.4, y0: 120 });
    groundBlobs(C, '#6ea64a', 12, 37, { op: 0.3, y0: 120 });
    // zandduinen links en rechts
    const dune = (x, y, w, h) =>
        `<path d="M${x - w} ${y}C${x - w * 0.6} ${y - h} ${x - w * 0.2} ${y - h * 1.1} ${x} ${y - h}C${x + w * 0.4} ${y - h * 0.9} ${x + w * 0.7} ${y - h * 0.3} ${x + w} ${y}Z" fill="#f2d99f" stroke="#c9a15f" stroke-width="2.4" stroke-linejoin="round"/>` +
        `<path d="M${x - w * 0.8} ${y - 4}C${x - w * 0.5} ${y - h * 0.9} ${x - w * 0.2} ${y - h * 1.0} ${x} ${y - h * 0.92}C${x - w * 0.2} ${y - h * 0.6} ${x - w * 0.5} ${y - h * 0.3} ${x - w * 0.8} ${y - 4}Z" fill="#fbebc2" opacity=".85"/>` +
        `<path d="M${x + w * 0.1} ${y - h * 0.8}C${x + w * 0.4} ${y - h * 0.7} ${x + w * 0.7} ${y - h * 0.25} ${x + w * 0.95} ${y - 3}L${x + w * 0.3} ${y - 2}Z" fill="#e3c283" opacity=".7"/>`;
    C.add(
        'ground',
        dune(40, 400, 90, 40) +
            dune(70, 372, 70, 30) +
            dune(350, 700, 100, 46) +
            dune(300, 676, 70, 28) +
            dune(52, 1060, 70, 34) +
            dune(350, 300, 70, 30)
    );
    nodes.forEach((n, i) => {
        if (i % 2 === 0) {
            C.clearing(n.x + (n.x > 195 ? -25 : 25), n.y, 100, 58, '#b0dc7c', 0.5);
        }
    });

    // zonsondergang bovenin
    C.add(
        'ground',
        `<defs><linearGradient id="${id}-sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4a77f"/><stop offset=".55" stop-color="#f9d29a"/><stop offset="1" stop-color="#fdeec0"/></linearGradient></defs>` +
            `<rect width="390" height="124" fill="url(#${id}-sk)"/><circle cx="296" cy="84" r="36" fill="#fff4c4" opacity=".55"/><circle cx="296" cy="84" r="22" fill="#fffbe0"/>` +
            `<ellipse cx="80" cy="34" rx="46" ry="9" fill="#fff" opacity=".6"/><ellipse cx="116" cy="26" rx="30" ry="8" fill="#fff" opacity=".6"/>` +
            `<path d="M0 118C40 88 90 100 130 94C180 86 220 108 270 98C320 88 360 100 390 92V160H0Z" fill="#a2b97a" stroke="${OUT}" stroke-width="2.6"/>` +
            Array.from(
                { length: 22 },
                (_, i) =>
                    `<path d="M${i * 19 - 4} 130l8 -22l8 22Z" fill="#4f8a62" stroke="${OUT}" stroke-width="1.6" stroke-linejoin="round"/>`
            ).join('') +
            `<rect y="128" width="390" height="30" fill="#6fa853"/>`
    );

    C.sym('pine', symPine(PINE), 22, [-72, 40]);
    C.sym('pine2', symPine(PINE2), 22, [-72, 40]);
    C.sym(
        'birch',
        symTree(`${id}-bt`, BIRCH, {
            cs: [
                [0, -80, 28],
                [-20, -64, 20],
                [20, -66, 21],
                [-8, -96, 19],
                [12, -94, 18]
            ]
        }),
        20,
        [-80, 36]
    );
    C.sym(
        'bushB',
        symBush(
            { leaf: '#5fae42', leafD: '#3f8a32', leafL: '#86cf5c', clip: `${id}-bc1` },
            'currentColor'
        ),
        26
    );
    C.alias('lingon', 'bushB', '#e03a4a');
    C.alias('blabar', 'bushB', '#4a5fc4');
    C.sym('flower', symFlowers('currentColor', '#ffd84a'), 14);
    C.alias('flowP', 'flower', '#c58ae8');
    C.alias('flowW', 'flower', '#ffffff');
    C.alias('flowY', 'flower', '#ffd84a');
    C.sym('mush', symMushroom(), 10);
    C.sym(
        'rock',
        symRock(
            { base: '#b7bcc6', dark: '#8f95a3', light: '#dde1ea', moss: '#6ea64a' },
            `${id}-rk`
        ),
        24
    );
    C.sym('tuft', symTuft('#5aa43f', '#7dc356'), 8);
    C.sym(
        'beachgrass',
        `<path d="M-10 1C-10 -12 -14 -20 -18 -26M-4 1C-4 -14 -4 -24 -3 -32M3 1C4 -12 7 -22 12 -28M10 1C10 -8 14 -14 20 -18" fill="none" stroke="${OUT}" stroke-width="4" stroke-linecap="round"/><path d="M-10 1C-10 -12 -14 -20 -18 -26M-4 1C-4 -14 -4 -24 -3 -32M3 1C4 -12 7 -22 12 -28M10 1C10 -8 14 -14 20 -18" fill="none" stroke="#c9d67a" stroke-width="2" stroke-linecap="round"/>`,
        12
    );
    C.sym(
        'chanterelle',
        `<ellipse cx="2" cy="1" rx="10" ry="3" fill="${SHADOW}"/><path d="M-4 0C-5 -6 -3 -9 -1 -11L5 -11C6 -8 6 -4 4 0Z" fill="#f6c24a" stroke="${OUT}" stroke-width="1.6" stroke-linejoin="round"/><path d="M-10 -10C-10 -17 -3 -15 0 -16C4 -15 11 -16 11 -9C6 -6 -5 -6 -10 -10Z" fill="#f7a92f" stroke="${OUT}" stroke-width="1.8" stroke-linejoin="round"/>`,
        10
    );
    C.sym(
        'log',
        `<ellipse cx="6" cy="3" rx="30" ry="5" fill="${SHADOW}"/><path d="M-26 -6C-26 -16 -22 -18 -18 -18L18 -18C22 -18 26 -16 26 -6C26 0 22 2 18 2L-18 2C-22 2 -26 0 -26 -6Z" fill="#9b6a43" stroke="${OUT}" stroke-width="2.4" stroke-linejoin="round"/><ellipse cx="-23" cy="-8" rx="5" ry="9" fill="#e2b886" stroke="${OUT}" stroke-width="2"/><ellipse cx="-23" cy="-8" rx="2" ry="4.5" fill="none" stroke="#b98757" stroke-width="1.4"/><path d="M-12 -12H14M-8 -4H18" stroke="#7a4f2f" stroke-width="1.6" stroke-linecap="round"/>`,
        26
    );

    // camper (retro bus)
    C.sym(
        'van',
        `<ellipse cx="6" cy="4" rx="92" ry="10" fill="${SHADOW}"/>` +
            // dakdrager met surfplank
            `<path d="M-52 -98L50 -98" stroke="#555" stroke-width="3.4" stroke-linecap="round"/><path d="M-44 -98V-92M40 -98V-92" stroke="${OUT}" stroke-width="2.4"/>` +
            `<path d="M-56 -106C-30 -124 20 -124 56 -106C20 -110 -30 -110 -56 -106Z" fill="#ffd84a" stroke="${OUT}" stroke-width="2.2" stroke-linejoin="round"/><path d="M-30 -113C-4 -117 20 -116 40 -111" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>` +
            // koets onder
            `<path d="M-84 -14L-84 -50Q-84 -56 -78 -56L58 -56Q68 -56 74 -46L86 -28Q88 -24 88 -20L88 -12Q88 -8 84 -8L-80 -8Q-84 -8 -84 -14Z" fill="#4db3a5" stroke="${OUT}" stroke-width="3" stroke-linejoin="round"/>` +
            // boven cremekleur
            `<path d="M-84 -56L-84 -90Q-84 -96 -78 -96L38 -96Q46 -96 50 -90L70 -58Q71 -56 68 -56Z" fill="#f7ecd0" stroke="${OUT}" stroke-width="3" stroke-linejoin="round"/>` +
            `<path d="M-84 -57H68" stroke="#fff" stroke-width="4"/><path d="M-84 -57H68" stroke="${OUT}" stroke-width="1.2" opacity=".5"/>` +
            `<path d="M-80 -90H-70V-60H-80Z" fill="#fff" opacity=".35"/>` +
            // ramen
            `<rect x="-72" y="-88" width="26" height="24" rx="3" fill="#cfe9f7" stroke="${OUT}" stroke-width="2.4"/><rect x="-40" y="-88" width="26" height="24" rx="3" fill="#cfe9f7" stroke="${OUT}" stroke-width="2.4"/><rect x="-8" y="-88" width="26" height="24" rx="3" fill="#cfe9f7" stroke="${OUT}" stroke-width="2.4"/>` +
            `<path d="M-68 -84l8 0M-36 -84l8 0M-4 -84l8 0" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><path d="M-20 -50V-12" stroke="${OUT}" stroke-width="1.6" opacity=".4"/>` +
            `<path d="M26 -90L44 -90L60 -62L26 -62Z" fill="#cfe9f7" stroke="${OUT}" stroke-width="2.4" stroke-linejoin="round"/><path d="M32 -84l9 0" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>` +
            // deur, kop- en achterlicht, bumper
            `<rect x="-6" y="-50" width="34" height="34" rx="2" fill="none" stroke="${OUT}" stroke-width="1.8" opacity=".6"/><rect x="12" y="-36" width="8" height="3" rx="1.5" fill="#fff" stroke="${OUT}" stroke-width="1.2"/>` +
            `<circle cx="80" cy="-34" r="7.5" fill="#fff7c0" stroke="${OUT}" stroke-width="2.4"/><circle cx="80" cy="-34" r="3" fill="#ffd84a"/><rect x="-86" y="-30" width="5" height="8" rx="1.5" fill="#e04a3a" stroke="${OUT}" stroke-width="1.6"/>` +
            `<rect x="-88" y="-14" width="24" height="6" rx="3" fill="#d9dde6" stroke="${OUT}" stroke-width="2"/><rect x="66" y="-14" width="26" height="6" rx="3" fill="#d9dde6" stroke="${OUT}" stroke-width="2"/>` +
            // wielen
            `<path d="M-60 -8A20 20 0 0 1 -20 -8Z" fill="#2c2c36"/><path d="M26 -8A20 20 0 0 1 66 -8Z" fill="#2c2c36"/>` +
            `<circle cx="-40" cy="-6" r="15" fill="#3a3a46" stroke="${OUT}" stroke-width="3"/><circle cx="-40" cy="-6" r="7" fill="#d9dde6" stroke="${OUT}" stroke-width="1.8"/><circle cx="46" cy="-6" r="15" fill="#3a3a46" stroke="${OUT}" stroke-width="3"/><circle cx="46" cy="-6" r="7" fill="#d9dde6" stroke="${OUT}" stroke-width="1.8"/>` +
            // slingers
            `<path d="M-82 -100C-60 -90 -40 -90 -20 -100" fill="none" stroke="${OUT}" stroke-width="1.2" opacity=".6"/><circle cx="-66" cy="-92" r="2.6" fill="#ffd84a"/><circle cx="-46" cy="-92" r="2.6" fill="#f58fc1"/><circle cx="-30" cy="-95" r="2.6" fill="#ffd84a"/>`,
        88,
        [-60, 80]
    );

    // klapstoeltje + tafeltje
    C.sym(
        'chair',
        `<ellipse cx="3" cy="2" rx="18" ry="4" fill="${SHADOW}"/><path d="M-12 0L-6 -18M12 0L6 -18M-6 -18L-14 -38M6 -18L14 -38" stroke="${OUT}" stroke-width="6" stroke-linecap="round"/><path d="M-12 0L-6 -18M12 0L6 -18M-6 -18L-14 -38M6 -18L14 -38" stroke="#b8793f" stroke-width="2.6" stroke-linecap="round"/><path d="M-12 -20H12L14 -36H-14Z" fill="#e5503f" stroke="${OUT}" stroke-width="2.4" stroke-linejoin="round"/><path d="M-12 -28H13" stroke="#fff" stroke-width="3"/>`,
        14
    );

    // tent
    C.sym(
        'tent',
        `<ellipse cx="8" cy="3" rx="54" ry="8" fill="${SHADOW}"/>` +
            `<path d="M-48 0L0 -70L48 0Z" fill="#f08a3a" stroke="${OUT}" stroke-width="3" stroke-linejoin="round"/>` +
            `<path d="M0 -70L48 0L22 0Z" fill="#d46a22" opacity=".7"/>` +
            `<path d="M-30 -22L0 -62L-14 -22Z" fill="#f7a85e" opacity=".85"/>` +
            `<path d="M-14 0L0 -42L14 0Z" fill="#4a2a1c" stroke="${OUT}" stroke-width="2.4" stroke-linejoin="round"/><path d="M-14 0L-24 0L-8 -34Z M14 0L24 0L8 -34Z" fill="#f4c27a" stroke="${OUT}" stroke-width="2" stroke-linejoin="round"/>` +
            `<path d="M0 -70L0 -80" stroke="${OUT}" stroke-width="3"/><path d="M0 -80L14 -76L0 -72Z" fill="#e04a3a" stroke="${OUT}" stroke-width="1.8" stroke-linejoin="round"/>` +
            `<path d="M-48 0L-64 6M48 0L64 6" stroke="${OUT}" stroke-width="1.6"/><path d="M-66 8L-62 2M62 8L66 2" stroke="#c58a52" stroke-width="3" stroke-linecap="round"/>`,
        54,
        [-50, 40]
    );

    // kampvuur
    const flame = (x, y, s, c) =>
        `<path transform="translate(${x} ${y}) scale(${s})" d="M0 0C-12 0 -14 -12 -8 -22C-6 -16 -3 -14 -2 -16C-4 -26 4 -34 6 -40C8 -28 18 -22 14 -8C12 -2 6 0 0 0Z" fill="${c}" stroke="${OUT}" stroke-width="${r1(1.8 / s)}" stroke-linejoin="round"/>`;
    C.sym(
        'fire',
        `<ellipse cx="4" cy="4" rx="38" ry="9" fill="${SHADOW}"/>` +
            `<circle cx="-18" cy="-52" r="9" fill="#fff" opacity=".5"/><circle cx="-10" cy="-66" r="12" fill="#fff" opacity=".42"/><circle cx="-4" cy="-84" r="14" fill="#fff" opacity=".3"/>` +
            `<g fill="#aeb4c0" stroke="${OUT}" stroke-width="2.2">` +
            [
                [-30, -2],
                [-20, 5],
                [-4, 8],
                [14, 6],
                [28, 0],
                [32, -10],
                [-34, -12]
            ]
                .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="6.4"/>`)
                .join('') +
            `</g><path d="M-26 -14L14 0M26 -14L-14 0" stroke="${OUT}" stroke-width="9" stroke-linecap="round"/><path d="M-26 -14L14 0M26 -14L-14 0" stroke="#8a5a38" stroke-width="5" stroke-linecap="round"/>` +
            flame(-2, -6, 1.5, '#ff6a2a') +
            flame(2, -6, 1.1, '#ffa532') +
            flame(2, -6, 0.65, '#ffe27a') +
            `<circle cx="14" cy="-50" r="1.6" fill="#ffa532"/><circle cx="-14" cy="-44" r="1.4" fill="#ffd84a"/><circle cx="22" cy="-38" r="1.3" fill="#ffa532"/>`,
        40,
        [-30, 20]
    );

    // wegwijzer (zonder tekst: pictogrammen)
    const board = (y, w, c, dir, icon) =>
        `<path d="${dir > 0 ? `M-6 ${y - 9}H${w}L${w + 10} ${y}L${w} ${y + 9}H-6Z` : `M6 ${y - 9}H${-w}L${-w - 10} ${y}L${-w} ${y + 9}H6Z`}" fill="${c}" stroke="${OUT}" stroke-width="2.2" stroke-linejoin="round"/>` +
        icon(dir > 0 ? w * 0.4 : -w * 0.4, y);
    C.sym(
        'signpost',
        `<ellipse cx="6" cy="2" rx="16" ry="4" fill="${SHADOW}"/><rect x="-4" y="-96" width="8" height="98" fill="#a8743f" stroke="${OUT}" stroke-width="2.4"/><path d="M-4 -94H4" stroke="${OUT}" stroke-width="2.4"/>` +
            board(
                -82,
                34,
                '#f2c14a',
                1,
                (x, y) =>
                    `<path d="M${x - 6} ${y + 4}L${x} ${y - 5}L${x + 6} ${y + 4}Z" fill="#fff" stroke="${OUT}" stroke-width="1.2" stroke-linejoin="round"/>`
            ) +
            board(
                -62,
                30,
                '#5aa6e0',
                -1,
                (x, y) =>
                    `<path d="M${x - 7} ${y}q3.5 -5 7 0t7 0" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`
            ) +
            board(
                -42,
                28,
                '#e5503f',
                1,
                (x, y) =>
                    `<path d="M${x} ${y + 5}C${x - 6} ${y + 5} ${x - 6} ${y - 1} ${x - 3} ${y - 5}C${x - 2} ${y - 2} ${x} ${y - 2} ${x} ${y - 4}C${x + 2} ${y - 1} ${x + 6} ${y + 1} ${x + 3} ${y + 5}Z" fill="#ffd84a" stroke="${OUT}" stroke-width="1"/>`
            ),
        14,
        [-96, 34]
    );

    // steiger + roeiboot + riet
    C.sym(
        'jetty',
        `<path d="M-44 -10H44V10H-44Z" fill="rgba(60,40,10,.2)" transform="translate(3 4)"/>` +
            `<path d="M-46 -10H46L52 6H-52Z" fill="#c58a52" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/>` +
            Array.from(
                { length: 8 },
                (_, i) =>
                    `<path d="M${-40 + i * 11.5} -9V6" stroke="${OUT}" stroke-width="1.6" opacity=".55"/>`
            ).join('') +
            `<path d="M-46 -10H46" stroke="#e0a870" stroke-width="3"/>` +
            [-40, 0, 40]
                .map(
                    x =>
                        `<rect x="${x - 3.4}" y="-16" width="6.8" height="22" rx="2" fill="#8d5a3c" stroke="${OUT}" stroke-width="2"/>`
                )
                .join(''),
        46
    );
    C.sym(
        'boat',
        `<ellipse cx="2" cy="4" rx="34" ry="6" fill="rgba(30,80,120,.25)"/><path d="M-32 -8C-24 8 24 8 32 -8Z" fill="#e5503f" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/><path d="M-30 -8H30" stroke="${OUT}" stroke-width="2.6"/><path d="M-26 -4C-8 2 10 2 28 -4" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M-30 -8L-8 -24M-10 -8L14 -26" stroke="${OUT}" stroke-width="3" stroke-linecap="round"/><path d="M-30 -8L-8 -24M-10 -8L14 -26" stroke="#c58a52" stroke-width="1.4" stroke-linecap="round"/>`,
        30
    );
    C.sym(
        'reeds',
        `<path d="M-8 0V-30M0 0V-38M7 0V-26M-14 0V-20" stroke="${OUT}" stroke-width="3.6" stroke-linecap="round"/><path d="M-8 0V-30M0 0V-38M7 0V-26M-14 0V-20" stroke="#8aa94a" stroke-width="1.8" stroke-linecap="round"/><ellipse cx="0" cy="-40" rx="3" ry="8" fill="#7a4a24" stroke="${OUT}" stroke-width="1.4"/><ellipse cx="-8" cy="-31" rx="2.8" ry="7" fill="#7a4a24" stroke="${OUT}" stroke-width="1.4"/>`,
        10
    );
    C.sym('stuga', symHouse(`${id}-hc`, '#4a4a55', { w: 40, h: 32 }), 46, [-50, 40]);
    C.alias('stugaRed', 'stuga', '#c8402e');

    C.drawPath({ edge: '#4a4d5c', sand: '#767a8a', light: '#8a8ea0', dot: '#ffe9a0' });
    // asfaltrand + witte lijn is hierboven al gedaan via dot; extra kantlijnen:
    C.add(
        'path',
        `<path d="${C.pathD}" fill="none" stroke="#e9e6dc" stroke-width="${PATH_W - 6}" stroke-opacity=".0"/>`
    );

    // meer
    const lx = 308;
    const ly = 455;
    C.add(
        'water',
        `<path d="M${lx - 100} ${ly - 4}C${lx - 100} ${ly - 56} ${lx - 40} ${ly - 76} ${lx + 10} ${ly - 70}C${lx + 70} ${ly - 76} ${lx + 120} ${ly - 36} ${lx + 120} ${ly + 10}C${lx + 120} ${ly + 62} ${lx + 50} ${ly + 76} ${lx - 10} ${ly + 70}C${lx - 70} ${ly + 70} ${lx - 100} ${ly + 40} ${lx - 100} ${ly - 4}Z" fill="#f4dc9c" stroke="#c9a15f" stroke-width="3" stroke-linejoin="round"/>` +
            `<path d="M${lx - 90} ${ly - 4}C${lx - 90} ${ly - 48} ${lx - 38} ${ly - 66} ${lx + 10} ${ly - 60}C${lx + 64} ${ly - 66} ${lx + 108} ${ly - 32} ${lx + 108} ${ly + 8}C${lx + 108} ${ly + 54} ${lx + 46} ${ly + 66} ${lx - 8} ${ly + 60}C${lx - 62} ${ly + 60} ${lx - 90} ${ly + 36} ${lx - 90} ${ly - 4}Z" fill="#5eb8e8" stroke="#2f86bd" stroke-width="3"/>` +
            `<path d="M${lx - 70} ${ly - 8}C${lx - 70} ${ly - 36} ${lx - 30} ${ly - 48} ${lx + 6} ${ly - 44}C${lx + 40} ${ly - 48} ${lx + 74} ${ly - 24} ${lx + 76} ${ly + 4}C${lx + 40} ${ly - 8} ${lx - 20} ${ly - 4} ${lx - 70} ${ly - 8}Z" fill="#8fd4f4" opacity=".6"/>` +
            `<path d="M${lx - 30} ${ly + 18}q10 -5 20 0t20 0M${lx + 20} ${ly - 24}q9 -4 18 0t18 0M${lx - 50} ${ly - 16}q8 -4 16 0" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".85"/>` +
            `<ellipse cx="${lx + 60}" cy="${ly + 30}" rx="11" ry="5" fill="#5fae42" stroke="${OUT}" stroke-width="1.6"/><ellipse cx="${lx + 78}" cy="${ly + 24}" rx="8" ry="4" fill="#6cba45" stroke="${OUT}" stroke-width="1.6"/><circle cx="${lx + 62}" cy="${ly + 27}" r="3.4" fill="#fff" stroke="${OUT}" stroke-width="1.2"/>`
    );

    /* --- plaatsing --- */
    const L = (y, g) => C.left(y, g);
    const R = (y, g) => C.right(y, g);
    C.block(10, 176, 120, 240, 'stuga');
    C.block(lx - 104, ly - 78, lx + 124, ly + 80, 'meer');
    // start: wegwijzer + dennen
    C.use('signpost', 286, 1440, 1);
    C.use('pine', 44, 1492, 1.05);
    C.use('lingon', 108, 1446, 0.85);
    C.use('flowP', 340, 1400, 0.9);
    C.use('birch', 58, 1372, 1.05);
    C.use('pine', 358, 1330, 1.1);
    C.use('pine2', 358, 1245, 1);
    C.use('log', 118, 1262, 1);
    C.use('chanterelle', 124, 1302, 1);
    C.use('chanterelle', 138, 1309, 0.8);
    C.use('blabar', 60, 1215, 0.9);
    C.use('pine', 24, 1125, 1);
    // kampeerplek rechts
    C.use('tent', 306, 1042, 1.2);
    C.use('fire', 262, 1128, 1);
    C.use('log', 330, 1135, 0.85);
    C.use('flowW', 232, 1062, 0.9);
    C.use('lingon', 342, 1100, 0.7);
    // camper links
    C.use('van', 90, 846, 0.9, { force: true });
    C.use('chair', 40, 896, 1, { force: true });
    C.use('chair', 112, 902, 1, { flip: true, force: true });
    C.use('pine', 346, 905, 1.1);
    C.use('rock', 236, 992, 0.85);
    C.use('lingon', 350, 785, 0.85);
    // dennenbos + duinen
    C.use('pine', 30, 700, 1.1);
    C.use('beachgrass', 336, 735, 1);
    C.use('beachgrass', 360, 722, 0.85);
    C.use('mush', 222, 566, 1);
    C.use('chanterelle', 264, 612, 0.9);
    // het meer
    C.use('jetty', 250, 470, 1);
    C.use('boat', 322, 486, 1);
    C.use('reeds', 228, 530, 1);
    C.use('reeds', 378, 508, 1);
    C.use('birch', 350, 372, 0.95);
    C.use('beachgrass', 30, 428, 1);
    C.use('beachgrass', 68, 424, 0.85);
    C.use('pine2', 54, 380, 1.0);
    C.use('rock', 34, 488, 0.8);
    // bovenin
    C.use('pine', 350, 282, 1.1);
    C.use('stugaRed', 60, 236, 0.9);
    C.use('log', 112, 288, 0.85);
    C.use('birch', 352, 200, 1);
    C.use('pine2', 28, 150, 0.95);
    C.use('pine', 286, 140, 0.9);
    C.use('beachgrass', 128, 344, 0.9);

    C.scatter(['flowP', 'flowW', 'flowY'], 14, { seed: 3, y0: 150, s: [0.75, 1] });
    C.scatter(['mush', 'chanterelle'], 8, { seed: 9, y0: 200, s: [0.7, 1] });
    C.scatter(['rock'], 4, { seed: 5, y0: 220, s: [0.55, 0.8] });
    C.scatter(['pine', 'pine2', 'birch'], 8, { seed: 21, y0: 200, s: [0.8, 1.0], spread: 0.9 });
    C.scatter(['tuft'], 55, { seed: 13, y0: 130, s: [0.8, 1.15], spread: 0.35, gap: 6 });

    C.require(
        'van',
        'tent',
        'fire',
        'signpost',
        'jetty',
        'boat',
        'chair',
        'stugaRed',
        'pine',
        'birch'
    );
    return {
        name: 'De camper',
        sky: '#f4a77f',
        svg: C.out(),
        nodes,
        warnings: C.warnings,
        notes: C.notes
    };
}

/* ======================================================================
 * SANKT OLOF
 * ====================================================================== */

function sanktolof() {
    const id = 'so';
    const nodes = makeNodes([215, 125, 200, 290, 230, 120, 190, 295, 210, 100, 190]);
    const C = makeCtx(id, nodes, { start: [218, 1560], end: [190, 36] });
    const G = {
        leaf: '#7cc650',
        leafD: '#4f9c3c',
        leafL: '#a2de6c',
        trunk: '#8f6540',
        trunkD: '#6a4529'
    };
    const AP = { ...G, fruit: '#e8483a' };
    const BL = { ...G, leaf: '#8ed062', leafD: '#58a640', fruit: '#f7a9c8' };
    const BI = {
        leaf: '#a6d55e',
        leafD: '#6fae3f',
        leafL: '#c8ec84',
        trunk: '#f3f0e6',
        trunkD: '#cfc8b2'
    };

    C.add('ground', `<rect width="390" height="1500" fill="#97d05c"/>`);
    groundBlobs(C, '#add96f', 14, 41, { op: 0.4, y0: 200 });
    groundBlobs(C, '#7fbc4c', 10, 43, { op: 0.28, y0: 200 });

    // koolzaadvelden (onder het pad)
    C.add(
        'ground',
        `<pattern id="${id}-rows" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(8)"><rect width="14" height="14" fill="none"/><path d="M0 7H14" stroke="#eec723" stroke-width="2.2"/><circle cx="4" cy="3" r="1.6" fill="#fff3a0"/><circle cx="11" cy="11" r="1.6" fill="#fff3a0"/></pattern>`
    );
    const field = (n, d) =>
        `<path d="${d}" fill="#f8de3a" stroke="#d6b21c" stroke-width="3" stroke-linejoin="round"/><path d="${d}" fill="url(#${id}-rows)"/>`;
    C.add(
        'ground',
        field(
            1,
            'M200 1160C250 1140 330 1150 396 1140L396 1330C330 1350 260 1330 214 1316C180 1280 176 1200 200 1160Z'
        ) +
            field(
                2,
                'M-6 900C60 884 140 892 190 910C206 960 200 1020 170 1050C110 1070 40 1060 -6 1050Z'
            ) +
            field(
                3,
                'M300 700C340 690 380 694 396 696V840C350 850 300 840 280 820C272 770 280 720 300 700Z'
            )
    );
    // strand + zee bovenin
    C.add(
        'ground',
        `<defs><linearGradient id="${id}-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd0f0"/><stop offset="1" stop-color="#4fb0e0"/></linearGradient></defs>` +
            `<rect width="390" height="130" fill="url(#${id}-sea)"/>` +
            `<path d="M0 60q30 -8 60 0t60 0t60 0t60 0t60 0t60 0t30 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>` +
            `<path d="M20 30q24 -6 48 0t48 0t48 0M220 90q24 -6 48 0t48 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/>` +
            `<path d="M0 118C40 106 70 126 110 118C150 110 180 128 220 120C260 112 300 128 340 118C360 114 380 120 390 122V260H0Z" fill="#f6e3ae" stroke="#c9a15f" stroke-width="3" stroke-linejoin="round"/>` +
            `<path d="M0 108C40 96 70 116 110 108C150 100 180 118 220 110C260 102 300 118 340 108C360 104 380 110 390 112" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".85"/>` +
            `<path d="M0 124C40 112 70 132 110 124C150 116 180 134 220 126C260 118 300 134 340 124" fill="none" stroke="#e3c987" stroke-width="3" opacity=".7"/>` +
            `<path d="M0 200C60 186 120 196 200 190C280 186 340 198 390 190V260H0Z" fill="#9bd460" stroke="#6fae3f" stroke-width="2.4" opacity=".0"/>` +
            `<path d="M0 210C50 196 110 214 170 204C230 194 300 214 390 200V400H0Z" fill="#97d05c"/>` +
            `<path d="M0 210C50 196 110 214 170 204C230 194 300 214 390 200" fill="none" stroke="#6fae3f" stroke-width="3" stroke-linecap="round"/>`
    );

    C.sym('tree', symTree(`${id}-t1`, G), 24, [-85, 46]);
    C.sym(
        'apple',
        symTree(`${id}-t2`, AP, {
            cs: [
                [0, -80, 30],
                [-24, -64, 23],
                [24, -66, 24],
                [-11, -96, 21],
                [15, -94, 21],
                [0, -58, 25]
            ]
        }),
        22,
        [-80, 42]
    );
    C.sym(
        'blossom',
        symTree(`${id}-t3`, BL, {
            cs: [
                [0, -80, 30],
                [-24, -64, 23],
                [24, -66, 24],
                [-11, -96, 21],
                [15, -94, 21],
                [0, -58, 25]
            ]
        }),
        22,
        [-80, 42]
    );
    C.sym(
        'birch',
        symTree(`${id}-t4`, BI, {
            cs: [
                [0, -80, 28],
                [-20, -64, 20],
                [20, -66, 21],
                [-8, -96, 19],
                [12, -94, 18]
            ]
        }),
        20,
        [-80, 36]
    );
    C.sym('bush', symBush({ ...G, clip: `${id}-b1` }), 26);
    C.sym('bushB', symBush({ ...G, clip: `${id}-b2` }, 'currentColor'), 26);
    C.alias('bushLilac', 'bushB', '#c58ae8');
    C.sym('flower', symFlowers('currentColor', '#ffd84a'), 14);
    C.alias('flowW', 'flower', '#ffffff');
    C.alias('flowY', 'flower', '#ffd84a');
    C.alias('poppy', 'flower', '#ee4a3a');
    C.sym(
        'rock',
        symRock(
            { base: '#b9bcc4', dark: '#9296a0', light: '#d9dce2', moss: '#79b45a' },
            `${id}-rk`
        ),
        24
    );
    C.sym('tuft', symTuft(), 8);
    C.sym('mush', symMushroom(), 10);

    // lupine
    C.sym(
        'lupin',
        `<ellipse cx="3" cy="2" rx="16" ry="4" fill="${SHADOW}"/>` +
            [
                [-10, -30],
                [0, -40],
                [10, -32]
            ]
                .map(
                    ([x, h]) =>
                        `<path d="M${x} 0V${h}" stroke="#4f9a3b" stroke-width="2.4" stroke-linecap="round"/><path d="M${x} ${h + 8}C${x - 6} ${h + 10} ${x - 6} ${h - 2} ${x} ${h - 8}C${x + 6} ${h - 2} ${x + 6} ${h + 10} ${x} ${h + 8}Z" fill="currentColor" stroke="${OUT}" stroke-width="1.4" stroke-linejoin="round"/>` +
                        `<path d="M${x} ${h + 18}C${x - 7} ${h + 18} ${x - 6} ${h + 8} ${x} ${h + 6}C${x + 6} ${h + 8} ${x + 7} ${h + 18} ${x} ${h + 18}Z" fill="currentColor" stroke="${OUT}" stroke-width="1.4" stroke-linejoin="round"/><path d="M${x} ${h + 28}C${x - 8} ${h + 28} ${x - 7} ${h + 16} ${x} ${h + 14}C${x + 7} ${h + 16} ${x + 8} ${h + 28} ${x} ${h + 28}Z" fill="currentColor" stroke="${OUT}" stroke-width="1.4" stroke-linejoin="round"/>`
                )
                .join('') +
            `<path d="M-16 2q-4 -8 -10 -10M16 2q4 -8 10 -10M0 2q-2 -8 -8 -10" stroke="${OUT}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M-16 2q-4 -8 -10 -10M16 2q4 -8 10 -10M0 2q-2 -8 -8 -10" stroke="#5fae42" stroke-width="2" fill="none" stroke-linecap="round"/>`,
        14
    );
    C.alias('lupinP', 'lupin', '#a47ae0');
    C.alias('lupinR', 'lupin', '#f0709c');

    // huisjes
    C.sym('stuga', symHouse(`${id}-hc`, '#3f3f4a', { w: 48, h: 40 }), 56, [-50, 50]);
    C.alias('houseRed', 'stuga', '#b5342a');
    C.alias('houseYellow', 'stuga', '#e9b53c');
    C.alias('houseBlue', 'stuga', '#7fb3dc');

    // stenmuur
    C.sym(
        'wall',
        `<ellipse cx="4" cy="2" rx="28" ry="4" fill="${SHADOW}"/>` +
            `<g stroke="${OUT}" stroke-width="2" stroke-linejoin="round">` +
            `<path d="M-26 0V-8Q-26 -12 -22 -12L-8 -12Q-4 -12 -4 -8V0Z" fill="#a9adb7"/><path d="M-4 0V-8Q-4 -12 0 -12L14 -12Q18 -12 18 -8V0Z" fill="#bcc0ca"/><path d="M18 0V-8Q18 -12 22 -12L28 -12V0Z" fill="#a0a5b0"/>` +
            `<path d="M-22 -12V-18Q-22 -22 -18 -22L-2 -22Q2 -22 2 -18V-12Z" fill="#c4c8d2"/><path d="M2 -12V-18Q2 -22 6 -22L20 -22Q24 -22 24 -18V-12Z" fill="#aeb2bd"/>` +
            `</g><path d="M-20 -20L-8 -20M8 -20L18 -20" stroke="#e4e7ee" stroke-width="2" stroke-linecap="round"/><path d="M-24 -22q6 -5 12 0q6 -4 10 0" stroke="#79b45a" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
        26
    );

    // hooibalen
    C.sym(
        'hay',
        `<ellipse cx="6" cy="2" rx="22" ry="5" fill="${SHADOW}"/><circle cx="0" cy="-14" r="15" fill="#e5c25a" stroke="${OUT}" stroke-width="2.6"/><circle cx="0" cy="-14" r="10" fill="none" stroke="#c9a238" stroke-width="2"/><circle cx="0" cy="-14" r="5" fill="none" stroke="#c9a238" stroke-width="2"/><path d="M-9 -22C-4 -26 4 -26 9 -22" stroke="#f6dc84" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
        16
    );

    // schaap
    C.sym(
        'sheep',
        `<ellipse cx="4" cy="3" rx="24" ry="5" fill="${SHADOW}"/>` +
            `<path d="M-12 0V-8M-4 0V-8M8 0V-8M16 0V-8" stroke="${OUT}" stroke-width="6" stroke-linecap="round"/><path d="M-12 0V-8M-4 0V-8M8 0V-8M16 0V-8" stroke="#4a4550" stroke-width="3" stroke-linecap="round"/>` +
            `<g fill="${OUT}" stroke="${OUT}" stroke-width="4"><circle cx="-8" cy="-18" r="10"/><circle cx="6" cy="-22" r="11"/><circle cx="16" cy="-16" r="9"/><circle cx="0" cy="-12" r="10"/></g><g fill="#fffdf6"><circle cx="-8" cy="-18" r="10"/><circle cx="6" cy="-22" r="11"/><circle cx="16" cy="-16" r="9"/><circle cx="0" cy="-12" r="10"/></g>` +
            `<ellipse cx="-22" cy="-18" rx="8" ry="9" fill="#4a4550" stroke="${OUT}" stroke-width="2"/><path d="M-26 -26L-32 -22M-18 -26L-14 -22" stroke="#4a4550" stroke-width="4" stroke-linecap="round"/><circle cx="-24" cy="-19" r="1.5" fill="#fff"/>`,
        24
    );

    // vlaggenmast
    C.sym(
        'flag',
        `<ellipse cx="4" cy="2" rx="10" ry="3" fill="${SHADOW}"/><rect x="-2" y="-110" width="4" height="112" fill="#f4efe4" stroke="${OUT}" stroke-width="2"/><circle cx="0" cy="-112" r="3.4" fill="#f2c14a" stroke="${OUT}" stroke-width="1.6"/>` +
            `<path d="M2 -106C14 -110 26 -102 40 -106L40 -82C26 -86 14 -78 2 -82Z" fill="#2a6bb3" stroke="${OUT}" stroke-width="2" stroke-linejoin="round"/><path d="M12 -106C13 -98 13 -90 12 -82M2 -94C14 -98 26 -90 40 -94" stroke="#f7d23e" stroke-width="5" fill="none"/>`,
        8,
        [-100, 22]
    );

    // kerk
    C.sym(
        'church',
        `<ellipse cx="10" cy="4" rx="96" ry="12" fill="${SHADOW}"/>` +
            // toren
            `<rect x="-84" y="-128" width="34" height="128" fill="#fbf7ee" stroke="${OUT}" stroke-width="3"/><rect x="-84" y="-128" width="10" height="128" fill="#ece6d6"/><path d="M-84 -128L-67 -190L-50 -128Z" fill="#46505e" stroke="${OUT}" stroke-width="3" stroke-linejoin="round"/><path d="M-76 -130L-67 -178" stroke="#7a8696" stroke-width="3" stroke-linecap="round"/><path d="M-67 -190V-204M-72 -198H-62" stroke="${OUT}" stroke-width="3" stroke-linecap="round"/><path d="M-77 -108Q-77 -122 -67 -122Q-57 -122 -57 -108V-88H-77Z" fill="#3a4250" stroke="${OUT}" stroke-width="2.4"/><circle cx="-67" cy="-60" r="8" fill="#fff" stroke="${OUT}" stroke-width="2.4"/><path d="M-67 -66V-60H-62" stroke="${OUT}" stroke-width="1.6" stroke-linecap="round" fill="none"/>` +
            // dak
            `<path d="M-50 -52L-50 -66L60 -66L60 -52Z" fill="#8c4a38" stroke="${OUT}" stroke-width="2.6"/>` +
            // schip met trapgevel
            `<path d="M-46 0V-52L-46 -62H-36V-72H-26V-82H-16V-92H-8V-98H16V-92H24V-82H33V-72H42V-62H52V-52V0Z" transform="translate(3 0)" fill="#fffdf6" stroke="${OUT}" stroke-width="3" stroke-linejoin="round"/>` +
            `<path d="M-40 0V-52H-34V0Z" fill="#ece6d6"/>` +
            `<path d="M52 0V-52L100 -48V0Z" fill="#f1ebdb" stroke="${OUT}" stroke-width="3" stroke-linejoin="round"/><path d="M48 -52L100 -48L100 -58L48 -64Z" fill="#8c4a38" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/><path d="M66 -22V-38Q66 -44 72 -44Q78 -44 78 -38V-22Z" fill="#cfe9f7" stroke="${OUT}" stroke-width="2"/><path d="M88 -22V-38Q88 -44 94 -44Q100 -44 100 -38V-22Z" fill="#cfe9f7" stroke="${OUT}" stroke-width="2" transform="translate(-4 0)"/>` +
            `<path d="M-14 0V-34Q-14 -46 -2 -46Q10 -46 10 -34V0Z" fill="#8a5a38" stroke="${OUT}" stroke-width="2.6"/><path d="M-2 -46V0" stroke="${OUT}" stroke-width="1.6"/><circle cx="-5" cy="-22" r="1.6" fill="#ffd84a"/><circle cx="1" cy="-22" r="1.6" fill="#ffd84a"/>` +
            `<path d="M-34 -20V-40Q-34 -48 -28 -48Q-22 -48 -22 -40V-20Z" fill="#cfe9f7" stroke="${OUT}" stroke-width="2.4"/><path d="M22 -20V-40Q22 -48 28 -48Q34 -48 34 -40V-20Z" fill="#cfe9f7" stroke="${OUT}" stroke-width="2.4"/><circle cx="3" cy="-76" r="8" fill="#cfe9f7" stroke="${OUT}" stroke-width="2.4"/><path d="M3 -84V-68M-5 -76H11" stroke="${OUT}" stroke-width="1.4"/><path d="M3 -98V-112M-3 -106H9" stroke="${OUT}" stroke-width="3" stroke-linecap="round"/>`,
        100,
        [-100, 70]
    );

    // strandhuisje, zeilboot, meeuwen
    C.sym(
        'hut',
        `<ellipse cx="8" cy="3" rx="34" ry="6" fill="${SHADOW}"/><rect x="-26" y="-44" width="52" height="44" fill="#fff" stroke="${OUT}" stroke-width="2.8"/>` +
            Array.from(
                { length: 5 },
                (_, i) =>
                    `<rect x="${-26 + i * 10.4 + (i % 2 ? 0 : 0)}" y="-44" width="10.4" height="44" fill="${i % 2 ? '#fff' : '#e5503f'}"/>`
            ).join('') +
            `<rect x="-26" y="-44" width="52" height="44" fill="none" stroke="${OUT}" stroke-width="2.8"/>` +
            `<path d="M-32 -42L0 -66L32 -42Z" fill="#f2c14a" stroke="${OUT}" stroke-width="2.8" stroke-linejoin="round"/><rect x="-8" y="-26" width="16" height="26" fill="#6b4a38" stroke="${OUT}" stroke-width="2"/>`,
        32,
        [-50, 30]
    );
    C.sym(
        'sailboat',
        `<ellipse cx="2" cy="6" rx="30" ry="5" fill="rgba(20,80,120,.25)"/><path d="M-28 -6H28C22 6 -20 6 -28 -6Z" fill="#e5503f" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/><path d="M0 -8V-54" stroke="${OUT}" stroke-width="3" stroke-linecap="round"/><path d="M2 -52C20 -40 22 -22 22 -12H2Z" fill="#fff" stroke="${OUT}" stroke-width="2.4" stroke-linejoin="round"/><path d="M-2 -46C-14 -34 -18 -22 -20 -12H-2Z" fill="#f6f1e2" stroke="${OUT}" stroke-width="2.4" stroke-linejoin="round"/><path d="M0 -54L10 -58L0 -62Z" fill="#2a6bb3" stroke="${OUT}" stroke-width="1.6" stroke-linejoin="round"/>`,
        28
    );
    C.sym(
        'gull',
        `<path d="M-12 0C-8 -8 -3 -8 0 -2C3 -8 8 -8 12 0" fill="none" stroke="${OUT}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M-12 0C-8 -8 -3 -8 0 -2C3 -8 8 -8 12 0" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        6
    );

    C.drawPath({ edge: '#c4a878', sand: '#ece0c0', light: '#f6eed8', dot: '#fffdf4' });
    C.stream(1187, {
        edge: '#3f86b8',
        water: '#6bbbe6',
        light: '#a7ddf3',
        wall: '#b9bcc4',
        deck: '#ece0c0'
    });

    /* --- plaatsing --- */
    const L = (y, g) => C.left(y, g);
    const R = (y, g) => C.right(y, g);
    C.block(0, 0, 390, 118, 'zee');
    C.sym(
        'beachgrass',
        `<path d="M-10 1C-10 -12 -14 -20 -18 -26M-4 1C-4 -14 -4 -24 -3 -32M3 1C4 -12 7 -22 12 -28M10 1C10 -8 14 -14 20 -18" fill="none" stroke="${OUT}" stroke-width="4" stroke-linecap="round"/><path d="M-10 1C-10 -12 -14 -20 -18 -26M-4 1C-4 -14 -4 -24 -3 -32M3 1C4 -12 7 -22 12 -28M10 1C10 -8 14 -14 20 -18" fill="none" stroke="#a9c860" stroke-width="2" stroke-linecap="round"/>`,
        12
    );
    C.sym(
        'parasol',
        `<ellipse cx="8" cy="3" rx="22" ry="5" fill="${SHADOW}"/><path d="M0 0L2 -62" stroke="${OUT}" stroke-width="5" stroke-linecap="round"/><path d="M0 0L2 -62" stroke="#f4efe4" stroke-width="2.2" stroke-linecap="round"/><path d="M-32 -50C-26 -74 30 -78 36 -50Z" fill="#fff" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/><path d="M-32 -50C-24 -66 -12 -72 -6 -74L-6 -50Z M10 -50L10 -75C22 -72 32 -62 36 -50Z" fill="#2a6bb3"/><path d="M-32 -50C-26 -74 30 -78 36 -50Z" fill="none" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/><path d="M-32 -50q8 6 13 0q8 6 13 0q8 6 14 0q8 6 14 0q8 6 14 0" fill="#fff" stroke="${OUT}" stroke-width="2"/>`,
        22,
        [-60, 34]
    );
    // onder: dorpsingang
    for (let x = 14; x < L(1455, 22); x += 46) {
        C.use('wall', x, 1470, 1);
    }
    for (let x = R(1455, 22) + 22; x < 390; x += 46) {
        C.use('wall', x, 1470, 1);
    }
    C.use('houseRed', 90, 1425, 1, { force: true });
    C.use('flag', 290, 1446, 1);
    C.use('lupinP', 28, 1490, 0.9);
    C.use('lupinR', 150, 1478, 0.9);
    C.use('lupinP', 352, 1496, 0.9);
    C.use('apple', 352, 1380, 1);
    C.use('bushLilac', 40, 1345, 0.9);
    C.use('hay', 292, 1235, 1);
    C.use('hay', 338, 1215, 1);
    C.use('hay', 318, 1280, 1);
    C.use('blossom', 34, 1290, 1);
    C.use('apple', 30, 1075, 0.95);
    C.use('flowW', 76, 1322, 0.9);
    C.use('poppy', 330, 1332, 0.9);
    // dorpje
    C.use('houseYellow', 322, 1088, 0.9, { force: true });
    C.use('blossom', 50, 1112, 1);
    C.use('lupinP', 150, 1058, 0.9);
    // koolzaadveld links met balen en schapen
    C.use('hay', 58, 998, 1);
    C.use('hay', 104, 1012, 1);
    C.use('sheep', 146, 962, 1);
    C.use('sheep', 98, 944, 0.9, { flip: true });
    C.use('birch', 34, 905, 1);
    C.use('bush', 336, 940, 0.9);
    // huis rechts, wei links
    C.use('houseRed', 326, 836, 0.9, { force: true });
    C.use('wall', 40, 790, 1);
    C.use('wall', 40, 818, 1);
    C.use('sheep', 40, 745, 1);
    C.use('blossom', 56, 690, 1);
    C.use('poppy', 216, 745, 0.9);
    // veld rechts + boomgaard
    C.use('hay', 334, 768, 0.9);
    C.use('apple', 345, 690, 0.95);
    C.use('apple', 40, 625, 1);
    C.use('flowY', 262, 640, 0.9);
    C.use('bushLilac', 345, 585, 0.85);
    C.use('houseBlue', 96, 512, 0.85, { force: true });
    C.use('lupinR', 176, 548, 0.9);
    // kerk
    C.use('church', 98, 440, 0.88, { force: true });
    C.use('wall', 30, 470, 1);
    C.use('apple', 346, 420, 1);
    C.use('bushLilac', 322, 340, 0.85);
    C.use('houseRed', 320, 290, 0.82, { force: true });
    C.use('flowW', 232, 300, 0.9);
    C.use('lupinP', 262, 240, 0.9);
    // strand
    C.use('parasol', 250, 208, 1, { force: true });
    C.use('hut', 330, 190, 1);
    C.use('beachgrass', 36, 168, 1);
    C.use('beachgrass', 360, 150, 1);
    C.use('beachgrass', 270, 174, 0.9);
    C.use('sailboat', 300, 70, 1, { force: true });
    C.use('sailboat', 66, 38, 0.7, { force: true });
    C.use('gull', 180, 56, 1, { force: true });
    C.use('gull', 212, 40, 0.8, { force: true });
    C.use('gull', 120, 26, 0.7, { force: true });

    C.scatter(['flowW', 'flowY', 'poppy'], 20, { seed: 3, y0: 260, s: [0.75, 1] });
    C.scatter(['lupinP', 'lupinR'], 8, { seed: 8, y0: 260, s: [0.75, 1] });
    C.scatter(['rock'], 3, { seed: 5, y0: 260, s: [0.55, 0.75] });
    C.scatter(['tuft'], 60, { seed: 13, y0: 200, s: [0.8, 1.15], spread: 0.35, gap: 6 });

    C.require(
        'houseRed',
        'houseYellow',
        'church',
        'apple',
        'blossom',
        'wall',
        'hut',
        'sailboat',
        'sheep',
        'hay'
    );
    return {
        name: 'Sankt Olof',
        sky: '#7fd0f0',
        svg: C.out(),
        nodes,
        warnings: C.warnings,
        notes: C.notes
    };
}

/* ======================================================================
 * MALMO
 * ====================================================================== */

function malmo() {
    const id = 'ml';
    const nodes = makeNodes([210, 140, 250, 200, 120, 230, 290, 180, 110, 220, 200]);
    const C = makeCtx(id, nodes, { start: [212, 1560], end: [200, 114] });
    const G = {
        leaf: '#6fbf55',
        leafD: '#478f3e',
        leafL: '#98db6c',
        trunk: '#8f6540',
        trunkD: '#6a4529'
    };
    const AU = {
        leaf: '#f0b04a',
        leafD: '#d17f2c',
        leafL: '#f8d070',
        trunk: '#8f6540',
        trunkD: '#6a4529'
    };

    // gras (park) + straatstenen (stad)
    C.add('ground', `<rect width="390" height="1500" fill="#8dce63"/>`);
    groundBlobs(C, '#a4dc78', 12, 51, { op: 0.4, y0: 840 });
    groundBlobs(C, '#78b84e', 10, 53, { op: 0.28, y0: 840 });
    C.add(
        'ground',
        `<defs><pattern id="${id}-stone" width="20" height="14" patternUnits="userSpaceOnUse"><rect width="20" height="14" fill="#e4e1da"/><path d="M0 0H20M0 7H20M5 0V7M15 7V14" stroke="#d4d0c7" stroke-width="1.2"/></pattern>` +
            `<pattern id="${id}-win" width="16" height="18" patternUnits="userSpaceOnUse"><rect x="3.5" y="4" width="9" height="11" fill="#cfe6f5" stroke="${OUT}" stroke-width="1.3"/><path d="M8 4V15M3.5 9.5H12.5" stroke="#fff" stroke-width="1.4"/></pattern></defs>` +
            `<path d="M0 140H390V800C340 818 290 800 240 812C180 826 120 806 60 818C30 824 10 816 0 810Z" fill="url(#${id}-stone)" stroke="#a8a299" stroke-width="3" stroke-linejoin="round"/>` +
            `<path d="M0 810C10 816 30 824 60 818C120 806 180 826 240 812C290 800 340 818 390 800V812C340 830 290 812 240 824C180 838 120 818 60 830C30 836 10 828 0 822Z" fill="#c4bfb5" opacity=".6"/>`
    );

    // zee + Oresundsbron bovenin
    const cab = (x0, y0, xs) =>
        xs
            .map(
                x =>
                    `<path d="M${x0} ${y0}L${x} 92" stroke="#fff" stroke-width="1.6" opacity=".95"/>`
            )
            .join('');
    C.add(
        'ground',
        `<defs><linearGradient id="${id}-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe6f8"/><stop offset=".55" stop-color="#8fd0ee"/><stop offset="1" stop-color="#4fb0de"/></linearGradient></defs>` +
            `<rect width="390" height="146" fill="url(#${id}-sea)"/>` +
            `<ellipse cx="60" cy="24" rx="44" ry="9" fill="#fff" opacity=".8"/><ellipse cx="94" cy="16" rx="28" ry="8" fill="#fff" opacity=".8"/><ellipse cx="330" cy="38" rx="38" ry="8" fill="#fff" opacity=".7"/>` +
            `<path d="M0 98H390V146H0Z" fill="#4fb0de"/><path d="M0 108q24 -6 48 0t48 0t48 0t48 0t48 0t48 0t48 0t48 0M0 128q24 -6 48 0t48 0t48 0t48 0t48 0t48 0t48 0t48 0" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".6"/>` +
            // kleine pyloon op afstand
            `<g opacity=".75"><path d="M64 94V52L70 94Z" fill="#d9dde6" stroke="${OUT}" stroke-width="1.6" stroke-linejoin="round"/>` +
            cab(67, 54, [20, 30, 40, 50, 84, 94, 104, 114]).replace(
                /stroke-width="1.6"/g,
                'stroke-width="1"'
            ) +
            `</g>` +
            // brugdek
            `<rect x="-4" y="88" width="398" height="8" fill="#9aa0ae" stroke="${OUT}" stroke-width="2.4"/><rect x="-4" y="84" width="398" height="4" fill="#d9dde6" stroke="${OUT}" stroke-width="1.6"/>` +
            Array.from(
                { length: 20 },
                (_, i) => `<path d="M${i * 20} 84V80" stroke="${OUT}" stroke-width="1.6"/>`
            ).join('') +
            `<path d="M-4 80H394" stroke="${OUT}" stroke-width="1.6"/>` +
            Array.from(
                { length: 10 },
                (_, i) =>
                    `<path d="M${i * 40 + 6} 96V108M${i * 40 + 26} 96V108" stroke="${OUT}" stroke-width="5"/><path d="M${i * 40 + 6} 96V108M${i * 40 + 26} 96V108" stroke="#c8ccd6" stroke-width="2.4"/>`
            ).join('') +
            // hoofdpyloon met kabels
            cab(300, 12, [180, 196, 212, 228, 244, 260, 276, 290, 316, 330, 346, 362, 378, 392]) +
            `<path d="M284 94L292 6L296 6L300 40L304 6L308 6L316 94L308 94L300 50L292 94Z" fill="#e8ebf2" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/><path d="M290 34H310" stroke="${OUT}" stroke-width="2.6"/><path d="M286 90L293 12" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".8"/>` +
            // kade
            `<path d="M0 140H390V152H0Z" fill="#b9b3a8" stroke="${OUT}" stroke-width="2.4"/>` +
            Array.from(
                { length: 9 },
                (_, i) =>
                    `<rect x="${i * 46 + 14}" y="132" width="8" height="10" rx="3" fill="#4a4550" stroke="${OUT}" stroke-width="1.6"/>`
            ).join('')
    );

    C.sym('tree', symTree(`${id}-t1`, G), 24, [-85, 46]);
    C.sym('treeAu', symTree(`${id}-t2`, AU), 24, [-85, 46]);
    C.sym('bush', symBush({ ...G, clip: `${id}-b1` }), 26);
    C.sym('bushB', symBush({ ...G, clip: `${id}-b2` }, 'currentColor'), 26);
    C.alias('bushRed', 'bushB', '#e84a4a');
    C.sym('flower', symFlowers('currentColor', '#ffd84a'), 14);
    C.alias('flowY', 'flower', '#ffd84a');
    C.alias('flowP', 'flower', '#f58fc1');
    C.alias('flowW', 'flower', '#ffffff');
    C.alias('flowR', 'flower', '#ee4a3a');
    C.sym('tuft', symTuft(), 8);
    C.sym(
        'rock',
        symRock(
            { base: '#b9bcc4', dark: '#9296a0', light: '#d9dce2', moss: '#79b45a' },
            `${id}-rk`
        ),
        24
    );
    C.sym('bench', symBench(), 26);
    C.sym('lamp', symLamp(), 8, [-92, 12]);
    C.alias('lampG', 'lamp', '#2f6b52');
    C.sym('bike', symBike(), 32);
    C.alias('bikeR', 'bike', '#e5503f');
    C.alias('bikeB', 'bike', '#3f7fd0');
    C.alias('bikeY', 'bike', '#f2c14a');

    // gebouwen
    C.sym('bldA', symBuilding(`${id}-win`, 66, 5, 'flat'), 40, [-60, 40]);
    C.sym('bldB', symBuilding(`${id}-win`, 56, 4, 'gable'), 34, [-60, 36]);
    C.sym('bldC', symBuilding(`${id}-win`, 72, 6, 'mansard'), 44, [-70, 44]);
    ['A', 'B', 'C'].forEach(() => {});
    C.alias('bldAy', 'bldA', '#f3d9a0');
    C.alias('bldAp', 'bldA', '#f2b8a0');
    C.alias('bldBm', 'bldB', '#a8d8c0');
    C.alias('bldBb', 'bldB', '#9bbcd8');
    C.alias('bldCc', 'bldC', '#f4ead2');
    C.alias('bldCr', 'bldC', '#c4694e');

    // Turning Torso: negen gedraaide blokken boven op elkaar
    const seg = i => {
        const h = 30;
        const y0 = -i * h;
        const y1 = y0 - h;
        const w = 62 - i * 3.2;
        const rot = Math.sin(i * 0.7) * 14; // zijwaartse draai per blok
        const rot1 = Math.sin((i + 1) * 0.7) * 14;
        const g1 = i % 2 ? '#bcd8ee' : '#f1f5fa';
        const x0l = rot - w / 2;
        const x0r = rot + w / 2;
        const x1l = rot1 - (w - 3.2) / 2;
        const x1r = rot1 + (w - 3.2) / 2;
        const fr = x0r - 16; // voorvlak / zijvlak
        const fr1 = x1r - 16;
        return (
            `<path d="M${r1(x0l)} ${y0}L${r1(fr)} ${y0}L${r1(fr1)} ${y1}L${r1(x1l)} ${y1}Z" fill="${g1}" stroke="${OUT}" stroke-width="2.2" stroke-linejoin="round"/>` +
            `<path d="M${r1(fr)} ${y0}L${r1(x0r)} ${y0 - 3}L${r1(x1r)} ${y1 - 3}L${r1(fr1)} ${y1}Z" fill="#5b7fa0" stroke="${OUT}" stroke-width="2.2" stroke-linejoin="round"/>` +
            `<path d="M${r1((x0l + fr) / 2)} ${y0}L${r1((x1l + fr1) / 2)} ${y1}M${r1(x0l + (fr - x0l) * 0.25)} ${y0}L${r1(x1l + (fr1 - x1l) * 0.25)} ${y1}M${r1(x0l + (fr - x0l) * 0.75)} ${y0}L${r1(x1l + (fr1 - x1l) * 0.75)} ${y1}" stroke="#7fa3c4" stroke-width="1.2"/>` +
            `<path d="M${r1(x0l)} ${y0 - 11}L${r1(fr)} ${y0 - 11}M${r1(x0l)} ${y0 - 22}L${r1(fr)} ${y0 - 22}" stroke="#7fa3c4" stroke-width="1"/>`
        );
    };
    C.sym(
        'torso',
        `<ellipse cx="6" cy="3" rx="44" ry="7" fill="${SHADOW}"/><rect x="-34" y="-14" width="68" height="14" fill="#d9dde6" stroke="${OUT}" stroke-width="2.6"/>` +
            `<g transform="translate(0 -14)">${Array.from({ length: 9 }, (_, i) => seg(i)).join('')}</g>` +
            `<path d="M-6 -284V-306" stroke="${OUT}" stroke-width="2.6" stroke-linecap="round"/>`,
        44,
        [-270, 30]
    );

    // marktkraampje
    const stripes = (n, w, c) =>
        Array.from(
            { length: n },
            (_, i) =>
                `<path d="M${-w / 2 + (i * w) / n} -50l${w / n} 0l${(w / n) * 0.08} 14l${-(w / n)} 0Z" fill="${i % 2 ? '#fff' : c}" stroke="${OUT}" stroke-width="1.4" stroke-linejoin="round"/>`
        ).join('');
    const crate = (x, c1, c2) =>
        `<rect x="${x}" y="-18" width="22" height="14" rx="2" fill="#c58a52" stroke="${OUT}" stroke-width="2"/><circle cx="${x + 5}" cy="-21" r="5" fill="${c1}" stroke="${OUT}" stroke-width="1.4"/><circle cx="${x + 12}" cy="-22" r="5" fill="${c2}" stroke="${OUT}" stroke-width="1.4"/><circle cx="${x + 18}" cy="-20" r="4.4" fill="${c1}" stroke="${OUT}" stroke-width="1.4"/>`;
    C.sym(
        'stall',
        `<ellipse cx="8" cy="3" rx="46" ry="7" fill="${SHADOW}"/>` +
            `<path d="M-38 0V-48M38 0V-48" stroke="${OUT}" stroke-width="6" stroke-linecap="round"/><path d="M-38 0V-48M38 0V-48" stroke="#d9c9a8" stroke-width="2.6" stroke-linecap="round"/>` +
            `<rect x="-40" y="-16" width="80" height="16" fill="#e1a96f" stroke="${OUT}" stroke-width="2.6"/>` +
            crate(-36, '#e84a4a', '#f2994a') +
            crate(-10, '#f6d24a', '#8fcf5a') +
            crate(16, '#8b4aa8', '#f2994a') +
            `<g fill="currentColor"><path d="M-46 -50L-40 -68H40L46 -50Z" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/></g>` +
            stripes(8, 92, 'currentColor').replace(/fill="currentColor"/g, 'fill="currentColor"') +
            `<path d="M-46 -50L-40 -68H40L46 -50Z" fill="none" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/>` +
            `<path d="M-42 -60H42" stroke="#fff" stroke-width="2.4" opacity=".4"/>`,
        46,
        [-56, 46]
    );
    C.alias('stallR', 'stall', '#e5503f');
    C.alias('stallG', 'stall', '#4aa86a');
    C.alias('stallY', 'stall', '#f2b53a');

    // kanaalboot
    C.sym(
        'canalboat',
        `<ellipse cx="2" cy="4" rx="46" ry="6" fill="rgba(20,70,100,.28)"/>` +
            `<path d="M-44 -10H44C38 6 -34 6 -44 -10Z" fill="#fff" stroke="${OUT}" stroke-width="2.8" stroke-linejoin="round"/><path d="M-40 -4H40" stroke="#2a6bb3" stroke-width="4"/>` +
            `<path d="M-34 -10L-30 -30H26L34 -10Z" fill="#cfe9f7" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/><path d="M-30 -30H26L24 -36H-28Z" fill="#2a6bb3" stroke="${OUT}" stroke-width="2.2" stroke-linejoin="round"/><path d="M-10 -28V-10M10 -28V-10" stroke="${OUT}" stroke-width="2"/><path d="M-26 -26l8 0" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>` +
            `<circle cx="-18" cy="-20" r="4.4" fill="#f2c14a" stroke="${OUT}" stroke-width="1.4"/><circle cx="2" cy="-20" r="4.4" fill="#f58fc1" stroke="${OUT}" stroke-width="1.4"/><circle cx="18" cy="-20" r="4.4" fill="#8fcf5a" stroke="${OUT}" stroke-width="1.4"/>` +
            `<path d="M40 -10V-22" stroke="${OUT}" stroke-width="2.4"/><path d="M40 -22L52 -18L40 -14Z" fill="#e5503f" stroke="${OUT}" stroke-width="1.6" stroke-linejoin="round"/>`,
        46
    );
    C.sym(
        'sailboat',
        `<ellipse cx="2" cy="6" rx="30" ry="5" fill="rgba(20,80,120,.25)"/><path d="M-28 -6H28C22 6 -20 6 -28 -6Z" fill="#2a6bb3" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/><path d="M0 -8V-54" stroke="${OUT}" stroke-width="3" stroke-linecap="round"/><path d="M2 -52C20 -40 22 -22 22 -12H2Z" fill="#fff" stroke="${OUT}" stroke-width="2.4" stroke-linejoin="round"/><path d="M-2 -46C-14 -34 -18 -22 -20 -12H-2Z" fill="#f6f1e2" stroke="${OUT}" stroke-width="2.4" stroke-linejoin="round"/>`,
        28
    );
    C.sym(
        'duck',
        `<ellipse cx="2" cy="3" rx="14" ry="3.4" fill="rgba(20,70,100,.25)"/><path d="M-12 -4C-12 4 10 4 12 -4C10 -8 4 -8 0 -6C-6 -8 -12 -8 -12 -4Z" fill="#fff" stroke="${OUT}" stroke-width="2" stroke-linejoin="round"/><circle cx="10" cy="-10" r="6" fill="#5aa86a" stroke="${OUT}" stroke-width="2"/><path d="M15 -10L21 -8L15 -6Z" fill="#f2b53a" stroke="${OUT}" stroke-width="1.4" stroke-linejoin="round"/><circle cx="12" cy="-11" r="1.2" fill="#222"/><path d="M-6 -5C-2 -2 4 -2 6 -5" stroke="#cfd6e6" stroke-width="2" fill="none"/>`,
        12
    );
    C.sym(
        'gull',
        `<path d="M-12 0C-8 -8 -3 -8 0 -2C3 -8 8 -8 12 0" fill="none" stroke="${OUT}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M-12 0C-8 -8 -3 -8 0 -2C3 -8 8 -8 12 0" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        6
    );
    C.sym(
        'icecream',
        `<ellipse cx="6" cy="3" rx="26" ry="5" fill="${SHADOW}"/><path d="M-20 -6L-18 -26H18L20 -6Z" fill="#fff" stroke="${OUT}" stroke-width="2.4" stroke-linejoin="round"/><path d="M-16 -20H16" stroke="#f58fc1" stroke-width="3"/><path d="M-22 -26Q0 -50 22 -26Z" fill="#f58fc1" stroke="${OUT}" stroke-width="2.4" stroke-linejoin="round"/><path d="M-16 -30Q-6 -42 0 -42" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="-12" cy="-4" r="5" fill="#3a3a46" stroke="${OUT}" stroke-width="2"/><circle cx="12" cy="-4" r="5" fill="#3a3a46" stroke="${OUT}" stroke-width="2"/><path d="M0 -50V-60M-6 -56l6 -6l6 6Z" stroke="${OUT}" stroke-width="2" fill="#f2c14a"/>`,
        26,
        [-45, 24]
    );

    C.drawPath({ edge: '#a8503e', sand: '#d97f68', light: '#e8a08a', dot: '#fff4e6' });

    // kanaal met brug
    const sy = 1066;
    const sx = C.pathX(sy);
    const cD = `M-20 ${sy - 10}C70 ${sy - 24} ${sx - 70} ${sy + 12} ${sx} ${sy}C${sx + 70} ${sy - 12} 330 ${sy + 16} 410 ${sy}`;
    C.add(
        'water',
        `<path d="${cD}" fill="none" stroke="rgba(40,50,60,.2)" stroke-width="64" transform="translate(2 5)"/>` +
            `<path d="${cD}" fill="none" stroke="#a9a49d" stroke-width="62"/><path d="${cD}" fill="none" stroke="${OUT}" stroke-width="64" opacity=".0"/>` +
            `<path d="${cD}" fill="none" stroke="#7d786f" stroke-width="54"/><path d="${cD}" fill="none" stroke="#4aa3bf" stroke-width="48"/><path d="${cD}" fill="none" stroke="#7cc9dc" stroke-width="24" opacity=".6"/>` +
            `<path d="${cD}" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="16 44" stroke-linecap="round" transform="translate(0 -8)" opacity=".8"/>` +
            `<path d="${cD}" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="10 50" stroke-dashoffset="22" stroke-linecap="round" transform="translate(0 9)" opacity=".7"/>`
    );
    const ang = C.angleAt(sy);
    C.add(
        'bridge',
        `<g transform="translate(${sx} ${sy}) rotate(${r1(ang)})"><rect x="-44" y="-46" width="88" height="92" rx="4" fill="rgba(40,30,20,.2)" transform="translate(3 5)"/>` +
            `<rect x="-42" y="-46" width="84" height="92" fill="#d97f68" stroke="${OUT}" stroke-width="2.8"/><rect x="-26" y="-46" width="52" height="92" fill="#e8a08a" opacity=".6"/><path d="M0 -40V40" stroke="#fff4e6" stroke-width="3" stroke-dasharray="1 12" stroke-linecap="round"/>` +
            [-42, 34]
                .map(
                    x =>
                        `<rect x="${x}" y="-50" width="8" height="100" fill="#fff" stroke="${OUT}" stroke-width="2.4"/>` +
                        [-40, -20, 0, 20, 40]
                            .map(
                                y =>
                                    `<circle cx="${x + 4}" cy="${y}" r="3.6" fill="#4a4550" stroke="${OUT}" stroke-width="1.2"/>`
                            )
                            .join('')
                )
                .join('') +
            `</g>`
    );
    // vijver
    const pondX = 96;
    const pondY = 1160;
    C.add(
        'water',
        `<ellipse cx="${pondX}" cy="${pondY}" rx="82" ry="44" fill="#c9b98f" stroke="${OUT}" stroke-width="3"/><ellipse cx="${pondX}" cy="${pondY - 2}" rx="74" ry="38" fill="#52b3d2" stroke="#2f86a8" stroke-width="2.4"/><ellipse cx="${pondX - 14}" cy="${pondY - 10}" rx="46" ry="20" fill="#8fd4e8" opacity=".6"/><path d="M${pondX - 40} ${pondY + 14}q8 -4 16 0t16 0M${pondX + 10} ${pondY - 18}q8 -4 16 0" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".85"/><ellipse cx="${pondX + 46}" cy="${pondY + 14}" rx="10" ry="5" fill="#5fae42" stroke="${OUT}" stroke-width="1.6"/><circle cx="${pondX + 46}" cy="${pondY + 12}" r="3.2" fill="#f58fc1" stroke="${OUT}" stroke-width="1.2"/>`
    );

    /* --- plaatsing --- */
    const L = (y, g) => C.left(y, g);
    const R = (y, g) => C.right(y, g);
    C.block(0, 0, 390, 146, 'zee');
    C.block(pondX - 84, pondY - 46, pondX + 84, pondY + 46, 'vijver');
    C.block(0, sy - 34, 390, sy + 34, 'kanaal');
    // park onder
    C.use('tree', 52, 1470, 1.1);
    C.use('bench', 300, 1440, 1);
    C.use('lampG', 270, 1420, 1);
    C.use('flowP', 340, 1480, 0.9);
    C.use('flowY', 120, 1460, 0.9);
    C.use('treeAu', 352, 1360, 1.05);
    C.use('bikeR', 330, 1300, 1);
    C.use('bush', 40, 1335, 0.9);
    C.use('flowW', 74, 1385, 0.9);
    C.use('tree', 356, 1262, 1.0);
    C.use('icecream', 326, 1192, 1);
    C.use('tree', 22, 1296, 1);
    C.use('bench', 48, 1242, 1, { flip: true });
    C.use('duck', pondX - 20, pondY + 4, 1, { force: true });
    C.use('duck', pondX + 22, pondY - 14, 0.8, { force: true, flip: true });
    C.use('bushRed', 56, 1110, 0.8);
    C.use('flowR', 20, 1105, 0.9);
    // kanaal
    C.use('canalboat', 70, sy + 2, 1, { force: true });
    C.use('canalboat', 346, sy - 2, 0.9, { force: true, flip: true });
    C.use('lampG', 312, 1108, 1);
    C.use('lampG', L(sy - 36, 18), sy - 30, 1);
    C.use('bikeB', 310, 1004, 0.9);
    C.use('flowY', 40, 1010, 0.9);
    C.use('tree', 24, 1012, 1.05);
    // markt: kraampjes
    C.use('stallR', 44, 928, 1, { force: true });
    C.use('stallG', 330, 940, 0.95);
    C.use('stallY', 52, 770, 1);
    C.use('stallR', 328, 790, 0.95);
    C.use('bikeY', 38, 858, 0.85);
    C.use('lampG', 360, 850, 1);
    C.use('stallG', 56, 665, 1);
    C.use('bikeR', 150, 710, 0.9);
    C.use('flowP', 340, 706, 0.9);
    C.use('lampG', 220, 650, 1, {});
    C.use('treeAu', 375, 762, 1);
    // stad
    C.use('bldAy', 56, 560, 1, { force: true });
    C.use('bench', 130, 600, 0.9);
    C.use('bldBb', 330, 560, 1, { force: true });
    C.use('bldCc', 56, 470, 1, { force: true });
    C.use('bldAp', 332, 450, 1, { force: true });
    C.use('bldCr', 322, 372, 1, { force: true });
    C.use('torso', 336, 312, 0.85, { force: true });
    C.use('bldAy', 60, 300, 0.9, { force: true });
    C.use('lampG', 255, 330, 1);
    C.use('lampG', 108, 255, 1);
    C.use('bikeB', 300, 262, 0.9);
    C.use('bench', 310, 218, 1);
    C.use('bikeY', 88, 218, 0.9);
    C.use('flowP', 288, 190, 0.9);
    C.use('lampG', 276, 160, 1);
    C.use('lampG', 130, 160, 1);
    // zee
    C.use('sailboat', 80, 122, 0.8, { force: true });
    C.use('sailboat', 330, 128, 0.7, { force: true });
    C.use('gull', 160, 30, 1, { force: true });
    C.use('gull', 220, 50, 0.8, { force: true });
    C.use('gull', 36, 60, 0.7, { force: true });

    C.scatter(['flowW', 'flowY', 'flowP', 'flowR'], 14, { seed: 3, y0: 880, s: [0.75, 1] });
    C.scatter(['tuft'], 40, { seed: 13, y0: 860, s: [0.8, 1.15], spread: 0.35, gap: 6 });

    C.require(
        'torso',
        'stallR',
        'stallG',
        'canalboat',
        'bldAy',
        'bldCr',
        'bikeR',
        'lampG',
        'duck',
        'sailboat'
    );
    return {
        name: 'Malmö',
        sky: '#bfe6f8',
        svg: C.out(),
        nodes,
        warnings: C.warnings,
        notes: C.notes
    };
}

/* ======================================================================
 * AMSTERDAM
 * ====================================================================== */

/** grachtenpand: smal, baksteen via currentColor, gevel: step | bell | neck | cornice */
function symCanalHouse(pid, w, floors, kind) {
    const hw = w / 2;
    const h = floors * 22 + 4;
    const e = (d, fill = 'currentColor') =>
        `<path d="${d}" fill="${fill}" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/>`;
    let gable = '';
    let gh = 0;
    if (kind === 'step') {
        gh = 24;
        gable = e(
            `M${-hw} ${-h}V${-h - 7}H${-hw + 5}V${-h - 14}H${-hw + 10}V${-h - 21}H${-hw + 15}V${-h - 28}H${hw - 15}V${-h - 21}H${hw - 10}V${-h - 14}H${hw - 5}V${-h - 7}H${hw}V${-h}Z`
        );
        gh = 28;
    } else if (kind === 'bell') {
        gh = 34;
        gable = e(
            `M${-hw} ${-h}C${-hw} ${-h - 10} ${-hw + 7} ${-h - 12} ${-hw + 8} ${-h - 20}C${-hw + 8} ${-h - 34} ${-4} ${-h - 36} 0 ${-h - 36}C4 ${-h - 36} ${hw - 8} ${-h - 34} ${hw - 8} ${-h - 20}C${hw - 7} ${-h - 12} ${hw} ${-h - 10} ${hw} ${-h}Z`
        );
    } else if (kind === 'neck') {
        gh = 36;
        gable = e(
            `M${-hw} ${-h}C${-hw + 2} ${-h - 8} ${-10} ${-h - 6} ${-10} ${-h - 16}V${-h - 28}C${-10} ${-h - 34} ${-4} ${-h - 36} 0 ${-h - 36}C4 ${-h - 36} 10 ${-h - 34} 10 ${-h - 28}V${-h - 16}C10 ${-h - 6} ${hw - 2} ${-h - 8} ${hw} ${-h}Z`
        );
    } else {
        gh = 16;
        gable = e(`M${-hw - 2} ${-h}L0 ${-h - 16}L${hw + 2} ${-h}Z`);
    }
    return (
        `<ellipse cx="8" cy="3" rx="${hw + 8}" ry="5" fill="${SHADOW}"/>` +
        gable +
        `<path d="M0 ${-h - gh}V${-h - gh - 6}H9M9 ${-h - gh - 6}V${-h - gh}" fill="none" stroke="${OUT}" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="${-h - gh + 1}" r="1.6" fill="${OUT}"/>` +
        `<rect x="${-hw}" y="${-h}" width="${w}" height="${h}" fill="currentColor" stroke="${OUT}" stroke-width="2.8"/>` +
        `<rect x="${-hw}" y="${-h}" width="${w}" height="${h}" fill="url(#am-brick)"/>` +
        `<rect x="${-hw}" y="${-h}" width="5" height="${h}" fill="#fff" opacity=".2"/><rect x="${hw - 7}" y="${-h}" width="7" height="${h}" fill="#000" opacity=".12"/>` +
        `<rect x="${-hw}" y="${-h}" width="${w}" height="${h - 22}" fill="url(#${pid})"/>` +
        `<rect x="${-hw}" y="-22" width="${w}" height="22" fill="currentColor"/><rect x="${-hw}" y="-22" width="${w}" height="22" fill="url(#am-brick)"/><path d="M${-hw} -22H${hw}" stroke="#f4ead2" stroke-width="2.6"/>` +
        `<rect x="${-7}" y="-20" width="14" height="20" rx="1.5" fill="#3a5a4a" stroke="#fff" stroke-width="2.4"/><rect x="${-7}" y="-20" width="14" height="20" rx="1.5" fill="none" stroke="${OUT}" stroke-width="1.2"/><circle cx="4" cy="-9" r="1.4" fill="#ffd84a"/>` +
        (w > 50
            ? `<rect x="${-hw + 6}" y="-18" width="14" height="14" fill="#cfe6f5" stroke="#fff" stroke-width="2.4"/>`
            : `<rect x="${-hw + 3}" y="-3" width="${w - 6}" height="3" fill="#e8e0d0" stroke="${OUT}" stroke-width="1.2"/>`)
    );
}

function amsterdam() {
    const id = 'am';
    const nodes = makeNodes([210, 150, 250, 200, 130, 240, 280, 190, 130, 230, 200]);
    const C = makeCtx(id, nodes, { start: [212, 1560], end: [200, 112] });
    const ELM = {
        leaf: '#74b95a',
        leafD: '#4a8d44',
        leafL: '#9bd668',
        trunk: '#8a7a6c',
        trunkD: '#675a4e'
    };

    C.add(
        'ground',
        `<defs><pattern id="${id}-cob" width="18" height="12" patternUnits="userSpaceOnUse"><rect width="18" height="12" fill="#ddd2c2"/><path d="M0 0H18M0 6H18M4 0V6M13 6V12" stroke="#cfc3b1" stroke-width="1.2"/></pattern>` +
            `<pattern id="${id}-brick" width="12" height="6" patternUnits="userSpaceOnUse"><rect width="12" height="6" fill="none"/><path d="M0 3H12M3 0V3M9 3V6" stroke="#000" stroke-width="1" opacity=".16"/></pattern>` +
            `<pattern id="${id}-w" width="20" height="22" patternUnits="userSpaceOnUse"><rect x="4" y="3" width="12" height="16" fill="#cfe6f5" stroke="#fff" stroke-width="2.2"/><path d="M10 3V19M4 11H16" stroke="#fff" stroke-width="1.6"/><path d="M4 3H16V19H4Z" fill="none" stroke="${OUT}" stroke-width=".9" opacity=".7"/></pattern></defs>` +
            `<rect width="390" height="1500" fill="url(#${id}-cob)"/>`
    );
    groundBlobs(C, '#e9dfd0', 12, 61, { op: 0.35, y0: 120 });
    groundBlobs(C, '#c9bca8', 10, 63, { op: 0.25, y0: 120 });

    C.sym('elm', symTree(`${id}-t1`, ELM), 22, [-85, 46]);
    C.sym('bush', symBush({ ...ELM, clip: `${id}-b1`, leafD: '#4a8d44' }), 24);
    C.sym('tuft', symTuft('#6aa854', '#8fcd6e'), 8);
    C.sym('bench', symBench(), 26);
    C.sym('lamp', symLamp(), 8, [-92, 12]);
    C.alias('lampK', 'lamp', '#2b2b33');
    C.sym('bike', symBike(), 32);
    C.alias('bikeK', 'bike', '#2b2b33');
    C.alias('bikeR', 'bike', '#e5503f');
    C.alias('bikeB', 'bike', '#3f7fd0');
    C.alias('bikeG', 'bike', '#4aa86a');
    C.sym(
        'bikes',
        `<use href="#${id}-bike" transform="translate(-30 -6)" color="#e5503f"/><use href="#${id}-bike" transform="translate(0 0)" color="#2b2b33"/><use href="#${id}-bike" transform="translate(30 6)" color="#3f7fd0"/>`,
        50
    );

    // grachtenpanden, losse en rijtjes
    C.sym('hStep', symCanalHouse(`${id}-w`, 40, 5, 'step'), 22);
    C.sym('hBell', symCanalHouse(`${id}-w`, 40, 4, 'bell'), 22);
    C.sym('hNeck', symCanalHouse(`${id}-w`, 40, 5, 'neck'), 22);
    C.sym('hCor', symCanalHouse(`${id}-w`, 40, 4, 'cornice'), 22);
    C.sym('hBig', symCanalHouse(`${id}-w`, 80, 4, 'step'), 40);
    const row = items =>
        items
            .map(
                ([n, x, c]) =>
                    `<use href="#${id}-${n}" transform="translate(${x} 0)" color="${c}"/>`
            )
            .join('');
    const rowTop = [-110, 62];
    C.sym(
        'rowA',
        row([
            ['hStep', -40, '#b5523b'],
            ['hBell', 0, '#e0a95a'],
            ['hNeck', 40, '#6f93b5']
        ]),
        60,
        rowTop
    );
    C.sym(
        'rowB',
        row([
            ['hBell', -40, '#7a9a74'],
            ['hStep', 0, '#c9703f'],
            ['hCor', 40, '#e8d9b5']
        ]),
        60,
        rowTop
    );
    C.sym(
        'rowC',
        row([
            ['hNeck', -40, '#9a4a3a'],
            ['hCor', 0, '#e5c06a'],
            ['hStep', 40, '#5f86a6']
        ]),
        60,
        rowTop
    );
    C.sym(
        'rowD',
        row([
            ['hCor', -40, '#d9806a'],
            ['hNeck', 0, '#7d5f4a'],
            ['hBell', 40, '#d9c18a']
        ]),
        60,
        rowTop
    );

    // tulpen
    C.sym(
        'tulip',
        `<path d="M0 0V-14" stroke="#4f9a3b" stroke-width="2.4" stroke-linecap="round"/><path d="M0 -3Q-8 -8 -8 -16Q-3 -10 0 -6M0 -3Q8 -8 8 -16Q3 -10 0 -6" fill="#5fae42" stroke="${OUT}" stroke-width="1.2" stroke-linejoin="round"/><path d="M-5 -16C-6 -24 -2 -27 0 -27C2 -27 6 -24 5 -16C3 -12 -3 -12 -5 -16Z" fill="currentColor" stroke="${OUT}" stroke-width="1.6" stroke-linejoin="round"/><path d="M-1 -26L0 -18L2 -26" fill="none" stroke="${OUT}" stroke-width="1" opacity=".5"/>`,
        6
    );
    const tb = [-26, -13, 0, 13, 26]
        .map(
            (x, i) =>
                `<use href="#${id}-tulip" transform="translate(${x} ${-12 - (i % 2) * 2})" color="${['#e5503f', '#f2c14a', '#f58fc1', '#9a5ad8', '#ff8a3c'][i]}"/>`
        )
        .join('');
    C.sym(
        'tbox',
        `<ellipse cx="6" cy="3" rx="40" ry="6" fill="${SHADOW}"/>` +
            tb +
            `<rect x="-36" y="-14" width="72" height="16" rx="2" fill="#7b5a44" stroke="${OUT}" stroke-width="2.4"/><rect x="-36" y="-14" width="72" height="5" fill="#9a7458" stroke="${OUT}" stroke-width="2"/><path d="M-30 -6V0M0 -6V0M30 -6V0" stroke="${OUT}" stroke-width="1.4" opacity=".5"/>`,
        38
    );
    C.sym(
        'tubs',
        `<ellipse cx="4" cy="3" rx="30" ry="5" fill="${SHADOW}"/>` +
            [-18, 0, 18]
                .map(
                    (x, i) =>
                        `<use href="#${id}-tulip" transform="translate(${x} -14)" color="${['#e5503f', '#f2c14a', '#f58fc1'][i]}"/><path d="M${x - 8} -14H${x + 8}L${x + 6} 0H${x - 6}Z" fill="#c8704f" stroke="${OUT}" stroke-width="1.8" stroke-linejoin="round"/>`
                )
                .join(''),
        26
    );

    // boten
    C.sym(
        'tourboat',
        `<ellipse cx="2" cy="4" rx="46" ry="6" fill="rgba(20,70,90,.3)"/><path d="M-44 -10H44C38 6 -34 6 -44 -10Z" fill="#2b4a5a" stroke="${OUT}" stroke-width="2.8" stroke-linejoin="round"/><path d="M-40 -6H40" stroke="#f2c14a" stroke-width="3"/>` +
            `<path d="M-34 -10L-30 -30H26L34 -10Z" fill="#cfe9f7" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/><path d="M-30 -30H26L24 -35H-28Z" fill="#fff" stroke="${OUT}" stroke-width="2.2" stroke-linejoin="round"/><path d="M-10 -28V-10M10 -28V-10" stroke="${OUT}" stroke-width="2"/><path d="M-26 -26l8 0" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>` +
            `<circle cx="-18" cy="-20" r="4.4" fill="#e5503f" stroke="${OUT}" stroke-width="1.4"/><circle cx="2" cy="-20" r="4.4" fill="#f2c14a" stroke="${OUT}" stroke-width="1.4"/><circle cx="18" cy="-20" r="4.4" fill="#f58fc1" stroke="${OUT}" stroke-width="1.4"/><path d="M40 -10V-22" stroke="${OUT}" stroke-width="2.4"/><path d="M40 -22L52 -18L40 -14Z" fill="#e5503f" stroke="${OUT}" stroke-width="1.6" stroke-linejoin="round"/>`,
        46
    );
    C.sym(
        'houseboat',
        `<ellipse cx="2" cy="4" rx="44" ry="6" fill="rgba(20,70,90,.3)"/><path d="M-42 -8H42L36 6H-36Z" fill="#3b5a5e" stroke="${OUT}" stroke-width="2.8" stroke-linejoin="round"/>` +
            `<rect x="-34" y="-34" width="62" height="26" fill="#f0e2c0" stroke="${OUT}" stroke-width="2.6"/><path d="M-38 -34L-30 -46H24L32 -34Z" fill="#5aa05a" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round"/><path d="M-32 -38H28" stroke="#8fcf5a" stroke-width="3" stroke-linecap="round" opacity=".7"/>` +
            [-26, -8, 10]
                .map(
                    x =>
                        `<rect x="${x}" y="-28" width="12" height="14" fill="#cfe6f5" stroke="#fff" stroke-width="2"/><rect x="${x}" y="-28" width="12" height="14" fill="none" stroke="${OUT}" stroke-width="1.2"/>`
                )
                .join('') +
            `<rect x="14" y="-58" width="7" height="14" fill="#a8523a" stroke="${OUT}" stroke-width="2"/><circle cx="20" cy="-68" r="5" fill="#fff" opacity=".6"/><circle cx="26" cy="-78" r="6" fill="#fff" opacity=".45"/>` +
            `<path d="M30 -8V-16H42" fill="none" stroke="${OUT}" stroke-width="2"/><use href="#${id}-tulip" transform="translate(-38 -8)" color="#e5503f"/><use href="#${id}-tulip" transform="translate(36 -8)" color="#f2c14a"/>`,
        44,
        [-50, 40]
    );
    C.sym(
        'duck',
        `<ellipse cx="2" cy="3" rx="14" ry="3.4" fill="rgba(20,70,100,.25)"/><path d="M-12 -4C-12 4 10 4 12 -4C10 -8 4 -8 0 -6C-6 -8 -12 -8 -12 -4Z" fill="#fff" stroke="${OUT}" stroke-width="2" stroke-linejoin="round"/><circle cx="10" cy="-10" r="6" fill="#5aa86a" stroke="${OUT}" stroke-width="2"/><path d="M15 -10L21 -8L15 -6Z" fill="#f2b53a" stroke="${OUT}" stroke-width="1.4" stroke-linejoin="round"/><circle cx="12" cy="-11" r="1.2" fill="#222"/>`,
        12
    );
    // fietsenstalling-stuk, ton met bloemen
    C.sym(
        'cheese',
        `<ellipse cx="6" cy="3" rx="30" ry="5" fill="${SHADOW}"/><path d="M-26 0V-14L26 -14V0Z" fill="#c58a52" stroke="${OUT}" stroke-width="2.4" stroke-linejoin="round"/><path d="M-20 -14C-20 -28 -2 -30 0 -30C2 -30 20 -28 20 -14Z" fill="#f2c14a" stroke="${OUT}" stroke-width="2.4" stroke-linejoin="round"/><path d="M-20 -14H20" stroke="${OUT}" stroke-width="2"/><circle cx="-8" cy="-20" r="2.6" fill="#e0a52a"/><circle cx="6" cy="-22" r="2" fill="#e0a52a"/><circle cx="-12" cy="-6" r="4" fill="#f2c14a" stroke="${OUT}" stroke-width="1.6"/><circle cx="2" cy="-6" r="4" fill="#f2c14a" stroke="${OUT}" stroke-width="1.6"/><circle cx="16" cy="-6" r="4" fill="#f2c14a" stroke="${OUT}" stroke-width="1.6"/>`,
        30
    );

    C.drawPath({ edge: '#7b6d62', sand: '#b0a396', light: '#c8bdb0', dot: '#ffffff' });

    // grachten met bruggen
    const canals = [{ y: 1062 }, { y: 687 }, { y: 180 }];
    canals.forEach(({ y }) => {
        const px = C.pathX(y);
        const d = `M-20 ${y - 6}C80 ${y - 18} ${px - 80} ${y + 10} ${px} ${y}C${px + 80} ${y - 10} 320 ${y + 14} 410 ${y}`;
        C.add(
            'water',
            `<path d="${d}" fill="none" stroke="rgba(50,40,30,.22)" stroke-width="62" transform="translate(2 5)"/>` +
                `<path d="${d}" fill="none" stroke="#a79a8e" stroke-width="60"/><path d="${d}" fill="none" stroke="#7b6d62" stroke-width="52"/>` +
                `<path d="${d}" fill="none" stroke="#5e9e98" stroke-width="46"/><path d="${d}" fill="none" stroke="#86c2b4" stroke-width="22" opacity=".6"/>` +
                `<path d="${d}" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="14 46" stroke-linecap="round" transform="translate(0 -8)" opacity=".75"/>` +
                `<path d="${d}" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="10 50" stroke-dashoffset="20" stroke-linecap="round" transform="translate(0 9)" opacity=".6"/>`
        );
        const ang = C.angleAt(y);
        const post = (x, yy) =>
            `<rect x="${x - 3}" y="${yy - 16}" width="6" height="18" fill="#2b2b33" stroke="${OUT}" stroke-width="1.6"/><circle cx="${x}" cy="${yy - 20}" r="4.4" fill="#fff3b0" stroke="${OUT}" stroke-width="1.8"/>`;
        C.add(
            'bridge',
            `<g transform="translate(${px} ${y}) rotate(${r1(ang)})"><rect x="-44" y="-44" width="88" height="90" rx="4" fill="rgba(40,30,20,.22)" transform="translate(3 5)"/>` +
                `<rect x="-42" y="-44" width="84" height="88" fill="#b0a396" stroke="${OUT}" stroke-width="2.8"/><rect x="-22" y="-44" width="44" height="88" fill="#c8bdb0" opacity=".7"/><path d="M0 -38V38" stroke="#fff" stroke-width="3" stroke-dasharray="1 12" stroke-linecap="round"/>` +
                [-42, 34]
                    .map(
                        x =>
                            `<rect x="${x}" y="-46" width="8" height="92" fill="#b5523b" stroke="${OUT}" stroke-width="2.4"/><rect x="${x - 1}" y="-46" width="10" height="5" fill="#f4ead2" stroke="${OUT}" stroke-width="1.4"/><rect x="${x - 1}" y="41" width="10" height="5" fill="#f4ead2" stroke="${OUT}" stroke-width="1.4"/>`
                    )
                    .join('') +
                post(-38, -40) +
                post(38, -40) +
                post(-38, 44) +
                post(38, 44) +
                `</g>`
        );
    });

    // thuis: raam met kattenmand, bovenaan
    const hx = 125;
    const hwid = 150;
    const home =
        `<ellipse cx="${hx + hwid / 2 + 8}" cy="106" rx="${hwid / 2 + 14}" ry="8" fill="${SHADOW}"/>` +
        `<path d="M${hx} 104V-6H${hx + hwid}V104Z" fill="#c9704c" stroke="${OUT}" stroke-width="3"/><path d="M${hx} 104V-6H${hx + hwid}V104Z" fill="url(#${id}-brick)"/><rect x="${hx}" y="-6" width="9" height="110" fill="#fff" opacity=".18"/><rect x="${hx + hwid - 9}" y="-6" width="9" height="110" fill="#000" opacity=".12"/>` +
        // raamomlijsting en gordijnen
        `<rect x="${hx + 14}" y="4" width="${hwid - 28}" height="66" rx="3" fill="#fff" stroke="${OUT}" stroke-width="2.8"/>` +
        `<clipPath id="${id}-wc"><rect x="${hx + 20}" y="10" width="${hwid - 40}" height="54"/></clipPath>` +
        `<rect x="${hx + 20}" y="10" width="${hwid - 40}" height="54" fill="#ffe3a0"/><g clip-path="url(#${id}-wc)">` +
        `<radialGradient id="${id}-glow" cx=".5" cy=".7" r=".7"><stop offset="0" stop-color="#fff6cf"/><stop offset="1" stop-color="#ffd27a"/></radialGradient><rect x="${hx + 20}" y="10" width="${hwid - 40}" height="54" fill="url(#${id}-glow)"/>` +
        Array.from(
            { length: 9 },
            (_, i) =>
                `<path d="M${hx + 24 + i * 12} 10V64" stroke="#f0b868" stroke-width="3" opacity=".35"/>`
        ).join('') +
        `<path d="M${hx + 52} 12V6M${hx + 52} 12C${hx + 44} 18 ${hx + 44} 24 ${hx + 52} 28C${hx + 60} 24 ${hx + 60} 18 ${hx + 52} 12Z" fill="#fff6cf" stroke="${OUT}" stroke-width="1.6"/>` +
        // mand met hoge rug
        `<ellipse cx="${hx + 76}" cy="60" rx="34" ry="8" fill="rgba(80,40,10,.25)"/>` +
        `<path d="M${hx + 42} 48C${hx + 40} 24 ${hx + 112} 24 ${hx + 110} 48Z" fill="#b57a38" stroke="${OUT}" stroke-width="2.4" stroke-linejoin="round"/><path d="M${hx + 50} 44C${hx + 52} 32 ${hx + 100} 32 ${hx + 102} 44M${hx + 46} 40C${hx + 50} 28 ${hx + 102} 28 ${hx + 106} 40" fill="none" stroke="#8a5a2a" stroke-width="1.3"/>` +
        `<path d="M${hx + 42} 46C${hx + 42} 62 ${hx + 110} 62 ${hx + 110} 46C${hx + 100} 40 ${hx + 52} 40 ${hx + 42} 46Z" fill="#c8924f" stroke="${OUT}" stroke-width="2.4" stroke-linejoin="round"/>` +
        `<ellipse cx="${hx + 76}" cy="46" rx="34" ry="8" fill="#e6b672" stroke="${OUT}" stroke-width="2.4"/><ellipse cx="${hx + 76}" cy="47" rx="26" ry="5.6" fill="#f58fa8"/><ellipse cx="${hx + 70}" cy="45.4" rx="14" ry="3" fill="#f9b7c6"/>` +
        `<g fill="#fff" opacity=".95"><ellipse cx="${hx + 78}" cy="48" rx="4.4" ry="2.8"/><circle cx="${hx + 72}" cy="44" r="1.6"/><circle cx="${hx + 76}" cy="42.4" r="1.6"/><circle cx="${hx + 80.5}" cy="42.4" r="1.6"/><circle cx="${hx + 84.6}" cy="44" r="1.6"/></g>` +
        `<path d="M${hx + 48} 50l4 8M${hx + 58} 53l3 8M${hx + 70} 54v8M${hx + 82} 54l-2 8M${hx + 94} 52l-4 8M${hx + 104} 49l-6 8" stroke="#8a5a2a" stroke-width="1.4" stroke-linecap="round"/><path d="M${hx + 46} 52C${hx + 70} 58 ${hx + 90} 58 ${hx + 106} 52" fill="none" stroke="#8a5a2a" stroke-width="1.4"/>` +
        `<circle cx="${hx + 118}" cy="56" r="6" fill="#e5503f" stroke="${OUT}" stroke-width="1.8"/><path d="M${hx + 112} 54Q${hx + 118} 58 ${hx + 124} 54M${hx + 114} 59Q${hx + 120} 52 ${hx + 123} 58" fill="none" stroke="#b83a2c" stroke-width="1"/>` +
        `<path d="M${hx + 32} 56q-6 2 -2 8" stroke="#e5503f" stroke-width="1.6" fill="none"/><path d="M${hx + 22} 10C${hx + 34} 16 ${hx + 38} 34 ${hx + 32} 64H${hx + 20}Z" fill="#e5503f" stroke="${OUT}" stroke-width="1.8"/><path d="M${hx + hwid - 22} 10C${hx + hwid - 34} 16 ${hx + hwid - 38} 34 ${hx + hwid - 32} 64H${hx + hwid - 20}Z" fill="#e5503f" stroke="${OUT}" stroke-width="1.8"/><path d="M${hx + 26} 14C${hx + 30} 24 ${hx + 30} 40 ${hx + 28} 60M${hx + hwid - 26} 14C${hx + hwid - 30} 24 ${hx + hwid - 30} 40 ${hx + hwid - 28} 60" stroke="#fff" stroke-width="2" fill="none" opacity=".5"/></g>` +
        `<path d="M${hx + 20} 10H${hx + hwid - 20}" stroke="${OUT}" stroke-width="1.4" opacity=".7"/>` +
        `<path d="M${hx + 24} 14L${hx + 50} 24M${hx + 24} 28L${hx + 38} 34" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".55"/>` +
        `<rect x="${hx + 8}" y="68" width="${hwid - 16}" height="8" rx="2" fill="#f4ead2" stroke="${OUT}" stroke-width="2.4"/>` +
        // bloembakje + deur
        `<rect x="${hx + 22}" y="62" width="30" height="10" rx="2" fill="#c8704f" stroke="${OUT}" stroke-width="2"/><use href="#${id}-tulip" transform="translate(${hx + 30} 62)" color="#f2c14a"/><use href="#${id}-tulip" transform="translate(${hx + 42} 62)" color="#e5503f"/>` +
        `<rect x="${hx + hwid / 2 - 15}" y="78" width="30" height="26" rx="2" fill="#3a5a4a" stroke="#fff" stroke-width="3"/><rect x="${hx + hwid / 2 - 15}" y="78" width="30" height="26" rx="2" fill="none" stroke="${OUT}" stroke-width="1.6"/><path d="M${hx + hwid / 2} 78V104" stroke="${OUT}" stroke-width="1.4"/><circle cx="${hx + hwid / 2 + 8}" cy="92" r="1.8" fill="#ffd84a"/><rect x="${hx + hwid / 2 - 18}" y="102" width="36" height="5" fill="#d8d0c4" stroke="${OUT}" stroke-width="1.8"/>` +
        `<path d="M${hx + 14} 14L${hx - 6} 22M${hx + hwid - 14} 14L${hx + hwid + 6} 22" stroke="${OUT}" stroke-width="0"/>`;
    C.add('over', home);

    /* --- plaatsing --- */
    const rowTop2 = 104;
    C.use('rowB', 62, rowTop2, 1, { force: true });
    C.use('rowC', 334, rowTop2, 1, { force: true });
    C.use('lampK', 152, 216, 1);
    C.use('lampK', 300, 218, 1);
    // canal 180
    C.use('tourboat', 100, 184, 1, { force: true });
    C.use('houseboat', 332, 184, 1, { force: true });
    C.use('duck', 220, 188, 0.9, { force: true });
    // rij links/rechts erboven
    C.use('rowA', 60, 336, 0.95, { force: true });
    C.use('rowD', 336, 344, 0.95, { force: true });
    C.use('bench', 318, 388, 1);
    C.use('tbox', 48, 392, 0.9);
    C.use('elm', 348, 460, 0.85);
    C.use('rowC', 62, 560, 0.95, { force: true });
    C.use('bikes', 340, 520, 0.9);
    C.use('tubs', 60, 600, 1);
    C.use('elm', 36, 640, 0.85);
    // canal 687
    C.use('houseboat', 54, 689, 1, { force: true });
    C.use('tourboat', 156, 692, 0.95, { force: true });
    C.use('duck', 360, 690, 0.9, { force: true });
    C.use('elm', 362, 752, 0.85);
    C.use('cheese', 340, 790, 1);
    C.use('elm', 36, 830, 0.85);
    C.use('bikes', 46, 926, 0.9);
    C.use('bench', 350, 882, 1);
    C.use('rowB', 336, 960, 0.95, { force: true });
    C.use('tbox', 40, 984, 0.9);
    C.use('lampK', 270, 1008, 1);
    // canal 1062
    C.use('houseboat', 58, 1066, 1, { force: true });
    C.use('tourboat', 336, 1064, 0.95, { force: true, flip: true });
    C.use('duck', 160, 1068, 0.8, { force: true });
    C.use('rowD', 60, 1218, 0.95, { force: true });
    C.use('elm', 358, 1166, 0.85);
    C.use('bikes', 330, 1210, 0.9);
    C.use('lampK', 322, 1122, 1);
    C.use('rowA', 334, 1334, 0.95, { force: true });
    C.use('elm', 40, 1290, 0.85);
    C.use('tbox', 80, 1370, 0.9);
    C.use('bench', 52, 1420, 1);
    C.use('rowC', 62, 1478, 1, { force: true });
    C.use('rowD', 334, 1458, 1, { force: true });
    C.use('tubs', 136, 1496, 1);
    C.use('lampK', 270, 1470, 1);
    C.use('bikeB', 290, 1496, 0.9);

    C.scatter(['tuft'], 30, { seed: 13, y0: 200, s: [0.8, 1.1], spread: 0.35, gap: 6 });

    C.require('rowA', 'rowB', 'tourboat', 'houseboat', 'bikes', 'tbox', 'lampK', 'elm');
    return {
        name: 'Amsterdam',
        sky: '#c9704c',
        svg: C.out(),
        nodes,
        warnings: C.warnings,
        notes: C.notes
    };
}

export const WORLD_ART = {
    volkstuin: strip(volkstuin()),
    camper: strip(camper()),
    sanktolof: strip(sanktolof()),
    malmo: strip(malmo()),
    amsterdam: strip(amsterdam())
};

function strip(w) {
    return { name: w.name, sky: w.sky, svg: w.svg, nodes: w.nodes };
}
