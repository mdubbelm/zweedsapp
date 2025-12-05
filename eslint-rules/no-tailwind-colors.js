/**
 * ESLint rule: no-tailwind-colors
 *
 * Blocks usage of Tailwind color classes that are not part of the Scandinavian design system.
 * Forces developers to use CSS variables instead.
 *
 * Forbidden patterns:
 * - bg-{color}-{shade} (e.g., bg-amber-100, bg-blue-500)
 * - text-{color}-{shade} (e.g., text-amber-600, text-blue-700)
 *
 * Allowed:
 * - bg-white, bg-gray-50, bg-gray-100
 * - text-gray-{500-900}, text-white
 * - border-gray-*
 */

const FORBIDDEN_COLOR_PREFIXES = [
    'amber',
    'yellow',
    'orange',
    'red',
    'pink',
    'rose',
    'purple',
    'violet',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'emerald',
    'green',
    'lime',
    'sky',
    'fuchsia',
];

// Regex pattern to match forbidden Tailwind color classes
// Matches: bg-amber-100, text-blue-500, etc.
const FORBIDDEN_PATTERN = new RegExp(
    `\\b(bg|text)-(${FORBIDDEN_COLOR_PREFIXES.join('|')})-(\\d{2,3})\\b`,
    'g'
);

export default {
    meta: {
        type: 'problem',
        docs: {
            description:
                'Disallow Tailwind color classes - use CSS variables instead',
            category: 'Best Practices',
            recommended: true,
        },
        messages: {
            forbiddenTailwindColor:
                'Forbidden Tailwind color class "{{className}}". Use CSS variables instead (e.g., var(--scandi-blue), var(--scandi-amber)). See CLAUDE.md for allowed colors.',
        },
        schema: [],
    },

    create(context) {
        return {
            // Check template literals (most common in this codebase)
            TemplateLiteral(node) {
                node.quasis.forEach((quasi) => {
                    const text = quasi.value.raw;
                    let match;

                    FORBIDDEN_PATTERN.lastIndex = 0; // Reset regex state
                    while ((match = FORBIDDEN_PATTERN.exec(text)) !== null) {
                        context.report({
                            node: quasi,
                            messageId: 'forbiddenTailwindColor',
                            data: {
                                className: match[0],
                            },
                        });
                    }
                });
            },

            // Check regular strings
            Literal(node) {
                if (typeof node.value !== 'string') {
                    return;
                }

                let match;
                FORBIDDEN_PATTERN.lastIndex = 0;
                while ((match = FORBIDDEN_PATTERN.exec(node.value)) !== null) {
                    context.report({
                        node,
                        messageId: 'forbiddenTailwindColor',
                        data: {
                            className: match[0],
                        },
                    });
                }
            },
        };
    },
};
