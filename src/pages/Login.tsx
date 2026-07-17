import { useAuth } from '@/hooks/useAuth'
import { useNavigate, NavLink } from 'react-router-dom'
import { useState } from 'react'
import AuthFields from '@/features/auth/AuthFields'
import Button from '@/components/Button'
import { getAuthErrorMessage } from '@/lib/authErrors'
import VeyraLogo from '@/assets/logos/veyra.svg?react'
import Icon from '@/components/Icon'

export default function Login() {
    const { signIn } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()

        setLoading(true)
        setError(null)

        try {
            await signIn(email, password)
            navigate('/')
        } catch (err) {
            console.error('Login failed:', err)
            setError(getAuthErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex-1 flex flex-col">
            <Icon icon={VeyraLogo} size={125} className="m-auto" />
            <h1 className="text-2xl text-center m-6">
                Welcome back to <span className="text-accent">Veyra</span>
            </h1>

            <form onSubmit={handleLogin} className="flex flex-col flex-1">
                <div className="w-full flex flex-col gap-2 bg-bg-secondary border-2 border-border-accent rounded-xl px-4 py-4 text-center">
                    <AuthFields
                        email={email}
                        password={password}
                        onEmailChange={(e) => setEmail(e.target.value)}
                        onPasswordChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="text-red-500">{error}</p>}

                    <p className="mt-10">
                        Don't have an account?{' '}
                        <NavLink
                            to="/register"
                            className="text-accent underline"
                        >
                            Register now
                        </NavLink>
                    </p>
                </div>

                <Button
                    type="submit"
                    disabled={loading || (!email && !password)}
                    className="mt-auto"
                >
                    {loading ? 'Loading...' : 'Login'}
                </Button>
            </form>
        </div>
    )
}
