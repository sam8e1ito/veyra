import clsx from 'clsx'

type ButtonState = 'default' | 'loading' | 'error' | 'success'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
    state?: ButtonState
    actionBtn?: boolean
}

export default function Button({
    children,
    className,
    disabled,
    state = 'default',
    actionBtn,
    ...props
}: ButtonProps) {
    const hasWidthClass = /\b(?:w|min-w|max-w)-/.test(className ?? '')
    return (
        <button
            {...props}
            className={clsx(
                `
                    text-text-dark py-2 rounded-xl hover:cursor-pointer text-center flex flex-col justify-center items-center
                    ${disabled ? 'bg-gray-300' : 'bg-accent'} 
                    ${state === 'error' ? 'bg-error text-text-light' : ''} 
                    ${state === 'loading' ? 'bg-gray-300' : ''} 
                    ${state === 'success' ? 'bg-green-600 text-text-light' : ''}
                    ${actionBtn ? 'rounded-t-none shadow-[inset_0_8px_8px_-4px_rgba(0,0,0,0.3)] font-medium tracking-widest' : ''}
                `,
                !hasWidthClass && 'w-full',
                className
            )}
        >
            {children}
        </button>
    )
}
