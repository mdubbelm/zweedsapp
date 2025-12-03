/**
 * Practice View
 * Audio recording and pronunciation practice
 * Redesigned with 3-zone progressive disclosure pattern
 */

import { escapeHtml } from '../utils/helpers.js';
import { categories } from '../data/phrases.js';

// NOTE: Speech recognition helpers (isIOS, getSimilarityColor, getSimilarityLabel, hasSpeechRecognition)
// removed - feature disabled until we have a reliable cross-browser solution (see issue #81)

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
 * Render phrase hero section with inline play button
 */
function renderPhraseHero(phrase) {
    return `
        <div class="glass-effect rounded-2xl p-6 card-shadow">
            <!-- Swedish Text with inline play -->
            <div class="flex items-center justify-center gap-4 mb-4">
                <p class="text-2xl md:text-3xl font-bold text-gray-800 text-center flex-1">
                    ${escapeHtml(phrase.swedish)}
                </p>
                <button onclick="app.speakSwedish('${escapeHtml(phrase.swedish).replace(/'/g, "\\'")}'); app.markAudioListened();"
                        class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white card-hover"
                        style="background: var(--scandi-blue);"
                        aria-label="Luister naar uitspraak">
                    <i class="fas fa-volume-up text-xl"></i>
                </button>
            </div>

            <!-- Collapsible Translation -->
            <details class="text-center">
                <summary class="cursor-pointer text-sm text-gray-600 hover:text-gray-800 py-2 inline-flex items-center gap-2 mx-auto">
                    <i class="fas fa-book-open"></i>
                    <span>Toon vertaling</span>
                </summary>
                <div class="mt-3 pt-3 border-t border-gray-200">
                    <p class="text-lg text-gray-700 mb-2">${escapeHtml(phrase.dutch)}</p>
                    <p class="text-sm text-gray-500 italic">${escapeHtml(phrase.pronunciation)}</p>
                </div>
            </details>
        </div>
    `;
}

/**
 * Render speech recognition section
 * DISABLED: Web Speech API is unreliable across browsers (see issue #81)
 * Keeping the function for future use when we have a better solution
 */
function renderSpeechRecognitionSection() {
    // Feature disabled until we have a reliable cross-browser solution
    // See: https://github.com/mdubbelm/zweedsapp/issues/81
    return '';
}

/**
 * Render hero recording button with 3 states
 */
function renderRecordingButton(state, phrase) {
    if (state.isRecording) {
        // State 2: Recording
        return `
            <button onclick="app.toggleRecording()"
                    class="hero-record-btn"
                    data-state="recording"
                    aria-pressed="true">
                <div class="flex items-center gap-3">
                    <i class="fas fa-stop-circle text-3xl"></i>
                    <span class="text-xl">Stop opname</span>
                </div>
                <span class="text-sm opacity-80">Opnemen...</span>
            </button>
        `;
    }

    if (state.audioURL) {
        // State 3: Playback - Compare mode
        return `
            <div class="compare-section glass-effect rounded-2xl p-4 card-shadow">
                <p class="text-center text-sm font-medium text-gray-600 mb-4">
                    Vergelijk je uitspraak
                </p>
                <div class="flex gap-3">
                    <button onclick="app.speakSwedish('${escapeHtml(phrase.swedish).replace(/'/g, "\\'")}')"
                            class="compare-btn flex-1"
                            data-type="native">
                        <i class="fas fa-volume-up text-xl"></i>
                        <span>Origineel</span>
                    </button>
                    <button onclick="app.playRecording()"
                            class="compare-btn flex-1"
                            data-type="recording">
                        <i class="fas fa-microphone text-xl"></i>
                        <span>Jouw opname</span>
                    </button>
                </div>

                <button onclick="app.clearRecording()"
                        class="w-full mt-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    <i class="fas fa-redo mr-2"></i>Opnieuw opnemen
                </button>
            </div>
        `;
    }

    // State 1: Ready to record
    return `
        <button onclick="app.toggleRecording()"
                class="hero-record-btn"
                data-state="ready">
            <div class="flex items-center gap-3">
                <i class="fas fa-microphone text-3xl"></i>
                <span class="text-xl">Neem op</span>
            </div>
            <span class="text-sm opacity-75">Tik om jezelf op te nemen</span>
        </button>
    `;
}

/**
 * Render sticky bottom controls
 * When fromDailyProgram=true, show Skip button instead of Vorige/Volgende
 */
function renderStickyControls(
    phraseIndex,
    totalPhrases,
    isCompleted,
    canComplete,
    fromDailyProgram
) {
    // Daily program mode: simplified controls with Skip option
    if (fromDailyProgram) {
        return `
            <div class="practice-controls safe-bottom" role="navigation" aria-label="Dagprogramma navigatie">
                <button onclick="app.skipDailyPhrase()"
                        class="nav-btn"
                        aria-label="Overslaan">
                    <i class="fas fa-forward"></i>
                    <span class="nav-label">Overslaan</span>
                </button>

                ${
                    isCompleted
                        ? `
                        <button disabled
                                class="complete-toggle completed"
                                aria-pressed="true">
                            <i class="fas fa-check-circle"></i>
                            <span>Geleerd</span>
                        </button>
                    `
                        : canComplete
                          ? `
                        <button onclick="app.markPhraseComplete()"
                                class="complete-toggle"
                                aria-pressed="false">
                            <i class="fas fa-check"></i>
                            <span>Geleerd</span>
                        </button>
                    `
                          : `
                        <button disabled
                                class="complete-toggle disabled"
                                title="Luister eerst naar de uitspraak"
                                aria-pressed="false">
                            <i class="fas fa-lock"></i>
                            <span>Luister eerst</span>
                        </button>
                    `
                }

                <button onclick="app.openDailyProgramModal()"
                        class="nav-btn"
                        aria-label="Terug naar overzicht">
                    <span class="nav-label">Overzicht</span>
                    <i class="fas fa-list"></i>
                </button>
            </div>
        `;
    }

    // Normal category mode: full navigation
    return `
        <div class="practice-controls safe-bottom" role="navigation" aria-label="Navigatie en voortgang">
            <button onclick="app.previousPhrase()"
                    class="nav-btn ${phraseIndex === 0 ? 'disabled' : ''}"
                    ${phraseIndex === 0 ? 'disabled' : ''}
                    aria-label="Vorige zin">
                <i class="fas fa-chevron-left"></i>
                <span class="nav-label">Vorige</span>
            </button>

            ${
                isCompleted
                    ? `
                    <button disabled
                            class="complete-toggle completed"
                            aria-pressed="true">
                        <i class="fas fa-check-circle"></i>
                        <span>Geleerd</span>
                    </button>
                `
                    : canComplete
                      ? `
                    <button onclick="app.markPhraseComplete()"
                            class="complete-toggle"
                            aria-pressed="false">
                        <i class="fas fa-check"></i>
                        <span>Geleerd</span>
                    </button>
                `
                      : `
                    <button disabled
                            class="complete-toggle disabled"
                            title="Luister eerst naar de uitspraak"
                            aria-pressed="false">
                        <i class="fas fa-lock"></i>
                        <span>Luister eerst</span>
                    </button>
                `
            }

            <button onclick="app.nextPhrase()"
                    class="nav-btn ${phraseIndex >= totalPhrases - 1 ? 'disabled' : ''}"
                    ${phraseIndex >= totalPhrases - 1 ? 'disabled' : ''}
                    aria-label="Volgende zin">
                <span class="nav-label">Volgende</span>
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;
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
    // Use dailyCompletedPhrases when coming from daily program, otherwise global completedPhrases
    const isCompleted = state.fromDailyProgram
        ? state.dailyCompletedPhrases.includes(phraseId)
        : state.completedPhrases.includes(phraseId);
    const canComplete = state.hasListenedToAudio || state.audioURL;
    const progress = ((phraseIndex + 1) / phrases.length) * 100;

    return `
        <div class="practice-view pb-32">
            <!-- Compact Header -->
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
                         style="background: var(--scandi-blue);">
                        <i class="fas ${category.icon}"></i>
                    </div>
                    <h2 class="font-bold text-gray-800">${escapeHtml(category.name)}</h2>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-600">Zin ${phraseIndex + 1}/${phrases.length}</span>
                    ${getDifficultyBadge(phrase.difficulty)}
                </div>
            </div>

            <!-- Progress Bar -->
            <div class="bg-gray-200 rounded-full h-2 mb-6">
                <div class="h-2 rounded-full transition-all duration-500"
                     style="width: ${progress}%; background: var(--scandi-blue);"></div>
            </div>

            <!-- ZONE 1: Phrase Hero -->
            ${renderPhraseHero(phrase)}

            <!-- ZONE 2: Recording Button (Hero Action) -->
            <div class="my-6">
                ${renderRecordingButton(state, phrase)}
            </div>

            <!-- ZONE 3: Speech Recognition (separate from recording) -->
            <div class="mb-6">
                ${renderSpeechRecognitionSection(state, phrase)}
            </div>
        </div>

        <!-- ZONE 3: Sticky Controls (outside animated container) -->
        ${renderStickyControls(phraseIndex, phrases.length, isCompleted, canComplete, state.fromDailyProgram)}
    `;
}
