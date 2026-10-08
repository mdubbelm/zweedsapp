/**
 * De vijf werelden waar Cleo met August doorheen reist.
 * Per wereld 8 challenges, 2 kisten en aan het eind de masterchallenge.
 */

export const WORLDS = [
    {
        id: 'volkstuin',
        title: 'De volkstuin',
        sv: 'Kolonilotten',
        story: 'Cleo snuffelt tussen de tomaten. August heeft de gieter.',
        canNow: 'Je kunt vertellen wat er in jullie tuin groeit en wie er komt kijken.'
    },
    {
        id: 'camper',
        title: 'De camper',
        sv: 'Husbilen',
        story: 'Cleo ligt op het dashboard. August houdt de kaart vast.',
        canNow: 'Je kunt de weg vragen en zeggen waar jullie vannacht staan.'
    },
    {
        id: 'sanktolof',
        title: 'Sankt Olof',
        sv: 'Sankt Olof',
        story: 'Rode huisjes, appelbomen en koolzaad tot aan de zee.',
        canNow: 'Je kunt in het dorpswinkeltje bestellen en over het weer praten.'
    },
    {
        id: 'malmo',
        title: 'Malmö',
        sv: 'Malmö',
        story: 'Cleo kijkt vanaf een bankje naar de Turning Torso.',
        canNow: 'Je kunt vertellen wat jullie gisteren in de stad hebben gedaan.'
    },
    {
        id: 'amsterdam',
        title: 'Amsterdam',
        sv: 'Amsterdam',
        story: 'Weer thuis aan de gracht, maar nu in het Zweeds.',
        canNow: 'Je kunt een Zweedse gast rondleiden door jullie eigen stad.'
    }
];

export const CHALLENGES_PER_WORLD = 8;
/** Na welke challenge (1-based) er een kist op het pad staat. */
export const CHEST_AFTER = [3, 6];

export function worldById(id) {
    return WORLDS.find(w => w.id === id);
}

/** Lege voortgang voor een wereld. */
export function emptyWorldProgress() {
    return { stars: [], chests: [false, false], master: null };
}

/**
 * Waar staat de speler nu? De eerste wereld waarvan de masterchallenge nog
 * niet gehaald is.
 */
export function currentWorld(path) {
    for (const w of WORLDS) {
        const p = path[w.id];
        if (!p || !p.master) {
            return w.id;
        }
    }
    return WORLDS[WORLDS.length - 1].id;
}

/**
 * De volgende stap op het pad van een wereld:
 * { type: 'challenge', index } | { type: 'chest', index } | { type: 'master' } | { type: 'done' }
 */
export function nextStep(progress) {
    const p = progress || emptyWorldProgress();
    const done = p.stars.length;
    for (let c = 0; c < CHEST_AFTER.length; c++) {
        if (done >= CHEST_AFTER[c] && !p.chests[c]) {
            return { type: 'chest', index: c };
        }
    }
    if (done < CHALLENGES_PER_WORLD) {
        return { type: 'challenge', index: done };
    }
    if (!p.master) {
        return { type: 'master' };
    }
    return { type: 'done' };
}

/** Hoeveel challenges nog tot de eerstvolgende kist of de trofee. */
export function stepsToNextPrize(progress) {
    const p = progress || emptyWorldProgress();
    const done = p.stars.length;
    const nextChest = CHEST_AFTER.find((n, i) => !p.chests[i] && n > done);
    if (nextChest) {
        return { prize: 'chest', left: nextChest - done };
    }
    return { prize: 'master', left: Math.max(0, CHALLENGES_PER_WORLD - done) };
}
