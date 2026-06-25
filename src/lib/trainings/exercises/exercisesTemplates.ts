import type { ExerciseTemplate } from '@/types/exerciseTemplate.types'

export const EXERCISES_TEMPLATES: ExerciseTemplate[] = [
    // Chest
    {
        id: 'incline_dumbbell_press',
        name: 'Incline Dumbbell Press',
        muscle_group: 'chest',
        equipment: 'dumbbells',
    },
    {
        id: 'incline_bench_press',
        name: 'Incline Bench Press',
        muscle_group: 'chest',
        equipment: 'barbell',
    },
    {
        id: 'incline_dumbbell_press',
        name: 'Incline Dumbbell Press',
        muscle_group: 'chest',
        equipment: 'dumbbells',
    },
    {
        id: 'dumbbell_press',
        name: 'Dumbbell Press',
        muscle_group: 'chest',
        equipment: 'dumbbells',
    },
    {
        id: 'bench_press',
        name: 'Bench Press',
        muscle_group: 'chest',
        equipment: 'barbell',
    },
    {
        id: 'chest_fly',
        name: 'Chest Fly',
        muscle_group: 'chest',
        equipment: 'machine',
    },
    {
        id: 'push_up',
        name: 'Push-Up',
        muscle_group: 'chest',
        equipment: 'bodyweight',
    },

    // Lats
    {
        id: 'pull_up',
        name: 'Pull-Up',
        muscle_group: 'lats',
        equipment: 'bodyweight',
    },
    {
        id: 'assisted_pull_up',
        name: 'Assisted Pull-Up',
        muscle_group: 'lats',
        equipment: 'machine',
    },
    {
        id: 'lat_pulldown',
        name: 'Lat Pulldown',
        muscle_group: 'lats',
        equipment: 'machine',
    },
    {
        id: 'barbell_row',
        name: 'Barbell Row',
        muscle_group: 'lats',
        equipment: 'barbell',
    },
    {
        id: 'dumbbell_row',
        name: 'Dumbbell Row',
        muscle_group: 'lats',
        equipment: 'dumbbells',
    },
    {
        id: 'low_row',
        name: 'Low Row (unilateral)',
        muscle_group: 'lats',
        equipment: 'machine',
    },

    // Upper Back
    {
        id: 'seated_cable_row',
        name: 'Seated Cable Row',
        muscle_group: 'upper_back',
        equipment: 'cable',
    },
    {
        id: 'chest_supported_row',
        name: 'Chest Supported Row',
        muscle_group: 'upper_back',
        equipment: 'machine',
    },
    {
        id: 'face_pull',
        name: 'Face Pull',
        muscle_group: 'upper_back',
        equipment: 'cable',
    },

    // Shoulders
    {
        id: 'overhead_press',
        name: 'Overhead Press',
        muscle_group: 'front_delts',
        equipment: 'barbell',
    },
    {
        id: 'dumbbell_shoulder_press',
        name: 'Dumbbell Shoulder Press',
        muscle_group: 'front_delts',
        equipment: 'dumbbells',
    },
    {
        id: 'lateral_raise',
        name: 'Lateral Raise',
        muscle_group: 'side_delts',
        equipment: 'dumbbells',
    },
    {
        id: 'cable_lateral_raise',
        name: 'Cable Lateral Raise',
        muscle_group: 'side_delts',
        equipment: 'cable',
    },
    {
        id: 'rear_delt_fly',
        name: 'Rear Delt Fly',
        muscle_group: 'rear_delts',
        equipment: 'machine',
    },

    // Biceps
    {
        id: 'barbell_curl',
        name: 'Barbell Curl',
        muscle_group: 'biceps',
        equipment: 'barbell',
    },
    {
        id: 'dumbbell_curl',
        name: 'Dumbbell Curl',
        muscle_group: 'biceps',
        equipment: 'dumbbells',
    },
    {
        id: 'hammer_curl',
        name: 'Hammer Curl',
        muscle_group: 'biceps',
        equipment: 'dumbbells',
    },
    {
        id: 'preacher_curl',
        name: 'Preacher Curl',
        muscle_group: 'biceps',
        equipment: 'machine',
    },
    {
        id: 'cable_curl',
        name: 'Cable Curl',
        muscle_group: 'biceps',
        equipment: 'cable',
    },

    // Triceps
    {
        id: 'tricep_pushdown',
        name: 'Tricep Pushdown',
        muscle_group: 'triceps',
        equipment: 'cable',
    },
    {
        id: 'overhead_tricep_extension',
        name: 'Overhead Tricep Extension',
        muscle_group: 'triceps',
        equipment: 'cable',
    },
    {
        id: 'skullcrusher',
        name: 'Skullcrusher',
        muscle_group: 'triceps',
        equipment: 'barbell',
    },
    {
        id: 'dips',
        name: 'Dips',
        muscle_group: 'triceps',
        equipment: 'bodyweight',
    },

    // Quads
    {
        id: 'squat',
        name: 'Squat',
        muscle_group: 'quads',
        equipment: 'barbell',
    },
    {
        id: 'front_squat',
        name: 'Front Squat',
        muscle_group: 'quads',
        equipment: 'barbell',
    },
    {
        id: 'leg_press',
        name: 'Leg Press',
        muscle_group: 'quads',
        equipment: 'machine',
    },
    {
        id: 'bulgarian_split_squat',
        name: 'Bulgarian Split Squat',
        muscle_group: 'quads',
        equipment: 'dumbbells',
    },
    {
        id: 'leg_extension',
        name: 'Leg Extension',
        muscle_group: 'quads',
        equipment: 'machine',
    },

    // Hamstrings
    {
        id: 'romanian_deadlift',
        name: 'Romanian Deadlift',
        muscle_group: 'hamstrings',
        equipment: 'barbell',
    },
    {
        id: 'deadlift',
        name: 'Deadlift',
        muscle_group: 'hamstrings',
        equipment: 'barbell',
    },
    {
        id: 'leg_curl',
        name: 'Leg Curl',
        muscle_group: 'hamstrings',
        equipment: 'machine',
    },
    {
        id: 'good_morning',
        name: 'Good Morning',
        muscle_group: 'hamstrings',
        equipment: 'barbell',
    },

    // Glutes
    {
        id: 'hip_thrust',
        name: 'Hip Thrust',
        muscle_group: 'glutes',
        equipment: 'barbell',
    },

    // Calves
    {
        id: 'standing_calf_raise',
        name: 'Standing Calf Raise',
        muscle_group: 'calves',
        equipment: 'machine',
    },
    {
        id: 'seated_calf_raise',
        name: 'Seated Calf Raise',
        muscle_group: 'calves',
        equipment: 'machine',
    },

    // Adductors
    {
        id: 'hip_adduction',
        name: 'Hip Adduction',
        muscle_group: 'adductors',
        equipment: 'machine',
    },

    // Erectors
    {
        id: 'back_extension',
        name: 'Back Extension',
        muscle_group: 'erectors',
        equipment: 'machine',
    },

    // Abs
    {
        id: 'cable_crunch',
        name: 'Cable Crunch',
        muscle_group: 'core',
        equipment: 'cable',
    },
    {
        id: 'hanging_leg_raise',
        name: 'Hanging Leg Raise',
        muscle_group: 'core',
        equipment: 'bodyweight',
    },
    {
        id: 'plank',
        name: 'Plank',
        muscle_group: 'core',
        equipment: 'bodyweight',
    },
]
