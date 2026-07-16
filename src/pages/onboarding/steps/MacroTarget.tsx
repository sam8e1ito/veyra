import Question from '@/components/Question'
import Input from '@/components/Input'
import Select from '@/components/Select'
import type { Gender, OnboardingData } from '@/types/onboarding.types'

type MacroTargetStepProps = {
    data: OnboardingData
    update: (fields: Partial<OnboardingData>) => void
}

export default function MacroTarget({ data, update }: MacroTargetStepProps) {
    return (
        <Question question="Let's calculate your estimated macro targets">
            <Input
                type="number"
                value={data.heightCm ?? ''}
                placeholder="Height in cm"
                onChange={(e) => update({ heightCm: Number(e.target.value) })}
            />
            <Input
                type="number"
                value={data.weightKg ?? ''}
                placeholder="Weight in kg"
                onChange={(e) => update({ weightKg: Number(e.target.value) })}
            />
            <Select
                startOption="your gender"
                options={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                ]}
                value={data.gender ?? ''}
                onChange={(e) =>
                    update({
                        gender: e.target.value as Gender,
                    })
                }
            />
            <Input
                type="number"
                value={data.age ?? ''}
                placeholder="Age"
                onChange={(e) => update({ age: Number(e.target.value) })}
            />
        </Question>
    )
}
