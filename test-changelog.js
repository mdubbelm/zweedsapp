#!/usr/bin/env node

/**
 * CHANGELOG.md Validation Test
 *
 * This script validates the CHANGELOG.md file for:
 * - Format & structure (Keep a Changelog format)
 * - Version numbers (semantic versioning, descending order)
 * - Dates & consistency (YYYY-MM-DD format)
 * - Content completeness (each version has change categories)
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
};

class ChangelogValidator {
    constructor(filePath) {
        this.filePath = filePath;
        this.errors = [];
        this.warnings = [];
        this.content = '';
        this.lines = [];
    }

    // Read the changelog file
    readFile() {
        try {
            this.content = fs.readFileSync(this.filePath, 'utf-8');
            this.lines = this.content.split('\n');
            return true;
        } catch (error) {
            this.errors.push(`Failed to read file: ${error.message}`);
            return false;
        }
    }

    // Validate Keep a Changelog format
    validateFormat() {
        console.log(`\n${colors.blue}Validating format & structure...${colors.reset}`);

        // Check for title
        if (!this.lines[0] || !this.lines[0].match(/^#\s+Changelog/i)) {
            this.errors.push('Missing or incorrect title. Expected "# Changelog" as first line');
        }

        // Check for Keep a Changelog reference
        const hasKeepAChangelogRef = this.content.includes('keepachangelog.com');
        if (!hasKeepAChangelogRef) {
            this.warnings.push('No reference to keepachangelog.com found');
        }

        // Check for Semantic Versioning reference
        const hasSemVerRef = this.content.includes('semver.org');
        if (!hasSemVerRef) {
            this.warnings.push('No reference to semver.org found');
        }

        console.log(`  ✓ Format structure validated`);
    }

    // Validate version numbers
    validateVersionNumbers() {
        console.log(`\n${colors.blue}Validating version numbers...${colors.reset}`);

        // Regex for semantic versioning
        const versionRegex = /^##\s+\[(\d+\.\d+\.\d+)\]\s+-\s+(\d{4}-\d{2}-\d{2})/;
        const versions = [];

        this.lines.forEach((line, index) => {
            const match = line.match(versionRegex);
            if (match) {
                const version = match[1];
                const date = match[2];
                const lineNum = index + 1;

                // Validate semantic versioning format
                const semverParts = version.split('.');
                if (semverParts.length !== 3) {
                    this.errors.push(`Line ${lineNum}: Invalid semantic version format "${version}"`);
                } else {
                    const [major, minor, patch] = semverParts.map(Number);
                    if (isNaN(major) || isNaN(minor) || isNaN(patch)) {
                        this.errors.push(`Line ${lineNum}: Version parts must be numbers "${version}"`);
                    }
                }

                versions.push({ version, date, lineNum });
            }
        });

        // Check if versions are in descending order
        for (let i = 0; i < versions.length - 1; i++) {
            const current = this.parseVersion(versions[i].version);
            const next = this.parseVersion(versions[i + 1].version);

            if (this.compareVersions(current, next) <= 0) {
                this.errors.push(
                    `Versions not in descending order: ${versions[i].version} (line ${versions[i].lineNum}) ` +
                    `should be greater than ${versions[i + 1].version} (line ${versions[i + 1].lineNum})`
                );
            }
        }

        console.log(`  ✓ Found ${versions.length} version entries`);
        console.log(`  ✓ Version numbers validated`);

        return versions;
    }

    // Parse version string to object
    parseVersion(versionStr) {
        const [major, minor, patch] = versionStr.split('.').map(Number);
        return { major, minor, patch };
    }

    // Compare two version objects (-1: v1 < v2, 0: equal, 1: v1 > v2)
    compareVersions(v1, v2) {
        if (v1.major !== v2.major) return v1.major - v2.major;
        if (v1.minor !== v2.minor) return v1.minor - v2.minor;
        return v1.patch - v2.patch;
    }

    // Validate dates
    validateDates(versions) {
        console.log(`\n${colors.blue}Validating dates...${colors.reset}`);

        const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

        versions.forEach(({ version, date, lineNum }) => {
            // Check date format
            if (!dateRegex.test(date)) {
                this.errors.push(`Line ${lineNum}: Invalid date format "${date}" (expected YYYY-MM-DD)`);
            } else {
                // Check if date is valid (e.g., not February 30)
                const dateObj = new Date(date);
                const [year, month, day] = date.split('-').map(Number);

                if (dateObj.getFullYear() !== year ||
                    dateObj.getMonth() + 1 !== month ||
                    dateObj.getDate() !== day) {
                    this.errors.push(`Line ${lineNum}: Invalid date "${date}" (date doesn't exist)`);
                }

                // Check if date is not in the future
                if (dateObj > new Date()) {
                    this.warnings.push(`Line ${lineNum}: Date "${date}" for version ${version} is in the future`);
                }
            }
        });

        // Check if dates are in descending order (newer versions should have newer/equal dates)
        for (let i = 0; i < versions.length - 1; i++) {
            const currentDate = new Date(versions[i].date);
            const nextDate = new Date(versions[i + 1].date);

            if (currentDate < nextDate) {
                this.warnings.push(
                    `Date order inconsistency: Version ${versions[i].version} (${versions[i].date}) ` +
                    `has an earlier date than version ${versions[i + 1].version} (${versions[i + 1].date})`
                );
            }
        }

        console.log(`  ✓ Dates validated`);
    }

    // Validate content completeness
    validateContent() {
        console.log(`\n${colors.blue}Validating content completeness...${colors.reset}`);

        const versionRegex = /^##\s+\[(\d+\.\d+\.\d+)\]/;
        const categoryRegex = /^###\s+(Added|Changed|Deprecated|Removed|Fixed|Security|Technical)/;

        let currentVersion = null;
        let currentCategories = [];
        const versionContent = new Map();

        this.lines.forEach((line, index) => {
            const versionMatch = line.match(versionRegex);
            const categoryMatch = line.match(categoryRegex);

            if (versionMatch) {
                // Save previous version's categories
                if (currentVersion) {
                    versionContent.set(currentVersion, currentCategories);
                }

                currentVersion = versionMatch[1];
                currentCategories = [];
            } else if (categoryMatch && currentVersion) {
                currentCategories.push(categoryMatch[1]);
            }
        });

        // Save last version's categories
        if (currentVersion) {
            versionContent.set(currentVersion, currentCategories);
        }

        // Check each version has at least one category
        versionContent.forEach((categories, version) => {
            if (categories.length === 0) {
                this.errors.push(`Version ${version} has no change categories (Added, Changed, Fixed, etc.)`);
            }
        });

        // Check for empty sections (category with no content)
        let lastCategory = null;
        let hasContent = false;

        this.lines.forEach((line, index) => {
            if (line.match(categoryRegex)) {
                if (lastCategory && !hasContent) {
                    this.warnings.push(`Line ${index}: Category "${lastCategory}" appears to be empty`);
                }
                lastCategory = line.match(categoryRegex)[1];
                hasContent = false;
            } else if (lastCategory && line.trim().startsWith('-')) {
                hasContent = true;
            }
        });

        console.log(`  ✓ Found ${versionContent.size} versions with content`);
        console.log(`  ✓ Content completeness validated`);
    }

    // Run all validations
    validate() {
        console.log(`${colors.bright}=== CHANGELOG.md Validation ===${colors.reset}`);
        console.log(`File: ${this.filePath}\n`);

        if (!this.readFile()) {
            return false;
        }

        this.validateFormat();
        const versions = this.validateVersionNumbers();
        this.validateDates(versions);
        this.validateContent();

        return true;
    }

    // Print results
    printResults() {
        console.log(`\n${colors.bright}=== Results ===${colors.reset}`);

        if (this.errors.length === 0 && this.warnings.length === 0) {
            console.log(`${colors.green}${colors.bright}✓ All tests passed!${colors.reset}`);
            console.log(`${colors.green}  No errors or warnings found.${colors.reset}`);
            return true;
        }

        if (this.errors.length > 0) {
            console.log(`\n${colors.red}${colors.bright}✗ Errors (${this.errors.length}):${colors.reset}`);
            this.errors.forEach((error, index) => {
                console.log(`${colors.red}  ${index + 1}. ${error}${colors.reset}`);
            });
        }

        if (this.warnings.length > 0) {
            console.log(`\n${colors.yellow}⚠ Warnings (${this.warnings.length}):${colors.reset}`);
            this.warnings.forEach((warning, index) => {
                console.log(`${colors.yellow}  ${index + 1}. ${warning}${colors.reset}`);
            });
        }

        console.log(); // Empty line
        return this.errors.length === 0;
    }
}

// Main execution
function main() {
    const changelogPath = path.join(__dirname, 'CHANGELOG.md');
    const validator = new ChangelogValidator(changelogPath);

    validator.validate();
    const success = validator.printResults();

    // Exit with appropriate code
    process.exit(success ? 0 : 1);
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = ChangelogValidator;
