/**
 * Phrase Card Component
 * Displays a Swedish phrase with translation and pronunciation
 */

import { escapeHtml } from '../utils/helpers.js';

/**
 * Get difficulty badge color
 * @param {string} difficulty - Difficulty level
 * @returns {object} Color configuration
 */
function getDifficultyColor(difficulty) {
    const colors = {
        easy: {
            bg: 'bg-green-100',
            text: 'text-green-700',
            label: 'Makkelijk'
        },
        medium: {
            bg: 'bg-yellow-100',
            text: 'text-yellow-700',
            label: 'Gemiddeld'
        },
        hard: {
            bg: 'bg-red-100',
            text: 'text-red-700',
            label: 'Moeilijk'
        }
    };
    return colors[difficulty] || colors.medium;
}

/**
 * Render a phrase card
 * @param {object} phrase - Phrase data
 * @param {object} options - Display options
 * @param {boolean} options.showDutch - Show Dutch translation
 * @param {boolean} options.showPronunciation - Show pronunciation guide
 * @param {boolean} options.showDifficulty - Show difficulty badge
 * @param {boolean} options.isCompleted - Is phrase completed
 * @returns {string} HTML string
 */
export function renderPhraseCard(phrase, options = {}) {
    const {
        showDutch = true,
        showPronunciation = true,
        showDifficulty = true,
        isCompleted = false
    } = options;

    const difficulty = getDifficultyColor(phrase.difficulty);

    return `
        <div class="bg-white rounded-xl p-5 card-shadow ${isCompleted ? 'border-2 border-green-500' : ''}">
            ${
                showDifficulty
                    ? `
                <div class="flex justify-between items-start mb-3">
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${difficulty.bg} ${difficulty.text}">
                        ${difficulty.label}
                    </span>
                    ${
                        isCompleted
                            ? `
                        <span class="text-green-500">
                            <i class="fas fa-check-circle" aria-hidden="true"></i>
                        </span>
                    `
                            : ''
                    }
                </div>
            `
                    : ''
            }

            <div class="text-center mb-4">
                <p class="text-2xl font-bold text-[var(--scandi-text)] mb-2">
                    ${escapeHtml(phrase.swedish)}
                </p>
                ${
                    showDutch
                        ? `
                    <p class="text-lg text-[var(--scandi-grey-text)]">
                        ${escapeHtml(phrase.dutch)}
                    </p>
                `
                        : ''
                }
            </div>

            ${
                showPronunciation
                    ? `
                <div class="bg-[var(--scandi-grey)] rounded-lg p-3 text-center">
                    <p class="text-sm text-[var(--scandi-grey-text)]">
                        <i class="fas fa-volume-up mr-2" aria-hidden="true"></i>
                        ${escapeHtml(phrase.pronunciation)}
                    </p>
                </div>
            `
                    : ''
            }
        </div>
    `;
}

/**
 * Render flashcard (shows Swedish on front, Dutch on back)
 * @param {object} phrase - Phrase data
 * @param {boolean} showAnswer - Whether to show the answer (back of card)
 * @returns {string} HTML string
 */
export function renderFlashcard(phrase, showAnswer = false) {
    return `
        <div class="bg-white rounded-xl p-6 card-shadow min-h-[200px] flex flex-col justify-center">
            <div class="text-center">
                ${
                    showAnswer
                        ? `
                    <p class="text-sm text-[var(--scandi-grey-text)] mb-2">Zweeds</p>
                    <p class="text-xl font-bold text-[var(--scandi-text)] mb-4">
                        ${escapeHtml(phrase.swedish)}
                    </p>
                    <hr class="my-4 border-[var(--scandi-grey-dark)]">
                    <p class="text-sm text-[var(--scandi-grey-text)] mb-2">Nederlands</p>
                    <p class="text-xl text-[var(--scandi-text)]">
                        ${escapeHtml(phrase.dutch)}
                    </p>
                    <p class="text-sm text-[var(--scandi-grey-text)] mt-4">
                        <i class="fas fa-volume-up mr-2" aria-hidden="true"></i>
                        ${escapeHtml(phrase.pronunciation)}
                    </p>
                `
                        : `
                    <p class="text-sm text-[var(--scandi-grey-text)] mb-4">Vertaal naar Zweeds:</p>
                    <p class="text-2xl font-bold text-[var(--scandi-text)]">
                        ${escapeHtml(phrase.dutch)}
                    </p>
                    <p class="text-sm text-[var(--scandi-grey-text)] mt-6">
                        Tik om het antwoord te zien
                    </p>
                `
                }
            </div>
        </div>
    `;
}
