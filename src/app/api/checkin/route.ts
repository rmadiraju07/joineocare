import { type NextRequest, NextResponse } from "next/server"
import { nile } from "@/lib/nile"

interface CheckInRequest {
  mood: "great" | "okay" | "difficult"
  gratitude?: string
  challenges?: string
  journalEntry?: string
}

export async function POST(request: NextRequest) {
  try {
    const session = await nile.api.auth.getSession(request)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body: CheckInRequest = await request.json()
    const { mood, gratitude, challenges, journalEntry } = body

    // Validate required fields
    if (!mood || !["great", "okay", "difficult"].includes(mood)) {
      return NextResponse.json({ error: "Valid mood is required" }, { status: 400 })
    }

    const result = await nile.db.query(
      `INSERT INTO check_ins (user_id, mood, gratitude, challenges, journal_entry)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, created_at`,
      [session.user.id, mood, gratitude || "", challenges || "", journalEntry || ""],
    )

    return NextResponse.json({
      success: true,
      checkIn: result.rows[0],
    })
  } catch (error) {
    console.error("Check-in error:", error)
    return NextResponse.json({ error: "Failed to save check-in" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await nile.api.auth.getSession(request)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const result = await nile.db.query(
      `SELECT id, mood, gratitude, challenges, journal_entry, created_at
       FROM check_ins 
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 30`,
      [session.user.id],
    )

    return NextResponse.json({ checkIns: result.rows })
  } catch (error) {
    console.error("Fetch check-ins error:", error)
    return NextResponse.json({ error: "Failed to fetch check-ins" }, { status: 500 })
  }
}
