type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    error?: string
}

export default function Input({ label, error, ...props }: InputProps) {
    return (
        <label>
            {label && <div>{label}</div>}

            <input {...props} />

            {error && <div>{error}</div>}
        </label>
    )
}
