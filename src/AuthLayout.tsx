import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
    return (
        <main className="min-h-dvh px-6 pt-20 pb-6 flex flex-col">
            <Outlet />
        </main>
    )
}
