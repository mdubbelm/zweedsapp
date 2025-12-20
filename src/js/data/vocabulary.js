/**
 * Vocabulary System
 * Tier-based vocabulary for progressive learning
 *
 * Based on Learning Specialist (Lotte) recommendations:
 * - Explicit Before Implicit (EBI): words introduced before exercises
 * - Tier system: unlock vocabulary progressively
 * - Difficulty scoring based on verb group and frequency
 *
 * Verb Groups (Swedish):
 * - Group 1 (-ar): Regular, stam + ar (tala → talar)
 * - Group 2 (-er): Regular, stam + er (läsa → läser)
 * - Group 3 (kort): Short verbs, stam + r (bo → bor)
 * - Group 4 (onregelmatig): Irregular (vara → är, ha → har)
 *
 * Difficulty Score:
 * - Group 1: +5 (easiest pattern)
 * - Group 2: +10
 * - Group 3: +15 (vowel changes common)
 * - Group 4: +30 (irregular, must memorize)
 * - Low frequency: +15
 *
 * Score → Level:
 * - ≤15 = Easy
 * - ≤35 = Medium
 * - >35 = Hard
 */

/**
 * Verb vocabulary with conjugation data
 * Each verb includes: infinitive, present, past, group, dutch translation
 */
export const verbs = {
    // === TIER 1: Absolute Basics ===
    // Unlocked from start - essential verbs everyone needs
    tier1: [
        {
            id: 'vara',
            infinitive: 'att vara',
            present: 'är',
            past: 'var',
            supine: 'varit',
            group: 4,
            dutch: 'zijn',
            difficulty: 'easy', // Despite being irregular, it's so common
            frequency: 'high'
        },
        {
            id: 'ha',
            infinitive: 'att ha',
            present: 'har',
            past: 'hade',
            supine: 'haft',
            group: 4,
            dutch: 'hebben',
            difficulty: 'easy',
            frequency: 'high'
        },
        {
            id: 'bo',
            infinitive: 'att bo',
            present: 'bor',
            past: 'bodde',
            supine: 'bott',
            group: 3,
            dutch: 'wonen',
            difficulty: 'easy',
            frequency: 'high'
        },
        {
            id: 'tala',
            infinitive: 'att tala',
            present: 'talar',
            past: 'talade',
            supine: 'talat',
            group: 1,
            dutch: 'praten',
            difficulty: 'easy',
            frequency: 'high'
        }
    ],

    // === TIER 2: Daily Essentials ===
    // Unlocked after 20 completed exercises
    tier2: [
        {
            id: 'lasa',
            infinitive: 'att läsa',
            present: 'läser',
            past: 'läste',
            supine: 'läst',
            group: 2,
            dutch: 'lezen',
            difficulty: 'easy',
            frequency: 'high'
        },
        {
            id: 'skriva',
            infinitive: 'att skriva',
            present: 'skriver',
            past: 'skrev',
            supine: 'skrivit',
            group: 4, // Irregular past tense
            dutch: 'schrijven',
            difficulty: 'medium',
            frequency: 'high'
        },
        {
            id: 'ata',
            infinitive: 'att äta',
            present: 'äter',
            past: 'åt',
            supine: 'ätit',
            group: 4, // Irregular past tense
            dutch: 'eten',
            difficulty: 'medium',
            frequency: 'high'
        },
        {
            id: 'arbeta',
            infinitive: 'att arbeta',
            present: 'arbetar',
            past: 'arbetade',
            supine: 'arbetat',
            group: 1,
            dutch: 'werken',
            difficulty: 'easy',
            frequency: 'high'
        },
        {
            id: 'fraga',
            infinitive: 'att fråga',
            present: 'frågar',
            past: 'frågade',
            supine: 'frågat',
            group: 1,
            dutch: 'vragen',
            difficulty: 'easy',
            frequency: 'high'
        },
        {
            id: 'tro',
            infinitive: 'att tro',
            present: 'tror',
            past: 'trodde',
            supine: 'trott',
            group: 3,
            dutch: 'geloven',
            difficulty: 'easy',
            frequency: 'medium'
        }
    ],

    // === TIER 3: Expanding Vocabulary ===
    // Unlocked after 50 completed exercises
    tier3: [
        {
            id: 'kopa',
            infinitive: 'att köpa',
            present: 'köper',
            past: 'köpte',
            supine: 'köpt',
            group: 2,
            dutch: 'kopen',
            difficulty: 'medium',
            frequency: 'high'
        },
        {
            id: 'se',
            infinitive: 'att se',
            present: 'ser',
            past: 'såg',
            supine: 'sett',
            group: 4,
            dutch: 'zien',
            difficulty: 'medium',
            frequency: 'high'
        },
        {
            id: 'komma',
            infinitive: 'att komma',
            present: 'kommer',
            past: 'kom',
            supine: 'kommit',
            group: 4,
            dutch: 'komen',
            difficulty: 'medium',
            frequency: 'high'
        },
        {
            id: 'ga',
            infinitive: 'att gå',
            present: 'går',
            past: 'gick',
            supine: 'gått',
            group: 4,
            dutch: 'gaan',
            difficulty: 'medium',
            frequency: 'high'
        },
        {
            id: 'stanna',
            infinitive: 'att stanna',
            present: 'stannar',
            past: 'stannade',
            supine: 'stannat',
            group: 1,
            dutch: 'blijven',
            difficulty: 'easy',
            frequency: 'medium'
        }
    ]
};

/**
 * Tier thresholds - exercises needed to unlock each tier
 */
export const tierThresholds = {
    1: 0, // Available from start
    2: 20, // After 20 exercises
    3: 50 // After 50 exercises
};

/**
 * Get all verbs up to and including a specific tier
 * @param {number} maxTier - Maximum tier to include (1, 2, or 3)
 * @returns {Array} Array of verb objects
 */
export function getVerbsUpToTier(maxTier) {
    const result = [];
    for (let tier = 1; tier <= maxTier; tier++) {
        const tierKey = `tier${tier}`;
        if (verbs[tierKey]) {
            result.push(...verbs[tierKey]);
        }
    }
    return result;
}

/**
 * Get the tier level based on completed exercises
 * @param {number} completedExercises - Number of completed exercises
 * @returns {number} Current tier level (1, 2, or 3)
 */
export function getTierForProgress(completedExercises) {
    if (completedExercises >= tierThresholds[3]) {
        return 3;
    }
    if (completedExercises >= tierThresholds[2]) {
        return 2;
    }
    return 1;
}

/**
 * Get all unlocked verb IDs based on progress
 * @param {number} completedExercises - Number of completed exercises
 * @returns {Array<string>} Array of unlocked verb IDs
 */
export function getUnlockedVerbIds(completedExercises) {
    const tier = getTierForProgress(completedExercises);
    const unlockedVerbs = getVerbsUpToTier(tier);
    return unlockedVerbs.map(v => v.id);
}

/**
 * Check if a verb is unlocked
 * @param {string} verbId - Verb ID to check
 * @param {number} completedExercises - Number of completed exercises
 * @returns {boolean} Whether the verb is unlocked
 */
export function isVerbUnlocked(verbId, completedExercises) {
    const unlockedIds = getUnlockedVerbIds(completedExercises);
    return unlockedIds.includes(verbId);
}

/**
 * Get verb by ID
 * @param {string} verbId - Verb ID
 * @returns {object|null} Verb object or null if not found
 */
export function getVerbById(verbId) {
    for (const tierKey of Object.keys(verbs)) {
        const verb = verbs[tierKey].find(v => v.id === verbId);
        if (verb) {
            return verb;
        }
    }
    return null;
}

/**
 * Extract verb ID from exercise prompt
 * Matches patterns like "(att tala)" or "(att läsa)"
 * @param {string} prompt - Exercise prompt
 * @returns {string|null} Verb ID or null if not found
 */
export function extractVerbIdFromPrompt(prompt) {
    // Use character class that includes Swedish letters å, ä, ö
    const match = prompt.match(/\(att\s+([\wåäöÅÄÖ]+)\)/i);
    if (!match) {
        return null;
    }

    const infinitive = match[1].toLowerCase();

    // Map infinitive to verb ID (handling special characters)
    const infinitiveToId = {
        vara: 'vara',
        ha: 'ha',
        bo: 'bo',
        tala: 'tala',
        läsa: 'lasa',
        skriva: 'skriva',
        äta: 'ata',
        arbeta: 'arbeta',
        fråga: 'fraga',
        tro: 'tro',
        köpa: 'kopa',
        se: 'se',
        komma: 'komma',
        gå: 'ga',
        stanna: 'stanna'
    };

    return infinitiveToId[infinitive] || null;
}
