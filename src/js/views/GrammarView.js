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
            <h3 class="text-lg font-bold mb-3">Onbepaalde lidwoorden</h3>
            <p class="mb-4">In het Zweeds zijn er twee onbepaalde lidwoorden:</p>
            <ul class="space-y-2 mb-6">
                <li><strong>en</strong> - voor "en-woorden" (utrum): en bok (een boek)</li>
                <li><strong>ett</strong> - voor "ett-woorden" (neutrum): ett hus (een huis)</li>
            </ul>

            <h3 class="text-lg font-bold mb-3">Bepaalde lidwoorden</h3>
            <p class="mb-4">Het bepaalde lidwoord wordt als suffix aan het zelfstandig naamwoord toegevoegd:</p>
            <ul class="space-y-2 mb-6">
                <li><strong>-en</strong> voor en-woorden: boken (het boek)</li>
                <li><strong>-et</strong> voor ett-woorden: huset (het huis)</li>
            </ul>

            <h3 class="text-lg font-bold mb-3">Voorbeelden</h3>
            <table class="w-full text-left">
                <thead class="bg-gray-100">
                    <tr><th class="p-2">Onbepaald</th><th class="p-2">Bepaald</th><th class="p-2">Betekenis</th></tr>
                </thead>
                <tbody>
                    <tr class="border-b"><td class="p-2">en katt</td><td class="p-2">katten</td><td class="p-2">een/de kat</td></tr>
                    <tr class="border-b"><td class="p-2">ett barn</td><td class="p-2">barnet</td><td class="p-2">een/het kind</td></tr>
                    <tr class="border-b"><td class="p-2">en flicka</td><td class="p-2">flickan</td><td class="p-2">een/het meisje</td></tr>
                    <tr><td class="p-2">ett äpple</td><td class="p-2">äpplet</td><td class="p-2">een/de appel</td></tr>
                </tbody>
            </table>
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
            <table class="w-full text-left mb-6">
                <thead class="bg-gray-100">
                    <tr><th class="p-2">Zweeds</th><th class="p-2">Nederlands</th><th class="p-2">Voorbeeld</th></tr>
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
