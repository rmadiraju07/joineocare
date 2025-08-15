"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, BookOpen, Video, FileText, Heart, Users, Shield, ExternalLink } from "lucide-react"
import { X, Bookmark, Check } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

interface Resource {
  id: number
  title: string
  description: string
  category: string
  type: string
  readTime: string
  featured: boolean
  content?: string
}

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [bookmarkedResources, setBookmarkedResources] = useState<number[]>([])

  const categories = [
    { id: "all", name: "All Resources", icon: BookOpen },
    { id: "medical", name: "Medical Guide", icon: Heart },
    { id: "emotional", name: "Emotional Support", icon: Heart },
    { id: "practical", name: "Practical Tips", icon: Shield },
    { id: "community", name: "Community", icon: Users },
  ]

  const resources: Resource[] = [
    {
      id: 1,
      title: "Understanding NICU Equipment",
      description: "A comprehensive guide to common NICU equipment and what each machine does for your baby.",
      category: "medical",
      type: "article",
      readTime: "8 min read",
      featured: true,
      content: `
        <h2>Common NICU Equipment Explained</h2>
        <p>Understanding the equipment around your baby can help reduce anxiety and make you feel more involved in their care.</p>
        
        <h3>Ventilator</h3>
        <p>A ventilator helps your baby breathe by delivering oxygen and removing carbon dioxide. The machine has tubes that connect to your baby&apos;s airway.</p>
        
        <h3>Heart Monitor</h3>
        <p>This tracks your baby&apos;s heart rate and rhythm. The small patches on your baby&apos;s chest send signals to the monitor.</p>
        
        <h3>IV Lines</h3>
        <p>These thin tubes deliver medications, fluids, and nutrition directly into your baby&apos;s bloodstream.</p>
        
        <h3>Incubator</h3>
        <p>This clear plastic box provides a controlled environment with the right temperature and humidity for your baby.</p>
        
        <p><strong>Remember:</strong> All this equipment is there to help your baby grow stronger. Don&apos;t hesitate to ask your care team to explain anything you&apos;re curious about.</p>
      `,
    },
    {
      id: 2,
      title: "Coping with NICU Stress",
      description: "Evidence-based strategies for managing anxiety and stress during your NICU journey.",
      category: "emotional",
      type: "guide",
      readTime: "12 min read",
      featured: true,
      content: `
        <h2>Managing NICU Stress: A Parent&apos;s Guide</h2>
        <p>Having a baby in the NICU is one of life&apos;s most stressful experiences. Here are proven strategies to help you cope.</p>
        
        <h3>Breathing Techniques</h3>
        <p>Practice deep breathing: Inhale for 4 counts, hold for 4, exhale for 6. This activates your body&apos;s relaxation response.</p>
        
        <h3>Stay Connected</h3>
        <p>Maintain relationships with family and friends. Don&apos;t isolate yourself during this difficult time.</p>
        
        <h3>Take Breaks</h3>
        <p>It&apos;s okay to step away from the NICU. Taking care of yourself helps you take better care of your baby.</p>
        
        <h3>Ask Questions</h3>
        <p>Understanding your baby&apos;s condition and treatment plan can reduce anxiety and help you feel more in control.</p>
        
        <h3>Professional Support</h3>
        <p>Consider speaking with a counselor who specializes in NICU families. Many hospitals have social workers available.</p>
      `,
    },
    {
      id: 3,
      title: "NICU Parent Rights & Advocacy",
      description: "Know your rights as a NICU parent and how to advocate effectively for your baby.",
      category: "practical",
      type: "article",
      readTime: "6 min read",
      featured: false,
      content: `
        <h2>Your Rights as a NICU Parent</h2>
        <p>You are your baby&apos;s first and most important advocate. Here&apos;s what you need to know about your rights.</p>
        
        <h3>Right to Information</h3>
        <p>You have the right to understand your baby&apos;s condition, treatment options, and prognosis in terms you can understand.</p>
        
        <h3>Right to Participate</h3>
        <p>You should be included in care decisions and treatment planning for your baby.</p>
        
        <h3>Right to Access</h3>
        <p>You have the right to spend time with your baby and participate in their care as much as possible.</p>
        
        <h3>How to Advocate Effectively</h3>
        <ul>
          <li>Ask questions and request clarification when needed</li>
          <li>Keep a journal of your baby&apos;s progress and concerns</li>
          <li>Build relationships with your care team</li>
          <li>Speak up if something doesn&apos;t feel right</li>
        </ul>
      `,
    },
    {
      id: 4,
      title: "Pumping & Breastfeeding in NICU",
      description: "Practical tips for establishing and maintaining milk supply while your baby is in NICU.",
      category: "practical",
      type: "video",
      readTime: "15 min watch",
      featured: true,
    },
    {
      id: 5,
      title: "Medical Terms Glossary",
      description: "Easy-to-understand definitions of common NICU medical terms and procedures.",
      category: "medical",
      type: "reference",
      readTime: "Quick reference",
      featured: false,
    },
    {
      id: 6,
      title: "Building Your Support Network",
      description: "How to connect with other NICU families and build lasting support relationships.",
      category: "community",
      type: "guide",
      readTime: "10 min read",
      featured: false,
    },
    {
      id: 7,
      title: "Preparing for NICU Discharge",
      description: "What to expect and how to prepare for bringing your baby home from the NICU.",
      category: "practical",
      type: "checklist",
      readTime: "5 min read",
      featured: true,
    },
    {
      id: 8,
      title: "Self-Care for NICU Parents",
      description: "Essential self-care practices to help you stay strong during your NICU journey.",
      category: "emotional",
      type: "article",
      readTime: "7 min read",
      featured: false,
    },
  ]

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredResources = resources.filter((resource) => resource.featured)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video
      case "guide":
        return BookOpen
      case "reference":
        return FileText
      case "checklist":
        return Shield
      default:
        return FileText
    }
  }

  const toggleBookmark = (resourceId: number) => {
    setBookmarkedResources((prev) =>
      prev.includes(resourceId) ? prev.filter((id) => id !== resourceId) : [...prev, resourceId],
    )
  }

  const openResource = (resource: Resource) => {
    setSelectedResource(resource)
  }

  const closeResource = () => {
    setSelectedResource(null)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Component */}
      <Sidebar />

      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resource Library</h1>
          <p className="text-gray-600 max-w-2xl">
            A trusted hub of information created specifically for NICU families. Find articles, guides, videos, and
            support tools to help you feel more confident throughout your journey.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-black text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Featured Resources */}
        {selectedCategory === "all" && searchTerm === "" && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Featured Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map((resource) => {
                const TypeIcon = getTypeIcon(resource.type)
                const isBookmarked = bookmarkedResources.includes(resource.id)
                return (
                  <div
                    key={resource.id}
                    className="bg-white border-2 border-black rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => openResource(resource)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <TypeIcon className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600 capitalize">{resource.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{resource.readTime}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleBookmark(resource.id)
                          }}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          {isBookmarked ? (
                            <Check className="w-4 h-4 text-black" />
                          ) : (
                            <Bookmark className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                    <div className="flex items-center space-x-2 text-black font-medium hover:text-gray-700 transition-colors">
                      <span>Read More</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* All Resources */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedCategory === "all" ? "All Resources" : categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-sm text-gray-500">{filteredResources.length} resources found</span>
          </div>

          <div className="grid gap-4">
            {filteredResources.map((resource) => {
              const TypeIcon = getTypeIcon(resource.type)
              const isBookmarked = bookmarkedResources.includes(resource.id)
              return (
                <div
                  key={resource.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-colors cursor-pointer"
                  onClick={() => openResource(resource)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <TypeIcon className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600 capitalize">{resource.type}</span>
                        <span className="text-xs text-gray-500">{resource.readTime}</span>
                        {resource.featured && (
                          <span className="bg-black text-white text-xs px-2 py-1 rounded">Featured</span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                      <p className="text-gray-600 text-sm">{resource.description}</p>
                    </div>
                    <div className="ml-4 flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleBookmark(resource.id)
                        }}
                        className="p-2 hover:bg-gray-100 rounded"
                      >
                        {isBookmarked ? (
                          <Check className="w-4 h-4 text-black" />
                        ) : (
                          <Bookmark className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      <div className="flex items-center space-x-2 text-black font-medium hover:text-gray-700 transition-colors">
                        <span>View</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16 bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Need personalized support?</h2>
          <p className="text-gray-600 mb-6">
            Our AI support is available 24/7 to help answer your specific questions and provide emotional guidance.
          </p>
          <Link href="/chatbot">
            <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Chat with AI Support
            </button>
          </Link>
        </div>
      </div>

      {selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {(() => {
                    const TypeIcon = getTypeIcon(selectedResource.type)
                    return <TypeIcon className="w-5 h-5 text-gray-600" />
                  })()}
                  <span className="text-sm font-medium text-gray-600 capitalize">{selectedResource.type}</span>
                </div>
                <span className="text-xs text-gray-500">{selectedResource.readTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => toggleBookmark(selectedResource.id)} className="p-2 hover:bg-gray-100 rounded">
                  {bookmarkedResources.includes(selectedResource.id) ? (
                    <Check className="w-5 h-5 text-black" />
                  ) : (
                    <Bookmark className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <button onClick={closeResource} className="p-2 hover:bg-gray-100 rounded">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{selectedResource.title}</h1>
              <div
                className="prose prose-gray max-w-none overflow-y-auto max-h-[60vh]"
                dangerouslySetInnerHTML={{ __html: selectedResource.content || selectedResource.description }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
