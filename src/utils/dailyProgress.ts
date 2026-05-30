import type { DailyProgress } from '@/types/DailyProgress.types'
import type { Meal } from '@/types/macros.types'

export type MealTotals = Omit<DailyProgress, 'meals'>
export type ProgressHistory = Record<string, DailyProgress>

export const emptyDailyProgress = Object.freeze<DailyProgress>({
    meals: [],
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
})

export function recalcTotals(meals: Meal[]): MealTotals {
    return meals.reduce<MealTotals>(
        (totals, meal) => ({
            calories: totals.calories + meal.calories,
            protein: totals.protein + meal.protein,
            carbs: totals.carbs + meal.carbs,
            fats: totals.fats + meal.fats,
        }),
        { calories: 0, protein: 0, carbs: 0, fats: 0 }
    )
}

export function createDailyProgress(meals: Meal[]): DailyProgress {
    return {
        meals,
        ...recalcTotals(meals),
    }
}

export function getOrCreateDay(
    history: ProgressHistory,
    date: string
): DailyProgress {
    return history[date] ?? emptyDailyProgress
}
