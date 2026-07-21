import { format } from 'date-fns'

export function getDateKey(date: Date = new Date()): string {
    return date.toLocaleDateString('en-CA')
}

export function getCurrentDayOfWeek() {
    const day = new Date().getDay()

    return day === 0 ? 7 : day
}

export function formatDate(date: string) {
    return format(new Date(date), 'EEEE, MMM d')
}