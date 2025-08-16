import { type NextRequest, NextResponse } from "next/server"
import { admin } from "@/lib/firebase-admin"
import { verifyFirebaseToken } from "@/lib/verify-firebase-token"

interface CheckInDate {
  check_date: string
  count?: number
}

export async function GET(request: NextRequest) {
  try {
    const user = await verifyFirebaseToken(request)
    if (!user?.uid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get start and end of the current week
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    weekStart.setHours(0, 0, 0, 0)

    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)
    weekEnd.setHours(23, 59, 59, 999)

    // Fetch all check-ins for this user this week
    const snapshot = await admin
      .firestore()
      .collection("check_ins")
      .where("user_id", "==", user.uid)
      .where("created_at", ">=", weekStart)
      .where("created_at", "<=", weekEnd)
      .get()

    // Only use docs with a valid created_at timestamp
    const validDocs = snapshot.docs.filter(doc => {
      const data = doc.data()
      return data.created_at && typeof data.created_at.toDate === "function"
    })

    // Group check-ins by date
    const thisWeekCheckInsMap: { [date: string]: number } = {}
    validDocs.forEach((doc) => {
      const data = doc.data()
      const createdAt = data.created_at.toDate()
      const dateStr = createdAt.toISOString().split("T")[0]
      thisWeekCheckInsMap[dateStr] = (thisWeekCheckInsMap[dateStr] || 0) + 1
    })

    const thisWeekCheckIns: CheckInDate[] = Object.entries(thisWeekCheckInsMap).map(([check_date, count]) => ({
      check_date,
      count,
    }))

    // Fetch all check-ins for streak calculation
    const allCheckInsSnap = await admin
      .firestore()
      .collection("check_ins")
      .where("user_id", "==", user.uid)
      .orderBy("created_at", "desc")
      .get()

    const allCheckIns = allCheckInsSnap.docs
      .filter(doc => {
        const data = doc.data()
        return data.created_at && typeof data.created_at.toDate === "function"
      })
      .map((doc) => {
        const data = doc.data()
        const createdAt = data.created_at.toDate()
        return {
          check_date: createdAt.toISOString().split("T")[0],
        }
      })

    // Calculate streak
    let streak = 0
    const today = new Date().toISOString().split("T")[0]
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    const allDates = allCheckIns.map((ci) => ci.check_date)
    const hasRecentCheckIn = allDates.includes(today) || allDates.includes(yesterday)

    if (hasRecentCheckIn && allDates.length > 0) {
      const currentDate = new Date()
      if (allDates[0] !== today) {
        currentDate.setDate(currentDate.getDate() - 1)
      }
      for (const checkIn of allDates) {
        const checkInDate = currentDate.toISOString().split("T")[0]
        if (checkIn === checkInDate) {
          streak++
          currentDate.setDate(currentDate.getDate() - 1)
        } else {
          break
        }
      }
    }

    // Journal entries this week
    const journalEntries = validDocs.filter((doc) => {
      const data = doc.data()
      return data.journal_entry && data.journal_entry.trim() !== ""
    }).length

    // Checked-in days (0=Sun, 6=Sat)
    const checkedInDays = new Set<number>()
    validDocs.forEach((doc) => {
      const data = doc.data()
      const createdAt = data.created_at.toDate()
      checkedInDays.add(createdAt.getDay())
    })

    return NextResponse.json({
      streak,
      journalEntries,
      checkedInDays: Array.from(checkedInDays),
      thisWeekCheckIns,
    })
  } catch (error) {
    console.error("Dashboard data error:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
