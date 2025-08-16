// lib/nile.ts
import { Nile } from "@niledatabase/server";
import { nextJs } from "@niledatabase/nextjs";

// Initialize Nile with the Next.js extension
export const nile = await Nile({
  extensions: [nextJs],
});

// Export the correct handlers object
export const { handlers } = nile;
