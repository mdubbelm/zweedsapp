/**
 * Settings View
 * User account settings and preferences
 */

import { APP_VERSION } from '../utils/constants.js';
import { escapeHtml } from '../utils/helpers.js';
import { categories } from '../data/phrases.js';

/**
 * Render difficulty preference selector
 * @param {string|null} currentPreference - Current difficulty preference
 * @returns {string} HTML string
 */
function renderDifficultySelector(currentPreference) {
    const options = [
        { value: '', label: 'Alles', description: 'Alle moeilijkheidsniveaus' },
        { value: 'easy', label: 'Makkelijk', description: 'Alleen makkelijke zinnen' },
        {
            value: 'easy-medium',
            label: 'Makkelijk + Gemiddeld',
            description: 'Geen moeilijke zinnen'
        },
        { value: 'medium', label: 'Gemiddeld', description: 'Alleen gemiddelde zinnen' },
        { value: 'hard', label: 'Moeilijk', description: 'Alleen moeilijke zinnen' }
    ];

    return `
        <div class="space-y-2">
            ${options
                .map(
                    opt => `
                <button onclick="app.setDifficultyPreference(${opt.value ? `'${opt.value}'` : 'null'})"
                        class="w-full p-3 rounded-xl text-left transition-all ${
                            (currentPreference || '') === opt.value
                                ? 'bg-blue-100 border-2 border-blue-500'
                                : 'bg-gray-50 border-2 border-transparent hover:border-gray-300'
                        }">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-semibold text-gray-800">${opt.label}</p>
                            <p class="text-sm text-gray-600">${opt.description}</p>
                        </div>
                        ${(currentPreference || '') === opt.value ? '<i class="fas fa-check text-blue-500"></i>' : ''}
                    </div>
                </button>
            `
                )
                .join('')}
        </div>
    `;
}

/**
 * Render category preferences
 * @param {array} enabledCategories - List of enabled category IDs
 * @returns {string} HTML string
 */
function renderCategoryPreferences(enabledCategories) {
    return `
        <div class="grid grid-cols-2 gap-2">
            ${Object.entries(categories)
                .map(([key, category]) => {
                    const isEnabled = enabledCategories.includes(key);
                    return `
                    <button onclick="app.toggleCategory('${key}')"
                            class="p-3 rounded-xl text-left transition-all ${
                                isEnabled
                                    ? 'bg-green-100 border-2 border-green-500'
                                    : 'bg-gray-100 border-2 border-transparent opacity-60'
                            }">
                        <div class="flex items-center gap-2">
                            <i class="fas ${category.icon} ${isEnabled ? 'text-green-600' : 'text-gray-400'}"></i>
                            <span class="text-sm font-medium ${isEnabled ? 'text-gray-800' : 'text-gray-500'}">${category.name}</span>
                        </div>
                    </button>
                `;
                })
                .join('')}
        </div>
    `;
}

/**
 * Render settings view
 * @param {object} state - App state
 * @returns {string} HTML string
 */
export function renderSettings(state) {
    const categoryPreferences = state.stats.categoryPreferences || Object.keys(categories);
    const isLeaderboardVisible = state.stats.leaderboardVisible !== false;

    return `
        <div class="space-y-4 animate-slideUp pb-24">
            <!-- Account Section -->
            <div class="glass-effect rounded-2xl p-4 card-shadow">
                <h3 class="font-bold text-gray-800 mb-4">
                    <i class="fas fa-user mr-2"></i>Account
                </h3>

                <div class="space-y-3">
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div>
                            <p class="text-sm text-gray-600">Naam</p>
                            <p class="font-semibold">${escapeHtml(state.stats.displayName) || 'Niet ingesteld'}</p>
                        </div>
                        <button onclick="app.updateDisplayName()"
                                class="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            Wijzig
                        </button>
                    </div>

                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div>
                            <p class="text-sm text-gray-600">Email</p>
                            <p class="font-semibold">${escapeHtml(state.user?.email) || 'Onbekend'}</p>
                        </div>
                    </div>

                    <button onclick="app.changePassword()"
                            class="w-full p-3 bg-gray-50 rounded-xl text-left hover:bg-gray-100 transition-colors">
                        <div class="flex items-center justify-between">
                            <span class="font-medium text-gray-800">Wachtwoord wijzigen</span>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </div>
                    </button>
                </div>
            </div>

            <!-- Privacy Section -->
            <div class="glass-effect rounded-2xl p-4 card-shadow">
                <h3 class="font-bold text-gray-800 mb-4">
                    <i class="fas fa-shield-alt mr-2"></i>Privacy
                </h3>

                <button onclick="app.toggleLeaderboardVisibility()"
                        class="w-full p-3 bg-gray-50 rounded-xl text-left hover:bg-gray-100 transition-colors">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-medium text-gray-800">Zichtbaar op leaderboard</p>
                            <p class="text-sm text-gray-600">Anderen kunnen je score zien</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-sm ${isLeaderboardVisible ? 'text-green-600' : 'text-gray-500'}">
                                ${isLeaderboardVisible ? 'Aan' : 'Uit'}
                            </span>
                            <div class="w-10 h-6 rounded-full transition-colors ${isLeaderboardVisible ? 'bg-green-500' : 'bg-gray-300'}">
                                <div class="w-4 h-4 bg-white rounded-full m-1 transition-transform ${isLeaderboardVisible ? 'translate-x-4' : ''}"></div>
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            <!-- Difficulty Preference Section -->
            <div class="glass-effect rounded-2xl p-4 card-shadow">
                <h3 class="font-bold text-gray-800 mb-4">
                    <i class="fas fa-sliders-h mr-2"></i>Moeilijkheidsgraad Voorkeur
                </h3>
                <p class="text-sm text-gray-600 mb-4">
                    Filter zinnen op basis van moeilijkheid. Werkt in alle oefenmodi.
                </p>
                ${renderDifficultySelector(state.stats.difficultyPreference)}
            </div>

            <!-- Category Preferences Section -->
            <div class="glass-effect rounded-2xl p-4 card-shadow">
                <h3 class="font-bold text-gray-800 mb-4">
                    <i class="fas fa-tags mr-2"></i>Categorie Voorkeuren
                </h3>
                <p class="text-sm text-gray-600 mb-4">
                    Kies welke categorieën je wilt oefenen in het dagelijks programma.
                </p>
                ${renderCategoryPreferences(categoryPreferences)}
            </div>

            <!-- App Info Section -->
            <div class="glass-effect rounded-2xl p-4 card-shadow">
                <h3 class="font-bold text-gray-800 mb-4">
                    <i class="fas fa-info-circle mr-2"></i>App Info
                </h3>

                <div class="space-y-3">
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span class="text-gray-600">Versie</span>
                        <span class="font-mono font-semibold">${APP_VERSION}</span>
                    </div>

                    <button onclick="app.forceUpdate()"
                            class="w-full p-3 bg-gray-50 rounded-xl text-left hover:bg-blue-50 transition-colors">
                        <div class="flex items-center justify-between">
                            <div>
                                <span class="font-medium text-gray-800">
                                    <i class="fas fa-sync-alt mr-2"></i>Controleer op updates
                                </span>
                                <p class="text-sm text-gray-600">Vernieuw de app naar de nieuwste versie</p>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </div>
                    </button>

                    <button onclick="app.startTour()"
                            class="w-full p-3 bg-gray-50 rounded-xl text-left hover:bg-gray-100 transition-colors">
                        <div class="flex items-center justify-between">
                            <span class="font-medium text-gray-800">
                                <i class="fas fa-route mr-2"></i>Tour opnieuw starten
                            </span>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </div>
                    </button>
                </div>
            </div>

            <!-- Danger Zone -->
            <div class="glass-effect rounded-2xl p-4 card-shadow border-2 border-red-200">
                <h3 class="font-bold text-red-600 mb-4">
                    <i class="fas fa-exclamation-triangle mr-2"></i>Gevarenzone
                </h3>

                <div class="space-y-3">
                    <button onclick="app.signOut()"
                            class="w-full p-3 bg-gray-50 rounded-xl text-left hover:bg-red-50 transition-colors">
                        <div class="flex items-center gap-3">
                            <i class="fas fa-sign-out-alt text-red-500"></i>
                            <span class="font-medium text-gray-800">Uitloggen</span>
                        </div>
                    </button>

                    <button onclick="app.deleteAccount()"
                            class="w-full p-3 bg-red-50 rounded-xl text-left hover:bg-red-100 transition-colors">
                        <div class="flex items-center gap-3">
                            <i class="fas fa-trash text-red-600"></i>
                            <div>
                                <span class="font-medium text-red-600">Account verwijderen</span>
                                <p class="text-sm text-red-500">Dit kan niet ongedaan worden</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    `;
}
