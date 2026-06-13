import Card from '@/components/Card'
import { MuscleGroupLabel } from '@/data/muscleGroupLabel'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
import { getTrainingPlan } from '@/services/training'
import type { Exercise, Training } from '@/types/training.types'
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

    return (
        <>
            <Card title="Your current split is">
                <p>{splitLabel}</p>
            </Card>
            <Card title="Your trainings:">
                {trainings.map((training: Training) => (
                    <div key={training.id}>
                        <p>{training.name}</p>
                        <div>
                            {training.workout_exercises.map(
                                (exercise: Exercise) => (
                                    <Card
                                        title={exercise.name}
                                        key={exercise.id}
                                    >
                                        {exercise.workout_sets.map((set) => (
                                            <p key={set.id}>
                                                {set.set_number} -{' '}
                                                {set.target_reps} -{' '}
                                                {set.target_weight
                                                    ? set.target_weight
                                                    : 'No weight logged'}
                                            </p>
                                        ))}
                                        {
                                            MuscleGroupLabel[
                                                exercise.muscle_group
                                            ]
                                        }
                                    </Card>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </Card>
        </>
    )
}
