/**
 * Views Index
 * Re-exports all view modules
 */

export { renderLogin, renderSetup, toggleSignUp } from './LoginView.js';
export { renderHome } from './HomeView.js';
export { renderCategories } from './CategoriesView.js';
export { renderSettings } from './SettingsView.js';
export { renderPractice } from './PracticeView.js';
export { renderWriting, checkAnswer } from './WritingView.js';
export { renderFlashcards } from './FlashcardsView.js';
export { renderGrammar, grammarTopics } from './GrammarView.js';

/**
 * Render badges view
 * @param {object} state - App state
 * @param {object} badges - Badge definitions
 * @returns {string} HTML string
 */
export function renderBadges(state, badges) {
    const earnedBadges = state.stats.badges || [];

    return `
        <div class="space-y-4 animate-slideUp pb-24">
            <div class="glass-effect rounded-2xl p-4 card-shadow">
                <h2 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-trophy mr-2"></i>Je Badges
                </h2>
                <p class="text-gray-600 mb-4">${earnedBadges.length} van ${Object.keys(badges).length} behaald</p>

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
        </div>
    `;
}

/**
 * Render leaderboard view
 * @param {object} state - App state
 * @returns {string} HTML string
 */
export function renderLeaderboard(state) {
    const leaderboard = state.leaderboard || [];

    return `
        <div class="space-y-4 animate-slideUp pb-24">
            <div class="glass-effect rounded-2xl p-4 card-shadow">
                <h2 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-ranking-star mr-2"></i>Leaderboard
                </h2>

                ${
                    leaderboard.length === 0
                        ? `
                    <p class="text-gray-600 text-center py-8">Nog geen spelers op het leaderboard</p>
                `
                        : `
                    <div class="space-y-2">
                        ${leaderboard
                            .map((player, index) => {
                                const isCurrentUser =
                                    player.displayName === state.stats.displayName;
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
        </div>
    `;
}
