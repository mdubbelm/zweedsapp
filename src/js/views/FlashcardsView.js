/**
 * Flashcards View
 * Spaced repetition flashcard practice
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
 * Render flashcards view
 * @param {object} state - App state
 * @param {function} getFilteredPhrases - Function to filter phrases
 * @returns {string} HTML string
 */
export function renderFlashcards(state, getFilteredPhrases) {
    const category = categories[state.flashcardCategory || state.currentCategory];
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

    const phraseIndex = state.currentFlashcardIndex || 0;
    const phrase = phrases[Math.min(phraseIndex, phrases.length - 1)];
    const progress = ((phraseIndex + 1) / phrases.length) * 100;

    return `
        <div class="space-y-4 animate-slideUp pb-24">
            <!-- Category Header -->
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                         style="background: var(--scandi-green);">
                        <i class="fas fa-layer-group"></i>
                    </div>
                    <div>
                        <h2 class="font-bold text-gray-800">${escapeHtml(category.name)}</h2>
                        <p class="text-sm text-gray-600">Kaart ${phraseIndex + 1} van ${phrases.length}</p>
                    </div>
                </div>
                ${getDifficultyBadge(phrase.difficulty)}
            </div>

            <!-- Progress Bar -->
            <div class="bg-gray-200 rounded-full h-2 overflow-hidden">
                <div class="h-2 rounded-full transition-all duration-500"
                     style="width: ${progress}%; background: var(--scandi-green);"></div>
            </div>

            <!-- Flashcard -->
            <div class="perspective-1000">
                <div onclick="app.flipFlashcard()"
                     class="glass-effect rounded-2xl p-8 card-shadow cursor-pointer min-h-[300px] flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] ${state.showFlashcardAnswer ? 'bg-green-50' : ''}">

                    ${
                        !state.showFlashcardAnswer
                            ? `
                        <!-- Front (Dutch) -->
                        <div class="text-center">
                            <p class="text-sm text-gray-500 mb-4">Vertaal naar Zweeds:</p>
                            <p class="text-2xl font-bold text-gray-800">${escapeHtml(phrase.dutch)}</p>
                            <p class="text-sm text-gray-400 mt-6">
                                <i class="fas fa-hand-pointer mr-2"></i>Tik om te draaien
                            </p>
                        </div>
                    `
                            : `
                        <!-- Back (Swedish) -->
                        <div class="text-center">
                            <p class="text-sm text-gray-500 mb-2">Nederlands:</p>
                            <p class="text-lg text-gray-600 mb-4">${escapeHtml(phrase.dutch)}</p>
                            <p class="text-sm text-gray-500 mb-2">Zweeds:</p>
                            <p class="text-2xl font-bold text-gray-800 mb-2">${escapeHtml(phrase.swedish)}</p>
                            <p class="text-sm text-gray-500 italic">${escapeHtml(phrase.pronunciation)}</p>
                        </div>
                    `
                    }
                </div>
            </div>

            <!-- Audio Button (only when answer shown) -->
            ${
                state.showFlashcardAnswer
                    ? `
                <button onclick="app.speakSwedish('${escapeHtml(phrase.swedish).replace(/'/g, "\\'")}')"
                        class="w-full py-4 rounded-xl font-semibold text-white card-hover card-shadow flex items-center justify-center gap-3"
                        style="background: var(--scandi-blue);">
                    <i class="fas fa-volume-up text-xl"></i>
                    <span>Luister naar uitspraak</span>
                </button>
            `
                    : ''
            }

            <!-- Rating Buttons (only when answer shown) -->
            ${
                state.showFlashcardAnswer
                    ? `
                <div class="grid grid-cols-3 gap-3">
                    <button onclick="app.rateFlashcard('hard')"
                            class="py-4 rounded-xl font-semibold text-white card-hover card-shadow flex flex-col items-center gap-1"
                            style="background: var(--scandi-red);">
                        <i class="fas fa-frown"></i>
                        <span class="text-sm">Moeilijk</span>
                    </button>
                    <button onclick="app.rateFlashcard('medium')"
                            class="py-4 rounded-xl font-semibold text-white card-hover card-shadow flex flex-col items-center gap-1"
                            style="background: var(--scandi-amber);">
                        <i class="fas fa-meh"></i>
                        <span class="text-sm">Oké</span>
                    </button>
                    <button onclick="app.rateFlashcard('easy')"
                            class="py-4 rounded-xl font-semibold text-white card-hover card-shadow flex flex-col items-center gap-1"
                            style="background: var(--scandi-green);">
                        <i class="fas fa-smile"></i>
                        <span class="text-sm">Makkelijk</span>
                    </button>
                </div>
            `
                    : ''
            }

            <!-- Navigation -->
            <div class="flex gap-3">
                <button onclick="app.previousFlashcard()"
                        class="flex-1 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 card-hover ${phraseIndex === 0 ? 'opacity-50' : ''}"
                        ${phraseIndex === 0 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left mr-2"></i>Vorige
                </button>
                <button onclick="app.nextFlashcard()"
                        class="flex-1 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 card-hover ${phraseIndex >= phrases.length - 1 ? 'opacity-50' : ''}"
                        ${phraseIndex >= phrases.length - 1 ? 'disabled' : ''}>
                    Volgende<i class="fas fa-chevron-right ml-2"></i>
                </button>
            </div>

            <!-- Shuffle Button -->
            <button onclick="app.shuffleFlashcards()"
                    class="w-full py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 card-hover">
                <i class="fas fa-random mr-2"></i>Shuffle kaarten
            </button>
        </div>
    `;
}
