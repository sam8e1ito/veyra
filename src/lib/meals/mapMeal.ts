import type { CreateMealInput } from '@/app/contexts/MealDataContext'
import type { Meal, MealRow } from '@/types/macros.types'

export function fromMealRow(row: MealRow): Meal {
    const createdAt = row.created_at
        ? new Date(row.created_at).getTime()
        : Date.now()

    return {
        id: row.id,
        user_id: row.user_id,
        title: row.title,
        calories: row.calories,
        protein: row.protein,
        carbs: row.carbs,
        fats: row.fats,
        date: row.date,
        createdAt: Number.isFinite(createdAt) ? createdAt : Date.now(),
    }
}

export type MealInsert = {
    user_id: string
    title: string
    calories: number
    protein: number
    carbs: number
    fats: number
    date: string
}

export function toMealInsert(
    userId: string,
    input: CreateMealInput
): MealInsert {
    return {
        user_id: userId,
        date: input.date,
        title: input.title,
        calories: input.calories,
        protein: input.protein,
        carbs: input.carbs,
        fats: input.fats,
    }
}
