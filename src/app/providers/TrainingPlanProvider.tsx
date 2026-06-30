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
        if (!user) {
            setPlan(null)
            setLoading(false)
            return
        }
        setLoading(true)

        const loadPlan = async () => {
            try {
                const data = await getTrainingPlan(user.id)
                setPlan(data)
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
                setPlan,
                loading,
            }}
        >
            {children}
        </TrainingPlanContext.Provider>
    )
}
