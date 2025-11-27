import { defineConfig } from 'vite';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'icons/*.svg'],
            manifest: {
                name: 'Svenska Kat',
                short_name: 'Svenska Kat',
                description: 'Leer Zweeds met gamification - Zweeds leren is nu leuker dan ooit!',
                theme_color: '#3E7DB8',
                background_color: '#F5F7FA',
                display: 'standalone',
                orientation: 'portrait',
                scope: './',
                start_url: './',
                lang: 'nl',
                icons: [
                    {
                        src: 'icons/icon-192.svg',
                        sizes: '192x192',
                        type: 'image/svg+xml',
                        purpose: 'maskable any'
                    },
                    {
                        src: 'icons/icon-512.svg',
                        sizes: '512x512',
                        type: 'image/svg+xml',
                        purpose: 'maskable any'
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,svg,woff2}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com/,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'google-fonts-stylesheets'
                        }
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.gstatic\.com/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-webfonts',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                            }
                        }
                    },
                    {
                        urlPattern: /^https:\/\/.*\.supabase\.co/,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'supabase-api',
                            networkTimeoutSeconds: 10,
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60 * 24 // 1 day
                            }
                        }
                    }
                ]
            }
        })
    ],

    root: 'src',
    publicDir: '../public',
    envDir: '..',  // Load .env from project root, not from src/

    server: {
        port: 3000,
        open: true,
        host: true
    },

    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html')
            }
        }
    },

    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@components': resolve(__dirname, 'src/js/components'),
            '@services': resolve(__dirname, 'src/js/services'),
            '@utils': resolve(__dirname, 'src/js/utils'),
            '@data': resolve(__dirname, 'src/js/data'),
            '@styles': resolve(__dirname, 'src/styles')
        }
    },

    css: {
        devSourcemap: true
    },

    define: {
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
    }
});
