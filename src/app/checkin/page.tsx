"use client"

import { useState } from "react"
import { Heart, Calendar, Edit3, Save, Smile, Meh, Frown } from "react-feather"
import { Sidebar } from "@/components/sidebar"
import { getAuth } from "firebase/auth"

const CheckInPage = () => {
  const [selectedMood, setSelectedMood] = useState<string>("")
  const [journalEntry, setJournalEntry] = useState("")
  const [gratitude, setGratitude] = useState("")
  const [challenges, setChallenges] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const moods = [
    { id: "great", label: "Great", icon: Smile, color: "text-green-500" },
    { id: "okay", label: "Okay", icon: Meh, color: "text-yellow-500" },
    { id: "difficult", label: "Difficult", icon: Frown, color: "text-red-500" },
  ]

  const handleSubmit = async () => {
    if (!selectedMood) return

    const payload = {
      mood: selectedMood,
      gratitude,
      challenges,
      journalEntry,
    }

    try {
      const auth = getAuth()
      const user = auth.currentUser
      if (!user) {
        alert("You must be signed in to check in.")
        return
      }
      const idToken = await user.getIdToken()

      const res = await fetch("/api/checkin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setIsSubmitted(true)
        setTimeout(() => setIsSubmitted(false), 3000)
      } else {
        const { error } = await res.json()
        console.error("Check-in failed:", error)
      }
    } catch (err) {
      console.error("Unexpected error:", err)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Check-In</h1>
            <p className="text-gray-600">Take a moment to reflect on your day and emotions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Mood Check-In */}
            <div className="bg-white border-2 border-black rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                How are you feeling today?
              </h2>

              <div className="space-y-4">
                {moods.map((mood) => {
                  const IconComponent = mood.icon
                  return (
                    <button
                      key={mood.id}
                      onClick={() => setSelectedMood(mood.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all flex items-center space-x-3 ${
                        selectedMood === mood.id ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <IconComponent className={`w-6 h-6 ${mood.color}`} />
                      <span className="text-gray-700 font-medium">{mood.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quick Reflection */}
            <div className="bg-white border-2 border-black rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Reflection</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">What went well today?</label>
                  <textarea
                    value={gratitude}
                    onChange={(e) => setGratitude(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Even small moments count..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">What was challenging?</label>
                  <textarea
                    value={challenges}
                    onChange={(e) => setChallenges(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                    rows={3}
                    placeholder="It&apos;s okay to acknowledge difficult moments..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Journal Section */}
          <div className="bg-white border-2 border-black rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Edit3 className="w-5 h-5 mr-2" />
              Today&apos;s Journal Entry
            </h2>

            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              rows={8}
              placeholder="Write about your day, your feelings, your hopes, or anything on your mind. This is your safe space..."
            />

            <div className="mt-4 text-sm text-gray-500 flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              Your thoughts are private and secure
            </div>
          </div>

          {/* Submit Section */}
          <div className="text-center bg-gray-50 rounded-lg p-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              You&apos;re doing great by taking time for yourself
            </h3>

            <button
              onClick={handleSubmit}
              disabled={!selectedMood}
              className={`px-8 py-3 rounded-lg font-medium transition-colors flex items-center mx-auto space-x-2 ${
                !selectedMood
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : isSubmitted
                    ? "bg-green-600 text-white"
                    : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {isSubmitted ? (
                <>
                  <Heart className="w-5 h-5" />
                  <span>Check-in Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Complete Check-in</span>
                </>
              )}
            </button>

            <p className="text-sm text-gray-500 mt-4">Taking time to reflect helps build emotional resilience</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckInPage
