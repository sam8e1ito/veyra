import Button from '@/components/Button'
import { useNavigate } from 'react-router-dom'
import VeyraLogo from '@/assets/logos/veyra.svg?react'
import Icon from '@/components/Icon'

export default function Welcome() {
    const navigate = useNavigate()
    return (
        <>
            <div className="m-auto">
                <Icon icon={VeyraLogo} size={125} className="mx-auto" />
                <h1 className="text-center text-2xl">
                    Let's create your fitness plan.
                </h1>
            </div>

            <Button onClick={() => navigate('/onboarding')} className="mt-auto">
                Continue
            </Button>
        </>
    )
}
