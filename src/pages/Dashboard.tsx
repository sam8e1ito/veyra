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

export default function Dashboard() {
    const navigate = useNavigate()

    const { user } = useAuth()
    const { profile } = useProfile()
    const macros = profile ? calculateMacros(profile) : null
    const { selectedDate } = useMealDate()
    const { getTotalsByDate, loading: mealsLoading } = useMealData()
    const totals = getTotalsByDate(selectedDate)

    const { todaysWorkout } = useTrainingPlan()
    console.log(todaysWorkout)

    let totalWorkoutSets: number = 0
    for (let exercise of todaysWorkout.workout_exercises) {
        totalWorkoutSets = totalWorkoutSets + exercise.workout_sets.length
    }

    if (!user || !profile || !macros || mealsLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Card title="Your calories today">
                <ProgressBar
                    current={totals.calories}
                    max={macros.totalCalories}
                />
                <div>
                    <div>
                        Calories: {totals.calories} / {macros.totalCalories}
                    </div>
                    <div>Fats: {totals.fats}g</div>
                    <div>Carbs: {totals.carbs}g</div>
                    <div>Protein: {totals.protein}g</div>
                </div>
                <Button onClick={() => navigate('/meals')}>My Meals</Button>
            </Card>

            <Card title="Today's workout">
                {todaysWorkout ? (
                    <>
                        <div>
                            <p>Total Sets: {totalWorkoutSets}</p>
                            <p>{todaysWorkout.name}</p>
                        </div>
                        <Button>Start Training</Button>
                        {/*Will implement later */}
                    </>
                ) : (
                    <>
                        <p>No workout today</p>
                        <Button onClick={() => navigate('/trainings')}>
                            My Trainings
                        </Button>
                    </>
                )}
            </Card>
        </div>
    )
}
