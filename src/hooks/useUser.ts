import { useState } from 'react'
import type { UserData } from '@/types/types'
import { ONBOARDING_DATA_KEY } from '@/constants/localStorage'
import { calculateMacros } from '@/utils/calories'
import { goalStatusMap } from '@/data/goalStatusMap'

function getUserFromStorage(): UserData | null {
    const raw = localStorage.getItem(ONBOARDING_DATA_KEY)
    if (!raw) return null

    try {
        return JSON.parse(raw)
    } catch {
        return null
    }
}

export function useUser() {
    const [user, setUserState] = useState<UserData | null>(() =>
        getUserFromStorage()
    )

    function setUser(newUser: UserData) {
        setUserState(newUser)
        localStorage.setItem(ONBOARDING_DATA_KEY, JSON.stringify(newUser))
    }

    const macros = user ? calculateMacros(user) : null

    const goalStatus = user ? goalStatusMap[user.goal] : null

    return {
        user,
        macros,
        isLoggedIn: !!user,
        setUser,

        goalStatus,
    }
}
