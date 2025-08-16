// lib/nile.ts
import { Nile } from "@niledatabase/server";
import { nextJs } from "@niledatabase/nextjs";

export const nile = await Nile({
  extensions: [nextJs],
});

export const { handlers } = nile;
