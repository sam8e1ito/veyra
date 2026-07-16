import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import Loading from '@/pages/Loading'

type AuthenticatedRouteProps = {
    children: React.ReactNode
}

export default function RequireAuth({ children }: AuthenticatedRouteProps) {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    return (
        <main className="min-h-dvh px-6 pt-20 pb-6 flex flex-col">
            {children}
        </main>
    )
}
