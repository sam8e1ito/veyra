import type { AuthError } from '@supabase/supabase-js'

export function getAuthErrorMessage(error: unknown): string {
    if (!error || typeof error !== 'object') {
        return 'Something went wrong. Please try again.'
    }

    const authError = error as AuthError
    const code = authError.code ?? ''
    const message = authError.message ?? ''

    if (
        code === 'user_already_exists' ||
        message.toLowerCase().includes('already registered')
    ) {
        return 'User already registered'
    }

    if (code === 'weak_password' || message.toLowerCase().includes('password')) {
        return 'Password does not meet requirements. Use at least 6 characters.'
    }

    if (
        code === 'validation_failed' ||
        authError.status === 422 ||
        message.toLowerCase().includes('invalid')
    ) {
        if (message) return message
        return 'Invalid email or password.'
    }

    if (code === 'invalid_credentials' || message.includes('Invalid login')) {
        return 'Invalid email or password.'
    }

    return message || 'Something went wrong. Please try again.'
}
