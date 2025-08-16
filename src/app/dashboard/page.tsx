"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { BsHeart, BsCalendar, BsJournalText } from "react-icons/bs"
import { RiRobot3Line } from "react-icons/ri"
import { TbLocation } from "react-icons/tb"
import { HiMiniMagnifyingGlass } from "react-icons/hi2"
import { IoTrendingUp } from "react-icons/io5"
import { LuSparkles } from "react-icons/lu"

interface CheckInDate {
  check_date: string
  count?: string
}

interface DashboardData {
  streak: number
  journalEntries: number
  checkedInDays: number[]
  thisWeekCheckIns: CheckInDate[]
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
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
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/dashboard")
        if (response.ok) {
          const data: DashboardData = await response.json()
          setDashboardData(data)
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

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

  const checkedInDaysSet = new Set(dashboardData.checkedInDays)

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <div className="md:ml-64">
        <main className="p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Welcome back</h1>
            <p className="text-gray-600">You&apos;re doing an amazing job. Here&apos;s your support space for today.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Daily Check-in Streak</p>
                  <p className="text-3xl font-bold text-black">{dashboardData.streak}</p>
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
                  <p className="text-3xl font-bold text-black">{dashboardData.journalEntries}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <BsJournalText className="w-6 h-6 text-black" />
                </div>
              </div>
              <p className="text-xs text-gray-500">This week</p>
            </div>
          </div>

          {/* Support Tools & Weekly Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tools */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-black mb-6 flex items-center gap-2">
                Your Support Tools
              </h2>
              <div className="space-y-3">
                {/* Tool Buttons */}
                <ToolButton icon={<BsJournalText />} title="Private Journal" description="Write your thoughts safely and privately" />
                <ToolButton icon={<RiRobot3Line />} title="AI Support Chat" description="Talk when you need emotional support" />
                <ToolButton icon={<HiMiniMagnifyingGlass />} title="NICU Glossary" description="Clear, simple medical terms & resources" />
                <ToolButton icon={<TbLocation />} title="Find NICU Hospitals" description="Locate specialized care near you" />
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-black mb-6 flex items-center gap-2">
                <BsCalendar className="w-5 h-5 text-black" />
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
                        <div className="text-xs font-medium text-gray-600 mb-2">{dayNames[index]}</div>
                        <div
                          className={`w-12 h-12 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                            isToday && isCheckedIn
                              ? "bg-black text-white ring-2 ring-gray-300"
                              : isToday
                              ? "bg-gray-100 text-black border-2 border-black"
                              : isCheckedIn
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : index > today
                              ? "bg-gray-50 text-gray-400"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                        >
                          {isCheckedIn ? "✓" : dayNumber}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Progress Bar */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-black">This Week</span>
                    <span className="text-sm text-gray-600">{checkedInDaysSet.size}/7 days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-black h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(checkedInDaysSet.size / 7) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
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
    <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 rounded-lg transition-all duration-200 group">
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-black">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </button>
  )
}
