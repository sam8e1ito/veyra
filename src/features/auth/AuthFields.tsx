import Input from '@/components/Input'

type Props = {
    email: string
    password: string
    onEmailChange: React.ChangeEventHandler<HTMLInputElement>
    onPasswordChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function AuthFields({
    email,
    password,
    onEmailChange,
    onPasswordChange,
}: Props) {
    return (
        <>
            <Input
                type="email"
                value={email}
                placeholder="Email"
                onChange={onEmailChange}
            />

            <Input
                type="password"
                value={password}
                placeholder="Password"
                onChange={onPasswordChange}
            />
        </>
    )
}
