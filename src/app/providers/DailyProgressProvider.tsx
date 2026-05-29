import { DailyProgressContext } from '../contexts/DailyProgressContext'
import { useMealData } from '../contexts/MealDataContext'
import { useMealUI } from '../contexts/MealUIContext'
import { MealDataProvider } from './MealDataProvider'
import { MealUIProvider } from './MealUIProvider'

export function DailyProgressProvider({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <MealDataProvider>
            <MealUIProvider>
                <DailyProgressContextProvider>
                    {children}
                </DailyProgressContextProvider>
            </MealUIProvider>
        </MealDataProvider>
    )
}

function DailyProgressContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const mealData = useMealData()
    const mealUI = useMealUI()

    const deleteMeal = (id: string) => {
        mealData.deleteMeal(id)
        mealUI.clearMealUIForMeal(id)
    }

    const resetDay = () => {
        mealData.resetDay()
        mealUI.resetUI()
    }

    return (
        <DailyProgressContext.Provider
            value={{
                ...mealData,
                ...mealUI,
                deleteMeal,
                resetDay,
            }}
        >
            {children}
        </DailyProgressContext.Provider>
    )
}
