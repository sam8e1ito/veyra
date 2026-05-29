import Question from '@/components/Question'
import Input from '@/components/Input'
import type { OnboardingData } from '@/types/onboarding.types'

type TrainingFrequencyProps = {
    data: OnboardingData
    update: (fields: Partial<OnboardingData>) => void
}

export default function TrainingFrequency({
    data,
    update,
}: TrainingFrequencyProps) {
    return (
        <Question question="How many days a week do you train?">
            <Input
                type="radio"
                name="trainingFrequency"
                value="1-2"
                label="1-2 times a week"
                checked={data.trainingFrequency === '1-2'}
                onChange={(e) =>
                    update({
                        trainingFrequency: e.target
                            .value as OnboardingData['trainingFrequency'],
                    })
                }
            />
            <Input
                type="radio"
                name="trainingFrequency"
                value="3-4"
                label="3-4 times a week"
                checked={data.trainingFrequency === '3-4'}
                onChange={(e) =>
                    update({
                        trainingFrequency: e.target
                            .value as OnboardingData['trainingFrequency'],
                    })
                }
            />
            <Input
                type="radio"
                name="trainingFrequency"
                value="5+"
                label="5+ times a week"
                checked={data.trainingFrequency === '5+'}
                onChange={(e) =>
                    update({
                        trainingFrequency: e.target
                            .value as OnboardingData['trainingFrequency'],
                    })
                }
            />
        </Question>
    )
}
