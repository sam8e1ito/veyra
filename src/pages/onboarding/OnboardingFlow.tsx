import { useEffect, useState } from 'react'
import { steps } from './steps'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button'
import type { OnboardingData } from '@/types/onboarding.types'
import { isStepValid } from './validation'
import { useProfile } from '@/hooks/useProfile'
import { useAuth } from '@/hooks/useAuth'
import { upsertProfile } from '@/lib/profile/profileService'
import { assertUserData } from '@/utils/user'
import toast from 'react-hot-toast'

export default function OnboardingFlow() {
    const { user } = useAuth()
    const { profile, loading: profileLoading, setProfile } = useProfile()

    const [step, setStep] = useState(0)
    const [saving, setSaving] = useState(false)

    const navigate = useNavigate()

    const [data, setData] = useState<OnboardingData>({
        user_id: user?.id ?? null,
        goal: null,
        activityLevel: null,
        trainingFrequency: null,

        heightCm: null,
        weightKg: null,
        gender: null,
        age: null,
    })

    useEffect(() => {
        if (!profileLoading && profile) {
            navigate('/', { replace: true })
        }
    }, [profile, profileLoading, navigate])

    const StepComponent = steps[step]

    async function next() {
        if (!isStepValid(step, data)) {
            return
        }

        if (step < steps.length - 1) {
            setStep(step + 1)
            return
        }

        if (!user) return

        let finalData
        try {
            finalData = assertUserData(data, user.id)
        } catch {
            return
        }

        setSaving(true)

        const { error } = await upsertProfile(user.id, finalData)

        setSaving(false)

        if (error) {
            toast.error('Could not save your profile. Please try again.')
            return
        }

        setProfile(finalData)
        navigate('/')
    }

    function back() {
        if (step > 0) setStep(step - 1)
    }

    function update(fields: Partial<OnboardingData>) {
        setData((prev) => ({ ...prev, ...fields }))
    }

    if (profileLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <StepComponent data={data} update={update} />
            <div>
                {step > 0 && <Button onClick={back}>Back</Button>}

                <Button onClick={next} disabled={saving}>
                    {saving
                        ? 'Saving...'
                        : step === steps.length - 1
                          ? 'Finish'
                          : 'Continue'}
                </Button>
            </div>
        </div>
    )
}
