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
            <Button onClick={onBack}>Back</Button>

            <Button onClick={isEditing ? onSave : onEdit}>
                {isEditing ? 'Save' : 'Edit'}
            </Button>
        </>
    )
}
