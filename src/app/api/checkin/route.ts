import { type NextRequest, NextResponse } from "next/server"
import { admin } from "@/lib/firebase-admin"
import { getAuth } from "firebase/auth"
import { verifyFirebaseToken } from "@/lib/verify-firebase-token"
import { FieldValue } from "firebase-admin/firestore"

interface CheckInDate {
  check_date: string
  count?: number
}

export async function GET(request: NextRequest) {
  try {
    const auth = getAuth()
    const user = auth.currentUser
    const idToken = user && (await user.getIdToken())

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

    // Group check-ins by date
    const thisWeekCheckInsMap: { [date: string]: number } = {}
    snapshot.docs.forEach((doc) => {
      const data = doc.data()
      const createdAt = data.created_at?.toDate?.() || new Date()
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

    const allCheckIns = allCheckInsSnap.docs.map((doc) => {
      const data = doc.data()
      const createdAt = data.created_at?.toDate?.() || new Date()
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
    const journalEntries = snapshot.docs.filter((doc) => {
      const data = doc.data()
      return data.journal_entry && data.journal_entry.trim() !== ""
    }).length

    // Checked-in days (0=Sun, 6=Sat)
    const checkedInDays = new Set<number>()
    snapshot.docs.forEach((doc) => {
      const data = doc.data()
      const createdAt = data.created_at?.toDate?.() || new Date()
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

export async function POST(request: NextRequest) {
  try {
    const user = await verifyFirebaseToken(request)
    if (!user?.uid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { mood, gratitude, challenges, journalEntry } = body

    if (!mood || !["great", "okay", "difficult"].includes(mood)) {
      return NextResponse.json({ error: "Valid mood is required" }, { status: 400 })
    }

    const docRef = await admin.firestore().collection("check_ins").add({
      user_id: user.uid,
      mood,
      gratitude: gratitude || "",
      challenges: challenges || "",
      journal_entry: journalEntry || "",
      created_at: FieldValue.serverTimestamp(),
    })

    return NextResponse.json({ success: true, id: docRef.id })
  } catch (error) {
    console.error("Check-in POST error:", error)
    return NextResponse.json({ error: "Failed to save check-in" }, { status: 500 })
  }
}
