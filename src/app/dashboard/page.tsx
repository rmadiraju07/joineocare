"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { signOut, type User as FirebaseUser } from "firebase/auth"
import { Sidebar } from "@/components/sidebar"
import { BsHeart, BsCalendar } from "react-icons/bs"

import { BsJournalText } from "react-icons/bs"
import { RiRobot3Line } from "react-icons/ri"
import { TbLocation } from "react-icons/tb"
import { HiMiniMagnifyingGlass } from "react-icons/hi2"

import { IoTrendingUp } from "react-icons/io5"
import { LuSparkles } from "react-icons/lu"

export default function DashboardPage() {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [streak, setStreak] = useState(7)
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const router = useRouter()

  const [checkedInDays, setCheckedInDays] = useState<Set<number>>(new Set([0, 1, 2, 4, 6])) // Mock data: checked in on Sun, Mon, Tue, Thu, Sat

  const getCurrentWeek = () => {
    const today = new Date()
    const currentDay = today.getDay() // 0 = Sunday, 1 = Monday, etc.
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - currentDay)

    const week = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      week.push(day)
    }
    return week
  }

  const weekDays = getCurrentWeek()
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const today = new Date().getDay()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        router.push("/auth")
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push("/auth")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const moodEmojis = ["😔", "😐", "🙂", "😊", "😄"]
  const moodLabels = ["Struggling", "Okay", "Good", "Great", "Amazing"]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your support space...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      {/* Main Content */}
      <div className="md:ml-64">
        <main className="p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">
              Welcome back, {user?.displayName?.split(" ")[0] || "there"}
            </h1>
            <p className="text-gray-600">You&apos;re doing an amazing job. Here&apos;s your support space for today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Daily Check-in Streak</p>
                  <p className="text-3xl font-bold text-black">{streak}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <IoTrendingUp className="w-6 h-6 text-black" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <LuSparkles className="w-3 h-3" />
                <span>Keep it up! You&apos;re building resilience</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Journal Entries</p>
                  <p className="text-3xl font-bold text-black">12</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <BsJournalText className="w-6 h-6 text-black" />
                </div>
              </div>
              <p className="text-xs text-gray-500">This week</p>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Support Tools */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-black mb-6 flex items-center gap-2">
                <BsHeart className="w-5 h-5 text-black" />
                Your Support Tools
              </h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 rounded-lg transition-all duration-200 group">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <BsJournalText className="w-6 h-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-black">Private Journal</h3>
                    <p className="text-sm text-gray-600">Write your thoughts safely and privately</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 rounded-lg transition-all duration-200 group">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <RiRobot3Line className="w-6 h-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-black">AI Support Chat</h3>
                    <p className="text-sm text-gray-600">Talk when you need emotional support</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 rounded-lg transition-all duration-200 group">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <HiMiniMagnifyingGlass className="w-6 h-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-black">NICU Glossary</h3>
                    <p className="text-sm text-gray-600">Clear, simple medical terms & resources</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 rounded-lg transition-all duration-200 group">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <TbLocation className="w-6 h-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-black">Find NICU Hospitals</h3>
                    <p className="text-sm text-gray-600">Locate specialized care near you</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Weekly Calendar */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-black mb-6 flex items-center gap-2">
                <BsCalendar className="w-5 h-5 text-black" />
                This Week's Check-ins
              </h2>

              <div className="space-y-6">
                {/* Weekly Calendar */}
                <div className="grid grid-cols-7 gap-2">
                  {weekDays.map((date, index) => {
                    const isToday = index === today
                    const isCheckedIn = checkedInDays.has(index)
                    const dayNumber = date.getDate()

                    return (
                      <div key={index} className="text-center">
                        <div className="text-xs font-medium text-gray-600 mb-2">{dayNames[index]}</div>
                        <button
                          onClick={() => {
                            if (index <= today) {
                              const newCheckedInDays = new Set(checkedInDays)
                              if (isCheckedIn) {
                                newCheckedInDays.delete(index)
                              } else {
                                newCheckedInDays.add(index)
                              }
                              setCheckedInDays(newCheckedInDays)
                            }
                          }}
                          disabled={index > today}
                          className={`w-12 h-12 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isToday && isCheckedIn
                              ? "bg-black text-white ring-2 ring-gray-300"
                              : isToday
                                ? "bg-gray-100 text-black border-2 border-black hover:bg-gray-200"
                                : isCheckedIn
                                  ? "bg-green-100 text-green-800 border border-green-200"
                                  : index > today
                                    ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
                          }`}
                        >
                          {isCheckedIn ? "✓" : dayNumber}
                        </button>
                      </div>
                    )
                  })}
                </div>

                {/* Check-in Stats */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-black">This Week</span>
                    <span className="text-sm text-gray-600">{checkedInDays.size}/7 days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-black h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(checkedInDays.size / 7) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {checkedInDays.size === 7
                      ? "Perfect week! You're building amazing consistency 🌟"
                      : checkedInDays.size >= 5
                        ? "Great progress! Keep up the momentum 💪"
                        : "Every check-in matters. You're doing great 💙"}
                  </p>
                </div>

                {/* Today's Mood Selector (only if today is not checked in) */}
                {!checkedInDays.has(today) && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-black mb-4">How are you feeling today?</p>
                    <div className="flex gap-2 mb-3">
                      {moodEmojis.map((emoji, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedMood(index)}
                          className={`w-10 h-10 text-lg rounded-lg transition-all duration-200 ${
                            selectedMood === index
                              ? "bg-black text-white ring-2 ring-blue-300"
                              : "hover:bg-white bg-white/50"
                          }`}
                          title={moodLabels[index]}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                    {selectedMood !== null && (
                      <button
                        onClick={() => {
                          setCheckedInDays(new Set([...checkedInDays, today]))
                          setSelectedMood(null)
                        }}
                        className="w-full bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                      >
                        Complete Today's Check-in
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
