/**
 * Header Component
 * App header with title and optional back button
 */

import { APP_VERSION } from '../utils/constants.js';

/**
 * Render the app header
 * @param {object} options - Header options
 * @param {string} options.title - Header title
 * @param {string} options.subtitle - Optional subtitle
 * @param {boolean} options.showBack - Show back button
 * @param {string} options.backAction - Back button onclick action
 * @param {boolean} options.showVersion - Show version number
 * @returns {string} HTML string
 */
export function renderHeader({
    title = 'Svenska Kat',
    subtitle = null,
    showBack = false,
    backAction = "app.setTab('home')",
    showVersion = false
}) {
    return `
        <header class="bg-white border-b border-[var(--scandi-grey-dark)] p-4">
            <div class="max-w-lg mx-auto flex items-center">
                ${
                    showBack
                        ? `
                    <button
                        onclick="${backAction}"
                        class="mr-3 p-2 rounded-full hover:bg-[var(--scandi-grey)] transition-colors"
                        aria-label="Terug"
                    >
                        <i class="fas fa-arrow-left text-[var(--scandi-text)]" aria-hidden="true"></i>
                    </button>
                `
                        : ''
                }
                <div class="flex-1">
                    <h1 class="text-xl font-bold text-[var(--scandi-text)]">${title}</h1>
                    ${subtitle ? `<p class="text-sm text-[var(--scandi-grey-text)]">${subtitle}</p>` : ''}
                </div>
                ${
                    showVersion
                        ? `
                    <span class="text-xs text-[var(--scandi-grey-text)]">v${APP_VERSION}</span>
                `
                        : ''
                }
            </div>
        </header>
    `;
}
