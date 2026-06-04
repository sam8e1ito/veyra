import { supabase } from '@/lib/supabase'
import type { PostgrestError } from '@supabase/supabase-js'
import type { UserData } from '@/types/types'
import { fromProfileDB, toProfileDB } from './mapProfile'
import type { ProfileRow } from '@/types/profile.db'

export async function getProfile(userId: string) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()

    return {
        profile: data ? fromProfileDB(data as ProfileRow) : null,
        error,
    }
}

export async function upsertProfile(
    userId: string,
    data: UserData
): Promise<{ error: PostgrestError | null }> {
    const row = toProfileDB(data, userId)

    const { error } = await supabase.from('profiles').upsert(row)

    if (error) {
        console.error('Profile upsert failed:', error)
        return { error }
    }

    return { error: null }
}
