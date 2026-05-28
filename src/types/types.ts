export type Page = 'dashboard' | 'meals' | 'settings' | 'goal' | 'trainings'

export type Option = {
    label: string
    value: string
}

export type Split = 'Fullbody' | 'PPL 2x' | 'Upper Lower'
export type ActivityLevel =
    | 'sedentary'
    | 'lightly active'
    | 'moderately active'
    | 'very active'
export type Goal =
    | 'build muscle'
    | 'lose fat'
    | 'increase strength'
    | 'stay fit & healthy'
export type Gender = 'male' | 'female'
export type TrainingFrequency = '1-2' | '3-4' | '5+'

export type OnboardingData = {
    goal: Goal | null
    activityLevel: ActivityLevel | null
    trainingFrequency: TrainingFrequency | null
    splitType: Split | null

    heightCm: number
    weightKg: number
    gender: Gender | null
    age: number
}

export type UserProfile = OnboardingData
