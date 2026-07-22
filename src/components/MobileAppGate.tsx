import { useEffect, useState } from 'react'
import InstallBanner from './InstallBanner'
import Icon from './Icon'
import VeyraLogo from '@/assets/logos/veyra.svg?react'

type Props = {
    children: React.ReactNode
}

export default function MobileAppGate({ children }: Props) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500)

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
                <div className="flex max-w-md flex-col items-center text-center">
                    <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl">
                        <Icon
                            icon={VeyraLogo}
                            className="h-16 w-16 rounded-2xl"
                        />
                    </div>

                    <h1 className="mb-3 text-3xl font-bold text-text-light">
                        Veyra is a mobile app
                    </h1>

                    <p className="mb-8 text-center text-text-light-secondary">
                        For the best experience, install Veyra on your phone or
                        open this page on a mobile device.
                    </p>

                    <InstallBanner />

                    <div className="mt-8 rounded-2xl border border-border-accent/40 bg-bg-secondary/40 px-6 py-4">
                        <p className="text-sm text-text-light-secondary">
                            Designed for screens under 500px
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return children
}
