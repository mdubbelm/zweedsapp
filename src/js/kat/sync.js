/**
 * Koppeling met het bestaande Supabase-account.
 * Schrijft alleen het veld `kat` in stats; de rest van de rij blijft zoals hij was.
 */

import { initSupabase, isSupabaseEnabled, getSupabase } from '../services/supabase.js';
import { checkAuth } from '../services/auth.js';
import { loadUserData, saveUserData } from '../services/data.js';

export async function connect() {
    try {
        await initSupabase();
        if (!isSupabaseEnabled()) {
            return null;
        }
        const { user } = await checkAuth();
        if (!user) {
            return { user: null };
        }
        const loaded = await loadUserData(user.id);
        let row = loaded;
        return {
            user,
            saved: loaded.stats && loaded.stats.kat ? loaded.stats.kat : null,
            displayName: loaded.stats ? loaded.stats.displayName : '',
            async save(kat) {
                row = { ...row, stats: { ...row.stats, kat, displayName: row.stats.displayName } };
                await saveUserData(user.id, row.stats, row.completedPhrases, row.phraseHistory);
            },
            async partner() {
                const supabase = getSupabase();
                const { data, error } = await supabase
                    .from('user_progress')
                    .select('user_id, stats');
                if (error || !data) {
                    return null;
                }
                const other = data.find(r => r.user_id !== user.id && r.stats && r.stats.kat);
                return other
                    ? { name: other.stats.displayName || 'je maatje', xp: other.stats.kat.xp || 0 }
                    : null;
            }
        };
    } catch (error) {
        console.error('Sync niet beschikbaar:', error);
        return null;
    }
}
