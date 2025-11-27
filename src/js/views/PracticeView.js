/**
 * Practice View
 * Audio recording and pronunciation practice
 */

import { escapeHtml } from '../utils/helpers.js';
import { categories } from '../data/phrases.js';

/**
 * Handle click on disabled complete button
 * Shows shake animation and announces feedback
 */
function handleDisabledClick() {
    const button = document.getElementById('complete-btn-wrapper');
    const feedback = document.getElementById('disabled-feedback');

    if (button) {
        button.classList.add('animate-shake');
        setTimeout(() => button.classList.remove('animate-shake'), 500);
    }

    if (feedback) {
        feedback.textContent = 'Luister eerst naar de uitspraak of neem jezelf op';
        setTimeout(() => {
            feedback.textContent = '';
        }, 3000);
    }
}

// Make available globally for onclick
if (typeof window !== 'undefined') {
    window.handleDisabledClick = handleDisabledClick;
}

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
 * Render practice view
 * @param {object} state - App state
 * @param {function} getFilteredPhrases - Function to filter phrases
 * @returns {string} HTML string
 */
export function renderPractice(state, getFilteredPhrases) {
    const category = categories[state.currentCategory];
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

    const phraseIndex = Math.min(state.currentPhraseIndex, phrases.length - 1);
    const phrase = phrases[phraseIndex];
    const phraseId = `${state.currentCategory}-${phrase.id}`;
    const isCompleted = state.completedPhrases.includes(phraseId);
    const progress = ((phraseIndex + 1) / phrases.length) * 100;

    return `
        <div class="space-y-4 animate-slideUp pb-24">
            <!-- Category Header -->
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                         style="background: var(--scandi-blue);">
                        <i class="fas ${category.icon}"></i>
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
                     style="width: ${progress}%; background: var(--scandi-blue);"></div>
            </div>

            <!-- Phrase Card -->
            <div class="glass-effect rounded-2xl p-6 card-shadow">
                <!-- Swedish Text -->
                <div class="text-center mb-6">
                    <p class="text-2xl font-bold text-gray-800 mb-2">${escapeHtml(phrase.swedish)}</p>
                    ${
                        state.showAnswer
                            ? `
                        <p class="text-lg text-gray-600">${escapeHtml(phrase.dutch)}</p>
                        <p class="text-sm text-gray-500 italic mt-2">${escapeHtml(phrase.pronunciation)}</p>
                    `
                            : ''
                    }
                </div>

                <!-- Audio Controls -->
                <div class="flex flex-col gap-4">
                    <!-- Listen Button -->
                    <button onclick="app.speakSwedish('${escapeHtml(phrase.swedish).replace(/'/g, "\\'")}')"
                            class="w-full py-4 rounded-xl font-semibold text-white card-hover card-shadow flex items-center justify-center gap-3"
                            style="background: var(--scandi-blue);">
                        <i class="fas fa-volume-up text-xl"></i>
                        <span>Luister</span>
                    </button>

                    <!-- Record Button -->
                    <button onclick="app.toggleRecording()"
                            class="w-full py-4 rounded-xl font-semibold text-white card-hover card-shadow flex items-center justify-center gap-3 ${state.isRecording ? 'animate-pulse' : ''}"
                            style="background: ${state.isRecording ? 'var(--scandi-red)' : 'var(--scandi-green)'};">
                        <i class="fas ${state.isRecording ? 'fa-stop' : 'fa-microphone'} text-xl"></i>
                        <span>${state.isRecording ? 'Stop opname' : 'Neem op'}</span>
                    </button>

                    <!-- Playback (if recorded) -->
                    ${
                        state.audioURL
                            ? `
                        <button onclick="app.playRecording()"
                                class="w-full py-4 rounded-xl font-semibold text-gray-700 card-hover card-shadow flex items-center justify-center gap-3 bg-gray-100">
                            <i class="fas fa-play text-xl"></i>
                            <span>Speel opname af</span>
                        </button>
                    `
                            : ''
                    }
                </div>

                <!-- Show/Hide Answer -->
                <button onclick="app.toggleAnswer()"
                        class="w-full mt-4 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors">
                    <i class="fas ${state.showAnswer ? 'fa-eye-slash' : 'fa-eye'} mr-2"></i>
                    ${state.showAnswer ? 'Verberg antwoord' : 'Toon antwoord'}
                </button>
            </div>

            <!-- Screen reader announcement region -->
            <div id="disabled-feedback" aria-live="polite" class="sr-only"></div>

            <!-- Action Buttons -->
            <div class="flex gap-3">
                ${
                    isCompleted
                        ? `
                    <button disabled
                            class="flex-1 py-4 rounded-xl font-bold text-white"
                            style="background: var(--scandi-green);">
                        <i class="fas fa-check mr-2"></i>Voltooid
                    </button>
                `
                        : state.hasListenedToAudio || state.audioURL
                          ? `
                    <button onclick="app.markPhraseComplete()"
                            class="flex-1 py-4 rounded-xl font-bold card-hover card-shadow border-2 transition-all hover:bg-green-50"
                            style="border-color: var(--scandi-green); color: var(--scandi-green); background: white;">
                        <i class="far fa-square mr-2"></i>Voltooid
                    </button>
                `
                          : `
                    <div id="complete-btn-wrapper" class="flex-1" onclick="handleDisabledClick()">
                        <button disabled
                                class="w-full py-4 rounded-xl font-bold text-gray-400 bg-gray-100 cursor-not-allowed border-2 border-gray-200"
                                style="pointer-events: none;">
                            <i class="fas fa-lock mr-2"></i>Voltooid
                        </button>
                        <p class="text-xs text-gray-500 text-center mt-1">Luister of neem eerst op</p>
                    </div>
                `
                }
            </div>

            <!-- Navigation -->
            <div class="flex gap-3">
                <button onclick="app.previousPhrase()"
                        class="flex-1 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 card-hover ${phraseIndex === 0 ? 'opacity-50' : ''}"
                        ${phraseIndex === 0 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left mr-2"></i>Vorige
                </button>
                <button onclick="app.nextPhrase()"
                        class="flex-1 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 card-hover ${phraseIndex >= phrases.length - 1 ? 'opacity-50' : ''}"
                        ${phraseIndex >= phrases.length - 1 ? 'disabled' : ''}>
                    Volgende<i class="fas fa-chevron-right ml-2"></i>
                </button>
            </div>
        </div>
    `;
}
