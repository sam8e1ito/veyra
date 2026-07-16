import type { SelectHTMLAttributes } from 'react'
import type { Option } from '@/types/types'
import clsx from 'clsx'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string
    startOption?: string
    options: Option[]
    error?: string
}

export default function Select({
    label,
    options,
    startOption,
    error,
    className,
    ...props
}: SelectProps) {
    return (
        <label>
            {label && <div>{label}</div>}

            <select
                {...props}
                className={clsx(
                    'w-full rounded-lg border-2 border-border-accent px-1 py-2 placeholder:text-text-light-secondary',
                    className
                )}
            >
                <option value="" disabled>
                    Select {label ? label.toLowerCase() : startOption}
                </option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            {error && <div>{error}</div>}
        </label>
    )
}
