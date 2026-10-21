/**
 * Ophalen voor Lezen: artikelen van 8 Sidor (WordPress-API) en de nieuwste
 * aflevering van Klartext (open API van Sveriges Radio).
 *
 * Niets hiervan wordt opgeslagen: het blijft alleen in het geheugen zolang de
 * pagina open is. Klartext wordt alleen gelinkt, niet afgespeeld: volgens de
 * voorwaarden van SR mag hun audio via de API alleen naar Zweden gestreamd worden.
 */

import { toArticle } from '../engine/lezen.js';

const API = 'https://8sidor.se/wp-json/wp/v2/posts';
const FIELDS = 'id,date,link,title,excerpt,content,categories';
const KLARTEXT = 'https://api.sr.se/api/v2/episodes/index?programid=493&format=json&size=1';

/** Dagelijks leven en cultuur: lichter dan het voorpaginanieuws. */
export const LIGHT = [925, 170];

export const TOPICS = [
    { id: 'vardags', label: 'Dagelijks leven', categories: [925] },
    { id: 'kultur', label: 'Cultuur', categories: [170] },
    { id: 'sverige', label: 'Zweden', categories: [32] },
    { id: 'varlden', label: 'Wereld', categories: [2] },
    { id: 'sport', label: 'Sport', categories: [3] }
];

const cache = new Map();

/**
 * @param {{categories?: number[], search?: string, page?: number}} q
 * @returns {Promise<{articles: object[], pages: number}>}
 */
export async function fetchArticles({ categories = LIGHT, search = '', page = 1 } = {}) {
    const params = new window.URLSearchParams({
        per_page: '10',
        page: String(page),
        _fields: FIELDS,
        categories: categories.join(',')
    });
    if (search) {
        params.set('search', search);
    }
    const url = `${API}?${params}`;
    if (cache.has(url)) {
        return cache.get(url);
    }
    const res = await window.fetch(url);
    if (!res.ok) {
        throw new Error(`8 Sidor gaf ${res.status}`);
    }
    const posts = await res.json();
    const result = {
        articles: posts.map(p => toArticle(p)).filter(Boolean),
        pages: Number(res.headers.get('X-WP-TotalPages')) || 1
    };
    cache.set(url, result);
    return result;
}

/** De nieuwste Klartext, of null als de API niet antwoordt. */
export async function fetchKlartext() {
    try {
        const res = await window.fetch(KLARTEXT);
        const ep = res.ok ? (await res.json()).episodes[0] : null;
        if (
            !ep ||
            typeof ep.url !== 'string' ||
            !ep.url.startsWith('https://www.sverigesradio.se/')
        ) {
            return null;
        }
        return { title: ep.title, description: ep.description || '', url: ep.url };
    } catch {
        return null;
    }
}
