/**
 * Analytics Service
 * Handles user event tracking for learning outcomes measurement
 */

import { getSupabase, isSupabaseEnabled } from './supabase.js';

/**
 * Track a user event
 * @param {string} userId - User ID
 * @param {string} eventName - Name of the event
 * @param {object} properties - Additional event properties
 * @param {object} userContext - User context (level, points, streak)
 * @returns {Promise<void>}
 */
export async function trackEvent(userId, eventName, properties = {}, userContext = {}) {
    if (!userId || !isSupabaseEnabled()) {
        return;
    }

    const supabase = getSupabase();

    try {
        await supabase.from('analytics_events').insert({
            user_id: userId,
            event_name: eventName,
            properties: {
                ...properties,
                timestamp: new Date().toISOString(),
                user_level: userContext.level || 1,
                total_points: userContext.totalPoints || 0,
                streak: userContext.streak || 0
            }
        });
    } catch (error) {
        // Silent fail - don't block user experience if analytics fail
        console.warn('Analytics tracking failed:', error);
    }
}

// Event name constants for consistency
export const EVENTS = {
    // User lifecycle
    USER_SIGNUP: 'user_signup',

    // Learning events
    PHRASE_COMPLETED_FIRST_TIME: 'phrase_completed_first_time',
    PHRASE_PRACTICED: 'phrase_practiced',
    BADGE_EARNED: 'badge_earned',

    // Feature usage
    FLASHCARDS_OPENED: 'flashcards_opened',
    WRITING_MODE_OPENED: 'writing_mode_opened',
    GRAMMAR_OPENED: 'grammar_opened',
    BADGES_VIEWED: 'badges_viewed',
    LEADERBOARD_VIEWED: 'leaderboard_viewed',
    SETTINGS_OPENED: 'settings_opened',

    // Daily program
    DAILY_PROGRAM_STARTED: 'daily_program_started',
    DAILY_PROGRAM_COMPLETED: 'daily_program_completed'
};
