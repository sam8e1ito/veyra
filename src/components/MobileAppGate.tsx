import { useEffect, useState } from 'react'
import InstallPage from './InstallPage'
import { useIsInstalled } from '@/hooks/useIsInstalled'

type Props = {
    children: React.ReactNode
}

export default function MobileAppGate({ children }: Props) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500)
    const [hasContinued, setHasContinued] = useState(
        localStorage.getItem('skip-install') === 'true'
    )
    const isInstalled = useIsInstalled()

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

    if (!hasContinued && !isInstalled) {
        return (
            <InstallPage
                onContinue={() => {
                    localStorage.setItem('skip-install', 'true')
                    setHasContinued(true)
                }}
            />
        )
    }

    return children
}
