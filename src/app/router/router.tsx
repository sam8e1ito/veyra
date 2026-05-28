import { createBrowserRouter, Navigate } from 'react-router-dom'

import Welcome from '@/pages/Welcome'
import OnboardingFlow from '@/pages/onboarding/OnboardingFlow'

import AppLayout from '@/AppLayout'

import Dashboard from '@/pages/Dashboard'
import Meals from '@/pages/Meals'
import Trainings from '@/pages/Trainings'
import Goal from '@/pages/Goal'
import Settings from '@/pages/Settings'

import ProtectedRoute from './ProtectedRoute'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Welcome />,
    },
    {
        path: '/onboarding',
        element: <OnboardingFlow />,
    },

    {
        element: (
            <ProtectedRoute>
                <AppLayout />
            </ProtectedRoute>
        ),
        children: [
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/meals', element: <Meals /> },
            { path: '/trainings', element: <Trainings /> },
            { path: '/goal', element: <Goal /> },
            { path: '/settings', element: <Settings /> },
        ],
    },

    {
        path: '*',
        element: <Navigate to="/" />,
    },
])
