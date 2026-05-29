import { MealUIContext, useMealUIState } from '@/app/contexts/MealUIContext'

export function MealUIProvider({ children }: { children: React.ReactNode }) {
    const value = useMealUIState()

    return (
        <MealUIContext.Provider value={value}>
            {children}
        </MealUIContext.Provider>
    )
}
