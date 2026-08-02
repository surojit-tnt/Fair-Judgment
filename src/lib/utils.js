import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Same helper as the original lib/utils.ts — merges conditional
// class names and resolves Tailwind conflicts.
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
