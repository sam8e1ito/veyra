import clsx from 'clsx'

type CardProps = {
    title?: string | React.ReactElement
    children: React.ReactNode
    className?: string
}

export default function Card({ title, children, className }: CardProps) {
    return (
        <div
            className={clsx(
                'bg-bg-secondary rounded-xl border-accent border relative',
                className ?? ''
            )}
        >
            {typeof title === 'string' ? (
                <h3 className="bg-border-accent w-full rounded-xl py-2 text-center border border-accent">
                    {title}
                </h3>
            ) : (
                title
            )}
            <div>{children}</div>
        </div>
    )
}
