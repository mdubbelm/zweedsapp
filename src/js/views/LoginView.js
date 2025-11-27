/**
 * Login View
 * Renders the login/signup form
 */

/**
 * Render login view
 * @returns {string} HTML string
 */
export function renderLogin() {
    return `
        <div class="min-h-screen flex items-center justify-center p-4">
            <div class="glass-effect rounded-2xl p-8 card-shadow max-w-md w-full animate-slideUp">
                <div class="text-center mb-8">
                    <h1 class="text-4xl font-bold gradient-text mb-2">Svenska Kat 🐱</h1>
                    <p class="text-gray-600">Leer Zweeds met gamification</p>
                </div>

                <form class="space-y-4" action="#" method="post" onsubmit="event.preventDefault(); app.handleLogin();">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2" for="email">Email</label>
                        <input type="email" id="email" name="email" autocomplete="username" placeholder="jouw@email.com"
                               required
                               class="w-full p-4 border-2 border-gray-200 rounded-xl font-medium">
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2" for="password">Wachtwoord</label>
                        <input type="password" id="password" name="password" autocomplete="current-password" placeholder="••••••••"
                               required
                               class="w-full p-4 border-2 border-gray-200 rounded-xl font-medium">
                    </div>

                    <div class="flex items-center gap-2">
                        <input type="checkbox" id="rememberMe"
                               class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                               checked>
                        <label for="rememberMe" class="text-sm text-gray-700 cursor-pointer">
                            Blijf ingelogd op dit apparaat
                        </label>
                    </div>

                    <div id="displayNameField" style="display: none;">
                        <label class="block text-sm font-semibold text-gray-700 mb-2" for="displayName">Naam (voor leaderboard)</label>
                        <input type="text" id="displayName" name="displayName" autocomplete="name" placeholder="Jouw naam"
                               class="w-full p-4 border-2 border-gray-200 rounded-xl font-medium">
                    </div>

                    <button type="submit"
                            class="w-full py-4 rounded-xl font-bold text-white card-hover card-shadow"
                            style="background: var(--scandi-blue);">
                        <i class="fas fa-sign-in-alt mr-2"></i>Inloggen
                    </button>
                </form>

                <button onclick="app.toggleSignUp(event)"
                        class="w-full py-4 glass-effect rounded-xl font-bold text-gray-700 card-hover card-shadow mt-4">
                    <i class="fas fa-user-plus mr-2"></i>Nog geen account? Registreer
                </button>

                <button onclick="app.resetPassword()"
                        class="w-full py-2 text-sm text-gray-600 hover:text-blue-600 font-semibold mt-2">
                    <i class="fas fa-key mr-1"></i>Wachtwoord vergeten?
                </button>

                <div class="mt-6 text-center text-sm text-gray-600">
                    <p>✨ Sync tussen apparaten</p>
                    <p>🏆 Leaderboard met vrienden</p>
                    <p>📊 Cloud backup van je voortgang</p>
                </div>
            </div>
        </div>
    `;
}

/**
 * Render setup view (when Supabase is not configured)
 * @returns {string} HTML string
 */
export function renderSetup() {
    return `
        <div class="min-h-screen flex items-center justify-center p-4">
            <div class="glass-effect rounded-2xl p-8 card-shadow max-w-md w-full animate-slideUp">
                <div class="text-center mb-6">
                    <h1 class="text-4xl font-bold gradient-text mb-2">Svenska Kat 🐱</h1>
                    <p class="text-gray-600">Configuratie vereist</p>
                </div>

                <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <div class="flex items-start gap-3">
                        <i class="fas fa-exclamation-triangle text-yellow-600 mt-1"></i>
                        <div>
                            <p class="font-semibold text-yellow-800">Supabase niet geconfigureerd</p>
                            <p class="text-sm text-yellow-700 mt-1">
                                Om de app te gebruiken moet je Supabase instellen.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="space-y-4 text-sm text-gray-600">
                    <p><strong>Stap 1:</strong> Ga naar <a href="https://supabase.com" target="_blank" class="text-blue-600 hover:underline">supabase.com</a> en maak een gratis account</p>
                    <p><strong>Stap 2:</strong> Maak een nieuw project aan</p>
                    <p><strong>Stap 3:</strong> Kopieer je Project URL en anon key</p>
                    <p><strong>Stap 4:</strong> Voeg ze toe aan je <code class="bg-gray-100 px-2 py-1 rounded">.env</code> bestand</p>
                </div>

                <div class="mt-6 p-4 bg-gray-50 rounded-xl">
                    <p class="text-xs font-mono text-gray-600">
                        VITE_SUPABASE_URL=https://xxx.supabase.co<br>
                        VITE_SUPABASE_ANON_KEY=eyJ...
                    </p>
                </div>
            </div>
        </div>
    `;
}

/**
 * Toggle between login and signup mode
 * @param {Event} event - Click event
 */
export function toggleSignUp(event) {
    const displayNameField = document.getElementById('displayNameField');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const displayNameInput = document.getElementById('displayName');
    const button = event.target;

    if (displayNameField.style.display === 'none') {
        // Switch to signup mode
        displayNameField.style.display = 'block';
        emailField.setAttribute('autocomplete', 'email');
        passwordField.setAttribute('autocomplete', 'new-password');
        displayNameInput.setAttribute('required', '');
        button.innerHTML = '<i class="fas fa-arrow-left mr-2"></i>Terug naar inloggen';
        button.previousElementSibling.innerHTML =
            '<i class="fas fa-user-plus mr-2"></i>Registreren';
    } else {
        // Switch to login mode
        displayNameField.style.display = 'none';
        emailField.setAttribute('autocomplete', 'username');
        passwordField.setAttribute('autocomplete', 'current-password');
        displayNameInput.removeAttribute('required');
        button.innerHTML = '<i class="fas fa-user-plus mr-2"></i>Nog geen account? Registreer';
        button.previousElementSibling.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Inloggen';
    }
}
