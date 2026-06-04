import type { Split } from '@/types/types'
import { TEMPLATES } from './templates'
import { supabase } from '../supabase'

export async function generateTrainingPlan(userId: string, split: Split) {
    const keyMap = {
        Fullbody: 'fullbody',
        Upper_Lower: 'upper_lower',
        PPL_2x: 'ppl',
    } as const

    const template = TEMPLATES[keyMap[split]]

    for (let i = 0; i < template.length; i++) {
        const workout = template[i]

        const { data: plan, error: planError } = await supabase
            .from('workout_plans')
            .insert({ user_id: userId, name: workout.name, order_index: i })
            .select()
            .single()

        if (planError) throw planError

        for (let j = 0; j < workout.exercises.length; j++) {
            const exercise = workout.exercises[j]

            const { data: ex, error: exError } = await supabase
                .from('workout_exercises')
                .insert({
                    workout_plan_id: plan.id,
                    name: exercise.name,
                    muscle_group: exercise.muscle_group,
                    order_index: j,
                })
                .select()
                .single()

            if (exError) throw exError

            for (let s = 0; s < exercise.sets; s++) {
                const { error } = await supabase.from('workout_sets').insert({
                    exercise_id: ex.id,
                    set_number: s + 1,
                    target_reps: ex.reps,
                    target_weight: null,
                })

                if (error) throw error
            }
        }
    }
    return true
}
