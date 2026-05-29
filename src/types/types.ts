import type {
    ActivityLevel,
    Gender,
    Goal,
    TrainingFrequency,
} from './onboarding.types'

export type Page = 'dashboard' | 'meals' | 'settings' | 'goal' | 'trainings'

// for Select Component
export type Option = {
    label: string
    value: string
}

export type Split = 'Fullbody' | 'PPL_2x' | 'Upper_Lower'

export type UserData = {
    goal: Goal
    activityLevel: ActivityLevel
    trainingFrequency: TrainingFrequency
    splitType: Split

    heightCm: number
    weightKg: number
    gender: Gender
    age: number
}
