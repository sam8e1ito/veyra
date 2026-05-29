import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import { DAILY_PROGRESS_KEY } from '@/constants/localStorage'
import type { Meal } from '@/types/macros.types'
import type { DailyProgress } from '@/types/DailyProgress.types'

type MealTotals = Omit<DailyProgress, 'meals'>

export type MealDataContextValue = {
    today: DailyProgress
    meals: Meal[]
    addMeal: (meal: Meal) => void
    editMeal: (meal: Meal) => void
    deleteMeal: (id: string) => void
    resetDay: () => void
    recalcTotals: (meals: Meal[]) => MealTotals
}

const defaultState = Object.freeze<DailyProgress>({
    meals: [],
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
})

export const MealDataContext = createContext<MealDataContextValue | null>(null)

function createDailyProgress(meals: Meal[]): DailyProgress {
    return {
        meals,
        ...recalcTotals(meals),
    }
}

function loadFromStorage(): DailyProgress {
    const raw = localStorage.getItem(DAILY_PROGRESS_KEY)
    if (!raw) return defaultState

    try {
        const parsed = JSON.parse(raw) as Partial<DailyProgress>

        if (!Array.isArray(parsed.meals)) return defaultState

        return createDailyProgress(parsed.meals)
    } catch {
        return defaultState
    }
}

export function recalcTotals(meals: Meal[]): MealTotals {
    return meals.reduce(
        (acc, meal) => {
            acc.calories += meal.calories
            acc.protein += meal.protein
            acc.carbs += meal.carbs
            acc.fats += meal.fats
            return acc
        },
        { calories: 0, protein: 0, carbs: 0, fats: 0 }
    )
}

export function useMealDataState(): MealDataContextValue {
    const [today, setToday] = useState<DailyProgress>(() => loadFromStorage())

    const addMeal = useCallback((meal: Meal) => {
        setToday((prev) => createDailyProgress([...prev.meals, meal]))
    }, [])

    const editMeal = useCallback((updated: Meal) => {
        setToday((prev) => {
            const meals = prev.meals.map((meal) =>
                meal.id === updated.id ? updated : meal
            )

            return createDailyProgress(meals)
        })
    }, [])

    const deleteMeal = useCallback((id: string) => {
        setToday((prev) =>
            createDailyProgress(prev.meals.filter((meal) => meal.id !== id))
        )
    }, [])

    const resetDay = useCallback(() => {
        setToday(defaultState)
    }, [])

    useEffect(() => {
        localStorage.setItem(DAILY_PROGRESS_KEY, JSON.stringify(today))
    }, [today])

    return {
        today,
        meals: today.meals,
        addMeal,
        editMeal,
        deleteMeal,
        resetDay,
        recalcTotals,
    }
}

export function useMealData() {
    const ctx = useContext(MealDataContext)

    if (!ctx) {
        throw new Error('useMealData must be used inside MealDataProvider')
    }

    return ctx
}
