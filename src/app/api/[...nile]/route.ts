// app/api/[...nile]/route.ts
import { handlers } from "@/lib/nile";

// Route methods now use valid `handlers`, *not* `nile.api.handler`
export const GET = handlers.GET;
export const POST = handlers.POST;
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
