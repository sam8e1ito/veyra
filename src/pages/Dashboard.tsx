import Card from '@/components/Card'
import { useUser } from '@/hooks/useUser'
import { useMealDate } from '@/hooks/useMealDate'
import { useMealData } from '@/app/contexts/MealDataContext'

export default function Dashboard() {
    const { user, macros, goalStatus, splitLabel } = useUser()
    const { selectedDate } = useMealDate()
    const { getDay } = useMealData()
    const selectedDay = getDay(selectedDate)

    if (!user || !macros) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Card title="Current Goal">
                <div>{goalStatus}</div>
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
