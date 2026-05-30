import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/router'
import { AppProviders } from './app/providers/AppProviders'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AppProviders>
        <RouterProvider router={router} />
    </AppProviders>
)
