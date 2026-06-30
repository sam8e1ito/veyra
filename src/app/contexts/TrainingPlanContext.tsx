import { createContext } from 'react'

type TrainingPlanContextType = {
    plan: any
    setPlan: React.Dispatch<React.SetStateAction<any[] | null>>
    loading: boolean
}

export const TrainingPlanContext =
    createContext<TrainingPlanContextType | null>(null)
