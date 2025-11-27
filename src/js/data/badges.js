/**
 * Badge definitions for Svenska Kat
 * Achievement system with various badge types
 */

export const badges = {
    firstSteps: {
        id: 'firstSteps',
        name: 'Eerste Stappen',
        icon: 'fa-shoe-prints',
        color: 'text-blue-700',
        description: 'Voltooi je eerste zin',
        requirement: 1,
        type: 'phrases'
    },
    beginner: {
        id: 'beginner',
        name: 'Beginner',
        icon: 'fa-seedling',
        color: 'text-green-700',
        description: 'Voltooi 10 zinnen',
        requirement: 10,
        type: 'phrases'
    },
    intermediate: {
        id: 'intermediate',
        name: 'Gevorderde',
        icon: 'fa-leaf',
        color: 'text-green-700',
        description: 'Voltooi 25 zinnen',
        requirement: 25,
        type: 'phrases'
    },
    expert: {
        id: 'expert',
        name: 'Expert',
        icon: 'fa-tree',
        color: 'text-green-700',
        description: 'Voltooi 50 zinnen',
        requirement: 50,
        type: 'phrases'
    },
    perfectionist: {
        id: 'perfectionist',
        name: 'Perfectionist',
        icon: 'fa-gem',
        color: 'text-blue-700',
        description: 'Haal 10 perfecte scores',
        requirement: 10,
        type: 'perfect'
    },
    dedicated: {
        id: 'dedicated',
        name: 'Toegewijd',
        icon: 'fa-fire',
        color: 'text-red-600',
        description: '5 dagen streak',
        requirement: 5,
        type: 'streak'
    },
    onFire: {
        id: 'onFire',
        name: 'On Fire',
        icon: 'fa-fire-flame-curved',
        color: 'text-red-600',
        description: '10 dagen streak',
        requirement: 10,
        type: 'streak'
    },
    unstoppable: {
        id: 'unstoppable',
        name: 'Onstuitbaar',
        icon: 'fa-bolt',
        color: 'text-amber-600',
        description: '20 dagen streak',
        requirement: 20,
        type: 'streak'
    },
    categoryMaster: {
        id: 'categoryMaster',
        name: 'Categorie Meester',
        icon: 'fa-bullseye',
        color: 'text-blue-700',
        description: 'Voltooi alle zinnen in een categorie',
        requirement: 1,
        type: 'category'
    },
    allRounder: {
        id: 'allRounder',
        name: 'Allrounder',
        icon: 'fa-star',
        color: 'text-amber-600',
        description: 'Voltooi alle categorieën',
        requirement: 7,
        type: 'allCategories'
    },
    speedster: {
        id: 'speedster',
        name: 'Speedster',
        icon: 'fa-rocket',
        color: 'text-blue-700',
        description: 'Voltooi 20 zinnen op één dag',
        requirement: 20,
        type: 'dailyPhrases'
    },
    levelUp: {
        id: 'levelUp',
        name: 'Level Up',
        icon: 'fa-chart-line',
        color: 'text-green-700',
        description: 'Bereik level 5',
        requirement: 5,
        type: 'level'
    },
    master: {
        id: 'master',
        name: 'Meester',
        icon: 'fa-trophy',
        color: 'text-amber-600',
        description: 'Bereik level 10',
        requirement: 10,
        type: 'level'
    }
};
