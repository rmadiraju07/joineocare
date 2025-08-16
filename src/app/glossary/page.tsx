"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Search, BookOpen, Info } from "lucide-react"

interface GlossaryTerm {
  term: string
  definition: string
  category?: string
}

const glossary: GlossaryTerm[] = [
  {
    term: "CPAP",
    definition: "Continuous Positive Airway Pressure – a gentle form of breathing support that keeps a baby's airways open.",
    category: "Respiratory",
  },
  {
    term: "ROP",
    definition: "Retinopathy of Prematurity – an eye condition that can affect premature babies, involving abnormal blood vessel growth in the retina.",
    category: "Vision",
  },
  {
    term: "Kangaroo Care",
    definition: "Skin-to-skin contact between parent and baby, shown to help regulate the baby's temperature, heart rate, and promote bonding.",
    category: "Care Practice",
  },
  {
    term: "Apnea",
    definition: "A pause in breathing lasting more than 20 seconds, common in premature infants.",
    category: "Respiratory",
  },
  {
    term: "Bilirubin",
    definition: "A substance that can build up in a baby's blood and cause jaundice (yellowing of the skin).",
    category: "Lab/Monitoring",
  },
  {
    term: "Pulse Oximeter",
    definition: "A small sensor that measures the amount of oxygen in the baby's blood.",
    category: "Monitoring",
  },
  {
    term: "Gavage Feeding",
    definition: "Feeding a baby through a tube that goes into the nose or mouth and down to the stomach.",
    category: "Feeding",
  },
  {
    term: "Incubator",
    definition: "A special enclosed crib that keeps babies warm and protects them from infection and noise.",
    category: "Equipment",
  },
  {
    term: "Phototherapy",
    definition: "Treatment with special lights to help break down bilirubin and treat jaundice.",
    category: "Treatment",
  },
  {
    term: "Desat",
    definition: "Short for desaturation, meaning a drop in the baby's blood oxygen level.",
    category: "Monitoring",
  },
  // Add more terms as needed
]

const categories = [
  { id: "all", name: "All Categories" },
  ...Array.from(new Set(glossary.map((t) => t.category).filter(Boolean))).map((cat) => ({
    id: cat!.toLowerCase().replace(/\s+/g, "-"),
    name: cat!,
  })),
]

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredGlossary = glossary.filter((entry) => {
    const matchesSearch =
      entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.definition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" ||
      (entry.category && entry.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory)
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NICU Glossary</h1>
          <p className="text-gray-600 max-w-2xl">
            A quick-reference guide to common NICU terms. Tap a term to see a parent-friendly explanation.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Glossary List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedCategory === "all"
                ? "All Terms"
                : categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-sm text-gray-500">{filteredGlossary.length} terms found</span>
          </div>

          <div className="grid gap-4">
            {filteredGlossary.map((entry) => (
              <div
                key={entry.term}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Info className="w-5 h-5 text-primary" />
                      <span className="text-lg font-bold text-gray-900">{entry.term}</span>
                      {entry.category && (
                        <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          {entry.category}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 text-base">{entry.definition}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredGlossary.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No terms found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}