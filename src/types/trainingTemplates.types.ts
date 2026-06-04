import type { MuscleGroup } from './muscles.types'

export interface TemplateExercise {
    name: string
    muscle_group: MuscleGroup
    sets: number
    reps: number
}

export interface TemplateWorkout {
    name: string
    exercises: TemplateExercise[]
}
