/**
 * Svenska Kat - Main Entry Point
 * Swedish language learning PWA
 */

// Import styles
import './styles/main.css';

// Import app
import { SwedishApp } from './js/app.js';

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Create app instance (SwedishApp constructor sets window.app = this)
    new SwedishApp();
});

// PWA Update handling (will be managed by vite-plugin-pwa)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // vite-plugin-pwa handles service worker registration automatically
        console.log('PWA ready');
    });
}
