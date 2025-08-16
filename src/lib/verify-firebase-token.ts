import type { NextRequest } from "next/server"
import { admin } from "./firebase-admin"

export async function verifyFirebaseToken(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null
    }

    const idToken = authHeader.split("Bearer ")[1]
    const decodedToken = await admin.auth().verifyIdToken(idToken)

    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
    }
  } catch (error) {
    console.error("Token verification failed:", error)
    return null
  }
}
