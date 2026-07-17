import type { TrainingSet } from '@/types/training.types'
import Input from '../Input'
import Button from '../Button'

type Props = {
    set: TrainingSet
    isEditing: boolean
    onChange: (
        id: string,
        field: keyof TrainingSet,
        value: number | null
    ) => void
    onRemoveSet: (exerciseId: string, setId: string) => void
    exerciseId: string
}

export default function WorkoutSetRow({
    set,
    isEditing,
    onChange,
    onRemoveSet,
    exerciseId,
}: Props) {
    if (!isEditing) {
        return (
            <p>
                {set.set_number} - {set.target_reps} -{' '}
                {set.target_weight ?? 'No weight logged'}
            </p>
        )
    }

    return (
        <div>
            <span>{set.set_number}</span>

            <Input
                type="number"
                value={set.target_reps}
                onChange={(e) =>
                    onChange(set.id, 'target_reps', Number(e.target.value))
                }
            />

            <Input
                type="number"
                value={set.target_weight ?? ''}
                onChange={(e) =>
                    onChange(
                        set.id,
                        'target_weight',
                        e.target.value === '' ? null : Number(e.target.value)
                    )
                }
            />

            <Button onClick={() => onRemoveSet(exerciseId, set.id)}>
                Remove
            </Button>
        </div>
    )
}
