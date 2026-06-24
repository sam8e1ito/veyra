import type { MuscleGroup } from './muscles.types'

export interface TemplateExercise {
    exercise_id: string
    sets: number
    reps: number
}

export interface TemplateWorkout {
    name: string
    exercises: TemplateExercise[]
}
