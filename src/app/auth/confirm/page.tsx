"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailLink } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function ConfirmPage() {
  const router = useRouter()

  useEffect(() => {
    const completeSignIn = async () => {
      const email = window.localStorage.getItem("emailForSignIn")

      if (!email) {
        alert("No email found. Please try signing in again.")
        router.push("/auth")
        return
      }

      try {
        await signInWithEmailLink(auth, email, window.location.href)
        window.localStorage.removeItem("emailForSignIn")

        // Optional: fetch user profile from DB or redirect
        router.push("/dashboard")
      } catch (error) {
        console.error("Error confirming sign-in:", error)
        alert("Link invalid or expired. Try again.")
        router.push("/auth")
      }
    }

    completeSignIn()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-700 text-lg">Signing you in...</p>
    </div>
  )
}
