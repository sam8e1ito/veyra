import { Navigate } from 'react-router-dom'
import { ONBOARDING_DONE_KEY } from '@/constants/localStorage'

type ProtectedRouteProps = {
    children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const done = localStorage.getItem(ONBOARDING_DONE_KEY)

    if (done !== 'true') {
        return <Navigate to="/" />
    }

    return children
}
