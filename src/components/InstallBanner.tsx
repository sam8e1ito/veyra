import { useInstallPrompt } from '@/hooks/useInstallPrompt'
import Icon from './Icon'
import VeyraLogo from '@/assets/logos/veyra.svg?react'

type Props = {
    onContinue: () => void
}

export default function InstallScreen({ onContinue }: Props) {
    const { install } = useInstallPrompt()

    return (
        <div
            className="
            flex
            min-h-screen
            flex-col
            items-center
            justify-center
            bg-bg-primary
            px-6
            text-center
        "
        >
            <div className="mb-8">
                <Icon icon={VeyraLogo} className="h-24 w-24" />
            </div>

            <h1
                className="
                mb-3
                text-3xl
                font-bold
                text-text-light
            "
            >
                Install Veyra
            </h1>

            <p
                className="
                mb-8
                text-text-light-secondary
            "
            >
                Get the best experience by installing the app.
            </p>

            <div className="flex w-full max-w-sm flex-col gap-4">
                <button
                    onClick={install}
                    className="
                        rounded-2xl
                        bg-accent
                        px-8
                        py-4
                        font-bold
                        text-text-dark
                    "
                >
                    Install Veyra
                </button>

                <button
                    onClick={onContinue}
                    className="
                        rounded-2xl
                        border
                        border-border-accent
                        px-8
                        py-4
                        text-text-light
                    "
                >
                    Continue in browser
                </button>
            </div>
        </div>
    )
}
