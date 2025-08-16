// app/api/[...nile]/route.ts
import { handlers } from "@/lib/nile";

// Forward all HTTP methods to Nile's handlers
export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
