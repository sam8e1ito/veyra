import clsx from 'clsx'

type Props = {
    className?: string
}

export default function Loading({ className }: Props) {
    return (
        <div
            className={clsx(
                'flex min-h-screen flex-col items-center justify-center gap-5',
                className
            )}
        >
            <div className="flex h-16 items-end gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <span
                        key={i}
                        className="h-4 w-2 rounded-full bg-accent animate-loading-bar"
                        style={{
                            animationDelay: `${i * 100}ms`,
                        }}
                    />
                ))}
            </div>

            <p className="font-semibold uppercase tracking-widest text-accent">
                Loading...
            </p>
        </div>
    )
}
