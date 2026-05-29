type CardProps = {
    title?: string
    children: React.ReactNode
    className?: string
}

export default function Card({ title, children, className }: CardProps) {
    return (
        <div className={className ?? ''}>
            {title && <h3>{title}</h3>}
            {children}
        </div>
    )
}
