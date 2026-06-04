import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

import type { Meal } from '@/types/macros.types'
import { useAuth } from '@/hooks/useAuth'
import { fromMealRow } from '@/lib/meals/mapMeal'
import type { MealRow } from '@/types/macros.types'
import {
    createMeal as createMealService,
    deleteMeal as deleteMealService,
    getMeals,
    toMealInsert,
    updateMeal as updateMealService,
} from '@/services/meals'
import { recalcTotals, type MealTotals } from '@/utils/mealTotals'

export type CreateMealInput = {
    date: string
    title: string
    calories: number
    protein: number
    carbs: number
    fats: number
}

type MealDataContextValue = {
    meals: Meal[]
    loading: boolean
    getMealsByDate: (date: string) => Meal[]
    getTotalsByDate: (date: string) => MealTotals
    getDates: () => string[]
    createMeal: (input: CreateMealInput) => Promise<void>
    updateMeal: (meal: Meal) => Promise<void>
    deleteMeal: (id: string) => Promise<void>
}

export const MealDataContext = createContext<MealDataContextValue | null>(null)

export function useMealDataValue(): MealDataContextValue {
    const { user } = useAuth()
    const userId = user?.id

    const [mealsByUser, setMealsByUser] = useState<{
        userId: string
        meals: Meal[]
    } | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!userId) return

        let cancelled = false

        async function load() {
            setLoading(true)

            const { data, error } = await getMeals(userId!)

            if (cancelled) return

            if (error) {
                console.error('Failed to load meals:', error)
                setMealsByUser({ userId: userId!, meals: [] })
                setLoading(false)
                return
            }

            setMealsByUser({
                userId: userId!,
                meals: (data ?? []).map((row) => fromMealRow(row as MealRow)),
            })
            setLoading(false)
        }

        load()

        return () => {
            cancelled = true
        }
    }, [userId])

    const meals = useMemo(
        () =>
            userId && mealsByUser?.userId === userId ? mealsByUser.meals : [],
        [userId, mealsByUser]
    )
    const isLoading = Boolean(userId) && loading

    const getMealsByDate = useCallback(
        (date: string) => meals.filter((meal) => meal.date === date),
        [meals]
    )

    const getTotalsByDate = useCallback(
        (date: string) => recalcTotals(getMealsByDate(date)),
        [getMealsByDate]
    )

    const getDates = useCallback(
        () => [...new Set(meals.map((meal) => meal.date))].sort(),
        [meals]
    )

    const createMeal = useCallback(
        async (input: CreateMealInput) => {
            if (!userId) return

            const created = await createMealService(toMealInsert(userId, input))
            setMealsByUser((prev) => ({
                userId: userId!,
                meals: prev ? [...prev.meals, created] : [created],
            }))
        },
        [userId]
    )

    const updateMeal = useCallback(async (meal: Meal) => {
        const updated = await updateMealService(meal).catch((err) => {
            console.error(err)
            return null
        })

        if (!updated) return
        setMealsByUser((prev) =>
            prev
                ? {
                      ...prev,
                      meals: prev.meals.map((item) =>
                          item.id === updated.id ? updated : item
                      ),
                  }
                : prev
        )
    }, [])

    const deleteMeal = useCallback(async (id: string) => {
        try {
            await deleteMealService(id)
            setMealsByUser((prev) =>
                prev
                    ? {
                          ...prev,
                          meals: prev.meals.filter((meal) => meal.id !== id),
                      }
                    : prev
            )
        } catch (err) {
            console.error(err)
        }
    }, [])

    return useMemo(
        () => ({
            meals,
            loading: isLoading,
            getMealsByDate,
            getTotalsByDate,
            getDates,
            createMeal,
            updateMeal,
            deleteMeal,
        }),
        [
            meals,
            isLoading,
            getMealsByDate,
            getTotalsByDate,
            getDates,
            createMeal,
            updateMeal,
            deleteMeal,
        ]
    )
}

export function useMealData() {
    const ctx = useContext(MealDataContext)

    if (!ctx) {
        throw new Error('useMealData must be used inside MealDataProvider')
    }

    return ctx
}
