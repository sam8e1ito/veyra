import {
    MealDataContext,
    useMealDataValue,
} from '@/app/contexts/MealDataContext'

export function MealDataProvider({ children }: { children: React.ReactNode }) {
    const value = useMealDataValue()

    return (
        <MealDataContext.Provider value={value}>
            {children}
        </MealDataContext.Provider>
    )
}
