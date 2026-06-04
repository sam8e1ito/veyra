import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/Button'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Input from '@/components/Input'
import { useProfile } from '@/hooks/useProfile'
import Select from '@/components/Select'
import { upsertProfile } from '@/lib/profile/profileService'
import toast from 'react-hot-toast'

export default function Settings() {
    const { user, signOut } = useAuth()
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

                <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </Button>
            </form>
            <Button onClick={handleSignOut} disabled={loading}>
                Sign Out
            </Button>
            {error && <p>{error}</p>}
        </>
    )
}
