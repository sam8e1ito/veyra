import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { getTrainingPlan } from '@/services/training'
import { TrainingPlanContext } from '../contexts/TrainingPlanContext'

export function TrainingPlanProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const { user } = useAuth()

    const [plan, setPlan] = useState<any[] | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) return

        const loadPlan = async () => {
            try {
                const plan = await getTrainingPlan(user.id)
                setPlan(plan)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        loadPlan()
    }, [user])

    return (
        <TrainingPlanContext.Provider
            value={{
                plan,
                loading,
            }}
        >
            {children}
        </TrainingPlanContext.Provider>
    )
}
