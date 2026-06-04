import { useContext } from 'react'
import { ProfileContext } from '@/app/contexts/ProfileContext'
import { SplitLabel } from '@/data/splitLabel'

export function useProfile() {
    const ctx = useContext(ProfileContext)

    if (!ctx) {
        throw new Error('useProfile must be used inside ProfileProvider')
    }

    const splitLabel = ctx.profile ? SplitLabel[ctx.profile.splitType] : null

    return {
        ...ctx,
        splitLabel,
    }
}
