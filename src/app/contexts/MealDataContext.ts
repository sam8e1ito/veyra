import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { DAILY_PROGRESS_KEY } from '@/constants/localStorage'
import type { Meal } from '@/types/macros.types'
import type { DailyProgress } from '@/types/DailyProgress.types'
import { getDateKey } from '@/utils/date'
import {
    createDailyProgress,
    emptyDailyProgress,
    getOrCreateDay,
    recalcTotals,
    type MealTotals,
    type ProgressHistory,
} from '@/utils/dailyProgress'

export type MealDataContextValue = {
    history: ProgressHistory
    getDay: (date: string) => DailyProgress
    addMeal: (date: string, meal: Meal) => void
    editMeal: (date: string, meal: Meal) => void
    deleteMeal: (date: string, id: string) => void
    resetDay: (date: string) => void
    recalcTotals: (meals: Meal[]) => MealTotals
}

export const defaultState = emptyDailyProgress

export const MealDataContext = createContext<MealDataContextValue | null>(null)

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isFiniteNumber(value: unknown): value is number {
    return typeof value === 'number' && Number.isFinite(value)
}

function parseMeal(value: unknown): Meal | null {
    if (!isRecord(value)) return null

    if (
        typeof value.id !== 'string' ||
        typeof value.title !== 'string' ||
        !isFiniteNumber(value.calories) ||
        !isFiniteNumber(value.protein) ||
        !isFiniteNumber(value.carbs) ||
        !isFiniteNumber(value.fats)
    ) {
        return null
    }

    const id = value.id
    const title = value.title
    const calories = value.calories
    const protein = value.protein
    const carbs = value.carbs
    const fats = value.fats

    return {
        id,
        title,
        calories,
        protein,
        carbs,
        fats,
        createdAt: isFiniteNumber(value.createdAt) ? value.createdAt : 0,
    }
}

function parseDailyProgress(value: unknown): DailyProgress | null {
    if (!isRecord(value) || !Array.isArray(value.meals)) return null

    const meals = value.meals.reduce<Meal[]>((meals, meal) => {
        const parsedMeal = parseMeal(meal)

        if (parsedMeal) {
            meals.push(parsedMeal)
        }

        return meals
    }, [])

    return createDailyProgress(meals)
}

function loadHistory(): ProgressHistory {
    const raw = localStorage.getItem(DAILY_PROGRESS_KEY)
    if (!raw) return {}

    try {
        const parsed: unknown = JSON.parse(raw)
        const legacyDay = parseDailyProgress(parsed)
        if (legacyDay) return { [getDateKey()]: legacyDay }

        if (!isRecord(parsed)) return {}

        return Object.entries(parsed).reduce<ProgressHistory>(
            (history, [date, progress]) => {
                const day = parseDailyProgress(progress)

                if (day) {
                    history[date] = day
                }

                return history
            },
            {}
        )
    } catch {
        return {}
    }
}

export function useMealDataValue(): MealDataContextValue {
    const [history, setHistory] = useState<ProgressHistory>(() => loadHistory())

    const getDay = useCallback(
        (date: string) => getOrCreateDay(history, date),
        [history]
    )

    const addMeal = useCallback((date: string, meal: Meal) => {
        setHistory((prev) => {
            const currentDay = getOrCreateDay(prev, date)

            return {
                ...prev,
                [date]: createDailyProgress([...currentDay.meals, meal]),
            }
        })
    }, [])

    const editMeal = useCallback((date: string, updated: Meal) => {
        setHistory((prev) => {
            const currentDay = getOrCreateDay(prev, date)
            const meals = currentDay.meals.map((meal) =>
                meal.id === updated.id ? updated : meal
            )

            return {
                ...prev,
                [date]: createDailyProgress(meals),
            }
        })
    }, [])

    const deleteMeal = useCallback((date: string, id: string) => {
        setHistory((prev) => {
            const currentDay = getOrCreateDay(prev, date)

            return {
                ...prev,
                [date]: createDailyProgress(
                    currentDay.meals.filter((meal) => meal.id !== id)
                ),
            }
        })
    }, [])

    const resetDay = useCallback((date: string) => {
        setHistory((prev) => ({
            ...prev,
            [date]: emptyDailyProgress,
        }))
    }, [])

    useEffect(() => {
        localStorage.setItem(DAILY_PROGRESS_KEY, JSON.stringify(history))
    }, [history])

    return useMemo(
        () => ({
            history,
            getDay,
            addMeal,
            editMeal,
            deleteMeal,
            resetDay,
            recalcTotals,
        }),
        [addMeal, deleteMeal, editMeal, getDay, history, resetDay]
    )
}

export function useMealData() {
    const ctx = useContext(MealDataContext)

    if (!ctx) {
        throw new Error('useMealData must be used inside MealDataProvider')
    }

    return ctx
}
