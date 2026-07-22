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

            <main className="flex flex-1 flex-col px-6 pt-6 pb-36">
                <Outlet />
            </main>
            <Modal
                isOpen={isMealModalOpen}
                onClose={closeMealModal}
                className="flex flex-col"
            >
                <MealForm />
            </Modal>
        </>
    )
}
