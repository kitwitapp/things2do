export function getDateString(day: Date): string {
    return day.toISOString().split('T')[0]
}
