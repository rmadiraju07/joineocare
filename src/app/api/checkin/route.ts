import { type NextRequest, NextResponse } from "next/server"
import { admin } from "@/lib/firebase-admin"
import { verifyFirebaseToken } from "@/lib/verify-firebase-token"

interface CheckInRequest {
  mood: "great" | "okay" | "difficult"
  gratitude?: string
  challenges?: string
  journalEntry?: string
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyFirebaseToken(request)
    if (!user?.uid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body: CheckInRequest = await request.json()
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
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    })

    const doc = await docRef.get()
    return NextResponse.json({
      success: true,
      checkIn: { id: doc.id, ...doc.data() },
    })
  } catch (error) {
    console.error("Check-in error:", error)
    return NextResponse.json({ error: "Failed to save check-in" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await verifyFirebaseToken(request)
    if (!user?.uid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const snapshot = await admin
      .firestore()
      .collection("check_ins")
      .where("user_id", "==", user.uid)
      .orderBy("created_at", "desc")
      .limit(30)
      .get()

    const checkIns = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({ checkIns })
  } catch (error) {
    console.error("Fetch check-ins error:", error)
    return NextResponse.json({ error: "Failed to fetch check-ins" }, { status: 500 })
  }
}
