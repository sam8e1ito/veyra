export type Macros = {
    protein: number
    carbs: number
    fats: number
    totalCalories: number
}

export type MacroConfig = {
    proteinPerKg: number
    fatRatio: number
    calorieAdjustment: number
}

export type Meal = {
    id: string
    user_id: string
    title: string
    calories: number
    protein: number
    carbs: number
    fats: number
    date: string
    createdAt: number
}

export type MealRow = {
    id: string
    user_id: string
    title: string
    calories: number
    protein: number
    carbs: number
    fats: number
    created_at: string
    date: string
}
