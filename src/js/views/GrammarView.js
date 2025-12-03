/**
 * Grammar View
 * Swedish grammar lessons and explanations
 */

import { escapeHtml } from '../utils/helpers.js';

/**
 * Grammar topics data
 */
const grammarTopics = {
    articles: {
        name: 'Lidwoorden',
        icon: 'fa-font',
        color: 'var(--scandi-blue)',
        description: 'en/ett en de/den/det',
        content: `
            <h3 class="text-lg font-bold mb-3">Het geslacht: utrum en neutrum</h3>
            <p class="mb-4">Het Zweeds kent twee geslachten voor zelfstandige naamwoorden:</p>
            <ul class="space-y-2 mb-6">
                <li><strong>Utrum</strong> (en-woorden) - vergelijkbaar met Nederlandse 'de'-woorden</li>
                <li><strong>Neutrum</strong> (ett-woorden) - vergelijkbaar met Nederlandse 'het'-woorden</li>
            </ul>
            <p class="mb-4 text-sm text-gray-600">Let op: de overeenkomst gaat niet altijd op! Vergelijk: <em>en station</em> (een station) maar <em>ett äpple</em> (een appel).</p>

            <h3 class="text-lg font-bold mb-3">Onbepaalde lidwoorden</h3>
            <table class="w-full text-left mb-6">
                <thead class="bg-gray-100">
                    <tr><th class="p-2">Zweeds</th><th class="p-2">Nederlands</th><th class="p-2">Voorbeelden</th></tr>
                </thead>
                <tbody>
                    <tr class="border-b"><td class="p-2"><strong>en</strong></td><td class="p-2">een (de-woord)</td><td class="p-2">en katt, en ros, en tidning</td></tr>
                    <tr><td class="p-2"><strong>ett</strong></td><td class="p-2">een (het-woord)</td><td class="p-2">ett hus, ett barn, ett äpple</td></tr>
                </tbody>
            </table>

            <h3 class="text-lg font-bold mb-3">Bepaalde lidwoorden (enkelvoud)</h3>
            <p class="mb-4">Het bepaalde lidwoord wordt als suffix aan het naamwoord gehecht:</p>
            <div class="overflow-x-auto -mx-4 px-4 mb-6">
                <table class="w-full text-left text-sm min-w-[400px]">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">Type</th><th class="p-2">Suffix</th><th class="p-2">Onbepaald</th><th class="p-2">Bepaald</th><th class="p-2">NL</th></tr>
                    </thead>
                    <tbody>
                        <tr class="border-b"><td class="p-2" rowspan="4">en-woorden</td><td class="p-2">-en/-n</td><td class="p-2">en flicka</td><td class="p-2">flickan</td><td class="p-2">het meisje</td></tr>
                        <tr class="border-b"><td class="p-2">-en/-n</td><td class="p-2">en ros</td><td class="p-2">rosen</td><td class="p-2">de roos</td></tr>
                        <tr class="border-b"><td class="p-2">-en</td><td class="p-2">en tidning</td><td class="p-2">tidningen</td><td class="p-2">de krant</td></tr>
                        <tr class="border-b"><td class="p-2">-n</td><td class="p-2">en sko</td><td class="p-2">skon</td><td class="p-2">de schoen</td></tr>
                        <tr class="border-b"><td class="p-2" rowspan="3">ett-woorden</td><td class="p-2">-et/-t</td><td class="p-2">ett barn</td><td class="p-2">barnet</td><td class="p-2">het kind</td></tr>
                        <tr class="border-b"><td class="p-2">-et</td><td class="p-2">ett hus</td><td class="p-2">huset</td><td class="p-2">het huis</td></tr>
                        <tr><td class="p-2">-t</td><td class="p-2">ett äpple</td><td class="p-2">äpplet</td><td class="p-2">de appel</td></tr>
                    </tbody>
                </table>
            </div>

            <h3 class="text-lg font-bold mb-3">Meer voorbeelden en-woorden</h3>
            <div class="grid grid-cols-2 gap-2 mb-6 text-sm">
                <div class="p-2 bg-blue-50 rounded">en katt → katten</div>
                <div class="p-2 bg-blue-50 rounded">en hund → hunden</div>
                <div class="p-2 bg-blue-50 rounded">en vägg → väggen</div>
                <div class="p-2 bg-blue-50 rounded">en bro → bron</div>
                <div class="p-2 bg-blue-50 rounded">en pojke → pojken</div>
                <div class="p-2 bg-blue-50 rounded">en fågel → fågeln</div>
                <div class="p-2 bg-blue-50 rounded">en dator → datorn</div>
                <div class="p-2 bg-blue-50 rounded">en lärare → läraren</div>
            </div>

            <h3 class="text-lg font-bold mb-3">Meer voorbeelden ett-woorden</h3>
            <div class="grid grid-cols-2 gap-2 mb-6 text-sm">
                <div class="p-2 bg-teal-50 rounded">ett land → landet</div>
                <div class="p-2 bg-teal-50 rounded">ett museum → museet</div>
                <div class="p-2 bg-teal-50 rounded">ett bageri → bageriet</div>
                <div class="p-2 bg-teal-50 rounded">ett knä → knät</div>
                <div class="p-2 bg-teal-50 rounded">ett öra → örat</div>
                <div class="p-2 bg-teal-50 rounded">ett problem → problemet</div>
                <div class="p-2 bg-teal-50 rounded">ett fönster → fönstret</div>
                <div class="p-2 bg-teal-50 rounded">ett tecken → tecknet</div>
            </div>

            <h3 class="text-lg font-bold mb-3">Samengestelde naamwoorden</h3>
            <p class="mb-4">Bij samengestelde naamwoorden bepaalt het <strong>laatste deel</strong> het geslacht:</p>
            <ul class="space-y-2 text-sm">
                <li><strong>blod</strong> (ett) + <strong>grupp</strong> (en) = <strong>en blodgrupp</strong> (een bloedgroep)</li>
                <li><strong>bok</strong> (en) + <strong>handel</strong> (en) = <strong>en bokhandel</strong> (een boekhandel)</li>
            </ul>
        `
    },
    plurals: {
        name: 'Meervoud',
        icon: 'fa-clone',
        color: 'var(--scandi-green)',
        description: 'De 5 meervoudsgroepen',
        content: `
            <h3 class="text-lg font-bold mb-3">De vijf meervoudsgroepen</h3>
            <p class="mb-4">Het Zweeds kent vijf verschillende groepen voor meervoudsvorming:</p>

            <div class="space-y-6">
                <!-- Groep 1 -->
                <div class="bg-green-50 rounded-xl p-4">
                    <h4 class="font-bold text-green-800 mb-2">Groep 1: meervoud op -or</h4>
                    <p class="text-sm mb-3">Alleen <strong>en-woorden</strong>. Woorden op -a verliezen de -a in het meervoud.</p>
                    <table class="w-full text-left text-sm">
                        <thead class="bg-green-100">
                            <tr><th class="p-2">Enkelvoud</th><th class="p-2">Meervoud</th><th class="p-2">Nederlands</th></tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-green-200"><td class="p-2">en flicka</td><td class="p-2">två flickor</td><td class="p-2">meisjes</td></tr>
                            <tr class="border-b border-green-200"><td class="p-2">en ros</td><td class="p-2">två rosor</td><td class="p-2">rozen</td></tr>
                            <tr class="border-b border-green-200"><td class="p-2">en våg</td><td class="p-2">två vågor</td><td class="p-2">golven</td></tr>
                            <tr><td class="p-2">en toffel</td><td class="p-2">två tofflor</td><td class="p-2">pantoffels</td></tr>
                        </tbody>
                    </table>
                </div>

                <!-- Groep 2 -->
                <div class="bg-blue-50 rounded-xl p-4">
                    <h4 class="font-bold text-blue-800 mb-2">Groep 2: meervoud op -ar</h4>
                    <p class="text-sm mb-3">Alleen <strong>en-woorden</strong>. Veel éénlettergrepige en tweelettergrepige woorden op -e, -el, -en, -er.</p>
                    <table class="w-full text-left text-sm">
                        <thead class="bg-blue-100">
                            <tr><th class="p-2">Enkelvoud</th><th class="p-2">Meervoud</th><th class="p-2">Nederlands</th></tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-blue-200"><td class="p-2">en tidning</td><td class="p-2">två tidningar</td><td class="p-2">kranten</td></tr>
                            <tr class="border-b border-blue-200"><td class="p-2">en pojke</td><td class="p-2">två pojkar</td><td class="p-2">jongens</td></tr>
                            <tr class="border-b border-blue-200"><td class="p-2">en fågel</td><td class="p-2">två fåglar</td><td class="p-2">vogels</td></tr>
                            <tr class="border-b border-blue-200"><td class="p-2">en sommar</td><td class="p-2">två somrar</td><td class="p-2">zomers</td></tr>
                            <tr><td class="p-2">en syster</td><td class="p-2">två systrar</td><td class="p-2">zusters</td></tr>
                        </tbody>
                    </table>
                    <p class="text-xs text-blue-600 mt-2">Let op klinkerwisseling: en dotter → två döttrar, en moder → två mödrar</p>
                </div>

                <!-- Groep 3 -->
                <div class="bg-amber-50 rounded-xl p-4">
                    <h4 class="font-bold text-amber-800 mb-2">Groep 3: meervoud op -er</h4>
                    <p class="text-sm mb-3">Zowel <strong>en-woorden</strong> als <strong>ett-woorden</strong>. Woorden op -nad, -(n)är, -het, -skap, -ion en leenwoorden.</p>
                    <table class="w-full text-left text-sm">
                        <thead class="bg-amber-100">
                            <tr><th class="p-2">Enkelvoud</th><th class="p-2">Meervoud</th><th class="p-2">Nederlands</th></tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-amber-200"><td class="p-2">en dikt</td><td class="p-2">två dikter</td><td class="p-2">gedichten</td></tr>
                            <tr class="border-b border-amber-200"><td class="p-2">en byggnad</td><td class="p-2">två byggnader</td><td class="p-2">gebouwen</td></tr>
                            <tr class="border-b border-amber-200"><td class="p-2">en station</td><td class="p-2">två stationer</td><td class="p-2">stations</td></tr>
                            <tr class="border-b border-amber-200"><td class="p-2">ett bageri</td><td class="p-2">två bagerier</td><td class="p-2">bakkerijen</td></tr>
                            <tr><td class="p-2">ett museum</td><td class="p-2">två museer</td><td class="p-2">musea</td></tr>
                        </tbody>
                    </table>
                    <p class="text-xs text-amber-600 mt-2">Veel klinkerwisselingen: en hand → två händer, en stad → två städer, en man → två män</p>
                </div>

                <!-- Groep 4 -->
                <div class="bg-purple-50 rounded-xl p-4">
                    <h4 class="font-bold text-purple-800 mb-2">Groep 4: meervoud op -n</h4>
                    <p class="text-sm mb-3">Alleen <strong>ett-woorden</strong> die eindigen op een klinker.</p>
                    <table class="w-full text-left text-sm">
                        <thead class="bg-purple-100">
                            <tr><th class="p-2">Enkelvoud</th><th class="p-2">Meervoud</th><th class="p-2">Nederlands</th></tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-purple-200"><td class="p-2">ett äpple</td><td class="p-2">två äpplen</td><td class="p-2">appels</td></tr>
                            <tr class="border-b border-purple-200"><td class="p-2">ett knä</td><td class="p-2">två knän</td><td class="p-2">knieën</td></tr>
                            <tr><td class="p-2">ett schema</td><td class="p-2">två scheman</td><td class="p-2">schema's</td></tr>
                        </tbody>
                    </table>
                    <p class="text-xs text-purple-600 mt-2">Onregelmatig: ett öra → två öron, ett öga → två ögon</p>
                </div>

                <!-- Groep 5 -->
                <div class="bg-gray-100 rounded-xl p-4">
                    <h4 class="font-bold text-gray-800 mb-2">Groep 5: geen aparte meervoudsuitgang</h4>
                    <p class="text-sm mb-3">Vooral <strong>ett-woorden</strong> die eindigen op een medeklinker, plus beroepen op -are, -ande, -ende.</p>
                    <table class="w-full text-left text-sm">
                        <thead class="bg-gray-200">
                            <tr><th class="p-2">Enkelvoud</th><th class="p-2">Meervoud</th><th class="p-2">Nederlands</th></tr>
                        </thead>
                        <tbody>
                            <tr class="border-b"><td class="p-2">ett hus</td><td class="p-2">två hus</td><td class="p-2">huizen</td></tr>
                            <tr class="border-b"><td class="p-2">ett problem</td><td class="p-2">två problem</td><td class="p-2">problemen</td></tr>
                            <tr class="border-b"><td class="p-2">en lärare</td><td class="p-2">två lärare</td><td class="p-2">leraren</td></tr>
                            <tr><td class="p-2">en resande</td><td class="p-2">två resande</td><td class="p-2">reizigers</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <h3 class="text-lg font-bold mt-6 mb-3">Bepaald lidwoord meervoud</h3>
            <p class="mb-4">Het bepaald lidwoord meervoud wordt ook als suffix toegevoegd:</p>
            <div class="overflow-x-auto -mx-4 px-4">
                <table class="w-full text-left text-sm min-w-[350px]">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">Groep</th><th class="p-2">Onbep. mv.</th><th class="p-2">Bep. mv.</th><th class="p-2">NL</th></tr>
                    </thead>
                    <tbody>
                        <tr class="border-b"><td class="p-2">1</td><td class="p-2">flickor</td><td class="p-2">flickorna</td><td class="p-2">de meisjes</td></tr>
                        <tr class="border-b"><td class="p-2">2</td><td class="p-2">pojkar</td><td class="p-2">pojkarna</td><td class="p-2">de jongens</td></tr>
                        <tr class="border-b"><td class="p-2">3</td><td class="p-2">dikter</td><td class="p-2">dikterna</td><td class="p-2">de gedichten</td></tr>
                        <tr class="border-b"><td class="p-2">4</td><td class="p-2">äpplen</td><td class="p-2">äpplena</td><td class="p-2">de appels</td></tr>
                        <tr><td class="p-2">5</td><td class="p-2">hus</td><td class="p-2">husen</td><td class="p-2">de huizen</td></tr>
                    </tbody>
                </table>
            </div>
        `
    },
    verbs: {
        name: 'Werkwoorden',
        icon: 'fa-running',
        color: 'var(--scandi-green)',
        description: 'Vervoeging en tijden',
        content: `
            <h3 class="text-lg font-bold mb-3">Tegenwoordige tijd</h3>
            <p class="mb-4">In het Zweeds eindigen de meeste werkwoorden op <strong>-ar</strong>, <strong>-er</strong>, of <strong>-r</strong>:</p>
            <ul class="space-y-2 mb-6">
                <li><strong>att tala → talar</strong> (praten → praat)</li>
                <li><strong>att läsa → läser</strong> (lezen → leest)</li>
                <li><strong>att bo → bor</strong> (wonen → woont)</li>
            </ul>

            <h3 class="text-lg font-bold mb-3">Verleden tijd</h3>
            <p class="mb-4">De meeste werkwoorden krijgen <strong>-de</strong> of <strong>-te</strong>:</p>
            <ul class="space-y-2 mb-6">
                <li><strong>talar → talade</strong> (praatte)</li>
                <li><strong>läser → läste</strong> (las)</li>
            </ul>

            <h3 class="text-lg font-bold mb-3">Voorbeelden</h3>
            <table class="w-full text-left">
                <thead class="bg-gray-100">
                    <tr><th class="p-2">Infinitief</th><th class="p-2">Heden</th><th class="p-2">Verleden</th></tr>
                </thead>
                <tbody>
                    <tr class="border-b"><td class="p-2">att vara</td><td class="p-2">är</td><td class="p-2">var</td></tr>
                    <tr class="border-b"><td class="p-2">att ha</td><td class="p-2">har</td><td class="p-2">hade</td></tr>
                    <tr class="border-b"><td class="p-2">att gå</td><td class="p-2">går</td><td class="p-2">gick</td></tr>
                    <tr><td class="p-2">att komma</td><td class="p-2">kommer</td><td class="p-2">kom</td></tr>
                </tbody>
            </table>
        `
    },
    pronouns: {
        name: 'Voornaamwoorden',
        icon: 'fa-user',
        color: 'var(--scandi-amber)',
        description: 'Persoonlijke voornaamwoorden',
        content: `
            <h3 class="text-lg font-bold mb-3">Persoonlijke voornaamwoorden</h3>
            <table class="w-full text-left mb-6">
                <thead class="bg-gray-100">
                    <tr><th class="p-2">Zweeds</th><th class="p-2">Nederlands</th></tr>
                </thead>
                <tbody>
                    <tr class="border-b"><td class="p-2">jag</td><td class="p-2">ik</td></tr>
                    <tr class="border-b"><td class="p-2">du</td><td class="p-2">jij</td></tr>
                    <tr class="border-b"><td class="p-2">han/hon</td><td class="p-2">hij/zij</td></tr>
                    <tr class="border-b"><td class="p-2">vi</td><td class="p-2">wij</td></tr>
                    <tr class="border-b"><td class="p-2">ni</td><td class="p-2">jullie</td></tr>
                    <tr><td class="p-2">de</td><td class="p-2">zij (meervoud)</td></tr>
                </tbody>
            </table>

            <h3 class="text-lg font-bold mb-3">Bezittelijke voornaamwoorden</h3>
            <table class="w-full text-left">
                <thead class="bg-gray-100">
                    <tr><th class="p-2">Zweeds</th><th class="p-2">Nederlands</th></tr>
                </thead>
                <tbody>
                    <tr class="border-b"><td class="p-2">min/mitt</td><td class="p-2">mijn</td></tr>
                    <tr class="border-b"><td class="p-2">din/ditt</td><td class="p-2">jouw</td></tr>
                    <tr class="border-b"><td class="p-2">hans/hennes</td><td class="p-2">zijn/haar</td></tr>
                    <tr class="border-b"><td class="p-2">vår/vårt</td><td class="p-2">ons/onze</td></tr>
                    <tr><td class="p-2">er/ert</td><td class="p-2">jullie</td></tr>
                </tbody>
            </table>
        `
    },
    numbers: {
        name: 'Getallen',
        icon: 'fa-hashtag',
        color: 'var(--scandi-teal)',
        description: 'Tellen in het Zweeds',
        content: `
            <h3 class="text-lg font-bold mb-3">Basis getallen (0-20)</h3>
            <div class="grid grid-cols-2 gap-2 mb-6">
                <div class="p-2 bg-gray-50 rounded">0 - noll</div>
                <div class="p-2 bg-gray-50 rounded">1 - ett/en</div>
                <div class="p-2 bg-gray-50 rounded">2 - två</div>
                <div class="p-2 bg-gray-50 rounded">3 - tre</div>
                <div class="p-2 bg-gray-50 rounded">4 - fyra</div>
                <div class="p-2 bg-gray-50 rounded">5 - fem</div>
                <div class="p-2 bg-gray-50 rounded">6 - sex</div>
                <div class="p-2 bg-gray-50 rounded">7 - sju</div>
                <div class="p-2 bg-gray-50 rounded">8 - åtta</div>
                <div class="p-2 bg-gray-50 rounded">9 - nio</div>
                <div class="p-2 bg-gray-50 rounded">10 - tio</div>
                <div class="p-2 bg-gray-50 rounded">11 - elva</div>
                <div class="p-2 bg-gray-50 rounded">12 - tolv</div>
                <div class="p-2 bg-gray-50 rounded">13 - tretton</div>
                <div class="p-2 bg-gray-50 rounded">14 - fjorton</div>
                <div class="p-2 bg-gray-50 rounded">15 - femton</div>
                <div class="p-2 bg-gray-50 rounded">16 - sexton</div>
                <div class="p-2 bg-gray-50 rounded">17 - sjutton</div>
                <div class="p-2 bg-gray-50 rounded">18 - arton</div>
                <div class="p-2 bg-gray-50 rounded">19 - nitton</div>
                <div class="p-2 bg-gray-50 rounded">20 - tjugo</div>
            </div>

            <h3 class="text-lg font-bold mb-3">Tientallen</h3>
            <div class="grid grid-cols-2 gap-2">
                <div class="p-2 bg-gray-50 rounded">30 - trettio</div>
                <div class="p-2 bg-gray-50 rounded">40 - fyrtio</div>
                <div class="p-2 bg-gray-50 rounded">50 - femtio</div>
                <div class="p-2 bg-gray-50 rounded">60 - sextio</div>
                <div class="p-2 bg-gray-50 rounded">70 - sjuttio</div>
                <div class="p-2 bg-gray-50 rounded">80 - åttio</div>
                <div class="p-2 bg-gray-50 rounded">90 - nittio</div>
                <div class="p-2 bg-gray-50 rounded">100 - hundra</div>
            </div>
        `
    },
    questions: {
        name: 'Vraagwoorden',
        icon: 'fa-question',
        color: 'var(--dusty-rose)',
        description: 'Vragen stellen',
        content: `
            <h3 class="text-lg font-bold mb-3">Vraagwoorden</h3>
            <div class="overflow-x-auto -mx-4 px-4 mb-6">
                <table class="w-full text-left text-sm min-w-[320px]">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">Zweeds</th><th class="p-2">NL</th><th class="p-2">Voorbeeld</th></tr>
                    </thead>
                    <tbody>
                        <tr class="border-b"><td class="p-2">vad</td><td class="p-2">wat</td><td class="p-2">Vad heter du?</td></tr>
                        <tr class="border-b"><td class="p-2">vem</td><td class="p-2">wie</td><td class="p-2">Vem är det?</td></tr>
                        <tr class="border-b"><td class="p-2">var</td><td class="p-2">waar</td><td class="p-2">Var bor du?</td></tr>
                        <tr class="border-b"><td class="p-2">när</td><td class="p-2">wanneer</td><td class="p-2">När kommer du?</td></tr>
                        <tr class="border-b"><td class="p-2">hur</td><td class="p-2">hoe</td><td class="p-2">Hur mår du?</td></tr>
                        <tr class="border-b"><td class="p-2">varför</td><td class="p-2">waarom</td><td class="p-2">Varför gråter du?</td></tr>
                        <tr><td class="p-2">vilken/vilket</td><td class="p-2">welke</td><td class="p-2">Vilken dag?</td></tr>
                    </tbody>
                </table>
            </div>

            <h3 class="text-lg font-bold mb-3">Ja/Nee vragen</h3>
            <p class="mb-4">Begin met het werkwoord:</p>
            <ul class="space-y-2">
                <li><strong>Talar du svenska?</strong> - Spreek je Zweeds?</li>
                <li><strong>Är du hungrig?</strong> - Heb je honger?</li>
                <li><strong>Kommer du imorgon?</strong> - Kom je morgen?</li>
            </ul>
        `
    }
};

/**
 * Render grammar topic list
 * @returns {string} HTML string
 */
function renderTopicList() {
    return Object.entries(grammarTopics)
        .map(
            ([key, topic]) => `
            <button onclick="app.openGrammarTopic('${key}')"
                    class="glass-effect rounded-xl p-4 text-left card-hover card-shadow border-2 border-transparent hover:border-blue-400 transition-all">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                         style="background: ${topic.color};">
                        <i class="fas ${topic.icon} text-xl"></i>
                    </div>
                    <div>
                        <p class="font-bold text-gray-800">${escapeHtml(topic.name)}</p>
                        <p class="text-sm text-gray-600">${escapeHtml(topic.description)}</p>
                    </div>
                    <i class="fas fa-chevron-right text-gray-400 ml-auto"></i>
                </div>
            </button>
        `
        )
        .join('');
}

/**
 * Render grammar topic detail
 * @param {string} topicKey - Topic key
 * @returns {string} HTML string
 */
function renderTopicDetail(topicKey) {
    const topic = grammarTopics[topicKey];
    if (!topic) {
        return '';
    }

    return `
        <div class="space-y-4 animate-slideUp pb-24">
            <!-- Header -->
            <div class="flex items-center gap-3 mb-4">
                <button onclick="app.closeGrammarTopic()"
                        class="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                         style="background: ${topic.color};">
                        <i class="fas ${topic.icon}"></i>
                    </div>
                    <h2 class="font-bold text-gray-800 text-xl">${escapeHtml(topic.name)}</h2>
                </div>
            </div>

            <!-- Content -->
            <div class="glass-effect rounded-2xl p-6 card-shadow">
                ${topic.content}
            </div>
        </div>
    `;
}

/**
 * Render grammar view
 * @param {object} state - App state
 * @returns {string} HTML string
 */
export function renderGrammar(state) {
    // If a topic is selected, show detail view
    if (state.grammarType) {
        return renderTopicDetail(state.grammarType);
    }

    // Otherwise show topic list
    return `
        <div class="space-y-4 animate-slideUp pb-24">
            <!-- Header -->
            <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                     style="background: linear-gradient(135deg, #9333EA 0%, #7E22CE 100%);">
                    <i class="fas fa-book"></i>
                </div>
                <div>
                    <h2 class="font-bold text-gray-800 text-xl">Grammatica</h2>
                    <p class="text-sm text-gray-600">Leer de Zweedse grammatica</p>
                </div>
            </div>

            <!-- Topic List -->
            <div class="space-y-3">
                ${renderTopicList()}
            </div>
        </div>
    `;
}

// Export grammar topics for use elsewhere if needed
export { grammarTopics };
