/**
 * Svenska Kat - Main Application Class
 * Modular version with Vite build system
 */

import { categories } from './data/phrases.js';
import { badges } from './data/badges.js';
import { getRandomGrammarExercises } from './data/grammarExercises.js';
import { APP_VERSION, TABS } from './utils/constants.js';
import {
    escapeHtml,
    shuffleArray,
    isToday,
    isYesterday,
    getSpeechRecognition,
    calculateSimilarity,
    isSafari
} from './utils/helpers.js';

// Services
import {
    initSupabase,
    isSupabaseEnabled,
    checkAuth,
    signUp as authSignUp,
    signIn as authSignIn,
    signOut as authSignOut,
    resetPassword as authResetPassword,
    changePassword as authChangePassword
} from './services/index.js';

import {
    getDefaultStats,
    loadUserData,
    saveUserData,
    loadLeaderboard,
    deleteUserData
} from './services/data.js';

import { trackEvent, EVENTS } from './services/analytics.js';

// Views
import {
    renderLogin,
    renderSetup,
    toggleSignUp,
    renderHome,
    renderCategories,
    renderSettings,
    renderPractice,
    renderWriting,
    renderFlashcards,
    renderGrammar,
    renderBadges
} from './views/index.js';

// Components
import { renderNavigation } from './components/Navigation.js';
import { renderHeader } from './components/Header.js';

export class SwedishApp {
    constructor() {
        this.state = {
            currentTab: TABS.LOGIN,
            currentCategory: 'greetings',
            currentPhraseIndex: 0,
            isRecording: false,
            audioURL: null,
            hasListenedToAudio: false,
            audioBlob: null,
            audioMimeType: null,
            showAnswer: false,
            completedPhrases: [],
            newBadge: null,
            flashcardCategory: 'greetings',
            currentFlashcardIndex: 0,
            showFlashcardAnswer: false,
            user: null,
            leaderboard: [],
            stats: getDefaultStats(),
            showUpdateNotification: false,
            lastSeenVersion: localStorage.getItem('lastSeenVersion') || '1.0.0',
            showOnboarding: false,
            onboardingStep: 0,
            dailyPhrases: [],
            dailyCompletedPhrases: [], // Phrases completed TODAY in daily program
            fromDailyProgram: false,
            currentDailyPhraseIndex: -1,
            showDailyCompletion: false,
            showDailyProgramModal: false,
            difficultyFilter: null,
            writingCategory: 'greetings',
            currentWritingIndex: 0,
            writingInput: '',
            showWritingFeedback: false,
            writingCorrect: false,
            selectedCategoryForMode: null,
            selectedModeForCategory: null,
            isShuffled: false,
            shuffledPhrases: [],
            phraseHistory: {},
            grammarType: null,
            grammarItemIndex: 0,
            // Grammar Exercise state (from Daily Program)
            grammarExerciseMode: false,
            currentGrammarExercise: null,
            grammarInput: '',
            showGrammarFeedback: false,
            grammarCorrect: false,
            // Speech Recognition state
            isListening: false,
            speechResult: null,
            speechSimilarity: null,
            speechError: null,
            // Streak Calendar state
            calendarMonth: new Date().getMonth(),
            calendarYear: new Date().getFullYear()
        };

        this.mediaRecorder = null;
        this.audioChunks = [];
        this.audioStream = null;
        this.speechRecognition = null;

        // Data references
        this.categories = categories;
        this.badges = badges;

        // Make app globally accessible for onclick handlers
        window.app = this;

        // Initialize
        this.init();
    }

    async init() {
        // Initialize Supabase
        await initSupabase();

        // Initialize TTS voices
        this.initVoices();

        // Check authentication
        await this.checkAuth();

        // Render initial view
        this.render();

        // Check for app updates
        this.checkForUpdates();

        // Listen for visibility changes (PWA coming back from background)
        // This ensures daily program resets when a new day starts
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && this.state.user) {
                this.checkDailyProgramDate();
            }
        });
    }

    /**
     * Check if the daily program date has changed (new day)
     * Called when app becomes visible after being in background
     */
    checkDailyProgramDate() {
        const today = new Date().toDateString();
        const storedDate = localStorage.getItem('dailyProgramDate');

        if (storedDate !== today) {
            // New day detected - regenerate daily program
            this.generateDailyProgram();
            this.render();
        }
    }

    // =====================
    // Authentication Methods
    // =====================

    async checkAuth() {
        const { user, needsSetup } = await checkAuth();

        if (needsSetup) {
            this.state.currentTab = TABS.LOGIN; // Will show setup
            return;
        }

        if (user) {
            this.state.user = user;
            await this.loadUserData();
            this.checkForUpdates();
            this.generateDailyProgram();
            this.state.currentTab = TABS.HOME;
        } else {
            this.state.currentTab = TABS.LOGIN;
        }

        this.render();
    }

    async signUp(email, password, displayName, rememberMe = true) {
        const result = await authSignUp(email, password, displayName, rememberMe);

        if (result.error) {
            alert('Registratie mislukt: ' + result.error);
            return;
        }

        if (result.needsVerification) {
            alert(
                'Registratie succesvol! Check je email voor verificatie. (Let op: kan in spam terechtkomen)'
            );
            this.state.currentTab = TABS.LOGIN;
            this.render();
            return;
        }

        if (result.user) {
            this.state.user = result.user;
            this.state.stats.displayName = result.displayName;
            this.state.lastSeenVersion = APP_VERSION;
            localStorage.setItem('lastSeenVersion', APP_VERSION);
            await this.saveUserData();

            // Track signup
            await this.trackEvent(EVENTS.USER_SIGNUP, { display_name_set: !!displayName });

            this.state.currentTab = TABS.HOME;
            alert('Account succesvol aangemaakt! Welkom bij Svenska Kat 🐱');

            // Start tour for new users
            this.state.showOnboarding = true;
            this.state.onboardingStep = 0;
            this.render();
        }
    }

    async signIn(email, password, rememberMe = true) {
        const result = await authSignIn(email, password, rememberMe);

        if (result.error) {
            alert('Inloggen mislukt: ' + result.error);
            return;
        }

        if (result.user) {
            this.state.user = result.user;
            await this.loadUserData();
            this.checkForUpdates();
            this.generateDailyProgram();
            this.state.currentTab = TABS.HOME;
            this.render();
        }
    }

    async signOut() {
        const result = await authSignOut();

        if (result.error) {
            alert('Uitloggen mislukt: ' + result.error);
            return;
        }

        this.state.user = null;
        this.state.stats = getDefaultStats();
        this.state.completedPhrases = [];
        this.state.currentTab = TABS.LOGIN;
        this.render();
    }

    async resetPassword() {
        const email = window.prompt('Voer je email adres in voor wachtwoord reset:');
        if (email && email.trim()) {
            const result = await authResetPassword(email);
            if (result.success) {
                window.alert('Reset link verstuurd! Check je email (ook spam folder).');
            } else {
                window.alert('Wachtwoord reset mislukt: ' + result.error);
            }
        }
    }

    async changePassword() {
        const newPassword = window.prompt('Nieuw wachtwoord (minimaal 6 tekens):');
        if (newPassword && newPassword.length >= 6) {
            const result = await authChangePassword(newPassword);
            if (result.success) {
                window.alert('Wachtwoord succesvol gewijzigd!');
            } else {
                window.alert('Wachtwoord wijzigen mislukt: ' + result.error);
            }
        } else if (newPassword !== null) {
            window.alert('Wachtwoord moet minimaal 6 tekens zijn');
        }
    }

    // =====================
    // Data Methods
    // =====================

    async loadUserData() {
        if (!this.state.user) {
            return;
        }

        const result = await loadUserData(this.state.user.id);

        this.state.stats = result.stats;
        this.state.completedPhrases = result.completedPhrases;
        this.state.phraseHistory = result.phraseHistory;

        if (result.isNewUser) {
            await this.saveUserData();
        }

        this.checkStreak();
        await this.loadLeaderboard();
    }

    async saveUserData() {
        if (!this.state.user) {
            return;
        }

        await saveUserData(
            this.state.user.id,
            this.state.stats,
            this.state.completedPhrases,
            this.state.phraseHistory
        );
    }

    async loadLeaderboard() {
        const result = await loadLeaderboard(10);
        this.state.leaderboard = result.leaderboard;
    }

    async deleteAccount() {
        if (
            confirm(
                'Weet je zeker dat je je account wilt verwijderen? Dit kan niet ongedaan worden!'
            )
        ) {
            if (confirm('Laatste waarschuwing! Alle voortgang wordt permanent verwijderd.')) {
                const result = await deleteUserData(this.state.user.id);
                if (!result.error) {
                    alert(
                        'Voortgang verwijderd. Neem contact op met support om je account volledig te verwijderen.'
                    );
                    await this.signOut();
                } else {
                    alert('Account verwijderen mislukt: ' + result.error);
                }
            }
        }
    }

    // =====================
    // Analytics
    // =====================

    async trackEvent(eventName, properties = {}) {
        if (!this.state.user) {
            return;
        }

        await trackEvent(this.state.user.id, eventName, properties, {
            level: this.state.stats.level,
            totalPoints: this.state.stats.totalPoints,
            streak: this.state.stats.streak
        });
    }

    // =====================
    // Game Logic
    // =====================

    checkStreak() {
        const lastDate = this.state.stats.lastPracticeDate;
        const today = new Date().toISOString().split('T')[0];

        if (!lastDate) {
            // First practice ever - start streak
            this.state.stats.streak = 1;
            this.state.stats.lastPracticeDate = today;
            this.updateLongestStreak();
            return;
        }

        if (isToday(lastDate)) {
            // Already practiced today - streak unchanged
            return;
        }

        if (isYesterday(lastDate)) {
            // Streak continues - increment
            this.state.stats.streak = (this.state.stats.streak || 0) + 1;
            this.state.stats.lastPracticeDate = today;
            this.updateLongestStreak();
        } else {
            // Streak broken - reset to 1 (today counts)
            this.state.stats.streak = 1;
            this.state.stats.lastPracticeDate = today;
        }
    }

    /**
     * Update longest streak if current streak is higher
     */
    updateLongestStreak() {
        const currentStreak = this.state.stats.streak || 0;
        const longestStreak = this.state.stats.longestStreak || 0;
        if (currentStreak > longestStreak) {
            this.state.stats.longestStreak = currentStreak;
        }
    }

    /**
     * Show points toast notification
     * @param {number} points - Points earned
     */
    showPointsToast(points) {
        // Remove existing toast if any
        const existing = document.getElementById('points-toast');
        if (existing) {
            existing.remove();
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.id = 'points-toast';
        toast.className = 'points-toast';
        toast.innerHTML = `
            <i class="fas fa-star"></i>
            <span>+${points} punten</span>
        `;

        document.body.appendChild(toast);

        // Remove after animation
        setTimeout(() => {
            toast.remove();
        }, 2000);
    }

    checkForUpdates() {
        if (this.state.lastSeenVersion !== APP_VERSION && this.state.user) {
            this.state.showUpdateNotification = true;
        }
    }

    dismissUpdate() {
        this.state.showUpdateNotification = false;
        this.state.lastSeenVersion = APP_VERSION;
        localStorage.setItem('lastSeenVersion', APP_VERSION);
        this.render();
    }

    async forceUpdate() {
        const confirmed = confirm(
            'Dit wist de app cache en herlaadt de nieuwste versie.\n\nJe voortgang blijft behouden.\n\nDoorgaan?'
        );

        if (!confirmed) {
            return;
        }

        try {
            // Show loading state
            this.showToast('Update controleren...');

            // Unregister all service workers
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (const registration of registrations) {
                    await registration.unregister();
                }
            }

            // Clear all caches
            if ('caches' in window) {
                const cacheNames = await window.caches.keys();
                for (const cacheName of cacheNames) {
                    await window.caches.delete(cacheName);
                }
            }

            // Hard reload
            window.location.reload(true);
        } catch (error) {
            console.error('Force update failed:', error);
            alert(
                'Update mislukt. Probeer de app handmatig te verwijderen en opnieuw te installeren.'
            );
        }
    }

    // =====================
    // Difficulty Filtering
    // =====================

    getFilteredPhrases(phrases) {
        const pref = this.state.stats.difficultyPreference;
        if (!pref) {
            return phrases;
        }

        return phrases.filter(p => {
            if (pref === 'easy') {
                return p.difficulty === 'easy';
            }
            if (pref === 'easy-medium') {
                return p.difficulty === 'easy' || p.difficulty === 'medium';
            }
            if (pref === 'medium') {
                return p.difficulty === 'medium';
            }
            if (pref === 'hard') {
                return p.difficulty === 'hard';
            }
            return true;
        });
    }

    async setDifficultyPreference(difficulty) {
        this.state.stats.difficultyPreference = difficulty;

        // Clear daily program cache
        localStorage.removeItem('dailyProgram');
        localStorage.removeItem('dailyProgramDate');

        // Regenerate daily program
        this.generateDailyProgram();

        // Save and re-render
        await this.saveUserData();
        this.render();
    }

    // =====================
    // Daily Program
    // =====================

    generateDailyProgram() {
        const today = new Date().toDateString();
        const storedDate = localStorage.getItem('dailyProgramDate');

        if (storedDate === today && localStorage.getItem('dailyProgram')) {
            try {
                this.state.dailyPhrases = JSON.parse(localStorage.getItem('dailyProgram'));
                // Load today's completed phrases (not the global completedPhrases!)
                const storedDailyCompleted = localStorage.getItem('dailyCompletedPhrases');
                this.state.dailyCompletedPhrases = storedDailyCompleted
                    ? JSON.parse(storedDailyCompleted)
                    : [];
                return;
            } catch {
                // Regenerate if parsing fails
            }
        }

        // New day: reset daily completed phrases
        this.state.dailyCompletedPhrases = [];
        localStorage.setItem('dailyCompletedPhrases', '[]');

        // Get enabled categories
        const enabledCategories =
            this.state.stats.categoryPreferences || Object.keys(this.categories);

        // Collect all eligible phrases
        let allPhrases = [];
        enabledCategories.forEach(catId => {
            const category = this.categories[catId];
            if (category) {
                const filtered = this.getFilteredPhrases(category.phrases);
                filtered.forEach(phrase => {
                    allPhrases.push({
                        ...phrase,
                        categoryId: catId,
                        categoryName: category.name
                    });
                });
            }
        });

        // Shuffle phrases
        allPhrases = shuffleArray(allPhrases);

        // Get difficulty based on user level (Lotte's framework)
        const level = this.state.stats?.level || 1;
        let difficultyFilter = null;
        if (level <= 5) {
            difficultyFilter = 'easy';
        } else if (level <= 10) {
            difficultyFilter = 'easy-medium';
        } else if (level <= 15) {
            difficultyFilter = 'medium';
        } else if (level <= 20) {
            difficultyFilter = 'hard';
        }

        // Build daily program according to Lotte's framework:
        // 8 phrases (4 practice, 4 writing) + 2 grammar exercises
        const phraseItems = allPhrases.slice(0, 8).map((phrase, index) => ({
            ...phrase,
            exerciseType: index % 2 === 0 ? 'practice' : 'writing'
        }));

        // Get 2 grammar exercises
        const grammarItems = getRandomGrammarExercises(2, difficultyFilter).map(exercise => ({
            ...exercise,
            exerciseType: 'grammar',
            categoryId: 'grammar',
            categoryName: 'Grammatica'
        }));

        // Combine: 8 phrases + 2 grammar = 10 items total
        // Interleave grammar at positions 4 and 8 for variety
        const dailyPhrases = [
            ...phraseItems.slice(0, 4),
            grammarItems[0],
            ...phraseItems.slice(4, 8),
            grammarItems[1]
        ].filter(Boolean); // Remove undefined if less grammar exercises

        this.state.dailyPhrases = dailyPhrases;
        localStorage.setItem('dailyProgram', JSON.stringify(dailyPhrases));
        localStorage.setItem('dailyProgramDate', today);
    }

    openDailyProgramModal() {
        this.state.showDailyProgramModal = true;
        this.render();
    }

    closeDailyProgramModal() {
        this.state.showDailyProgramModal = false;
        this.render();
    }

    // =====================
    // Navigation
    // =====================

    switchTab(tab) {
        this.state.currentTab = tab;

        // Clear category selection when switching tabs
        if (tab !== TABS.CATEGORIES) {
            this.state.selectedCategoryForMode = null;
        }

        // Track feature usage
        if (tab === TABS.CATEGORIES) {
            this.trackEvent('categories_viewed');
        } else if (tab === TABS.FLASHCARDS) {
            this.trackEvent(EVENTS.FLASHCARDS_OPENED);
        } else if (tab === TABS.WRITING) {
            this.trackEvent(EVENTS.WRITING_MODE_OPENED);
        } else if (tab === TABS.GRAMMAR) {
            this.trackEvent(EVENTS.GRAMMAR_OPENED);
        } else if (tab === TABS.BADGES) {
            this.trackEvent(EVENTS.BADGES_VIEWED);
        } else if (tab === TABS.LEADERBOARD) {
            this.trackEvent(EVENTS.LEADERBOARD_VIEWED);
        } else if (tab === TABS.SETTINGS) {
            this.trackEvent(EVENTS.SETTINGS_OPENED);
        }

        this.render();
    }

    setTab(tab) {
        this.switchTab(tab);
    }

    selectCategory(categoryId) {
        this.state.currentCategory = categoryId;
        this.state.currentPhraseIndex = 0;
        this.showModeSelector(categoryId);
    }

    showModeSelector(categoryId) {
        this.state.selectedCategoryForMode = categoryId;
        this.render();
    }

    showCategorySelector(mode) {
        this.state.selectedModeForCategory = mode;
        this.render();
    }

    closeModeSelector() {
        this.state.selectedCategoryForMode = null;
        this.render();
    }

    closeCategorySelector() {
        this.state.selectedModeForCategory = null;
        this.render();
    }

    // Methods for CategoriesView inline mode selection
    selectCategoryForMode(categoryId) {
        this.state.selectedCategoryForMode = categoryId;
        this.render();
    }

    clearSelectedCategory() {
        this.state.selectedCategoryForMode = null;
        this.render();
    }

    startPracticeWithCategory(categoryId, mode) {
        this.state.currentCategory = categoryId;
        this.state.currentPhraseIndex = 0;
        this.state.selectedCategoryForMode = null;

        if (mode === 'practice') {
            this.state.currentTab = TABS.PRACTICE;
        } else if (mode === 'writing') {
            this.state.writingCategory = categoryId;
            this.state.currentWritingIndex = 0;
            this.state.currentTab = TABS.WRITING;
        } else if (mode === 'flashcards') {
            this.state.flashcardCategory = categoryId;
            this.state.currentFlashcardIndex = 0;
            this.state.currentTab = TABS.FLASHCARDS;
        }

        this.render();
    }

    startMode(mode) {
        const category = this.state.selectedCategoryForMode;
        this.state.currentCategory = category;
        this.state.currentPhraseIndex = 0;
        this.state.selectedCategoryForMode = null;
        this.state.selectedModeForCategory = null;

        if (mode === 'practice') {
            this.state.currentTab = TABS.PRACTICE;
        } else if (mode === 'writing') {
            this.state.writingCategory = category;
            this.state.currentWritingIndex = 0;
            this.state.currentTab = TABS.WRITING;
        } else if (mode === 'flashcards') {
            this.state.flashcardCategory = category;
            this.state.currentFlashcardIndex = 0;
            this.state.currentTab = TABS.FLASHCARDS;
        }

        this.render();
    }

    // =====================
    // User Settings
    // =====================

    async updateDisplayName() {
        const newName = window.prompt('Nieuwe naam:', this.state.stats.displayName);
        if (newName && newName.trim()) {
            this.state.stats.displayName = newName.trim();
            await this.saveUserData();
            this.render();
            window.alert('Naam succesvol gewijzigd!');
        }
    }

    async toggleCategory(categoryId) {
        if (!this.state.stats.categoryPreferences) {
            this.state.stats.categoryPreferences = Object.keys(this.categories);
        }

        const index = this.state.stats.categoryPreferences.indexOf(categoryId);
        if (index > -1) {
            this.state.stats.categoryPreferences.splice(index, 1);
        } else {
            this.state.stats.categoryPreferences.push(categoryId);
        }

        this.generateDailyProgram();
        await this.saveUserData();
        this.render();
    }

    async toggleLeaderboardVisibility() {
        this.state.stats.leaderboardVisible = this.state.stats.leaderboardVisible === false;
        await this.saveUserData();
        this.render();
    }

    // =====================
    // Tour/Onboarding
    // =====================

    startTour() {
        this.state.showOnboarding = true;
        this.state.onboardingStep = 0;
        this.state.currentTab = TABS.HOME;
        localStorage.setItem('onboardingCompleted', 'false');
        this.render();
    }

    // =====================
    // Login Form Handling
    // =====================

    toggleSignUp() {
        toggleSignUp();
    }

    async handleLogin() {
        const email = document.getElementById('email')?.value;
        const password = document.getElementById('password')?.value;
        const rememberMe = document.getElementById('rememberMe')?.checked ?? true;
        const displayNameField = document.getElementById('displayNameField');

        if (!email || !password) {
            alert('Vul email en wachtwoord in');
            return;
        }

        if (displayNameField && displayNameField.style.display !== 'none') {
            const displayName = document.getElementById('displayName')?.value;
            if (!displayName) {
                alert('Vul een naam in');
                return;
            }
            await this.signUp(email, password, displayName, rememberMe);
        } else {
            await this.signIn(email, password, rememberMe);
        }
    }

    // =====================
    // Rendering
    // =====================

    render() {
        const appElement = document.getElementById('app');
        if (!appElement) {
            return;
        }

        // Check if Supabase is configured
        if (!isSupabaseEnabled() && this.state.currentTab === TABS.LOGIN) {
            appElement.innerHTML = renderSetup();
            return;
        }

        // Login view (no nav)
        if (this.state.currentTab === TABS.LOGIN) {
            appElement.innerHTML = renderLogin();
            return;
        }

        // Main app with navigation
        const content = this.renderCurrentTab();

        appElement.innerHTML = `
            ${this.state.showUpdateNotification ? this.renderUpdateNotification() : ''}
            ${this.state.newBadge ? this.renderNewBadge() : ''}
            ${this.state.showDailyCompletion ? this.renderDailyCompletionMessage() : ''}
            ${this.state.showDailyProgramModal ? this.renderDailyProgramModal() : ''}
            ${this.state.selectedCategoryForMode ? this.renderModeSelector() : ''}
            ${this.state.selectedModeForCategory ? this.renderCategorySelector() : ''}

            <div class="min-h-screen pb-20">
                ${this.renderAppHeader()}
                <main class="max-w-lg mx-auto p-4">
                    ${content}
                </main>
            </div>

            ${renderNavigation(this.state.currentTab)}
        `;
    }

    renderCurrentTab() {
        const filterFn = this.getFilteredPhrases.bind(this);
        switch (this.state.currentTab) {
            case TABS.HOME:
                return renderHome(this.state);
            case TABS.CATEGORIES:
                return renderCategories(this.state, filterFn);
            case TABS.PRACTICE:
                return renderPractice(this.state, filterFn);
            case TABS.WRITING:
                return renderWriting(this.state, filterFn);
            case TABS.FLASHCARDS:
                return renderFlashcards(this.state, filterFn);
            case TABS.GRAMMAR:
                return renderGrammar(this.state);
            case TABS.BADGES:
                return renderBadges(this.state, this.badges);
            case TABS.SETTINGS:
                return renderSettings(this.state);
            default:
                return renderHome(this.state);
        }
    }

    renderAppHeader() {
        const tabTitles = {
            [TABS.HOME]: 'Svenska Kat',
            [TABS.CATEGORIES]: 'Categorieën',
            [TABS.PRACTICE]: 'Uitspraak',
            [TABS.WRITING]: 'Schrijven',
            [TABS.FLASHCARDS]: 'Flashcards',
            [TABS.GRAMMAR]: 'Grammatica',
            [TABS.BADGES]: 'Badges',
            [TABS.LEADERBOARD]: 'Leaderboard',
            [TABS.SETTINGS]: 'Instellingen'
        };

        return renderHeader({
            title: tabTitles[this.state.currentTab] || 'Svenska Kat',
            showVersion: this.state.currentTab === TABS.HOME,
            showBack: ![TABS.HOME, TABS.CATEGORIES, TABS.BADGES, TABS.SETTINGS].includes(
                this.state.currentTab
            ),
            backAction: "app.setTab('home')"
        });
    }

    renderUpdateNotification() {
        return `
            <div class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
                <div class="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3">
                    <i class="fas fa-gift"></i>
                    <span>Nieuwe versie ${APP_VERSION} beschikbaar!</span>
                    <button onclick="app.dismissUpdate()" class="ml-2 hover:bg-blue-700 px-2 py-1 rounded">
                        OK
                    </button>
                </div>
            </div>
        `;
    }

    renderNewBadge() {
        const badge = this.state.newBadge;
        if (!badge) {
            return '';
        }

        setTimeout(() => {
            this.state.newBadge = null;
            this.render();
        }, 3000);

        return `
            <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
                <div class="bg-white rounded-2xl p-8 mx-4 text-center animate-slideUp max-w-sm">
                    <div class="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce bg-yellow-100">
                        <i class="fas fa-${badge.icon} text-4xl text-yellow-600"></i>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">Badge Behaald!</h2>
                    <h3 class="text-xl font-semibold text-yellow-600 mb-2">${badge.name}</h3>
                    <p class="text-gray-600">${badge.description}</p>
                </div>
            </div>
        `;
    }

    renderDailyCompletionMessage() {
        return `
            <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
                <div class="bg-white rounded-2xl p-8 mx-4 text-center animate-slideUp max-w-sm">
                    <div class="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-100">
                        <i class="fas fa-check-circle text-5xl text-green-500"></i>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">Gefeliciteerd!</h2>
                    <p class="text-lg text-gray-600 mb-4">
                        Je hebt je dagelijkse oefeningen voltooid!
                    </p>
                    <p class="text-sm text-gray-500">
                        Kom morgen terug voor nieuwe zinnen
                    </p>
                </div>
            </div>
        `;
    }

    renderDailyProgramModal() {
        const phrases = this.state.dailyPhrases;
        // Use dailyCompletedPhrases for today's progress, not global completedPhrases
        const completedCount = phrases.filter(p =>
            this.state.dailyCompletedPhrases.includes(`${p.categoryId}-${p.id}`)
        ).length;

        return `
            <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onclick="if(event.target === this) app.closeDailyProgramModal()">
                <div class="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto animate-slideUp">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-xl font-bold text-gray-800">Dagelijks Programma</h2>
                        <button onclick="app.closeDailyProgramModal()" class="p-2 hover:bg-gray-100 rounded-lg">
                            <i class="fas fa-times text-gray-500"></i>
                        </button>
                    </div>

                    <p class="text-gray-600 mb-4">${completedCount} van ${phrases.length} voltooid</p>

                    <div class="space-y-2">
                        ${phrases
                            .map((phrase, index) => {
                                const isCompleted = this.state.dailyCompletedPhrases.includes(
                                    `${phrase.categoryId}-${phrase.id}`
                                );
                                const isGrammar = phrase.exerciseType === 'grammar';
                                const icon = isGrammar
                                    ? '📝'
                                    : phrase.exerciseType === 'practice'
                                      ? '🎤'
                                      : '⌨️';
                                const displayText = isGrammar ? phrase.prompt : phrase.swedish;

                                return `
                                <button onclick="app.startDailyPhrase(${index})"
                                        class="w-full p-3 rounded-xl text-left transition-all ${
                                            isCompleted
                                                ? 'bg-green-50 border-2 border-green-200'
                                                : isGrammar
                                                  ? 'bg-amber-50 hover:bg-amber-100'
                                                  : 'bg-gray-50 hover:bg-gray-100'
                                        }">
                                    <div class="flex items-center gap-3">
                                        <span class="text-lg">${icon}</span>
                                        <div class="flex-1">
                                            <p class="font-medium text-gray-800">${escapeHtml(displayText)}</p>
                                            <p class="text-sm text-gray-500">${phrase.categoryName}${isGrammar ? ' - ' + phrase.type : ''}</p>
                                        </div>
                                        ${isCompleted ? '<i class="fas fa-check-circle text-green-500"></i>' : ''}
                                    </div>
                                </button>
                            `;
                            })
                            .join('')}
                    </div>
                </div>
            </div>
        `;
    }

    startDailyPhrase(index) {
        const phrase = this.state.dailyPhrases[index];
        if (!phrase) {
            return;
        }

        this.state.fromDailyProgram = true;
        this.state.currentDailyPhraseIndex = index;
        this.state.showDailyProgramModal = false;

        // Handle grammar exercises differently
        if (phrase.exerciseType === 'grammar') {
            this.state.currentGrammarExercise = phrase;
            this.state.grammarInput = '';
            this.state.showGrammarFeedback = false;
            this.state.currentTab = TABS.GRAMMAR;
            this.state.grammarExerciseMode = true;
            this.render();
            return;
        }

        this.state.currentCategory = phrase.categoryId;

        // CRITICAL: Find index in FILTERED phrases, not full category
        // This bug has occurred multiple times - see commit 487752d
        const category = this.categories[phrase.categoryId];
        const filteredPhrases = this.getFilteredPhrases(category.phrases);
        const phraseIndexInFiltered = filteredPhrases.findIndex(p => p.id === phrase.id);

        if (phrase.exerciseType === 'practice') {
            // Set correct index in filtered phrases (fallback to 0 if not found)
            this.state.currentPhraseIndex =
                phraseIndexInFiltered !== -1 ? phraseIndexInFiltered : 0;
            this.state.currentTab = TABS.PRACTICE;
            // Reset practice mode state
            this.state.showAnswer = false;
            this.state.audioURL = null;
            this.state.hasListenedToAudio = false;
        } else {
            this.state.writingCategory = phrase.categoryId;
            // Set correct index in filtered phrases (fallback to 0 if not found)
            this.state.currentWritingIndex =
                phraseIndexInFiltered !== -1 ? phraseIndexInFiltered : 0;
            this.state.currentTab = TABS.WRITING;
            // Reset writing mode state
            this.state.writingInput = '';
            this.state.showWritingFeedback = false;
        }

        this.render();
    }

    renderModeSelector() {
        const category = this.categories[this.state.selectedCategoryForMode];
        if (!category) {
            return '';
        }

        return `
            <div class="mode-selector-overlay" onclick="if(event.target === this) app.closeModeSelector()">
                <div class="mode-selector-modal">
                    <div class="mode-selector-header">
                        <p class="mode-selector-title">${category.name}</p>
                        <p class="mode-selector-subtitle">Kies hoe je wilt oefenen</p>
                    </div>

                    <button onclick="app.startMode('practice')" class="mode-option">
                        <div class="mode-option-icon" style="background: var(--scandi-blue);">
                            <i class="fas fa-microphone text-white"></i>
                        </div>
                        <p class="mode-option-title">Uitspraak</p>
                        <p class="mode-option-description">Luister en spreek de zinnen na</p>
                    </button>

                    <button onclick="app.startMode('writing')" class="mode-option">
                        <div class="mode-option-icon" style="background: var(--scandi-teal);">
                            <i class="fas fa-keyboard text-white"></i>
                        </div>
                        <p class="mode-option-title">Spelling</p>
                        <p class="mode-option-description">Type de Zweedse vertaling</p>
                    </button>

                    <button onclick="app.startMode('flashcards')" class="mode-option">
                        <div class="mode-option-icon" style="background: var(--scandi-green);">
                            <i class="fas fa-layer-group text-white"></i>
                        </div>
                        <p class="mode-option-title">Flashcards</p>
                        <p class="mode-option-description">Oefen met geheugenkaarten</p>
                    </button>

                    <button onclick="app.closeModeSelector()" class="mode-selector-cancel">
                        Annuleren
                    </button>
                </div>
            </div>
        `;
    }

    renderCategorySelector() {
        const mode = this.state.selectedModeForCategory;
        const modeNames = {
            practice: 'Uitspraak',
            writing: 'Spelling',
            flashcards: 'Flashcards'
        };

        return `
            <div class="category-selector-overlay" onclick="if(event.target === this) app.closeCategorySelector()">
                <div class="category-selector-modal">
                    <div class="mode-selector-header">
                        <p class="mode-selector-title">${modeNames[mode] || 'Oefenen'}</p>
                        <p class="mode-selector-subtitle">Kies een categorie</p>
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                        ${Object.entries(this.categories)
                            .map(([id, cat]) => {
                                return `
                                <button onclick="app.state.selectedCategoryForMode = '${id}'; app.state.selectedModeForCategory = null; app.startMode('${mode}')"
                                        class="p-3 rounded-xl text-white text-left"
                                        style="background: var(--${cat.color === 'amber' ? 'scandi-amber' : cat.color === 'blue' ? 'scandi-blue' : cat.color === 'green' ? 'scandi-green' : cat.color});">
                                    <i class="fas ${cat.icon} text-2xl mb-1"></i>
                                    <p class="font-semibold text-sm">${cat.name}</p>
                                </button>
                            `;
                            })
                            .join('')}
                    </div>

                    <button onclick="app.closeCategorySelector()" class="mode-selector-cancel mt-4">
                        Annuleren
                    </button>
                </div>
            </div>
        `;
    }

    // =====================
    // Audio Methods
    // =====================

    speakSwedish(text) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'sv-SE';
            utterance.rate = 0.8;

            // Try to find a Swedish voice
            const voices = window.speechSynthesis.getVoices();
            const swedishVoice = voices.find(
                v => v.lang === 'sv-SE' || v.lang === 'sv' || v.lang.startsWith('sv')
            );
            if (swedishVoice) {
                utterance.voice = swedishVoice;
            }

            window.speechSynthesis.speak(utterance);

            // Mark as listened for practice mode unlock
            if (!this.state.hasListenedToAudio) {
                this.state.hasListenedToAudio = true;
                this.render();
            }
        }
    }

    // Initialize voices (needed for some browsers)
    initVoices() {
        if ('speechSynthesis' in window) {
            // Voices may not be available immediately
            window.speechSynthesis.getVoices();
            window.speechSynthesis.onvoiceschanged = () => {
                window.speechSynthesis.getVoices();
            };
        }
    }

    /**
     * Mark audio as listened (unlocks "Geleerd" button)
     * Called from TTS button in practice mode
     */
    markAudioListened() {
        if (!this.state.hasListenedToAudio) {
            this.state.hasListenedToAudio = true;
            this.render();
        }
    }

    async toggleRecording() {
        if (this.state.isRecording) {
            this.stopRecording();
        } else {
            await this.startRecording();
        }
    }

    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.audioStream = stream;
            this.audioChunks = [];

            // Determine best MIME type
            const mimeTypes = [
                'audio/mp4',
                'audio/webm;codecs=opus',
                'audio/webm',
                'audio/ogg',
                'audio/wav'
            ];
            let mimeType = '';
            for (const type of mimeTypes) {
                if (MediaRecorder.isTypeSupported(type)) {
                    mimeType = type;
                    break;
                }
            }

            this.mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : {});
            this.state.audioMimeType = mimeType || 'audio/wav';

            this.mediaRecorder.ondataavailable = event => {
                if (event.data.size > 0) {
                    this.audioChunks.push(event.data);
                }
            };

            this.mediaRecorder.onstop = () => {
                const blob = new Blob(this.audioChunks, { type: this.state.audioMimeType });
                this.state.audioBlob = blob;
                this.state.audioURL = URL.createObjectURL(blob);
                this.render();
            };

            this.mediaRecorder.start();
            this.state.isRecording = true;
            this.render();
        } catch (error) {
            console.error('Recording error:', error);
            window.alert('Kon microfoon niet gebruiken. Controleer je permissies.');
        }
    }

    stopRecording() {
        if (this.mediaRecorder && this.state.isRecording) {
            this.mediaRecorder.stop();
            this.state.isRecording = false;

            if (this.audioStream) {
                this.audioStream.getTracks().forEach(track => track.stop());
            }
        }
    }

    playRecording() {
        if (this.state.audioURL) {
            const audio = new Audio(this.state.audioURL);
            audio.play();
        }
    }

    /**
     * Clear current recording to re-record
     */
    clearRecording() {
        if (this.state.audioURL) {
            URL.revokeObjectURL(this.state.audioURL);
        }
        this.state.audioURL = null;
        this.state.audioBlob = null;
        // Also reset speech recognition when re-recording
        this.state.speechResult = null;
        this.state.speechSimilarity = null;
        this.state.speechError = null;
        this.render();
    }

    // =====================
    // Speech Recognition Methods
    // =====================

    /**
     * Start speech recognition for pronunciation comparison
     * Only works on desktop/Android, not iOS
     * @param {string} expectedText - The Swedish text to compare against
     */
    startSpeechRecognition(expectedText) {
        const SpeechRecognition = getSpeechRecognition();
        if (!SpeechRecognition) {
            this.state.speechError = 'Spraakherkenning niet beschikbaar op dit apparaat';
            this.render();
            return;
        }

        // Stop any existing recognition
        this.stopSpeechRecognition();

        // Reset state
        this.state.speechResult = null;
        this.state.speechSimilarity = null;
        this.state.speechError = null;
        this.state.isListening = true;
        this.render();

        // Create new recognition instance
        this.speechRecognition = new SpeechRecognition();
        this.speechRecognition.lang = 'sv-SE'; // Swedish
        this.speechRecognition.continuous = false;
        this.speechRecognition.interimResults = false;
        this.speechRecognition.maxAlternatives = 1;

        // Safari-specific: Add timeout because Safari may silently fail
        const safariTimeout = isSafari()
            ? setTimeout(() => {
                  if (this.state.isListening) {
                      console.warn('Safari speech recognition timeout');
                      this.state.isListening = false;
                      this.state.speechError =
                          'Spraakherkenning timeout. Safari vereist dat Dictation is ingeschakeld in Systeemvoorkeuren > Toetsenbord > Dictation.';
                      this.render();
                  }
              }, 10000)
            : null;

        this.speechRecognition.onresult = event => {
            if (safariTimeout) {
                clearTimeout(safariTimeout);
            }
            const result = event.results[0][0].transcript;
            this.state.speechResult = result;
            this.state.speechSimilarity = calculateSimilarity(result, expectedText);
            this.state.isListening = false;

            // Mark as listened for practice mode unlock
            if (!this.state.hasListenedToAudio) {
                this.state.hasListenedToAudio = true;
            }

            this.render();
        };

        this.speechRecognition.onerror = event => {
            if (safariTimeout) {
                clearTimeout(safariTimeout);
            }
            console.error('Speech recognition error:', event.error);
            this.state.isListening = false;

            // User-friendly error messages with Safari-specific hints
            const errorMessages = {
                'no-speech': 'Geen spraak gedetecteerd. Spreek duidelijk en probeer opnieuw.',
                'audio-capture': isSafari()
                    ? 'Microfoon niet beschikbaar. Controleer permissies in Safari > Instellingen > Websites > Microfoon.'
                    : 'Microfoon niet beschikbaar. Controleer permissies.',
                'not-allowed': isSafari()
                    ? 'Microfoon toegang geweigerd. Ga naar Safari > Instellingen > Websites > Microfoon en sta toegang toe.'
                    : 'Microfoon toegang geweigerd. Sta toegang toe in je browser.',
                aborted: 'Spraakherkenning geannuleerd.',
                network: 'Netwerkfout. Controleer je internetverbinding.',
                'service-not-allowed': isSafari()
                    ? 'Spraakherkenning geblokkeerd. Schakel Dictation in via Systeemvoorkeuren > Toetsenbord > Dictation.'
                    : 'Spraakherkenning service niet beschikbaar.'
            };

            this.state.speechError = errorMessages[event.error] || `Fout: ${event.error}`;
            this.render();
        };

        this.speechRecognition.onend = () => {
            if (safariTimeout) {
                clearTimeout(safariTimeout);
            }
            this.state.isListening = false;
            this.render();
        };

        // Start listening
        try {
            this.speechRecognition.start();
            console.log('Speech recognition started', { browser: isSafari() ? 'Safari' : 'Other' });
        } catch (error) {
            if (safariTimeout) {
                clearTimeout(safariTimeout);
            }
            console.error('Failed to start speech recognition:', error);
            this.state.speechError = isSafari()
                ? 'Kon spraakherkenning niet starten. Controleer of Dictation is ingeschakeld in Systeemvoorkeuren.'
                : 'Kon spraakherkenning niet starten';
            this.state.isListening = false;
            this.render();
        }
    }

    /**
     * Stop active speech recognition
     */
    stopSpeechRecognition() {
        if (this.speechRecognition) {
            try {
                this.speechRecognition.stop();
            } catch {
                // Ignore errors when stopping
            }
            this.speechRecognition = null;
        }
        this.state.isListening = false;
    }

    /**
     * Clear speech recognition result
     */
    clearSpeechResult() {
        this.state.speechResult = null;
        this.state.speechSimilarity = null;
        this.state.speechError = null;
        this.render();
    }

    // =====================
    // Practice Methods
    // =====================

    toggleAnswer() {
        this.state.showAnswer = !this.state.showAnswer;
        this.render();
    }

    async markPhraseComplete() {
        const category = this.categories[this.state.currentCategory];
        if (!category) {
            return;
        }

        const phrases = this.getFilteredPhrases(category.phrases);
        const phrase = phrases[this.state.currentPhraseIndex];
        if (!phrase) {
            return;
        }

        const phraseId = `${this.state.currentCategory}-${phrase.id}`;

        if (!this.state.completedPhrases.includes(phraseId)) {
            this.state.completedPhrases.push(phraseId);

            // Award points
            const points =
                phrase.difficulty === 'hard' ? 20 : phrase.difficulty === 'medium' ? 15 : 10;
            this.state.stats.totalPoints += points;
            this.state.stats.level = Math.floor(this.state.stats.totalPoints / 100) + 1;
            this.state.stats.phrasesCompleted = (this.state.stats.phrasesCompleted || 0) + 1;
            this.state.stats.dailyGoal = (this.state.stats.dailyGoal || 0) + 1;

            // Show points toast
            this.showPointsToast(points);

            this.checkStreak();
            await this.saveUserData();
        }

        // Track daily completion separately (for daily program progress)
        // This resets each day, unlike completedPhrases which is cumulative
        if (this.state.fromDailyProgram && !this.state.dailyCompletedPhrases.includes(phraseId)) {
            this.state.dailyCompletedPhrases.push(phraseId);
            localStorage.setItem(
                'dailyCompletedPhrases',
                JSON.stringify(this.state.dailyCompletedPhrases)
            );
        }

        // If from Daily Program, navigate to next uncompleted daily phrase
        if (this.state.fromDailyProgram) {
            this.navigateToNextDailyPhrase();
            return;
        }

        // Normal mode: Move to next phrase in category
        if (this.state.currentPhraseIndex < phrases.length - 1) {
            this.state.currentPhraseIndex++;
            this.state.showAnswer = false;
            this.state.audioURL = null;
            this.state.hasListenedToAudio = false;
        }

        this.render();
    }

    /**
     * Find and navigate to the next uncompleted daily phrase
     * Shows completion message if all daily phrases are done
     */
    navigateToNextDailyPhrase() {
        const dailyPhrases = this.state.dailyPhrases;

        // Find next uncompleted daily phrase (check dailyCompletedPhrases, not global)
        const nextIndex = dailyPhrases.findIndex(p => {
            const phraseId = `${p.categoryId}-${p.id}`;
            return !this.state.dailyCompletedPhrases.includes(phraseId);
        });

        if (nextIndex !== -1) {
            // Navigate to next uncompleted phrase
            this.startDailyPhrase(nextIndex);
        } else {
            // All daily phrases completed!
            this.showDailyProgramComplete();
        }
    }

    /**
     * Skip current daily phrase and move to the next one
     * Used when user wants to skip a difficult phrase
     */
    skipDailyPhrase() {
        // Reset writing state
        this.state.writingInput = '';
        this.state.showWritingFeedback = false;
        this.state.writingCorrect = false;

        // Find next daily phrase (can be uncompleted or the next one after current)
        const currentIndex = this.state.currentDailyPhraseIndex;
        const dailyPhrases = this.state.dailyPhrases;

        // Look for next uncompleted phrase after current index (check dailyCompletedPhrases)
        let nextIndex = -1;
        for (let i = currentIndex + 1; i < dailyPhrases.length; i++) {
            const phraseId = `${dailyPhrases[i].categoryId}-${dailyPhrases[i].id}`;
            if (!this.state.dailyCompletedPhrases.includes(phraseId)) {
                nextIndex = i;
                break;
            }
        }

        // If no uncompleted phrase after current, look from the beginning
        if (nextIndex === -1) {
            for (let i = 0; i < currentIndex; i++) {
                const phraseId = `${dailyPhrases[i].categoryId}-${dailyPhrases[i].id}`;
                if (!this.state.dailyCompletedPhrases.includes(phraseId)) {
                    nextIndex = i;
                    break;
                }
            }
        }

        if (nextIndex !== -1) {
            this.startDailyPhrase(nextIndex);
        } else {
            // All other phrases completed, stay on current or show completion
            this.showDailyProgramComplete();
        }
    }

    /**
     * Show completion message when all daily phrases are done
     */
    showDailyProgramComplete() {
        // Reset daily program state
        this.state.fromDailyProgram = false;
        this.state.currentDailyPhraseIndex = -1;
        this.state.showDailyCompletion = true;

        // Clear practice state
        this.state.audioURL = null;
        this.state.hasListenedToAudio = false;
        this.state.speechResult = null;
        this.state.speechSimilarity = null;

        // Track completed day for streak calendar
        this.markDayAsCompleted();

        // Go to home and show completion
        this.state.currentTab = TABS.HOME;
        this.render();

        // Show success message (will auto-dismiss)
        setTimeout(() => {
            this.state.showDailyCompletion = false;
            this.render();
        }, 5000);
    }

    /**
     * Mark today as a completed day (Daily Program 100% done)
     */
    markDayAsCompleted() {
        const today = new Date().toISOString().split('T')[0];

        // Initialize completedDays array if it doesn't exist
        if (!this.state.stats.completedDays) {
            this.state.stats.completedDays = [];
        }

        // Add today if not already added
        if (!this.state.stats.completedDays.includes(today)) {
            this.state.stats.completedDays.push(today);
            this.saveUserData();
        }
    }

    /**
     * Change the calendar month for the streak calendar
     * @param {number} year - Year to display
     * @param {number} month - Month to display (0-indexed)
     */
    changeCalendarMonth(year, month) {
        // Don't allow navigation to future months
        const now = new Date();
        const targetDate = new Date(year, month, 1);
        if (targetDate > now) {
            return;
        }

        this.state.calendarYear = year;
        this.state.calendarMonth = month;
        this.render();
    }

    previousPhrase() {
        if (this.state.currentPhraseIndex > 0) {
            this.state.currentPhraseIndex--;
            this.state.showAnswer = false;
            this.state.audioURL = null;
            this.state.hasListenedToAudio = false;
            // Reset speech recognition state
            this.state.speechResult = null;
            this.state.speechSimilarity = null;
            this.state.speechError = null;
            this.render();
        }
    }

    nextPhrase() {
        const category = this.categories[this.state.currentCategory];
        if (!category) {
            return;
        }

        const phrases = this.getFilteredPhrases(category.phrases);
        if (this.state.currentPhraseIndex < phrases.length - 1) {
            this.state.currentPhraseIndex++;
            this.state.showAnswer = false;
            this.state.audioURL = null;
            this.state.hasListenedToAudio = false;
            // Reset speech recognition state
            this.state.speechResult = null;
            this.state.speechSimilarity = null;
            this.state.speechError = null;
            this.render();
        }
    }

    // =====================
    // Writing Methods
    // =====================

    updateWritingInput(value) {
        this.state.writingInput = value;
    }

    checkWriting() {
        const category = this.categories[this.state.writingCategory || this.state.currentCategory];
        if (!category) {
            return;
        }

        const phrases = this.getFilteredPhrases(category.phrases);
        const phraseIndex = this.state.currentWritingIndex || 0;
        const phrase = phrases[phraseIndex];
        if (!phrase) {
            return;
        }

        const input = this.state.writingInput || '';
        const isCorrect = input.trim().toLowerCase() === phrase.swedish.toLowerCase();

        this.state.showWritingFeedback = true;
        this.state.writingCorrect = isCorrect;

        if (isCorrect) {
            const phraseId = `${this.state.writingCategory || this.state.currentCategory}-${phrase.id}`;
            if (!this.state.completedPhrases.includes(phraseId)) {
                this.state.completedPhrases.push(phraseId);
                const points =
                    phrase.difficulty === 'hard' ? 20 : phrase.difficulty === 'medium' ? 15 : 10;
                this.state.stats.totalPoints += points;
                this.state.stats.level = Math.floor(this.state.stats.totalPoints / 100) + 1;
                this.state.stats.phrasesCompleted = (this.state.stats.phrasesCompleted || 0) + 1;
                this.state.stats.dailyGoal = (this.state.stats.dailyGoal || 0) + 1;
                this.checkStreak();
                this.saveUserData();
            }

            // Track daily completion separately (for daily program progress)
            // This resets each day, unlike completedPhrases which is cumulative
            if (
                this.state.fromDailyProgram &&
                !this.state.dailyCompletedPhrases.includes(phraseId)
            ) {
                this.state.dailyCompletedPhrases.push(phraseId);
                localStorage.setItem(
                    'dailyCompletedPhrases',
                    JSON.stringify(this.state.dailyCompletedPhrases)
                );
            }
        }

        this.render();
    }

    showWritingHint() {
        const category = this.categories[this.state.writingCategory || this.state.currentCategory];
        if (!category) {
            return;
        }

        const phrases = this.getFilteredPhrases(category.phrases);
        const phraseIndex = this.state.currentWritingIndex || 0;
        const phrase = phrases[phraseIndex];
        if (!phrase) {
            return;
        }

        // Show first letters of each word
        const hint = phrase.swedish
            .split(' ')
            .map(word => word[0] + '...')
            .join(' ');
        this.state.writingInput = hint;
        this.render();

        // Focus input
        setTimeout(() => {
            const input = document.getElementById('writingInput');
            if (input) {
                input.focus();
            }
        }, 100);
    }

    nextWritingPhrase() {
        // If from Daily Program and phrase was completed correctly, go to next daily phrase
        if (this.state.fromDailyProgram && this.state.writingCorrect) {
            this.state.writingInput = '';
            this.state.showWritingFeedback = false;
            this.state.writingCorrect = false;
            this.navigateToNextDailyPhrase();
            return;
        }

        // If from Daily Program but answer was wrong, stay on current phrase to retry
        if (this.state.fromDailyProgram && !this.state.writingCorrect) {
            this.state.writingInput = '';
            this.state.showWritingFeedback = false;
            this.state.writingCorrect = false;
            this.render();
            return;
        }

        // Normal mode: go to next phrase in category
        const category = this.categories[this.state.writingCategory || this.state.currentCategory];
        if (!category) {
            return;
        }

        const phrases = this.getFilteredPhrases(category.phrases);
        if ((this.state.currentWritingIndex || 0) < phrases.length - 1) {
            this.state.currentWritingIndex = (this.state.currentWritingIndex || 0) + 1;
        }

        this.state.writingInput = '';
        this.state.showWritingFeedback = false;
        this.state.writingCorrect = false;
        this.render();
    }

    previousWritingPhrase() {
        if ((this.state.currentWritingIndex || 0) > 0) {
            this.state.currentWritingIndex = (this.state.currentWritingIndex || 0) - 1;
            this.state.writingInput = '';
            this.state.showWritingFeedback = false;
            this.state.writingCorrect = false;
            this.render();
        }
    }

    // =====================
    // Flashcard Methods
    // =====================

    flipFlashcard() {
        this.state.showFlashcardAnswer = !this.state.showFlashcardAnswer;
        this.render();
    }

    rateFlashcard(_rating) {
        // Move to next flashcard
        this.nextFlashcard();
    }

    nextFlashcard() {
        const category =
            this.categories[this.state.flashcardCategory || this.state.currentCategory];
        if (!category) {
            return;
        }

        const phrases = this.getFilteredPhrases(category.phrases);
        if ((this.state.currentFlashcardIndex || 0) < phrases.length - 1) {
            this.state.currentFlashcardIndex = (this.state.currentFlashcardIndex || 0) + 1;
        }

        this.state.showFlashcardAnswer = false;
        this.render();
    }

    previousFlashcard() {
        if ((this.state.currentFlashcardIndex || 0) > 0) {
            this.state.currentFlashcardIndex = (this.state.currentFlashcardIndex || 0) - 1;
            this.state.showFlashcardAnswer = false;
            this.render();
        }
    }

    shuffleFlashcards() {
        // Reset to start with shuffled order
        this.state.currentFlashcardIndex = 0;
        this.state.showFlashcardAnswer = false;
        this.render();
    }

    // =====================
    // Grammar Methods
    // =====================

    openGrammarTopic(topicKey) {
        this.state.grammarType = topicKey;
        this.render();
    }

    closeGrammarTopic() {
        this.state.grammarType = null;
        this.render();
    }

    // =====================
    // Grammar Exercises (Daily Program)
    // =====================

    updateGrammarInput(value) {
        this.state.grammarInput = value;
        // Don't re-render to avoid losing focus
    }

    checkGrammarAnswer(selectedOption = null) {
        const exercise = this.state.currentGrammarExercise;
        if (!exercise) {
            return;
        }

        // For multiple choice, use the selected option
        // For text input, use the grammarInput state
        const userAnswer = selectedOption || this.state.grammarInput;
        this.state.grammarInput = userAnswer;

        // Check if answer is correct
        const correctAnswer = exercise.answer.toLowerCase().trim();
        const userAnswerLower = userAnswer.toLowerCase().trim();

        // Check main answer and alternatives
        const isCorrect =
            userAnswerLower === correctAnswer ||
            (exercise.alternatives &&
                exercise.alternatives.some(alt => alt.toLowerCase().trim() === userAnswerLower));

        this.state.grammarCorrect = isCorrect;
        this.state.showGrammarFeedback = true;

        // Award points if correct
        if (isCorrect) {
            const points =
                exercise.difficulty === 'hard' ? 20 : exercise.difficulty === 'medium' ? 15 : 10;
            this.state.stats.totalPoints += points;
            this.state.stats.level = Math.floor(this.state.stats.totalPoints / 100) + 1;
        }

        this.render();
    }

    completeGrammarExercise() {
        const exercise = this.state.currentGrammarExercise;

        // Mark as completed in daily program
        if (this.state.fromDailyProgram && exercise) {
            const exerciseId = `${exercise.categoryId}-${exercise.id}`;
            if (!this.state.dailyCompletedPhrases.includes(exerciseId)) {
                this.state.dailyCompletedPhrases.push(exerciseId);
                localStorage.setItem(
                    'dailyCompletedPhrases',
                    JSON.stringify(this.state.dailyCompletedPhrases)
                );
            }

            // Navigate to next daily item
            this.navigateToNextDailyPhrase();
        } else {
            // Exit exercise mode and go back to grammar overview
            this.exitGrammarExercise();
        }
    }

    exitGrammarExercise() {
        this.state.grammarExerciseMode = false;
        this.state.currentGrammarExercise = null;
        this.state.grammarInput = '';
        this.state.showGrammarFeedback = false;
        this.state.grammarCorrect = false;

        if (this.state.fromDailyProgram) {
            this.state.fromDailyProgram = false;
            this.state.currentTab = TABS.HOME;
            this.state.showDailyProgramModal = true;
        }

        this.render();
    }
}
