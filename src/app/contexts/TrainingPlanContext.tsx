import { createContext } from 'react'

type TrainingPlanContextType = {
    plan: any
    loading: boolean
}

export const TrainingPlanContext =
    createContext<TrainingPlanContextType | null>(null)
