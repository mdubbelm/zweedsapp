/**
 * OnboardingView - Inline welcome screen for new users
 *
 * Duolingo-style approach:
 * - Single scrollable page (no modal overlay)
 * - Visual sections with icons showing features
 * - One CTA at the bottom
 * - Fully accessible (just HTML, no special ARIA needed)
 */

/**
 * Render the inline welcome screen
 * @param {object} state - App state with showOnboarding
 * @returns {string} HTML string
 */
export function renderOnboarding(state) {
    if (!state.showOnboarding) {
        return '';
    }

    return `
        <div class="fixed inset-0 z-50 bg-gray-50 overflow-y-auto">
            <article class="max-w-lg mx-auto p-6 pb-32">
                <!-- Hero Section -->
                <header class="text-center mb-10 pt-8">
                    <div class="text-7xl mb-4">😺</div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-3">
                        Welkom bij Svenska Kat!
                    </h1>
                    <p class="text-gray-600 text-lg">
                        Leer Zweeds door dagelijks te oefenen
                    </p>
                </header>

                <!-- Section 1: Daily Program -->
                <section class="mb-8">
                    <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                              style="background-color: var(--scandi-blue);">
                            1
                        </span>
                        Je dagelijks programma
                    </h2>
                    <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-16 h-16 rounded-xl flex items-center justify-center"
                                 style="background-color: var(--scandi-amber);">
                                <i class="fas fa-calendar-check text-2xl text-white"></i>
                            </div>
                            <div>
                                <p class="font-semibold text-gray-800">10 zinnen per dag</p>
                                <p class="text-sm text-gray-500">Automatisch samengesteld</p>
                            </div>
                        </div>
                        <p class="text-gray-600 text-sm leading-relaxed">
                            Elke dag krijg je 10 nieuwe zinnen - een mix van categorieën
                            en moeilijkheidsgraden. Perfect voor consistent leren!
                        </p>
                    </div>
                </section>

                <!-- Section 2: Learning Modes -->
                <section class="mb-8">
                    <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                              style="background-color: var(--scandi-blue);">
                            2
                        </span>
                        Drie manieren om te leren
                    </h2>
                    <div class="grid grid-cols-3 gap-3">
                        <div class="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                            <div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 text-white"
                                 style="background-color: var(--scandi-blue);">
                                <i class="fas fa-microphone text-xl"></i>
                            </div>
                            <p class="text-sm font-semibold text-gray-800">Uitspraak</p>
                            <p class="text-xs text-gray-500 mt-1">Spreek & luister</p>
                        </div>
                        <div class="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                            <div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 text-white"
                                 style="background-color: var(--scandi-green);">
                                <i class="fas fa-clone text-xl"></i>
                            </div>
                            <p class="text-sm font-semibold text-gray-800">Flashcards</p>
                            <p class="text-xs text-gray-500 mt-1">Train geheugen</p>
                        </div>
                        <div class="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                            <div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 text-white"
                                 style="background-color: var(--scandi-teal);">
                                <i class="fas fa-book text-xl"></i>
                            </div>
                            <p class="text-sm font-semibold text-gray-800">Grammatica</p>
                            <p class="text-xs text-gray-500 mt-1">Leer de regels</p>
                        </div>
                    </div>
                    <p class="text-gray-600 text-sm mt-4 leading-relaxed">
                        Oefen uitspraak met je microfoon, train je geheugen met flashcards,
                        of leer grammatica regels. Kies wat bij je past!
                    </p>
                </section>

                <!-- Section 3: Progress & Gamification -->
                <section class="mb-10">
                    <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                              style="background-color: var(--scandi-blue);">
                            3
                        </span>
                        Volg je voortgang
                    </h2>
                    <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div class="flex justify-center gap-6 mb-4">
                            <div class="text-center">
                                <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-1">
                                    <i class="fas fa-trophy text-xl text-yellow-600"></i>
                                </div>
                                <p class="text-xs text-gray-500">Badges</p>
                            </div>
                            <div class="text-center">
                                <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-1">
                                    <i class="fas fa-fire text-xl text-orange-500"></i>
                                </div>
                                <p class="text-xs text-gray-500">Streak</p>
                            </div>
                            <div class="text-center">
                                <div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-1 text-white"
                                     style="background-color: var(--scandi-blue);">
                                    <i class="fas fa-ranking-star text-xl"></i>
                                </div>
                                <p class="text-xs text-gray-500">Ranglijst</p>
                            </div>
                        </div>
                        <p class="text-gray-600 text-sm text-center leading-relaxed">
                            Verdien badges, houd je streak bij en bekijk je positie op de ranglijst!
                        </p>
                    </div>
                </section>

                <!-- CTA Button -->
                <button
                    onclick="app.finishOnboarding()"
                    class="w-full py-4 text-white font-bold rounded-xl text-lg
                           transition-colors shadow-lg"
                    style="background-color: var(--scandi-blue); box-shadow: 0 10px 15px -3px rgba(62, 125, 184, 0.3);">
                    Start met leren
                    <i class="fas fa-arrow-right ml-2"></i>
                </button>

                <!-- Tip -->
                <p class="text-center text-sm text-gray-500 mt-4">
                    <i class="fas fa-lightbulb mr-1"></i>
                    Je kunt deze uitleg terugzien in Instellingen
                </p>
            </article>
        </div>
    `;
}
