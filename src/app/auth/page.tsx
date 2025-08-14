"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { sendSignInLinkToEmail } from "firebase/auth"
import { auth } from "@/lib/firebase"
import Link from "next/link"
import { Mail, Check } from "lucide-react"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const actionCodeSettings = {
        url: "https://joineocare.vercel.app/auth/confirm",
        handleCodeInApp: true,
      }

      await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      window.localStorage.setItem("emailForSignIn", email)
      setIsEmailSent(true)
    } catch (err) {
      console.error("Error sending magic link:", err)
      alert("Could not send login link. Try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 bg-green-100 p-4 rounded-full">
          <Check className="text-green-600 w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold">Check your email</h2>
        <p className="mt-2 text-gray-600">
          A magic link was sent to <strong>{email}</strong>.
        </p>
        <p className="text-sm text-gray-500">Click it to sign in to your account.</p>

        <button
          onClick={() => {
            setEmail("")
            setIsEmailSent(false)
          }}
          className="mt-6 text-sm underline text-black"
        >
          Use a different email
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign in</h1>
          <p className="text-sm text-gray-500">We'll send a magic link to your email.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <input
              type="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              placeholder="you@example.com"
            />
            <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          {isLoading ? "Sending..." : "Send magic link"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-black underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}
