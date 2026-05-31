import type { UserData } from '@/types/types'
import type { OnboardingData } from '@/types/onboarding.types'
import { LOCAL_USER_ID } from '@/constants/localStorage'

export function assertUserData(
    data: OnboardingData,
    userId = LOCAL_USER_ID
): UserData {
    if (
        !data.goal ||
        !data.activityLevel ||
        !data.trainingFrequency ||
        !data.splitType ||
        !data.gender
    ) {
        throw new Error('Incomplete onboarding data')
    }

    return {
        ...data,
        user_id: data.user_id ?? userId,
    } as UserData
}
