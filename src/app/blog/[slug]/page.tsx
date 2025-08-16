"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import { use } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

// Sample blog content in Markdown format
const blogContent = {
  "welcome-to-neocare": {
    title: "Welcome to neocare",
    date: "March 4, 2024",
    readTime: "3 min read",
    category: "Introduction",
    content: `
The NICU experience can be overwhelming and emotionally exhausting. At **neocare**, we’re dedicated to walking alongside you every step of the way — offering tools designed to support your mental and emotional well-being during this challenging time.

## What is neocare?

**neocare** is a holistic app created specifically for NICU parents. It helps you process your feelings, stay informed, and find community support through a range of practical features:

- **Daily Check-Ins & Streak Tracking:** Reflect on how you’re feeling each day with guided journaling prompts, and celebrate your progress by tracking your streaks.
- **Quick Reflections & Journal Entries:** Take a moment anytime to jot down thoughts, memories, or emotions to help process your journey.
- **24/7 Chatbot Support:** Have questions or need reassurance? Our always-available chatbot is here to listen, provide information, and guide you.
- **Find NICU Hospitals Near You:** Easily locate NICU facilities close to home or wherever you are, so you can plan visits and stay connected.
- **Glossary of Medical Terms:** Decode complex NICU jargon with our simple, easy-to-understand glossary.
- **Resource Library:** Access trusted articles, tips, and support networks tailored for NICU parents.

## Why neocare?

We believe that small moments of reflection and connection can create a big impact on your resilience and hope. **neocare** is designed to be a gentle daily companion — giving you space to be heard, understood, and informed.

## Join the neocare Community

Your NICU journey is unique, but you are never alone. Explore **neocare** and find the comfort of knowing you have a supportive tool and community by your side.

Thank you for letting **neocare** be part of your story.

With warmth and support,  
The neocare Team
    `,
  },
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params)
  const post = blogContent[slug as keyof typeof blogContent]

  if (!post) {
    return (
      <div className="min-h-screen bg-white font-circular flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Post not found</h1>
          <Link href="/blog" className="text-black hover:text-gray-800 font-medium">
            ← Back to blog
          </Link>
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
            <p className="text-3xl text-gray-800 tracking-tight whitespace-nowrap">Thoughtful texting insights</p>
          </div>
          <div className="flex items-center space-x-3" style={{ minWidth: "280px", justifyContent: "flex-end" }}>
            <Link href="/blog">
              <button className="px-6 py-2 rounded-full bg-black text-white shadow-md hover:bg-gray-800 transition-all duration-200 font-semibold text-sm">
                Blog
              </button>
            </Link>
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

      {/* Article Content */}
      <article className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back Navigation */}
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to blog
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{post.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{post.readTime}</span>
                </div>
              </div>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </header>

          {/* Markdown Content */}
          <div className="prose prose-lg prose-gray max-w-none mx-auto">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ node, ...props }) => (
                  <p className="mb-6 leading-relaxed text-gray-700" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside mb-6 text-gray-700" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="text-gray-900 font-semibold" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl mt-8 mb-4 font-bold text-gray-900" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-xl mt-6 mb-3 font-bold text-gray-900" {...props} />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mr-4">
                  <Image src="/logo.svg" width={20} height={20} alt="neocare logo" className="filter invert" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">neocare</h3>
                  <p className="text-sm text-gray-600">Caring for the carers</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Ready to start your NICU journey with support? Join neocare.
              </p>
              <Link href="/auth/signup">
                <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm">
                  Get started
                </button>
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </div>
  )
}
