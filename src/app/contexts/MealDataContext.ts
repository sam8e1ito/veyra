import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { DAILY_PROGRESS_KEY, getUserScopedKey } from '@/constants/localStorage'
import type { Meal } from '@/types/macros.types'
import type { DailyProgress } from '@/types/DailyProgress.types'
import { getDateKey } from '@/utils/date'
import {
    createEmptyDailyProgress,
    createDailyProgress,
    getOrCreateDay,
    recalcTotals,
    type MealTotals,
    type ProgressHistory,
} from '@/utils/dailyProgress'
import { useAuth } from '@/hooks/useAuth'

export type MealDataContextValue = {
    history: ProgressHistory
    getDay: (date: string) => DailyProgress
    addMeal: (date: string, meal: Meal) => void
    editMeal: (date: string, meal: Meal) => void
    deleteMeal: (date: string, id: string) => void
    resetDay: (date: string) => void
    recalcTotals: (meals: Meal[]) => MealTotals
}

export const MealDataContext = createContext<MealDataContextValue | null>(null)

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isFiniteNumber(value: unknown): value is number {
    return typeof value === 'number' && Number.isFinite(value)
}

function parseMeal(value: unknown, userId: string): Meal | null {
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

    const mealUserId =
        typeof value.user_id === 'string' ? value.user_id : userId

    if (mealUserId !== userId) return null

    return {
        id: value.id,
        user_id: mealUserId,
        title: value.title,
        calories: value.calories,
        protein: value.protein,
        carbs: value.carbs,
        fats: value.fats,
        createdAt: isFiniteNumber(value.createdAt) ? value.createdAt : 0,
    }
}

function parseDailyProgress(
    value: unknown,
    userId: string,
    date: string
): DailyProgress | null {
    if (!isRecord(value) || !Array.isArray(value.meals)) return null

    const progressUserId =
        typeof value.user_id === 'string' ? value.user_id : userId

    if (progressUserId !== userId) return null

    const meals = value.meals.reduce<Meal[]>((acc, meal) => {
        const parsed = parseMeal(meal, userId)
        if (parsed) acc.push(parsed)
        return acc
    }, [])

    return createDailyProgress(userId, date, meals)
}

function loadHistory(userId: string): ProgressHistory {
    const raw =
        localStorage.getItem(getUserScopedKey(DAILY_PROGRESS_KEY, userId)) ??
        localStorage.getItem(DAILY_PROGRESS_KEY)

    if (!raw) return {}

    try {
        const parsed: unknown = JSON.parse(raw)
        const today = getDateKey()

        const legacyDay = parseDailyProgress(parsed, userId, today)
        if (legacyDay) return { [today]: legacyDay }

        if (!isRecord(parsed)) return {}

        return Object.entries(parsed).reduce<ProgressHistory>(
            (history, [date, progress]) => {
                const day = parseDailyProgress(progress, userId, date)
                if (day) history[date] = day
                return history
            },
            {}
        )
    } catch {
        return {}
    }
}

export function useMealDataValue(): MealDataContextValue {
    const { user } = useAuth()

    const userId = user?.id

    const [history, setHistory] = useState<ProgressHistory>({})

    useEffect(() => {
        if (!userId) return

        const loaded = loadHistory(userId)
        setHistory(loaded)
    }, [userId])

    const getDay = useCallback(
        (date: string): DailyProgress => {
            if (!userId) return createEmptyDailyProgress('', date)
            return getOrCreateDay(history, userId, date)
        },
        [history, userId]
    )

    const addMeal = useCallback(
        (date: string, meal: Meal) => {
            if (!userId) return

            setHistory((prev) => {
                const currentDay = getOrCreateDay(prev, userId, date)

                return {
                    ...prev,
                    [date]: createDailyProgress(userId, date, [
                        ...currentDay.meals,
                        { ...meal, user_id: userId },
                    ]),
                }
            })
        },
        [userId]
    )

    const editMeal = useCallback(
        (date: string, updated: Meal) => {
            if (!userId) return

            setHistory((prev) => {
                const currentDay = getOrCreateDay(prev, userId, date)

                const meals = currentDay.meals.map((meal) =>
                    meal.id === updated.id
                        ? { ...updated, user_id: userId }
                        : meal
                )

                return {
                    ...prev,
                    [date]: createDailyProgress(userId, date, meals),
                }
            })
        },
        [userId]
    )

    const deleteMeal = useCallback(
        (date: string, id: string) => {
            if (!userId) return

            setHistory((prev) => {
                const currentDay = getOrCreateDay(prev, userId, date)

                return {
                    ...prev,
                    [date]: createDailyProgress(
                        userId,
                        date,
                        currentDay.meals.filter((m) => m.id !== id)
                    ),
                }
            })
        },
        [userId]
    )

    const resetDay = useCallback(
        (date: string) => {
            if (!userId) return

            setHistory((prev) => ({
                ...prev,
                [date]: createEmptyDailyProgress(userId, date),
            }))
        },
        [userId]
    )

    useEffect(() => {
        if (!userId) return

        localStorage.setItem(
            getUserScopedKey(DAILY_PROGRESS_KEY, userId),
            JSON.stringify(history)
        )
    }, [history, userId])

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
        [history, getDay, addMeal, editMeal, deleteMeal, resetDay]
    )
}

export function useMealData() {
    const ctx = useContext(MealDataContext)

    if (!ctx) {
        throw new Error('useMealData must be used inside MealDataProvider')
    }

    return ctx
}
