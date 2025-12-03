/**
 * Application constants for Svenska Kat
 */

// App version - synced with package.json via Vite
export const APP_VERSION = __APP_VERSION__ || '1.12.2';

// Supabase configuration from environment variables
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Points system
export const POINTS = {
    EASY: 10,
    MEDIUM: 15,
    HARD: 20,
    PERFECT_BONUS: 5
};

// Level calculation
export const POINTS_PER_LEVEL = 100;

// Daily goal
export const DEFAULT_DAILY_GOAL = 10;

// Category color mapping for Tailwind classes
export const CATEGORY_COLORS = {
    'dusty-rose': {
        bg: 'bg-pink-100',
        text: 'text-pink-700',
        border: 'border-pink-200',
        accent: '#a67171'
    },
    amber: {
        bg: 'bg-amber-100',
        text: 'text-amber-700',
        border: 'border-amber-200',
        accent: '#d97b2e'
    },
    blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        border: 'border-blue-200',
        accent: '#3e7db8'
    },
    'steel-blue': {
        bg: 'bg-slate-100',
        text: 'text-slate-700',
        border: 'border-slate-200',
        accent: '#4f6a8c'
    },
    green: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        border: 'border-green-200',
        accent: '#3e8b3e'
    },
    'lavender-grey': {
        bg: 'bg-purple-100',
        text: 'text-purple-700',
        border: 'border-purple-200',
        accent: '#6d7893'
    },
    coral: {
        bg: 'bg-orange-100',
        text: 'text-orange-700',
        border: 'border-orange-200',
        accent: '#c96f56'
    },
    clay: {
        bg: 'bg-amber-100',
        text: 'text-amber-800',
        border: 'border-amber-200',
        accent: '#a06247'
    },
    teal: {
        bg: 'bg-teal-100',
        text: 'text-teal-700',
        border: 'border-teal-200',
        accent: '#217a83'
    }
};

// Difficulty filter options
export const DIFFICULTY_FILTERS = {
    ALL: null,
    EASY: 'easy',
    EASY_MEDIUM: 'easy-medium',
    MEDIUM: 'medium',
    HARD: 'hard'
};

// Tab names
export const TABS = {
    HOME: 'home',
    CATEGORIES: 'categories',
    PRACTICE: 'practice',
    FLASHCARDS: 'flashcards',
    WRITING: 'writing',
    GRAMMAR: 'grammar',
    BADGES: 'badges',
    LEADERBOARD: 'leaderboard',
    SETTINGS: 'settings',
    LOGIN: 'login'
};

// Audio MIME type priorities for cross-browser compatibility
export const AUDIO_MIME_TYPES = [
    'audio/mp4',
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/ogg',
    'audio/wav'
];
