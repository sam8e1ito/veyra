import type { ActivityLevel, Gender, Goal } from './onboarding.types'

export type Page = 'dashboard' | 'meals' | 'settings' | 'goal' | 'trainings'

// for Select Component
export type Option = {
    label: string
    value: string
}

export type Split = 'Fullbody' | 'PPL_2x' | 'Upper_Lower'

export type UserData = {
    user_id: string
    goal: Goal
    activityLevel: ActivityLevel
    /** Sessions per week (integer stored in DB). */
    trainingFrequency: number
    /** Derived from trainingFrequency via getSplitType — not stored as UI strings in DB. */
    splitType: Split

    heightCm: number
    weightKg: number
    gender: Gender
    age: number
}
