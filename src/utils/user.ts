import type { UserData } from '@/types/types'
import type { OnboardingData } from '@/types/onboarding.types'
import { getSplitType } from '@/utils/split'

export function assertUserData(data: OnboardingData, userId: string): UserData {
    if (
        !data.goal ||
        !data.activityLevel ||
        data.trainingFrequency == null ||
        !data.gender ||
        data.heightCm == null ||
        data.weightKg == null ||
        data.age == null
    ) {
        throw new Error('Incomplete onboarding data')
    }

    const trainingFrequency = data.trainingFrequency

    return {
        user_id: userId,
        goal: data.goal,
        activityLevel: data.activityLevel,
        trainingFrequency,
        splitType: getSplitType(trainingFrequency),
        heightCm: data.heightCm,
        weightKg: data.weightKg,
        gender: data.gender,
        age: data.age,
    }
}
