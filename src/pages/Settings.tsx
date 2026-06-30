import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/Button'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Input from '@/components/Input'
import { useProfile } from '@/hooks/useProfile'
import Select from '@/components/Select'
import { upsertProfile } from '@/lib/profile/profileService'
import toast from 'react-hot-toast'
import { getSplitType } from '@/utils/split'
import { generateTrainingPlan } from '@/lib/trainings/generateTrainingPlan'
import { deleteTrainingPlan } from '@/lib/trainings/deleteTrainingPlan'

export default function Settings() {
    const { user, signOut, deleteAccount } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { profile, setProfile } = useProfile()

    if (!profile || !user) return null

    async function handleSave(e: React.SubmitEvent) {
        e.preventDefault()
        if (!profile || !user) return

        setLoading(true)
        setError(null)

        const { error: saveError } = await upsertProfile(user.id, profile)

        await deleteTrainingPlan(user.id)
        await generateTrainingPlan(user.id, profile.splitType)

        setLoading(false)

        if (saveError) {
            setError('Could not save settings. Please try again.')
            return
        }

        toast.success('Settings saved.')
    }

    async function handleSignOut() {
        setLoading(true)
        setError(null)

        try {
            await signOut()
            navigate('/login')
        } catch (err) {
            console.error('Sign out failed:', err)
            setError(
                err instanceof Error
                    ? err.message
                    : 'Could not sign out. Please try again.'
            )
        } finally {
            setLoading(false)
        }
    }

    async function handleDeleteAccount() {
        setLoading(true)
        setError(null)

        if (!user) return
        try {
            await deleteAccount(user.id)
            navigate('/login')
        } catch (err) {
            console.error('Failed to delete the account: ', err)
            setError(
                err instanceof Error
                    ? err.message
                    : 'Could not delete the account. Please try again.'
            )
        } finally {
            setLoading(false)
            navigate('/register')
        }
    }

    return (
        <>
            <p>Settings</p>
            <form onSubmit={handleSave}>
                <Input
                    label="Height (cm)"
                    type="number"
                    value={profile.heightCm}
                    onChange={(e) => {
                        setProfile({
                            ...profile,
                            heightCm: Number(e.target.value),
                        })
                    }}
                />
                <Input
                    label="Weight (kg)"
                    type="number"
                    value={profile.weightKg}
                    onChange={(e) => {
                        setProfile({
                            ...profile,
                            weightKg: Number(e.target.value),
                        })
                    }}
                />
                <Select
                    label="Gender"
                    options={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                    ]}
                    value={profile.gender}
                    onChange={(e) => {
                        setProfile({
                            ...profile,
                            gender: e.target.value as typeof profile.gender,
                        })
                    }}
                />
                <Input
                    label="Age"
                    type="number"
                    value={profile.age}
                    onChange={(e) => {
                        setProfile({
                            ...profile,
                            age: Number(e.target.value),
                        })
                    }}
                />
                <Select
                    label="Trainings a week"
                    options={[
                        { label: '1-2', value: String(2) },
                        { label: '3-4', value: String(4) },
                        { label: '5+', value: String(5) },
                    ]}
                    value={profile.trainingFrequency}
                    onChange={(e) => {
                        const frequency = Number(e.target.value)
                        setProfile({
                            ...profile,
                            trainingFrequency: frequency,
                            splitType: getSplitType(frequency),
                        })
                    }}
                />

                <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </Button>
            </form>
            <Button onClick={handleSignOut} disabled={loading}>
                Sign Out
            </Button>
            <Button onClick={handleDeleteAccount} disabled={loading}>
                Delete Account
            </Button>
            <Button onClick={handleDeleteAccount} disabled={true}>
                Change Password {/* Will implement later */}
            </Button>
            {error && <p>{error}</p>}
        </>
    )
}
