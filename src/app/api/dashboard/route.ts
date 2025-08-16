import { Timestamp } from "firebase-admin/firestore"
import { type NextRequest, NextResponse } from "next/server"
import { admin } from "@/lib/firebase-admin"
import { verifyFirebaseToken } from "@/lib/verify-firebase-token"

interface CheckInDate {
  check_date: string
  count?: number
}

export async function GET(request: NextRequest) {
  try {
    console.log("[v0] Dashboard API called")

    const user = await verifyFirebaseToken(request)
    if (!user?.uid) {
      console.log("[v0] Token verification failed")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    console.log("[v0] User verified:", user.uid)

    if (!admin) {
      console.error("[v0] Firebase Admin not initialized")
      return NextResponse.json({ error: "Firebase Admin not initialized" }, { status: 500 })
    }
    console.log("[v0] Firebase Admin initialized")

    // Get start and end of the current week as Firestore Timestamps
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    weekStart.setHours(0, 0, 0, 0)

    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)
    weekEnd.setHours(23, 59, 59, 999)

    console.log("[v0] Week range:", weekStart.toISOString(), "to", weekEnd.toISOString())

    let snapshot
    try {
      console.log("[v0] Querying check_ins collection...")
      snapshot = await admin
        .firestore()
        .collection("check_ins")
        .where("user_id", "==", user.uid)
        .where("created_at", ">=", Timestamp.fromDate(weekStart))
        .where("created_at", "<=", Timestamp.fromDate(weekEnd))
        .get()
      console.log("[v0] Query successful, docs found:", snapshot.docs.length)
    } catch (firestoreError) {
      console.error("[v0] Firestore query error:", firestoreError)
      return NextResponse.json(
        {
          error: "Database query failed",
          details: firestoreError instanceof Error ? firestoreError.message : "Unknown error",
        },
        { status: 500 },
      )
    }

    // Only use docs with a valid created_at timestamp
    const validDocs = snapshot.docs.filter((doc) => {
      const data = doc.data()
      return data.created_at && typeof data.created_at.toDate === "function"
    })
    console.log("[v0] Valid docs:", validDocs.length)

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

    let allCheckInsSnap
    try {
      console.log("[v0] Querying all check-ins for streak calculation...")
      allCheckInsSnap = await admin
        .firestore()
        .collection("check_ins")
        .where("user_id", "==", user.uid)
        .orderBy("created_at", "desc")
        .get()
      console.log("[v0] All check-ins query successful, docs found:", allCheckInsSnap.docs.length)
    } catch (streakQueryError) {
      console.error("[v0] Streak query error:", streakQueryError)
      // Continue with empty data rather than failing completely
      allCheckInsSnap = { docs: [] }
    }

    const allCheckIns = allCheckInsSnap.docs
      .filter((doc) => {
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

    const result = {
      streak,
      journalEntries,
      checkedInDays: Array.from(checkedInDays),
      thisWeekCheckIns,
    }

    console.log("[v0] Dashboard data prepared:", result)
    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Dashboard data error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch dashboard data",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
