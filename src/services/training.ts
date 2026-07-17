import { supabase } from "@/lib/supabase"

export async function getTrainingPlan(userId: string) {
    const { data, error } = await supabase
        .from('workout_plans')
        .select(`
            *,
            workout_exercises (
                *,
                workout_sets (*)
            )
        `)
        .eq('user_id', userId)

    if (error) throw error

    data?.forEach((workout) => {
        workout.workout_exercises.sort(
            (a: any, b: any) => a.order_index - b.order_index
        )

        workout.workout_exercises.forEach((exercise: any) => {
            exercise.workout_sets.sort(
                (a: any, b: any) => a.set_number - b.set_number
            )
        })
    })

    return data
}