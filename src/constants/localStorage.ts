export const ONBOARDING_DONE_KEY = 'onboarding_done'
export const ONBOARDING_DATA_KEY = 'onboarding_data'

export const DAILY_PROGRESS_KEY = 'daily_progress'

export const LOCAL_USER_ID = 'local-user'

export function getUserScopedKey(key: string, userId: string) {
    return `${key}:${userId}`
}
