import { createBrowserRouter, Navigate } from 'react-router-dom'

import Welcome from '@/pages/Welcome'
import OnboardingFlow from '@/pages/onboarding/OnboardingFlow'

import AppLayout from '@/AppLayout'

import Dashboard from '@/pages/Dashboard'
import Meals from '@/pages/Meals'
import Trainings from '@/pages/Trainings'
import Goal from '@/pages/Goal'
import Settings from '@/pages/Settings'
import Login from '@/pages/Login'

import ProtectedRoute from './ProtectedRoute'
import AuthenticatedRoute from './AuthenticatedRoute'
import Register from '@/pages/Register'

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/welcome',
        element: (
            <AuthenticatedRoute>
                <Welcome />
            </AuthenticatedRoute>
        ),
    },
    {
        path: '/onboarding',
        element: (
            <AuthenticatedRoute>
                <OnboardingFlow />
            </AuthenticatedRoute>
        ),
    },

    {
        element: (
            <ProtectedRoute>
                <AppLayout />
            </ProtectedRoute>
        ),
        children: [
            { path: '/', element: <Dashboard /> },
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
