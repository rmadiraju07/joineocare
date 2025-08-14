"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, Calendar } from 'lucide-react'

const blogPosts = [
  // {
  //   slug: "why-texting-feels-hard-neurodivergent-minds",
  //   title: "Why Texting Feels Hard for Neurodivergent Minds",
  //   excerpt: "Understanding the unique challenges that neurodivergent individuals face in digital communication and how to navigate them with confidence.",
  //   date: "December 15, 2024",
  //   readTime: "5 min read",
  //   category: "Understanding",
  // },
  // {
  //   slug: "art-of-ending-conversations-gracefully",
  //   title: "The Art of Ending Conversations Gracefully",
  //   excerpt: "Learn practical strategies for wrapping up text conversations without awkwardness or anxiety. Perfect for those who struggle with social cues.",
  //   date: "December 10, 2024",
  //   readTime: "4 min read",
  //   category: "Practical Tips",
  // },
  // {
  //   slug: "tone-in-text-messages-guide",
  //   title: "Reading Between the Lines: A Guide to Tone in Text Messages",
  //   excerpt: "Decode the subtle meanings behind different texting styles and learn how to convey your intended tone clearly and kindly.",
  //   date: "December 5, 2024",
  //   readTime: "6 min read",
  //   category: "Communication",
  // },
  // {
  //   slug: "small-talk-alternatives-meaningful-connections",
  //   title: "Beyond Small Talk: Creating Meaningful Digital Connections",
  //   excerpt: "Skip the weather chat and dive into conversations that actually matter. A guide for people who find small talk exhausting.",
  //   date: "November 28, 2024",
  //   readTime: "7 min read",
  //   category: "Connection",
  // },
  // {
  //   slug: "esl-texting-confidence-building",
  //   title: "Building Texting Confidence as an ESL Speaker",
  //   excerpt: "Practical advice for non-native English speakers to communicate confidently through text while embracing your unique voice.",
  //   date: "November 20, 2024",
  //   readTime: "5 min read",
  //   category: "ESL Support",
  // },
  {
    slug: "welcome-to-nunitius",
    title: "Welcome to Nunitius",
    excerpt: "Whether you find texting confusing, group chats exhausting, or just want to feel more natural in casual messages, Nuntius is here to help. In this post, we’ll explore the mission behind Nuntius and how it empowers people to feel seen, understood, and confident online.",
    date: "July 4, 2025",
    readTime: "3 min read",
    category: "Introduction",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white font-circular">
      {/* Header */}
      <header className="mt-8 px-6">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto h-16">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" width={40} height={40} alt="Nuntius logo" priority />
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

      {/* Blog Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Blog Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4">
                <Image src="/logo.svg" width={24} height={24} alt="Nuntius logo" className="filter invert" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">nuntius blog</h1>
            </div>
            <p className="text-xl text-gray-600 mb-4">Insights for better digital communication</p>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Practical advice, research-backed insights, and real stories about improving your texting confidence.
            </p>
          </div>

          {/* Featured Post */}
          <div className="mb-16">
            <Link href={`/blog/${blogPosts[0].slug}`}>
              <div className="bg-gray-50 rounded-lg p-8 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-black text-white text-xs font-medium rounded-full">Featured</span>
                  <span className="px-3 py-1 bg-white text-gray-700 text-xs font-medium rounded-full border border-gray-200">
                    {blogPosts[0].category}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 hover:text-black transition-colors">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 mb-4 text-lg leading-relaxed">{blogPosts[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{blogPosts[0].date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-black font-medium">
                    Read more
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* All Posts */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">All Posts</h2>
            <div className="grid gap-8">
              {blogPosts.slice(1).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <article className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 hover:text-black transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-700 font-medium hover:text-black transition-colors">
                        Read more
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 text-center bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Stay updated</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Get new posts delivered to your inbox. No spam, just thoughtful insights about digital communication.
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <button className="bg-black text-white px-6 py-3 rounded-r-lg font-medium hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 py-6 px-6">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-500">
          <div className="flex items-center space-x-2">
            <Image src="/favicon.svg" width={32} height={32} alt="Nuntius logo" unoptimized />
            <span className="font-medium text-gray-600">nuntius</span>
          </div>

          <span className="text-sm">Copyright © 2025</span>

          <div className="flex items-center space-x-2">
            <Image src="/america.svg" width={24} height={15} alt="US flag" unoptimized className="rounded-sm" />
            <span className="text-sm">Made in USA</span>
          </div>
        </div>

        {/* Right side */}
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
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
