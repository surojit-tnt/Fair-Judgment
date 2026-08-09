import React from "react"
import { X } from "lucide-react"

// components/dashboard/CaseDrawer.jsx — port of CaseDrawer.tsx
// Slide-over panel for quick-viewing a case without leaving the list page.
export function CaseDrawer({ open, onClose, caseData }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/40">
      <div className="h-full w-full max-w-md overflow-y-auto bg-card p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{caseData?.title || "Case details"}</h3>
          <button onClick={onClose}><X className="h-4 w-4" /></button>
        </div>
        <p className="text-sm text-muted-foreground">{caseData?.summary}</p>
      </div>
    </div>
  )
}
