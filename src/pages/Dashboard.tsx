import Card from '@/components/Card'
import { useAuth } from '@/hooks/useAuth'
import { useMealDate } from '@/hooks/useMealDate'
import { useMealData } from '@/app/contexts/MealDataContext'
import { useProfile } from '@/hooks/useProfile'
import { calculateMacros } from '@/utils/calories'
import { GoalStatusLabel } from '@/data/goalStatusLabel'

export default function Dashboard() {
    const { user } = useAuth()
    const { profile, splitLabel } = useProfile()
    const goalStatusLabel = profile ? GoalStatusLabel[profile.goal] : null
    const macros = profile ? calculateMacros(profile) : null
    const { selectedDate } = useMealDate()
    const { getDay } = useMealData()
    const selectedDay = getDay(selectedDate)

    if (!user || !profile || !macros) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Card title="Current Goal">
                <div>{goalStatusLabel}</div>
            </Card>

            <Card title="Calories">
                <div>
                    {selectedDay.calories} / {macros.totalCalories} kcal
                </div>
            </Card>

            <div>
                <Card title="Protein">
                    <div>
                        {selectedDay.protein} / {macros.protein}g
                    </div>
                </Card>

                <Card title="Carbs">
                    <div>
                        {selectedDay.carbs} / {macros.carbs}g
                    </div>
                </Card>

                <Card title="Fats">
                    <div>
                        {selectedDay.fats} / {macros.fats}g
                    </div>
                </Card>
            </div>

            <Card>{splitLabel}</Card>
        </div>
    )
}
