import Card from '@/components/Card'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
import { getTrainingPlan } from '@/services/training'
import { useEffect, useState } from 'react'

export default function Trainings() {
    const { user } = useAuth()
    const [trainings, setTrainings] = useState<any[]>([])

    useEffect(() => {
        if (!user) return

        async function loadTrainings() {
            const data = await getTrainingPlan(user ? user.id : '')
            setTrainings(data)
        }

        loadTrainings()
    }, [user])

    const { splitLabel } = useProfile()

    if (!user) {
        return <p>Loading...</p>
    }

    const userId = user.id

    return (
        <>
            <Card title="Your current split is">
                <p>{splitLabel}</p>
            </Card>
            <Card title="Your trainings:">
                {trainings.map((training) => (
                    <p key={training.id}>{training.name}</p>
                ))}
            </Card>
        </>
    )
}
