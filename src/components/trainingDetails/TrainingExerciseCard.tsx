import type { Exercise } from '@/types/training.types'
import WorkoutSetRow from './WorkoutSetRow'
import type { TrainingSet } from '@/types/training.types'
import Button from '../Button'

type Props = {
    exercise: Exercise
    onChange: (
        id: string,
        field: keyof TrainingSet,
        value: number | null
    ) => void
    onAddSet: (exerciseId: string) => void
    isEditing: boolean
    onRemoveSet: (exerciseId: string, setId: string) => void
}

export default function TrainingExerciseCard({
    exercise,
    onChange,
    isEditing,
    onAddSet,
    onRemoveSet,
}: Props) {
    return (
        <div>
            <span>{exercise.name}</span>
            {exercise.workout_sets.map((set) => (
                <WorkoutSetRow
                    key={set.id}
                    set={set}
                    onChange={onChange}
                    isEditing={isEditing}
                    onRemoveSet={onRemoveSet}
                    exerciseId={exercise.id}
                />
            ))}

            {isEditing && (
                <Button onClick={() => onAddSet(exercise.id)}>Add Set</Button>
            )}
        </div>
    )
}
