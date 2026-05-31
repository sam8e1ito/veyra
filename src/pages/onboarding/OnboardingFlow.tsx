import { ONBOARDING_DONE_KEY, getUserScopedKey } from '@/constants/localStorage'
import { useState } from 'react'
import { steps } from './steps'
import type { UserData } from '@/types/types'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button'
import type { OnboardingData } from '@/types/onboarding.types'
import { getRecommendedSplit } from '@/utils/split'
import { isStepValid } from './validation'
import { useProfile } from '@/hooks/useProfile'
import { useAuth } from '@/hooks/useAuth'

export default function OnboardingFlow() {
    const { user } = useAuth()
    const { setProfile } = useProfile()

    const [step, setStep] = useState(0)

    const navigate = useNavigate()

    const [data, setData] = useState<OnboardingData>({
        user_id: user?.id ?? null,
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
            if (!user) return

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
                user_id: user.id,
                goal: data.goal,
                activityLevel: data.activityLevel,
                trainingFrequency: data.trainingFrequency,
                splitType: getRecommendedSplit(data.trainingFrequency),

                heightCm: data.heightCm,
                weightKg: data.weightKg,
                gender: data.gender,
                age: data.age,
            }

            localStorage.setItem(
                getUserScopedKey(ONBOARDING_DONE_KEY, finalData.user_id),
                'true'
            )
            setProfile(finalData)

            navigate('/')
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
