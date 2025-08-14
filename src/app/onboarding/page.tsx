"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { updateProfile } from "firebase/auth"
import { Heart, Baby, MapPin, ArrowRight } from "lucide-react"

export default function OnboardingPage() {
  const [formData, setFormData] = useState({
    relationship: "",
    babyName: "",
    location: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // You can save additional profile data to your database here
      // For now, we&apos;ll just complete onboarding

      // Optional: Update user profile with additional info
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: auth.currentUser.displayName || "User",
        })
      }

      router.push("/dashboard")
    } catch (error) {
      console.error("Error completing onboarding:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome to NeoCare</h1>
          <p className="text-sm text-gray-600 mt-2">
            You&apos;re not alone in this journey. Let&apos;s get you connected to the support you need.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your relationship to baby</label>
          <div className="relative">
            <select
              name="relationship"
              required
              disabled={isLoading}
              value={formData.relationship}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select your relationship</option>
              <option value="mother">Mother</option>
              <option value="father">Father</option>
              <option value="grandparent">Grandparent</option>
              <option value="sibling">Sibling</option>
              <option value="family-friend">Family Friend</option>
              <option value="other">Other Family Member</option>
            </select>
            <Heart className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Baby&apos;s name (optional)</label>
          <div className="relative">
            <input
              type="text"
              name="babyName"
              disabled={isLoading}
              value={formData.babyName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="What would you like us to call your little one?"
            />
            <Baby className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your location</label>
          <div className="relative">
            <input
              type="text"
              name="location"
              required
              disabled={isLoading}
              value={formData.location}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="City, State (to find nearby resources)"
            />
            <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 font-medium transition-colors"
        >
          {isLoading ? "Setting up your support..." : "Begin Your Journey"}
          {!isLoading && <ArrowRight className="w-4 h-4" />}
        </button>

        <p className="text-center text-xs text-gray-500">
          Your information is private and secure. You can update these details anytime.
        </p>
      </form>
    </div>
  )
}
