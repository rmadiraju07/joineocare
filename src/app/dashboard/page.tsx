"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { signOut, type User as FirebaseUser } from "firebase/auth"
import { Sidebar } from "@/components/sidebar"
import {
  BsRobot,
  BsBook,
  BsGeoAlt,
  BsHeart,
  BsCalendar,
  BsChat,
} from "react-icons/bs"

import { BsJournalText, BsBookmarks, BsPerson, BsList, BsX } from "react-icons/bs"
import { RiHomeSmile2Line, RiRobot3Line } from "react-icons/ri";
import { TbHealthRecognition, TbLocation } from "react-icons/tb";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { IoTrendingUp } from "react-icons/io5";
import { LuSparkles } from "react-icons/lu";


export default function DashboardPage() {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [streak, setStreak] = useState(7)
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const router = useRouter()

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

  const moodEmojis = ["😔", "😐", "🙂", "😊", "😄"]
  const moodLabels = ["Struggling", "Okay", "Good", "Great", "Amazing"]

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

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">AI Conversations</p>
                  <p className="text-3xl font-bold text-black">5</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <BsChat className="w-6 h-6 text-black" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Always here when you need support</p>
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

            {/* Daily Check-in */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-black mb-6 flex items-center gap-2">
                <BsCalendar className="w-5 h-5 text-black" />
                Daily Check-in
              </h2>

              <div className="space-y-6">
                {/* Mood Selector */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-black mb-4">How are you feeling today?</p>
                  <div className="flex gap-2">
                    {moodEmojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedMood(index)}
                        className={`w-12 h-12 text-xl rounded-lg transition-all duration-200 ${
                          selectedMood === index ? "bg-black text-white ring-2 ring-gray-300" : "hover:bg-white"
                        }`}
                        title={moodLabels[index]}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  {selectedMood !== null && (
                    <p className="text-xs text-gray-500 mt-2">
                      You&apos;re feeling {moodLabels[selectedMood].toLowerCase()} today
                    </p>
                  )}
                </div>

                {/* Activity Feed */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black">You completed yesterday&apos;s check-in</p>
                      <p className="text-xs text-gray-500">Building emotional awareness, one day at a time</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black">New NICU resource added</p>
                      <p className="text-xs text-gray-500">&quot;Understanding Your Baby&apos;s Monitors&quot;</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black">Journal reminder</p>
                      <p className="text-xs text-gray-500">Writing can help process difficult emotions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
