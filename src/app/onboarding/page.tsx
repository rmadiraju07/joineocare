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
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step < currentStep
                      ? "bg-primary text-primary-foreground"
                      : step === currentStep
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step < currentStep ? <BsCheck className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      step < currentStep ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Step {currentStep} of {totalSteps}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BsHeart className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-card-foreground mb-2">Welcome to NeoCare</h1>
            <p className="text-muted-foreground">
              You&apos;re not alone in this journey. Let&apos;s personalize your support experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Relationship */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-heading font-semibold text-card-foreground mb-2">
                    What&apos;s your relationship to the baby?
                  </h2>
                  <p className="text-sm text-muted-foreground">
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
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
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
                      <BsPerson className="w-5 h-5 text-muted-foreground mr-3" />
                      <span className="font-medium text-card-foreground">{option.label}</span>
                      {formData.relationship === option.value && <BsCheck className="w-5 h-5 text-primary ml-auto" />}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Baby Name */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-heading font-semibold text-card-foreground mb-2">
                    What would you like us to call your little one?
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    This is optional, but it helps make your experience more personal.
                  </p>
                </div>

                <div className="relative">
                  <BsHeart className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    name="babyName"
                    value={formData.babyName}
                    onChange={handleChange}
                    placeholder="Baby&apos;s name or nickname"
                    className="w-full pl-12 pr-4 py-4 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 text-card-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>Tip:</strong> You can always update this later in your profile settings.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-heading font-semibold text-card-foreground mb-2">
                    Where are you located?
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    This helps us find NICU resources and support groups near you.
                  </p>
                </div>

                <div className="relative">
                  <BsGeoAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, State"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 text-card-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
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
                  className="flex-1 py-3 px-4 border border-border rounded-lg text-card-foreground hover:bg-muted transition-colors duration-200"
                >
                  Back
                </button>
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex-1 bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                >
                  Continue
                  <BsArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || !canProceed()}
                  className="flex-1 bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                >
                  {isLoading ? "Setting up..." : "Complete Setup"}
                  {!isLoading && <BsCheck className="w-4 h-4" />}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Your information is private and secure. You can update these details anytime in your profile.
        </p>
      </div>
    </div>
  )
}
