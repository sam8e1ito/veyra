import type { Meal } from './macros.types'

export type DailyProgress = {
    meals: Meal[]
    calories: number
    protein: number
    carbs: number
    fats: number
}
