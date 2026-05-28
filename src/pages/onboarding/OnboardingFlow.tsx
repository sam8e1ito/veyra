import { OnboardingDataKey, OnboardingDoneKey } from '@/constants/localStorage'
import { useState } from 'react'
import { steps } from './steps'

import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button'
import type { OnboardingData } from '@/types/types'
import { getRecommendedSplit } from '@/utils/split'
import { isStepValid } from './validation'

export default function OnboardingFlow() {
    const [step, setStep] = useState(0)

    const navigate = useNavigate()

    const [data, setData] = useState<OnboardingData>({
        goal: null,
        activityLevel: null,
        trainingFrequency: null,
        splitType: null,

        heightCm: 0,
        weightKg: 0,
        gender: null,
        age: 0,
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

            const finalData = {
                ...data,
                splitType: getRecommendedSplit(freq),
            }

            localStorage.setItem(OnboardingDoneKey, 'true')
            localStorage.setItem(OnboardingDataKey, JSON.stringify(finalData))

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
