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
        items: []
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
        items: []
    },
    {
        id: 'tjugondedag-knut',
        type: 'feest',
        category: 'tradition',
        title: 'Twintigste dag Knut (einde van Kerst)',
        sv: 'Tjugondedag Knut',
        rule: {
            fixed: [1, 13]
        },
        food: 'Traditioneel at men alle overgebleven kerstetenswaren op.',
        note: 'De dag is genoemd naar de Deense prins Knut Lavard (vermoord in 1131). Het gezegde "Tjugondag Knut körs julen ut" betekent: op twintigste dag Knut wordt Kerst de deur uit gejaagd. Tegenwoordig ruimt men vooral de kerstboom en de kerstversiering op.',
        source: 'https://sv.wikipedia.org/wiki/Tjugondedag_Knut',
        items: []
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
        items: []
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
        items: []
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
        items: []
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
        items: []
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
        items: []
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
        items: []
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
        items: []
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
        items: []
    },
    {
        id: 'nationaldagen',
        type: 'feest',
        category: 'helgdag',
        title: 'Nationale feestdag van Zweden',
        sv: 'Sveriges nationaldag',
        rule: {
            fixed: [6, 6]
        },
        food: 'Geen vast gerecht in de bronnen.',
        note: 'Sinds 2005 is 6 juni een wettelijke feestdag; in hetzelfde jaar verloor Pinkstermaandag die status. De dag herdenkt Gustav Vasa die in 1523 koning werd.',
        source: 'https://www.kalender.se/helgdagar/2028',
        items: []
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
        food: 'Ingelegde haring (sill), nypotatis met dille, zure room, aardbeien; vaak met snaps en drinkliederen.',
        note: 'De midsommarstång is volgens Nordiska museet het bekendste symbool; dansen eromheen werd halverwege de 19e eeuw populair bij de burgerij. Midsommarafton wordt als zondag behandeld, dus banken en overheid zijn dicht.',
        source: 'https://sv.wikipedia.org/wiki/Midsommar',
        items: []
    },
    {
        id: 'olsmassa',
        type: 'feest',
        category: 'skane',
        title: 'Olsmässa (Sint-Olofsdag)',
        sv: 'Olsmässa (Sankt Olofs dag)',
        rule: {
            fixed: [7, 29]
        },
        food: 'Geen vast gerecht of markt gevonden; geen bevestigde olsmässa-markt in de bronnen.',
        note: 'Het dorp Sankt Olof in Österlen heeft een gotische kerk met een zilveren bijl; volgens de dorpsbeschrijving wordt een zieke genezen die negen keer met de bijl over zichzelf strijkt. Op Österlen loopt een pelgrimsweek van 25 t/m 29 juli (Jakobsdagen tot Olofsdagen), en de Sankt Olofsveckan in Hallaröd sluit op 29 juli af.',
        source: 'https://sv.wikipedia.org/wiki/Olav_den_helige',
        items: []
    },
    {
        id: 'kiviks-marknad',
        type: 'feest',
        category: 'skane',
        title: 'Kiviks markt (Kivik, Österlen)',
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
        items: []
    },
    {
        id: 'kraftpremiar',
        type: 'feest',
        category: 'tradition',
        title: 'Kreeftenpremiere en kreeftenfeest',
        sv: 'Kräftpremiär och kräftskiva',
        rule: {
            fixed: [8, 7]
        },
        approx: 'ergens in augustus',
        food: 'Gekookte kräftor met dille; brood, kaas, Västerbottenpaj; snaps, bier en drinkliederen.',
        note: 'Het woord kräftskiva verscheen volgens sv.wikipedia voor het eerst in 1931 in Zweedse kranten. Typisch zijn papieren feesthoedjes, slabbetjes en lantaarns; veel kreeften worden tegenwoordig geïmporteerd uit onder meer Turkije, Spanje en China.',
        source: 'https://www.scb.se/hitta-statistik/redaktionellt/kraftor/',
        items: []
    },
    {
        id: 'surstromningspremiaren',
        type: 'feest',
        category: 'tradition',
        title: 'Premiere van de zure haring',
        sv: 'Surströmmingspremiären',
        rule: {
            nth: [8, 4, 3]
        },
        food: 'Surströmming (gefermenteerde Oostzeeharing) in een klämma: tunnbröd met aardappel, ui en zure room; bier, snaps of melk.',
        note: 'Surströmming werd in de 16e eeuw gewoon toen zout schaars was in de oorlogen van Gustav Vasa. Het is vooral een specialiteit van Norrland, niet van Skåne.',
        source: 'https://sv.wikipedia.org/wiki/Surströmming',
        items: []
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
        items: []
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
        items: []
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
        items: []
    },
    {
        id: 'gustav-adolfsdagen',
        type: 'feest',
        category: 'bakdag',
        title: 'Gustaaf Adolfdag',
        sv: 'Gustav Adolfsdagen',
        rule: {
            fixed: [11, 6]
        },
        food: 'Gustav Adolfsbakelser (gebak), vooral bekend in Göteborg; geen verdere details in de bronnen.',
        note: 'Gustaaf II Adolf sneuvelde op 6 november (juliaanse kalender) 1632 bij Lützen; in Zweden en Finland is het een officiële vlaggendag. In Uppsala verzamelen studenten zich bij de obelisk, en in Göteborg eert men de stichter met gebak (alleen sv.wikipedia).',
        source: 'https://sv.wikipedia.org/wiki/Gustav_Adolfsdagen',
        items: []
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
        items: []
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
        items: []
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
        items: []
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
        food: 'Vaak een ontbijt of diner voor pappa; geen vast gerecht in de bronnen.',
        note: 'Vaderdag bestaat in Zweden sinds 1931. De dag werd eerst in juni gevierd en later naar november verplaatst, zodat hij beter bij Mors dag past.',
        source: 'https://sv.wikipedia.org/wiki/Fars_dag',
        items: []
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
        items: []
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
        items: []
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
        items: []
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
        items: []
    }
];
