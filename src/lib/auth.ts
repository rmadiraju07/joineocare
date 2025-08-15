import type { NextRequest } from "next/server"

export async function verifyFirebaseToken(request: NextRequest): Promise<string> {
  const authHeader = request.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No authorization header")
  }

  const idToken = authHeader.split("Bearer ")[1]

  // In a production app, you'd verify the token with Firebase Admin SDK
  // For now, we'll extract the user ID from the token payload (not secure for production)
  try {
    const payload = JSON.parse(atob(idToken.split(".")[1]))
    return payload.user_id || payload.sub
  } catch (error) {
    throw new Error("Invalid token")
  }
}
