import { NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    const { text } = await generateText({
      model: "gpt-4o-mini",
      messages,
      system: "You are a compassionate assistant specializing in NICU-related questions.",
    })

    return NextResponse.json({ text })
  } catch (error) {
    console.error("OpenAI API error:", error)
    return NextResponse.json({ text: "Sorry, something went wrong." }, { status: 500 })
  }
}
