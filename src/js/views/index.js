/**
 * Views Index
 * Re-exports all view modules
 */

import { renderStreakCalendar } from '../components/StreakCalendar.js';

export { renderLogin, renderSetup, toggleSignUp } from './LoginView.js';
export { renderHome } from './HomeView.js';
export { renderOnboarding } from './OnboardingView.js';
export { renderDaily } from './DailyView.js';
export { renderCategories } from './CategoriesView.js';
export { renderSettings } from './SettingsView.js';
export { renderPractice } from './PracticeView.js';
export { renderWriting, checkAnswer } from './WritingView.js';
export { renderFlashcards } from './FlashcardsView.js';
export { renderGrammar, grammarTopics } from './GrammarView.js';

/**
 * Render badges section
 * @param {object} state - App state
 * @param {object} badges - Badge definitions
 * @returns {string} HTML string
 */
function renderBadgesSection(state, badges) {
    const earnedBadges = state.stats.badges || [];

    return `
        <div class="glass-effect rounded-2xl p-4 card-shadow">
            <h2 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-medal mr-2"></i>Je Prestaties
            </h2>
            <p class="text-gray-600 mb-4">${earnedBadges.length} van ${Object.keys(badges).length} badges behaald</p>

            <div class="grid grid-cols-1 gap-3">
                ${Object.entries(badges)
                    .map(([id, badge]) => {
                        const isEarned = earnedBadges.includes(id);
                        return `
                        <div class="p-4 rounded-xl ${isEarned ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50 opacity-60'}">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-full flex items-center justify-center ${isEarned ? 'bg-green-100' : 'bg-gray-200'}">
                                    <i class="fas ${badge.icon} text-xl ${isEarned ? 'text-green-600' : 'text-gray-400'}"></i>
                                </div>
                                <div>
                                    <p class="font-semibold text-gray-800">${badge.name}</p>
                                    <p class="text-sm text-gray-600">${badge.description}</p>
                                </div>
                                ${isEarned ? '<i class="fas fa-check-circle text-green-500 ml-auto"></i>' : ''}
                            </div>
                        </div>
                    `;
                    })
                    .join('')}
            </div>
        </div>
    `;
}

/**
 * Render leaderboard section
 * @param {object} state - App state
 * @returns {string} HTML string
 */
function renderLeaderboardSection(state) {
    const leaderboard = state.leaderboard || [];

    return `
        <div class="glass-effect rounded-2xl p-4 card-shadow">
            <h2 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-ranking-star mr-2"></i>Ranglijst
            </h2>

            ${
                leaderboard.length === 0
                    ? `
                <p class="text-gray-600 text-center py-8">Nog geen spelers op de ranglijst</p>
            `
                    : `
                <div class="space-y-2">
                    ${leaderboard
                        .map((player, index) => {
                            const isCurrentUser = player.displayName === state.stats.displayName;
                            const medal =
                                index === 0
                                    ? '🥇'
                                    : index === 1
                                      ? '🥈'
                                      : index === 2
                                        ? '🥉'
                                        : `${index + 1}.`;

                            return `
                            <div class="p-3 rounded-xl ${isCurrentUser ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'}">
                                <div class="flex items-center gap-3">
                                    <span class="text-xl w-8">${medal}</span>
                                    <div class="flex-1">
                                        <p class="font-semibold ${isCurrentUser ? 'text-blue-700' : 'text-gray-800'}">
                                            ${player.displayName || 'Anoniem'}
                                        </p>
                                        <p class="text-sm text-gray-600">Level ${player.level}</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="font-bold text-gray-800">${player.totalPoints}</p>
                                        <p class="text-xs text-gray-500">punten</p>
                                    </div>
                                </div>
                            </div>
                        `;
                        })
                        .join('')}
                </div>
            `
            }
        </div>
    `;
}

/**
 * Render combined progress view (badges + leaderboard)
 * @param {object} state - App state
 * @param {object} badges - Badge definitions
 * @returns {string} HTML string
 */
/**
 * Render streak calendar section
 * @param {object} state - App state
 * @returns {string} HTML string
 */
function renderStreakSection(state) {
    return `
        <div class="glass-effect rounded-2xl p-4 card-shadow">
            <h2 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-calendar-check mr-2 text-green-600"></i>Je Streak
            </h2>
            ${renderStreakCalendar(state.stats, state.calendarMonth, state.calendarYear)}
        </div>
    `;
}

export function renderBadges(state, badges) {
    return `
        <div class="space-y-6 animate-slideUp pb-24">
            <!-- Streak Calendar Section -->
            ${renderStreakSection(state)}

            <!-- Badges Section -->
            ${renderBadgesSection(state, badges)}

            <!-- Leaderboard Section -->
            ${renderLeaderboardSection(state)}
        </div>
    `;
}
