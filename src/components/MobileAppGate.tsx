import { useEffect, useState } from 'react'
import InstallScreen from './InstallBanner'

type Props = {
    children: React.ReactNode
}

export default function MobileAppGate({ children }: Props) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500)
    const [hasContinued, setHasContinued] = useState(false)

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth <= 500)
        }

        checkScreen()

        window.addEventListener('resize', checkScreen)

        return () => {
            window.removeEventListener('resize', checkScreen)
        }
    }, [])

    if (!isMobile) {
        return (
            <div>
                <h1>Veyra is a mobile app</h1>
            </div>
        )
    }

    if (!hasContinued) {
        return <InstallScreen onContinue={() => setHasContinued(true)} />
    }

    return children
}
