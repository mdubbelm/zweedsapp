import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import noTailwindColors from './eslint-rules/no-tailwind-colors.js';

export default [
    js.configs.recommended,
    prettierConfig,
    {
        files: ['src/**/*.js'],
        plugins: {
            prettier: prettier,
            'svenska-kat': {
                rules: {
                    'no-tailwind-colors': noTailwindColors
                }
            }
        },
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                window: 'readonly',
                document: 'readonly',
                console: 'readonly',
                localStorage: 'readonly',
                sessionStorage: 'readonly',
                navigator: 'readonly',
                alert: 'readonly',
                confirm: 'readonly',
                setTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                clearTimeout: 'readonly',
                Event: 'readonly',
                Blob: 'readonly',
                URL: 'readonly',
                HTMLElement: 'readonly',
                Audio: 'readonly',
                MediaRecorder: 'readonly',
                SpeechSynthesisUtterance: 'readonly',
                speechSynthesis: 'readonly',
                __APP_VERSION__: 'readonly'
            }
        },
        rules: {
            'prettier/prettier': 'error',
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'no-console': 'off',
            eqeqeq: ['error', 'always'],
            curly: ['error', 'all'],
            'no-var': 'error',
            'prefer-const': 'error',
            'no-duplicate-imports': 'error',
            // TODO: Change to 'error' after fixing all violations (see issue #91)
            'svenska-kat/no-tailwind-colors': 'warn'
        }
    },
    {
        ignores: ['node_modules/**', 'dist/**', '*.min.js', 'public/**']
    }
];
