import { supabase } from '@/lib/supabase'

export async function getTrainingPlan(userId: string) {
    const { data, error } = await supabase
        .from('workout_plans')
        .select(
            `
            *,
            workout_exercises (
                *,
                workout_sets (*)
            )
        `
        )
        .eq('user_id', userId)

    if (error) throw error
    return data
}
