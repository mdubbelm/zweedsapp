/**
 * Grammar View
 * Swedish grammar lessons and explanations
 */

import { escapeHtml } from '../utils/helpers.js';

/**
 * Create audio button HTML for Swedish text
 * @param {string} text - Swedish text to speak
 * @param {string} size - Size: 'sm' (inline), 'md' (default)
 * @returns {string} HTML string for audio button
 */
function audioBtn(text, size = 'sm') {
    const escaped = escapeHtml(text).replace(/'/g, "\\'");
    if (size === 'sm') {
        return `<button onclick="event.stopPropagation(); app.speakSwedish('${escaped}')"
                class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 ml-1 transition-colors"
                title="Luister naar uitspraak"
                aria-label="Luister naar ${escapeHtml(text)}">
            <i class="fas fa-volume-up text-xs"></i>
        </button>`;
    }
    return `<button onclick="event.stopPropagation(); app.speakSwedish('${escaped}')"
            class="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 text-sm gap-1 transition-colors"
            title="Luister naar uitspraak"
            aria-label="Luister naar ${escapeHtml(text)}">
        <i class="fas fa-volume-up"></i>
        <span>Luister</span>
    </button>`;
}

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
                    <tr class="border-b"><td class="p-2"><strong>en</strong> ${audioBtn('en')}</td><td class="p-2">een (de-woord)</td><td class="p-2">en katt, en ros, en tidning ${audioBtn('en katt, en ros, en tidning')}</td></tr>
                    <tr><td class="p-2"><strong>ett</strong> ${audioBtn('ett')}</td><td class="p-2">een (het-woord)</td><td class="p-2">ett hus, ett barn, ett äpple ${audioBtn('ett hus, ett barn, ett äpple')}</td></tr>
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
                        <tr class="border-b"><td class="p-2" rowspan="4">en-woorden</td><td class="p-2">-en/-n</td><td class="p-2">en flicka ${audioBtn('en flicka')}</td><td class="p-2">flickan ${audioBtn('flickan')}</td><td class="p-2">het meisje</td></tr>
                        <tr class="border-b"><td class="p-2">-en/-n</td><td class="p-2">en ros ${audioBtn('en ros')}</td><td class="p-2">rosen ${audioBtn('rosen')}</td><td class="p-2">de roos</td></tr>
                        <tr class="border-b"><td class="p-2">-en</td><td class="p-2">en tidning ${audioBtn('en tidning')}</td><td class="p-2">tidningen ${audioBtn('tidningen')}</td><td class="p-2">de krant</td></tr>
                        <tr class="border-b"><td class="p-2">-n</td><td class="p-2">en sko ${audioBtn('en sko')}</td><td class="p-2">skon ${audioBtn('skon')}</td><td class="p-2">de schoen</td></tr>
                        <tr class="border-b"><td class="p-2" rowspan="3">ett-woorden</td><td class="p-2">-et/-t</td><td class="p-2">ett barn ${audioBtn('ett barn')}</td><td class="p-2">barnet ${audioBtn('barnet')}</td><td class="p-2">het kind</td></tr>
                        <tr class="border-b"><td class="p-2">-et</td><td class="p-2">ett hus ${audioBtn('ett hus')}</td><td class="p-2">huset ${audioBtn('huset')}</td><td class="p-2">het huis</td></tr>
                        <tr><td class="p-2">-t</td><td class="p-2">ett äpple ${audioBtn('ett äpple')}</td><td class="p-2">äpplet ${audioBtn('äpplet')}</td><td class="p-2">de appel</td></tr>
                    </tbody>
                </table>
            </div>

            <h3 class="text-lg font-bold mb-3">Meer voorbeelden en-woorden</h3>
            <div class="grid grid-cols-2 gap-2 mb-6 text-sm">
                <div class="p-2 bg-blue-50 rounded flex items-center justify-between">en katt → katten ${audioBtn('en katt, katten')}</div>
                <div class="p-2 bg-blue-50 rounded flex items-center justify-between">en hund → hunden ${audioBtn('en hund, hunden')}</div>
                <div class="p-2 bg-blue-50 rounded flex items-center justify-between">en vägg → väggen ${audioBtn('en vägg, väggen')}</div>
                <div class="p-2 bg-blue-50 rounded flex items-center justify-between">en bro → bron ${audioBtn('en bro, bron')}</div>
                <div class="p-2 bg-blue-50 rounded flex items-center justify-between">en pojke → pojken ${audioBtn('en pojke, pojken')}</div>
                <div class="p-2 bg-blue-50 rounded flex items-center justify-between">en fågel → fågeln ${audioBtn('en fågel, fågeln')}</div>
                <div class="p-2 bg-blue-50 rounded flex items-center justify-between">en dator → datorn ${audioBtn('en dator, datorn')}</div>
                <div class="p-2 bg-blue-50 rounded flex items-center justify-between">en lärare → läraren ${audioBtn('en lärare, läraren')}</div>
            </div>

            <h3 class="text-lg font-bold mb-3">Meer voorbeelden ett-woorden</h3>
            <div class="grid grid-cols-2 gap-2 mb-6 text-sm">
                <div class="p-2 bg-teal-50 rounded flex items-center justify-between">ett land → landet ${audioBtn('ett land, landet')}</div>
                <div class="p-2 bg-teal-50 rounded flex items-center justify-between">ett museum → museet ${audioBtn('ett museum, museet')}</div>
                <div class="p-2 bg-teal-50 rounded flex items-center justify-between">ett bageri → bageriet ${audioBtn('ett bageri, bageriet')}</div>
                <div class="p-2 bg-teal-50 rounded flex items-center justify-between">ett knä → knät ${audioBtn('ett knä, knät')}</div>
                <div class="p-2 bg-teal-50 rounded flex items-center justify-between">ett öra → örat ${audioBtn('ett öra, örat')}</div>
                <div class="p-2 bg-teal-50 rounded flex items-center justify-between">ett problem → problemet ${audioBtn('ett problem, problemet')}</div>
                <div class="p-2 bg-teal-50 rounded flex items-center justify-between">ett fönster → fönstret ${audioBtn('ett fönster, fönstret')}</div>
                <div class="p-2 bg-teal-50 rounded flex items-center justify-between">ett tecken → tecknet ${audioBtn('ett tecken, tecknet')}</div>
            </div>

            <h3 class="text-lg font-bold mb-3">Samengestelde naamwoorden</h3>
            <p class="mb-4">Bij samengestelde naamwoorden bepaalt het <strong>laatste deel</strong> het geslacht:</p>
            <ul class="space-y-2 text-sm">
                <li><strong>blod</strong> (ett) + <strong>grupp</strong> (en) = <strong>en blodgrupp</strong> ${audioBtn('en blodgrupp')} (een bloedgroep)</li>
                <li><strong>bok</strong> (en) + <strong>handel</strong> (en) = <strong>en bokhandel</strong> ${audioBtn('en bokhandel')} (een boekhandel)</li>
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
                            <tr class="border-b border-green-200"><td class="p-2">en flicka ${audioBtn('en flicka')}</td><td class="p-2">två flickor ${audioBtn('två flickor')}</td><td class="p-2">meisjes</td></tr>
                            <tr class="border-b border-green-200"><td class="p-2">en ros ${audioBtn('en ros')}</td><td class="p-2">två rosor ${audioBtn('två rosor')}</td><td class="p-2">rozen</td></tr>
                            <tr class="border-b border-green-200"><td class="p-2">en våg ${audioBtn('en våg')}</td><td class="p-2">två vågor ${audioBtn('två vågor')}</td><td class="p-2">golven</td></tr>
                            <tr><td class="p-2">en toffel ${audioBtn('en toffel')}</td><td class="p-2">två tofflor ${audioBtn('två tofflor')}</td><td class="p-2">pantoffels</td></tr>
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
                            <tr class="border-b border-blue-200"><td class="p-2">en tidning ${audioBtn('en tidning')}</td><td class="p-2">två tidningar ${audioBtn('två tidningar')}</td><td class="p-2">kranten</td></tr>
                            <tr class="border-b border-blue-200"><td class="p-2">en pojke ${audioBtn('en pojke')}</td><td class="p-2">två pojkar ${audioBtn('två pojkar')}</td><td class="p-2">jongens</td></tr>
                            <tr class="border-b border-blue-200"><td class="p-2">en fågel ${audioBtn('en fågel')}</td><td class="p-2">två fåglar ${audioBtn('två fåglar')}</td><td class="p-2">vogels</td></tr>
                            <tr class="border-b border-blue-200"><td class="p-2">en sommar ${audioBtn('en sommar')}</td><td class="p-2">två somrar ${audioBtn('två somrar')}</td><td class="p-2">zomers</td></tr>
                            <tr><td class="p-2">en syster ${audioBtn('en syster')}</td><td class="p-2">två systrar ${audioBtn('två systrar')}</td><td class="p-2">zusters</td></tr>
                        </tbody>
                    </table>
                    <p class="text-xs text-blue-600 mt-2">Let op klinkerwisseling: en dotter → två döttrar ${audioBtn('två döttrar')}, en moder → två mödrar ${audioBtn('två mödrar')}</p>
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
                            <tr class="border-b border-amber-200"><td class="p-2">en dikt ${audioBtn('en dikt')}</td><td class="p-2">två dikter ${audioBtn('två dikter')}</td><td class="p-2">gedichten</td></tr>
                            <tr class="border-b border-amber-200"><td class="p-2">en byggnad ${audioBtn('en byggnad')}</td><td class="p-2">två byggnader ${audioBtn('två byggnader')}</td><td class="p-2">gebouwen</td></tr>
                            <tr class="border-b border-amber-200"><td class="p-2">en station ${audioBtn('en station')}</td><td class="p-2">två stationer ${audioBtn('två stationer')}</td><td class="p-2">stations</td></tr>
                            <tr class="border-b border-amber-200"><td class="p-2">ett bageri ${audioBtn('ett bageri')}</td><td class="p-2">två bagerier ${audioBtn('två bagerier')}</td><td class="p-2">bakkerijen</td></tr>
                            <tr><td class="p-2">ett museum ${audioBtn('ett museum')}</td><td class="p-2">två museer ${audioBtn('två museer')}</td><td class="p-2">musea</td></tr>
                        </tbody>
                    </table>
                    <p class="text-xs text-amber-600 mt-2">Veel klinkerwisselingen: en hand → två händer ${audioBtn('två händer')}, en stad → två städer ${audioBtn('två städer')}, en man → två män ${audioBtn('två män')}</p>
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
                            <tr class="border-b border-purple-200"><td class="p-2">ett äpple ${audioBtn('ett äpple')}</td><td class="p-2">två äpplen ${audioBtn('två äpplen')}</td><td class="p-2">appels</td></tr>
                            <tr class="border-b border-purple-200"><td class="p-2">ett knä ${audioBtn('ett knä')}</td><td class="p-2">två knän ${audioBtn('två knän')}</td><td class="p-2">knieën</td></tr>
                            <tr><td class="p-2">ett schema ${audioBtn('ett schema')}</td><td class="p-2">två scheman ${audioBtn('två scheman')}</td><td class="p-2">schema's</td></tr>
                        </tbody>
                    </table>
                    <p class="text-xs text-purple-600 mt-2">Onregelmatig: ett öra → två öron ${audioBtn('två öron')}, ett öga → två ögon ${audioBtn('två ögon')}</p>
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
                            <tr class="border-b"><td class="p-2">ett hus ${audioBtn('ett hus')}</td><td class="p-2">två hus ${audioBtn('två hus')}</td><td class="p-2">huizen</td></tr>
                            <tr class="border-b"><td class="p-2">ett problem ${audioBtn('ett problem')}</td><td class="p-2">två problem ${audioBtn('två problem')}</td><td class="p-2">problemen</td></tr>
                            <tr class="border-b"><td class="p-2">en lärare ${audioBtn('en lärare')}</td><td class="p-2">två lärare ${audioBtn('två lärare')}</td><td class="p-2">leraren</td></tr>
                            <tr><td class="p-2">en resande ${audioBtn('en resande')}</td><td class="p-2">två resande ${audioBtn('två resande')}</td><td class="p-2">reizigers</td></tr>
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
                        <tr class="border-b"><td class="p-2">1</td><td class="p-2">flickor ${audioBtn('flickor')}</td><td class="p-2">flickorna ${audioBtn('flickorna')}</td><td class="p-2">de meisjes</td></tr>
                        <tr class="border-b"><td class="p-2">2</td><td class="p-2">pojkar ${audioBtn('pojkar')}</td><td class="p-2">pojkarna ${audioBtn('pojkarna')}</td><td class="p-2">de jongens</td></tr>
                        <tr class="border-b"><td class="p-2">3</td><td class="p-2">dikter ${audioBtn('dikter')}</td><td class="p-2">dikterna ${audioBtn('dikterna')}</td><td class="p-2">de gedichten</td></tr>
                        <tr class="border-b"><td class="p-2">4</td><td class="p-2">äpplen ${audioBtn('äpplen')}</td><td class="p-2">äpplena ${audioBtn('äpplena')}</td><td class="p-2">de appels</td></tr>
                        <tr><td class="p-2">5</td><td class="p-2">hus ${audioBtn('hus')}</td><td class="p-2">husen ${audioBtn('husen')}</td><td class="p-2">de huizen</td></tr>
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
                <li><strong>att tala → talar</strong> ${audioBtn('att tala, talar')} (praten → praat)</li>
                <li><strong>att läsa → läser</strong> ${audioBtn('att läsa, läser')} (lezen → leest)</li>
                <li><strong>att bo → bor</strong> ${audioBtn('att bo, bor')} (wonen → woont)</li>
            </ul>

            <h3 class="text-lg font-bold mb-3">Verleden tijd</h3>
            <p class="mb-4">De meeste werkwoorden krijgen <strong>-de</strong> of <strong>-te</strong>:</p>
            <ul class="space-y-2 mb-6">
                <li><strong>talar → talade</strong> ${audioBtn('talar, talade')} (praatte)</li>
                <li><strong>läser → läste</strong> ${audioBtn('läser, läste')} (las)</li>
            </ul>

            <h3 class="text-lg font-bold mb-3">Voorbeelden</h3>
            <table class="w-full text-left">
                <thead class="bg-gray-100">
                    <tr><th class="p-2">Infinitief</th><th class="p-2">Heden</th><th class="p-2">Verleden</th></tr>
                </thead>
                <tbody>
                    <tr class="border-b"><td class="p-2">att vara ${audioBtn('att vara')}</td><td class="p-2">är ${audioBtn('är')}</td><td class="p-2">var ${audioBtn('var')}</td></tr>
                    <tr class="border-b"><td class="p-2">att ha ${audioBtn('att ha')}</td><td class="p-2">har ${audioBtn('har')}</td><td class="p-2">hade ${audioBtn('hade')}</td></tr>
                    <tr class="border-b"><td class="p-2">att gå ${audioBtn('att gå')}</td><td class="p-2">går ${audioBtn('går')}</td><td class="p-2">gick ${audioBtn('gick')}</td></tr>
                    <tr><td class="p-2">att komma ${audioBtn('att komma')}</td><td class="p-2">kommer ${audioBtn('kommer')}</td><td class="p-2">kom ${audioBtn('kom')}</td></tr>
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
                    <tr class="border-b"><td class="p-2">jag ${audioBtn('jag')}</td><td class="p-2">ik</td></tr>
                    <tr class="border-b"><td class="p-2">du ${audioBtn('du')}</td><td class="p-2">jij</td></tr>
                    <tr class="border-b"><td class="p-2">han/hon ${audioBtn('han, hon')}</td><td class="p-2">hij/zij</td></tr>
                    <tr class="border-b"><td class="p-2">vi ${audioBtn('vi')}</td><td class="p-2">wij</td></tr>
                    <tr class="border-b"><td class="p-2">ni ${audioBtn('ni')}</td><td class="p-2">jullie</td></tr>
                    <tr><td class="p-2">de ${audioBtn('de')}</td><td class="p-2">zij (meervoud)</td></tr>
                </tbody>
            </table>

            <h3 class="text-lg font-bold mb-3">Bezittelijke voornaamwoorden</h3>
            <table class="w-full text-left">
                <thead class="bg-gray-100">
                    <tr><th class="p-2">Zweeds</th><th class="p-2">Nederlands</th></tr>
                </thead>
                <tbody>
                    <tr class="border-b"><td class="p-2">min/mitt ${audioBtn('min, mitt')}</td><td class="p-2">mijn</td></tr>
                    <tr class="border-b"><td class="p-2">din/ditt ${audioBtn('din, ditt')}</td><td class="p-2">jouw</td></tr>
                    <tr class="border-b"><td class="p-2">hans/hennes ${audioBtn('hans, hennes')}</td><td class="p-2">zijn/haar</td></tr>
                    <tr class="border-b"><td class="p-2">vår/vårt ${audioBtn('vår, vårt')}</td><td class="p-2">ons/onze</td></tr>
                    <tr><td class="p-2">er/ert ${audioBtn('er, ert')}</td><td class="p-2">jullie</td></tr>
                </tbody>
            </table>
        `
    },
    adjectives: {
        name: 'Bijvoeglijke naamwoorden',
        icon: 'fa-palette',
        color: 'var(--scandi-amber)',
        description: 'Verbuiging en trappen van vergelijking',
        content: `
            <h3 class="text-lg font-bold mb-3">Onbepaalde vorm</h3>
            <p class="mb-4">Het bijvoeglijk naamwoord past zich aan naar geslacht en getal:</p>
            <div class="overflow-x-auto -mx-4 px-4 mb-6">
                <table class="w-full text-left text-sm min-w-[380px]">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">Type</th><th class="p-2">Vorm</th><th class="p-2">Voorbeeld</th><th class="p-2">NL</th></tr>
                    </thead>
                    <tbody>
                        <tr class="border-b"><td class="p-2">en-woord</td><td class="p-2">grondvorm</td><td class="p-2">en <strong>stor</strong> stad ${audioBtn('en stor stad')}</td><td class="p-2">een grote stad</td></tr>
                        <tr class="border-b"><td class="p-2">ett-woord</td><td class="p-2">+t</td><td class="p-2">ett <strong>stort</strong> hus ${audioBtn('ett stort hus')}</td><td class="p-2">een groot huis</td></tr>
                        <tr><td class="p-2">meervoud</td><td class="p-2">+a</td><td class="p-2"><strong>stora</strong> städer ${audioBtn('stora städer')}</td><td class="p-2">grote steden</td></tr>
                    </tbody>
                </table>
            </div>

            <h3 class="text-lg font-bold mb-3">Predicatief gebruik</h3>
            <p class="mb-4">Na werkwoorden als 'zijn' en 'worden':</p>
            <ul class="space-y-2 mb-6 text-sm">
                <li>Staden är <strong>stor</strong>. ${audioBtn('Staden är stor')} - De stad is groot.</li>
                <li>Huset är <strong>stort</strong>. ${audioBtn('Huset är stort')} - Het huis is groot.</li>
                <li>Städerna är <strong>stora</strong>. ${audioBtn('Städerna är stora')} - De steden zijn groot.</li>
            </ul>

            <h3 class="text-lg font-bold mb-3">Bepaalde vorm</h3>
            <p class="mb-4">Met losstaand lidwoord <strong>den/det/de</strong> + bijvoeglijk naamwoord op <strong>-a</strong>:</p>
            <div class="overflow-x-auto -mx-4 px-4 mb-6">
                <table class="w-full text-left text-sm min-w-[350px]">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">Lidwoord</th><th class="p-2">Voorbeeld</th><th class="p-2">NL</th></tr>
                    </thead>
                    <tbody>
                        <tr class="border-b"><td class="p-2">den (en-woord)</td><td class="p-2">den stora staden ${audioBtn('den stora staden')}</td><td class="p-2">de grote stad</td></tr>
                        <tr class="border-b"><td class="p-2">det (ett-woord)</td><td class="p-2">det stora huset ${audioBtn('det stora huset')}</td><td class="p-2">het grote huis</td></tr>
                        <tr><td class="p-2">de (meervoud)</td><td class="p-2">de stora städerna ${audioBtn('de stora städerna')}</td><td class="p-2">de grote steden</td></tr>
                    </tbody>
                </table>
            </div>

            <h3 class="text-lg font-bold mb-3">Vergrotende trap (-are)</h3>
            <p class="mb-4">Eén vorm voor alle geslachten en getallen:</p>
            <ul class="space-y-2 mb-6 text-sm">
                <li>dyr (duur) → <strong>dyrare</strong> ${audioBtn('dyr, dyrare')} (duurder)</li>
                <li>en dyrare bil ${audioBtn('en dyrare bil')} - een duurdere auto</li>
                <li>Huset är dyrare <strong>än</strong> bilen. ${audioBtn('Huset är dyrare än bilen')} - Het huis is duurder dan de auto.</li>
            </ul>

            <h3 class="text-lg font-bold mb-3">Overtreffende trap (-ast/-aste)</h3>
            <p class="mb-4">Predicatief: <strong>-ast</strong>, attributief: <strong>-aste</strong>:</p>
            <ul class="space-y-2 mb-6 text-sm">
                <li>dyr → dyrast (predicatief): Bilen är <strong>dyrast</strong>. ${audioBtn('Bilen är dyrast')}</li>
                <li>dyr → dyraste (attributief): den <strong>dyraste</strong> bilen ${audioBtn('den dyraste bilen')}</li>
            </ul>

            <h3 class="text-lg font-bold mb-3">Onregelmatige vormen</h3>
            <div class="overflow-x-auto -mx-4 px-4 mb-6">
                <table class="w-full text-left text-sm min-w-[320px]">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">Grondvorm</th><th class="p-2">Vergrotend</th><th class="p-2">Overtreffend</th><th class="p-2">NL</th></tr>
                    </thead>
                    <tbody>
                        <tr class="border-b"><td class="p-2">god/bra ${audioBtn('god, bra')}</td><td class="p-2">bättre ${audioBtn('bättre')}</td><td class="p-2">bäst ${audioBtn('bäst')}</td><td class="p-2">goed</td></tr>
                        <tr class="border-b"><td class="p-2">dålig ${audioBtn('dålig')}</td><td class="p-2">sämre ${audioBtn('sämre')}</td><td class="p-2">sämst ${audioBtn('sämst')}</td><td class="p-2">slecht</td></tr>
                        <tr class="border-b"><td class="p-2">stor ${audioBtn('stor')}</td><td class="p-2">större ${audioBtn('större')}</td><td class="p-2">störst ${audioBtn('störst')}</td><td class="p-2">groot</td></tr>
                        <tr class="border-b"><td class="p-2">liten ${audioBtn('liten')}</td><td class="p-2">mindre ${audioBtn('mindre')}</td><td class="p-2">minst ${audioBtn('minst')}</td><td class="p-2">klein</td></tr>
                        <tr class="border-b"><td class="p-2">gammal ${audioBtn('gammal')}</td><td class="p-2">äldre ${audioBtn('äldre')}</td><td class="p-2">äldst ${audioBtn('äldst')}</td><td class="p-2">oud</td></tr>
                        <tr class="border-b"><td class="p-2">ung ${audioBtn('ung')}</td><td class="p-2">yngre ${audioBtn('yngre')}</td><td class="p-2">yngst ${audioBtn('yngst')}</td><td class="p-2">jong</td></tr>
                        <tr class="border-b"><td class="p-2">lång ${audioBtn('lång')}</td><td class="p-2">längre ${audioBtn('längre')}</td><td class="p-2">längst ${audioBtn('längst')}</td><td class="p-2">lang</td></tr>
                        <tr class="border-b"><td class="p-2">hög ${audioBtn('hög')}</td><td class="p-2">högre ${audioBtn('högre')}</td><td class="p-2">högst ${audioBtn('högst')}</td><td class="p-2">hoog</td></tr>
                        <tr class="border-b"><td class="p-2">låg ${audioBtn('låg')}</td><td class="p-2">lägre ${audioBtn('lägre')}</td><td class="p-2">lägst ${audioBtn('lägst')}</td><td class="p-2">laag</td></tr>
                        <tr><td class="p-2">mycket/många ${audioBtn('mycket, många')}</td><td class="p-2">mer/flera ${audioBtn('mer, flera')}</td><td class="p-2">mest/flest ${audioBtn('mest, flest')}</td><td class="p-2">veel</td></tr>
                    </tbody>
                </table>
            </div>
            <p class="text-xs text-gray-600 mb-6">Gebruik <em>mycket/mer/mest</em> bij ontelbaar, <em>många/flera/flest</em> bij telbaar.</p>

            <h3 class="text-lg font-bold mb-3">Bijzonder: liten (klein)</h3>
            <div class="overflow-x-auto -mx-4 px-4 mb-6">
                <table class="w-full text-left text-sm min-w-[320px]">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">Vorm</th><th class="p-2">Onbepaald</th><th class="p-2">Bepaald</th></tr>
                    </thead>
                    <tbody>
                        <tr class="border-b"><td class="p-2">en-woord</td><td class="p-2">en liten stad ${audioBtn('en liten stad')}</td><td class="p-2">den lilla staden ${audioBtn('den lilla staden')}</td></tr>
                        <tr class="border-b"><td class="p-2">ett-woord</td><td class="p-2">ett litet hus ${audioBtn('ett litet hus')}</td><td class="p-2">det lilla huset ${audioBtn('det lilla huset')}</td></tr>
                        <tr><td class="p-2">meervoud</td><td class="p-2">små städer ${audioBtn('små städer')}</td><td class="p-2">de små städerna ${audioBtn('de små städerna')}</td></tr>
                    </tbody>
                </table>
            </div>

            <h3 class="text-lg font-bold mb-3">Afwijkende ett-vormen</h3>
            <ul class="space-y-2 text-sm">
                <li><strong>medeklinker + d</strong> verliest -d: känd → känt ${audioBtn('känd, känt')} (bekend)</li>
                <li><strong>medeklinker + t</strong> verliest -t: svart → svart ${audioBtn('svart')} (zwart)</li>
                <li><strong>klinker + d</strong> krijgt -tt: god → gott ${audioBtn('god, gott')} (goed), röd → rött ${audioBtn('röd, rött')} (rood)</li>
                <li><strong>-el/-er</strong> verliest -e- in mv: vacker → vackra ${audioBtn('vacker, vackra')} (mooi)</li>
                <li><strong>-en</strong> verliest -n in ett, -e- in mv: mogen → moget → mogna ${audioBtn('mogen, moget, mogna')} (rijp)</li>
            </ul>

            <h3 class="text-lg font-bold mt-6 mb-3">Onverbuigbare bijvoeglijke naamwoorden</h3>
            <p class="mb-4">Deze woorden veranderen niet:</p>
            <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="p-2 bg-amber-50 rounded flex items-center justify-between"><strong>bra</strong> - goed ${audioBtn('bra')}</div>
                <div class="p-2 bg-amber-50 rounded flex items-center justify-between"><strong>lagom</strong> - precies goed ${audioBtn('lagom')}</div>
                <div class="p-2 bg-amber-50 rounded flex items-center justify-between"><strong>gratis</strong> - gratis ${audioBtn('gratis')}</div>
                <div class="p-2 bg-amber-50 rounded flex items-center justify-between"><strong>kul</strong> - leuk ${audioBtn('kul')}</div>
                <div class="p-2 bg-amber-50 rounded flex items-center justify-between"><strong>fel</strong> - verkeerd ${audioBtn('fel')}</div>
                <div class="p-2 bg-amber-50 rounded flex items-center justify-between"><strong>slut</strong> - op/afgelopen ${audioBtn('slut')}</div>
            </div>
        `
    },
    numbers: {
        name: 'Telwoorden',
        icon: 'fa-hashtag',
        color: 'var(--scandi-teal)',
        description: 'Hoofd- en rangtelwoorden, klokkijken',
        content: `
            <h3 class="text-lg font-bold mb-3">Hoofdtelwoorden (0-20)</h3>
            <div class="grid grid-cols-2 gap-2 mb-6">
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">0 - noll ${audioBtn('noll')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">1 - en/ett ${audioBtn('en, ett')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">2 - två ${audioBtn('två')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">3 - tre ${audioBtn('tre')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">4 - fyra ${audioBtn('fyra')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">5 - fem ${audioBtn('fem')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">6 - sex ${audioBtn('sex')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">7 - sju ${audioBtn('sju')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">8 - åtta ${audioBtn('åtta')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">9 - nio ${audioBtn('nio')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">10 - tio ${audioBtn('tio')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">11 - elva ${audioBtn('elva')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">12 - tolv ${audioBtn('tolv')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">13 - tretton ${audioBtn('tretton')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">14 - fjorton ${audioBtn('fjorton')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">15 - femton ${audioBtn('femton')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">16 - sexton ${audioBtn('sexton')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">17 - sjutton ${audioBtn('sjutton')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">18 - arton ${audioBtn('arton')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">19 - nitton ${audioBtn('nitton')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">20 - tjugo ${audioBtn('tjugo')}</div>
            </div>
            <p class="text-xs text-gray-600 mb-6">Let op: <em>en</em> bij en-woorden, <em>ett</em> bij ett-woorden. Bijv: tjugoen rosor (21 rozen), tjugoett hus (21 huizen).</p>

            <h3 class="text-lg font-bold mb-3">Tientallen en meer</h3>
            <div class="grid grid-cols-2 gap-2 mb-6">
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">30 - trettio ${audioBtn('trettio')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">40 - fyrtio ${audioBtn('fyrtio')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">50 - femtio ${audioBtn('femtio')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">60 - sextio ${audioBtn('sextio')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">70 - sjuttio ${audioBtn('sjuttio')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">80 - åttio ${audioBtn('åttio')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">90 - nittio ${audioBtn('nittio')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">100 - hundra ${audioBtn('hundra')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">1000 - tusen ${audioBtn('tusen')}</div>
                <div class="p-2 bg-gray-50 rounded flex items-center justify-between">1.000.000 - en miljon ${audioBtn('en miljon')}</div>
            </div>

            <h3 class="text-lg font-bold mb-3">Rangtelwoorden</h3>
            <div class="overflow-x-auto -mx-4 px-4 mb-6">
                <table class="w-full text-left text-sm min-w-[280px]">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">Getal</th><th class="p-2">Hoofdtelwoord</th><th class="p-2">Rangtelwoord</th></tr>
                    </thead>
                    <tbody>
                        <tr class="border-b"><td class="p-2">1</td><td class="p-2">en/ett</td><td class="p-2">första ${audioBtn('första')}</td></tr>
                        <tr class="border-b"><td class="p-2">2</td><td class="p-2">två</td><td class="p-2">andra ${audioBtn('andra')}</td></tr>
                        <tr class="border-b"><td class="p-2">3</td><td class="p-2">tre</td><td class="p-2">tredje ${audioBtn('tredje')}</td></tr>
                        <tr class="border-b"><td class="p-2">4</td><td class="p-2">fyra</td><td class="p-2">fjärde ${audioBtn('fjärde')}</td></tr>
                        <tr class="border-b"><td class="p-2">5</td><td class="p-2">fem</td><td class="p-2">femte ${audioBtn('femte')}</td></tr>
                        <tr class="border-b"><td class="p-2">6</td><td class="p-2">sex</td><td class="p-2">sjätte ${audioBtn('sjätte')}</td></tr>
                        <tr class="border-b"><td class="p-2">7</td><td class="p-2">sju</td><td class="p-2">sjunde ${audioBtn('sjunde')}</td></tr>
                        <tr class="border-b"><td class="p-2">8</td><td class="p-2">åtta</td><td class="p-2">åttonde ${audioBtn('åttonde')}</td></tr>
                        <tr class="border-b"><td class="p-2">9</td><td class="p-2">nio</td><td class="p-2">nionde ${audioBtn('nionde')}</td></tr>
                        <tr class="border-b"><td class="p-2">10</td><td class="p-2">tio</td><td class="p-2">tionde ${audioBtn('tionde')}</td></tr>
                        <tr class="border-b"><td class="p-2">11</td><td class="p-2">elva</td><td class="p-2">elfte ${audioBtn('elfte')}</td></tr>
                        <tr class="border-b"><td class="p-2">12</td><td class="p-2">tolv</td><td class="p-2">tolfte ${audioBtn('tolfte')}</td></tr>
                        <tr class="border-b"><td class="p-2">20</td><td class="p-2">tjugo</td><td class="p-2">tjugonde ${audioBtn('tjugonde')}</td></tr>
                        <tr><td class="p-2">100</td><td class="p-2">hundra</td><td class="p-2">hundrade ${audioBtn('hundrade')}</td></tr>
                    </tbody>
                </table>
            </div>
            <p class="text-xs text-gray-600 mb-6">Gebruik bij data: <em>den första maj</em> ${audioBtn('den första maj')} (1 mei), <em>Gustav den tredje</em> ${audioBtn('Gustav den tredje')} (Gustav III).</p>

            <h3 class="text-lg font-bold mb-3">Klokkijken</h3>
            <div class="bg-teal-50 rounded-xl p-4 mb-6">
                <p class="font-medium mb-3">Vraag: <strong>Hur mycket är klockan?</strong> ${audioBtn('Hur mycket är klockan')} / <strong>Vad är klockan?</strong> ${audioBtn('Vad är klockan')}</p>
                <ul class="space-y-2 text-sm">
                    <li>Klockan är <strong>ett</strong>. ${audioBtn('Klockan är ett')} - Het is één uur.</li>
                    <li>Klockan är <strong>sex</strong>. ${audioBtn('Klockan är sex')} - Het is zes uur.</li>
                    <li>Klockan är <strong>halv sju</strong>. ${audioBtn('Klockan är halv sju')} - Het is half zeven.</li>
                    <li>Klockan är <strong>kvart över tre</strong>. ${audioBtn('Klockan är kvart över tre')} - Het is kwart over drie.</li>
                    <li>Klockan är <strong>kvart i tre</strong>. ${audioBtn('Klockan är kvart i tre')} - Het is kwart voor drie.</li>
                    <li>Klockan är <strong>fem över tre</strong>. ${audioBtn('Klockan är fem över tre')} - Het is vijf over drie.</li>
                    <li>Klockan är <strong>tjugo i fyra</strong>. ${audioBtn('Klockan är tjugo i fyra')} - Het is twintig voor vier.</li>
                </ul>
            </div>
            <p class="text-xs text-gray-600 mb-6">Net als in het Nederlands: <em>halv sju</em> ${audioBtn('halv sju')} = half zeven (6:30), niet 7:30!</p>

            <h3 class="text-lg font-bold mb-3">Getallen als zelfstandig naamwoord</h3>
            <p class="mb-4">Voor woningen, cijfers, tramlijnen:</p>
            <div class="grid grid-cols-2 gap-2 mb-6 text-sm">
                <div class="p-2 bg-teal-50 rounded flex items-center justify-between">en nolla - een nul ${audioBtn('en nolla')}</div>
                <div class="p-2 bg-teal-50 rounded flex items-center justify-between">en etta - een één ${audioBtn('en etta')}</div>
                <div class="p-2 bg-teal-50 rounded flex items-center justify-between">en tvåa - een twee ${audioBtn('en tvåa')}</div>
                <div class="p-2 bg-teal-50 rounded flex items-center justify-between">en trea - een drie ${audioBtn('en trea')}</div>
                <div class="p-2 bg-teal-50 rounded flex items-center justify-between">en fyra - een vier ${audioBtn('en fyra')}</div>
                <div class="p-2 bg-teal-50 rounded flex items-center justify-between">en femma - een vijf ${audioBtn('en femma')}</div>
            </div>
            <ul class="space-y-2 text-sm mb-6">
                <li><strong>Han har en trea.</strong> ${audioBtn('Han har en trea')} - Hij heeft een driekamerwoning.</li>
                <li><strong>Hon fick en femma i matte.</strong> ${audioBtn('Hon fick en femma i matte')} - Zij kreeg een 10 voor wiskunde.</li>
                <li><strong>Ta 51:an till kusten.</strong> ${audioBtn('Ta femtioettan till kusten')} - Neem lijn 51 naar de kust.</li>
            </ul>

            <h3 class="text-lg font-bold mb-3">Breuken</h3>
            <ul class="space-y-2 text-sm">
                <li><strong>en halv</strong> banan ${audioBtn('en halv banan')} - een halve banaan</li>
                <li><strong>ett halvt</strong> äpple ${audioBtn('ett halvt äpple')} - een halve appel</li>
                <li><strong>en kvarts</strong> liter ${audioBtn('en kvarts liter')} - een kwart liter</li>
                <li><strong>en fjärdedel</strong> ${audioBtn('en fjärdedel')} - een kwart (1/4)</li>
                <li><strong>tre sjundedelar</strong> ${audioBtn('tre sjundedelar')} - drie zevende (3/7)</li>
            </ul>
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
                        <tr class="border-b"><td class="p-2">vad ${audioBtn('vad')}</td><td class="p-2">wat</td><td class="p-2">Vad heter du? ${audioBtn('Vad heter du')}</td></tr>
                        <tr class="border-b"><td class="p-2">vem ${audioBtn('vem')}</td><td class="p-2">wie</td><td class="p-2">Vem är det? ${audioBtn('Vem är det')}</td></tr>
                        <tr class="border-b"><td class="p-2">var ${audioBtn('var')}</td><td class="p-2">waar</td><td class="p-2">Var bor du? ${audioBtn('Var bor du')}</td></tr>
                        <tr class="border-b"><td class="p-2">när ${audioBtn('när')}</td><td class="p-2">wanneer</td><td class="p-2">När kommer du? ${audioBtn('När kommer du')}</td></tr>
                        <tr class="border-b"><td class="p-2">hur ${audioBtn('hur')}</td><td class="p-2">hoe</td><td class="p-2">Hur mår du? ${audioBtn('Hur mår du')}</td></tr>
                        <tr class="border-b"><td class="p-2">varför ${audioBtn('varför')}</td><td class="p-2">waarom</td><td class="p-2">Varför gråter du? ${audioBtn('Varför gråter du')}</td></tr>
                        <tr><td class="p-2">vilken/vilket ${audioBtn('vilken, vilket')}</td><td class="p-2">welke</td><td class="p-2">Vilken dag? ${audioBtn('Vilken dag')}</td></tr>
                    </tbody>
                </table>
            </div>

            <h3 class="text-lg font-bold mb-3">Ja/Nee vragen</h3>
            <p class="mb-4">Begin met het werkwoord:</p>
            <ul class="space-y-2">
                <li><strong>Talar du svenska?</strong> ${audioBtn('Talar du svenska')} - Spreek je Zweeds?</li>
                <li><strong>Är du hungrig?</strong> ${audioBtn('Är du hungrig')} - Heb je honger?</li>
                <li><strong>Kommer du imorgon?</strong> ${audioBtn('Kommer du imorgon')} - Kom je morgen?</li>
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
 * Render grammar exercise from Daily Program
 * @param {object} state - App state
 * @returns {string} HTML string
 */
function renderGrammarExercise(state) {
    const exercise = state.currentGrammarExercise;
    if (!exercise) {
        return '';
    }

    const isMultipleChoice = exercise.options && exercise.options.length > 0;

    return `
        <div class="space-y-4 animate-slideUp pb-24">
            <!-- Header with back button -->
            <div class="flex items-center gap-3 mb-4">
                <button onclick="app.exitGrammarExercise()"
                        class="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100 hover:bg-gray-200">
                    <i class="fas fa-arrow-left text-gray-600"></i>
                </button>
                <div>
                    <h2 class="font-bold text-gray-800 text-xl">Grammatica oefening</h2>
                    <p class="text-sm text-gray-600">${
                        exercise.type === 'conjugation'
                            ? 'Werkwoordvervoeging'
                            : exercise.type === 'pronoun'
                              ? 'Voornaamwoord'
                              : exercise.type === 'article'
                                ? 'Lidwoord'
                                : exercise.type === 'adjective'
                                  ? 'Bijvoeglijk naamwoord'
                                  : exercise.type === 'number'
                                    ? 'Telwoord'
                                    : 'Vertaling'
                    }</p>
                </div>
            </div>

            <!-- Exercise Card -->
            <div class="bg-white rounded-2xl p-6 card-shadow">
                <p class="text-lg font-medium text-gray-800 mb-2">${escapeHtml(exercise.prompt)}</p>
                ${exercise.hint ? `<p class="text-sm text-gray-500 mb-4">${escapeHtml(exercise.hint)}</p>` : ''}

                ${
                    isMultipleChoice
                        ? `
                    <!-- Multiple Choice -->
                    <div class="space-y-2 mt-4">
                        ${exercise.options
                            .map(
                                option => `
                            <button onclick="app.checkGrammarAnswer('${option}')"
                                    class="w-full p-3 rounded-xl text-left transition-all
                                           ${
                                               state.showGrammarFeedback
                                                   ? option === exercise.answer
                                                       ? 'bg-green-100 border-2 border-green-400'
                                                       : state.grammarInput === option
                                                         ? 'bg-red-100 border-2 border-red-400'
                                                         : 'bg-gray-100'
                                                   : 'bg-gray-100 hover:bg-gray-200'
                                           }"
                                    ${state.showGrammarFeedback ? 'disabled' : ''}>
                                ${escapeHtml(option)}
                            </button>
                        `
                            )
                            .join('')}
                    </div>
                `
                        : `
                    <!-- Text Input -->
                    <input type="text"
                           id="grammar-input"
                           value="${escapeHtml(state.grammarInput || '')}"
                           oninput="app.updateGrammarInput(this.value)"
                           onkeypress="if(event.key === 'Enter') app.checkGrammarAnswer()"
                           placeholder="Typ je antwoord..."
                           class="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none mt-4"
                           ${state.showGrammarFeedback ? 'disabled' : ''}>
                    ${
                        !state.showGrammarFeedback
                            ? `
                        <button onclick="app.checkGrammarAnswer()"
                                class="w-full mt-3 p-3 rounded-xl font-medium text-white transition-all"
                                style="background: var(--scandi-blue);">
                            Controleer
                        </button>
                    `
                            : ''
                    }
                `
                }

                <!-- Feedback -->
                ${
                    state.showGrammarFeedback
                        ? `
                    <div class="mt-4 p-4 rounded-xl ${state.grammarCorrect ? 'bg-green-50' : 'bg-red-50'}">
                        <p class="font-medium ${state.grammarCorrect ? 'text-green-700' : 'text-red-700'}">
                            ${state.grammarCorrect ? 'Correct!' : 'Helaas, niet correct'}
                        </p>
                        ${
                            !state.grammarCorrect
                                ? `
                            <p class="text-sm text-gray-600 mt-1">
                                Het juiste antwoord is: <strong>${escapeHtml(exercise.answer)}</strong>
                            </p>
                        `
                                : ''
                        }
                        ${
                            exercise.translation
                                ? `
                            <p class="text-sm text-gray-500 mt-2">${escapeHtml(exercise.translation)}</p>
                        `
                                : ''
                        }
                    </div>

                    <button onclick="app.completeGrammarExercise()"
                            class="w-full mt-4 p-3 rounded-xl font-medium text-white transition-all"
                            style="background: var(--scandi-green);">
                        ${state.fromDailyProgram ? 'Volgende' : 'Terug naar grammatica'}
                    </button>
                `
                        : ''
                }
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
    // If in exercise mode from Daily Program
    if (state.grammarExerciseMode && state.currentGrammarExercise) {
        return renderGrammarExercise(state);
    }

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
