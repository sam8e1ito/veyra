import type { Exercise } from '@/types/training.types'
import Button from '../Button'

type Props = {
    exercise: Exercise
}

export default function ExerciseActions({ exercise }: Props) {
    return (
        <>
            <Button>Replace Exercise</Button>
            <Button>Delete Exercise</Button>
        </>
    )
}
