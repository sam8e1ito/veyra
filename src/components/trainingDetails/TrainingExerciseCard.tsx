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
        <div className=" border p-4 rounded-2xl border-accent">
            <span className="text-xl">{exercise.name}</span>
            <div className="flex flex-col gap-2 my-2">
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
            </div>

            {isEditing && (
                <Button onClick={() => onAddSet(exercise.id)}>Add Set</Button>
            )}
        </div>
    )
}
