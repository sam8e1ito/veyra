export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very_active'

export type Goal =
    | 'build_muscle'
    | 'lose_fat'
    | 'increase_strength'
    | 'stay_fit'

export type Gender = 'male' | 'female'

export type OnboardingData = {
    user_id: string | null
    goal: Goal | null
    activityLevel: ActivityLevel | null
    trainingFrequency: number | null

    heightCm: number | null
    weightKg: number | null
    gender: Gender | null
    age: number | null
}
