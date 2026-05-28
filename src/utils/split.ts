import type { Split, TrainingFrequency } from '@/types/types'

export function getRecommendedSplit(frequency: TrainingFrequency): Split {
    switch (frequency) {
        case '1-2':
            return 'Fullbody'

        case '3-4':
            return 'Upper Lower'

        case '5+':
            return 'PPL 2x'
    }
}
