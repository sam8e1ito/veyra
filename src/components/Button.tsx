import clsx from 'clsx'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
}

export default function Button({
    children,
    className,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            className={clsx(
                `text-text-dark py-2 w-full rounded-xl ${disabled ? 'bg-gray-300' : 'bg-accent'} hover:cursor-pointer`,
                className
            )}
        >
            {children}
        </button>
    )
}
