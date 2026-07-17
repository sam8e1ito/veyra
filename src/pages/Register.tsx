import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button'
import { NavLink } from 'react-router-dom'
import { getAuthErrorMessage } from '@/lib/authErrors'
import AuthFields from '@/features/auth/AuthFields'
import VeyraLogo from '@/assets/logos/veyra.svg?react'
import Icon from '@/components/Icon'

export default function Register() {
    const navigate = useNavigate()
    const { signUp } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleRegister(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await signUp(email, password)
            navigate('/welcome')
        } catch (err) {
            console.error('Registration failed:', err)
            setError(getAuthErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex-1 flex flex-col">
            <Icon icon={VeyraLogo} size={125} className="m-auto" />
            <h1 className="text-2xl text-center m-6">
                Welcome to <span className="text-accent">Veyra</span>
            </h1>
            <form onSubmit={handleRegister} className="flex flex-col flex-1">
                <div className="w-full flex flex-col gap-2 bg-bg-secondary border-2 border-border-accent rounded-xl p-4 text-center">
                    <AuthFields
                        email={email}
                        password={password}
                        onEmailChange={(e) => setEmail(e.target.value)}
                        onPasswordChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="text-red-500">{error}</p>}

                    <p className="mt-10">
                        Already have an account?{' '}
                        <NavLink
                            to={'/login'}
                            className="text-accent underline"
                        >
                            Log In
                        </NavLink>
                    </p>
                </div>

                <Button
                    type="submit"
                    disabled={loading || (!email && !password)}
                    className="mt-auto"
                >
                    {loading ? 'Loading...' : 'Register'}
                </Button>
            </form>
        </div>
    )
}
