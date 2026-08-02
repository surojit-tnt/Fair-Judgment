import React from "react"

// components/dashboard/SkeletonCard.jsx — port of components/dashboard/SkeletonCard.tsx
// Loading placeholder shown while case/dashboard data is being fetched.
export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-lg border border-border p-4">
      <div className="h-4 w-2/3 rounded bg-muted" />
      <div className="mt-3 h-3 w-full rounded bg-muted" />
      <div className="mt-2 h-3 w-5/6 rounded bg-muted" />
    </div>
  )
}
