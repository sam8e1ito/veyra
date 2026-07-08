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

    async function deleteAccount() {
        const { data } = await supabase.auth.getSession()

        const token = data.session?.access_token

        await fetch(
            'https://wuknkbuiavorafmssjxm.functions.supabase.co/delete-account',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
    }

    async function changePassword(
        currentPassword: string,
        newPassword: string
    ) {
        const { data, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !data.session?.user.email) {
            throw new Error('Could not verify user.')
        }

        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: data.session.user.email,
            password: currentPassword,
        })

        if (signInError) {
            throw new Error('Current password is incorrect.')
        }

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        })

        if (error) throw error
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signIn,
                signUp,
                signOut,
                deleteAccount,
                changePassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
