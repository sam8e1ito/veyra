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
                    exercise_id: '',
                    sets: 2,
                    reps: 8,
                },
            ],
            // exercises: [
            //     {
            //         name: 'Bench Press (Barbell)',
            //         muscle_group: 'chest',
            //         sets: 2,
            //         reps: 8,
            //     },
            //     {
            //         name: 'Squat',
            //         muscle_group: 'quads',
            //         sets: 2,
            //         reps: 8,
            //     },
            //     {
            //         name: 'Seated Leg Curl',
            //         muscle_group: 'hamstrings',
            //         sets: 2,
            //         reps: 8,
            //     },
            //     {
            //         name: 'Bent Over Barbell Row',
            //         muscle_group: 'upper_back',
            //         sets: 2,
            //         reps: 8,
            //     },
            //     {
            //         name: 'Bicep Curl (Cable)',
            //         muscle_group: 'biceps',
            //         sets: 2,
            //         reps: 8,
            //     },
            //     {
            //         name: 'Triceps Pushdown',
            //         muscle_group: 'triceps',
            //         sets: 2,
            //         reps: 8,
            //     },
            //     {
            //         name: 'Single Arm Lateral Raise (Cable)',
            //         muscle_group: 'side_delts',
            //         sets: 2,
            //         reps: 8,
            //     },
            // ],
        },
    ],
    // ppl: [
    //     {
    //         name: 'Push',
    //         exercises: [
    //             {
    //                 name: 'Bench Press (Barbell)',
    //                 muscle_group: 'chest',
    //                 sets: 2,
    //                 reps: 8,
    //             },
    //             {
    //                 name: 'Incline Press (Dumbbell)',
    //                 muscle_group: 'chest',
    //                 sets: 2,
    //                 reps: 8,
    //             },
    //             {
    //                 name: 'Shoulder Press (Dumbbells)',
    //                 muscle_group: 'front_delts',
    //                 sets: 2,
    //                 reps: 8,
    //             },
    //             {
    //                 name: 'Triceps Pushdown',
    //                 muscle_group: 'triceps',
    //                 sets: 2,
    //                 reps: 8,
    //             },
    //             {
    //                 name: 'Single Arm Lateral Raise (Cable)',
    //                 muscle_group: 'side_delts',
    //                 sets: 2,
    //                 reps: 8,
    //             },
    //         ],
    //     },
    //     {
    //         name: 'Pull',
    //         exercises: [
    //             {
    //                 name: 'Lat Pulldown',
    //                 muscle_group: 'lats',
    //                 sets: 2,
    //                 reps: 8,
    //             },
    //             {
    //                 name: 'Wide-Grip Seated Row',
    //                 muscle_group: 'upper_back',
    //                 sets: 2,
    //                 reps: 8,
    //             },
    //             {
    //                 name: 'Low Row (unilateral)',
    //                 muscle_group: 'lats',
    //                 sets: 2,
    //                 reps: 8,
    //             },
    //             {
    //                 name: 'Bicep Curl (Cable)',
    //                 muscle_group: 'biceps',
    //                 sets: 2,
    //                 reps: 8,
    //             },
    //         ],
    //     },
    //     {
    //         name: 'Legs',
    //         exercises: [
    //             {
    //                 name: '45 Degree Calf Raise',
    //                 muscle_group: 'calves',
    //                 sets: 2,
    //                 reps: 8,
    //             },
    //             {
    //                 name: 'Leg Extension',
    //                 muscle_group: 'quads',
    //                 sets: 2,
    //                 reps: 8,
    //             },
    //             {
    //                 name: 'Seated Leg Curl',
    //                 muscle_group: 'hamstrings',
    //                 sets: 2,
    //                 reps: 8,
    //             },
    //             {
    //                 name: 'Squat (Barbell)',
    //                 muscle_group: 'quads',
    //                 sets: 2,
    //                 reps: 8,
    //             },
    //             {
    //                 name: 'Hip Adduction',
    //                 muscle_group: 'adductors',
    //                 sets: 2,
    //                 reps: 8,
    //             },
    //             {
    //                 name: 'Back Extension',
    //                 muscle_group: 'erectors',
    //                 sets: 2,
    //                 reps: 8,
    //             },
    //         ],
    //     },
    // ],
}
