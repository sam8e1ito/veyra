import { useEffect, useMemo, useState } from 'react'
import { ProfileContext } from '../contexts/ProfileContext'
import { useAuth } from '@/hooks/useAuth'
import { getProfile } from '@/lib/profile/profileService'
import type { UserData } from '@/types/types'

export function ProfileProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()

    const [profileByUser, setProfileByUser] = useState<{
        userId: string
        profile: UserData | null
    } | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!user) return

        let cancelled = false

        async function load() {
            setLoading(true)

            const { profile: loaded, error } = await getProfile(user!.id)

            if (cancelled) return

            if (error) {
                console.error('Failed to load profile:', error)
                setProfileByUser({ userId: user!.id, profile: null })
                setLoading(false)
                return
            }

            setProfileByUser({ userId: user!.id, profile: loaded })
            setLoading(false)
        }

        load()

        return () => {
            cancelled = true
        }
    }, [user])

    const profile = useMemo(
        () =>
            user && profileByUser?.userId === user.id
                ? profileByUser.profile
                : null,
        [user, profileByUser]
    )

    const hasProfileForUser = Boolean(user && profileByUser?.userId === user.id)
    const isLoading = Boolean(user) && (loading || !hasProfileForUser)

    const setProfile = (next: UserData | null) => {
        if (!user) return

        setProfileByUser({ userId: user.id, profile: next })
    }

    return (
        <ProfileContext.Provider
            value={{ profile, setProfile, loading: isLoading }}
        >
            {children}
        </ProfileContext.Provider>
    )
}
