/**
 * Tests for badge data
 */

import { describe, it, expect } from 'vitest';
import { badges } from '../src/js/data/badges.js';

describe('Badge Data', () => {
    it('should have all expected badges', () => {
        const expectedBadges = [
            'firstSteps',
            'beginner',
            'intermediate',
            'expert',
            'perfectionist',
            'dedicated',
            'onFire',
            'unstoppable',
            'categoryMaster',
            'allRounder',
            'speedster',
            'levelUp',
            'master'
        ];

        expectedBadges.forEach(badgeId => {
            expect(badges).toHaveProperty(badgeId);
        });
    });

    it('should have required properties for each badge', () => {
        Object.entries(badges).forEach(([id, badge]) => {
            expect(badge).toHaveProperty('id');
            expect(badge).toHaveProperty('name');
            expect(badge).toHaveProperty('icon');
            expect(badge).toHaveProperty('color');
            expect(badge).toHaveProperty('description');
            expect(badge).toHaveProperty('requirement');
            expect(badge).toHaveProperty('type');
            expect(badge.id).toBe(id);
        });
    });

    it('should have valid badge types', () => {
        const validTypes = [
            'phrases',
            'perfect',
            'streak',
            'category',
            'allCategories',
            'dailyPhrases',
            'level'
        ];

        Object.values(badges).forEach(badge => {
            expect(validTypes).toContain(badge.type);
        });
    });

    it('should have positive requirement values', () => {
        Object.values(badges).forEach(badge => {
            expect(badge.requirement).toBeGreaterThan(0);
        });
    });

    it('should have Font Awesome icon classes', () => {
        Object.values(badges).forEach(badge => {
            expect(badge.icon).toMatch(/^fa-/);
        });
    });
});
