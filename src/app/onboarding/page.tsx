"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { updateProfile } from "firebase/auth"
import { BsHeart, BsPerson, BsGeoAlt, BsArrowRight, BsCheck } from "react-icons/bs"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    relationship: "",
    babyName: "",
    location: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const totalSteps = 3

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: auth.currentUser.displayName || "User",
        })
      }
      router.push("/dashboard")
    } catch (error) {
      console.error("Error completing onboarding:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.relationship !== ""
      case 2:
        return true // Baby name is optional
      case 3:
        return formData.location !== ""
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step < currentStep
                      ? "bg-black text-white"
                      : step === currentStep
                        ? "bg-black text-white ring-4 ring-gray-200"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step < currentStep ? <BsCheck className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      step < currentStep ? "bg-black" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">
            Step {currentStep} of {totalSteps}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BsHeart className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-2xl font-bold text-black mb-2">Welcome to NeoCare</h1>
            <p className="text-gray-600">
              You&apos;re not alone in this journey. Let&apos;s personalize your support experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Relationship */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-black mb-2">What&apos;s your relationship to the baby?</h2>
                  <p className="text-sm text-gray-600">
                    This helps us provide more personalized support and resources.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { value: "mother", label: "Mother" },
                    { value: "father", label: "Father" },
                    { value: "grandparent", label: "Grandparent" },
                    { value: "sibling", label: "Sibling" },
                    { value: "family-friend", label: "Family Friend" },
                    { value: "other", label: "Other Family Member" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        formData.relationship === option.value
                          ? "border-black bg-gray-50"
                          : "border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="relationship"
                        value={option.value}
                        checked={formData.relationship === option.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <BsPerson className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="font-medium text-black">{option.label}</span>
                      {formData.relationship === option.value && <BsCheck className="w-5 h-5 text-black ml-auto" />}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Baby Name */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-black mb-2">
                    What would you like us to call your little one?
                  </h2>
                  <p className="text-sm text-gray-600">
                    This is optional, but it helps make your experience more personal.
                  </p>
                </div>

                <div className="relative">
                  <BsHeart className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                  <input
                    type="text"
                    name="babyName"
                    value={formData.babyName}
                    onChange={handleChange}
                    placeholder="Baby&apos;s name or nickname"
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-200 text-black placeholder:text-gray-500"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    💡 <strong>Tip:</strong> You can always update this later in your profile settings.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-black mb-2">Where are you located?</h2>
                  <p className="text-sm text-gray-600">
                    This helps us find NICU resources and support groups near you.
                  </p>
                </div>

                <div className="relative">
                  <BsGeoAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, State"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-200 text-black placeholder:text-gray-500"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    🔒 <strong>Privacy:</strong> Your location is only used to find nearby resources and is never
                    shared.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 py-3 px-4 border border-gray-200 rounded-lg text-black hover:bg-gray-50 transition-colors duration-200"
                >
                  Back
                </button>
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex-1 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                >
                  Continue
                  <BsArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || !canProceed()}
                  className="flex-1 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                >
                  {isLoading ? "Setting up..." : "Complete Setup"}
                  {!isLoading && <BsCheck className="w-4 h-4" />}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Your information is private and secure. You can update these details anytime in your profile.
        </p>
      </div>
    </div>
  )
}
