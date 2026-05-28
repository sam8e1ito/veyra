import Question from '@/components/Question'
import Input from '@/components/Input'
import type { OnboardingData } from '@/types/types'

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
                value="build muscle"
                label="Build Muscle"
                checked={data.goal === 'build muscle'}
                onChange={(e) =>
                    update({ goal: e.target.value as OnboardingData['goal'] })
                }
            />
            <Input
                type="radio"
                name="goal"
                value="lose fat"
                label="Lose Fat"
                checked={data.goal === 'lose fat'}
                onChange={(e) =>
                    update({ goal: e.target.value as OnboardingData['goal'] })
                }
            />
            <Input
                type="radio"
                name="goal"
                value="increase strength"
                label="Increase Strength"
                checked={data.goal === 'increase strength'}
                onChange={(e) =>
                    update({ goal: e.target.value as OnboardingData['goal'] })
                }
            />
            <Input
                type="radio"
                name="goal"
                value="stay fit & healthy"
                label="Stay fit & healthy"
                checked={data.goal === 'stay fit & healthy'}
                onChange={(e) =>
                    update({ goal: e.target.value as OnboardingData['goal'] })
                }
            />
        </Question>
    )
}
