"use client"

import Image from "next/image"
import Link from "next/link"
import { Check, X, Bluetooth, Shield, Users, Zap, MapPin, Heart } from "lucide-react"



export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="mt-8 px-6 font-circular">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Image src="/logo.svg" width={40} height={40} alt="neocare logo" priority />
          </div>

          {/* Center: Tagline - Fixed positioning to prevent shift */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <p className="text-3xl text-gray-800 tracking-tight whitespace-nowrap">Caring for the carers</p>
          </div>

          {/* Right: Buttons + Login - Fixed width container */}
          <div className="flex items-center space-x-3" style={{ minWidth: "280px", justifyContent: "flex-end" }}>
            {/* Pill-shaped buttons with full text */}
            <Link href="/blog">
              <button className="px-6 py-2 rounded-full bg-white text-gray-800 shadow-md hover:bg-gray-100 transition-all duration-200 font-semibold text-sm border border-gray-200 hover:shadow-lg">
                Blog
              </button>
            </Link>
            {/* Login button with hover expansion */}
            <div className="relative">
              <Link href="/auth">
                <button
                  type="button"
                  className="group flex items-center h-10 rounded-full bg-white text-gray-800 shadow-md hover:bg-gray-100 border border-gray-300 transition-all duration-300 overflow-hidden cursor-pointer"
                  style={{
                    width: "40px",
                    minWidth: "40px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.width = "112px"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.width = "40px"
                  }}
                >
                  <div className="flex items-center pl-2">
                    <svg viewBox="0 0 22 22" width="22" height="22" fill="currentColor" className="flex-shrink-0">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.10358 13.9428C5.30836 12.2633 7.44208 11.0002 11 11.0002C14.5578 11.0002 16.6916 12.2633 17.8963 13.9428C19.0607 15.566 19.2462 17.4265 19.2499 18.4559C19.2536 19.4911 18.3857 20.1668 17.496 20.1668H4.50395C3.61416 20.1668 2.74629 19.4911 2.75001 18.4559C2.75371 17.4265 2.93917 15.566 4.10358 13.9428ZM4.58497 18.3335H17.4149C17.396 17.4608 17.2083 16.1289 16.4067 15.0115C15.6048 13.8937 14.0753 12.8335 11 12.8335C7.92462 12.8335 6.39511 13.8937 5.59326 15.0115C4.79164 16.1289 4.6039 17.4608 4.58497 18.3335Z"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11 7.3335C12.0126 7.3335 12.8334 6.51268 12.8334 5.50016C12.8334 4.48764 12.0126 3.66683 11 3.66683C9.98752 3.66683 9.16671 4.48764 9.16671 5.50016C9.16671 6.51268 9.98752 7.3335 11 7.3335ZM11 9.16683C13.0251 9.16683 14.6667 7.52521 14.6667 5.50016C14.6667 3.47512 13.0251 1.8335 11 1.8335C8.975 1.8335 7.33338 3.47512 7.33338 5.50016C7.33338 7.52521 8.975 9.16683 11 9.16683Z"
                      />
                    </svg>
                    <span className="ml-2 pr-2 text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">
                      Login
                    </span>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* neocare Section */}
      <section className="py-16 px-6 font-circular">
        <div className="max-w-4xl mx-auto">
          {/* Simple Brand Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4">
                <Image src="/logo.svg" width={24} height={24} alt="neocare logo" className="filter invert" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">neocare</h1>
            </div>
            <p className="text-xl text-gray-600 mb-4">Emotional support and guidance for families with babies in NICU.</p>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Designed for parents and loved ones navigating the NICU journey, offering comfort, clarity, and connection during a challenging time.
            </p>
          </div>

          {/* Simple Features */}
          {/* <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Why this helps</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MdOutlineBluetoothSearching className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Works nearby</h3>
                    <p className="text-gray-600 text-sm">
                      Uses Bluetooth to find other users within 10 meters. No internet needed.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaUserShield className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Completely anonymous</h3>
                    <p className="text-gray-600 text-sm">
                      No names, photos, or personal info. Just colored dots and moods.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaPeopleGroup className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Both people have to agree</h3>
                    <p className="text-gray-600 text-sm">
                      Chat only happens if both people tap to connect. No unwanted messages.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <PiBrainFill className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Made for neurodivergent people</h3>
                    <p className="text-gray-600 text-sm">No pressure to make small talk or read social cues.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MdEmergencyShare className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Emergency help signal</h3>
                    <p className="text-gray-600 text-sm">Triple-tap to quietly signal you need help to nearby users.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaLocationArrow className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Smart about location</h3>
                    <p className="text-gray-600 text-sm">
                      Automatically turns on in places like trains, libraries, waiting rooms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Simple comparison */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">The problem</h3>
                <div className="space-y-3">
                  {[
                    "Overwhelming emotions during NICU stays",
                    "Hard to understand complex medical terms",
                    "Feeling isolated and unsupported",
                    "Struggle to find nearby NICU resources",
                    "Hard to stay emotionally grounded day-to-day",
                  ].map((problem, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <span className="text-gray-700">{problem}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">How neocare helps</h3>
                <div className="space-y-3">
                  {[
                    "Journal your thoughts, safely and privately",
                    "Clear, simple NICU glossary & resources",
                    "AI support when you need to talk",
                    "Find NICU hospitals near you",
                    "Daily check-ins and streaks for emotional wellness",
                  ].map((solution, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{solution}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Simple CTA */}
          <div className="text-center bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ready to start your NICU journey with support?</h2>
            <Link href="/auth/signup">
              <button className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Get neocare
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 px-6">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center space-x-4 text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4">
                <Image src="/logo.svg" width={24} height={24} alt="neocare logo" className="filter invert" />
              </div>
              <span className="font-medium text-gray-600">neocare</span>
            </div>
            <span className="text-sm">Copyright © 2025</span>
            <div className="flex items-center space-x-2">
              <Image
  src="/america.svg"
  alt="American flag"
  width={24}
  height={18}
  className="rounded-sm"
/>

              <span className="text-sm">Made in America</span>
            </div>
          </div>

          {/* Right side */}
          <nav className="flex items-center space-x-6">
            <Link href="/media" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Media
            </Link>
            <Link href="/careers" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Careers
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Privacy
            </Link>
            <Link href="/legal" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Legal notice
            </Link>
            <Link href="/licenses" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Licenses
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
