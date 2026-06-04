import type { ProfileDB, ProfileRow } from '@/types/profile.db'
import type { UserData } from '@/types/types'
import { getSplitType } from '@/utils/split'

export function toProfileDB(data: UserData, userId: string): ProfileDB {
    const trainingFrequency = data.trainingFrequency

    return {
        id: userId,
        goal: data.goal,
        activity_level: data.activityLevel,
        training_frequency: trainingFrequency,
        split_type: getSplitType(trainingFrequency),
        height_cm: data.heightCm,
        weight_kg: data.weightKg,
        gender: data.gender,
        age: data.age,
    }
}

export function fromProfileDB(row: ProfileRow): UserData {
    const trainingFrequency = Number(row.training_frequency)

    return {
        user_id: row.id,
        goal: row.goal,
        activityLevel: row.activity_level,
        trainingFrequency,
        splitType: getSplitType(trainingFrequency),
        heightCm: Number(row.height_cm),
        weightKg: Number(row.weight_kg),
        gender: row.gender,
        age: Number(row.age),
    }
}
