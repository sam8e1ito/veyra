import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/router'
import { AppProviders } from './app/providers/AppProviders'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AppProviders>
        <RouterProvider router={router} />
        <Toaster />
    </AppProviders>
)
