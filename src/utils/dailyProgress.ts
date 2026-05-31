import type { DailyProgress } from '@/types/DailyProgress.types'
import type { Meal } from '@/types/macros.types'

export type MealTotals = Omit<
    DailyProgress,
    'id' | 'user_id' | 'date' | 'meals'
>
export type ProgressHistory = Record<string, DailyProgress>

export function getDailyProgressId(userId: string, date: string) {
    return `${userId}:${date}`
}

export function createEmptyDailyProgress(
    userId: string,
    date: string
): DailyProgress {
    return {
        id: getDailyProgressId(userId, date),
        user_id: userId,
        date,
        meals: [],
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
    }
}

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

export function createDailyProgress(
    userId: string,
    date: string,
    meals: Meal[]
): DailyProgress {
    return {
        id: getDailyProgressId(userId, date),
        user_id: userId,
        date,
        meals,
        ...recalcTotals(meals),
    }
}

export function getOrCreateDay(
    history: ProgressHistory,
    userId: string,
    date: string
): DailyProgress {
    return history[date] ?? createEmptyDailyProgress(userId, date)
}
