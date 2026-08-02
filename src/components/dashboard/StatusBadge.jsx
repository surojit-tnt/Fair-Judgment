import React from "react"
import { Badge } from "@/components/ui/Badge.jsx"

// components/dashboard/StatusBadge.jsx — port of components/dashboard/StatusBadge.tsx
const STYLES = {
  pending: "secondary",
  processing: "outline",
  verified: "default",
  archived: "secondary",
  overdue: "destructive",
}

export function StatusBadge({ status }) {
  return <Badge variant={STYLES[status] || "secondary"} className="capitalize">{status}</Badge>
}
