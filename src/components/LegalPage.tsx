import ReactMarkdown from 'react-markdown'

type Props = {
    content: string
}

export default function LegalPage({ content }: Props) {
    return (
        <article
            className="
            prose 
            prose-invert
            max-w-none
            p-5
            "
        >
            <ReactMarkdown>{content}</ReactMarkdown>
        </article>
    )
}
