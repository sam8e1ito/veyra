import type { SelectHTMLAttributes } from 'react'
import type { Option } from '@/types/types'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string
    options: Option[]
    error?: string
}

export default function Select({
    label,
    options,
    error,
    ...props
}: SelectProps) {
    return (
        <label>
            {label && <div>{label}</div>}

            <select {...props}>
                <option value="" disabled>
                    Select {label?.toLowerCase()}
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
