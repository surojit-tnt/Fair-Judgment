import React from "react"

// components/landing/HowItWorks.jsx — port of components/landing/HowItWorks.tsx
const STEPS = [
  { step: "01", title: "Upload PDF", desc: "Drop in a scanned or digital court judgment." },
  { step: "02", title: "AI extraction", desc: "The model pulls out parties, directives, deadlines and outcome." },
  { step: "03", title: "Action plan", desc: "Compliance and appeal steps are generated per department." },
  { step: "04", title: "Human review", desc: "A reviewer verifies or edits before it becomes official." },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold">How it works</h2>
      <div className="mt-12 grid gap-8 md:grid-cols-4">
        {STEPS.map((s) => (
          <div key={s.step}>
            <div className="text-sm font-mono text-primary">{s.step}</div>
            <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
