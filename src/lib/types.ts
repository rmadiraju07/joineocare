export interface CheckIn {
  id: string
  user_id: string
  mood: "great" | "okay" | "difficult"
  gratitude: string | null
  challenges: string | null
  journal_entry: string | null
  created_at: string
}

export interface DashboardData {
  streak: number
  journalEntries: number
  checkedInDays: number[]
  thisWeekCheckIns: Array<{
    check_date: string
    count: string
  }>
}
