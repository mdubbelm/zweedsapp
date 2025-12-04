/**
 * Daily View
 * Simplified daily program screen with auto-selected phrases
 * Design by Veerle (UX Designer) - Issue #83
 */

import { escapeHtml } from '../utils/helpers.js';

/**
 * Get greeting based on time of day
 * @returns {string} Greeting text
 */
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
        return 'Goedemorgen!';
    }
    if (hour < 18) {
        return 'Goedemiddag!';
    }
    return 'Goedenavond!';
}

/**
 * Get category summary from daily phrases
 * @param {array} dailyPhrases - Today's phrases
 * @returns {object} Category counts
 */
function getCategorySummary(dailyPhrases) {
    const summary = {};
    dailyPhrases.forEach(phrase => {
        const name = phrase.categoryName || 'Onbekend';
        summary[name] = (summary[name] || 0) + 1;
    });
    return summary;
}

/**
 * Render Daily View
 * @param {object} state - App state
 * @returns {string} HTML string
 */
export function renderDaily(state) {
    const phrases = state.dailyPhrases || [];
    const completedPhrases = state.dailyCompletedPhrases || [];

    const completedCount = phrases.filter(p =>
        completedPhrases.includes(`${p.categoryId}-${p.id}`)
    ).length;
    const total = phrases.length;
    const progressPercent = total > 0 ? (completedCount / total) * 100 : 0;
    const allDone = completedCount === total && total > 0;

    // Get category summary for preview
    const categorySummary = getCategorySummary(phrases);

    // Find first incomplete item index
    const firstIncompleteIndex = phrases.findIndex(
        p => !completedPhrases.includes(`${p.categoryId}-${p.id}`)
    );

    return `
        <div class="space-y-6 animate-slideUp">
            <!-- Greeting -->
            <div class="text-center pt-4">
                <p class="text-3xl mb-2">${getGreeting().includes('morgen') ? '🌅' : getGreeting().includes('middag') ? '☀️' : '🌙'}</p>
                <h2 class="text-2xl font-bold text-gray-800">${getGreeting()}</h2>
            </div>

            <!-- Progress Card -->
            <div class="bg-white rounded-2xl p-6 card-shadow">
                <div class="text-center mb-4">
                    <p class="text-lg text-gray-600 mb-1">Vandaag</p>
                    <p class="text-4xl font-bold" style="color: var(--scandi-blue);">
                        ${completedCount}/${total}
                    </p>
                    <p class="text-sm text-gray-500 mt-1">oefeningen voltooid</p>
                </div>

                <!-- Progress dots -->
                <div class="flex justify-center gap-2 mb-4">
                    ${phrases
                        .map((p, i) => {
                            const isCompleted = completedPhrases.includes(
                                `${p.categoryId}-${p.id}`
                            );
                            return `<div class="w-3 h-3 rounded-full transition-all ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}"></div>`;
                        })
                        .join('')}
                </div>

                <!-- Progress bar -->
                <div class="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div class="h-2 rounded-full transition-all duration-500"
                         style="width: ${progressPercent}%; background: linear-gradient(90deg, var(--scandi-blue) 0%, #5B9BD5 100%);"></div>
                </div>
            </div>

            <!-- Category Preview -->
            <div class="bg-gray-50 rounded-xl p-4">
                <p class="text-sm font-medium text-gray-600 mb-2">Mix van categorieën:</p>
                <div class="flex flex-wrap gap-2">
                    ${Object.entries(categorySummary)
                        .map(
                            ([name, count]) => `
                        <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-white border border-gray-200">
                            <span class="font-medium text-gray-700">${escapeHtml(name)}</span>
                            <span class="text-gray-400">(${count})</span>
                        </span>
                    `
                        )
                        .join('')}
                </div>
            </div>

            <!-- Start Button -->
            ${
                allDone
                    ? `
                <div class="text-center py-8">
                    <div class="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <i class="fas fa-check text-4xl text-green-500"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Geweldig gedaan!</h3>
                    <p class="text-gray-600 mb-4">Je hebt alle oefeningen voor vandaag voltooid.</p>
                    <button onclick="app.setTab('home')"
                            class="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all">
                        Terug naar Home
                    </button>
                </div>
            `
                    : `
                <button onclick="app.startDailyFromBeginning()"
                        class="w-full py-5 rounded-2xl font-bold text-xl text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] card-shadow"
                        style="background: linear-gradient(135deg, var(--scandi-blue) 0%, #2F5F8A 100%);">
                    <i class="fas fa-play mr-2"></i>
                    Start
                </button>

                ${
                    completedCount > 0
                        ? `
                    <p class="text-center text-sm text-gray-500 mt-2">
                        Ga verder waar je gebleven was
                    </p>
                `
                        : ''
                }
            `
            }

        </div>
    `;
}
