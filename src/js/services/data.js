/**
 * Data Service
 * Handles user data persistence with Supabase
 */

import { getSupabase, isSupabaseEnabled } from './supabase.js';

/**
 * Get default stats object for new users
 * @returns {object}
 */
export function getDefaultStats() {
    return {
        totalPoints: 0,
        level: 1,
        streak: 0,
        longestStreak: 0,
        lastPracticeDate: null,
        completedDays: [], // ISO dates when Daily Program was 100% completed
        badges: [],
        perfectScores: 0,
        completedCategories: [],
        displayName: 'Leerling',
        leaderboardVisible: true,
        difficultyPreference: null,
        dailyGoal: 10,
        dailyProgress: 0,
        categoryPreferences: [
            'greetings',
            'daily',
            'work',
            'travel',
            'conversation',
            'cats',
            'august',
            'shopping'
        ],
        // Daily program sync (for cross-device sync)
        dailyProgramDate: null, // ISO date string (YYYY-MM-DD)
        dailyCompletedPhrases: [] // Phrase IDs completed today
    };
}

/**
 * Load user data from database
 * @param {string} userId - User ID
 * @returns {Promise<{stats: object, completedPhrases: array, phraseHistory: object, error: string|null}>}
 */
export async function loadUserData(userId) {
    if (!isSupabaseEnabled() || !userId) {
        return {
            stats: getDefaultStats(),
            completedPhrases: [],
            phraseHistory: {},
            error: null
        };
    }

    const supabase = getSupabase();

    try {
        const { data, error } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (data) {
            return {
                stats: { ...getDefaultStats(), ...data.stats },
                completedPhrases: data.completed_phrases || [],
                phraseHistory: data.phrase_history || {},
                error: null
            };
        }

        if (!error || error.code === 'PGRST116') {
            // No record found, return defaults
            return {
                stats: getDefaultStats(),
                completedPhrases: [],
                phraseHistory: {},
                isNewUser: true,
                error: null
            };
        }

        throw error;
    } catch (error) {
        console.error('Error loading user data:', error);
        return {
            stats: getDefaultStats(),
            completedPhrases: [],
            phraseHistory: {},
            error: error.message
        };
    }
}

/**
 * Save user data to database
 * @param {string} userId - User ID
 * @param {object} stats - User stats
 * @param {array} completedPhrases - Completed phrase IDs
 * @param {object} phraseHistory - Phrase practice history
 * @returns {Promise<{error: string|null}>}
 */
export async function saveUserData(userId, stats, completedPhrases, phraseHistory = {}) {
    if (!isSupabaseEnabled() || !userId) {
        return { error: null };
    }

    const supabase = getSupabase();

    try {
        const { error } = await supabase.from('user_progress').upsert({
            user_id: userId,
            stats: stats,
            completed_phrases: completedPhrases,
            phrase_history: phraseHistory,
            updated_at: new Date().toISOString()
        });

        if (error) {
            throw error;
        }

        return { error: null };
    } catch (error) {
        console.error('Error saving user data:', error);
        return { error: error.message };
    }
}

/**
 * Load leaderboard data
 * @param {number} limit - Maximum entries to return
 * @returns {Promise<{leaderboard: array, error: string|null}>}
 */
export async function loadLeaderboard(limit = 10) {
    if (!isSupabaseEnabled()) {
        return { leaderboard: [], error: null };
    }

    const supabase = getSupabase();

    try {
        const { data, error } = await supabase
            .from('user_progress')
            .select('stats')
            .order('stats->totalPoints', { ascending: false })
            .limit(20); // Fetch more to account for hidden users

        if (error) {
            throw error;
        }

        if (data) {
            // Filter out users who have hidden themselves from leaderboard
            const leaderboard = data
                .map(item => item.stats)
                .filter(stats => stats.leaderboardVisible !== false)
                .slice(0, limit);

            return { leaderboard, error: null };
        }

        return { leaderboard: [], error: null };
    } catch (error) {
        console.error('Error loading leaderboard:', error);
        return { leaderboard: [], error: error.message };
    }
}

/**
 * Delete user progress data
 * @param {string} userId - User ID
 * @returns {Promise<{error: string|null}>}
 */
export async function deleteUserData(userId) {
    if (!isSupabaseEnabled() || !userId) {
        return { error: 'Not authenticated' };
    }

    const supabase = getSupabase();

    try {
        const { error } = await supabase.from('user_progress').delete().eq('user_id', userId);

        if (error) {
            throw error;
        }

        return { error: null };
    } catch (error) {
        console.error('Error deleting user data:', error);
        return { error: error.message };
    }
}
