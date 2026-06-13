import type { Split } from '@/types/types'

export const TRAINING_FREQUENCY_OPTIONS = [
    { label: '1-2 times a week', value: 2 },
    { label: '3-4 times a week', value: 4 },
    { label: '5+ times a week', value: 5 },
] as const

export function getSplitType(trainingFrequency: number): Split {
    if (trainingFrequency <= 2) return 'Fullbody'
    if (trainingFrequency <= 4) return 'Upper_Lower'
    return 'PPL_2x'
}

export function getTrainingFrequencyLabel(trainingFrequency: number): string {
    if (trainingFrequency <= 2) return '1-2 times a week'
    if (trainingFrequency <= 4) return '3-4 times a week'
    return '5+ times a week'
}
