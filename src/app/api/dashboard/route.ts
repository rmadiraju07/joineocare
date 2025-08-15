import { type NextRequest, NextResponse } from "next/server"
import { nile } from "@/lib/nile"

interface CheckInDate {
  check_date: string
  count?: string
}

interface JournalCount {
  count: string
}

export async function GET(request: NextRequest) {
  try {
    const session = await nile.api.auth.getSession(request)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = session.user

    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()) // Start of current week (Sunday)
    weekStart.setHours(0, 0, 0, 0)

    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6) // End of current week (Saturday)
    weekEnd.setHours(23, 59, 59, 999)

    const thisWeekCheckIns = await nile.db.query<CheckInDate>(
      `SELECT DATE(created_at) as check_date, COUNT(*) as count
       FROM check_ins 
       WHERE user_id = $1 AND created_at >= $2 AND created_at <= $3
       GROUP BY DATE(created_at)
       ORDER BY check_date`,
      [user.id, weekStart.toISOString(), weekEnd.toISOString()],
    )

    const allCheckIns = await nile.db.query<CheckInDate>(
      `SELECT DATE(created_at) as check_date
       FROM check_ins 
       WHERE user_id = $1
       GROUP BY DATE(created_at)
       ORDER BY check_date DESC`,
      [user.id],
    )

    let streak = 0
    const today = new Date().toISOString().split("T")[0]
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0]

    const hasRecentCheckIn = allCheckIns.some(
      (ci: CheckInDate) => ci.check_date === today || ci.check_date === yesterday,
    )

    if (hasRecentCheckIn && allCheckIns.length > 0) {
      const currentDate = new Date()
      if (allCheckIns[0].check_date !== today) {
        currentDate.setDate(currentDate.getDate() - 1) // Start from yesterday if no check-in today
      }

      for (const checkIn of allCheckIns) {
        const checkInDate = currentDate.toISOString().split("T")[0]
        if (checkIn.check_date === checkInDate) {
          streak++
          currentDate.setDate(currentDate.getDate() - 1)
        } else {
          break
        }
      }
    }

    const journalCount = await nile.db.query<JournalCount>(
      `SELECT COUNT(*) as count
       FROM check_ins 
       WHERE user_id = $1
         AND journal_entry IS NOT NULL 
         AND journal_entry != ''
         AND created_at >= $2`,
      [user.id, weekStart.toISOString()],
    )

    const checkedInDays = new Set<number>()
    thisWeekCheckIns.forEach((checkIn: CheckInDate) => {
      const date = new Date(checkIn.check_date)
      const dayOfWeek = date.getDay() // 0 = Sunday, 1 = Monday, etc.
      checkedInDays.add(dayOfWeek)
    })

    return NextResponse.json({
      streak,
      journalEntries: Number.parseInt(journalCount[0].count),
      checkedInDays: Array.from(checkedInDays),
      thisWeekCheckIns,
    })
  } catch (error) {
    console.error("Dashboard data error:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
