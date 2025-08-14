"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Mail, Check, User } from 'lucide-react'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call for magic link signup
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsEmailSent(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-white font-circular">
        {/* Header */}
        <header className="mt-8 px-6">
          <div className="flex items-center justify-between max-w-screen-xl mx-auto h-16">
            <Link href="/" className="flex items-center">
              <Image src="/logo.svg" width={40} height={40} alt="neocare logo" priority />
            </Link>
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <p className="text-3xl text-gray-800 tracking-tight whitespace-nowrap">Check your email</p>
            </div>
            <div style={{ minWidth: "280px" }}></div>
          </div>
        </header>

        {/* Success Content */}
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to neocare!</h1>
              <p className="text-gray-600 mb-2">
                We've sent a setup link to <span className="font-medium">{formData.email}</span>
              </p>
              <p className="text-sm text-gray-500">
                Click the link in your email to complete your account setup. The link will expire in 10 minutes.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setIsEmailSent(false)
                  setFormData({ name: "", email: "" })
                }}
                className="w-full px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
              >
                Use different details
              </button>

              <Link
                href="/"
                className="block w-full px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-center"
              >
                Back to home
              </Link>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-800 mb-1">Didn't receive the email?</p>
                  <p className="text-xs text-gray-600">
                    Check your spam folder or wait a few minutes before requesting a new link.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-circular">
      {/* Header */}
      <header className="mt-8 px-6">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto h-16">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" width={40} height={40} alt="neocare logo" priority />
          </Link>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <p className="text-3xl text-gray-800 tracking-tight whitespace-nowrap">Join neocare</p>
          </div>
          <div style={{ minWidth: "280px" }}></div>
        </div>
      </header>

      {/* Signup Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="max-w-md w-full">
          {/* Back button */}
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>

          {/* Signup Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4">
                  <Image src="/logo.svg" width={24} height={24} alt="neocare logo" className="filter invert" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">neocare</h1>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Create your account</h2>
              <p className="text-gray-600 text-sm">Get started with passwordless authentication</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Enter your full name"
                    disabled={isLoading}
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Enter your email"
                    disabled={isLoading}
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !formData.email || !formData.name}
                className="w-full bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating account...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Create account
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-green-600" />
                  </div>
                  <span>No password required</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-green-600" />
                  </div>
                  <span>Secure magic link setup</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-green-600" />
                  </div>
                  <span>Start improving your texting skills</span>
                </div>
              </div>
            </div>
          </div>

          {/* Switch to login */}
          <div className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link href="/auth" className="font-medium text-black hover:text-gray-800 transition-colors">
              Sign in
            </Link>
          </div>

          {/* Footer text */}
          <p className="text-center text-xs text-gray-500 mt-6">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
