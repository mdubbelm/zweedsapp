/**
 * Grammar exercises for Daily Program integration
 * Based on Learning Specialist (Lotte) recommendations
 *
 * Exercise types:
 * - conjugation: Fill in the correct verb form
 * - pronoun: Choose the correct pronoun
 * - article: Choose en/ett or definite form
 * - translation: Translate a word/phrase
 */

export const grammarExercises = {
    // Werkwoord conjugatie oefeningen
    conjugation: [
        // Tegenwoordige tijd - Groep 1 (-ar werkwoorden)
        {
            id: 'conj1',
            type: 'conjugation',
            prompt: 'Jag ___ (att tala)',
            answer: 'talar',
            hint: 'praten - tegenwoordige tijd',
            difficulty: 'easy'
        },
        {
            id: 'conj2',
            type: 'conjugation',
            prompt: 'Hon ___ (att arbeta)',
            answer: 'arbetar',
            hint: 'werken - tegenwoordige tijd',
            difficulty: 'easy'
        },
        {
            id: 'conj3',
            type: 'conjugation',
            prompt: 'Vi ___ (att fråga)',
            answer: 'frågar',
            hint: 'vragen - tegenwoordige tijd',
            difficulty: 'easy'
        },
        {
            id: 'conj4',
            type: 'conjugation',
            prompt: 'De ___ (att stanna)',
            answer: 'stannar',
            hint: 'blijven - tegenwoordige tijd',
            difficulty: 'easy'
        },
        // Tegenwoordige tijd - Groep 2 (-er werkwoorden)
        {
            id: 'conj5',
            type: 'conjugation',
            prompt: 'Jag ___ (att läsa)',
            answer: 'läser',
            hint: 'lezen - tegenwoordige tijd',
            difficulty: 'easy'
        },
        {
            id: 'conj6',
            type: 'conjugation',
            prompt: 'Du ___ (att skriva)',
            answer: 'skriver',
            hint: 'schrijven - tegenwoordige tijd',
            difficulty: 'easy'
        },
        {
            id: 'conj7',
            type: 'conjugation',
            prompt: 'Han ___ (att köpa)',
            answer: 'köper',
            hint: 'kopen - tegenwoordige tijd',
            difficulty: 'medium'
        },
        {
            id: 'conj8',
            type: 'conjugation',
            prompt: 'Vi ___ (att äta)',
            answer: 'äter',
            hint: 'eten - tegenwoordige tijd',
            difficulty: 'medium'
        },
        // Tegenwoordige tijd - Groep 3 (korte werkwoorden)
        {
            id: 'conj9',
            type: 'conjugation',
            prompt: 'Jag ___ (att bo)',
            answer: 'bor',
            hint: 'wonen - tegenwoordige tijd',
            difficulty: 'easy'
        },
        {
            id: 'conj10',
            type: 'conjugation',
            prompt: 'Hon ___ (att tro)',
            answer: 'tror',
            hint: 'geloven - tegenwoordige tijd',
            difficulty: 'easy'
        },
        // Onregelmatige werkwoorden
        {
            id: 'conj11',
            type: 'conjugation',
            prompt: 'Jag ___ (att vara)',
            answer: 'är',
            hint: 'zijn - tegenwoordige tijd',
            difficulty: 'easy'
        },
        {
            id: 'conj12',
            type: 'conjugation',
            prompt: 'Vi ___ (att ha)',
            answer: 'har',
            hint: 'hebben - tegenwoordige tijd',
            difficulty: 'easy'
        },
        {
            id: 'conj13',
            type: 'conjugation',
            prompt: 'De ___ (att gå)',
            answer: 'går',
            hint: 'gaan - tegenwoordige tijd',
            difficulty: 'medium'
        },
        {
            id: 'conj14',
            type: 'conjugation',
            prompt: 'Han ___ (att komma)',
            answer: 'kommer',
            hint: 'komen - tegenwoordige tijd',
            difficulty: 'medium'
        },
        {
            id: 'conj15',
            type: 'conjugation',
            prompt: 'Jag ___ (att se)',
            answer: 'ser',
            hint: 'zien - tegenwoordige tijd',
            difficulty: 'medium'
        },
        // Verleden tijd
        {
            id: 'conj16',
            type: 'conjugation',
            prompt: 'Jag ___ (att tala) igår',
            answer: 'talade',
            hint: 'praten - verleden tijd',
            difficulty: 'medium'
        },
        {
            id: 'conj17',
            type: 'conjugation',
            prompt: 'Hon ___ (att läsa) boken',
            answer: 'läste',
            hint: 'lezen - verleden tijd',
            difficulty: 'medium'
        },
        {
            id: 'conj18',
            type: 'conjugation',
            prompt: 'Vi ___ (att vara) hemma',
            answer: 'var',
            hint: 'zijn - verleden tijd',
            difficulty: 'medium'
        },
        {
            id: 'conj19',
            type: 'conjugation',
            prompt: 'De ___ (att ha) en hund',
            answer: 'hade',
            hint: 'hebben - verleden tijd',
            difficulty: 'medium'
        },
        {
            id: 'conj20',
            type: 'conjugation',
            prompt: 'Han ___ (att gå) till skolan',
            answer: 'gick',
            hint: 'gaan - verleden tijd',
            difficulty: 'hard'
        }
    ],

    // Voornaamwoord oefeningen
    pronoun: [
        // Persoonlijke voornaamwoorden - subject
        {
            id: 'pron1',
            type: 'pronoun',
            prompt: '___ heter Anna',
            options: ['Jag', 'Du', 'Hon'],
            answer: 'Jag',
            translation: 'Ik heet Anna',
            difficulty: 'easy'
        },
        {
            id: 'pron2',
            type: 'pronoun',
            prompt: '___ bor i Stockholm',
            options: ['Han', 'Vi', 'De'],
            answer: 'Vi',
            translation: 'Wij wonen in Stockholm',
            difficulty: 'easy'
        },
        {
            id: 'pron3',
            type: 'pronoun',
            prompt: '___ är lärare',
            options: ['Jag', 'Hon', 'Ni'],
            answer: 'Hon',
            translation: 'Zij is lerares',
            difficulty: 'easy'
        },
        // Bezittelijke voornaamwoorden - en-woorden
        {
            id: 'pron4',
            type: 'pronoun',
            prompt: 'Det är ___ katt',
            options: ['min', 'mitt', 'mina'],
            answer: 'min',
            translation: 'Dat is mijn kat (en katt)',
            difficulty: 'medium'
        },
        {
            id: 'pron5',
            type: 'pronoun',
            prompt: '___ hund är stor',
            options: ['Din', 'Ditt', 'Dina'],
            answer: 'Din',
            translation: 'Jouw hond is groot (en hund)',
            difficulty: 'medium'
        },
        {
            id: 'pron6',
            type: 'pronoun',
            prompt: 'Det är ___ bil',
            options: ['hans', 'hennes', 'sin'],
            answer: 'hennes',
            translation: 'Dat is haar auto',
            difficulty: 'medium'
        },
        // Bezittelijke voornaamwoorden - ett-woorden
        {
            id: 'pron7',
            type: 'pronoun',
            prompt: 'Det är ___ hus',
            options: ['min', 'mitt', 'mina'],
            answer: 'mitt',
            translation: 'Dat is mijn huis (ett hus)',
            difficulty: 'medium'
        },
        {
            id: 'pron8',
            type: 'pronoun',
            prompt: '___ barn går i skolan',
            options: ['Vår', 'Vårt', 'Våra'],
            answer: 'Vårt',
            translation: 'Ons kind gaat naar school (ett barn)',
            difficulty: 'hard'
        },
        // Bezittelijke voornaamwoorden - meervoud
        {
            id: 'pron9',
            type: 'pronoun',
            prompt: '___ böcker ligger där',
            options: ['Min', 'Mitt', 'Mina'],
            answer: 'Mina',
            translation: 'Mijn boeken liggen daar',
            difficulty: 'medium'
        },
        {
            id: 'pron10',
            type: 'pronoun',
            prompt: '___ vänner kommer ikväll',
            options: ['Vår', 'Vårt', 'Våra'],
            answer: 'Våra',
            translation: 'Onze vrienden komen vanavond',
            difficulty: 'hard'
        }
    ],

    // Lidwoord oefeningen (en/ett en bepaald/onbepaald)
    article: [
        // en of ett?
        {
            id: 'art1',
            type: 'article',
            prompt: '___ katt',
            options: ['en', 'ett'],
            answer: 'en',
            translation: 'een kat',
            difficulty: 'easy'
        },
        {
            id: 'art2',
            type: 'article',
            prompt: '___ hus',
            options: ['en', 'ett'],
            answer: 'ett',
            translation: 'een huis',
            difficulty: 'easy'
        },
        {
            id: 'art3',
            type: 'article',
            prompt: '___ bok',
            options: ['en', 'ett'],
            answer: 'en',
            translation: 'een boek',
            difficulty: 'easy'
        },
        {
            id: 'art4',
            type: 'article',
            prompt: '___ äpple',
            options: ['en', 'ett'],
            answer: 'ett',
            translation: 'een appel',
            difficulty: 'easy'
        },
        {
            id: 'art5',
            type: 'article',
            prompt: '___ barn',
            options: ['en', 'ett'],
            answer: 'ett',
            translation: 'een kind',
            difficulty: 'easy'
        },
        {
            id: 'art6',
            type: 'article',
            prompt: '___ flicka',
            options: ['en', 'ett'],
            answer: 'en',
            translation: 'een meisje',
            difficulty: 'easy'
        },
        {
            id: 'art7',
            type: 'article',
            prompt: '___ museum',
            options: ['en', 'ett'],
            answer: 'ett',
            translation: 'een museum',
            difficulty: 'medium'
        },
        {
            id: 'art8',
            type: 'article',
            prompt: '___ problem',
            options: ['en', 'ett'],
            answer: 'ett',
            translation: 'een probleem',
            difficulty: 'medium'
        },
        // Bepaald lidwoord (suffix)
        {
            id: 'art9',
            type: 'article',
            prompt: 'katt → ___',
            options: ['katten', 'kattet'],
            answer: 'katten',
            translation: 'de kat',
            difficulty: 'medium'
        },
        {
            id: 'art10',
            type: 'article',
            prompt: 'hus → ___',
            options: ['husen', 'huset'],
            answer: 'huset',
            translation: 'het huis',
            difficulty: 'medium'
        },
        {
            id: 'art11',
            type: 'article',
            prompt: 'flicka → ___',
            options: ['flickan', 'flickat'],
            answer: 'flickan',
            translation: 'het meisje',
            difficulty: 'medium'
        },
        {
            id: 'art12',
            type: 'article',
            prompt: 'äpple → ___',
            options: ['äpplen', 'äpplet'],
            answer: 'äpplet',
            translation: 'de appel',
            difficulty: 'medium'
        }
    ],

    // Vertalingen (woord niveau)
    translation: [
        {
            id: 'trans1',
            type: 'translation',
            prompt: 'Vertaal: ik',
            answer: 'jag',
            alternatives: ['Jag'],
            difficulty: 'easy'
        },
        {
            id: 'trans2',
            type: 'translation',
            prompt: 'Vertaal: jij',
            answer: 'du',
            alternatives: ['Du'],
            difficulty: 'easy'
        },
        {
            id: 'trans3',
            type: 'translation',
            prompt: 'Vertaal: wij',
            answer: 'vi',
            alternatives: ['Vi'],
            difficulty: 'easy'
        },
        {
            id: 'trans4',
            type: 'translation',
            prompt: 'Vertaal: hebben',
            answer: 'har',
            alternatives: ['att ha'],
            difficulty: 'easy'
        },
        {
            id: 'trans5',
            type: 'translation',
            prompt: 'Vertaal: zijn (werkwoord)',
            answer: 'är',
            alternatives: ['att vara'],
            difficulty: 'easy'
        },
        {
            id: 'trans6',
            type: 'translation',
            prompt: 'Vertaal: wonen',
            answer: 'bor',
            alternatives: ['att bo'],
            difficulty: 'easy'
        },
        {
            id: 'trans7',
            type: 'translation',
            prompt: 'Vertaal: de kat',
            answer: 'katten',
            alternatives: [],
            difficulty: 'medium'
        },
        {
            id: 'trans8',
            type: 'translation',
            prompt: 'Vertaal: het huis',
            answer: 'huset',
            alternatives: [],
            difficulty: 'medium'
        }
    ]
};

/**
 * Get random grammar exercises for daily program
 * @param {number} count - Number of exercises to return
 * @param {string} difficulty - Filter by difficulty (easy, medium, hard)
 * @returns {Array} Array of grammar exercises
 */
export function getRandomGrammarExercises(count = 2, difficulty = null) {
    // Collect all exercises
    let allExercises = [
        ...grammarExercises.conjugation,
        ...grammarExercises.pronoun,
        ...grammarExercises.article,
        ...grammarExercises.translation
    ];

    // Filter by difficulty if specified
    if (difficulty) {
        if (difficulty === 'easy') {
            allExercises = allExercises.filter(e => e.difficulty === 'easy');
        } else if (difficulty === 'easy-medium') {
            allExercises = allExercises.filter(
                e => e.difficulty === 'easy' || e.difficulty === 'medium'
            );
        } else if (difficulty === 'medium') {
            allExercises = allExercises.filter(e => e.difficulty === 'medium');
        } else if (difficulty === 'hard') {
            allExercises = allExercises.filter(
                e => e.difficulty === 'medium' || e.difficulty === 'hard'
            );
        }
    }

    // Shuffle and return requested count
    const shuffled = allExercises.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

/**
 * Get exercises by type
 * @param {string} type - Exercise type (conjugation, pronoun, article, translation)
 * @param {number} count - Number of exercises
 * @returns {Array} Array of exercises of specified type
 */
export function getExercisesByType(type, count = 2) {
    const exercises = grammarExercises[type] || [];
    const shuffled = exercises.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}
