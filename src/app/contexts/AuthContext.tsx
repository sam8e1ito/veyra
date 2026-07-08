import type { User } from '@supabase/supabase-js'
import { createContext } from 'react'

export type AuthContextValue = {
    user: User | null
    loading: boolean
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
    deleteAccount: (id: string) => Promise<void>
    changePassword: (
        currentPassword: string,
        newPassword: string
    ) => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
