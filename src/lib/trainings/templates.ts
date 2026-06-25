import type { TemplateWorkout } from '@/types/trainingTemplates.types'

export const TEMPLATES: Record<string, TemplateWorkout[]> = {
    upper_lower: [
        {
            name: 'Upper',
            exercises: [
                {
                    exercise_id: 'incline_bench_press',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'lat_pulldown',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'incline_bench_press',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'seated_cable_row',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'cable_lateral_raise',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'tricep_pushdown',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'cable_curl',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'chest_fly',
                    sets: 2,
                    reps: 8,
                },
            ],
        },
        {
            name: 'Lower',
            exercises: [
                {
                    exercise_id: 'standing_calf_raise',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'leg_extension',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'leg_curl',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'squat',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'hip_adduction',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'back_extension',
                    sets: 2,
                    reps: 8,
                },
            ],
        },
    ],

    fullbody: [
        {
            name: 'Full Body',
            exercises: [
                {
                    exercise_id: 'bench_press',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'squat',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'leg_curl',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'barbell_row',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'cable_curl',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'tricep_pushdown',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'cable_lateral_raise',
                    sets: 2,
                    reps: 8,
                },
            ],
        },
    ],
    ppl: [
        {
            name: 'Push',
            exercises: [
                {
                    exercise_id: 'bench_press',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'incline_dumbbell_press',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'dumbbell_shoulder_press',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'tricep_pushdown',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'cable_lateral_raise',
                    sets: 2,
                    reps: 8,
                },
            ],
        },
        {
            name: 'Pull',
            exercises: [
                {
                    exercise_id: 'lat_pulldown',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'seated_cable_row',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'low_row',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'cable_curl',
                    sets: 2,
                    reps: 8,
                },
            ],
        },
        {
            name: 'Legs',
            exercises: [
                {
                    exercise_id: 'standing_calf_raise',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'leg_extension',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'leg_curl',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'squat',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'hip_adduction',
                    sets: 2,
                    reps: 8,
                },
                {
                    exercise_id: 'back_extension',
                    sets: 2,
                    reps: 8,
                },
            ],
        },
    ],
}
