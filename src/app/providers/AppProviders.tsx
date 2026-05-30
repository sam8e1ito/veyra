import { MealDateProvider } from './MealDateProvider'
import { MealDataProvider } from './MealDataProvider'
import { MealUIProvider } from './MealUIProvider'

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <MealDataProvider>
            <MealDateProvider>
                <MealUIProvider>{children}</MealUIProvider>
            </MealDateProvider>
        </MealDataProvider>
    )
}
