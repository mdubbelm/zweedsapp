/**
 * Helper Utilities
 * Common utility functions used throughout the app
 */

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} unsafe - Untrusted string
 * @returns {string} Escaped HTML-safe string
 */
export function escapeHtml(unsafe) {
    if (!unsafe) {
        return '';
    }
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Format date to Dutch locale
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
    if (!date) {
        return '';
    }
    const d = new Date(date);
    return d.toLocaleDateString('nl-NL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

/**
 * Format relative time (e.g., "2 dagen geleden")
 * @param {Date|string} date - Date to format
 * @returns {string} Relative time string
 */
export function formatRelativeTime(date) {
    if (!date) {
        return '';
    }
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
        return 'Vandaag';
    }
    if (days === 1) {
        return 'Gisteren';
    }
    if (days < 7) {
        return `${days} dagen geleden`;
    }
    if (days < 30) {
        const weeks = Math.floor(days / 7);
        return `${weeks} ${weeks === 1 ? 'week' : 'weken'} geleden`;
    }
    return formatDate(date);
}

/**
 * Calculate level from total points
 * @param {number} totalPoints - Total points earned
 * @returns {number} Current level
 */
export function calculateLevel(totalPoints) {
    return Math.floor(totalPoints / 100) + 1;
}

/**
 * Calculate points needed for next level
 * @param {number} totalPoints - Current total points
 * @returns {number} Points needed for next level
 */
export function pointsToNextLevel(totalPoints) {
    const currentLevel = calculateLevel(totalPoints);
    const nextLevelPoints = currentLevel * 100;
    return nextLevelPoints - totalPoints;
}

/**
 * Calculate progress percentage to next level
 * @param {number} totalPoints - Current total points
 * @returns {number} Progress percentage (0-100)
 */
export function levelProgress(totalPoints) {
    const pointsInCurrentLevel = totalPoints % 100;
    return pointsInCurrentLevel;
}

/**
 * Shuffle array (Fisher-Yates algorithm)
 * @param {array} array - Array to shuffle
 * @returns {array} Shuffled array (new array, original unchanged)
 */
export function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Debounce function
 * @param {function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {function} Debounced function
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if two dates are the same day
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @returns {boolean} Whether dates are same day
 */
export function isSameDay(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.toDateString() === d2.toDateString();
}

/**
 * Check if a date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} Whether date is today
 */
export function isToday(date) {
    return isSameDay(date, new Date());
}

/**
 * Check if a date is yesterday
 * @param {Date|string} date - Date to check
 * @returns {boolean} Whether date is yesterday
 */
export function isYesterday(date) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return isSameDay(date, yesterday);
}
