/**
 * Badge Card Component
 * Displays a badge with icon, name, and unlock status
 */

/**
 * Get badge icon with Font Awesome mapping
 * @param {string} icon - Icon identifier from badge data
 * @returns {string} Font Awesome class
 */
function getBadgeIcon(icon) {
    const iconMap = {
        star: 'fa-star',
        award: 'fa-award',
        trophy: 'fa-trophy',
        fire: 'fa-fire',
        bolt: 'fa-bolt',
        crown: 'fa-crown',
        medal: 'fa-medal',
        gem: 'fa-gem',
        rocket: 'fa-rocket',
        graduation: 'fa-graduation-cap',
        brain: 'fa-brain',
        heart: 'fa-heart',
        book: 'fa-book'
    };
    return iconMap[icon] || 'fa-star';
}

/**
 * Get badge color styles
 * @param {string} color - Color identifier
 * @returns {object} Color styles
 */
function getBadgeColor(color) {
    const colors = {
        yellow: { bg: '#FEF3C7', icon: '#D97706' },
        blue: { bg: '#DBEAFE', icon: '#2563EB' },
        green: { bg: '#D1FAE5', icon: '#059669' },
        purple: { bg: '#EDE9FE', icon: '#7C3AED' },
        red: { bg: '#FEE2E2', icon: '#DC2626' },
        orange: { bg: '#FFEDD5', icon: '#EA580C' },
        pink: { bg: '#FCE7F3', icon: '#DB2777' },
        teal: { bg: '#CCFBF1', icon: '#0D9488' }
    };
    return colors[color] || colors.yellow;
}

/**
 * Render a badge card
 * @param {object} badge - Badge data
 * @param {string} badgeId - Badge identifier
 * @param {boolean} isUnlocked - Whether badge is unlocked
 * @param {string} earnedDate - Date badge was earned (optional)
 * @returns {string} HTML string
 */
export function renderBadgeCard(badge, badgeId, isUnlocked = false, earnedDate = null) {
    const iconClass = getBadgeIcon(badge.icon);
    const colorStyles = getBadgeColor(badge.color);

    return `
        <div class="bg-white rounded-xl p-4 card-shadow ${!isUnlocked ? 'opacity-50' : ''}">
            <div class="flex items-center mb-3">
                <div
                    class="w-12 h-12 rounded-full flex items-center justify-center mr-3"
                    style="background-color: ${isUnlocked ? colorStyles.bg : '#E5E7EB'}"
                >
                    <i
                        class="fas ${iconClass} text-xl"
                        style="color: ${isUnlocked ? colorStyles.icon : '#9CA3AF'}"
                        aria-hidden="true"
                    ></i>
                </div>
                <div class="flex-1">
                    <h3 class="font-semibold text-[var(--scandi-text)]">${badge.name}</h3>
                    <p class="text-xs text-[var(--scandi-grey-text)]">${badge.description}</p>
                </div>
            </div>
            ${
                isUnlocked
                    ? `
                <div class="flex items-center text-xs text-green-600">
                    <i class="fas fa-check-circle mr-1" aria-hidden="true"></i>
                    Behaald${earnedDate ? ` op ${earnedDate}` : ''}
                </div>
            `
                    : `
                <div class="flex items-center text-xs text-[var(--scandi-grey-text)]">
                    <i class="fas fa-lock mr-1" aria-hidden="true"></i>
                    Nog niet behaald
                </div>
            `
            }
        </div>
    `;
}

/**
 * Render badge grid
 * @param {object} badges - All badges
 * @param {array} unlockedBadges - Array of unlocked badge IDs
 * @returns {string} HTML string
 */
export function renderBadgeGrid(badges, unlockedBadges = []) {
    return `
        <div class="grid grid-cols-1 gap-3">
            ${Object.entries(badges)
                .map(([id, badge]) => {
                    const isUnlocked = unlockedBadges.includes(id);
                    return renderBadgeCard(badge, id, isUnlocked);
                })
                .join('')}
        </div>
    `;
}

/**
 * Render badge popup notification
 * @param {object} badge - Badge data
 * @returns {string} HTML string
 */
export function renderBadgePopup(badge) {
    const iconClass = getBadgeIcon(badge.icon);
    const colorStyles = getBadgeColor(badge.color);

    return `
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
            <div class="bg-white rounded-2xl p-8 mx-4 text-center animate-slideUp max-w-sm">
                <div
                    class="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce"
                    style="background-color: ${colorStyles.bg}"
                >
                    <i
                        class="fas ${iconClass} text-4xl"
                        style="color: ${colorStyles.icon}"
                        aria-hidden="true"
                    ></i>
                </div>
                <h2 class="text-2xl font-bold text-[var(--scandi-text)] mb-2">
                    Badge Behaald!
                </h2>
                <h3 class="text-xl font-semibold mb-2" style="color: ${colorStyles.icon}">
                    ${badge.name}
                </h3>
                <p class="text-[var(--scandi-grey-text)]">${badge.description}</p>
            </div>
        </div>
    `;
}
