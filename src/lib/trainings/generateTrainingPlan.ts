import type { Split } from '@/types/types'
import { TEMPLATES } from './templates'
import { SPLIT_SCHEDULES } from './splitSchedules'
import { EXERCISES_TEMPLATES } from './exercises/exercisesTemplates'
import { supabase } from '../supabase'

const exerciseMap = Object.fromEntries(
    EXERCISES_TEMPLATES.map((ex) => [ex.id, ex])
)

export async function generateTrainingPlan(userId: string, split: Split) {
    const keyMap = {
        Fullbody: 'fullbody',
        Upper_Lower: 'upper_lower',
        PPL_2x: 'ppl',
    } as const

    const key = keyMap[split]

    const template = TEMPLATES[key]
    const schedule = SPLIT_SCHEDULES[key]

    for (let i = 0; i < schedule.length; i++) {
        const scheduledWorkout = schedule[i]

        const workout = template.find(
            (item) => item.name === scheduledWorkout.name
        )

        if (!workout) {
            throw new Error(
                `Workout ${scheduledWorkout.name} not found`
            )
        }

        const { data: plan, error: planError } = await supabase
            .from('workout_plans')
            .insert({
                user_id: userId,
                name: workout.name,
                order_index: i,
                day_of_week: scheduledWorkout.dayOfWeek,
            })
            .select()
            .single()

        if (planError) throw planError

        for (let j = 0; j < workout.exercises.length; j++) {
            const exerciseRef = workout.exercises[j]

            const exercise = exerciseMap[exerciseRef.exercise_id]

            if (!exercise) {
                throw new Error(
                    `Exercise ${exerciseRef.exercise_id} not found`
                )
            }

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

            for (let s = 0; s < exerciseRef.sets; s++) {
                const { error } = await supabase
                    .from('workout_sets')
                    .insert({
                        exercise_id: ex.id,
                        set_number: s + 1,
                        target_reps: exerciseRef.reps,
                        target_weight: null,
                    })

                if (error) throw error
            }
        }
    }

    return true
}