import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/nile'
import { verifyFirebaseToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const userId = await verifyFirebaseToken(request)
    
    // Get current week's check-ins
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()) // Start of current week (Sunday)
    weekStart.setHours(0, 0, 0, 0)
    
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6) // End of current week (Saturday)
    weekEnd.setHours(23, 59, 59, 999)

    // Get this week's check-ins
    const thisWeekCheckIns = await sql`
      SELECT DATE(created_at) as check_date, COUNT(*) as count
      FROM check_ins 
      WHERE user_id = ${userId}
        AND created_at >= ${weekStart.toISOString()}
        AND created_at <= ${weekEnd.toISOString()}
      GROUP BY DATE(created_at)
      ORDER BY check_date
    `

    // Calculate streak (consecutive days with check-ins)
    const allCheckIns = await sql`
      SELECT DATE(created_at) as check_date
      FROM check_ins 
      WHERE user_id = ${userId}
      GROUP BY DATE(created_at)
      ORDER BY check_date DESC
    `

    let streak = 0
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    
    // Check if user checked in today or yesterday to start streak count
    const hasRecentCheckIn = allCheckIns.some(ci => 
      ci.check_date === today || ci.check_date === yesterday
    )

    if (hasRecentCheckIn && allCheckIns.length > 0) {
      const currentDate = new Date()
      if (allCheckIns[0].check_date !== today) {
        currentDate.setDate(currentDate.getDate() - 1) // Start from yesterday if no check-in today
      }

      for (const checkIn of allCheckIns) {
        const checkInDate = currentDate.toISOString().split('T')[0]
        if (checkIn.check_date === checkInDate) {
          streak++
          currentDate.setDate(currentDate.getDate() - 1)
        } else {
          break
        }
      }
    }

    // Get total journal entries count
    const journalCount = await sql`
      SELECT COUNT(*) as count
      FROM check_ins 
      WHERE user_id = ${userId}
        AND journal_entry IS NOT NULL 
        AND journal_entry != ''
        AND created_at >= ${weekStart.toISOString()}
    `

    // Format this week's check-ins for the calendar
    const checkedInDays = new Set()
    thisWeekCheckIns.forEach(checkIn => {
      const date = new Date(checkIn.check_date)
      const dayOfWeek = date.getDay() // 0 = Sunday, 1 = Monday, etc.
      checkedInDays.add(dayOfWeek)
    })

    return NextResponse.json({
      streak,
      journalEntries: parseInt(journalCount[0].count),
      checkedInDays: Array.from(checkedInDays),
      thisWeekCheckIns
    })

  } catch (error) {
    console.error('Dashboard data error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
