import Question from '@/components/Question'
import Input from '@/components/Input'
import type { OnboardingData } from '@/types/onboarding.types'
import { TRAINING_FREQUENCY_OPTIONS } from '@/utils/split'

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
            {TRAINING_FREQUENCY_OPTIONS.map((option) => (
                <Input
                    key={option.value}
                    type="radio"
                    name="trainingFrequency"
                    value={String(option.value)}
                    label={option.label}
                    checked={data.trainingFrequency === option.value}
                    onChange={() =>
                        update({ trainingFrequency: option.value })
                    }
                />
            ))}
        </Question>
    )
}
