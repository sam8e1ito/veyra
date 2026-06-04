import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/router'
import { AppProviders } from './app/providers/AppProviders'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './app/providers/AuthProvider'
import { ProfileProvider } from './app/providers/ProfileProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <ProfileProvider>
            <AppProviders>
                <RouterProvider router={router} />
                <Toaster />
            </AppProviders>
        </ProfileProvider>
    </AuthProvider>
)
