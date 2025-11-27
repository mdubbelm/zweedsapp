/**
 * Vitest test setup
 * Configures mocks and global test utilities
 */

import { vi, beforeEach } from 'vitest';

// Mock localStorage
const localStorageMock = {
    store: {},
    getItem: vi.fn(key => localStorageMock.store[key] || null),
    setItem: vi.fn((key, value) => {
        localStorageMock.store[key] = value;
    }),
    removeItem: vi.fn(key => {
        delete localStorageMock.store[key];
    }),
    clear: vi.fn(() => {
        localStorageMock.store = {};
    })
};

Object.defineProperty(global, 'localStorage', {
    value: localStorageMock
});

// Mock sessionStorage
const sessionStorageMock = {
    store: {},
    getItem: vi.fn(key => sessionStorageMock.store[key] || null),
    setItem: vi.fn((key, value) => {
        sessionStorageMock.store[key] = value;
    }),
    removeItem: vi.fn(key => {
        delete sessionStorageMock.store[key];
    }),
    clear: vi.fn(() => {
        sessionStorageMock.store = {};
    })
};

Object.defineProperty(global, 'sessionStorage', {
    value: sessionStorageMock
});

// Reset mocks before each test
beforeEach(() => {
    localStorageMock.store = {};
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();

    sessionStorageMock.store = {};
    sessionStorageMock.getItem.mockClear();
    sessionStorageMock.setItem.mockClear();
    sessionStorageMock.removeItem.mockClear();
    sessionStorageMock.clear.mockClear();
});

// Mock import.meta.env
vi.stubGlobal('import', {
    meta: {
        env: {
            DEV: true,
            VITE_SUPABASE_URL: 'https://test.supabase.co',
            VITE_SUPABASE_ANON_KEY: 'test-key'
        }
    }
});
