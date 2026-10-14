/**
 * Gedeelde stukjes voor alles rond feestdagen: korte teksten per dag,
 * datums netjes opschrijven en de kalender rond een dag.
 * Gebruikt door ui/vandaag.js (startscherm) en kalender.js (de pagina).
 *
 * De weetjes zijn één zin, ingekort uit de nagekeken notities in
 * content/feestdagen.js. Geen bronvermelding op het scherm; die staat daar.
 */

import { HOLIDAYS } from '../content/feestdagen.js';
import { packById } from '../content/packs.js';
import { holidayCalendar } from '../engine/holidays.js';
import { buildPackRound, packSeen } from '../engine/packs.js';

export const WEETJE = {
    nyarsdagen: 'Het nieuwe jaar wordt de avond ervoor ingeluid, op nyårsafton.',
    'trettondedag-jul': 'Kerst is in Zweden pas een week later echt voorbij, op tjugondedag Knut.',
    'tjugondedag-knut': '"Tjugondag Knut körs julen ut": vandaag gaat de kerst de deur uit.',
    fettisdagen: 'De oudere variant heet hetvägg: een semla in een kom warme melk.',
    vaffeldagen: 'Vårfrudagen klonk in de volksmond als våffeldagen, en zo kwamen de wafels.',
    skartorsdagen:
        'Kinderen gaan verkleed als paasheksje langs de deuren, met zelfgemaakte kaarten.',
    paskafton: 'Op de paastafel staat veel van de kersttafel, maar ei en lam maken het Pasen.',
    paskdagen: 'De maandag erna, annandag påsk, is ook een feestdag.',
    valborgsmassoafton: 'Vreugdevuren verwelkomen de lente; op Skansen zingen koren al sinds 1894.',
    'chokladbollens-dag': 'Chokladbollar gaan niet de oven in: een bakdag zonder bakken.',
    'mors-dag': 'Moederdag wordt in Zweden sinds 1919 gevierd.',
    nationaldagen: 'Sinds 2005 een vrije dag; hij herdenkt dat Gustav Vasa in 1523 koning werd.',
    midsommarafton: 'Dansen rond de midsommarstång werd halverwege de 19e eeuw populair.',
    olsmassa: 'Het dorp Sankt Olof op Österlen heeft een gotische kerk met een zilveren bijl.',
    'kiviks-marknad': 'De markt bestaat sinds 1866, met meer dan duizend kooplui.',
    kraftpremiar: 'Papieren hoedjes, slabbetjes en lantaarns horen bij elke kräftskiva.',
    surstromningspremiaren: 'Zure haring is vooral iets uit Norrland, niet uit Skåne.',
    appelmarknaden: 'Elk jaar wordt er in Kivik een groot kunstwerk van appels gemaakt.',
    'prinsesstartans-vecka': 'Het recept stond in 1939 in een kookboek, toen nog als grön tårta.',
    'kanelbullens-dag': 'De Zweedse kanelbulle is minder zoet dan de Amerikaanse kaneelrol.',
    'gustav-adolfsdagen': 'In Göteborg eet men vandaag gebak ter ere van de stichter van de stad.',
    'kladdkakans-dag': 'Kladdkaka heeft sinds 2008 een eigen dag.',
    'alla-helgons-dag': 'Sinds eind 19e eeuw steken Zweden op deze dag kaarsjes aan op de graven.',
    martensafton: 'Het ganzendiner hoort vooral bij Skåne, waar ganzen op de stoppelvelden bleven.',
    'fars-dag': 'Vaderdag was eerst in juni en schoof later naar november.',
    'forsta-advent': 'De eerste Zweedse adventskalender verscheen in 1934.',
    lucia: 'De lussekatt stamt af van de Nederlandse duivekater.',
    julafton: 'Sinds 1960 kijken veel gezinnen om drie uur naar Kalle Anka (Donald Duck).',
    nyarsafton: 'Op Skansen wordt om middernacht een gedicht van Tennyson voorgelezen.'
};

/** Wat er die dag op tafel staat. Leeg waar de bronnen geen vast gerecht noemen. */
export const OP_TAFEL = {
    'tjugondedag-knut': 'De laatste kerstrestjes',
    fettisdagen: 'Semla met slagroom en amandelspijs',
    vaffeldagen: 'Wafels met jam en slagroom',
    skartorsdagen: 'Snoep voor de paasheksjes',
    paskafton: 'Haring, zalm, eieren en lam',
    paskdagen: 'Lam en eieren',
    'chokladbollens-dag': 'Chokladbollar, zonder oven',
    midsommarafton: 'Haring, nieuwe aardappels met dille, aardbeien',
    'kiviks-marknad': 'Worst en ijs tussen de kramen',
    kraftpremiar: 'Rivierkreeftjes met dille',
    surstromningspremiaren: 'Zure haring in tunnbröd',
    appelmarknaden: 'Appels, most en cider',
    'prinsesstartans-vecka': 'Prinsesstårta met groene marsepein',
    'kanelbullens-dag': 'Kanelbullar',
    'gustav-adolfsdagen': 'Gustav Adolfsbakelse',
    'kladdkakans-dag': 'Kladdkaka met slagroom of ijs',
    martensafton: 'Svartsoppa, gans en skånsk äppelkaka',
    'forsta-advent': 'Lussekatter, pepparkakor en glögg',
    lucia: 'Lussekatter, pepparkakor en glögg',
    julafton: 'Julbord en rijstepap met een amandel',
    nyarsafton: 'Bubbels om middernacht'
};

const DOW = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];
const MON = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];

/** 'YYYY-MM-DD' naar "za 31 okt". */
export function shortDate(day) {
    const [y, m, d] = day.split('-').map(Number);
    const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
    return `${DOW[wd]} ${d} ${MON[m - 1]}`;
}

const MONTHS = [
    'januari',
    'februari',
    'maart',
    'april',
    'mei',
    'juni',
    'juli',
    'augustus',
    'september',
    'oktober',
    'november',
    'december'
];

/** 'YYYY-MM-DD' naar "13 december". */
export function dayMonth(day) {
    const [, m, d] = day.split('-').map(Number);
    return `${d} ${MONTHS[m - 1]}`;
}

/** "morgen", "over 17 dagen" */
export function inDaysText(n) {
    if (n === 0) {
        return 'vandaag';
    }
    if (n === 1) {
        return 'morgen';
    }
    return `over ${n} dagen`;
}

/** Kalender rond een dag (zie engine/holidays.js). */
export function calendarFor(day) {
    return holidayCalendar(HOLIDAYS, day);
}

/**
 * Het speelbare pakket bij een feestdag, of null als er (nog) niets te
 * spelen valt. Een rondje zonder vragen tonen we niet als knop.
 */
export function playablePack(id, srs = {}) {
    const pack = packById(id);
    if (!pack || !pack.items.length) {
        return null;
    }
    const n = buildPackRound(pack, srs).questions.length;
    return n ? { pack, questions: n, seen: packSeen(pack, srs) } : null;
}

/** Korte Zweedse naam zonder toevoeging tussen haakjes. */
export function svName(h) {
    return h.sv.replace(/\s*\(.*\)\s*$/, '');
}

/** Korte Nederlandse naam zonder toevoeging tussen haakjes. */
export function nlName(h) {
    return h.title.replace(/\s*\(.*\)\s*$/, '');
}
