import { ONBOARDING_DONE_KEY } from '@/constants/localStorage'
import { useState } from 'react'
import { steps } from './steps'
import type { UserData } from '@/types/types'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button'
import type { OnboardingData } from '@/types/onboarding.types'
import { getRecommendedSplit } from '@/utils/split'
import { isStepValid } from './validation'
import { useUser } from '@/hooks/useUser'

export default function OnboardingFlow() {
    const { setUser } = useUser()

    const [step, setStep] = useState(0)

    const navigate = useNavigate()

    const [data, setData] = useState<OnboardingData>({
        goal: null,
        activityLevel: null,
        trainingFrequency: null,
        splitType: null,

        heightCm: null,
        weightKg: null,
        gender: null,
        age: null,
    })

    const StepComponent = steps[step]

    function next() {
        if (!isStepValid(step, data)) {
            console.log('error')
            return
        }

        if (step < steps.length - 1) {
            setStep(step + 1)
            return
        } else {
            const freq = data.trainingFrequency

            if (!freq) return

            if (
                !data.goal ||
                !data.activityLevel ||
                !data.gender ||
                !data.age ||
                !data.weightKg ||
                !data.heightCm ||
                !data.trainingFrequency
            ) {
                return
            }

            const finalData: UserData = {
                goal: data.goal,
                activityLevel: data.activityLevel,
                trainingFrequency: data.trainingFrequency,
                splitType: getRecommendedSplit(data.trainingFrequency),

                heightCm: data.heightCm,
                weightKg: data.weightKg,
                gender: data.gender,
                age: data.age,
            }

            localStorage.setItem(ONBOARDING_DONE_KEY, 'true')
            setUser(finalData)

            navigate('/dashboard')
        }
    }

    function back() {
        if (step > 0) setStep(step - 1)
    }

    function update(fields: Partial<OnboardingData>) {
        setData((prev) => ({ ...prev, ...fields }))
    }

    return (
        <div>
            <StepComponent data={data} update={update} />
            <div>
                {step > 0 && <Button onClick={back}>Back</Button>}

                <Button onClick={next}>
                    {step === steps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
            </div>
        </div>
    )
}
