import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'

type ProfileGateProps = {
    children: React.ReactNode
}

export default function ProfileGate({ children }: ProfileGateProps) {
    const { user, loading: authLoading } = useAuth()
    const { profile, loading: profileLoading } = useProfile()
    const location = useLocation()

    if (authLoading || profileLoading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    // user exists but no profile → onboarding
    if (!profile) {
        return <Navigate to="/onboarding" replace />
    }

    return children
}
