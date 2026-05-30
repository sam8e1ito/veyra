import { useContext } from 'react'
import { MealDateContext } from '@/app/contexts/MealDateContext'

export function useMealDate() {
    const ctx = useContext(MealDateContext)

    if (!ctx) {
        throw new Error('useMealDate must be used inside MealDateProvider')
    }

    return ctx
}
