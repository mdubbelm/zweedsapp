/**
 * Home View
 * Main dashboard with stats, daily program, and learning modes
 */

import { escapeHtml } from '../utils/helpers.js';

/**
 * Render stats row
 * @param {object} stats - User stats
 * @returns {string} HTML string
 */
function renderStatsRow(stats) {
    return `
        <div id="progress-card" class="glass-effect rounded-2xl p-3 card-shadow">
            <div class="grid grid-cols-4 gap-3">
                <div class="text-center">
                    <i class="fas fa-trophy text-blue-700 text-xl mb-2" aria-hidden="true"></i>
                    <p class="text-xl font-bold text-gray-800">${stats.level}</p>
                    <p class="text-sm text-gray-600 mt-1">Level</p>
                </div>
                <div class="text-center">
                    <i class="fas fa-fire text-red-600 text-xl mb-2" aria-hidden="true"></i>
                    <p class="text-xl font-bold text-gray-800">${stats.streak}</p>
                    <p class="text-sm text-gray-600 mt-1">Streak</p>
                </div>
                <div class="text-center">
                    <i class="fas fa-bullseye text-green-700 text-xl mb-2" aria-hidden="true"></i>
                    <p class="text-xl font-bold text-gray-800">${stats.dailyGoal || 0}/${stats.dailyGoalTarget || 10}</p>
                    <p class="text-sm text-gray-600 mt-1">Vandaag</p>
                </div>
                <div class="text-center">
                    <i class="fas fa-star text-amber-700 text-xl mb-2" aria-hidden="true"></i>
                    <p class="text-xl font-bold text-gray-800">${stats.totalPoints}</p>
                    <p class="text-sm text-gray-600 mt-1">Punten</p>
                </div>
            </div>
        </div>
    `;
}

/**
 * Render daily program card
 * @param {array} dailyPhrases - Today's phrases
 * @param {array} completedPhrases - Completed phrase IDs
 * @returns {string} HTML string
 */
function renderDailyProgram(dailyPhrases, completedPhrases) {
    const completedToday = dailyPhrases.filter(phrase =>
        completedPhrases.includes(`${phrase.categoryId}-${phrase.id}`)
    ).length;
    const total = dailyPhrases.length;
    const progressPercent = total > 0 ? (completedToday / total) * 100 : 0;
    const today = new Date().toLocaleDateString('nl-NL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    return `
        <button id="daily-program" onclick="app.openDailyProgramModal()"
                class="w-full rounded-2xl p-6 card-shadow card-hover text-left border-3 transition-all"
                style="background: linear-gradient(135deg, rgba(91, 155, 213, 0.15) 0%, rgba(74, 127, 168, 0.08) 100%); border: 3px solid var(--scandi-blue);">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 rounded-xl flex items-center justify-center"
                         style="background: linear-gradient(135deg, var(--scandi-blue) 0%, #2F5F8A 100%); box-shadow: 0 4px 12px rgba(62, 125, 184, 0.3);">
                        <i class="fas fa-calendar-day text-2xl text-white"></i>
                    </div>
                    <div>
                        <p class="text-lg font-bold text-gray-800">Je oefeningen voor vandaag</p>
                        <p class="text-sm text-gray-600">${today}</p>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <div class="text-right">
                        <p class="text-3xl font-bold" style="color: var(--scandi-blue);">${completedToday}/${total}</p>
                        <p class="text-sm text-gray-600 font-medium">voltooid</p>
                    </div>
                    <i class="fas fa-chevron-right text-gray-400 text-lg"></i>
                </div>
            </div>
            <div class="mt-4 bg-gray-200 rounded-full h-3 overflow-hidden">
                <div class="h-3 rounded-full transition-all duration-500"
                     style="width: ${progressPercent}%; background: linear-gradient(90deg, var(--scandi-blue) 0%, #5B9BD5 100%);"></div>
            </div>
        </button>
    `;
}

/**
 * Render learning mode buttons
 * @returns {string} HTML string
 */
function renderLearningModes() {
    return `
        <div class="mt-4">
            <h3 class="text-xl font-bold text-gray-800 mb-3">
                Hoe wil je leren? 🇸🇪
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <!-- Uitspraak -->
                <button onclick="app.showCategorySelector('practice')"
                        class="glass-effect rounded-xl p-4 text-center card-hover card-shadow border-2 border-transparent hover:border-blue-400 transition-all">
                    <div class="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3"
                         style="background: linear-gradient(135deg, #5B9BD5 0%, #4A7FA8 100%);">
                        <i class="fas fa-microphone text-xl text-white"></i>
                    </div>
                    <p class="text-sm font-bold text-gray-800 mb-1">Uitspraak</p>
                    <p class="text-sm text-gray-500">Luister & spreek</p>
                </button>

                <!-- Spelling -->
                <button onclick="app.showCategorySelector('writing')"
                        class="glass-effect rounded-xl p-4 text-center card-hover card-shadow border-2 border-transparent hover:border-teal-400 transition-all">
                    <div class="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3"
                         style="background: linear-gradient(135deg, var(--scandi-teal) 0%, var(--scandi-teal-dark, #1A6069) 100%);">
                        <i class="fas fa-keyboard text-xl text-white"></i>
                    </div>
                    <p class="text-sm font-bold text-gray-800 mb-1">Spelling</p>
                    <p class="text-sm text-gray-500">Type zinnen</p>
                </button>

                <!-- Flashcards -->
                <button onclick="app.showCategorySelector('flashcards')"
                        class="glass-effect rounded-xl p-4 text-center card-hover card-shadow border-2 border-transparent hover:border-green-400 transition-all">
                    <div class="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3"
                         style="background: linear-gradient(135deg, var(--scandi-green) 0%, #3a8a4d 100%);">
                        <i class="fas fa-layer-group text-xl text-white"></i>
                    </div>
                    <p class="text-sm font-bold text-gray-800 mb-1">Flashcards</p>
                    <p class="text-sm text-gray-500">Herhalen</p>
                </button>

                <!-- Grammatica -->
                <button onclick="app.switchTab('grammar')"
                        class="glass-effect rounded-xl p-4 text-center card-hover card-shadow border-2 border-transparent hover:border-purple-400 transition-all">
                    <div class="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3"
                         style="background: linear-gradient(135deg, #9333EA 0%, #7E22CE 100%);">
                        <i class="fas fa-book text-xl text-white"></i>
                    </div>
                    <p class="text-sm font-bold text-gray-800 mb-1">Grammatica</p>
                    <p class="text-sm text-gray-500">Leer regels</p>
                </button>
            </div>
        </div>
    `;
}

/**
 * Render compact streak indicator
 * @param {object} stats - User stats
 * @returns {string} HTML string
 */
function renderCompactStreak(stats) {
    const streak = stats.streak || 0;
    const longestStreak = stats.longestStreak || 0;
    const completedDays = stats.completedDays || [];

    return `
        <button onclick="app.switchTab('badges')"
                class="w-full mt-4 glass-effect rounded-xl p-4 card-shadow card-hover text-left flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center bg-orange-100">
                    <i class="fas fa-fire text-orange-500 text-lg"></i>
                </div>
                <div>
                    <p class="font-bold text-gray-800">${streak} ${streak === 1 ? 'dag' : 'dagen'} streak</p>
                    <p class="text-sm text-gray-500">
                        ${longestStreak > streak ? `Beste: ${longestStreak} · ` : ''}${completedDays.length} dagen voltooid
                    </p>
                </div>
            </div>
            <i class="fas fa-chevron-right text-gray-400"></i>
        </button>
    `;
}

/**
 * Render home view
 * @param {object} state - App state
 * @returns {string} HTML string
 */
export function renderHome(state) {
    const displayName = escapeHtml(state.stats.displayName) || 'daar';

    return `
        <div class="space-y-4 animate-slideUp">
            <!-- Personalized Greeting -->
            <div class="mb-2">
                <h2 class="text-2xl font-bold text-gray-800 mb-1">
                    Hej, ${displayName}! 👋
                </h2>
                <p class="text-gray-600">Laten we vandaag Zweeds leren</p>
            </div>

            <!-- Stats Row -->
            ${renderStatsRow(state.stats)}

            <!-- Daily Program -->
            ${renderDailyProgram(state.dailyPhrases || [], state.dailyCompletedPhrases || [])}

            <!-- Learning Modes -->
            ${renderLearningModes()}

            <!-- Compact Streak Indicator -->
            ${renderCompactStreak(state.stats)}

            <!-- View All Progress Link -->
            <div class="mt-6 text-center">
                <a href="#" onclick="app.switchTab('categories'); return false;"
                   class="inline-flex items-center gap-2 font-semibold transition-all hover:gap-3"
                   style="color: var(--scandi-blue);">
                    <i class="fas fa-folder"></i>
                    <span>Bekijk alle categorieën</span>
                    <i class="fas fa-arrow-right text-sm"></i>
                </a>
            </div>
        </div>
    `;
}
