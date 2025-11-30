/**
 * Writing View
 * Spelling practice - type Swedish sentences
 */

import { escapeHtml } from '../utils/helpers.js';
import { categories } from '../data/phrases.js';

/**
 * Get difficulty badge HTML
 * @param {string} difficulty - Difficulty level
 * @returns {string} HTML string
 */
function getDifficultyBadge(difficulty) {
    const badges = {
        easy: '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">Makkelijk</span>',
        medium: '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">Gemiddeld</span>',
        hard: '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">Moeilijk</span>'
    };
    return badges[difficulty] || '';
}

/**
 * Normalize text for comparison (remove extra spaces, lowercase)
 * @param {string} text - Text to normalize
 * @returns {string} Normalized text
 */
function normalizeText(text) {
    return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * Check if answer is correct
 * @param {string} input - User input
 * @param {string} expected - Expected answer
 * @returns {boolean} Whether answer is correct
 */
export function checkAnswer(input, expected) {
    return normalizeText(input) === normalizeText(expected);
}

/**
 * Render writing view
 * @param {object} state - App state
 * @param {function} getFilteredPhrases - Function to filter phrases
 * @returns {string} HTML string
 */
export function renderWriting(state, getFilteredPhrases) {
    const category = categories[state.writingCategory || state.currentCategory];
    if (!category) {
        return `
            <div class="space-y-4 animate-slideUp pb-24">
                <div class="glass-effect rounded-2xl p-6 card-shadow text-center">
                    <p class="text-gray-600">Categorie niet gevonden</p>
                    <button onclick="app.switchTab('home')" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl">
                        Terug naar home
                    </button>
                </div>
            </div>
        `;
    }

    const phrases = getFilteredPhrases ? getFilteredPhrases(category.phrases) : category.phrases;

    if (phrases.length === 0) {
        return `
            <div class="space-y-4 animate-slideUp pb-24">
                <div class="glass-effect rounded-2xl p-6 card-shadow text-center">
                    <p class="text-gray-600">Geen zinnen beschikbaar met huidige filter</p>
                    <button onclick="app.switchTab('home')" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl">
                        Terug naar home
                    </button>
                </div>
            </div>
        `;
    }

    const phraseIndex = state.currentWritingIndex || 0;
    const phrase = phrases[Math.min(phraseIndex, phrases.length - 1)];
    const progress = ((phraseIndex + 1) / phrases.length) * 100;

    return `
        <div class="space-y-4 animate-slideUp pb-24">
            <!-- Category Header -->
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                         style="background: var(--scandi-teal);">
                        <i class="fas fa-keyboard"></i>
                    </div>
                    <div>
                        <h2 class="font-bold text-gray-800">${escapeHtml(category.name)}</h2>
                        <p class="text-sm text-gray-600">Zin ${phraseIndex + 1} van ${phrases.length}</p>
                    </div>
                </div>
                ${getDifficultyBadge(phrase.difficulty)}
            </div>

            <!-- Progress Bar -->
            <div class="bg-gray-200 rounded-full h-2 overflow-hidden">
                <div class="h-2 rounded-full transition-all duration-500"
                     style="width: ${progress}%; background: var(--scandi-teal);"></div>
            </div>

            <!-- Writing Card -->
            <div class="glass-effect rounded-2xl p-6 card-shadow">
                <!-- Dutch Text (prompt) -->
                <div class="text-center mb-6">
                    <p class="text-sm text-gray-500 mb-2">Vertaal naar Zweeds:</p>
                    <p class="text-xl font-bold text-gray-800">${escapeHtml(phrase.dutch)}</p>
                </div>

                <!-- Listen Button -->
                <button onclick="app.speakSwedish('${escapeHtml(phrase.swedish).replace(/'/g, "\\'")}')"
                        class="w-full py-3 rounded-xl font-semibold text-white card-hover card-shadow flex items-center justify-center gap-3 mb-4"
                        style="background: var(--scandi-blue);">
                    <i class="fas fa-volume-up"></i>
                    <span>Luister naar uitspraak</span>
                </button>

                <!-- Input Field -->
                <div class="relative">
                    <input type="text"
                           id="writingInput"
                           value="${escapeHtml(state.writingInput || '')}"
                           oninput="app.updateWritingInput(this.value)"
                           onkeypress="if(event.key === 'Enter') app.checkWriting()"
                           placeholder="Type de Zweedse vertaling..."
                           autocomplete="off"
                           autocapitalize="off"
                           spellcheck="false"
                           class="w-full p-4 text-lg border-2 rounded-xl transition-colors ${
                               state.showWritingFeedback
                                   ? state.writingCorrect
                                       ? 'border-green-500 bg-green-50'
                                       : 'border-red-500 bg-red-50'
                                   : 'border-gray-200 focus:border-blue-500'
                           }">
                    ${
                        state.showWritingFeedback
                            ? `
                        <div class="absolute right-4 top-1/2 -translate-y-1/2">
                            <i class="fas ${state.writingCorrect ? 'fa-check-circle text-green-500' : 'fa-times-circle text-red-500'} text-2xl"></i>
                        </div>
                    `
                            : ''
                    }
                </div>

                <!-- Feedback -->
                ${
                    state.showWritingFeedback
                        ? `
                    <div class="mt-4 p-4 rounded-xl ${state.writingCorrect ? 'bg-green-100' : 'bg-red-100'}">
                        ${
                            state.writingCorrect
                                ? `
                            <p class="text-green-700 font-semibold"><i class="fas fa-check mr-2"></i>Correct!</p>
                        `
                                : `
                            <p class="text-red-700 font-semibold mb-2"><i class="fas fa-times mr-2"></i>Niet helemaal goed</p>
                            <p class="text-gray-700">Het juiste antwoord is:</p>
                            <p class="text-lg font-bold text-gray-800">${escapeHtml(phrase.swedish)}</p>
                        `
                        }
                    </div>
                `
                        : ''
                }

                <!-- Check Button -->
                ${
                    !state.showWritingFeedback
                        ? `
                    <button onclick="app.checkWriting()"
                            class="w-full mt-4 py-4 rounded-xl font-bold text-white card-hover card-shadow"
                            style="background: var(--scandi-teal);">
                        <i class="fas fa-check mr-2"></i>Controleer
                    </button>
                `
                        : state.writingCorrect
                          ? `
                    <button onclick="app.nextWritingPhrase()"
                            class="w-full mt-4 py-4 rounded-xl font-bold text-white card-hover card-shadow"
                            style="background: var(--scandi-teal);">
                        <i class="fas fa-arrow-right mr-2"></i>Volgende zin
                    </button>
                `
                          : state.fromDailyProgram
                            ? `
                    <div class="flex gap-3 mt-4">
                        <button onclick="app.nextWritingPhrase()"
                                class="flex-1 py-4 rounded-xl font-bold text-white card-hover card-shadow"
                                style="background: var(--scandi-teal);">
                            <i class="fas fa-redo mr-2"></i>Opnieuw proberen
                        </button>
                        <button onclick="app.skipDailyPhrase()"
                                class="flex-1 py-4 rounded-xl font-bold text-gray-600 bg-gray-200 card-hover card-shadow">
                            <i class="fas fa-forward mr-2"></i>Overslaan
                        </button>
                    </div>
                `
                            : `
                    <button onclick="app.nextWritingPhrase()"
                            class="w-full mt-4 py-4 rounded-xl font-bold text-white card-hover card-shadow"
                            style="background: var(--scandi-teal);">
                        <i class="fas fa-arrow-right mr-2"></i>Volgende zin
                    </button>
                `
                }

                <!-- Hint Button -->
                ${
                    !state.showWritingFeedback
                        ? `
                    <button onclick="app.showWritingHint()"
                            class="w-full mt-2 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors">
                        <i class="fas fa-lightbulb mr-2"></i>Hint (eerste letters)
                    </button>
                `
                        : ''
                }
            </div>

            <!-- Navigation -->
            <div class="flex gap-3">
                <button onclick="app.previousWritingPhrase()"
                        class="flex-1 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 card-hover ${phraseIndex === 0 ? 'opacity-50' : ''}"
                        ${phraseIndex === 0 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left mr-2"></i>Vorige
                </button>
                <button onclick="app.nextWritingPhrase()"
                        class="flex-1 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 card-hover ${phraseIndex >= phrases.length - 1 ? 'opacity-50' : ''}"
                        ${phraseIndex >= phrases.length - 1 ? 'disabled' : ''}>
                    Volgende<i class="fas fa-chevron-right ml-2"></i>
                </button>
            </div>
        </div>
    `;
}
