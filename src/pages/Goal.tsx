import Question from '@/components/Question'
import Input from '@/components/Input'
import { useProfile } from '@/hooks/useProfile'
import toast from 'react-hot-toast'

export default function Goal() {
    const { profile, setProfile } = useProfile()

    if (!profile) return null

    return (
        <Question question="What is your goal?">
            <Input
                type="radio"
                name="goal"
                value="build_muscle"
                label="Build Muscle"
                checked={profile.goal === 'build_muscle'}
                onChange={(e) => {
                    setProfile({
                        ...profile,
                        goal: e.target.value as typeof profile.goal,
                    })
                    toast.success('New goal saved.')
                }}
            />
            <Input
                type="radio"
                name="goal"
                value="lose_fat"
                label="Lose Fat"
                checked={profile.goal === 'lose_fat'}
                onChange={(e) => {
                    setProfile({
                        ...profile,
                        goal: e.target.value as typeof profile.goal,
                    })
                    toast.success('New goal saved.')
                }}
            />
            <Input
                type="radio"
                name="goal"
                value="increase_strength"
                label="Increase Strength"
                checked={profile.goal === 'increase_strength'}
                onChange={(e) => {
                    setProfile({
                        ...profile,
                        goal: e.target.value as typeof profile.goal,
                    })
                    toast.success('New goal saved.')
                }}
            />
            <Input
                type="radio"
                name="goal"
                value="stay_fit"
                label="Stay fit & healthy"
                checked={profile.goal === 'stay_fit'}
                onChange={(e) => {
                    setProfile({
                        ...profile,
                        goal: e.target.value as typeof profile.goal,
                    })
                    toast.success('New goal saved.')
                }}
            />
        </Question>
    )
}
