import Button from '@/components/Button'
import { useNavigate } from 'react-router-dom'

export default function Welcome() {
    const navigate = useNavigate()
    return (
        <>
            <h1>Welcome</h1>
            <Button onClick={() => navigate('/onboarding')}>Continue</Button>
        </>
    )
}
