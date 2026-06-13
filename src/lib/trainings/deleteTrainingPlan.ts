import { supabase } from '../supabase'

export async function deleteTrainingPlan(userId: string) {
    const { error } = await supabase
        .from('workout_plans')
        .delete()
        .eq('user_id', userId)

    if (error) throw error
}
