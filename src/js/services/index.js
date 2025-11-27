/**
 * Services Index
 * Re-exports all service modules for easy importing
 */

// Supabase client
export { initSupabase, getSupabase, isSupabaseEnabled } from './supabase.js';

// Authentication
export { checkAuth, signUp, signIn, signOut, resetPassword, changePassword } from './auth.js';

// Data persistence
export {
    getDefaultStats,
    loadUserData,
    saveUserData,
    loadLeaderboard,
    deleteUserData
} from './data.js';

// Analytics
export { trackEvent, EVENTS } from './analytics.js';
