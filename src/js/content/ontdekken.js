/**
 * Ontdekken: klankregels (Codekraker) en valse vrienden.
 *
 * Codekraker: Zweeds en Nederlands zijn familie. Wie een paar klankregels
 * kent, kan woorden ontcijferen die nooit geleerd zijn. Eerst raden, dan
 * zien of het klopt (gokken vooraf, net als bij nieuwe woorden).
 *
 * Valse vrienden: woorden die Nederlands lijken maar iets anders betekenen.
 */

/**
 * Per regel: voorbeelden die getoond worden, en woorden om zelf te kraken.
 * crack: [zweeds, nederlands, ...andere goede antwoorden]
 * build: [nederlands, zweeds] om de regel andersom toe te passen
 */
export const RULES = [
    {
        id: 'sk-sch',
        title: 'sk wordt sch',
        sv: 'sk',
        nl: 'sch',
        examples: [
            ['skola', 'school'],
            ['skepp', 'schip'],
            ['skriva', 'schrijven']
        ],
        crack: [
            ['skuld', 'schuld'],
            ['skada', 'schade'],
            ['skatt', 'schat', 'belasting']
        ],
        build: ['de schaduw', 'en skugga']
    },
    {
        id: 'v-w',
        title: 'v wordt w',
        sv: 'v',
        nl: 'w',
        examples: [
            ['vatten', 'water'],
            ['vind', 'wind'],
            ['varm', 'warm']
        ],
        crack: [
            ['väg', 'weg', 'pad'],
            ['vit', 'wit'],
            ['vecka', 'week']
        ],
        build: ['de winter', 'en vinter']
    },
    {
        id: 'o-oo',
        title: 'ö wordt oo',
        sv: 'ö',
        nl: 'oo',
        examples: [
            ['bröd', 'brood'],
            ['röd', 'rood'],
            ['död', 'dood']
        ],
        crack: [
            ['öga', 'oog'],
            ['öra', 'oor'],
            ['hög', 'hoog']
        ],
        build: ['de droom', 'en dröm']
    },
    {
        id: 'a-aa',
        title: 'å wordt aa of oo',
        sv: 'å',
        nl: 'aa / oo',
        examples: [
            ['båt', 'boot'],
            ['gå', 'gaan'],
            ['stå', 'staan']
        ],
        crack: [
            ['hår', 'haar'],
            ['råd', 'raad', 'advies'],
            ['slå', 'slaan']
        ],
        build: ['het jaar', 'ett år']
    },
    {
        id: 'a-en',
        title: 'werkwoorden: -a wordt -en',
        sv: '-a',
        nl: '-en',
        examples: [
            ['dansa', 'dansen'],
            ['koka', 'koken'],
            ['bada', 'baden']
        ],
        crack: [
            ['spela', 'spelen'],
            ['leva', 'leven'],
            ['hata', 'haten']
        ],
        build: ['kosten', 'att kosta']
    },
    {
        id: 'for-ver',
        title: 'för- wordt ver-',
        sv: 'för-',
        nl: 'ver-',
        examples: [
            ['förstå', 'verstaan', 'begrijpen'],
            ['förklara', 'verklaren', 'uitleggen'],
            ['förbjuda', 'verbieden']
        ],
        crack: [
            ['förlora', 'verliezen'],
            ['förändra', 'veranderen', 'wijzigen'],
            ['förbättra', 'verbeteren']
        ],
        build: ['verzekeren', 'att försäkra']
    },
    {
        id: 'het-heid',
        title: '-het wordt -heid',
        sv: '-het',
        nl: '-heid',
        examples: [
            ['frihet', 'vrijheid'],
            ['enhet', 'eenheid'],
            ['säkerhet', 'zekerheid', 'veiligheid']
        ],
        crack: [
            ['svaghet', 'zwakheid', 'zwakte'],
            ['möjlighet', 'mogelijkheid', 'kans'],
            ['skönhet', 'schoonheid']
        ],
        build: ['de eenzaamheid', 'en ensamhet']
    },
    {
        id: 'tion-tie',
        title: '-tion wordt -tie',
        sv: '-tion',
        nl: '-tie',
        examples: [
            ['nation', 'natie'],
            ['information', 'informatie'],
            ['situation', 'situatie']
        ],
        crack: [
            ['tradition', 'traditie'],
            ['position', 'positie'],
            ['generation', 'generatie']
        ],
        build: ['de organisatie', 'en organisation']
    },
    {
        id: 'ning-ing',
        title: '-ning wordt -ing',
        sv: '-ning',
        nl: '-ing',
        examples: [
            ['landning', 'landing'],
            ['bokning', 'boeking', 'reservering'],
            ['träning', 'training']
        ],
        crack: [
            ['betalning', 'betaling'],
            ['ledning', 'leiding'],
            ['räkning', 'rekening']
        ],
        build: ['de opening', 'en öppning']
    }
];

/**
 * Valse vrienden: het woord, waar het op lijkt, wat het betekent,
 * een gewone zin om het in te zien, en een knipoog bij de onthulling.
 */
export const FALSE_FRIENDS = [
    {
        id: 'rolig',
        word: 'rolig',
        looksLike: 'rustig',
        means: ['grappig', 'leuk', 'amusant', 'vermakelijk'],
        sv: 'Filmen var väldigt rolig.',
        nl: 'De film was heel grappig.',
        wink: 'Een rolig feestje is dus juist niet rustig.'
    },
    {
        id: 'semester',
        word: 'semester',
        looksLike: 'het semester',
        means: ['vakantie', 'verlof', 'vrij'],
        sv: 'Vi har semester i juli.',
        nl: 'We hebben vakantie in juli.',
        wink: 'Een semester op de universiteit heet in het Zweeds termin.'
    },
    {
        id: 'glass',
        word: 'glass',
        looksLike: 'glas',
        means: ['ijs', 'ijsje', 'een ijsje', 'roomijs'],
        sv: 'Jacob äter en glass.',
        nl: 'Jacob eet een ijsje.',
        wink: 'Een glas is ett glas. Met dubbel s wordt het een stuk lekkerder.'
    },
    {
        id: 'kudde',
        word: 'kudde',
        looksLike: 'een kudde schapen',
        means: ['kussen', 'hoofdkussen', 'kussentje'],
        sv: 'Cleo sover på kudden.',
        nl: 'Cleo slaapt op het kussen.',
        wink: 'Geen schaap te zien, wel een kat op een kussen.'
    },
    {
        id: 'affar',
        word: 'affär',
        looksLike: 'een affaire',
        means: ['winkel', 'zaak', 'winkeltje'],
        sv: 'Affären stänger klockan sex.',
        nl: 'De winkel gaat om zes uur dicht.',
        wink: 'Naar de affär ga je voor brood, niet voor een geheime liefde.'
    },
    {
        id: 'rar',
        word: 'rar',
        looksLike: 'raar',
        means: ['lief', 'aardig', 'schattig', 'vriendelijk', 'leuk'],
        sv: 'Vilken rar katt!',
        nl: 'Wat een lieve kat!',
        wink: 'In het Zweeds is rar een compliment. Raar heet konstig.'
    },
    {
        id: 'ful',
        word: 'ful',
        looksLike: 'vol',
        means: ['lelijk', 'foeilelijk'],
        sv: 'Det är en ful hatt.',
        nl: 'Het is een lelijke hoed.',
        wink: "Vol is in het Zweeds full, met twee l'en. Met één l is het lelijk."
    },
    {
        id: 'mus',
        word: 'mus',
        looksLike: 'een mus',
        means: ['muis', 'muisje'],
        sv: 'Cleo jagar en mus.',
        nl: 'Cleo jaagt op een muis.',
        wink: 'De vogel heet in het Zweeds sparv. Cleo vindt beide interessant.'
    },
    {
        id: 'tak',
        word: 'tak',
        looksLike: 'een tak',
        means: ['dak', 'het dak', 'plafond'],
        sv: 'Katten sitter på taket.',
        nl: 'De kat zit op het dak.',
        wink: 'Een boomtak is en gren.'
    },
    {
        id: 'gift',
        word: 'gift',
        looksLike: 'gif',
        means: ['getrouwd', 'gehuwd'],
        sv: 'Är du gift?',
        nl: 'Ben je getrouwd?',
        wink: 'Ett gift is gif, gift is getrouwd. De zin geeft de doorslag.'
    },
    {
        id: 'bil',
        word: 'bil',
        looksLike: 'bil',
        means: ['auto', 'de auto', 'wagen'],
        sv: 'Vi åker bil till Malmö.',
        nl: 'We gaan met de auto naar Malmö.',
        wink: 'In Nederland zit je op je billen, in Zweden zit je in een bil.'
    },
    {
        id: 'kort',
        word: 'kort',
        looksLike: 'kort',
        means: ['kaart', 'kaartje', 'pasje', 'pas'],
        sv: 'Jag skriver ett kort till Jacob.',
        nl: 'Ik schrijf een kaartje aan Jacob.',
        wink: 'Kort betekent ook gewoon kort. Ett kort is een kaart.'
    },
    {
        id: 'kissa',
        word: 'kissa',
        looksLike: 'kissen',
        means: ['plassen', 'pissen', 'piesen', 'een plasje doen'],
        sv: 'Hunden kissar på gräset.',
        nl: 'De hond plast op het gras.',
        wink: 'Niet verwarren met kyssa, dat is kussen.'
    }
];
