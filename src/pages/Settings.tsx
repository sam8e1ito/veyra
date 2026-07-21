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
import Modal from '@/components/Modal'
import Card from '@/components/Card'

export default function Settings() {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [isPasswordModalOpen, setIsPasswordModalOpen] =
        useState<boolean>(false)

    const [currentPassword, setCurrentPassword] = useState('')
    const [currentPasswordError, setCurrentPasswordError] = useState('')

    const [newPassword, setNewPassword] = useState('')
    const [newPasswordError, setNewPasswordError] = useState('')

    const { user, signOut, deleteAccount, changePassword } = useAuth()
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
            setIsDeleteModalOpen(false)
            navigate('/register')
        }
    }

    async function handleChangePassword() {
        if (!user) return

        setCurrentPasswordError('')
        setNewPasswordError('')

        if (!currentPassword.trim()) {
            setCurrentPasswordError('Enter your current password.')
            return
        }

        if (newPassword.trim().length < 6) {
            setNewPasswordError('Password must be at least 6 characters.')
            return
        }

        if (currentPassword === newPassword) {
            setNewPasswordError(
                'New password must be different from the old password.'
            )
            return
        }

        setLoading(true)
        setError(null)

        try {
            await changePassword(currentPassword, newPassword)

            toast.success('Password updated.')

            setCurrentPassword('')
            setNewPassword('')
            setIsPasswordModalOpen(false)
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Could not change password.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Card title="Settings">
                <form onSubmit={handleSave} className="flex flex-col gap-4 p-4">
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

                    <Button
                        type="submit"
                        disabled={loading}
                        state={loading ? 'loading' : 'default'}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </Button>

                    <hr />

                    {/* Change Password Button */}
                    <Button
                        type="button"
                        onClick={() => setIsPasswordModalOpen(true)}
                        disabled={loading}
                    >
                        Change Password
                    </Button>

                    {/* Sign Out Button  */}
                    <Button
                        type="button"
                        onClick={handleSignOut}
                        disabled={loading}
                        state={loading ? 'loading' : 'error'}
                    >
                        Sign Out
                    </Button>

                    {/* Delete Account Button  */}
                    <Button
                        type="button"
                        onClick={() => setIsDeleteModalOpen(true)}
                        disabled={loading}
                        state={loading ? 'loading' : 'error'}
                    >
                        Delete Account
                    </Button>
                </form>
            </Card>

            {/* Delete Account Modal  */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                closeBtn={false}
            >
                <h3 className="text-xl font-bold my-2">Delete Account?</h3>

                <ul className="list-disc pl-5 text-sm text-text-light-secondary space-y-1">
                    <li>Your profile will be permanently deleted.</li>
                    <li>All meals will be removed.</li>
                    <li>
                        All training plans and workout history will be lost.
                    </li>
                </ul>
                <div className="rounded-xl border border-error bg-error/10 p-4 mt-auto">
                    <p className="font-medium text-error">Warning</p>
                    <p className="mt-2 text-sm text-text-light-secondary">
                        This action is permanent and cannot be undone.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <Button
                        type="button"
                        onClick={() => setIsDeleteModalOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteAccount}
                        state={loading ? 'loading' : 'error'}
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </Button>
                </div>
            </Modal>

            {/* Change Password Modal */}
            <Modal
                isOpen={isPasswordModalOpen}
                onClose={() => {
                    setIsPasswordModalOpen(false)
                    setNewPassword('')
                }}
            >
                <Input
                    label="Your Old Password:"
                    type="password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={currentPassword}
                    error={currentPasswordError}
                />

                <Input
                    label="Your New Password:"
                    type="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    error={newPasswordError}
                />

                <div className="mt-auto flex ">
                    <Button
                        onClick={handleChangePassword}
                        disabled={loading || newPassword.trim().length < 6}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </Modal>

            {error && <p className="text-center text-error">{error}</p>}
        </>
    )
}
