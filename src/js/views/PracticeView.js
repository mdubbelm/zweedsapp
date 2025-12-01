/**
 * Practice View
 * Audio recording and pronunciation practice
 * Redesigned with 3-zone progressive disclosure pattern
 */

import { escapeHtml, hasSpeechRecognition } from '../utils/helpers.js';
import { categories } from '../data/phrases.js';

/**
 * Check if we're on iOS (for showing fallback message)
 */
function isIOS() {
    if (typeof window === 'undefined') {
        return false;
    }
    return (
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );
}

/**
 * Get similarity color based on score
 */
function getSimilarityColor(score) {
    if (score >= 80) {
        return 'text-green-600';
    }
    if (score >= 50) {
        return 'text-yellow-600';
    }
    return 'text-red-600';
}

/**
 * Get similarity label based on score
 */
function getSimilarityLabel(score) {
    if (score >= 80) {
        return 'Uitstekend!';
    }
    if (score >= 60) {
        return 'Goed!';
    }
    if (score >= 40) {
        return 'Redelijk';
    }
    return 'Probeer opnieuw';
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
 * Render speech recognition section (conditional: not on iOS)
 */
function renderSpeechRecognitionSection(state, phrase) {
    const canUse = hasSpeechRecognition();
    const onIOS = isIOS();

    // iOS: ALWAYS show fallback, even if API exists (Apple blocks it anyway)
    if (onIOS) {
        return `
            <div class="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <div class="flex items-start gap-3">
                    <i class="fas fa-info-circle text-amber-500 mt-1"></i>
                    <div>
                        <p class="text-sm font-medium text-amber-800">Spraakherkenning niet beschikbaar op iOS</p>
                        <p class="text-xs text-amber-600 mt-1">Vergelijk handmatig: luister naar het origineel en jouw opname hierboven.</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Not available (non-iOS) - hide silently
    if (!canUse) {
        return '';
    }

    // Currently listening
    if (state.isListening) {
        return `
            <div class="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div class="flex items-center justify-center gap-3">
                    <div class="animate-pulse">
                        <i class="fas fa-microphone-alt text-2xl text-blue-500"></i>
                    </div>
                    <div>
                        <p class="font-medium text-blue-800">Luisteren...</p>
                        <p class="text-xs text-blue-600">Spreek de zin uit</p>
                    </div>
                    <button onclick="app.stopSpeechRecognition()"
                            class="ml-auto px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                        Stop
                    </button>
                </div>
            </div>
        `;
    }

    // Show error
    if (state.speechError) {
        return `
            <div class="mt-4 p-4 bg-red-50 rounded-xl border border-red-200">
                <div class="flex items-start gap-3">
                    <i class="fas fa-exclamation-circle text-red-500 mt-1"></i>
                    <div class="flex-1">
                        <p class="text-sm font-medium text-red-800">${escapeHtml(state.speechError)}</p>
                    </div>
                    <button onclick="app.clearSpeechResult()"
                            class="text-red-500 hover:text-red-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <button onclick="app.startSpeechRecognition('${escapeHtml(phrase.swedish).replace(/'/g, "\\'")}')"
                    class="w-full mt-2 py-3 rounded-xl font-semibold text-white card-hover card-shadow flex items-center justify-center gap-3"
                    style="background: var(--scandi-amber);">
                <i class="fas fa-redo text-lg"></i>
                <span>Opnieuw proberen</span>
            </button>
        `;
    }

    // Show result
    if (state.speechResult !== null && state.speechResult !== undefined) {
        const colorClass = getSimilarityColor(state.speechSimilarity);
        const label = getSimilarityLabel(state.speechSimilarity);

        return `
            <div class="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-sm font-medium text-gray-600">Jouw uitspraak:</span>
                    <button onclick="app.clearSpeechResult()"
                            class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <p class="text-lg text-gray-800 mb-3">"${escapeHtml(state.speechResult)}"</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <span class="text-2xl font-bold ${colorClass}">${state.speechSimilarity}%</span>
                        <span class="text-sm ${colorClass}">${label}</span>
                    </div>
                </div>
            </div>
            <button onclick="app.startSpeechRecognition('${escapeHtml(phrase.swedish).replace(/'/g, "\\'")}')"
                    class="w-full mt-2 py-3 rounded-xl font-semibold text-white card-hover card-shadow flex items-center justify-center gap-3"
                    style="background: var(--scandi-amber);">
                <i class="fas fa-redo text-lg"></i>
                <span>Opnieuw proberen</span>
            </button>
        `;
    }

    // Initial state - show button to start speech recognition
    return `
        <button onclick="app.startSpeechRecognition('${escapeHtml(phrase.swedish).replace(/'/g, "\\'")}')"
                class="w-full mt-4 py-3 rounded-xl font-semibold text-white card-hover card-shadow flex items-center justify-center gap-3"
                style="background: var(--scandi-amber);">
            <i class="fas fa-robot text-lg"></i>
            <span>Vergelijk met spraakherkenning</span>
        </button>
    `;
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
        // State 3: Playback - Compare mode with speech recognition
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

                <!-- Speech Recognition Section (conditional) -->
                ${renderSpeechRecognitionSection(state, phrase)}

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
                            <span>Voltooid</span>
                        </button>
                    `
                        : canComplete
                          ? `
                        <button onclick="app.markPhraseComplete()"
                                class="complete-toggle"
                                aria-pressed="false">
                            <i class="far fa-circle"></i>
                            <span>Voltooid</span>
                        </button>
                    `
                          : `
                        <button disabled
                                class="complete-toggle disabled"
                                title="Luister eerst naar de uitspraak"
                                aria-pressed="false">
                            <i class="fas fa-lock"></i>
                            <span>Voltooid</span>
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
                        <span>Voltooid</span>
                    </button>
                `
                    : canComplete
                      ? `
                    <button onclick="app.markPhraseComplete()"
                            class="complete-toggle"
                            aria-pressed="false">
                        <i class="far fa-circle"></i>
                        <span>Voltooid</span>
                    </button>
                `
                      : `
                    <button disabled
                            class="complete-toggle disabled"
                            title="Luister eerst naar de uitspraak"
                            aria-pressed="false">
                        <i class="fas fa-lock"></i>
                        <span>Voltooid</span>
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
        </div>

        <!-- ZONE 3: Sticky Controls (outside animated container) -->
        ${renderStickyControls(phraseIndex, phrases.length, isCompleted, canComplete, state.fromDailyProgram)}
    `;
}
