/**
 * Supabase Client Initialization
 * Centralized Supabase client setup with configuration
 */

import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../utils/constants.js';

let supabase = null;
let supabaseEnabled = false;

/**
 * Initialize Supabase client
 * @returns {Promise<{supabase: object|null, enabled: boolean}>}
 */
export async function initSupabase() {
    if (SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL !== 'https://your-project.supabase.co') {
        try {
            const { createClient } = await import('@supabase/supabase-js');
            supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
                auth: {
                    storage: window.localStorage,
                    autoRefreshToken: true,
                    persistSession: true,
                    detectSessionInUrl: true
                }
            });
            supabaseEnabled = true;
        } catch (error) {
            console.error('Supabase initialization error:', error);
        }
    }

    return { supabase, enabled: supabaseEnabled };
}

/**
 * Get the Supabase client instance
 * @returns {object|null}
 */
export function getSupabase() {
    return supabase;
}

/**
 * Check if Supabase is enabled
 * @returns {boolean}
 */
export function isSupabaseEnabled() {
    return supabaseEnabled;
}
