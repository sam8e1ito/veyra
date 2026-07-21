import Card from '@/components/Card'
import Button from '@/components/Button'
import { getDateKey } from '@/utils/date'
import { useMealDate } from '@/hooks/useMealDate'
import { useMealData } from '@/app/contexts/MealDataContext'
import { useMealUI } from '@/app/contexts/MealUIContext'
import toast from 'react-hot-toast'
import Icon from '@/components/Icon'
import MealsIcon from '@/assets/icons/meals.svg?react'
import { addDays, format } from 'date-fns'
import { formatDate } from '@/utils/date'
import NextIcon from '@/assets/icons/next.svg?react'
import BackIcon from '@/assets/icons/back.svg?react'

export default function Meals() {
    const { openEdit, selectedMealId, toggleSelectedMeal, clearMealUIForMeal } =
        useMealUI()

    const { selectedDate, setSelectedDate } = useMealDate()

    const { getMealsByDate, deleteMeal } = useMealData()

    const dayMeals = getMealsByDate(selectedDate)

    const isToday = selectedDate === getDateKey()

    const goPrevious = () => {
        const previousDate = format(
            addDays(new Date(selectedDate), -1),
            'yyyy-MM-dd'
        )

        setSelectedDate(previousDate)
    }

    const goNext = () => {
        const nextDate = format(
            addDays(new Date(selectedDate), 1),
            'yyyy-MM-dd'
        )

        setSelectedDate(nextDate)
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex flex-row items-center justify-between rounded-2xl border border-accent bg-bg-secondary p-4">
                <Button className="h-10 w-10" onClick={goPrevious}>
                    <Icon icon={BackIcon} />
                </Button>

                <h3>
                    Your Meals: {isToday ? 'today' : formatDate(selectedDate)}
                </h3>

                <Button className="h-10 w-10" onClick={goNext}>
                    <Icon icon={NextIcon} />
                </Button>
            </div>

            <div
                className={
                    dayMeals.length > 0
                        ? ''
                        : 'flex flex-1 items-center justify-center'
                }
            >
                {dayMeals.length > 0 ? (
                    dayMeals.map((meal) => (
                        <div key={meal.id}>
                            <Card title={meal.title} className="mt-4">
                                <div className="flex flex-row items-center justify-between p-2">
                                    <div>
                                        <div>Calories: {meal.calories}kcal</div>

                                        <div>Protein: {meal.protein}g</div>

                                        <div>Carbs: {meal.carbs}g</div>

                                        <div>Fats: {meal.fats}g</div>
                                    </div>

                                    <Icon icon={MealsIcon} size={70} />
                                </div>

                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        toggleSelectedMeal(meal.id)
                                    }}
                                    actionBtn
                                >
                                    {selectedMealId === meal.id
                                        ? 'Close'
                                        : 'Details'}
                                </Button>
                            </Card>

                            {selectedMealId === meal.id && (
                                <div className="mb-4 mt-2 flex flex-col gap-2">
                                    <Button
                                        className="font-medium tracking-widest"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            openEdit(meal)
                                        }}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        className="font-medium tracking-widest"
                                        state="error"
                                        onClick={async (e) => {
                                            e.stopPropagation()

                                            await deleteMeal(meal.id)

                                            clearMealUIForMeal(meal.id)

                                            toast.success(
                                                'Meal deleted successfully.'
                                            )
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full border border-accent bg-bg-secondary p-4 animate-empty-state">
                        <div className="animate-float">
                            <Icon icon={MealsIcon} size={70} />
                        </div>

                        <p className="mt-2 text-sm animate-fade-in">
                            No Meals Yet
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
