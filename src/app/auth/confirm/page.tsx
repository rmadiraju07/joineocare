"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { isSignInWithEmailLink, signInWithEmailLink, updateProfile, getAdditionalUserInfo } from "firebase/auth"

export default function ConfirmPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const completeSignIn = async () => {
      try {
        const storedEmail = window.localStorage.getItem("emailForSignIn")
        const storedName = window.localStorage.getItem("signupName")

        // Fallback to prompt if email isn&apos;t stored
        const emailToUse = storedEmail || window.prompt("Please enter your email to complete sign-in:")

        if (!emailToUse) {
          alert("Email is required to sign in.")
          router.push("/auth")
          return
        }

        if (!isSignInWithEmailLink(auth, window.location.href)) {
          alert("Invalid or expired sign-in link.")
          router.push("/auth")
          return
        }

        const result = await signInWithEmailLink(auth, emailToUse, window.location.href)
        window.localStorage.removeItem("emailForSignIn")

        // If it&apos;s a signup, optionally update user profile with display name
        if (storedName && auth.currentUser) {
          await updateProfile(auth.currentUser, { displayName: storedName })
          window.localStorage.removeItem("signupName")
        }

        // Check if this is a new user
        const userInfo = getAdditionalUserInfo(result)
        if (userInfo?.isNewUser) {
          router.push("/onboarding") // change to your real onboarding route
        } else {
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("Error confirming sign-in:", error)
        alert("Link invalid or expired. Try again.")
        router.push("/auth")
      } finally {
        setIsProcessing(false)
      }
    }

    completeSignIn()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-700 text-lg">{isProcessing ? "Signing you in..." : "Redirecting..."}</p>
    </div>
  )
}
