"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BsHouse, BsJournalText, BsRobot, BsHeart, BsGeoAlt, BsBook, BsPerson, BsList, BsX } from "react-icons/bs"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BsHouse },
  { name: "Journal", href: "/journal", icon: BsJournalText },
  { name: "AI Support", href: "/ai-support", icon: BsRobot },
  { name: "Wellness", href: "/wellness", icon: BsHeart },
  { name: "Find NICUs", href: "/find-nicus", icon: BsGeoAlt },
  { name: "Resources", href: "/resources", icon: BsBook },
  { name: "Profile", href: "/profile", icon: BsPerson },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-black border border-gray-800 text-white hover:bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <BsX className="h-5 w-5" /> : <BsList className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-black border-r border-gray-800 transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-800">
            <Image src="/logo.svg" alt="NeoCare Logo" width={32} height={32} className="w-8 h-8" />
            <div>
              <h1 className="font-bold text-lg text-white">NeoCare</h1>
              <p className="text-xs text-gray-400">NICU Family Support</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive ? "bg-white text-black shadow-sm" : "text-gray-300 hover:bg-gray-800 hover:text-white",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Bottom section */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-900">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent("John Doe")}&backgroundColor=ffffff&textColor=000000`}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">John Doe</p>
                <p className="text-xs text-gray-400 truncate">Parent</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
