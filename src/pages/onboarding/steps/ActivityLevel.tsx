import Question from '@/components/Question'
import Input from '@/components/Input'
import type { OnboardingData } from '@/types/onboarding.types'

type ActivityLevelStepProps = {
    data: OnboardingData
    update: (fields: Partial<OnboardingData>) => void
}

export default function ActivityLevel({
    data,
    update,
}: ActivityLevelStepProps) {
    return (
        <Question question="Tell us about your daily activity">
            <Input
                type="radio"
                name="activityLevel"
                value="sedentary"
                label="Sedentary"
                checked={data.activityLevel === 'sedentary'}
                onChange={(e) =>
                    update({
                        activityLevel: e.target
                            .value as OnboardingData['activityLevel'],
                    })
                }
            />
            <Input
                type="radio"
                name="activityLevel"
                value="light"
                label="Lightly active"
                checked={data.activityLevel === 'light'}
                onChange={(e) =>
                    update({
                        activityLevel: e.target
                            .value as OnboardingData['activityLevel'],
                    })
                }
            />
            <Input
                type="radio"
                name="activityLevel"
                value="moderate"
                label="Moderately active"
                checked={data.activityLevel === 'moderate'}
                onChange={(e) =>
                    update({
                        activityLevel: e.target
                            .value as OnboardingData['activityLevel'],
                    })
                }
            />
            <Input
                type="radio"
                name="activityLevel"
                value="very_active"
                label="Very active"
                checked={data.activityLevel === 'very_active'}
                onChange={(e) =>
                    update({
                        activityLevel: e.target
                            .value as OnboardingData['activityLevel'],
                    })
                }
            />
        </Question>
    )
}
