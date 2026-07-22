import { useEffect, useState } from 'react'

export function useIsInstalled() {
    const [isInstalled, setIsInstalled] = useState(false)

    useEffect(() => {
        const checkInstalled = () => {
            const standalone = window.matchMedia(
                '(display-mode: standalone)'
            ).matches

            const iosStandalone = 
                (window.navigator as any).standalone === true

            setIsInstalled(standalone || iosStandalone)
        }

        checkInstalled()
    }, [])

    return isInstalled
}