import Question from '@/components/Question'
import Input from '@/components/Input'
import type { OnboardingData } from '@/types/types'

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
                value="lightly active"
                label="Lightly active"
                checked={data.activityLevel === 'lightly active'}
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
                value="moderately active"
                label="Moderately active"
                checked={data.activityLevel === 'moderately active'}
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
                value="very active"
                label="Very active"
                checked={data.activityLevel === 'very active'}
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
