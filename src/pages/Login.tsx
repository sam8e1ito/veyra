import Input from '@/components/Input'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Button from '@/components/Button'
import { getAuthErrorMessage } from '@/lib/authErrors'

export default function Login() {
    const { signIn } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleLogin(e: React.SubmitEvent) {
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
        <form onSubmit={handleLogin}>
            <Input
                type="email"
                value={email}
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <Input
                type="password"
                value={password}
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p>{error}</p>}

            <Button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Login'}
            </Button>

            <p>
                Don't have account?{' '}
                <NavLink to={'/register'}>Register now</NavLink>
            </p>
        </form>
    )
}
