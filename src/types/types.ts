import type { ActivityLevel, Gender, Goal } from './onboarding.types'

export type Page = 'dashboard' | 'meals' | 'settings' | 'goal' | 'trainings'

export type Option = {
    label: string
    value: string
}

export type Split = 'Fullbody' | 'PPL_2x' | 'Upper_Lower'

export type UserData = {
    user_id: string
    goal: Goal
    activityLevel: ActivityLevel

    trainingFrequency: number

    splitType: Split

    heightCm: number
    weightKg: number
    gender: Gender
    age: number
}
