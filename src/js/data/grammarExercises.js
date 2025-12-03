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

    // Bijvoeglijke naamwoorden (H2)
    adjective: [
        // Onbepaalde vorm - en/ett/meervoud
        {
            id: 'adj1',
            type: 'adjective',
            prompt: 'en ___ stad (stor)',
            options: ['stor', 'stort', 'stora'],
            answer: 'stor',
            translation: 'een grote stad',
            difficulty: 'easy'
        },
        {
            id: 'adj2',
            type: 'adjective',
            prompt: 'ett ___ hus (stor)',
            options: ['stor', 'stort', 'stora'],
            answer: 'stort',
            translation: 'een groot huis',
            difficulty: 'easy'
        },
        {
            id: 'adj3',
            type: 'adjective',
            prompt: '___ städer (stor)',
            options: ['stor', 'stort', 'stora'],
            answer: 'stora',
            translation: 'grote steden',
            difficulty: 'easy'
        },
        {
            id: 'adj4',
            type: 'adjective',
            prompt: 'en ___ katt (svart)',
            options: ['svart', 'svart', 'svarta'],
            answer: 'svart',
            translation: 'een zwarte kat',
            difficulty: 'easy'
        },
        {
            id: 'adj5',
            type: 'adjective',
            prompt: 'ett ___ bord (svart)',
            options: ['svart', 'svart', 'svarta'],
            answer: 'svart',
            translation: 'een zwarte tafel',
            hint: 'medeklinker + t verliest -t in ett-vorm',
            difficulty: 'medium'
        },
        {
            id: 'adj6',
            type: 'adjective',
            prompt: 'en ___ ros (röd)',
            options: ['röd', 'rött', 'röda'],
            answer: 'röd',
            translation: 'een rode roos',
            difficulty: 'easy'
        },
        {
            id: 'adj7',
            type: 'adjective',
            prompt: 'ett ___ äpple (röd)',
            options: ['röd', 'rött', 'röda'],
            answer: 'rött',
            translation: 'een rode appel',
            hint: 'klinker + d krijgt -tt',
            difficulty: 'medium'
        },
        // Bepaalde vorm
        {
            id: 'adj8',
            type: 'adjective',
            prompt: 'den ___ staden (stor)',
            options: ['stor', 'stora', 'stort'],
            answer: 'stora',
            translation: 'de grote stad',
            difficulty: 'medium'
        },
        {
            id: 'adj9',
            type: 'adjective',
            prompt: 'det ___ huset (stor)',
            options: ['stor', 'stora', 'stort'],
            answer: 'stora',
            translation: 'het grote huis',
            difficulty: 'medium'
        },
        // Vergrotende trap
        {
            id: 'adj10',
            type: 'adjective',
            prompt: 'Bilen är ___ än cykeln. (dyr)',
            options: ['dyr', 'dyrare', 'dyrast'],
            answer: 'dyrare',
            translation: 'De auto is duurder dan de fiets.',
            difficulty: 'medium'
        },
        {
            id: 'adj11',
            type: 'adjective',
            prompt: 'Hon är ___ än mig. (ung)',
            options: ['ung', 'yngre', 'yngst'],
            answer: 'yngre',
            translation: 'Zij is jonger dan ik.',
            difficulty: 'medium'
        },
        // Overtreffende trap
        {
            id: 'adj12',
            type: 'adjective',
            prompt: 'Stockholm är ___ i Sverige. (stor)',
            options: ['stor', 'större', 'störst'],
            answer: 'störst',
            translation: 'Stockholm is het grootst in Zweden.',
            difficulty: 'medium'
        },
        {
            id: 'adj13',
            type: 'adjective',
            prompt: 'Det är den ___ bilen. (dyr)',
            options: ['dyr', 'dyrare', 'dyraste'],
            answer: 'dyraste',
            translation: 'Dat is de duurste auto.',
            difficulty: 'medium'
        },
        // Onregelmatige vormen
        {
            id: 'adj14',
            type: 'adjective',
            prompt: 'Det här är ___ än det där. (bra)',
            options: ['bra', 'bättre', 'bäst'],
            answer: 'bättre',
            translation: 'Dit is beter dan dat.',
            difficulty: 'medium'
        },
        {
            id: 'adj15',
            type: 'adjective',
            prompt: 'Hon är ___ i klassen. (bra)',
            options: ['bra', 'bättre', 'bäst'],
            answer: 'bäst',
            translation: 'Zij is de beste in de klas.',
            difficulty: 'medium'
        },
        {
            id: 'adj16',
            type: 'adjective',
            prompt: 'Jag har ___ pengar än du. (mycket)',
            options: ['mycket', 'mer', 'mest'],
            answer: 'mer',
            translation: 'Ik heb meer geld dan jij.',
            difficulty: 'hard'
        },
        {
            id: 'adj17',
            type: 'adjective',
            prompt: 'Hon har ___ vänner. (många)',
            options: ['många', 'flera', 'flest'],
            answer: 'flest',
            translation: 'Zij heeft de meeste vrienden.',
            difficulty: 'hard'
        },
        // Liten (onregelmatig)
        {
            id: 'adj18',
            type: 'adjective',
            prompt: 'ett ___ barn (liten)',
            options: ['liten', 'litet', 'små'],
            answer: 'litet',
            translation: 'een klein kind',
            difficulty: 'medium'
        },
        {
            id: 'adj19',
            type: 'adjective',
            prompt: '___ katter (liten)',
            options: ['liten', 'litet', 'små'],
            answer: 'små',
            translation: 'kleine katten',
            difficulty: 'medium'
        },
        {
            id: 'adj20',
            type: 'adjective',
            prompt: 'den ___ katten (liten)',
            options: ['liten', 'lilla', 'små'],
            answer: 'lilla',
            translation: 'de kleine kat',
            difficulty: 'hard'
        }
    ],

    // Telwoorden (H3)
    numbers: [
        // Hoofdtelwoorden
        {
            id: 'num1',
            type: 'number',
            prompt: 'Vertaal: 5',
            options: ['fyra', 'fem', 'sex'],
            answer: 'fem',
            difficulty: 'easy'
        },
        {
            id: 'num2',
            type: 'number',
            prompt: 'Vertaal: 12',
            options: ['elva', 'tolv', 'tretton'],
            answer: 'tolv',
            difficulty: 'easy'
        },
        {
            id: 'num3',
            type: 'number',
            prompt: 'Vertaal: 17',
            options: ['sexton', 'sjutton', 'arton'],
            answer: 'sjutton',
            difficulty: 'easy'
        },
        {
            id: 'num4',
            type: 'number',
            prompt: 'Vertaal: 50',
            options: ['fyrtio', 'femtio', 'sextio'],
            answer: 'femtio',
            difficulty: 'easy'
        },
        // en/ett bij telwoorden
        {
            id: 'num5',
            type: 'number',
            prompt: 'tjugo___ rosor (21 rozen)',
            options: ['en', 'ett'],
            answer: 'en',
            hint: 'ros is een en-woord',
            translation: '21 rozen',
            difficulty: 'medium'
        },
        {
            id: 'num6',
            type: 'number',
            prompt: 'tjugo___ hus (21 huizen)',
            options: ['en', 'ett'],
            answer: 'ett',
            hint: 'hus is een ett-woord',
            translation: '21 huizen',
            difficulty: 'medium'
        },
        // Rangtelwoorden
        {
            id: 'num7',
            type: 'number',
            prompt: 'den ___ maj (1 mei)',
            options: ['en', 'första', 'ett'],
            answer: 'första',
            translation: '1 mei',
            difficulty: 'easy'
        },
        {
            id: 'num8',
            type: 'number',
            prompt: 'den ___ december (24 dec)',
            options: ['tjugofyra', 'tjugofjärde', 'tjugo fyra'],
            answer: 'tjugofjärde',
            translation: '24 december',
            difficulty: 'medium'
        },
        {
            id: 'num9',
            type: 'number',
            prompt: 'Vertaal: tweede',
            options: ['tvåa', 'andra', 'två'],
            answer: 'andra',
            difficulty: 'easy'
        },
        {
            id: 'num10',
            type: 'number',
            prompt: 'Vertaal: derde',
            options: ['trea', 'tredje', 'tre'],
            answer: 'tredje',
            difficulty: 'easy'
        },
        // Klokkijken
        {
            id: 'num11',
            type: 'number',
            prompt: 'Klockan är halv ___. (6:30)',
            options: ['sex', 'sju', 'fem'],
            answer: 'sju',
            translation: 'Het is half zeven.',
            hint: 'Net als in het Nederlands!',
            difficulty: 'medium'
        },
        {
            id: 'num12',
            type: 'number',
            prompt: 'Klockan är kvart ___ tre. (2:45)',
            options: ['över', 'i', 'halv'],
            answer: 'i',
            translation: 'Het is kwart voor drie.',
            difficulty: 'medium'
        },
        {
            id: 'num13',
            type: 'number',
            prompt: 'Klockan är kvart ___ tre. (3:15)',
            options: ['över', 'i', 'halv'],
            answer: 'över',
            translation: 'Het is kwart over drie.',
            difficulty: 'medium'
        },
        {
            id: 'num14',
            type: 'number',
            prompt: 'Klockan är fem ___ fyra. (3:55)',
            options: ['över', 'i', 'halv'],
            answer: 'i',
            translation: 'Het is vijf voor vier.',
            difficulty: 'medium'
        },
        // Getallen als zelfstandig naamwoord
        {
            id: 'num15',
            type: 'number',
            prompt: 'Han har en ___. (3-kamerwoning)',
            options: ['tre', 'trea', 'tredje'],
            answer: 'trea',
            translation: 'Hij heeft een driekamerwoning.',
            difficulty: 'hard'
        },
        // Breuken
        {
            id: 'num16',
            type: 'number',
            prompt: 'en ___ banan (halve)',
            options: ['halv', 'halvt', 'halva'],
            answer: 'halv',
            translation: 'een halve banaan',
            hint: 'banan is een en-woord',
            difficulty: 'medium'
        },
        {
            id: 'num17',
            type: 'number',
            prompt: 'ett ___ äpple (halve)',
            options: ['halv', 'halvt', 'halva'],
            answer: 'halvt',
            translation: 'een halve appel',
            hint: 'äpple is een ett-woord',
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
        ...grammarExercises.adjective,
        ...grammarExercises.numbers,
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
