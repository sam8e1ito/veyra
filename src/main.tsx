import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/router'
import { DailyProgressProvider } from './app/providers/DailyProgressProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <DailyProgressProvider>
        <RouterProvider router={router} />
    </DailyProgressProvider>
)
