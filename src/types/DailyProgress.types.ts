import type { Meal } from './macros.types'

export type DailyProgress = {
    id: string
    user_id: string
    date: string
    meals: Meal[]
    calories: number
    protein: number
    carbs: number
    fats: number
}
