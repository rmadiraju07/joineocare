import { type NextRequest, NextResponse } from "next/server"
import { nile } from "@/lib/nile"

export async function GET(request: NextRequest) {
  try {
    const ctx = await nile.configureNile(request)

    // Get current week's check-ins
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()) // Start of current week (Sunday)
    weekStart.setHours(0, 0, 0, 0)

    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6) // End of current week (Saturday)
    weekEnd.setHours(23, 59, 59, 999)

    // Get this week's check-ins
    const thisWeekCheckIns = await ctx.query(
      `SELECT DATE(created_at) as check_date, COUNT(*) as count
       FROM check_ins 
       WHERE created_at >= $1 AND created_at <= $2
       GROUP BY DATE(created_at)
       ORDER BY check_date`,
      [weekStart.toISOString(), weekEnd.toISOString()],
    )

    // Calculate streak (consecutive days with check-ins)
    const allCheckIns = await ctx.query(
      `SELECT DATE(created_at) as check_date
       FROM check_ins 
       GROUP BY DATE(created_at)
       ORDER BY check_date DESC`,
    )

    let streak = 0
    const today = new Date().toISOString().split("T")[0]
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0]

    // Check if user checked in today or yesterday to start streak count
    const hasRecentCheckIn = allCheckIns.some((ci: any) => ci.check_date === today || ci.check_date === yesterday)

    if (hasRecentCheckIn && allCheckIns.length > 0) {
      const currentDate = new Date()
      if (allCheckIns[0].check_date !== today) {
        currentDate.setDate(currentDate.getDate() - 1) // Start from yesterday if no check-in today
      }

      for (const checkIn of allCheckIns) {
        const checkInDate = currentDate.toISOString().split("T")[0]
        if ((checkIn as any).check_date === checkInDate) {
          streak++
          currentDate.setDate(currentDate.getDate() - 1)
        } else {
          break
        }
      }
    }

    // Get total journal entries count
    const journalCount = await ctx.query(
      `SELECT COUNT(*) as count
       FROM check_ins 
       WHERE journal_entry IS NOT NULL 
         AND journal_entry != ''
         AND created_at >= $1`,
      [weekStart.toISOString()],
    )

    // Format this week's check-ins for the calendar
    const checkedInDays = new Set()
    thisWeekCheckIns.forEach((checkIn: any) => {
      const date = new Date(checkIn.check_date)
      const dayOfWeek = date.getDay() // 0 = Sunday, 1 = Monday, etc.
      checkedInDays.add(dayOfWeek)
    })

    return NextResponse.json({
      streak,
      journalEntries: Number.parseInt((journalCount[0] as any).count),
      checkedInDays: Array.from(checkedInDays),
      thisWeekCheckIns,
    })
  } catch (error) {
    console.error("Dashboard data error:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
