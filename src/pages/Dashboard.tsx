import Card from '@/components/Card'
import { useAuth } from '@/hooks/useAuth'
import { useMealDate } from '@/hooks/useMealDate'
import { useMealData } from '@/app/contexts/MealDataContext'
import { useProfile } from '@/hooks/useProfile'
import { calculateMacros } from '@/utils/calories'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '@/components/ProgressBar'
import Button from '@/components/Button'
import { useTrainingPlan } from '@/hooks/useTraining'
import Icon from '@/components/Icon'
import MealsIcon from '@/assets/icons/meals.svg?react'
import DumbbellIcon from '@/assets/icons/dumbbell.svg?react'
import Loading from './Loading'

export default function Dashboard() {
    const navigate = useNavigate()

    const { selectedDate } = useMealDate()
    const { loading: authLoading } = useAuth()
    const { profile, loading: profileLoading } = useProfile()
    const { getTotalsByDate, loading: mealsLoading } = useMealData()

    const { todaysWorkout, loading: trainingLoading } = useTrainingPlan()

    const totalWorkoutSets =
        todaysWorkout?.workout_exercises.reduce(
            (total: number, exercise: any) =>
                total + exercise.workout_sets.length,
            0
        ) ?? 0
    if (
        !profile ||
        authLoading ||
        profileLoading ||
        mealsLoading ||
        trainingLoading
    ) {
        return <Loading />
    }

    const macros = calculateMacros(profile)

    const totals = getTotalsByDate(selectedDate)

    return (
        <div>
            <Card title="Your calories today" className="mb-5">
                <div className="m-2.5">
                    <ProgressBar
                        current={totals.calories}
                        max={macros.totalCalories}
                        className="mb-4"
                    />
                    <div className="flex flex-row justify-between items-center mb-4">
                        <div>
                            <div>
                                Calories: {totals.calories} /{' '}
                                {macros.totalCalories}
                            </div>
                            <div>Protein: {totals.protein}g</div>
                            <div>Carbs: {totals.carbs}g</div>
                            <div>Fats: {totals.fats}g</div>
                        </div>
                        <Icon icon={MealsIcon} size={70} />
                    </div>
                </div>

                <Button
                    className="rounded-t-none shadow-[inset_0_8px_8px_-4px_rgba(0,0,0,0.3)] font-medium tracking-widest"
                    onClick={() => navigate('/meals')}
                >
                    My Meals
                </Button>
            </Card>

            <Card title="Today's workout">
                {todaysWorkout ? (
                    <>
                        <div className="mx-2.5 flex h-32 items-center justify-between">
                            <div
                                className="
                                    relative flex h-20 w-20 flex-col items-center justify-center
                                    after:absolute
                                    after:inset-0
                                    after:rounded-full
                                    after:border-4
                                    after:border-accent
                                    after:content-['']
                                "
                            >
                                <span className="text-[9px] uppercase tracking-wide text-accent">
                                    Total Sets
                                </span>

                                <span className="text-3xl font-extrabold leading-none">
                                    {totalWorkoutSets}
                                </span>
                            </div>

                            <div className="text-center flex flex-col justify-center items-center">
                                <span className="uppercase font-bold text-accent text-[12px]">
                                    Workout
                                </span>
                                <p className="text-[32px] uppercase tracking-widest font-extrabold leading-none">
                                    {todaysWorkout.name}
                                </p>
                            </div>

                            <Icon
                                icon={DumbbellIcon}
                                size={70}
                                className="ml-2.5"
                            />
                        </div>
                        <Button className="rounded-t-none shadow-[inset_0_8px_8px_-4px_rgba(0,0,0,0.3)] font-medium tracking-widest">
                            Start Training
                        </Button>
                        {/*Will implement later */}
                    </>
                ) : (
                    <>
                        <p className="my-10 text-center">No workout today</p>
                        <Button
                            className="rounded-t-none shadow-[inset_0_8px_8px_-4px_rgba(0,0,0,0.3)] font-medium tracking-widest"
                            onClick={() => navigate('/trainings')}
                        >
                            My Trainings
                        </Button>
                    </>
                )}
            </Card>
        </div>
    )
}
