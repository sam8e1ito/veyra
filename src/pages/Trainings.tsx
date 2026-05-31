import Card from '@/components/Card'
import { useProfile } from '@/hooks/useProfile'

export default function Trainings() {
    const { splitLabel } = useProfile()
    return (
        <>
            <Card title="Your current split is">
                <p>{splitLabel}</p>
            </Card>
        </>
    )
}
