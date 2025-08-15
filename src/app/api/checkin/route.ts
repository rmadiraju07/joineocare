// app/api/checkin/route.ts
import { NextResponse } from "next/server"
import * as admin from "firebase-admin"

// Initialize Firebase Admin once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Replace escaped newlines with actual newlines in the private key
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  })
}

export async function POST(request: Request) {
  try {
    // Verify Authorization header exists and is a Bearer token
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const idToken = authHeader.split(" ")[1]

    // Verify Firebase ID token and get user ID
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    const userIdFromToken = decodedToken.uid

    // Parse JSON body
    const body = await request.json()
    const { mood, gratitude, challenges, journalEntry, userId } = body

    // Validate mood and userId matches token UID
    if (!mood || userId !== userIdFromToken) {
      return NextResponse.json({ error: "Invalid user or missing mood" }, { status: 400 })
    }

    // Send data to Nile API
    const nileRes = await fetch("https://api.thenile.dev/v1/tables/check_ins/rows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NILE_API_KEY}`,
      },
      body: JSON.stringify({
        user_id: userIdFromToken,
        mood,
        gratitude,
        challenges,
        journal_entry: journalEntry,
      }),
    })

    if (!nileRes.ok) {
      const error = await nileRes.json()
      return NextResponse.json({ error }, { status: nileRes.status })
    }

    const data = await nileRes.json()
    return NextResponse.json({ success: true, data }, { status: 200 })

  } catch (error) {
    console.error("Check-in error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
