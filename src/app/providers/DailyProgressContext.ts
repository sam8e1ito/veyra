import { createContext } from 'react'
import type { DailyProgress, Meal } from '@/types/macros.types'

export type DailyProgressContextType = {
    today: DailyProgress
    addMeal: (meal: Meal) => void
    resetDay: () => void
}

export const DailyProgressContext =
    createContext<DailyProgressContextType | null>(null)
