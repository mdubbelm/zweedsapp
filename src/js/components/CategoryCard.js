/**
 * Category Card Component
 * Displays a category with icon, name, and progress
 */

/**
 * Get CSS class for category color
 * @param {string} color - Color name
 * @returns {string} CSS variable reference
 */
function getCategoryColorClass(color) {
    const colorMap = {
        'dusty-rose': 'var(--dusty-rose)',
        'steel-blue': 'var(--steel-blue)',
        'lavender-grey': 'var(--lavender-grey)',
        coral: 'var(--coral)',
        clay: 'var(--clay)',
        amber: 'var(--scandi-amber)',
        blue: 'var(--scandi-blue)',
        green: 'var(--scandi-green)'
    };
    return colorMap[color] || 'var(--scandi-blue)';
}

/**
 * Render a category card
 * @param {object} category - Category data
 * @param {string} categoryId - Category identifier
 * @param {number} completedCount - Number of completed phrases in category
 * @param {function} onClick - Click handler
 * @returns {string} HTML string
 */
export function renderCategoryCard(category, categoryId, completedCount = 0, onClick) {
    const totalPhrases = category.phrases.length;
    const progress = Math.round((completedCount / totalPhrases) * 100);
    const color = getCategoryColorClass(category.color);

    return `
        <button
            onclick="${onClick}"
            class="bg-white rounded-xl p-4 card-shadow card-hover text-left w-full"
            aria-label="${category.name}: ${completedCount} van ${totalPhrases} zinnen voltooid"
        >
            <div class="flex items-center mb-3">
                <div
                    class="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                    style="background-color: ${color}20"
                >
                    <i
                        class="fas ${category.icon}"
                        style="color: ${color}"
                        aria-hidden="true"
                    ></i>
                </div>
                <div class="flex-1">
                    <h3 class="font-semibold text-[var(--scandi-text)]">${category.name}</h3>
                    <p class="text-xs text-[var(--scandi-grey-text)]">
                        ${completedCount}/${totalPhrases} zinnen
                    </p>
                </div>
            </div>
            <div class="w-full bg-[var(--scandi-grey)] rounded-full h-2">
                <div
                    class="h-2 rounded-full transition-all duration-300"
                    style="width: ${progress}%; background-color: ${color}"
                ></div>
            </div>
        </button>
    `;
}

/**
 * Render category grid
 * @param {object} categories - All categories
 * @param {array} completedPhrases - List of completed phrase IDs
 * @param {function} onCategoryClick - Click handler for category
 * @returns {string} HTML string
 */
export function renderCategoryGrid(categories, completedPhrases = [], onCategoryClick) {
    return `
        <div class="grid grid-cols-2 gap-3">
            ${Object.entries(categories)
                .map(([id, category]) => {
                    const completedCount = completedPhrases.filter(p =>
                        p.startsWith(`${id}-`)
                    ).length;
                    return renderCategoryCard(category, id, completedCount, onCategoryClick(id));
                })
                .join('')}
        </div>
    `;
}
