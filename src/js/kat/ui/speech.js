/**
 * Zweedse uitspraak via de spraaksynthese van de browser.
 */

let voice = null;

function pickVoice() {
    if (!('speechSynthesis' in window)) {
        return null;
    }
    const voices = window.speechSynthesis.getVoices();
    return (
        voices.find(v => v.lang === 'sv-SE') ||
        voices.find(v => v.lang && v.lang.startsWith('sv')) ||
        null
    );
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    voice = pickVoice();
    window.speechSynthesis.onvoiceschanged = () => {
        voice = pickVoice();
    };
}

export function canSpeak() {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speak(text, { rate = 0.9 } = {}) {
    if (!canSpeak()) {
        return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'sv-SE';
    u.rate = rate;
    if (voice) {
        u.voice = voice;
    }
    window.speechSynthesis.speak(u);
}
