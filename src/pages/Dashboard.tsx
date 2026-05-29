import Card from '@/components/Card'
import { useUser } from '@/hooks/useUser'
import { calculateMacros } from '@/utils/calories'
import { useDailyProgress } from '@/hooks/useDailyProgress'
import { useMemo } from 'react'

export default function Dashboard() {
    const { user, goalStatus } = useUser()
    const { today } = useDailyProgress()

    const macros = useMemo(() => {
        if (!user) return null
        return calculateMacros(user)
    }, [user])

    if (!user || !macros) {
        return <div>Loading...</div>
    }

    const remaining = {
        calories: macros.totalCalories - today.calories,
        protein: macros.protein - today.protein,
        carbs: macros.carbs - today.carbs,
        fats: macros.fats - today.fats,
    }

    return (
        <div>
            <Card title="Current Goal">
                <div>{goalStatus}</div>
            </Card>

            <Card title="Calories">
                <div>
                    {today.calories} / {macros.totalCalories} kcal
                </div>
                <div>Remaining: {remaining.calories} kcal</div>
            </Card>

            <div>
                <Card title="Protein">
                    <div>
                        {today.protein} / {macros.protein}g
                    </div>
                </Card>

                <Card title="Carbs">
                    <div>
                        {today.carbs} / {macros.carbs}g
                    </div>
                </Card>

                <Card title="Fats">
                    <div>
                        {today.fats} / {macros.fats}g
                    </div>
                </Card>
            </div>
        </div>
    )
}
