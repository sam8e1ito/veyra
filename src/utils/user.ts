import type { UserData } from '@/types/types'
import type { OnboardingData } from '@/types/onboarding.types'

export function assertUserData(data: OnboardingData): UserData {
    if (
        !data.goal ||
        !data.activityLevel ||
        !data.trainingFrequency ||
        !data.splitType ||
        !data.gender
    ) {
        throw new Error('Incomplete onboarding data')
    }

    return data as UserData
}
