/**
 * Nakijken van een getypt antwoord.
 *
 * Er is geen "fout": een antwoord is goed of bijna. Bij bijna geeft de
 * reden aan wat er scheelde, zodat de feedback één concrete zin kan geven.
 * Een zelfstandig naamwoord zonder en/ett is bijna, nooit goed.
 */

const DIACRITICS = { å: 'a', ä: 'a', ö: 'o', é: 'e' };

export function normalize(text) {
    return String(text ?? '')
        .toLowerCase()
        .replace(/[‘’“”]/g, "'")
        .replace(/[.!?,;:]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function stripDiacritics(text) {
    return text.replace(/[åäöé]/g, ch => DIACRITICS[ch]);
}

function stripAtt(text) {
    return text.replace(/^att /, '');
}

function editDistance(a, b) {
    if (Math.abs(a.length - b.length) > 1) {
        return 2;
    }
    const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
        let diag = prev[0];
        prev[0] = i;
        for (let j = 1; j <= b.length; j++) {
            const tmp = prev[j];
            prev[j] = Math.min(
                prev[j] + 1,
                prev[j - 1] + 1,
                diag + (a[i - 1] === b[j - 1] ? 0 : 1)
            );
            diag = tmp;
        }
    }
    return prev[b.length];
}

/** Het antwoord dat de app verwacht, zoals het op de kaart staat. */
export function expectedAnswer(item) {
    if (item.kind === 'noun') {
        return `${item.article} ${item.sv}`;
    }
    if (item.kind === 'gap' || item.kind === 'form') {
        return item.answer;
    }
    if (item.kind === 'truefalse') {
        return item.isTrue ? item.sv : item.correction;
    }
    return item.sv;
}

export function acceptedAnswers(item) {
    return [expectedAnswer(item), ...(item.accept || [])].map(normalize);
}

/**
 * @returns {{ ok: boolean, reason: null|'lidwoord'|'ander-lidwoord'|'tekens'|'typo'|'anders' }}
 */
export function checkAnswer(item, given) {
    const answer = normalize(given);
    const accepted = acceptedAnswers(item);

    if (accepted.includes(answer)) {
        return { ok: true, reason: null };
    }
    // Werkwoorden mogen met of zonder 'att'.
    if (accepted.some(a => stripAtt(a) === stripAtt(answer))) {
        return { ok: true, reason: null };
    }

    if (item.kind === 'noun') {
        const bare = normalize(item.sv);
        const other = item.article === 'en' ? 'ett' : 'en';
        if (answer === bare) {
            return { ok: false, reason: 'lidwoord' };
        }
        if (answer === `${other} ${bare}`) {
            return { ok: false, reason: 'ander-lidwoord' };
        }
    }

    if (accepted.some(a => stripDiacritics(a) === stripDiacritics(answer))) {
        return { ok: false, reason: 'tekens' };
    }

    if (answer.length >= 5 && accepted.some(a => editDistance(a, answer) === 1)) {
        return { ok: false, reason: 'typo' };
    }

    return { ok: false, reason: 'anders' };
}

/** Eén korte zin die bij "Bijna" past. Nooit het woord fout. */
export function nudge(item, reason) {
    switch (reason) {
        case 'lidwoord':
            return `Het lidwoord hoort erbij: ${item.article} ${item.sv}.`;
        case 'ander-lidwoord':
            return `${item.sv} is een ${item.article}-woord.`;
        case 'tekens':
            return 'Net een ander teken: let op å, ä en ö.';
        case 'typo':
            return 'Eén lettertje scheelde.';
        default:
            return item.why || '';
    }
}
