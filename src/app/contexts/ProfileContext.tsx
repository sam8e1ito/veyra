import { createContext } from 'react'
import type { UserData } from '@/types/types'

type ProfileContextType = {
    profile: UserData | null
    setProfile: (p: UserData | null) => void
    loading: boolean
}

export const ProfileContext = createContext<ProfileContextType | null>(null)
