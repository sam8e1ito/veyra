export function getAuthErrorMessage(error: unknown): string {
    if (!(error instanceof Error)) {
        return "Something went wrong"
    }

    switch (error.message) {
        case "Invalid login credentials":
            return "Wrong email or password"

        case "Email not confirmed":
            return "Please confirm your email first"

        case "User already registered":
            return "An account with this email already exists"

        default:
            return "Something went wrong. Try again"
    }
}