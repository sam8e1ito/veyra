import type { TrainingSet } from '@/types/training.types'
import Input from '../Input'
import Button from '../Button'
import clsx from 'clsx'
import Icon from '../Icon'
import TrashIcon from '@/assets/icons/trash.svg?react'

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
    const inputBaseStyles =
        'bg-transparent border-0 border-b border-dashed border-border-accent rounded-none px-0 py-0 text-center focus:border-solid focus:border-accent focus:ring-0 text-xl'

    return (
        <div className="bg-bg-primary text-xl px-2 py-2 rounded-xl flex items-center gap-2 h-14">
            <span className="bg-accent text-text-dark rounded-lg w-10 h-10 flex items-center justify-center font-medium shrink-0">
                {set.set_number}
            </span>

            <span className="text-text-light shrink-0">-</span>

            <div className="w-14 flex justify-center shrink-0">
                {isEditing ? (
                    <Input
                        type="number"
                        value={set.target_reps}
                        onChange={(e) =>
                            onChange(
                                set.id,
                                'target_reps',
                                Number(e.target.value)
                            )
                        }
                        className={clsx(inputBaseStyles, 'w-full')}
                    />
                ) : (
                    <span className="border-0 border-b border-transparent">
                        {set.target_reps}
                    </span>
                )}
            </div>

            <span className="text-text-light shrink-0">-</span>

            <div className="w-24 flex justify-center shrink-0">
                {isEditing ? (
                    <Input
                        type="number"
                        value={set.target_weight ?? ''}
                        placeholder="0"
                        onChange={(e) =>
                            onChange(
                                set.id,
                                'target_weight',
                                e.target.value === ''
                                    ? null
                                    : Number(e.target.value)
                            )
                        }
                        className={clsx(inputBaseStyles, 'w-full')}
                    />
                ) : (
                    <span className="border-0 border-b border-transparent">
                        {set.target_weight ?? '0'}
                    </span>
                )}
            </div>

            {isEditing ? (
                <Button
                    onClick={() => onRemoveSet(exerciseId, set.id)}
                    className="ml-auto p-0! w-10 h-10 flex items-center justify-center shrink-0 bg-transparent hover:bg-border-accent/30 text-text-light hover:text-red-500 transition-colors rounded-lg"
                >
                    <Icon icon={TrashIcon} className="w-5 h-5" />
                </Button>
            ) : (
                <div className="ml-auto w-10 h-10 shrink-0" />
            )}
        </div>
    )
}
