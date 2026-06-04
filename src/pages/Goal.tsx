import Question from '@/components/Question'
import Input from '@/components/Input'
import { useProfile } from '@/hooks/useProfile'
import { useAuth } from '@/hooks/useAuth'
import { upsertProfile } from '@/lib/profile/profileService'
import toast from 'react-hot-toast'

export default function Goal() {
    const { user } = useAuth()
    const { profile, setProfile } = useProfile()

    if (!profile || !user) return null

    const currentProfile = profile
    const userId = user.id

    async function updateGoal(goal: typeof currentProfile.goal) {
        const updated: typeof currentProfile = { ...currentProfile, goal }
        setProfile(updated)

        const { error } = await upsertProfile(userId, updated)

        if (error) {
            toast.error('Could not save your goal. Please try again.')
            return
        }

        toast.success('New goal saved.')
    }

    return (
        <Question question="What is your goal?">
            <Input
                type="radio"
                name="goal"
                value="build_muscle"
                label="Build Muscle"
                checked={profile.goal === 'build_muscle'}
                onChange={() => updateGoal('build_muscle')}
            />
            <Input
                type="radio"
                name="goal"
                value="lose_fat"
                label="Lose Fat"
                checked={profile.goal === 'lose_fat'}
                onChange={() => updateGoal('lose_fat')}
            />
            <Input
                type="radio"
                name="goal"
                value="increase_strength"
                label="Increase Strength"
                checked={profile.goal === 'increase_strength'}
                onChange={() => updateGoal('increase_strength')}
            />
            <Input
                type="radio"
                name="goal"
                value="stay_fit"
                label="Stay fit & healthy"
                checked={profile.goal === 'stay_fit'}
                onChange={() => updateGoal('stay_fit')}
            />
        </Question>
    )
}
