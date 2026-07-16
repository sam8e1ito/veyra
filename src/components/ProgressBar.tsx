import clsx from 'clsx'

type ProgressBarProps = {
    current: number
    max: number
    className?: string
}

export default function ProgressBar({
    current,
    max,
    className,
}: ProgressBarProps) {
    const progress = Math.min((current / max) * 100, 100)

    return (
        <div
            className={clsx(
                'w-full h-2.5 bg-gray-300 rounded-[999px] overflow-hidden',
                className ?? ''
            )}
        >
            <div
                className="h-full bg-accent rounded-[999px]"
                style={{
                    width: `${progress}%`,
                    transition: 'width 0.3s ease',
                }}
            />
        </div>
    )
}
