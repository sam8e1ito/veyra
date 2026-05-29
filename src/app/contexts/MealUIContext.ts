import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react'
import type { Meal } from '@/types/macros.types'

export type MealModalState =
    | { mode: 'create' }
    | { mode: 'edit'; meal: Meal }
    | null

export type MealUIContextValue = {
    modalState: MealModalState
    editingMeal: Meal | null
    isCreatingMeal: boolean
    isMealModalOpen: boolean
    selectedMealId: string | null
    setSelectedMealId: React.Dispatch<React.SetStateAction<string | null>>
    toggleSelectedMeal: (id: string) => void
    openCreate: () => void
    openEdit: (meal: Meal) => void
    closeMealModal: () => void
    clearMealUIForMeal: (id: string) => void
    resetUI: () => void
}

export const MealUIContext = createContext<MealUIContextValue | null>(null)

export function useMealUIState(): MealUIContextValue {
    const [modalState, setModalState] = useState<MealModalState>(null)
    const [selectedMealId, setSelectedMealId] = useState<string | null>(null)

    const openCreate = useCallback(() => {
        setSelectedMealId(null)
        setModalState({ mode: 'create' })
    }, [])

    const openEdit = useCallback((meal: Meal) => {
        setSelectedMealId(null)
        setModalState({ mode: 'edit', meal })
    }, [])

    const closeMealModal = useCallback(() => {
        setModalState(null)
    }, [])

    const toggleSelectedMeal = useCallback((id: string) => {
        setSelectedMealId((prev) => (prev === id ? null : id))
    }, [])

    const clearMealUIForMeal = useCallback((id: string) => {
        setSelectedMealId((prev) => (prev === id ? null : prev))
        setModalState((prev) =>
            prev?.mode === 'edit' && prev.meal.id === id ? null : prev
        )
    }, [])

    const resetUI = useCallback(() => {
        setModalState(null)
        setSelectedMealId(null)
    }, [])

    const editingMeal = modalState?.mode === 'edit' ? modalState.meal : null
    const isCreatingMeal = modalState?.mode === 'create'
    const isMealModalOpen = modalState !== null

    return useMemo(
        () => ({
            modalState,
            editingMeal,
            isCreatingMeal,
            isMealModalOpen,
            selectedMealId,
            setSelectedMealId,
            toggleSelectedMeal,
            openCreate,
            openEdit,
            closeMealModal,
            clearMealUIForMeal,
            resetUI,
        }),
        [
            clearMealUIForMeal,
            closeMealModal,
            editingMeal,
            isCreatingMeal,
            isMealModalOpen,
            modalState,
            openCreate,
            openEdit,
            resetUI,
            selectedMealId,
            toggleSelectedMeal,
        ]
    )
}

export function useMealUI() {
    const ctx = useContext(MealUIContext)

    if (!ctx) {
        throw new Error('useMealUI must be used inside MealUIProvider')
    }

    return ctx
}
