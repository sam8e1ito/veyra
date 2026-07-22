import { useEffect, useState } from 'react'
import InstallPage from './InstallPage'
import { useIsInstalled } from '@/hooks/useIsInstalled'
import VeyraLogo from '@/assets/logos/veyra.svg?react'
import Icon from './Icon'

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
            <div className="flex min-h-screen items-center justify-center bg-bg-primary px-6">
                <div className="max-w-md rounded-3xl border border-zinc-800 bg-bg-primary p-8 text-center shadow-2xl">
                    <Icon icon={VeyraLogo} size={125} className="w-full mb-2" />

                    <h1 className="mb-3 text-3xl font-bold text-white">
                        Veyra is a mobile app
                    </h1>

                    <p className="text-sm leading-6 text-zinc-400">
                        Veyra is designed exclusively for mobile devices to
                        provide the best training and nutrition tracking
                        experience.
                    </p>

                    <div className="mt-8 rounded-2xl bg-zinc-800 px-4 py-3">
                        <p className="text-sm text-zinc-300">
                            Open this page on your phone or install the PWA for
                            the best experience.
                        </p>
                    </div>
                </div>
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
