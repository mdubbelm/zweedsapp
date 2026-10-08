/**
 * iOS-toetsenbord: Safari maakt het zichtbare deel kleiner maar laat de
 * pagina even groot. We houden de zichtbare hoogte bij in CSS-variabelen,
 * zodat het vraagscherm (en de Controleer-knop) boven het toetsenbord blijft.
 */

export function trackViewport() {
    const vv = window.visualViewport;
    const root = document.documentElement;
    const set = () => {
        const h = vv ? vv.height : window.innerHeight;
        root.style.setProperty('--vvh', `${h}px`);
        root.style.setProperty('--vvt', `${vv ? vv.offsetTop : 0}px`);
        // Toetsenbord open: het vraagscherm wordt compacter.
        root.classList.toggle('kb-open', h < window.innerHeight - 150);
    };
    set();
    if (vv) {
        vv.addEventListener('resize', set);
        vv.addEventListener('scroll', set);
    }
    window.addEventListener('resize', set);
    // Na het sluiten van het toetsenbord laat iOS vaste balken soms verschoven
    // staan. Even opnieuw scrollen dwingt een nieuwe layout af.
    document.addEventListener('focusin', e => {
        if (e.target.matches('input')) {
            setTimeout(() => e.target.scrollIntoView({ block: 'nearest' }), 300);
        }
    });
    document.addEventListener('focusout', () => {
        setTimeout(() => {
            window.scrollTo(window.scrollX, window.scrollY);
            set();
        }, 60);
    });
}

/** Toetsenbord dicht en pagina terug naar boven, bij het verlaten van een scherm. */
export function settle() {
    if (document.activeElement && document.activeElement.blur) {
        document.activeElement.blur();
    }
    window.scrollTo(0, 0);
}
