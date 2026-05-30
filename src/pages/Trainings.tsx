import Card from '@/components/Card'
import { useUser } from '@/hooks/useUser'

export default function Trainings() {
    const { splitLabel } = useUser()
    return (
        <>
            <Card title="Your current split is">
                <p>{splitLabel}</p>
            </Card>
        </>
    )
}
