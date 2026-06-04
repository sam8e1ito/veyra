import type { ActivityLevel, Gender, Goal } from './onboarding.types'
import type { Split } from './types'

export type ProfileDB = {
    id: string
    goal: Goal
    activity_level: ActivityLevel
    training_frequency: number
    split_type: Split
    height_cm: number
    weight_kg: number
    gender: Gender
    age: number
}

export type ProfileRow = ProfileDB & {
    created_at?: string
    updated_at?: string
}
