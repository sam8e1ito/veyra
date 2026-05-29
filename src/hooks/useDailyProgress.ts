import { useContext } from 'react'
import { DailyProgressContext } from '@/app/providers/dailyProgressContext'

export function useDailyProgress() {
    const ctx = useContext(DailyProgressContext)

    if (!ctx) {
        throw new Error(
            'useDailyProgress must be used inside DailyProgressProvider'
        )
    }

    return ctx
}
