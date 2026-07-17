import type { MuscleGroup } from './muscles.types'

export type TrainingSet = {
    created_at: string
    exercise_id: string
    id: string
    set_number: number
    target_reps: number
    target_weight: number | null
    isNew?: boolean
}

export type Exercise = {
    created_at: string
    id: string
    muscle_group: MuscleGroup
    name: string
    order_index: number
    workout_plan_id: string
    workout_sets: TrainingSet[]
}

export type Training = {
    created_at: string
    id: string
    name: string
    order_index: number
    user_id: string
    workout_exercises: Exercise[]
}
