"use client"

import type React from "react"

import { auth } from "@/lib/firebase"
import { onAuthStateChanged, type User } from "firebase/auth"
import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { BsCalendar, BsJournalText } from "react-icons/bs"
import { RiRobot3Line } from "react-icons/ri"
import { TbLocation } from "react-icons/tb"
import { HiMiniMagnifyingGlass } from "react-icons/hi2"
import { IoTrendingUp } from "react-icons/io5"
import { LuSparkles } from "react-icons/lu"

interface CheckInDate {
  check_date: string
  count?: number
}

interface DashboardData {
  streak: number
  journalEntries: number
  checkedInDays: number[]
  thisWeekCheckIns: CheckInDate[]
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    streak: 0,
    journalEntries: 0,
    checkedInDays: [],
    thisWeekCheckIns: [],
  })

  const getCurrentWeek = () => {
    const today = new Date()
    const currentDay = today.getDay()
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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("[v0] Auth state changed:", currentUser?.uid || "No user")
      setUser(currentUser)

      if (currentUser) {
        fetchDashboardData(currentUser)
      } else {
        setIsLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const fetchDashboardData = async (currentUser: User) => {
    try {
      console.log("[v0] Fetching dashboard data for user:", currentUser.uid)
      const idToken = await currentUser.getIdToken()
      console.log("[v0] Got ID token, making API request")

      const response = await fetch("/api/dashboard", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })

      console.log("[v0] API response status:", response.status)

      if (response.ok) {
        const data: DashboardData = await response.json()
        console.log("[v0] Dashboard data received:", data)
        setDashboardData(data)
      } else {
        const errorText = await response.text()
        console.error("[v0] API error:", response.status, errorText)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch dashboard data:", error)
    } finally {
      setIsLoading(false)
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Please log in</h1>
          <p className="text-muted-foreground">You need to be authenticated to view your dashboard.</p>
        </div>
      </div>
    )
  }

  const checkedInDaysSet = new Set(dashboardData.checkedInDays)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="md:ml-64">
        <main className="p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
            <p className="text-muted-foreground">
              You&apos;re doing an amazing job. Here&apos;s your support space for today.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Daily Check-in Streak</p>
                  <p className="text-3xl font-bold text-card-foreground">{dashboardData.streak}</p>
                </div>
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <IoTrendingUp className="w-6 h-6 text-foreground" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <LuSparkles className="w-3 h-3" />
                <span>Keep it up! You&apos;re building resilience</span>
              </div>
            </div>
          </div>

          {/* Support Tools & Weekly Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tools */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-card-foreground mb-6 flex items-center gap-2">
                Your Support Tools
              </h2>
              <div className="space-y-3">
                {/* Tool Buttons */}
                <ToolButton
                  icon={<BsJournalText />}
                  title="Private Journal"
                  description="Write your thoughts safely and privately"
                />
                <ToolButton
                  icon={<RiRobot3Line />}
                  title="AI Support Chat"
                  description="Talk when you need emotional support"
                />
                <ToolButton
                  icon={<HiMiniMagnifyingGlass />}
                  title="NICU Glossary"
                  description="Clear, simple medical terms & resources"
                />
                <ToolButton
                  icon={<TbLocation />}
                  title="Find NICU Hospitals"
                  description="Locate specialized care near you"
                />
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-card-foreground mb-6 flex items-center gap-2">
                <BsCalendar className="w-5 h-5 text-foreground" />
                This Week&apos;s Check-ins
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-7 gap-2">
                  {weekDays.map((date, index) => {
                    const isToday = index === today
                    const isCheckedIn = checkedInDaysSet.has(index)
                    const dayNumber = date.getDate()

                    return (
                      <div key={index} className="text-center">
                        <div className="text-xs font-medium text-muted-foreground mb-2">{dayNames[index]}</div>
                        <div
                          className={`w-12 h-12 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                            isToday && isCheckedIn
                              ? "bg-primary text-primary-foreground ring-2 ring-ring"
                              : isToday
                                ? "bg-muted text-foreground border-2 border-primary"
                                : isCheckedIn
                                  ? "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700"
                                  : index > today
                                    ? "bg-muted text-muted-foreground"
                                    : "bg-muted text-muted-foreground border border-border"
                          }`}
                        >
                          {isCheckedIn ? "✓" : dayNumber}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Progress Bar */}
                <div className="p-4 bg-muted rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">This Week</span>
                    <span className="text-sm text-muted-foreground">{checkedInDaysSet.size}/7 days</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(checkedInDaysSet.size / 7) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {checkedInDaysSet.size === 7
                      ? "Perfect week! You&apos;re building amazing consistency 🌟"
                      : checkedInDaysSet.size >= 5
                        ? "Great progress! Keep up the momentum 💪"
                        : "Every check-in matters. You&apos;re doing great 💙"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function ToolButton({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-accent rounded-lg transition-all duration-200 group">
      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center group-hover:bg-accent-foreground/10 transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-card-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </button>
  )
}
