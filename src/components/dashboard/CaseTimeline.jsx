import React from "react"
import { CheckCircle2, Circle } from "lucide-react"

// components/dashboard/CaseTimeline.jsx — port of CaseTimeline.tsx
// events: [{ label, date, done }]
export function CaseTimeline({ events = [] }) {
  return (
    <ol className="space-y-4 border-l border-border pl-4">
      {events.map((e, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[21px] top-0.5 text-primary">
            {e.done ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4 text-muted-foreground" />}
          </span>
          <p className="text-sm font-medium">{e.label}</p>
          {e.date && <p className="text-xs text-muted-foreground">{e.date}</p>}
        </li>
      ))}
    </ol>
  )
}
