import { supabase } from '@/lib/supabase'
import { fromMealRow, toMealInsert, type MealInsert } from '@/lib/meals/mapMeal'
import type { Meal, MealRow } from '@/types/macros.types'

export async function getMeals(userId: string) {
    return supabase
        .from('meals')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false })
}

export async function createMeal(input: MealInsert) {
    const { data, error } = await supabase
        .from('meals')
        .insert(input)
        .select()
        .single()

    if (error) {
        console.log('insert error: ', error)
        throw error
    }
    if (!data) throw new Error('Meal was not created')

    return fromMealRow(data as MealRow)
}

export async function updateMeal(meal: Meal) {
    const { data, error } = await supabase
        .from('meals')
        .update({
            title: meal.title,
            calories: meal.calories,
            protein: meal.protein,
            carbs: meal.carbs,
            fats: meal.fats,
            date: meal.date,
        })
        .eq('id', meal.id)
        .select()
        .single()

    if (error) throw error
    if (!data) throw new Error('Meal was not updated')

    return fromMealRow(data as MealRow)
}

export async function deleteMeal(id: string) {
    const { error } = await supabase.from('meals').delete().eq('id', id)
    if (error) throw error
}

export { toMealInsert }
