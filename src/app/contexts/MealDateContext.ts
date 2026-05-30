import { createContext } from 'react'

export type MealDateContextValue = {
    selectedDate: string
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>
}

export const MealDateContext =
    createContext<MealDateContextValue | null>(null)
