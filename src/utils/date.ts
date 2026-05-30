export function getDateKey(date: Date = new Date()): string {
    return date.toLocaleDateString('en-CA')
}
