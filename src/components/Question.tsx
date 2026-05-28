type QuestionProps = {
    question: string
    children: React.ReactNode
}

export default function Question({ question, children }: QuestionProps) {
    return (
        <div>
            <h3>{question}</h3>
            <div>{children}</div>
        </div>
    )
}
