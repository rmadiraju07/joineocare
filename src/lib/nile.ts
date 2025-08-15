import { Nile } from "@niledatabase/server"
import { nextJs } from "@niledatabase/nextjs"

export const nile = Nile({
  extensions: [nextJs],
})
