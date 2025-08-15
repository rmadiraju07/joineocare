import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/nile"
import { verifyFirebaseToken } from "@/lib/auth"

interface CheckInRequest {
  mood: "great" | "okay" | "difficult"
  gratitude?: string
  challenges?: string
  journalEntry?: string
}

export async function POST(request: NextRequest) {
  try {
    // Verify Firebase token and get user ID
    const userId = await verifyFirebaseToken(request)

    const body: CheckInRequest = await request.json()
    const { mood, gratitude, challenges, journalEntry } = body

    // Validate required fields
    if (!mood || !["great", "okay", "difficult"].includes(mood)) {
      return NextResponse.json({ error: "Valid mood is required" }, { status: 400 })
    }

    // Insert check-in into database
    const result = await sql`
      INSERT INTO check_ins (user_id, mood, gratitude, challenges, journal_entry)
      VALUES (${userId}, ${mood}, ${gratitude || ""}, ${challenges || ""}, ${journalEntry || ""})
      RETURNING id, created_at
    `

    return NextResponse.json({
      success: true,
      checkIn: result[0],
    })
  } catch (error) {
    console.error("Check-in error:", error)
    return NextResponse.json({ error: "Failed to save check-in" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await verifyFirebaseToken(request)

    // Get recent check-ins for the user
    const checkIns = await sql`
      SELECT id, mood, gratitude, challenges, journal_entry, created_at
      FROM check_ins 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT 30
    `

    return NextResponse.json({ checkIns })
  } catch (error) {
    console.error("Fetch check-ins error:", error)
    return NextResponse.json({ error: "Failed to fetch check-ins" }, { status: 500 })
  }
}
