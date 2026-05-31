import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

type AuthenticatedRouteProps = {
    children: React.ReactNode
}

export default function AuthenticatedRoute({
    children,
}: AuthenticatedRouteProps) {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    return children
}
