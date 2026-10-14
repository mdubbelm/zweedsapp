/**
 * Zweedse feestdagen en bakdagen. De regel bepaalt de datum (zie engine/holidays.js).
 * Items hebben pack: <id> en gaan het herhaalschema in.
 */

export const HOLIDAYS = [
    {
        id: 'nyarsdagen',
        type: 'feest',
        category: 'helgdag',
        title: 'Nieuwjaarsdag',
        sv: 'Nyårsdagen',
        rule: {
            fixed: [1, 1]
        },
        food: 'Geen vast gerecht in de gebruikte bronnen; het feestmaal valt op nyårsafton.',
        note: 'Nyårsdagen is een wettelijke feestdag in Zweden. Het nieuwe jaar wordt de avond ervoor ingeluid (zie nyårsafton).',
        source: 'https://www.kalender.se/helgdagar/2026',
        items: [
            {
                id: 'fd-nyarsdagen-1',
                kind: 'noun',
                field: 'tijd',
                level: 1,
                nl: 'het jaar',
                sv: 'år',
                article: 'ett',
                definite: 'året',
                plural: 'år',
                why: 'År is een ett-woord; het meervoud blijft hetzelfde.',
                accept: []
            },
            {
                id: 'fd-nyarsdagen-2',
                kind: 'noun',
                field: 'mensen',
                level: 1,
                nl: 'de vriend of vriendin',
                sv: 'vän',
                article: 'en',
                definite: 'vännen',
                plural: 'vänner',
                why: 'Vän is een en-woord; het meervoud wordt vänner.',
                accept: []
            },
            {
                id: 'fd-nyarsdagen-3',
                kind: 'word',
                field: 'rust',
                level: 1,
                nl: 'rusten',
                sv: 'att vila',
                forms: {
                    presens: 'vilar',
                    preteritum: 'vilade',
                    supinum: 'vilat'
                },
                why: 'Vila krijgt -ar in de tegenwoordige tijd en -ade in de verleden tijd.',
                accept: []
            },
            {
                id: 'fd-nyarsdagen-4',
                kind: 'noun',
                field: 'vrije tijd',
                level: 1,
                nl: 'de wandeling',
                sv: 'promenad',
                article: 'en',
                definite: 'promenaden',
                plural: 'promenader',
                why: 'Promenad is een en-woord; het meervoud wordt promenader.',
                accept: []
            },
            {
                id: 'fd-nyarsdagen-5',
                kind: 'phrase',
                field: 'zin',
                level: 1,
                nl: 'Gelukkig nieuwjaar!',
                sv: 'Gott nytt år!',
                why: 'Gott nytt år zeg je bij de jaarwisseling en betekent "gelukkig nieuwjaar".',
                accept: []
            },
            {
                id: 'fd-nyarsdagen-6',
                kind: 'gap',
                field: 'meervoud',
                level: 2,
                nl: 'We wensen onze vrienden een gelukkig nieuwjaar.',
                sv: 'Vi önskar våra ___ ett gott nytt år.',
                answer: 'vänner',
                why: 'Vänner is het meervoud van vän: meer dan één vriend.',
                accept: []
            }
        ]
    },
    {
        id: 'trettondedag-jul',
        type: 'feest',
        category: 'helgdag',
        title: 'Driekoningen',
        sv: 'Trettondedag jul',
        rule: {
            fixed: [1, 6]
        },
        food: 'Geen vast gerecht in de bronnen.',
        note: 'Op trettondedag jul herdenkt de kerk dat Jezus zich openbaarde als Gods Zoon (doop, wonder in Kana, de ster). Officieel eindigt Kerst in Zweden pas een week later, op tjugondedag jul.',
        source: 'https://www.kalender.se/helgdagar/2027',
        items: [
            {
                id: 'fd-trettondedag-jul-1',
                kind: 'noun',
                field: 'hemel',
                level: 1,
                nl: 'de ster',
                sv: 'stjärna',
                article: 'en',
                definite: 'stjärnan',
                plural: 'stjärnor',
                why: 'Stjärna is een en-woord; het meervoud wordt stjärnor.',
                accept: []
            },
            {
                id: 'fd-trettondedag-jul-2',
                kind: 'noun',
                field: 'kerk',
                level: 1,
                nl: 'de kerkdienst',
                sv: 'gudstjänst',
                article: 'en',
                definite: 'gudstjänsten',
                plural: 'gudstjänster',
                why: 'Gudstjänst is een en-woord; het meervoud wordt gudstjänster.',
                accept: []
            },
            {
                id: 'fd-trettondedag-jul-3',
                kind: 'word',
                field: 'zintuigen',
                level: 1,
                nl: 'zien',
                sv: 'att se',
                forms: {
                    presens: 'ser',
                    preteritum: 'såg',
                    supinum: 'sett'
                },
                why: 'Se is onregelmatig: ser, såg, sett.',
                accept: []
            },
            {
                id: 'fd-trettondedag-jul-4',
                kind: 'noun',
                field: 'mensen',
                level: 1,
                nl: 'het kind',
                sv: 'barn',
                article: 'ett',
                definite: 'barnet',
                plural: 'barn',
                why: 'Barn is een ett-woord; het meervoud blijft hetzelfde.',
                accept: []
            },
            {
                id: 'fd-trettondedag-jul-5',
                kind: 'phrase',
                field: 'zin',
                level: 1,
                nl: 'We gaan naar de kerk in Simrishamn.',
                sv: 'Vi går till kyrkan i Simrishamn.',
                why: 'Går betekent "gaan", till betekent "naar" en kyrkan is "de kerk".',
                accept: []
            },
            {
                id: 'fd-trettondedag-jul-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 2,
                nl: 'De ster schijnt boven de kerk.',
                sv: 'Stjärnan lyser ___ kyrkan.',
                answer: 'över',
                why: 'Över betekent hier "boven".',
                accept: []
            }
        ]
    },
    {
        id: 'tjugondedag-knut',
        type: 'feest',
        category: 'tradition',
        title: 'Twintigste dag Knut (einde van de kerst)',
        sv: 'Tjugondedag Knut',
        rule: {
            fixed: [1, 13]
        },
        food: 'Traditioneel at men alle overgebleven kerstetenswaren op.',
        note: 'De dag is genoemd naar de Deense prins Knut Lavard (vermoord in 1131). Het gezegde "Tjugondag Knut körs julen ut" betekent: op twintigste dag Knut wordt Kerst de deur uit gejaagd. Tegenwoordig ruimt men vooral de kerstboom en de kerstversiering op.',
        source: 'https://sv.wikipedia.org/wiki/Tjugondedag_Knut',
        items: [
            {
                id: 'fd-tjugondedag-knut-1',
                kind: 'noun',
                field: 'kerst',
                level: 1,
                nl: 'de kerstboom',
                sv: 'julgran',
                article: 'en',
                definite: 'julgranen',
                plural: 'julgranar',
                why: 'Julgran is een en-woord; het meervoud wordt julgranar.',
                accept: []
            },
            {
                id: 'fd-tjugondedag-knut-2',
                kind: 'noun',
                field: 'huis',
                level: 1,
                nl: 'de kerstversiering',
                sv: 'julpynt',
                article: 'ett',
                definite: 'julpyntet',
                plural: 'julpynt',
                why: 'Julpynt is een ett-woord; het meervoud blijft hetzelfde.',
                accept: []
            },
            {
                id: 'fd-tjugondedag-knut-3',
                kind: 'word',
                field: 'plaatsen',
                level: 1,
                nl: 'leggen',
                sv: 'att lägga',
                forms: {
                    presens: 'lägger',
                    preteritum: 'la',
                    supinum: 'lagt'
                },
                why: 'Lägga is onregelmatig: lägger, la, lagt.',
                accept: []
            },
            {
                id: 'fd-tjugondedag-knut-4',
                kind: 'noun',
                field: 'voorwerp',
                level: 1,
                nl: 'de doos',
                sv: 'låda',
                article: 'en',
                definite: 'lådan',
                plural: 'lådor',
                why: 'Låda is een en-woord; het meervoud wordt lådor.',
                accept: []
            },
            {
                id: 'fd-tjugondedag-knut-5',
                kind: 'phrase',
                field: 'zin',
                level: 2,
                nl: 'Vandaag ruimen we de kerstboom op.',
                sv: 'Idag tar vi ner julgranen.',
                why: 'Tar ner betekent "naar beneden halen", dus de boom gaat weg; vi tar is "wij nemen".',
                accept: ['I dag tar vi ner julgranen.', 'Vi tar ner julgranen idag.']
            },
            {
                id: 'fd-tjugondedag-knut-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 2,
                nl: 'We leggen de kerstversiering in een doos.',
                sv: 'Vi lägger julpyntet ___ en låda.',
                answer: 'i',
                why: 'I betekent "in".',
                accept: []
            }
        ]
    },
    {
        id: 'fettisdagen',
        type: 'feest',
        category: 'bakdag',
        title: 'Vette dinsdag (semla-dag)',
        sv: 'Fettisdagen (semmeldagen)',
        rule: {
            easter: -47
        },
        food: 'Semla: tarwebroodje met slagroom, amandelspijs en poedersuiker. Oudere variant: hetvägg, de semla in een kom warme melk.',
        note: 'Fettisdagen is de laatste van drie feestdagen voor de vastentijd. Volgens Nordiska museet kreeg de semla pas in het midden van de 20e eeuw zijn huidige vorm; de voorloper hetväggen is van de 18e eeuw.',
        source: 'https://sv.wikipedia.org/wiki/Fettisdagen',
        items: [
            {
                id: 'fd-fettisdagen-1',
                kind: 'noun',
                field: 'eten',
                level: 1,
                nl: 'de amandelspijs',
                sv: 'mandelmassa',
                article: 'en',
                definite: 'mandelmassan',
                plural: 'mandelmassor',
                why: 'Mandelmassa is een en-woord; het meervoud wordt mandelmassor.',
                accept: []
            },
            {
                id: 'fd-fettisdagen-2',
                kind: 'noun',
                field: 'onderdeel',
                level: 1,
                nl: 'het deksel',
                sv: 'lock',
                article: 'ett',
                definite: 'locket',
                plural: 'lock',
                why: 'Lock is een ett-woord; het meervoud blijft hetzelfde.',
                accept: []
            },
            {
                id: 'fd-fettisdagen-3',
                kind: 'builder',
                field: 'zinnen',
                level: 1,
                nl: 'Ik eet een semla.',
                sv: 'Jag äter en semla.',
                pieces: ['Jag', 'äter', 'en', 'semla.'],
                why: 'Het werkwoord staat op de tweede plek: Jag äter.',
                accept: []
            },
            {
                id: 'fd-fettisdagen-4',
                kind: 'noun',
                field: 'tafel',
                level: 1,
                nl: 'het servet',
                sv: 'servett',
                article: 'en',
                definite: 'servetten',
                plural: 'servetter',
                why: 'Servett is een en-woord; het meervoud wordt servetter.',
                accept: []
            },
            {
                id: 'fd-fettisdagen-5',
                kind: 'phrase',
                field: 'zin',
                level: 2,
                nl: 'Cleo zit bij het raam en kijkt naar ons.',
                sv: 'Cleo sitter vid fönstret och tittar på oss.',
                why: 'Vid betekent "bij", tittar på is "kijkt naar" en oss is "ons".',
                accept: []
            },
            {
                id: 'fd-fettisdagen-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 1,
                nl: "We kopen twee semla's bij de bakker.",
                sv: 'Vi köper två semlor ___ bageriet.',
                answer: 'på',
                why: 'På betekent hier "bij": på bageriet is "bij de bakker".',
                accept: []
            }
        ]
    },
    {
        id: 'vaffeldagen',
        type: 'feest',
        category: 'bakdag',
        title: 'Wafeldag',
        sv: 'Våffeldagen',
        rule: {
            fixed: [3, 25]
        },
        food: 'Våfflor met sylt (jam) en slagroom.',
        note: 'De dag was Vårfrudagen (Maria Boodschap, negen maanden voor Kerst); de volksnaam werd våffeldagen, waaruit de gewoonte ontstond om wafels te eten. De datum bleef 25 maart, ook toen de kerk haar viering naar een zondag verplaatste.',
        source: 'https://sv.wikipedia.org/wiki/Våffeldagen',
        items: [
            {
                id: 'fd-vaffeldagen-1',
                kind: 'noun',
                field: 'keuken',
                level: 1,
                nl: 'het wafelijzer',
                sv: 'våffeljärn',
                article: 'ett',
                definite: 'våffeljärnet',
                plural: 'våffeljärn',
                why: 'Våffeljärn is een ett-woord; het meervoud blijft hetzelfde.',
                accept: []
            },
            {
                id: 'fd-vaffeldagen-2',
                kind: 'noun',
                field: 'eten',
                level: 1,
                nl: 'het ei',
                sv: 'ägg',
                article: 'ett',
                definite: 'ägget',
                plural: 'ägg',
                why: 'Ägg is een ett-woord; het meervoud blijft hetzelfde.',
                accept: []
            },
            {
                id: 'fd-vaffeldagen-3',
                kind: 'word',
                field: 'koken',
                level: 1,
                nl: 'bakken (in de pan of het ijzer)',
                sv: 'att grädda',
                forms: {
                    presens: 'gräddar',
                    preteritum: 'gräddade',
                    supinum: 'gräddat'
                },
                why: 'Grädda krijgt -ar in de tegenwoordige tijd en -ade in de verleden tijd.',
                accept: []
            },
            {
                id: 'fd-vaffeldagen-4',
                kind: 'noun',
                field: 'tafel',
                level: 1,
                nl: 'het bord',
                sv: 'tallrik',
                article: 'en',
                definite: 'tallriken',
                plural: 'tallrikar',
                why: 'Tallrik is een en-woord; het meervoud wordt tallrikar.',
                accept: []
            },
            {
                id: 'fd-vaffeldagen-5',
                kind: 'phrase',
                field: 'zin',
                level: 1,
                nl: 'Vandaag is het wafeldag!',
                sv: 'Idag är det våffeldagen!',
                why: 'Idag är det betekent "vandaag is het"; våffeldagen is "de wafeldag".',
                accept: ['I dag är det våffeldagen!']
            },
            {
                id: 'fd-vaffeldagen-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 2,
                nl: 'Ik hou van aardbeienjam.',
                sv: 'Jag tycker ___ jordgubbssylt.',
                answer: 'om',
                why: 'Tycker om betekent "houden van".',
                accept: []
            }
        ]
    },
    {
        id: 'skartorsdagen',
        type: 'feest',
        category: 'tradition',
        title: 'Witte donderdag',
        sv: 'Skärtorsdagen',
        rule: {
            easter: -3
        },
        food: 'Snoep of een klein muntje voor de påskkärringar; geen vaste maaltijd.',
        note: 'Kinderen verkleden zich als påskkärringar (paasheksjes) en gaan langs de deuren met zelfgemaakte paaskaarten, meestal op skärtorsdag of påskafton. Dat gaat terug op het oude geloof dat heksen voor Pasen naar Blåkulla vlogen.',
        source: 'https://sv.wikipedia.org/wiki/Skärtorsdagen',
        items: [
            {
                id: 'fd-skartorsdagen-1',
                kind: 'noun',
                field: 'traditie',
                level: 1,
                nl: 'de paasheks',
                sv: 'påskkärring',
                article: 'en',
                definite: 'påskkärringen',
                plural: 'påskkärringar',
                why: 'Påskkärring is een en-woord; het meervoud wordt påskkärringar.',
                accept: []
            },
            {
                id: 'fd-skartorsdagen-2',
                kind: 'noun',
                field: 'post',
                level: 1,
                nl: 'de kaart',
                sv: 'kort',
                article: 'ett',
                definite: 'kortet',
                plural: 'kort',
                why: 'Kort is een ett-woord; het meervoud blijft hetzelfde.',
                accept: []
            },
            {
                id: 'fd-skartorsdagen-3',
                kind: 'word',
                field: 'contact',
                level: 1,
                nl: 'kloppen',
                sv: 'att knacka',
                forms: {
                    presens: 'knackar',
                    preteritum: 'knackade',
                    supinum: 'knackat'
                },
                why: 'Knacka krijgt -ar in de tegenwoordige tijd en -ade in de verleden tijd.',
                accept: []
            },
            {
                id: 'fd-skartorsdagen-4',
                kind: 'noun',
                field: 'huis',
                level: 1,
                nl: 'de deur',
                sv: 'dörr',
                article: 'en',
                definite: 'dörren',
                plural: 'dörrar',
                why: 'Dörr is een en-woord; het meervoud wordt dörrar.',
                accept: []
            },
            {
                id: 'fd-skartorsdagen-5',
                kind: 'phrase',
                field: 'zin',
                level: 2,
                nl: 'De kinderen verkleden zich als paasheksjes.',
                sv: 'Barnen klär ut sig till påskkärringar.',
                why: 'Klär ut sig betekent "zich verkleden" en till is hier "als".',
                accept: []
            },
            {
                id: 'fd-skartorsdagen-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 2,
                nl: 'Ze kloppen op de deur en krijgen snoep.',
                sv: 'De knackar ___ dörren och får godis.',
                answer: 'på',
                why: 'Knacka på betekent "kloppen op".',
                accept: []
            }
        ]
    },
    {
        id: 'paskafton',
        type: 'feest',
        category: 'tradition',
        title: 'Paaszaterdag',
        sv: 'Påskafton',
        rule: {
            easter: -1
        },
        food: 'Påskbord: sill (haring), zalm, eieren en lam; bier en snaps. Zweden eten veel van hetzelfde als met Kerst, maar ei en lam onderscheiden de paastafel.',
        note: 'Eieren staan volgens Nordiska museet voor de opstanding en de terugkeer van de lente. Påskris (takken met gekleurde veren) werd populair in de 20e eeuw.',
        source: 'https://sv.wikipedia.org/wiki/Påsk',
        items: [
            {
                id: 'fd-paskafton-1',
                kind: 'noun',
                field: 'eten',
                level: 1,
                nl: 'de haring',
                sv: 'sill',
                article: 'en',
                definite: 'sillen',
                plural: 'sillar',
                why: 'Sill is een en-woord; het meervoud wordt sillar.',
                accept: []
            },
            {
                id: 'fd-paskafton-2',
                kind: 'noun',
                field: 'dieren',
                level: 1,
                nl: 'het lam',
                sv: 'lamm',
                article: 'ett',
                definite: 'lammet',
                plural: 'lamm',
                why: 'Lamm is een ett-woord; het meervoud blijft hetzelfde.',
                accept: []
            },
            {
                id: 'fd-paskafton-3',
                kind: 'builder',
                field: 'zinnen',
                level: 1,
                nl: 'Cleo ligt onder de tafel.',
                sv: 'Cleo ligger under bordet.',
                pieces: ['Cleo', 'ligger', 'under', 'bordet.'],
                why: 'Het werkwoord staat op de tweede plek: Cleo ligger.',
                accept: ['Under bordet ligger Cleo.']
            },
            {
                id: 'fd-paskafton-4',
                kind: 'noun',
                field: 'versiering',
                level: 1,
                nl: 'de veer',
                sv: 'fjäder',
                article: 'en',
                definite: 'fjädern',
                plural: 'fjädrar',
                why: 'Fjäder is een en-woord; het meervoud wordt fjädrar.',
                accept: []
            },
            {
                id: 'fd-paskafton-5',
                kind: 'phrase',
                field: 'zin',
                level: 2,
                nl: 'Op paaszaterdag eten we haring, eieren en zalm.',
                sv: 'På påskafton äter vi sill, ägg och lax.',
                why: 'På påskafton betekent "op paaszaterdag" en lax is zalm. Het werkwoord blijft op de tweede plek: äter vi.',
                accept: ['Vi äter sill, ägg och lax på påskafton.']
            },
            {
                id: 'fd-paskafton-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 2,
                nl: 'We steken veren op de paastakken.',
                sv: 'Vi sätter fjädrar ___ påskriset.',
                answer: 'på',
                why: 'På betekent hier "op": veren gaan op de takken.',
                accept: []
            }
        ]
    },
    {
        id: 'paskdagen',
        type: 'feest',
        category: 'helgdag',
        title: 'Eerste paasdag',
        sv: 'Påskdagen',
        rule: {
            easter: 0
        },
        food: 'Lam en eieren; verder dezelfde gerechten als op de paastafel (haring, zalm).',
        note: 'Zweden gebruikt de huidige paasregel sinds 1844. Annandag påsk (tweede paasdag) is de maandag erna en ook een feestdag.',
        source: 'https://www.kalender.se/helgdagar/2028',
        items: [
            {
                id: 'fd-paskdagen-1',
                kind: 'noun',
                field: 'dieren',
                level: 1,
                nl: 'de haas',
                sv: 'hare',
                article: 'en',
                definite: 'haren',
                plural: 'harar',
                why: 'Hare is een en-woord; het meervoud wordt harar.',
                accept: []
            },
            {
                id: 'fd-paskdagen-2',
                kind: 'noun',
                field: 'eten',
                level: 1,
                nl: 'het paasei',
                sv: 'påskägg',
                article: 'ett',
                definite: 'påskägget',
                plural: 'påskägg',
                why: 'Påskägg is een ett-woord; het meervoud blijft hetzelfde.',
                accept: []
            },
            {
                id: 'fd-paskdagen-3',
                kind: 'word',
                field: 'zoeken',
                level: 1,
                nl: 'verstoppen',
                sv: 'att gömma',
                forms: {
                    presens: 'gömmer',
                    preteritum: 'gömde',
                    supinum: 'gömt'
                },
                why: 'Gömma wordt gömmer, gömde, gömt.',
                accept: []
            },
            {
                id: 'fd-paskdagen-4',
                kind: 'noun',
                field: 'tuin',
                level: 1,
                nl: 'de tuin',
                sv: 'trädgård',
                article: 'en',
                definite: 'trädgården',
                plural: 'trädgårdar',
                why: 'Trädgård is een en-woord; het meervoud wordt trädgårdar.',
                accept: []
            },
            {
                id: 'fd-paskdagen-5',
                kind: 'phrase',
                field: 'zin',
                level: 1,
                nl: 'Fijne Pasen!',
                sv: 'Glad påsk!',
                why: 'Glad påsk zeg je met Pasen; glad betekent "blij".',
                accept: []
            },
            {
                id: 'fd-paskdagen-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 2,
                nl: 'Ik zoek naar eieren en vind een mand.',
                sv: 'Jag letar ___ ägg och hittar en korg.',
                answer: 'efter',
                why: 'Leta efter betekent "zoeken naar".',
                accept: []
            }
        ]
    },
    {
        id: 'valborgsmassoafton',
        type: 'feest',
        category: 'tradition',
        title: 'Walpurgisnacht',
        sv: 'Valborgsmässoafton',
        rule: {
            fixed: [4, 30]
        },
        food: 'Geen vast gerecht in de bronnen (in Zweedstalig Finland: struvor en mjöd).',
        note: 'Vreugdevuren vieren de komst van de lente; op Skansen in Stockholm zingen koren sinds 1894 lentelieder. Studenten dragen op 30 april hun studentenmuts.',
        source: 'https://sv.wikipedia.org/wiki/Valborgsmässoafton',
        items: [
            {
                id: 'fd-valborgsmassoafton-1',
                kind: 'noun',
                field: 'vuur',
                level: 1,
                nl: 'het vreugdevuur',
                sv: 'brasa',
                article: 'en',
                definite: 'brasan',
                plural: 'brasor',
                why: 'Brasa is een en-woord; het meervoud wordt brasor.',
                accept: []
            },
            {
                id: 'fd-valborgsmassoafton-2',
                kind: 'noun',
                field: 'muziek',
                level: 1,
                nl: 'het koor',
                sv: 'kör',
                article: 'en',
                definite: 'kören',
                plural: 'körer',
                why: 'Kör is een en-woord; het meervoud wordt körer.',
                accept: []
            },
            {
                id: 'fd-valborgsmassoafton-3',
                kind: 'word',
                field: 'zingen',
                level: 1,
                nl: 'zingen',
                sv: 'att sjunga',
                forms: {
                    presens: 'sjunger',
                    preteritum: 'sjöng',
                    supinum: 'sjungit'
                },
                why: 'Sjunga is onregelmatig: sjunger, sjöng, sjungit.',
                accept: []
            },
            {
                id: 'fd-valborgsmassoafton-4',
                kind: 'noun',
                field: 'kleding',
                level: 1,
                nl: 'de studentenmuts',
                sv: 'studentmössa',
                article: 'en',
                definite: 'studentmössan',
                plural: 'studentmössor',
                why: 'Studentmössa is een en-woord; het meervoud wordt studentmössor.',
                accept: []
            },
            {
                id: 'fd-valborgsmassoafton-5',
                kind: 'phrase',
                field: 'zin',
                level: 2,
                nl: 'We steken op Walpurgisnacht een vreugdevuur aan.',
                sv: 'Vi tänder en brasa på valborg.',
                why: 'Tänder is "steken aan", en brasa is een vreugdevuur; på valborg is "op Walpurgisnacht".',
                accept: ['På valborg tänder vi en brasa.']
            },
            {
                id: 'fd-valborgsmassoafton-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 2,
                nl: 'We warmen ons aan het vuur.',
                sv: 'Vi värmer oss ___ elden.',
                answer: 'vid',
                why: 'Vid betekent "bij" of "aan"; värmer oss is "warmen ons".',
                accept: []
            }
        ]
    },
    {
        id: 'chokladbollens-dag',
        type: 'feest',
        category: 'bakdag',
        title: 'Dag van de chokladboll',
        sv: 'Chokladbollens dag',
        rule: {
            fixed: [5, 11]
        },
        food: 'Chokladbollar: boter, havermout, suiker en cacao (soms een scheut koffie), niet gebakken maar gekoeld, gerold in parelsuiker of kokos.',
        note: 'De oudste bekende vermelding is van 1943 (Deens boek Opfindsomhed i en krisetid); Svenska Dagbladet drukte op 14 december 1943 een recept af onder een inmiddels verouderde naam. Chokladbollar worden niet gebakken, dus het is een bakdag zonder oven.',
        source: 'https://sv.wikipedia.org/wiki/Chokladboll',
        items: [
            {
                id: 'fd-chokladbollens-dag-1',
                kind: 'noun',
                field: 'zoetigheid',
                level: 1,
                nl: 'de chocoladebal',
                sv: 'chokladboll',
                article: 'en',
                definite: 'chokladbollen',
                plural: 'chokladbollar',
                why: 'Chokladboll is een en-woord; het meervoud wordt chokladbollar.',
                accept: []
            },
            {
                id: 'fd-chokladbollens-dag-2',
                kind: 'noun',
                field: 'keuken',
                level: 1,
                nl: 'de mengkom',
                sv: 'bunke',
                article: 'en',
                definite: 'bunken',
                plural: 'bunkar',
                why: 'Bunke is een en-woord; het meervoud wordt bunkar.',
                accept: []
            },
            {
                id: 'fd-chokladbollens-dag-3',
                kind: 'word',
                field: 'koken',
                level: 1,
                nl: 'mengen',
                sv: 'att blanda',
                forms: {
                    presens: 'blandar',
                    preteritum: 'blandade',
                    supinum: 'blandat'
                },
                why: 'Blanda krijgt -ar in de tegenwoordige tijd en -ade in de verleden tijd.',
                accept: []
            },
            {
                id: 'fd-chokladbollens-dag-4',
                kind: 'noun',
                field: 'bestek',
                level: 1,
                nl: 'de lepel',
                sv: 'sked',
                article: 'en',
                definite: 'skeden',
                plural: 'skedar',
                why: 'Sked is een en-woord; het meervoud wordt skedar.',
                accept: []
            },
            {
                id: 'fd-chokladbollens-dag-5',
                kind: 'phrase',
                field: 'zin',
                level: 1,
                nl: 'Ik rol de ballen door de kokos.',
                sv: 'Jag rullar bollarna i kokos.',
                why: 'Bollarna is "de ballen" en rulla i kokos is "rollen door de kokos".',
                accept: []
            },
            {
                id: 'fd-chokladbollens-dag-6',
                kind: 'gap',
                field: 'negatie',
                level: 2,
                nl: 'Cleo mag geen chocolade eten.',
                sv: 'Cleo får ___ äta choklad.',
                answer: 'inte',
                why: 'Inte betekent "niet"; får inte äta is "mag niet eten".',
                accept: []
            }
        ]
    },
    {
        id: 'mors-dag',
        type: 'feest',
        category: 'tradition',
        title: 'Moederdag',
        sv: 'Mors dag',
        rule: {
            nth: [5, 0, -1],
            avoidEaster: 49,
            instead: {
                nth: [6, 0, 1]
            }
        },
        food: 'Morsdagsmiddag (diner) en een cadeau; geen vast gerecht in de bronnen.',
        note: 'Moederdag wordt in Zweden gevierd sinds 1919, op initiatief van Cecilia Bååth-Holmberg. Het is geen officiële vlaggendag, maar veel mensen hijsen toch de vlag.',
        source: 'https://sv.wikipedia.org/wiki/Mors_dag',
        items: [
            {
                id: 'fd-mors-dag-1',
                kind: 'noun',
                field: 'familie',
                level: 1,
                nl: 'de mama',
                sv: 'mamma',
                article: 'en',
                definite: 'mamman',
                plural: 'mammor',
                why: 'Mamma is een en-woord; het meervoud wordt mammor.',
                accept: []
            },
            {
                id: 'fd-mors-dag-2',
                kind: 'noun',
                field: 'mensen',
                level: 1,
                nl: 'de moeder',
                sv: 'mor',
                article: 'en',
                definite: 'modern',
                plural: 'mödrar',
                why: 'Mor is een en-woord met een onregelmatig meervoud: mödrar.',
                accept: []
            },
            {
                id: 'fd-mors-dag-3',
                kind: 'word',
                field: 'geven',
                level: 1,
                nl: 'geven',
                sv: 'att ge',
                forms: {
                    presens: 'ger',
                    preteritum: 'gav',
                    supinum: 'gett'
                },
                why: 'Ge is onregelmatig: ger, gav, gett.',
                accept: []
            },
            {
                id: 'fd-mors-dag-4',
                kind: 'noun',
                field: 'eten',
                level: 1,
                nl: 'het avondeten',
                sv: 'middag',
                article: 'en',
                definite: 'middagen',
                plural: 'middagar',
                why: 'Middag is een en-woord; het meervoud wordt middagar.',
                accept: []
            },
            {
                id: 'fd-mors-dag-5',
                kind: 'phrase',
                field: 'zin',
                level: 1,
                nl: 'Vandaag is het moederdag.',
                sv: 'Idag är det mors dag.',
                why: 'Idag är det betekent "vandaag is het"; mors dag is "moederdag".',
                accept: ['I dag är det mors dag.']
            },
            {
                id: 'fd-mors-dag-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 2,
                nl: 'We koken het avondeten voor mama.',
                sv: 'Vi lagar middag ___ mamma.',
                answer: 'till',
                why: 'Till betekent hier "voor": middag till mamma is "avondeten voor mama". Åt kan ook.',
                accept: ['åt']
            }
        ]
    },
    {
        id: 'nationaldagen',
        type: 'feest',
        category: 'helgdag',
        title: 'Nationale feestdag',
        sv: 'Sveriges nationaldag',
        rule: {
            fixed: [6, 6]
        },
        food: 'Geen vast gerecht in de bronnen.',
        note: 'Sinds 2005 is 6 juni een wettelijke feestdag; in hetzelfde jaar verloor Pinkstermaandag die status. De dag herdenkt Gustav Vasa die in 1523 koning werd.',
        source: 'https://www.kalender.se/helgdagar/2028',
        items: [
            {
                id: 'fd-nationaldagen-1',
                kind: 'noun',
                field: 'symbool',
                level: 1,
                nl: 'de vlag',
                sv: 'flagga',
                article: 'en',
                definite: 'flaggan',
                plural: 'flaggor',
                why: 'Flagga is een en-woord; het meervoud wordt flaggor.',
                accept: []
            },
            {
                id: 'fd-nationaldagen-2',
                kind: 'noun',
                field: 'landen',
                level: 1,
                nl: 'het land',
                sv: 'land',
                article: 'ett',
                definite: 'landet',
                plural: 'länder',
                why: 'Land is een ett-woord; het meervoud wordt länder, met ä.',
                accept: []
            },
            {
                id: 'fd-nationaldagen-3',
                kind: 'word',
                field: 'feest',
                level: 1,
                nl: 'vieren',
                sv: 'att fira',
                forms: {
                    presens: 'firar',
                    preteritum: 'firade',
                    supinum: 'firat'
                },
                why: 'Fira krijgt -ar in de tegenwoordige tijd en -ade in de verleden tijd.',
                accept: []
            },
            {
                id: 'fd-nationaldagen-4',
                kind: 'noun',
                field: 'feest',
                level: 1,
                nl: 'de nationale feestdag',
                sv: 'nationaldag',
                article: 'en',
                definite: 'nationaldagen',
                plural: 'nationaldagar',
                why: 'Nationaldag is een en-woord; het meervoud wordt nationaldagar.',
                accept: []
            },
            {
                id: 'fd-nationaldagen-5',
                kind: 'phrase',
                field: 'zin',
                level: 1,
                nl: 'De vlag is blauw en geel.',
                sv: 'Flaggan är blå och gul.',
                why: 'Flaggan is "de vlag"; blå och gul zijn "blauw en geel".',
                accept: []
            },
            {
                id: 'fd-nationaldagen-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 2,
                nl: 'We drinken koffie in de tuin.',
                sv: 'Vi fikar ___ trädgården.',
                answer: 'i',
                why: 'I betekent hier "in": i trädgården is "in de tuin". Fika betekent koffie drinken, vaak met iets lekkers erbij.',
                accept: []
            }
        ]
    },
    {
        id: 'midsommarafton',
        type: 'feest',
        category: 'helgdag',
        title: 'Midzomeravond',
        sv: 'Midsommarafton',
        rule: {
            onOrAfter: [6, 19, 5]
        },
        food: 'Ingelegde haring (sill), nypotatis (nieuwe aardappelen) met dille, zure room, aardbeien; vaak met snaps en drinkliederen.',
        note: 'De midsommarstång is volgens Nordiska museet het bekendste symbool; dansen eromheen werd halverwege de 19e eeuw populair bij de burgerij. Midsommarafton wordt als zondag behandeld, dus banken en overheid zijn dicht.',
        source: 'https://sv.wikipedia.org/wiki/Midsommar',
        items: [
            {
                id: 'fd-midsommarafton-1',
                kind: 'noun',
                field: 'feest',
                level: 1,
                nl: 'de midzomerpaal',
                sv: 'midsommarstång',
                article: 'en',
                definite: 'midsommarstången',
                plural: 'midsommarstänger',
                why: 'Midsommarstång is een en-woord; in het meervoud wordt å een ä: midsommarstänger.',
                accept: []
            },
            {
                id: 'fd-midsommarafton-2',
                kind: 'noun',
                field: 'eten',
                level: 1,
                nl: 'de aardappel',
                sv: 'potatis',
                article: 'en',
                definite: 'potatisen',
                plural: 'potatisar',
                why: 'Potatis is een en-woord; het meervoud wordt potatisar.',
                accept: []
            },
            {
                id: 'fd-midsommarafton-3',
                kind: 'word',
                field: 'dansen',
                level: 1,
                nl: 'dansen',
                sv: 'att dansa',
                forms: {
                    presens: 'dansar',
                    preteritum: 'dansade',
                    supinum: 'dansat'
                },
                why: 'Dansa krijgt -ar in de tegenwoordige tijd en -ade in de verleden tijd.',
                accept: []
            },
            {
                id: 'fd-midsommarafton-4',
                kind: 'noun',
                field: 'bloemen',
                level: 1,
                nl: 'de krans',
                sv: 'krans',
                article: 'en',
                definite: 'kransen',
                plural: 'kransar',
                why: 'Krans is een en-woord; het meervoud wordt kransar.',
                accept: []
            },
            {
                id: 'fd-midsommarafton-5',
                kind: 'phrase',
                field: 'zin',
                level: 2,
                nl: 'Ik pluk bloemen voor een krans.',
                sv: 'Jag plockar blommor till en krans.',
                why: 'Plockar blommor is "plukt bloemen" en till is hier "voor".',
                accept: []
            },
            {
                id: 'fd-midsommarafton-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 1,
                nl: 'We dansen rond de midzomerpaal.',
                sv: 'Vi dansar ___ midsommarstången.',
                answer: 'runt',
                why: 'Runt betekent "rond". Kring kan ook.',
                accept: ['kring']
            }
        ]
    },
    {
        id: 'olsmassa',
        type: 'feest',
        category: 'skane',
        title: 'Dag van Sankt Olof',
        sv: 'Olsmässa (Sankt Olofs dag)',
        rule: {
            fixed: [7, 29]
        },
        food: 'Geen vast gerecht of markt gevonden; geen bevestigde olsmässa-markt in de bronnen.',
        note: 'Het dorp Sankt Olof in Österlen heeft een gotische kerk met een zilveren bijl; volgens de dorpsbeschrijving wordt een zieke genezen die negen keer met de bijl over zichzelf strijkt. Op Österlen loopt een pelgrimsweek van 25 t/m 29 juli (Jakobsdagen tot Olofsdagen), en de Sankt Olofsveckan in Hallaröd sluit op 29 juli af.',
        source: 'https://sv.wikipedia.org/wiki/Olav_den_helige',
        items: [
            {
                id: 'fd-olsmassa-1',
                kind: 'noun',
                field: 'plaats',
                level: 1,
                nl: 'het dorp',
                sv: 'by',
                article: 'en',
                definite: 'byn',
                plural: 'byar',
                why: 'By is een en-woord; het meervoud wordt byar.',
                accept: []
            },
            {
                id: 'fd-olsmassa-2',
                kind: 'noun',
                field: 'voorwerp',
                level: 1,
                nl: 'de bijl',
                sv: 'yxa',
                article: 'en',
                definite: 'yxan',
                plural: 'yxor',
                why: 'Yxa is een en-woord; het meervoud wordt yxor.',
                accept: []
            },
            {
                id: 'fd-olsmassa-3',
                kind: 'word',
                field: 'bezoeken',
                level: 1,
                nl: 'bezoeken',
                sv: 'att besöka',
                forms: {
                    presens: 'besöker',
                    preteritum: 'besökte',
                    supinum: 'besökt'
                },
                why: 'Besöka krijgt -er in de tegenwoordige tijd en -te in de verleden tijd.',
                accept: []
            },
            {
                id: 'fd-olsmassa-4',
                kind: 'noun',
                field: 'mensen',
                level: 1,
                nl: 'de pelgrim',
                sv: 'pilgrim',
                article: 'en',
                definite: 'pilgrimen',
                plural: 'pilgrimer',
                why: 'Pilgrim is een en-woord; het meervoud wordt pilgrimer.',
                accept: []
            },
            {
                id: 'fd-olsmassa-5',
                kind: 'phrase',
                field: 'zin',
                level: 2,
                nl: 'Ik gooi een muntje in de put.',
                sv: 'Jag kastar ett mynt i brunnen.',
                why: 'Kastar is "gooit", ett mynt is "een muntje" en brunnen is "de put".',
                accept: []
            },
            {
                id: 'fd-olsmassa-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 1,
                nl: 'We wandelen naar het dorp.',
                sv: 'Vi vandrar ___ byn.',
                answer: 'till',
                why: 'Till betekent "naar".',
                accept: []
            }
        ]
    },
    {
        id: 'kiviks-marknad',
        type: 'feest',
        category: 'skane',
        title: 'Markt van Kivik (Österlen)',
        sv: 'Kiviks marknad',
        rule: {
            dates: {
                2026: '2026-07-24',
                2027: '2027-07-29'
            }
        },
        span: 3,
        food: 'Marktkramen, tivoli-eten (worst, ijs); geen vaste specialiteit in de bronnen.',
        note: 'Volgens sv.wikipedia wordt de markt sinds 1866 jaarlijks gehouden (behalve tijdens de Tweede Wereldoorlog), met meer dan 1000 kooplui (knallar) en ongeveer 100.000 bezoekers; in 2020 viel hij uit door corona. De organisatie noemt zich Sveriges största marknad.',
        source: 'https://www.kiviksmarknad.se/evenemang-och-boka-biljett/',
        items: [
            {
                id: 'fd-kiviks-marknad-1',
                kind: 'noun',
                field: 'markt',
                level: 1,
                nl: 'de marktkoopman',
                sv: 'knalle',
                article: 'en',
                definite: 'knallen',
                plural: 'knallar',
                why: 'Knalle is een en-woord; het meervoud wordt knallar.',
                accept: []
            },
            {
                id: 'fd-kiviks-marknad-2',
                kind: 'noun',
                field: 'kermis',
                level: 1,
                nl: 'de draaimolen',
                sv: 'karusell',
                article: 'en',
                definite: 'karusellen',
                plural: 'karuseller',
                why: 'Karusell is een en-woord; het meervoud wordt karuseller.',
                accept: []
            },
            {
                id: 'fd-kiviks-marknad-3',
                kind: 'word',
                field: 'winkelen',
                level: 1,
                nl: 'verkopen',
                sv: 'att sälja',
                forms: {
                    presens: 'säljer',
                    preteritum: 'sålde',
                    supinum: 'sålt'
                },
                why: 'Sälja is onregelmatig: säljer, sålde, sålt.',
                accept: []
            },
            {
                id: 'fd-kiviks-marknad-4',
                kind: 'noun',
                field: 'eten',
                level: 1,
                nl: 'de worst',
                sv: 'korv',
                article: 'en',
                definite: 'korven',
                plural: 'korvar',
                why: 'Korv is een en-woord; het meervoud wordt korvar.',
                accept: []
            },
            {
                id: 'fd-kiviks-marknad-5',
                kind: 'phrase',
                field: 'zin',
                level: 1,
                nl: 'We gaan in juli naar de markt van Kivik.',
                sv: 'Vi åker till Kiviks marknad i juli.',
                why: 'Åker till is "gaan naar" en i juli is "in juli".',
                accept: ['I juli åker vi till Kiviks marknad.']
            },
            {
                id: 'fd-kiviks-marknad-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 2,
                nl: 'Er zijn veel mensen op de markt.',
                sv: 'Det är många människor ___ marknaden.',
                answer: 'på',
                why: 'På marknaden betekent "op de markt".',
                accept: []
            }
        ]
    },
    {
        id: 'kraftpremiar',
        type: 'feest',
        category: 'tradition',
        title: 'Rivierkreeftenfeest',
        sv: 'Kräftpremiär och kräftskiva',
        rule: {
            fixed: [8, 7]
        },
        approx: 'ergens in augustus',
        food: 'Gekookte kräftor met dille; brood, kaas, Västerbottenpaj; snaps, bier en drinkliederen.',
        note: 'Het woord kräftskiva verscheen volgens sv.wikipedia voor het eerst in 1931 in Zweedse kranten. Typisch zijn papieren feesthoedjes, slabbetjes en lantaarns; veel rivierkreeften worden tegenwoordig geïmporteerd uit onder meer Turkije, Spanje en China.',
        source: 'https://www.scb.se/hitta-statistik/redaktionellt/kraftor/',
        items: [
            {
                id: 'fd-kraftpremiar-1',
                kind: 'noun',
                field: 'dieren',
                level: 1,
                nl: 'de rivierkreeft',
                sv: 'kräfta',
                article: 'en',
                definite: 'kräftan',
                plural: 'kräftor',
                why: 'Kräfta is een en-woord; het meervoud wordt kräftor.',
                accept: []
            },
            {
                id: 'fd-kraftpremiar-2',
                kind: 'noun',
                field: 'kleding',
                level: 1,
                nl: 'de hoed',
                sv: 'hatt',
                article: 'en',
                definite: 'hatten',
                plural: 'hattar',
                why: 'Hatt is een en-woord; het meervoud wordt hattar.',
                accept: []
            },
            {
                id: 'fd-kraftpremiar-3',
                kind: 'word',
                field: 'koken',
                level: 1,
                nl: 'pellen',
                sv: 'att skala',
                forms: {
                    presens: 'skalar',
                    preteritum: 'skalade',
                    supinum: 'skalat'
                },
                why: 'Skala krijgt -ar in de tegenwoordige tijd en -ade in de verleden tijd.',
                accept: []
            },
            {
                id: 'fd-kraftpremiar-4',
                kind: 'noun',
                field: 'licht',
                level: 1,
                nl: 'de lantaarn',
                sv: 'lykta',
                article: 'en',
                definite: 'lyktan',
                plural: 'lyktor',
                why: 'Lykta is een en-woord; het meervoud wordt lyktor.',
                accept: []
            },
            {
                id: 'fd-kraftpremiar-5',
                kind: 'phrase',
                field: 'zin',
                level: 1,
                nl: 'Iedereen heeft een grappige hoed op.',
                sv: 'Alla har en rolig hatt på huvudet.',
                why: 'På huvudet betekent "op het hoofd" en rolig is "grappig".',
                accept: []
            },
            {
                id: 'fd-kraftpremiar-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 1,
                nl: 'We hebben in augustus een rivierkreeftenfeest.',
                sv: 'Vi har kräftskiva ___ augusti.',
                answer: 'i',
                why: 'I augusti betekent "in augustus".',
                accept: []
            }
        ]
    },
    {
        id: 'surstromningspremiaren',
        type: 'feest',
        category: 'tradition',
        title: 'Première van de zure haring',
        sv: 'Surströmmingspremiären',
        rule: {
            nth: [8, 4, 3]
        },
        food: 'Surströmming (gefermenteerde Oostzeeharing) in een klämma: tunnbröd met aardappel, ui en zure room; bier, snaps of melk.',
        note: 'Surströmming werd in de 16e eeuw gewoon toen zout schaars was in de oorlogen van Gustav Vasa. Het is vooral een specialiteit van Norrland, niet van Skåne.',
        source: 'https://sv.wikipedia.org/wiki/Surströmming',
        items: [
            {
                id: 'fd-surstromningspremiaren-1',
                kind: 'noun',
                field: 'eten',
                level: 1,
                nl: 'de gefermenteerde haring',
                sv: 'surströmming',
                article: 'en',
                definite: 'surströmmingen',
                plural: 'surströmmingar',
                why: 'Surströmming is een en-woord; het meervoud wordt surströmmingar.',
                accept: []
            },
            {
                id: 'fd-surstromningspremiaren-2',
                kind: 'noun',
                field: 'verpakking',
                level: 1,
                nl: 'het blik',
                sv: 'burk',
                article: 'en',
                definite: 'burken',
                plural: 'burkar',
                why: 'Burk is een en-woord; het meervoud wordt burkar.',
                accept: []
            },
            {
                id: 'fd-surstromningspremiaren-3',
                kind: 'word',
                field: 'zintuigen',
                level: 1,
                nl: 'ruiken',
                sv: 'att lukta',
                forms: {
                    presens: 'luktar',
                    preteritum: 'luktade',
                    supinum: 'luktat'
                },
                why: 'Lukta krijgt -ar in de tegenwoordige tijd en -ade in de verleden tijd.',
                accept: []
            },
            {
                id: 'fd-surstromningspremiaren-4',
                kind: 'noun',
                field: 'groente',
                level: 1,
                nl: 'de ui',
                sv: 'lök',
                article: 'en',
                definite: 'löken',
                plural: 'lökar',
                why: 'Lök is een en-woord; het meervoud wordt lökar.',
                accept: []
            },
            {
                id: 'fd-surstromningspremiaren-5',
                kind: 'phrase',
                field: 'zin',
                level: 2,
                nl: 'We openen het blik buiten in de tuin.',
                sv: 'Vi öppnar burken ute i trädgården.',
                why: 'Öppnar is "openen" en ute betekent "buiten".',
                accept: []
            },
            {
                id: 'fd-surstromningspremiaren-6',
                kind: 'gap',
                field: 'bijwoord',
                level: 2,
                nl: 'Het blik ruikt erg sterk.',
                sv: 'Burken luktar ___ starkt.',
                answer: 'mycket',
                why: 'Mycket betekent hier "erg".',
                accept: ['väldigt']
            }
        ]
    },
    {
        id: 'appelmarknaden',
        type: 'feest',
        category: 'skane',
        title: 'Appelmarkt van Kivik',
        sv: 'Kiviks äppelmarknad (Äppelmarknaden i Kivik)',
        rule: {
            dates: {
                2026: '2026-09-19'
            }
        },
        span: 16,
        food: 'Appels, must (appelsap), cider en lokaal streekvoedsel van Österlen; Kiviks Musteri heeft een eigen äppelhelg.',
        note: 'Volgens de officiële site wordt de markt sinds 1988 georganiseerd, en elk jaar wordt er een groot kunstwerk van appels gepresenteerd (SVT). Tijdens de markt openen veel boerderijwinkels en cideries op Österlen hun deuren (Time Out).',
        source: 'https://www.appelmarknaden.se',
        items: [
            {
                id: 'fd-appelmarknaden-1',
                kind: 'noun',
                field: 'beroep',
                level: 1,
                nl: 'de teler',
                sv: 'odlare',
                article: 'en',
                definite: 'odlaren',
                plural: 'odlare',
                why: 'Odlare is een en-woord; het meervoud blijft hetzelfde.',
                accept: []
            },
            {
                id: 'fd-appelmarknaden-2',
                kind: 'noun',
                field: 'landbouw',
                level: 1,
                nl: 'de oogst',
                sv: 'skörd',
                article: 'en',
                definite: 'skörden',
                plural: 'skördar',
                why: 'Skörd is een en-woord; het meervoud wordt skördar.',
                accept: []
            },
            {
                id: 'fd-appelmarknaden-3',
                kind: 'builder',
                field: 'zinnen',
                level: 1,
                nl: 'We gaan naar de appelmarkt.',
                sv: 'Vi åker till äppelmarknaden.',
                pieces: ['Vi', 'åker', 'till', 'äppelmarknaden.'],
                why: 'Het werkwoord staat op de tweede plek: Vi åker.',
                accept: []
            },
            {
                id: 'fd-appelmarknaden-4',
                kind: 'noun',
                field: 'seizoen',
                level: 1,
                nl: 'de herfst',
                sv: 'höst',
                article: 'en',
                definite: 'hösten',
                plural: 'höstar',
                why: 'Höst is een en-woord; het meervoud wordt höstar.',
                accept: []
            },
            {
                id: 'fd-appelmarknaden-5',
                kind: 'phrase',
                field: 'zin',
                level: 2,
                nl: 'We proeven appelsap en kopen cider.',
                sv: 'Vi smakar must och köper cider.',
                why: 'Smakar must is "proeven appelsap" en köper is "kopen".',
                accept: []
            },
            {
                id: 'fd-appelmarknaden-6',
                kind: 'gap',
                field: 'bepaalde vorm',
                level: 2,
                nl: 'In de herfst gaan we naar de appelmarkt in Kivik.',
                sv: 'På ___ åker vi till äppelmarknaden i Kivik.',
                answer: 'hösten',
                why: 'Hösten is de bepaalde vorm van höst; "in de herfst" zeg je als på hösten.',
                accept: []
            }
        ]
    },
    {
        id: 'prinsesstartans-vecka',
        type: 'feest',
        category: 'bakdag',
        title: 'Week van de prinsesstårta',
        sv: 'Prinsesstårtans vecka',
        rule: {
            nth: [9, 0, -1],
            offset: -6
        },
        span: 7,
        food: 'Prinsesstårta: cake, vanillecrème, frambozenjam en slagroom, bedekt met groene marsipan.',
        note: 'Het moderne recept staat in Mera god mat (1939) van huishoudlerares Jenny Åkerström, daar nog grön tårta genoemd. De naam komt mogelijk van de prinsessen die ze leerde koken, of van prinsessmandel.',
        source: 'https://www.mynewsdesk.com/se/bageriet/pressreleases/missa-inte-prinsesstaartans-vecka-aet-taarta-och-hjaelp-en-prinsessa-att-hjaelpa-320602',
        items: [
            {
                id: 'fd-prinsesstartans-vecka-1',
                kind: 'noun',
                field: 'zoetigheid',
                level: 1,
                nl: 'de prinsessentaart',
                sv: 'prinsesstårta',
                article: 'en',
                definite: 'prinsesstårtan',
                plural: 'prinsesstårtor',
                why: 'Prinsesstårta is een en-woord; het meervoud wordt prinsesstårtor.',
                accept: []
            },
            {
                id: 'fd-prinsesstartans-vecka-2',
                kind: 'noun',
                field: 'tijd',
                level: 1,
                nl: 'de week',
                sv: 'vecka',
                article: 'en',
                definite: 'veckan',
                plural: 'veckor',
                why: 'Vecka is een en-woord; het meervoud wordt veckor.',
                accept: []
            },
            {
                id: 'fd-prinsesstartans-vecka-3',
                kind: 'word',
                field: 'trakteren',
                level: 1,
                nl: 'trakteren',
                sv: 'att bjuda',
                forms: {
                    presens: 'bjuder',
                    preteritum: 'bjöd',
                    supinum: 'bjudit'
                },
                why: 'Bjuda is onregelmatig: bjuder, bjöd, bjudit.',
                accept: []
            },
            {
                id: 'fd-prinsesstartans-vecka-4',
                kind: 'noun',
                field: 'beroep',
                level: 1,
                nl: 'de bakker',
                sv: 'bagare',
                article: 'en',
                definite: 'bagaren',
                plural: 'bagare',
                why: 'Bagare is een en-woord; het meervoud blijft hetzelfde.',
                accept: []
            },
            {
                id: 'fd-prinsesstartans-vecka-5',
                kind: 'phrase',
                field: 'zin',
                level: 1,
                nl: 'Ik bestel een taart voor jou.',
                sv: 'Jag beställer en tårta till dig.',
                why: 'Beställer betekent "bestellen" en till dig is "voor jou".',
                accept: ['Jag beställer en tårta åt dig.']
            },
            {
                id: 'fd-prinsesstartans-vecka-6',
                kind: 'gap',
                field: 'kleur',
                level: 1,
                nl: 'De taart is groen en zacht.',
                sv: 'Tårtan är ___ och mjuk.',
                answer: 'grön',
                why: 'Grön betekent "groen"; bij een en-woord als tårtan blijft het grön.',
                accept: []
            }
        ]
    },
    {
        id: 'kanelbullens-dag',
        type: 'feest',
        category: 'bakdag',
        title: 'Dag van de kanelbulle (kaneelbroodje)',
        sv: 'Kanelbullens dag',
        rule: {
            fixed: [10, 4]
        },
        food: 'Kanelbullar: gistdeeg met kardemom, gevuld met boter, suiker en kaneel, bestrooid met parelsuiker.',
        note: 'De dag is in 1999 ingesteld door Hembakningsrådet (alleen sv.wikipedia vermeldt dit). De Zweedse kanelbulle is minder zoet dan de Amerikaanse; de huidige vorm ontstond waarschijnlijk in de jaren 1920 en werd pas in de jaren 1950 gewoon.',
        source: 'https://sv.wikipedia.org/wiki/Kanelbulle',
        items: [
            {
                id: 'fd-kanelbullens-dag-1',
                kind: 'noun',
                field: 'bakken',
                level: 1,
                nl: 'het deeg',
                sv: 'deg',
                article: 'en',
                definite: 'degen',
                plural: 'degar',
                why: 'Deg is een en-woord; het meervoud wordt degar.',
                accept: []
            },
            {
                id: 'fd-kanelbullens-dag-2',
                kind: 'noun',
                field: 'keuken',
                level: 1,
                nl: 'de oven',
                sv: 'ugn',
                article: 'en',
                definite: 'ugnen',
                plural: 'ugnar',
                why: 'Ugn is een en-woord; het meervoud wordt ugnar.',
                accept: []
            },
            {
                id: 'fd-kanelbullens-dag-3',
                kind: 'word',
                field: 'rijzen',
                level: 1,
                nl: 'rijzen (van deeg)',
                sv: 'att jäsa',
                forms: {
                    presens: 'jäser',
                    preteritum: 'jäste',
                    supinum: 'jäst'
                },
                why: 'Jäsa krijgt -er in de tegenwoordige tijd en -te in de verleden tijd: jäser, jäste, jäst.',
                accept: []
            },
            {
                id: 'fd-kanelbullens-dag-4',
                kind: 'noun',
                field: 'tijd',
                level: 1,
                nl: 'het uur',
                sv: 'timme',
                article: 'en',
                definite: 'timmen',
                plural: 'timmar',
                why: 'Timme is een en-woord; het meervoud wordt timmar.',
                accept: []
            },
            {
                id: 'fd-kanelbullens-dag-5',
                kind: 'phrase',
                field: 'zin',
                level: 1,
                nl: 'Vandaag bakken we kaneelbroodjes.',
                sv: 'Idag bakar vi kanelbullar.',
                why: 'Bakar is "bakken" en kanelbullar is het meervoud van kanelbulle.',
                accept: ['I dag bakar vi kanelbullar.']
            },
            {
                id: 'fd-kanelbullens-dag-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 1,
                nl: 'Het ruikt naar kaneel in de keuken.',
                sv: 'Det luktar kanel ___ köket.',
                answer: 'i',
                why: 'I köket betekent "in de keuken".',
                accept: []
            }
        ]
    },
    {
        id: 'gustav-adolfsdagen',
        type: 'feest',
        category: 'bakdag',
        title: 'Dag van Gustav II Adolf',
        sv: 'Gustav Adolfsdagen',
        rule: {
            fixed: [11, 6]
        },
        food: 'Gustav Adolfsbakelser (gebak), vooral bekend in Göteborg; geen verdere details in de bronnen.',
        note: 'Gustav II Adolf sneuvelde op 6 november (juliaanse kalender) 1632 bij Lützen; in Zweden en Finland is het een officiële vlaggendag. In Uppsala verzamelen studenten zich bij de obelisk, en in Göteborg eert men de stichter met gebak (alleen sv.wikipedia).',
        source: 'https://sv.wikipedia.org/wiki/Gustav_Adolfsdagen',
        items: [
            {
                id: 'fd-gustav-adolfsdagen-1',
                kind: 'noun',
                field: 'koning',
                level: 1,
                nl: 'de koning',
                sv: 'kung',
                article: 'en',
                definite: 'kungen',
                plural: 'kungar',
                why: 'Kung is een en-woord; het meervoud wordt kungar.',
                accept: []
            },
            {
                id: 'fd-gustav-adolfsdagen-2',
                kind: 'noun',
                field: 'zoetigheid',
                level: 1,
                nl: 'het gebakje',
                sv: 'bakelse',
                article: 'en',
                definite: 'bakelsen',
                plural: 'bakelser',
                why: 'Bakelse is een en-woord; het meervoud wordt bakelser.',
                accept: []
            },
            {
                id: 'fd-gustav-adolfsdagen-3',
                kind: 'builder',
                field: 'zinnen',
                level: 1,
                nl: 'Vandaag is het Gustav Adolfsdag.',
                sv: 'Idag är det Gustav Adolfsdagen.',
                pieces: ['Idag', 'är', 'det', 'Gustav Adolfsdagen.'],
                why: 'Het werkwoord staat op de tweede plek: Idag är.',
                accept: ['I dag är det Gustav Adolfsdagen.', 'Det är Gustav Adolfsdagen idag.']
            },
            {
                id: 'fd-gustav-adolfsdagen-4',
                kind: 'noun',
                field: 'geschiedenis',
                level: 1,
                nl: 'de veldslag',
                sv: 'slag',
                article: 'ett',
                definite: 'slaget',
                plural: 'slag',
                why: 'Slag is een ett-woord; het meervoud blijft hetzelfde.',
                accept: []
            },
            {
                id: 'fd-gustav-adolfsdagen-5',
                kind: 'phrase',
                field: 'zin',
                level: 2,
                nl: 'De bakkerij verkoopt Gustav Adolfsgebakjes.',
                sv: 'Bageriet säljer Gustav Adolfsbakelser.',
                why: 'Säljer is "verkoopt" en bageriet is "de bakkerij".',
                accept: []
            },
            {
                id: 'fd-gustav-adolfsdagen-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 1,
                nl: 'Ik koop een gebakje voor jou.',
                sv: 'Jag köper en bakelse ___ dig.',
                answer: 'till',
                why: 'Till betekent hier "voor": till dig is "voor jou". Åt kan ook.',
                accept: ['åt']
            }
        ]
    },
    {
        id: 'kladdkakans-dag',
        type: 'feest',
        category: 'bakdag',
        title: 'Dag van de kladdkaka',
        sv: 'Kladdkakans dag',
        rule: {
            fixed: [11, 7]
        },
        food: 'Kladdkaka: kleverige chocoladetaart, vaak met slagroom of vanilleijs.',
        note: 'Kladdkakans dag staat sinds 2008 op 7 november. Het woord kladdkaka is sinds de jaren 1980 vastgelegd en de taart werd populair in de jaren 1990; de herkomst is onzeker (twee theorieën).',
        source: 'https://sv.wikipedia.org/wiki/Kladdkaka',
        items: [
            {
                id: 'fd-kladdkakans-dag-1',
                kind: 'noun',
                field: 'zoetigheid',
                level: 1,
                nl: 'de kladdkaka (kleverige chocoladetaart)',
                sv: 'kladdkaka',
                article: 'en',
                definite: 'kladdkakan',
                plural: 'kladdkakor',
                why: 'Kladdkaka is een en-woord; het meervoud wordt kladdkakor.',
                accept: []
            },
            {
                id: 'fd-kladdkakans-dag-2',
                kind: 'noun',
                field: 'mensen',
                level: 1,
                nl: 'de gast',
                sv: 'gäst',
                article: 'en',
                definite: 'gästen',
                plural: 'gäster',
                why: 'Gäst is een en-woord; het meervoud wordt gäster.',
                accept: []
            },
            {
                id: 'fd-kladdkakans-dag-3',
                kind: 'word',
                field: 'horeca',
                level: 1,
                nl: 'serveren',
                sv: 'att servera',
                forms: {
                    presens: 'serverar',
                    preteritum: 'serverade',
                    supinum: 'serverat'
                },
                why: 'Servera krijgt -ar in de tegenwoordige tijd en -ade in de verleden tijd.',
                accept: []
            },
            {
                id: 'fd-kladdkakans-dag-4',
                kind: 'noun',
                field: 'bestek',
                level: 1,
                nl: 'de vork',
                sv: 'gaffel',
                article: 'en',
                definite: 'gaffeln',
                plural: 'gafflar',
                why: 'Gaffel is een en-woord; het meervoud wordt gafflar.',
                accept: []
            },
            {
                id: 'fd-kladdkakans-dag-5',
                kind: 'phrase',
                field: 'zin',
                level: 1,
                nl: 'De kladdkaka is zacht in het midden.',
                sv: 'Kladdkakan är mjuk i mitten.',
                why: 'Kladdkakan is "de kladdkaka" en mjuk betekent "zacht".',
                accept: []
            },
            {
                id: 'fd-kladdkakans-dag-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 2,
                nl: 'We eten kladdkaka met slagroom.',
                sv: 'Vi äter kladdkaka ___ grädde.',
                answer: 'med',
                why: 'Med betekent "met".',
                accept: []
            }
        ]
    },
    {
        id: 'alla-helgons-dag',
        type: 'feest',
        category: 'helgdag',
        title: 'Allerheiligen',
        sv: 'Alla helgons dag',
        rule: {
            onOrAfter: [10, 31, 6]
        },
        food: 'Geen vast gerecht; het gaat om kaarsen en herdenken.',
        note: 'In Zweden werd Alla helgons dag in 1953 een zaterdag tussen 31 oktober en 6 november. Kaarsen op graven aansteken werd eind 19e eeuw gebruikelijk.',
        source: 'https://www.kalender.se/helgdagar/2027',
        items: [
            {
                id: 'fd-alla-helgons-dag-1',
                kind: 'noun',
                field: 'licht',
                level: 1,
                nl: 'de kaars',
                sv: 'ljus',
                article: 'ett',
                definite: 'ljuset',
                plural: 'ljus',
                why: 'Ljus is een ett-woord; het meervoud blijft hetzelfde.',
                accept: []
            },
            {
                id: 'fd-alla-helgons-dag-2',
                kind: 'noun',
                field: 'plaats',
                level: 1,
                nl: 'het kerkhof',
                sv: 'kyrkogård',
                article: 'en',
                definite: 'kyrkogården',
                plural: 'kyrkogårdar',
                why: 'Kyrkogård is een en-woord; het meervoud wordt kyrkogårdar.',
                accept: []
            },
            {
                id: 'fd-alla-helgons-dag-3',
                kind: 'word',
                field: 'aansteken',
                level: 1,
                nl: 'aansteken',
                sv: 'att tända',
                forms: {
                    presens: 'tänder',
                    preteritum: 'tände',
                    supinum: 'tänt'
                },
                why: 'Tända wordt tänder, tände, tänt.',
                accept: []
            },
            {
                id: 'fd-alla-helgons-dag-4',
                kind: 'noun',
                field: 'herdenken',
                level: 1,
                nl: 'het graf',
                sv: 'grav',
                article: 'en',
                definite: 'graven',
                plural: 'gravar',
                why: 'Grav is een en-woord; het meervoud wordt gravar.',
                accept: []
            },
            {
                id: 'fd-alla-helgons-dag-5',
                kind: 'phrase',
                field: 'zin',
                level: 1,
                nl: 'Veel mensen steken een kaars aan op het graf.',
                sv: 'Många tänder ett ljus på graven.',
                why: 'Många is "veel", tänder ett ljus is "steken een kaars aan" en på graven is "op het graf".',
                accept: []
            },
            {
                id: 'fd-alla-helgons-dag-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 2,
                nl: 'We lopen langs het kerkhof.',
                sv: 'Vi går ___ kyrkogården.',
                answer: 'förbi',
                why: 'Förbi betekent "langs" of "voorbij".',
                accept: []
            }
        ]
    },
    {
        id: 'martensafton',
        type: 'feest',
        category: 'skane',
        title: 'Sint-Maartensavond (ganzendiner)',
        sv: 'Mårtensafton (mårtensgås)',
        rule: {
            fixed: [11, 10]
        },
        food: 'Svartsoppa (soep van ganzenbloed met kruiden), gebraden gans en skånsk äppelkaka als toetje.',
        note: 'Volgens Nordiska museet stamt het oudste schriftelijke bewijs van een Zweedse Mårtensgås uit 1557; de maaltijd is nu sterk verbonden met Skåne. Daar bleven ganzen op stoppelvelden grazen toen dat elders door landbouwhervormingen verdween.',
        source: 'https://sv.wikipedia.org/wiki/Mårtensafton',
        items: [
            {
                id: 'fd-martensafton-1',
                kind: 'noun',
                field: 'dieren',
                level: 1,
                nl: 'de gans',
                sv: 'gås',
                article: 'en',
                definite: 'gåsen',
                plural: 'gäss',
                why: 'Gås is een en-woord met een onregelmatig meervoud: gäss.',
                accept: []
            },
            {
                id: 'fd-martensafton-2',
                kind: 'noun',
                field: 'zoetigheid',
                level: 1,
                nl: 'de appeltaart',
                sv: 'äppelkaka',
                article: 'en',
                definite: 'äppelkakan',
                plural: 'äppelkakor',
                why: 'Äppelkaka is een en-woord; het meervoud wordt äppelkakor.',
                accept: []
            },
            {
                id: 'fd-martensafton-3',
                kind: 'word',
                field: 'koken',
                level: 1,
                nl: 'braden',
                sv: 'att steka',
                forms: {
                    presens: 'steker',
                    preteritum: 'stekte',
                    supinum: 'stekt'
                },
                why: 'Steka krijgt -er in de tegenwoordige tijd en -te in de verleden tijd.',
                accept: []
            },
            {
                id: 'fd-martensafton-4',
                kind: 'noun',
                field: 'meubels',
                level: 1,
                nl: 'de tafel',
                sv: 'bord',
                article: 'ett',
                definite: 'bordet',
                plural: 'bord',
                why: 'Bord is een ett-woord; het meervoud blijft hetzelfde. Let op: bord betekent "tafel"; een bord om van te eten heet tallrik.',
                accept: []
            },
            {
                id: 'fd-martensafton-5',
                kind: 'phrase',
                field: 'zin',
                level: 2,
                nl: 'Op Sint-Maartensavond eet men gans in Skåne.',
                sv: 'På mårtensafton äter man gås i Skåne.',
                why: 'Man is hier "men" en på mårtensafton is "op Sint-Maartensavond".',
                accept: []
            },
            {
                id: 'fd-martensafton-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 1,
                nl: 'We braden de gans in de oven.',
                sv: 'Vi steker gåsen ___ ugnen.',
                answer: 'i',
                why: 'I ugnen betekent "in de oven".',
                accept: []
            }
        ]
    },
    {
        id: 'fars-dag',
        type: 'feest',
        category: 'tradition',
        title: 'Vaderdag',
        sv: 'Fars dag',
        rule: {
            nth: [11, 0, 2]
        },
        food: 'Vaak een ontbijt of diner voor papa; geen vast gerecht in de bronnen.',
        note: 'Vaderdag bestaat in Zweden sinds 1931. De dag werd eerst in juni gevierd en later naar november verplaatst, zodat hij beter bij Mors dag past.',
        source: 'https://sv.wikipedia.org/wiki/Fars_dag',
        items: [
            {
                id: 'fd-fars-dag-1',
                kind: 'noun',
                field: 'familie',
                level: 1,
                nl: 'de papa',
                sv: 'pappa',
                article: 'en',
                definite: 'pappan',
                plural: 'pappor',
                why: 'Pappa is een en-woord; het meervoud wordt pappor.',
                accept: []
            },
            {
                id: 'fd-fars-dag-2',
                kind: 'noun',
                field: 'cadeau',
                level: 1,
                nl: 'het cadeau',
                sv: 'present',
                article: 'en',
                definite: 'presenten',
                plural: 'presenter',
                why: 'Present is een en-woord; het meervoud wordt presenter.',
                accept: []
            },
            {
                id: 'fd-fars-dag-3',
                kind: 'word',
                field: 'verrassen',
                level: 1,
                nl: 'verrassen',
                sv: 'att överraska',
                forms: {
                    presens: 'överraskar',
                    preteritum: 'överraskade',
                    supinum: 'överraskat'
                },
                why: 'Överraska krijgt -ar in de tegenwoordige tijd en -ade in de verleden tijd.',
                accept: []
            },
            {
                id: 'fd-fars-dag-4',
                kind: 'noun',
                field: 'lezen',
                level: 1,
                nl: 'het boek',
                sv: 'bok',
                article: 'en',
                definite: 'boken',
                plural: 'böcker',
                why: 'Bok is een en-woord met een onregelmatig meervoud: böcker.',
                accept: []
            },
            {
                id: 'fd-fars-dag-5',
                kind: 'phrase',
                field: 'zin',
                level: 1,
                nl: 'We maken ontbijt voor papa.',
                sv: 'Vi lagar frukost till pappa.',
                why: 'Lagar frukost is "maken ontbijt" en till pappa is "voor papa".',
                accept: ['Vi lagar frukost åt pappa.']
            },
            {
                id: 'fd-fars-dag-6',
                kind: 'gap',
                field: 'werkwoord',
                level: 2,
                nl: 'De kinderen geven papa een boek.',
                sv: 'Barnen ___ pappa en bok.',
                answer: 'ger',
                why: 'Ger is de tegenwoordige tijd van ge en blijft hetzelfde voor iedereen.',
                accept: []
            }
        ]
    },
    {
        id: 'forsta-advent',
        type: 'feest',
        category: 'tradition',
        title: 'Eerste advent',
        sv: 'Första advent',
        rule: {
            onOrAfter: [11, 27, 0]
        },
        food: 'Lussekatter, pepparkakor (peperkoekjes) en glögg.',
        note: 'Een elektrische zevenarmige adventskandelaar zou in Zweden zijn ontstaan; de eerste Zweedse adventskalender verscheen in 1934. In Zweden hangt men vaak een krans zonder kaarsen aan de voordeur.',
        source: 'https://sv.wikipedia.org/wiki/Advent',
        items: [
            {
                id: 'fd-forsta-advent-1',
                kind: 'noun',
                field: 'licht',
                level: 1,
                nl: 'de adventskaars',
                sv: 'adventsljus',
                article: 'ett',
                definite: 'adventsljuset',
                plural: 'adventsljus',
                why: 'Adventsljus is een ett-woord; het meervoud blijft hetzelfde.',
                accept: []
            },
            {
                id: 'fd-forsta-advent-2',
                kind: 'noun',
                field: 'zoetigheid',
                level: 1,
                nl: 'het peperkoekje',
                sv: 'pepparkaka',
                article: 'en',
                definite: 'pepparkakan',
                plural: 'pepparkakor',
                why: 'Pepparkaka is een en-woord; het meervoud wordt pepparkakor.',
                accept: []
            },
            {
                id: 'fd-forsta-advent-3',
                kind: 'word',
                field: 'drinken',
                level: 1,
                nl: 'drinken',
                sv: 'att dricka',
                forms: {
                    presens: 'dricker',
                    preteritum: 'drack',
                    supinum: 'druckit'
                },
                why: 'Dricka is onregelmatig: dricker, drack, druckit.',
                accept: []
            },
            {
                id: 'fd-forsta-advent-4',
                kind: 'noun',
                field: 'datum',
                level: 1,
                nl: 'de kalender',
                sv: 'kalender',
                article: 'en',
                definite: 'kalendern',
                plural: 'kalendrar',
                why: 'Kalender is een en-woord; het meervoud wordt kalendrar.',
                accept: []
            },
            {
                id: 'fd-forsta-advent-5',
                kind: 'phrase',
                field: 'zin',
                level: 2,
                nl: 'Vandaag steken we de eerste kaars aan.',
                sv: 'Idag tänder vi det första ljuset.',
                why: 'Tänder is "steken aan" en det första ljuset is "de eerste kaars".',
                accept: ['I dag tänder vi det första ljuset.']
            },
            {
                id: 'fd-forsta-advent-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 1,
                nl: 'Cleo kijkt naar de kaarsen in het raam.',
                sv: 'Cleo tittar ___ ljusen i fönstret.',
                answer: 'på',
                why: 'Titta på betekent "kijken naar".',
                accept: []
            }
        ]
    },
    {
        id: 'lucia',
        type: 'feest',
        category: 'tradition',
        title: 'Luciadag',
        sv: 'Luciadagen (Lucia)',
        rule: {
            fixed: [12, 13]
        },
        food: 'Lussekatter (saffraanbroodjes), pepparkakor, glögg of koffie.',
        note: 'De lussekatt stamt af van de Nederlandse duivekater en kreeg zijn naam toen hij aan 13 december werd gekoppeld. De moderne Lucia met kaarsen kreeg vorm door een wedstrijd van Stockholms Dagblad in 1928, nadat Skansen er al sinds de jaren 1890 mee bezig was.',
        source: 'https://sv.wikipedia.org/wiki/Luciadagen',
        items: [
            {
                id: 'fd-lucia-1',
                kind: 'noun',
                field: 'feest',
                level: 1,
                nl: 'Lucia (het meisje met de kroon)',
                sv: 'lucia',
                article: 'en',
                definite: 'lucian',
                plural: 'lucior',
                why: 'Lucia is een en-woord; het meervoud wordt lucior.',
                accept: []
            },
            {
                id: 'fd-lucia-2',
                kind: 'noun',
                field: 'muziek',
                level: 1,
                nl: 'het lied',
                sv: 'sång',
                article: 'en',
                definite: 'sången',
                plural: 'sånger',
                why: 'Sång is een en-woord; het meervoud wordt sånger.',
                accept: []
            },
            {
                id: 'fd-lucia-3',
                kind: 'builder',
                field: 'zinnen',
                level: 1,
                nl: 'We zingen en eten lussekatter.',
                sv: 'Vi sjunger och äter lussekatter.',
                pieces: ['Vi', 'sjunger', 'och', 'äter', 'lussekatter.'],
                why: 'Het werkwoord staat op de tweede plek: Vi sjunger.',
                accept: []
            },
            {
                id: 'fd-lucia-4',
                kind: 'noun',
                field: 'kleding',
                level: 1,
                nl: 'de kroon',
                sv: 'krona',
                article: 'en',
                definite: 'kronan',
                plural: 'kronor',
                why: 'Krona is een en-woord; het meervoud wordt kronor.',
                accept: []
            },
            {
                id: 'fd-lucia-5',
                kind: 'phrase',
                field: 'zin',
                level: 1,
                nl: 'Lucia heeft een kroon met kaarsen.',
                sv: 'Lucia har en krona med ljus.',
                why: 'Har is "heeft" en med ljus is "met kaarsen".',
                accept: []
            },
            {
                id: 'fd-lucia-6',
                kind: 'gap',
                field: 'eten',
                level: 2,
                nl: 'Ik bak lussekatter met saffraan.',
                sv: 'Jag bakar lussekatter med ___.',
                answer: 'saffran',
                why: 'Saffran is saffraan; dat geeft de lussekatter hun gele kleur.',
                accept: []
            }
        ]
    },
    {
        id: 'julafton',
        type: 'feest',
        category: 'helgdag',
        title: 'Kerstavond',
        sv: 'Julafton',
        rule: {
            fixed: [12, 24]
        },
        food: 'Julbord (köttbullar, ingelegde haring, julskinka, Janssons frestelse); risgrynsgröt met een amandel erin.',
        note: 'Kalle Anka och hans vänner önskar God Jul wordt sinds 1960 om 15.00 uur uitgezonden; veel gezinnen eten er rond die tijd. Wie de amandel in de rijstepap vindt, trouwt volgens de traditie het jaar erna.',
        source: 'https://sv.wikipedia.org/wiki/Helgdagar_i_Sverige',
        items: [
            {
                id: 'fd-julafton-1',
                kind: 'noun',
                field: 'eten',
                level: 1,
                nl: 'de kerstham',
                sv: 'julskinka',
                article: 'en',
                definite: 'julskinkan',
                plural: 'julskinkor',
                why: 'Julskinka is een en-woord; het meervoud wordt julskinkor.',
                accept: []
            },
            {
                id: 'fd-julafton-2',
                kind: 'noun',
                field: 'noten',
                level: 1,
                nl: 'de amandel',
                sv: 'mandel',
                article: 'en',
                definite: 'mandeln',
                plural: 'mandlar',
                why: 'Mandel is een en-woord; het meervoud wordt mandlar.',
                accept: []
            },
            {
                id: 'fd-julafton-3',
                kind: 'word',
                field: 'openen',
                level: 1,
                nl: 'openen',
                sv: 'att öppna',
                forms: {
                    presens: 'öppnar',
                    preteritum: 'öppnade',
                    supinum: 'öppnat'
                },
                why: 'Öppna krijgt -ar in de tegenwoordige tijd en -ade in de verleden tijd.',
                accept: []
            },
            {
                id: 'fd-julafton-4',
                kind: 'noun',
                field: 'mensen',
                level: 1,
                nl: 'de tomte (kerstkabouter, kerstman)',
                sv: 'tomte',
                article: 'en',
                definite: 'tomten',
                plural: 'tomtar',
                why: 'Tomte is een en-woord; het meervoud wordt tomtar. Met Kerst brengt de tomte de pakjes, zoals de kerstman.',
                accept: []
            },
            {
                id: 'fd-julafton-5',
                kind: 'phrase',
                field: 'zin',
                level: 1,
                nl: 'De kerstman komt met pakjes.',
                sv: 'Tomten kommer med paket.',
                why: 'Kommer med is "komt met" en paket is "pakjes".',
                accept: []
            },
            {
                id: 'fd-julafton-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 2,
                nl: 'Ik vind de amandel in de pap.',
                sv: 'Jag hittar mandeln ___ gröten.',
                answer: 'i',
                why: 'I gröten betekent "in de pap".',
                accept: []
            }
        ]
    },
    {
        id: 'nyarsafton',
        type: 'feest',
        category: 'helgdag',
        title: 'Oudejaarsavond',
        sv: 'Nyårsafton',
        rule: {
            fixed: [12, 31]
        },
        food: 'Geen vast gerecht in de bronnen; champagne om middernacht is gebruikelijk.',
        note: 'Op Skansen wordt bij middernacht een gedicht van Tennyson in Zweedse vertaling voorgelezen. De kerkklokken luiden het nieuwe jaar in op Sveriges Radio.',
        source: 'https://sv.wikipedia.org/wiki/Helgdagar_i_Sverige',
        items: [
            {
                id: 'fd-nyarsafton-1',
                kind: 'noun',
                field: 'feest',
                level: 1,
                nl: 'het vuurwerk',
                sv: 'fyrverkeri',
                article: 'ett',
                definite: 'fyrverkeriet',
                plural: 'fyrverkerier',
                why: 'Fyrverkeri is een ett-woord; het meervoud wordt fyrverkerier.',
                accept: []
            },
            {
                id: 'fd-nyarsafton-2',
                kind: 'noun',
                field: 'tijd',
                level: 1,
                nl: 'de klok',
                sv: 'klocka',
                article: 'en',
                definite: 'klockan',
                plural: 'klockor',
                why: 'Klocka is een en-woord; het meervoud wordt klockor.',
                accept: []
            },
            {
                id: 'fd-nyarsafton-3',
                kind: 'word',
                field: 'tellen',
                level: 1,
                nl: 'tellen',
                sv: 'att räkna',
                forms: {
                    presens: 'räknar',
                    preteritum: 'räknade',
                    supinum: 'räknat'
                },
                why: 'Räkna krijgt -ar in de tegenwoordige tijd en -ade in de verleden tijd.',
                accept: []
            },
            {
                id: 'fd-nyarsafton-4',
                kind: 'noun',
                field: 'voornemens',
                level: 1,
                nl: 'de belofte',
                sv: 'löfte',
                article: 'ett',
                definite: 'löftet',
                plural: 'löften',
                why: 'Löfte is een ett-woord; het meervoud wordt löften.',
                accept: []
            },
            {
                id: 'fd-nyarsafton-5',
                kind: 'phrase',
                field: 'zin',
                level: 1,
                nl: 'Om twaalf uur proosten we.',
                sv: 'Klockan tolv skålar vi.',
                why: 'Klockan tolv is "om twaalf uur" en skålar vi is "proosten we".',
                accept: ['Vi skålar klockan tolv.']
            },
            {
                id: 'fd-nyarsafton-6',
                kind: 'gap',
                field: 'voorzetsel',
                level: 2,
                nl: 'Cleo verstopt zich onder het bed voor het vuurwerk.',
                sv: 'Cleo gömmer sig ___ sängen för fyrverkeriet.',
                answer: 'under',
                why: 'Under betekent "onder".',
                accept: []
            }
        ]
    }
];
