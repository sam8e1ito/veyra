import { useEffect, useState } from 'react'

export function useInstallPrompt() {
    const [prompt, setPrompt] = useState<any>(null)

    useEffect(() => {
        const handler = (event: Event) => {
            console.log('Install prompt available')

            event.preventDefault()
            setPrompt(event)
        }

        window.addEventListener(
            'beforeinstallprompt',
            handler
        )

        return () => {
            window.removeEventListener(
                'beforeinstallprompt',
                handler
            )
        }
    }, [])

    const install = async () => {
        if (!prompt) return

        await prompt.prompt()

        setPrompt(null)
    }

    return {
        canInstall: !!prompt,
        install
    }
}