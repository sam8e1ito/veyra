import Card from '@/components/Card'
import Button from '@/components/Button'
import { getDateKey } from '@/utils/date'
import { useMealDate } from '@/hooks/useMealDate'
import { useMealData } from '@/app/contexts/MealDataContext'
import { useMealUI } from '@/app/contexts/MealUIContext'

export default function Meals() {
    const {
        openEdit,
        selectedMealId,
        toggleSelectedMeal,
        clearMealUIForMeal,
    } = useMealUI()
    const { selectedDate, setSelectedDate } = useMealDate()

    const { history, getDay, deleteMeal } = useMealData()
    const dates = Array.from(
        new Set([...Object.keys(history), selectedDate])
    ).sort()
    const day = getDay(selectedDate)
    const currentIndex = dates.indexOf(selectedDate)

    const goPrevious = () => {
        const previousDate = dates[currentIndex - 1]

        if (previousDate) {
            setSelectedDate(previousDate)
        }
    }

    const goNext = () => {
        const nextDate = dates[currentIndex + 1]

        if (nextDate) {
            setSelectedDate(nextDate)
        }
    }

    const isToday = selectedDate === getDateKey()
    const canGoPrevious = currentIndex > 0
    const canGoNext = currentIndex >= 0 && currentIndex < dates.length - 1

    return (
        <div>
            <Card
                title={
                    <div>
                        <Button onClick={goPrevious} disabled={!canGoPrevious}>
                            Previous
                        </Button>
                        <h3>Your Meals: {isToday ? 'today' : selectedDate}</h3>
                        <Button onClick={goNext} disabled={!canGoNext}>
                            Next
                        </Button>
                    </div>
                }
            >
                {day.meals.length > 0 ? (
                    day.meals.map((meal) => (
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
                                            deleteMeal(selectedDate, meal.id)
                                            clearMealUIForMeal(meal.id)
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
