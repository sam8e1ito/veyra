import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/Button'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Settings() {
    const { signOut } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSignOut() {
        setLoading(true)
        setError(null)

        try {
            signOut()
            navigate('/login')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <p>Settings</p>
            <Button onClick={handleSignOut} disabled={loading}>
                Sign Out
            </Button>
            {error && <p>{error}</p>}
        </>
    )
}
