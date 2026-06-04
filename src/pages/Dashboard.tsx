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
    const { getTotalsByDate, loading: mealsLoading } = useMealData()
    const totals = getTotalsByDate(selectedDate)

    if (!user || !profile || !macros || mealsLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Card title="Current Goal">
                <div>{goalStatusLabel}</div>
            </Card>

            <Card title="Calories">
                <div>
                    {totals.calories} / {macros.totalCalories} kcal
                </div>
            </Card>

            <div>
                <Card title="Protein">
                    <div>
                        {totals.protein} / {macros.protein}g
                    </div>
                </Card>

                <Card title="Carbs">
                    <div>
                        {totals.carbs} / {macros.carbs}g
                    </div>
                </Card>

                <Card title="Fats">
                    <div>
                        {totals.fats} / {macros.fats}g
                    </div>
                </Card>
            </div>

            <Card>{splitLabel}</Card>
        </div>
    )
}
