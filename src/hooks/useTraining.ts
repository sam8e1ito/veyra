import { useContext } from 'react'
import { TrainingPlanContext } from '@/app/contexts/TrainingPlanContext'

export function useTrainingPlan() {
    const context = useContext(TrainingPlanContext)

    if (!context)
        throw new Error(
            'useTrainingPlan must be used within TrainingPlanProvider'
        )

    return context
}
