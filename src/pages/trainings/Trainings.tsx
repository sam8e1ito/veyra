import Button from '@/components/Button'
import Card from '@/components/Card'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
import { getTrainingPlan } from '@/services/training'
import type { Training } from '@/types/training.types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Trainings() {
    const navigate = useNavigate()
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

    const uniqueTrainings = Array.from(
        new Map(trainings.map((training) => [training.name, training])).values()
    )

    return (
        <>
            <Card title="Your current split is">
                <p>{splitLabel}</p>
            </Card>
            <Card title="Your trainings:">
                {uniqueTrainings.map((training: Training) => (
                    <div key={training.id}>
                        <p>{training.name}</p>
                        <Button
                            onClick={() =>
                                navigate(`/trainings/${training.id}`)
                            }
                        >
                            View Training
                        </Button>
                    </div>
                ))}
            </Card>
        </>
    )
}
