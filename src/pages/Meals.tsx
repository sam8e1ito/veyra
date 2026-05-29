import Card from '@/components/Card'
import { useDailyProgress } from '@/hooks/useDailyProgress'
import Button from '@/components/Button'

export default function Meals() {
    const { today, deleteMeal, openEdit, selectedMealId, toggleSelectedMeal } =
        useDailyProgress()

    return (
        <div>
            <Card title="Your meals:">
                {today.meals.length > 0 ? (
                    today.meals.map((meal) => (
                        <Card title={meal.title} key={meal.id}>
                            <p style={{ display: 'block' }}>
                                Protein: {meal.protein}g
                            </p>
                            <p style={{ display: 'block' }}>
                                Carbs: {meal.carbs}g
                            </p>
                            <p style={{ display: 'block' }}>
                                Fats: {meal.fats}g
                            </p>

                            <Button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    toggleSelectedMeal(meal.id)
                                }}
                            >
                                ...
                            </Button>

                            {selectedMealId === meal.id && (
                                <div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            openEdit(meal)
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            deleteMeal(meal.id)
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </Card>
                    ))
                ) : (
                    <p>no meals yet</p>
                )}
            </Card>
        </div>
    )
}
