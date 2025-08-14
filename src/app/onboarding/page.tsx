"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { updateProfile } from "firebase/auth"
import { User, Briefcase, MapPin, ArrowRight } from "lucide-react"

export default function OnboardingPage() {
  const [formData, setFormData] = useState({
    role: "",
    organization: "",
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
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to EoCare</h1>
          <p className="text-sm text-gray-500 mt-2">Let&apos;s get you set up with a few quick details.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">What&apos;s your role?</label>
          <div className="relative">
            <select
              name="role"
              required
              disabled={isLoading}
              value={formData.role}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-md appearance-none bg-white"
            >
              <option value="">Select your role</option>
              <option value="healthcare-provider">Healthcare Provider</option>
              <option value="administrator">Administrator</option>
              <option value="care-coordinator">Care Coordinator</option>
              <option value="other">Other</option>
            </select>
            <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
          <div className="relative">
            <input
              type="text"
              name="organization"
              required
              disabled={isLoading}
              value={formData.organization}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              placeholder="Your hospital or clinic"
            />
            <Briefcase className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <div className="relative">
            <input
              type="text"
              name="location"
              required
              disabled={isLoading}
              value={formData.location}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              placeholder="City, State"
            />
            <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? "Setting up..." : "Complete Setup"}
          {!isLoading && <ArrowRight className="w-4 h-4" />}
        </button>

        <p className="text-center text-xs text-gray-500">
          You can update these details later in your profile settings.
        </p>
      </form>
    </div>
  )
}
