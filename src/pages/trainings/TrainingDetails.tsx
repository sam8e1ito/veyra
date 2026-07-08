import { useTrainingPlan } from '@/hooks/useTraining'
import { useNavigate, useParams } from 'react-router-dom'
import type { Exercise, Training } from '@/types/training.types'
import Card from '@/components/Card'
import { MuscleGroupLabel } from '@/data/muscleGroupLabel'
import Button from '@/components/Button'

export default function TrainingDetails() {
    const navigate = useNavigate()

    const { trainingId } = useParams()
    const { plan } = useTrainingPlan()
    const training = plan.find(
        (training: Training) => training.id === trainingId
    )

    if (!training) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Button onClick={() => navigate('/trainings')}>Back</Button>

            <h1>{training.name}</h1>
            <div>
                {training.workout_exercises.map((exercise: Exercise) => (
                    <Card title={exercise.name} key={exercise.id}>
                        {exercise.workout_sets.map((set) => (
                            <p key={set.id}>
                                {set.set_number} - {set.target_reps} -{' '}
                                {set.target_weight
                                    ? set.target_weight
                                    : 'No weight logged'}
                            </p>
                        ))}
                        {MuscleGroupLabel[exercise.muscle_group]}
                    </Card>
                ))}
            </div>
        </>
    )
}
