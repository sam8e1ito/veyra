type QuestionProps = {
    question: string
    children: React.ReactNode
}

export default function Question({ question, children }: QuestionProps) {
    return (
        <div className="bg-bg-secondary rounded-xl border-2 border-border-accent p-4 text-center">
            <h3 className="text-2xl text-center mb-4">{question}</h3>
            <div className="flex flex-col gap-4">{children}</div>
        </div>
    )
}
