import { Nile } from "@niledatabase/server"
import { nextJs } from "@niledatabase/nextjs"

// Initialize Nile with Next.js extension
export const nile = Nile({
  extensions: [nextJs()],
})

// Export handlers for the [...nile] route
export const handlers = nile.handlers
