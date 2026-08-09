import React from "react"
import { cn } from "@/lib/utils"

// components/ui/Badge.jsx — port of components/ui/badge.tsx
const VARIANTS = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-muted text-muted-foreground",
  outline: "border border-border text-foreground",
  destructive: "bg-red-600 text-white",
}

export function Badge({ className, variant = "default", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        VARIANTS[variant],
        className
      )}
      {...props}
    />
  )
}
