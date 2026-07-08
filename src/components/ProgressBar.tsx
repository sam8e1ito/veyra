type ProgressBarProps = {
    current: number
    max: number
}

export default function ProgressBar({ current, max }: ProgressBarProps) {
    const progress = Math.min((current / max) * 100, 100)

    return (
        <div>
            <div>
                {current} / {max}
            </div>

            <div
                style={{
                    width: '100%',
                    height: '10px',
                    background: '#e5e7eb',
                    borderRadius: '999px',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: '#22c55e',
                        borderRadius: '999px',
                        transition: 'width 0.3s ease',
                    }}
                />
            </div>
        </div>
    )
}
