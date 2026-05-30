import Question from '@/components/Question'
import Input from '@/components/Input'
import { useUser } from '@/hooks/useUser'
import toast from 'react-hot-toast'

export default function Goal() {
    const { user, setUser } = useUser()

    if (!user) return null

    return (
        <Question question="What is your goal?">
            <Input
                type="radio"
                name="goal"
                value="build_muscle"
                label="Build Muscle"
                checked={user.goal === 'build_muscle'}
                onChange={(e) => {
                    setUser({
                        ...user,
                        goal: e.target.value as typeof user.goal,
                    })
                    toast.success('New goal saved.')
                }}
            />
            <Input
                type="radio"
                name="goal"
                value="lose_fat"
                label="Lose Fat"
                checked={user.goal === 'lose_fat'}
                onChange={(e) => {
                    setUser({
                        ...user,
                        goal: e.target.value as typeof user.goal,
                    })
                    toast.success('New goal saved.')
                }}
            />
            <Input
                type="radio"
                name="goal"
                value="increase_strength"
                label="Increase Strength"
                checked={user.goal === 'increase_strength'}
                onChange={(e) => {
                    setUser({
                        ...user,
                        goal: e.target.value as typeof user.goal,
                    })
                    toast.success('New goal saved.')
                }}
            />
            <Input
                type="radio"
                name="goal"
                value="stay_fit"
                label="Stay fit & healthy"
                checked={user.goal === 'stay_fit'}
                onChange={(e) => {
                    setUser({
                        ...user,
                        goal: e.target.value as typeof user.goal,
                    })
                    toast.success('New goal saved.')
                }}
            />
        </Question>
    )
}
