import { useInstallPrompt } from '@/hooks/useInstallPrompt'

export default function InstallBanner() {
    const { canInstall, install } = useInstallPrompt()

    if (!canInstall) return null

    return (
        <div className="flex w-full flex-col gap-4">
            <button
                onClick={install}
                className="
                    rounded-2xl
                    bg-accent
                    px-8
                    py-4
                    font-bold
                    text-text-dark
                    transition
                    hover:scale-[1.02]
                    active:scale-95
                "
            >
                Install Veyra
            </button>

            <button
                className="
                    rounded-2xl
                    border
                    border-border-accent
                    px-8
                    py-4
                    text-text-light
                    transition
                    hover:bg-bg-secondary
                "
            >
                Continue in browser
            </button>
        </div>
    )
}
