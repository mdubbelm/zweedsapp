/**
 * Authentication Service
 * Handles user authentication with Supabase
 */

import { getSupabase, isSupabaseEnabled } from './supabase.js';
import { APP_VERSION } from '../utils/constants.js';

/**
 * Check if user is authenticated
 * @returns {Promise<{user: object|null, needsSetup: boolean}>}
 */
export async function checkAuth() {
    if (!isSupabaseEnabled()) {
        return { user: null, needsSetup: true };
    }

    const supabase = getSupabase();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    return { user, needsSetup: false };
}

/**
 * Sign up a new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} displayName - Display name
 * @param {boolean} rememberMe - Whether to persist session
 * @returns {Promise<{user: object|null, needsVerification: boolean, error: string|null}>}
 */
export async function signUp(email, password, displayName, rememberMe = true) {
    const supabase = getSupabase();

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    display_name: displayName
                }
            }
        });

        if (error) {
            throw error;
        }

        if (data.user) {
            // Store preference for session persistence
            localStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');

            // Check if email confirmation is required
            if (data.user.identities && data.user.identities.length === 0) {
                return {
                    user: null,
                    needsVerification: true,
                    error: null
                };
            }

            // Set version for new users
            localStorage.setItem('lastSeenVersion', APP_VERSION);

            return {
                user: data.user,
                needsVerification: false,
                error: null,
                displayName
            };
        }

        return { user: null, needsVerification: false, error: 'No user returned' };
    } catch (error) {
        console.error('SignUp error:', error);
        return { user: null, needsVerification: false, error: error.message };
    }
}

/**
 * Sign in an existing user
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {boolean} rememberMe - Whether to persist session
 * @returns {Promise<{user: object|null, error: string|null}>}
 */
export async function signIn(email, password, rememberMe = true) {
    const supabase = getSupabase();

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
            options: {
                persistSession: rememberMe
            }
        });

        if (error) {
            let errorMessage = error.message;
            if (error.message.includes('Email not confirmed')) {
                errorMessage =
                    'Email nog niet bevestigd. Check je inbox voor de verificatie email.';
            } else if (error.message.includes('Invalid login credentials')) {
                errorMessage = 'Verkeerde email of wachtwoord. Probeer het opnieuw.';
            }
            return { user: null, error: errorMessage };
        }

        if (data.user) {
            localStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');
            return { user: data.user, error: null };
        }

        return { user: null, error: 'Geen gebruiker geretourneerd' };
    } catch (error) {
        console.error('Login exception:', error);
        return { user: null, error: error.message };
    }
}

/**
 * Sign out the current user
 * @returns {Promise<{error: string|null}>}
 */
export async function signOut() {
    const supabase = getSupabase();

    try {
        await supabase.auth.signOut();
        return { error: null };
    } catch (error) {
        return { error: error.message };
    }
}

/**
 * Reset password via email
 * @param {string} email - User email
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export async function resetPassword(email) {
    const supabase = getSupabase();

    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
            redirectTo: window.location.origin
        });

        if (error) {
            throw error;
        }

        return { success: true, error: null };
    } catch (error) {
        console.error('Password reset error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Change user password
 * @param {string} newPassword - New password
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export async function changePassword(newPassword) {
    const supabase = getSupabase();

    try {
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });

        if (error) {
            throw error;
        }

        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
