"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { signOut, type User as FirebaseUser } from "firebase/auth"
import { Sidebar } from "@/components/sidebar"
import {
  BsJournalText,
  BsRobot,
  BsBook,
  BsGeoAlt,
  BsHeart,
  BsCalendar,
  BsChat,
} from "react-icons/bs"

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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your support space...</p>
        </div>
      </div>
    )
  }

  const moodEmojis = ["😔", "😐", "🙂", "😊", "😄"]
  const moodLabels = ["Struggling", "Okay", "Good", "Great", "Amazing"]

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      {/* Main Content */}
      <div className="md:ml-64">
        <main className="p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Welcome back, {user?.displayName?.split(" ")[0] || "there"}
            </h1>
            <p className="text-muted-foreground">
              You&apos;re doing an amazing job. Here&apos;s your support space for today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Daily Check-in Streak</p>
                  <p className="text-3xl font-heading font-bold text-primary">{streak}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <IoTrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-sidebar-accent">
                <LuSparkles className="w-3 h-3" />
                <span>Keep it up! You&apos;re building resilience</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Journal Entries</p>
                  <p className="text-3xl font-heading font-bold text-chart-2">12</p>
                </div>
                <div className="w-12 h-12 bg-chart-2/10 rounded-full flex items-center justify-center">
                  <BsJournalText className="w-6 h-6 text-chart-2" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">This week</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">AI Conversations</p>
                  <p className="text-3xl font-heading font-bold text-chart-4">5</p>
                </div>
                <div className="w-12 h-12 bg-chart-4/10 rounded-full flex items-center justify-center">
                  <BsChat className="w-6 h-6 text-chart-4" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Always here when you need support</p>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Support Tools */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-heading font-semibold text-card-foreground mb-6 flex items-center gap-2">
                <BsHeart className="w-5 h-5 text-primary" />
                Your Support Tools
              </h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/50 rounded-lg transition-all duration-200 group">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <BsJournalText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-card-foreground">Private Journal</h3>
                    <p className="text-sm text-muted-foreground">Write your thoughts safely and privately</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/50 rounded-lg transition-all duration-200 group">
                  <div className="w-12 h-12 bg-chart-4/10 rounded-lg flex items-center justify-center group-hover:bg-chart-4/20 transition-colors">
                    <BsRobot className="w-6 h-6 text-chart-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-card-foreground">AI Support Chat</h3>
                    <p className="text-sm text-muted-foreground">Talk when you need emotional support</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/50 rounded-lg transition-all duration-200 group">
                  <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center group-hover:bg-chart-2/20 transition-colors">
                    <BsBook className="w-6 h-6 text-chart-2" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-card-foreground">NICU Glossary</h3>
                    <p className="text-sm text-muted-foreground">Clear, simple medical terms & resources</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/50 rounded-lg transition-all duration-200 group">
                  <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center group-hover:bg-chart-3/20 transition-colors">
                    <BsGeoAlt className="w-6 h-6 text-chart-3" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-card-foreground">Find NICU Hospitals</h3>
                    <p className="text-sm text-muted-foreground">Locate specialized care near you</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Daily Check-in */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-heading font-semibold text-card-foreground mb-6 flex items-center gap-2">
                <BsCalendar className="w-5 h-5 text-primary" />
                Daily Check-in
              </h2>

              <div className="space-y-6">
                {/* Mood Selector */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                  <p className="text-sm font-medium text-card-foreground mb-4">How are you feeling today?</p>
                  <div className="flex gap-2">
                    {moodEmojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedMood(index)}
                        className={`w-12 h-12 text-xl rounded-lg transition-all duration-200 ${
                          selectedMood === index
                            ? "bg-primary text-primary-foreground ring-2 ring-primary/20"
                            : "hover:bg-background"
                        }`}
                        title={moodLabels[index]}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  {selectedMood !== null && (
                    <p className="text-xs text-muted-foreground mt-2">
                      You&apos;re feeling {moodLabels[selectedMood].toLowerCase()} today
                    </p>
                  )}
                </div>

                {/* Activity Feed */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-chart-4/5 rounded-lg border border-chart-4/20">
                    <div className="w-2 h-2 bg-chart-4 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">
                        You completed yesterday&apos;s check-in
                      </p>
                      <p className="text-xs text-muted-foreground">Building emotional awareness, one day at a time</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">New NICU resource added</p>
                      <p className="text-xs text-muted-foreground">
                        &quot;Understanding Your Baby&apos;s Monitors&quot;
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-chart-2/5 rounded-lg border border-chart-2/20">
                    <div className="w-2 h-2 bg-chart-2 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">Journal reminder</p>
                      <p className="text-xs text-muted-foreground">Writing can help process difficult emotions</p>
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
