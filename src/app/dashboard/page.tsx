"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { signOut, type User as FirebaseUser } from "firebase/auth"
import { BookOpen, MessageCircle, MapPin, Calendar, Heart, TrendingUp, FileText, Sparkles, LogOut } from "lucide-react"

export default function DashboardPage() {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [streak, setStreak] = useState(7)
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700">Loading your support space...</p>
        </div>
      </div>
    )
  }

  const getProfilePicture = (email: string) => {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}&backgroundColor=3b82f6&textColor=ffffff`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">NeoCare</h1>
            </div>
            <div className="flex items-center gap-3">
              <img src={getProfilePicture(user?.email || "")} alt="Profile" className="w-8 h-8 rounded-full" />
              <button
                onClick={handleSignOut}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.displayName?.split(" ")[0] || "there"}
          </h2>
          <p className="text-gray-600">You&apos;re doing an amazing job. Here&apos;s your support space for today.</p>
        </div>

        {/* Wellness Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-blue-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Daily Check-in Streak</p>
                <p className="text-3xl font-bold text-blue-600">{streak}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Keep it up! You&apos;re building resilience
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-blue-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Journal Entries</p>
                <p className="text-3xl font-bold text-purple-600">12</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">This week</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-blue-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Conversations</p>
                <p className="text-3xl font-bold text-green-600">5</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Always here when you need support</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-blue-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-blue-600" />
              Your Support Tools
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-blue-50 rounded-lg transition-colors group">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-900">Private Journal</span>
                  <p className="text-xs text-gray-500">Write your thoughts safely and privately</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-green-50 rounded-lg transition-colors group">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-900">AI Support Chat</span>
                  <p className="text-xs text-gray-500">Talk when you need emotional support</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-purple-50 rounded-lg transition-colors group">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-900">NICU Glossary</span>
                  <p className="text-xs text-gray-500">Clear, simple medical terms & resources</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-orange-50 rounded-lg transition-colors group">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-900">Find NICU Hospitals</span>
                  <p className="text-xs text-gray-500">Locate specialized care near you</p>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-blue-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Daily Check-in
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <p className="text-sm font-medium text-gray-900 mb-2">How are you feeling today?</p>
                <div className="flex gap-2">
                  {["😔", "😐", "🙂", "😊", "😄"].map((emoji, index) => (
                    <button key={index} className="w-10 h-10 text-xl hover:bg-white rounded-lg transition-colors">
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">You completed yesterday&apos;s check-in</p>
                    <p className="text-xs text-gray-500">Building emotional awareness, one day at a time</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New NICU resource added</p>
                    <p className="text-xs text-gray-500">&quot;Understanding Your Baby&apos;s Monitors&quot;</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Journal reminder</p>
                    <p className="text-xs text-gray-500">Writing can help process difficult emotions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
