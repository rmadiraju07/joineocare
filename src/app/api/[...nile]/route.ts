import { handlers } from "@/lib/nile"
import type { NextRequest } from "next/server"

type NileParams = { params: { nile: string[] } }

export async function GET(req: NextRequest, { params }: NileParams): Promise<Response> {
  const result = await handlers.GET(req, { params })
  if (result instanceof Response) return result
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  })
}

export async function POST(req: NextRequest, { params }: NileParams): Promise<Response> {
  const result = await handlers.POST(req, { params })
  if (result instanceof Response) return result
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  })
}

export async function PUT(req: NextRequest, { params }: NileParams): Promise<Response> {
  const result = await handlers.PUT(req, { params })
  if (result instanceof Response) return result
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  })
}

export async function DELETE(req: NextRequest, { params }: NileParams): Promise<Response> {
  const result = await handlers.DELETE(req, { params })
  if (result instanceof Response) return result
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  })
}