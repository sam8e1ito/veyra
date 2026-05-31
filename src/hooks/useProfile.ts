import { useState } from 'react'
import { useAuth } from './useAuth'
import { ONBOARDING_DATA_KEY, getUserScopedKey } from '@/constants/localStorage'
import type { UserData } from '@/types/types'
import { SplitLabel } from '@/data/splitLabel'

function getUserFromStorage(userId: string): UserData | null {
    const scopedKey = getUserScopedKey(ONBOARDING_DATA_KEY, userId)
    const raw = localStorage.getItem(scopedKey)
    if (!raw) return null

    try {
        return JSON.parse(raw)
    } catch {
        return null
    }
}

export function useProfile() {
    const { user } = useAuth()

    const [profile, setProfileState] = useState<UserData | null>(() => {
        if (!user) return null
        return getUserFromStorage(user.id)
    })

    function setProfile(data: UserData) {
        if (!user) return

        const owned = {
            ...data,
            user_id: user.id,
        }

        setProfileState(owned)

        localStorage.setItem(
            getUserScopedKey(ONBOARDING_DATA_KEY, user.id),
            JSON.stringify(owned)
        )
    }

    const splitLabel = profile ? SplitLabel[profile.splitType] : null

    return {
        profile,
        setProfile,
        splitLabel,
    }
}
