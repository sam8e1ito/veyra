import Button from '@/components/Button'
import Card from '@/components/Card'
import { useAuth } from '@/hooks/useAuth'
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

    if (!user) {
        return <p>Loading...</p>
    }

    const uniqueTrainings = Array.from(
        new Map(trainings.map((training) => [training.name, training])).values()
    )

    return (
        <>
            <div>
                <h3 className="w-full border border-accent rounded-2xl p-4 mb-4 bg-bg-secondary text-center">
                    Your Trainings
                </h3>
                <div className="flex flex-col gap-4">
                    {uniqueTrainings.map((training: Training) => (
                        <Card key={training.id}>
                            <div className="text-center flex flex-col justify-center items-center my-10">
                                <span className="uppercase font-bold text-accent text-[12px]">
                                    Workout
                                </span>
                                <p className="text-[32px] uppercase tracking-widest font-extrabold leading-none">
                                    {training.name}
                                </p>
                            </div>

                            <Button
                                actionBtn
                                onClick={() =>
                                    navigate(`/trainings/${training.id}`)
                                }
                            >
                                View Training
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    )
}
