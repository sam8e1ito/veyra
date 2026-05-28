import { Navigate } from 'react-router-dom'
import { OnboardingDoneKey } from '@/constants/localStorage'

type ProtectedRouteProps = {
    children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const done = localStorage.getItem(OnboardingDoneKey)

    if (done !== 'true') {
        return <Navigate to="/" />
    }

    return children
}
