import React from "react"
import { useCountUp } from "@/hooks/useCountUp.js"

// components/landing/StatsBar.jsx — port of components/landing/StatsBar.tsx
const STATS = [
  { end: 1200, label: "Judgments processed" },
  { end: 48, label: "Departments onboarded" },
  { end: 96, suffix: "%", label: "Extraction accuracy" },
]

function Stat({ end, suffix = "", label }) {
  const count = useCountUp(end)
  return (
    <div className="text-center">
      <div className="text-4xl font-bold">{count}{suffix}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

export default function StatsBar() {
  return (
    <section className="border-y border-border bg-muted/40">
      <div className="mx-auto grid max-w-4xl grid-cols-3 gap-6 px-6 py-12">
        {STATS.map((s) => <Stat key={s.label} {...s} />)}
      </div>
    </section>
  )
}
