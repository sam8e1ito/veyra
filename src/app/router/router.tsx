import { createBrowserRouter, Navigate } from 'react-router-dom'

import Welcome from '@/pages/Welcome'
import OnboardingFlow from '@/pages/onboarding/OnboardingFlow'

import AppLayout from '@/AppLayout'

import Dashboard from '@/pages/Dashboard'
import Meals from '@/pages/Meals'
import Trainings from '@/pages/trainings/Trainings'
import Goal from '@/pages/Goal'
import Settings from '@/pages/Settings'
import Login from '@/pages/Login'

import ProfileGate from './ProfileGate'
import RequireAuth from './RequireAuth'
import Register from '@/pages/Register'
import TrainingDetails from '@/pages/trainings/TrainingDetails'
import AuthLayout from '@/AuthLayout'
import Terms from '@/pages/legal/Terms'
import PrivacyPolicy from '@/pages/legal/PrivacyPolicy'
import Imprint from '@/pages/legal/Imprint'

export const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
        ],
    },
    {
        path: '/terms',
        element: <Terms />,
    },
    {
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
    },
    {
        path: '/imprint',
        element: <Imprint />,
    },
    {
        path: '/welcome',
        element: (
            <RequireAuth>
                <Welcome />
            </RequireAuth>
        ),
    },
    {
        path: '/onboarding',
        element: (
            <RequireAuth>
                <OnboardingFlow />
            </RequireAuth>
        ),
    },

    {
        element: (
            <ProfileGate>
                <AppLayout />
            </ProfileGate>
        ),
        children: [
            { path: '/', element: <Dashboard /> },
            { path: '/meals', element: <Meals /> },
            { path: '/trainings', element: <Trainings /> },
            { path: '/trainings/:trainingId', element: <TrainingDetails /> },
            { path: '/goal', element: <Goal /> },
            { path: '/settings', element: <Settings /> },
        ],
    },

    {
        path: '*',
        element: <Navigate to="/" />,
    },
])
