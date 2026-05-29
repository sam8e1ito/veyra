import { useState } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useMealUI } from '@/app/contexts/MealUIContext'
import { useMealData } from '@/app/contexts/MealDataContext'
import type { Meal } from '@/types/macros.types'

type MealFormState = {
    title: string
    protein: number
    carbs: number
    fats: number
}

const emptyForm: MealFormState = {
    title: '',
    protein: 0,
    carbs: 0,
    fats: 0,
}

function getInitialForm(meal: Meal | null): MealFormState {
    if (!meal) return emptyForm

    return {
        title: meal.title,
        protein: meal.protein,
        carbs: meal.carbs,
        fats: meal.fats,
    }
}

function toNumber(value: string) {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
}

export function MealForm() {
    const { modalState } = useMealUI()

    if (!modalState) return null

    const meal = modalState.mode === 'edit' ? modalState.meal : null
    const formKey = meal?.id ?? 'create'

    return <MealFormFields key={formKey} meal={meal} />
}

function MealFormFields({ meal }: { meal: Meal | null }) {
    const { addMeal, editMeal } = useMealData()
    const { closeMealModal } = useMealUI()
    const [form, setForm] = useState<MealFormState>(() => getInitialForm(meal))

    const isEditing = meal !== null
    const calories = form.protein * 4 + form.carbs * 4 + form.fats * 9
    const title = form.title.trim()

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()

                const submittedMeal = {
                    title,
                    calories,
                    protein: form.protein,
                    carbs: form.carbs,
                    fats: form.fats,
                    createdAt: meal?.createdAt ?? Date.now(),
                    id: meal?.id ?? crypto.randomUUID(),
                }

                if (isEditing) {
                    editMeal(submittedMeal)
                } else {
                    addMeal(submittedMeal)
                }

                closeMealModal()
            }}
        >
            <Button type="button" onClick={closeMealModal}>
                x
            </Button>

            <Input
                type="text"
                label="Meal name"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <Input
                type="number"
                label="Protein"
                min={0}
                value={form.protein}
                onChange={(e) =>
                    setForm({ ...form, protein: toNumber(e.target.value) })
                }
            />

            <Input
                type="number"
                label="Carbs"
                min={0}
                value={form.carbs}
                onChange={(e) =>
                    setForm({ ...form, carbs: toNumber(e.target.value) })
                }
            />

            <Input
                type="number"
                label="Fats"
                min={0}
                value={form.fats}
                onChange={(e) =>
                    setForm({ ...form, fats: toNumber(e.target.value) })
                }
            />

            <div>Calories: {calories}</div>

            <Button type="submit" disabled={!title}>
                {isEditing ? 'Edit Meal' : 'Add Meal'}
            </Button>
        </form>
    )
}
