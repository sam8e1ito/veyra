import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { DailyProgressContext } from './dailyProgressContext'
import type { DailyProgress, Meal } from '@/types/macros.types'
import { DAILY_PROGRESS_KEY } from '@/constants/localStorage'

const defaultState: DailyProgress = {
    meals: [],
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
}

function loadFromStorage(): DailyProgress {
    const raw = localStorage.getItem(DAILY_PROGRESS_KEY)
    if (!raw) return defaultState

    try {
        const parsed = JSON.parse(raw)

        return {
            meals: parsed.meals ?? [],
            calories: parsed.calories ?? 0,
            protein: parsed.protein ?? 0,
            carbs: parsed.carbs ?? 0,
            fats: parsed.fats ?? 0,
        }
    } catch {
        return defaultState
    }
}

export function DailyProgressProvider({ children }: { children: ReactNode }) {
    const [today, setToday] = useState<DailyProgress>(defaultState)

    useEffect(() => {
        setToday(loadFromStorage())
    }, [])

    function addMeal(meal: Meal) {
        setToday((prev) => {
            const updated: DailyProgress = {
                meals: [...prev.meals, meal],
                calories: prev.calories + meal.calories,
                protein: prev.protein + meal.protein,
                carbs: prev.carbs + meal.carbs,
                fats: prev.fats + meal.fats,
            }

            localStorage.setItem(DAILY_PROGRESS_KEY, JSON.stringify(updated))
            return updated
        })
    }

    function resetDay() {
        localStorage.setItem(DAILY_PROGRESS_KEY, JSON.stringify(defaultState))
        setToday(defaultState)
    }

    return (
        <DailyProgressContext.Provider value={{ today, addMeal, resetDay }}>
            {children}
        </DailyProgressContext.Provider>
    )
}
