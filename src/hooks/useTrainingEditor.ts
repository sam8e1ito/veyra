import { useState } from 'react'
import type { Exercise, TrainingSet } from '@/types/training.types'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'


export function useTrainingEditor(initialExercises: Exercise[]) {
    const [isEditing, setIsEditing] = useState(false)

    
    const [editedExercises, setEditedExercises] = useState<Exercise[]>(
        initialExercises
    )
    const [deletedSets, setDeletedSets] = useState<string[]>([])
    
    useEffect(() => {
        setEditedExercises(
            initialExercises.map(exercise => ({
                ...exercise,
                workout_sets: [...exercise.workout_sets],
            }))
        )
    }, [initialExercises])

    const updateSet = (
        id: string,
        field: keyof TrainingSet,
        value: number | null
    ) => {
        setEditedExercises(prev =>
            prev.map(exercise => ({
                ...exercise,
                workout_sets: exercise.workout_sets.map(set =>
                    set.id === id
                        ? { ...set, [field]: value }
                        : set
                )
            }))
        )
    }


    const addSet = (exerciseId: string) => {
        setEditedExercises(prev =>
            prev.map(exercise => {
                if (exercise.id !== exerciseId)
                    return exercise

                const lastSet = exercise.workout_sets.at(-1)

                const newSet: TrainingSet = {
                    id: crypto.randomUUID(),
                    exercise_id: exercise.id,
                    created_at: exercise.created_at,
                    set_number: exercise.workout_sets.length + 1,
                    target_reps: lastSet?.target_reps ?? 10,
                    target_weight: lastSet?.target_weight ?? null,
                    isNew: true,
                }

                return {
                    ...exercise,
                    workout_sets: [
                        ...exercise.workout_sets,
                        newSet,
                    ],
                }
            })
        )
    }


    const removeSet = (
        exerciseId: string,
        setId: string
    ) => {
        const exercise = editedExercises.find(
            (exercise) => exercise.id === exerciseId
        )

        const set = exercise?.workout_sets.find(
            (set) => set.id === setId
        )

        if (!set?.isNew) {
            setDeletedSets((prev) => [
                ...prev,
                setId,
            ])
        }

        setEditedExercises((prev) =>
            prev.map((exercise) =>
                exercise.id === exerciseId
                    ? {
                        ...exercise,
                        workout_sets: exercise.workout_sets.filter(
                            (set) => set.id !== setId
                        ),
                    }
                    : exercise
            )
        )
    }

const save = async () => {
    try {
        for (const setId of deletedSets) {
            const { error } = await supabase
                .from('workout_sets')
                .delete()
                .eq('id', setId)

            if (error) {
                throw error
            }
        }

        for (const exercise of editedExercises) {
            for (const set of exercise.workout_sets) {

                if (set.isNew) {
                    const { error } = await supabase
                        .from('workout_sets')
                        .insert({
                            exercise_id: set.exercise_id,
                            set_number: set.set_number,
                            target_reps: set.target_reps,
                            target_weight: set.target_weight,
                        })

                    if (error) {
                        throw error
                    }

                } else {
                    const { error } = await supabase
                        .from('workout_sets')
                        .update({
                            target_reps: set.target_reps,
                            target_weight: set.target_weight,
                        })
                        .eq('id', set.id)

                    if (error) {
                        throw error
                    }
                }
            }
        }


        toast.success('Training saved succesfully.')
        setDeletedSets([])
        setIsEditing(false)

    } catch (error) {
        toast.error('Failed to save training')
        console.error('Failed to save training:', error)
    }
}

    return {
        editedExercises,
        isEditing,
        setIsEditing,
        updateSet,
        addSet,
        deletedSets,
        removeSet,
        save,
    }
}