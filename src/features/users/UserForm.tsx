import Input from '@/components/Input'

type Props = {
    value?: string
    onChange?:
        | React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>
        | undefined
}

export default function UserForm({ value, onChange }: Props) {
    return (
        <>
            <Input
                type="email"
                value={value}
                label="Email"
                onChange={onChange}
            />

            <Input
                type="password"
                value={value}
                label="Password"
                onChange={onChange}
            />
        </>
    )
}
