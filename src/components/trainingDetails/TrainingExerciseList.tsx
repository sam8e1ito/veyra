import type { Exercise, TrainingSet } from '@/types/training.types'
import TrainingExerciseCard from './TrainingExerciseCard'

type Props = {
    exercises: Exercise[]
    isEditing: boolean
    onChange: (
        id: string,
        field: keyof TrainingSet,
        value: number | null
    ) => void
    onAddSet: (exerciseId: string) => void
    onRemoveSet: (exerciseId: string, setId: string) => void
}

export default function TrainingExerciseList({
    exercises,
    isEditing,
    onChange,
    onAddSet,
    onRemoveSet,
}: Props) {
    return (
        <div>
            {exercises.map((exercise) => (
                <TrainingExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    isEditing={isEditing}
                    onChange={onChange}
                    onAddSet={onAddSet}
                    onRemoveSet={onRemoveSet}
                />
            ))}
        </div>
    )
}
