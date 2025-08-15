"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, ArrowLeft, Paperclip } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const suggestionCards = [
  {
    title: "How to support my NICU baby?",
    subtitle: "Practical tips for NICU families",
  },
  {
    title: "Understanding NICU equipment",
    subtitle: "Explanation of common devices",
  },
  {
    title: "Coping with stress",
    subtitle: "Mental health advice for NICU parents",
  },
  {
    title: "NICU discharge process",
    subtitle: "What to expect when going home",
  },
]

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Send all messages including new user message to your API route
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            ...messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            {
              role: "user",
              content: userMessage.content,
            },
          ],
        }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.text || "Sorry, I couldn't process that.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error fetching AI response:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, something went wrong. Please try again later.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
              <ArrowLeft className="w-5 h-5" />
              <span className="sr-only">Back to home</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 py-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 text-white">Hello there!</h2>
                <p className="text-xl text-gray-400">How can I help you with your NICU questions today?</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                {suggestionCards.map((card, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(`${card.title} ${card.subtitle}`)}
                    className="p-6 rounded-lg border border-gray-700 bg-gray-900/50 hover:bg-gray-800/50 hover:border-gray-600 transition-all duration-200 text-left"
                  >
                    <div>
                      <p className="font-medium text-white mb-1">{card.title}</p>
                      <p className="text-sm text-gray-400">{card.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ScrollArea className="h-full px-6">
              <div className="py-6 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="w-8 h-8 mt-1">
                        <AvatarFallback className="bg-gray-800 text-white">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`max-w-[75%] ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800 text-white border border-gray-700"
                      } rounded-2xl px-4 py-3`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-2 ${message.role === "user" ? "opacity-80" : "text-gray-400"}`}>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {message.role === "user" && (
                      <Avatar className="w-8 h-8 mt-1">
                        <AvatarFallback className="bg-gray-700 text-white">
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-4 justify-start">
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="bg-gray-800 text-white">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-800 text-white border border-gray-700 rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>

      <div className="border-t border-gray-800 bg-black">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about NICU..."
                disabled={isLoading}
                className="w-full h-12 pl-12 pr-4 bg-gray-900 border-gray-700 rounded-full text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Paperclip className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              size="icon"
              className="h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600 text-white disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
