import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Modal from './components/Modal'
import { MealForm } from './features/meals/MealForm'
import { useMealUI } from './app/contexts/MealUIContext'
import './index.css'

export default function AppLayout() {
    const { pathname } = useLocation()
    const { isMealModalOpen, closeMealModal, resetUI } = useMealUI()

    useEffect(() => {
        resetUI()
    }, [pathname, resetUI])

    return (
        <>
            <Navbar />

            <main className="min-h-dvh px-6 pt-20 pb-6 flex flex-col">
                <Outlet />
            </main>
            <Modal isOpen={isMealModalOpen} onClose={closeMealModal}>
                <MealForm />
            </Modal>
        </>
    )
}
