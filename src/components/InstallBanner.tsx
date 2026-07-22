import { useInstallPrompt } from '@/hooks/useInstallPrompt'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import VeyraLogo from '@/assets/logos/veyra.svg?react'

export default function InstallBanner() {
    const navigate = useNavigate()

    const { canInstall, install } = useInstallPrompt()

    if (!canInstall) return null

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl">
                <Icon icon={VeyraLogo} className="h-16 w-16 rounded-2xl" />
            </div>

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
                onClick={() => navigate('/')}
            >
                Continue in browser
            </button>
        </div>
    )
}
