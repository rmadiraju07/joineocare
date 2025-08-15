"use client"

import Link from "next/link"
import { BsJournalText, BsBookmarks, BsPerson, BsList, BsX } from "react-icons/bs"
import { RiHomeSmile2Line, RiRobot3Line } from "react-icons/ri";
import { TbHealthRecognition, TbLocation } from "react-icons/tb";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { IoTrendingUp } from "react-icons/io5";
import { LuSparkles } from "react-icons/lu";
import { RiSortAlphabetAsc } from "react-icons/ri";
import { RiUserCommunityLine } from "react-icons/ri";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto w-full">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-6">About neocare</h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We understand that having a baby in the NICU is one of life&apos;s most challenging experiences. neocare
            was created to provide emotional support, clarity, and connection during this difficult journey.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-black mb-4 text-center">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center max-w-2xl mx-auto">
            To empower NICU families with the tools, resources, and emotional support they need to navigate their
            journey with confidence, hope, and connection.
          </p>
        </div>

        {/* The Problem Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">The Challenge We Address</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-black mb-3">Overwhelming Emotions</h3>
              <p className="text-gray-600">
                NICU stays bring intense feelings of fear, uncertainty, and helplessness that can be difficult to
                process alone.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-black mb-3">Complex Medical Terms</h3>
              <p className="text-gray-600">
                Medical jargon and procedures can be confusing, leaving families feeling lost and uninformed.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-black mb-3">Isolation & Loneliness</h3>
              <p className="text-gray-600">
                The NICU experience can feel isolating, with limited support from others who truly understand.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-black mb-3">Finding Resources</h3>
              <p className="text-gray-600">
                Locating nearby NICU facilities and support services can be challenging during an already stressful
                time.
              </p>
            </div>
          </div>
        </div>

        {/* How We Help Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">How neocare Helps</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <BsJournalText className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-black mb-3">Private Journaling</h3>
              <p className="text-gray-600">
                Express your thoughts and emotions in a safe, private space designed for healing and reflection.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <RiSortAlphabetAsc className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-black mb-3">NICU Glossary</h3>
              <p className="text-gray-600">
                Clear, simple explanations of medical terms and procedures to help you understand your baby&apos;s care.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <RiRobot3Line className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-black mb-3">AI Support</h3>
              <p className="text-gray-600">
                Emotional support through AI-powered conversations when you need someone to talk to.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <TbLocation className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-black mb-3">Hospital Finder</h3>
              <p className="text-gray-600">
                Locate NICU hospitals and specialized care facilities in your area with detailed information.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <TbHealthRecognition className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-black mb-3">Daily Check-ins</h3>
              <p className="text-gray-600">
                Track your emotional wellness with daily mood check-ins and build healthy coping streaks.
              </p>
            </div>

            {/* <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <RiUserCommunityLine className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-black mb-3">Community Support</h3>
              <p className="text-gray-600">
                Connect with other NICU families who understand your journey and can offer support.
              </p>
            </div> */}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-black text-white rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Empathy</h3>
              <p className="text-gray-300">
                We understand the unique challenges NICU families face and approach every interaction with compassion.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Privacy</h3>
              <p className="text-gray-300">
                Your thoughts, feelings, and personal information are completely private and secure with us.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Hope</h3>
              <p className="text-gray-300">
                We believe in the strength of families and the power of support to help you through difficult times.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-gray-600 mb-6">
            Join thousands of NICU families who have found comfort and support through neocare.
          </p>
          <Link
            href="/auth/signup"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </main>
  )
}