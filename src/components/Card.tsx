type CardProps = {
    title?: string | React.ReactElement
    children: React.ReactNode
    className?: string
}

export default function Card({ title, children, className }: CardProps) {
    return (
        <div className={className ?? ''}>
            {typeof title === 'string' ? <h3>{title}</h3> : title}
            {children}
        </div>
    )
}
