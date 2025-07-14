export * from "./notion"

export function formatDate(date: string | Date, locale: string = 'ko-KR'): string {
  if (!date) return ''
  
  try {
    const d = new Date(date)
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }
    return d.toLocaleDateString(locale, options)
  } catch (error) {
    console.error('Date formatting error:', error)
    return typeof date === 'string' ? date : ''
  }
}