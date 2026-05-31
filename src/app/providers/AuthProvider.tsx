import { useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getSession() {
            const { data } = await supabase.auth.getSession()

            setUser(data.session?.user ?? null)
            setLoading(false)
        }

        getSession()
    }, [])

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    async function signUp(email: string, password: string) {
        const { error } = await supabase.auth.signUp({ email, password })

        if (error) throw error
    }

    async function signIn(email: string, password: string) {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) throw error
    }

    async function signOut() {
        await supabase.auth.signOut()
    }

    return (
        <AuthContext.Provider
            value={{ user, loading, signIn, signUp, signOut }}
        >
            {children}
        </AuthContext.Provider>
    )
}
