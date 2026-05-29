import type { Split } from '@/types/types'
import type { TrainingFrequency } from '@/types/onboarding.types'

export function getRecommendedSplit(frequency: TrainingFrequency): Split {
    switch (frequency) {
        case '1-2':
            return 'Fullbody'

        case '3-4':
            return 'Upper_Lower'

        case '5+':
            return 'PPL_2x'
    }
}
