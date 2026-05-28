import Question from '@/components/Question'
import Input from '@/components/Input'
import Select from '@/components/Select'
import type { Gender, OnboardingData } from '@/types/types'

type MacroTargetStepProps = {
    data: OnboardingData
    update: (fields: Partial<OnboardingData>) => void
}

export default function MacroTarget({ data, update }: MacroTargetStepProps) {
    return (
        <Question question="Let's calculate your estimated macro targets">
            <Input
                label="Height (cm)"
                type="number"
                value={data.heightCm}
                onChange={(e) => update({ heightCm: Number(e.target.value) })}
            />
            <Input
                label="Weight (kg)"
                type="number"
                value={data.weightKg}
                onChange={(e) => update({ weightKg: Number(e.target.value) })}
            />
            <Select
                label="Gender"
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
                label="Age"
                type="number"
                value={data.age}
                onChange={(e) => update({ age: Number(e.target.value) })}
            />
        </Question>
    )
}
