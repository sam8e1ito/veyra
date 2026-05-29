import type { UserData } from '@/types/types'
import type { Goal } from '@/types/onboarding.types'
import type { Macros, MacroConfig } from '@/types/macros.types'

export function calculateBMR(user: UserData): number {
    const { weightKg, heightCm, age, gender } = user

    if (gender === 'male') {
        return 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    }

    return 10 * weightKg + 6.25 * heightCm - 5 * age - 161
}

const activityMultipliers: Record<UserData['activityLevel'], number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.5,
    very_active: 1.85,
}
export const macroConfigs: Record<Goal, MacroConfig> = {
    build_muscle: {
        proteinPerKg: 1.8,
        fatRatio: 0.25,
        calorieAdjustment: 300,
    },

    lose_fat: {
        proteinPerKg: 2.0,
        fatRatio: 0.25,
        calorieAdjustment: -450,
    },

    increase_strength: {
        proteinPerKg: 1.8,
        fatRatio: 0.25,
        calorieAdjustment: 150,
    },

    stay_fit: {
        proteinPerKg: 1.6,
        fatRatio: 0.3,
        calorieAdjustment: 0,
    },
}

export function calculateTDEE(user: UserData): number {
    if (!user.activityLevel) {
        throw new Error('Activity level not found')
    }

    const bmr = calculateBMR(user)

    return bmr * activityMultipliers[user.activityLevel]
}

export function calculateBaseCalories(user: UserData): number {
    return calculateTDEE(user)
}

export function calculateMacros(user: UserData): Macros {
    if (!user.goal) {
        throw new Error('Users goal not found')
    }

    const baseCalories = calculateTDEE(user)

    const config = macroConfigs[user.goal]

    const calories = baseCalories + config.calorieAdjustment

    const proteinGrams = config.proteinPerKg * user.weightKg
    const proteinCalories = proteinGrams * 4

    const fatCalories = calories * config.fatRatio
    const fatGrams = fatCalories / 9

    const remainingCalories = calories - proteinCalories - fatCalories

    const carbsGrams = remainingCalories / 4

    return {
        protein: Math.round(proteinGrams),
        fats: Math.round(fatGrams),
        carbs: Math.round(carbsGrams),
        totalCalories: Math.round(proteinGrams + fatGrams + carbsGrams),
    }
}
