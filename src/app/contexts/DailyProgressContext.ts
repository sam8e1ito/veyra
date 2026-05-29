import { createContext } from 'react'
import type { Meal } from '@/types/macros.types'
import type { DailyProgress } from '@/types/DailyProgress.types'
import type { MealModalState } from './MealUIContext'

export type DailyProgressContextType = {
    today: DailyProgress
    meals: Meal[]
    addMeal: (meal: Meal) => void
    deleteMeal: (id: string) => void
    editMeal: (meal: Meal) => void
    modalState: MealModalState
    editingMeal: Meal | null
    isCreatingMeal: boolean
    openCreate: () => void
    openEdit: (meal: Meal) => void
    closeMealModal: () => void
    resetDay: () => void
    resetUI: () => void
    isMealModalOpen: boolean
    selectedMealId: string | null
    setSelectedMealId: React.Dispatch<React.SetStateAction<string | null>>
    toggleSelectedMeal: (id: string) => void
    clearMealUIForMeal: (id: string) => void
    recalcTotals: (meals: Meal[]) => Omit<DailyProgress, 'meals'>
}

export const DailyProgressContext =
    createContext<DailyProgressContextType | null>(null)
