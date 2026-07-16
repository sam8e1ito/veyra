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
import { generateTrainingPlan } from '@/lib/trainings/generateTrainingPlan'
import { getSplitType } from '@/utils/split'

export default function OnboardingFlow() {
    const { user } = useAuth()
    const { profile, loading: profileLoading, setProfile } = useProfile()

    const [step, setStep] = useState(0)
    const [error, setError] = useState('')
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
        setError('')
        if (!isStepValid(step, data)) {
            setError('Fill out all the fields.')
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

        try {
            const { error } = await upsertProfile(user.id, finalData)

            if (error) throw error

            await generateTrainingPlan(
                user.id,
                getSplitType(finalData.trainingFrequency)
            )

            setProfile(finalData)
            toast.success('Profile created successfully.')
            navigate('/')
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong.')
        } finally {
            setSaving(false)
        }
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
        <div className="flex flex-1 flex-col">
            <StepComponent data={data} update={update} />
            {error && <div className="text-center">{error}</div>}
            <div className="mt-auto flex gap-2">
                {step > 0 && (
                    <Button className="bg-gray-300" onClick={back}>
                        Back
                    </Button>
                )}

                <Button className="mt-auto" onClick={next} disabled={saving}>
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
