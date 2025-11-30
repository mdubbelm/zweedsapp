import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        include: ['tests/**/*.test.js', 'tests/**/*.spec.js'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'lcov'],
            reportsDirectory: './coverage',
            include: ['src/js/**/*.js'],
            exclude: ['src/js/app.js']
        },
        testTimeout: 10000,
        setupFiles: ['./tests/setup.js']
    }
});
