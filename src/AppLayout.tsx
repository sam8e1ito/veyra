import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Modal from './components/Modal'
import { MealForm } from './features/meals/MealForm'
import { useMealUI } from './app/contexts/MealUIContext'

export default function AppLayout() {
    const { pathname } = useLocation()
    const { isMealModalOpen, closeMealModal, resetUI } = useMealUI()

    useEffect(() => {
        resetUI()
    }, [pathname, resetUI])

    return (
        <>
            <Navbar />

            <main>
                <Outlet />
            </main>
            <Modal isOpen={isMealModalOpen} onClose={closeMealModal}>
                <MealForm />
            </Modal>
        </>
    )
}
