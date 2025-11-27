/**
 * Tests for phrase data and utility functions
 */

import { describe, it, expect } from 'vitest';
import { categories, getAllPhrases, getFilteredPhrases, getTotalPhraseCount } from '../src/js/data/phrases.js';

describe('Phrase Data', () => {
    it('should have 8 categories', () => {
        const categoryCount = Object.keys(categories).length;
        expect(categoryCount).toBe(8);
    });

    it('should have required properties for each category', () => {
        Object.entries(categories).forEach(([id, category]) => {
            expect(category).toHaveProperty('name');
            expect(category).toHaveProperty('icon');
            expect(category).toHaveProperty('color');
            expect(category).toHaveProperty('phrases');
            expect(Array.isArray(category.phrases)).toBe(true);
        });
    });

    it('should have required properties for each phrase', () => {
        Object.values(categories).forEach(category => {
            category.phrases.forEach(phrase => {
                expect(phrase).toHaveProperty('id');
                expect(phrase).toHaveProperty('swedish');
                expect(phrase).toHaveProperty('dutch');
                expect(phrase).toHaveProperty('pronunciation');
                expect(phrase).toHaveProperty('difficulty');
                expect(['easy', 'medium', 'hard']).toContain(phrase.difficulty);
            });
        });
    });

    it('should have unique phrase IDs within each category', () => {
        Object.values(categories).forEach(category => {
            const ids = category.phrases.map(p => p.id);
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(ids.length);
        });
    });
});

describe('getAllPhrases', () => {
    it('should return all phrases from all categories', () => {
        const allPhrases = getAllPhrases();
        expect(allPhrases.length).toBeGreaterThan(200);
    });

    it('should include category info with each phrase', () => {
        const allPhrases = getAllPhrases();
        allPhrases.forEach(phrase => {
            expect(phrase).toHaveProperty('categoryId');
            expect(phrase).toHaveProperty('categoryName');
        });
    });
});

describe('getFilteredPhrases', () => {
    it('should return all phrases when no filter is applied', () => {
        const phrases = getFilteredPhrases('greetings', null);
        expect(phrases.length).toBe(30);
    });

    it('should filter easy phrases only', () => {
        const phrases = getFilteredPhrases('greetings', 'easy');
        phrases.forEach(phrase => {
            expect(phrase.difficulty).toBe('easy');
        });
    });

    it('should filter easy and medium phrases', () => {
        const phrases = getFilteredPhrases('greetings', 'easy-medium');
        phrases.forEach(phrase => {
            expect(['easy', 'medium']).toContain(phrase.difficulty);
        });
    });

    it('should return empty array for invalid category', () => {
        const phrases = getFilteredPhrases('invalid-category', null);
        expect(phrases).toEqual([]);
    });
});

describe('getTotalPhraseCount', () => {
    it('should return total phrase count', () => {
        const count = getTotalPhraseCount();
        expect(count).toBeGreaterThan(200);
    });
});
