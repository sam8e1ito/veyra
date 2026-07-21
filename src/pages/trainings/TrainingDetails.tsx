import { useTrainingPlan } from '@/hooks/useTraining'
import { useNavigate, useParams } from 'react-router-dom'
import type { Training } from '@/types/training.types'
import TrainingHeader from '@/components/trainingDetails/TrainingHeader'
import TrainingExerciseList from '@/components/trainingDetails/TrainingExerciseList'
import { useTrainingEditor } from '@/hooks/useTrainingEditor'

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

    const {
        editedExercises,
        isEditing,
        setIsEditing,
        cancel,
        updateSet,
        addSet,
        removeSet,
        save,
    } = useTrainingEditor(training.workout_exercises)

    return (
        <>
            <TrainingHeader
                isEditing={isEditing}
                onBack={
                    isEditing ? () => cancel() : () => navigate('/trainings')
                }
                onEdit={() => setIsEditing(true)}
                onSave={save}
            />

            <div className="flex flex-col gap-4 bg-bg-secondary border border-accent rounded-2xl p-4 mt-4">
                <h1 className="text-2xl uppercase font-bold text-center">
                    {training.name}
                </h1>
                <TrainingExerciseList
                    exercises={editedExercises}
                    isEditing={isEditing}
                    onAddSet={addSet}
                    onChange={updateSet}
                    onRemoveSet={removeSet}
                />
            </div>
        </>
    )
}
