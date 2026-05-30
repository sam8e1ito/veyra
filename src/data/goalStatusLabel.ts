import type { Goal } from '@/types/onboarding.types'

export const goalStatusLabel: Record<Goal, string> = {
    build_muscle: 'Bulk',
    increase_strength: 'Lean Bulk',
    lose_fat: 'Cut',
    stay_fit: 'Maintenance',
}
