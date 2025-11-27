/**
 * Categories View
 * Browse categories and select learning mode
 */

import { escapeHtml } from '../utils/helpers.js';
import { categories } from '../data/phrases.js';

/**
 * Get color variable for category
 * @param {string} color - Color name
 * @returns {string} CSS variable
 */
function getCategoryColor(color) {
    const colors = {
        'dusty-rose': 'var(--dusty-rose)',
        amber: 'var(--scandi-amber)',
        blue: 'var(--scandi-blue)',
        'steel-blue': 'var(--steel-blue)',
        green: 'var(--scandi-green)',
        'lavender-grey': 'var(--lavender-grey)',
        coral: 'var(--coral)',
        clay: 'var(--clay)',
        teal: 'var(--scandi-teal)',
        red: 'var(--scandi-red)'
    };
    return colors[color] || 'var(--scandi-blue)';
}

/**
 * Render mode selection for a category (inline, no modal)
 * @param {string} categoryKey - Selected category key
 * @param {object} category - Category data
 * @returns {string} HTML string
 */
function renderModeSelection(categoryKey, category) {
    return `
        <div class="glass-effect rounded-2xl p-4 card-shadow mb-4 animate-slideUp">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                         style="background: ${getCategoryColor(category.color)};">
                        <i class="fas ${category.icon}"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-gray-800">${escapeHtml(category.name)}</h3>
                        <p class="text-sm text-gray-600">Kies hoe je wilt oefenen</p>
                    </div>
                </div>
                <button onclick="app.clearSelectedCategory()"
                        class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Sluiten">
                    <i class="fas fa-times text-gray-400"></i>
                </button>
            </div>

            <div class="grid grid-cols-1 gap-2">
                <button onclick="app.startPracticeWithCategory('${categoryKey}', 'practice')"
                        class="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border-2 border-transparent transition-all text-left">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center"
                         style="background: linear-gradient(135deg, #5B9BD5 0%, #4A7FA8 100%);">
                        <i class="fas fa-microphone text-xl text-white"></i>
                    </div>
                    <div>
                        <p class="font-bold text-gray-800">Uitspraak</p>
                        <p class="text-sm text-gray-600">Luister en spreek na</p>
                    </div>
                    <i class="fas fa-chevron-right text-gray-400 ml-auto"></i>
                </button>

                <button onclick="app.startPracticeWithCategory('${categoryKey}', 'writing')"
                        class="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-teal-50 hover:border-teal-200 border-2 border-transparent transition-all text-left">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center"
                         style="background: linear-gradient(135deg, var(--scandi-teal) 0%, #1A6069 100%);">
                        <i class="fas fa-keyboard text-xl text-white"></i>
                    </div>
                    <div>
                        <p class="font-bold text-gray-800">Spelling</p>
                        <p class="text-sm text-gray-600">Type de zinnen</p>
                    </div>
                    <i class="fas fa-chevron-right text-gray-400 ml-auto"></i>
                </button>

                <button onclick="app.startPracticeWithCategory('${categoryKey}', 'flashcards')"
                        class="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-green-50 hover:border-green-200 border-2 border-transparent transition-all text-left">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center"
                         style="background: linear-gradient(135deg, var(--scandi-green) 0%, #3a8a4d 100%);">
                        <i class="fas fa-layer-group text-xl text-white"></i>
                    </div>
                    <div>
                        <p class="font-bold text-gray-800">Flashcards</p>
                        <p class="text-sm text-gray-600">Herhaal met kaarten</p>
                    </div>
                    <i class="fas fa-chevron-right text-gray-400 ml-auto"></i>
                </button>
            </div>
        </div>
    `;
}

/**
 * Render categories view
 * @param {object} state - App state
 * @param {function} getFilteredPhrases - Function to filter phrases
 * @returns {string} HTML string
 */
export function renderCategories(state, getFilteredPhrases) {
    const selectedCategory = state.selectedCategoryForMode;
    const difficultyPreference = state.stats.difficultyPreference;

    const categoryCards = Object.entries(categories)
        .map(([key, category]) => {
            const filteredPhrases = getFilteredPhrases
                ? getFilteredPhrases(category.phrases)
                : category.phrases;
            const totalPhrases = filteredPhrases.length;
            const completed = filteredPhrases.filter(p =>
                state.completedPhrases.includes(`${key}-${p.id}`)
            ).length;
            const isFullyCompleted = completed === totalPhrases && totalPhrases > 0;
            const progress = totalPhrases > 0 ? (completed / totalPhrases) * 100 : 0;
            const hasFilter = difficultyPreference;
            const isSelected = selectedCategory === key;

            return `
                <button onclick="app.selectCategoryForMode('${key}')"
                        class="card-shadow rounded-xl p-4 text-white card-hover relative overflow-hidden ${isSelected ? 'ring-4 ring-offset-2 ring-blue-500' : ''}"
                        style="background: ${getCategoryColor(category.color)};">
                    <div class="flex items-center justify-between mb-2">
                        <i class="fas ${category.icon} text-3xl" aria-hidden="true"></i>
                        ${isFullyCompleted ? '<i class="fas fa-crown text-yellow-300 text-xl" aria-hidden="true"></i>' : ''}
                    </div>
                    <p class="text-sm font-bold text-left mb-1">${escapeHtml(category.name)}</p>
                    <p class="text-sm opacity-90 text-left mb-2">${totalPhrases > 0 ? `${completed}/${totalPhrases} voltooid` : 'Geen zinnen'}${hasFilter ? ' <span title="Filter actief">🎯</span>' : ''}</p>
                    <div class="bg-white/30 rounded-full h-1.5 overflow-hidden">
                        <div class="bg-white rounded-full h-1.5 progress-bar" style="width: ${progress}%"></div>
                    </div>
                </button>
            `;
        })
        .join('');

    return `
        <div class="space-y-4 animate-slideUp pb-24">
            <div class="mb-2">
                <h2 class="text-2xl font-bold text-gray-800 mb-1">
                    Categorieën
                </h2>
                <p class="text-gray-600">Kies een categorie om te oefenen</p>
            </div>

            ${
                selectedCategory && categories[selectedCategory]
                    ? renderModeSelection(selectedCategory, categories[selectedCategory])
                    : ''
            }

            <div class="glass-effect rounded-2xl p-4 card-shadow">
                <div class="grid grid-cols-2 gap-3">
                    ${categoryCards}
                </div>
            </div>
        </div>
    `;
}
