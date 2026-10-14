/**
 * Uitjes in Österlen: losse rondjes naast het pad, elk met een eigen scène.
 * Items hebben pack: <id> in plaats van world/slot en gaan het herhaalschema in.
 */

export const OUTINGS = [
    {
        id: 'simrishamn',
        type: 'uitje',
        title: 'Naar Simrishamn',
        sv: 'Till Simrishamn',
        scene: 'Met de bus naar Simrishamn: haven, rookvis en een ijsje. Cleo past op de camper.',
        canNow: 'Nu kun je zeggen waar je heen gaat, wat je doet en hoe je reist.',
        note: 'Simrishamn hoort bij dezelfde gemeente als Sankt Olof. Sinds 1997 rijden de forensentreinen van Skåne tot hier.',
        source: 'https://en.wikipedia.org/wiki/Simrishamn',
        items: [
            {
                id: 'ut-simrishamn-n-01',
                kind: 'noun',
                field: 'gebouw',
                level: 1,
                nl: 'de apotheek',
                sv: 'apotek',
                article: 'ett',
                definite: 'apoteket',
                plural: 'apotek',
                why: 'Apotek is een ett-woord; het meervoud blijft hetzelfde.',
                accept: []
            },
            {
                id: 'ut-simrishamn-n-02',
                kind: 'noun',
                field: 'winkelen',
                level: 1,
                nl: 'de boekhandel',
                sv: 'bokhandel',
                article: 'en',
                definite: 'bokhandeln',
                plural: 'bokhandlar',
                why: 'Bokhandel is een en-woord; in het meervoud valt de e weg: bokhandlar.',
                accept: []
            },
            {
                id: 'ut-simrishamn-n-03',
                kind: 'noun',
                field: 'eten',
                level: 1,
                nl: 'de visrokerij',
                sv: 'fiskrökeri',
                article: 'ett',
                definite: 'fiskrökeriet',
                plural: 'fiskrökerier',
                why: 'Fiskrökeri is een ett-woord; het meervoud krijgt -er.',
                accept: []
            },
            {
                id: 'ut-simrishamn-n-04',
                kind: 'noun',
                field: 'vervoer',
                level: 1,
                nl: 'de trein',
                sv: 'tåg',
                article: 'ett',
                definite: 'tåget',
                plural: 'tåg',
                why: 'Tåg is een ett-woord; het meervoud is hetzelfde: ett tåg, flera tåg.',
                accept: []
            },
            {
                id: 'ut-simrishamn-w-05',
                kind: 'word',
                field: 'tijd',
                level: 1,
                nl: 'wachten',
                sv: 'att vänta',
                forms: {
                    presens: 'väntar',
                    preteritum: 'väntade',
                    supinum: 'väntat'
                },
                why: 'Vänta eindigt op -a, dus de verleden tijd wordt väntade.',
                accept: []
            },
            {
                id: 'ut-simrishamn-p-06',
                kind: 'phrase',
                field: 'vervoer',
                level: 1,
                nl: 'We nemen de bus naar Simrishamn.',
                sv: 'Vi tar bussen till Simrishamn.',
                why: 'Tar is "nemen" en bussen is "de bus"; till betekent "naar".',
                accept: []
            },
            {
                id: 'ut-simrishamn-p-07',
                kind: 'phrase',
                field: 'eten',
                level: 1,
                nl: 'We eten gerookte vis bij de haven.',
                sv: 'Vi äter rökt fisk vid hamnen.',
                why: 'Vid betekent "bij" of "aan"; rökt fisk is "gerookte vis".',
                accept: []
            },
            {
                id: 'ut-simrishamn-g-08',
                kind: 'gap',
                field: 'voorzetsel',
                level: 1,
                nl: 'We gaan met de trein naar Simrishamn.',
                sv: 'Vi åker ___ tåget till Simrishamn.',
                answer: 'med',
                why: 'Med betekent "met"; zo reis je met een vervoermiddel.',
                accept: []
            }
        ]
    },
    {
        id: 'bageriet',
        type: 'uitje',
        title: 'Bij de bakker',
        sv: 'På bageriet',
        scene: 'Het bakkertje ruikt naar kaneel en kardemom. Jacob wijst, jij bestelt.',
        canNow: 'Nu kun je iets lekkers bestellen en vragen wat het kost.',
        note: 'In Zweden is 4 oktober Kanelbullens dag, een themadag die sinds 1999 wordt gevierd. De kanelbulle zoals we hem nu kennen, ontstond na de Eerste Wereldoorlog.',
        source: 'https://en.wikipedia.org/wiki/Kanelbulle',
        items: [
            {
                id: 'ut-bageriet-n-01',
                kind: 'noun',
                field: 'winkelen',
                level: 1,
                nl: 'de bakkerij',
                sv: 'bageri',
                article: 'ett',
                definite: 'bageriet',
                plural: 'bagerier',
                why: 'Bageri is een ett-woord; het meervoud krijgt -er.',
                accept: []
            },
            {
                id: 'ut-bageriet-n-02',
                kind: 'noun',
                field: 'zoetigheid',
                level: 1,
                nl: 'de kaneelbol',
                sv: 'kanelbulle',
                article: 'en',
                definite: 'kanelbullen',
                plural: 'kanelbullar',
                why: 'Kanelbulle is een en-woord; het meervoud wordt kanelbullar.',
                accept: []
            },
            {
                id: 'ut-bageriet-n-03',
                kind: 'noun',
                field: 'traditie',
                level: 1,
                nl: 'de semla (slagroombol)',
                sv: 'semla',
                article: 'en',
                definite: 'semlan',
                plural: 'semlor',
                why: 'Semla is een en-woord; zoals bij veel woorden op -a wordt het meervoud semlor.',
                accept: []
            },
            {
                id: 'ut-bageriet-n-04',
                kind: 'noun',
                field: 'drinken',
                level: 1,
                nl: 'de koffie',
                sv: 'kaffe',
                article: 'ett',
                definite: 'kaffet',
                plural: 'kaffen',
                why: 'Kaffe is een ett-woord: ett kaffe, kaffet.',
                accept: []
            },
            {
                id: 'ut-bageriet-w-05',
                kind: 'word',
                field: 'horeca',
                level: 1,
                nl: 'bestellen',
                sv: 'att beställa',
                forms: {
                    presens: 'beställer',
                    preteritum: 'beställde',
                    supinum: 'beställt'
                },
                why: 'Beställa krijgt -er in de tegenwoordige tijd: jag beställer.',
                accept: []
            },
            {
                id: 'ut-bageriet-p-06',
                kind: 'phrase',
                field: 'horeca',
                level: 2,
                nl: 'Ik wil graag een semla.',
                sv: 'Jag skulle vilja ha en semla.',
                why: 'Jag skulle vilja ha is een vriendelijke manier om iets te vragen, letterlijk "ik zou willen hebben".',
                accept: ['Jag skulle vilja ha en semla, tack.', 'Jag vill gärna ha en semla.']
            },
            {
                id: 'ut-bageriet-p-07',
                kind: 'phrase',
                field: 'prijs',
                level: 2,
                nl: 'Hoeveel kost de kaneelbol?',
                sv: 'Hur mycket kostar kanelbullen?',
                why: 'Hur mycket kostar is de vaste vraag voor de prijs, letterlijk "hoe veel kost".',
                accept: []
            },
            {
                id: 'ut-bageriet-g-08',
                kind: 'gap',
                field: 'beleefdheid',
                level: 1,
                nl: 'Twee kaneelbollen en een koffie, alstublieft.',
                sv: 'Två kanelbullar och ett kaffe, ___.',
                answer: 'tack',
                why: 'Tack betekent "dank je" en ook "alstublieft" als je iets bestelt.',
                accept: []
            }
        ]
    },
    {
        id: 'plockstalle',
        type: 'uitje',
        title: 'Naar de pluktuin',
        sv: 'På självplock',
        scene: 'Zelf aardbeien plukken, de mand op de weegschaal. Cleo wil alleen de zon.',
        canNow: 'Nu kun je vertellen wat je plukt, wat het weegt en hoe je betaalt.',
        note: 'Wilde bessen en bloemen plukken mag in Zweden vrijwel overal (allemansrätten), maar niet op bewerkt land of in een tuin. Bij een pluktuin plukt en betaal je dus gewoon.',
        source: 'https://en.wikipedia.org/wiki/Allemansr%C3%A4tten',
        items: [
            {
                id: 'ut-plockstalle-n-01',
                kind: 'noun',
                field: 'eten',
                level: 1,
                nl: 'de aardbei',
                sv: 'jordgubbe',
                article: 'en',
                definite: 'jordgubben',
                plural: 'jordgubbar',
                why: 'Jordgubbe is een en-woord; het meervoud wordt jordgubbar.',
                accept: []
            },
            {
                id: 'ut-plockstalle-n-02',
                kind: 'noun',
                field: 'voorwerp',
                level: 1,
                nl: 'de mand',
                sv: 'korg',
                article: 'en',
                definite: 'korgen',
                plural: 'korgar',
                why: 'Korg is een en-woord; het meervoud wordt korgar.',
                accept: []
            },
            {
                id: 'ut-plockstalle-n-03',
                kind: 'noun',
                field: 'meten',
                level: 1,
                nl: 'de weegschaal',
                sv: 'våg',
                article: 'en',
                definite: 'vågen',
                plural: 'vågar',
                why: 'Våg is een en-woord; het meervoud is vågar. Let op: våg betekent ook "golf", en dat meervoud is vågor.',
                accept: []
            },
            {
                id: 'ut-plockstalle-n-04',
                kind: 'noun',
                field: 'natuur',
                level: 1,
                nl: 'de bes',
                sv: 'bär',
                article: 'ett',
                definite: 'bäret',
                plural: 'bär',
                why: 'Bär is een ett-woord; het meervoud is hetzelfde.',
                accept: []
            },
            {
                id: 'ut-plockstalle-w-05',
                kind: 'word',
                field: 'geld',
                level: 1,
                nl: 'betalen',
                sv: 'att betala',
                forms: {
                    presens: 'betalar',
                    preteritum: 'betalade',
                    supinum: 'betalat'
                },
                why: 'Betala eindigt op -a, dus de verleden tijd wordt betalade.',
                accept: []
            },
            {
                id: 'ut-plockstalle-p-06',
                kind: 'phrase',
                field: 'geld',
                level: 1,
                nl: 'Ik betaal met Swish.',
                sv: 'Jag betalar med Swish.',
                why: 'Swish is de app waarmee bijna iedereen in Zweden met de telefoon betaalt.',
                accept: []
            },
            {
                id: 'ut-plockstalle-p-07',
                kind: 'phrase',
                field: 'meten',
                level: 2,
                nl: 'Hoeveel weegt de mand?',
                sv: 'Hur mycket väger korgen?',
                why: 'Väger is "weegt"; korgen is de bepaalde vorm: de mand.',
                accept: []
            },
            {
                id: 'ut-plockstalle-g-08',
                kind: 'gap',
                field: 'bijvoeglijk naamwoord',
                level: 1,
                nl: 'De mand is vol.',
                sv: 'Korgen är ___.',
                answer: 'full',
                why: 'Korg is een en-woord, dus het woord voor "vol" blijft full.',
                accept: []
            }
        ]
    },
    {
        id: 'loppis',
        type: 'uitje',
        title: 'Naar de kringloopwinkel',
        sv: 'På loppis',
        scene: 'Een tafel vol oude spullen, en Jacob heeft alweer een lamp in zijn hand.',
        canNow: 'Nu kun je vragen naar de prijs, afdingen en zeggen dat iets een vondst is.',
        note: 'Myrorna is een Zweedse kringloopketen van het Leger des Heils. De eerste echte winkel opende in 1899 in Stockholm. De opbrengst gaat naar sociaal werk.',
        source: 'https://sv.wikipedia.org/wiki/Myrorna',
        items: [
            {
                id: 'ut-loppis-n-01',
                kind: 'noun',
                field: 'winkelen',
                level: 1,
                nl: 'de rommelmarkt, de kringloopwinkel',
                sv: 'loppis',
                article: 'en',
                definite: 'loppisen',
                plural: 'loppisar',
                why: 'Loppis is een en-woord; het meervoud wordt loppisar.',
                accept: []
            },
            {
                id: 'ut-loppis-n-02',
                kind: 'noun',
                field: 'prijs',
                level: 1,
                nl: 'het prijskaartje',
                sv: 'prislapp',
                article: 'en',
                definite: 'prislappen',
                plural: 'prislappar',
                why: 'Prislapp is een en-woord; het meervoud wordt prislappar.',
                accept: []
            },
            {
                id: 'ut-loppis-n-03',
                kind: 'noun',
                field: 'huis',
                level: 1,
                nl: 'de lamp',
                sv: 'lampa',
                article: 'en',
                definite: 'lampan',
                plural: 'lampor',
                why: 'Lampa is een en-woord; bij en-woorden op -a wordt het meervoud -or: lampor.',
                accept: []
            },
            {
                id: 'ut-loppis-n-04',
                kind: 'noun',
                field: 'kleding',
                level: 1,
                nl: 'de trui',
                sv: 'tröja',
                article: 'en',
                definite: 'tröjan',
                plural: 'tröjor',
                why: 'Tröja is een en-woord; het meervoud wordt tröjor.',
                accept: []
            },
            {
                id: 'ut-loppis-w-05',
                kind: 'word',
                field: 'prijs',
                level: 1,
                nl: 'afdingen',
                sv: 'att pruta',
                forms: {
                    presens: 'prutar',
                    preteritum: 'prutade',
                    supinum: 'prutat'
                },
                why: 'Pruta eindigt op -a, dus de verleden tijd wordt prutade.',
                accept: []
            },
            {
                id: 'ut-loppis-p-06',
                kind: 'phrase',
                field: 'oordeel',
                level: 1,
                nl: 'Dit is een koopje!',
                sv: 'Det här är ett fynd!',
                why: 'Ett fynd is een goede vondst of een koopje, zoals een mooie lamp voor weinig geld.',
                accept: []
            },
            {
                id: 'ut-loppis-p-07',
                kind: 'phrase',
                field: 'prijs',
                level: 2,
                nl: 'Op het prijskaartje staat vijftig kronen.',
                sv: 'Det står femtio kronor på prislappen.',
                why: 'Det står ... på prislappen is "er staat ... op het prijskaartje". Prislappen is de bepaalde vorm; kronor is het meervoud van krona.',
                accept: []
            },
            {
                id: 'ut-loppis-g-08',
                kind: 'gap',
                field: 'bijvoeglijk naamwoord',
                level: 1,
                nl: 'De lamp is oud.',
                sv: 'Lampan är ___.',
                answer: 'gammal',
                why: 'Lampa is een en-woord, dus het woord voor "oud" blijft gammal.',
                accept: []
            }
        ]
    },
    {
        id: 'kivik',
        type: 'uitje',
        title: 'Naar Kivik, de appelstreek',
        sv: 'Till Kivik',
        scene: 'Appels proeven bij het musteri. Cleo ruikt alleen de hond van de buren.',
        canNow: 'Nu kun je zeggen wat je proeft, wat je koopt en waar je heen gaat.',
        note: 'Kivik is het centrum van de appelteelt in de streek. Het musteri maakt onder meer cider en glögg.',
        source: 'https://sv.wikipedia.org/wiki/Kivik',
        items: [
            {
                id: 'ut-kivik-n-01',
                kind: 'noun',
                field: 'landbouw',
                level: 1,
                nl: 'de sapfabriek',
                sv: 'musteri',
                article: 'ett',
                definite: 'musteriet',
                plural: 'musterier',
                why: 'Musteri is een ett-woord; het meervoud krijgt -er.',
                accept: []
            },
            {
                id: 'ut-kivik-n-02',
                kind: 'noun',
                field: 'voorwerp',
                level: 1,
                nl: 'de fles',
                sv: 'flaska',
                article: 'en',
                definite: 'flaskan',
                plural: 'flaskor',
                why: 'Flaska is een en-woord; het meervoud wordt flaskor.',
                accept: []
            },
            {
                id: 'ut-kivik-n-03',
                kind: 'noun',
                field: 'plaats',
                level: 1,
                nl: 'de markt',
                sv: 'marknad',
                article: 'en',
                definite: 'marknaden',
                plural: 'marknader',
                why: 'Marknad is een en-woord; het meervoud krijgt -er.',
                accept: []
            },
            {
                id: 'ut-kivik-n-04',
                kind: 'noun',
                field: 'eten',
                level: 1,
                nl: 'het fruit',
                sv: 'frukt',
                article: 'en',
                definite: 'frukten',
                plural: 'frukter',
                why: 'Frukt is een en-woord; het meervoud krijgt -er. Meestal zeg je gewoon frukt, ook voor meerdere stukken.',
                accept: []
            },
            {
                id: 'ut-kivik-w-05',
                kind: 'word',
                field: 'eten',
                level: 1,
                nl: 'proeven, smaken',
                sv: 'att smaka',
                forms: {
                    presens: 'smakar',
                    preteritum: 'smakade',
                    supinum: 'smakat'
                },
                why: 'Smaka betekent zowel "proeven" als "smaken": äpplet smakar gott.',
                accept: []
            },
            {
                id: 'ut-kivik-p-06',
                kind: 'phrase',
                field: 'eten',
                level: 1,
                nl: 'De appels smaken lekker.',
                sv: 'Äpplena smakar gott.',
                why: 'Äpplena is het bepaalde meervoud: de appels. Smakar blijft hetzelfde bij één of meer appels.',
                accept: []
            },
            {
                id: 'ut-kivik-p-07',
                kind: 'phrase',
                field: 'plaats',
                level: 1,
                nl: 'We gaan naar de markt in Kivik.',
                sv: 'Vi går på marknaden i Kivik.',
                why: 'På marknaden is "op de markt"; i Kivik is "in Kivik". Je kunt ook till marknaden zeggen: "naar de markt".',
                accept: ['Vi går till marknaden i Kivik.']
            },
            {
                id: 'ut-kivik-g-08',
                kind: 'gap',
                field: 'meervoud',
                level: 1,
                nl: 'We kopen twee flessen appelsap.',
                sv: 'Vi köper två ___ äppelmust.',
                answer: 'flaskor',
                why: 'Flaska is een en-woord op -a, dus het meervoud wordt flaskor.',
                accept: []
            }
        ]
    },
    {
        id: 'ales-stenar',
        type: 'uitje',
        title: 'Naar Ales stenar',
        sv: 'Till Ales stenar',
        scene: 'Boven op de klif bij Kåseberga ligt een schip van steen. Cleo blijft in de camper.',
        canNow: 'Nu kun je vertellen waar je heen loopt en wat je ziet.',
        note: "Ales stenar bestaat uit 59 grote stenen in de vorm van een schip van zo'n 67 meter lang. Ze zijn ongeveer 1400 jaar oud.",
        source: 'https://en.wikipedia.org/wiki/Ale%27s_Stones',
        items: [
            {
                id: 'ut-ales-stenar-n-01',
                kind: 'noun',
                field: 'natuur',
                level: 1,
                nl: 'de steen',
                sv: 'sten',
                article: 'en',
                definite: 'stenen',
                plural: 'stenar',
                why: 'Sten is een en-woord; het meervoud wordt stenar.',
                accept: []
            },
            {
                id: 'ut-ales-stenar-n-02',
                kind: 'noun',
                field: 'vervoer',
                level: 1,
                nl: 'het schip',
                sv: 'skepp',
                article: 'ett',
                definite: 'skeppet',
                plural: 'skepp',
                why: 'Skepp is een ett-woord; het meervoud is hetzelfde.',
                accept: []
            },
            {
                id: 'ut-ales-stenar-n-03',
                kind: 'noun',
                field: 'uitzicht',
                level: 1,
                nl: 'het uitzicht',
                sv: 'utsikt',
                article: 'en',
                definite: 'utsikten',
                plural: 'utsikter',
                why: 'Utsikt is een en-woord; het meervoud krijgt -er.',
                accept: []
            },
            {
                id: 'ut-ales-stenar-n-04',
                kind: 'noun',
                field: 'dieren',
                level: 1,
                nl: 'de vis',
                sv: 'fisk',
                article: 'en',
                definite: 'fisken',
                plural: 'fiskar',
                why: 'Fisk is een en-woord; het meervoud wordt fiskar.',
                accept: []
            },
            {
                id: 'ut-ales-stenar-w-05',
                kind: 'word',
                field: 'beweging',
                level: 1,
                nl: 'gaan, lopen',
                sv: 'att gå',
                forms: {
                    presens: 'går',
                    preteritum: 'gick',
                    supinum: 'gått'
                },
                why: 'Gå is onregelmatig: går, gick, gått.',
                accept: []
            },
            {
                id: 'ut-ales-stenar-p-06',
                kind: 'phrase',
                field: 'beweging',
                level: 1,
                nl: 'We lopen omhoog naar de stenen.',
                sv: 'Vi går upp till stenarna.',
                why: 'Upp betekent "omhoog" en stenarna is de bepaalde vorm: de stenen.',
                accept: []
            },
            {
                id: 'ut-ales-stenar-p-07',
                kind: 'phrase',
                field: 'vergelijking',
                level: 2,
                nl: 'De stenen zien eruit als een schip.',
                sv: 'Stenarna ser ut som ett skepp.',
                why: 'Ser ut som is "ziet eruit als"; ett skepp is een ett-woord.',
                accept: []
            },
            {
                id: 'ut-ales-stenar-g-08',
                kind: 'gap',
                field: 'bijvoeglijk naamwoord',
                level: 1,
                nl: 'Het uitzicht is mooi.',
                sv: 'Utsikten är ___.',
                answer: 'vacker',
                why: 'Utsikt is een en-woord, dus het woord voor "mooi" blijft vacker.',
                accept: ['fin']
            }
        ]
    },
    {
        id: 'brosarp',
        type: 'uitje',
        title: 'Wandelen bij Brösarp',
        sv: 'Till Brösarps backar',
        scene: 'Op en neer door de heuvels bij Brösarp. Jacob loopt voorop, Cleo kijkt mee vanuit de rugzak.',
        canNow: 'Nu kun je vertellen wat je ziet en dat je gaat wandelen.',
        note: 'Brösarps backar zijn heuvels uit de laatste ijstijd, bekend om hun bloemen. Begrazing houdt het landschap open.',
        source: 'https://sv.wikipedia.org/wiki/Brösarps_backar',
        items: [
            {
                id: 'ut-brosarp-n-01',
                kind: 'noun',
                field: 'natuur',
                level: 1,
                nl: 'de heuvel',
                sv: 'backe',
                article: 'en',
                definite: 'backen',
                plural: 'backar',
                why: 'Backe is een en-woord; het meervoud wordt backar.',
                accept: []
            },
            {
                id: 'ut-brosarp-n-02',
                kind: 'noun',
                field: 'dieren',
                level: 1,
                nl: 'het schaap',
                sv: 'får',
                article: 'ett',
                definite: 'fåret',
                plural: 'får',
                why: 'Får is een ett-woord; het meervoud is hetzelfde, in de bepaalde vorm fåren.',
                accept: []
            },
            {
                id: 'ut-brosarp-n-03',
                kind: 'noun',
                field: 'weg',
                level: 1,
                nl: 'het pad',
                sv: 'stig',
                article: 'en',
                definite: 'stigen',
                plural: 'stigar',
                why: 'Stig is een en-woord; het meervoud wordt stigar.',
                accept: []
            },
            {
                id: 'ut-brosarp-n-04',
                kind: 'noun',
                field: 'planten',
                level: 1,
                nl: 'de sleutelbloem',
                sv: 'gullviva',
                article: 'en',
                definite: 'gullvivan',
                plural: 'gullvivor',
                why: 'Gullviva is een en-woord; bij en-woorden op -a wordt het meervoud -or.',
                accept: []
            },
            {
                id: 'ut-brosarp-w-05',
                kind: 'word',
                field: 'vrije tijd',
                level: 1,
                nl: 'wandelen',
                sv: 'att vandra',
                forms: {
                    presens: 'vandrar',
                    preteritum: 'vandrade',
                    supinum: 'vandrat'
                },
                why: 'Vandra eindigt op -a, dus de verleden tijd wordt vandrade.',
                accept: []
            },
            {
                id: 'ut-brosarp-p-06',
                kind: 'phrase',
                field: 'beweging',
                level: 1,
                nl: 'We wandelen over het pad in de heuvels.',
                sv: 'Vi vandrar på stigen i backarna.',
                why: 'På stigen is "op het pad"; i backarna is "in de heuvels".',
                accept: []
            },
            {
                id: 'ut-brosarp-p-07',
                kind: 'phrase',
                field: 'dieren',
                level: 2,
                nl: 'De schapen eten gras.',
                sv: 'Fåren äter gräs.',
                why: 'Fåren is het bepaalde meervoud: de schapen. Gräs heeft hier geen lidwoord, net als "gras" in het Nederlands.',
                accept: []
            },
            {
                id: 'ut-brosarp-g-08',
                kind: 'gap',
                field: 'bijvoeglijk naamwoord',
                level: 1,
                nl: 'De heuvel is groen.',
                sv: 'Backen är ___.',
                answer: 'grön',
                why: 'Backe is een en-woord, dus het woord voor "groen" blijft grön.',
                accept: []
            }
        ]
    }
];
