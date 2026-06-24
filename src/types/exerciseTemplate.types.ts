import type { MuscleGroup } from './muscles.types'

export type Equipment =
    | 'barbell'
    | 'dumbbells'
    | 'cable'
    | 'machine'
    | 'bodyweight'

export interface ExerciseTemplate {
    id: string
    name: string
    muscle_group: MuscleGroup
    equipment: Equipment
}
