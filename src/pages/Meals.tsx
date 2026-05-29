import Card from '@/components/Card'
import { useDailyProgress } from '@/hooks/useDailyProgress'

export default function Meals() {
    const { today, addMeal } = useDailyProgress()

    return (
        <div>
            <Card title="Your meals:">
                {today.meals.length > 0 ? (
                    today.meals.map((meal) => (
                        <li>
                            <small>{meal.id}</small>
                            <h3>{meal.title}</h3>
                            <p>{meal.calories}</p>
                        </li>
                    ))
                ) : (
                    <p>no meals yet</p>
                )}
            </Card>
        </div>
    )
}
