import clsx from 'clsx'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    error?: string
}

export default function Input({
    label,
    className,
    error,
    type = 'text',
    checked,
    ...props
}: InputProps) {
    if (type === 'radio') {
        return (
            <label
                className={clsx(
                    'flex items-center gap-4 rounded-xl border-2 p-4',
                    checked
                        ? 'border-accent bg-border-accent'
                        : 'border-border-accent'
                )}
            >
                <input
                    type="radio"
                    checked={checked}
                    {...props}
                    className={clsx(
                        'h-5 w-5 appearance-none rounded-full border border-border-accent p-1 bg-clip-content checked:border-accent checked:bg-accent',
                        className
                    )}
                />

                {label && <span>{label}</span>}
            </label>
        )
    }

    if (!label && !error) {
        return (
            <input
                type={type}
                checked={checked}
                {...props}
                className={clsx(
                    'rounded-lg border border-border-accent px-2 py-1 placeholder:text-text-light',
                    className
                )}
            />
        )
    }

    return (
        <label className="flex flex-col gap-2">
            {label && <span>{label}</span>}

            <input
                type={type}
                checked={checked}
                {...props}
                className={clsx(
                    'w-full rounded-lg border border-border-accent px-2 py-1 placeholder:text-text-light',
                    className
                )}
            />

            {error && <span>{error}</span>}
        </label>
    )
}
