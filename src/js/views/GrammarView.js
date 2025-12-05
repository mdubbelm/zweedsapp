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

            <div class="bg-blue-50 rounded-xl p-4 mb-4">
                <p class="font-medium text-blue-800 mb-2">Basisregel</p>
                <ul class="space-y-2 text-sm">
                    <li><strong>blod</strong> (ett) + <strong>grupp</strong> (en) = <strong>en blodgrupp</strong> ${audioBtn('en blodgrupp')} (bloedgroep)</li>
                    <li><strong>bok</strong> (en) + <strong>handel</strong> (en) = <strong>en bokhandel</strong> ${audioBtn('en bokhandel')} (boekhandel)</li>
                    <li><strong>jul</strong> (en) + <strong>bord</strong> (ett) = <strong>ett julbord</strong> ${audioBtn('ett julbord')} (kerstbuffet)</li>
                </ul>
            </div>

            <h4 class="font-bold mb-2">Veel voorkomende voorbeelden</h4>
            <div class="grid grid-cols-2 gap-2 mb-4 text-sm">
                <div class="p-2 bg-gray-50 rounded">tandläkare ${audioBtn('tandläkare')} - tandarts</div>
                <div class="p-2 bg-gray-50 rounded">barnbok ${audioBtn('barnbok')} - kinderboek</div>
                <div class="p-2 bg-gray-50 rounded">kaffekopp ${audioBtn('kaffekopp')} - koffiekop</div>
                <div class="p-2 bg-gray-50 rounded">solsken ${audioBtn('solsken')} - zonneschijn</div>
                <div class="p-2 bg-gray-50 rounded">bondgård ${audioBtn('bondgård')} - boerderij</div>
                <div class="p-2 bg-gray-50 rounded">jordgubbe ${audioBtn('jordgubbe')} - aardbei</div>
            </div>

            <h4 class="font-bold mb-2">Verbindingsletters</h4>
            <p class="text-sm mb-3">Soms komt er een verbindingsletter tussen de delen:</p>
            <div class="overflow-x-auto -mx-4 px-4">
                <table class="w-full text-left text-sm min-w-[320px]">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">Verbinding</th><th class="p-2">Voorbeeld</th><th class="p-2">NL</th></tr>
                    </thead>
                    <tbody>
                        <tr class="border-b"><td class="p-2">-s-</td><td class="p-2">arbetsdag ${audioBtn('arbetsdag')}</td><td class="p-2">werkdag</td></tr>
                        <tr class="border-b"><td class="p-2">-s-</td><td class="p-2">tidningsartikel ${audioBtn('tidningsartikel')}</td><td class="p-2">krantenartikel</td></tr>
                        <tr class="border-b"><td class="p-2">-o-</td><td class="p-2">landsväg ${audioBtn('landsväg')}</td><td class="p-2">landweg</td></tr>
                        <tr class="border-b"><td class="p-2">-u-</td><td class="p-2">landstuga ${audioBtn('landstuga')}</td><td class="p-2">landhuis</td></tr>
                        <tr><td class="p-2">(geen)</td><td class="p-2">skolbok ${audioBtn('skolbok')}</td><td class="p-2">schoolboek</td></tr>
                    </tbody>
                </table>
            </div>
            <p class="text-xs text-gray-600 mt-2">Tip: De -s- verbinding is het meest voorkomend, vooral na woorden op -tion, -ning, -het.</p>
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
                    <div class="mt-3 p-3 bg-blue-100 rounded-lg">
                        <p class="text-xs font-medium text-blue-800 mb-2">🔄 Klinkerwisselingen in Groep 2:</p>
                        <ul class="text-xs text-blue-700 space-y-1">
                            <li>en dotter → två <strong>dö</strong>ttrar ${audioBtn('två döttrar')} (o→ö)</li>
                            <li>en moder → två <strong>mö</strong>drar ${audioBtn('två mödrar')} (o→ö)</li>
                            <li>en broder → två <strong>brö</strong>der ${audioBtn('två bröder')} (o→ö)</li>
                        </ul>
                    </div>
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
                    <div class="mt-3 p-3 bg-amber-100 rounded-lg">
                        <p class="text-xs font-medium text-amber-800 mb-2">🔄 Klinkerwisselingen in Groep 3:</p>
                        <ul class="text-xs text-amber-700 space-y-1">
                            <li>en hand → två <strong>hä</strong>nder ${audioBtn('två händer')} (a→ä)</li>
                            <li>en tand → två <strong>tä</strong>nder ${audioBtn('två tänder')} (a→ä)</li>
                            <li>en strand → två <strong>strä</strong>nder ${audioBtn('två stränder')} (a→ä)</li>
                            <li>en stad → två <strong>stä</strong>der ${audioBtn('två städer')} (a→ä)</li>
                            <li>en man → två <strong>män</strong> ${audioBtn('två män')} (a→ä, geen -er!)</li>
                            <li>en gås → två <strong>gä</strong>ss ${audioBtn('två gäss')} (å→ä)</li>
                            <li>en fot → två <strong>fö</strong>tter ${audioBtn('två fötter')} (o→ö)</li>
                            <li>en bok → två <strong>bö</strong>cker ${audioBtn('två böcker')} (o→ö)</li>
                        </ul>
                    </div>
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

            <h4 class="font-semibold text-gray-700 mb-2">Groep 1: -ar werkwoorden</h4>
            <p class="text-sm text-gray-600 mb-2">Stam eindigt op medeklinker, krijgt -ar</p>
            <ul class="space-y-1 mb-4">
                <li><strong>att tala → talar</strong> ${audioBtn('att tala, talar')} (praten)</li>
                <li><strong>att arbeta → arbetar</strong> ${audioBtn('att arbeta, arbetar')} (werken)</li>
                <li><strong>att fråga → frågar</strong> ${audioBtn('att fråga, frågar')} (vragen)</li>
                <li><strong>att stanna → stannar</strong> ${audioBtn('att stanna, stannar')} (blijven)</li>
            </ul>

            <h4 class="font-semibold text-gray-700 mb-2">Groep 2: -er werkwoorden</h4>
            <p class="text-sm text-gray-600 mb-2">Stam eindigt op medeklinker, krijgt -er</p>
            <ul class="space-y-1 mb-4">
                <li><strong>att läsa → läser</strong> ${audioBtn('att läsa, läser')} (lezen)</li>
                <li><strong>att skriva → skriver</strong> ${audioBtn('att skriva, skriver')} (schrijven)</li>
                <li><strong>att köpa → köper</strong> ${audioBtn('att köpa, köper')} (kopen)</li>
                <li><strong>att äta → äter</strong> ${audioBtn('att äta, äter')} (eten)</li>
            </ul>

            <h4 class="font-semibold text-gray-700 mb-2">Groep 3: korte werkwoorden</h4>
            <p class="text-sm text-gray-600 mb-2">Stam eindigt op klinker, krijgt alleen -r</p>
            <ul class="space-y-1 mb-6">
                <li><strong>att bo → bor</strong> ${audioBtn('att bo, bor')} (wonen)</li>
                <li><strong>att tro → tror</strong> ${audioBtn('att tro, tror')} (geloven)</li>
            </ul>

            <h3 class="text-lg font-bold mb-3">Verleden tijd</h3>
            <p class="mb-4">De meeste werkwoorden krijgen <strong>-de</strong> of <strong>-te</strong>:</p>
            <ul class="space-y-2 mb-6">
                <li><strong>talar → talade</strong> ${audioBtn('talar, talade')} (praatte) - Groep 1</li>
                <li><strong>läser → läste</strong> ${audioBtn('läser, läste')} (las) - Groep 2</li>
                <li><strong>bor → bodde</strong> ${audioBtn('bor, bodde')} (woonde) - Groep 3</li>
            </ul>

            <h3 class="text-lg font-bold mb-3">Onregelmatige werkwoorden</h3>
            <p class="mb-4">Deze werkwoorden volgen geen vast patroon en moet je uit je hoofd leren:</p>
            <div class="overflow-x-auto -mx-4 px-4">
                <table class="w-full text-left text-sm min-w-[320px]">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">Infinitief</th><th class="p-2">Heden</th><th class="p-2">Verleden</th><th class="p-2">NL</th></tr>
                    </thead>
                    <tbody>
                        <tr class="border-b"><td class="p-2">att vara ${audioBtn('att vara')}</td><td class="p-2">är</td><td class="p-2">var</td><td class="p-2">zijn</td></tr>
                        <tr class="border-b"><td class="p-2">att ha ${audioBtn('att ha')}</td><td class="p-2">har</td><td class="p-2">hade</td><td class="p-2">hebben</td></tr>
                        <tr class="border-b"><td class="p-2">att gå ${audioBtn('att gå')}</td><td class="p-2">går</td><td class="p-2">gick</td><td class="p-2">gaan</td></tr>
                        <tr class="border-b"><td class="p-2">att komma ${audioBtn('att komma')}</td><td class="p-2">kommer</td><td class="p-2">kom</td><td class="p-2">komen</td></tr>
                        <tr><td class="p-2">att se ${audioBtn('att se')}</td><td class="p-2">ser</td><td class="p-2">såg</td><td class="p-2">zien</td></tr>
                    </tbody>
                </table>
            </div>
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
    },
    genitive: {
        name: 'Genitief (bezits-s)',
        icon: 'fa-user-tag',
        color: '#6B8CAE',
        description: 'Bezit uitdrukken met -s',
        level: 'basis',
        content: `
            <h3 class="text-lg font-bold mb-3">De Zweedse genitief</h3>
            <p class="mb-4">In het Zweeds wordt bezit uitgedrukt door een <strong>-s</strong> aan het bezittende woord toe te voegen. Dit is veel simpeler dan in het Nederlands!</p>

            <div class="bg-blue-50 rounded-xl p-4 mb-6">
                <p class="font-medium text-blue-800 mb-2">Basisregel</p>
                <p class="text-sm">Voeg <strong>-s</strong> toe aan het woord dat bezit (geen apostrof!):</p>
                <ul class="mt-2 space-y-1 text-sm">
                    <li><strong>Karins bok</strong> ${audioBtn('Karins bok')} - Karins boek</li>
                    <li><strong>Rolfs far</strong> ${audioBtn('Rolfs far')} - Rolfs vader</li>
                    <li><strong>Katten</strong>s mat ${audioBtn('Kattens mat')} - Het eten van de kat</li>
                </ul>
            </div>

            <h3 class="text-lg font-bold mb-3">Voorbeelden met namen</h3>
            <table class="w-full text-left mb-6">
                <thead class="bg-gray-100">
                    <tr><th class="p-2">Zweeds</th><th class="p-2">Nederlands</th></tr>
                </thead>
                <tbody>
                    <tr class="border-b"><td class="p-2">Annas hund ${audioBtn('Annas hund')}</td><td class="p-2">Anna's hond</td></tr>
                    <tr class="border-b"><td class="p-2">Eriks bil ${audioBtn('Eriks bil')}</td><td class="p-2">Eriks auto</td></tr>
                    <tr class="border-b"><td class="p-2">mammas väska ${audioBtn('mammas väska')}</td><td class="p-2">mama's tas</td></tr>
                    <tr class="border-b"><td class="p-2">pappas telefon ${audioBtn('pappas telefon')}</td><td class="p-2">papa's telefoon</td></tr>
                    <tr><td class="p-2">Sveriges huvudstad ${audioBtn('Sveriges huvudstad')}</td><td class="p-2">de hoofdstad van Zweden</td></tr>
                </tbody>
            </table>

            <h3 class="text-lg font-bold mb-3">Met zelfstandige naamwoorden</h3>
            <div class="space-y-3 mb-6">
                <div class="p-3 bg-gray-50 rounded-lg">
                    <p class="font-medium">flickans katt ${audioBtn('flickans katt')}</p>
                    <p class="text-sm text-gray-600">de kat van het meisje</p>
                </div>
                <div class="p-3 bg-gray-50 rounded-lg">
                    <p class="font-medium">husets tak ${audioBtn('husets tak')}</p>
                    <p class="text-sm text-gray-600">het dak van het huis</p>
                </div>
                <div class="p-3 bg-gray-50 rounded-lg">
                    <p class="font-medium">barnens rum ${audioBtn('barnens rum')}</p>
                    <p class="text-sm text-gray-600">de kamer van de kinderen</p>
                </div>
                <div class="p-3 bg-gray-50 rounded-lg">
                    <p class="font-medium">stadens centrum ${audioBtn('stadens centrum')}</p>
                    <p class="text-sm text-gray-600">het centrum van de stad</p>
                </div>
            </div>

            <h3 class="text-lg font-bold mb-3">Uitzondering: woorden op -s, -x, -z</h3>
            <div class="bg-amber-50 rounded-xl p-4 mb-6">
                <p class="text-sm mb-2">Bij woorden die al eindigen op <strong>-s</strong>, <strong>-x</strong> of <strong>-z</strong> wordt <strong>geen extra -s</strong> toegevoegd:</p>
                <ul class="space-y-2 text-sm">
                    <li><strong>Frans hus</strong> ${audioBtn('Frans hus')} - Frans' huis (niet: Franss)</li>
                    <li><strong>Max bil</strong> ${audioBtn('Max bil')} - Max' auto (niet: Maxs)</li>
                    <li><strong>Lars väska</strong> ${audioBtn('Lars väska')} - Lars' tas</li>
                </ul>
                <p class="text-xs text-amber-700 mt-3">In formeel/ouderwets Zweeds zie je soms een apostrof: <em>Frans' hus</em>, maar dit is optioneel.</p>
            </div>

            <h3 class="text-lg font-bold mb-3">Vaste uitdrukkingen met genitief</h3>
            <div class="grid grid-cols-1 gap-2 mb-6 text-sm">
                <div class="p-2 bg-teal-50 rounded flex items-center justify-between">dagens rätt ${audioBtn('dagens rätt')} - dagschotel</div>
                <div class="p-2 bg-teal-50 rounded flex items-center justify-between">veckans erbjudande ${audioBtn('veckans erbjudande')} - weekaanbieding</div>
                <div class="p-2 bg-teal-50 rounded flex items-center justify-between">årets bästa film ${audioBtn('årets bästa film')} - beste film van het jaar</div>
                <div class="p-2 bg-teal-50 rounded flex items-center justify-between">världens största ${audioBtn('världens största')} - 's werelds grootste</div>
                <div class="p-2 bg-teal-50 rounded flex items-center justify-between">för Guds skull ${audioBtn('för Guds skull')} - in godsnaam</div>
            </div>

            <h3 class="text-lg font-bold mb-3">Genitief vs. possessief pronomen</h3>
            <p class="mb-4 text-sm">Let op het verschil:</p>
            <div class="overflow-x-auto -mx-4 px-4 mb-6">
                <table class="w-full text-left text-sm min-w-[320px]">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">Genitief</th><th class="p-2">Possessief</th><th class="p-2">Verschil</th></tr>
                    </thead>
                    <tbody>
                        <tr class="border-b">
                            <td class="p-2">Karins bok ${audioBtn('Karins bok')}</td>
                            <td class="p-2">hennes bok ${audioBtn('hennes bok')}</td>
                            <td class="p-2">Karin specifiek vs. "haar" algemeen</td>
                        </tr>
                        <tr class="border-b">
                            <td class="p-2">flickans rum ${audioBtn('flickans rum')}</td>
                            <td class="p-2">hennes rum ${audioBtn('hennes rum')}</td>
                            <td class="p-2">"van het meisje" vs. "haar"</td>
                        </tr>
                        <tr>
                            <td class="p-2">Eriks bil ${audioBtn('Eriks bil')}</td>
                            <td class="p-2">hans bil ${audioBtn('hans bil')}</td>
                            <td class="p-2">Erik specifiek vs. "zijn" algemeen</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 class="text-lg font-bold mb-3">Oefenzinnen</h3>
            <ul class="space-y-2">
                <li><strong>Det är Marias nya hus.</strong> ${audioBtn('Det är Marias nya hus')} - Dit is Maria's nieuwe huis.</li>
                <li><strong>Hundens mat är slut.</strong> ${audioBtn('Hundens mat är slut')} - Het hondenvoer is op.</li>
                <li><strong>Jag gillar Sveriges natur.</strong> ${audioBtn('Jag gillar Sveriges natur')} - Ik hou van de Zweedse natuur.</li>
                <li><strong>Vad är bilens färg?</strong> ${audioBtn('Vad är bilens färg')} - Wat is de kleur van de auto?</li>
            </ul>
        `
    },
    articleOmission: {
        name: 'Weglaten van lidwoord',
        icon: 'fa-minus-circle',
        color: '#C9826B',
        description: 'Wanneer gebruik je GEEN lidwoord',
        level: 'gevorderd',
        content: `
            <h3 class="text-lg font-bold mb-3">Wanneer laat je het lidwoord weg?</h3>
            <p class="mb-4">In het Zweeds wordt het lidwoord weggelaten in gevallen waar het Nederlands het WEL gebruikt. Dit is een belangrijke afwijking!</p>

            <div class="bg-clay-50 rounded-xl p-4 mb-6">
                <p class="font-medium text-clay-800 mb-2">Contrast met Nederlands</p>
                <p class="text-sm">In het Nederlands zeg je "Hij is <strong>een</strong> leraar" of "Zij spreekt <strong>de</strong> waarheid".<br>
                Het Zweeds laat deze lidwoorden vaak weg.</p>
            </div>

            <h3 class="text-lg font-bold mb-3">1. Bij beroepen en nationaliteiten</h3>
            <p class="mb-4">Na werkwoorden als <strong>vara</strong> (zijn) en <strong>bli</strong> (worden):</p>
            <div class="overflow-x-auto -mx-4 px-4 mb-6">
                <table class="w-full text-left text-sm min-w-[380px]">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">Zweeds</th><th class="p-2">Letterlijk NL</th><th class="p-2">Correct NL</th></tr>
                    </thead>
                    <tbody>
                        <tr class="border-b">
                            <td class="p-2">Han är <strong>lärare</strong>. ${audioBtn('Han är lärare')}</td>
                            <td class="p-2">Hij is leraar.</td>
                            <td class="p-2">Hij is <em>een</em> leraar.</td>
                        </tr>
                        <tr class="border-b">
                            <td class="p-2">Hon är <strong>svensk</strong>. ${audioBtn('Hon är svensk')}</td>
                            <td class="p-2">Zij is Zweeds.</td>
                            <td class="p-2">Zij is <em>een</em> Zweedse.</td>
                        </tr>
                        <tr class="border-b">
                            <td class="p-2">Jag är <strong>student</strong>. ${audioBtn('Jag är student')}</td>
                            <td class="p-2">Ik ben student.</td>
                            <td class="p-2">Ik ben <em>een</em> student.</td>
                        </tr>
                        <tr class="border-b">
                            <td class="p-2">De blev <strong>läkare</strong>. ${audioBtn('De blev läkare')}</td>
                            <td class="p-2">Zij werden arts.</td>
                            <td class="p-2">Zij werden <em>artsen</em>.</td>
                        </tr>
                        <tr>
                            <td class="p-2">Han är <strong>vegan</strong>. ${audioBtn('Han är vegan')}</td>
                            <td class="p-2">Hij is veganist.</td>
                            <td class="p-2">Hij is <em>een</em> veganist.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="p-3 bg-amber-50 rounded-lg text-sm mb-6">
                <p class="font-medium text-amber-800 mb-1">Let op!</p>
                <p>Zodra er een bijvoeglijk naamwoord bijkomt, gebruik je WEL het onbepaalde lidwoord:</p>
                <ul class="mt-2 space-y-1 text-sm">
                    <li>✅ Han är <strong>en bra lärare</strong>. ${audioBtn('Han är en bra lärare')} - Hij is een goede leraar.</li>
                    <li>✅ Hon är <strong>en ung student</strong>. ${audioBtn('Hon är en ung student')} - Zij is een jonge student.</li>
                </ul>
            </div>

            <h3 class="text-lg font-bold mb-3">2. Bij algemene uitingen en vaste uitdrukkingen</h3>
            <p class="mb-4">Bij algemene zaken waar het Nederlands "de/het" zou gebruiken:</p>
            <div class="overflow-x-auto -mx-4 px-4 mb-6">
                <table class="w-full text-left text-sm min-w-[380px]">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">Zweeds</th><th class="p-2">Letterlijk NL</th><th class="p-2">Correct NL</th></tr>
                    </thead>
                    <tbody>
                        <tr class="border-b">
                            <td class="p-2">Han talar <strong>sanning</strong>. ${audioBtn('Han talar sanning')}</td>
                            <td class="p-2">Hij spreekt waarheid.</td>
                            <td class="p-2">Hij spreekt <em>de</em> waarheid.</td>
                        </tr>
                        <tr class="border-b">
                            <td class="p-2">Ha <strong>tålamod</strong>! ${audioBtn('Ha tålamod')}</td>
                            <td class="p-2">Heb geduld!</td>
                            <td class="p-2">Heb <em>geduld</em>! (NL ook zonder)</td>
                        </tr>
                        <tr class="border-b">
                            <td class="p-2">Hon saknar <strong>erfarenhet</strong>. ${audioBtn('Hon saknar erfarenhet')}</td>
                            <td class="p-2">Zij mist ervaring.</td>
                            <td class="p-2">Zij mist <em>ervaring</em>. (NL ook zonder)</td>
                        </tr>
                        <tr class="border-b">
                            <td class="p-2">Jag behöver <strong>hjälp</strong>. ${audioBtn('Jag behöver hjälp')}</td>
                            <td class="p-2">Ik heb hulp nodig.</td>
                            <td class="p-2">Ik heb <em>hulp</em> nodig. (NL ook zonder)</td>
                        </tr>
                        <tr>
                            <td class="p-2">Hon spelar <strong>piano</strong>. ${audioBtn('Hon spelar piano')}</td>
                            <td class="p-2">Zij speelt piano.</td>
                            <td class="p-2">Zij speelt <em>piano</em>. (NL ook zonder)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 class="text-lg font-bold mb-3">3. Bij vervoermiddelen met åka</h3>
            <p class="mb-4">Na het werkwoord <strong>åka</strong> (gaan/reizen met):</p>
            <div class="space-y-3 mb-6">
                <div class="p-3 bg-gray-50 rounded-lg">
                    <p class="font-medium">Hon åkte <strong>buss</strong> till jobbet. ${audioBtn('Hon åkte buss till jobbet')}</p>
                    <p class="text-sm text-gray-600">Zij ging met <em>de</em> bus naar haar werk.</p>
                </div>
                <div class="p-3 bg-gray-50 rounded-lg">
                    <p class="font-medium">Vi åker <strong>tåg</strong> till Stockholm. ${audioBtn('Vi åker tåg till Stockholm')}</p>
                    <p class="text-sm text-gray-600">Wij gaan met <em>de</em> trein naar Stockholm.</p>
                </div>
                <div class="p-3 bg-gray-50 rounded-lg">
                    <p class="font-medium">De åkte <strong>bil</strong>. ${audioBtn('De åkte bil')}</p>
                    <p class="text-sm text-gray-600">Zij gingen met <em>de</em> auto.</p>
                </div>
                <div class="p-3 bg-gray-50 rounded-lg">
                    <p class="font-medium">Kan du åka <strong>motorcykel</strong>? ${audioBtn('Kan du åka motorcykel')}</p>
                    <p class="text-sm text-gray-600">Kun je <em>motorrijden</em>?</p>
                </div>
            </div>

            <div class="p-3 bg-blue-50 rounded-lg text-sm mb-6">
                <p class="font-medium text-blue-800 mb-1">Vergelijk:</p>
                <ul class="space-y-1">
                    <li>Åka <strong>buss</strong> ${audioBtn('åka buss')} = met de bus gaan (algemeen)</li>
                    <li>Ta <strong>bussen</strong> ${audioBtn('ta bussen')} = de (specifieke) bus nemen</li>
                </ul>
            </div>

            <h3 class="text-lg font-bold mb-3">Meer voorbeelden zonder lidwoord</h3>
            <div class="grid grid-cols-1 gap-2 text-sm">
                <div class="p-2 bg-clay-50 rounded flex items-center justify-between">
                    <span>gå i <strong>skolan</strong> ${audioBtn('gå i skolan')}</span>
                    <span class="text-gray-600">naar school gaan</span>
                </div>
                <div class="p-2 bg-clay-50 rounded flex items-center justify-between">
                    <span>vara hemma från <strong>jobbet</strong> ${audioBtn('vara hemma från jobbet')}</span>
                    <span class="text-gray-600">thuisblijven van het werk</span>
                </div>
                <div class="p-2 bg-clay-50 rounded flex items-center justify-between">
                    <span>till <strong>fots</strong> ${audioBtn('till fots')}</span>
                    <span class="text-gray-600">te voet</span>
                </div>
                <div class="p-2 bg-clay-50 rounded flex items-center justify-between">
                    <span>på <strong>semester</strong> ${audioBtn('på semester')}</span>
                    <span class="text-gray-600">op vakantie</span>
                </div>
            </div>
        `
    },
    loanwordPlurals: {
        name: 'Leenwoorden meervoud',
        icon: 'fa-globe',
        color: '#E89E8D',
        description: 'Moderne leenwoorden en hun meervoud',
        level: 'gevorderd',
        content: `
            <h3 class="text-lg font-bold mb-3">Leenwoorden in het Zweeds</h3>
            <p class="mb-4">Moderne leenwoorden (vooral uit het Engels) volgen een interessante ontwikkeling in hun meervoudsvorming.</p>

            <div class="bg-coral-50 rounded-xl p-4 mb-6">
                <p class="font-medium text-coral-800 mb-2">Historische ontwikkeling</p>
                <p class="text-sm">Engelse leenwoorden kregen eerst hun Engelse meervoud (-s), maar worden steeds vaker "gezweedst" met -r of -er.</p>
            </div>

            <h3 class="text-lg font-bold mb-3">Ontwikkeling: studio</h3>
            <p class="mb-4">Een mooi voorbeeld van hoe leenwoorden zich aanpassen:</p>
            <div class="overflow-x-auto -mx-4 px-4 mb-6">
                <table class="w-full text-left text-sm min-w-[320px]">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">Fase</th><th class="p-2">Meervoud</th><th class="p-2">Status</th></tr>
                    </thead>
                    <tbody>
                        <tr class="border-b">
                            <td class="p-2">1. Oorspronkelijk Engels</td>
                            <td class="p-2"><strong>studios</strong> ${audioBtn('studios')}</td>
                            <td class="p-2">❌ Verouderd</td>
                        </tr>
                        <tr class="border-b">
                            <td class="p-2">2. Gezweedst (tussenfase)</td>
                            <td class="p-2"><strong>studior</strong> ${audioBtn('studior')}</td>
                            <td class="p-2">⚠️ Acceptabel maar gedateerd</td>
                        </tr>
                        <tr>
                            <td class="p-2">3. Modern Zweeds</td>
                            <td class="p-2"><strong>studiorna</strong> ${audioBtn('studiorna')}</td>
                            <td class="p-2">✅ Voorkeur (bepaald meervoud)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 class="text-lg font-bold mb-3">Engelse leenwoorden: vermijden van -s</h3>
            <p class="mb-4">De moderne trend is om het Engelse -s meervoud te vermijden en Zweedse uitgangen te gebruiken:</p>
            <div class="overflow-x-auto -mx-4 px-4 mb-6">
                <table class="w-full text-left text-sm min-w-[380px]">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">Enkelvoud</th><th class="p-2">Engels mv.</th><th class="p-2">Zweeds mv.</th><th class="p-2">NL</th></tr>
                    </thead>
                    <tbody>
                        <tr class="border-b">
                            <td class="p-2">en jeans ${audioBtn('en jeans')}</td>
                            <td class="p-2">❌ jeans</td>
                            <td class="p-2">✅ <strong>jeansen</strong> ${audioBtn('jeansen')}</td>
                            <td class="p-2">de spijkerbroek</td>
                        </tr>
                        <tr class="border-b">
                            <td class="p-2">en fan ${audioBtn('en fan')}</td>
                            <td class="p-2">❌ fans</td>
                            <td class="p-2">✅ <strong>fansen</strong> ${audioBtn('fansen')}</td>
                            <td class="p-2">de fans</td>
                        </tr>
                        <tr class="border-b">
                            <td class="p-2">en trend ${audioBtn('en trend')}</td>
                            <td class="p-2">❌ trends</td>
                            <td class="p-2">✅ <strong>trender</strong> ${audioBtn('trender')}</td>
                            <td class="p-2">de trends</td>
                        </tr>
                        <tr class="border-b">
                            <td class="p-2">en influencer ${audioBtn('en influencer')}</td>
                            <td class="p-2">❌ influencers</td>
                            <td class="p-2">✅ <strong>influencers</strong> / <strong>influencern</strong> ${audioBtn('influencern')}</td>
                            <td class="p-2">de influencers</td>
                        </tr>
                        <tr>
                            <td class="p-2">en podcast ${audioBtn('en podcast')}</td>
                            <td class="p-2">❌ podcasts</td>
                            <td class="p-2">✅ <strong>poddar</strong> / <strong>podcaster</strong> ${audioBtn('poddar')}</td>
                            <td class="p-2">de podcasts</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="p-3 bg-amber-50 rounded-lg text-sm mb-6">
                <p class="font-medium text-amber-800 mb-1">Waarom deze verandering?</p>
                <p>Het Zweeds heeft geen natuurlijk -s meervoud (alleen Groep 5 verliezen een -e). Daarom worden leenwoorden aangepast om te passen in de Zweedse meervoudsgroepen (meestal Groep 1: -or of Groep 3: -er).</p>
            </div>

            <h3 class="text-lg font-bold mb-3">Uitzonderingen: woorden die -s behouden</h3>
            <p class="mb-4">Sommige woorden behouden hun Engelse meervoud, vooral:</p>
            <ul class="space-y-2 mb-6 text-sm">
                <li><strong>Afkortingen:</strong> SMS → SMS:ar ${audioBtn('SMSar')}, CD → CD:n / CD-skivor ${audioBtn('CDn')}</li>
                <li><strong>Merknamen:</strong> iPhones, Mercedes (blijft vaak enkelvoud)</li>
                <li><strong>Zeer recente woorden:</strong> selfies (maar al selfie-bilder)</li>
            </ul>

            <h3 class="text-lg font-bold mb-3">Praktische voorbeelden</h3>
            <div class="space-y-3 mb-6">
                <div class="p-3 bg-gray-50 rounded-lg">
                    <p class="font-medium">Alla <strong>fansen</strong> köpte <strong>jeansen</strong>. ${audioBtn('Alla fansen köpte jeansen')}</p>
                    <p class="text-sm text-gray-600">Alle fans kochten de spijkerbroeken.</p>
                </div>
                <div class="p-3 bg-gray-50 rounded-lg">
                    <p class="font-medium">Hon lyssnar på många <strong>poddar</strong>. ${audioBtn('Hon lyssnar på många poddar')}</p>
                    <p class="text-sm text-gray-600">Zij luistert naar veel podcasts.</p>
                </div>
                <div class="p-3 bg-gray-50 rounded-lg">
                    <p class="font-medium">Vi följer de senaste <strong>trenderna</strong>. ${audioBtn('Vi följer de senaste trenderna')}</p>
                    <p class="text-sm text-gray-600">Wij volgen de nieuwste trends.</p>
                </div>
            </div>

            <h3 class="text-lg font-bold mb-3">Tips voor leerders</h3>
            <div class="bg-blue-50 rounded-xl p-4">
                <ul class="space-y-2 text-sm">
                    <li>✅ Gebruik bij twijfel de Zweedse meervoudsuitgang (-ar, -er, -or)</li>
                    <li>✅ Check Svenska Akademiens Ordlista (SAOL) voor moderne spelling</li>
                    <li>✅ Let op dat jonge Zweden -s meervoud soms informeel gebruiken</li>
                    <li>❌ Vermijd -s in formeel/geschreven Zweeds</li>
                </ul>
            </div>
        `
    },
    articleAsPossessive: {
        name: 'Bepaald lidwoord als bezit',
        icon: 'fa-hand-holding-heart',
        color: '#9FA8BC',
        description: 'Lidwoord i.p.v. possessief bij lichaamsdelen',
        level: 'gevorderd',
        content: `
            <h3 class="text-lg font-bold mb-3">Bepaald lidwoord in plaats van bezittelijk voornaamwoord</h3>
            <p class="mb-4">Het Zweeds gebruikt vaak het <strong>bepaald lidwoord</strong> waar het Nederlands een <strong>bezittelijk voornaamwoord</strong> (mijn/jouw/zijn/haar) zou gebruiken.</p>

            <div class="bg-lavender-grey-50 rounded-xl p-4 mb-6">
                <p class="font-medium text-lavender-grey-800 mb-2">Basisregel</p>
                <p class="text-sm">Als uit de context duidelijk is <strong>wiens</strong> lichaamsdeel/kledingstuk het is, gebruik dan het bepaald lidwoord in plaats van een bezittelijk voornaamwoord.</p>
            </div>

            <h3 class="text-lg font-bold mb-3">1. Bij lichaamsdelen</h3>
            <p class="mb-4">Als het uit de context duidelijk is van wie het lichaamsdeel is:</p>
            <div class="overflow-x-auto -mx-4 px-4 mb-6">
                <table class="w-full text-left text-sm min-w-[400px]">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">Zweeds</th><th class="p-2">Letterlijk</th><th class="p-2">Correct NL</th></tr>
                    </thead>
                    <tbody>
                        <tr class="border-b">
                            <td class="p-2">Eva skar sig i <strong>handen</strong>. ${audioBtn('Eva skar sig i handen')}</td>
                            <td class="p-2">Eva sneed zich in <em>de hand</em>.</td>
                            <td class="p-2">Eva sneed zich in <em>haar hand</em>.</td>
                        </tr>
                        <tr class="border-b">
                            <td class="p-2">Han slog sig på <strong>huvudet</strong>. ${audioBtn('Han slog sig på huvudet')}</td>
                            <td class="p-2">Hij sloeg zich op <em>het hoofd</em>.</td>
                            <td class="p-2">Hij sloeg zich op <em>zijn hoofd</em>.</td>
                        </tr>
                        <tr class="border-b">
                            <td class="p-2">Hon tvättade <strong>händerna</strong>. ${audioBtn('Hon tvättade händerna')}</td>
                            <td class="p-2">Zij waste <em>de handen</em>.</td>
                            <td class="p-2">Zij waste <em>haar handen</em>.</td>
                        </tr>
                        <tr class="border-b">
                            <td class="p-2">Jag har ont i <strong>magen</strong>. ${audioBtn('Jag har ont i magen')}</td>
                            <td class="p-2">Ik heb pijn in <em>de buik</em>.</td>
                            <td class="p-2">Ik heb <em>buikpijn</em>.</td>
                        </tr>
                        <tr>
                            <td class="p-2">Hon böjde <strong>knäna</strong>. ${audioBtn('Hon böjde knäna')}</td>
                            <td class="p-2">Zij boog <em>de knieën</em>.</td>
                            <td class="p-2">Zij boog <em>haar knieën</em>.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="p-3 bg-red-50 rounded-lg text-sm mb-6">
                <p class="font-medium text-red-800 mb-1">❌ Veelgemaakte fout:</p>
                <p class="mb-2">Gebruik van bezittelijk voornaamwoord wanneer het niet nodig is:</p>
                <ul class="space-y-1">
                    <li>❌ Eva skar sig i <strong>sin hand</strong>. (onnodig bezittelijk)</li>
                    <li>✅ Eva skar sig i <strong>handen</strong>. (bepaald lidwoord volstaat)</li>
                </ul>
            </div>

            <h3 class="text-lg font-bold mb-3">2. Bij kledingstukken</h3>
            <p class="mb-4">Hetzelfde patroon geldt voor kleding:</p>
            <div class="overflow-x-auto -mx-4 px-4 mb-6">
                <table class="w-full text-left text-sm min-w-[400px]">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">Zweeds</th><th class="p-2">Letterlijk</th><th class="p-2">Correct NL</th></tr>
                    </thead>
                    <tbody>
                        <tr class="border-b">
                            <td class="p-2">Han knäppte upp <strong>rocken</strong>. ${audioBtn('Han knäppte upp rocken')}</td>
                            <td class="p-2">Hij knoopte <em>de jas</em> open.</td>
                            <td class="p-2">Hij knoopte <em>zijn jas</em> open.</td>
                        </tr>
                        <tr class="border-b">
                            <td class="p-2">Hon tog av sig <strong>skorna</strong>. ${audioBtn('Hon tog av sig skorna')}</td>
                            <td class="p-2">Zij trok <em>de schoenen</em> uit.</td>
                            <td class="p-2">Zij trok <em>haar schoenen</em> uit.</td>
                        </tr>
                        <tr class="border-b">
                            <td class="p-2">Jag glömde <strong>hatten</strong> hemma. ${audioBtn('Jag glömde hatten hemma')}</td>
                            <td class="p-2">Ik vergat <em>de hoed</em> thuis.</td>
                            <td class="p-2">Ik vergat <em>mijn hoed</em> thuis.</td>
                        </tr>
                        <tr>
                            <td class="p-2">Barnet tappade <strong>handsken</strong>. ${audioBtn('Barnet tappade handsken')}</td>
                            <td class="p-2">Het kind verloor <em>de handschoen</em>.</td>
                            <td class="p-2">Het kind verloor <em>zijn handschoen</em>.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 class="text-lg font-bold mb-3">Voorwaarde: eigenaar moet duidelijk zijn</h3>
            <div class="bg-blue-50 rounded-xl p-4 mb-6">
                <p class="font-medium text-blue-800 mb-2">Let op de context!</p>
                <div class="space-y-3 text-sm">
                    <div class="p-2 bg-white rounded">
                        <p class="font-medium mb-1">✅ Duidelijke eigenaar:</p>
                        <p>Eva tvättade <strong>händerna</strong>. ${audioBtn('Eva tvättade händerna')}</p>
                        <p class="text-gray-600 text-xs">Eva is subject → zij waste haar eigen handen</p>
                    </div>
                    <div class="p-2 bg-white rounded">
                        <p class="font-medium mb-1">❌ Onduidelijke eigenaar - gebruik possessief:</p>
                        <p>Eva tvättade <strong>hans händer</strong>. ${audioBtn('Eva tvättade hans händer')}</p>
                        <p class="text-gray-600 text-xs">Eva waste iemand anders' handen → possessief nodig</p>
                    </div>
                </div>
            </div>

            <h3 class="text-lg font-bold mb-3">Meer voorbeelden</h3>
            <div class="space-y-3 mb-6">
                <div class="p-3 bg-gray-50 rounded-lg">
                    <p class="font-medium">Hon borstade <strong>tänderna</strong>. ${audioBtn('Hon borstade tänderna')}</p>
                    <p class="text-sm text-gray-600">Zij poetste haar tanden.</p>
                </div>
                <div class="p-3 bg-gray-50 rounded-lg">
                    <p class="font-medium">Han skakade på <strong>huvudet</strong>. ${audioBtn('Han skakade på huvudet')}</p>
                    <p class="text-sm text-gray-600">Hij schudde zijn hoofd.</p>
                </div>
                <div class="p-3 bg-gray-50 rounded-lg">
                    <p class="font-medium">Jag blundade och slöt <strong>ögonen</strong>. ${audioBtn('Jag blundade och slöt ögonen')}</p>
                    <p class="text-sm text-gray-600">Ik sloot mijn ogen dicht.</p>
                </div>
                <div class="p-3 bg-gray-50 rounded-lg">
                    <p class="font-medium">Hon stoppade <strong>händerna</strong> i fickorna. ${audioBtn('Hon stoppade händerna i fickorna')}</p>
                    <p class="text-sm text-gray-600">Zij stopte haar handen in haar zakken.</p>
                </div>
            </div>

            <h3 class="text-lg font-bold mb-3">Samenvatting</h3>
            <div class="overflow-x-auto -mx-4 px-4">
                <table class="w-full text-left text-sm min-w-[320px]">
                    <thead class="bg-gray-100">
                        <tr><th class="p-2">Situatie</th><th class="p-2">Gebruik</th><th class="p-2">Voorbeeld</th></tr>
                    </thead>
                    <tbody>
                        <tr class="border-b">
                            <td class="p-2">Eigenaar duidelijk uit subject</td>
                            <td class="p-2">✅ Bepaald lidwoord</td>
                            <td class="p-2">Hon tvättade <strong>händerna</strong>.</td>
                        </tr>
                        <tr class="border-b">
                            <td class="p-2">Eigenaar is iemand anders</td>
                            <td class="p-2">✅ Possessief</td>
                            <td class="p-2">Hon tvättade <strong>hans händer</strong>.</td>
                        </tr>
                        <tr>
                            <td class="p-2">Nadruk op bezit</td>
                            <td class="p-2">✅ Possessief</td>
                            <td class="p-2">Det är <strong>min hand</strong>! (nadruk)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
                    <div class="flex-1">
                        <div class="flex items-center gap-2">
                            <p class="font-bold text-gray-800">${escapeHtml(topic.name)}</p>
                            ${topic.level === 'gevorderd' ? '<span class="text-xs px-2 py-0.5 rounded-full text-white" style="background-color: var(--scandi-teal);">gevorderd</span>' : ''}
                        </div>
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
