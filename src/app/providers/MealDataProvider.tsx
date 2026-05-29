import {
    MealDataContext,
    useMealDataState,
} from '@/app/contexts/MealDataContext'

export function MealDataProvider({ children }: { children: React.ReactNode }) {
    const value = useMealDataState()

    return (
        <MealDataContext.Provider value={value}>
            {children}
        </MealDataContext.Provider>
    )
}
