import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { NavLink } from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate()
    const { signUp } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleRegister(e: React.SubmitEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await signUp(email, password)
            navigate('/welcome')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleRegister}>
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

            {error === 'User already registered' ? (
                <p>
                    User already registered.{' '}
                    <NavLink to="/login">Log in now</NavLink>
                </p>
            ) : (
                <p>{error}</p>
            )}

            <Button disabled={loading}>
                {loading ? 'Loading...' : 'Register'}
            </Button>
        </form>
    )
}
