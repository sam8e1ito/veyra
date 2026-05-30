import { useMemo, useState, type ReactNode } from 'react'
import { MealDateContext } from '@/app/contexts/MealDateContext'
import { getDateKey } from '@/utils/date'

export function MealDateProvider({ children }: { children: ReactNode }) {
    const [selectedDate, setSelectedDate] = useState(() => getDateKey())

    const value = useMemo(
        () => ({ selectedDate, setSelectedDate }),
        [selectedDate]
    )

    return (
        <MealDateContext.Provider value={value}>
            {children}
        </MealDateContext.Provider>
    )
}
