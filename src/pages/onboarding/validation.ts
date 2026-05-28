import type { OnboardingData } from '@/types/types'

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
                data.heightCm > 0 &&
                data.weightKg > 0 &&
                data.age > 0 &&
                data.gender !== null
            )

        default:
            return true
    }
}
