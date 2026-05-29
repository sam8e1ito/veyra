import Question from '@/components/Question'
import Input from '@/components/Input'
import type { OnboardingData } from '@/types/onboarding.types'

type GoalStepProps = {
    data: OnboardingData
    update: (fields: Partial<OnboardingData>) => void
}

export default function GoalStep({ data, update }: GoalStepProps) {
    return (
        <Question question="What is your goal?">
            <Input
                type="radio"
                name="goal"
                value="build_muscle"
                label="Build Muscle"
                checked={data.goal === 'build_muscle'}
                onChange={(e) =>
                    update({ goal: e.target.value as OnboardingData['goal'] })
                }
            />
            <Input
                type="radio"
                name="goal"
                value="lose_fat"
                label="Lose Fat"
                checked={data.goal === 'lose_fat'}
                onChange={(e) =>
                    update({ goal: e.target.value as OnboardingData['goal'] })
                }
            />
            <Input
                type="radio"
                name="goal"
                value="increase_strength"
                label="Increase Strength"
                checked={data.goal === 'increase_strength'}
                onChange={(e) =>
                    update({ goal: e.target.value as OnboardingData['goal'] })
                }
            />
            <Input
                type="radio"
                name="goal"
                value="stay_fit"
                label="Stay fit & healthy"
                checked={data.goal === 'stay_fit'}
                onChange={(e) =>
                    update({ goal: e.target.value as OnboardingData['goal'] })
                }
            />
        </Question>
    )
}
