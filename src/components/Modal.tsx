import clsx from 'clsx'
import Button from './Button'

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    className?: string
    closeBtn?: boolean
}

export default function Modal({
    isOpen,
    onClose,
    children,
    className,
    closeBtn = true,
}: ModalProps) {
    if (!isOpen) return null

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 flex items-center px-6"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={clsx(
                    'flex flex-col w-full h-167.5 rounded-2xl bg-bg-secondary border border-accent p-4 gap-4 relative',
                    className
                )}
            >
                {closeBtn ? (
                    <Button onClick={onClose} className="w-10 h-10">
                        x
                    </Button>
                ) : null}

                {children}
            </div>
        </div>
    )
}
