import type { OnboardingData } from '@/types/onboarding.types'

export function isStepValid(step: number, data: OnboardingData) {
    switch (step) {
        case 0:
            return data.goal !== null

        case 1:
            return data.activityLevel !== null

        case 2:
            return data.trainingFrequency !== null

        case 3:
            return (
                data.heightCm !== null &&
                data.weightKg !== null &&
                data.age !== null &&
                data.gender !== null
            )

        default:
            return true
    }
}
