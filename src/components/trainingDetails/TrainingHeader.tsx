import Button from '../Button'

type Props = {
    isEditing: boolean
    onBack: () => void
    onEdit: () => void
    onSave: () => void
}

export default function TrainingHeader({
    isEditing,
    onBack,
    onEdit,
    onSave,
}: Props) {
    return (
        <>
            <div className="flex flex-row gap-4">
                <Button onClick={onBack} state="loading">
                    Back
                </Button>

                <Button
                    onClick={isEditing ? onSave : onEdit}
                    state={isEditing ? 'success' : 'default'}
                >
                    {isEditing ? 'Save' : 'Edit'}
                </Button>
            </div>
        </>
    )
}
