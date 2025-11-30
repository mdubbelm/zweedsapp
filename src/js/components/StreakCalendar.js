/**
 * Streak Calendar Component
 * Displays a monthly calendar showing completed days and streak statistics
 */

/**
 * Get the number of days in a month
 * @param {number} year - Year
 * @param {number} month - Month (0-indexed)
 * @returns {number} Number of days
 */
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

/**
 * Get the day of week for the first day of a month (0 = Sunday, 1 = Monday, etc.)
 * @param {number} year - Year
 * @param {number} month - Month (0-indexed)
 * @returns {number} Day of week (adjusted for Monday start: 0 = Monday, 6 = Sunday)
 */
function getFirstDayOfMonth(year, month) {
    const day = new Date(year, month, 1).getDay();
    // Convert Sunday (0) to 6, Monday (1) to 0, etc.
    return day === 0 ? 6 : day - 1;
}

/**
 * Format a date as ISO string (YYYY-MM-DD)
 * @param {number} year - Year
 * @param {number} month - Month (0-indexed)
 * @param {number} day - Day
 * @returns {string} ISO date string
 */
function formatDateISO(year, month, day) {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
}

/**
 * Get month name in Dutch
 * @param {number} month - Month (0-indexed)
 * @returns {string} Month name
 */
function getMonthName(month) {
    const months = [
        'Januari',
        'Februari',
        'Maart',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Augustus',
        'September',
        'Oktober',
        'November',
        'December'
    ];
    return months[month];
}

/**
 * Render the calendar grid
 * @param {number} year - Year to display
 * @param {number} month - Month to display (0-indexed)
 * @param {array} completedDays - Array of ISO date strings for completed days
 * @returns {string} HTML string
 */
function renderCalendarGrid(year, month, completedDays) {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const today = new Date();
    const todayISO = formatDateISO(today.getFullYear(), today.getMonth(), today.getDate());

    // Day headers (Ma, Di, Wo, Do, Vr, Za, Zo)
    const dayHeaders = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];

    let calendarHTML = `
        <div class="grid grid-cols-7 gap-1 text-center text-xs mb-2">
            ${dayHeaders.map(d => `<div class="text-gray-500 font-medium py-1">${d}</div>`).join('')}
        </div>
        <div class="grid grid-cols-7 gap-1">
    `;

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += `<div class="aspect-square"></div>`;
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateISO = formatDateISO(year, month, day);
        const isCompleted = completedDays.includes(dateISO);
        const isToday = dateISO === todayISO;
        const isPast = new Date(dateISO) < new Date(todayISO);

        let cellClass =
            'aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all';
        let content = day;

        if (isCompleted) {
            // Completed day - green with checkmark
            cellClass += ' bg-green-100 text-green-700';
            content = `<i class="fas fa-check text-green-600" aria-hidden="true"></i>`;
        } else if (isToday) {
            // Today - blue outline
            cellClass += ' border-2 border-blue-500 text-blue-600 font-bold';
        } else if (isPast) {
            // Past day not completed - subtle gray
            cellClass += ' text-gray-400';
        } else {
            // Future day
            cellClass += ' text-gray-600';
        }

        calendarHTML += `
            <div class="${cellClass}" ${isCompleted ? 'title="Voltooid"' : ''}>
                ${content}
            </div>
        `;
    }

    calendarHTML += `</div>`;

    return calendarHTML;
}

/**
 * Render streak statistics
 * @param {number} currentStreak - Current streak count
 * @param {number} longestStreak - Longest streak ever
 * @param {number} totalCompletedDays - Total number of completed days
 * @returns {string} HTML string
 */
function renderStreakStats(currentStreak, longestStreak, totalCompletedDays) {
    return `
        <div class="grid grid-cols-3 gap-3 mt-4">
            <div class="text-center p-3 bg-orange-50 rounded-xl">
                <div class="flex items-center justify-center gap-1 mb-1">
                    <i class="fas fa-fire text-orange-500" aria-hidden="true"></i>
                </div>
                <p class="text-2xl font-bold text-orange-600">${currentStreak}</p>
                <p class="text-xs text-gray-600">Huidige streak</p>
            </div>
            <div class="text-center p-3 bg-yellow-50 rounded-xl">
                <div class="flex items-center justify-center gap-1 mb-1">
                    <i class="fas fa-trophy text-yellow-500" aria-hidden="true"></i>
                </div>
                <p class="text-2xl font-bold text-yellow-600">${longestStreak}</p>
                <p class="text-xs text-gray-600">Langste streak</p>
            </div>
            <div class="text-center p-3 bg-green-50 rounded-xl">
                <div class="flex items-center justify-center gap-1 mb-1">
                    <i class="fas fa-calendar-check text-green-500" aria-hidden="true"></i>
                </div>
                <p class="text-2xl font-bold text-green-600">${totalCompletedDays}</p>
                <p class="text-xs text-gray-600">Totaal dagen</p>
            </div>
        </div>
    `;
}

/**
 * Render the full streak calendar component
 * @param {object} stats - User stats containing streak info
 * @param {number} displayMonth - Month to display (0-indexed), defaults to current
 * @param {number} displayYear - Year to display, defaults to current
 * @returns {string} HTML string
 */
export function renderStreakCalendar(stats, displayMonth = null, displayYear = null) {
    const now = new Date();
    const month = displayMonth !== null ? displayMonth : now.getMonth();
    const year = displayYear !== null ? displayYear : now.getFullYear();

    const completedDays = stats.completedDays || [];
    const currentStreak = stats.streak || 0;
    const longestStreak = stats.longestStreak || 0;
    const totalCompletedDays = completedDays.length;

    // Calculate previous and next month for navigation
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;

    // Don't allow navigation to future months
    const canGoNext = new Date(nextYear, nextMonth, 1) <= now;

    return `
        <div class="streak-calendar glass-effect rounded-2xl p-4 card-shadow">
            <!-- Header with navigation -->
            <div class="flex items-center justify-between mb-4">
                <button
                    onclick="app.changeCalendarMonth(${prevYear}, ${prevMonth})"
                    class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Vorige maand"
                >
                    <i class="fas fa-chevron-left text-gray-600" aria-hidden="true"></i>
                </button>
                <h3 class="text-lg font-bold text-gray-800">
                    ${getMonthName(month)} ${year}
                </h3>
                <button
                    onclick="app.changeCalendarMonth(${nextYear}, ${nextMonth})"
                    class="p-2 hover:bg-gray-100 rounded-lg transition-colors ${!canGoNext ? 'opacity-30 cursor-not-allowed' : ''}"
                    aria-label="Volgende maand"
                    ${!canGoNext ? 'disabled' : ''}
                >
                    <i class="fas fa-chevron-right text-gray-600" aria-hidden="true"></i>
                </button>
            </div>

            <!-- Calendar grid -->
            ${renderCalendarGrid(year, month, completedDays)}

            <!-- Streak statistics -->
            ${renderStreakStats(currentStreak, longestStreak, totalCompletedDays)}

            <!-- Motivational message -->
            ${
                currentStreak > 0
                    ? `
                <div class="mt-4 text-center text-sm text-gray-600">
                    <span class="inline-flex items-center gap-1">
                        <i class="fas fa-fire text-orange-500" aria-hidden="true"></i>
                        ${currentStreak === 1 ? 'Goed begin! Houd vol!' : currentStreak < 7 ? 'Ga zo door!' : currentStreak < 30 ? 'Fantastisch! Je bent on fire!' : 'Ongelooflijk! Je bent een ster!'}
                    </span>
                </div>
            `
                    : `
                <div class="mt-4 text-center text-sm text-gray-600">
                    Voltooi je dagelijkse oefeningen om je streak te starten!
                </div>
            `
            }
        </div>
    `;
}

/**
 * Render compact streak indicator for stats row
 * @param {number} streak - Current streak
 * @param {number} longestStreak - Longest streak
 * @returns {string} HTML string
 */
export function renderStreakIndicator(streak, longestStreak) {
    return `
        <div class="flex items-center gap-2">
            <span class="text-xl font-bold text-gray-800">${streak}</span>
            ${
                longestStreak > 0 && longestStreak > streak
                    ? `<span class="text-xs text-gray-500">(beste: ${longestStreak})</span>`
                    : ''
            }
        </div>
    `;
}
