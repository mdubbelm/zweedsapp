/**
 * Navigation Component
 * Bottom navigation bar for the app
 */

import { TABS } from '../utils/constants.js';

/**
 * Create navigation item
 * @param {string} tab - Tab identifier
 * @param {string} icon - Font Awesome icon class
 * @param {string} label - Tab label
 * @param {string} currentTab - Currently active tab
 * @param {function} onClick - Click handler
 * @returns {string} HTML string
 */
function createNavItem(tab, icon, label, currentTab, onClick) {
    const isActive = currentTab === tab;
    const activeClass = isActive ? 'text-[var(--scandi-blue)]' : 'text-[var(--scandi-grey-text)]';

    return `
        <button
            id="nav-${tab}"
            onclick="${onClick}"
            class="flex flex-col items-center justify-center py-2 px-3 ${activeClass} transition-colors min-w-[56px]"
            aria-label="${label}"
            aria-current="${isActive ? 'page' : 'false'}"
        >
            <i class="fas ${icon} text-lg" aria-hidden="true"></i>
            <span class="text-xs mt-1 font-medium">${label}</span>
        </button>
    `;
}

/**
 * Render the bottom navigation bar
 * @param {string} currentTab - Currently active tab
 * @returns {string} HTML string
 */
export function renderNavigation(currentTab) {
    // Only show core tabs - learning modes accessible via Home
    const navItems = [
        { tab: TABS.HOME, icon: 'fa-home', label: 'Home' },
        { tab: TABS.BADGES, icon: 'fa-trophy', label: 'Badges' },
        { tab: TABS.LEADERBOARD, icon: 'fa-ranking-star', label: 'Ranking' },
        { tab: TABS.SETTINGS, icon: 'fa-cog', label: 'Instellingen' }
    ];

    return `
        <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--scandi-grey-dark)] z-50">
            <div class="flex justify-around items-center max-w-lg mx-auto overflow-x-auto">
                ${navItems
                    .map(item =>
                        createNavItem(
                            item.tab,
                            item.icon,
                            item.label,
                            currentTab,
                            `app.setTab('${item.tab}')`
                        )
                    )
                    .join('')}
            </div>
        </nav>
    `;
}
