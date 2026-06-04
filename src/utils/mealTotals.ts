import type { Meal } from '@/types/macros.types'

export type MealTotals = {
    calories: number
    protein: number
    carbs: number
    fats: number
}

const emptyTotals: MealTotals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
}

export function recalcTotals(meals: Meal[]): MealTotals {
    return meals.reduce<MealTotals>(
        (totals, meal) => ({
            calories: totals.calories + meal.calories,
            protein: totals.protein + meal.protein,
            carbs: totals.carbs + meal.carbs,
            fats: totals.fats + meal.fats,
        }),
        emptyTotals
    )
}
